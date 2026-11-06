import type { CSSProperties, ReactNode } from 'react';
import { BellRing, Bot, Check, CheckCircle2, Cog, Database, FileSpreadsheet, Mail, Monitor, Play, Search, Settings2, ShieldCheck, UserRound, Wrench } from 'lucide-react';
import './serviceIllustrations.css';

const scenes = {
  'digital-transformation-assessment:search': 'diagnosis',
  'digital-transformation-assessment:compass': 'strategy',
  'digital-transformation-assessment:workflow': 'process',
  'digital-transformation-assessment:network': 'architecture',
  'digital-transformation-assessment:route': 'roadmap',
  'data-automation-operations-intelligence:database': 'integration',
  'data-automation-operations-intelligence:chart': 'dashboard',
  'data-automation-operations-intelligence:workflow': 'automation',
  'data-automation-operations-intelligence:tower': 'control-tower',
  'ai-industry-40:bot': 'agent',
  'ai-industry-40:brain': 'learning',
  'ai-industry-40:forecast': 'forecast',
  'ai-industry-40:maintenance': 'maintenance',
  'ai-industry-40:factory': 'industry',
  'transformation-partner:compass': 'advisory',
  'transformation-partner:build': 'implementation',
  'transformation-partner:training': 'training',
  'transformation-partner:governance': 'governance',
  'transformation-partner:improve': 'improvement',
} as const;

type Scene = typeof scenes[keyof typeof scenes];
const sequence = (index: number): CSSProperties => ({ '--scene-step': index } as CSSProperties);

function Reveal({ children, step = 0 }: { children: ReactNode; step?: number }) {
  return <g className="ill-reveal" style={sequence(step)}>{children}</g>;
}

function Draw({ d, step = 0, className = '' }: { d: string; step?: number; className?: string }) {
  return <path d={d} pathLength={1} className={`ill-draw ${className}`} style={sequence(step)} />;
}

function Document({ x, y, width = 48, height = 60 }: { x: number; y: number; width?: number; height?: number }) {
  return <svg x={x} y={y} width={width} height={height} viewBox="0 0 48 60" aria-hidden="true">
    <path className="ill-paper" d="M1 1H33L47 15V59H1ZM33 1V15H47" />
    <path className="ill-muted" d="M10 26H36M10 35H36M10 44H27" />
  </svg>;
}

function Person({ x, y, size = 38 }: { x: number; y: number; size?: number }) {
  return <UserRound x={x} y={y} width={size} height={size} strokeWidth={1.3} />;
}

function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return <text x={x} y={y} textAnchor="middle" className="ill-label">{children}</text>;
}

