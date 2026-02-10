import { BarChart3 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-primary">
            AttapollClickPesa
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors md:block">
            Features
          </a>
          <a href="#how-it-works" className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors md:block">
            How It Works
          </a>
          <a href="#faq" className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors md:block">
            FAQ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
