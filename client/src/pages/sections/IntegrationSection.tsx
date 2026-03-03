import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small events",
    price: "$0",
    period: "/month",
    buttonText: "Get Started Free",
    buttonVariant: "secondary" as const,
    features: [
      { text: "Up to 100 attendees", included: true },
      { text: "Guest checkout", included: true },
      { text: "QR code check-in", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
      { text: "Capacity forecasting", included: false },
      { text: "Custom integrations", included: false },
    ],
    isPopular: false,
    gradient: false,
  },
  {
    name: "Professional",
    description: "For growing events",
    price: "$299",
    period: "/month",
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    features: [
      { text: "Up to 1,000 attendees", included: true },
      { text: "Everything in Starter", included: true },
      { text: "Ops Forecast dashboard", included: true },
      { text: "Capacity alerts", included: true },
      { text: "Advanced analytics", included: true },
      { text: "10+ integrations", included: true },
      { text: "Priority support", included: true },
    ],
    isPopular: true,
    gradient: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale events",
    price: "Custom",
    period: "",
    buttonText: "Contact Sales",
    buttonVariant: "default" as const,
    features: [
      { text: "Unlimited attendees", included: true },
      { text: "Everything in Professional", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA guarantees", included: true },
      { text: "White-label options", included: true },
      { text: "24/7 phone support", included: true },
    ],
    isPopular: false,
    gradient: false,
  },
];

const allPlansInclude = [
  { icon: "/figmaAssets/margin-56.svg", text: "PCI DSS Compliant" },
  { icon: "/figmaAssets/margin-47.svg", text: "WCAG 2.2 AA" },
  { icon: "/figmaAssets/margin-59.svg", text: "Mobile-first design" },
  { icon: "/figmaAssets/margin-60.svg", text: "RTL-ready" },
];

export const IntegrationSection = (): JSX.Element => {
  return (
    <section className="px-4 md:px-20 py-16 md:py-32 bg-white w-full">
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col items-center gap-4 mb-12">
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <img
              className="mr-2"
              alt="Margin"
              src="/figmaAssets/margin-40.svg"
            />
            <span className="text-sm font-normal [font-family:'Inter',Helvetica]">
              Pricing
            </span>
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center tracking-[0] leading-[48px] [font-family:'Inter',Helvetica]">
            Plans That Scale With Your Events
          </h2>

          <p className="max-w-screen-md text-lg font-normal text-gray-600 text-center tracking-[0] leading-7 pt-2 [font-family:'Inter',Helvetica]">
            Start free, upgrade when you need more. No hidden fees, no
            surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col h-full ${
                plan.gradient
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-[0px_25px_50px_-12px_#00000040]"
                  : "bg-white border-2 border-slate-200"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white font-bold text-sm px-4 py-1 rounded-full [font-family:'Inter',Helvetica]">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle
                  className={`text-2xl font-bold tracking-[0] leading-8 [font-family:'Inter',Helvetica] ${plan.gradient ? "text-white" : "text-slate-900"}`}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription
                  className={`text-base font-normal tracking-[0] leading-6 [font-family:'Inter',Helvetica] ${plan.gradient ? "text-blue-100" : "text-gray-600"}`}
                >
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col items-center pt-4 pb-4">
                  <div className="flex items-end justify-center gap-1">
                    <span
                      className={`text-5xl font-bold tracking-[0] leading-[48px] [font-family:'Inter',Helvetica] ${plan.gradient ? "text-white" : "text-slate-900"}`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-base font-normal tracking-[0] leading-6 [font-family:'Inter',Helvetica] ${plan.gradient ? "text-blue-100" : "text-gray-600"}`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  variant={plan.gradient ? "secondary" : plan.buttonVariant}
                  className={`w-full h-auto px-6 py-3 rounded-lg ${
                    plan.gradient
                      ? "bg-white text-blue-500 hover:bg-white/90"
                      : plan.buttonVariant === "default"
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-slate-50 text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-base font-normal tracking-[0] leading-6 [font-family:'Inter',Helvetica]">
                    {plan.buttonText}
                  </span>
                </Button>

                <div className="flex flex-col gap-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      {feature.included ? (
                        plan.gradient ? (
                          <img
                            className="flex-shrink-0 mt-1"
                            alt="Check"
                            src="/figmaAssets/margin-48.svg"
                          />
                        ) : (
                          <img
                            className="flex-shrink-0 mt-1"
                            alt="Check"
                            src="/figmaAssets/margin-1.svg"
                          />
                        )
                      ) : (
                        <img
                          className="flex-shrink-0 mt-1"
                          alt="X"
                          src="/figmaAssets/margin-54.svg"
                        />
                      )}
                      <span
                        className={`text-base font-normal tracking-[0] leading-6 [font-family:'Inter',Helvetica] ${
                          plan.gradient
                            ? "text-white"
                            : feature.included
                              ? "text-gray-700"
                              : "text-gray-400"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-base font-normal text-gray-600 text-center tracking-[0] leading-6 [font-family:'Inter',Helvetica]">
            All plans include:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {allPlansInclude.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <img className="flex-shrink-0" alt="Icon" src={item.icon} />
                <span className="text-sm font-normal text-gray-700 text-center tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
