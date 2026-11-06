from pathlib import Path
import json, shutil, io, textwrap, re
from xml.etree import ElementTree
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLFont
from reportlab.lib.colors import HexColor
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg
import fitz
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parent
for d in ['svg','pdf-vectoriales','png','manual','referencia','revision']: (ROOT/d).mkdir(exist_ok=True)
palette={'White':'#FFFFFF','Sand':'#EBC88C','Slate':'#1D232A','Charcoal':'#0B0B0C','Black':'#000000'}
for family in ['Inter','SpaceGrotesk']:
    f=TTFont(ROOT/'fuentes'/f'{family}.ttf')
    axes={'wght':400}
    if family=='Inter': axes['opsz']=14
    instantiateVariableFont(f,axes,inplace=True).save(ROOT/'fuentes'/f'{family}-Regular.ttf')
    pdfmetrics.registerFont(RLFont(family,str(ROOT/'fuentes'/f'{family}-Regular.ttf')))
font=TTFont(ROOT/'fuentes/Inter-Regular.ttf'); glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); units=font['head'].unitsPerEm
alpha=ElementTree.parse(ROOT.parent/'ALPHA-identidad-vectorial/alpha-logotipo-claro.svg')
alpha_contours=re.findall(r'M[^M]+',alpha.find('.//{http://www.w3.org/2000/svg}path').attrib['d'])
alpha_a=next(p for p in alpha_contours if p.startswith('M0.000 '))
alpha_h=next(p for p in alpha_contours if p.startswith('M446.988 '))
def textpaths(txt,x,y,size,color,tracking=0):
    out=[]; s=size/units
    for char in txt:
        name=cmap.get(ord(char),'space'); pen=SVGPathPen(glyphs); glyphs[name].draw(pen)
        out.append(f'<path fill="{color}" transform="translate({x:.3f} {y}) scale({s} {-s})" d="{pen.getCommands()}"/>')
        x+=glyphs[name].width*s+tracking
    return ''.join(out)
def bands(color):
    return f'<g fill="{color}"><path d="M28 14 C32 5 37 0 46 0 H100 C96 9 90 14 82 14 Z"/><path d="M13 42 C18 33 23 28 32 28 H106 C102 37 96 42 88 42 Z"/><path d="M0 70 C5 61 11 56 20 56 H112 C108 65 102 70 94 70 Z"/></g>'
def group(body,x=0,y=0,sx=1,sy=None): return f'<g transform="translate({x} {y}) scale({sx} {sx if sy is None else sy})">{body}</g>'
def descriptor(x,y,width,size,color):
    txt='DIGITAL TRANSFORMATION · DATA · AI · OPERATIONS'; spacing=2.3
    natural=sum(glyphs[cmap.get(ord(ch),'space')].width*size/units+spacing for ch in txt)-spacing
    return group(textpaths(txt,0,0,size,color,spacing),x,y,width/natural,1)
def word(color,accent=None):
    # Reuse ALPHA's actual A/H outlines at uniform scale. Construct the other
    # letters with broad curves to share its softened geometric character.
    shapes=[('M4.4 65.6 V12.2 Q4.4 -1.8 14 7.8 L46 42.6 Q52 48.4 58 42.6 L90 7.8 Q99.6 -1.8 99.6 12.2 V65.6',0),
      ('M4.4 4.4 H45 C65 4.4 79.6 17.8 79.6 35 C79.6 52.2 65 65.6 45 65.6 H13 Q4.4 65.6 4.4 57 V43.5',528),
      ('M4.4 4.4 L38.2 59.4 Q45 71.8 51.8 59.4 L85.6 4.4',748)]
    letters=''.join(f'<path transform="translate({x} 0)" d="{p}"/>' for p,x in shapes)
    shared=''.join(group(f'<path d="{alpha_a}"/>',x,.4214,.7) for x in [128.56,360.56])
    shared+=group(f'<path transform="translate(-445.783 0)" d="{alpha_h}"/>',260,.4214,.7)
    shared=f'<g fill="{color}" data-letter-source="alpha">{shared}</g>'
    # The E in the wordmark uses centered, shallow rounded bars, as in the
    # supplied reference; the separate three-band symbol keeps its own master.
    e=[]
    for x,y,w in [(16,0,72),(8,28,88),(0,56,104)]:
        p=f'M{x+3} {y} H{x+w-3} Q{x+w+1} {y} {x+w-1} {y+4} C{x+w-4} {y+11} {x+w-12} {y+14} {x+w-20} {y+14} H{x+20} C{x+10} {y+14} {x+3} {y+11} {x+1} {y+4} Q{x-1} {y} {x+3} {y} Z'
        e.append(f'<path d="{p}"/>')
    e=f'<g fill="{accent or color}">{"".join(e)}</g>'
    return f'<g fill="none" stroke="{color}" stroke-width="8.8" stroke-linecap="round" stroke-linejoin="round">{letters}</g>'+shared+group(e,630,0)
