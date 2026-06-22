import re

html_file = 'c:/Users/josed/Proyectos/ingenylabs/index.html'
with open(html_file, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

top_bar_left_pattern = re.compile(r'(<div class="top-bar-left">)(.*?)(</div>\s*<div class="top-bar-right">)', re.DOTALL)

match = top_bar_left_pattern.search(content)

if match:
    # We will replace the contents of top-bar-left, and add our news-ticker container
    new_inner = """
            <svg fill="none" height="16" stroke="currentColor" viewbox="0 0 24 24" width="16" style="flex-shrink: 0; margin-top:2px;">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            <div id="news-ticker" style="position: relative; height: 20px; display: flex; align-items: center; flex-grow: 1; margin-left: 8px; overflow: hidden;">
                <!-- items inserted by JS -->
            </div>
        """
    content = content[:match.start(2)] + new_inner + content[match.start(3):]
    print("Replaced top-bar-left content.")
else:
    print("Could not find top-bar-left.")
    exit(1)

# Now inject the JS script before </body>
script_to_inject = """
    <!-- NEWS TICKER SCRIPT -->
    <script>
    document.addEventListener("DOMContentLoaded", () => {
        const news = [
            { title: "Agentes Cognitivos en 2026: El fin del ingreso manual de datos en sistemas ERP legacy", url: "blog/articulo.html?id=1" },
            { title: "De la Automatización Tradicional a la IA Agéntica: Cómo orquestar la cadena de suministro", url: "blog/articulo.html?id=2" },
            { title: "Sistemas Legacy vs. Inteligencia Artificial: Arquitectura 'Zero-Touch'", url: "blog/articulo.html?id=3" },
            { title: "RPA Cognitivo: La evolución tecnológica que está reemplazando al Data Entry", url: "blog/articulo.html?id=4" },
            { title: "¿Por qué los 'Copilotos' de IA ya están obsoletos? Bienvenidos a la Era Agéntica.", url: "blog/articulo.html?id=11" }
        ];
        
        const tickerContainer = document.getElementById("news-ticker");
        if (!tickerContainer) return;
        
        news.forEach((item, i) => {
            const el = document.createElement("div");
            el.className = "ticker-item";
            el.style.position = "absolute";
            el.style.left = "0";
            el.style.top = "50%";
            el.style.transform = "translateY(-50%) translateY(15px)";
            el.style.opacity = "0";
            el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
            el.style.whiteSpace = "nowrap";
            el.style.pointerEvents = "none";
            el.style.width = "100%";
            el.style.display = "flex";
            el.style.alignItems = "center";
            
            el.innerHTML = `<span style="margin-right: 8px; font-weight: 600; color: #CCFFD3;">NUEVO:</span> <span style="margin-right: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 600px;">${item.title}</span> <a class="top-bar-link" href="${item.url}" style="pointer-events: auto; white-space: nowrap; flex-shrink: 0;">Leer artículo <svg fill="none" height="14" stroke="currentColor" viewBox="0 0 24 24" width="14" style="display:inline; vertical-align:middle; margin-top:-2px;"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></a>`;
            
            tickerContainer.appendChild(el);
        });
        
        const items = tickerContainer.querySelectorAll('.ticker-item');
        let currentIndex = 0;
        
        function showItem(index) {
            items.forEach((item, i) => {
                if (i === index) {
                    item.style.opacity = "1";
                    item.style.transform = "translateY(-50%) translateY(0)";
                    item.style.pointerEvents = "auto";
                    item.style.textShadow = "0 0 10px rgba(255,255,255,0.2)";
                    setTimeout(() => item.style.textShadow = "none", 800);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "translateY(-50%) translateY(-15px)";
                    item.style.pointerEvents = "none";
                    setTimeout(() => {
                        if (item.style.opacity === "0") {
                            item.style.transition = "none";
                            item.style.transform = "translateY(-50%) translateY(15px)";
                            setTimeout(() => item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", 50);
                        }
                    }, 600);
                }
            });
        }
        
        if (items.length > 0) {
            showItem(0);
            setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                showItem(currentIndex);
            }, 5000);
        }
    });
    </script>
</body>"""

if "<!-- NEWS TICKER SCRIPT -->" not in content:
    content = content.replace("</body>", script_to_inject)
    print("Injected script.")

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html updated successfully!")
