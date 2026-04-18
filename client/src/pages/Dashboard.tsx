import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { MusajilLogo } from "@/components/MusajilLogo";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { eventSchema, type EventData, type Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Plus, Calendar, MapPin, Users, CheckCircle2, LogOut, Loader2, ExternalLink, Trash2, ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

type EventRow = Event & { registered: number; checkedIn: number };

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/login");
  }, [authLoading, isAuthenticated, navigate]);

  const { data: events = [], isLoading } = useQuery<EventRow[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load events");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const total = events.reduce((s, e) => s + e.registered, 0);
  const checked = events.reduce((s, e) => s + e.checkedIn, 0);
  const capacity = events.reduce((s, e) => s + e.capacity, 0);
  const liveCount = events.filter((e) => e.status === "live").length;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/events/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/events"] }),
  });

  const onLogout = () => {
    logout.mutate(undefined, { onSuccess: () => navigate("/") });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <MusajilLogo variant="default" size="md" />
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-600">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={onLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Your events</h1>
            <p className="text-sm text-slate-500">Create, manage, and check guests in.</p>
          </div>
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600" data-testid="button-create-event">
                <Plus className="w-4 h-4 mr-1" /> New event
              </Button>
            </DialogTrigger>
            <CreateEventDialog onCreated={() => setOpenCreate(false)} />
          </Dialog>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Kpi label="Events" value={events.length} />
          <Kpi label="Live now" value={liveCount} accent="live" />
          <Kpi label="Registered" value={total} />
          <Kpi label="Checked in" value={checked} suffix={capacity ? ` / ${capacity}` : ""} />
        </div>

        {isLoading ? (
          <div className="py-16 flex justify-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : events.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-medium text-slate-900 mb-1">No events yet</h3>
              <p className="text-sm text-slate-500 mb-4">Create your first event to start collecting registrations.</p>
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setOpenCreate(true)} data-testid="button-create-first">
                <Plus className="w-4 h-4 mr-1" /> Create event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <EventCard
                key={e.id}
                event={e}
                onOpen={() => navigate(`/events/${e.id}`)}
                onDelete={() => {
                  if (confirm(`Delete "${e.name}"? Registrations will be removed.`)) {
                    deleteMutation.mutate(e.id, {
                      onSuccess: () => toast({ title: "Event deleted" }),
                      onError: (err: any) => toast({ title: "Delete failed", description: err?.message, variant: "destructive" }),
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Kpi({ label, value, suffix, accent }: { label: string; value: number; suffix?: string; accent?: "live" }) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className={`text-2xl font-semibold mt-1 ${accent === "live" && value > 0 ? "text-emerald-600" : "text-slate-900"}`}>
          {value}{suffix ?? ""}
        </p>
      </CardContent>
    </Card>
  );
}

function statusColor(s: string) {
  if (s === "live") return "bg-emerald-100 text-emerald-700";
  if (s === "published") return "bg-blue-100 text-blue-700";
  if (s === "ended") return "bg-slate-100 text-slate-600";
  return "bg-amber-100 text-amber-700";
}

function EventCard({ event, onOpen, onDelete }: { event: EventRow; onOpen: () => void; onDelete: () => void }) {
  const pct = event.capacity > 0 ? Math.min(100, Math.round((event.registered / event.capacity) * 100)) : 0;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">{event.name}</CardTitle>
          <Badge className={statusColor(event.status)}>{event.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(event.startAt), "MMM d, yyyy · h:mm a")}</span>
        </div>
        {event.location && (
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-slate-600">
          <Users className="w-4 h-4" />
          <span>{event.registered} / {event.capacity} registered</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <CheckCircle2 className="w-4 h-4" />
          <span>{event.checkedIn} checked in</span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={onOpen} className="flex-1" data-testid={`button-open-${event.id}`}>
            Manage <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-500 hover:text-red-600" data-testid={`button-delete-${event.id}`}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CreateEventDialog({ onCreated }: { onCreated: () => void }) {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<EventData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { name: "", description: "", location: "", startAt: "", endAt: "", capacity: 100, status: "draft" },
  });

  const createMutation = useMutation({
    mutationFn: async (data: EventData) => {
      const res = await apiRequest("POST", "/api/events", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event created" });
      reset();
      onCreated();
    },
    onError: (err: any) => toast({ title: "Could not create event", description: err?.message, variant: "destructive" }),
  });

  const status = watch("status");

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>New event</DialogTitle>
        <DialogDescription>Guests register through a public page you can share.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-3">
        <div>
          <Label htmlFor="name">Event name</Label>
          <Input id="name" placeholder="Product Launch Party" {...register("name")} data-testid="input-event-name" />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={3} placeholder="What's it about?" {...register("description")} />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Riyadh HQ — Auditorium" {...register("location")} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="startAt">Starts</Label>
            <Input id="startAt" type="datetime-local" {...register("startAt")} data-testid="input-start-at" />
            {errors.startAt && <p className="mt-1 text-sm text-red-500">{errors.startAt.message}</p>}
          </div>
          <div>
            <Label htmlFor="endAt">Ends</Label>
            <Input id="endAt" type="datetime-local" {...register("endAt")} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input id="capacity" type="number" min={1} {...register("capacity")} data-testid="input-capacity" />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setValue("status", v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={createMutation.isPending} data-testid="button-submit-event">
            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create event"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
