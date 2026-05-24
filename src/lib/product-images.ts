import imgProductBox from "@/assets/aidex-product-box.png";
import imgApplicator from "@/assets/aidex-applicator.png";

import b01HeroMobile from "@/assets/b01-hero-mobile.jpg";
import b01HeroDesktop from "@/assets/b01-hero-desktop.jpg";
import b02AppMobile from "@/assets/b02-applicator-mobile.jpg";
import b02AppDesktop from "@/assets/b02-applicator-desktop.jpg";
import b03LifeMobile from "@/assets/b03-lifestyle-mobile.jpg";
import b03LifeDesktop from "@/assets/b03-lifestyle-desktop.jpg";
import b04AppMobile from "@/assets/b04-app-mobile.jpg";
import b04AppDesktop from "@/assets/b04-app-desktop.jpg";
import b05Ip68Mobile from "@/assets/b05-ip68-mobile.jpg";
import b05Ip68Desktop from "@/assets/b05-ip68-desktop.jpg";
import b06CalMobile from "@/assets/b06-calibracao-mobile.jpg";
import b06CalDesktop from "@/assets/b06-calibracao-desktop.jpg";

import p01BoxMobile from "@/assets/p01-box-mobile.jpg";
import p01BoxDesktop from "@/assets/p01-box-desktop.jpg";
import p02KitMobile from "@/assets/p02-kit-mobile.jpg";
import p02KitDesktop from "@/assets/p02-kit-desktop.jpg";

import homeIp68Mobile from "@/assets/home-ip68-mobile.jpg";
import homeIp68Desktop from "@/assets/home-ip68-desktop.jpg";
import homeLifeMobile from "@/assets/home-lifestyle-mobile.jpg";
import homeLifeDesktop from "@/assets/home-lifestyle-desktop.jpg";
import homeAppMobile from "@/assets/home-app-mobile.jpg";
import homeAppDesktop from "@/assets/home-app-desktop.jpg";
import homeFamilyMobile from "@/assets/home-family-mobile.jpg";
import homeFamilyDesktop from "@/assets/home-family-desktop.jpg";
import homeHowtoMobile from "@/assets/home-howto-mobile.jpg";
import homeHowtoDesktop from "@/assets/home-howto-desktop.jpg";

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

/** Carrossel — artes elaboradas (banner-pro), formatos mobile + desktop separados */
export const bannerGallery: BannerSlide[] = [
  {
    mobile: b01HeroMobile,
    desktop: b01HeroDesktop,
    alt: "AiDEX X CGM — embalagem oficial",
    caption: "AiDEX X · Sistema CGM",
    bg: tint,
  },
  {
    mobile: b02AppMobile,
    desktop: b02AppDesktop,
    alt: "Aplicador e sensor AiDEX X",
    caption: "Aplicador + sensor",
    bg: "#ffffff",
  },
  {
    mobile: b03LifeMobile,
    desktop: b03LifeDesktop,
    alt: "AiDEX X — aplicação no dia a dia",
    caption: "Fácil de aplicar",
    bg: tint,
  },
  {
    mobile: b04AppMobile,
    desktop: b04AppDesktop,
    alt: "App AiDEX X em português",
    caption: "App em português",
    bg: "#ffffff",
  },
  {
    mobile: b05Ip68Mobile,
    desktop: b05Ip68Desktop,
    alt: "AiDEX X IP68 — à prova d'água",
    caption: "IP68 · banho e natação",
    bg: brand.colors.primaryDeep,
  },
  {
    mobile: b06CalMobile,
    desktop: b06CalDesktop,
    alt: "AiDEX X — sem calibração, MARD 8,66%",
    caption: "Sem calibração",
    bg: "#ffffff",
  },
];

export type GalleryItem = BannerSlide & { src: string };

/** Galeria produto — cada item com imagem mobile e desktop distintas */
export const productGallery: GalleryItem[] = [
  {
    mobile: p01BoxMobile,
    desktop: p01BoxDesktop,
    src: p01BoxMobile,
    alt: "Embalagem AiDEX X",
    caption: "Embalagem oficial",
    bg: tint,
  },
  {
    mobile: p02KitMobile,
    desktop: p02KitDesktop,
    src: p02KitMobile,
    alt: "Aplicador e sensor AiDEX X",
    caption: "Aplicador + sensor",
    bg: "#ffffff",
  },
  {
    mobile: b03LifeMobile,
    desktop: b03LifeDesktop,
    src: b03LifeMobile,
    alt: "AiDEX X — aplicação",
    caption: "Fácil de aplicar",
    bg: tint,
  },
  {
    mobile: b04AppMobile,
    desktop: b04AppDesktop,
    src: b04AppMobile,
    alt: "App AiDEX X",
    caption: "Alertas no app",
    bg: "#ffffff",
  },
  {
    mobile: b05Ip68Mobile,
    desktop: b05Ip68Desktop,
    src: b05Ip68Mobile,
    alt: "AiDEX X IP68",
    caption: "À prova d'água",
    bg: brand.colors.primaryDeep,
  },
  {
    mobile: b06CalMobile,
    desktop: b06CalDesktop,
    src: b06CalMobile,
    alt: "Sem calibração",
    caption: "Sem calibração",
    bg: "#ffffff",
  },
];

export const productHeroImage = imgProductBox;
export const productKitImage = imgApplicator;

export const homeImages = {
  bannerWide: { mobile: homeIp68Mobile, desktop: homeIp68Desktop },
  heroSensor: { mobile: homeLifeMobile, desktop: homeLifeDesktop },
  appIphone: { mobile: homeAppMobile, desktop: homeAppDesktop },
  lifestyleRunning: { mobile: homeFamilyMobile, desktop: homeFamilyDesktop },
  lifestyleFood: { mobile: homeHowtoMobile, desktop: homeHowtoDesktop },
} as const;
