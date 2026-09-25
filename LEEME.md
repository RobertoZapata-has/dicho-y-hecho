# Dicho y Hecho

Refranes argentinos al pie de la letra, con el Hornero Punk. PWA que funciona sin internet.

## Cómo publicarla en GitHub Pages
1. Creá un repositorio nuevo llamado `dicho-y-hecho`.
2. Subí **todo el contenido de esta carpeta respetando las subcarpetas** `fonts/` e `icons/` (arrastrá las carpetas enteras, no los archivos sueltos).
3. En Settings → Pages elegí la rama `main` y la carpeta `/ (root)`.
4. Abrí https://robertozapata-has.github.io/dicho-y-hecho/ en el celu y tocá **Instalar** (o "Agregar a pantalla de inicio").

## Archivos
- `index.html` — estructura y estilos
- `app.js` — tarjetas, Refranadora, juego, Del dicho al hecho y stickers
- `kit.js` — piezas ilustradas (personajes, animales, objetos, fondos)
- `escenas.js` — cómo se arma cada una de las 50 viñetas
- `datos.js` — los 50 refranes con significado, uso, origen, etiquetas y frase del hornero
- `sw.js` — guarda todo en el celu para usarla offline
- `manifest.webmanifest`, `icons/` — instalación e ícono
- `fonts/` — Bungee, Bangers y Bricolage Grotesque (licencia OFL, incluida)

## Cuando cambies algo
Subí la versión nueva y cambiá `dyh-v1` por `dyh-v2` (y así) en `sw.js`, para que los celulares descarguen los archivos actualizados.
