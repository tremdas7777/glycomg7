DROP POLICY IF EXISTS "Anyone can read rastreios" ON public.rastreios;
DROP POLICY IF EXISTS "Authenticated can manage rastreios" ON public.rastreios;
REVOKE ALL ON public.rastreios FROM anon, authenticated;
GRANT ALL ON public.rastreios TO service_role;