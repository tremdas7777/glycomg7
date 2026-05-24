import imgProductBox from "@/assets/aidex-product-box.png";
import imgApplicator from "@/assets/aidex-applicator.png";
import bannerStoreMobile from "@/assets/banner-store-mobile.jpg";
import bannerStoreDesktop from "@/assets/banner-store-desktop.jpg";
import { brand } from "@/lib/brand";

const green = brand.colors.primary;
const tint = brand.colors.surfaceTint;

export type BannerSlide = {
  mobile: string;
  desktop: string;
  alt: string;
  caption: string;
  bg: string;
};

/** Único banner da loja — desktop (horizontal) + mobile (vertical) */
export const bannerGallery: BannerSlide[] = [
  {
    mobile: bannerStoreMobile,
    desktop: bannerStoreDesktop,
    alt: "AiDEX X CGM — Sem calibração · MARD 8,66%",
    caption: "Sem calibração · MARD 8,66%",
    bg: "#1a1a1a",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  bg: string;
  mobile?: string;
  desktop?: string;
};

/** Galeria produto — fotos reais do produto */
export const productGallery: GalleryItem[] = [
  {
    src: imgProductBox,
    alt: "Embalagem AiDEX X",
    caption: "Embalagem oficial",
    bg: tint,
  },
  {
    src: imgApplicator,
    alt: "Aplicador e sensor AiDEX X",
    caption: "Aplicador + sensor",
    bg: "#ffffff",
  },
];

export const productHeroImage = imgProductBox;
export const productKitImage = imgApplicator;

export const homeImages = {
  bannerWide: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  heroSensor: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  appIphone: { mobile: imgProductBox, desktop: imgProductBox },
  lifestyleRunning: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  lifestyleFood: { mobile: imgApplicator, desktop: imgApplicator },
} as const;
