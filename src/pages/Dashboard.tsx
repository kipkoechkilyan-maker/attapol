import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Tag, User, RefreshCw, Clock, CheckCircle2, HelpCircle, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardNav from "@/components/DashboardNav";

const surveys = [
  { id: 1, name: "Attapoll Survey", questions: 7, payout: 93 },
  { id: 2, name: "AIRTEL Kenya", questions: 10, payout: 49 },
  { id: 3, name: "Safaricom Insights", questions: 12, payout: 120 },
  { id: 4, name: "M-Pesa Usage", questions: 5, payout: 65 },
  { id: 5, name: "Digital Banking", questions: 8, payout: 85 },
  { id: 6, name: "Social Media Trends", questions: 6, payout: 55 },
  { id: 7, name: "Shopping Habits Kenya", questions: 9, payout: 78 },
  { id: 8, name: "Transport Survey", questions: 4, payout: 42 },
  { id: 9, name: "Health & Wellness", questions: 11, payout: 110 },
  { id: 10, name: "Education Feedback", questions: 7, payout: 70 },
  { id: 11, name: "Food & Beverage", questions: 6, payout: 58 },
  { id: 12, name: "Tech Adoption", questions: 8, payout: 95 },
  { id: 13, name: "Entertainment Poll", questions: 5, payout: 45 },
  { id: 14, name: "Financial Literacy", questions: 10, payout: 105 },
  { id: 15, name: "Climate Awareness", questions: 7, payout: 72 },
];

const SurveyModal = ({ survey, onClose }: { survey: typeof surveys[0]; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const questions = Array.from({ length: survey.questions }, (_, i) => ({
    q: `Question ${i + 1}: ${["What is your age range?", "How often do you use mobile money?", "Rate your satisfaction with M-Pesa", "Which network do you prefer?", "How do you access the internet?", "What's your monthly income range?", "Do you use online banking?", "How often do you shop online?", "Rate your experience with Safaricom", "Which social media do you use most?", "Do you have health insurance?", "How do you commute daily?"][i % 12]}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
  }));

  const handleAnswer = (opt: string) => {
    const newAnswers = [...answers, opt];
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="bg-card rounded-xl p-8 max-w-md w-full text-center space-y-4 shadow-card">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
          <h2 className="font-display text-2xl font-bold text-primary">Survey Complete!</h2>
          <p className="text-muted-foreground">You earned <span className="text-primary font-bold">Ksh {survey.payout}</span></p>
          <Button onClick={onClose} className="gradient-green text-primary-foreground">Back to Surveys</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-xl p-6 max-w-lg w-full shadow-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-lg font-bold text-primary">{survey.name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">&times;</button>
        </div>
        <div className="mb-2 text-xs text-muted-foreground">Question {current + 1} of {questions.length}</div>
        <div className="w-full bg-secondary rounded-full h-2 mb-4">
          <div className="gradient-green h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <p className="text-foreground mb-4 font-medium">{questions[current].q}</p>
        <div className="space-y-2">
          {questions[current].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full text-left p-3 rounded-lg border border-border bg-secondary/50 hover:bg-primary/20 hover:border-primary transition-colors text-foreground"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSurvey, setActiveSurvey] = useState<typeof surveys[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      {/* Balance Card */}
      <div className="container mx-auto px-4 mt-6">
        <div className="rounded-xl bg-card border border-border p-6 shadow-card">
          <div className="text-center mb-4">
            <h2 className="font-display text-xl font-bold text-primary">Total Balance</h2>
            <p className="text-2xl font-bold text-foreground">Ksh 0.00</p>
          </div>
          <div className="border-t border-border pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" /> Your Balance: <span className="text-foreground font-bold">Ksh 0.00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" /> Loyalty Points: <span className="text-foreground font-bold">0</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={() => navigate("/profile")} className="gradient-green text-primary-foreground gap-2">
                <User className="h-4 w-4" /> Profile
              </Button>
              <Button onClick={() => navigate("/referrals")} variant="outline" className="border-primary text-primary gap-2">
                <RefreshCw className="h-4 w-4" /> Referrals
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Surveys */}
      <div className="container mx-auto px-4 mt-6 pb-8">
        <div className="rounded-xl bg-card border border-border p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Surveys For You Today</h2>
          <div className="gradient-green rounded-lg p-3 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-foreground" />
            <span className="text-sm text-primary-foreground font-medium">Surveys are automatically filtered based on your location</span>
          </div>

          <div className="space-y-3">
            {surveys.map((s) => (
              <div key={s.id} className="rounded-lg border border-border bg-secondary/30 p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-primary">{s.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><HelpCircle className="h-3.5 w-3.5" /> Questions: <span className="text-primary font-semibold">{s.questions}</span></span>
                    <span className="flex items-center gap-1">
                      <Banknote className="h-3.5 w-3.5" /> Payout:
                      <span className="gradient-green text-primary-foreground px-2 py-0.5 rounded-full text-xs font-bold">Ksh {s.payout}</span>
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveSurvey(s)}
                  className="gradient-green text-primary-foreground font-semibold"
                >
                  Take Survey
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeSurvey && <SurveyModal survey={activeSurvey} onClose={() => setActiveSurvey(null)} />}
    </div>
  );
};

export default Dashboard;
