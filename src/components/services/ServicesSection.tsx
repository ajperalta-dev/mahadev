import { ArrowUpRight, BarChart3, Check, Compass, Factory, GraduationCap, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/language';
import { SceneBackdrop, SceneHeading } from '../common/SceneElements';
import type { ServiceItem } from '../../types';
import { ServiceAnimation } from './ServiceAnimation';
import './solutionAreas.css';

const icons: Record<string, LucideIcon> = {
  'digital-transformation-assessment': Compass,
  'data-automation-operations-intelligence': BarChart3,
  'ai-industry-40': Factory,
  'transformation-partner': GraduationCap,
};

export function ServicesSection({ onSelectServiceForBooking }: { onSelectServiceForBooking: (service: string) => void }) {
  const { lang, services } = useLanguage();
  const es = lang === 'es';
  const copy = (service: ServiceItem) => ({ category: service.levelBadge[lang], benefit: service.subtitle[lang], includes: service.deliverables[lang].slice(0, 3) });

  return <section id="services" className="section services-section">
    <SceneBackdrop />
    <div className="shell">
      <div className="section-heading">
        <SceneHeading>{es ? 'Conectamos las piezas de tu transformación' : 'Connecting the pieces of your transformation'}</SceneHeading>
        <p>{es ? 'Cuatro áreas para definir qué transformar, conectar datos y operaciones, aplicar inteligencia y acompañar a tu equipo a largo plazo.' : 'Four areas to define what to transform, connect data and operations, apply intelligence and support your team over the long term.'}</p>
      </div>
      <div className="solution-grid">{services.map(service => {
        const Icon = icons[service.id] ?? Compass;
        const href = `/soluciones/${service.id}`;
        const item = copy(service);
        return <article className="service-card solution-card" key={service.id} aria-labelledby={`solution-${service.id}`}>
          <div className="service-media solution-media"><ServiceAnimation icon={service.iconName} lang={lang} /><span className="service-media-caption">{service.techStack.slice(0, 3).join(' / ')}</span></div>
          <div className="service-card-content solution-card-content">
            <div className="service-card-top"><span className="service-icon"><Icon size={24} strokeWidth={1.6} /></span><span className="service-category">{item.category}</span></div>
            <h3 id={`solution-${service.id}`}><a href={href}>{service.title[lang]}</a></h3>
            <p className="service-benefit">{item.benefit}</p>
            <ul className="check-list">{item.includes.map(include => <li key={include}><Check size={16} /><span>{include}</span></li>)}</ul>
            <div className="service-card-actions"><a className="text-link" href={href}>{es ? 'Explorar la solución' : 'Explore the solution'}<ArrowUpRight size={17} /></a><button className="button button-outline button-small" onClick={() => onSelectServiceForBooking(service.title[lang])}>{es ? 'Hablemos' : 'Talk to us'}</button></div>
          </div>
        </article>;
      })}</div>
      <div className="services-note"><p>{es ? '¿Todavía no sabes por dónde empezar?' : 'Not sure where to start?'}</p><button className="text-link" onClick={() => onSelectServiceForBooking('Digital Transformation Assessment')}>{es ? 'Definamos el primer paso juntos' : 'Let’s define your first step together'}<ArrowUpRight size={18} /></button></div>
    </div>
  </section>;
}
