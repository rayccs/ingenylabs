import re

filepath = r'C:\Users\josed\Proyectos\ingenylabs\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Main tags
content = content.replace('<!-- Mobile menu -->', '<main id="main-content">\n    <!-- Mobile menu -->')
content = content.replace('<!-- ═══════════════ FOOTER ═══════════════ -->', '</main>\n\n    <!-- ═══════════════ FOOTER ═══════════════ -->')

# 2. H1
content = content.replace(
    '<h1 class="hero-h1">El cerebro de tu operación, en piloto automático.</h1>',
    '<h1 class="hero-h1">Automatización Logística con IA: El cerebro de tu operación en piloto automático</h1>'
)

# 3. H2
content = content.replace(
    '<h2 class="sh2">Human-Centered AI. Humana, ética y eficiente.</h2>',
    '<h2 class="sh2">RPA Cognitivo Human-Centered: Automatización Ética y Eficiente</h2>'
)
content = content.replace(
    '<h2 class="sh2">Nuestra especialización tecnológica.</h2>',
    '<h2 class="sh2">Especialización en Integración de Sistemas Legacy e IA</h2>'
)
content = content.replace(
    '<h2 class="sh2">El ecosistema en acción.</h2>',
    '<h2 class="sh2">El ecosistema en acción: Reducción de costos en tiempo real</h2>'
)
content = content.replace(
    '<h2 class="sh2">Nuestra metodología: Del diagnóstico a la autonomía</h2>',
    '<h2 class="sh2">Nuestra Metodología: Del diagnóstico a la reducción de costos</h2>'
)

# 4. H3
content = content.replace(
    '<h3 class="card-h3">Continuidad operativa inteligente</h3>',
    '<h3 class="card-h3">Continuidad operativa inteligente y reducción de errores</h3>'
)
content = content.replace(
    '<h3 class="card-h3">Rentabilidad con<br>propósito</h3>',
    '<h3 class="card-h3">Rentabilidad con<br>reducción de costos operativos</h3>'
)
content = content.replace(
    '<h3 class="card-h3">Ecosistemas de automatización</h3>',
    '<h3 class="card-h3">Ecosistemas de automatización y RPA Cognitivo</h3>'
)
content = content.replace(
    '<h3 class="card-h3">Inteligencia de datos aplicada</h3>',
    '<h3 class="card-h3">Inteligencia de datos aplicada a sistemas legacy</h3>'
)

# 5. Alts
content = content.replace('alt="ChileCompra"', 'alt="Proveedor de estado ChileCompra: Automatización de procesos para instituciones públicas"')
content = content.replace('alt="Volvo"', 'alt="Optimización y automatización logística para clientes corporativos como Volvo"')
content = content.replace('alt="Banco Falabella"', 'alt="Automatización financiera y sistemas legacy para Banco Falabella"')
content = content.replace('alt="Mercedes Benz"', 'alt="Operaciones automatizadas para Mercedes Benz"')
content = content.replace('alt="Shell"', 'alt="Automatización de procesos para Shell"')
content = content.replace('alt="Open English"', 'alt="Automatización de operaciones corporativas para Open English"')
content = content.replace('alt="Continuidad Operativa"', 'alt="Panel de control de agentes de IA para continuidad operativa"')
content = content.replace('alt="Sin complicaciones"', 'alt="Integración sin complicaciones con sistemas legacy"')
content = content.replace('alt="Rentabilidad"', 'alt="Rentabilidad mediante reducción de costos y automatización"')
content = content.replace('alt="Automatización"', 'alt="Plataforma de automatización B2B"')
content = content.replace('alt="Agentes IA"', 'alt="Agentes autónomos de IA en acción"')
content = content.replace('alt="Datos"', 'alt="Análisis de datos e integración B2B"')

# 6. Article elements
content = content.replace('<div class="card fade-up">', '<article class="card fade-up">')
content = content.replace('<div class="card">', '<article class="card">')
# Replacing closing div for cards is tricky via global replace. Let's do a regex based on indent.
# Or since there's no nested `<div class="card">`, we can replace exactly. But wait! `<article>` needs `</article>`.
# Since there are multiple nested divs inside .card, doing a simple replace for closing tag might be dangerous.
# I'll just keep the opening tag as `<div class="card" role="article">` to achieve semantics without breaking the closing tags.
content = content.replace('<article class="card fade-up">', '<div class="card fade-up" role="article">')
content = content.replace('<article class="card">', '<div class="card" role="article">')
content = content.replace('<div class="card fade-up">', '<div class="card fade-up" role="article">')
content = content.replace('<div class="card">', '<div class="card" role="article">')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done applying replacements.")
