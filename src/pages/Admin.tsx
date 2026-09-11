import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, RefreshCw, Search, Users, CreditCard, MessageSquareText, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FREE_LIMIT = 5;

type AdminUser = {
  user_id: string;
  email: string | null;
  signed_up_at: string;
  email_confirmed: boolean;
  last_sign_in_at: string | null;
  message_count: number;
  last_message_at: string | null;
  is_lifetime_premium: boolean;
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
};

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleString("sr-RS", { dateStyle: "short", timeStyle: "short" }) : "—";

export default function Admin() {
  const { user, loading } = useAuth();
  const { isAdmin, checking } = useIsAdmin();
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminUser[]>([]);
  const [busy, setBusy] = useState(true);
  const [q, setQ] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ ids: string[] | "all"; label: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  const load = async () => {
    setBusy(true);
    const { data } = await supabase.rpc("get_admin_users");
    setRows((data as AdminUser[]) ?? []);
    setBusy(false);
  };

  useEffect(() => {
    if (isAdmin) load();
    else if (!checking) setBusy(false);
  }, [isAdmin, checking]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => (r.email ?? "").toLowerCase().includes(s));
  }, [rows, q]);

  const stats = useMemo(() => {
    const paying = rows.filter((r) => r.subscribed || r.is_lifetime_premium).length;
    const active = rows.filter((r) => r.message_count > 0).length;
    const mustPay = rows.filter(
      (r) => !r.subscribed && !r.is_lifetime_premium && r.message_count >= FREE_LIMIT
    ).length;
    return { total: rows.length, paying, active, mustPay };
  }, [rows]);

  const runDelete = async () => {
    if (!confirm) return;
    const isAll = confirm.ids === "all";
    setDeleting(isAll ? "all" : (confirm.ids as string[])[0]);
    try {
      const { data, error } = await supabase.functions.invoke("admin-delete-users", {
        body: isAll ? { all: true } : { user_ids: confirm.ids },
      });
      if (error) throw error;
      toast({
        title: "Obrisano",
        description: `Obrisano naloga: ${data?.deleted ?? 0}${data?.failed ? `, neuspešno: ${data.failed}` : ""}`,
      });
      await load();
    } catch (err) {
      toast({
        title: "Greška",
        description: err instanceof Error ? err.message : "Pokušaj ponovo.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
      setConfirm(null);
    }
  };

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">Učitavanje…</div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-display text-2xl font-bold">Nemate pristup</h1>
        <p className="text-muted-foreground text-sm">Ova stranica je dostupna samo administratoru.</p>
        <Button variant="outline" onClick={() => navigate("/app")}>Nazad na aplikaciju</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-surface">
      <header className="px-4 pt-6 pb-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/app")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nazad
          </Button>
          <h1 className="font-display text-lg sm:text-xl font-bold">Admin panel</h1>
          <Button variant="ghost" size="sm" onClick={load} disabled={busy}>
            <RefreshCw className={`w-4 h-4 ${busy ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </header>

      <main className="px-4 pb-16 max-w-5xl mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Ukupno naloga</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.total}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Koristili app</CardTitle>
              <MessageSquareText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.active}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Plaćeni</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.paying}</CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraga po emailu…"
            className="pl-10"
          />
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left text-muted-foreground">
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Registrovan</th>
                  <th className="p-3 font-medium">Poruke</th>
                  <th className="p-3 font-medium">Poslednja aktivnost</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {busy && (
                  <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Učitavanje…</td></tr>
                )}
                {!busy && filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Nema rezultata.</td></tr>
                )}
                {!busy && filtered.map((r) => (
                  <tr key={r.user_id} className="border-b border-border/60 last:border-0">
                    <td className="p-3">
                      <div className="font-medium break-all">{r.email ?? "—"}</div>
                      {!r.email_confirmed && (
                        <span className="text-xs text-muted-foreground">nije potvrdio email</span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap text-muted-foreground">{fmt(r.signed_up_at)}</td>
                    <td className="p-3 font-medium">{r.message_count}</td>
                    <td className="p-3 whitespace-nowrap text-muted-foreground">
                      {fmt(r.last_message_at ?? r.last_sign_in_at)}
                    </td>
                    <td className="p-3">
                      {r.is_lifetime_premium ? (
                        <Badge className="gap-1"><Crown className="w-3 h-3" /> Doživotni</Badge>
                      ) : r.subscribed ? (
                        <Badge className="gap-1">
                          <Crown className="w-3 h-3" />
                          {r.subscription_tier === "yearly" ? "Godišnji" : "Mesečni"}
                        </Badge>
                      ) : r.message_count > 0 ? (
                        <Badge variant="secondary">Probao</Badge>
                      ) : (
                        <Badge variant="outline">Samo nalog</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
