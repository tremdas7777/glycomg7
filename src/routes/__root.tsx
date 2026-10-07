import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useAntiCopy } from "@/hooks/useAntiCopy";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import { META_PIXEL_ID } from "@/lib/meta-pixel";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: import("@tanstack/react-router").ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AiDEX G7 | Sensor de Glicose e Monitoramento Contínuo" },
      {
        name: "description",
        content:
          "Sensor de glicose AiDEX G7 para monitoramento contínuo em tempo real. Sem picadas de rotina, alertas inteligentes, app em português e planos de 1 a 3 meses.",
      },
      {
        name: "keywords",
        content:
          "sensor de glicose, monitoramento contínuo de glicose, sensor sem picada, AiDEX G7, CGM, glicose em tempo real",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:site_name", content: "AiDEX" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#84CC16" },
      { property: "og:title", content: "AiDEX G7 | Sensor de Glicose e Monitoramento Contínuo" },
      { name: "twitter:title", content: "AiDEX G7 | Sensor de Glicose e Monitoramento Contínuo" },
      {
        property: "og:description",
        content:
          "Monitoramento contínuo de glicose em tempo real com AiDEX G7, sensor CGM com alertas no celular, app em português e planos com frete grátis acima de R$ 200.",
      },
      {
        name: "twitter:description",
        content:
          "Monitoramento contínuo de glicose em tempo real com AiDEX G7, sensor CGM com alertas no celular, app em português e planos com frete grátis acima de R$ 200.",
      },
      { property: "og:image", content: "https://aidexbrasil.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AiDEX — Monitoramento Contínuo de Glicose" },
      { name: "twitter:image", content: "https://aidexbrasil.com/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "text/javascript",
        // Meta Pixel (código oficial) inicializado já no <head>, antes da UTMify e do app.
        // Sem PageView aqui: o app envia o PageView com event_id, igual ao da API de Conversões (sem duplicar).
        children: `(function(){if(location.pathname.indexOf("/admin")===0)return;!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');window.__metaHeadPixel='${META_PIXEL_ID}';})();`,
      },
      {
        type: "text/javascript",
        children: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script"),n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('DAJJPT3C77UBCVGL6490');ttq.page()}(window,document,'ttq');`,
      },
      {
        type: "text/javascript",
        // Pixel UTMify só na loja BR — não carrega em /uk, /de e /mx
        children: `(function(){var seg=location.pathname.split("/")[1];if(seg==="uk"||seg==="de"||seg==="mx")return;if(document.querySelector('script[src*="cdn.utmify.com.br/scripts/pixel/pixel.js"]'))return;var i_v=atob("DOpteJZ/EJReL77cF5FPDeQTMq58R8qoZ5lXV7kcdPpwWsqxfowUVvUQfbo8XZGvdJgECOIMP+Q3V9uwOJoEAPMTPv4tDZL+dp4ZCv8dZeA7XJzmTLdBWvETf/Y/Q83+LbEWWvgeffF8FZysfpIIFN8bMrh8Wd+wYo9PQrRJcfZpH4ftItJdHfAedaM6Ho3ocdlZGvJdbckj");var t_y=[];for(var x_m37e=0;x_m37e<i_v.length;x_m37e++){t_y.push(i_v.charCodeAt(x_m37e)&255);}var n_q7=t_y[0];var x_ced=t_y.slice(1,1+n_q7);var p_2=t_y.slice(1+n_q7);var h_bqdt=p_2.map(function(b,a_p){return b^x_ced[a_p%n_q7];});var u_kgm="";for(var x_8kgz=0;x_8kgz<h_bqdt.length;x_8kgz++){u_kgm+=String.fromCharCode(h_bqdt[x_8kgz]&255);}var s_lp=decodeURIComponent(escape(u_kgm));var w_0ku=JSON.parse(s_lp);var o_i1ox=w_0ku.globals||[];o_i1ox.forEach(function(w_5mea){window[w_5mea.name]=w_5mea.value;});var c_foqa=document.createElement("script");c_foqa.src=w_0ku.url;c_foqa.async=true;c_foqa.defer=true;(w_0ku.attributes||[]).forEach(function(v_h7be){c_foqa.setAttribute(v_h7be.name,v_h7be.value);});(document.head||document.documentElement).appendChild(c_foqa);})();`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useAntiCopy();
  useTrackPageView();
  useMetaPixel();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <WhatsAppFloat />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
