import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/language';
import { solutionAreaDetails } from '../../data/solutionAreaDetails';
import type { ServiceItem } from '../../types';
import { AreaServiceExplorer } from './AreaServiceExplorer';

const areaPhotography: Record<string, { src: string; alt: { es: string; en: string }; credit: string; source: string }> = {
  'digital-transformation-assessment': {
    src: 'https://images.pexels.com/photos/17489157/pexels-photo-17489157.jpeg?auto=compress&dpr=1&h=1500&w=2200',
    alt: { es: 'Infraestructura digital: rack de servidores con indicadores luminosos y equipos de almacenamiento de datos.', en: 'Digital infrastructure: server rack with illuminated indicators and data storage equipment.' },
    credit: 'panumas nikhomkhai / Pexels',
    source: 'https://www.pexels.com/photo/close-up-of-computer-hardware-17489157/',
  },
  'ai-industry-40': {
    src: 'https://images.pexels.com/photos/18471441/pexels-photo-18471441/free-photo-of-robots-are-working-in-a-factory-with-a-machine.jpeg?auto=compress&dpr=1&h=1500&w=2200',
    alt: { es: 'Brazos robóticos automatizados en un entorno de control industrial.', en: 'Automated robotic arms inside an industrial control environment.' },
    credit: 'Ludovic Delot / Pexels',
    source: 'https://www.pexels.com/photo/robots-are-working-in-a-factory-with-a-machine-18471441/',
  },
  'transformation-partner': {
    src: 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&dpr=1&h=1500&w=2200',
    alt: { es: 'Sala de reuniones preparada para una sesión de trabajo, con proyector, gráficos y mesa de trabajo.', en: 'A meeting room set up for a working session, with a projector, charts and a conference table.' },
    credit: 'RDNE Stock project / Pexels',
    source: 'https://www.pexels.com/photo/empty-conference-room-7648467/',
  },
};

function OperationsDashboard({ es }: { es: boolean }) {
  return <section className="ops-dashboard" aria-label={es ? 'Maqueta de dashboard de control de indicadores' : 'Sample operations KPI dashboard'}>
    <div className="ops-dashboard-head">
      <div><p className="ops-dashboard-kicker">MAHA DEV <span>/</span> OPERATIONS INTELLIGENCE</p><h2>Control Tower</h2></div>
      <span className="ops-demo-label">{es ? 'VISTA DE EJEMPLO' : 'SAMPLE VIEW'}</span>
    </div>
    <div className="ops-dashboard-meta"><span><i aria-hidden="true" />{es ? 'Resumen operativo' : 'Operations overview'}</span><span>{es ? 'Últimas 24 horas' : 'Last 24 hours'}</span></div>
    <div className="ops-kpis">
      <div className="ops-kpi"><span>OEE</span><strong>87.4<small>%</small></strong><em>+2.6 pts</em></div>
      <div className="ops-kpi"><span>{es ? 'Disponibilidad' : 'Availability'}</span><strong>94.8<small>%</small></strong><em>+1.2 pts</em></div>
      <div className="ops-kpi"><span>{es ? 'Calidad' : 'Quality'}</span><strong>98.2<small>%</small></strong><em>+0.8 pts</em></div>
      <div className="ops-kpi"><span>{es ? 'Alertas activas' : 'Active alerts'}</span><strong>03</strong><em className="ops-kpi-neutral">{es ? '1 requiere atención' : '1 needs attention'}</em></div>
    </div>
    <div className="ops-dashboard-detail">
      <div className="ops-chart-panel">
        <div className="ops-panel-head"><div><h3>{es ? 'Rendimiento de producción' : 'Production performance'}</h3><p>{es ? 'Producción real frente al objetivo' : 'Actual output vs target'}</p></div><span>24H</span></div>
        <svg className="ops-chart" viewBox="0 0 560 170" role="img" aria-label={es ? 'Gráfico ilustrativo de producción y objetivo durante el día' : 'Illustrative chart of actual output versus target throughout the day'}>
          <g className="ops-chart-grid"><path d="M0 20H560M0 62H560M0 104H560M0 146H560" /></g>
          <path className="ops-chart-target" d="M0 81C55 78 75 69 116 72S187 79 224 66 291 61 336 66 395 56 448 60 518 53 560 45" />
          <path className="ops-chart-line" d="M0 119C45 114 78 124 116 98S183 110 224 88 286 97 336 75 399 93 448 64 514 76 560 52" />
          <circle className="ops-chart-point" cx="448" cy="64" r="4" />
        </svg>
        <div className="ops-chart-axis"><span>06:00</span><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span></div>
      </div>
      <div className="ops-alert-panel">
        <div className="ops-panel-head"><div><h3>{es ? 'Excepciones' : 'Exceptions'}</h3><p>{es ? 'Requieren seguimiento' : 'Needs follow-up'}</p></div><span className="ops-alert-count">03</span></div>
        <ul>
          <li><i className="ops-state ops-state-warn" aria-hidden="true" /><span><strong>{es ? 'Desvío de producción' : 'Output deviation'}</strong><small>{es ? 'Línea 03 · hace 12 min' : 'Line 03 · 12 min ago'}</small></span><b>!</b></li>
          <li><i className="ops-state ops-state-ok" aria-hidden="true" /><span><strong>{es ? 'Stock bajo control' : 'Stock on track'}</strong><small>{es ? 'Almacén central · hace 28 min' : 'Central warehouse · 28 min ago'}</small></span><b>✓</b></li>
          <li><i className="ops-state ops-state-ok" aria-hidden="true" /><span><strong>{es ? 'Mantenimiento al día' : 'Maintenance on schedule'}</strong><small>{es ? 'Equipo 08 · hace 41 min' : 'Asset 08 · 41 min ago'}</small></span><b>✓</b></li>
        </ul>
      </div>
    </div>
    <p className="ops-dashboard-foot">{es ? 'Indicadores y valores ilustrativos · no conectados a datos operativos' : 'Illustrative indicators and values · not connected to live operational data'}</p>
  </section>;
}

