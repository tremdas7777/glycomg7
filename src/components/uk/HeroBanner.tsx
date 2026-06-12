import { Link } from "@tanstack/react-router";
import { ukBannerGallery } from "@/lib/locale/uk/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { ukPaths } from "@/lib/locale/uk/paths";

const slide = ukBannerGallery[0];

export function UkHeroBanner() {
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
            AiDEX G7 glucose sensor · 24h real-time · No routine finger pricks · Free UK delivery
          </p>
          <div className="flex items-center">
            <Link
              to={ukPaths.product}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_30px_-14px_rgba(101,163,13,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_16px_34px_-14px_rgba(101,163,13,0.95)]"
            >
              View plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
