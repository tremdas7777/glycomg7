import useApplication from "@/assets/uk/aidex-use-application.webp";
import useFaq from "@/assets/uk/aidex-use-faq.webp";
import usePlacement from "@/assets/uk/aidex-use-placement.webp";
import useCare from "@/assets/uk/aidex-use-care.webp";

const usageGuides = [
  {
    src: useApplication,
    aspect: "705 / 775",
    alt: "Cómo aplicar el sensor AiDEX G7 en cuatro pasos",
    title: "Aplicación",
  },
  {
    src: usePlacement,
    aspect: "750 / 576",
    alt: "Zonas recomendadas para colocar el sensor",
    title: "Colocación",
  },
  {
    src: useFaq,
    aspect: "750 / 683",
    alt: "Preguntas frecuentes sobre AiDEX G7",
    title: "Dudas",
  },
  {
    src: useCare,
    aspect: "696 / 480",
    alt: "Cuidados importantes mientras usas AiDEX G7",
    title: "Cuidados",
  },
] as const;

export function MxProductUsageSection() {
  return (
    <section
      id="usage"
      className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]"
    >
      <div className="container-edge">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="eyebrow text-[var(--primary)]">Uso del producto</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-balance">
            Aplicación sencilla, sincronización con la app y cuidados diarios.
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/65">
            Guías visuales en español para aplicar el sensor, elegir la zona y cuidados cotidianos.
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
