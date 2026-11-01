import type { Language } from '../types';

type Scenario = { title: string; problem: string; solution: string; deliverable: string };
type AreaDetails = {
  explanation: string;
  scenarios: Scenario[];
  steps: { title: string; description: string }[];
};

export const solutionAreaDetails: Record<string, Record<Language, AreaDetails>> = {
  'digital-transformation-assessment': {
    es: {
      explanation: 'Antes de elegir herramientas, revisamos cómo funciona la organización: sus objetivos, procesos, datos, sistemas y capacidades. Convertimos ese diagnóstico en decisiones concretas sobre dónde actuar, qué dependencias resolver y cómo avanzar con una inversión alineada con el negocio.',
      scenarios: [
        { title: 'Muchas ideas, pocas prioridades', problem: 'Cada equipo propone proyectos digitales, pero falta un criterio común para decidir cuáles abordar primero.', solution: 'Evaluamos valor, esfuerzo, riesgos y dependencias. Priorizamos las iniciativas con las personas responsables del negocio.', deliverable: 'Cartera priorizada de iniciativas y criterios de decisión.' },
        { title: 'Procesos que frenan el trabajo', problem: 'Las tareas manuales, los retrabajos y los pasos duplicados dificultan la operación diaria.', solution: 'Mapeamos el proceso actual, identificamos cuellos de botella y diseñamos un proceso objetivo antes de digitalizarlo.', deliverable: 'Mapa de procesos y oportunidades de simplificación o automatización.' },
        { title: 'Sistemas que no encajan', problem: 'Las herramientas han crecido por separado y cada integración requiere una solución puntual.', solution: 'Revisamos aplicaciones, flujos de datos e integraciones para plantear una arquitectura objetivo y una transición viable.', deliverable: 'Evaluación de arquitectura, brechas y recomendaciones técnicas.' },
        { title: 'Una estrategia sin plan de ejecución', problem: 'La dirección conoce la meta, pero no están claros el alcance, las responsabilidades ni los próximos pasos.', solution: 'Traducimos la estrategia en fases con responsables, dependencias e indicadores para seguir el avance.', deliverable: 'Roadmap de implementación y plan de la primera fase.' },
      ],
      steps: [
        { title: 'Entender el punto de partida', description: 'Entrevistas, revisión de procesos, sistemas y datos, y acuerdo sobre los objetivos.' },
        { title: 'Evaluar y priorizar', description: 'Análisis de oportunidades, viabilidad, dependencias y valor esperado.' },
        { title: 'Definir el roadmap', description: 'Secuencia de iniciativas, arquitectura objetivo y próximos pasos de implementación.' },
      ],
    },
    en: {
      explanation: 'Before choosing tools, we review the organization’s goals, processes, data, systems and capabilities. The assessment becomes a set of practical decisions about where to act, which dependencies to resolve and how to invest in line with business needs.',
      scenarios: [
        { title: 'Many ideas, few priorities', problem: 'Teams propose digital projects without a shared way to decide what comes first.', solution: 'We assess value, effort, risk and dependencies, then prioritize initiatives with business owners.', deliverable: 'A prioritized portfolio and agreed decision criteria.' },
        { title: 'Processes that slow work down', problem: 'Manual tasks, rework and duplicated steps make day-to-day operations harder.', solution: 'We map the current process, identify bottlenecks and design a target process before digitizing it.', deliverable: 'Process maps and simplification or automation opportunities.' },
        { title: 'Systems that do not fit together', problem: 'Tools have grown separately and every integration needs a one-off workaround.', solution: 'We review applications, data flows and integrations to define a target architecture and a viable transition.', deliverable: 'An architecture assessment, gap analysis and technical recommendations.' },
        { title: 'Strategy without an execution plan', problem: 'The destination is clear, but scope, ownership and next steps are not.', solution: 'We translate strategy into phases with owners, dependencies and progress indicators.', deliverable: 'An implementation roadmap and a plan for the first phase.' },
      ],
      steps: [
        { title: 'Understand the starting point', description: 'Interviews, process and system reviews, and agreement on goals.' },
        { title: 'Assess and prioritize', description: 'Evaluate opportunities, feasibility, dependencies and expected value.' },
        { title: 'Define the roadmap', description: 'Sequence initiatives, define the target architecture and plan implementation.' },
      ],
    },
  },
  'data-automation-operations-intelligence': {
    es: {
      explanation: 'La visibilidad operativa necesita datos fiables, indicadores compartidos y procesos conectados. Diseñamos la base de datos e integración, construimos la capa de análisis y automatizamos los flujos que permiten pasar de observar el negocio a actuar sobre lo que está ocurriendo.',
      scenarios: [
        { title: 'Datos repartidos en distintos sistemas', problem: 'Ventas, finanzas y operaciones trabajan con versiones diferentes de la información.', solution: 'Integramos las fuentes, definimos reglas de calidad y unificamos las métricas de negocio.', deliverable: 'Flujos de datos integrados y un modelo compartido de información.' },
        { title: 'Horas preparando informes', problem: 'El equipo dedica demasiado tiempo a reunir hojas de cálculo y actualizar reportes.', solution: 'Automatizamos la preparación y actualización de datos y construimos dashboards adaptados a cada rol.', deliverable: 'Informes automáticos y cuadros de mando con indicadores acordados.' },
        { title: 'Tareas repetitivas entre herramientas', problem: 'Los equipos copian datos, envían avisos y actualizan estados de forma manual.', solution: 'Conectamos los sistemas y automatizamos los pasos del proceso, con controles y tratamiento de excepciones.', deliverable: 'Flujos automatizados e integraciones con seguimiento de errores.' },
        { title: 'Incidencias que se detectan tarde', problem: 'Falta una visión común para saber dónde están los retrasos, las desviaciones o los riesgos operativos.', solution: 'Diseñamos una Control Tower que reúne indicadores, alertas y excepciones para coordinar la respuesta.', deliverable: 'Panel de control operativo con alertas y responsables de actuación.' },
      ],
      steps: [
        { title: 'Conectar y ordenar', description: 'Definimos las fuentes, las métricas y las reglas de calidad e integración.' },
        { title: 'Dar visibilidad y automatizar', description: 'Construimos dashboards y flujos sobre los procesos prioritarios.' },
        { title: 'Controlar y mejorar', description: 'Incorporamos alertas, seguimiento de excepciones y revisión de indicadores.' },
      ],
    },
    en: {
      explanation: 'Operational visibility depends on reliable data, shared metrics and connected processes. We build the data and integration foundation, develop analytics and automate workflows that let teams act on what is happening in the business.',
      scenarios: [
        { title: 'Data spread across different systems', problem: 'Sales, finance and operations work with different versions of information.', solution: 'We integrate sources, define quality rules and align business metrics.', deliverable: 'Integrated data flows and a shared information model.' },
        { title: 'Hours spent preparing reports', problem: 'Teams spend too much time gathering spreadsheets and updating reports.', solution: 'We automate data preparation and refreshes, then build dashboards tailored to each role.', deliverable: 'Automated reports and dashboards with agreed metrics.' },
        { title: 'Repetitive tasks between tools', problem: 'Teams manually copy data, send notifications and update statuses.', solution: 'We connect systems and automate process steps with controls and exception handling.', deliverable: 'Automated workflows and integrations with error monitoring.' },
        { title: 'Issues discovered too late', problem: 'There is no common view of delays, deviations and operational risks.', solution: 'We design a Control Tower that brings together metrics, alerts and exceptions to coordinate responses.', deliverable: 'An operational control panel with alerts and clear response ownership.' },
      ],
      steps: [
        { title: 'Connect and organize', description: 'Define sources, metrics, quality rules and integrations.' },
        { title: 'Create visibility and automate', description: 'Build dashboards and workflows for priority processes.' },
        { title: 'Monitor and improve', description: 'Add alerts, exception tracking and regular metric reviews.' },
      ],
    },
  },
  'ai-industry-40': {
    es: {
      explanation: 'Partimos de una necesidad operativa concreta y comprobamos si los datos y el contexto permiten resolverla con IA. Desarrollamos y evaluamos la solución, la integramos en las herramientas de trabajo y definimos cómo supervisarla, mantenerla y utilizarla con criterio.',
      scenarios: [
        { title: 'Conocimiento difícil de encontrar', problem: 'Los documentos están dispersos y el equipo repite búsquedas y consultas internas.', solution: 'Creamos agentes de IA conectados a fuentes autorizadas para consultar información y apoyar tareas con permisos y revisión humana.', deliverable: 'Agente integrado con las fuentes y herramientas del equipo.' },
        { title: 'Decisiones con poca capacidad de anticipación', problem: 'La demanda, las desviaciones de calidad o las necesidades de recursos son difíciles de prever.', solution: 'Evaluamos modelos de machine learning y analítica predictiva sobre los datos disponibles y su utilidad para el proceso.', deliverable: 'Modelo predictivo evaluado y conectado al flujo de decisión.' },
        { title: 'Paradas imprevistas de equipos', problem: 'El mantenimiento depende de reaccionar a las averías o de calendarios que no reflejan el estado real.', solution: 'Analizamos señales e históricos para detectar anomalías y patrones de riesgo que apoyen la planificación del mantenimiento.', deliverable: 'Alertas y modelos de mantenimiento predictivo adaptados a los activos.' },
        { title: 'Planta y negocio desconectados', problem: 'Los datos de máquinas y procesos industriales no llegan a los sistemas de gestión.', solution: 'Integramos datos de planta y sistemas operativos para digitalizar procesos y hacer visible su rendimiento.', deliverable: 'Integración de datos industriales e indicadores de proceso.' },
      ],
      steps: [
        { title: 'Validar el caso de uso', description: 'Acordamos el problema, los datos necesarios y los criterios de evaluación.' },
        { title: 'Probar y evaluar', description: 'Construimos una solución inicial y comprobamos su utilidad con el equipo.' },
        { title: 'Integrar y supervisar', description: 'Llevamos la solución al proceso operativo y definimos su seguimiento y mantenimiento.' },
      ],
    },
    en: {
      explanation: 'We start with a concrete operational need and assess whether the data and context make AI useful. We develop and evaluate the solution, integrate it into working tools and define how to monitor, maintain and use it responsibly.',
      scenarios: [
        { title: 'Knowledge that is hard to find', problem: 'Documents are scattered and teams repeat searches and internal questions.', solution: 'We create AI agents connected to approved sources to retrieve information and support tasks with access controls and human review.', deliverable: 'An agent integrated with team information sources and tools.' },
        { title: 'Decisions without enough foresight', problem: 'Demand, quality deviations or resource needs are difficult to forecast.', solution: 'We evaluate machine learning and predictive analytics models against available data and their usefulness to the process.', deliverable: 'An evaluated predictive model connected to decision workflows.' },
        { title: 'Unexpected equipment downtime', problem: 'Maintenance relies on reacting to failures or schedules that do not reflect actual condition.', solution: 'We analyze signals and historical data for anomalies and risk patterns that support maintenance planning.', deliverable: 'Alerts and predictive maintenance models tailored to the assets.' },
        { title: 'A disconnect between plant and business', problem: 'Machine and industrial process data does not reach management systems.', solution: 'We integrate plant data and operational systems to digitize processes and make performance visible.', deliverable: 'Industrial data integration and process metrics.' },
      ],
      steps: [
        { title: 'Validate the use case', description: 'Agree on the problem, required data and evaluation criteria.' },
        { title: 'Build and evaluate', description: 'Develop an initial solution and assess its usefulness with the team.' },
        { title: 'Integrate and monitor', description: 'Bring the solution into operations and define monitoring and maintenance.' },
      ],
    },
  },
  'transformation-partner': {
    es: {
      explanation: 'Una transformación necesita continuidad entre las decisiones y la operación. Nos incorporamos como socio externo para dar criterio, acompañar la ejecución, desarrollar capacidades y mantener una gobernanza que conecte las iniciativas con resultados y aprendizaje.',
      scenarios: [
        { title: 'La estrategia no llega a la ejecución', problem: 'Las iniciativas se frenan al pasar del plan al desarrollo o a la adopción por el equipo.', solution: 'Acompañamos la implementación, ayudamos a tomar decisiones y coordinamos dependencias y próximos pasos.', deliverable: 'Plan de ejecución, seguimiento y apoyo a la adopción.' },
        { title: 'Dependencia de unas pocas personas', problem: 'Las soluciones funcionan, pero el conocimiento no está distribuido y cuesta mantenerlas.', solution: 'Diseñamos formación práctica, documentación y transferencia de conocimiento sobre los propios proyectos.', deliverable: 'Plan de formación y materiales para el trabajo cotidiano.' },
        { title: 'Proyectos sin una dirección compartida', problem: 'Cada iniciativa define sus propios criterios, responsables y formas de medir el avance.', solution: 'Establecemos gobernanza, roles y un sistema de seguimiento para alinear prioridades y decisiones.', deliverable: 'Modelo de gobernanza y cartera de iniciativas con responsables.' },
        { title: 'El cambio termina con el lanzamiento', problem: 'Después de entregar una solución, no hay una rutina para revisar su adopción y mejorarla.', solution: 'Acordamos revisiones periódicas de resultados, nuevas necesidades y acciones de mejora.', deliverable: 'Ciclo de mejora continua con indicadores y un backlog actualizado.' },
      ],
      steps: [
        { title: 'Acordar el modelo de colaboración', description: 'Definimos objetivos, responsabilidades, alcance y ritmo de trabajo.' },
        { title: 'Acompañar la ejecución', description: 'Combinamos advisory, implementación y formación según las necesidades.' },
        { title: 'Revisar y evolucionar', description: 'Revisamos resultados, reforzamos capacidades y actualizamos las prioridades.' },
      ],
    },
    en: {
      explanation: 'Transformation needs continuity between decisions and operations. As an external partner, we provide guidance, support execution, build capabilities and establish governance that connects initiatives with outcomes and learning.',
      scenarios: [
        { title: 'Strategy does not reach execution', problem: 'Initiatives stall when moving from plans into development or team adoption.', solution: 'We support implementation, help make decisions and coordinate dependencies and next steps.', deliverable: 'An execution plan, progress tracking and adoption support.' },
        { title: 'Dependence on a few individuals', problem: 'Solutions work, but knowledge is concentrated and maintenance is difficult.', solution: 'We provide practical training, documentation and knowledge transfer using the team’s own projects.', deliverable: 'A training plan and materials for everyday work.' },
        { title: 'Projects without a shared direction', problem: 'Each initiative uses its own criteria, owners and progress measures.', solution: 'We establish governance, roles and tracking to align priorities and decisions.', deliverable: 'A governance model and an initiative portfolio with clear ownership.' },
        { title: 'Change ends at launch', problem: 'After delivery, there is no routine for reviewing adoption and improving the solution.', solution: 'We agree on regular reviews of outcomes, emerging needs and improvement actions.', deliverable: 'A continuous improvement cycle with metrics and an updated backlog.' },
      ],
      steps: [
        { title: 'Agree on the partnership', description: 'Define goals, responsibilities, scope and working cadence.' },
        { title: 'Support execution', description: 'Combine advisory, implementation and training to meet current needs.' },
        { title: 'Review and evolve', description: 'Review outcomes, strengthen capabilities and update priorities.' },
      ],
    },
  },
};
