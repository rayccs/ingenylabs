const fs = require('fs');
const path = require('path');

async function generateAgentPages() {
    const rootPath = path.join(__dirname);
    const pagesPath = path.join(rootPath, 'agentes');
    
    if (!fs.existsSync(pagesPath)) {
        fs.mkdirSync(pagesPath);
    }

    const dictPath = path.join(rootPath, 'agent_copy_dictionary.json');
    const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

    const indexPath = path.join(rootPath, 'index.html');
    let htmlContent = fs.readFileSync(indexPath, 'utf8');

    // 1. Extraer Header y Footer
    const mainMatch = htmlContent.match(/([\s\S]*?)<main[^>]*>/i);
    if (!mainMatch) {
        console.error("No se encontró <main> en index.html");
        return;
    }
    let headerPart = mainMatch[1];
    headerPart = headerPart.replace('<head>', '<head>\n    <base href="../" />');

    const footerMatch = htmlContent.match(/(<footer class="mega-footer">[\s\S]*)/i);
    if (!footerMatch) {
        console.error("No se encontró el footer en index.html");
        return;
    }
    let footerPart = footerMatch[1];

    // 2. Extraer Módulos y Agentes del menú
    // Buscamos bloques enteros de módulos: <div class="mega-module"> ... </div>
    const moduleRegex = /<div class="mega-title"[^>]*>([^<]+)<\/div>([\s\S]*?)(?=<(?:div class="mega-module"|div class="mega-card"|<\/div>\s*<\/div>\s*<!-- Ventas B2B -->))/gi;
    
    // Una aproximación más sencilla: iterar sobre cada mega-item y buscar hacia atrás el mega-title más cercano.
    const agentRegex = /<a[^>]*class="mega-item"[^>]*>[\s\S]*?<span class="mega-heading">([^<]+)<\/span>[\s\S]*?<span class="mega-desc">([^<]+)<\/span>[\s\S]*?<\/a>/gi;
    
    let agents = [];
    let match;
    while ((match = agentRegex.exec(htmlContent)) !== null) {
        const aTag = match[0];
        const linkMatch = aTag.match(/data-app-link="([^"]+)"/);
        const appLink = linkMatch ? linkMatch[1] : '/';
        
        let name = match[1].trim();
        let desc = match[2].trim();
        
        // Limpieza de caracteres extraños
        name = name.replace(/Ã³/g, 'ó').replace(/Ã­/g, 'í').replace(/Ã±/g, 'ñ').replace(/Ã¡/g, 'á').replace(/Ã©/g, 'é').replace(/AA3/g, 'ó').replace(/AA-/g, 'í');
        desc = desc.replace(/Ã³/g, 'ó').replace(/Ã­/g, 'í').replace(/Ã±/g, 'ñ').replace(/Ã¡/g, 'á').replace(/Ã©/g, 'é');

        let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Encontrar a qué módulo pertenece buscando hacia atrás el "mega-title"
        const textBefore = htmlContent.substring(0, match.index);
        const titleMatches = textBefore.match(/<div class="mega-title"[^>]*>([^<]+)<\/div>/g);
        let moduleName = "Default";
        if (titleMatches && titleMatches.length > 0) {
            const lastTitleStr = titleMatches[titleMatches.length - 1];
            const cleanModuleMatch = lastTitleStr.match(/>([^<]+)</);
            if (cleanModuleMatch) {
                let cleanModule = cleanModuleMatch[1].trim();
                if (cleanModule.includes('Finanzas')) moduleName = 'Finanzas';
                else if (cleanModule.includes('RRHH')) moduleName = 'RRHH';
                else if (cleanModule.includes('Supply') || cleanModule.includes('Logística')) moduleName = 'Logistica';
                else if (cleanModule.includes('Ventas') || cleanModule.includes('Marketing')) moduleName = 'Ventas';
                else if (cleanModule.includes('Legal')) moduleName = 'Legal';
            }
        }
        
        agents.push({ name, desc, slug, appLink, moduleName, originalHTML: aTag });
    }

    console.log(`Se encontraron ${agents.length} agentes en el menú.`);

    let indexHtmlUpdated = htmlContent;

    agents.forEach(agent => {
        const route = `agentes/${agent.slug}.html`;
        
        // Actualizar index y footer con enlace
        const updatedATag = agent.originalHTML.replace(/href="[^"]*"/, `href="${route}"`);
        indexHtmlUpdated = indexHtmlUpdated.replace(agent.originalHTML, updatedATag);
        footerPart = footerPart.replace(agent.originalHTML, updatedATag.replace(`href="agentes/`, `href="../agentes/`)); 

        // 3. Obtener el copy del diccionario
        const copy = dictionary[agent.moduleName] || dictionary["Default"];

        // 4. Plantilla de Ventas Dinámica
        const mainContent = `
    <main style="padding-top: 120px; min-height: 100vh; position:relative; z-index:10;">
        
        <!-- CSS -->
        <style>
            .agent-hero { padding: 80px 5%; display: flex; align-items: center; justify-content: space-between; gap: 40px; max-width: 1400px; margin: 0 auto; }
            .agent-hero-text { flex: 1; min-width: 300px; }
            .agent-hero-img { flex: 1; text-align: center; position: relative; }
            .agent-hero-img .mockup { width: 100%; max-width: 500px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
            
            .agent-section { padding: 100px 5%; max-width: 1200px; margin: 0 auto; }
            .agent-title-sm { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin-bottom: 16px; display: block; }
            
            .problem-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 40px; }
            .problem-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 40px 30px; border-radius: 16px; }
            
            .steps-container { display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap; }
            .step-card { flex: 1; min-width: 250px; background: rgba(36, 189, 88, 0.05); border: 1px solid rgba(36, 189, 88, 0.2); padding: 40px 30px; border-radius: 16px; position: relative; }
            .step-num { position: absolute; top: 20px; right: 20px; font-size: 3rem; font-weight: bold; color: rgba(36, 189, 88, 0.1); line-height: 1; }
            
            .feature-row { display: flex; align-items: center; justify-content: space-between; gap: 40px; margin-bottom: 80px; flex-wrap: wrap; }
            .feature-row:nth-child(even) { flex-direction: row-reverse; }
            .feature-text { flex: 1; min-width: 300px; }
            .feature-img { flex: 1; text-align: center; }
            .feature-img img { width: 100%; max-width: 450px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
            
            .faq-item { border-bottom: 1px solid rgba(255,255,255,0.1); padding: 24px 0; }
            .faq-q { font-size: 1.2rem; font-weight: 500; color: #fff; margin-bottom: 8px; }
            .faq-a { color: var(--muted); line-height: 1.6; }
            
            .cta-banner { background: linear-gradient(135deg, rgba(36, 189, 88, 0.2) 0%, rgba(0,0,0,0) 100%); border: 1px solid rgba(36, 189, 88, 0.3); padding: 80px 5%; border-radius: 24px; text-align: center; margin: 100px auto; max-width: 1000px; }
        </style>

        <!-- HERO -->
        <section class="agent-hero">
            <div class="agent-hero-text">
                <span style="display:inline-block; padding: 6px 16px; background: rgba(255,255,255,0.05); border-radius: 20px; font-size: 0.85rem; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.1);">Plataforma Ingeny Labs</span>
                <h1 style="font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1.1; margin-bottom: 24px; color: #fff; font-family: 'Cal Sans', sans-serif;">
                    Solución <span style="color: var(--mint);">${agent.name}</span>
                </h1>
                <p style="font-size: 1.2rem; color: var(--muted); margin-bottom: 40px; line-height: 1.6; max-width: 500px;">
                    ${agent.desc}
                </p>
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <a href="#" data-app-link="${agent.appLink}" class="btn btn-primary" style="padding: 18px 40px; font-size: 1.1rem;" onclick="redirectToApp(event)">Empezar Gratis</a>
                </div>
            </div>
            <div class="agent-hero-img">
                <div style="width:100%; height: 500px; background: rgba(255,255,255,0.02); border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; position:relative; overflow:hidden;">
                    <div style="position:absolute; inset:0; background: radial-gradient(circle at 50% 50%, rgba(36,189,88,0.1) 0%, transparent 70%);"></div>
                    <div style="background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; width: 80%; height: 70%; padding: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); backdrop-filter: blur(10px);">
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
                            <div style="width:12px; height:12px; border-radius:50%; background:#ff5f56;"></div>
                            <div style="width:12px; height:12px; border-radius:50%; background:#ffbd2e;"></div>
                            <div style="width:12px; height:12px; border-radius:50%; background:#27c93f;"></div>
                            <span style="margin-left:10px; font-size:0.8rem; color:var(--muted);">${agent.name} - Consola</span>
                        </div>
                        <div style="height: 20px; width: 60%; background: rgba(255,255,255,0.05); border-radius: 4px; margin-bottom: 16px;"></div>
                        <div style="height: 20px; width: 80%; background: rgba(255,255,255,0.05); border-radius: 4px; margin-bottom: 16px;"></div>
                        <div style="height: 60px; width: 100%; background: rgba(36,189,88,0.1); border-radius: 8px; margin-bottom: 16px; border: 1px solid rgba(36,189,88,0.3);"></div>
                        <div style="height: 20px; width: 40%; background: rgba(255,255,255,0.05); border-radius: 4px;"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PROBLEMA -->
        <section class="agent-section">
            <span class="agent-title-sm">El Desafío</span>
            <h2 style="font-size: clamp(2rem, 4vw, 3rem); color: #fff;">${copy.problem_title}</h2>
            <p style="color: var(--muted); font-size: 1.1rem; margin-top: 16px; max-width: 600px;">
                ${copy.problem_desc}
            </p>
            
            <div class="problem-grid">
                <div class="problem-card">
                    <i class="ri-alert-line" style="font-size: 2rem; color: var(--muted); margin-bottom: 16px; display:block;"></i>
                    <h3 style="color:#fff; font-size:1.2rem; margin-bottom:12px;">${copy.p1_title}</h3>
                    <p style="color:var(--muted); font-size:0.95rem;">${copy.p1_desc}</p>
                </div>
                <div class="problem-card">
                    <i class="ri-timer-line" style="font-size: 2rem; color: var(--muted); margin-bottom: 16px; display:block;"></i>
                    <h3 style="color:#fff; font-size:1.2rem; margin-bottom:12px;">${copy.p2_title}</h3>
                    <p style="color:var(--muted); font-size:0.95rem;">${copy.p2_desc}</p>
                </div>
                <div class="problem-card">
                    <i class="ri-error-warning-line" style="font-size: 2rem; color: var(--muted); margin-bottom: 16px; display:block;"></i>
                    <h3 style="color:#fff; font-size:1.2rem; margin-bottom:12px;">${copy.p3_title}</h3>
                    <p style="color:var(--muted); font-size:0.95rem;">${copy.p3_desc}</p>
                </div>
            </div>
        </section>

        <!-- PASOS -->
        <section class="agent-section">
            <span class="agent-title-sm">Cómo funciona</span>
            <h2 style="font-size: clamp(2rem, 4vw, 3rem); color: #fff;">${copy.step_title}</h2>
            <p style="color: var(--muted); font-size: 1.1rem; margin-top: 16px; max-width: 600px;">
                ${copy.step_desc}
            </p>
            
            <div class="steps-container">
                <div class="step-card">
                    <div class="step-num">01</div>
                    <h3 style="color:#fff; font-size:1.2rem; margin-bottom:12px;">${copy.s1_title}</h3>
                    <p style="color:var(--muted); font-size:0.95rem;">${copy.s1_desc}</p>
                </div>
                <div class="step-card">
                    <div class="step-num">02</div>
                    <h3 style="color:#fff; font-size:1.2rem; margin-bottom:12px;">${copy.s2_title}</h3>
                    <p style="color:var(--muted); font-size:0.95rem;">${copy.s2_desc}</p>
                </div>
                <div class="step-card">
                    <div class="step-num">03</div>
                    <h3 style="color:#fff; font-size:1.2rem; margin-bottom:12px;">${copy.s3_title}</h3>
                    <p style="color:var(--muted); font-size:0.95rem;">${copy.s3_desc}</p>
                </div>
            </div>
        </section>

        <!-- FEATURES -->
        <section class="agent-section">
            <span class="agent-title-sm">Beneficios Clave</span>
            <h2 style="font-size: clamp(2rem, 4vw, 3rem); color: #fff; margin-bottom: 80px;">Resultados <span style="color:var(--mint);">tangibles.</span></h2>
            
            <div class="feature-row">
                <div class="feature-text">
                    <h3 style="font-size: 1.8rem; color:#fff; margin-bottom:16px;">${copy.feat1_title}</h3>
                    <p style="color:var(--muted); font-size:1.1rem; line-height:1.6;">
                        ${copy.feat1_desc}
                    </p>
                </div>
                <div class="feature-img">
                    <div style="width:100%; height:300px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:16px;"></div>
                </div>
            </div>

            <div class="feature-row">
                <div class="feature-text">
                    <h3 style="font-size: 1.8rem; color:#fff; margin-bottom:16px;">${copy.feat2_title}</h3>
                    <p style="color:var(--muted); font-size:1.1rem; line-height:1.6;">
                        ${copy.feat2_desc}
                    </p>
                </div>
                <div class="feature-img">
                    <div style="width:100%; height:300px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:16px;"></div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="agent-section" style="border-top: 1px solid rgba(255,255,255,0.05);">
            <div style="display:flex; flex-wrap:wrap; gap:60px;">
                <div style="flex: 1; min-width:300px;">
                    <span class="agent-title-sm">Preguntas Frecuentes</span>
                    <h2 style="font-size: clamp(2rem, 4vw, 3rem); color: #fff;">Respondemos tus <span style="color:var(--mint);">dudas.</span></h2>
                </div>
                <div style="flex: 2; min-width:300px;">
                    <div class="faq-item">
                        <div class="faq-q">${copy.faq1_q}</div>
                        <div class="faq-a">${copy.faq1_a}</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-q">${copy.faq2_q}</div>
                        <div class="faq-a">${copy.faq2_a}</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-q">${copy.faq3_q}</div>
                        <div class="faq-a">${copy.faq3_a}</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-q">${copy.faq4_q}</div>
                        <div class="faq-a">${copy.faq4_a}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FINAL CTA -->
        <section class="agent-section">
            <div class="cta-banner fade-up">
                <h2 style="font-size: clamp(2.5rem, 5vw, 4rem); color: #fff; line-height: 1.1; margin-bottom: 24px;">
                    Integración lista en<br>menos de 10 minutos.
                </h2>
                <p style="color: rgba(255,255,255,0.7); font-size: 1.2rem; margin-bottom: 40px;">
                    Activa la plataforma y deja que la IA trabaje por ti.
                </p>
                <a href="#" data-app-link="${agent.appLink}" class="btn btn-primary" style="padding: 20px 50px; font-size: 1.2rem; display:inline-block;" onclick="redirectToApp(event)">Iniciar ahora →</a>
            </div>
        </section>
        
        <script>
            function redirectToApp(e) {
                e.preventDefault();
                const path = e.target.getAttribute('data-app-link') || '/';
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const baseUrl = isLocal ? 'http://localhost:3000' : 'https://os.ingenylabs.com';
                window.location.href = path === '/' ? baseUrl : baseUrl + path;
            }
        </script>
    </main>
`;

        const finalHtml = headerPart + mainContent + footerPart;
        const filePath = path.join(pagesPath, `${agent.slug}.html`);
        fs.writeFileSync(filePath, finalHtml, 'utf8');
    });

    fs.writeFileSync(indexPath, indexHtmlUpdated, 'utf8');
    console.log("¡Todas las páginas de agentes han sido regeneradas con contenido específico de su módulo!");
}

generateAgentPages().catch(console.error);
