import type { ServiceItem } from '../types';

export const transformationServices: ServiceItem[] = [
  {
    id: 'digital-transformation-assessment',
    level: 1,
    iconName: 'Compass',
    levelBadge: { es: 'Diagnóstico y estrategia', en: 'Assessment & strategy' },
    title: { es: 'Digital Transformation Assessment', en: 'Digital Transformation Assessment' },
    subtitle: { es: 'Saber qué transformar, por qué y en qué orden.', en: 'Know what to transform, why and in what order.' },
    description: {
      es: 'Identificamos oportunidades de transformación, priorizamos iniciativas y definimos un roadmap claro de implementación.',
      en: 'We identify transformation opportunities, prioritize initiatives and define a clear implementation roadmap.',
    },
    deliverables: {
      es: ['Diagnóstico de madurez digital', 'Estrategia y revisión de procesos', 'Evaluación de arquitectura tecnológica', 'Roadmap con iniciativas priorizadas'],
      en: ['Digital maturity assessment', 'Strategy and process review', 'Technology architecture assessment', 'Roadmap with prioritized initiatives'],
    },
    businessImpact: { es: 'Saber qué transformar, por qué y en qué orden.', en: 'Know what to transform, why and in what order.' },
    techStack: ['Diagnóstico', 'Estrategia', 'Procesos', 'Arquitectura', 'Roadmap'],
  },
  {
    id: 'data-automation-operations-intelligence',
    level: 2,
    iconName: 'BarChart3',
    levelBadge: { es: 'Datos y operaciones', en: 'Data & operations' },
    title: { es: 'Data, Automation & Operations Intelligence', en: 'Data, Automation & Operations Intelligence' },
    subtitle: { es: 'Mejorar eficiencia, control y toma de decisiones.', en: 'Improve efficiency, control and decision-making.' },
    description: {
      es: 'Conectamos datos, sistemas y procesos para mejorar la visibilidad del negocio, automatizar tareas y facilitar decisiones operativas.',
      en: 'We connect data, systems and processes to improve business visibility, automate tasks and support operational decisions.',
    },
    deliverables: {
      es: ['Integración y calidad de datos', 'BI y dashboards de negocio', 'Automatización de procesos e informes', 'Control Tower para visibilidad operativa'],
      en: ['Data integration and quality', 'Business intelligence and dashboards', 'Process and reporting automation', 'Control Tower for operational visibility'],
    },
    businessImpact: { es: 'Mejorar eficiencia, control y toma de decisiones.', en: 'Improve efficiency, control and decision-making.' },
    techStack: ['Data', 'BI', 'Dashboards', 'Automation', 'Integration', 'Control Tower'],
  },
  {
    id: 'ai-industry-40',
    level: 3,
    iconName: 'Factory',
    levelBadge: { es: 'Inteligencia e industria', en: 'Intelligence & industry' },
    title: { es: 'AI & Industry 4.0', en: 'AI & Industry 4.0' },
    subtitle: { es: 'Hacer las operaciones más inteligentes, predictivas y eficientes.', en: 'Make operations smarter, more predictive and more efficient.' },
    description: {
      es: 'Aplicamos inteligencia artificial y tecnologías industriales a casos de uso concretos con impacto operativo.',
      en: 'We apply artificial intelligence and industrial technologies to concrete use cases with operational impact.',
    },
    deliverables: {
      es: ['IA y agentes conectados a tus herramientas', 'Modelos de machine learning e IA en producción', 'Mantenimiento predictivo', 'Digitalización industrial e integración de planta'],
      en: ['AI and agents connected to your tools', 'Machine learning models and AI in production', 'Predictive maintenance', 'Industrial digitalization and plant integration'],
    },
    businessImpact: { es: 'Hacer las operaciones más inteligentes, predictivas y eficientes.', en: 'Make operations smarter, more predictive and more efficient.' },
    techStack: ['AI Agents', 'Machine Learning', 'Predictive Analytics', 'Predictive Maintenance', 'Industrial Digitalization'],
  },
  {
    id: 'transformation-partner',
    level: 0,
    iconName: 'GraduationCap',
    levelBadge: { es: 'Acompañamiento continuo', en: 'Ongoing partnership' },
    title: { es: 'Transformation Partner', en: 'Transformation Partner' },
    subtitle: { es: 'Convertir la transformación digital en un proceso continuo, no en una sucesión de proyectos aislados.', en: 'Make digital transformation a continuous process, rather than a series of isolated projects.' },
    description: {
      es: 'Actuamos como socio externo de transformación, acompañando a la organización desde la estrategia hasta la ejecución y evolución continua.',
      en: 'We act as an external transformation partner, supporting the organization from strategy through execution and continuous evolution.',
    },
    deliverables: {
      es: ['Advisory y acompañamiento en la implementación', 'Formación y transferencia de conocimiento', 'Gobernanza y seguimiento de iniciativas', 'Mejora continua y revisión de resultados'],
      en: ['Advisory and implementation support', 'Training and knowledge transfer', 'Governance and initiative tracking', 'Continuous improvement and outcome reviews'],
    },
    businessImpact: { es: 'Convertir la transformación digital en un proceso continuo, no en una sucesión de proyectos aislados.', en: 'Make digital transformation a continuous process, rather than a series of isolated projects.' },
    techStack: ['Advisory', 'Implementation', 'Training', 'Governance', 'Continuous Improvement'],
  },
];
