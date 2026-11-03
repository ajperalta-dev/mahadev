import type { Language } from '../types';

export type Offering = { icon: string; title: string; need: string; action: string; outcome: string; from: string; to: string };
type AreaDetails = { headline: string; summary: string; choice: string; offerings: Offering[] };
type OfferingRow = [icon: string, title: string, need: string, action: string, outcome: string, from: string, to: string];
const offerings = (rows: OfferingRow[]): Offering[] => rows.map(([icon, title, need, action, outcome, from, to]) => ({ icon, title, need, action, outcome, from, to }));

export const solutionAreaDetails: Record<string, Record<Language, AreaDetails>> = {
  'digital-transformation-assessment': {
    es: {
      headline: 'Decide qué transformar primero',
      summary: 'Un diagnóstico de tu negocio y un plan para invertir con criterio.',
      choice: 'Necesito saber por dónde empezar',
      offerings: offerings([
        ['search', 'Diagnóstico digital', 'No sé en qué punto estamos', 'Revisamos tus procesos, datos, sistemas y capacidades para detectar oportunidades de mejora.', 'Diagnóstico de madurez y brechas digitales.', 'Tu situación actual', 'Un punto de partida claro'],
        ['compass', 'Estrategia', 'Hay ideas, faltan prioridades', 'Alineamos las iniciativas digitales con tus objetivos de negocio y la inversión disponible.', 'Prioridades y criterios para decidir dónde invertir.', 'Ideas dispersas', 'Prioridades compartidas'],
        ['workflow', 'Procesos', 'El trabajo se atasca', 'Localizamos tareas duplicadas y cuellos de botella. Simplificamos el proceso antes de digitalizarlo.', 'Mapa de procesos y oportunidades de simplificación.', 'Pasos innecesarios', 'Un proceso más simple'],
        ['network', 'Arquitectura', 'Los sistemas no encajan', 'Revisamos herramientas e integraciones y definimos cómo deberían conectarse.', 'Arquitectura objetivo y recomendaciones técnicas.', 'Herramientas aisladas', 'Una arquitectura coherente'],
        ['route', 'Roadmap', 'La estrategia no tiene un plan', 'Ordenamos las iniciativas por valor, esfuerzo y dependencias, con responsables y próximos pasos.', 'Roadmap priorizado y plan de la primera fase.', 'Una meta sin recorrido', 'Un plan para avanzar'],
      ]),
    },
    en: {
      headline: 'Decide what to transform first',
      summary: 'A business assessment and a practical plan to guide your investment.',
      choice: 'I need to know where to start',
      offerings: offerings([
        ['search', 'Digital assessment', 'I don’t know where we stand', 'We review your processes, data, systems and capabilities to identify opportunities for improvement.', 'A digital maturity and gap assessment.', 'Your current situation', 'A clear starting point'],
        ['compass', 'Strategy', 'Plenty of ideas, few priorities', 'We align digital initiatives with your business goals and available investment.', 'Priorities and criteria for investment decisions.', 'Scattered ideas', 'Shared priorities'],
        ['workflow', 'Processes', 'Work keeps getting stuck', 'We find duplicated tasks and bottlenecks, simplifying the process before digitizing it.', 'Process maps and simplification opportunities.', 'Unnecessary steps', 'A simpler process'],
        ['network', 'Architecture', 'Our systems don’t fit together', 'We review tools and integrations and define how they should connect.', 'A target architecture and technical recommendations.', 'Isolated tools', 'A coherent architecture'],
        ['route', 'Roadmap', 'Our strategy has no action plan', 'We order initiatives by value, effort and dependencies, with owners and next steps.', 'A prioritized roadmap and a plan for the first phase.', 'A goal without a path', 'A plan to move forward'],
      ]),
    },
  },
  'data-automation-operations-intelligence': {
    es: {
      headline: 'Conecta tus datos. Controla tu operación.',
      summary: 'Indicadores claros y tareas automatizadas para decidir y actuar a tiempo.',
      choice: 'Necesito conectar datos y automatizar',
      offerings: offerings([
        ['database', 'Integración de datos', 'Cada equipo tiene una versión distinta', 'Conectamos tus fuentes y acordamos reglas de calidad y métricas comunes.', 'Datos integrados y un modelo de información compartido.', 'Fuentes dispersas', 'Información fiable'],
        ['chart', 'BI y dashboards', 'Preparamos informes a mano', 'Creamos cuadros de mando por rol y automatizamos la actualización de indicadores.', 'Dashboards de negocio e informes automáticos.', 'Hojas e informes', 'Indicadores a la vista'],
        ['workflow', 'Automatización', 'Copiamos datos entre herramientas', 'Conectamos aplicaciones para ejecutar tareas, avisos y actualizaciones con controles de errores.', 'Flujos automatizados con seguimiento de excepciones.', 'Tareas repetitivas', 'Flujos conectados'],
        ['tower', 'Control Tower', 'Detectamos los problemas tarde', 'Reunimos indicadores, alertas y responsables en una vista común de la operación.', 'Un panel operativo para coordinar la respuesta.', 'Incidencias aisladas', 'Visibilidad y coordinación'],
      ]),
    },
    en: {
      headline: 'Connect your data. Control your operations.',
      summary: 'Clear metrics and automated tasks to make decisions and act in time.',
      choice: 'I need connected data and automation',
      offerings: offerings([
        ['database', 'Data integration', 'Every team has a different version', 'We connect your sources and agree on quality rules and shared metrics.', 'Integrated data and a shared information model.', 'Scattered sources', 'Reliable information'],
        ['chart', 'BI and dashboards', 'We prepare reports by hand', 'We build role-specific dashboards and automate metric updates.', 'Business dashboards and automated reports.', 'Spreadsheets and reports', 'Metrics in view'],
        ['workflow', 'Automation', 'We copy data between tools', 'We connect applications to run tasks, notifications and updates with error controls.', 'Automated workflows with exception monitoring.', 'Repetitive tasks', 'Connected workflows'],
        ['tower', 'Control Tower', 'We discover problems too late', 'We bring metrics, alerts and response owners into a shared operational view.', 'An operations panel to coordinate action.', 'Isolated incidents', 'Visibility and coordination'],
      ]),
    },
  },
  'ai-industry-40': {
    es: {
      headline: 'Inteligencia aplicada a tu operación',
      summary: 'Agentes de IA, modelos predictivos y tecnología conectada a tu operación.',
      choice: 'Necesito aplicar IA y anticiparme',
      offerings: offerings([
        ['bot', 'AI Agents', 'Cuesta encontrar y usar el conocimiento', 'Creamos agentes conectados a tus documentos y herramientas, con permisos y revisión humana.', 'Un agente que consulta información y apoya tareas.', 'Conocimiento disperso', 'Un asistente conectado'],
        ['brain', 'Machine Learning', 'Las reglas actuales no son suficientes', 'Entrenamos y evaluamos modelos para clasificar, detectar patrones o estimar resultados con tus datos.', 'Un modelo validado e integrado en tu proceso.', 'Datos históricos', 'Patrones útiles'],
        ['forecast', 'Predictive Analytics', 'Necesitamos prever demanda y recursos', 'Construimos previsiones y medimos su precisión para apoyar la planificación.', 'Previsiones conectadas a tus decisiones de negocio.', 'Decisiones reactivas', 'Una visión anticipada'],
        ['maintenance', 'Predictive Maintenance', 'Las averías nos toman por sorpresa', 'Analizamos señales e históricos para detectar anomalías y apoyar el mantenimiento según el estado del equipo.', 'Alertas de riesgo adaptadas a tus activos.', 'Señales de equipos', 'Alertas para planificar'],
        ['factory', 'Industrial Digitalization', 'La planta está desconectada del negocio', 'Conectamos máquinas y sistemas de gestión para hacer visible el rendimiento de los procesos.', 'Datos de planta integrados e indicadores industriales.', 'Máquinas aisladas', 'Una planta conectada'],
      ]),
    },
    en: {
      headline: 'Intelligence applied to your operations',
      summary: 'AI agents, predictive models and technology connected to your operations.',
      choice: 'I need AI and predictive capabilities',
      offerings: offerings([
        ['bot', 'AI Agents', 'Knowledge is hard to find and use', 'We build agents connected to your documents and tools, with access controls and human review.', 'An agent that retrieves information and supports tasks.', 'Scattered knowledge', 'A connected assistant'],
        ['brain', 'Machine Learning', 'Our current rules aren’t enough', 'We train and evaluate models to classify, detect patterns or estimate outcomes using your data.', 'A validated model integrated into your process.', 'Historical data', 'Useful patterns'],
        ['forecast', 'Predictive Analytics', 'We need to forecast demand and resources', 'We develop forecasts and measure their accuracy to support planning.', 'Forecasts connected to business decisions.', 'Reactive decisions', 'A view ahead'],
        ['maintenance', 'Predictive Maintenance', 'Breakdowns take us by surprise', 'We analyze signals and history to detect anomalies and support condition-based maintenance.', 'Risk alerts tailored to your assets.', 'Equipment signals', 'Alerts for planning'],
        ['factory', 'Industrial Digitalization', 'The plant is disconnected from the business', 'We connect machines and management systems to make process performance visible.', 'Integrated plant data and industrial metrics.', 'Isolated machines', 'A connected plant'],
      ]),
    },
  },
  'transformation-partner': {
    es: {
      headline: 'Tu socio de transformación',
      summary: 'Dirección, ejecución y aprendizaje para sostener la transformación de tu organización.',
      choice: 'Necesito un socio que nos acompañe',
      offerings: offerings([
        ['compass', 'Advisory', 'Falta criterio para tomar decisiones', 'Aportamos dirección externa para revisar prioridades, resolver dudas y orientar la inversión.', 'Decisiones acompañadas y prioridades actualizadas.', 'Decisiones pendientes', 'Una dirección compartida'],
        ['build', 'Implementación', 'Los planes no llegan a ejecutarse', 'Acompañamos la puesta en marcha y coordinamos equipos, dependencias y próximos pasos.', 'Iniciativas en ejecución con seguimiento y responsables.', 'Planes sin ejecutar', 'Avances concretos'],
        ['training', 'Formación', 'Dependemos de unas pocas personas', 'Formamos al equipo sobre sus proyectos y transferimos el conocimiento necesario para mantener las soluciones.', 'Un equipo capacitado y materiales de trabajo.', 'Conocimiento concentrado', 'Capacidades compartidas'],
        ['governance', 'Gobernanza', 'Cada proyecto va por su lado', 'Acordamos roles, criterios y seguimiento para alinear las iniciativas con el negocio.', 'Un modelo de gobierno con responsabilidades claras.', 'Proyectos desconectados', 'Prioridades alineadas'],
        ['improve', 'Mejora continua', 'El cambio termina con el lanzamiento', 'Revisamos adopción, resultados y nuevas necesidades para decidir qué mejorar después.', 'Revisiones periódicas y un backlog de mejoras.', 'Una entrega aislada', 'Evolución sostenida'],
      ]),
    },
    en: {
      headline: 'Your transformation partner',
      summary: 'Guidance, execution and learning to sustain your organization’s transformation.',
      choice: 'I need an ongoing transformation partner',
      offerings: offerings([
        ['compass', 'Advisory', 'We need guidance for decisions', 'We provide external direction to review priorities, resolve questions and guide investment.', 'Supported decisions and updated priorities.', 'Pending decisions', 'A shared direction'],
        ['build', 'Implementation', 'Plans never reach execution', 'We support delivery and coordinate teams, dependencies and next steps.', 'Initiatives in progress with tracking and clear owners.', 'Unexecuted plans', 'Practical progress'],
        ['training', 'Training', 'We depend on a few individuals', 'We train teams on their own projects and transfer the knowledge needed to maintain solutions.', 'A capable team and everyday working materials.', 'Concentrated knowledge', 'Shared capabilities'],
        ['governance', 'Governance', 'Every project goes its own way', 'We agree on roles, criteria and tracking to align initiatives with the business.', 'A governance model with clear responsibilities.', 'Disconnected projects', 'Aligned priorities'],
        ['improve', 'Continuous improvement', 'Change ends at launch', 'We review adoption, outcomes and emerging needs to decide what to improve next.', 'Regular reviews and an improvement backlog.', 'A one-off delivery', 'Sustained evolution'],
      ]),
    },
  },
};