def circle(color,inverse,outline=False):
    c=f'<circle cx="80" cy="80" r="76" fill="{"none" if outline else color}" stroke="{color}" stroke-width="5"/>'
    return c+group(bands(color if outline else inverse),32,49,.86)
def lockup(color,accent,inverse,descriptor=True):
    s=circle(color,inverse)+f'<path d="M200 12 V148" stroke="{color}" stroke-width="2"/>'+group(word(color,accent),245,28,.81)
    if descriptor:s+=globals()['descriptor'](245,121,679,13.2,color)
    return s
assets={}
def save(name,body,w,h):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="MAHA DEV {name}"><title>MAHA DEV | {name}</title>{body}</svg>'
    (ROOT/'svg'/f'maha-dev-{name}.svg').write_text(svg,encoding='utf-8'); assets[name]=(body,w,h)
    drawing=svg2rlg(io.BytesIO(svg.encode()))
    renderPDF.drawToFile(drawing,str(ROOT/'pdf-vectoriales'/f'maha-dev-{name}.pdf'))
    doc=fitz.open(ROOT/'pdf-vectoriales'/f'maha-dev-{name}.pdf')
    doc[0].get_pixmap(matrix=fitz.Matrix(2,2),alpha=True).save(ROOT/'png'/f'maha-dev-{name}.png')
for mode,color,accent,inverse in [('claro','#000000','#000000','#FFFFFF'),('oscuro','#FFFFFF','#EBC88C','#000000'),('negro','#000000','#000000','#FFFFFF'),('blanco','#FFFFFF','#FFFFFF','#000000')]:
    save('principal-'+mode,group(lockup(color,accent,inverse),16,16),960,192)
    save('principal-sin-descriptor-'+mode,group(lockup(color,accent,inverse,False),16,16),960,192)
    save('horizontal-'+mode,group(word(color,accent),16,16),870,102)
    save('horizontal-descriptor-'+mode,group(word(color,accent),16,16)+descriptor(16,125,838,16,color),870,145)
    # Split the name into two rows using SVG clipping; all content remains paths.
    stacked=f'<defs><clipPath id="top"><rect width="460" height="75"/></clipPath><clipPath id="bottom"><rect x="505" width="340" height="75"/></clipPath></defs>'
    stacked+=group(f'<g clip-path="url(#top)">{word(color,accent)}</g>',25,20)
    stacked+=group(f'<g clip-path="url(#bottom)">{word(color,accent)}</g>',-430,125)
    save('apilado-'+mode,stacked,510,220)
    save('isotipo-'+mode,group(bands(color),14,14),140,98)
    save('circular-'+mode,group(circle(color,inverse),8,8),176,176)
    save('circular-outline-'+mode,group(circle(color,inverse,True),8,8),176,176)
save('isotipo-arena',group(bands(palette['Sand']),14,14),140,98)
for mode,bg,fg in [('oscuro','#0B0B0C','#FFFFFF'),('claro','#FFFFFF','#000000')]:
    save('app-icon-'+mode,f'<rect x="2" y="2" width="252" height="252" rx="54" fill="{bg}" stroke="#1D232A" stroke-width="2"/>'+group(bands(fg),55,82,1.3),256,256)
    save('favicon-'+mode,f'<rect width="32" height="32" rx="7" fill="{bg}"/>'+group(bands(fg),5,9,.196),32,32)
