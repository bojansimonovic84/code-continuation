import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Language, LanguageInfo, languages, translations } from "./LanguageContext.data";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const STORAGE_KEY = "poruke-language";

function detectBrowserLanguage(): Language {
  const browserLangs = navigator.languages || [navigator.language];
  const langMap: Record<string, Language> = {
    sr: "sr", hr: "hr", bs: "bs", mk: "mk", sl: "sl",
    en: "en", ru: "ru", uk: "uk",
  };
  for (const bl of browserLangs) {
    const code = bl.toLowerCase().split("-")[0];
    if (code === "cnr") return "me";
    if (langMap[code]) return langMap[code];
  }
  return "sr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && languages.some(l => l.code === saved)) return saved as Language;
    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: string): string => {
    return translations[language][key] || translations.sr[key] || key;
  };

  const languageInfo = languages.find(l => l.code === language) || languages[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageInfo }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
