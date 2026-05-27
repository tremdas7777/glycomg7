import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return { ok: false, error: "ADMIN_PASSWORD not set" };
    return { ok: data.password === expected };
  });

export const getAdminFunnel = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [{ data: recent }, { data: all }] = await Promise.all([
      supabaseAdmin
        .from("funnel_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
      supabaseAdmin
        .from("funnel_events")
        .select("session_id,event_type,created_at,bundle_id,bundle_name,value")
        .gte("created_at", since),
    ]);

    const events = all ?? [];
    const sessions = new Map<string, Set<string>>();
    for (const e of events) {
      if (!sessions.has(e.session_id)) sessions.set(e.session_id, new Set());
      sessions.get(e.session_id)!.add(e.event_type);
    }

    let visited = 0,
      viewedProduct = 0,
      checkout = 0;
    for (const types of sessions.values()) {
      if (types.has("page_view") || types.has("product_view")) visited++;
      if (types.has("product_view")) viewedProduct++;
      if (types.has("checkout_click")) checkout++;
    }

    return {
      recent: recent ?? [],
      funnel: {
        visited,
        viewedProduct,
        checkout,
        totalEvents: events.length,
        totalSessions: sessions.size,
      },
    };
  });
