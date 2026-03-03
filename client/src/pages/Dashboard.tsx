import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  ScanLine,
  Puzzle,
  MapPin,
  UserCog,
  Bell,
  FileBarChart,
  Settings,
  HelpCircle,
  Plus,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  MoreVertical,
  Radio,
  Eye,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { MusajilLogo } from "@/components/MusajilLogo";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CalendarDays, label: "Events", active: false },
  { icon: Users, label: "Attendees", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: ScanLine, label: "Check-in", active: false },
  { icon: Puzzle, label: "Integrations", active: false },
];

const manageItems = [
  { icon: MapPin, label: "Venues", active: false },
  { icon: UserCog, label: "Team Members", active: false },
  { icon: Bell, label: "Notifications", active: false },
  { icon: FileBarChart, label: "Staff & Permissions", active: false },
];

const bottomItems = [
  { icon: Settings, label: "Settings", active: false },
  { icon: HelpCircle, label: "Help & Support", active: false },
];

const events = [
  {
    id: 1,
    name: "TechCon 2024",
    location: "Main Convention Center",
    status: "live",
    statusLabel: "Live Now",
    statusColor: "text-emerald-500",
    borderColor: "border-emerald-500 border-2",
    dotColor: "bg-emerald-500",
    stat1Label: "Checked In",
    stat1Value: "1,923",
    stat2Label: "Capacity",
    stat2Value: "98%",
    stat2Color: "text-amber-500",
    actionLabel: "Open Ops Center",
    actionBg: "bg-emerald-500 hover:bg-emerald-600 text-white",
    actionIcon: Radio,
  },
  {
    id: 2,
    name: "Product Launch Summit",
    location: "Grand Ballroom",
    status: "upcoming",
    statusLabel: "Tomorrow",
    statusColor: "text-blue-500",
    borderColor: "border-[#e2e8f0]",
    dotColor: "bg-blue-500",
    stat1Label: "Registered",
    stat1Value: "847",
    stat2Label: "Expected",
    stat2Value: "720",
    stat2Color: "text-[#0f172a]",
    actionLabel: "View Details",
    actionBg: "bg-[#f8fafc] hover:bg-gray-100 text-[#0f172a]",
    actionIcon: Eye,
  },
  {
    id: 3,
    name: "Annual Gala Dinner",
    location: "Riverside Hotel",
    status: "scheduled",
    statusLabel: "Dec 15",
    statusColor: "text-gray-500",
    borderColor: "border-[#e2e8f0]",
    dotColor: "bg-gray-400",
    stat1Label: "Registered",
    stat1Value: "312",
    stat2Label: "Capacity",
    stat2Value: "62%",
    stat2Color: "text-emerald-500",
    actionLabel: "View Details",
    actionBg: "bg-[#f8fafc] hover:bg-gray-100 text-[#0f172a]",
    actionIcon: Eye,
  },
];

const kpiCards = [
  {
    label: "Total Registered",
    value: "2,847",
    change: "12%",
    changeDir: "up" as const,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: Users,
  },
  {
    label: "Checked In",
    value: "1,923",
    change: "8%",
    changeDir: "up" as const,
    bgColor: "bg-green-100",
    iconColor: "text-green-500",
    icon: ScanLine,
  },
  {
    label: "Venue Capacity",
    value: "98%",
    change: "Alert",
    changeDir: "alert" as const,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: AlertTriangle,
    borderColor: "border-amber-500",
  },
  {
    label: "Avg Wait Time",
    value: "4.2m",
    change: "15%",
    changeDir: "down" as const,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: Clock,
  },
];

const arrivalData = [
  { time: "8AM", actual: 120, predicted: 100 },
  { time: "9AM", actual: 350, predicted: 320 },
  { time: "10AM", actual: 580, predicted: 540 },
  { time: "11AM", actual: 720, predicted: 700 },
  { time: "12PM", actual: 850, predicted: 820 },
  { time: "1PM", actual: 920, predicted: 950 },
  { time: "2PM", actual: 1050, predicted: 1020 },
  { time: "3PM", actual: 1180, predicted: 1150 },
  { time: "4PM", actual: 1350, predicted: 1300 },
  { time: "5PM", actual: 1500, predicted: 1450 },
];

const registrationData = [
  { day: "Mon", registrations: 45 },
  { day: "Tue", registrations: 72 },
  { day: "Wed", registrations: 58 },
  { day: "Thu", registrations: 95 },
  { day: "Fri", registrations: 120 },
  { day: "Sat", registrations: 85 },
  { day: "Sun", registrations: 60 },
];

const capacityData = [
  { name: "Occupied", value: 1923, color: "#3b82f6" },
  { name: "Remaining", value: 77, color: "#e2e8f0" },
];

