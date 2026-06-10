#!/usr/bin/env python3
"""Instala artes DE geradas (PNG/JPG) em src/assets/de/ com tamanho e formato corretos."""
from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "de"
SRC_BR = ROOT / "src" / "assets"

# Artes geradas pelo Cursor (fora do repo)
GEN_DIRS = [
    Path.home() / ".cursor" / "projects" / "Users-ulissescardoso-glycomg7-1" / "assets",
    ROOT / "assets" / "de-generated",
]

# origem gerada -> destino DE (tamanho alvo = original BR)
JOBS: list[tuple[str, str, str]] = [
    ("aidex-prod-kit-de.png", "aidex-prod-kit.webp", "aidex-prod-kit.webp"),
    ("aidex-prod-features-de.png", "aidex-prod-features.webp", "aidex-prod-features.webp"),
    ("aidex-prod-reports-de.png", "aidex-prod-reports.webp", "aidex-prod-reports.webp"),
    ("aidex-prod-bluetooth-de.png", "aidex-prod-bluetooth.webp", "aidex-prod-bluetooth.webp"),
    ("aidex-prod-water-de.png", "aidex-prod-water.webp", "aidex-prod-water.webp"),
    ("banner-store-desktop-de.jpg", "banner-store-desktop.jpg", "banner-store-desktop.jpg"),
    ("banner-store-mobile-de.png", "banner-store-mobile.webp", "banner-store-mobile.webp"),
    ("aidex-use-application-de.png", "aidex-use-application.webp", "aidex-use-application.webp"),
    ("aidex-use-faq-de.png", "aidex-use-faq.webp", "aidex-use-faq.webp"),
    ("aidex-use-placement-de.png", "aidex-use-placement.webp", "aidex-use-placement.webp"),
    ("aidex-use-care-de.png", "aidex-use-care.webp", "aidex-use-care.webp"),
]


def gen_dir() -> Path:
    for d in GEN_DIRS:
        if d.exists():
            return d
    raise FileNotFoundError("Nenhuma pasta de artes DE encontrada")


def target_size(br_name: str) -> tuple[int, int]:
    ref = SRC_BR / br_name
    with Image.open(ref) as im:
        return im.size


def save(img: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.suffix.lower() == ".webp":
        img.save(dest, "WEBP", quality=92, method=6)
    else:
        img.save(dest, "JPEG", quality=92, optimize=True)


def main() -> None:
    gdir = gen_dir()
    if not gdir.exists():
        raise SystemExit(f"Pasta de artes geradas não encontrada: {gdir}")

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

    # logo: marca universal, copia do BR
    logo_src = SRC_BR / "aidex-logo.png"
    if logo_src.exists():
        logo_src_bytes = logo_src.read_bytes()
        (OUT / "aidex-logo.png").write_bytes(logo_src_bytes)
        print("ok aidex-logo.png (copy BR brand)")


if __name__ == "__main__":
    main()
