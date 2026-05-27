import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "aidex_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
  };
}

export type FunnelEventInput = {
  event_type: "page_view" | "product_view" | "checkout_click";
  path?: string;
  bundle_id?: string;
  bundle_name?: string;
  value?: number;
  metadata?: Record<string, unknown>;
};

export async function trackEvent(input: FunnelEventInput) {
  if (typeof window === "undefined") return;
  try {
    const utm = getUtmParams();
    await supabase.from("funnel_events").insert({
      session_id: getSessionId(),
      event_type: input.event_type,
      path: input.path ?? window.location.pathname,
      bundle_id: input.bundle_id ?? null,
      bundle_name: input.bundle_name ?? null,
      value: input.value ?? null,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      metadata: (input.metadata ?? null) as never,
    });
  } catch (e) {
    console.warn("trackEvent failed", e);
  }
}
