import re

filepath = r'C:\Users\josed\Proyectos\ingenylabs\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# H1
content = re.sub(r'<h1 class="hero-h1">[^<]*El cerebro de tu operación,[^<]*en piloto automático.[^<]*</h1>', '<h1 class="hero-h1" style="font-size: clamp(2.5rem, 6vw, 4.5rem);">Automatización Logística con IA:<br>El cerebro de tu operación en piloto automático</h1>', content, flags=re.IGNORECASE)

# H2
content = re.sub(r'<h2 class="sh2">[^<]*Human-Centered AI.[^<]*Humana, ética y eficiente.[^<]*</h2>', '<h2 class="sh2">RPA Cognitivo Human-Centered:<br>Automatización Ética y Eficiente</h2>', content, flags=re.IGNORECASE)
content = re.sub(r'<h2 class="sh2">[^<]*Nuestra especialización[^<]*tecnológica.[^<]*</h2>', '<h2 class="sh2">Especialización en Integración de<br>Sistemas Legacy e IA</h2>', content, flags=re.IGNORECASE)
content = re.sub(r'<h2 class="sh2">[^<]*El ecosistema[^<]*en acción.[^<]*</h2>', '<h2 class="sh2">El ecosistema en acción:<br>Reducción de costos en tiempo real</h2>', content, flags=re.IGNORECASE)
content = re.sub(r'<h2 class="sh2">[^<]*Nuestra metodología: Del[^<]*diagnóstico a la autonomía[^<]*</h2>', '<h2 class="sh2">Nuestra Metodología:<br>Del diagnóstico a la reducción de costos</h2>', content, flags=re.IGNORECASE)

# H3
content = re.sub(r'<h3 class="card-h3">[^<]*Continuidad[^<]*operativa inteligente[^<]*</h3>', '<h3 class="card-h3">Continuidad operativa inteligente<br>y reducción de errores</h3>', content, flags=re.IGNORECASE)
content = re.sub(r'<h3 class="card-h3">[^<]*Ecosistemas de[^<]*automatización[^<]*</h3>', '<h3 class="card-h3">Ecosistemas de automatización<br>y RPA Cognitivo</h3>', content, flags=re.IGNORECASE)
content = re.sub(r'<h3 class="card-h3">[^<]*Inteligencia de[^<]*datos aplicada[^<]*</h3>', '<h3 class="card-h3">Inteligencia de datos aplicada<br>a sistemas legacy</h3>', content, flags=re.IGNORECASE)

# Semantic roles
content = re.sub(r'<div class="card fade-up">', '<article class="card fade-up">', content)
content = re.sub(r'<div class="card">', '<article class="card">', content)

# Since we changed <div class="card"> to <article>, we MUST close them properly.
# The structure of .card is known. 
# <div class="card"> ... </div>
# Fortunately, I can use BeautifulSoup to change tag names without losing indentation if I use a formatter, but it's simpler to do this:
content = content.replace('</article>', '</div>') # clean up any existing mess
# I will NOT use <article>. I will use <div class="card" role="article"> to avoid breaking the DOM.
content = content.replace('<article class="card fade-up">', '<div class="card fade-up" role="article">')
content = content.replace('<article class="card">', '<div class="card" role="article">')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("H1/H2/H3 updated.")
