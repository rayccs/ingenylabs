import re

html_file = 'c:/Users/josed/Proyectos/ingenylabs/index.html'
try:
    with open(html_file, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading {html_file}: {e}")
    exit(1)

# The end of top-bar div
target_str = """                </svg> Acceso OS</a>
        </div>
    </div>"""

new_str = """                </svg> Acceso OS</a>
        </div>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                const news = [
                    { title: "Agentes Cognitivos en 2026: El fin del ingreso manual de datos en sistemas ERP legacy", url: "blog/articulo.html?id=1", btn: "Leer artículo" },
                    { title: "De la Automatización Tradicional a la IA Agéntica: Cómo orquestar la cadena de suministro sin cambiar de software", url: "blog/articulo.html?id=2", btn: "Leer artículo" },
                    { title: "Sistemas Legacy vs. Inteligencia Artificial: Arquitectura 'Zero-Touch' para modernizar operaciones", url: "blog/articulo.html?id=3", btn: "Leer artículo" },
                    { title: "RPA Cognitivo: La evolución tecnológica que está reemplazando al Data Entry en la distribución B2B", url: "blog/articulo.html?id=4", btn: "Leer artículo" },
                    { title: "¿Por qué los 'Copilotos' de IA ya están obsoletos? Bienvenidos a la Era de la IA Agéntica.", url: "blog/articulo.html?id=11", btn: "Leer artículo" }
                ];
                const span = document.querySelector(".top-bar-left span");
                const a = document.querySelector(".top-bar-left .top-bar-link");
                let lastIdx = -1;
                if (span && a) {
                    span.style.transition = "opacity 0.5s ease";
                    a.style.transition = "opacity 0.5s ease";
                    setInterval(function() {
                        span.style.opacity = 0;
                        a.style.opacity = 0;
                        setTimeout(function() {
                            let idx = Math.floor(Math.random() * news.length);
                            while(idx === lastIdx) {
                                idx = Math.floor(Math.random() * news.length);
                            }
                            lastIdx = idx;
                            const item = news[idx];
                            span.textContent = item.title;
                            a.href = item.url;
                            a.innerHTML = item.btn + ' <svg fill="none" height="14" stroke="currentColor" viewbox="0 0 24 24" width="14" style="margin-bottom:-2px; display:inline-block;"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>';
                            span.style.opacity = 1;
                            a.style.opacity = 1;
                        }, 500);
                    }, 4000);
                }
            });
        </script>
    </div>"""

if target_str in content:
    content = content.replace(target_str, new_str)
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully added inline script to top-bar.")
else:
    print("Could not find the target string to replace.")
    exit(1)
