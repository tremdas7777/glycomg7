import { createFileRoute } from "@tanstack/react-router";

// O corpo dos gateways legados continua a ser apenas um sinal: o estado é confirmado pela API autenticada.
// Para a Koku, a assinatura é validada sobre o corpo bruto antes do JSON.parse.
export const Route = createFileRoute("/api/public/pix-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const gw = new URL(request.url).searchParams.get("gw");
        if (gw === "ko") {
          const rawBody = await request.text();
          const { getKokuWebhookSecret, verifyKokuSignature } = await import("@/lib/koku.server");
          const secret = getKokuWebhookSecret();
          const valid =
            !!secret &&
            (await verifyKokuSignature(rawBody, request.headers.get("x-koku-signature"), secret));
          if (!valid)
            return Response.json({ ok: false, error: "invalid_signature" }, { status: 400 });

          const body = JSON.parse(rawBody) as {
            type?: string;
            data?: { charge_id?: string };
          };
          if (body.type !== "charge.paid" || !body.data?.charge_id)
            return Response.json({ ok: true });
          const id = `ko_${body.data.charge_id}`;
          try {
            const { fetchGatewayStatus, reportPaidOnce, isPaidStatus } =
              await import("@/lib/pix-orders.server");
            const { status, amount } = await fetchGatewayStatus(id);
            if (isPaidStatus(status)) await reportPaidOnce(id, amount);
          } catch (e) {
            console.error("koku-webhook failed", e);
          }
          return Response.json({ ok: true });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- payloads dos gateways legados
        const body = (await request.json().catch(() => null)) as any;
        const isUmbrella = gw === "um";
        const isSagace = gw === "sg";
        const isPayShark = gw === "ps";
        const rawId =
          (isUmbrella ? (body?.objectId ?? body?.data?.id ?? body?.id) : undefined) ??
          (isSagace ? (body?.data?.id ?? body?.id ?? body?.sale?.id) : undefined) ??
          (isPayShark ? (body?.id ?? body?.data?.id) : undefined) ??
          body?.transaction_id ??
          body?.id ??
          body?.transaction?.id ??
          body?.body?.transaction?.id ??
          body?.data?.id;
        const isCard = gw === "hc";
        const prefix = isCard
          ? "hc_"
          : isUmbrella
            ? "um_"
            : isSagace
              ? "sg_"
              : isPayShark
                ? "ps_"
                : "";
        const id = rawId == null ? "" : `${prefix}${String(rawId)}`;
        console.log("pix-webhook", body?.event, id);
        if (!/^[\w-]{1,64}$/.test(id)) return Response.json({ ok: true });
        try {
          const { fetchGatewayStatus, reportPaidOnce, isPaidStatus } =
            await import("@/lib/pix-orders.server");
          const { status, amount } = await fetchGatewayStatus(id);
          if (isPaidStatus(status)) await reportPaidOnce(id, amount);
        } catch (e) {
          console.error("pix-webhook failed", e);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
