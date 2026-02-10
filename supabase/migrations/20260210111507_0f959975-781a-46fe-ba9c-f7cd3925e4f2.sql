
-- Create payments table for tracking M-Pesa STK push payments
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  amount INTEGER NOT NULL,
  package_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  api_ref TEXT,
  lipwa_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_accounts table to track upgrades
CREATE TABLE public.user_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL UNIQUE,
  account_type TEXT NOT NULL DEFAULT 'free',
  surveys_per_day INTEGER NOT NULL DEFAULT 1,
  min_withdrawal INTEGER NOT NULL DEFAULT 0,
  balance INTEGER NOT NULL DEFAULT 0,
  surveys_completed_today INTEGER NOT NULL DEFAULT 0,
  last_survey_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;

-- Public read/insert for payments (no auth system yet, phone-based)
CREATE POLICY "Anyone can insert payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read own payments by api_ref" ON public.payments FOR SELECT USING (true);

-- Public access for user_accounts
CREATE POLICY "Anyone can read accounts" ON public.user_accounts FOR SELECT USING (true);
CREATE POLICY "Anyone can insert accounts" ON public.user_accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update accounts" ON public.user_accounts FOR UPDATE USING (true);

-- Enable realtime for payments
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_accounts_updated_at BEFORE UPDATE ON public.user_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
