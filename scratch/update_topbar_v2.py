import re

html_file = 'c:/Users/josed/Proyectos/ingenylabs/index.html'
try:
    with open(html_file, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading {html_file}: {e}")
    exit(1)

# Add ID to span
original_span = """            <span>¿Cómo está impactando la IA en las operaciones corporativas? Descúbrelo en nuestro último
                informe.</span>"""
new_span = """            <span id="top-bar-text">¿Cómo está impactando la IA en las operaciones corporativas? Descúbrelo en nuestro último
                informe.</span>"""

if original_span in content:
    content = content.replace(original_span, new_span)
else:
    print("Could not find original span.")
    exit(1)

# Add ID to link
original_link = """            <a class="top-bar-link" href="#soluciones">Ver Blueprint de IA <svg fill="none" height="14"
                    stroke="currentColor" viewbox="0 0 24 24" width="14">
                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg></a>"""
new_link = """            <a id="top-bar-btn" class="top-bar-link" href="#soluciones">Ver Blueprint de IA <svg fill="none" height="14"
                    stroke="currentColor" viewbox="0 0 24 24" width="14">
                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg></a>"""

if original_link in content:
    content = content.replace(original_link, new_link)
else:
    print("Could not find original link.")
    exit(1)


script_to_inject = """
    <!-- Top Bar News Rotator -->
    <script>
    document.addEventListener("DOMContentLoaded", () => {
        const news = [
            { title: "Agentes Cognitivos en 2026: El fin del ingreso manual de datos en sistemas ERP legacy", url: "blog/articulo.html?id=1", btn: "Leer artículo" },
            { title: "De la Automatización Tradicional a la IA Agéntica: Cómo orquestar la cadena de suministro sin cambiar de software", url: "blog/articulo.html?id=2", btn: "Leer artículo" },
            { title: "Sistemas Legacy vs. Inteligencia Artificial: Arquitectura 'Zero-Touch' para modernizar operaciones", url: "blog/articulo.html?id=3", btn: "Leer artículo" },
            { title: "RPA Cognitivo: La evolución tecnológica que está reemplazando al Data Entry en la distribución B2B", url: "blog/articulo.html?id=4", btn: "Leer artículo" },
            { title: "¿Por qué los 'Copilotos' de IA ya están obsoletos? Bienvenidos a la Era de la IA Agéntica.", url: "blog/articulo.html?id=11", btn: "Leer artículo" }
        ];
        
        const textSpan = document.getElementById("top-bar-text");
        const linkBtn = document.getElementById("top-bar-btn");
        
        if (!textSpan || !linkBtn) return;
        
        let currentIndex = 0;
        
        textSpan.style.transition = "opacity 0.4s ease";
        linkBtn.style.transition = "opacity 0.4s ease";
        
        setInterval(() => {
            textSpan.style.opacity = "0";
            linkBtn.style.opacity = "0";
            
            setTimeout(() => {
                let newIndex = currentIndex;
                while (newIndex === currentIndex) {
                    newIndex = Math.floor(Math.random() * news.length);
                }
                currentIndex = newIndex;
                
                const item = news[currentIndex];
                textSpan.textContent = item.title;
                linkBtn.href = item.url;
                
                linkBtn.innerHTML = item.btn + ' <svg fill="none" height="14" stroke="currentColor" viewbox="0 0 24 24" width="14"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>';
                
                textSpan.style.opacity = "1";
                linkBtn.style.opacity = "1";
            }, 400);
        }, 5000);
    });
    </script>
</body>"""

if "<!-- Top Bar News Rotator -->" not in content:
    content = content.replace("</body>", script_to_inject)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Update successful!")
