import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  MessageSquare,
  Puzzle,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Save,
  Check,
  GripVertical,
  Type,
  Mail,
  Phone,
  ChevronDown,
  CheckSquare,
  Circle,
  Calendar,
  AlignLeft,
  Upload,
  ShieldCheck,
  Bell,
  Globe,
  Info,
  LogOut,
  Menu,
  Zap,
} from "lucide-react";
import { MusajilLogo } from "@/components/MusajilLogo";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormFieldType =
  | "text"
  | "email"
  | "phone"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "date"
  | "textarea"
  | "file";

interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  subLabel: string;
  required: boolean;
  tags: string[];
}

type FormType = "guest" | "account";
type FormLayout = "single" | "multi" | "two-column";
type ValidationMode = "inline" | "submit" | "blur";

// ─── Sidebar nav items ────────────────────────────────────────────────────────

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CalendarDays, label: "Event Builder", path: "/event-builder" },
  { icon: Zap, label: "Ops Dashboard", path: "/ops" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: MessageSquare, label: "Communications", path: "/communications" },
  { icon: Puzzle, label: "Integrations", path: "/integrations" },
  { icon: Users, label: "Staff & Permissions", path: "/staff" },
];

// ─── Setup steps ─────────────────────────────────────────────────────────────

const setupSteps = [
  { label: "Event Basics", status: "completed" as const },
  { label: "Tickets & Pricing", status: "completed" as const },
  { label: "Registration Form", status: "active" as const },
  { label: "Schedule & Rooms", status: "pending" as const },
  { label: "Communications", status: "pending" as const },
  { label: "Integrations", status: "pending" as const },
  { label: "Staff & Permissions", status: "pending" as const },
  { label: "Publish Checklist", status: "pending" as const },
];

// ─── Default form fields ──────────────────────────────────────────────────────

const defaultFields: FormField[] = [
  {
    id: "1",
    type: "text",
    label: "Full Name",
    subLabel: "Text input • Required",
    required: true,
    tags: ["Required", "Inline validation"],
  },
  {
    id: "2",
    type: "email",
    label: "Email Address",
    subLabel: "Email input • Required",
    required: true,
    tags: ["Required", "Email validation", "Used for login"],
  },
  {
    id: "3",
    type: "phone",
    label: "Phone Number",
    subLabel: "Phone input • Optional",
    required: false,
    tags: ["Optional", "International format"],
  },
  {
    id: "4",
    type: "text",
    label: "Company / Organization",
    subLabel: "Text input • Optional",
    required: false,
    tags: ["Optional"],
  },
  {
    id: "5",
    type: "text",
    label: "Job Title",
    subLabel: "Text input • Optional",
    required: false,
    tags: ["Optional"],
  },
  {
    id: "6",
    type: "dropdown",
    label: "Dietary Restrictions",
    subLabel: "Multi-select • Optional",
    required: false,
    tags: ["Optional", "6 options"],
  },
];

// ─── Field Library items ──────────────────────────────────────────────────────

const fieldLibrary = [
  { icon: Type, label: "Text Input", desc: "Single line text" },
  { icon: Mail, label: "Email", desc: "Email with validation" },
  { icon: Phone, label: "Phone", desc: "International format" },
  { icon: ChevronDown, label: "Dropdown", desc: "Select options" },
  { icon: CheckSquare, label: "Checkboxes", desc: "Multiple selections" },
  { icon: Circle, label: "Radio Buttons", desc: "Single selection" },
  { icon: Calendar, label: "Date Picker", desc: "WCAG compliant" },
  { icon: AlignLeft, label: "Text Area", desc: "Multi-line text" },
  { icon: Upload, label: "File Upload", desc: "Document upload" },
];

// ─── Accessibility features ───────────────────────────────────────────────────

const accessibilityFeatures = [
  {
    label: "WCAG 2.2 AA Compliance",
    desc: "Full keyboard navigation and screen reader support",
    enabled: true,
  },
  {
    label: "High Contrast Mode",
    desc: "Enhanced visibility for low-vision users",
    enabled: true,
  },
  {
    label: "ARIA Labels",
    desc: "Proper semantic markup for assistive technologies",
    enabled: true,
  },
  {
    label: "Focus Indicators",
    desc: "Clear visual feedback for keyboard navigation",
    enabled: true,
  },
];

