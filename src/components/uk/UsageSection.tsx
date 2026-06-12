import useApplication from "@/assets/uk/aidex-use-application.webp";
import useFaq from "@/assets/uk/aidex-use-faq.webp";
import usePlacement from "@/assets/uk/aidex-use-placement.webp";
import useCare from "@/assets/uk/aidex-use-care.webp";

const usageGuides = [
  {
    src: useApplication,
    aspect: "705 / 775",
    alt: "How to apply the AiDEX G7 sensor in four steps",
    title: "Application",
  },
  {
    src: usePlacement,
    aspect: "750 / 576",
    alt: "Recommended sensor placement sites",
    title: "Placement",
  },
  {
    src: useFaq,
    aspect: "750 / 683",
    alt: "Frequently asked questions about AiDEX G7",
    title: "Questions",
  },
  {
    src: useCare,
    aspect: "696 / 480",
    alt: "Important care while wearing AiDEX G7",
    title: "Care",
  },
] as const;

export function UkProductUsageSection() {
  return (
    <section
      id="usage"
      className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]"
    >
      <div className="container-edge">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="eyebrow text-[var(--primary)]">Product usage</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-balance">
            Simple application, app pairing, and everyday care.
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/65">
            Visual guides in English for applying the sensor, choosing a site, and everyday care.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {usageGuides.map((guide) => (
            <figure
              key={guide.title}
              className="overflow-hidden rounded-2xl border border-[rgba(13,13,13,0.08)] bg-white"
            >
              <div
                className="flex w-full items-center justify-center bg-white px-4 py-5 md:px-6 md:py-6"
                style={{ aspectRatio: guide.aspect }}
              >
                <img
                  src={guide.src}
                  alt={guide.alt}
                  loading="lazy"
                  decoding="async"
                  className="block max-h-full max-w-full object-contain object-center"
                />
              </div>
              <figcaption className="border-t border-[rgba(13,13,13,0.08)] bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink)]/50">
                {guide.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
