import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { UsageIndicator } from "./UsageIndicator";
import { LogOut, User, Crown, Settings, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SubscribeDialog } from "./SubscribeDialog";

interface UserMenuProps {
  messageCount: number;
  isSubscribed: boolean;
  onSubscriptionChange?: () => void;
}

export function UserMenu({ messageCount, isSubscribed, onSubscriptionChange }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const openPortal = async () => {
    setLoadingPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      toast({
        title: "Greška",
        description: err instanceof Error ? err.message : "Pokušaj ponovo.",
        variant: "destructive",
      });
    } finally {
      setLoadingPortal(false);
    }
  };

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
        <User className="w-4 h-4 mr-2" />
        {t("signIn")}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <UsageIndicator messageCount={messageCount} isSubscribed={isSubscribed} />
      {isSubscribed ? (
        <Button variant="ghost" size="sm" onClick={openPortal} disabled={loadingPortal} title="Upravljaj pretplatom">
          {loadingPortal ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
        </Button>
      ) : (
        <Button variant="default" size="sm" onClick={() => setShowSubscribe(true)} className="gap-1">
          <Crown className="w-4 h-4" /> Premium
        </Button>
      )}
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        <LogOut className="w-4 h-4" />
      </Button>
      <SubscribeDialog
        open={showSubscribe}
        onOpenChange={setShowSubscribe}
        onRedeemed={onSubscriptionChange}
      />
    </div>
  );
}
