import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CtaFinal } from "@/components/site/sections";
import lifestyleRunning from "@/assets/lifestyle-running.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Glycom | Healthtech de monitoramento contínuo" },
      { name: "description", content: "A Glycom é uma healthtech dedicada ao monitoramento contínuo de glicose com tecnologia inteligente." },
      { property: "og:title", content: "Sobre a Glycom" },
      { property: "og:description", content: "Healthtech dedicada ao monitoramento contínuo de glicose." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="py-16 md:py-28">
        <div className="container-edge max-w-3xl">
          <div className="chip mb-5">Sobre</div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance">
            Tecnologia médica acessível para todos.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A Glycom é uma healthtech dedicada ao monitoramento contínuo de glicose,
            unindo design premium, tecnologia inteligente e experiência humana para
            transformar a forma como as pessoas cuidam da própria saúde.
          </p>
        </div>
        <div className="container-edge mt-16">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden">
            <img src={lifestyleRunning} alt="Glycom lifestyle" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="container-edge max-w-3xl mt-16 grid gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Nossa missão</h2>
            <p className="text-muted-foreground leading-relaxed">
              Levar tecnologia médica de ponta para milhões de brasileiros, oferecendo
              uma experiência simples, precisa e contínua de acompanhamento da glicose.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Nossos valores</h2>
            <p className="text-muted-foreground leading-relaxed">
              Precisão, transparência, design centrado no usuário e responsabilidade
              com a saúde de cada pessoa que confia na Glycom.
            </p>
          </div>
        </div>
      </section>
      <CtaFinal />
    </SiteLayout>
  );
}
