# MAHA DEV - Identidad vectorial

Referencia: Guía visual MAHA DEV con montañas.png. Versión 1.1, 3 noviembre 2026.

Los SVG contienen vectores reales y textos convertidos a trazados; no contienen mapas de bits ni necesitan fuentes para visualizarse. Se reconstruyó y normalizó la geometría de la referencia. No es un calco píxel a píxel.

- claro: marca negra para fondos claros.
- oscuro: marca blanca con acento Sand para fondos oscuros.
- negro / blanco: versiones de una tinta.
- Los SVG y PNG de logo tienen fondo transparente. App y favicon llevan su propio fondo.
- El oro se normaliza a Sand plano #EBC88C; no se simula metal en los maestros.
- El patrón es una extensión propuesta del sistema, derivada de las tres bandas.
- Fotografías y mockups se conservan en referencia/, no se presentan como vectores.
- Los tamaños mínimos y márgenes son recomendaciones propuestas en el manual.
- La palabra MAHA DEV reproduce trazos finos, terminales redondeados, A sin travesaño y D abierta de la referencia. No es texto compuesto con una fuente.
- Los ápices y encuentros de los trazos usan curvas amplias basadas en el logotipo ALPHA.
- Las A y la H reutilizan los contornos vectoriales originales de ALPHA con escala uniforme.
- Las copias SVG de public/brand/maha-dev/ se actualizan automáticamente al regenerar.

Maestros en svg/, copias vectoriales en pdf-vectoriales/, vistas en png/. Manual PDF y texto en manual/. Fuentes y licencias en fuentes/.

Regeneración: Python con reportlab, fonttools, svglib, pymupdf y pillow. Ejecutar generar_identidad.py desde cualquier carpeta.
