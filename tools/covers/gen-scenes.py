#!/usr/bin/env python3
"""
Картинки кейсов в стилистике текущих обложек BIXIRUN и Империала (owner, 15.10.2026).

ДНК стиля, снятая с этих двух картинок:
  * фотореализм, кинематографичный кадр: реальное правдоподобное место, а не абстракция;
  * один главный предмет в фокусе (диван у Империала, стена с вывеской у BIXIRUN);
  * база — глубокий синий и сине-чёрный, один тёплый акцент (золотые частицы, низкое солнце);
  * сильный контровой свет: солнце в кадре или свет сверху, длинные тени, дымка, блики;
  * глянцевые отражающие поверхности (мокрый пол, бетон);
  * один сдержанный «технологичный» элемент: светящиеся частицы, голограмма, LED-свечение;
  * людей нет.
Текста, букв и логотипов в кадре нет: модель пишет кириллицу с ошибками.

Ключ: ТОЛЬКО из env OPENROUTER_API_KEY (лежит в ~/.zshenv; в репо и чат не вставлять).

Использование (из корня репо):
  python3 tools/covers/gen-scenes.py                         # все сцены → tools/covers/out/scenes/
  python3 tools/covers/gen-scenes.py --only medtech-1 revio-2
  python3 tools/covers/gen-scenes.py --cover revio-1 reviomp-analytics
      # готовая сцена → public/static/images/covers/<slug>-1200x630.jpg (кроп до 1200:630, JPEG q85)
Выбор владельца 15.10.2026: RevioMP — revio-1. МедТех, Империал, BIXIRUN и Политика остались
со своими картинками; у МедТех в карточке кадр по верху (imgPosition: 'top' во frontmatter).
Цена: google/gemini-3-pro-image ≈ 0,14 $ за картинку 1376×768 (16:9), ~20 с.
"""
import argparse
import base64
import json
import os
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image

API = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemini-3-pro-image"
OUT = Path(__file__).resolve().parent / "out" / "scenes"
COVERS = Path(__file__).resolve().parents[2] / "public/static/images/covers"

# Стиль BIXIRUN + Империал. Меняется только сцена.
DNA = (
    "Photorealistic cinematic photograph, wide 16:9 frame, full-frame camera, 35mm lens, shallow depth of field. "
    "{scene} "
    "Deep navy and blue-black palette with a single warm accent of golden light; strong backlight creating long "
    "shadows, soft volumetric haze and gentle lens glow; glossy reflective surfaces. The futuristic element stays "
    "restrained and believable, never cartoonish. Main subject near the center of the frame. "
    "No people, no faces, no readable text, no letters, no numbers, no logos, no watermarks."
)

# Другой стиль на сравнение: без привязки к фотореализму BIXIRUN и Империала.
FREE = "{scene} No people, no faces, no readable text, no letters, no numbers, no logos, no watermarks."

