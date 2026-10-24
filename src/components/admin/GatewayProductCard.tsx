import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type ComponentProps } from "react";
import { Save, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { gatewayProductNameSchema } from "@/lib/gateway-product";
import { getGatewayProductNameFn, saveGatewayProductNameFn } from "@/lib/gateway-product.functions";

export interface GatewayProductCardProps extends ComponentProps<typeof Card> {
  password: string;
}

export function GatewayProductCard({ password, className, ...props }: GatewayProductCardProps) {
  const getName = useServerFn(getGatewayProductNameFn);
  const saveName = useServerFn(saveGatewayProductNameFn);
  const queryClient = useQueryClient();
  const queryKey = ["admin-gateway-product-name"];
  const { data, isPending, isError, refetch } = useQuery({
    queryKey,
    queryFn: () => getName({ data: { password } }),
    staleTime: 0,
    retry: false,
  });
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const name = draft ?? data?.name ?? "";
  const parsed = gatewayProductNameSchema.safeParse(name);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!parsed.success || saving) return;
    setSaving(true);
    setMessage(null);
    try {
      const result = await saveName({ data: { password, name: parsed.data } });
      queryClient.setQueryData(queryKey, result);
      setDraft(null);
      setMessage("Nome salvo para os próximos pagamentos.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card {...props} className={cn("mt-3 flex flex-col gap-4 p-5", className)}>
      <div className="flex items-center gap-3">
        <Tag className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
        <h3 className="font-medium">Nome do produto no gateway</h3>
      </div>
      {isPending ? <p className="text-sm text-muted-foreground" role="status">Carregando…</p> : isError ? (
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-destructive">Não foi possível consultar o nome.</p>
          <Button variant="outline" size="sm" onClick={() => void refetch()}>Tentar novamente</Button>
        </div>
      ) : (
        <form onSubmit={save} className="flex flex-col gap-3">
          <label htmlFor="gateway-product-name" className="text-sm text-muted-foreground">Nome enviado nos pagamentos Pix e cartão</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input id="gateway-product-name" value={name} maxLength={80} disabled={saving} onChange={(event) => { setDraft(event.target.value); setMessage(null); }} className="text-base sm:max-w-md" />
            <Button type="submit" disabled={saving || !parsed.success || parsed.data === data?.name}>
              <Save className="h-4 w-4" aria-hidden />{saving ? "Salvando…" : "Salvar nome"}
            </Button>
          </div>
          {draft !== null && !parsed.success && <p className="text-xs text-destructive">{parsed.error.issues[0]?.message}</p>}
        </form>
      )}
      {message && <p className="text-sm" role="status">{message}</p>}
    </Card>
  );
}