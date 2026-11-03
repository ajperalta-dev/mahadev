"""Create the site's Latin WOFF2 fonts from the supplied OFL brand masters."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

directory = Path(__file__).resolve().parents[1] / 'public/brand/maha-dev'
characters = set(range(0x20, 0x250)) | set(range(0x2000, 0x2070)) | {0x20AC, 0x2122}
for source, output in [('Inter.ttf', 'inter-latin.woff2'), ('SpaceGrotesk.ttf', 'space-grotesk-latin.woff2')]:
    font = TTFont(directory / source)
    if source == 'Inter.ttf':
        font = instantiateVariableFont(font, {'opsz': 14}, inplace=True)
    if 'gvar' in font:
        for glyph in font.getGlyphOrder():
            if glyph not in font['gvar'].variations:
                font['gvar'].variations[glyph] = []
    options = subset.Options()
    options.layout_features = ['*']
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=characters)
    subsetter.subset(font)
    font.flavor = 'woff2'
    font.save(directory / output)
    print(f'{output}: {(directory / output).stat().st_size:,} bytes')
