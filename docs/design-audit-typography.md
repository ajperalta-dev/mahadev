# MAHA DEV: tipografía y densidad

Primera pasada de la auditoría UX/UI, 3 noviembre 2026.

## Hallazgos en el código

- Barlow declarada sin archivo ni carga: el navegador decide la fuente sustituta.
- Textos de lectura de 12–14 px y elementos de interfaz de 9–11 px.
- Titulares de soluciones de hasta 100 px, interlineado .98 y tracking -.045em.
- Mayúsculas en todos los niveles de títulos: poca distinción entre mensaje y contenido.
- Cada sección fuerza 90svh; metodología añade hasta 64 px sobre el padding existente.
- Reglas móviles vuelven a reducir texto informativo a 13 px.
- El selector `.area-page h2` también alcanza el título del dashboard y sobrescribe su escala.

## Criterio de la primera intervención

Paleta existente: negro #000000, blanco #FFFFFF, Slate #1D232A, Charcoal #0B0B0C, Sand #EBC88C.
Inter para lectura e interfaz; Space Grotesk para títulos, conforme al sistema de identidad.
Carga local de WOFF2 con subconjunto latino y licencias OFL existentes.

Escala: cuerpo 16 px, secundario 14 px, apoyo 12 px, tarjetas 20–22 px,
secciones 32–48 px. Longitud de lectura aproximada de 65 caracteres.
Títulos del contenido en caja de oración; hero conserva tratamiento de display.
Párrafos con interlineado 1.65; títulos con 1.15–1.25 según longitud.

Estructura: título y explicación / contenido / acción, alineados a la misma retícula.
Las cuatro soluciones conservan su fila de escritorio y sus animaciones.
Los espacios verticales responden al contenido, con separación entre secciones de 64–88 px.
Navbar y logotipos conservan sus estilos propios; se actúa sobre la lectura del contenido.

## Límite de la revisión

El control de acceso del navegador bloqueó Computer Use al no poder confirmar la URL.
No se realizaron más acciones de navegador ni se sustituyó por otra automatización.
La revisión de esta pasada se basa en estructura, CSS, compilación y comprobaciones de código.
La comprobación visual en escritorio/móvil queda pendiente de un navegador accesible.

## Comprobaciones realizadas

- Compilación TypeScript/Vite correcta.
- 17 pruebas existentes de introducción, movimiento reducido, teclado y vista previa social correctas.
- Verificados los caracteres del español y los pesos variables de ambos WOFF2.
- Fuentes combinadas: 125.328 bytes; se precargan desde el propio sitio.
- Conservadas las cuatro tarjetas de escritorio y sus reglas de animación.
