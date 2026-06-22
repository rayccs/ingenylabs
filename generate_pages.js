const fs = require('fs');
const path = require('path');

// 1. Data Dictionary for the 39 pages
const pagesData = [
    // --- Producto ---
    { title: "Descripción general del producto", col: "Producto", slug: "descripcion-general", subtitle: "Conoce el Ecosistema Cognitivo que transformará tu operación corporativa de principio a fin.", feature1: "Automatización End-to-End", feature2: "Integración Legacy", feature3: "Despliegue Rápido" },
    { title: "Agent Engage", col: "Producto", slug: "agent-engage", subtitle: "Interacciones omnicanal impulsadas por IA. Resuelve incidentes y automatiza la atención 24/7.", feature1: "Soporte Multi-intención", feature2: "Resolución en Tiempo Real", feature3: "Satisfacción Garantizada" },
    { title: "Pronóstico cognitivo", col: "Producto", slug: "pronostico-cognitivo", subtitle: "Anticipa la demanda, evita quiebres de stock y optimiza recursos usando modelos predictivos de IA.", feature1: "Machine Learning Predictivo", feature2: "Optimización de Inventario", feature3: "Análisis de Escenarios" },
    { title: "Habilitar agentes", col: "Producto", slug: "habilitar-agentes", subtitle: "Despliega enjambres de agentes de IA listos para integrarse con tus sistemas y tomar control operativo.", feature1: "Swarm de Agentes", feature2: "Roles Especializados", feature3: "Escalabilidad Infinita" },
    { title: "Gráfico de ingresos", col: "Producto", slug: "grafico-ingresos", subtitle: "Visualiza la salud financiera de tu organización con dashboards ejecutivos cognitivos.", feature1: "Dashboards en Tiempo Real", feature2: "Análisis de Fugas", feature3: "Proyecciones Financieras" },
    { title: "Ingeny AI", col: "Producto", slug: "ingeny-ai", subtitle: "El motor central de inteligencia artificial detrás de nuestras soluciones B2B y Enterprise.", feature1: "LLMs Adaptativos", feature2: "Seguridad Bancaria", feature3: "Arquitectura Híbrida" },
    { title: "Socios e integraciones", col: "Producto", slug: "socios-integraciones", subtitle: "Nuestra tecnología se conecta nativamente con SAP, Oracle, Salesforce y sistemas legados.", feature1: "Conectores Nativos", feature2: "RPA y APIs", feature3: "Ecosistema Abierto" },
    { title: "Precios", col: "Producto", slug: "precios", subtitle: "Modelos comerciales flexibles que se adaptan al tamaño y necesidades de tu empresa.", feature1: "Suscripción Modular", feature2: "Sin Costos Ocultos", feature3: "ROI Acelerado" },
    { title: "Confianza", col: "Producto", slug: "confianza", subtitle: "Cumplimos con las normativas ISO, SOC2 y las regulaciones locales de privacidad de datos.", feature1: "Auditorías de Seguridad", feature2: "Privacidad de Datos", feature3: "Compliance" },
    
    // --- A quiénes ayudamos ---
    { title: "Liderazgo", col: "A quiénes ayudamos", slug: "liderazgo", subtitle: "Herramientas ejecutivas para C-Levels orientadas a la toma de decisiones basada en datos.", feature1: "Visibilidad Total", feature2: "Control de Costos", feature3: "Gestión de Riesgo" },
    { title: "RevOps", col: "A quiénes ayudamos", slug: "revops", subtitle: "Alinea Ventas, Marketing y Éxito del Cliente para maximizar la eficiencia de los ingresos.", feature1: "Sincronización de Datos", feature2: "Automatización de Embudos", feature3: "Métricas Unificadas" },
    { title: "Ventas", col: "A quiénes ayudamos", slug: "ventas", subtitle: "Prospecta, califica y cierra más negocios con Agentes SDR y análisis de llamadas de ventas.", feature1: "SDR Cognitivo", feature2: "Scoring de Leads", feature3: "Generación de Propuestas" },
    { title: "Éxito del cliente", col: "A quiénes ayudamos", slug: "exito-del-cliente", subtitle: "Predice el riesgo de abandono y aumenta el LTV mediante atención y seguimiento automatizado.", feature1: "Alertas de Churn", feature2: "Onboarding Automatizado", feature3: "Soporte Proactivo" },
    { title: "Habilitación", col: "A quiénes ayudamos", slug: "habilitacion", subtitle: "Entrena a tus equipos con simuladores de IA, roleplay de ventas y documentación inteligente.", feature1: "Entrenamiento Inteligente", feature2: "Simuladores de Escenarios", feature3: "Feedback Inmediato" },
    { title: "Tecnología", col: "A quiénes ayudamos", slug: "tecnologia", subtitle: "Apoyamos a CIOs y CTOs con AIOps, monitoreo predictivo y orquestación de flujos de trabajo.", feature1: "Monitoreo Predictivo", feature2: "Automatización IT", feature3: "Gestión de Infraestructura" },
    { title: "Servicios financieros", col: "A quiénes ayudamos", slug: "servicios-financieros", subtitle: "Conciliación bancaria automatizada, evaluación de riesgos crediticios y compliance normativo.", feature1: "Auditoría Financiera", feature2: "Score de Crédito IA", feature3: "Prevención de Fraude" },
    { title: "Cuidado de la salud", col: "A quiénes ayudamos", slug: "cuidado-salud", subtitle: "Agendamiento de pacientes, procesamiento de licencias médicas y análisis de datos clínicos.", feature1: "Triaje Automatizado", feature2: "Gestión de Citas", feature3: "Análisis Clínico" },
    { title: "Fabricación", col: "A quiénes ayudamos", slug: "fabricacion", subtitle: "Mantenimiento predictivo, optimización de cadena de suministro e inspecciones con visión artificial.", feature1: "Mantenimiento Predictivo", feature2: "Control de Calidad", feature3: "Logística Inversa" },

    // --- ¿Por qué Ingeny Labs? ---
    { title: "Agentes de IA", col: "¿Por qué Ingeny Labs?", slug: "agentes-de-ia", subtitle: "Nuestros agentes no solo responden, ejecutan tareas en tus sistemas corporativos como un empleado más.", feature1: "Ejecución Autónoma", feature2: "Conciencia de Contexto", feature3: "Adaptabilidad Continua" },
    { title: "Capacidades multilingües", col: "¿Por qué Ingeny Labs?", slug: "capacidades-multilingues", subtitle: "Soporte global sin fricciones con comprensión contextual en más de 50 idiomas.", feature1: "Traducción en Tiempo Real", feature2: "Análisis de Sentimiento", feature3: "Soporte 24/7 Global" },
    { title: "Historias de clientes", col: "¿Por qué Ingeny Labs?", slug: "historias-clientes", subtitle: "Descubre cómo grandes empresas y el sector público han escalado operaciones usando Ingeny Labs.", feature1: "Casos de Uso Reales", feature2: "Métricas de Éxito", feature3: "Testimonios en Video" },
    { title: "Ejecución del acuerdo", col: "¿Por qué Ingeny Labs?", slug: "ejecucion-acuerdo", subtitle: "Implementación ágil. Desde el kick-off hasta la puesta en marcha en menos de 4 semanas.", feature1: "Metodología Ágil", feature2: "Soporte Dedicado", feature3: "Garantía de Éxito" },
    { title: "Entrenamiento", col: "¿Por qué Ingeny Labs?", slug: "entrenamiento", subtitle: "Capacitamos a tu equipo humano para convivir y potenciar su rendimiento junto a la IA.", feature1: "Talleres Prácticos", feature2: "Certificaciones", feature3: "Gestión del Cambio" },
    { title: "Iniciativas estratégicas", col: "¿Por qué Ingeny Labs?", slug: "iniciativas-estrategicas", subtitle: "Consultoría de alto nivel para definir la hoja de ruta de la IA en tu corporación.", feature1: "Roadmap IA", feature2: "Auditoría de Procesos", feature3: "Diseño de Arquitectura" },
    { title: "Análisis de mercado", col: "¿Por qué Ingeny Labs?", slug: "analisis-mercado", subtitle: "Monitoreo constante de tendencias tecnológicas para mantener tus operaciones a la vanguardia.", feature1: "Reportes de Tendencias", feature2: "Benchmarking", feature3: "Vigilancia Tecnológica" },

    // --- Recursos ---
    { title: "Realice una visita guiada al producto", col: "Recursos", slug: "visita-guiada", subtitle: "Agenda una demostración interactiva personalizada con uno de nuestros arquitectos de soluciones.", feature1: "Demo Personalizada", feature2: "Q&A en Vivo", feature3: "Evaluación Técnica" },
    { title: "Biblioteca de recursos", col: "Recursos", slug: "biblioteca-recursos", subtitle: "Accede a whitepapers, e-books y guías técnicas sobre implementación de Inteligencia Artificial.", feature1: "Whitepapers", feature2: "E-books", feature3: "Plantillas Prácticas" },
    { title: "Blog", col: "Recursos", slug: "blog", subtitle: "Artículos de opinión, actualizaciones de producto y mejores prácticas en IA corporativa.", feature1: "Noticias de la Industria", feature2: "Casos de Estudio", feature3: "Insights Técnicos" },
    { title: "Laboratorios Open Labs", col: "Recursos", slug: "open-labs", subtitle: "Espacio de experimentación abierta donde puedes probar nuestros modelos en fase beta.", feature1: "Acceso Beta", feature2: "Prototipado Rápido", feature3: "Innovación Abierta" },
    { title: "Eventos", col: "Recursos", slug: "eventos", subtitle: "Webinars, mesas redondas y eventos presenciales sobre el futuro de la automatización.", feature1: "Webinars Mensuales", feature2: "Eventos Presenciales", feature3: "Masterclasses" },
    { title: "Preguntas frecuentes", col: "Recursos", slug: "preguntas-frecuentes", subtitle: "Encuentra respuestas rápidas a las dudas más comunes sobre despliegue, seguridad y precios.", feature1: "Seguridad y Datos", feature2: "Integración Técnica", feature3: "Facturación" },
    { title: "Glosario de IA de ingresos", col: "Recursos", slug: "glosario-ia", subtitle: "Un diccionario completo para entender los términos técnicos de la Inteligencia Artificial B2B.", feature1: "Términos Clave", feature2: "Conceptos Técnicos", feature3: "Jerga de Negocios" },

    // --- Conecta y aprende ---
    { title: "Contacta con soporte", col: "Conecta y aprende", slug: "contacto-soporte", subtitle: "Nuestro equipo técnico está listo para ayudarte con cualquier incidente o duda de configuración.", feature1: "Soporte 24/7", feature2: "SLA Garantizado", feature3: "Canal Preferente" },
    { title: "Academia Ingeny", col: "Conecta y aprende", slug: "academia", subtitle: "Plataforma de e-learning para certificar a tu equipo en el uso de nuestras tecnologías.", feature1: "Cursos Online", feature2: "Certificaciones", feature3: "Laboratorios Prácticos" },
    { title: "Comunidad", col: "Conecta y aprende", slug: "comunidad", subtitle: "Únete a nuestra red de innovadores, comparte experiencias y descubre nuevos casos de uso.", feature1: "Foro de Usuarios", feature2: "Meetups", feature3: "Proyectos Comunitarios" },
    { title: "Conviértete en defensor", col: "Conecta y aprende", slug: "conviertete-defensor", subtitle: "Programa de embajadores para clientes que están liderando la transformación digital.", feature1: "Beneficios Exclusivos", feature2: "Visibilidad de Marca", feature3: "Acceso Temprano" },
    { title: "Prueba del cliente", col: "Conecta y aprende", slug: "prueba-cliente", subtitle: "Solicita un PoC (Prueba de Concepto) controlado para validar el valor antes de escalar.", feature1: "Diseño de PoC", feature2: "KPIs Medibles", feature3: "Evaluación de Resultados" },

    // --- Compañía ---
    { title: "Acerca de", col: "Compañía", slug: "acerca-de", subtitle: "Conoce nuestra misión, visión y el equipo de ingenieros detrás de Ingeny Labs.", feature1: "Nuestra Misión", feature2: "Equipo Directivo", feature3: "Historia" },
    { title: "Sala de prensa", col: "Compañía", slug: "sala-prensa", subtitle: "Comunicados oficiales, menciones en medios y noticias sobre nuestra expansión.", feature1: "Comunicados", feature2: "Cobertura de Medios", feature3: "Dossier de Prensa" },
    { title: "Carreras profesionales", col: "Compañía", slug: "carreras", subtitle: "Únete al equipo que está construyendo el futuro del trabajo autónomo. ¡Estamos contratando!", feature1: "Cultura Ingeny", feature2: "Vacantes Abiertas", feature3: "Beneficios" },
    { title: "Kit de prensa", col: "Compañía", slug: "kit-prensa", subtitle: "Descarga nuestros logos institucionales, fotos de directivos y manuales de marca.", feature1: "Logos", feature2: "Manual de Marca", feature3: "Fotos Oficiales" },
    { title: "Contáctanos", col: "Compañía", slug: "contactanos", subtitle: "Ponte en contacto con nuestro equipo comercial para iniciar tu camino hacia la eficiencia cognitiva.", feature1: "Oficinas", feature2: "Ventas", feature3: "Partnerships" }
];

