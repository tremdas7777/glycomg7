import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="container-edge py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="text-2xl font-bold tracking-[0.18em] uppercase">Glycom</div>
            <p className="mt-6 max-w-sm text-sm text-white/50 leading-relaxed">
              Sistema de monitoramento contínuo de glicose. Bio-monitoramento de precisão, agora disponível para sua rotina.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="eyebrow text-white/40 mb-5">Produto</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/produto" className="hover:text-[var(--primary)]">Glycom G7</Link></li>
              <li><a href="/#tecnologia" className="hover:text-[var(--primary)]">Tecnologia</a></li>
              <li><a href="/#planos" className="hover:text-[var(--primary)]">Planos</a></li>
              <li><Link to="/rastreio" className="hover:text-[var(--primary)]">Rastrear</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="eyebrow text-white/40 mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/sobre" className="hover:text-[var(--primary)]">Sobre</Link></li>
              <li><Link to="/contato" className="hover:text-[var(--primary)]">Contato</Link></li>
              <li><Link to="/faq" className="hover:text-[var(--primary)]">FAQ</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="eyebrow text-white/40 mb-5">Políticas</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/politica-envio" className="hover:text-[var(--primary)]">Envio</Link></li>
              <li><Link to="/politica-privacidade" className="hover:text-[var(--primary)]">Privacidade</Link></li>
              <li><Link to="/politica-reembolso" className="hover:text-[var(--primary)]">Reembolso</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
          <span>© {new Date().getFullYear()} Glycom Health</span>
          <div className="flex flex-wrap gap-6 md:gap-10">
            <span>Termos</span>
            <span>Privacidade</span>
            <span>Suporte Médico</span>
            <span>SSL Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
