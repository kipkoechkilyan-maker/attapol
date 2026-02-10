import { BarChart3 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const links = [
    { label: "HOME", path: "/dashboard" },
    { label: "PROFILE", path: "/profile" },
    { label: "REFERRALS", path: "/referrals" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 gradient-green">
      <div className="container mx-auto flex items-center gap-6 px-4 py-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary-foreground" />
          <span className="font-display text-lg font-bold text-primary-foreground">
            SURVEY
          </span>
        </div>
        {links.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className={`text-sm font-semibold transition-colors ${
              location.pathname === l.path
                ? "text-primary-foreground"
                : "text-primary-foreground/70 hover:text-primary-foreground"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="ml-auto text-sm font-semibold text-primary-foreground/70 hover:text-primary-foreground"
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default DashboardNav;
