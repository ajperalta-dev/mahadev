import React, { useState, useEffect } from 'react';
import { transformationServices } from '../data/transformationServices';
import type { Language, TeamProfile, CaseStudyItem } from '../types';

import { LanguageContext } from './language';

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Brand & Taglines
    'brand.name': 'MAHA DEV',
    'brand.tagline': 'Digital Transformation',
    'brand.slogan': 'Ingeniería de Datos, Inteligencia Artificial y Soluciones Avanzadas de Industria 4.0',

    // Navbar
    'nav.home': 'Inicio',
    'nav.services': 'Soluciones',
    'nav.about': 'Nosotros',
    'nav.methodology': 'Metodología',
    'nav.calculator': 'Simulador ROI',
    'nav.cases': 'Casos de uso',
    'nav.contact': 'Contacto',
    'nav.bookCta': 'Contáctanos',

    // Hero Section
    'hero.badge': 'CONSULTORÍA ESTRATÉGICA EN DATA & IA',
    'hero.title.pre': 'Ingeniería del dato para',
    'hero.title.highlight': 'dar el siguiente paso',
    'hero.title.post': 'De la estrategia a la práctica',
    'hero.subtitle': 'Creamos soluciones de datos, inteligencia artificial y automatización. Te acompañamos con consultoría estratégica y tutorías para convertir tus ideas en capacidades reales.',
    'hero.cta.primary': 'Explorar Soluciones',
    'hero.cta.secondary': 'Agendar Sesión Técnica',
    'hero.metrics.precision': '+40',
    'hero.metrics.precision.label': 'Proyectos Entregados',
    'hero.metrics.roi': '5 años',
    'hero.metrics.roi.label': 'Experiencia en Data & IA',
    'hero.metrics.events': '3',
    'hero.metrics.events.label': 'Países con Clientes Activos',
    'hero.metrics.downtime': '-35%',
    'hero.metrics.downtime.label': 'Reducción media de costes operativos',

    // Services
    'services.header.badge': 'NUESTRO PORTAFOLIO DE SOLUCIONES',
    'services.header.title': 'Soluciones para avanzar. Personas para acompañarte',
    'services.header.desc': 'Desarrollamos soluciones de datos e IA, orientamos tus decisiones y te ayudamos a aprender. Elige el punto de partida que necesitas.',
    'services.filter.all': 'Todas',
    'services.filter.foundational': 'Datos y BI',
    'services.filter.advanced': 'IA y modelos',
    'services.filter.industrial': 'Operaciones e industria',
    'services.card.deliverables': 'Entregables Clave:',
    'services.card.impact': 'Impacto de Negocio:',
    'services.card.cta': 'Solicitar propuesta técnica',

    // About Team
    'about.header.badge': 'QUIÉNES SOMOS & ADN TÉCNICO',
    'about.header.title': 'Ingeniería, datos y aprendizaje continuo',
    'about.header.desc': 'Combinamos la solidez metodológica y la visión de procesos de la Ingeniería Industrial con la vanguardia técnica en Inteligencia Artificial, Big Data y MLOps.',
    'about.story.title': 'Nuestra Filosofía: El dato como activo productivo de ingeniería',
    'about.story.p1': 'En MAHA DEV Digital Transformation no creemos en la Inteligencia Artificial como un artificio teórico, sino como una herramienta de ingeniería de precisión orientada a optimizar procesos, multiplicar márgenes y reducir tiempos de parada.',
    'about.story.p2': 'Nuestro enfoque conecta procesos, arquitectura de datos y desarrollo de soluciones. Completamos cada iniciativa con documentación y transferencia de conocimiento para que puedas seguir avanzando con autonomía.',
    'about.pillar1.title': 'Rigor de Ingeniería Industrial',
    'about.pillar1.desc': 'Enfoque centrado en lean operations, cuello de botella, throughput y métricas operacionales reales.',
    'about.pillar2.title': 'Especialización Senior en IA',
    'about.pillar2.desc': 'Dominio riguroso de modelos predictivos, redes neuronales, LLMs y sistemas en tiempo real.',
    'about.pillar3.title': 'Arquitecturas Escalables (MLOps)',
    'about.pillar3.desc': 'No nos quedamos en notebooks de prueba. Desplegamos soluciones robustas listas para producción.',
    'about.pillar4.title': 'Soberanía y Seguridad del Dato',
    'about.pillar4.desc': 'Gobernanza estricta, cumplimiento normativo GDPR y despliegues On-Premise o Cloud seguros.',

    // Methodology
    'method.header.badge': 'FRAMEWORK DE TRABAJO',
    'method.header.title': 'Metodología Ágil Orientada a Resultados',
    'method.header.desc': 'Un proceso estructurado en 4 fases que reduce la incertidumbre y garantiza valor desde las primeras semanas.',
    'method.phase1.num': '01',
    'method.phase1.title': 'Auditoría & Diagnóstico de Datos',
    'method.phase1.desc': 'Evaluamos la madurez analítica, arquitectura existente, calidad de datos y definimos los casos de uso de mayor retorno.',
    'method.phase2.num': '02',
    'method.phase2.title': 'Arquitectura & PoC Acelerada',
    'method.phase2.desc': 'Diseñamos la solución objetivo y desarrollamos un prototipo funcional en menos de 4 semanas para validar la hipótesis.',
    'method.phase3.num': '03',
    'method.phase3.title': 'Ingeniería & Despliegue en Producción',
    'method.phase3.desc': 'Construcción modular de pipelines robustos, contenedores Docker/Kubernetes, APIs seguras y dashboards ejecutivos.',
    'method.phase4.num': '04',
    'method.phase4.title': 'MLOps & Optimización Continua',
    'method.phase4.desc': 'Monitorización de drift de datos, reentrenamiento automatizado, auditoría de sesgos y formación al equipo interno.',

    // ROI Simulator
    'calc.header.badge': 'HERRAMIENTA INTERACTIVA',
    'calc.header.title': 'Simulador de Retorno de Inversión (ROI)',
    'calc.header.desc': 'Estima el impacto financiero potencial de modernizar tus procesos con Data & IA según tu sector y volumen operacional.',
    'calc.sector.label': 'Sector de tu Empresa',
    'calc.sector.industry': 'Manufactura / Industria 4.0',
    'calc.sector.logistics': 'Logística & Cadena de Suministro',
    'calc.sector.retail': 'Retail & Comercio Electrónico',
    'calc.sector.finance': 'Banca, Finanzas & Seguros',
    'calc.cost.label': 'Coste Operativo Anual Aproximado (€)',
    'calc.solution.label': 'Área de Intervención Prioritaria',
    'calc.sol.pred_maint': 'Mantenimiento Predictivo & Cero Paradas',
    'calc.sol.demand': 'Forecasting de Demanda & Optimización de Stock',
    'calc.sol.genai': 'Automatización Cognitiva con Agentes GenAI',
    'calc.sol.bi': 'Business Intelligence Centralizado & Data Lake',
    'calc.result.savings': 'Ahorro Anual Estimado:',
    'calc.result.efficiency': 'Aumento de Eficiencia Operativa:',
    'calc.result.payback': 'Período Estimado de Amortización:',
    'calc.result.note': '* Estimaciones basadas en benchmarks de proyectos previos de MAHA DEV Digital Transformation en sectores comparables.',
    'calc.cta': 'Agendar auditoría para validar estas cifras',

    // Case Studies
    'cases.header.badge': 'CASOS DE USO',
    'cases.header.title': 'Ideas aplicadas a retos reales',
    'cases.header.desc': 'Aplicaciones de datos e inteligencia artificial para mejorar producción, inventario y gestión.',

    // Contact
    'contact.header.badge': 'HABLEMOS DE TU PROYECTO',
    'contact.header.title': 'Inicia tu Transformación con Especialistas',
    'contact.header.desc': 'Ponte en contacto directo con nuestros Senior Data Scientists e Ingenieros. Evaluaremos la viabilidad de tu proyecto sin compromiso.',
    'contact.info.email': 'alpha.digital.ia@gmail.com',
    'contact.info.phone': '+34 641 012 046',
    'contact.info.location': 'Madrid, España · Proyectos Internacionales',
    'contact.info.hours': 'Lunes a Viernes: 08:30 - 19:30 (CET)',
    'contact.form.name': 'Nombre y Apellidos *',
    'contact.form.email': 'Correo Corporativo *',
    'contact.form.phone': 'Teléfono de Contacto',
    'contact.form.company': 'Empresa / Organización',
    'contact.form.service': 'Solución de Interés',
    'contact.form.message': 'Cuéntanos brevemente sobre tu reto o proyecto *',
    'contact.form.submit': 'Enviar Solicitud de Información',
    'contact.form.success': '¡Mensaje recibido con éxito! Un Senior Data Scientist se comunicará contigo en menos de 24 horas.',

    // Booking Modal
    'booking.modal.title': 'Agendar Sesión de Consultoría Estratégica',
    'booking.modal.subtitle': 'Sesión técnica gratuita de 30 minutos con un Senior Data Scientist & Ingeniero Industrial.',
    'booking.step1': '1. Detalles del Proyecto',
    'booking.step2': '2. Fecha & Horario',
    'booking.step3': '3. Datos de Contacto',
    'booking.field.service': '¿Qué solución necesitas explorar?',
    'booking.field.size': 'Tamaño de tu organización',
    'booking.field.date': 'Fecha preferida',
    'booking.field.time': 'Franja horaria preferida',
    'booking.field.notes': 'Objetivo principal de la reunión',
    'booking.btn.next': 'Continuar',
    'booking.btn.back': 'Atrás',
    'booking.btn.confirm': 'Preparar solicitud',
    'booking.success.title': 'Invitación enviada',
    'booking.success.msg': 'Creamos la sesión en Google Calendar y solicitamos el envío de la invitación a tu correo con los detalles del formulario.',

    // Chatbot
    'chat.header.name': 'MAHA DEV AI Assistant',
    'chat.header.status': 'Guía de servicios · Respuestas automáticas',
    'chat.welcome': 'Hola, soy el asistente virtual de MAHA DEV Digital Transformation. ¿En qué podemos potenciar tu empresa hoy?',
    'chat.prompt.services': '¿Qué servicios ofrecen?',
    'chat.prompt.industry40': '¿Qué experiencia tienen en Industria 4.0?',
    'chat.prompt.pricing': '¿Cómo funcionan sus tarifas?',
    'chat.prompt.book': 'Deseo agendar una reunión técnica',
    'chat.input.placeholder': 'Escribe tu consulta...',
    'chat.typing': 'MAHA DEV AI está analizando...',

    // WhatsApp
    'whatsapp.tooltip': '¿Prefieres conversar directamente? Escríbenos a WhatsApp (+34 641 012 046)',
    'whatsapp.defaultMsg': 'Hola MAHA DEV Digital Transformation, deseo solicitar información sobre sus servicios de Data e IA.',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.legal': 'Aviso Legal',
    'footer.privacy': 'Política de Privacidad',
    'footer.cookies': 'Política de Cookies',
    'footer.desc': 'Consultora de ingeniería de datos, analítica avanzada, inteligencia artificial y modernización industrial con estándares de multinacional.',
  },
  en: {
    // Brand & Taglines
    'brand.name': 'MAHA DEV',
    'brand.tagline': 'Digital Transformation',
    'brand.slogan': 'Data Engineering, Artificial Intelligence & Advanced Industry 4.0 Solutions',

    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Solutions',
    'nav.about': 'About us',
    'nav.methodology': 'Methodology',
    'nav.calculator': 'ROI Simulator',
    'nav.cases': 'Use cases',
    'nav.contact': 'Contact',
    'nav.bookCta': 'Contact us',

    // Hero Section
    'hero.badge': 'STRATEGIC DATA & AI CONSULTING',
    'hero.title.pre': 'Data and AI for',
    'hero.title.highlight': 'your next step',
    'hero.title.post': 'From strategy to practice',
    'hero.subtitle': 'We build data, artificial intelligence and automation solutions. Strategic consulting and personalized tutoring help turn your ideas into practical capabilities.',
    'hero.cta.primary': 'Explore Solutions',
    'hero.cta.secondary': 'Book Technical Session',
    'hero.metrics.precision': '+40',
    'hero.metrics.precision.label': 'Projects Delivered',
    'hero.metrics.roi': '5 years',
    'hero.metrics.roi.label': 'Experience in Data & AI',
    'hero.metrics.events': '3',
    'hero.metrics.events.label': 'Countries with Active Clients',
    'hero.metrics.downtime': '-35%',
    'hero.metrics.downtime.label': 'Average Operational Cost Reduction',

    // Services
    'services.header.badge': 'OUR SOLUTIONS PORTFOLIO',
    'services.header.title': 'Solutions to move forward. Expertise by your side',
    'services.header.desc': 'We build data and AI solutions, guide your decisions and help you learn. Choose the starting point that fits your goals.',
    'services.filter.all': 'All',
    'services.filter.foundational': 'Data & BI',
    'services.filter.advanced': 'AI & models',
    'services.filter.industrial': 'Operations & industry',
    'services.card.deliverables': 'Key Deliverables:',
    'services.card.impact': 'Business Impact:',
    'services.card.cta': 'Request Technical Proposal',

    // About Team
    'about.header.badge': 'ABOUT US & TECHNICAL DNA',
    'about.header.title': 'Engineering, data and continuous learning',
    'about.header.desc': 'Bridging the process discipline of Industrial Engineering with state-of-the-art expertise in Artificial Intelligence, Big Data, and MLOps.',
    'about.story.title': 'Our Philosophy: Data as a high-precision engineering asset',
    'about.story.p1': 'At MAHA DEV Digital Transformation, we do not view AI as a speculative experiment, but as a high-precision engineering lever designed to optimize operations, multiply margins, and eliminate machine downtime.',
    'about.story.p2': 'Our approach connects processes, data architecture and solution development. Documentation and knowledge transfer complete each initiative so you can keep moving forward independently.',
    'about.pillar1.title': 'Industrial Engineering Rigor',
    'about.pillar1.desc': 'Focused on operational bottlenecks, process lean methodology, throughput, and verified financial ROI.',
    'about.pillar2.title': 'Senior AI Specialization',
    'about.pillar2.desc': 'Rigorous mastery of predictive models, neural architectures, LLMs, and real-time inference engines.',
    'about.pillar3.title': 'Scalable Architectures (MLOps)',
    'about.pillar3.desc': 'We move beyond exploratory notebooks to deliver battle-tested, enterprise-grade production systems.',
    'about.pillar4.title': 'Data Sovereignty & Security',
    'about.pillar4.desc': 'Strict data governance, GDPR compliance, and robust On-Premise or Private Cloud infrastructure.',

    // Methodology
    'method.header.badge': 'DELIVERY FRAMEWORK',
    'method.header.title': 'Results-Driven Agile Methodology',
    'method.header.desc': 'A structured 4-phase framework designed to eliminate guesswork and generate tangible ROI from the earliest sprints.',
    'method.phase1.num': '01',
    'method.phase1.title': 'Data Audit & Diagnostic',
    'method.phase1.desc': 'We assess analytical maturity, existing infrastructure, data veracity, and pinpoint the highest-yield use cases.',
    'method.phase2.num': '02',
    'method.phase2.title': 'Architecture & Rapid PoC',
    'method.phase2.desc': 'We design target-state architecture and build a functional working prototype within 4 weeks to validate hypotheses.',
    'method.phase3.num': '03',
    'method.phase3.title': 'Production Engineering & Scaling',
    'method.phase3.desc': 'Full engineering of resilient data pipelines, Docker/Kubernetes container orchestration, secure APIs, and executive BI.',
    'method.phase4.num': '04',
    'method.phase4.title': 'MLOps & Continuous Improvement',
    'method.phase4.desc': 'Real-time telemetry, model drift detection, automated retraining pipelines, and internal team enablement.',

    // ROI Simulator
    'calc.header.badge': 'INTERACTIVE TOOL',
    'calc.header.title': 'ROI & Operational Savings Simulator',
    'calc.header.desc': 'Estimate the potential financial impact of modernizing your operations with Data & AI based on industry benchmarks.',
    'calc.sector.label': 'Company Sector',
    'calc.sector.industry': 'Manufacturing / Industry 4.0',
    'calc.sector.logistics': 'Logistics & Supply Chain',
    'calc.sector.retail': 'Retail & E-Commerce',
    'calc.sector.finance': 'Banking, Finance & Insurance',
    'calc.cost.label': 'Approximate Annual Operational Cost (€)',
    'calc.solution.label': 'Priority Intervention Area',
    'calc.sol.pred_maint': 'Predictive Maintenance & Zero Downtime',
    'calc.sol.demand': 'Demand Forecasting & Inventory Optimization',
    'calc.sol.genai': 'Cognitive Automation with GenAI Agents',
    'calc.sol.bi': 'Centralized BI & Modern Lakehouse Architecture',
    'calc.result.savings': 'Estimated Annual Savings:',
    'calc.result.efficiency': 'Operational Efficiency Boost:',
    'calc.result.payback': 'Estimated Payback Period:',
    'calc.result.note': '* Projections based on past client benchmarks delivered by MAHA DEV Digital Transformation in equivalent enterprise sectors.',
    'calc.cta': 'Book Technical Audit to Validate Figures',

    // Case Studies
    'cases.header.badge': 'USE CASES',
    'cases.header.title': 'Ideas applied to real challenges',
    'cases.header.desc': 'Data and AI applications for production, inventory and management.',

    // Contact
    'contact.header.badge': 'GET IN TOUCH',
    'contact.header.title': 'Start Your Transformation with Senior Engineers',
    'contact.header.desc': 'Connect directly with our Senior Data Scientists and Industrial Engineers. We will evaluate your technical feasibility with zero obligation.',
    'contact.info.email': 'alpha.digital.ia@gmail.com',
    'contact.info.phone': '+34 641 012 046',
    'contact.info.location': 'Madrid, Spain · Global Remote Engagements',
    'contact.info.hours': 'Monday to Friday: 08:30 - 19:30 (CET)',
    'contact.form.name': 'Full Name *',
    'contact.form.email': 'Corporate Email *',
    'contact.form.phone': 'Phone Number',
    'contact.form.company': 'Company / Organization',
    'contact.form.service': 'Solution of Interest',
    'contact.form.message': 'Briefly describe your challenge or project *',
    'contact.form.submit': 'Submit Information Request',
    'contact.form.success': 'Message successfully received! A Senior Data Scientist will contact you within 24 hours.',

    // Booking Modal
    'booking.modal.title': 'Book Strategic Consultation Session',
    'booking.modal.subtitle': 'Free 30-minute technical session with a Senior Data Scientist & Industrial Engineer.',
    'booking.step1': '1. Project Scope',
    'booking.step2': '2. Date & Time',
    'booking.step3': '3. Contact Details',
    'booking.field.service': 'Which solution would you like to explore?',
    'booking.field.size': 'Organization size',
    'booking.field.date': 'Preferred date',
    'booking.field.time': 'Preferred time window',
    'booking.field.notes': 'Main objective for the meeting',
    'booking.btn.next': 'Next Step',
    'booking.btn.back': 'Back',
    'booking.btn.confirm': 'Prepare request',
    'booking.success.title': 'Invitation sent',
    'booking.success.msg': 'Your session was created in Google Calendar and the invitation was requested for your email with your form details.',

    // Chatbot
    'chat.header.name': 'MAHA DEV AI Assistant',
    'chat.header.status': 'Service guide · Automated replies',
    'chat.welcome': 'Hello, I am MAHA DEV Digital Transformation\'s virtual assistant. How can we empower your enterprise today?',
    'chat.prompt.services': 'What services do you provide?',
    'chat.prompt.industry40': 'What is your Industry 4.0 track record?',
    'chat.prompt.pricing': 'How do your consulting fees work?',
    'chat.prompt.book': 'I want to schedule a technical meeting',
    'chat.input.placeholder': 'Ask your question...',
    'chat.typing': 'MAHA DEV AI is analyzing...',

    // WhatsApp
    'whatsapp.tooltip': 'Prefer direct messaging? Chat on WhatsApp (+34 641 012 046)',
    'whatsapp.defaultMsg': 'Hello MAHA DEV Digital Transformation, I would like to request details about your Data and AI services.',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.desc': 'High-end consultancy in data engineering, advanced analytics, artificial intelligence, and industrial modernization with global standards.',
  }
};

