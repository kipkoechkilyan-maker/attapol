import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    education: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - just navigate to dashboard
    localStorage.setItem("attapoll_user", JSON.stringify({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      education: form.education,
    }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-primary">
              AttapollClickPesa
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-green">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">First Name *</label>
            <Input
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="bg-secondary/50 border-border h-12"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Last Name *</label>
            <Input
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="bg-secondary/50 border-border h-12"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Level of Education *</label>
            <Select value={form.education} onValueChange={(v) => setForm({ ...form, education: v })}>
              <SelectTrigger className="bg-secondary/50 border-border h-12">
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary School</SelectItem>
                <SelectItem value="secondary">Secondary School</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email Address *</label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-secondary/50 border-border h-12"
              placeholder="Enter email"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-muted-foreground mb-1 block">Password *</label>
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-secondary/50 border-border h-12 pr-10"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.terms}
              onCheckedChange={(c) => setForm({ ...form, terms: !!c })}
              className="border-primary data-[state=checked]:bg-primary"
            />
            <span className="text-sm text-muted-foreground">Accept Our Terms and Conditions</span>
          </div>

          <Button
            type="submit"
            disabled={!form.terms}
            className="w-full h-12 gradient-green text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
