
-- 1. Replace get_user_message_count: no params, uses auth.uid(), SECURITY INVOKER
DROP FUNCTION IF EXISTS public.get_user_message_count(uuid);

CREATE OR REPLACE FUNCTION public.get_user_message_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.messages
  WHERE user_id = auth.uid();
$$;

REVOKE EXECUTE ON FUNCTION public.get_user_message_count() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_user_message_count() TO authenticated;

-- 2. Coupon redemption tracking
CREATE TABLE IF NOT EXISTS public.coupon_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  redeemed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (coupon_id, user_id)
);

ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own redemptions"
ON public.coupon_redemptions
FOR SELECT
USING (auth.uid() = user_id);

-- 3. Rewrite redeem_coupon with per-user tracking
CREATE OR REPLACE FUNCTION public.redeem_coupon(coupon_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_coupon_id uuid;
  v_max_uses integer;
  v_current_uses integer;
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT id, max_uses, current_uses INTO v_coupon_id, v_max_uses, v_current_uses
  FROM public.coupons
  WHERE code = coupon_code;

  IF v_coupon_id IS NULL THEN
    RAISE EXCEPTION 'Invalid coupon code';
  END IF;

  IF v_max_uses IS NOT NULL AND v_current_uses >= v_max_uses THEN
    RAISE EXCEPTION 'Coupon usage limit reached';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.coupon_redemptions
    WHERE coupon_id = v_coupon_id AND user_id = v_uid
  ) THEN
    RAISE EXCEPTION 'Coupon already redeemed';
  END IF;

  INSERT INTO public.coupon_redemptions (coupon_id, user_id)
  VALUES (v_coupon_id, v_uid);

  UPDATE public.profiles
  SET is_lifetime_premium = true
  WHERE user_id = v_uid;

  UPDATE public.coupons
  SET current_uses = current_uses + 1
  WHERE id = v_coupon_id;

  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.redeem_coupon(text) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.redeem_coupon(text) TO authenticated;
