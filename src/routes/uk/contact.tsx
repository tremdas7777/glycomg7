import { createFileRoute } from "@tanstack/react-router";
import { UkSiteLayout } from "@/components/uk/Layout";
import { ukBrand } from "@/lib/locale/uk/brand";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/contact")({
  head: () => ({
    meta: [
      { title: "Contact | AiDEX" },
      { name: "description", content: "Contact the AiDEX team. Personal support." },
      { property: "og:title", content: "AiDEX contact" },
      { property: "og:description", content: "Contact the AiDEX team." },
      { property: "og:url", content: ukPaths.contact },
    ],
    links: [{ rel: "canonical", href: ukPaths.contact }],
  }),
  component: Page,
});

function Page() {
  return (
    <UkSiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow text-[var(--primary)]">Support</span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mt-6 text-balance">
              We're <br />
              <span className="italic">here for you.</span>
            </h1>
            <p className="mt-6 text-[var(--ink)]/70 leading-relaxed max-w-sm">
              Our team responds within 24 hours on working days.
            </p>
            <ul className="mt-12 space-y-6 text-sm">
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">Email</div>
                <div>{ukBrand.email}</div>
              </li>
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">Location</div>
                <div>United Kingdom</div>
              </li>
            </ul>
          </div>

          <form
            className="lg:col-span-7 bg-white p-10 md:p-12 border border-[rgba(13,13,13,0.08)] rounded-xl space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent!");
            }}
          >
            <Field label="Name" />
            <Field label="Email" type="email" />
            <Field label="Message" textarea />
            <button className="w-full bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors">
              Send message
            </button>
          </form>
        </div>
      </section>
    </UkSiteLayout>
  );
}

function Field({
  label,
  type = "text",
  textarea,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "mt-3 w-full border-0 border-b border-[rgba(13,13,13,0.2)] bg-transparent px-0 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors text-base";
  return (
    <label className="block">
      <span className="eyebrow text-[var(--ink)]/60">{label}</span>
      {textarea ? (
        <textarea required rows={5} className={cls} />
      ) : (
        <input required type={type} className={cls} />
      )}
    </label>
  );
}
