import re

def main():
    try:
        with open('C:\\\\Users\\\\josed\\\\Proyectos\\\\ingenylabs\\\\index.html', 'r', encoding='utf-8') as f:
            html = f.read()

        translations = {
            '<html lang="es"': '<html lang="en"',
            'Tu operación en <br>piloto automático.': 'Your operation on <br>autopilot.',
            'Ecosistema de Arquitectura Cognitiva e integración continua con tus procesos,': 'Cognitive Architecture ecosystem and continuous integration with your processes,',
            'eliminando la fricción operativa para potenciar el talento de tu equipo y': "eliminating operational friction to empower your team's talent and",
            'transformar el esfuerzo manual en rentabilidad.': 'transform manual effort into profitability.',
            'Ver demo en vivo →': 'Watch live demo →',
            'NUESTRO\\n                EQUIPO HA LIDERADO PROYECTOS EN': 'OUR\\n                TEAM HAS LED PROJECTS AT',
            'Human-Centered AI.<br>Humana, Ética y\\n                Eficiente': 'Human-Centered AI.<br>Human, Ethical, and\\n                Efficient',
            'Automatización inteligente que amplifica tus operaciones, reduce costos y libera a tu equipo para lo que\\n                realmente importa.': 'Intelligent automation that amplifies your operations, reduces costs, and frees your team for what\\n                truly matters.',
            'Continuidad<br>Operativa<br>Inteligente': 'Intelligent<br>Operational<br>Continuity',
            'Agentes autónomos que gestionan tus procesos críticos sin supervisión constante. Desde\\n                            aprobaciones y reportes hasta flujos entre sistemas,': 'Autonomous agents that manage your critical processes without constant supervision. From\\n                            approvals and reports to cross-system flows,',
            'tu operación no se detiene aunque tu equipo no\\n                                esté.': "your operation won't stop even when your team is\\n                                away.",
            'Sin migraciones,<br> fácil adopción': 'No migrations,<br> easy adoption',
            'Conectamos nuestros agentes directamente a tu ERP, CRM y sistemas actuales. Sin reemplazar\\n                            herramientas, sin proyectos interminables.': 'We connect our agents directly to your ERP, CRM, and current systems. No replacing\\n                            tools, no endless projects.',
            'Plug & play con tu stack, listo para operar\\n                                desde el primer día.': 'Plug & play with your stack, ready to operate\\n                                from day one.',
            'Rentabilidad con<br>Propósito': 'Profitability with<br>Purpose',
            'Transformamos horas de trabajo manual en margen de ganancia. Recupera hasta un 40% del\\n                            tiempo operativo de tu equipo.': "We transform hours of manual work into profit margin. Recover up to 40% of your\\n                            team's operational time.",
            'Libera tu\\n                                potencial\\n                                Eliminamos las tareas repetitivas para que tus personas se enfoquen en lo que realmente\\n                                importa.': 'Unleash your\\n                                potential.\\n                                We eliminate repetitive tasks so your people can focus on what really\\n                                matters.',
            'Ver cómo funciona →': 'See how it works →',
            'Nuestra\\n                especialización<br>tecnológica': 'Our\\n                technological<br>expertise',
            'Una solución a medida que potencia tu operación. Transformamos tus procesos en el motor autónomo de tu\\n                organización.': "A tailored solution that empowers your operation. We transform your processes into your organization's autonomous\\n                engine.",
            'Ecosistemas de<br>Automatización': 'Automation<br>Ecosystems',
            'Construímos flujos de trabajo\\n                            inteligentes que conectan tus herramientas actuales con IA': 'We build intelligent workflows\\n                            that connect your current tools with AI',
            'para eliminar cuellos de botella\\n                                y reducir tiempos de ejecución drásticamente.': 'to eliminate bottlenecks\\n                                and drastically reduce execution times.',
            'Agentes y<br>Asistentes IA': 'AI Agents &<br>Assistants',
            'Soluciones de lenguaje natural para\\n                            ': 'Natural language solutions for\\n                            ',
            'atención al cliente, soporte técnico o\\n                                gestión interna; un cerebro digital que aprende\\n                                automáticamente de tus procesos y actúa con la voz y el estilo de tu marca.': "customer service, technical support, or\\n                                internal management; a digital brain that automatically learns\\n                                from your processes and acts with your brand's voice and style.",
            'Inteligencia de<br>Datos Aplicada': 'Applied Data<br>Intelligence',
            'Transformamos datos dispersos en\\n                            tableros de control predictivos.': 'We transform scattered data into\\n                            predictive dashboards.',
            'Identificamos oportunidades de ahorro y\\n                                crecimiento en\\n                                tiempo real para decisiones basadas en evidencia.': 'We identify real-time saving and\\n                                growth opportunities for\\n                                evidence-based decisions.',
            '¿Tu desafío requiere una solución única?': 'Does your challenge require a unique solution?',
            'Diseñamos arquitecturas de IA\\n                        personalizadas para problemas que las herramientas estándar no pueden resolver. Unimos visión\\n                        estratégica y ejecución técnica a tu medida.': 'We design custom AI architectures\\n                        for problems that standard tools cannot solve. We merge strategic vision\\n                        and technical execution tailored to you.',
            'Consultar viabilidad de mi proyecto': "Inquire about my project's feasibility",
            'Ecosistema<br>en Acción': 'Ecosystem<br>in Action',
            'Mira cómo nuestra Arquitectura Cognitiva transforma operaciones en tiempo real. Selecciona un caso de\\n                uso para ver la demostración interactiva.': 'Watch how our Cognitive Architecture transforms operations in real-time. Select a use case to view\\n                the interactive demonstration.',
            'Logística "Zero-Touch"': '"Zero-Touch" Logistics',
            'Ingeny Labs lee correos B2B desordenados, extrae SKUs implícitos e inyecta las Órdenes de\\n                            Compra directamente a tu': 'Ingeny Labs reads chaotic B2B emails, extracts implicit SKUs, and injects Purchase Orders\\n                            directly into your',
            'ERP corporativo': 'corporate ERP',
            ', rebajando inventario sin\\n                            intervención humana.': ', reducing inventory without\\n                            human intervention.',
            'Compliance Financiero': 'Financial Compliance',
            'Onboarding corporativo inteligente. Visión artificial escanea actas notariales en PDF, cruza\\n                            datos con listas de riesgo gubernamentales y aprueba expedientes automáticamente en el': 'Intelligent corporate onboarding. Computer vision scans notary PDFs, cross-references\\n                            data with government risk lists, and automatically approves files in the',
            'Dashboard de Riesgo': 'Risk Dashboard',
            'Soporte Interno Inteligente': 'Intelligent Internal Support',
            'Análisis de multi-intención en Slack/Teams. Un empleado pide vacaciones (la IA resuelve\\n                            entregando la política) y reporta un fallo de VPN, donde la IA': 'Multi-intent analysis in Slack/Teams. An employee requests vacation (the AI resolves\\n                            it by delivering the policy) and reports a VPN failure, where the AI',
            'crea y escala un\\n                                ticket en Jira': 'creates and escalates a\\n                                ticket in Jira',
            ' simultáneamente.': ' simultaneously.',
            'Nuestra Metodología:\\n                Del<br>Diagnóstico a la\\n                Autonomía': 'Our Methodology:\\n                From<br>Diagnosis to\\n                Autonomy',
            'Nos alineamos a los objetivos de tu\\n                organización, priorizando siempre una experiencia de usuario intuitiva y de alto rendimiento.': "We align with your organization's\\n                goals, always prioritizing an intuitive, high-performance user experience.",
            '1. Diagnóstico y Roadmap': '1. Diagnosis & Roadmap',
            'No empezamos con código, sino con\\n                            entendimiento. Analizamos tu arquitectura actual para identificar los puntos de mayor\\n                            impacto y trazamos una hoja de ruta técnica alineada con tus objetivos de negocio.': "We don't start with code, but with\\n                            understanding. We analyze your current architecture to identify the highest\\n                            impact points and map out a technical roadmap aligned with your business goals.",
            '2. Desarrollo e Integración': '2. Development & Integration',
            'Construimos tu solución a medida\\n                            utilizando los modelos más avanzados de IA. Nos aseguramos de que el sistema se integre de\\n                            forma fluida y ética con tus herramientas y equipo humano.': 'We build your custom solution\\n                            using the most advanced AI models. We ensure the system integrates fluidly and\\n                            ethically with your tools and human team.',
            '3. Despliegue y Optimización': '3. Deployment & Optimization',
            'Lanzamos la solución y monitoreamos\\n                            su rendimiento en tiempo real. Ajustamos y escalamos para garantizar que tu motor de IA\\n                            aprenda, evolucione y entregue resultados medibles desde el primer día.': 'We launch the solution and monitor\\n                            its real-time performance. We adjust and scale to guarantee your AI engine\\n                            learns, evolves, and delivers measurable results from day one.',
            'Nuestra Visión: El futuro de\\n                la<br>colaboración': 'Our Vision: The future of\\n                <br>collaboration',
            'Visualizamos un ecosistema donde la tecnología no reemplaza el\\n                    talento, sino que lo libera.': "We envision an ecosystem where technology doesn't replace\\n                    talent, but rather unleashes it.",
            'Diseñamos un mañana empresarial donde la fricción operativa desaparece, permitiendo que agentes de IA y\\n                equipos humanos colaboren fluidamente. Nuestra meta es que tu organización deje de ocuparse de lo\\n                repetitivo para enfocarse puramente en la innovación y la estrategia.': 'We design a corporate tomorrow where operational friction disappears, allowing AI agents and\\n                human teams to collaborate seamlessly. Our goal is for your organization to stop dealing with\\n                repetitive tasks to focus purely on innovation and strategy.',
            '¿Listo para integrar\\n                verdadera<br>inteligencia en\\n                tus procesos?': 'Ready to integrate\\n                true<br>intelligence into\\n                your processes?',
            'Diseñamos soluciones de IA a medida que resuelven desafíos reales, garantizando una adopción fluida y\\n                resultados medibles.': 'We design custom AI solutions that solve real challenges, guaranteeing smooth adoption and\\n                measurable results.',
            'Ya sea en el sector privado o a través de\\n                    Mercado\\n                    Público': 'Whether in the private sector or the\\n                    public\\n                    sector',
            ', somos el socio estratégico que tu organización necesita para liderar el cambio.': ', we are the strategic partner your organization needs to lead the change.',
            'Agendar Consultoría Estratégica': 'Schedule Strategic Consulting',
            'Proveedor acreditado en Mercado Público | Expertos\\n                    en\\n                    soluciones para instituciones y grandes empresas.': 'Certified public government supplier | Experts\\n                    in\\n                    solutions for institutions and large corporations.',
            '&copy; 2026 Ingeny Labs. Todos los derechos reservados.': '&copy; 2026 Ingeny Labs. All rights reserved.',
            'Agenda una auditoría': 'Schedule an audit'
        }

        # Specific HTML token replacements
        html = html.replace('<a href="#nosotros" class="nav-link hover:text-ingeny-green transition-colors">Nosotros</a>', '<a href="#nosotros" class="nav-link hover:text-ingeny-green transition-colors">Us</a>')
        html = html.replace('<a href="#servicios" class="nav-link hover:text-ingeny-green transition-colors">Servicios</a>', '<a href="#servicios" class="nav-link hover:text-ingeny-green transition-colors">Services</a>')
        html = html.replace('<a href="#casos-uso" class="nav-link hover:text-ingeny-green transition-colors">Casos de Uso</a>', '<a href="#casos-uso" class="nav-link hover:text-ingeny-green transition-colors">Use Cases</a>')
        html = html.replace('<a href="#metodologia" class="nav-link hover:text-ingeny-green transition-colors">Metodología</a>', '<a href="#metodologia" class="nav-link hover:text-ingeny-green transition-colors">Methodology</a>')
        html = html.replace('<a href="#contacto" class="nav-link hover:text-ingeny-green transition-colors">Contacto</a>', '<a href="#contacto" class="nav-link hover:text-ingeny-green transition-colors">Contact</a>')
        html = html.replace('<a href="#nosotros" class="mobile-link hover:text-ingeny-green transition-colors">Nosotros</a>', '<a href="#nosotros" class="mobile-link hover:text-ingeny-green transition-colors">Us</a>')
        html = html.replace('<a href="#servicios" class="mobile-link hover:text-ingeny-green transition-colors">Servicios</a>', '<a href="#servicios" class="mobile-link hover:text-ingeny-green transition-colors">Services</a>')
        html = html.replace('<a href="#casos-uso" class="mobile-link hover:text-ingeny-green transition-colors">Casos de Uso</a>', '<a href="#casos-uso" class="mobile-link hover:text-ingeny-green transition-colors">Use Cases</a>')
        html = html.replace('<a href="#metodologia" class="mobile-link hover:text-ingeny-green transition-colors">Metodología</a>', '<a href="#metodologia" class="mobile-link hover:text-ingeny-green transition-colors">Methodology</a>')
        html = html.replace('<a href="#contacto" class="mobile-link hover:text-ingeny-green transition-colors">Contacto</a>', '<a href="#contacto" class="mobile-link hover:text-ingeny-green transition-colors">Contact</a>')


        for es, en in translations.items():
            html = html.replace(es, en)

        # Language switcher for en.html
        switcherEN = """<div class="flex gap-1 sm:gap-2 text-xs sm:text-sm font-bold bg-white/5 rounded-full p-1 border border-white/10 shrink-0">
                <a href="index.html" class="px-2 sm:px-3 py-1 text-white hover:text-ingeny-green transition-colors rounded-full text-center min-w-[32px]">ES</a>
                <a href="en.html" class="px-2 sm:px-3 py-1 bg-ingeny-green text-black rounded-full text-center min-w-[32px]">EN</a>
            </div>"""

        import re
        html = re.sub(r'<div class="hidden md:flex items-center gap-6">\s*<a href="https://wa\.me', f'<div class="hidden md:flex items-center gap-4">\n            {switcherEN}\n            <a href="https://wa.me', html)
        
        mobileSwitcherEN = """<div class="flex justify-center gap-2 text-xl font-bold bg-white/5 rounded-full p-1 border border-white/10 mb-4 mx-auto w-fit">
            <a href="index.html" class="px-5 py-2 text-white hover:text-ingeny-green transition-colors rounded-full">ES</a>
            <a href="en.html" class="px-5 py-2 bg-ingeny-green text-black rounded-full">EN</a>
        </div>"""
        
        html = re.sub(r'<a href="#nosotros" class="mobile-link', f'{mobileSwitcherEN}\n        <a href="#nosotros" class="mobile-link', html)

        with open('C:\\\\Users\\\\josed\\\\Proyectos\\\\ingenylabs\\\\en.html', 'w', encoding='utf-8') as f:
            f.write(html)
            
        print("Done")
    except Exception as e:
        print(e)

if __name__ == "__main__":
    main()
