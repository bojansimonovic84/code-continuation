import { Copy, Check, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface MessageOutputProps {
  message: string;
  isLoading?: boolean;
  onRegenerate?: () => void;
}

export function MessageOutput({ message, isLoading, onRegenerate }: MessageOutputProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-medium animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-5/6" />
          <div className="h-4 bg-secondary rounded w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-medium space-y-4 animate-scale-in">
      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
        {message}
      </p>

      <div className="flex gap-2 pt-2">
        <Button
          onClick={handleCopy}
          variant="default"
          size="lg"
          className="flex-1"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              {t("copied")}
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              {t("copyToClipboard")}
            </>
          )}
        </Button>

        {onRegenerate && (
          <Button
            onClick={onRegenerate}
            variant="outline"
            size="lg"
            className="px-4"
            title={t("regenerate")}
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
