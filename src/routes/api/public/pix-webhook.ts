import { createFileRoute } from "@tanstack/react-router";

// Recebe notificações da Solution Payments. Apenas registra; o status real
// é sempre consultado na API autenticada (getPixStatus), então nada aqui é confiável.
export const Route = createFileRoute("/api/public/pix-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as { event?: string; id?: unknown } | null;
        console.log("pix-webhook", body?.event, body?.id);
        return Response.json({ ok: true });
      },
    },
  },
});
