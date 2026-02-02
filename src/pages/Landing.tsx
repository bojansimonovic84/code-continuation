import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
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
  ChevronRight,
  Heart,
  Home,
  ShoppingCart,
  AlertTriangle,
  Users,
  GraduationCap,
  Laptop,
  Baby,
  Building2,
  MessageCircle,
  Send,
  ThumbsUp,
  User,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartClick = () => {
    // If user is already logged in, go to app
    if (user) {
      navigate("/app");
    } else {
      // If not logged in, go to auth page with registration view
      navigate("/auth?mode=register");
    }
  };

  // Localized content - expanded with testimonials, pricing, target audience
  const content = {
    sr: {
      heroTitle1: "Ne znaš kako da napišeš poruku?",
      heroTitle2: "Mi znamo. 💬",
      heroSubtitle: "Poruke.AI ti pomaže da napišeš pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neprijatne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice • 5 poruka gratis",

      // Enhanced testimonials with names
      testimonials: [
        {
          text: "Koristim je svaki dan za poslovne mejlove. Uštedela mi je sate!",
          name: "Marko",
          role: "IT Manager",
          avatar: "👨‍💼",
        },
        {
          text: "Spasila me od glupe poruke bivšem. Preporučujem svima!",
          name: "Ana",
          role: "Studentkinja",
          avatar: "👩‍🎓",
        },
        {
          text: "Kao da mi najbolji drug piše poruke. Prirodno i opušteno.",
          name: "Stefan",
          role: "Freelancer",
          avatar: "🧑‍💻",
        },
        {
          text: "Konačno znam kako da odbijem šefa bez da zvučim bezobrazno.",
          name: "Jelena",
          role: "HR Menadžer",
          avatar: "👩‍💼",
        },
        { text: "Za muvanje je savršena! Devojke konačno odgovaraju 😄", name: "Luka", role: "Student", avatar: "🎓" },
        { text: "Pomogla mi da sredim problem sa stanodavcem. 10/10", name: "Milica", role: "Podstanar", avatar: "🏠" },
      ],

      problemTitle: "Zvuči poznato?",
      problems: [
        "Gledaš u ekran i ne znaš kako da počneš",
        "Ne želiš da zvučiš bezobrazno ili previše mekano",
        "Brišeš poruku 5 puta pre nego što je pošalješ",
        "Odlažeš odgovor satima jer ne znaš šta da napišeš",
        "Strah te da ne ispadeš čudno ili napadno",
      ],
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
      whyReasons: ["Nema pisanja promptova", "Nema razmišljanja", "Nema previše formalnih odgovora"],
      whyBecause: "Poruke.AI piše kao:",
      whyPoints: ["Stvarna osoba", "Sa Balkana", "U realnim situacijama"],

      // Before/After with chat bubbles
      exampleTitle: "Pre / Posle",
      exampleScenario: "Situacija: Kolega ti duguje pare već mesec dana",
      exampleBefore: "Ti pokušavaš da napišeš:",
      exampleBeforeTexts: [
        "Ej, jel možeš da mi javiš oko onog što smo pričali?",
        "Hej, znam da si zauzet ali...",
        "[obrisano]",
        "Možda mogu da sačekam još malo...",
      ],
      exampleAfter: "Poruke.AI generiše:",
      exampleAfterText:
        "Ćao! Samo da proverim - da li imaš priliku da mi vratiš onih 3000 koje sam ti pozajmio prošlog meseca? Razumem ako ti nije zgodan trenutak, javi mi samo kad možeš. Hvala! 🙂",

      // Pricing - 4.99 EUR
      pricingTitle: "Jednostavna cena",
      freePlan: "Besplatno",
      freeFeatures: ["5 poruka", "Sve situacije", "Svi tonovi", "Bez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neograničeno poruka", "Sve situacije i tonovi", "Istorija poruka", "Prioritetna podrška"],
      premiumPrice: "4.99€",
      premiumPeriod: "/mesečno",
      premiumNote: "Manje od jedne kafe nedeljno. Otkaz u bilo kom trenutku.",
      premiumSave: "Uštedi 40%",
      yearlyPrice: "35.99€/godišnje",
      unlockPremium: "Otključaj Premium",

      // Expanded target audience
      forWhoTitle: "Za koga je Poruke.AI?",
      forWhoCategories: [
        { emoji: "👨‍💼", label: "Zaposleni", desc: "Za mejlove šefu, kolegama, klijentima" },
        { emoji: "🧑‍💻", label: "Freelanceri", desc: "Za profesionalnu komunikaciju sa klijentima" },
        { emoji: "🎓", label: "Studenti", desc: "Za profesore, kolege, praksu" },
        { emoji: "🏠", label: "Podstanari", desc: "Za stanodavce i komšije" },
        { emoji: "💕", label: "Tinejdžeri", desc: "Za muvanje i prijatelje" },
        { emoji: "👨‍👩‍👧", label: "Roditelji", desc: "Za školu, vrtić, druge roditelje" },
        { emoji: "🛍️", label: "Kupci/Prodavci", desc: "Za oglase i pregovore" },
        { emoji: "😰", label: "Anksiozni", desc: "Za sve koji mrze konflikte" },
      ],

      // Situations showcase
      situationsTitle: "Situacije koje pokrivamo",

      finalCta1: "Prestani da razmišljaš šta da napišeš.",
      finalCta2: "Počni da šalješ poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
      startNow: "Počni odmah",
    },
    hr: {
      heroTitle1: "Ne znaš kako napisati poruku?",
      heroTitle2: "Mi znamo. 💬",
      heroSubtitle: "Poruke.AI ti pomaže napisati pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neugodne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice • 5 poruka gratis",
      testimonials: [
        {
          text: "Koristim je svaki dan za poslovne mailove. Uštedjela mi je sate!",
          name: "Marko",
          role: "IT Manager",
          avatar: "👨‍💼",
        },
        {
          text: "Spasila me od glupe poruke bivšem. Preporučujem svima!",
          name: "Ana",
          role: "Studentica",
          avatar: "👩‍🎓",
        },
        {
          text: "Kao da mi najbolji frend piše poruke. Prirodno i opušteno.",
          name: "Stefan",
          role: "Freelancer",
          avatar: "🧑‍💻",
        },
        {
          text: "Konačno znam kako odbiti šefa bez da zvučim bezobrazno.",
          name: "Jelena",
          role: "HR Menadžer",
          avatar: "👩‍💼",
        },
        { text: "Za muvanje je savršena! Cure konačno odgovaraju 😄", name: "Luka", role: "Student", avatar: "🎓" },
        { text: "Pomogla mi srediti problem sa stanodavcem. 10/10", name: "Milica", role: "Podstanar", avatar: "🏠" },
      ],
      problemTitle: "Zvuči poznato?",
      problems: [
        "Gledaš u ekran i ne znaš kako početi",
        "Ne želiš zvučati bezobrazno ili previše mekano",
        "Brišeš poruku 5 puta prije nego je pošalješ",
        "Odgađaš odgovor satima jer ne znaš što napisati",
        "Strah te da ne ispadneš čudno ili napadno",
      ],
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
      whyReasons: ["Nema pisanja promptova", "Nema razmišljanja", "Nema previše formalnih odgovora"],
      whyBecause: "Poruke.AI piše kao:",
      whyPoints: ["Stvarna osoba", "S Balkana", "U realnim situacijama"],
      exampleTitle: "Prije / Poslije",
      exampleScenario: "Situacija: Kolega ti duguje novce već mjesec dana",
      exampleBefore: "Ti pokušavaš napisati:",
      exampleBeforeTexts: [
        "Ej, možeš li mi javiti oko onog što smo pričali?",
        "Hej, znam da si zauzet ali...",
        "[obrisano]",
        "Možda mogu pričekati još malo...",
      ],
      exampleAfter: "Poruke.AI generira:",
      exampleAfterText:
        "Bok! Samo da provjerim - imaš li priliku vratiti mi onih 400 kuna koje sam ti posudio prošli mjesec? Razumijem ako ti nije zgodan trenutak, javi mi samo kad možeš. Hvala! 🙂",
      pricingTitle: "Jednostavna cijena",
      freePlan: "Besplatno",
      freeFeatures: ["5 poruka", "Sve situacije", "Svi tonovi", "Bez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neograničeno poruka", "Sve situacije i tonovi", "Povijest poruka", "Prioritetna podrška"],
      premiumPrice: "4.99€",
      premiumPeriod: "/mjesečno",
      premiumNote: "Manje od jedne kave tjedno. Otkaz u bilo kojem trenutku.",
      premiumSave: "Uštedi 40%",
      yearlyPrice: "35.99€/godišnje",
      unlockPremium: "Otključaj Premium",
      forWhoTitle: "Za koga je Poruke.AI?",
      forWhoCategories: [
        { emoji: "👨‍💼", label: "Zaposleni", desc: "Za mailove šefu, kolegama, klijentima" },
        { emoji: "🧑‍💻", label: "Freelanceri", desc: "Za profesionalnu komunikaciju s klijentima" },
        { emoji: "🎓", label: "Studenti", desc: "Za profesore, kolege, praksu" },
        { emoji: "🏠", label: "Podstanari", desc: "Za stanodavce i susjede" },
        { emoji: "💕", label: "Tinejdžeri", desc: "Za muvanje i prijatelje" },
        { emoji: "👨‍👩‍👧", label: "Roditelji", desc: "Za školu, vrtić, druge roditelje" },
        { emoji: "🛍️", label: "Kupci/Prodavači", desc: "Za oglase i pregovore" },
        { emoji: "😰", label: "Anksiozni", desc: "Za sve koji mrze konflikte" },
      ],
      situationsTitle: "Situacije koje pokrivamo",
      finalCta1: "Prestani razmišljati što napisati.",
      finalCta2: "Počni slati poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
      startNow: "Počni odmah",
    },
    bs: {
      heroTitle1: "Ne znaš kako da napišeš poruku?",
      heroTitle2: "Mi znamo. 💬",
      heroSubtitle: "Poruke.AI ti pomaže da napišeš pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neugodne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice • 5 poruka gratis",
      testimonials: [
        {
          text: "Koristim je svaki dan za poslovne mailove. Uštedjela mi je sate!",
          name: "Marko",
          role: "IT Manager",
          avatar: "👨‍💼",
        },
        {
          text: "Spasila me od glupe poruke bivšem. Preporučujem svima!",
          name: "Ana",
          role: "Studentica",
          avatar: "👩‍🎓",
        },
        {
          text: "Kao da mi najbolji drug piše poruke. Prirodno i opušteno.",
          name: "Stefan",
          role: "Freelancer",
          avatar: "🧑‍💻",
        },
        {
          text: "Konačno znam kako odbiti šefa bez da zvučim bezobrazno.",
          name: "Jelena",
          role: "HR Menadžer",
          avatar: "👩‍💼",
        },
        { text: "Za muvanje je savršena! Cure konačno odgovaraju 😄", name: "Luka", role: "Student", avatar: "🎓" },
        { text: "Pomogla mi srediti problem sa stanodavcem. 10/10", name: "Milica", role: "Podstanar", avatar: "🏠" },
      ],
      problemTitle: "Zvuči poznato?",
      problems: [
        "Gledaš u ekran i ne znaš kako da počneš",
        "Ne želiš da zvučiš bezobrazno ili previše mekano",
        "Brišeš poruku 5 puta prije nego je pošalješ",
        "Odgađaš odgovor satima jer ne znaš šta da napišeš",
        "Strah te da ne ispadneš čudno ili napadno",
      ],
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
      whyReasons: ["Nema pisanja promptova", "Nema razmišljanja", "Nema previše formalnih odgovora"],
      whyBecause: "Poruke.AI piše kao:",
      whyPoints: ["Stvarna osoba", "Sa Balkana", "U realnim situacijama"],
      exampleTitle: "Prije / Poslije",
      exampleScenario: "Situacija: Kolega ti duguje pare već mjesec dana",
      exampleBefore: "Ti pokušavaš napisati:",
      exampleBeforeTexts: [
        "Ej, možeš li da mi javiš oko onog što smo pričali?",
        "Hej, znam da si zauzet ali...",
        "[obrisano]",
        "Možda mogu sačekati još malo...",
      ],
      exampleAfter: "Poruke.AI generiše:",
      exampleAfterText:
        "Ćao! Samo da provjerim - imaš li priliku da mi vratiš onih 50 KM koje sam ti pozajmio prošlog mjeseca? Razumijem ako ti nije zgodan trenutak, javi mi samo kad možeš. Hvala! 🙂",
      pricingTitle: "Jednostavna cijena",
      freePlan: "Besplatno",
      freeFeatures: ["5 poruka", "Sve situacije", "Svi tonovi", "Bez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neograničeno poruka", "Sve situacije i tonovi", "Historija poruka", "Prioritetna podrška"],
      premiumPrice: "9.99 KM",
      premiumPeriod: "/mjesečno",
      premiumNote: "Manje od jedne kafe sedmično. Otkaz u bilo kom trenutku.",
      premiumSave: "Uštedi 40%",
      yearlyPrice: "69.99 KM/godišnje",
      unlockPremium: "Otključaj Premium",
      forWhoTitle: "Za koga je Poruke.AI?",
      forWhoCategories: [
        { emoji: "👨‍💼", label: "Zaposleni", desc: "Za mailove šefu, kolegama, klijentima" },
        { emoji: "🧑‍💻", label: "Freelanceri", desc: "Za profesionalnu komunikaciju s klijentima" },
        { emoji: "🎓", label: "Studenti", desc: "Za profesore, kolege, praksu" },
        { emoji: "🏠", label: "Podstanari", desc: "Za stanodavce i komšije" },
        { emoji: "💕", label: "Tinejdžeri", desc: "Za muvanje i prijatelje" },
        { emoji: "👨‍👩‍👧", label: "Roditelji", desc: "Za školu, vrtić, druge roditelje" },
        { emoji: "🛍️", label: "Kupci/Prodavači", desc: "Za oglase i pregovore" },
        { emoji: "😰", label: "Anksiozni", desc: "Za sve koji mrze konflikte" },
      ],
      situationsTitle: "Situacije koje pokrivamo",
      finalCta1: "Prestani da razmišljaš šta da napišeš.",
      finalCta2: "Počni da šalješ poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
      startNow: "Počni odmah",
    },
    me: {
      heroTitle1: "Ne znaš kako da napišeš poruku?",
      heroTitle2: "Mi znamo. 💬",
      heroSubtitle: "Poruke.AI ti pomaže da napišeš pravu poruku, u pravom tonu, za pravu situaciju — za 10 sekundi.",
      heroContext: "Za posao, privatno, stan, kupoprodaju, muvanje i neugodne situacije.",
      tryFree: "Isprobaj besplatno",
      noCard: "bez kartice • 5 poruka gratis",
      testimonials: [
        {
          text: "Koristim je svaki dan za poslovne mejlove. Ušteđela mi je sate!",
          name: "Marko",
          role: "IT Manager",
          avatar: "👨‍💼",
        },
        {
          text: "Spasila me od glupe poruke bivšem. Preporučujem svima!",
          name: "Ana",
          role: "Studentkinja",
          avatar: "👩‍🎓",
        },
        {
          text: "Kao da mi najbolji drug piše poruke. Prirodno i opušteno.",
          name: "Stefan",
          role: "Freelancer",
          avatar: "🧑‍💻",
        },
        {
          text: "Konačno znam kako odbiti šefa bez da zvučim bezobrazno.",
          name: "Jelena",
          role: "HR Menadžer",
          avatar: "👩‍💼",
        },
        { text: "Za muvanje je savršena! Đevojke konačno odgovaraju 😄", name: "Luka", role: "Student", avatar: "🎓" },
        { text: "Pomogla mi srediti problem sa stanodavcem. 10/10", name: "Milica", role: "Podstanar", avatar: "🏠" },
      ],
      problemTitle: "Zvuči poznato?",
      problems: [
        "Gledaš u ekran i ne znaš kako da počneš",
        "Ne želiš da zvučiš bezobrazno ili previše mekano",
        "Brišeš poruku 5 puta prije nego je pošalješ",
        "Odlažeš odgovor satima jer ne znaš šta da napišeš",
        "Strah te da ne ispadneš čudno ili napadno",
      ],
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
      whyReasons: ["Nema pisanja promptova", "Nema razmišljanja", "Nema previše formalnih odgovora"],
      whyBecause: "Poruke.AI piše kao:",
      whyPoints: ["Stvarna osoba", "Sa Balkana", "U realnim situacijama"],
      exampleTitle: "Prije / Poslije",
      exampleScenario: "Situacija: Kolega ti duguje pare već mjesec dana",
      exampleBefore: "Ti pokušavaš napisati:",
      exampleBeforeTexts: [
        "Đe si, možeš li da mi javiš oko onog što smo pričali?",
        "E, znam da si zauzet ali...",
        "[obrisano]",
        "Možda mogu sačekati još malo...",
      ],
      exampleAfter: "Poruke.AI generiše:",
      exampleAfterText:
        "Đe si! Samo da provjerim - imaš li priliku da mi vratiš onih 50€ koje sam ti pozajmio prošlog mjeseca? Razumijem ako ti nije zgodan trenutak, javi mi samo kad možeš. Hvala! 🙂",
      pricingTitle: "Jednostavna cijena",
      freePlan: "Besplatno",
      freeFeatures: ["5 poruka", "Sve situacije", "Svi tonovi", "Bez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neograničeno poruka", "Sve situacije i tonovi", "Istorija poruka", "Prioritetna podrška"],
      premiumPrice: "4.99€",
      premiumPeriod: "/mjesečno",
      premiumNote: "Za cenu pola pice — rešenja za muvanje, biznis i chat. 🍕💬 Otkaz u bilo kom trenutku.",
      premiumSave: "Uštedi 40%",
      yearlyPrice: "35.99€/godišnje",
      unlockPremium: "Otključaj Premium",
      forWhoTitle: "Za koga je Poruke.AI?",
      forWhoCategories: [
        { emoji: "👨‍💼", label: "Zaposleni", desc: "Za mejlove šefu, kolegama, klijentima" },
        { emoji: "🧑‍💻", label: "Freelanceri", desc: "Za profesionalnu komunikaciju s klijentima" },
        { emoji: "🎓", label: "Studenti", desc: "Za profesore, kolege, praksu" },
        { emoji: "🏠", label: "Podstanari", desc: "Za stanodavce i komšije" },
        { emoji: "💕", label: "Tinejdžeri", desc: "Za muvanje i prijatelje" },
        { emoji: "👨‍👩‍👧", label: "Roditelji", desc: "Za školu, vrtić, druge roditelje" },
        { emoji: "🛍️", label: "Kupci/Prodavci", desc: "Za oglase i pregovore" },
        { emoji: "😰", label: "Anksiozni", desc: "Za sve koji mrze konflikte" },
      ],
      situationsTitle: "Situacije koje pokrivamo",
      finalCta1: "Prestani da razmišljaš šta da napišeš.",
      finalCta2: "Počni da šalješ poruke koje prolaze.",
      tryNow: "Isprobaj Poruke.AI besplatno",
      startNow: "Počni odmah",
    },
    mk: {
      heroTitle1: "Не знаеш како да напишеш порака?",
      heroTitle2: "Ние знаеме. 💬",
      heroSubtitle:
        "Poruke.AI ти помага да напишеш вистинска порака, со вистински тон, за вистинска ситуација — за 10 секунди.",
      heroContext: "За работа, приватно, стан, купопродажба, мување и непријатни ситуации.",
      tryFree: "Пробај бесплатно",
      noCard: "без картичка • 5 пораки гратис",
      testimonials: [
        {
          text: "Ја користам секој ден за деловни мејлови. Ми заштеди саати!",
          name: "Марко",
          role: "IT Менаџер",
          avatar: "👨‍💼",
        },
        {
          text: "Ме спаси од глупа порака на бившиот. Препорачувам на сите!",
          name: "Ана",
          role: "Студентка",
          avatar: "👩‍🎓",
        },
        {
          text: "Како да ми најдобар пријател пишува пораки. Природно и опуштено.",
          name: "Стефан",
          role: "Фриленсер",
          avatar: "🧑‍💻",
        },
        {
          text: "Конечно знам како да одбијам шеф без да звучам безобразно.",
          name: "Јелена",
          role: "HR Менаџер",
          avatar: "👩‍💼",
        },
        { text: "За мување е совршена! Девојките конечно одговараат 😄", name: "Лука", role: "Студент", avatar: "🎓" },
        {
          text: "Ми помогна да средам проблем со станодавецот. 10/10",
          name: "Милица",
          role: "Подстанар",
          avatar: "🏠",
        },
      ],
      problemTitle: "Звучи познато?",
      problems: [
        "Гледаш во екран и не знаеш како да почнеш",
        "Не сакаш да звучиш безобразно или премногу меко",
        "Бришеш порака 5 пати пред да ја испратиш",
        "Одлагаш одговор со часови бидејќи не знаеш што да напишеш",
        "Страв те да не испаднеш чудно или напорно",
      ],
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
      whyReasons: ["Нема пишување промптови", "Нема размислување", "Нема премногу формални одговори"],
      whyBecause: "Poruke.AI пишува како:",
      whyPoints: ["Вистинска личност", "Од Балканот", "Во реални ситуации"],
      exampleTitle: "Пред / Потоа",
      exampleScenario: "Ситуација: Колега ти должи пари веќе месец дена",
      exampleBefore: "Ти се обидуваш да напишеш:",
      exampleBeforeTexts: [
        "Еј, можеш ли да ми јавиш за она што зборувавме?",
        "Еј, знам дека си зафатен ама...",
        "[избришано]",
        "Можеби можам да почекам уште малку...",
      ],
      exampleAfter: "Poruke.AI генерира:",
      exampleAfterText:
        "Здраво! Само да проверам - имаш ли можност да ми ги вратиш оние 3000 денари што ти ги позајмив минатиот месец? Разбирам ако не ти е згодно сега, јави ми само кога можеш. Благодарам! 🙂",
      pricingTitle: "Едноставна цена",
      freePlan: "Бесплатно",
      freeFeatures: ["5 пораки", "Сите ситуации", "Сите тонови", "Без картичка"],
      premiumPlan: "Премиум",
      premiumFeatures: ["Неограничено пораки", "Сите ситуации и тонови", "Историја на пораки", "Приоритетна поддршка"],
      premiumPrice: "299 ден",
      premiumPeriod: "/месечно",
      premiumNote: "Помалку од едно кафе неделно. Откажи во секој момент.",
      premiumSave: "Заштеди 40%",
      yearlyPrice: "2199 ден/годишно",
      unlockPremium: "Отклучи Премиум",
      forWhoTitle: "За кого е Poruke.AI?",
      forWhoCategories: [
        { emoji: "👨‍💼", label: "Вработени", desc: "За мејлови до шеф, колеги, клиенти" },
        { emoji: "🧑‍💻", label: "Фриленсери", desc: "За професионална комуникација со клиенти" },
        { emoji: "🎓", label: "Студенти", desc: "За професори, колеги, пракса" },
        { emoji: "🏠", label: "Подстанари", desc: "За станодавци и соседи" },
        { emoji: "💕", label: "Тинејџери", desc: "За мување и пријатели" },
        { emoji: "👨‍👩‍👧", label: "Родители", desc: "За училиште, градинка, други родители" },
        { emoji: "🛍️", label: "Купувачи/Продавачи", desc: "За огласи и преговори" },
        { emoji: "😰", label: "Анксиозни", desc: "За сите што мразат конфликти" },
      ],
      situationsTitle: "Ситуации кои ги покриваме",
      finalCta1: "Престани да размислуваш што да напишеш.",
      finalCta2: "Почни да испраќаш пораки кои поминуваат.",
      tryNow: "Пробај Poruke.AI бесплатно",
      startNow: "Почни сега",
    },
    sl: {
      heroTitle1: "Ne veš, kako napisati sporočilo?",
      heroTitle2: "Mi vemo. 💬",
      heroSubtitle: "Poruke.AI ti pomaga napisati pravo sporočilo, v pravem tonu, za pravo situacijo — v 10 sekundah.",
      heroContext: "Za delo, zasebno, stanovanje, nakup/prodajo, zapeljevanje in neprijetne situacije.",
      tryFree: "Preizkusi brezplačno",
      noCard: "brez kartice • 5 sporočil gratis",
      testimonials: [
        {
          text: "Uporabljam jo vsak dan za poslovne maile. Prihranila mi je ure!",
          name: "Marko",
          role: "IT Manager",
          avatar: "👨‍💼",
        },
        {
          text: "Rešila me je od neumnega sporočila bivšemu. Priporočam vsem!",
          name: "Ana",
          role: "Študentka",
          avatar: "👩‍🎓",
        },
        {
          text: "Kot da mi najboljši prijatelj piše sporočila. Naravno in sproščeno.",
          name: "Stefan",
          role: "Freelancer",
          avatar: "🧑‍💻",
        },
        {
          text: "Končno vem, kako zavrniti šefa brez da zvenim nesramno.",
          name: "Jelena",
          role: "HR Menedžer",
          avatar: "👩‍💼",
        },
        {
          text: "Za zapeljevanje je popolna! Punce končno odgovarjajo 😄",
          name: "Luka",
          role: "Študent",
          avatar: "🎓",
        },
        {
          text: "Pomagala mi je urediti problem z najemodajalcem. 10/10",
          name: "Milica",
          role: "Najemnik",
          avatar: "🏠",
        },
      ],
      problemTitle: "Zveni znano?",
      problems: [
        "Gledaš v zaslon in ne veš, kako začeti",
        "Nočeš zveneti nesramno ali preveč mehko",
        "Brišeš sporočilo 5-krat preden ga pošlješ",
        "Odlašaš z odgovorom ure, ker ne veš kaj napisati",
        "Strah te je, da ne boš izpadel čudno ali vsiljivo",
      ],
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
      whyReasons: ["Ni pisanja promptov", "Ni razmišljanja", "Ni preveč formalnih odgovorov"],
      whyBecause: "Poruke.AI piše kot:",
      whyPoints: ["Prava oseba", "Z Balkana", "V realnih situacijah"],
      exampleTitle: "Pred / Po",
      exampleScenario: "Situacija: Kolega ti dolguje denar že mesec dni",
      exampleBefore: "Ti poskušaš napisati:",
      exampleBeforeTexts: [
        "Hej, mi lahko sporočiš glede tistega, o čemer sva se pogovarjala?",
        "Hej, vem da si zaseden ampak...",
        "[izbrisano]",
        "Morda lahko počakam še malo...",
      ],
      exampleAfter: "Poruke.AI generira:",
      exampleAfterText:
        "Živijo! Samo da preverim - imaš mogoče priložnost, da mi vrneš tistih 50€, ki sem ti jih posodil prejšnji mesec? Razumem, če ti zdaj ni primerno, samo javi mi ko boš lahko. Hvala! 🙂",
      pricingTitle: "Preprosta cena",
      freePlan: "Brezplačno",
      freeFeatures: ["5 sporočil", "Vse situacije", "Vsi toni", "Brez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neomejeno sporočil", "Vse situacije in toni", "Zgodovina sporočil", "Prioritetna podpora"],
      premiumPrice: "4.99€",
      premiumPeriod: "/mesečno",
      premiumNote: "Manj kot ena kava tedensko. Prekini kadarkoli.",
      premiumSave: "Prihrani 40%",
      yearlyPrice: "35.99€/letno",
      unlockPremium: "Odkleni Premium",
      forWhoTitle: "Za koga je Poruke.AI?",
      forWhoCategories: [
        { emoji: "👨‍💼", label: "Zaposleni", desc: "Za maile šefu, kolegom, strankam" },
        { emoji: "🧑‍💻", label: "Freelancerji", desc: "Za profesionalno komunikacijo s strankami" },
        { emoji: "🎓", label: "Študenti", desc: "Za profesorje, kolege, prakso" },
        { emoji: "🏠", label: "Najemniki", desc: "Za najemodajalce in sosede" },
        { emoji: "💕", label: "Najstniki", desc: "Za zapeljevanje in prijatelje" },
        { emoji: "👨‍👩‍👧", label: "Starši", desc: "Za šolo, vrtec, druge starše" },
        { emoji: "🛍️", label: "Kupci/Prodajalci", desc: "Za oglase in pogajanja" },
        { emoji: "😰", label: "Anksiozni", desc: "Za vse, ki sovražijo konflikte" },
      ],
      situationsTitle: "Situacije, ki jih pokrivamo",
      finalCta1: "Nehaj razmišljati, kaj napisati.",
      finalCta2: "Začni pošiljati sporočila, ki delujejo.",
      tryNow: "Preizkusi Poruke.AI brezplačno",
      startNow: "Začni zdaj",
    },
  };

  const c = content[language as keyof typeof content] || content.sr;

  // Situation cards with colorful icons and animations
  const situations = [
    {
      icon: Heart,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      label: language === "mk" ? "Мување и љубов" : "Muvanje i ljubav",
      desc: "💕",
    },
    {
      icon: Briefcase,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      label: language === "mk" ? "Работа и бизнис" : "Posao i biznis",
      desc: "💼",
    },
    {
      icon: Home,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      label: language === "mk" ? "Стан и комшии" : "Stan i komšije",
      desc: "🏠",
    },
    {
      icon: ShoppingCart,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      label: language === "mk" ? "Купопродажба" : "Kupoprodaja",
      desc: "🛍️",
    },
    {
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      label: language === "mk" ? "Приватно и пријатели" : "Privatno i prijatelji",
      desc: "👥",
    },
    {
      icon: AlertTriangle,
      color: "text-slate-500",
      bg: "bg-slate-500/10",
      label: language === "mk" ? "Лоши вести" : "Loše vesti",
      desc: "😔",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MessageSquareText className="w-5 h-5 text-primary-foreground" />
            </motion.div>
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
        {/* Hero Section - Enhanced with animation */}
        <section className="relative overflow-hidden py-16 md:py-24 px-4">
          <div className="absolute inset-0 gradient-surface" />
          {/* Floating emojis background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {["💬", "✨", "❤️", "👍", "🎯", "💡"].map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-4xl opacity-10"
                initial={{ y: "100vh", x: `${10 + i * 15}%` }}
                animate={{ y: "-100vh" }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="relative max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-lg">❌</span> {c.heroTitle1}
            </motion.div>

            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-primary">✅</span> {c.heroTitle2}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {c.heroSubtitle}
            </motion.p>

            <motion.p
              className="text-base text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              👉 {c.heroContext}
            </motion.p>

            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="hero"
                size="lg"
                className="text-lg px-8 py-6 shadow-glow animate-pulse hover:animate-none"
                onClick={handleStartClick}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {c.tryFree}
              </Button>
              <span className="text-sm text-muted-foreground">({c.noCard})</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials - Carousel with avatars */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {c.testimonials.slice(0, 6).map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="bg-background rounded-2xl p-6 shadow-sm border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                >
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-foreground font-medium mb-4">„{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{testimonial.avatar}</span>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Situations Showcase - Colorful animated icons */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {c.situationsTitle}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {situations.map((sit, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-2xl p-6 border border-border text-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={handleStartClick}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl ${sit.bg} flex items-center justify-center mx-auto mb-3`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <sit.icon className={`w-8 h-8 ${sit.color}`} />
                  </motion.div>
                  <p className={`font-display font-semibold ${sit.color}`}>{sit.label}</p>
                  <p className="text-2xl mt-1">{sit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {c.problemTitle}
            </motion.h2>
            <div className="space-y-4 mb-8">
              {c.problems.map((problem, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 justify-center text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="w-2 h-2 rounded-full bg-destructive/50" />
                  <span>{problem}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <ChevronRight className="w-5 h-5" />
              {c.problemSolution}
            </motion.div>
          </div>
        </section>

        {/* Before/After - Chat bubble style */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {c.exampleTitle}
            </motion.h2>
            <motion.p
              className="text-center text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              💰 {c.exampleScenario}
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Before - Multiple attempts */}
              <motion.div
                className="bg-background rounded-2xl p-6 border border-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">😰</span>
                  <span className="text-sm font-medium text-destructive">{c.exampleBefore}</span>
                </div>
                <div className="space-y-3">
                  {c.exampleBeforeTexts.map((text, i) => (
                    <motion.div
                      key={i}
                      className={`p-3 rounded-xl text-sm ${
                        text.includes("[")
                          ? "bg-destructive/10 text-destructive line-through"
                          : "bg-muted text-muted-foreground"
                      }`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-destructive mt-4 text-center">⏱️ 15 minuta kasnije...</p>
              </motion.div>

              {/* After - Perfect message */}
              <motion.div
                className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/30"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">✨</span>
                  <span className="text-sm font-medium text-primary">{c.exampleAfter}</span>
                </div>
                <motion.div
                  className="bg-primary/10 p-4 rounded-xl text-foreground"
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <p>{c.exampleAfterText}</p>
                </motion.div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-primary">⚡ 10 sekundi</p>
                  <div className="flex gap-1">
                    <ThumbsUp className="w-4 h-4 text-primary" />
                    <span className="text-xs text-primary">Savršeno!</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {c.howItWorks}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  title: c.step1Title,
                  desc: c.step1Desc,
                  icon: MessageCircle,
                  color: "from-pink-500 to-rose-500",
                },
                {
                  num: "2",
                  title: c.step2Title,
                  desc: c.step2Desc,
                  icon: Smile,
                  color: "from-amber-500 to-orange-500",
                },
                { num: "3", title: c.step3Title, desc: c.step3Desc, icon: Send, color: "from-primary to-teal-400" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="bg-background rounded-2xl p-6 shadow-sm border border-border text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div className="text-3xl font-bold text-primary/20 mb-2">{step.num}</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="flex items-center justify-center gap-2 mt-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Clock className="w-5 h-5 text-primary" />
              <span>⏱️ {c.timeNote}</span>
            </motion.div>
          </div>
        </section>

        {/* Why Not ChatGPT */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {c.whyNotGpt}
            </motion.h2>
            <div className="bg-muted/50 rounded-2xl p-8">
              <div className="space-y-3 mb-6">
                {c.whyReasons.map((reason, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check className="w-5 h-5 text-primary" />
                    <span>{reason}</span>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-muted-foreground mb-3">{c.whyBecause}</p>
                <div className="space-y-2">
                  {c.whyPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-foreground font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <span className="text-primary">👉</span>
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Who - Expanded */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {c.forWhoTitle}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.forWhoCategories.map((cat, i) => (
                <motion.div
                  key={i}
                  className="bg-background rounded-2xl p-4 border border-border text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3, borderColor: "hsl(var(--primary))" }}
                >
                  <span className="text-3xl">{cat.emoji}</span>
                  <p className="font-semibold text-foreground mt-2">{cat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing - 4.99 EUR */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {c.pricingTitle}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Free Plan */}
              <motion.div
                className="bg-background rounded-2xl p-8 border border-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-2">🆓</div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{c.freePlan}</h3>
                <ul className="space-y-3 mb-6">
                  {c.freeFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" onClick={handleStartClick}>
                  {c.tryFree}
                </Button>
              </motion.div>

              {/* Premium Plan */}
              <motion.div
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border-2 border-primary/30 relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </span>
                </div>
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">{c.premiumPlan}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-primary">{c.premiumPrice}</span>
                  <span className="text-muted-foreground">{c.premiumPeriod}</span>
                </div>
                <ul className="space-y-3 mb-4">
                  {c.premiumFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mb-2">👉 {c.premiumNote}</p>
                <div className="bg-primary/10 rounded-lg p-2 mb-4 text-center">
                  <span className="text-xs text-primary font-semibold">
                    {c.premiumSave}: {c.yearlyPrice}
                  </span>
                </div>
                <Button variant="hero" className="w-full shadow-glow">
                  {c.unlockPremium}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 gradient-surface">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{c.finalCta1}</h2>
            <p className="text-xl text-muted-foreground mb-8">{c.finalCta2}</p>
            <Button variant="hero" size="lg" className="text-lg px-8 py-6 shadow-glow" onClick={handleStartClick}>
              <ArrowRight className="w-5 h-5 mr-2" />
              {c.startNow}
            </Button>
          </motion.div>
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
