import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "/figmaAssets/margin-26.svg",
    title: "Arrival Curve Prediction",
    description:
      "Forecast attendee arrival patterns with 85%+ accuracy based on historical data and real-time signals.",
  },
  {
    icon: "/figmaAssets/margin-27.svg",
    title: "Risk Flag Alerts",
    description:
      "Automatic alerts for predicted capacity issues, queue buildups, and resource constraints.",
  },
  {
    icon: "/figmaAssets/margin-17.svg",
    title: "What-If Scenarios",
    description:
      "Run simulations to test different staffing levels, room allocations, and schedule changes.",
  },
];

const timeLabels = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM"];

const riskAlerts = [
  "Registration queue: 12min wait predicted",
  "Breakout A: 105% capacity at 11:30 AM",
];

export const PricingSection = (): JSX.Element => {
  return (
    <section className="px-28 py-32 bg-white w-full">
      <div className="flex items-center justify-center gap-16 w-full">
        <div className="flex flex-col items-start gap-4 flex-1">
          <Badge className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full text-purple-600 hover:bg-purple-50 h-auto">
            <img
              className="mr-2"
              alt="Intelligent Forecasting"
              src="/figmaAssets/margin-22.svg"
            />
            <span className="text-sm font-normal [font-family:'Inter',Helvetica]">
              Intelligent Forecasting
            </span>
          </Badge>

          <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-900 text-5xl tracking-[0] leading-[48px]">
            Ops Forecast: Predict
            <br />
            Before Problems Arise
          </h2>

          <p className="pt-2 [font-family:'Inter',Helvetica] font-normal text-gray-600 text-lg tracking-[0] leading-7">
            Our agent-based simulation engine predicts arrival peaks, queue
            <br />
            risk, and room overflow before they happen. Make data-driven
            <br />
            decisions with confidence intervals and scenario planning.
          </p>

          <div className="flex flex-col items-start gap-6 pt-4 w-full">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start w-full">
                <img
                  className="w-16 h-12 flex-shrink-0"
                  alt={feature.title}
                  src={feature.icon}
                />
                <div className="flex flex-col items-start gap-2 ml-4">
                  <h3 className="[font-family:'Inter',Helvetica] font-normal text-slate-900 text-lg tracking-[0] leading-7">
                    {feature.title}
                  </h3>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[0] leading-6">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 p-8 flex-1 rounded-2xl border border-solid border-purple-100 bg-[linear-gradient(131deg,rgba(250,245,255,1)_0%,rgba(239,246,255,1)_100%)] relative">
          <div className="w-full h-full rounded-2xl shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] absolute top-0 left-0 bg-[#ffffff01] pointer-events-none" />

          <Card className="w-full bg-white rounded-xl border-0 relative z-10">
            <div className="w-full h-full rounded-xl shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] absolute top-0 left-0 bg-[#ffffff01] pointer-events-none" />
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-900 text-lg tracking-[0] leading-7">
                  Predicted Arrivals
                </h3>
                <Badge className="px-3 py-1 bg-purple-100 rounded-full text-purple-700 hover:bg-purple-100 h-auto">
                  <span className="text-xs font-normal [font-family:'Inter',Helvetica]">
                    Live Forecast
                  </span>
                </Badge>
              </div>

              <div className="flex h-48 items-end justify-between">
                {timeLabels.map((time, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center pt-2 ${
                      index === 0 ? "w-[59.14px]" : "w-[67.14px] pl-2"
                    }`}
                  >
                    <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xs tracking-[0] leading-4">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="relative w-full h-[244px] z-10">
            <Card className="absolute w-[calc(50%_-_12px)] top-0 left-0 h-28 bg-white rounded-xl border-0">
              <div className="w-full h-full rounded-xl shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] absolute top-0 left-0 bg-[#ffffff01] pointer-events-none" />
              <CardContent className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[0] leading-5">
                    Peak Time
                  </span>
                  <img
                    className="flex-shrink-0"
                    alt="Peak Time Icon"
                    src="/figmaAssets/container-1.svg"
                  />
                </div>
                <div>
                  <div className="[font-family:'Inter',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8">
                    12:15 PM
                  </div>
                  <div className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs tracking-[0] leading-4 mt-1">
                    ±15 min confidence
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute w-[calc(50%_-_12px)] top-0 right-0 h-28 bg-white rounded-xl border-0">
              <div className="w-full h-full rounded-xl shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] absolute top-0 left-0 bg-[#ffffff01] pointer-events-none" />
              <CardContent className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[0] leading-5">
                    Peak Volume
                  </span>
                  <img
                    className="flex-shrink-0"
                    alt="Peak Volume Icon"
                    src="/figmaAssets/container-2.svg"
                  />
                </div>
                <div>
                  <div className="[font-family:'Inter',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8">
                    847
                  </div>
                  <div className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs tracking-[0] leading-4 mt-1">
                    ±50 attendees
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute w-full top-32 left-0 bg-white rounded-xl border-0">
              <div className="w-full h-full rounded-xl shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] absolute top-0 left-0 bg-[#ffffff01] pointer-events-none" />
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-slate-900 text-sm tracking-[0] leading-5">
                    Risk Alerts
                  </span>
                  <Badge className="px-2 py-1 bg-[#f59e0b1a] rounded text-amber-500 hover:bg-[#f59e0b1a] h-auto">
                    <span className="text-xs font-normal [font-family:'Inter',Helvetica]">
                      2 Active
                    </span>
                  </Badge>
                </div>

                <div className="flex flex-col items-start gap-2">
                  {riskAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center w-full">
                      <img
                        className="flex-shrink-0"
                        alt="Alert Icon"
                        src="/figmaAssets/margin-14.svg"
                      />
                      <span className="ml-2 [font-family:'Inter',Helvetica] font-normal text-gray-700 text-sm tracking-[0] leading-5">
                        {alert}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
