import { useState } from "react";
import { Briefcase, Home, Heart, ShoppingCart, Sparkles, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export type Situation = "work" | "housing" | "private" | "buying" | "love" | "badnews";

interface SituationOption {
  id: Situation;
  labelKey: string;
  icon: React.ElementType;
  descriptionKey: string;
  color: string;
  bgGradient: string;
}

const situations: SituationOption[] = [
  {
    id: "love",
    labelKey: "situationLove",
    icon: Sparkles,
    descriptionKey: "situationLoveDesc",
    color: "text-pink-500",
    bgGradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: "work",
    labelKey: "situationWork",
    icon: Briefcase,
    descriptionKey: "situationWorkDesc",
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "housing",
    labelKey: "situationHousing",
    icon: Home,
    descriptionKey: "situationHousingDesc",
    color: "text-emerald-500",
    bgGradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "private",
    labelKey: "situationPrivate",
    icon: Heart,
    descriptionKey: "situationPrivateDesc",
    color: "text-orange-500",
    bgGradient: "from-orange-500/20 to-amber-500/20"
  },
  {
    id: "buying",
    labelKey: "situationBuying",
    icon: ShoppingCart,
    descriptionKey: "situationBuyingDesc",
    color: "text-violet-500",
    bgGradient: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: "badnews",
    labelKey: "situationBadNews",
    icon: AlertTriangle,
    descriptionKey: "situationBadNewsDesc",
    color: "text-slate-500",
    bgGradient: "from-slate-500/20 to-gray-500/20"
  },
];

interface SituationSelectorProps {
  value: Situation | null;
  onChange: (situation: Situation) => void;
}

export function SituationSelector({ value, onChange }: SituationSelectorProps) {
  const { t } = useLanguage();
  const [clickedId, setClickedId] = useState<string | null>(null);

  const handleClick = (id: Situation) => {
    setClickedId(id);
    onChange(id);
    setTimeout(() => setClickedId(null), 300);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {situations.map((situation) => {
        const Icon = situation.icon;
        const isSelected = value === situation.id;
        const isClicked = clickedId === situation.id;

        return (
          <button
            key={situation.id}
            onClick={() => handleClick(situation.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
              "bg-card shadow-soft hover:shadow-medium",
              isSelected
                ? "border-primary bg-primary/5 shadow-glow"
                : "border-transparent hover:border-primary/30",
              isClicked && "scale-95"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              isSelected
                ? `bg-gradient-to-br ${situation.bgGradient}`
                : "bg-secondary",
              isClicked && "animate-pulse scale-110"
            )}>
              <Icon className={cn(
                "w-6 h-6 transition-all duration-300",
                isSelected ? situation.color : "text-muted-foreground",
                isClicked && "animate-bounce"
              )} />
            </div>
            <div className="text-center">
              <p className={cn(
                "font-display font-semibold transition-colors",
                isSelected ? situation.color : "text-foreground"
              )}>
                {t(situation.labelKey)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t(situation.descriptionKey)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
