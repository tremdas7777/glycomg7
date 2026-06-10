import { useEffect, useState } from "react";

const messages = [
  "Kostenloser Versand in ganz Deutschland",
  "2-Monats-Plan — Bestseller · sparen Sie €9",
  "Mindest-Kit: 2 Sensoren · 1 Monat kontinuierliches Monitoring",
  "AiDEX App auf Deutsch · iOS und Android",
];

export function DeAnnouncementBar() {
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
      aria-label="Shop-Ankündigung"
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
