# Ingeny Labs - Visual Builder Admin

Este es un entorno interno para modificar `index.html` visualmente usando GrapesJS de manera local.
Dado que Node.js no estaba disponible en el sistema nativamente, el servidor backend corre sobre Python, que viene incluido de forma nativa.

## Instrucciones de uso

1. Abre una terminal en esta carpeta (`C:\Users\josed\Proyectos\ingenylabs\admin`).
2. Levanta el servidor local con Python:
   ```bash
   python server.py
   ```
3. Abre localmente tu navegador y entra a:
   [http://localhost:3000](http://localhost:3000)

## Features
- **Tailwind Integrado:** Puedes cambiar clases de TailwindCSS arrastrando o escribiendo las clases en el panel derecho.
- **Doble Click a Textos:** Presiona doble click sobre cualquier texto para editarlo.
- **Imágenes:** Al pinchar en una imagen podrás modificar su origen (`./assets/...`).
- **Botón Guardar:** Guarda todos los cambios efectuados directamente en `../index.html`. 
El editor respeta el `head` original de tu archivo y mantiene la integridad de CSS y scripts.