async function generatePages() {
    const rootPath = path.join(__dirname);
    const pagesPath = path.join(rootPath, 'pages');
    
    // Crear la carpeta pages si no existe
    if (!fs.existsSync(pagesPath)) {
        fs.mkdirSync(pagesPath);
    }

    // Leer index.html original
    const indexPath = path.join(rootPath, 'index.html');
    let htmlContent = fs.readFileSync(indexPath, 'utf8');

    // 1. Extraer el Header (todo antes de <main>)
    const mainMatch = htmlContent.match(/([\s\S]*?)<main[^>]*>/i);
    if (!mainMatch) {
        console.error("No se encontró la etiqueta <main> en index.html");
        return;
    }
    let headerPart = mainMatch[1];
    
    // Para que los enlaces relativos (css/assets) funcionen en la subcarpeta 'pages', añadimos <base href="../">
    headerPart = headerPart.replace('<head>', '<head>\n    <base href="../" />');

    // 2. Extraer el Footer (desde <footer class="mega-footer"> hasta el final)
    const footerMatch = htmlContent.match(/(<footer class="mega-footer">[\s\S]*)/i);
    if (!footerMatch) {
        console.error("No se encontró el footer en index.html");
        return;
    }
    let footerPart = footerMatch[1];

    // Actualizamos el footer para que los enlaces apunten a las páginas generadas
    // Usaremos un diccionario slug por título
    const slugMap = {};
    pagesData.forEach(p => {
        // Normalizar strings para evitar problemas de tildes/encoding extraños en index.html
        // Ya que index.html tiene "DescripciA3n", vamos a reemplazar los href con regex buscando el innerText, pero el html es sucio.
        // En su lugar, es más seguro simplemente buscar iterativamente todas las etiquetas <a class="footer-link" href="#"> y reemplazarlas en orden.
    });

    let footerLinksCounter = 0;
    // index.html tiene ~40 enlaces con la clase footer-link. Hay uno extra con badge de hiring.
    // Vamos a reemplazar href="#" por href="pages/SLUG.html"
    let indexHtmlUpdated = htmlContent;

    // Actualizar index.html y guardar el footerPart modificado para los sub-html
    pagesData.forEach(page => {
        const route = `pages/${page.slug}.html`;
        // En index.html, reemplazamos la primera ocurrencia de href="#" con el enlace correspondiente.
        // Limitamos al footer usando una función de reemplazo cuidadosa.
        indexHtmlUpdated = indexHtmlUpdated.replace(/<a class="footer-link" href="#"(>| [^>]*>)(.*?<\/a>)/i, `<a class="footer-link" href="${route}"$1$2`);
        footerPart = footerPart.replace(/<a class="footer-link" href="#"(>| [^>]*>)(.*?<\/a>)/i, `<a class="footer-link" href="${page.slug}.html"$1$2`);
    });

    // Guardar index.html actualizado
    fs.writeFileSync(indexPath, indexHtmlUpdated, 'utf8');
    console.log("index.html actualizado con enlaces del footer.");


    // 3. Generar cada página en /pages
    pagesData.forEach(page => {
        const filePath = path.join(pagesPath, `${page.slug}.html`);
        
        // Estructura del main/hero
        const mainContent = `
    <main style="padding-top: 140px; min-height: 80vh; position:relative; z-index:10;">
        <section class="wrap text-center" style="margin-bottom: 80px;">
            <div class="eyebrow"><div class="eyebrow-dot"></div>${page.col.toUpperCase()}</div>
            <h1 class="sh2" style="font-size: clamp(2.8rem, 6vw, 4.5rem); margin-bottom: 24px; color: #fff;">${page.title}</h1>
            <p class="slead" style="margin: 0 auto; max-width: 700px;">${page.subtitle}</p>
        </section>

        <section class="wrap">
            <div class="grid3">
                <div class="card" style="background: rgba(255,255,255,0.02); padding: 32px; border-radius: var(--rad); border: 1px solid var(--card-border);">
                    <h3 style="font-family: 'Cal Sans'; font-size: 1.4rem; margin-bottom: 16px; color: var(--mint);">${page.feature1}</h3>
                    <p style="color: rgba(255,255,255,0.6); line-height: 1.6; font-size: 0.95rem;">Implementamos metodologías de vanguardia para garantizar la escalabilidad y eficiencia operativa en cada faceta de tu ecosistema tecnológico.</p>
                </div>
                <div class="card" style="background: rgba(255,255,255,0.02); padding: 32px; border-radius: var(--rad); border: 1px solid var(--card-border);">
                    <h3 style="font-family: 'Cal Sans'; font-size: 1.4rem; margin-bottom: 16px; color: var(--mint);">${page.feature2}</h3>
                    <p style="color: rgba(255,255,255,0.6); line-height: 1.6; font-size: 0.95rem;">Desbloquea el valor de tus datos con nuestra arquitectura de procesamiento seguro, diseñado específicamente para integraciones B2B complejas.</p>
                </div>
                <div class="card" style="background: rgba(255,255,255,0.02); padding: 32px; border-radius: var(--rad); border: 1px solid var(--card-border);">
                    <h3 style="font-family: 'Cal Sans'; font-size: 1.4rem; margin-bottom: 16px; color: var(--mint);">${page.feature3}</h3>
                    <p style="color: rgba(255,255,255,0.6); line-height: 1.6; font-size: 0.95rem;">Aprovecha la inteligencia de decisiones de Ingeny Labs para mejorar radicalmente los márgenes operativos de tu unidad de negocio.</p>
                </div>
            </div>
        </section>

        <section class="wrap" style="text-align:center; padding: 100px 0;">
            <h2 class="sh2" style="font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 24px;">Impulsa tu organización hoy mismo</h2>
            <p class="slead" style="margin: 0 auto 40px;">¿Listo para integrar ${page.title.toLowerCase()} en tu estrategia corporativa?</p>
            <a class="btn btn-primary" href="https://wa.me/56954679270" target="_blank">Contactar con Ventas</a>
        </section>
    </main>
`;

        const finalHtml = headerPart + mainContent + footerPart;
        fs.writeFileSync(filePath, finalHtml, 'utf8');
        console.log(`Generado: ${page.slug}.html`);
    });

    console.log("¡Todas las páginas del footer generadas exitosamente!");
}

generatePages().catch(console.error);
