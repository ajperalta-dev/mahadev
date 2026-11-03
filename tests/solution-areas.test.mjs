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

const { window } = new JSDOM('<!doctype html><html><head><title>MAHA DEV</title><meta name="description" content="Original description"></head><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
for (const key of ['window', 'document', 'HTMLElement', 'Event', 'localStorage']) globalThis[key] = key === 'window' ? window : window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { SolutionAreaPage } = await import('../src/components/services/SolutionAreaPage.tsx');
const { LanguageProvider } = await import('../src/context/LanguageContext.tsx');
const { transformationServices } = await import('../src/data/transformationServices.ts');
const { solutionAreaDetails } = await import('../src/data/solutionAreaDetails.ts');
let root;

function mount(service, lang = 'es', onOpenBooking = () => {}) {
  localStorage.setItem('alpha_lang', lang);
  const host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(React.createElement(LanguageProvider, null, React.createElement(SolutionAreaPage, { service, onOpenBooking }))));
}

afterEach(() => {
  if (root) act(() => root.unmount());
  root = undefined;
  document.body.replaceChildren();
});

for (const service of transformationServices) {
  for (const lang of ['es', 'en']) {
    test(`${service.id} (${lang}): each need opens only its own service and outcome`, () => {
      mount(service, lang);
      const content = solutionAreaDetails[service.id][lang];
      const triggers = [...document.querySelectorAll('.area-offering-heading button')];
      assert.equal(triggers.length, content.offerings.length);
      assert.equal(document.querySelector('h1').textContent, content.headline);
      for (const [index, trigger] of triggers.entries()) {
        assert.equal(trigger.querySelector('strong').textContent, content.offerings[index].need);
        assert.equal(trigger.querySelector('small').textContent, content.offerings[index].title);
        trigger.focus();
        act(() => trigger.click());
        const visible = [...document.querySelectorAll('.area-service-panel')].filter(panel => !panel.hidden);
        assert.equal(visible.length, 1);
        assert.equal(document.querySelectorAll('[aria-expanded="true"]').length, 1);
        assert.equal(visible[0].id, trigger.getAttribute('aria-controls'));
        assert.equal(visible[0].getAttribute('aria-labelledby'), trigger.id);
        assert.equal(document.activeElement, trigger);
        assert.equal(visible[0].querySelector('.area-service-action').textContent, content.offerings[index].action);
        assert.equal(visible[0].querySelector('.area-service-outcome p').textContent, content.offerings[index].outcome);
        assert.ok(visible[0].querySelector('svg[role="img"][aria-label]'));
      }
      const links = [...document.querySelectorAll('.area-related-links a')];
      assert.equal(links.length, 3);
      assert.ok(links.every(link => !link.href.endsWith(service.id)));
      for (const other of transformationServices.filter(item => item.id !== service.id)) {
        const link = links.find(item => item.getAttribute('href') === `/soluciones/${other.id}`);
        assert.ok(link?.textContent.includes(solutionAreaDetails[other.id][lang].choice));
      }
    });
  }
}

test('the discovery link targets the services and booking keeps the selected area', () => {
  const service = transformationServices[2];
  const bookings = [];
  mount(service, 'es', name => bookings.push(name));
  const discovery = document.querySelector('.area-header-actions .button');
  assert.ok(document.querySelector(discovery.getAttribute('href')));
  act(() => document.querySelector('.area-header-actions button').click());
  assert.deepEqual(bookings, [service.title.es]);
  assert.equal(document.title, `${service.title.es} | MAHA DEV`);
  act(() => root.unmount());
  root = undefined;
  assert.equal(document.title, 'MAHA DEV');
  assert.equal(document.querySelector('meta[name="description"]').content, 'Original description');
});
