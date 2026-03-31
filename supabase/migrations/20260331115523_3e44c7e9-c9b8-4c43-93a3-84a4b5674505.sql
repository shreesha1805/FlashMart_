CREATE TABLE public.stock_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  product_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  notified boolean NOT NULL DEFAULT false
);

ALTER TABLE public.stock_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert stock notifications"
ON public.stock_notifications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
