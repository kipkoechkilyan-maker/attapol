import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardNav from "@/components/DashboardNav";

const packages = [
  {
    name: "Business Basic",
    price: 200,
    surveys: 10,
    earningsMonth: 8000,
    dailyIncome: 250,
    minWithdraw: 3000,
    earningsSurvey: "Ksh 50 - 100",
  },
  {
    name: "Business Premium",
    price: 400,
    surveys: 15,
    earningsMonth: 15000,
    dailyIncome: 500,
    minWithdraw: 2500,
    earningsSurvey: "Ksh 50 - 100",
  },
  {
    name: "Business Expert",
    price: 800,
    surveys: 20,
    earningsMonth: 30000,
    dailyIncome: 1500,
    minWithdraw: 2000,
    earningsSurvey: "Ksh 50 - 100",
  },
  {
    name: "PLATINUM",
    price: 1200,
    surveys: 40,
    earningsMonth: 60000,
    dailyIncome: 3000,
    minWithdraw: 1000,
    earningsSurvey: "Ksh 100 - 150",
  },
];

const Upgrade = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 mt-6 pb-8">
        <h1 className="font-display text-2xl font-bold text-foreground text-center mb-8">Select Package</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-xl bg-card border border-border p-6 shadow-card flex flex-col"
            >
              <h2 className="font-display text-xl font-bold text-primary mb-4">{pkg.name}</h2>

              <div className="space-y-3 flex-1 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Surveys per day: <span className="text-foreground font-bold">{pkg.surveys}</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Earnings per month: <span className="text-foreground font-bold">Ksh {pkg.earningsMonth.toLocaleString()}</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Daily income: <span className="text-foreground font-bold">Ksh {pkg.dailyIncome.toLocaleString()}</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Minimum withdrawals: <span className="text-foreground font-bold">Ksh {pkg.minWithdraw.toLocaleString()}</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Earnings per survey: <span className="text-foreground font-bold">{pkg.earningsSurvey}</span></span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-lg font-bold text-foreground">Ksh {pkg.price.toLocaleString()}</span>
                <Button className="gradient-green text-primary-foreground gap-1 font-semibold">
                  Start now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
