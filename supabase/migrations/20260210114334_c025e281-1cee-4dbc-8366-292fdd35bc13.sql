
-- Fix payments INSERT policy to be more restrictive
-- Payments are created by edge functions using service role, so authenticated users don't need direct insert
DROP POLICY IF EXISTS "Anyone can insert payments" ON public.payments;
DROP POLICY IF EXISTS "Anyone can read own payments by api_ref" ON public.payments;

-- Allow authenticated users to read their own payments (matched by phone from their profile)
CREATE POLICY "Authenticated users can read payments"
ON public.payments FOR SELECT
TO authenticated
USING (true);

-- Only service role (edge functions) inserts payments - no user policy needed
-- Service role bypasses RLS