save('separador','<path d="M4 0 V160" stroke="#EBC88C" stroke-width="2"/>',8,160)
save('patron-bandas',''.join(group(bands('#1D232A'),x,y,.7) for x in range(0,800,120) for y in range(0,400,90)),800,400)
save('paleta',''.join(f'<rect x="{i*180}" width="180" height="180" fill="{c}"/>'+textpaths(n,i*180+12,210,18,'#000000')+textpaths(c,i*180+12,239,16,'#000000') for i,(n,c) in enumerate(palette.items())),900,260)
(ROOT/'paleta.json').write_text(json.dumps(palette,indent=2),encoding='utf-8')
(ROOT/'tokens.css').write_text(':root {\n'+''.join(f'  --maha-{n.lower()}: {v};\n' for n,v in palette.items())+'  --maha-font-heading: "Space Grotesk", sans-serif;\n  --maha-font-body: "Inter", sans-serif;\n}\n')
ref=ROOT.parent/'ALPHA-identidad-vectorial/maiadev/Guía visual MAHA DEV con montañas.png'
shutil.copy2(ref,ROOT/'referencia'/ref.name)
# Keep every web application of the wordmark in sync with the vector masters.
web=ROOT.parent/'public/brand/maha-dev'
web.mkdir(parents=True,exist_ok=True)
for source in (ROOT/'svg').glob('maha-dev-*.svg'):
    shutil.copy2(source,web/source.name)

W,H=1000,700
c=canvas.Canvas(str(ROOT/'manual/MAHA-DEV-manual-de-marca.pdf'),pagesize=(W,H)); c.setTitle('MAHA DEV | Manual de identidad de marca'); c.setAuthor('MAHA DEV')
pages=[]; num=0
def start(title,kicker='SISTEMA DE IDENTIDAD',dark=False):
    global num,ink
    num+=1; ink='#FFFFFF' if dark else '#1D232A'; c.setFillColor(HexColor('#0B0B0C' if dark else '#FFFFFF')); c.rect(0,0,W,H,fill=1,stroke=0)
    label(kicker,52,654,10,'#EBC88C' if dark else '#555B62'); label(title,50,599,34,ink,'SpaceGrotesk')
    c.setStrokeColor(HexColor('#384049' if dark else '#DBDEE1')); c.line(50,48,950,48)
    label('MAHA DEV / MANUAL DE MARCA / 03.11.2026',50,27,9,ink); label(f'{num:02}',925,27,10,ink)
def label(t,x,y,size=15,color=None,font='Inter'):
    c.setFillColor(HexColor(color or ink)); c.setFont(font,size); c.drawString(x,y,t)
def para(t,x,y,width=85,size=15,color=None):
    for line in textwrap.wrap(t,width): label(line,x,y,size,color); y-=size*1.5
    return y
def art(name,x,y,w,bg=None):
    b,sw,sh=assets[name]; h=w*sh/sw
    if bg:c.setFillColor(HexColor(bg)); c.rect(x,y,w,h,fill=1,stroke=0)
    d=svg2rlg(str(ROOT/'svg'/f'maha-dev-{name}.svg')); d.scale(w/d.width,w/d.width); renderPDF.draw(d,c,x,y)
    return h
def end():c.showPage()
start('Manual de identidad de marca','MAHA DEV / EDICIÓN 1.1',True)
art('horizontal-oscuro',80,340,840)
para('Digital transformation · Data · AI · Operations',83,295,80,18)
para('Sistema vectorial reconstruido a partir de la referencia suministrada. Reglas de aplicación y archivos maestros para la transición desde Alpha.',83,180,78,16)
end()
start('Una identidad, un sistema')
para('MAHA DEV es la denominación de esta identidad. El símbolo de tres bandas se repite en la E de DEV: esa relación visual debe conservarse en todas las aplicaciones.',52,535,92)
for i,(title,desc) in enumerate([('01 / Marca','Logotipos y símbolo reconstruidos en geometría vectorial.'),('02 / Expresión','Blanco y negro como base; arena como acento premium.'),('03 / Aplicación','Versiones específicas para documentos, pantallas e iconos.')]):
    y=410-i*95; label(title,52,y,22,font='SpaceGrotesk'); label(desc,52,y-30,15)
