# Plan: Finalizacija Poruke.app za javno lansiranje

## Trenutno stanje (već radi ✅)
- **Domen i hosting:** `poruke.app` i `www.poruke.app` aktivni
- **Email domen:** `notify.poruke.app` verifikovan (Lovable Emails)
- **Auth email template-i:** signup, recovery, magic link, invite, email-change, reauthentication — već scaffold-ovani i deploy-ovani
- **Stripe BYOK:** `STRIPE_SECRET_KEY` i `STRIPE_WEBHOOK_SECRET` postavljeni
- **Edge funkcije:** `create-checkout`, `check-subscription`, `customer-portal`, `stripe-webhook` deploy-ovane
- **5 besplatnih poruka + premium 4.99€/mesec** flow implementiran

## Šta još treba da se uradi

### 1. Email template-i — prevod i brendiranje na srpski
Trenutni auth email-ovi su na engleskom ("Confirm your email", "Reset your password"). Treba ih prevesti na srpski i ubrendirati u teal/coral stilu Poruke.app:
- `signup.tsx` → "Potvrdi nalog na Poruke.app"
- `recovery.tsx` → "Resetuj lozinku"
- `magic-link.tsx` → "Tvoj link za prijavu"
- `email-change.tsx` → "Potvrdi novu email adresu"
- Logo + boje brenda u zaglavlju

### 2. Email računa nakon plaćanja (Stripe receipts)
Dve opcije:
- **(A) Stripe automatski emailovi (PREPORUKA):** U `create-checkout` funkciji uključiti `invoice_creation` i `payment_intent_data.receipt_email`, plus uključiti "Email customers" u Stripe Dashboard → Settings → Customer emails. Stripe šalje sopstveni račun na engleskom sa PDF fakturom — najjednostavnije, bez dodatnog koda.
- **(B) Custom email kroz Lovable Emails:** Scaffold-ovati transactional email infrastrukturu i dodati template "racun-pretplata.tsx" na srpskom, koji se šalje iz `stripe-webhook` handler-a na event `invoice.payment_succeeded`. Kompletno na srpskom, sa brendingom, ali bez PDF fakture (možemo dodati link ka Stripe hosted invoice).

Preporuka: **uradi oba** — Stripe automatski račun (za zvanični PDF) + naš lepi "Hvala na pretplati" email na srpskom.

### 3. Welcome email nakon prve prijave
Nakon što korisnik potvrdi email i prvi put se uloguje, poslati "Dobrodošao na Poruke.app" email sa kratkim uputstvom (3 koraka kako da generiše prvu poruku). Trigger: u `AuthContext` nakon prvog `SIGNED_IN` eventa kada `profiles.welcome_sent = false`.

### 4. Otkazivanje pretplate — email potvrde
Kada korisnik otkaže pretplatu preko `customer-portal`, Stripe šalje `customer.subscription.deleted` webhook. Dodati u `stripe-webhook` slanje email-a "Pretplata otkazana — premium ti važi do <datum>".

### 5. Stripe production mode
Trenutni `STRIPE_SECRET_KEY` treba da bude **LIVE key** (počinje sa `sk_live_`), ne test. Isto i `STRIPE_WEBHOOK_SECRET` mora biti za live webhook endpoint.
- Provera: u Stripe Dashboard prebaciti na Live mode
- Kreirati webhook endpoint za `https://xsevtttpkslpfwqfpucr.supabase.co/functions/v1/stripe-webhook` sa eventima: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`
- Kopirati live `whsec_...` u secret

### 6. Pravne stranice
Već postoje `/privacy` i `/terms`. Treba proveriti da li sadrže:
- Tačan naziv firme / vlasnika
- Email za kontakt
- Stripe kao procesor plaćanja
- GDPR pasus (pošto je za Balkan/EU tržište)

### 7. SEO i meta tagovi za production
- `index.html` title, meta description, og:image, favicon — provera da odgovaraju brendu
- `robots.txt` da dozvoljava indeksiranje

### 8. Finalno publish
Klik na **Publish** dugme da push-uje sve frontend promene na `poruke.app`.

---

## Šta korisnik (ti) treba ručno da uradi
1. **Stripe Dashboard:**
   - Prebaci u Live mode
   - Settings → Emails → uključi "Successful payments" i "Refunds"
   - Settings → Branding → upload logo + boje (za PDF račune)
   - Developers → Webhooks → dodaj endpoint `https://xsevtttpkslpfwqfpucr.supabase.co/functions/v1/stripe-webhook`, eventi: `checkout.session.completed`, `customer.subscription.created/updated/deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
   - Kopiraj live `sk_live_...` i `whsec_...` ključeve
2. **Daj mi te dve vrednosti** da ih ažuriram u secrets (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`)
3. Posle implementacije — klikni **Publish**

---

## Šta ću ja uraditi nakon tvog odobrenja
1. Prevesti i ubrendirati svih 6 auth email template-a na srpski
2. Setup transactional email infrastrukturu (`setup_email_infra` + `scaffold_transactional_email`)
3. Napraviti 3 nova email template-a: `welcome.tsx`, `subscription-confirmed.tsx`, `subscription-cancelled.tsx`
4. Modifikovati `create-checkout` da uključi Stripe receipt emailove
5. Modifikovati `stripe-webhook` da pozove `send-transactional-email` na uspeh/otkazivanje
6. Dodati welcome email trigger u `AuthContext`
7. Proveriti i poboljšati `/privacy` i `/terms` i SEO meta
8. Deploy svih izmenjenih edge funkcija

**Reci mi:**
- (a) Da li hoćeš **oba** email-a za plaćanje (Stripe PDF račun na engleskom + naš lepi srpski email)? Ili samo jedno?
- (b) Da li si već prebacio Stripe na Live mode i imaš `sk_live_...` ključ spreman?