function IllustrationScene({ scene, es }: { scene: Scene; es: boolean }) {
  switch (scene) {
    case 'diagnosis':
      return <>
        <rect className="ill-paper" x="126" y="18" width="260" height="164" rx="7" />
        <path className="ill-muted" d="M150 42H260M150 58H223M150 82H331M150 114H331M150 146H331" />
        {[82, 114, 146].map((y, index) => <Reveal key={y} step={index + 3}><Check x={348} y={y - 10} width={20} height={20} /></Reveal>)}
        <path className="ill-audit-scan" d="M137 66H375" />
        <g transform="translate(373 89)"><g className="ill-audit-lens"><circle className="ill-paper" cx="24" cy="24" r="31" /><path d="M47 47L78 78" strokeWidth="7" /><Search x={9} y={9} width={30} height={30} /></g></g>
        <Label x={256} y={172}>{es ? 'Procesos · Datos · Sistemas' : 'Processes · Data · Systems'}</Label>
      </>;
    case 'strategy':
      return <>
        <path className="ill-muted" d="M83 164H287M99 174V20M99 91H287M193 20V164" />
        <rect className="ill-zone" x="198" y="25" width="84" height="60" rx="4" />
        {[[132, 132], [151, 67], [227, 125], [254, 49]].map(([x, y], index) => <Reveal key={x} step={index}><circle cx={x} cy={y} r="7" /></Reveal>)}
        <Label x={193} y={193}>{es ? 'Priorizar por valor' : 'Prioritize by value'}</Label>
        <Draw d="M305 91H367M358 83L367 91L358 99" step={4} />
        <circle cx="433" cy="91" r="56" className="ill-muted" /><circle cx="433" cy="91" r="37" className="ill-muted" /><circle cx="433" cy="91" r="16" />
        <circle className="ill-strategy-choice ill-solid" cx="254" cy="49" r="7" />
        <Label x={433} y={176}>{es ? 'Objetivo de negocio' : 'Business goal'}</Label>
      </>;
    case 'process':
      return <>
        <Label x={71} y={32}>{es ? 'Actual' : 'Current'}</Label>
        <path className="ill-muted" strokeDasharray="4 5" d="M112 52H175V82H238V52H301V82H364V52H451V82" />
        {[112, 175, 238, 301, 364, 451].map((x, index) => <rect key={x} className={index === 2 || index === 3 ? 'ill-process-rework' : 'ill-paper'} x={x - 15} y={index % 2 ? 67 : 37} width="30" height="30" rx="4" />)}
        <Label x={71} y={137}>{es ? 'Simplificado' : 'Simplified'}</Label>
        <Draw d="M137 151H451" step={3} />
        {[155, 293, 431].map((x, index) => <Reveal key={x} step={index + 3}><rect className="ill-paper" x={x - 25} y="126" width="50" height="50" rx="6" /><Check x={x - 10} y={141} width={20} height={20} /></Reveal>)}
        <circle className="ill-process-token ill-solid" cx="155" cy="151" r="5" />
      </>;
    case 'architecture':
      return <>
        <Monitor x={49} y={45} width={58} height={48} /><Database x={59} y={126} width={39} height={39} />
        <Draw d="M107 69H160V51H198M98 145H160V151H198" step={1} />
        {[22, 75, 128].map((y, index) => <Reveal key={y} step={index + 1}><rect className="ill-paper" x="198" y={y} width="272" height="41" rx="5" /><path className="ill-muted" d={`M214 ${y + 15}H242M214 ${y + 26}H233`} /><Label x={342} y={y + 26}>{(es ? ['Aplicaciones', 'Integración / API', 'Datos'] : ['Applications', 'Integration / API', 'Data'])[index]}</Label></Reveal>)}
        <path className="ill-architecture-bus" d="M493 42V148M470 42H493M470 95H493M470 148H493" />
        <circle className="ill-architecture-packet ill-solid" cx="493" cy="42" r="4" />
      </>;
    case 'roadmap':
      return <>
        <Draw d="M55 157H156V120H275V83H394V46H497" className="ill-roadmap-track" />
        {[[55, 157], [156, 120], [275, 83], [394, 46]].map(([x, y], index) => <g key={x}><circle className="ill-paper" cx={x} cy={y} r="10" /><circle className="ill-roadmap-point ill-solid" style={sequence(index)} cx={x} cy={y} r="5" /><path className="ill-muted" d={`M${x - 15} ${y + 26}H${x + 29}M${x - 15} ${y + 34}H${x + 13}`} /></g>)}
        <Reveal step={7}><path d="M497 72V18L526 28L497 39" /><Check x={507} y={81} width={23} height={23} /></Reveal>
      </>;
    case 'integration':
      return <>
        <FileSpreadsheet x={53} y={17} width={40} height={40} /><Database x={53} y={79} width={40} height={40} /><Document x={57} y={143} width={32} height={40} />
        <path className="ill-muted" d="M103 37H164L230 100M103 100H230M103 163H164L230 100M321 100H415" />
        <path className="ill-integration-stream" d="M103 37H164L230 100M103 100H230M103 163H164L230 100M321 100H415" />
        <rect className="ill-paper" x="230" y="66" width="91" height="68" rx="7" /><Settings2 x={251} y={80} width={48} height={39} />
        <Reveal step={5}><Database x={416} y={51} width={84} height={98} /><CheckCircle2 className="ill-verified" x={480} y={119} width={29} height={29} /></Reveal>
        <Label x={276} y={160}>{es ? 'Integrar y validar' : 'Integrate and validate'}</Label>
      </>;
    case 'dashboard':
      return <>
        <rect className="ill-paper" x="65" y="12" width="430" height="176" rx="8" />
        {[83, 218, 353].map((x, index) => <Reveal key={x} step={index}><rect className="ill-muted" x={x} y="28" width="119" height="43" rx="4" /><path className="ill-muted" d={`M${x + 12} 40H${x + 61}`} /><path d={`M${x + 12} 56H${x + 44}`} strokeWidth="4" /></Reveal>)}
        <path className="ill-muted" d="M89 164H302M89 105H302M89 135H302" />
        <g className="ill-dashboard-bars">{[35, 59, 45, 73, 62, 84].map((height, index) => <rect key={index} className="ill-solid" style={sequence(index)} x={100 + index * 34} y={164 - height} width="18" height={height} rx="2" />)}</g>
        <circle className="ill-dashboard-live" cx="89" cy="135" r="4" />
        <circle className="ill-muted" cx="405" cy="126" r="34" strokeWidth="10" /><circle className="ill-dashboard-donut" cx="405" cy="126" r="34" pathLength={1} />
        <Check x={392} y={113} width={26} height={26} />
      </>;
    case 'automation':
      return <>
        <Draw d="M109 102H455M163 94L171 102L163 110M366 94L374 102L366 110" />
        {[49, 237, 425].map((x, index) => <Reveal key={x} step={index * 2}><rect className="ill-paper" x={x} y="54" width="86" height="98" rx="7" /><path className="ill-muted" d={`M${x} 76H${x + 86}M${x + 12} 66H${x + 30}`} /></Reveal>)}
        <FileSpreadsheet x={72} y={92} width={40} height={40} /><Mail x={258} y={94} width={43} height={35} /><CheckCircle2 x={449} y={92} width={39} height={39} />
        <g transform="translate(186 102)"><Cog className="ill-automation-gear" x={-18} y={-18} width={36} height={36} /></g>
        <g transform="translate(374 102)"><Cog className="ill-automation-gear reverse" x={-18} y={-18} width={36} height={36} /></g>
        <rect className="ill-automation-task ill-solid" x="84" y="166" width="18" height="8" rx="3" />
        <path className="ill-muted" d="M82 170H479" />
      </>;
    case 'control-tower':
      return <>
        <rect className="ill-paper" x="46" y="19" width="343" height="164" rx="7" />
        <path className="ill-muted" d="M65 148L115 94L173 112L222 60L282 86L365 42M65 50L144 64L180 155L276 133L365 161" />
        <circle className="ill-muted" cx="223" cy="101" r="65" /><circle className="ill-muted" cx="223" cy="101" r="36" />
        <g transform="translate(223 101)"><path className="ill-tower-sweep" d="M0 0V-65A65 65 0 0 1 56-32Z" /></g>
        {[[115, 94], [173, 112], [282, 86], [276, 133]].map(([x, y]) => <circle key={x} className="ill-paper" cx={x} cy={y} r="6" />)}
        <circle className="ill-tower-alert ill-paper" cx="282" cy="86" r="15" /><path d="M282 77V87M282 93V94" strokeWidth="2.5" />
        <Draw d="M389 86H445V119" step={6} /><Person x={446} y={126} size={40} />
        <Reveal step={6}><BellRing x={441} y={30} width={47} height={44} /></Reveal>
        <Label x={467} y={188}>{es ? 'Responsable' : 'Owner'}</Label>
      </>;
    case 'agent':
      return <>
        <Bot x={101} y={74} width={91} height={85} strokeWidth={1.3} />
        <Reveal><path className="ill-paper" d="M53 13H213V53H154L140 67V53H53Z" /><path className="ill-muted" d="M69 28H192M69 40H166" /></Reveal>
        <path className="ill-agent-query" d="M199 111H269V50H331M199 123H269V152H360" />
        <g className="ill-agent-documents"><Document x={330} y={18} /><Document x={384} y={25} /><Document x={438} y={18} /></g>
        <Reveal step={5}><rect className="ill-paper" x="359" y="113" width="151" height="68" rx="6" /><path className="ill-muted" d="M359 132H510M371 123H394" /><Check x={373} y={144} width={22} height={22} /><path d="M410 154H489" /></Reveal>
        <g className="ill-agent-answer"><path className="ill-paper" d="M42 169H185V195H42Z" /><circle className="ill-solid" cx="87" cy="182" r="3" /><circle className="ill-solid" cx="112" cy="182" r="3" /><circle className="ill-solid" cx="137" cy="182" r="3" /></g>
      </>;
    case 'learning':
      return <>
        {[[46, 44], [86, 83], [52, 126], [114, 151]].map(([x, y], index) => <Reveal key={x} step={index}><circle cx={x} cy={y} r="7" /><rect className="ill-muted" x={x + 40} y={y - 8} width="13" height="13" rx="1" /></Reveal>)}
        <path className="ill-ml-links" d="M223 46L278 72L333 46M223 46L278 128L333 100M223 100L278 72L333 154M223 100L278 128L333 46M223 154L278 72L333 100M223 154L278 128L333 154" />
        {[223, 278, 333].map((x, column) => <g key={x}>{(column === 1 ? [72, 128] : [46, 100, 154]).map((y, index) => <circle key={y} className="ill-ml-neuron ill-paper" style={sequence(column + index)} cx={x} cy={y} r="10" />)}</g>)}
        <Draw d="M161 100H200M355 100H389" step={3} />
        <rect className="ill-muted" x="408" y="20" width="103" height="68" rx="5" /><rect className="ill-muted" x="408" y="113" width="103" height="68" rx="5" />
        <Reveal step={6}>{[430, 459, 488].map(x => <circle key={x} cx={x} cy="54" r="7" />)}</Reveal>
        <Reveal step={8}>{[430, 459, 488].map(x => <rect key={x} x={x - 7} y="140" width="14" height="14" />)}</Reveal>
      </>;
    case 'forecast':
      return <>
        <path className="ill-muted" d="M44 158H516M44 111H516M44 64H516" />
        <path className="ill-forecast-band" d="M307 91Q391 32 512 20V101Q391 96 307 91Z" />
        <Draw d="M44 148L85 119L126 131L167 98L208 116L249 76L307 91" />
        <path className="ill-muted" strokeDasharray="4 5" d="M307 22V169" />
        <path className="ill-forecast-future" pathLength={1} d="M307 91Q400 48 512 50" />
        <circle className="ill-forecast-point ill-solid" cx="307" cy="91" r="5" />
        <Label x={167} y={190}>{es ? 'Histórico' : 'History'}</Label><Label x={411} y={190}>{es ? 'Previsión' : 'Forecast'}</Label>
      </>;
    case 'maintenance':
      return <>
        <path d="M67 146H222M87 146V132M198 146V132M92 70V55H177V70" />
        <rect className="ill-paper" x="77" y="70" width="130" height="62" rx="14" /><path d="M207 94H234V109H207M66 89H77M66 115H77" />
        <g transform="translate(116 101)"><Cog className="ill-motor-spin" x={-20} y={-20} width={40} height={40} /></g>
        <circle className="ill-maintenance-sensor ill-solid" cx="180" cy="77" r="5" />
        <path className="ill-muted" d="M185 77H259V101H301" />
        <rect className="ill-paper" x="301" y="43" width="204" height="116" rx="7" />
        <path className="ill-muted" strokeDasharray="4 5" d="M316 80H490" />
        <Draw d="M316 116L329 112L342 121L355 105L368 117L381 96L394 122L407 67L420 108L433 100L446 112L459 92L477 106" className="ill-vibration" />
        <circle className="ill-maintenance-alert" cx="407" cy="67" r="10" /><Wrench x={454} y={9} width={27} height={27} />
        <Label x={141} y={180}>{es ? 'Estado del equipo' : 'Equipment condition'}</Label><Label x={405} y={180}>{es ? 'Detección de anomalías' : 'Anomaly detection'}</Label>
      </>;
    case 'industry':
      return <>
        <path d="M38 149H402V178H38ZM52 178V191M386 178V191" />
        {[65, 140, 215, 290, 365].map(x => <circle key={x} className="ill-muted" cx={x} cy="164" r="8" />)}
        <rect className="ill-paper" x="55" y="82" width="84" height="67" rx="4" /><path d="M68 95H126M68 107H110" />
        <path d="M214 149V111L242 80M242 80L280 98L305 78M242 80L221 57" strokeWidth="5" />
        <circle className="ill-paper" cx="242" cy="80" r="8" />
        <g className="ill-conveyor-box"><rect className="ill-paper" x="155" y="121" width="30" height="28" rx="2" /><path d="M170 122V132" /></g>
        <path className="ill-industrial-data" d="M97 82V34H415M242 66V34H415" />
        <rect className="ill-paper" x="415" y="12" width="96" height="101" rx="6" /><Database x={439} y={30} width={48} height={48} /><path className="ill-muted" d="M431 94H495" />
        <Reveal step={5}><CheckCircle2 x={450} y={135} width={28} height={28} /></Reveal>
      </>;
    case 'advisory':
      return <>
        <Person x={64} y={100} size={58} /><Person x={438} y={100} size={58} />
        <path className="ill-muted" d="M117 162H445M152 163V185M411 163V185" />
        <rect className="ill-paper" x="202" y="63" width="155" height="99" rx="5" />
        <path className="ill-muted" strokeDasharray="4 4" d="M226 137V108H258V84H331" />
        <Draw d="M226 137H290V107H331M324 100L331 107L324 114" step={4} />
        <g className="ill-advisory-left"><path className="ill-paper" d="M38 28H155V66H113L101 79V66H38Z" /><path className="ill-muted" d="M52 42H139M52 53H118" /></g>
        <g className="ill-advisory-right"><path className="ill-paper" d="M403 20H520V58H464L451 72V58H403Z" /><Check x={448} y={27} width={26} height={26} /></g>
      </>;
    case 'implementation':
      return <>
        <rect className="ill-paper" x="58" y="14" width="444" height="164" rx="7" />
        <path className="ill-muted" d="M206 14V178M354 14V178M58 50H502" />
        <Label x={132} y={37}>{es ? 'Por hacer' : 'To do'}</Label><Label x={280} y={37}>{es ? 'En marcha' : 'In progress'}</Label><Label x={428} y={37}>{es ? 'Hecho' : 'Done'}</Label>
        {[99, 133].map(y => <rect key={y} className="ill-muted" x="77" y={y} width="110" height="24" rx="3" />)}
        <g className="ill-implementation-card"><rect className="ill-paper" x="77" y="65" width="110" height="26" rx="4" /><path d="M88 78H138" /><Check x={159} y={70} width={17} height={17} /></g>
        <path className="ill-muted" d="M59 190H501" /><path className="ill-implementation-progress" pathLength={1} d="M59 190H501" strokeWidth="3" />
      </>;
    case 'training':
      return <>
        <rect className="ill-paper" x="43" y="43" width="157" height="106" rx="6" /><path d="M31 149H212L202 162H42Z" /><Play x={101} y={75} width={39} height={39} />
        <Draw d="M218 101H274M266 93L274 101L266 109" step={2} />
        <path className="ill-paper" d="M286 72Q310 65 334 76V127Q310 116 286 124ZM334 76Q358 65 382 72V124Q358 116 334 127Z" /><path className="ill-muted" d="M296 86L323 89M296 99L323 102M345 89L372 86M345 102L372 99" />
        {[20, 82, 144].map((y, index) => <g key={y} className="ill-training-person" style={sequence(index)}><Person x={448} y={y} size={38} /><CheckCircle2 x={490} y={y + 9} width={21} height={21} /></g>)}
        <path className="ill-training-transfer" d="M382 99H414V39H443M382 99H443M382 99H414V163H443" />
      </>;
    case 'governance':
      return <>
        <ShieldCheck x={258} y={7} width={44} height={49} />
        <Draw d="M280 58V75H111V96M280 75V96M280 75H449V96" />
        {[111, 280, 449].map((x, index) => <Reveal key={x} step={index + 2}><Person x={x - 19} y={98} size={38} /><rect className="ill-paper" x={x - 55} y="147" width="110" height="42" rx="4" /><Check x={x - 43} y={157} width={20} height={20} /><path className="ill-muted" d={`M${x - 12} 161H${x + 40}M${x - 12} 173H${x + 25}`} /></Reveal>)}
        <path className="ill-governance-check" d="M111 137V147M280 137V147M449 137V147" />
      </>;
    case 'improvement':
      return <>
        <circle className="ill-muted" cx="280" cy="100" r="78" />
        <g transform="translate(280 100)"><g className="ill-improvement-cycle"><path d="M-70-35A78 78 0 0 1 35-70M35-70L24-69M35-70L32-58M70 35A78 78 0 0 1-35 70M-35 70L-24 69M-35 70L-32 58" /></g></g>
        <path className="ill-muted" d="M232 132H328M232 132V70" /><Draw d="M239 119L258 108L276 113L296 89L320 75" />
        <circle className="ill-improvement-point ill-solid" cx="320" cy="75" r="4" />
        <Search x={106} y={82} width={33} height={33} /><Settings2 x={422} y={82} width={33} height={33} />
        <path className="ill-muted" d="M145 100H197M363 100H415" />
        <Label x={123} y={139}>{es ? 'Revisar' : 'Review'}</Label><Label x={440} y={139}>{es ? 'Mejorar' : 'Improve'}</Label>
      </>;
  }
}

export function ServiceIllustration({ areaId, icon, title, es }: { areaId: string; icon: string; title: string; es: boolean }) {
  const scene = scenes[`${areaId}:${icon}` as keyof typeof scenes];
  if (!scene) return null;
  return <svg className={`area-sketch-graphic service-illustration scene-${scene}`} data-illustration={scene} viewBox="0 0 560 200" role="img" aria-label={es ? `Animación ilustrativa: ${title}` : `Illustrative animation: ${title}`}>
    <IllustrationScene scene={scene} es={es} />
  </svg>;
}