para('Alcance: se normalizan las variaciones de la imagen para formar una familia coherente. Las medidas y mínimos de este manual son criterios propuestos para esta reconstrucción, no datos originales de la lámina.',52,125,110,12)
end()
start('Firma principal')
art('principal-claro',65,335,870)
label('FONDOS CLAROS / NEGRO',65,310,11)
c.setFillColor(HexColor('#0B0B0C')); c.roundRect(50,100,900,175,8,fill=1,stroke=0)
art('principal-oscuro',65,101,870)
label('Símbolo circular + separador + nombre + descriptor. Usar la composición completa cuando sea legible.',52,520,14)
end()
start('Familia de logotipos',dark=True)
art('horizontal-oscuro',60,410,520); label('HORIZONTAL / cabeceras y presentaciones',65,380,12)
art('apilado-oscuro',650,350,260); label('APILADO / espacios estrechos',640,315,12)
art('horizontal-descriptor-oscuro',60,170,520); label('CON DESCRIPTOR / comunicaciones institucionales',65,140,12)
para('El nombre es un dibujo propio. No se recompone escribiendo MAHA DEV con una fuente. Usar siempre los archivos maestros.',640,240,32,14)
end()
start('Símbolos e iconos')
for i,(name,title) in enumerate([('isotipo-negro','Símbolo libre'),('circular-claro','Sello circular'),('circular-outline-negro','Circular outline'),('app-icon-oscuro','App / favicon')]):
    art(name,65+i*230,320,170); label(title,65+i*230,280,16)
para('Usar el símbolo solo cuando el contexto ya identifique la marca. El círculo funciona para avatares y sellos; el icono cuadrado con esquinas redondeadas, para aplicaciones.',52,205,95)
para('Los favicons de 32 px incorporan márgenes propios. Evitar el nombre y el descriptor en tamaños de icono.',52,120,105,13)
end()
start('Color y contraste')
for i,(name,hx) in enumerate(palette.items()):
    x=52+i*183; c.setFillColor(HexColor(hx)); c.setStrokeColor(HexColor('#B8BDC3')); c.roundRect(x,370,165,155,8,fill=1,stroke=1)
    label(name,x,343,18); label(hx,x,316,14)
    rgb=tuple(int(hx[k:k+2],16) for k in (1,3,5)); label('RGB '+', '.join(map(str,rgb)),x,292,10)
