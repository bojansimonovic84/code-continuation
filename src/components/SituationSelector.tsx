import { useState } from "react";
import { Briefcase, Home, Heart, ShoppingCart, Sparkles, AlertTriangle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export type Situation = "work" | "housing" | "private" | "buying" | "love" | "badnews";

interface SituationOption {
  id: Situation;
  labelKey: string;
  icon: React.ElementType;
  descriptionKey: string;
  color: string;
  bgColor: string;
  borderColor: string;
  emoji: string;
}

const situations: SituationOption[] = [
  {
    id: "love",
    labelKey: "situationLove",
    icon: Sparkles,
    descriptionKey: "situationLoveDesc",
    color: "text-pink-500",
    bgColor: "bg-pink-500/15",
    borderColor: "border-pink-500/30",
    emoji: "💕"
  },
  {
    id: "work",
    labelKey: "situationWork",
    icon: Briefcase,
    descriptionKey: "situationWorkDesc",
    color: "text-blue-500",
    bgColor: "bg-blue-500/15",
    borderColor: "border-blue-500/30",
    emoji: "💼"
  },
  {
    id: "housing",
    labelKey: "situationHousing",
    icon: Home,
    descriptionKey: "situationHousingDesc",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/30",
    emoji: "🏠"
  },
  {
    id: "private",
    labelKey: "situationPrivate",
    icon: Users,
    descriptionKey: "situationPrivateDesc",
    color: "text-orange-500",
    bgColor: "bg-orange-500/15",
    borderColor: "border-orange-500/30",
    emoji: "👥"
  },
  {
    id: "buying",
    labelKey: "situationBuying",
    icon: ShoppingCart,
    descriptionKey: "situationBuyingDesc",
    color: "text-violet-500",
    bgColor: "bg-violet-500/15",
    borderColor: "border-violet-500/30",
    emoji: "🛍️"
  },
  {
    id: "badnews",
    labelKey: "situationBadNews",
    icon: AlertTriangle,
    descriptionKey: "situationBadNewsDesc",
    color: "text-slate-500",
    bgColor: "bg-slate-500/15",
    borderColor: "border-slate-500/30",
    emoji: "😔"
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
      {situations.map((situation, index) => {
        const Icon = situation.icon;
        const isSelected = value === situation.id;
        const isClicked = clickedId === situation.id;

        return (
          <motion.button
            key={situation.id}
            onClick={() => handleClick(situation.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
              "bg-card shadow-soft hover:shadow-medium",
              isSelected
                ? `${situation.borderColor} ${situation.bgColor} shadow-glow`
                : "border-transparent hover:border-primary/30",
            )}
          >
            <motion.div 
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                isSelected ? situation.bgColor : "bg-secondary"
              )}
              animate={isClicked ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Icon className={cn(
                "w-7 h-7 transition-all duration-300",
                isSelected ? situation.color : "text-muted-foreground"
              )} />
            </motion.div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg">{situation.emoji}</span>
                <p className={cn(
                  "font-display font-semibold transition-colors text-sm",
                  isSelected ? situation.color : "text-foreground"
                )}>
                  {t(situation.labelKey)}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t(situation.descriptionKey)}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
