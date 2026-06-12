#!/usr/bin/env python3
"""Install UK English marketing images into src/assets/uk/ at BR dimensions."""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageChops, ImageStat

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "uk"
SRC_BR = ROOT / "src" / "assets"

GEN_DIRS = [
    Path.home() / ".cursor" / "projects" / "Users-ulissescardoso-glycomg7-1" / "assets",
    ROOT / "assets" / "uk-generated",
]

USAGE_DESTS = {
    "aidex-use-application.webp",
    "aidex-use-faq.webp",
    "aidex-use-placement.webp",
    "aidex-use-care.webp",
}

JOBS: list[tuple[str, str, str]] = [
    ("banner-store-desktop-uk.jpg", "banner-store-desktop.jpg", "banner-store-desktop.jpg"),
    ("banner-store-mobile-uk.png", "banner-store-mobile.webp", "banner-store-mobile.webp"),
    ("aidex-prod-kit-uk.png", "aidex-prod-kit.webp", "aidex-prod-kit.webp"),
    ("aidex-prod-features-uk.png", "aidex-prod-features.webp", "aidex-prod-features.webp"),
    ("aidex-prod-reports-uk.png", "aidex-prod-reports.webp", "aidex-prod-reports.webp"),
    ("aidex-prod-bluetooth-uk.png", "aidex-prod-bluetooth.webp", "aidex-prod-bluetooth.webp"),
    ("aidex-prod-water-uk.png", "aidex-prod-water.webp", "aidex-prod-water.webp"),
    ("aidex-use-application-uk.png", "aidex-use-application.webp", "aidex-use-application.webp"),
    ("aidex-use-faq-uk.png", "aidex-use-faq.webp", "aidex-use-faq.webp"),
    ("aidex-use-placement-uk.png", "aidex-use-placement.webp", "aidex-use-placement.webp"),
    ("aidex-use-care-uk.png", "aidex-use-care.webp", "aidex-use-care.webp"),
]


def gen_dir() -> Path:
    for d in GEN_DIRS:
        if d.exists() and any(d.glob("*-uk.*")):
            return d
    raise FileNotFoundError("UK generated images folder not found")


def target_size(br_name: str) -> tuple[int, int]:
    with Image.open(SRC_BR / br_name) as im:
        return im.size


def tight_bbox(img: Image.Image, threshold: float = 10.0) -> tuple[int, int, int, int]:
    """Drop blank rows/columns (removes uneven side margins)."""
    src = img.convert("RGB")
    w, h = src.size
    # Ignore footer band when detecting side columns (avoids wide canvas from corner notes).
    col_h = max(1, int(h * 0.92))
    rows = [
        y
        for y in range(h)
        if max(ImageStat.Stat(src.crop((0, y, w, y + 1))).stddev) > threshold
    ]
    cols = [
        x
        for x in range(w)
        if max(ImageStat.Stat(src.crop((x, 0, x + 1, col_h))).stddev) > threshold
    ]
    if not rows or not cols:
        return (0, 0, w, h)
    return (cols[0], rows[0], cols[-1] + 1, rows[-1] + 1)


def trim_content(img: Image.Image, tolerance: int = 20) -> Image.Image:
    """Crop uniform margins, then tighten uneven whitespace."""
    src = img.convert("RGB")
    w, h = src.size
    corners = (
        src.getpixel((0, 0)),
        src.getpixel((w - 1, 0)),
        src.getpixel((0, h - 1)),
        src.getpixel((w - 1, h - 1)),
    )
    bg = tuple(sum(channel[i] for channel in corners) // 4 for i in range(3))
    diff = ImageChops.difference(src, Image.new("RGB", src.size, bg))
    mask = diff.convert("L").point(lambda px: 255 if px > tolerance else 0)
    box = mask.getbbox()
    if box:
        src = src.crop(box)
    return src.crop(tight_bbox(src))


def fit_usage_guide(img: Image.Image, target_width: int) -> Image.Image:
    """Trim whitespace and scale to reference width — no portrait letterboxing."""
    trimmed = trim_content(img)
    sw, sh = trimmed.size
    if sw == target_width:
        return trimmed
    scale = target_width / sw
    nh = max(1, int(sh * scale))
    return trimmed.resize((target_width, nh), Image.Resampling.LANCZOS)


def fit_to_target(img: Image.Image, target: tuple[int, int]) -> Image.Image:
    """Scale to fit inside target — never stretch (avoids squashed usage guides)."""
    tw, th = target
    src = img.convert("RGB")
    sw, sh = src.size
    if (sw, sh) == (tw, th):
        return src
    scale = min(tw / sw, th / sh)
    nw, nh = max(1, int(sw * scale)), max(1, int(sh * scale))
    resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
    # Sample paper tone from BR reference corner
    paper = (245, 245, 247)
    canvas = Image.new("RGB", (tw, th), paper)
    canvas.paste(resized, ((tw - nw) // 2, (th - nh) // 2))
    return canvas


def save(img: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.suffix.lower() == ".webp":
        img.save(dest, "WEBP", quality=94, method=6)
    else:
        img.save(dest, "JPEG", quality=94, optimize=True)


def main() -> None:
    gdir = gen_dir()
    for src_name, dest_name, br_ref in JOBS:
        src = gdir / src_name
        if not src.exists():
            print("missing", src)
            continue
        w, h = target_size(br_ref)
        img = Image.open(src).convert("RGB")
        if dest_name in USAGE_DESTS:
            img = fit_usage_guide(img, w)
        elif img.size != (w, h):
            img = fit_to_target(img, (w, h))
        save(img, OUT / dest_name)
        print("ok", dest_name, f"{img.size[0]}x{img.size[1]}")

    logo_src = SRC_BR / "aidex-logo.png"
    if logo_src.exists():
        (OUT / "aidex-logo.png").write_bytes(logo_src.read_bytes())
        print("ok aidex-logo.png (copy BR brand)")


if __name__ == "__main__":
    main()
