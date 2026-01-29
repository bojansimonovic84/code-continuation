import { useState } from "react";
import { 
  Bell, XCircle, HelpCircle, Heart, MessageCircle, Flame, Coffee, Send, 
  Frown, HandHeart, Shield, Handshake, FileText, Mail, PenLine,
  ThumbsUp, AlertCircle, Users, Megaphone, Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Situation } from "./SituationSelector";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export type Goal =
  | "remind" | "refuse" | "ask" | "calm" | "clarify"
  | "opener" | "flirt" | "askout" | "compliment"
  | "breakup" | "reject" | "inform" | "apologize"
  // New business goals
  | "negotiate" | "propose" | "followup" | "announce" | "thank" | "feedback"
  // Custom goal
  | "custom";

interface GoalOption {
  id: Goal;
  labelKey: string;
  icon: React.ElementType;
  descriptionKey: string;
  situations: Situation[];
  color?: string;
}

const goals: GoalOption[] = [
  // General goals (for all situations)
  { id: "remind", labelKey: "goalRemind", icon: Bell, descriptionKey: "goalRemindDesc", situations: ["work", "housing", "private", "buying"], color: "text-amber-500" },
  { id: "refuse", labelKey: "goalRefuse", icon: XCircle, descriptionKey: "goalRefuseDesc", situations: ["work", "housing", "private", "buying"], color: "text-red-500" },
  { id: "ask", labelKey: "goalAsk", icon: HelpCircle, descriptionKey: "goalAskDesc", situations: ["work", "housing", "private", "buying"], color: "text-blue-500" },
  { id: "calm", labelKey: "goalCalm", icon: Heart, descriptionKey: "goalCalmDesc", situations: ["work", "housing", "private", "buying"], color: "text-pink-500" },
  { id: "clarify", labelKey: "goalClarify", icon: MessageCircle, descriptionKey: "goalClarifyDesc", situations: ["work", "housing", "private", "buying"], color: "text-cyan-500" },
  
  // Business-specific goals
  { id: "negotiate", labelKey: "goalNegotiate", icon: Handshake, descriptionKey: "goalNegotiateDesc", situations: ["work", "buying"], color: "text-emerald-500" },
  { id: "propose", labelKey: "goalPropose", icon: FileText, descriptionKey: "goalProposeDesc", situations: ["work"], color: "text-indigo-500" },
  { id: "followup", labelKey: "goalFollowup", icon: Mail, descriptionKey: "goalFollowupDesc", situations: ["work", "buying"], color: "text-violet-500" },
  { id: "announce", labelKey: "goalAnnounce", icon: Megaphone, descriptionKey: "goalAnnounceDesc", situations: ["work", "private"], color: "text-orange-500" },
  { id: "thank", labelKey: "goalThank", icon: Gift, descriptionKey: "goalThankDesc", situations: ["work", "private", "housing", "buying"], color: "text-green-500" },
  { id: "feedback", labelKey: "goalFeedback", icon: ThumbsUp, descriptionKey: "goalFeedbackDesc", situations: ["work", "buying"], color: "text-teal-500" },

  // Love/Flirting goals
  { id: "opener", labelKey: "goalOpener", icon: Coffee, descriptionKey: "goalOpenerDesc", situations: ["love"], color: "text-amber-500" },
  { id: "flirt", labelKey: "goalFlirt", icon: Flame, descriptionKey: "goalFlirtDesc", situations: ["love"], color: "text-rose-500" },
  { id: "compliment", labelKey: "goalCompliment", icon: Heart, descriptionKey: "goalComplimentDesc", situations: ["love"], color: "text-pink-500" },
  { id: "askout", labelKey: "goalAskOut", icon: Send, descriptionKey: "goalAskOutDesc", situations: ["love"], color: "text-red-500" },

  // Bad news goals
  { id: "breakup", labelKey: "goalBreakup", icon: Frown, descriptionKey: "goalBreakupDesc", situations: ["badnews"], color: "text-slate-500" },
  { id: "reject", labelKey: "goalReject", icon: Shield, descriptionKey: "goalRejectDesc", situations: ["badnews"], color: "text-gray-500" },
  { id: "inform", labelKey: "goalInform", icon: AlertCircle, descriptionKey: "goalInformDesc", situations: ["badnews"], color: "text-orange-500" },
  { id: "apologize", labelKey: "goalApologize", icon: HandHeart, descriptionKey: "goalApologizeDesc", situations: ["badnews"], color: "text-purple-500" },

  // Custom goal (always available)
  { id: "custom", labelKey: "goalCustom", icon: PenLine, descriptionKey: "goalCustomDesc", situations: ["work", "housing", "private", "buying", "love", "badnews"], color: "text-primary" },
];

interface GoalSelectorProps {
  value: Goal | null;
  onChange: (goal: Goal) => void;
  situation?: Situation | null;
  customGoal?: string;
  onCustomGoalChange?: (value: string) => void;
}

export function GoalSelector({ value, onChange, situation, customGoal, onCustomGoalChange }: GoalSelectorProps) {
  const { t } = useLanguage();
  const [showCustomInput, setShowCustomInput] = useState(value === "custom");

  const filteredGoals = goals.filter(g =>
    !situation || g.situations.includes(situation)
  );

  const handleGoalClick = (goalId: Goal) => {
    onChange(goalId);
    if (goalId === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filteredGoals.map((goal, index) => {
          const Icon = goal.icon;
          const isSelected = value === goal.id;

          return (
            <motion.button
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex flex-col items-start gap-1 px-4 py-3 rounded-xl border-2 transition-all duration-200",
                "bg-card shadow-soft hover:shadow-medium",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:border-primary/30"
              )}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className={cn(
                    "w-4 h-4",
                    isSelected ? goal.color || "text-primary" : "text-muted-foreground"
                  )} />
                </motion.div>
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
            </motion.button>
          );
        })}
      </div>

      {/* Custom goal input */}
      <AnimatePresence>
        {showCustomInput && value === "custom" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <Input
                placeholder={t("customGoalPlaceholder")}
                value={customGoal || ""}
                onChange={(e) => onCustomGoalChange?.(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("customGoalHint")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
