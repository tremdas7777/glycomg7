import { Link } from "@tanstack/react-router";
import { bannerGallery } from "@/lib/product-images";
import { StoreImage } from "@/components/site/StoreImage";

const slide = bannerGallery[0];

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: slide.bg }}>
      <StoreImage
        srcMobile={slide.mobile}
        srcDesktop={slide.desktop}
        alt={slide.alt}
        variant="banner"
        bg={slide.bg}
        loading="eager"
        draggable={false}
      />

      <div className="border-b border-[rgba(13,13,13,0.08)] bg-[var(--paper)]">
        <div className="container-edge flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center sm:py-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ink)]/55">
            AiDEX X CGM · Monitoramento em tempo real · IP68 · App em português
          </p>
          <div className="flex items-center gap-5">
            <span className="rule hidden sm:block" />
            <Link
              to="/produto"
              className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:text-[var(--primary)]"
            >
              Comprar Agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
