import { useState, type CSSProperties } from 'react';
import { ArrowRight, BarChart3, Bot, BrainCircuit, Check, ChevronDown, Compass, Database, Factory, GraduationCap, Hammer, Network, RefreshCw, Route, ScanSearch, ShieldCheck, TrendingUp, Workflow, Wrench, type LucideIcon } from 'lucide-react';
import type { Offering } from '../../data/solutionAreaDetails';

const icons: Record<string, LucideIcon> = {
  search: ScanSearch, compass: Compass, workflow: Workflow, network: Network, route: Route,
  database: Database, chart: BarChart3, tower: BarChart3, bot: Bot, brain: BrainCircuit,
  forecast: TrendingUp, maintenance: Wrench, factory: Factory, build: Hammer,
  training: GraduationCap, governance: ShieldCheck, improve: RefreshCw,
};

function ServiceSketch({ offering, es }: { offering: Offering; es: boolean }) {
  const Icon = icons[offering.icon] ?? Compass;
  const isSignal = ['brain', 'forecast', 'maintenance'].includes(offering.icon);
  const isDashboard = ['chart', 'tower'].includes(offering.icon);
  const isNetwork = ['database', 'network', 'bot', 'factory', 'training'].includes(offering.icon);

  return <figure className="area-sketch">
    <svg viewBox="0 0 560 156" role="img" aria-label={es ? `Esquema ilustrativo: ${offering.title}` : `Illustrative diagram: ${offering.title}`}>
      {isSignal ? <>
        <path className="sketch-grid" d="M30 32H530M30 76H530M30 120H530" />
        <path className="sketch-muted" d="M30 118L65 94L100 104L135 69L170 89L205 57L240 74L275 44L310 57" />
        <path className="sketch-line" d="M30 110Q70 104 100 96T170 80T240 64T310 52" />
        <path className="sketch-prediction" d="M310 52Q360 44 410 31T530 20" />
        <path className="sketch-grid" d="M310 18V138" />
        <circle className="sketch-dot" cx="310" cy="52" r="5" />
        <Icon x={465} y={94} width={28} height={28} strokeWidth={1.4} />
      </> : isDashboard ? <>
        <rect className="sketch-frame" x="74" y="12" width="412" height="132" rx="8" />
        <path className="sketch-grid" d="M74 40H486M326 40V144" />
        <path className="sketch-muted" d="M91 26H151M433 26H469" />
        <path className="sketch-line" d="M98 119V94M130 119V76M162 119V86M194 119V58M226 119V71M258 119V53M290 119V61" />
        <path className="sketch-muted" d="M349 62H411M349 93H411M349 124H411" />
        <Check x={437} y={51} width={20} height={20} /><Check x={437} y={82} width={20} height={20} /><Check x={437} y={113} width={20} height={20} />
      </> : isNetwork ? <>
        <path className="sketch-muted" d="M102 28H157L221 78M102 78H221M102 128H157L221 78M339 78H396L455 28M339 78H455M339 78H396L455 128" />
        {[10, 60, 110].map(y => <rect key={y} className="sketch-frame" x="66" y={y} width="36" height="36" rx="5" />)}
        <circle className="sketch-focus" cx="280" cy="78" r="49" />
        <Icon x={262} y={60} width={36} height={36} strokeWidth={1.4} />
        {[28, 78, 128].map(y => <g key={y}><circle className="sketch-frame" cx="473" cy={y} r="18" /><Check x={464} y={y - 9} width={18} height={18} /></g>)}
      </> : <>
        <path className="sketch-muted" d="M105 78H455" />
        <rect className="sketch-frame" x="51" y="38" width="108" height="80" rx="6" />
        <path className="sketch-muted" d="M73 61H135M73 78H123M73 95H112" />
        <circle className="sketch-focus" cx="280" cy="78" r="49" />
        <Icon x={262} y={60} width={36} height={36} strokeWidth={1.4} />
        <rect className="sketch-frame" x="401" y="38" width="108" height="80" rx="6" />
        <Check x={437} y={60} width={36} height={36} strokeWidth={1.4} />
        <path className="sketch-line" d="M181 72L187 78L181 84M370 72L376 78L370 84" />
      </>}
    </svg>
    <figcaption><span>{offering.from}</span><ArrowRight size={18} aria-hidden="true" /><strong>{offering.to}</strong></figcaption>
  </figure>;
}

export function AreaServiceExplorer({ offerings, es }: { offerings: Offering[]; es: boolean }) {
  const [active, setActive] = useState(0);

  return <div className="area-service-explorer" style={{ '--offering-count': offerings.length } as CSSProperties}>
    {offerings.map((offering, index) => {
      const Icon = icons[offering.icon] ?? Compass;
      const selected = active === index;
      return <div className={`area-offering${selected ? ' is-selected' : ''}`} key={offering.icon}>
        <h3 className="area-offering-heading" style={{ gridRow: index + 1 }}>
          <button id={`offering-trigger-${index}`} type="button" aria-expanded={selected} aria-controls={`offering-panel-${index}`} aria-disabled={selected || undefined} onClick={() => setActive(index)}>
            <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
            <span><strong>{offering.need}</strong><small>{offering.title}</small></span>
            <ChevronDown className="area-offering-chevron" size={19} aria-hidden="true" />
          </button>
        </h3>
        <div className="area-service-panel" id={`offering-panel-${index}`} role="region" aria-labelledby={`offering-trigger-${index}`} hidden={!selected}>
          {selected && <div className="area-service-detail" key={offering.icon}>
            <h4>{offering.title}</h4>
            <p className="area-service-action">{offering.action}</p>
            <ServiceSketch offering={offering} es={es} />
            <div className="area-service-outcome"><Check size={21} aria-hidden="true" /><div><span>{es ? 'Qué te llevas' : 'What you get'}</span><p>{offering.outcome}</p></div></div>
          </div>}
        </div>
      </div>;
    })}
  </div>;
}
