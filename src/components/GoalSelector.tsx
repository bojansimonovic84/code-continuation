import { Bell, XCircle, HelpCircle, Heart, MessageCircle, Flame, Coffee, Send, Frown, HandHeart, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Situation } from "./SituationSelector";

export type Goal =
  | "remind" | "refuse" | "ask" | "calm" | "clarify"
  | "opener" | "flirt" | "askout" | "compliment"
  | "breakup" | "reject" | "inform" | "apologize";

interface GoalOption {
  id: Goal;
  labelKey: string;
  icon: React.ElementType;
  descriptionKey: string;
  situations: Situation[];
}

const goals: GoalOption[] = [
  // General goals
  { id: "remind", labelKey: "goalRemind", icon: Bell, descriptionKey: "goalRemindDesc", situations: ["work", "housing", "private", "buying"] },
  { id: "refuse", labelKey: "goalRefuse", icon: XCircle, descriptionKey: "goalRefuseDesc", situations: ["work", "housing", "private", "buying"] },
  { id: "ask", labelKey: "goalAsk", icon: HelpCircle, descriptionKey: "goalAskDesc", situations: ["work", "housing", "private", "buying"] },
  { id: "calm", labelKey: "goalCalm", icon: Heart, descriptionKey: "goalCalmDesc", situations: ["work", "housing", "private", "buying"] },
  { id: "clarify", labelKey: "goalClarify", icon: MessageCircle, descriptionKey: "goalClarifyDesc", situations: ["work", "housing", "private", "buying"] },

  // Love/Flirting goals
  { id: "opener", labelKey: "goalOpener", icon: Coffee, descriptionKey: "goalOpenerDesc", situations: ["love"] },
  { id: "flirt", labelKey: "goalFlirt", icon: Flame, descriptionKey: "goalFlirtDesc", situations: ["love"] },
  { id: "compliment", labelKey: "goalCompliment", icon: Heart, descriptionKey: "goalComplimentDesc", situations: ["love"] },
  { id: "askout", labelKey: "goalAskOut", icon: Send, descriptionKey: "goalAskOutDesc", situations: ["love"] },

  // Bad news goals
  { id: "breakup", labelKey: "goalBreakup", icon: Frown, descriptionKey: "goalBreakupDesc", situations: ["badnews"] },
  { id: "reject", labelKey: "goalReject", icon: Shield, descriptionKey: "goalRejectDesc", situations: ["badnews"] },
  { id: "inform", labelKey: "goalInform", icon: MessageCircle, descriptionKey: "goalInformDesc", situations: ["badnews"] },
  { id: "apologize", labelKey: "goalApologize", icon: HandHeart, descriptionKey: "goalApologizeDesc", situations: ["badnews"] },
];

interface GoalSelectorProps {
  value: Goal | null;
  onChange: (goal: Goal) => void;
  situation?: Situation | null;
}

export function GoalSelector({ value, onChange, situation }: GoalSelectorProps) {
  const { t } = useLanguage();

  const filteredGoals = goals.filter(g =>
    !situation || g.situations.includes(situation)
  );

  return (
    <div className="flex flex-wrap gap-2">
      {filteredGoals.map((goal) => {
        const Icon = goal.icon;
        const isSelected = value === goal.id;

        return (
          <button
            key={goal.id}
            onClick={() => onChange(goal.id)}
            className={cn(
              "flex flex-col items-start gap-1 px-4 py-3 rounded-xl border-2 transition-all duration-200",
              "bg-card shadow-soft hover:shadow-medium",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-primary/30"
            )}
          >
            <div className="flex items-center gap-2">
              <Icon className={cn(
                "w-4 h-4",
                isSelected ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "font-medium",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {t(goal.labelKey)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {t(goal.descriptionKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
