import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getUtmifyStatus, sendUtmifyTest } from "@/lib/utmify.functions";

export interface UtmifyCardProps {
  password: string;
}

/** Status da integração UTMify + envio de venda de teste. */
export function UtmifyCard({ password }: UtmifyCardProps) {
  const statusFn = useServerFn(getUtmifyStatus);
  const testFn = useServerFn(sendUtmifyTest);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [testing, setTesting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!password) return;
    statusFn({ data: { password } })
      .then((r) => setConfigured(r.configured))
      .catch(() => setConfigured(false));
  }, [password, statusFn]);

  const runTest = async () => {
    setTesting(true);
    setMsg(null);
    try {
      const r = await testFn({ data: { password } });
      setMsg(r.ok ? "Venda de teste enviada. Confira no painel da UTMify." : `Falhou: ${r.error ?? r.status ?? "erro"}`);
    } catch {
      setMsg("Falhou ao enviar o teste.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="mt-3 p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <BarChart3 className="w-5 h-5 text-muted-foreground" aria-hidden />
        <div>
          <div className="font-medium">Integração UTMify</div>
          <div className="text-xs text-muted-foreground">
            Cada Pix gerado (pendente) e cada pagamento aprovado é enviado à UTMify com as UTMs do cliente.
          </div>
          {msg && <div className="mt-1 text-xs text-foreground">{msg}</div>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          {configured === null ? "…" : configured ? "Conectada" : "Sem token"}
        </span>
        <Button size="sm" variant="outline" disabled={!configured || testing} onClick={runTest}>
          {testing ? "Enviando…" : "Enviar teste"}
        </Button>
      </div>
    </Card>
  );
}
