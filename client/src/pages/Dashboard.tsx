import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { MusajilLogo } from "@/components/MusajilLogo";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ScanLine,
  BarChart3,
  TrendingUp,
  Settings,
  HelpCircle,
  Plus,
  AlertTriangle,
  Bell,
  Cog,
  MoreVertical,
  ChevronRight,
  Radio,
  Clock,
  Activity,
  Zap,
  Printer,
  MessageSquare,
  Download,
  Menu,
  X,
  LogOut,
  MapPin,
  Puzzle,
  UserCog,
  FileBarChart,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  AlertCircle,
  Eye,
  Wifi,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CalendarDays, label: "Events", path: "/events" },
  { icon: Users, label: "Attendees", path: "/attendees" },
  { icon: ScanLine, label: "Check-In", path: "/check-in" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: TrendingUp, label: "Ops Forecast", path: "/ops-forecast" },
];

const manageItems = [
  { icon: CalendarDays, label: "Schedule", path: "/schedule" },
  { icon: MessageSquare, label: "Communications", path: "/communications" },
  { icon: Puzzle, label: "Integrations", path: "/integrations" },
  { icon: UserCog, label: "Staff & Permissions", path: "/staff" },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const arrivalData = [
  { time: "9:00", actual: 45, forecast: 50 },
  { time: "9:15", actual: 82, forecast: 80 },
  { time: "9:30", actual: 120, forecast: 115 },
  { time: "9:45", actual: 175, forecast: 160 },
  { time: "10:00", actual: 230, forecast: 210 },
  { time: "10:15", actual: 290, forecast: 270 },
  { time: "10:30", actual: 340, forecast: 330 },
  { time: "10:45", actual: 380, forecast: 380 },
  { time: "11:00", actual: 420, forecast: 420 },
  { time: "11:15", actual: 460, forecast: 460 },
  { time: "11:30", actual: 490, forecast: 500 },
  { time: "11:45", actual: 510, forecast: 540 },
  { time: "12:00", actual: 530, forecast: 580 },
  { time: "12:15", actual: null, forecast: 610 },
  { time: "12:30", actual: null, forecast: 630 },
  { time: "12:45", actual: null, forecast: 620 },
  { time: "1:00", actual: null, forecast: 590 },
];

const funnelData = [
  { name: "Visited Page", value: 5200, fill: "#93c5fd" },
  { name: "Started Registration", value: 3800, fill: "#60a5fa" },
  { name: "Completed Form", value: 2900, fill: "#3b82f6" },
  { name: "Payment", value: 1200, fill: "#2563eb" },
  { name: "Confirmed", value: 847, fill: "#1d4ed8" },
];

const registrationByType = [
  { name: "Standard", value: 51.1, color: "#3b82f6" },
  { name: "Student", value: 19.11, color: "#22c55e" },
  { name: "Staff", value: 13.49, color: "#ef4444" },
  { name: "VIP", value: 13.13, color: "#8b5cf6" },
  { name: "Speaker", value: 3.13, color: "#f59e0b" },
];

const sessionAttendance = [
  { session: "Keynote", capacity: 500, attendance: 450 },
  { session: "AI Workshop", capacity: 100, attendance: 98 },
  { session: "Design Thinking", capacity: 100, attendance: 67 },
  { session: "Product Demo", capacity: 80, attendance: 45 },
  { session: "Panel Discussion", capacity: 200, attendance: 180 },
];

const roomStatus = [
  { name: "Main Hall", subtitle: "Keynote Session", current: 450, max: 500, pct: 90, color: "#22c55e", status: "ok" },
  { name: "Breakout A", subtitle: "AI Workshop", current: 98, max: 100, pct: 98, color: "#f59e0b", status: "warn" },
  { name: "Breakout B", subtitle: "Design Thinking", current: 67, max: 100, pct: 67, color: "#3b82f6", status: "ok" },
  { name: "Breakout C", subtitle: "Product Demo", current: 45, max: 80, pct: 56, color: "#22c55e", status: "ok" },
  { name: "Registration", subtitle: "Check-In Desk", current: 12, max: null, pct: null, color: "#6b7280", status: "queue", queue: "in queue" },
];

const recentActivity = [
  { dot: "#22c55e", text: "152 attendees checked in", time: "2 minutes ago" },
  { dot: "#3b82f6", text: 'Session "AI Workshop" started', time: "8 minutes ago" },
  { dot: "#f59e0b", text: "Capacity alert: Breakout A", time: "15 minutes ago" },
  { dot: "#22c55e", text: "87 new registrations", time: "32 minutes ago" },
  { dot: "#22c55e", text: "Keynote session started", time: "1 hour ago" },
];

const scheduleData = [
  {
    time: "9:00 AM",
    session: "Registration & Coffee",
    subtitle: "Welcome & Networking",
    room: "Main Lobby",
    capacity: null,
    status: "Completed",
    statusColor: "bg-green-100 text-green-700",
    highlight: false,
  },
  {
    time: "10:00 AM",
    session: "Opening Keynote",
    subtitle: "Dr. Sarah Mitchell",
    room: "Main Hall",
    capacity: "450/500 (90%)",
    capacityColor: "text-gray-700",
    status: "In Progress",
    statusColor: "text-blue-600",
    statusDot: "#3b82f6",
    highlight: true,
  },
  {
    time: "11:30 AM",
    session: "AI & Machine Learning",
    subtitle: "Interactive Workshop",
    room: "Breakout A",
    capacity: "98/100 (98%)",
    capacityColor: "text-amber-600 font-semibold",
    status: "Near Capacity",
    statusColor: "bg-amber-100 text-amber-700",
    statusDot: undefined,
    highlight: false,
  },
  {
    time: "11:30 AM",
    session: "Design Thinking",
    subtitle: "Hands-on Session",
    room: "Breakout B",
    capacity: "67/100 (67%)",
    capacityColor: "text-gray-700",
    status: "Starting Soon",
    statusColor: "text-gray-600",
    highlight: false,
  },
  {
    time: "1:00 PM",
    session: "Networking Lunch",
    subtitle: "Catered Buffet",
    room: "Dining Hall",
    capacity: null,
    status: "Upcoming",
    statusColor: "text-gray-400",
    highlight: false,
  },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function ArrivalTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name === "actual" ? "Actual" : "Forecast"}: {p.value ?? "–"}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ mobileOpen, setMobileOpen, activeNav, setActiveNav, onLogout }: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  activeNav: string;
  setActiveNav: (v: string) => void;
  onLogout: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#e2e8f0]
        flex flex-col h-screen transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-[#e2e8f0] shrink-0">
          <MusajilLogo variant="sidebar" size="lg" />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors font-['Inter'] ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            );
          })}

          {/* Manage section */}
          <div className="pt-4 mt-2 border-t border-slate-200">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-['Inter']">Manage</p>
            {manageItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors font-['Inter'] ${
                  activeNav === item.label
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-4 pb-4 border-t border-[#e2e8f0] pt-4 flex flex-col gap-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors font-['Inter']">
            <Settings className="w-4 h-4 shrink-0" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors font-['Inter']">
            <HelpCircle className="w-4 h-4 shrink-0" />
            Help &amp; Support
          </button>

          {/* User profile */}
          <div className="flex items-center justify-between mt-2 px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">SC</div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 font-['Inter']">Sarah Chen</span>
                <span className="text-xs text-gray-500 font-['Inter']">Event Organizer</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Main Dashboard Component ─────────────────────────────────────────────────
export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [scheduleView, setScheduleView] = useState<"timeline" | "list">("timeline");

  // Redirect if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast({ title: "Logged out successfully" });
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-['Inter']">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-[#0f172a] font-['Inter']">Mission Control</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/event-builder")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors font-['Inter']"
            >
              <Plus className="w-4 h-4" />
              New Event
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <Cog className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

          {/* ── Risk Alert Banner ── */}
          {!alertDismissed && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl px-5 py-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800 font-['Inter']">2 Active Risk Alerts</p>
                  <p className="text-xs text-amber-700 mt-0.5 font-['Inter']">Predicted capacity issues require immediate attention</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full font-['Inter']">
                      <AlertTriangle className="w-3 h-3" />
                      Breakout A: 105% at 11:30 AM
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full font-['Inter']">
                      <Clock className="w-3 h-3" />
                      Registration: 12min wait predicted
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setAlertDismissed(true)}
                className="p-1 rounded hover:bg-amber-100 text-amber-600 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Active Events ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#0f172a] font-['Inter']">Active Events</h2>
              <span className="text-sm text-gray-500 font-['Inter']">Today</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* TechCon 2024 — Live */}
              <div className="bg-white border-2 border-blue-500 rounded-xl p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full font-['Inter']">
                    <Radio className="w-3 h-3" />
                    LIVE NOW
                  </span>
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="text-base font-bold text-[#0f172a] font-['Inter']">TechCon 2024</p>
                  <p className="text-xs text-gray-500 font-['Inter']">Main Convention Center</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Checked In</p>
                    <p className="text-2xl font-bold text-[#0f172a] font-['Inter']">1,923</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Capacity</p>
                    <p className="text-2xl font-bold text-amber-500 font-['Inter']">98%</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors font-['Inter']">
                  <Activity className="w-4 h-4" />
                  Open Ops Center
                </button>
              </div>

              {/* Product Launch Summit — Tomorrow */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full font-['Inter']">
                    TOMORROW
                  </span>
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="text-base font-bold text-[#0f172a] font-['Inter']">Product Launch Summit</p>
                  <p className="text-xs text-gray-500 font-['Inter']">Grand Ballroom</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Registered</p>
                    <p className="text-2xl font-bold text-[#0f172a] font-['Inter']">847</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Expected</p>
                    <p className="text-2xl font-bold text-[#0f172a] font-['Inter']">720</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 border border-[#e2e8f0] text-gray-700 hover:bg-gray-50 text-sm font-semibold py-2.5 rounded-lg transition-colors font-['Inter']">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>

              {/* Annual Training Day — Next Week */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full font-['Inter']">
                    NEXT WEEK
                  </span>
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="text-base font-bold text-[#0f172a] font-['Inter']">Annual Training Day</p>
                  <p className="text-xs text-gray-500 font-['Inter']">Corporate Campus</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Registered</p>
                    <p className="text-2xl font-bold text-[#0f172a] font-['Inter']">312</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Capacity</p>
                    <p className="text-2xl font-bold text-green-500 font-['Inter']">62%</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 border border-[#e2e8f0] text-gray-700 hover:bg-gray-50 text-sm font-semibold py-2.5 rounded-lg transition-colors font-['Inter']">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </section>

          {/* ── Two-column layout: Main + Right Panel ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
            {/* LEFT: Key Metrics + Charts */}
            <div className="flex flex-col gap-6">

              {/* Key Metrics */}
              <section>
                <h2 className="text-base font-bold text-[#0f172a] mb-4 font-['Inter']">Key Metrics — TechCon 2024</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Users, label: "Total Registered", value: "2,847", delta: "+12%", deltaColor: "text-green-600", bg: "bg-blue-50", iconColor: "text-blue-600" },
                    { icon: ScanLine, label: "Checked In", value: "1,923", delta: "+8%", deltaColor: "text-green-600", bg: "bg-green-50", iconColor: "text-green-600" },
                    { icon: AlertTriangle, label: "Venue Capacity", value: "98%", delta: "Alert", deltaColor: "text-amber-600", bg: "bg-amber-50", iconColor: "text-amber-600" },
                    { icon: Clock, label: "Avg Wait Time", value: "4.2m", delta: "—0%", deltaColor: "text-gray-500", bg: "bg-purple-50", iconColor: "text-purple-600" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center`}>
                          <m.icon className={`w-4 h-4 ${m.iconColor}`} />
                        </div>
                        <span className={`text-xs font-semibold ${m.deltaColor} font-['Inter']`}>{m.delta}</span>
                      </div>
                      <p className="text-2xl font-bold text-[#0f172a] font-['Inter']">{m.value}</p>
                      <p className="text-xs text-gray-500 mt-1 font-['Inter']">{m.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Real-Time Arrivals Chart */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#0f172a] font-['Inter']">Real-Time Arrivals</h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full font-['Inter']">
                      <Wifi className="w-3 h-3" />
                      AI Forecast Active
                    </span>
                    <span className="text-xs text-gray-500 font-['Inter']">Last Hour</span>
                  </div>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={arrivalData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} interval={2} />
                      <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                      <Tooltip content={<ArrivalTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#actualGrad)"
                        dot={false}
                        connectNulls={false}
                        name="actual"
                      />
                      <Area
                        type="monotone"
                        dataKey="forecast"
                        stroke="#a78bfa"
                        strokeWidth={2}
                        strokeDasharray="5 4"
                        fill="none"
                        dot={false}
                        name="forecast"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-0.5 bg-blue-500 rounded" />
                    <span className="text-xs text-gray-500 font-['Inter']">Actual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-0.5 bg-purple-400 rounded border-dashed border-t-2 border-purple-400" style={{ background: "none", borderTop: "2px dashed #a78bfa" }} />
                    <span className="text-xs text-gray-500 font-['Inter']">Forecast</span>
                  </div>
                </div>
              </div>

              {/* Registration Funnel */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#0f172a] font-['Inter']">Registration Funnel</h3>
                  <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1 font-['Inter']">
                    View Full Report <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {funnelData.map((item, i) => {
                    const pct = Math.round((item.value / funnelData[0].value) * 100);
                    return (
                      <div key={item.name} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-36 shrink-0 font-['Inter']">{item.name}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
                          <div
                            className="h-full rounded-full flex items-center px-3 transition-all"
                            style={{ width: `${pct}%`, backgroundColor: item.fill }}
                          >
                            <span className="text-xs font-semibold text-white font-['Inter']">{item.value.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 w-10 text-right font-['Inter']">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
                  <h3 className="text-base font-bold text-[#0f172a] font-['Inter']">Today's Schedule</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setScheduleView("timeline")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors font-['Inter'] ${
                        scheduleView === "timeline" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Timeline View
                    </button>
                    <button
                      onClick={() => setScheduleView("list")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors font-['Inter'] ${
                        scheduleView === "list" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      List View
                    </button>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 font-['Inter']">Time</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 font-['Inter']">Session</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 font-['Inter']">Room</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 font-['Inter']">Capacity</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 font-['Inter']">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-[#e2e8f0] last:border-0 ${row.highlight ? "bg-blue-50" : "hover:bg-gray-50"}`}
                      >
                        <td className="px-6 py-3.5 text-xs font-medium text-gray-600 whitespace-nowrap font-['Inter']">{row.time}</td>
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-semibold text-[#0f172a] font-['Inter']">{row.session}</p>
                          <p className="text-xs text-gray-500 font-['Inter']">{row.subtitle}</p>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-gray-600 font-['Inter']">{row.room}</td>
                        <td className="px-4 py-3.5">
                          {row.capacity ? (
                            <span className={`text-sm font-['Inter'] ${row.capacityColor}`}>{row.capacity}</span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          {row.statusColor.includes("bg-") ? (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-['Inter'] ${row.statusColor}`}>
                              {row.status}
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1.5 text-sm font-medium font-['Inter'] ${row.statusColor}`}>
                              {row.statusDot && (
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.statusDot }} />
                              )}
                              {row.status}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <button className="p-1 rounded hover:bg-gray-100 text-gray-400">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Attendee Insights */}
              <section>
                <h2 className="text-base font-bold text-[#0f172a] mb-4 font-['Inter']">Attendee Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Registration by Type */}
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-[#0f172a] mb-4 font-['Inter']">Registration by Type</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-[160px] h-[160px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={registrationByType}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={70}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {registrationByType.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col gap-2">
                        {registrationByType.map((item) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-gray-600 font-['Inter']">{item.name}</span>
                            <span className="text-xs font-semibold text-gray-800 ml-auto font-['Inter']">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Session Attendance */}
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-[#0f172a] mb-4 font-['Inter']">Session Attendance</h3>
                    <div className="h-[160px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sessionAttendance} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis dataKey="session" tick={{ fontSize: 9, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                          <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Bar dataKey="capacity" fill="#e2e8f0" radius={[3, 3, 0, 0]} barSize={18} name="Capacity" />
                          <Bar dataKey="attendance" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={18} name="Attendance" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-slate-200" />
                        <span className="text-xs text-gray-500 font-['Inter']">Capacity</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-blue-500" />
                        <span className="text-xs text-gray-500 font-['Inter']">Attendance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#0f172a] mb-4 font-['Inter']">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors font-['Inter']">
                    <ScanLine className="w-4 h-4" />
                    Open Scanner
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors font-['Inter']">
                    <Printer className="w-4 h-4" />
                    Print Badges
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors font-['Inter']">
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-[#e2e8f0] text-gray-700 hover:bg-gray-50 text-sm font-semibold py-3 rounded-xl transition-colors font-['Inter']">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col gap-6">

              {/* Room Status */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[#0f172a] mb-4 font-['Inter']">Room Status</h3>
                <div className="flex flex-col gap-3">
                  {roomStatus.map((room) => (
                    <div key={room.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: room.color }} />
                          <div>
                            <p className="text-xs font-semibold text-[#0f172a] font-['Inter']">{room.name}</p>
                            <p className="text-[10px] text-gray-400 font-['Inter']">{room.subtitle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {room.queue ? (
                            <p className="text-xs font-semibold text-gray-600 font-['Inter']">{room.current} <span className="text-gray-400 font-normal">{room.queue}</span></p>
                          ) : (
                            <>
                              <p className={`text-xs font-semibold font-['Inter'] ${room.status === "warn" ? "text-amber-600" : "text-gray-700"}`}>
                                {room.current}/{room.max}
                              </p>
                              <p className="text-[10px] text-gray-400 font-['Inter']">{room.pct}%</p>
                            </>
                          )}
                        </div>
                      </div>
                      {room.pct !== null && (
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${room.pct}%`, backgroundColor: room.color }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Forecast */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0f172a] font-['Inter']">Peak Forecast</h3>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Predicted Peak Time</p>
                    <p className="text-2xl font-bold text-[#0f172a] font-['Inter']">12:15 PM</p>
                    <p className="text-xs text-gray-400 font-['Inter']">±15 min confidence</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-['Inter']">Expected Volume</p>
                    <p className="text-2xl font-bold text-[#0f172a] font-['Inter']">847</p>
                    <p className="text-xs text-gray-400 font-['Inter']">±50 attendees</p>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 border-t border-[#e2e8f0]">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <p className="text-xs text-amber-700 font-['Inter']">Queue time: 12min predicted</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <p className="text-xs text-amber-700 font-['Inter']">Breakout A overflow risk</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0f172a] font-['Inter']">Recent Activity</h3>
                  <button className="text-blue-600 text-xs font-semibold hover:text-blue-700 font-['Inter']">View All Activity</button>
                </div>
                <div className="flex flex-col gap-3">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: item.dot }} />
                      <div>
                        <p className="text-xs text-[#0f172a] font-['Inter']">{item.text}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-['Inter']">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
