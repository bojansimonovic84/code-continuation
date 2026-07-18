import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Unesite validnu email adresu"),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera"),
});

type Mode = "login" | "register" | "forgot";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const defaultMode: Mode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signUp, resendConfirmation, user, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) navigate("/app");
  }, [user, loading, navigate]);

  const validateForm = (requirePassword: boolean) => {
    try {
      if (requirePassword) {
        authSchema.parse({ email, password });
      } else {
        z.string().email("Unesite validnu email adresu").parse(email);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === "email" || (!requirePassword && err.path.length === 0)) {
            newErrors.email = err.message;
          }
          if (err.path[0] === "password") newErrors.password = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(false)) return;
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    if (error) {
      toast({ title: t("error"), description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: t("passwordResetSent"), description: t("passwordResetSentDesc") });
    setMode("login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") return handleForgotSubmit(e);
    if (!validateForm(true)) return;

    setIsLoading(true);
    try {
      const { error } =
        mode === "login"
          ? await signIn(email, password)
          : await signUp(email, password);

      if (error) {
        let message = error.message;
        if (error.message.includes("Invalid login credentials")) {
          message = "Pogrešan email ili lozinka";
        } else if (error.message.includes("User already registered")) {
          message = "Nalog sa ovim emailom već postoji. Prijavite se ili koristite zaboravljenu lozinku."
        } else if (error.message.includes("Email not confirmed")) {
          const resend = await resendConfirmation(email);
          if (!resend.error) {
            toast({
              title: "Proverite email",
              description: "Poslali smo vam novi link za potvrdu naloga. Kliknite na link u emailu da otvorite aplikaciju.",
            });
            return;
          }
          message = "Potvrdite email adresu. Ako link nije stigao, probajte ponovo za minut.";
        }
        toast({ title: t("error"), description: message, variant: "destructive" });
      } else if (mode === "register") {
        toast({
          title: "Proverite email",
          description: "Poslali smo vam link za potvrdu naloga. Kliknite na link u emailu da aktivirate nalog i otvorite aplikaciju.",
        });
        setMode("login");
        setPassword("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t("pleaseWait")}</div>
      </div>
    );
  }

  const title =
    mode === "login" ? "Prijavite se" : mode === "register" ? "Kreirajte nalog" : t("resetPassword");
  const desc =
    mode === "login"
      ? "Unesite vaše podatke za prijavu"
      : mode === "register"
      ? "Besplatno dobijate 5 poruka"
      : t("enterEmailForReset");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("back")}
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="font-display text-2xl">{title}</CardTitle>
              <CardDescription className="mt-2">{desc}</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="vas@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {mode !== "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPw ? t("hidePassword") : t("showPassword")}
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  {mode === "login" && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => { setMode("forgot"); setErrors({}); }}
                        className="text-xs text-primary hover:underline"
                      >
                        {t("forgotPassword")}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading
                  ? t("pleaseWait")
                  : mode === "login"
                  ? t("signIn")
                  : mode === "register"
                  ? t("signUp")
                  : t("sendResetLink")}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              {mode === "forgot" ? (
                <button
                  type="button"
                  onClick={() => { setMode("login"); setErrors({}); }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← {t("signIn")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setErrors({});
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {mode === "login"
                    ? "Nemate nalog? Registrujte se"
                    : "Već imate nalog? Prijavite se"}
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
