import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema, type RegisterData } from "@shared/schema";
import { SiGoogle, SiApple } from "react-icons/si";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  UserCircle,
  Users,
  ArrowRight,
  Loader2,
  UserCheck,
  TrendingUp,
  Shield,
  ShieldCheck,
  Accessibility,
  LockKeyhole,
  ChevronDown,
} from "lucide-react";
import { MusajilLogo } from "@/components/MusajilLogo";

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
    <path d="M10 1H1V10H10V1Z" fill="#F25022" />
    <path d="M20 1H11V10H20V1Z" fill="#7FBA00" />
    <path d="M10 11H1V20H10V11Z" fill="#00A4EF" />
    <path d="M20 11H11V20H20V11Z" fill="#FFB900" />
  </svg>
);

const features = [
  {
    icon: UserCheck,
    title: "Guest-First Registration",
    description: "No forced account creation. Checkout-grade experience from start to finish.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Real-time forecasting with 85%+ accuracy for arrival patterns and capacity.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "PCI DSS compliant, WCAG 2.2 AA accessible, and RTL-ready from day one.",
  },
];

const stats = [
  { value: "10,000+", label: "Events Managed" },
  { value: "2.5M+", label: "Attendees" },
  { value: "98%", label: "Satisfaction" },
];

const roleOptions = [
  { value: "event-manager", label: "Event Manager" },
  { value: "event-planner", label: "Event Planner" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
  { value: "executive", label: "Executive" },
  { value: "other", label: "Other" },
];

const eventSizeOptions = [
  { value: "1-100", label: "1 - 100 attendees" },
  { value: "100-500", label: "100 - 500 attendees" },
  { value: "500-1000", label: "500 - 1,000 attendees" },
  { value: "1000-5000", label: "1,000 - 5,000 attendees" },
  { value: "5000+", label: "5,000+ attendees" },
];

function getPasswordStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength;
}

