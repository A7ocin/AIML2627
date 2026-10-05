"""Create four-slide review sheets from the full-resolution rendered slides."""
from pathlib import Path
from PIL import Image, ImageDraw
import sys

folder = Path(__file__).resolve().parents[1] / '_review' / (sys.argv[1] if len(sys.argv) > 1 else 'after')
files = sorted(folder.glob('[0-9][0-9]-*.png'))
for start in range(0, len(files), 4):
    sheet = Image.new('RGB', (1920, 1150), '#202735')
    draw = ImageDraw.Draw(sheet)
    for i, file in enumerate(files[start:start+4]):
        x, y = (i % 2)*960, (i//2)*575
        sheet.paste(Image.open(file).resize((960, 540)), (x, y))
        draw.text((x+20,y+550),file.stem,fill='white')
    sheet.save(folder / f'contact-{start//4+1}.jpg', quality=95)
