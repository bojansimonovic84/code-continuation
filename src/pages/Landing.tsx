import { useState, useEffect } from "react";
import { PizzaAnimation } from "@/components/PizzaAnimation";
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
          text: "Napisao sam klijentu poruku za kašnjenje projekta — odgovorio je sa 'hvala na iskrenosti'. Bez drame!",
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
      exampleScenario: "Situacija: Moraš da kažeš kevi da ne dolaziš na nedeljni ručak",
      exampleBefore: "Ti pokušavaš da napišeš:",
      exampleBeforeTexts: [
        "Mama, moram ti nešto reći...",
        "Neću moći u nedelju, nemoj da se ljutiš...",
        "[obrisano]",
        "Ma ništa, doći ću ipak... 😩",
      ],
      exampleAfter: "Poruke.AI generiše:",
      exampleAfterText:
        "Mama, u nedelju nažalost neću moći da dođem na ručak — imam nešto zakazano što ne mogu da pomeram. Ali ajde sledeći vikend da dođem ranije pa da ti pomognem oko kuvanja? Jedva čekam tvoje sarme 😊❤️",

      // Pricing hook
      pricingHook: "Za cenu pola pice",
      pricingHookSub: "Rešenja za muvanje, biznis, porodicu i sve neugodne poruke 💬",
      pricingPills: ["💕 Muvanje", "💼 Biznis", "👨‍👩‍👧 Porodica", "😰 Neugodne poruke"],
      // Pricing - 4.99 EUR
      pricingTitle: "Jednostavna cena",
      freePlan: "Besplatno",
      freeFeatures: ["5 poruka", "Sve situacije", "Svi tonovi", "Bez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neograničeno poruka", "Sve situacije i tonovi", "Istorija poruka", "Prioritetna podrška"],
      premiumPrice: "4.99€",
      premiumPeriod: "/mesečno",
      premiumNote: "Za cenu pola pice — rešenja za muvanje, biznis i chat. 🍕💬",
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
      exampleScenario: "Situacija: Moraš reći mami da ne dolaziš na nedjeljni ručak",
      exampleBefore: "Ti pokušavaš napisati:",
      exampleBeforeTexts: [
        "Mama, moram ti nešto reći...",
        "Neću moći u nedjelju, nemoj se ljutiti...",
        "[obrisano]",
        "Ma ništa, doći ću ipak... 😩",
      ],
      exampleAfter: "Poruke.AI generira:",
      exampleAfterText:
        "Mama, u nedjelju nažalost neću moći doći na ručak — imam nešto zakazano što ne mogu pomicati. Ali ajde sljedeći vikend da dođem ranije pa da ti pomognem oko kuhanja? Jedva čekam tvoje sarme 😊❤️",
      pricingHook: "Za cijenu pola pizze",
      pricingHookSub: "Rješenja za muvanje, biznis, obitelj i sve neugodne poruke 💬",
      pricingPills: ["💕 Muvanje", "💼 Biznis", "👨‍👩‍👧 Obitelj", "😰 Neugodne poruke"],
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
          text: "Napisao sam klijentu poruku za kašnjenje projekta — odgovorio je sa 'hvala na iskrenosti'. Bez drame!",
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
      exampleScenario: "Situacija: Moraš reći mami da ne dolaziš na nedjeljni ručak",
      exampleBefore: "Ti pokušavaš napisati:",
      exampleBeforeTexts: [
        "Mama, moram ti nešto reći...",
        "Neću moći u nedjelju, nemoj se ljutiti...",
        "[obrisano]",
        "Ma ništa, doći ću ipak... 😩",
      ],
      exampleAfter: "Poruke.AI generiše:",
      exampleAfterText:
        "Mama, u nedjelju nažalost neću moći doći na ručak — imam nešto zakazano što ne mogu pomjerati. Ali ajde sljedeći vikend da dođem ranije pa da ti pomognem oko kuhanja? Jedva čekam tvoje sarme 😊❤️",
      pricingHook: "Za cijenu pola pice",
      pricingHookSub: "Rješenja za muvanje, biznis, porodicu i sve neugodne poruke 💬",
      pricingPills: ["💕 Muvanje", "💼 Biznis", "👨‍👩‍👧 Porodica", "😰 Neugodne poruke"],
      pricingTitle: "Jednostavna cijena",
      freePlan: "Besplatno",
      freeFeatures: ["5 poruka", "Sve situacije", "Svi tonovi", "Bez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neograničeno poruka", "Sve situacije i tonovi", "Historija poruka", "Prioritetna podrška"],
      premiumPrice: "9.99 KM",
      premiumPeriod: "/mjesečno",
      premiumNote: "Za cenu pola pice — rešenja za muvanje, biznis i chat.🍕💬",
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
          text: "Napisao sam klijentu poruku za kašnjenje projekta — odgovorio je sa 'hvala na iskrenosti'. Bez drame!",
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
      exampleScenario: "Situacija: Moraš reći kevi da ne dolaziš na nedjeljni ručak",
      exampleBefore: "Ti pokušavaš napisati:",
      exampleBeforeTexts: [
        "Mama, moram ti nešto reći...",
        "Neću moći u nedjelju, nemoj se ljutiti...",
        "[obrisano]",
        "Ma ništa, doći ću ipak... 😩",
      ],
      exampleAfter: "Poruke.AI generiše:",
      exampleAfterText:
        "Mama, u nedjelju nažalost neću moći doći na ručak — imam nešto zakazano što ne mogu pomjerati. Ali ajde sljedeći vikend da dođem ranije pa da ti pomognem oko kuvanja? Jedva čekam tvoje sarme 😊❤️",
      pricingHook: "Za cijenu pola pice",
      pricingHookSub: "Rješenja za muvanje, biznis, porodicu i sve neugodne poruke 💬",
      pricingPills: ["💕 Muvanje", "💼 Biznis", "👨‍👩‍👧 Porodica", "😰 Neugodne poruke"],
      pricingTitle: "Jednostavna cijena",
      freePlan: "Besplatno",
      freeFeatures: ["5 poruka", "Sve situacije", "Svi tonovi", "Bez kartice"],
      premiumPlan: "Premium",
      premiumFeatures: ["Neograničeno poruka", "Sve situacije i tonovi", "Istorija poruka", "Prioritetna podrška"],
      premiumPrice: "4.99€",
      premiumPeriod: "/mjesečno",
      premiumNote: "Za cenu pola pice — rešenja za muvanje, biznis i chat. 🍕💬",
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
          text: "Му напишав на клиент порака за доцнење на проект — одговори со 'благодарам на искреноста'. Без драма!",
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
      exampleScenario: "Ситуација: Мораш да ѝ кажеш на мајка ти дека нема да дојдеш на неделен ручек",
      exampleBefore: "Ти се обидуваш да напишеш:",
      exampleBeforeTexts: [
        "Мамо, морам нешто да ти кажам...",
        "Нема да можам во недела, немој да се лутиш...",
        "[избришано]",
        "Ма ништо, ќе дојдам сепак... 😩",
      ],
      exampleAfter: "Poruke.AI генерира:",
      exampleAfterText:
        "Мамо, во недела нажалост нема да можам да дојдам на ручек — имам нешто закажано што не можам да го поместам. Ама ајде следниот викенд да дојдам порано и да ти помогнам со готвењето? Едвај чекам твоите сарми 😊❤️",
      pricingHook: "За цена на половина пица",
      pricingHookSub: "Решенија за мување, бизнис, семејство и сите незгодни пораки 💬",
      pricingPills: ["💕 Мување", "💼 Бизнис", "👨‍👩‍👧 Семејство", "😰 Незгодни пораки"],
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
          text: "Stranki sem napisal sporočilo o zamudi projekta — odgovorila je s 'hvala za iskrenost'. Brez drame!",
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
      exampleScenario: "Situacija: Mami moraš povedati, da ne prideš na nedeljsko kosilo",
      exampleBefore: "Ti poskušaš napisati:",
      exampleBeforeTexts: [
        "Mama, moram ti nekaj povedati...",
        "V nedeljo ne bom mogel/mogla, se ne jezi...",
        "[izbrisano]",
        "A nič, bom že prišel/prišla... 😩",
      ],
      exampleAfter: "Poruke.AI generira:",
      exampleAfterText:
        "Mama, v nedeljo žal ne bom mogel/mogla priti na kosilo — imam nekaj dogovorjenega, česar ne morem prestaviti. Ampak daj naslednji vikend pridem prej, pa ti pomagam pri kuhanju? Komaj čakam tvoje sarme 😊❤️",
      pricingHook: "Za ceno pol pice",
      pricingHookSub: "Rešitve za flirtanje, biznis, družino in vsa neprijetna sporočila 💬",
      pricingPills: ["💕 Flirtanje", "💼 Biznis", "👨‍👩‍👧 Družina", "😰 Neprijetna sporočila"],
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
    en: {
      heroTitle1: "Don't know how to write that message?",
      heroTitle2: "We do. 💬",
      heroSubtitle: "Poruke.AI helps you write the perfect message, in the right tone, for any situation — in 10 seconds.",
      heroContext: "For work, personal life, housing, buying/selling, dating, and awkward situations.",
      tryFree: "Try for free",
      noCard: "no card needed • 5 messages free",
      testimonials: [
        {
          text: "I use it every day for work emails. Saved me hours!",
          name: "Mark",
          role: "IT Manager",
          avatar: "👨‍💼",
        },
        {
          text: "Saved me from sending a stupid text to my ex. Highly recommend!",
          name: "Anna",
          role: "Student",
          avatar: "👩‍🎓",
        },
        {
          text: "I wrote a client about a project delay — they replied 'thanks for being honest'. No drama!",
          name: "Stefan",
          role: "Freelancer",
          avatar: "🧑‍💻",
        },
        {
          text: "Finally know how to say no to my boss without sounding rude.",
          name: "Elena",
          role: "HR Manager",
          avatar: "👩‍💼",
        },
        { text: "Perfect for dating! Girls finally respond 😄", name: "Luke", role: "Student", avatar: "🎓" },
        { text: "Helped me sort out a problem with my landlord. 10/10", name: "Milica", role: "Tenant", avatar: "🏠" },
      ],
      problemTitle: "Sound familiar?",
      problems: [
        "You stare at the screen and don't know how to start",
        "You don't want to sound rude or too soft",
        "You delete the message 5 times before sending it",
        "You delay replying for hours because you don't know what to write",
        "You're afraid of coming across as weird or pushy",
      ],
      problemSolution: "Poruke.AI solves that for you.",
      howItWorks: "How does it work?",
      step1Title: "Choose a situation",
      step1Desc: "Work • Housing • Buying/Selling • Personal • Dating • Bad news",
      step2Title: "Choose a tone",
      step2Desc: "Polite • Confident • Calm • Playful • Gentle",
      step3Title: 'Click "Write message"',
      step3Desc: "Copy. Send. Done.",
      timeNote: "Everything takes less than 20 seconds.",
      whyNotGpt: "Why not ChatGPT?",
      whyReasons: ["No writing prompts", "No overthinking", "No overly formal replies"],
      whyBecause: "Poruke.AI writes like:",
      whyPoints: ["A real person", "From the Balkans", "In real situations"],
      exampleTitle: "Before / After",
      exampleScenario: "Situation: You need to tell your mom you're not coming to Sunday lunch",
      exampleBefore: "You try to write:",
      exampleBeforeTexts: [
        "Mom, I need to tell you something...",
        "I can't make it on Sunday, please don't be mad...",
        "[deleted]",
        "Nevermind, I'll come after all... 😩",
      ],
      exampleAfter: "Poruke.AI generates:",
      exampleAfterText:
        "Hey Mom, unfortunately I won't be able to make it to lunch on Sunday — I have something scheduled that I can't move. But how about I come earlier next weekend and help you with the cooking? Can't wait for your famous sarma 😊❤️",
      pricingHook: "For half a pizza's price",
      pricingHookSub: "Solutions for dating, business, family, and all those awkward messages 💬",
      pricingPills: ["💕 Dating", "💼 Business", "👨‍👩‍👧 Family", "😰 Awkward messages"],
      pricingTitle: "Simple pricing",
      freePlan: "Free",
      freeFeatures: ["5 messages", "All situations", "All tones", "No card needed"],
      premiumPlan: "Premium",
      premiumFeatures: ["Unlimited messages", "All situations & tones", "Message history", "Priority support"],
      premiumPrice: "4.99€",
      premiumPeriod: "/monthly",
      premiumNote: "For half a pizza's price — solutions for dating, business & chat. 🍕💬",
      premiumSave: "Save 40%",
      yearlyPrice: "35.99€/yearly",
      unlockPremium: "Unlock Premium",
      forWhoTitle: "Who is Poruke.AI for?",
      forWhoCategories: [
        { emoji: "👨‍💼", label: "Employees", desc: "Emails to boss, colleagues, clients" },
        { emoji: "🧑‍💻", label: "Freelancers", desc: "Professional client communication" },
        { emoji: "🎓", label: "Students", desc: "Professors, peers, internships" },
        { emoji: "🏠", label: "Tenants", desc: "Landlords and neighbors" },
        { emoji: "💕", label: "Teenagers", desc: "Dating and friends" },
        { emoji: "👨‍👩‍👧", label: "Parents", desc: "School, daycare, other parents" },
        { emoji: "🛍️", label: "Buyers/Sellers", desc: "Listings and negotiations" },
        { emoji: "😰", label: "Anxious people", desc: "For everyone who hates conflict" },
      ],
      situationsTitle: "Situations we cover",
      finalCta1: "Stop overthinking what to write.",
      finalCta2: "Start sending messages that work.",
      tryNow: "Try Poruke.AI for free",
      startNow: "Start now",
    },
  };

  const c = content[language as keyof typeof content] || content.sr;

  // Situation cards with colorful icons and animations
  const sitLabels: Record<string, string[]> = {
    mk: ["Мување и љубов", "Работа и бизнис", "Стан и комшии", "Купопродажба", "Приватно и пријатели", "Лоши вести"],
    en: ["Dating & love", "Work & business", "Housing & neighbors", "Buying & selling", "Personal & friends", "Bad news"],
  };
  const defaultSitLabels = ["Muvanje i ljubav", "Posao i biznis", "Stan i komšije", "Kupoprodaja", "Privatno i prijatelji", "Loše vesti"];
  const sl = sitLabels[language] || defaultSitLabels;

  const situations = [
    { icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10", label: sl[0], desc: "💕" },
    { icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10", label: sl[1], desc: "💼" },
    { icon: Home, color: "text-emerald-500", bg: "bg-emerald-500/10", label: sl[2], desc: "🏠" },
    { icon: ShoppingCart, color: "text-violet-500", bg: "bg-violet-500/10", label: sl[3], desc: "🛍️" },
    { icon: Users, color: "text-orange-500", bg: "bg-orange-500/10", label: sl[4], desc: "👥" },
    { icon: AlertTriangle, color: "text-slate-500", bg: "bg-slate-500/10", label: sl[5], desc: "😔" },
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
        {/* Hero Section - Clickbait visual with phone mockup */}
        <section className="relative overflow-hidden py-12 md:py-20 px-4">
          <div className="absolute inset-0 gradient-surface" />
          {/* Animated gradient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(168 76% 36% / 0.4), transparent)" }}
              animate={{ x: ["-20%", "10%", "-20%"], y: ["-10%", "20%", "-10%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(12 80% 62% / 0.4), transparent)" }}
              animate={{ x: ["10%", "-15%", "10%"], y: ["10%", "-20%", "10%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Text */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-5"
                initial={{ scale: 0.9 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                </span>
                🔥 30,000+ {language === "mk" ? "пораки веќе генерирани" : language === "en" ? "messages already generated" : "poruka već generisano"}
              </motion.div>

              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {c.heroTitle1}
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {c.heroTitle2}
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-3 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {c.heroSubtitle}
              </motion.p>

              <motion.p
                className="text-sm text-muted-foreground mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                👉 {c.heroContext}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center md:items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="hero"
                  size="lg"
                  className="text-lg px-8 py-6 shadow-glow group"
                  onClick={handleStartClick}
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  {c.tryFree}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <span className="text-sm text-muted-foreground">({c.noCard})</span>
              </motion.div>

              {/* Social proof mini */}
              <motion.div
                className="flex items-center gap-3 mt-6 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex -space-x-2">
                  {["👩‍💼", "🧑‍💻", "👨‍🎓", "👩‍🎓", "🧔"].map((emoji, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-sm">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">4.9★</span> • 2,400+ {language === "mk" ? "задоволни корисници" : language === "en" ? "happy users" : "zadovoljnih korisnika"}
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Phone mockup with animated chat */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Phone frame */}
              <div className="relative w-[280px] md:w-[320px]">
                <div className="bg-card rounded-[2.5rem] border-4 border-foreground/10 shadow-elevated p-3 relative overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground/10 rounded-full z-10" />
                  
                  {/* Screen content */}
                  <div className="bg-background rounded-[2rem] pt-10 pb-4 px-3 min-h-[420px] md:min-h-[480px] flex flex-col">
                    {/* App header inside phone */}
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                        <MessageSquareText className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="font-display text-sm font-bold text-foreground">Poruke.AI</span>
                    </div>

                    {/* Animated chat bubbles */}
                    <div className="flex-1 space-y-3 overflow-hidden">
                      {/* User message */}
                      <motion.div
                        className="flex justify-end"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        <div className="bg-primary/15 rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%]">
                          <p className="text-xs text-foreground">
                            {language === "mk" 
                              ? "Комшивката ми реагира на секое стори и ми се смешка кога се сретнеме... Како да ја поканам на пиво а да знае на што мислам? 😏"
                              : language === "en"
                              ? "My neighbor reacts to every story and smiles at me when we meet... How do I ask her out so she knows what I mean? 😏"
                              : "Komšinica mi reaguje na svaki stori i smeška mi se kad se sretnemo... Kako da je pozovem na piće a da zna na šta mislim? 😏"
                            }
                          </p>
                        </div>
                      </motion.div>

                      {/* AI thinking */}
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ delay: 1.5, duration: 2 }}
                      >
                        <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-2">
                          <motion.div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary/50"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              />
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* AI response */}
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.0 }}
                      >
                        <div className="bg-secondary rounded-2xl rounded-bl-sm px-3 py-2 max-w-[90%] border border-primary/20">
                          <div className="flex items-center gap-1 mb-1">
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span className="text-[10px] text-primary font-semibold">AI</span>
                          </div>
                          <p className="text-xs text-foreground leading-relaxed">
                            {language === "mk" 
                              ? "Еј, гледам ми реагираш на секое стори... ајде да видиме дали сме исто толку интересни и во живо 😏 Кафе утре? Ветувам — нема да зборам за времето ☀️"
                              : language === "en"
                              ? "Hey, I notice you react to every story of mine... let's see if we're just as interesting in person 😏 Coffee tomorrow? I promise — I won't talk about the weather ☀️"
                              : "Ej, vidim da mi reagiješ na svaki stori... ajde da vidimo jesmo li isto toliko zanimljivi i uživo 😏 Kafica sutra? Obećavam — neću pričati o vremenu ☀️"
                            }
                          </p>
                        </div>
                      </motion.div>

                      {/* Copy button animation */}
                      <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3.8 }}
                      >
                        <div className="bg-primary/10 text-primary text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5">
                          <Check className="w-3 h-3" />
                          {language === "mk" ? "Копирано!" : "Kopirano!"}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Floating badges around phone */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-3 py-2 shadow-elevated"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    ⚡ 10 sec
                  </span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-6 bg-card border border-border rounded-xl px-3 py-2 shadow-elevated"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    💬 {language === "mk" ? "Совршена порака!" : "Savršena poruka!"}
                  </span>
                </motion.div>

                <motion.div
                  className="absolute top-1/3 -left-8 bg-card border border-border rounded-xl px-3 py-2 shadow-elevated"
                  animate={{ y: [0, -5, 0], x: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    ❤️ 4.9★
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
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

        {/* Pricing Hook - Pizza Visual */}
        <section className="py-16 px-4 overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative"
            >
              {/* Animated pizza with disappearing slices */}
              <motion.div
                className="relative inline-block mb-6"
                initial={{ rotate: -10, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <PizzaAnimation />
                {/* Price tag on pizza */}
                <motion.div
                  className="absolute top-0 -right-3 bg-destructive text-destructive-foreground rounded-full px-3 py-1.5 text-sm font-bold shadow-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                  animate={{ y: [0, -4, 0] }}
                >
                  ~10€
                </motion.div>
                {/* Half price indicator */}
                <motion.div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-bold shadow-lg whitespace-nowrap z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                >
                  ½ = 4.99€ 💬
                </motion.div>
              </motion.div>

              <motion.h3
                className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {c.pricingHook}
              </motion.h3>

              {/* Animated feature pills */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
                {c.pricingPills.map((item, i) => (
                  <motion.span
                    key={item}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                {c.pricingHookSub}
              </motion.p>

              {/* Price comparison line */}
              <motion.div
                className="flex items-center justify-center gap-3 mt-6 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <span className="text-muted-foreground line-through text-lg">🍕 ~10€</span>
                <span className="text-2xl">→</span>
                <motion.span 
                  className="text-primary font-bold text-2xl md:text-3xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  💬 4.99€
                </motion.span>
              </motion.div>

              {/* Animated arrow pointing down */}
              <motion.div
                className="mt-6"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <span className="text-4xl">👇</span>
              </motion.div>
            </motion.div>
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
            © 2026 Poruke.AI. {language === "mk" ? "Сите права задржани." : "Sva prava zadržana."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