function getStrengthColor(level: number, current: number): string {
  if (level > current) return "bg-gray-200";
  if (current <= 1) return "bg-red-500";
  if (current === 2) return "bg-orange-500";
  if (current === 3) return "bg-yellow-500";
  return "bg-green-500";
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { register: registerMutation, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      password: "",
      role: "",
      eventSize: "",
      agreedToTerms: false as unknown as true,
      marketingOptIn: false,
    },
  });

  const watchedPassword = form.watch("password");
  const passwordStrength = useMemo(() => getPasswordStrength(watchedPassword || ""), [watchedPassword]);

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerMutation.mutateAsync(data);
      toast({ title: "Account created!", description: "Welcome to Musajil." });
      navigate("/dashboard");
    } catch (error: any) {
      const message = error?.message?.includes("409")
        ? "An account with this email already exists"
        : "Something went wrong. Please try again.";
      toast({ title: "Registration failed", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(117deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-64 h-64 bg-white rounded-full blur-[32px] top-20 left-20" />
          <div className="absolute w-96 h-96 bg-white rounded-full blur-[32px] bottom-20 right-20" />
        </div>

        <div className="relative flex flex-col justify-between p-16 w-full z-10">
          <div className="flex items-center">
            <MusajilLogo variant="white" size="lg" />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-white font-bold text-5xl leading-[48px] [font-family:'Inter',Helvetica]">
                Transform Your Events
                <br />
                Into Seamless
                <br />
                Experiences
              </h1>
              <p className="text-blue-100 text-xl leading-[32px] [font-family:'Inter',Helvetica]">
                Join thousands of event organizers who trust Musajil for
                <br />
                guest-first registration, real-time operations, and predictive
                <br />
                analytics.
              </p>
            </div>

            <div className="flex flex-col gap-6 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0 backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4 flex flex-col gap-1">
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

          <div className="flex items-center gap-8 border-t border-white/20 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-white font-bold text-3xl leading-9 [font-family:'Inter',Helvetica]">
                  {stat.value}
                </span>
                <span className="text-blue-100 text-sm leading-5 [font-family:'Inter',Helvetica]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[448px] flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-[#0f172a] font-bold text-4xl leading-10 [font-family:'Inter',Helvetica]" data-testid="text-register-title">
              Create Your Account
            </h2>
            <p className="text-[#4b5563] text-base leading-6 [font-family:'Inter',Helvetica]">
              Start managing flawless events in minutes. No credit card required.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <Label className="font-semibold text-[#374151] text-sm [font-family:'Inter',Helvetica]">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="John"
                  className="h-auto px-[18px] py-4 border-2 border-[#e2e8f0] rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500 bg-white"
                  data-testid="input-firstName"
                  {...form.register("firstName")}
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-xs" data-testid="text-firstName-error">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <Label className="font-semibold text-[#374151] text-sm [font-family:'Inter',Helvetica]">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  className="h-auto px-[18px] py-4 border-2 border-[#e2e8f0] rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500 bg-white"
                  data-testid="input-lastName"
                  {...form.register("lastName")}
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-xs" data-testid="text-lastName-error">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-[#374151] text-sm [font-family:'Inter',Helvetica]">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="john@company.com"
                  className="h-auto pl-[46px] pr-[18px] py-4 border-2 border-[#e2e8f0] rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500 bg-white"
                  data-testid="input-email"
                  {...form.register("email")}
                />
              </div>
              <p className="text-[#6b7280] text-xs leading-4 [font-family:'Inter',Helvetica]">
                We'll send your confirmation here
              </p>
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs" data-testid="text-email-error">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-[#374151] text-sm [font-family:'Inter',Helvetica]">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Your Company Inc."
                  className="h-auto pl-[46px] pr-[18px] py-4 border-2 border-[#e2e8f0] rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500 bg-white"
                  data-testid="input-company"
                  {...form.register("company")}
                />
              </div>
              {form.formState.errors.company && (
                <p className="text-red-500 text-xs" data-testid="text-company-error">
                  {form.formState.errors.company.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-[#374151] text-sm [font-family:'Inter',Helvetica]">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-auto pl-[46px] pr-[50px] py-4 border-2 border-[#e2e8f0] rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500 bg-white"
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
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 h-1 rounded-sm ${getStrengthColor(level, passwordStrength)}`}
                      data-testid={`password-strength-bar-${level}`}
                    />
                  ))}
                </div>
                <p className="text-[#6b7280] text-xs leading-4 [font-family:'Inter',Helvetica]">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs" data-testid="text-password-error">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-[#374151] text-sm [font-family:'Inter',Helvetica]">
                Your Role <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                <Select
                  onValueChange={(value) => form.setValue("role", value, { shouldValidate: true })}
                  value={form.watch("role") || undefined}
                >
                  <SelectTrigger
                    className="h-auto pl-[46px] pr-[18px] py-[14px] border-2 border-[#e2e8f0] rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500 bg-white"
                    data-testid="select-role"
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} data-testid={`option-role-${option.value}`}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {form.formState.errors.role && (
                <p className="text-red-500 text-xs" data-testid="text-role-error">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-[#374151] text-sm [font-family:'Inter',Helvetica]">
                Typical Event Size
              </Label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                <Select
                  onValueChange={(value) => form.setValue("eventSize", value)}
                  value={form.watch("eventSize") || undefined}
                >
                  <SelectTrigger
                    className="h-auto pl-[46px] pr-[18px] py-[14px] border-2 border-[#e2e8f0] rounded-lg text-base [font-family:'Inter',Helvetica] focus:border-blue-500 focus:ring-blue-500 bg-white"
                    data-testid="select-eventSize"
                  >
                    <SelectValue placeholder="Select event size" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} data-testid={`option-eventSize-${option.value}`}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={form.watch("agreedToTerms") as boolean}
                  onCheckedChange={(checked) => form.setValue("agreedToTerms", checked as true, { shouldValidate: true })}
                  className="mt-0.5 border-gray-500 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  data-testid="checkbox-terms"
                />
                <label htmlFor="terms" className="text-[#374151] text-sm leading-5 [font-family:'Inter',Helvetica] cursor-pointer">
                  I agree to the{" "}
                  <span className="font-semibold text-blue-500">Terms of Service</span>
                  {" "}and{" "}
                  <span className="font-semibold text-blue-500">Privacy Policy</span>
                </label>
              </div>
              {form.formState.errors.agreedToTerms && (
                <p className="text-red-500 text-xs" data-testid="text-terms-error">
                  {form.formState.errors.agreedToTerms.message}
                </p>
              )}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="marketing"
                  checked={form.watch("marketingOptIn") as boolean}
                  onCheckedChange={(checked) => form.setValue("marketingOptIn", checked as boolean)}
                  className="mt-0.5 border-gray-500 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  data-testid="checkbox-marketing"
                />
                <label htmlFor="marketing" className="text-[#374151] text-sm leading-5 [font-family:'Inter',Helvetica] cursor-pointer">
                  Send me product updates, event management tips, and special offers
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full h-auto py-4 bg-[#3b82f6] hover:bg-blue-600 rounded-lg shadow-[0px_4px_6px_-4px_rgba(59,130,246,0.3),0px_10px_15px_-3px_rgba(59,130,246,0.3)]"
              data-testid="button-submit-register"
            >
              {registerMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="font-bold text-white text-lg [font-family:'Inter',Helvetica]">
                    Create Account
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 text-white" />
                </>
              )}
            </Button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e2e8f0]" />
              </div>
              <div className="relative bg-[#f8fafc] px-4">
                <span className="text-[#6b7280] text-sm font-medium [font-family:'Inter',Helvetica]">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-auto py-[14px] border-2 border-[#e2e8f0] rounded-lg hover:bg-gray-50"
                data-testid="button-social-google"
              >
                <SiGoogle className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-auto py-[14px] border-2 border-[#e2e8f0] rounded-lg hover:bg-gray-50"
                data-testid="button-social-apple"
              >
                <SiApple className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-auto py-[14px] border-2 border-[#e2e8f0] rounded-lg hover:bg-gray-50"
                data-testid="button-social-microsoft"
              >
                <MicrosoftIcon />
              </Button>
            </div>

            <div className="flex items-center justify-center pt-6">
              <p className="text-[#4b5563] text-base [font-family:'Inter',Helvetica]" data-testid="text-login-prompt">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                  data-testid="link-login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-[#e2e8f0] pt-8">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6b7280]" />
                <span className="text-[#6b7280] text-sm [font-family:'Inter',Helvetica]">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Accessibility className="w-3.5 h-3.5 text-[#6b7280]" />
                <span className="text-[#6b7280] text-sm [font-family:'Inter',Helvetica]">WCAG 2.2 AA</span>
              </div>
              <div className="flex items-center gap-2">
                <LockKeyhole className="w-3.5 h-3.5 text-[#6b7280]" />
                <span className="text-[#6b7280] text-sm [font-family:'Inter',Helvetica]">256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
