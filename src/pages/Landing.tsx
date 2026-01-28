import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MessageSquareText,
  Briefcase,
  Smile,
  Zap,
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  Star,
  Quote,
  ChevronRight
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartClick = () => {
    navigate("/app");
  };

  // Localized content
  const content = {
    sr: {
      heroTitle1: "Ne znaš kako da napišeš poruku?",
      heroTitle2: "Mi znamo.",
      heroSubtitle: "Poruke.AI ti pomaže da napišeš pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neprijatne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice",
      testimonial1: "Koristim je svaki dan na poslu.",
      testimonial2: "Spasila me od glupe poruke.",
      testimonial3: "Kao da mi drug piše poruke.",
      problemTitle: "Zvuči poznato?",
      problem1: "Gledaš u ekran i ne znaš kako da počneš",
      problem2: "Ne želiš da zvučiš bezobrazno",
      problem3: "Ali ni previše mekano",
      problem4: "Brišeš poruku 5 puta",
      problem5: "Odlažeš odgovor satima",
      problemSolution: "Poruke.AI to rešava umesto tebe.",
      howItWorks: "Kako radi?",
      step1Title: "Izaberi situaciju",
      step1Desc: "Posao • Stan • Kupujem/prodajem • Privatno • Muvanje • Loše vesti",
      step2Title: "Izaberi ton",
      step2Desc: "Ljubazno • Samouvereno • Smireno • Zaigrano • Nežno",
      step3Title: 'Klikni „Napiši poruku"',
      step3Desc: "Kopiraš. Pošalješ. Gotovo.",
      timeNote: "Sve traje manje od 20 sekundi.",
      whyNotGpt: "Zašto ne ChatGPT?",
      whyReason1: "Nema pisanja promptova",
      whyReason2: "Nema razmišljanja",
      whyReason3: "Nema previše formalnih odgovora",
      whyBecause: "Poruke.AI piše kao:",
      whyPoint1: "Stvarna osoba",
      whyPoint2: "Sa Balkana",
      whyPoint3: "U realnim situacijama",
      exampleTitle: "Pre / Posle",
      exampleBefore: "Ti:",
      exampleBeforeText: "Ej, jel možeš da mi javiš oko onog što smo pričali?",
      exampleAfter: "Poruke.AI:",
      exampleAfterText: "Ćao, samo da proverim da li imaš neku informaciju u vezi onoga što smo dogovarali. Hvala unapred.",
      pricingTitle: "Jednostavno",
      freePlan: "Besplatno",
      freeFeature1: "5 poruka",
      freeFeature2: "Bez kartice",
      premiumPlan: "Premium",
      premiumFeature1: "Neograničeno poruka",
      premiumFeature2: "Sve situacije i tonovi",
      premiumPrice: "399–499 RSD / mesečno",
      premiumNote: "Manje od jedne kafe nedeljno.",
      unlockPremium: "Otključaj Premium",
      forWhoTitle: "Za koga je?",
      forWho1: "Zaposlene",
      forWho2: "Freelancere",
      forWho3: "Studente",
      forWho4: "Podstanare",
      forWho5: "Ljude koji ne vole konflikte",
      forWho6: "Ljude koji žele da zvuče normalno 😄",
      finalCta1: "Prestani da razmišljaš šta da napišeš.",
      finalCta2: "Počni da šalješ poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
    },
    hr: {
      heroTitle1: "Ne znaš kako napisati poruku?",
      heroTitle2: "Mi znamo.",
      heroSubtitle: "Poruke.AI ti pomaže napisati pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neugodne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice",
      testimonial1: "Koristim je svaki dan na poslu.",
      testimonial2: "Spasila me od glupe poruke.",
      testimonial3: "Kao da mi frend piše poruke.",
      problemTitle: "Zvuči poznato?",
      problem1: "Gledaš u ekran i ne znaš kako početi",
      problem2: "Ne želiš zvučati bezobrazno",
      problem3: "Ali ni previše mekano",
      problem4: "Brišeš poruku 5 puta",
      problem5: "Odgađaš odgovor satima",
      problemSolution: "Poruke.AI to rješava umjesto tebe.",
      howItWorks: "Kako radi?",
      step1Title: "Izaberi situaciju",
      step1Desc: "Posao • Stan • Kupujem/prodajem • Privatno • Muvanje • Loše vijesti",
      step2Title: "Izaberi ton",
      step2Desc: "Ljubazno • Samouvjereno • Smireno • Zaigrano • Nježno",
      step3Title: 'Klikni „Napiši poruku"',
      step3Desc: "Kopiraš. Pošalješ. Gotovo.",
      timeNote: "Sve traje manje od 20 sekundi.",
      whyNotGpt: "Zašto ne ChatGPT?",
      whyReason1: "Nema pisanja promptova",
      whyReason2: "Nema razmišljanja",
      whyReason3: "Nema previše formalnih odgovora",
      whyBecause: "Poruke.AI piše kao:",
      whyPoint1: "Stvarna osoba",
      whyPoint2: "S Balkana",
      whyPoint3: "U realnim situacijama",
      exampleTitle: "Prije / Poslije",
      exampleBefore: "Ti:",
      exampleBeforeText: "Ej, možeš li mi javiti oko onog što smo pričali?",
      exampleAfter: "Poruke.AI:",
      exampleAfterText: "Bok, samo da provjerim imaš li kakvu informaciju u vezi onog što smo dogovarali. Hvala unaprijed.",
      pricingTitle: "Jednostavno",
      freePlan: "Besplatno",
      freeFeature1: "5 poruka",
      freeFeature2: "Bez kartice",
      premiumPlan: "Premium",
      premiumFeature1: "Neograničeno poruka",
      premiumFeature2: "Sve situacije i tonovi",
      premiumPrice: "4-5 EUR / mjesečno",
      premiumNote: "Manje od jedne kave tjedno.",
      unlockPremium: "Otključaj Premium",
      forWhoTitle: "Za koga je?",
      forWho1: "Zaposlene",
      forWho2: "Freelancere",
      forWho3: "Studente",
      forWho4: "Podstanare",
      forWho5: "Ljude koji ne vole konflikte",
      forWho6: "Ljude koji žele zvučati normalno 😄",
      finalCta1: "Prestani razmišljati što napisati.",
      finalCta2: "Počni slati poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
    },
    bs: {
      heroTitle1: "Ne znaš kako da napišeš poruku?",
      heroTitle2: "Mi znamo.",
      heroSubtitle: "Poruke.AI ti pomaže da napišeš pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neugodne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice",
      testimonial1: "Koristim je svaki dan na poslu.",
      testimonial2: "Spasila me od glupe poruke.",
      testimonial3: "Kao da mi drug piše poruke.",
      problemTitle: "Zvuči poznato?",
      problem1: "Gledaš u ekran i ne znaš kako da počneš",
      problem2: "Ne želiš da zvučiš bezobrazno",
      problem3: "Ali ni previše mekano",
      problem4: "Brišeš poruku 5 puta",
      problem5: "Odgađaš odgovor satima",
      problemSolution: "Poruke.AI to rješava umjesto tebe.",
      howItWorks: "Kako radi?",
      step1Title: "Izaberi situaciju",
      step1Desc: "Posao • Stan • Kupujem/prodajem • Privatno • Muvanje • Loše vijesti",
      step2Title: "Izaberi ton",
      step2Desc: "Ljubazno • Samopouzdano • Smireno • Zaigrano • Nježno",
      step3Title: 'Klikni „Napiši poruku"',
      step3Desc: "Kopiraš. Pošalješ. Gotovo.",
      timeNote: "Sve traje manje od 20 sekundi.",
      whyNotGpt: "Zašto ne ChatGPT?",
      whyReason1: "Nema pisanja promptova",
      whyReason2: "Nema razmišljanja",
      whyReason3: "Nema previše formalnih odgovora",
      whyBecause: "Poruke.AI piše kao:",
      whyPoint1: "Stvarna osoba",
      whyPoint2: "Sa Balkana",
      whyPoint3: "U realnim situacijama",
      exampleTitle: "Prije / Poslije",
      exampleBefore: "Ti:",
      exampleBeforeText: "Ej, možeš li da mi javiš oko onog što smo pričali?",
      exampleAfter: "Poruke.AI:",
      exampleAfterText: "Ćao, samo da provjerim imaš li kakvu informaciju u vezi onog što smo dogovarali. Hvala unaprijed.",
      pricingTitle: "Jednostavno",
      freePlan: "Besplatno",
      freeFeature1: "5 poruka",
      freeFeature2: "Bez kartice",
      premiumPlan: "Premium",
      premiumFeature1: "Neograničeno poruka",
      premiumFeature2: "Sve situacije i tonovi",
      premiumPrice: "7-9 KM / mjesečno",
      premiumNote: "Manje od jedne kafe sedmično.",
      unlockPremium: "Otključaj Premium",
      forWhoTitle: "Za koga je?",
      forWho1: "Zaposlene",
      forWho2: "Freelancere",
      forWho3: "Studente",
      forWho4: "Podstanare",
      forWho5: "Ljude koji ne vole konflikte",
      forWho6: "Ljude koji žele da zvuče normalno 😄",
      finalCta1: "Prestani da razmišljaš šta da napišeš.",
      finalCta2: "Počni da šalješ poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
    },
    me: {
      heroTitle1: "Ne znaš kako da napišeš poruku?",
      heroTitle2: "Mi znamo.",
      heroSubtitle: "Poruke.AI ti pomaže da napišeš pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neugodne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice",
      testimonial1: "Koristim je svaki dan na poslu.",
      testimonial2: "Spasila me od glupe poruke.",
      testimonial3: "Kao da mi drug piše poruke.",
      problemTitle: "Zvuči poznato?",
      problem1: "Gledaš u ekran i ne znaš kako da počneš",
      problem2: "Ne želiš da zvučiš bezobrazno",
      problem3: "Ali ni previše mekano",
      problem4: "Brišeš poruku 5 puta",
      problem5: "Odlažeš odgovor satima",
      problemSolution: "Poruke.AI to rješava umjesto tebe.",
      howItWorks: "Kako radi?",
      step1Title: "Izaberi situaciju",
      step1Desc: "Posao • Stan • Kupujem/prodajem • Privatno • Muvanje • Loše vijesti",
      step2Title: "Izaberi ton",
      step2Desc: "Ljubazno • Samopouzdano • Smireno • Zaigrano • Nježno",
      step3Title: 'Klikni „Napiši poruku"',
      step3Desc: "Kopiraš. Pošalješ. Gotovo.",
      timeNote: "Sve traje manje od 20 sekundi.",
      whyNotGpt: "Zašto ne ChatGPT?",
      whyReason1: "Nema pisanja promptova",
      whyReason2: "Nema razmišljanja",
      whyReason3: "Nema previše formalnih odgovora",
      whyBecause: "Poruke.AI piše kao:",
      whyPoint1: "Stvarna osoba",
      whyPoint2: "Sa Balkana",
      whyPoint3: "U realnim situacijama",
      exampleTitle: "Prije / Poslije",
      exampleBefore: "Ti:",
      exampleBeforeText: "Đe si, možeš li da mi javiš oko onog što smo pričali?",
      exampleAfter: "Poruke.AI:",
      exampleAfterText: "Đe si, samo da provjerim imaš li kakvu informaciju u vezi onog što smo dogovarali. Hvala unaprijed.",
      pricingTitle: "Jednostavno",
      freePlan: "Besplatno",
      freeFeature1: "5 poruka",
      freeFeature2: "Bez kartice",
      premiumPlan: "Premium",
      premiumFeature1: "Neograničeno poruka",
      premiumFeature2: "Sve situacije i tonovi",
      premiumPrice: "4-5 EUR / mjesečno",
      premiumNote: "Manje od jedne kafe neđeljno.",
      unlockPremium: "Otključaj Premium",
      forWhoTitle: "Za koga je?",
      forWho1: "Zaposlene",
      forWho2: "Freelancere",
      forWho3: "Studente",
      forWho4: "Podstanare",
      forWho5: "Ljude koji ne vole konflikte",
      forWho6: "Ljude koji žele da zvuče normalno 😄",
      finalCta1: "Prestani da razmišljaš šta da napišeš.",
      finalCta2: "Počni da šalješ poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
    },
    mk: {
      heroTitle1: "Не знаеш како да напишеш порака?",
      heroTitle2: "Ние знаеме.",
      heroSubtitle: "Poruke.AI ти помага да напишеш вистинска порака, со вистински тон, за вистинска ситуација — за 10 секунди.",
      heroContext: "За работа, приватно, стан, купопродажба, мување и непријатни ситуации.",
      tryFree: "Пробај бесплатно",
      noCard: "без картичка",
      testimonial1: "Ја користам секој ден на работа.",
      testimonial2: "Ме спаси од глупа порака.",
      testimonial3: "Како да ми пријател пишува пораки.",
      problemTitle: "Звучи познато?",
      problem1: "Гледаш во екран и не знаеш како да почнеш",
      problem2: "Не сакаш да звучиш безобразно",
      problem3: "Ама ни премногу меко",
      problem4: "Бришеш порака 5 пати",
      problem5: "Одлагаш одговор со часови",
      problemSolution: "Poruke.AI го решава тоа наместо тебе.",
      howItWorks: "Како работи?",
      step1Title: "Избери ситуација",
      step1Desc: "Работа • Стан • Купувам/продавам • Приватно • Мување • Лоши вести",
      step2Title: "Избери тон",
      step2Desc: "Љубезно • Самоуверено • Смирено • Разиграно • Нежно",
      step3Title: 'Кликни „Напиши порака"',
      step3Desc: "Копираш. Испраќаш. Готово.",
      timeNote: "Сè трае помалку од 20 секунди.",
      whyNotGpt: "Зошто не ChatGPT?",
      whyReason1: "Нема пишување промптови",
      whyReason2: "Нема размислување",
      whyReason3: "Нема премногу формални одговори",
      whyBecause: "Poruke.AI пишува како:",
      whyPoint1: "Вистинска личност",
      whyPoint2: "Од Балканот",
      whyPoint3: "Во реални ситуации",
      exampleTitle: "Пред / Потоа",
      exampleBefore: "Ти:",
      exampleBeforeText: "Еј, можеш ли да ми јавиш за она што зборувавме?",
      exampleAfter: "Poruke.AI:",
      exampleAfterText: "Здраво, само да проверам дали имаш некоја информација во врска со она што договоривме. Благодарам однапред.",
      pricingTitle: "Едноставно",
      freePlan: "Бесплатно",
      freeFeature1: "5 пораки",
      freeFeature2: "Без картичка",
      premiumPlan: "Премиум",
      premiumFeature1: "Неограничено пораки",
      premiumFeature2: "Сите ситуации и тонови",
      premiumPrice: "200-300 МКД / месечно",
      premiumNote: "Помалку од едно кафе неделно.",
      unlockPremium: "Отклучи Премиум",
      forWhoTitle: "За кого е?",
      forWho1: "Вработени",
      forWho2: "Фриленсери",
      forWho3: "Студенти",
      forWho4: "Подстанари",
      forWho5: "Луѓе кои не сакаат конфликти",
      forWho6: "Луѓе кои сакаат да звучат нормално 😄",
      finalCta1: "Престани да размислуваш што да напишеш.",
      finalCta2: "Почни да испраќаш пораки кои поминуваат.",
      tryNow: "Пробај Poruke.AI бесплатно",
    },
    sl: {
      heroTitle1: "Ne veš, kako napisati sporočilo?",
      heroTitle2: "Mi vemo.",
      heroSubtitle: "Poruke.AI ti pomaga napisati pravo sporočilo, v pravem tonu, za pravo situacijo — v 10 sekundah.",
      heroContext: "Za delo, zasebno, stanovanje, nakup/prodajo, zapeljevanje in neprijetne situacije.",
      tryFree: "Preizkusi brezplačno",
      noCard: "brez kartice",
      testimonial1: "Uporabljam jo vsak dan v službi.",
      testimonial2: "Rešila me je od neumnega sporočila.",
      testimonial3: "Kot da mi prijatelj piše sporočila.",
      problemTitle: "Zveni znano?",
      problem1: "Gledaš v zaslon in ne veš, kako začeti",
      problem2: "Nočeš zveneti nesramno",
      problem3: "Ampak tudi ne preveč mehko",
      problem4: "Brišeš sporočilo 5-krat",
      problem5: "Odlašaš z odgovorom ure",
      problemSolution: "Poruke.AI to reši namesto tebe.",
      howItWorks: "Kako deluje?",
      step1Title: "Izberi situacijo",
      step1Desc: "Delo • Stanovanje • Kupujem/prodajam • Zasebno • Zapeljevanje • Slabe novice",
      step2Title: "Izberi ton",
      step2Desc: "Vljudno • Samozavestno • Umirjeno • Igrivo • Nežno",
      step3Title: 'Klikni „Napiši sporočilo"',
      step3Desc: "Kopiraš. Pošlješ. Končano.",
      timeNote: "Vse traja manj kot 20 sekund.",
      whyNotGpt: "Zakaj ne ChatGPT?",
      whyReason1: "Ni pisanja promptov",
      whyReason2: "Ni razmišljanja",
      whyReason3: "Ni preveč formalnih odgovorov",
      whyBecause: "Poruke.AI piše kot:",
      whyPoint1: "Prava oseba",
      whyPoint2: "Z Balkana",
      whyPoint3: "V realnih situacijah",
      exampleTitle: "Pred / Po",
      exampleBefore: "Ti:",
      exampleBeforeText: "Hej, mi lahko sporočiš glede tistega, o čemer sva se pogovarjala?",
      exampleAfter: "Poruke.AI:",
      exampleAfterText: "Živijo, samo da preverim, če imaš kakšno informacijo glede tistega, kar sva se dogovorila. Hvala vnaprej.",
      pricingTitle: "Preprosto",
      freePlan: "Brezplačno",
      freeFeature1: "5 sporočil",
      freeFeature2: "Brez kartice",
      premiumPlan: "Premium",
      premiumFeature1: "Neomejeno sporočil",
      premiumFeature2: "Vse situacije in toni",
      premiumPrice: "4-5 EUR / mesečno",
      premiumNote: "Manj kot ena kava tedensko.",
      unlockPremium: "Odkleni Premium",
      forWhoTitle: "Za koga je?",
      forWho1: "Zaposlene",
      forWho2: "Freelancerje",
      forWho3: "Študente",
      forWho4: "Podnajemnike",
      forWho5: "Ljudi, ki ne marajo konfliktov",
      forWho6: "Ljudi, ki želijo zveneti normalno 😄",
      finalCta1: "Nehaj razmišljati, kaj napisati.",
      finalCta2: "Začni pošiljati sporočila, ki delujejo.",
      tryNow: "Preizkusi Poruke.AI brezplačno",
    },
  };

  const c = content[language as keyof typeof content] || content.sr;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <MessageSquareText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">Poruke.AI</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button variant="default" size="sm" onClick={handleStartClick}>
              {c.tryFree}
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24 px-4">
          <div className="absolute inset-0 gradient-surface" />
          <div className={`relative max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="text-lg">❌</span> {c.heroTitle1}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              <span className="text-primary">✅</span> {c.heroTitle2}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              {c.heroSubtitle}
            </p>
            <p className="text-base text-muted-foreground mb-8">
              👉 {c.heroContext}
            </p>
            <div className="flex flex-col items-center gap-3">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 shadow-glow" onClick={handleStartClick}>
                <Sparkles className="w-5 h-5 mr-2" />
                {c.tryFree}
              </Button>
              <span className="text-sm text-muted-foreground">({c.noCard})</span>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {[c.testimonial1, c.testimonial2, c.testimonial3].map((text, i) => (
                <div key={i} className="bg-background rounded-2xl p-6 shadow-sm border border-border">
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-foreground font-medium">„{text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              {c.problemTitle}
            </h2>
            <div className="space-y-4 mb-8">
              {[c.problem1, c.problem2, c.problem3, c.problem4, c.problem5].map((problem, i) => (
                <div key={i} className="flex items-center gap-3 justify-center text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-destructive/50" />
                  <span>{problem}</span>
                </div>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold">
              <ChevronRight className="w-5 h-5" />
              {c.problemSolution}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              {c.howItWorks}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "1", title: c.step1Title, desc: c.step1Desc, icon: Briefcase, color: "from-blue-500 to-cyan-500" },
                { num: "2", title: c.step2Title, desc: c.step2Desc, icon: Smile, color: "from-amber-500 to-orange-500" },
                { num: "3", title: c.step3Title, desc: c.step3Desc, icon: Zap, color: "from-primary to-teal-400" },
              ].map((step, i) => (
                <div key={i} className="bg-background rounded-2xl p-6 shadow-sm border border-border text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span>⏱️ {c.timeNote}</span>
            </div>
          </div>
        </section>

        {/* Why Not ChatGPT */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
              {c.whyNotGpt}
            </h2>
            <div className="bg-muted/50 rounded-2xl p-8">
              <div className="space-y-3 mb-6">
                {[c.whyReason1, c.whyReason2, c.whyReason3].map((reason, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-muted-foreground mb-3">{c.whyBecause}</p>
                <div className="space-y-2">
                  {[c.whyPoint1, c.whyPoint2, c.whyPoint3].map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-foreground font-medium">
                      <span className="text-primary">👉</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Before/After */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
              {c.exampleTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-2xl p-6 border border-border">
                <div className="text-sm font-medium text-muted-foreground mb-2">{c.exampleBefore}</div>
                <p className="text-foreground italic">"{c.exampleBeforeText}"</p>
              </div>
              <div className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
                <div className="text-sm font-medium text-primary mb-2">{c.exampleAfter}</div>
                <p className="text-foreground">"{c.exampleAfterText}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              {c.pricingTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Free Plan */}
              <div className="bg-background rounded-2xl p-8 border border-border">
                <div className="text-3xl mb-2">🆓</div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{c.freePlan}</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    {c.freeFeature1}
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    {c.freeFeature2}
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={handleStartClick}>
                  {c.tryFree}
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border-2 border-primary/30 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </span>
                </div>
                <div className="text-3xl mb-2">⭐</div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">{c.premiumPlan}</h3>
                <p className="text-primary font-semibold mb-4">{c.premiumPrice}</p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    {c.premiumFeature1}
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    {c.premiumFeature2}
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mb-4">👉 {c.premiumNote}</p>
                <Button variant="hero" className="w-full">
                  {c.unlockPremium}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* For Who */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              {c.forWhoTitle}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[c.forWho1, c.forWho2, c.forWho3, c.forWho4, c.forWho5, c.forWho6].map((who, i) => (
                <span key={i} className="bg-background px-4 py-2 rounded-full text-foreground border border-border shadow-sm">
                  {who}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 gradient-surface">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {c.finalCta1}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {c.finalCta2}
            </p>
            <Button variant="hero" size="lg" className="text-lg px-8 py-6 shadow-glow" onClick={handleStartClick}>
              <ArrowRight className="w-5 h-5 mr-2" />
              {c.tryNow}
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
              <MessageSquareText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">Poruke.AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Poruke.AI. {language === "mk" ? "Сите права задржани." : "Sva prava zadržana."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
