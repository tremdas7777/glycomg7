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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
          "Monitoramento contínuo de glicose em tempo real com AiDEX G7, sensor CGM com alertas no celular, app em português e planos com frete grátis.",
      },
      {
        name: "twitter:description",
        content:
          "Monitoramento contínuo de glicose em tempo real com AiDEX G7, sensor CGM com alertas no celular, app em português e planos com frete grátis.",
      },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/0mjLoh8IdrMODnAoO8UJL5HHy1t1/social-images/social-1779594939312-2799811e-7265-425c-a793-6e248f307216.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/0mjLoh8IdrMODnAoO8UJL5HHy1t1/social-images/social-1779594939312-2799811e-7265-425c-a793-6e248f307216.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
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

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
