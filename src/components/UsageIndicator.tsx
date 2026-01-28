import { MessageCircle, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UsageIndicatorProps {
  messageCount: number;
  isSubscribed: boolean;
  limit?: number;
}

export function UsageIndicator({ messageCount, isSubscribed, limit = 5 }: UsageIndicatorProps) {
  const { t } = useLanguage();

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-full text-sm">
        <Crown className="w-4 h-4 text-accent-foreground" />
        <span className="text-accent-foreground font-medium">{t("premium")}</span>
      </div>
    );
  }

  const remaining = Math.max(0, limit - messageCount);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
      <MessageCircle className="w-4 h-4 text-muted-foreground" />
      <span className="text-muted-foreground">
        {remaining}/{limit}
      </span>
    </div>
  );
}
