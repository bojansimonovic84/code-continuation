import { Smile, Zap, MessageCircle, Volume2, Heart, Feather, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Situation } from "./SituationSelector";

export type Tone = "polite" | "professional" | "direct" | "calm" | "playful" | "flirty" | "gentle";

interface ToneOption {
  id: Tone;
  labelKey: string;
  icon: React.ElementType;
  descriptionKey: string;
  situations: Situation[];
}

const tones: ToneOption[] = [
  { id: "polite", labelKey: "tonePolite", icon: Smile, descriptionKey: "tonePoliteDesc", situations: ["work", "housing", "private", "buying", "love", "badnews"] },
  { id: "professional", labelKey: "toneProfessional", icon: Zap, descriptionKey: "toneProfessionalDesc", situations: ["work", "housing", "buying", "badnews"] },
  { id: "direct", labelKey: "toneDirect", icon: MessageCircle, descriptionKey: "toneDirectDesc", situations: ["work", "housing", "private", "buying", "badnews"] },
  { id: "calm", labelKey: "toneCalm", icon: Volume2, descriptionKey: "toneCalmDesc", situations: ["work", "housing", "private", "buying", "badnews"] },
  { id: "playful", labelKey: "tonePlayful", icon: PartyPopper, descriptionKey: "tonePlayfulDesc", situations: ["love", "private"] },
  { id: "flirty", labelKey: "toneFlirty", icon: Heart, descriptionKey: "toneFlirtyDesc", situations: ["love"] },
  { id: "gentle", labelKey: "toneGentle", icon: Feather, descriptionKey: "toneGentleDesc", situations: ["badnews", "private"] },
];

interface ToneSelectorProps {
  value: Tone | null;
  onChange: (tone: Tone) => void;
  situation?: Situation | null;
}

export function ToneSelector({ value, onChange, situation }: ToneSelectorProps) {
  const { t } = useLanguage();

  const filteredTones = tones.filter(tone =>
    !situation || tone.situations.includes(situation)
  );

  return (
    <div className="flex flex-wrap gap-2">
      {filteredTones.map((tone) => {
        const Icon = tone.icon;
        const isSelected = value === tone.id;

        return (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
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
                {t(tone.labelKey)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {t(tone.descriptionKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
