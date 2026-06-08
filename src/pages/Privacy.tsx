import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => (
  <div className="min-h-screen gradient-surface">
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Nazad
      </Link>
      <h1 className="font-display text-3xl font-bold mb-2">Politika privatnosti</h1>
      <p className="text-sm text-muted-foreground mb-8">Poslednje ažuriranje: 8. jun 2026.</p>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-xl font-bold">1. Podaci koje prikupljamo</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Email adresa (registracija i obaveštenja vezana za nalog)</li>
            <li>Sadržaj koji unosiš za generisanje poruka (situacija, cilj, ton, kontekst)</li>
            <li>Generisane poruke (sačuvane u istoriji tvog naloga)</li>
            <li>Podaci o pretplati (Stripe customer ID, status pretplate)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">2. Kako koristimo podatke</h2>
          <p>Podaci se koriste isključivo za pružanje servisa: generisanje poruka, prikaz istorije, naplata pretplate i kontakt vezan za nalog. Ne prodajemo i ne delimo podatke trećim licima u marketinške svrhe.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">3. Procesori podataka</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><b>Supabase</b> — hosting baze i autentifikacija</li>
            <li><b>Google Gemini (Lovable AI)</b> — generisanje poruka</li>
            <li><b>Stripe</b> — obrada plaćanja (mi ne čuvamo podatke o kartici)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">4. Tvoja prava (GDPR)</h2>
          <p>Imaš pravo na uvid, izmenu i brisanje svojih podataka. Zahtev šalji na <a className="text-primary" href="mailto:getclients.studio@gmail.com">getclients.studio@gmail.com</a> i odgovorićemo u roku od 30 dana.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">5. Kolačići</h2>
          <p>Koristimo isključivo neophodne kolačiće za rad sesije (autentifikacija). Ne koristimo marketinške ili analitičke kolačiće trećih strana.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">6. Bezbednost</h2>
          <p>Komunikacija je šifrovana (HTTPS). Pristup bazi je ograničen Row-Level Security politikama tako da svaki korisnik vidi samo svoje podatke.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">7. Kontakt</h2>
          <p>Aplikaciju razvija agencija GetClients. Email: <a className="text-primary" href="mailto:getclients.studio@gmail.com">getclients.studio@gmail.com</a></p>
        </section>
      </div>
    </div>
  </div>
);

export default Privacy;
