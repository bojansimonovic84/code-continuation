import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen gradient-surface">
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Nazad
      </Link>
      <h1 className="font-display text-3xl font-bold mb-2">Uslovi korišćenja</h1>
      <p className="text-sm text-muted-foreground mb-8">Poslednje ažuriranje: 8. jun 2026.</p>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-xl font-bold">1. O servisu</h2>
          <p>Poruke.app je servis za generisanje poruka pomoću veštačke inteligencije. Korišćenjem servisa prihvataš ove uslove u celosti.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">2. Nalog</h2>
          <p>Za korišćenje napredne funkcionalnosti potrebna je registracija putem email adrese. Korisnik je odgovoran za tačnost podataka i čuvanje lozinke.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">3. Pretplata i plaćanje</h2>
          <p>Besplatni nalog uključuje 5 generisanih poruka. Premium pretplata se naplaćuje 4.99€ mesečno ili 39.99€ godišnje preko Stripe-a. Pretplata se automatski obnavlja dok je korisnik ne otkaže.</p>
          <p>Otkaz pretplate moguć je u bilo kom trenutku iz korisničkog naloga, sa važenjem do kraja tekućeg obračunskog perioda.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">4. Politika povraćaja</h2>
          <p>Sve uplate su konačne i nisu refundabilne. Korisnik može otkazati buduće obnavljanje pretplate u bilo kom trenutku.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">5. Odgovornost</h2>
          <p>Generisani sadržaj služi kao predlog. Korisnik je odgovoran za upotrebu poruka u komunikaciji sa trećim licima. Zabranjeno je generisanje sadržaja koji je nezakonit, uvredljiv, diskriminatoran ili krši prava trećih lica.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">6. Prekid korišćenja</h2>
          <p>Zadržavamo pravo da suspendujemo nalog koji krši ove uslove bez prethodne najave i bez prava na povraćaj sredstava.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">7. Izmene uslova</h2>
          <p>Uslove možemo izmeniti u bilo kom trenutku. Nastavak korišćenja servisa nakon izmena predstavlja prihvatanje izmenjenih uslova.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">8. Kontakt</h2>
          <p>Aplikaciju razvija agencija GetClients. Za sva pitanja: <a className="text-primary" href="mailto:getclients.studio@gmail.com">getclients.studio@gmail.com</a></p>
        </section>
      </div>
    </div>
  </div>
);

export default Terms;
