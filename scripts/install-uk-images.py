#!/usr/bin/env python3
"""Install UK English marketing images into src/assets/uk/ at BR dimensions."""
from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "uk"
SRC_BR = ROOT / "src" / "assets"

GEN_DIRS = [
    Path.home() / ".cursor" / "projects" / "Users-ulissescardoso-glycomg7-1" / "assets",
    ROOT / "assets" / "uk-generated",
]

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
        if img.size != (w, h):
            img = img.resize((w, h), Image.Resampling.LANCZOS)
        save(img, OUT / dest_name)
        print("ok", dest_name, f"{w}x{h}")

    logo_src = SRC_BR / "aidex-logo.png"
    if logo_src.exists():
        (OUT / "aidex-logo.png").write_bytes(logo_src.read_bytes())
        print("ok aidex-logo.png (copy BR brand)")


if __name__ == "__main__":
    main()
