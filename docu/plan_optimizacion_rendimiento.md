# Optimización de Rendimiento - Ingeny Labs

El sitio alojado en Vercel tiene una excelente infraestructura detrás, por lo que los tiempos de respuesta del servidor (TTFB) deberían ser casi instantáneos. Sin embargo, analizando el código de `index.html`, he detectado varías oportunidades críticas para mejorar drásticamente la velocidad de carga en el navegador (PageSpeed / Lighthouse) y la experiencia del usuario.

## Problemas Detectados y Propuesta de Solución

### 1. Reemplazar Tailwind CDN por CSS Compilado [Crítico]
Actualmente el sitio usa el CDN de Tailwind para desarrollo (`<script src="https://cdn.tailwindcss.com"></script>`). Esto significa que el navegador del usuario debe descargar un gran archivo JavaScript y luego compilar todo el CSS "al vuelo" antes de mostrar la página correctamente.
**Solución:** Mover la configuración a un proceso de build estándar o, para mantenerlo simple sin NodeJS/NPM en tu flujo actual, pre-compilar el CSS usando Tailwind CLI y enlazar un archivo `style.css` minificado.

### 2. Optimización de Imágenes (Formatos Modernos) [Alto Impacto]
Todas las imágenes (logos, fotos de tarjetas) están en formato `.png`. Los `.png` suelen ser pesados, especialmente para fotografías (como `human1.png`, `beneficio1.png`).
**Solución:** Las imágenes fotográficas deberían convertirse a `.webp`. Los logos pueden mantenerse en PNG o pasarse a SVG/WebP. (Puedo darte los comandos o ayudarte a cambiarlas si tienes las versiones webp, o simplemente podemos agregar un paso de optimización).

### 3. Carga Diferida (Lazy Loading) de Imágenes [Fácil / Alto Impacto]
Todas las imágenes de la página se cargan de inmediato al abrir el sitio, incluso las que están muy abajo (en Servicios o Nosotros), lo que consume ancho de banda y retrasa la métrica de *Largest Contentful Paint (LCP)*.
**Solución:** Agregar el atributo `loading="lazy"` a todas las imágenes que no estén en la vista principal (Hero y Logos).

### 4. Prevención de Saltos de Diseño (CLS) [Fácil / Mediano Impacto]
Las etiquetas `<img>` no tienen definidos atributos `width` y `height`. Esto provoca que el navegador no sepa cuánto espacio reservar para la imagen antes de cargarla, causando que la página "salte" visualmente mientras carga.
**Solución:** Agregar atributos nativos de `width` y `height` a las imágenes principales.

### 5. SEO Básico (Extra)
Falta la etiqueta `<meta name="description" content="...">` en el `<head>`, la cual es vital para el SEO y cómo se muestra el sitio en Google.

---

## Cambios Propuestos (Código a modificar de inmediato si lo apruebas)

### Componente: Archivo Principal
- **[MODIFY]** `index.html`
  1. Agregar `loading="lazy"` a las imágenes de "Nosotros", "Servicios" y "Metodología".
  2. Agregar etiquetas `<meta name="description">` para SEO.
  3. Sugerirte e implementar un flujo para compilar Tailwind y remover el script del CDN (Si manejas NPM en tu entorno local).

## Plan de Verificación

### Verificación Manual
1. **Auditoría Lighthouse:** El usuario podrá abrir Google Chrome, ir a la pestaña "Lighthouse" en las Herramientas de Desarrollador, y correr un reporte de "Navegación Móvil". Los puntajes de Performance y Best Practices deberían subir notablemente tras los cambios.
2. **Revisión de Red:** En la recarga del sitio, se verificará que las imágenes por debajo del viewport no se descarguen hasta que se haga scroll.
