import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginData } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { MusajilLogo } from "@/components/MusajilLogo";

export default function Login() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate("/dashboard");
  }, [authLoading, isAuthenticated, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginData) => {
    login.mutate(data, {
      onSuccess: () => {
        toast({ title: "Welcome back" });
        navigate("/dashboard");
      },
      onError: (err: any) => {
        toast({ title: "Sign in failed", description: err?.message ?? "Invalid credentials", variant: "destructive" });
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex justify-center mb-6">
          <MusajilLogo variant="default" size="lg" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 text-center">Welcome back</h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-8">Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" {...register("email")} data-testid="input-email" />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••" {...register("password")} data-testid="input-password" />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={login.isPending} data-testid="button-submit">
            {login.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">Create one</a>
        </p>
      </div>
    </div>
  );
}
