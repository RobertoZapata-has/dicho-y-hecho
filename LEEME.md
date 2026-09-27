# Dicho y Hecho

Refranes argentinos al pie de la letra, contados en historieta por el Hornero. PWA que funciona sin internet.

## Cómo actualizarla en GitHub Pages
1. Entrá al repositorio `dicho-y-hecho`.
2. Borrá los archivos viejos que ya no se usan: `hornero-punk.jpg`, `icons/icon.svg`, `fonts/bungee.woff2`, `fonts/bricolage.woff2` y sus licencias `OFL-bungee.txt` y `OFL-bricolagegrotesque.txt`.
3. Subí **todo el contenido de esta carpeta respetando las subcarpetas** `fonts/`, `icons/` e `img/` (arrastrá las carpetas enteras).
4. Abrí https://robertozapata-has.github.io/dicho-y-hecho/ en el celu. Si ya la tenías instalada, cerrala y abrila de nuevo dos veces para que baje la versión nueva.

## Archivos
- `index.html` — estructura y estilos (cómic retro)
- `app.js` — tarjetas, Refranadora, juego, Del dicho al hecho y stickers
- `vinetas.js` — qué refranes tienen viñeta en imagen
- `trampas.js` — las opciones trampa del juego de completar
- `sonidos.js` — los sonidos de historieta, generados en el momento (no hay archivos de audio)
- `kit.js` — piezas ilustradas de las viñetas
- `escenas.js` — cómo se arma cada una de las 50 viñetas
- `datos.js` — los 50 refranes con significado, uso, origen, etiquetas y frase del hornero
- `img/` — el Hornero y las capas de la viñeta animada del refrán 10
- `sw.js` — guarda todo en el celu para usarla offline
- `manifest.webmanifest`, `icons/` — instalación e ícono
- `fonts/` — Bangers y Archivo (licencia OFL, incluida)

## Imágenes
- `img/v1.jpg` a `img/v50.jpg` — una viñeta por refrán (hechas con Nano Banana y Canva).
- `img/v10-*.png/jpg` — las capas de la viñeta animada del refrán 10.
- `img/hornero*.jpg` — el Hornero (mascota, pensando, festejando).

Para cambiar una viñeta, reemplazá el archivo con el mismo nombre. Las 1, 7 y 10 y las del Hornero todavía están en baja resolución.

## Cuando cambies algo
Subí la versión nueva y cambiá `dyh-v5` por `dyh-v6` (y así) en `sw.js`, para que los celulares descarguen los archivos actualizados.
