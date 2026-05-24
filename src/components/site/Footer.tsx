import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-24">
      <div className="container-edge py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-lg font-semibold tracking-tight">GLYCOM™</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Sistema de monitoramento contínuo de glicose em tempo real.
          </p>
          <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Site protegido com SSL
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Produto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/produto" className="hover:text-foreground">Glycom G7 CGM</Link></li>
            <li><a href="/#como-funciona" className="hover:text-foreground">Como Funciona</a></li>
            <li><a href="/#planos" className="hover:text-foreground">Planos</a></li>
            <li><Link to="/rastreio" className="hover:text-foreground">Rastrear Pedido</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Suporte</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/sobre" className="hover:text-foreground">Sobre</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Políticas</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/politica-envio" className="hover:text-foreground">Envio</Link></li>
            <li><Link to="/politica-privacidade" className="hover:text-foreground">Privacidade</Link></li>
            <li><Link to="/politica-reembolso" className="hover:text-foreground">Reembolso</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-edge py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Glycom Health. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Visa</span><span>Master</span><span>Pix</span><span>Boleto</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Youtube" className="hover:text-foreground"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
