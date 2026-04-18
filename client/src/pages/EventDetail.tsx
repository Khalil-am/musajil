import { useEffect, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { MusajilLogo } from "@/components/MusajilLogo";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Event, Registration } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle2, Copy, Search, Check, Undo2, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";

type EventRow = Event & { registered: number; checkedIn: number };

export default function EventDetail() {
  const [, navigate] = useLocation();
  const [, params] = useRoute<{ id: string }>("/events/:id");
  const id = params?.id;
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/login");
  }, [authLoading, isAuthenticated, navigate]);

  const { data: event, isLoading: loadingEvent } = useQuery<EventRow>({
    queryKey: ["/api/events/", id],
    queryFn: async () => {
      const res = await fetch(`/api/events/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load event");
      return res.json();
    },
    enabled: !!id && isAuthenticated,
  });

  const { data: regs = [], isLoading: loadingRegs } = useQuery<Registration[]>({
    queryKey: ["/api/events/", id, "registrations"],
    queryFn: async () => {
      const res = await fetch(`/api/events/${id}/registrations`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load registrations");
      return res.json();
    },
    enabled: !!id && isAuthenticated,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return regs;
    return regs.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.phone?.toLowerCase().includes(q) ?? false));
  }, [regs, search]);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/events/", id] });
    queryClient.invalidateQueries({ queryKey: ["/api/events/", id, "registrations"] });
    queryClient.invalidateQueries({ queryKey: ["/api/events"] });
  };

  const checkinMutation = useMutation({
    mutationFn: async (vars: { regId: string; action: "checkin" | "undo-checkin" }) => {
      const res = await apiRequest("PATCH", `/api/events/${id}/registrations/${vars.regId}`, { action: vars.action });
      return res.json();
    },
    onSuccess: invalidate,
    onError: (err: any) => toast({ title: "Action failed", description: err?.message, variant: "destructive" }),
  });

  const removeMutation = useMutation({
    mutationFn: async (regId: string) => {
      await apiRequest("DELETE", `/api/events/${id}/registrations/${regId}`);
    },
    onSuccess: invalidate,
  });

  const publicLink = typeof window !== "undefined" ? `${window.location.origin}/register-for/${id}` : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicLink);
      toast({ title: "Link copied" });
    } catch {
      toast({ title: "Copy failed", description: "Copy it manually from the field above.", variant: "destructive" });
    }
  };

  if (loadingEvent) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }
  if (!event) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <MusajilLogo variant="default" size="md" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-slate-900">{event.name}</h1>
              <Badge className={statusColor(event.status)}>{event.status}</Badge>
            </div>
            <p className="text-slate-500 text-sm">{event.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="py-4">
            <p className="text-xs uppercase text-slate-500">Starts</p>
            <p className="mt-1 text-sm text-slate-900 flex items-center gap-1"><Calendar className="w-4 h-4" />{format(new Date(event.startAt), "MMM d · h:mm a")}</p>
          </CardContent></Card>
          <Card><CardContent className="py-4">
            <p className="text-xs uppercase text-slate-500">Location</p>
            <p className="mt-1 text-sm text-slate-900 flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location || "—"}</p>
          </CardContent></Card>
          <Card><CardContent className="py-4">
            <p className="text-xs uppercase text-slate-500">Registered</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 flex items-center gap-1"><Users className="w-5 h-5 text-slate-400" />{event.registered} / {event.capacity}</p>
          </CardContent></Card>
          <Card><CardContent className="py-4">
            <p className="text-xs uppercase text-slate-500">Checked in</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-5 h-5" />{event.checkedIn}</p>
          </CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Public registration link</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input readOnly value={publicLink} className="font-mono text-sm" data-testid="input-public-link" />
            <Button onClick={copyLink} variant="outline" data-testid="button-copy-link"><Copy className="w-4 h-4 mr-1" />Copy</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
            <CardTitle className="text-base">Attendees</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, phone"
                className="pl-8 w-64"
                data-testid="input-search-attendees"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loadingRegs ? (
              <div className="py-8 flex justify-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : filtered.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                {regs.length === 0 ? "Nobody has registered yet. Share the link above." : "No matches for your search."}
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id} data-testid={`row-registration-${r.id}`}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-slate-600">{r.email}</TableCell>
                      <TableCell className="text-slate-600">{r.phone || "—"}</TableCell>
                      <TableCell className="text-slate-600 text-xs">{format(new Date(r.createdAt), "MMM d · h:mm a")}</TableCell>
                      <TableCell>
                        {r.checkedIn ? (
                          <Badge className="bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3 mr-1" />Checked in</Badge>
                        ) : (
                          <Badge variant="outline">Not yet</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {r.checkedIn ? (
                          <Button size="sm" variant="ghost" onClick={() => checkinMutation.mutate({ regId: r.id, action: "undo-checkin" })} data-testid={`button-undo-${r.id}`}>
                            <Undo2 className="w-4 h-4 mr-1" />Undo
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600" onClick={() => checkinMutation.mutate({ regId: r.id, action: "checkin" })} data-testid={`button-checkin-${r.id}`}>
                            <Check className="w-4 h-4 mr-1" />Check in
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 ml-1"
                          onClick={() => {
                            if (confirm(`Remove ${r.name} from the registration list?`)) {
                              removeMutation.mutate(r.id);
                            }
                          }}
                          data-testid={`button-remove-${r.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function statusColor(s: string) {
  if (s === "live") return "bg-emerald-100 text-emerald-700";
  if (s === "published") return "bg-blue-100 text-blue-700";
  if (s === "ended") return "bg-slate-100 text-slate-600";
  return "bg-amber-100 text-amber-700";
}
