# Plan: Auth UX poboljšanja + Stripe + Production readiness

## 1) Auth UX — Forgot password + Show/Hide password

### Šta dodajem na `/auth` stranicu
- **Ikonica oka** (lucide `Eye` / `EyeOff`) unutar polja za lozinku — toggluje `type="password" | "text"`. Radi i na login i na register formi.
- **"Zaboravili ste lozinku?"** link ispod polja za lozinku (vidljiv samo u login modu).
- Klik otvara mali dijalog (ili novi mod forme) gde korisnik unese email → poziva:
  ```ts
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  ```
- Toast: "Poslali smo ti email sa linkom za reset lozinke."

### Nova stranica `/reset-password` (OBAVEZNA)
- Public ruta (dodaje se u `App.tsx`).
- Detektuje `type=recovery` token iz URL-a (Supabase ga automatski postavlja u sesiju).
- Forma: nova lozinka + potvrda + ista ikonica oka.
- Submit → `supabase.auth.updateUser({ password })` → redirect na `/app`.

### Lokalizacija
- Svi novi stringovi (`forgotPassword`, `resetPassword`, `newPassword`, `confirmPassword`, `passwordResetSent`, `showPassword`, `hidePassword`, itd.) dodaju se u svih 9 jezika u `LanguageContext.data.ts`.

### Email šablon za reset
- Trenutno se šalje default Lovable email (radi, ali nije brendiran).
- **Preporuka:** kasnije postaviti custom auth email template sa Poruke.app brendingom (zahteva podešen email domen). Ovo NIJE blokirajuće — može i posle.

---

## 2) Stripe — šta tačno treba da uradiš

Imaš dve realne opcije. Predlažem **Lovable Built-in Stripe Payments** jer ne moraš da kucaš API ključeve, sve ide kroz Lovable, a takse/compliance Stripe rešava umesto tebe.

### Opcija A (PREPORUČENO): Lovable Built-in Stripe Payments
**Šta ti treba da uradiš:**
1. Imaš **Lovable Pro plan** (payments zahtevaju Pro+).
2. Potvrdiš mi: "Idemo sa Stripe Built-in" → ja pokrećem `enable_stripe_payments`.
3. Otvori ti se forma u Lovable-u — popuniš:
   - Email (može tvoj Lovable email)
   - Ime / naziv biznisa
   - Zemlja sedišta (Srbija = NIJE u 36 podržanih zemalja za "full compliance"; biće samo **automatic tax** — Stripe naplaćuje porez, ti prijavljuješ)
4. Posle aktivacije, ja kreiram proizvod **"Poruke.app Premium — 4.99€/mesec"** kroz `batch_create_product`.
5. Ja implementiram:
   - `create-checkout` edge funkciju
   - `customer-portal` edge funkciju (otkazivanje pretplate)
   - `stripe-webhook` edge funkciju (sluša `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`)
   - Tabelu `subscribers` (user_id, stripe_customer_id, subscribed, subscription_end)
   - "Pretplati se" dugme na `limitReached` ekranu radi
   - `isSubscribed` se stvarno čita iz baze (sad je hardkodovano `false`)
6. Test režim radi odmah — možeš testirati sa test karticom `4242 4242 4242 4242`.
7. Za live → moraš da claim-uješ Stripe nalog i prođeš njihovu verifikaciju (KYC, bankovni račun).

**Šta MI šalješ:** samo potvrdu da ideš sa ovom opcijom. Ništa drugo. API ključeve NE TREBA.

### Opcija B: Tvoj Stripe nalog (BYOK)
Ako već imaš Stripe nalog i hoćeš da koristiš njega — šalješ mi `STRIPE_SECRET_KEY` (sk_live_... ili sk_test_...) preko sigurne forme. Ja podešavam isto kao gore. **Ne preporučujem osim ako baš insistiraš.**

---

## 3) Šta još fali za "professional, live-ready" aplikaciju

### Kritično (mora pre live)
- **Subscription logika** — trenutno `isSubscribed` u `Index.tsx` je hardkodovan na `false`. Mora da se čita iz `subscribers` tabele (rešava se sa Stripe setupom).
- **Reset password stranica** (gore opisano).
- **Coupon UI** — `coupons` tabela i `redeem_coupon` funkcija postoje u bazi, ali nema UI! Treba forma "Imaš kupon?" u Index ili Settings.
- **Cancel subscription UI** — dugme "Otkaži pretplatu" koje vodi u Stripe Customer Portal.
- **Pravne stranice** (obavezne za Stripe i GDPR):
  - `/terms` — Uslovi korišćenja
  - `/privacy` — Politika privatnosti
  - `/refund` — Refund policy (Stripe zahteva)
  - Linkovi u footeru landing-a i auth stranice.
- **Cookie/GDPR banner** — minimalni, jer ciljaš EU/Balkan.

### Važno (treba pre ozbiljnog launch-a)
- **Brendirani email templates** (signup confirmation, password reset) — preko Lovable email domena (`notify.poruke.app`).
- **Settings stranica** — promena lozinke, brisanje naloga (GDPR pravo na zaborav), upravljanje pretplatom.
- **SEO meta tagovi** na `/` (title, description, og:image, JSON-LD) — sad je generično.
- **Favicon i og:image** sa Poruke.app brendingom.
- **404 stranica** lokalizovana (sad je verovatno engleska).
- **Rate limiting** na `generate-message` edge funkciji (sad samo broji 5 — neko može da spam-uje pre nego stigne limit).
- **Analytika** — Plausible ili PostHog, da znaš ko se registruje i konvertuje.

### Lepo da ima
- Onboarding tutorial na prvi ulaz.
- "Share" dugme posle generisane poruke (već postoji social sharing).
- Email notifikacije pred isticanje pretplate.
- Affiliate/referral sistem ("pozovi prijatelja, dobij 1 mesec gratis").

---

## Predlog redosleda izvršenja (kad odobriš plan)

**Faza 1 — Auth (odmah, brzo):**
1. Show/hide password + forgot password + `/reset-password` stranica + prevodi.

**Faza 2 — Stripe (čim potvrdiš opciju A ili B):**
2. Enable Stripe → kreiranje proizvoda → checkout/portal/webhook → subscribers tabela → integracija `isSubscribed` → coupon UI → cancel dugme.

**Faza 3 — Production polish:**
3. Pravne stranice (Terms, Privacy, Refund) — ja generišem nacrt na srpskom, ti pregledaš.
4. SEO meta + og:image + favicon.
5. Settings stranica (promena lozinke, brisanje naloga).
6. Brendirani auth emaili (opciono, traži email domen).

---

## Pitanja za tebe pre kreće implementacija

1. **Stripe opcija A ili B?** (preporučujem A — Lovable Built-in)
2. **Imaš Lovable Pro plan?** (potrebno za payments)
3. **Cena samo 4.99€/mesec, ili dodajemo i godišnju (npr. 39.99€/god = ~33% popusta)?**
4. **Trial period?** (npr. 7 dana besplatno premium nakon registracije, pa onda naplata)
5. **Refund policy:** standardno "14 dana money-back" ili "no refunds"?
6. **Za pravne stranice — koja je pravna firma/lice koje izdaje aplikaciju?** (ime, adresa, PIB — potrebno za Terms/Privacy)