SCENES: dict[str, tuple[str, str]] = {
    # МедТех: многопрофильная клиника, call-центр + CRM + телефония, омниканальная воронка, LTV ×9.
    "medtech-1": (DNA, (
        "Inside a dark, premium private clinic lobby at night: an elegant empty reception desk of white stone and "
        "dark wood under soft overhead light, the polished floor reflecting it, a corridor of frosted glass doors "
        "receding into blue haze. Above the desk a stream of fine golden and cyan light particles rises and links "
        "small floating glowing glass icons, a phone handset, a chat bubble, a calendar page and a patient card, "
        "into one smooth ascending curve, like a patient who keeps coming back."
    )),
    "medtech-2": (DNA, (
        "Exterior of a modern two-storey private clinic building at golden hour: clean facade of light stone and "
        "large glass windows, the low sun flaring from behind the building corner, long shadows across a wet "
        "concrete plaza with a few young trees. On the dark blue wall beside the entrance glows a large clean cyan "
        "LED medical cross. Warm sunlight against cool blue shadows."
    )),
    "medtech-3": (FREE, (
        "Isometric tilt-shift photograph of a handcrafted architectural miniature: a cutaway private clinic with a "
        "call center room with tiny headsets, a reception, two doctor's offices and a waiting room, built from matte "
        "off-white and navy materials with tiny warm lights inside. Thin glowing cyan lines run between the rooms "
        "like a network, every contact point connected to one central glowing patient-record hub. Soft studio "
        "light, dark navy background, premium and calm."
    )),
    # RevioMP: SaaS-аналитика прибыли для продавцов Wildberries и Ozon, веб и iPhone.
    "revio-1": (DNA, (
        "Inside a vast dark automated fulfillment warehouse at night: rows of shelves with cardboard parcel boxes, "
        "conveyor belts and robotic arms fading into blue haze, overhead strip lights reflecting on a glossy floor. "
        "In the foreground a single parcel box rides the conveyor; from the boxes thin streams of golden light "
        "particles rise and flow into a large translucent cyan holographic dashboard floating above, abstract bar "
        "charts and one bold ascending profit line."
    )),
    "revio-2": (DNA, (
        "A marketplace seller's small warehouse room at golden hour: stacks of cardboard parcel boxes and a packing "
        "table, the low sun pouring through a tall industrial window, dust glittering in the light beams, long "
        "shadows on the concrete floor, deep blue walls. On the table an open laptop and a phone show glowing blue "
        "dashboards with abstract charts; their screens are the only cool light in the warm room."
    )),
    "revio-3": (FREE, (
        "Dark luxury product shot: a single parcel box made of matte black material on a glossy black pedestal, "
        "its seams traced with thin glowing cyan lines. Above it floats a translucent glass card with an abstract "
        "waterfall chart: several slices are cut away and drift off, the remaining bar glows warm gold. Studio rim "
        "lights, crisp reflections, deep navy gradient background, minimal and premium."
    )),
}


def gen_one(key: str, name: str, model: str, out: Path) -> str:
    style, scene = SCENES[name]
    body = {
        "model": model,
        "messages": [{"role": "user", "content": style.format(scene=scene)}],
        "modalities": ["image", "text"],
        "image_config": {"aspect_ratio": "16:9"},
        "usage": {"include": True},
    }
    req = urllib.request.Request(
        API, data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    resp = json.load(urllib.request.urlopen(req, timeout=240))
    cost = (resp.get("usage") or {}).get("cost")
    imgs = resp["choices"][0]["message"].get("images") or []
    if not imgs:
        return f"ОШИБКА {name}: модель не вернула картинку ({json.dumps(resp)[:200]})"
    m = re.match(r"data:image/\w+;base64,(.*)", imgs[0]["image_url"]["url"], re.S)
    dst = out / f"{name}--{model.split('/')[-1]}.png"
    dst.write_bytes(base64.b64decode(m.group(1)))
    return f"ok: {dst.name} cost={cost}"


def save_cover(name: str, slug: str, model: str) -> str:
    """Сцена 16:9 → обложка 1200×630 (og:image, карточка /projects): срез сверху и снизу поровну."""
    im = Image.open(OUT / f"{name}--{model.split('/')[-1]}.png").convert("RGB")
    h = round(im.width * 630 / 1200)
    top = (im.height - h) // 2
    im = im.crop((0, top, im.width, top + h)).resize((1200, 630), Image.LANCZOS)
    COVERS.mkdir(parents=True, exist_ok=True)
    dst = COVERS / f"{slug}-1200x630.jpg"
    im.save(dst, "JPEG", quality=85, optimize=True, progressive=True)
    return f"cover: {dst.relative_to(COVERS.parents[3])} {dst.stat().st_size // 1024} KB"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", nargs="*", choices=SCENES, help="имена сцен")
    ap.add_argument("--model", default=MODEL)
    ap.add_argument("--out", default=str(OUT))
    ap.add_argument("--cover", nargs=2, metavar=("SCENE", "SLUG"), help="сохранить сцену как обложку кейса")
    args = ap.parse_args()

    if args.cover:
        print(save_cover(*args.cover, args.model))
        return 0

    key = os.environ.get("OPENROUTER_API_KEY", "")
    if not key:
        print("Нет OPENROUTER_API_KEY в env (~/.zshenv).", file=sys.stderr)
        return 1
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    names = args.only or list(SCENES)
    with ThreadPoolExecutor(max_workers=len(names)) as pool:
        for line in pool.map(lambda n: gen_one(key, n, args.model, out), names):
            print(line)
    return 0


if __name__ == "__main__":
    sys.exit(main())