const teamData: TeamProfile[] = [
  {
    id: 'lead-ds-industrial',
    name: 'Agustín Peralta',
    role: {
      es: 'Director de Consultoría & Principal Data Scientist',
      en: 'Consulting Principal & Lead Data Scientist',
    },
    specialty: {
      es: 'Ingeniería Industrial · Inteligencia Artificial · Industria 4.0',
      en: 'Industrial Engineering · Artificial Intelligence · Industry 4.0',
    },
    degrees: {
      es: [
        'Grado en Ingeniería Industrial (Procesos & Optimización Operativa)',
        'Máster en Big Data, Data Science & Inteligencia Artificial Avanzada',
        'Certificaciones profesionales en Arquitectura Cloud & MLOps',
      ],
      en: [
        'B.S. in Industrial Engineering (Operational Research & Process Optimization)',
        'Master of Science in Big Data, Data Science & Advanced AI',
        'Professional Certifications in Cloud Architecture & MLOps',
      ],
    },
    highlights: {
      es: [
        'Liderazgo en implantación de proyectos de IA y analítica en multinacionales europeas',
        'Especialista en integración de sensórica industrial, OEE y modelos de visión artificial',
        'Diseño de arquitecturas Lakehouse y optimización de flujos de valor en planta',
      ],
      en: [
        'Led end-to-end data and AI implementations for European multinationals',
        'Specialist in industrial sensor integration, OEE, and computer vision deployment',
        'Architected high-throughput Lakehouse stacks and industrial value streams',
      ],
    },
    experienceYears: 8,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'senior-mle', demo: true,
    name: 'Elena Rostova, Ph.D.',
    role: {
      es: 'Senior MLOps & Data Platform Architect',
      en: 'Senior MLOps & Data Platform Architect',
    },
    specialty: {
      es: 'MLOps · Distribuited Computing · Databricks & Snowflake',
      en: 'MLOps · Distributed Computing · Databricks & Snowflake',
    },
    degrees: {
      es: [
        'Doctorado en Ciencias de la Computación & Machine Learning',
        'Máster Oficial en Inteligencia Artificial y Big Data Analytics',
        'Databricks Certified Data Engineer Professional',
      ],
      en: [
        'Ph.D. in Computer Science & Applied Machine Learning',
        'M.Sc. in Artificial Intelligence & Big Data Analytics',
        'Databricks Certified Data Engineer Professional',
      ],
    },
    highlights: {
      es: [
        'Despliegue de pipelines de streaming de más de 20M eventos diarios en sector fintech',
        'Auditoría y optimización de latencia en modelos predictivos con Kubernetes y Triton',
        'Gobernanza corporativa de datos bajo normativas financieras y de automoción',
      ],
      en: [
        'Deployed streaming ingestion pipelines processing 20M+ events/day in fintech',
        'Inference optimization for sub-millisecond predictions via Kubernetes & Triton',
        'Corporate data governance implementation across regulated manufacturing standards',
      ],
    },
    experienceYears: 10,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'senior-genai', demo: true,
    name: 'Carlos Mendoza, M.Sc.',
    role: {
      es: 'Lead GenAI & Applied Solutions Engineer',
      en: 'Lead GenAI & Applied Solutions Engineer',
    },
    specialty: {
      es: 'LLMs Empresariales · Sistemas RAG · Agentes Autónomos',
      en: 'Enterprise LLMs · RAG Architectures · Autonomous Agents',
    },
    degrees: {
      es: [
        'Ingeniero de Telecomunicaciones & Sistemas',
        'Máster en Inteligencia Artificial Aplicada y Procesamiento de Lenguaje Natural',
        'Certificación en Deep Learning & Arquitecturas Transformer',
      ],
      en: [
        'B.S. in Telecommunications & Systems Engineering',
        'M.Sc. in Applied Artificial Intelligence and Natural Language Processing',
        'Certified Specialist in Deep Learning & Transformer Architectures',
      ],
    },
    highlights: {
      es: [
        'Creación de agentes IA multimodales para automatización documental en multinacionales',
        'Desarrollo de bases vectoriales seguras para búsqueda semántica sobre petabytes',
        'Fine-tuning de modelos open-source para cumplimiento estricto de privacidad GDPR',
      ],
      en: [
        'Built multimodal AI agents automating complex document reasoning in global firms',
        'Engineered enterprise vector search infrastructure indexing petabytes of documents',
        'Fine-tuned open-source models under strict air-gapped GDPR environments',
      ],
    },
    experienceYears: 7,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  },
];

