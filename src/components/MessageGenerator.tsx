import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SituationSelector, type Situation } from "./SituationSelector";
import { GoalSelector, type Goal } from "./GoalSelector";
import { ToneSelector, type Tone } from "./ToneSelector";
import { ContextInput } from "./ContextInput";
import { MessageOutput } from "./MessageOutput";
import { StepIndicator } from "./StepIndicator";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Sparkles, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface MessageGeneratorProps {
  onMessageGenerated?: (messageCount: number) => void;
}

export function MessageGenerator({ onMessageGenerated }: MessageGeneratorProps) {
  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState<Situation | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [tone, setTone] = useState<Tone | null>(null);
  const [context, setContext] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const stepLabels = [t("stepSituation"), t("stepGoal"), t("stepTone"), t("stepContext")];

  const canProceed = () => {
    switch (step) {
      case 0: return situation !== null;
      case 1: return goal !== null;
      case 2: return tone !== null;
      case 3: return context.trim().length > 5;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (!user) {
      toast({
        title: t("signIn"),
        description: t("mustBeSignedIn"),
      });
      navigate("/auth");
    } else {
      generateMessage();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const resetForm = () => {
    setStep(0);
    setSituation(null);
    setGoal(null);
    setTone(null);
    setContext("");
    setGeneratedMessage("");
    setLimitReached(false);
  };

  const generateMessage = async () => {
    setIsLoading(true);
    setGeneratedMessage("");
    setLimitReached(false);

    try {
      const response = await supabase.functions.invoke("generate-message", {
        body: { situation, goal, tone, context, language },
      });

      if (response.error) {
        throw new Error(response.error.message || t("errorGenerating"));
      }

      if (response.data.limitReached) {
        setLimitReached(true);
        toast({
          title: t("error"),
          description: response.data.error,
          variant: "destructive",
        });
        return;
      }

      setGeneratedMessage(response.data.message);
      setStep(4);

      if (onMessageGenerated && response.data.messageCount) {
        onMessageGenerated(response.data.messageCount);
      }
    } catch (error: any) {
      console.error("Error generating message:", error);

      if (error.message?.includes("5 besplatnih") || error.message?.includes("5 brezplačnih")) {
        setLimitReached(true);
      }

      toast({
        title: t("error"),
        description: error.message || t("errorGenerating"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {t("whatIsItAbout")}
            </h2>
            <SituationSelector value={situation} onChange={(s) => {
              setSituation(s);
              setGoal(null);
              setTone(null);
            }} />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {t("whatDoYouWantToAchieve")}
            </h2>
            <GoalSelector value={goal} onChange={setGoal} situation={situation} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {t("howShouldItSound")}
            </h2>
            <ToneSelector value={tone} onChange={setTone} situation={situation} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {t("describeSituation")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("describeContext")}
            </p>
            <ContextInput value={context} onChange={setContext} />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {t("yourMessage")}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                {t("newMessage")}
              </Button>
            </div>
            <MessageOutput
              message={generatedMessage}
              isLoading={isLoading}
              onRegenerate={generateMessage}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {step < 4 && (
        <div className="mb-8">
          <StepIndicator
            currentStep={step}
            totalSteps={4}
            labels={stepLabels}
          />
        </div>
      )}

      <div className="min-h-[300px]">
        {isLoading && step === 3 ? (
          <div className="space-y-4 animate-slide-up">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {t("generating")}
            </h2>
            <MessageOutput message="" isLoading={true} />
          </div>
        ) : (
          renderStep()
        )}
      </div>

      {step < 4 && !isLoading && !limitReached && (
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="outline" size="lg" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
              {t("back")}
            </Button>
          )}
          <Button
            variant={step === 3 ? "hero" : "default"}
            size="lg"
            className="flex-1"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {step === 3 ? (
              user ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t("generateMessage")}
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  {t("signInToGenerate")}
                </>
              )
            ) : (
              <>
                {t("next")}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {limitReached && (
        <div className="mt-8 p-4 bg-muted rounded-xl text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            {t("limitReached")}
          </p>
          <Button variant="hero" size="lg" className="w-full">
            {t("subscribe")}
          </Button>
          <Button variant="ghost" size="sm" onClick={resetForm}>
            {t("newMessage")} (premium)
          </Button>
        </div>
      )}
    </div>
  );
}
