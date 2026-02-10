import { Copy, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import DashboardNav from "@/components/DashboardNav";

const Referrals = () => {
  const referralCode = "ATTAPOLL-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({ title: "Copied!", description: "Referral code copied to clipboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 mt-6 pb-8 max-w-lg">
        <div className="rounded-xl bg-card border border-border p-6 shadow-card text-center">
          <Share2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Refer & Earn</h1>
          <p className="text-muted-foreground mb-6 text-sm">Share your referral code and earn Ksh 50 for each friend who signs up!</p>

          <div className="flex gap-2 mb-6">
            <Input readOnly value={referralCode} className="bg-secondary/50 border-border text-center font-mono font-bold text-foreground" />
            <Button onClick={copyCode} variant="outline" className="border-primary text-primary shrink-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-lg bg-secondary/30 border border-border p-4">
            <div className="flex items-center gap-2 justify-center text-muted-foreground">
              <Users className="h-5 w-5" />
              <span className="text-sm">Total Referrals: <span className="text-foreground font-bold">0</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
