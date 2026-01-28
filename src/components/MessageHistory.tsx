import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Copy, Check, Clock, ChevronDown, ChevronUp, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageRecord {
  id: string;
  created_at: string;
  situation: string;
  goal: string;
  tone: string;
  context: string | null;
  generated_message: string;
}

export function MessageHistory() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      fetchHistory();
    }
  }, [user, isOpen]);

  const fetchHistory = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setMessages(data as MessageRecord[]);
    }
    setLoading(false);
  };

  const handleCopy = async (message: string, id: string) => {
    await navigator.clipboard.writeText(message);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("sr-Latn", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSituationLabel = (situation: string) => {
    const labels: Record<string, string> = {
      work: t("situationWork"),
      housing: t("situationHousing"),
      private: t("situationPrivate"),
      buying: t("situationBuying"),
      love: t("situationLove"),
      badnews: t("situationBadNews"),
    };
    return labels[situation] || situation;
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-muted-foreground hover:text-foreground"
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4" />
          <span className="font-medium">{t("messageHistory")}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {isOpen && (
        <div className="animate-fade-in">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              {t("loading")}
            </div>
          ) : messages.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {t("noHistory")}
            </div>
          ) : (
            <ScrollArea className="h-[300px] rounded-xl border border-border bg-card/50">
              <div className="p-3 space-y-2">
                {messages.map((msg) => (
                  <Card
                    key={msg.id}
                    className={cn(
                      "p-3 transition-all duration-200 cursor-pointer hover:shadow-medium",
                      expandedId === msg.id && "ring-2 ring-primary/20"
                    )}
                    onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(msg.created_at)}</span>
                          <span className="px-1.5 py-0.5 rounded bg-secondary text-[10px]">
                            {getSituationLabel(msg.situation)}
                          </span>
                        </div>

                        {msg.generated_message && (
                          <p className={cn(
                            "text-sm text-foreground",
                            expandedId !== msg.id && "line-clamp-2"
                          )}>
                            {msg.generated_message}
                          </p>
                        )}

                        {expandedId === msg.id && msg.context && (
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            "{msg.context}"
                          </p>
                        )}
                      </div>

                      {msg.generated_message && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(msg.generated_message!, msg.id);
                          }}
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
}
