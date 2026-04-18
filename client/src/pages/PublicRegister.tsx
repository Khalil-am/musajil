import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationData } from "@shared/schema";
import { MusajilLogo } from "@/components/MusajilLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Loader2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

type PublicEvent = {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  startAt: string;
  endAt: string | null;
  capacity: number;
  status: string;
  registered: number;
  seatsLeft: number;
  full: boolean;
};

export default function PublicRegister() {
  const [, params] = useRoute<{ id: string }>("/register-for/:id");
  const id = params?.id;
  const [done, setDone] = useState(false);

  const { data: event, isLoading, error } = useQuery<PublicEvent>({
    queryKey: ["/api/events/", id, "public"],
    queryFn: async () => {
      const res = await fetch(`/api/events/${id}/public`);
      if (res.status === 404) throw new Error("Event not found");
      if (!res.ok) throw new Error("Failed to load event");
      return res.json();
    },
    enabled: !!id,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const submit = useMutation({
    mutationFn: async (data: RegistrationData) => {
      const res = await fetch(`/api/events/${id}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Error ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => setDone(true),
    onError: (e: any) => setServerError(e?.message ?? "Something went wrong"),
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }
  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full"><CardContent className="py-12 text-center">
          <h2 className="text-lg font-semibold text-slate-900">Event not found</h2>
          <p className="text-sm text-slate-500 mt-2">Double-check the link you were sent.</p>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-6"><MusajilLogo variant="default" size="lg" /></div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{event.name}</CardTitle>
            {event.description && <p className="text-sm text-slate-500">{event.description}</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700"><Calendar className="w-4 h-4" />{format(new Date(event.startAt), "MMM d · h:mm a")}</div>
              {event.location && <div className="flex items-center gap-2 text-slate-700"><MapPin className="w-4 h-4" />{event.location}</div>}
              <div className="flex items-center gap-2 text-slate-700"><Users className="w-4 h-4" />{event.seatsLeft} seats left</div>
            </div>

            {done ? (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-medium text-slate-900">You're in!</p>
                <p className="text-sm text-slate-600 mt-1">A confirmation message will follow. See you at the event.</p>
              </div>
            ) : event.full ? (
              <p className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 text-center">
                This event is fully booked.
              </p>
            ) : (
              <form onSubmit={handleSubmit((d) => { setServerError(null); submit.mutate(d); })} className="space-y-3">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Your name" {...register("name")} data-testid="input-name" />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" {...register("email")} data-testid="input-email" />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone <span className="text-slate-400">(optional)</span></Label>
                  <Input id="phone" placeholder="+966 …" {...register("phone")} data-testid="input-phone" />
                </div>
                {serverError && <p className="text-sm text-red-500">{serverError}</p>}
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={submit.isPending} data-testid="button-submit">
                  {submit.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
