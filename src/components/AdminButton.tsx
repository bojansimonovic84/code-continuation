import { useNavigate } from "react-router-dom";
import { Cog } from "lucide-react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";

/** Floating admin shortcut — rendered only for admin accounts. */
export function AdminButton() {
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => navigate("/admin")}
      className="fixed bottom-4 right-4 z-[60] gap-2 shadow-glow"
      title="Admin panel"
    >
      <Cog className="w-4 h-4" />
      Admin
    </Button>
  );
}
