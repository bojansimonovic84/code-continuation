import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { UsageIndicator } from "./UsageIndicator";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  messageCount: number;
  isSubscribed: boolean;
}

export function UserMenu({ messageCount, isSubscribed }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
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
    <div className="flex items-center gap-3">
      <UsageIndicator
        messageCount={messageCount}
        isSubscribed={isSubscribed}
      />
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}
