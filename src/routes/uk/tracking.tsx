import { createFileRoute } from "@tanstack/react-router";
import { UkSiteLayout } from "@/components/uk/Layout";
import { useState } from "react";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/tracking")({
  head: () => ({
    meta: [
      { title: "Track delivery | AiDEX" },
      { name: "description", content: "Track the delivery of your AiDEX order." },
      { property: "og:title", content: "Track delivery" },
      { property: "og:description", content: "Track your order." },
      { property: "og:url", content: ukPaths.tracking },
    ],
    links: [{ rel: "canonical", href: ukPaths.tracking }],
  }),
  component: Page,
});

function Page() {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <UkSiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge max-w-2xl">
          <span className="eyebrow text-[var(--primary)] block mb-6">Order tracking</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance">
            Track <span className="italic">your order.</span>
          </h1>
          <p className="mt-6 text-[var(--ink)]/70 leading-relaxed">
            Enter the tracking code you received by email after dispatch.
          </p>

          <form
            className="mt-12 border-y border-[rgba(13,13,13,0.1)] py-6 flex gap-4 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(true);
            }}
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="UK123456789"
              className="flex-1 bg-transparent border-0 outline-none text-lg placeholder:text-[var(--ink)]/30"
            />
            <button className="bg-[var(--primary)] text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors">
              Track
            </button>
          </form>

          {searched && (
            <div className="mt-16">
              <div className="eyebrow text-[var(--ink)]/40 mb-4">Status</div>
              <div className="font-display text-3xl mb-2">Order in transit.</div>
              <p className="text-sm text-[var(--ink)]/50 mb-10">Updated 2 hours ago</p>
              <ol className="space-y-px bg-[rgba(13,13,13,0.08)]">
                {[
                  ["Dispatched", "Distribution centre", true],
                  ["In transit", "On the way to your city", true],
                  ["Out for delivery", "Pending", false],
                  ["Delivered", "Pending", false],
                ].map(([title, sub, done], i) => (
                  <li key={i} className="bg-white p-6 flex items-center gap-6">
                    <span
                      className={`font-display italic text-2xl ${done ? "text-[var(--primary)]" : "text-[var(--ink)]/30"}`}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <div
                        className={`text-sm font-semibold ${done ? "" : "text-[var(--ink)]/40"}`}
                      >
                        {title}
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">
                        {sub}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>
    </UkSiteLayout>
  );
}
