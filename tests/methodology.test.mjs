import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('.') && context.parentURL?.includes('/src/')) {
      for (const extension of ['.ts', '.tsx']) {
        const url = new URL(specifier + extension, context.parentURL);
        if (existsSync(url)) return next(url.href, context);
      }
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (/\/src\/.*\.tsx?$/.test(url)) return {
      format: 'module', shortCircuit: true,
      source: ts.transpileModule(readFileSync(new URL(url), 'utf8'), {
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2023 },
      }).outputText,
    };
    return next(url, context);
  },
});

const { window } = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
for (const key of ['window', 'document', 'HTMLElement', 'Event', 'KeyboardEvent', 'localStorage']) globalThis[key] = key === 'window' ? window : window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { MethodologySection } = await import('../src/components/methodology/MethodologySection.tsx');
const { LanguageProvider } = await import('../src/context/LanguageContext.tsx');
let root;

function mount(lang = 'es') {
  localStorage.setItem('alpha_lang', lang);
  const host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(React.createElement(LanguageProvider, null, React.createElement(MethodologySection))));
  return [...document.querySelectorAll('[role="tab"]')];
}
afterEach(() => {
  if (root) act(() => root.unmount());
  root = undefined;
  document.body.replaceChildren();
});
const click = button => act(() => button.click());
function key(button, name) {
  act(() => button.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true })));
}
function selected(index) {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  assert.equal(tabs.filter(tab => tab.getAttribute('aria-selected') === 'true').length, 1);
  assert.equal(tabs[index].getAttribute('aria-selected'), 'true');
  assert.deepEqual(tabs.map(tab => tab.tabIndex), tabs.map((_, i) => i === index ? 0 : -1));
  assert.equal(document.querySelector('[role="tabpanel"]').getAttribute('aria-labelledby'), tabs[index].id);
}

test('each phase opens the matching question, real description and deliverable in one panel', () => {
  const tabs = mount();
  assert.deepEqual(tabs.map(tab => tab.querySelector('strong').textContent), ['Comprender', 'Validar', 'Construir', 'Evolucionar']);
  const outcomes = ['Informe de viabilidad y matriz de ROI', 'Prototipo funcional con datos reales', 'Despliegue productivo e integración de APIs', 'Monitorización, actualización y formación'];
  const descriptions = ['Evaluamos', 'Diseñamos', 'Construcción', 'Monitorización'];
  tabs.forEach((tab, index) => {
    click(tab);
    selected(index);
    assert.equal(document.querySelectorAll('[role="tabpanel"]').length, 1);
    assert.equal(document.querySelector('.method-deliverable strong').textContent, outcomes[index]);
    assert.ok(document.querySelector('.method-copy > p').textContent.startsWith(descriptions[index]));
    assert.ok(document.querySelector('.method-illustration svg'));
  });
});

test('keyboard selection wraps, supports Home/End and keeps focus on the selected phase', () => {
  const tabs = mount();
  tabs[0].focus();
  for (const [from, command, to] of [[0, 'ArrowLeft', 3], [3, 'ArrowRight', 0], [0, 'End', 3], [3, 'Home', 0], [0, 'ArrowDown', 1], [1, 'ArrowUp', 0]]) {
    key(tabs[from], command);
    selected(to);
    assert.equal(document.activeElement, tabs[to]);
  }
});

test('previous/next controls respect boundaries and return focus to the selected phase', () => {
  const tabs = mount();
  const previous = document.querySelector('[aria-label="Fase anterior"]');
  const next = document.querySelector('[aria-label="Siguiente fase"]');
  assert.equal(previous.disabled, true);
  click(next);
  selected(1);
  assert.equal(document.activeElement, tabs[1]);
  click(previous);
  selected(0);
  click(next); click(next); click(next);
  selected(3);
  assert.equal(next.disabled, true);
  assert.equal(previous.disabled, false);
  assert.equal(document.querySelector('[role="status"]').textContent, 'Fase 4 de 4');
});

test('English selection uses the corresponding phase copy and navigation labels', () => {
  const tabs = mount('en');
  assert.equal(tabs[2].querySelector('strong').textContent, 'Build');
  click(tabs[2]);
  selected(2);
  assert.equal(document.querySelector('.method-copy h3').textContent, 'How do we move it into production?');
  assert.equal(document.querySelector('.method-deliverable strong').textContent, 'Production deployment and API integration');
  assert.ok(document.querySelector('[aria-label="Next phase"]'));
  assert.ok(document.querySelector('.method-copy > p').textContent.startsWith('Full engineering'));
});
