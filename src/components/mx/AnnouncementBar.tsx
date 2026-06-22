import { useEffect, useState } from "react";

const messages = [
  "Envío gratis a todo México",
  "Plan de 2 meses — más vendido · ahorra $130 MXN",
  "Kit mínimo: 2 sensores · 1 mes de monitoreo continuo",
  "App AiDEX en español · iOS y Android",
];

export function MxAnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-[var(--primary)] text-white"
      role="region"
      aria-label="Anuncios de la tienda"
      aria-live="polite"
    >
      <p
        key={index}
        className="container-edge truncate py-1.5 text-center text-[9px] font-bold uppercase leading-none tracking-[0.11em] md:py-2 md:text-xs md:tracking-[0.18em] animate-in fade-in duration-500"
        title={messages[index]}
      >
        {messages[index]}
      </p>
    </div>
  );
}