export function SolutionAreaPage({ service, onOpenBooking }: { service: ServiceItem; onOpenBooking: (name: string, notes?: string) => void }) {
  const { lang, services } = useLanguage();
  const es = lang === 'es';
  const content = solutionAreaDetails[service.id][lang];
  const isOperationsArea = service.id === 'data-automation-operations-intelligence';
  const photo = areaPhotography[service.id];

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = `${service.title[lang]} | MAHA DEV`;
    if (description) description.content = content.summary;
    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
    };
  }, [service, lang, content.summary]);

  return <article className="area-page">
    {isOperationsArea ? <header className="area-data-hero">
      <div className="shell area-data-hero-shell">
        <a className="area-back text-link" href="/#services"><ArrowLeft size={18} />{es ? 'Todas las soluciones' : 'All solutions'}</a>
        <div className="area-data-hero-layout">
          <div className="area-data-hero-copy">
            <p className="area-category">{service.title[lang]}</p>
            <h1>{content.headline}</h1>
            <p className="area-summary">{content.summary}</p>
            <div className="area-header-actions">
              <a className="button button-primary" href="#servicios">{es ? 'Encuentra tu solución' : 'Find your solution'}<ArrowRight size={19} /></a>
              <button className="area-hero-link" onClick={() => onOpenBooking(service.title[lang])}>{es ? 'Hablemos' : 'Let’s talk'}<ArrowUpRight size={18} /></button>
            </div>
          </div>
          <OperationsDashboard es={es} />
        </div>
      </div>
    </header> : <header className="area-hero">
      <img className="area-hero-image" src={photo.src} alt={photo.alt[lang]} fetchPriority="high" />
      <div className="area-hero-shade" aria-hidden="true" />
      <div className="shell area-hero-shell">
        <a className="area-back text-link" href="/#services"><ArrowLeft size={18} />{es ? 'Todas las soluciones' : 'All solutions'}</a>
        <div className="area-hero-copy">
          <p className="area-category">{service.title[lang]}</p>
          <h1>{content.headline}</h1>
          <p className="area-summary">{content.summary}</p>
          <div className="area-header-actions">
            <a className="button button-primary" href="#servicios">{es ? 'Encuentra tu solución' : 'Find your solution'}<ArrowRight size={19} /></a>
            <button className="area-hero-link" onClick={() => onOpenBooking(service.title[lang])}>{es ? 'Hablemos' : 'Let’s talk'}<ArrowUpRight size={18} /></button>
          </div>
        </div>
        <a className="area-photo-credit" href={photo.source} target="_blank" rel="noreferrer">{es ? 'Fotografía' : 'Photography'}: {photo.credit}</a>
      </div>
    </header>}
    <div className="shell area-content">
      <section className="area-services" id="servicios" aria-labelledby="area-services-title">
        <div className="area-section-intro"><h2 id="area-services-title">{es ? '¿Qué necesitas resolver?' : 'What do you need to solve?'}</h2><p>{es ? 'Elige el reto que reconoces en tu negocio.' : 'Choose the challenge you recognize in your business.'}</p></div>
        <AreaServiceExplorer key={service.id} offerings={content.offerings} areaId={service.id} es={es} />
      </section>
    </div>
    <nav className="area-related" aria-label={es ? 'Otras áreas de soluciones' : 'Other solution areas'}>
      <div className="shell area-related-shell"><h2>{es ? 'Explora también' : 'Explore more'}</h2><div className="area-related-links">{services.filter(item => item.id !== service.id).map(item => <a key={item.id} href={`/soluciones/${item.id}`}><span><strong>{solutionAreaDetails[item.id][lang].choice}</strong><small>{item.title[lang]}</small></span><ArrowUpRight size={20} aria-hidden="true" /></a>)}</div></div>
    </nav>
  </article>;
}
