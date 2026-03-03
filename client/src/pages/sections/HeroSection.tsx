import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "/figmaAssets/background-17.svg",
    title: "Guest-First Registration",
    description:
      "Checkout-grade registration flow without forcing account creation. Multi-step forms with inline validation and clear progress indicators.",
    items: [
      "Continue as guest option",
      "SSO & social login support",
      "Real-time form validation",
    ],
  },
  {
    icon: "/figmaAssets/background-2.svg",
    title: "Offline-Tolerant CheckIcon-In",
    description:
      "QR scanning, kiosks, and badge printing that work even when connectivity drops. Multiple check-in modes for any scenario.",
    items: [
      "QR code scanning",
      "Kiosk & badge printing",
      "Manual lookup fallback",
    ],
  },
  {
    icon: "/figmaAssets/background-5.svg",
    title: "Capacity-Aware Scheduling",
    description:
      "Treat agenda and room capacity as first-class objects. Timeline views, room lists, and overflow risk detection built-in.",
    items: [
      "Real-time capacity tracking",
      "Overflow risk alerts",
      "Multi-track timeline views",
    ],
  },
  {
    icon: "/figmaAssets/background-1.svg",
    title: "Predictive Analytics",
    description:
      "Real-time forecasting linking registration to check-in to engagement to revenue. What-if simulations and confidence intervals.",
    items: [
      "Arrival curve predictions",
      "Scenario comparisons",
      "Funnel health monitoring",
    ],
  },
  {
    icon: "/figmaAssets/background.svg",
    title: "Operations Command Center",
    description:
      "Mission control for day-of operations. Live KPIs, queue times, room occupancy risk, and incident management in one dashboard.",
    items: [
      "Real-time KPI monitoring",
      "Queue & wait time tracking",
      "Incident alert feed",
    ],
  },
  {
    icon: "/figmaAssets/background-4.svg",
    title: "Enterprise Security",
    description:
      "PCI DSS compliant payments, WCAG 2.2 AA accessibility, RTL-ready, and secure session handling from day one.",
    items: [
      "PCI DSS compliance",
      "WCAG 2.2 AA accessible",
      "Role-based permissions",
    ],
  },
];

export const HeroSection = (): JSX.Element => {
  return (
    <section className="px-4 sm:px-8 md:px-20 py-16 md:py-32 bg-slate-50 flex flex-col items-center w-full">
      <div className="flex flex-col max-w-screen-xl items-center gap-16 w-full">
        <header className="flex flex-col items-center gap-4 w-full">
          <Badge
            variant="secondary"
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border-0 h-auto"
          >
            <img
              className="mr-2"
              alt="Core Features Icon"
              src="/figmaAssets/margin.svg"
            />
            <span className="font-normal text-blue-500 text-sm text-center [font-family:'Inter',Helvetica]">
              Core Features
            </span>
          </Badge>

          <h1 className="font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl text-center leading-tight max-w-4xl [font-family:'Inter',Helvetica]">
            Everything You Need to Run Flawless Events
          </h1>

          <p className="font-normal text-gray-600 text-base sm:text-lg text-center leading-7 max-w-3xl pt-2 [font-family:'Inter',Helvetica]">
            From guest-first registration to real-time operations, our platform
            handles every aspect of your event lifecycle with precision and
            intelligence.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white rounded-2xl border border-slate-200 shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]"
            >
              <CardContent className="p-8 flex flex-col gap-6">
                <img
                  className="w-14 h-14"
                  alt={`${feature.title} icon`}
                  src={feature.icon}
                />

                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-slate-900 text-xl leading-7 [font-family:'Inter',Helvetica]">
                    {feature.title}
                  </h3>

                  <p className="font-normal text-gray-600 text-base leading-6 [font-family:'Inter',Helvetica]">
                    {feature.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="font-normal text-gray-700 text-sm leading-5 [font-family:'Inter',Helvetica]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
