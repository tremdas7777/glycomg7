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
  .inputValidator((d) =>
    z
      .object({
        password: z.string().min(1).max(200),
        windowMinutes: z
          .number()
          .int()
          .min(5)
          .max(60 * 24 * 30)
          .default(60 * 24),
        onlineMinutes: z.number().int().min(1).max(60).default(3),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }

    const since = new Date(Date.now() - data.windowMinutes * 60 * 1000).toISOString();
    const onlineSince = new Date(Date.now() - data.onlineMinutes * 60 * 1000).toISOString();

    const [{ data: recent }, { data: all }] = await Promise.all([
      supabaseAdmin
        .from("funnel_events")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(200),
      supabaseAdmin
        .from("funnel_events")
        .select("session_id,event_type,created_at")
        .gte("created_at", since),
    ]);

    const events = all ?? [];
    const sessions = new Map<string, Set<string>>();
    const lastSeenBySession = new Map<string, string>();
    for (const e of events) {
      if (!sessions.has(e.session_id)) sessions.set(e.session_id, new Set());
      sessions.get(e.session_id)!.add(e.event_type);
      const prev = lastSeenBySession.get(e.session_id);
      if (!prev || new Date(e.created_at).getTime() > new Date(prev).getTime()) {
        lastSeenBySession.set(e.session_id, e.created_at);
      }
    }

    let visited = 0,
      viewedProduct = 0,
      checkout = 0;
    for (const types of sessions.values()) {
      if (types.has("page_view") || types.has("product_view")) visited++;
      if (types.has("product_view")) viewedProduct++;
      if (types.has("checkout_click")) checkout++;
    }

    let onlineNow = 0;
    for (const lastSeen of lastSeenBySession.values()) {
      if (lastSeen >= onlineSince) onlineNow++;
    }

    return {
      recent: recent ?? [],
      funnel: {
        visited,
        viewedProduct,
        checkout,
        totalEvents: events.length,
        totalSessions: sessions.size,
        onlineNow,
        windowMinutes: data.windowMinutes,
        onlineMinutes: data.onlineMinutes,
      },
    };
  });

export type AdminOrder = {
  id: string;
  status: string;
  amount_cents: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    endereco?: string;
    frete?: { id: string; name: string; price: number };
  };
  bundle_id: string;
  bundle_name: string;
  utm: Record<string, string | null> | null;
  fbp: string | null;
  fbc: string | null;
  ip: string | null;
  ua: string | null;
  url: string | null;
  paid_reported_at: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report_result: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

export const getAdminOrders = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        password: z.string().min(1).max(200),
        days: z.number().int().min(1).max(365).default(30),
      })
      .parse(d),
  )
  .handler(async ({ data }): Promise<{ orders: AdminOrder[] }> => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const since = new Date(Date.now() - data.days * 24 * 60 * 60 * 1000).toISOString();
    // Tabela pix_orders ainda não presente nos tipos gerados.
    const db = supabaseAdmin as unknown as { from: (t: string) => any };
    const { data: rows, error } = await db
      .from("pix_orders")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return { orders: (rows ?? []) as AdminOrder[] };
  });
