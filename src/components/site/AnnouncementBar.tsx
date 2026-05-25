import { useEffect, useState } from "react";

const messages = [
  "Frete grátis para todo o Brasil",
  "2 unidades — mais vendido · economize R$97",
  "App AiDEX em português · iOS e Android",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-[var(--primary)] text-white py-2.5"
      role="region"
      aria-label="Anúncio da loja"
      aria-live="polite"
    >
      <p
        key={index}
        className="container-edge text-center text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-balance md:text-xs md:tracking-[0.18em] animate-in fade-in duration-500"
      >
        {messages[index]}
      </p>
    </div>
  );
}
