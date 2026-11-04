import { useState, type CSSProperties } from 'react';
import { ArrowRight, BarChart3, Bot, BrainCircuit, Check, ChevronDown, Compass, Database, Factory, GraduationCap, Hammer, Network, RefreshCw, Route, ScanSearch, ShieldCheck, TrendingUp, Workflow, Wrench, type LucideIcon } from 'lucide-react';
import type { Offering } from '../../data/solutionAreaDetails';
import { ServiceIllustration } from './ServiceIllustration';

const icons: Record<string, LucideIcon> = {
  search: ScanSearch, compass: Compass, workflow: Workflow, network: Network, route: Route,
  database: Database, chart: BarChart3, tower: BarChart3, bot: Bot, brain: BrainCircuit,
  forecast: TrendingUp, maintenance: Wrench, factory: Factory, build: Hammer,
  training: GraduationCap, governance: ShieldCheck, improve: RefreshCw,
};

function ServiceSketch({ offering, areaId, es }: { offering: Offering; areaId: string; es: boolean }) {
  return <figure className="area-sketch">
    <ServiceIllustration areaId={areaId} icon={offering.icon} title={offering.title} es={es} />
    <figcaption><span>{offering.from}</span><ArrowRight size={18} aria-hidden="true" /><strong>{offering.to}</strong></figcaption>
  </figure>;
}
export function AreaServiceExplorer({ offerings, areaId, es }: { offerings: Offering[]; areaId: string; es: boolean }) {
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
            <ServiceSketch offering={offering} areaId={areaId} es={es} />
            <div className="area-service-outcome"><Check size={21} aria-hidden="true" /><div><span>{es ? 'Qué te llevas' : 'What you get'}</span><p>{offering.outcome}</p></div></div>
          </div>}
        </div>
      </div>;
    })}
  </div>;
}
