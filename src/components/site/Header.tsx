import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Início" },
  { to: "/#como-funciona", label: "Como Funciona" },
  { to: "/#beneficios", label: "Benefícios" },
  { to: "/#planos", label: "Planos" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-edge flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            GLYCOM
            <sup className="text-[0.55em] ml-0.5 text-muted-foreground">™</sup>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.to}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/produto" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm">
            Comprar Agora
          </Link>
          <button
            aria-label="Abrir menu"
            className="lg:hidden p-2 rounded-full hover:bg-surface"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden animate-in fade-in duration-200">
          <div className="container-edge flex items-center justify-between h-16">
            <span className="text-lg font-semibold">GLYCOM</span>
            <button
              aria-label="Fechar menu"
              className="p-2 rounded-full hover:bg-surface"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="container-edge mt-8 flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.to}
                onClick={() => setOpen(false)}
                className="py-4 text-2xl font-medium tracking-tight border-b border-border"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/produto"
              onClick={() => setOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Comprar Agora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
