# Fix Signup & Email Confirmation Flow

## Problem
After clicking "Registruj se", the app shows "Nalog je kreiran. Preusmeravamo vas..." but never redirects. Reason: email confirmation is required, so the user is not actually logged in until they click the link in the confirmation email. The toast message is misleading, and the email link currently points to `/` (landing) instead of `/app`.

## Desired flow
1. User registers → sees clear message: "Check your email to confirm your account"
2. User clicks confirmation link in email → lands on `/app` already logged in
3. User can immediately generate up to 5 free messages
4. After 5 messages → existing subscription/payment flow kicks in (already implemented)

## Changes

### 1. `src/contexts/AuthContext.tsx`
Change `signUp` redirect target from `${window.location.origin}/` to `${window.location.origin}/app` so the confirmation email link opens directly into the authenticated app.

### 2. `src/pages/Auth.tsx`
After successful `signUp` (no error), replace the misleading "Preusmeravamo vas..." toast with an accurate message:
- Title: "Proverite email"
- Description: "Poslali smo vam link za potvrdu naloga. Kliknite na link u emailu da aktivirate nalog i počnete sa korišćenjem aplikacije."
- Also switch the form back to `login` mode so the user knows what to do next.
- Clear email/password fields.

### 3. Auth email template (`supabase/functions/_shared/email-templates/signup.tsx`)
Verify the CTA button label and copy reflect the actual outcome ("Potvrdi nalog i otvori aplikaciju") and that `confirmationUrl` is used as-is (Supabase already encodes the redirect to `/app` from step 1).

No copy change needed if it already says "Potvrdi" — will adjust only if wording is generic.

## Out of scope (already works)
- 5 free messages limit (enforced via `get_user_message_count` + footer counter on `/app`)
- Stripe checkout / subscription dialog (`SubscribeDialog`, `create-checkout` function)
- `/app` route and `AuthContext` auto-login on session restore

## Why not auto-confirm signups
Auto-confirming emails would let users register with fake/other people's emails and bypass verification. Keeping email confirmation preserves security; we just make the UX clear and redirect properly.