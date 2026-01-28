import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContextInput({ value, onChange }: ContextInputProps) {
  const { t } = useLanguage();
  const maxLength = 200;

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={t("contextPlaceholder")}
        className={cn(
          "w-full min-h-[100px] p-4 rounded-xl resize-none",
          "bg-card border-2 border-transparent shadow-soft",
          "focus:border-primary focus:shadow-medium focus:outline-none",
          "placeholder:text-muted-foreground transition-all duration-200",
          "text-foreground"
        )}
        maxLength={maxLength}
      />
      <div className="flex justify-end">
        <span className={cn(
          "text-xs",
          value.length > maxLength * 0.8 ? "text-accent" : "text-muted-foreground"
        )}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
