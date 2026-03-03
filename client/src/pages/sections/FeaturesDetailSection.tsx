import { ArrowRightIcon, CheckIcon, PlayIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
];

const statsCards = [
  {
    value: "2,847",
    label: "Registered",
    change: "12%",
    changeColor: "text-emerald-500",
  },
  {
    value: "1,923",
    label: "Checked In",
    change: "8%",
    changeColor: "text-emerald-500",
  },
  {
    value: "98%",
    label: "Capacity",
    change: "Alert",
    changeColor: "text-amber-500",
  },
];

const roomStatus = [
  {
    name: "Main Hall",
    status: "450/500",
    bgColor: "bg-green-50",
    icon: "/figmaAssets/margin-15.svg",
  },
  {
    name: "Breakout Room A",
    status: "98/100",
    bgColor: "bg-yellow-50",
    icon: "/figmaAssets/margin-63.svg",
  },
  {
    name: "Registration Desk",
    status: "12 in queue",
    bgColor: "bg-blue-50",
    icon: "/figmaAssets/margin-70.svg",
  },
];

export const FeaturesDetailSection = (): JSX.Element => {
  return (
    <section className="pt-40 pb-32 px-28 bg-[linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(255,255,255,1)_100%)] w-full">
      <div className="flex items-center justify-center gap-16 w-full">
        <div className="flex flex-col items-start gap-6 flex-1">
          <Badge
            variant="secondary"
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border-0 hover:bg-blue-50"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="font-normal text-blue-500 text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                Enterprise-Grade Event Management
              </span>
            </div>
          </Badge>

          <h1 className="[font-family:'Inter',Helvetica] font-bold text-slate-900 text-6xl tracking-[0] leading-[60px]">
            Transform Your
            <br />
            Events Into
            <br />
            Seamless
            <br />
            Experiences
          </h1>

          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xl tracking-[0] leading-7">
            Guest-first registration, real-time operations command
            <br />
            center, and predictive analytics that turn event chaos into
            <br />
            controlled precision. From checkout to check-in, we&#39;ve got
            <br />
            you covered.
          </p>

          <div className="flex items-start gap-4 pt-2">
            <Button className="h-auto inline-flex items-center gap-2 px-8 py-[18px] bg-blue-500 rounded-lg hover:bg-blue-600 shadow-[0px_4px_6px_-4px_#3b82f64c,0px_10px_15px_-3px_#3b82f64c]">
              <span className="font-normal text-white text-base text-center tracking-[0] leading-6 [font-family:'Inter',Helvetica]">
                Start Free Trial
              </span>
              <ArrowRightIcon className="w-3.5 h-4" />
            </Button>

            <Button
              variant="outline"
              className="h-auto inline-flex items-center gap-2 px-8 py-4 bg-white rounded-lg border-2 border-slate-200 hover:bg-slate-50"
            >
              <span className="font-normal text-gray-700 text-base text-center tracking-[0] leading-6 [font-family:'Inter',Helvetica]">
                Watch Demo
              </span>
              <PlayIcon className="w-3 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-2">
            {features.map((feature, index) => (
              <div key={index} className="inline-flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-gray-600" />
                <span className="font-normal text-gray-600 text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start relative flex-1">
          <Card className="w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-[0px_25px_50px_-12px_#00000040]">
            <div className="flex items-center justify-between p-4 bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(37,99,235,1)_100%)]">
              <img
                className="flex-shrink-0"
                alt="Container"
                src="/figmaAssets/container-11.svg"
              />
              <span className="font-medium text-white text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                Live Dashboard
              </span>
            </div>

            <CardContent className="flex flex-col items-start gap-4 p-6">
              <div className="flex items-start justify-center gap-4 w-full">
                {statsCards.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col flex-1 items-start gap-1 p-4 bg-slate-50 rounded-xl"
                  >
                    <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8">
                      {stat.value}
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xs tracking-[0] leading-4">
                      {stat.label}
                    </p>
                    <div className="flex items-center gap-1 pt-1">
                      <img
                        className="flex-shrink-0"
                        alt="Margin"
                        src="/figmaAssets/margin-62.svg"
                      />
                      <span
                        className={`font-normal text-xs tracking-[0] leading-4 [font-family:'Inter',Helvetica] ${stat.changeColor}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-3 p-4 w-full bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between w-full">
                  <span className="font-normal text-slate-900 text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                    Real-Time Arrivals
                  </span>
                  <span className="font-normal text-gray-600 text-xs tracking-[0] leading-4 [font-family:'Inter',Helvetica]">
                    Last 30 min
                  </span>
                </div>
                <img
                  className="w-full h-24"
                  alt="Container"
                  src="/figmaAssets/container-10.svg"
                />
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                {roomStatus.map((room, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 w-full ${room.bgColor} rounded-lg`}
                  >
                    <div className="inline-flex items-center gap-2">
                      <img
                        className="flex-shrink-0"
                        alt="Margin"
                        src={room.icon}
                      />
                      <span className="font-medium text-gray-900 text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                        {room.name}
                      </span>
                    </div>
                    <span className="font-normal text-gray-600 text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                      {room.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#3b82f61a] rounded-full blur-[32px]" />
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-[#2563eb1a] rounded-full blur-[32px]" />
        </div>
      </div>
    </section>
  );
};