// ─── Toggle component ─────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Field icon helper ────────────────────────────────────────────────────────

function FieldIcon({ type }: { type: FormFieldType }) {
  const icons: Record<FormFieldType, React.ReactNode> = {
    text: <Type className="w-4 h-4 text-blue-500" />,
    email: <Mail className="w-4 h-4 text-blue-500" />,
    phone: <Phone className="w-4 h-4 text-blue-500" />,
    dropdown: <ChevronDown className="w-4 h-4 text-blue-500" />,
    checkbox: <CheckSquare className="w-4 h-4 text-blue-500" />,
    radio: <Circle className="w-4 h-4 text-blue-500" />,
    date: <Calendar className="w-4 h-4 text-blue-500" />,
    textarea: <AlignLeft className="w-4 h-4 text-blue-500" />,
    file: <Upload className="w-4 h-4 text-blue-500" />,
  };
  return (
    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
      {icons[type]}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const [, navigate] = useLocation();
  const [location] = useLocation();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-200 shrink-0">
          <MusajilLogo variant="sidebar" size="lg" />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive =
              location === item.path ||
              (item.path === "/event-builder" &&
                location.startsWith("/event-builder"));
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium font-['Inter'] w-full text-left transition-colors ${
                  isActive
                    ? "bg-blue-500/10 text-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            );
          })}

          <div className="mt-3 pt-3 border-t border-slate-200">
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium font-['Inter'] w-full text-left text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-4 h-4 shrink-0" />
              Settings
            </button>
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-slate-200 px-4 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate font-['Inter']">
                Sarah Chen
              </p>
              <p className="text-xs text-gray-500 font-['Inter']">
                Event Organizer
              </p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Setup Progress Panel ─────────────────────────────────────────────────────