const recentActivity = [
  { name: "Sarah Johnson", action: "checked in", time: "2 min ago", event: "TechCon 2024" },
  { name: "Mike Chen", action: "registered", time: "5 min ago", event: "Product Launch Summit" },
  { name: "Emily Davis", action: "checked in", time: "8 min ago", event: "TechCon 2024" },
  { name: "Alex Rivera", action: "registered", time: "12 min ago", event: "Annual Gala Dinner" },
  { name: "Jordan Lee", action: "checked in", time: "15 min ago", event: "TechCon 2024" },
  { name: "Pat Williams", action: "registered", time: "18 min ago", event: "TechCon 2024" },
];

function Sidebar({ activeNav, setActiveNav, user, onLogout, mobileOpen, setMobileOpen }: {
  activeNav: string;
  setActiveNav: (n: string) => void;
  user: any;
  onLogout: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#e2e8f0] flex flex-col h-screen
        transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-[#e2e8f0] shrink-0">
          <MusajilLogo variant="sidebar" size="lg" />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium [font-family:'Inter',Helvetica] w-full text-left transition-colors ${
                  isActive ? "bg-[#3b82f6] text-white" : "text-[#374151] hover:bg-gray-100"
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}

          <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
            <p className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider [font-family:'Inter',Helvetica]">Manage</p>
            {manageItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium [font-family:'Inter',Helvetica] w-full text-left transition-colors ${
                  activeNav === item.label ? "bg-[#3b82f6] text-white" : "text-[#374151] hover:bg-gray-100"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium [font-family:'Inter',Helvetica] w-full text-left transition-colors ${
                  activeNav === item.label ? "bg-[#3b82f6] text-white" : "text-[#374151] hover:bg-gray-100"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-[#e2e8f0] px-4 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              {user?.name ? user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0f172a] truncate [font-family:'Inter',Helvetica]" data-testid="text-user-name">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-[#6b7280] [font-family:'Inter',Helvetica]">Event Organizer</p>
            </div>
            <button onClick={onLogout} className="text-gray-400 hover:text-gray-600 p-1" data-testid="button-logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Dashboard() {
  const { user, logout, isLoading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [timeRange, setTimeRange] = useState("Today");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast({ title: "Signed out", description: "You've been signed out successfully." });
      navigate("/login");
    } catch {
      toast({ title: "Error", description: "Failed to sign out.", variant: "destructive" });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        user={user}
        onLogout={handleLogout}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#e2e8f0] h-16 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="button-mobile-menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-[#0f172a] text-2xl [font-family:'Inter',Helvetica]" data-testid="text-page-title">
              Mission Control
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-[#3b82f6] hover:bg-blue-600 gap-2 text-white"
              data-testid="button-new-event"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Event</span>
            </Button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100" data-testid="button-notifications">
              <Bell className="w-[18px] h-[18px] text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100" data-testid="button-user-menu">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                {user?.name ? user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "U"}
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="flex flex-col gap-6 max-w-[1200px]">
            {!alertDismissed && (
              <div
                className="rounded-xl p-4 shadow-lg relative overflow-hidden"
                style={{ backgroundImage: "linear-gradient(to right, #f59e0b, #f97316)" }}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-white shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg [font-family:'Inter',Helvetica]" data-testid="text-alert-title">
                      2 Active Risk Alerts
                    </h3>
                    <p className="text-white/90 text-sm mt-1 [font-family:'Inter',Helvetica]">
                      Predicted capacity issues require immediate attention
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-white text-xs font-medium transition-colors" data-testid="button-alert-action-1">
                        <AlertTriangle className="w-3 h-3" />
                        Main Hall: 92% capacity predicted by 3PM
                      </button>
                      <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-white text-xs font-medium transition-colors" data-testid="button-alert-action-2">
                        <AlertTriangle className="w-3 h-3" />
                        VIP Lounge: Queue time exceeding 8 minutes
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setAlertDismissed(true)}
                    className="text-white/80 hover:text-white p-1"
                    data-testid="button-dismiss-alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#0f172a] text-lg [font-family:'Inter',Helvetica]">Your Events</h2>
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-white border border-[#e2e8f0] rounded-lg px-4 py-2 pr-8 text-sm font-medium text-[#374151] [font-family:'Inter',Helvetica] cursor-pointer"
                  data-testid="select-time-range"
                >
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                  <option value="All Time">All Time</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`bg-white border ${event.borderColor} rounded-xl p-6 shadow-md relative`}
                  data-testid={`card-event-${event.id}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${event.dotColor} ${event.status === "live" ? "animate-pulse" : ""}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${event.statusColor} [font-family:'Inter',Helvetica]`}>
                        {event.statusLabel}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600" data-testid={`button-event-menu-${event.id}`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-[#0f172a] text-lg [font-family:'Inter',Helvetica]" data-testid={`text-event-name-${event.id}`}>
                    {event.name}
                  </h3>
                  <p className="text-[#4b5563] text-sm mt-1 [font-family:'Inter',Helvetica]">{event.location}</p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                      <p className="text-[#4b5563] text-xs [font-family:'Inter',Helvetica]">{event.stat1Label}</p>
                      <p className="font-bold text-[#0f172a] text-xl mt-1 [font-family:'Inter',Helvetica]">{event.stat1Value}</p>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                      <p className="text-[#4b5563] text-xs [font-family:'Inter',Helvetica]">{event.stat2Label}</p>
                      <p className={`font-bold text-xl mt-1 [font-family:'Inter',Helvetica] ${event.stat2Color}`}>{event.stat2Value}</p>
                    </div>
                  </div>
                  <button
                    className={`w-full mt-4 py-2 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-colors ${event.actionBg} [font-family:'Inter',Helvetica]`}
                    data-testid={`button-event-action-${event.id}`}
                  >
                    <event.actionIcon className="w-4 h-4" />
                    {event.actionLabel}
                  </button>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-bold text-[#0f172a] text-lg mb-4 [font-family:'Inter',Helvetica]">
                Key Metrics - TechCon 2024
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map((kpi, index) => (
                  <div
                    key={index}
                    className={`bg-white border ${kpi.borderColor || "border-[#e2e8f0]"} rounded-xl p-6 shadow-md`}
                    data-testid={`card-kpi-${index}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kpi.bgColor}`}>
                        <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
                      </div>
                      <div className="flex items-center gap-1">
                        {kpi.changeDir === "up" && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />}
                        {kpi.changeDir === "down" && <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />}
                        {kpi.changeDir === "alert" && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                        <span className={`text-sm font-semibold [font-family:'Inter',Helvetica] ${
                          kpi.changeDir === "alert" ? "text-amber-500" : "text-emerald-500"
                        }`}>
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <p className="font-bold text-[#0f172a] text-3xl [font-family:'Inter',Helvetica]">{kpi.value}</p>
                    <p className="text-[#4b5563] text-sm mt-1 [font-family:'Inter',Helvetica]">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-[#0f172a] text-lg [font-family:'Inter',Helvetica]" data-testid="text-chart-arrivals">
                      Arrival Forecast
                    </h3>
                    <div className="flex items-center gap-4 text-xs [font-family:'Inter',Helvetica]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-0.5 bg-blue-500 rounded" />
                        <span className="text-gray-500">Actual</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-0.5 bg-blue-300 rounded border-dashed" />
                        <span className="text-gray-500">Predicted</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={arrivalData}>
                        <defs>
                          <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="predicted"
                          stroke="#93c5fd"
                          strokeDasharray="5 5"
                          fill="none"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="#3b82f6"
                          fill="url(#actualGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-[#0f172a] text-lg [font-family:'Inter',Helvetica]" data-testid="text-chart-registrations">
                      Registration Trend
                    </h3>
                    <span className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">Last 7 days</span>
                  </div>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={registrationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="registrations" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-md">
                  <h3 className="font-bold text-[#0f172a] text-lg mb-4 [font-family:'Inter',Helvetica]" data-testid="text-chart-capacity">
                    Venue Capacity
                  </h3>
                  <div className="h-[180px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={capacityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={2}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {capacityData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center -mt-4">
                    <p className="text-3xl font-bold text-[#0f172a] [font-family:'Inter',Helvetica]">96%</p>
                    <p className="text-sm text-[#4b5563] [font-family:'Inter',Helvetica]">Current occupancy</p>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-[#e2e8f0]">
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#0f172a] [font-family:'Inter',Helvetica]">1,923</p>
                      <p className="text-xs text-[#4b5563] [font-family:'Inter',Helvetica]">Inside</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#0f172a] [font-family:'Inter',Helvetica]">2,000</p>
                      <p className="text-xs text-[#4b5563] [font-family:'Inter',Helvetica]">Max</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-amber-500 [font-family:'Inter',Helvetica]">77</p>
                      <p className="text-xs text-[#4b5563] [font-family:'Inter',Helvetica]">Remaining</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-md flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#0f172a] text-lg [font-family:'Inter',Helvetica]" data-testid="text-activity-feed">
                      Recent Activity
                    </h3>
                    <button className="text-blue-500 text-sm font-medium hover:text-blue-600 [font-family:'Inter',Helvetica]" data-testid="button-view-all-activity">
                      View All
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3" data-testid={`activity-item-${index}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-semibold text-xs shrink-0 mt-0.5">
                          {activity.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm [font-family:'Inter',Helvetica]">
                            <span className="font-semibold text-[#0f172a]">{activity.name}</span>
                            {" "}
                            <span className="text-[#4b5563]">{activity.action}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-[#6b7280] [font-family:'Inter',Helvetica]">{activity.event}</span>
                            <span className="text-xs text-[#9ca3af] [font-family:'Inter',Helvetica]">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
