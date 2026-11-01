import { SceneBackdrop, SceneHeading } from '../common/SceneElements';
import { useState } from 'react';
import { ArrowUpRight, Boxes, Factory, ChartNoAxesCombined } from 'lucide-react';
import { useLanguage } from '../../context/language';
import { CaseVisual } from './CaseVisual';

export function CaseStudiesSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { lang, caseStudies } = useLanguage();
  const [active, setActive] = useState(0);
  const es = lang === 'es';
  const tabs = es ? ['Visión de negocio', 'Industria conectada', 'Demanda e inventario'] : ['Business vision', 'Connected industry', 'Demand & inventory'];
  const titles = es
    ? ['Una visión del negocio. Decisiones conectadas', 'Detectar la señal antes de que llegue la avería', 'Anticipar la demanda. Coordinar la operación']
    : ['One view of the business. Connected decisions', 'Detect the signal before the failure', 'Anticipate demand. Coordinate operations'];
  const outcomes = es
    ? [['Datos integrados', 'Indicadores compartidos', 'Informes automatizados'], ['Sensores conectados', 'Detección de anomalías', 'Mantenimiento predictivo'], ['Previsión de demanda', 'Planificación de stock', 'Decisiones coordinadas']]
    : [['Integrated data', 'Shared indicators', 'Automated reporting'], ['Connected sensors', 'Anomaly detection', 'Predictive maintenance'], ['Demand forecasting', 'Stock planning', 'Coordinated decisions']];
  const icons = [ChartNoAxesCombined, Factory, Boxes];
  const visualKinds = [2, 0, 1];
  const study = [caseStudies[2], caseStudies[0], caseStudies[1]][active];
  return <section id="cases" className="section cases-section inverse"><SceneBackdrop /><div className="shell">
    <div className="section-heading"><SceneHeading>{es ? 'De la información a una operación inteligente' : 'From information to intelligent operations'}</SceneHeading><p>{es ? 'Anticipar fallos. Equilibrar inventarios. Ver el negocio completo. Explora estos escenarios ilustrativos de lo que los datos y la IA pueden aportar a tu organización.' : 'Anticipate failures. Balance inventory. See the whole business. Explore these illustrative scenarios of what data and AI can bring to your organization.'}</p></div>
    <div className="case-selector" role="group" aria-label={es ? 'Explorar casos de uso' : 'Explore use cases'}>{tabs.map((label, index) => {
      const Icon = icons[index];
      return <button id={`case-tab-${index}`} key={label} aria-pressed={active === index} aria-controls="case-showcase" onClick={() => setActive(index)}><Icon size={20} strokeWidth={1.5} />{label}<ArrowUpRight size={16} /></button>;
    })}</div>
    <div id="case-showcase" className="case-showcase" role="region" aria-labelledby={`case-tab-${active}`}>
      <div className="case-showcase-art"><CaseVisual key={visualKinds[active]} kind={visualKinds[active]} lang={lang} /><div className="case-outcomes">{outcomes[active].map(label => <span key={label}>{label}</span>)}</div><p className="case-art-note">{es ? 'De una señal a una decisión.' : 'From a signal to a decision.'}</p></div>
      <article className="case-showcase-copy"><p className="case-industry">{study.clientIndustry[lang]}</p><h3>{titles[active]}</h3><div className="case-narrative"><h4>{es ? 'El punto de partida' : 'The starting point'}</h4><p>{study.challenge[lang]}</p><h4>{es ? 'La transformación' : 'The transformation'}</h4><p>{study.solution[lang]}</p></div><div className="tag-list">{study.techUsed.map(tech => <span key={tech}>{tech}</span>)}</div></article>
    </div>
    <div className="case-invitation"><h3>{es ? '¿Qué cambiaría en tu negocio?' : 'What would change in your business?'}</h3><button className="button button-primary" onClick={onOpenBooking}>{es ? 'Exploremos tu caso' : 'Let’s explore your use case'}<ArrowUpRight size={18} /></button></div>
  </div></section>;
}
