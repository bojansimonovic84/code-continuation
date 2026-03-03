import { Copy, Check, RefreshCw, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const shareChannels = [
  { name: "WhatsApp", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg", color: "#25D366", getUrl: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}` },
  { name: "Viber", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/viber.svg", color: "#7360F2", getUrl: (text: string) => `viber://forward?text=${encodeURIComponent(text)}` },
  { name: "Telegram", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg", color: "#26A5E4", getUrl: (text: string) => `https://t.me/share/url?text=${encodeURIComponent(text)}` },
  { name: "Messenger", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/messenger.svg", color: "#0099FF", getUrl: (text: string) => `fb-messenger://share/?link=&quote=${encodeURIComponent(text)}` },
  { name: "Instagram", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg", color: "#E4405F", getUrl: (_text: string) => `instagram://` },
];

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

  const [showShare, setShowShare] = useState(false);

  const handleShare = async (channel: typeof shareChannels[0]) => {
    // Copy to clipboard first so it's ready to paste
    await navigator.clipboard.writeText(message);
    if (channel.name === "Instagram") {
      // Instagram doesn't support direct text share, copy and open app
      window.open(channel.getUrl(message), "_blank");
    } else {
      window.open(channel.getUrl(message), "_blank");
    }
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
        <Button onClick={handleCopy} variant="default" size="lg" className="flex-1">
          {copied ? (
            <><Check className="w-5 h-5" />{t("copied")}</>
          ) : (
            <><Copy className="w-5 h-5" />{t("copyToClipboard")}</>
          )}
        </Button>

        <Button
          onClick={() => setShowShare(!showShare)}
          variant={showShare ? "secondary" : "outline"}
          size="lg"
          className="px-4"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </Button>

        {onRegenerate && (
          <Button onClick={onRegenerate} variant="outline" size="lg" className="px-4" title={t("regenerate")}>
            <RefreshCw className="w-5 h-5" />
          </Button>
        )}
      </div>

      {showShare && (
        <div className="flex gap-3 justify-center pt-2 animate-scale-in">
          {shareChannels.map((channel) => (
            <button
              key={channel.name}
              onClick={() => handleShare(channel)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-secondary transition-colors"
              title={channel.name}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: channel.color + "20" }}
              >
                <img
                  src={channel.icon}
                  alt={channel.name}
                  className="w-5 h-5"
                  style={{ filter: `brightness(0) saturate(100%)` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{channel.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
