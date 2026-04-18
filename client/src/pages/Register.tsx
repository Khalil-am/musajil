import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema, type RegisterData } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { MusajilLogo } from "@/components/MusajilLogo";

export default function Register() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading, register: registerMutation } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate("/dashboard");
  }, [authLoading, isAuthenticated, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", company: "", role: "" },
  });

  const onSubmit = (data: RegisterData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast({ title: "Account created", description: "Welcome to Musajil" });
        navigate("/dashboard");
      },
      onError: (err: any) => {
        toast({ title: "Could not create account", description: err?.message ?? "Please try again", variant: "destructive" });
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex justify-center mb-6">
          <MusajilLogo variant="default" size="lg" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 text-center">Create your account</h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-8">Start running events in minutes</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Ada Lovelace" autoComplete="name" {...register("name")} data-testid="input-name" />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" placeholder="you@company.com" autoComplete="email" {...register("email")} data-testid="input-email" />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" {...register("password")} data-testid="input-password" />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="company">Company <span className="text-slate-400">(optional)</span></Label>
            <Input id="company" placeholder="Acme Events" {...register("company")} data-testid="input-company" />
          </div>
          <div>
            <Label htmlFor="role">Role <span className="text-slate-400">(optional)</span></Label>
            <Input id="role" placeholder="Event Manager" {...register("role")} data-testid="input-role" />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={registerMutation.isPending} data-testid="button-submit">
            {registerMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
          </Button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}
