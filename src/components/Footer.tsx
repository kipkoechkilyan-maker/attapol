import { BarChart3 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 bg-secondary border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold text-primary">AttapollClickPesa</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © 2025 AttapollClickPesa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