const caseStudiesData: CaseStudyItem[] = [
  {
    id: 'case-industry',
    clientIndustry: {
      es: 'Industria & Manufactura',
      en: 'Industry & Manufacturing',
    },
    challenge: {
      es: 'Paradas imprevistas en maquinaria crítica que causaban retrasos de entrega y costes elevados de reparación.',
      en: 'Unplanned machine breakdowns causing production halts and high emergency repair expenses.',
    },
    solution: {
      es: 'Instalación de sensórica IoT y alertas de mantenimiento predictivo que avisan días antes de que ocurra una avería.',
      en: 'Connect IoT sensors to predictive alerts to help maintenance teams anticipate failures.',
    },
    metrics: [
      { val: '-45%', label: { es: 'Paradas imprevistas', en: 'Unplanned Downtime' } },
      { val: '€380K', label: { es: 'Ahorro anual en costes', en: 'Annual Cost Savings' } },
      { val: '4 meses', label: { es: 'Amortización de inversión', en: 'Payback Period' } },
    ],
    techUsed: ['IoT Industrial', 'Mantenimiento Predictivo', 'Python', 'Alertas en Tiempo Real'],
  },
  {
    id: 'case-retail',
    clientIndustry: {
      es: 'Retail, Comercio & Distribución',
      en: 'Retail & Distribution',
    },
    challenge: {
      es: 'Falta de previsión de ventas: se agotaba el producto estrella y sobraba stock de baja rotación en almacén.',
      en: 'Inaccurate sales forecasts leading to frequent stockouts of top sellers and excess dead inventory.',
    },
    solution: {
      es: 'Modelo de inteligencia artificial que calcula la demanda futura estimada por tienda, temporada y producto.',
      en: 'AI forecasting model estimating future customer demand per store, season, and item.',
    },
    metrics: [
      { val: '+32%', label: { es: 'Precisión de inventario', en: 'Inventory Precision' } },
      { val: '-26%', label: { es: 'Coste de almacenamiento', en: 'Holding Costs Cut' } },
      { val: '99.2%', label: { es: 'Pedidos a tiempo', en: 'On-Time Deliveries' } },
    ],
    techUsed: ['Machine Learning', 'Forecasting IA', 'Snowflake', 'Power BI'],
  },
  {
    id: 'case-corporate',
    clientIndustry: {
      es: 'Gestión Empresarial & Finanzas',
      en: 'Corporate Management & Finance',
    },
    challenge: {
      es: 'El equipo directivo perdía decenas de horas semanales cruzando hojas de cálculo Excel desactualizadas.',
      en: 'Management spent dozens of weekly hours reconciling outdated manual spreadsheets across departments.',
    },
    solution: {
      es: 'Plataforma unificada de Business Intelligence con dashboards en tiempo real accesibles desde móvil y PC.',
      en: 'Unified Business Intelligence platform featuring live executive dashboards accessible on mobile & PC.',
    },
    metrics: [
      { val: '-75%', label: { es: 'Tiempo en reportes', en: 'Reporting Time' } },
      { val: '100%', label: { es: 'Datos centralizados', en: 'Single Source of Truth' } },
      { val: '24/7', label: { es: 'Visibilidad en directo', en: 'Live Decision Visibility' } },
    ],
    techUsed: ['Power BI', 'Data Lakehouse', 'dbt', 'SQL Automatizado'],
  },
];



export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => { try { return localStorage.getItem('alpha_lang') === 'en' ? 'en' : 'es'; } catch { return 'es'; } });

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    try { localStorage.setItem('alpha_lang', newLang); } catch { /* Storage may be unavailable. */ }
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['es']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: handleSetLang,
        t,
        services: transformationServices,
        team: teamData,
        caseStudies: caseStudiesData,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
