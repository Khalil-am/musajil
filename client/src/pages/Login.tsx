import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginData } from "@shared/schema";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BarChart3,
  TrendingUp,
  Shield,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { MusajilLogo } from "@/components/MusajilLogo";
import { SiGoogle, SiApple } from "react-icons/si";

const MicrosoftIcon = () => (
  <svg viewBox="0 0 21 21" className="w-5 h-5" fill="none">
    <rect x="1" y="1" width="9" height="9" fill="#F25022" />
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
    <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
  </svg>
);

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Operations Dashboard",
    description: "Monitor arrivals, capacity, and queue times as they happen.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Forecasting",
    description: "Stay ahead with AI-powered arrival predictions and risk alerts.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "PCI DSS compliant with role-based access controls.",
  },
];

const stats = [
  { value: "10,000+", label: "Events Managed" },
  { value: "2.5M+", label: "Attendees" },
  { value: "98%", label: "Satisfaction" },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login.mutateAsync(data);
      toast({ title: "Welcome back!", description: "You've been signed in successfully." });
      navigate("/dashboard");
    } catch (error: any) {
      const message = error?.message?.includes("401")
        ? "Invalid email or password"
        : "Something went wrong. Please try again.";
      toast({ title: "Sign in failed", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(125deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(15, 23, 42) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-[32px] top-20 left-20" />
          <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-[32px] bottom-20 right-20" />
        </div>

        <div className="relative flex flex-col justify-between p-12 w-full z-10">
          <div className="flex items-center" data-testid="brand-logo">
            <MusajilLogo variant="white" size="xl" />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-white font-bold text-5xl leading-[48px] [font-family:'Inter',Helvetica]">
                Welcome Back to Your
                <br />
                Event Command Center
              </h1>
              <p className="text-blue-100 text-xl leading-[32px] [font-family:'Inter',Helvetica]">
                Sign in to access real-time operations, predictive analytics, and
                <br />
                enterprise-grade event management tools.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start" data-testid={`feature-item-${index}`}>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    <h3 className="text-white font-semibold text-lg leading-7 [font-family:'Inter',Helvetica]">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 text-base leading-6 [font-family:'Inter',Helvetica]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col" data-testid={`stat-item-${index}`}>
                <span className="text-white font-bold text-3xl leading-9 [font-family:'Inter',Helvetica]">
                  {stat.value}
                </span>
                <span className="text-white/80 text-sm leading-5 [font-family:'Inter',Helvetica]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[448px] flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-slate-900 font-bold text-3xl leading-9 [font-family:'Inter',Helvetica]" data-testid="text-sign-in-title">
              Sign In
            </h2>
            <p className="text-gray-500 text-base leading-6 [font-family:'Inter',Helvetica]">
              Access your event management dashboard
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full h-auto py-4 px-7 border-2 border-slate-200 bg-white hover:bg-slate-50 rounded-lg"
                data-testid="button-google-signin"
              >
                <SiGoogle className="w-5 h-5" />
                <span className="ml-3 font-semibold text-gray-700 text-base [font-family:'Inter',Helvetica]">
                  Continue with Google
                </span>
              </Button>

              <Button
                variant="outline"
                className="w-full h-auto py-4 px-7 border-2 border-slate-200 bg-white hover:bg-slate-50 rounded-lg"
                data-testid="button-microsoft-signin"
              >
                <MicrosoftIcon />
                <span className="ml-3 font-semibold text-gray-700 text-base [font-family:'Inter',Helvetica]">
                  Continue with Microsoft
                </span>
              </Button>

              <Button
                className="w-full h-auto py-4 px-7 bg-black hover:bg-gray-900 border-2 border-black rounded-lg"
                data-testid="button-apple-signin"
              >
                <SiApple className="w-5 h-5 text-white" />
                <span className="ml-3 font-semibold text-white text-base [font-family:'Inter',Helvetica]">
                  Continue with Apple
                </span>
              </Button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-[#f8fafc] px-4 text-gray-500 text-sm [font-family:'Inter',Helvetica]">
                Or continue with email
              </span>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-700 text-sm [font-family:'Inter',Helvetica]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    className="h-auto pl-12 pr-5 py-[18px] border-2 border-slate-200 rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500"
                    data-testid="input-email"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm" data-testid="text-email-error">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-700 text-sm [font-family:'Inter',Helvetica]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-auto pl-12 pr-12 py-[18px] border-2 border-slate-200 rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500"
                    data-testid="input-password"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-4" /> : <Eye className="w-[18px] h-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm" data-testid="text-password-error">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer" data-testid="label-remember-me">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <span className="text-gray-700 text-sm [font-family:'Inter',Helvetica]">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium [font-family:'Inter',Helvetica]"
                  data-testid="link-forgot-password"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={login.isPending}
                className="w-full h-auto py-4 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-[0px_4px_6px_-4px_rgba(59,130,246,0.3),0px_10px_15px_-3px_rgba(59,130,246,0.3)]"
                data-testid="button-submit-login"
              >
                {login.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="font-semibold text-white text-base [font-family:'Inter',Helvetica]">
                      Sign In
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 text-white" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm [font-family:'Inter',Helvetica]" data-testid="text-signup-prompt">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:text-blue-600 font-semibold"
              data-testid="link-register"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Start free trial
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