para('Negro y blanco dominan el sistema. Sand destaca la E del logotipo en fondos oscuros y pequeños detalles. Slate aporta superficies secundarias; Charcoal es el fondo oscuro principal.',52,230,98)
para('No utilizar Sand para texto pequeño sobre blanco. Para información esencial, preferir blanco sobre Charcoal o negro sobre blanco. La versión principal usa color arena plano: el brillo de la referencia es un efecto de presentación.',52,145,115,12)
para('Impresión: definir la conversión CMYK según el perfil ICC de la imprenta y validar una prueba. El color arena no equivale a una tinta metálica ni a un Pantone certificado.',52,85,120,11)
end()
start('Tipografía')
label('Space Grotesk',52,490,46,font='SpaceGrotesk'); label('Títulos / jerarquía / mensajes principales',55,452,15)
label('Inter',52,345,46); label('Texto / interfaces / descriptor',55,307,15)
para('Jerarquía orientativa digital: títulos 40-56 px; subtítulos 24-32 px; cuerpo 16-18 px; etiquetas 12-14 px. Interlineado de cuerpo: 145-160 %. Mantener frases claras y breves.',52,225,96)
para('Se incluyen ambas familias y sus licencias OFL. El descriptor está convertido a trazados con Inter. Las letras del logotipo son geometría personalizada y no son Space Grotesk.',52,120,108,13)
end()
start('Área de seguridad y reducción')
art('principal-claro',150,310,700)
c.setDash(5,4); c.setStrokeColor(HexColor('#8B6733')); c.rect(125,285,750,190,stroke=1,fill=0); c.setDash()
label('x',128,483,16); label('x = 1/4 del diámetro del círculo',52,520,16)
para('Reservar como mínimo x por cada lado del conjunto. Para el logotipo sin círculo, x equivale a la mitad de la altura de las letras. Para símbolos aislados, usar 1/4 de su altura.',52,240,100)
label('Mínimos recomendados de esta versión',52,165,20,font='SpaceGrotesk')
label('Firma con descriptor: 420 px / 80 mm    |    Horizontal: 160 px / 35 mm',52,128,14)
label('Símbolo: 24 px / 6 mm    |    Favicon simplificado: 16 px',52,99,14)
end()
start('Aplicaciones y usos incorrectos',dark=True)
art('horizontal-oscuro',65,440,530)
para('Tarjetas y documentos: firma negra sobre blanco. Web y presentaciones: blanco y arena sobre Charcoal. Textil y grabado: versión de una tinta, sin descriptor si no se reproduce con claridad.',52,360,93)
label('No deformar. No rotar. No cambiar las bandas.',52,240,24,font='SpaceGrotesk')
para('No sustituir la E por una letra tipográfica. No añadir sombras, contornos ni degradados al maestro. No mezclar colores de Alpha ni ubicar la firma sobre fotografías sin una zona limpia de alto contraste.',52,195,95)
para('La montaña y las escenas de taza, tarjeta, portátil y bordado de la lámina son imágenes de ambientación. No son componentes vectoriales ni artes finales de producción; se conserva la referencia original.',52,100,120,11)
end()
start('Entrega y uso de los archivos')
items=[('svg/','Maestros editables: formas, curvas y letras trazadas; sin imágenes incrustadas.'),('pdf-vectoriales/','Un PDF vectorial por componente para intercambio e impresión.'),('png/','Vistas transparentes a 2x; las versiones blancas necesitan fondo oscuro.'),('fuentes/','Inter y Space Grotesk, archivos variables, versión regular y licencias.'),('manual/','Este manual y su versión de texto editable.'),('referencia/','La imagen original suministrada, conservada sin cambios.'),('paleta.json + tokens.css','Valores de color y tipografía para implementación digital.')]
for i,(title,desc) in enumerate(items):
    y=520-i*55; label(title,52,y,17,font='SpaceGrotesk'); label(desc,52,y-23,12)
para('Estado: nombre reconstruido con curvas redondeadas según el logotipo ALPHA y la guía con montañas. Las variantes web se sincronizan al ejecutar generar_identidad.py. Space Grotesk se reserva para títulos.',52,100,113,12)
end();c.save()

doc=fitz.open(ROOT/'manual/MAHA-DEV-manual-de-marca.pdf')
full=[]
for i,p in enumerate(doc):
    full.append(p.get_text())
    p.get_pixmap(matrix=fitz.Matrix(1,1)).save(ROOT/'revision'/f'pagina-{i+1:02}.png')
(ROOT/'manual/MAHA-DEV-manual-de-marca.md').write_text('# MAHA DEV - Manual de identidad\n\n'+'\n\n---\n\n'.join(full),encoding='utf-8')
sheet=Image.new('RGB',(1000,350*5),'#CCCCCC')
for i in range(len(doc)):
    im=Image.open(ROOT/'revision'/f'pagina-{i+1:02}.png'); im.thumbnail((500,350)); sheet.paste(im,((i%2)*500,(i//2)*350))
sheet.save(ROOT/'revision/contacto-manual.jpg')
(ROOT/'LEEME.md').write_text('''# MAHA DEV - Identidad vectorial

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
''',encoding='utf-8')
print(json.dumps({'svg':len(assets),'manual_pages':len(doc),'root':str(ROOT)}))
