import { SceneBackdrop, SceneHeading } from '../common/SceneElements';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../../context/language';
import { PhaseAnimation } from './PhaseAnimation';

export function MethodologySection() {
  const { lang } = useLanguage();
  const es = lang === 'es';
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const names = es ? ['Comprender', 'Validar', 'Construir', 'Evolucionar'] : ['Understand', 'Validate', 'Build', 'Evolve'];
  const titles = es ? ['Elegimos el primer paso', 'Probamos la idea', 'Lo ponemos en marcha', 'Medimos y mejoramos'] : ['Find the starting point', 'Test the idea', 'Put it to work', 'Measure and improve'];
  const summaries = es ? ['Priorizamos lo que más valor aporta a tu negocio.', 'Validamos que funciona con tus datos.', 'Integramos la solución en tu día a día.', 'La solución evoluciona contigo.'] : ['Prioritize what brings the most value to your business.', 'Validate it with your own data.', 'Bring the solution into your everyday work.', 'Keep the solution evolving with you.'];
  const times = es ? ['Semanas 1–2', 'Semanas 3–5', 'Semanas 6–10', 'Mejora continua'] : ['Weeks 1–2', 'Weeks 3–5', 'Weeks 6–10', 'Continuous improvement'];
  const outcomes = es ? ['Un plan claro', 'Un prototipo validado', 'Una solución funcionando', 'Seguimiento y mejora continua'] : ['A clear plan', 'A validated prototype', 'A working solution', 'Ongoing support and improvement'];
  const choose = (index: number, focus = false) => {
    const next = Math.min(3, Math.max(0, index));
    setActive(next);
    if (focus) refs.current[next]?.focus({ preventScroll: true });
  };
  return <section id="methodology" className="section methodology-section"><SceneBackdrop /><div className="shell">
    <div className="section-heading"><SceneHeading>{es ? 'Un proceso claro. Un avance tangible' : 'A clear process. Tangible progress'}</SceneHeading><p>{es ? 'Cuatro pasos para avanzar. Elige uno y descubre qué conseguimos juntos.' : 'Four steps forward. Choose one to see what we achieve together.'}</p></div>
    <div className="method-explorer">
    <div className="method-steps" role="tablist" aria-label={es ? 'Fases del proyecto' : 'Project phases'} onKeyDown={event => {
      const index = refs.current.findIndex(button => button === event.target);
      if (index < 0) return;
      const next = ['ArrowRight', 'ArrowDown'].includes(event.key) ? (index + 1) % 4 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
      if (next !== null) { event.preventDefault(); choose(next, true); }
    }}>{names.map((name, index) => <button key={name} ref={element => { refs.current[index] = element; }} id={`method-step-${index}`} className="method-step" role="tab" aria-selected={active === index} tabIndex={active === index ? 0 : -1} aria-controls="method-detail" onClick={() => choose(index)}><span className="method-number" aria-hidden="true">0{index + 1}</span><strong>{name}</strong></button>)}</div>
    <div id="method-detail" className="method-detail" role="tabpanel" tabIndex={0} aria-labelledby={`method-step-${active}`}>
      <div className="method-copy" key={active}>
        <div className="method-illustration is-playing"><PhaseAnimation phase={active} lang={lang} /></div>
        <div className="method-message">
          <p className="method-timing">{times[active]}</p>
          <h3>{titles[active]}</h3>
          <p className="method-summary">{summaries[active]}</p>
          <p className="method-result"><Check size={18} aria-hidden="true" /><span><span className="sr-only">{es ? 'Resultado: ' : 'Outcome: '}</span>{outcomes[active]}</span></p>
        </div>
      </div>
    </div>
    <div className="method-footer"><p role="status" aria-live="polite">{es ? `Fase ${active + 1} de 4` : `Phase ${active + 1} of 4`}</p><div><button className="icon-button" disabled={active === 0} onClick={() => choose(active - 1, true)} aria-label={es ? 'Fase anterior' : 'Previous phase'}><ArrowLeft size={18} /></button><button className="text-link" disabled={active === 3} onClick={() => choose(active + 1, true)} aria-label={es ? 'Siguiente fase' : 'Next phase'}>{es ? 'Siguiente' : 'Next'}<ArrowRight size={18} /></button></div></div>
    </div>
    <p className="method-note">{es ? 'Plazos orientativos. Se adaptan al alcance de tu proyecto.' : 'Indicative timelines, adapted to the scope of your project.'}</p>
  </div></section>;
}
