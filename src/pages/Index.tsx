import { useState, useEffect } from "react";
import { MessageGenerator } from "@/components/MessageGenerator";
import { MessageHistory } from "@/components/MessageHistory";
import { UserMenu } from "@/components/UserMenu";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquareText } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const [messageCount, setMessageCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const { data, error } = await supabase.rpc("get_user_message_count", {
          p_user_id: user.id,
        });

        if (!error && data !== null) {
          setMessageCount(data);
        }
      };

      fetchUserData();
    } else {
      setMessageCount(0);
      setIsSubscribed(false);
    }
  }, [user]);

  const handleMessageGenerated = (newCount: number) => {
    setMessageCount(newCount);
  };

  return (
    <div className="min-h-screen gradient-surface">
      {/* Header */}
      <header className="pt-6 pb-4 px-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <MessageSquareText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Poruke.AI
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("tagline")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            {!loading && (
              <UserMenu messageCount={messageCount} isSubscribed={isSubscribed} />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 px-4">
        <MessageGenerator onMessageGenerated={handleMessageGenerated} />
        <MessageHistory />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 px-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-center text-muted-foreground">
            {user ? (
              isSubscribed ? (
                <span className="text-primary font-medium">{t("premium")} • {t("unlimited")}</span>
              ) : (
                <>
                  {t("usedMessages")}: {messageCount}/5 {t("messagesLeft")} •
                  <span className="text-primary font-medium ml-1">{t("subscribeForUnlimited")}</span>
                </>
              )
            ) : (
              <>
                {t("freeLimit")} •
                <span className="text-primary font-medium ml-1">{t("signInToStart")}</span>
              </>
            )}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