function SetupProgress({
  steps,
  activeStep,
}: {
  steps: typeof setupSteps;
  activeStep: number;
}) {
  const completed = steps.filter((s) => s.status === "completed").length;
  const pct = Math.round((completed / steps.length) * 100);

  return (
    <div className="w-52 shrink-0 bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 self-start sticky top-8">
      <p className="text-sm font-bold text-slate-900 font-['Inter']">
        Setup Progress
      </p>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 font-['Inter']">
            {completed} of {steps.length} completed
          </span>
          <span className="text-sm font-bold text-blue-500 font-['Inter']">
            {pct}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 py-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              {step.status === "completed" ? (
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
              ) : step.status === "active" || i === activeStep ? (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-['Inter']">
                    {i + 1}
                  </span>
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs font-['Inter']">
                    {i + 1}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p
                className={`text-sm font-semibold font-['Inter'] leading-tight ${
                  step.status === "completed"
                    ? "text-slate-900"
                    : step.status === "active" || i === activeStep
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-500 font-['Inter'] mt-0.5">
                {step.status === "completed"
                  ? "Completed"
                  : step.status === "active" || i === activeStep
                  ? "In Progress"
                  : "Not started"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-200">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-['Inter'] transition-colors">
          <HelpCircle className="w-4 h-4" />
          Need Help?
        </button>
      </div>
    </div>
  );
}

// ─── Form Field Row ───────────────────────────────────────────────────────────

function FormFieldRow({
  field,
  onEdit,
  onDelete,
}: {
  field: FormField;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="p-5 rounded-xl border-2 border-slate-200 flex flex-col gap-3 hover:border-blue-200 transition-colors group">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-gray-300 cursor-grab group-hover:text-gray-400 transition-colors shrink-0" />
          <FieldIcon type={field.type} />
          <div>
            <p className="text-base font-bold text-slate-900 font-['Inter']">
              {field.label}
            </p>
            <p className="text-xs text-gray-500 font-['Inter']">
              {field.subLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(field.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap pl-7">
        {field.tags.map((tag, i) => (
          <div key={i} className="flex items-center gap-1">
            {i === 0 ? (
              <div
                className={`w-1.5 h-2 rounded-sm ${
                  field.required ? "bg-blue-500" : "bg-gray-400"
                }`}
              />
            ) : (
              <Check className="w-3 h-3 text-gray-400" />
            )}
            <span className="text-xs text-gray-600 font-['Inter']">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main EventBuilder component ──────────────────────────────────────────────

export default function EventBuilder() {
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeStep = 2; // Registration Form step

  // Form state
  const [formType, setFormType] = useState<FormType>("guest");
  const [formLayout, setFormLayout] = useState<FormLayout>("single");
  const [authGoogle, setAuthGoogle] = useState(true);
  const [authApple, setAuthApple] = useState(true);
  const [authMicrosoft, setAuthMicrosoft] = useState(false);
  const [authSSO, setAuthSSO] = useState(false);
  const [fields, setFields] = useState<FormField[]>(defaultFields);
  const [validationMode, setValidationMode] =
    useState<ValidationMode>("inline");

  // Consent state
  const [emailComms, setEmailComms] = useState(true);
  const [emailOptIn, setEmailOptIn] = useState<"optin" | "optout">("optin");
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [smsOptIn, setSmsOptIn] = useState<"optin" | "optout">("optin");
  const [marketingComms, setMarketingComms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState<"optin" | "optout">(
    "optin"
  );

  // Accessibility state
  const [accessFeatures, setAccessFeatures] = useState(
    accessibilityFeatures.map((f) => ({ ...f }))
  );
  const [rtlSupport, setRtlSupport] = useState(false);
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY (US)");
  const [timeFormat, setTimeFormat] = useState("12-hour (AM/PM)");

  // Field management
  const handleDeleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleEditField = (id: string) => {
    console.log("Edit field", id);
  };

  const handleAddField = (type: FormFieldType, label: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label,
      subLabel: `${label} • Optional`,
      required: false,
      tags: ["Optional"],
    };
    setFields((prev) => [...prev, newField]);
  };

  const handleAddCustomField = () => {
    handleAddField("text", "Custom Field");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main wrapper - offset for sidebar */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 lg:left-64 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="lg:hidden">
              <MusajilLogo variant="sidebar" size="lg" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-['Inter'] transition-colors">
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-['Inter'] transition-colors relative">
              <Bell className="w-4 h-4" />
              Notifications
              <span className="absolute -top-2 -right-4 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                SC
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 font-['Inter'] leading-tight">
                  Sarah Chen
                </p>
                <p className="text-xs text-gray-500 font-['Inter']">
                  Event Organizer
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-gray-600 hover:text-gray-900 font-['Inter'] transition-colors"
            >
              Dashboard
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <button className="text-sm text-gray-600 hover:text-gray-900 font-['Inter'] transition-colors">
              Events
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-sm font-medium text-slate-900 font-['Inter']">
              Create New Event
            </span>
          </div>

          {/* Page header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 font-['Inter']">
                Event Builder
              </h1>
              <p className="text-gray-600 font-['Inter'] mt-1">
                Create and configure your event with our step-by-step builder
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 font-['Inter'] transition-colors bg-white">
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 font-['Inter'] transition-colors bg-white">
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>

          {/* Content layout */}
          <div className="flex gap-6 items-start">
            {/* Setup Progress */}
            <SetupProgress steps={setupSteps} activeStep={activeStep} />

            {/* Main form area */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              {/* ── Registration Form Builder ────────────────────── */}
              <section className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-['Inter']">
                      Registration Form Builder
                    </h2>
                    <p className="text-gray-600 font-['Inter'] mt-1">
                      Design your registration form with custom fields and
                      validation
                    </p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 rounded-lg text-sm text-blue-500 hover:bg-blue-500/20 font-['Inter'] transition-colors shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                    Add Field
                  </button>
                </div>

                {/* Form Type */}
                <div>
                  <p className="text-sm font-bold text-slate-900 font-['Inter'] mb-3">
                    Form Type
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormType("guest")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formType === "guest"
                          ? "border-blue-500 bg-blue-500/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-slate-900 font-['Inter'] text-sm">
                          Guest Checkout
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-['Inter']">
                        Allow attendees to register without creating an account
                      </p>
                    </button>
                    <button
                      onClick={() => setFormType("account")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formType === "account"
                          ? "border-blue-500 bg-blue-500/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-slate-900 font-['Inter'] text-sm">
                          Account Required
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-['Inter']">
                        Require attendees to create an account to register
                      </p>
                    </button>
                  </div>
                </div>

                {/* Form Layout */}
                <div>
                  <p className="text-sm font-bold text-slate-900 font-['Inter'] mb-3">
                    Form Layout
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        {
                          value: "single",
                          label: "Single Page",
                          desc: "All fields on one page",
                        },
                        {
                          value: "multi",
                          label: "Multi-Step",
                          desc: "Split into multiple steps",
                        },
                        {
                          value: "two-column",
                          label: "Two Column",
                          desc: "Side-by-side layout",
                        },
                      ] as const
                    ).map((opt) => {
                      const isActive = formLayout === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setFormLayout(opt.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            isActive
                              ? "border-blue-500 bg-blue-500/5"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {/* Layout icon */}
                          <div className="mb-2">
                            {opt.value === "single" && (
                              <div className="flex flex-col gap-1">
                                <div
                                  className={`h-1.5 rounded-sm w-full ${
                                    isActive ? "bg-blue-500" : "bg-gray-300"
                                  }`}
                                />
                                <div
                                  className={`h-1.5 rounded-sm w-3/4 ${
                                    isActive ? "bg-blue-400" : "bg-gray-200"
                                  }`}
                                />
                              </div>
                            )}
                            {opt.value === "multi" && (
                              <div className="flex gap-1">
                                <div
                                  className={`h-4 w-4 rounded-sm ${
                                    isActive ? "bg-blue-500" : "bg-gray-300"
                                  }`}
                                />
                                <div
                                  className={`h-4 w-4 rounded-sm ${
                                    isActive ? "bg-blue-300" : "bg-gray-200"
                                  }`}
                                />
                                <div
                                  className={`h-4 w-4 rounded-sm ${
                                    isActive ? "bg-blue-200" : "bg-gray-100"
                                  }`}
                                />
                              </div>
                            )}
                            {opt.value === "two-column" && (
                              <div className="flex gap-1">
                                <div
                                  className={`h-4 flex-1 rounded-sm ${
                                    isActive ? "bg-blue-500" : "bg-gray-300"
                                  }`}
                                />
                                <div
                                  className={`h-4 flex-1 rounded-sm ${
                                    isActive ? "bg-blue-300" : "bg-gray-200"
                                  }`}
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-slate-900 font-['Inter']">
                            {opt.label}
                          </p>
                          <p className="text-xs text-gray-500 font-['Inter'] mt-0.5">
                            {opt.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Authentication Options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-slate-900 font-['Inter']">
                      Authentication Options
                    </p>
                    <span className="text-xs text-gray-400 font-['Inter'] bg-gray-100 px-2 py-0.5 rounded">
                      Optional
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-['Inter'] mb-4">
                    Allow attendees to sign in with their existing accounts for
                    faster checkout
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Google",
                        checked: authGoogle,
                        onChange: setAuthGoogle,
                      },
                      {
                        label: "Apple",
                        checked: authApple,
                        onChange: setAuthApple,
                      },
                      {
                        label: "Microsoft",
                        checked: authMicrosoft,
                        onChange: setAuthMicrosoft,
                      },
                      {
                        label: "SSO / SAML",
                        checked: authSSO,
                        onChange: setAuthSSO,
                      },
                    ].map((opt) => (
                      <label
                        key={opt.label}
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors"
                        onClick={() => opt.onChange(!opt.checked)}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                            opt.checked
                              ? "bg-blue-500"
                              : "bg-white border border-gray-400"
                          }`}
                        >
                          {opt.checked && (
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700 font-['Inter']">
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Form Fields ──────────────────────────────────── */}
              <section className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 font-['Inter']">
                    Form Fields
                  </h2>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-['Inter'] transition-colors">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={handleAddCustomField}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 rounded-lg text-sm text-blue-500 hover:bg-blue-500/20 font-['Inter'] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Field
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {fields.map((field) => (
                    <FormFieldRow
                      key={field.id}
                      field={field}
                      onEdit={handleEditField}
                      onDelete={handleDeleteField}
                    />
                  ))}
                </div>

                <button
                  onClick={handleAddCustomField}
                  className="self-center flex items-center gap-1.5 px-4 py-2 border border-dashed border-blue-300 rounded-lg text-sm text-blue-500 hover:bg-blue-50 font-['Inter'] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Custom Field
                </button>
              </section>

              {/* ── Field Library ────────────────────────────────── */}
              <section className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-['Inter']">
                    Field Library
                  </h2>
                  <p className="text-gray-600 font-['Inter'] mt-1">
                    Drag and drop fields to add them to your form
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {fieldLibrary.map((item) => (
                    <button
                      key={item.label}
                      onClick={() =>
                        handleAddField(
                          item.label
                            .toLowerCase()
                            .replace(/\s+/g, "") as FormFieldType,
                          item.label
                        )
                      }
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-left transition-all group"
                    >
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                        <item.icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 font-['Inter']">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 font-['Inter']">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* ── Validation & Error Handling ──────────────────── */}
              <section className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-['Inter']">
                    Validation & Error Handling
                  </h2>
                  <p className="text-gray-600 font-['Inter'] mt-1">
                    Configure how validation errors are displayed to attendees
                  </p>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  {(
                    [
                      {
                        value: "inline",
                        label: "Inline Validation (Recommended)",
                        desc: "Show errors next to each field as the user types. Best for user experience.",
                      },
                      {
                        value: "submit",
                        label: "On Submit Validation",
                        desc: "Show all errors at the top of the form when submit is clicked.",
                      },
                      {
                        value: "blur",
                        label: "On Blur Validation",
                        desc: "Validate each field when the user moves to the next field.",
                      },
                    ] as const
                  ).map((opt) => {
                    const isActive = validationMode === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                          isActive
                            ? "border-blue-500 bg-blue-500/5"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        onClick={() => setValidationMode(opt.value)}
                      >
                        <div className="mt-0.5 shrink-0">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isActive ? "border-blue-500" : "border-gray-400"
                            }`}
                          >
                            {isActive && (
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 font-['Inter']">
                            {opt.label}
                          </p>
                          <p className="text-sm text-gray-600 font-['Inter'] mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </section>

              {/* ── Consent & Communications ─────────────────────── */}
              <section className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-['Inter']">
                    Consent & Communications
                  </h2>
                  <p className="text-gray-600 font-['Inter'] mt-1">
                    Configure opt-in settings for emails and SMS communications
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  {/* Email Communications */}
                  <ConsentBlock
                    title="Email Communications"
                    desc="Event updates, reminders, and post-event follow-ups"
                    enabled={emailComms}
                    onToggle={setEmailComms}
                    optIn={emailOptIn}
                    onOptInChange={setEmailOptIn}
                  />

                  {/* SMS Notifications */}
                  <ConsentBlock
                    title="SMS Notifications"
                    desc="Day-of alerts, queue updates, and session reminders"
                    enabled={smsNotifs}
                    onToggle={setSmsNotifs}
                    optIn={smsOptIn}
                    onOptInChange={setSmsOptIn}
                  />

                  {/* Marketing Communications */}
                  <ConsentBlock
                    title="Marketing Communications"
                    desc="Future events, offers, and promotional content"
                    enabled={marketingComms}
                    onToggle={setMarketingComms}
                    optIn={marketingOptIn}
                    onOptInChange={setMarketingOptIn}
                  />

                  {/* GDPR notice */}
                  <div className="px-4 pt-5 pb-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base font-semibold text-slate-900 font-['Inter']">
                        GDPR & Privacy Compliance
                      </p>
                      <p className="text-sm text-gray-600 font-['Inter'] mt-1">
                        All consent options comply with GDPR, CCPA, and
                        international privacy regulations. Attendees can update
                        preferences at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Accessibility & Localization ─────────────────── */}
              <section className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-['Inter']">
                    Accessibility & Localization
                  </h2>
                  <p className="text-gray-600 font-['Inter'] mt-1">
                    Ensure your form is accessible and localized for all
                    attendees
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  {/* Accessibility Features */}
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-bold text-slate-900 font-['Inter']">
                      Accessibility Features
                    </p>
                    <div className="flex flex-col gap-3">
                      {accessFeatures.map((feat, i) => (
                        <label
                          key={feat.label}
                          className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-all"
                          onClick={() => {
                            const updated = [...accessFeatures];
                            updated[i] = {
                              ...updated[i],
                              enabled: !updated[i].enabled,
                            };
                            setAccessFeatures(updated);
                          }}
                        >
                          <div className="mt-0.5 shrink-0">
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center ${
                                feat.enabled
                                  ? "bg-blue-500"
                                  : "bg-white border border-gray-400"
                              }`}
                            >
                              {feat.enabled && (
                                <Check
                                  className="w-3 h-3 text-white"
                                  strokeWidth={3}
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 font-['Inter']">
                              {feat.label}
                            </p>
                            <p className="text-xs text-gray-500 font-['Inter'] mt-0.5">
                              {feat.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Localization Settings */}
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-bold text-slate-900 font-['Inter']">
                      Localization Settings
                    </p>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 font-['Inter'] mb-1.5">
                          Primary Language
                        </p>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-gray-50">
                          <span className="text-sm text-slate-900 font-['Inter']">
                            English (US)
                          </span>
                          <Globe className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      <label
                        className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-all"
                        onClick={() => setRtlSupport(!rtlSupport)}
                      >
                        <div className="mt-0.5 shrink-0">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center ${
                              rtlSupport
                                ? "bg-blue-500"
                                : "bg-white border border-gray-400"
                            }`}
                          >
                            {rtlSupport && (
                              <Check
                                className="w-3 h-3 text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 font-['Inter']">
                            RTL Support
                          </p>
                          <p className="text-xs text-gray-500 font-['Inter'] mt-0.5">
                            Right-to-left for Arabic, Hebrew, etc.
                          </p>
                        </div>
                      </label>

                      <div>
                        <p className="text-xs font-medium text-gray-500 font-['Inter'] mb-1.5">
                          Date Format
                        </p>
                        <select
                          value={dateFormat}
                          onChange={(e) => setDateFormat(e.target.value)}
                          className="w-full p-3 rounded-lg border border-slate-200 text-sm text-slate-900 font-['Inter'] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option>MM/DD/YYYY (US)</option>
                          <option>DD/MM/YYYY (EU)</option>
                          <option>YYYY-MM-DD (ISO)</option>
                        </select>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-500 font-['Inter'] mb-1.5">
                          Time Format
                        </p>
                        <select
                          value={timeFormat}
                          onChange={(e) => setTimeFormat(e.target.value)}
                          className="w-full p-3 rounded-lg border border-slate-200 text-sm text-slate-900 font-['Inter'] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option>12-hour (AM/PM)</option>
                          <option>24-hour</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Footer navigation ────────────────────────────── */}
              <div className="flex items-center justify-between pt-2 pb-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 font-['Inter'] transition-colors bg-white"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back: Tickets & Pricing
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium font-['Inter'] transition-colors">
                  Save & Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── ConsentBlock component ───────────────────────────────────────────────────

function ConsentBlock({
  title,
  desc,
  enabled,
  onToggle,
  optIn,
  onOptInChange,
}: {
  title: string;
  desc: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  optIn: "optin" | "optout";
  onOptInChange: (v: "optin" | "optout") => void;
}) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-base font-bold text-slate-900 font-['Inter']">
            {title}
          </p>
          <p className="text-sm text-gray-600 font-['Inter'] mt-0.5">{desc}</p>
        </div>
        <div className="pl-4 shrink-0">
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => onToggle(!enabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              enabled ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
      {enabled && (
        <div className="flex items-center gap-4">
          <label
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onOptInChange("optin")}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                optIn === "optin" ? "border-blue-500" : "border-gray-400"
              }`}
            >
              {optIn === "optin" && (
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </div>
            <span className="text-xs text-gray-700 font-['Inter']">
              Opt-in (explicit consent)
            </span>
          </label>
          <label
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onOptInChange("optout")}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                optIn === "optout" ? "border-blue-500" : "border-gray-400"
              }`}
            >
              {optIn === "optout" && (
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </div>
            <span className="text-xs text-gray-700 font-['Inter']">
              Opt-out (pre-selected)
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
