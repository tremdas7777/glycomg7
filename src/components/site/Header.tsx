import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/#tecnologia", label: "Tecnologia" },
  { to: "/#planos", label: "Planos" },
  { to: "/#ciencia", label: "Ciência" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[var(--paper)]/80 backdrop-blur-md border-b border-[rgba(13,13,13,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-edge flex justify-between items-center py-5 md:py-6">
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-[0.18em] uppercase text-[var(--ink)]">
          Glycom
        </Link>

        <nav className="hidden md:flex gap-10 lg:gap-12 text-sm font-medium uppercase tracking-[0.18em]">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.to}
              className="text-[var(--ink)] hover:text-[var(--primary)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/produto"
            className="hidden sm:inline-flex bg-[var(--ink)] text-white px-6 md:px-8 py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] hover:bg-[var(--primary)] transition-colors"
          >
            Comprar Agora
          </Link>
          <button
            aria-label="Abrir menu"
            className="md:hidden p-2"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--paper)] md:hidden">
          <div className="container-edge flex justify-between items-center py-5">
            <span className="text-xl font-bold tracking-[0.18em] uppercase">Glycom</span>
            <button aria-label="Fechar" className="p-2" onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="container-edge mt-8 flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.to}
                onClick={() => setOpen(false)}
                className="py-5 text-xs font-bold uppercase tracking-[0.2em] border-b border-[rgba(13,13,13,0.08)]"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/produto"
              onClick={() => setOpen(false)}
              className="mt-10 bg-[var(--ink)] text-white py-4 text-center text-xs font-bold uppercase tracking-[0.2em]"
            >
              Comprar Agora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
