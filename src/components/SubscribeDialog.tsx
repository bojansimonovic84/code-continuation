import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Crown, Loader2, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SubscribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRedeemed?: () => void;
}

export function SubscribeDialog({ open, onOpenChange, onRedeemed }: SubscribeDialogProps) {
  const [loading, setLoading] = useState<"monthly" | "yearly" | "coupon" | null>(null);
  const [coupon, setCoupon] = useState("");

  const startCheckout = async (plan: "monthly" | "yearly") => {
    setLoading(plan);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      toast({
        title: "Greška",
        description: err instanceof Error ? err.message : "Pokušaj ponovo.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  const redeemCoupon = async () => {
    if (!coupon.trim()) return;
    setLoading("coupon");
    try {
      const { data, error } = await supabase.rpc("redeem_coupon", { coupon_code: coupon.trim() });
      if (error) throw error;
      if (data === true) {
        toast({ title: "Kupon iskorišćen!", description: "Premium je aktiviran." });
        onOpenChange(false);
        onRedeemed?.();
      }
    } catch (err) {
      toast({
        title: "Neispravan kupon",
        description: err instanceof Error ? err.message : "Pokušaj ponovo.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const features = [
    "Neograničeno poruka",
    "Sve situacije i tonovi",
    "Istorija poruka",
    "Prioritetna podrška",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            Otključaj Premium
          </DialogTitle>
          <DialogDescription>
            Izaberi plan koji ti odgovara. Otkaz u bilo kom trenutku.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <button
            onClick={() => startCheckout("yearly")}
            disabled={loading !== null}
            className="w-full text-left p-4 border-2 border-primary rounded-xl hover:bg-primary/5 transition relative disabled:opacity-50"
          >
            <span className="absolute -top-2 right-3 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
              Ušteda 33%
            </span>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="font-bold text-base">Godišnje</div>
                <div className="text-xs text-muted-foreground">~3.33€/mesečno</div>
              </div>
              <div className="text-2xl font-bold">39.99€<span className="text-sm font-normal text-muted-foreground">/god</span></div>
            </div>
            {loading === "yearly" && <Loader2 className="w-4 h-4 animate-spin mt-2" />}
          </button>

          <button
            onClick={() => startCheckout("monthly")}
            disabled={loading !== null}
            className="w-full text-left p-4 border border-border rounded-xl hover:bg-muted/50 transition disabled:opacity-50"
          >
            <div className="flex items-baseline justify-between">
              <div className="font-bold text-base">Mesečno</div>
              <div className="text-2xl font-bold">4.99€<span className="text-sm font-normal text-muted-foreground">/mes</span></div>
            </div>
            {loading === "monthly" && <Loader2 className="w-4 h-4 animate-spin mt-2" />}
          </button>
        </div>

        <ul className="space-y-1.5 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" /> {f}
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t">
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Tag className="w-4 h-4" /> Imaš kupon?
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Unesi kod"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={loading !== null}
            />
            <Button onClick={redeemCoupon} disabled={loading !== null || !coupon.trim()} variant="outline">
              {loading === "coupon" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aktiviraj"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
