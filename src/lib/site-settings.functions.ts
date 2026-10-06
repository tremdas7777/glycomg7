import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabase
    .from("site_settings")
    .select("key,value")
    .in("key", ["whatsapp_enabled", "card_enabled", "card_autotest_until"]);
  const map = new Map((data ?? []).map((r) => [r.key, r.value]));
  return {
    whatsappEnabled: map.get("whatsapp_enabled") === true,
    // Cartão começa desligado; só aparece para os clientes depois de ativado no admin.
    cardEnabled: map.get("card_enabled") === true,
    // Teste automático da cobrança adicional: ligado até este horário (desliga sozinho).
    cardAutoTestUntil:
      typeof map.get("card_autotest_until") === "string"
        ? (map.get("card_autotest_until") as string)
        : null,
  };
});

/** Teste automático da cobrança adicional no cartão: liga por 1 hora (expira sozinho) ou desliga. */
export const setCardAutoTest = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ password: z.string().min(1).max(200), on: z.boolean() }).parse(d),
  )
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const until = data.on ? new Date(Date.now() + 60 * 60 * 1000).toISOString() : null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert({ key: "card_autotest_until", value: until, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true, until };
  });

export const setCardEnabled = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ password: z.string().min(1).max(200), enabled: z.boolean() }).parse(d),
  )
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert({ key: "card_enabled", value: data.enabled, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true, enabled: data.enabled };
  });

export const setWhatsappEnabled = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ password: z.string().min(1).max(200), enabled: z.boolean() }).parse(d),
  )
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert({
        key: "whatsapp_enabled",
        value: data.enabled,
        updated_at: new Date().toISOString(),
      });
    if (error) throw new Error(error.message);
    return { ok: true, enabled: data.enabled };
  });
