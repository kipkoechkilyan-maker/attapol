import { useState } from "react";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DashboardNav from "@/components/DashboardNav";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const packages = [
  {
    name: "Business Basic",
    key: "basic",
    price: 200,
    surveys: 10,
    earningsMonth: 8000,
    dailyIncome: 250,
    minWithdraw: 3000,
    earningsSurvey: "Ksh 50 - 100",
  },
  {
    name: "Business Premium",
    key: "premium",
    price: 400,
    surveys: 15,
    earningsMonth: 15000,
    dailyIncome: 500,
    minWithdraw: 2500,
    earningsSurvey: "Ksh 50 - 100",
  },
  {
    name: "Business Expert",
    key: "expert",
    price: 800,
    surveys: 20,
    earningsMonth: 30000,
    dailyIncome: 1500,
    minWithdraw: 2000,
    earningsSurvey: "Ksh 50 - 100",
  },
  {
    name: "PLATINUM",
    key: "platinum",
    price: 1200,
    surveys: 40,
    earningsMonth: 60000,
    dailyIncome: 3000,
    minWithdraw: 1000,
    earningsSurvey: "Ksh 100 - 150",
  },
];

const Upgrade = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!selectedPackage || !phoneNumber) return;

    const cleanPhone = phoneNumber.replace(/\s/g, '');
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      toast({ title: "Invalid phone number", description: "Use format like 0712345678", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('lipwa-stk-push', {
        body: {
          amount: selectedPackage.price,
          phone_number: phoneNumber,
          package_name: selectedPackage.key,
        },
      });

      if (error) throw error;

      if (data?.success) {
        toast({
          title: "STK Push Sent! 📱",
          description: "Check your phone and enter your M-Pesa PIN to complete payment.",
        });
        // Optimistically set account type (in production, wait for callback)
        localStorage.setItem("attapoll_account", selectedPackage.key);
        setSelectedPackage(null);
        setPhoneNumber("");
      } else {
        throw new Error(data?.error || "Payment failed");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({
        title: "Payment Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 mt-6 pb-8">
        <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">Select Package</h1>
        <p className="text-center text-muted-foreground mb-8">Upgrade your account to unlock more surveys and earn more</p>

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
                <Button
                  onClick={() => setSelectedPackage(pkg)}
                  className="gradient-green text-primary-foreground gap-1 font-semibold"
                >
                  Pay Now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={!!selectedPackage} onOpenChange={(open) => !open && setSelectedPackage(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-primary">
              Pay for {selectedPackage?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="gradient-green rounded-lg p-4 text-center">
              <p className="text-primary-foreground text-sm font-medium">Amount to Pay</p>
              <p className="text-primary-foreground text-3xl font-bold">Ksh {selectedPackage?.price.toLocaleString()}</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">M-Pesa Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-secondary/50 border-border pl-10"
                  placeholder="0712345678"
                  maxLength={13}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Enter the M-Pesa number to receive the STK push</p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={loading || !phoneNumber}
              className="w-full gradient-green text-primary-foreground font-semibold h-12 text-base"
            >
              {loading ? "Sending STK Push..." : `Pay Ksh ${selectedPackage?.price.toLocaleString()} via M-Pesa`}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You will receive an M-Pesa prompt on your phone. Enter your PIN to complete payment.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Upgrade;
