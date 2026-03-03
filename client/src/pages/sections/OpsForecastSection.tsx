import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const integrations = [
  {
    icon: "/figmaAssets/background-10.svg",
    title: "Salesforce",
    description:
      "Sync attendee data, leads, and campaign performance directly to Salesforce CRM.",
  },
  {
    icon: "/figmaAssets/background-18.svg",
    title: "HubSpot",
    description:
      "Automate marketing workflows and nurture campaigns with real-time event data.",
  },
  {
    icon: "/figmaAssets/background-11.svg",
    title: "Stripe",
    description:
      "Secure, PCI-compliant payment processing with 3DS and SCA support.",
  },
  {
    icon: "/figmaAssets/background-3.svg",
    title: "Mailchimp",
    description:
      "Send targeted email campaigns and track engagement across your events.",
  },
  {
    icon: "/figmaAssets/background-7.svg",
    title: "Slack",
    description:
      "Real-time notifications and alerts sent directly to your team's Slack channels.",
  },
  {
    icon: "/figmaAssets/background-8.svg",
    title: "Google Workspace",
    description:
      "Calendar sync, SSO authentication, and Google Analytics integration.",
  },
  {
    icon: "/figmaAssets/background-6.svg",
    title: "Microsoft 365",
    description:
      "Outlook calendar integration, Azure AD SSO, and Teams notifications.",
  },
  {
    icon: "/figmaAssets/background-14.svg",
    title: "Custom APIs",
    description:
      "REST APIs and webhooks for custom integrations and workflows.",
  },
];

export const OpsForecastSection = (): JSX.Element => {
  return (
    <section className="px-4 sm:px-8 md:px-20 py-16 md:py-32 bg-slate-50 flex flex-col items-center w-full">
      <div className="flex flex-col max-w-screen-xl items-start gap-16 w-full">
        <header className="flex flex-col items-center gap-4 w-full">
          <Badge
            variant="secondary"
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border-0"
          >
            <span className="font-normal text-blue-500 text-sm text-center tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
              Integrations
            </span>
          </Badge>

          <h2 className="font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl text-center tracking-[0] leading-tight [font-family:'Inter',Helvetica]">
            Connect Your Entire Tech Stack
          </h2>

          <p className="max-w-screen-md font-normal text-gray-600 text-base sm:text-lg text-center tracking-[0] leading-7 [font-family:'Inter',Helvetica] px-4">
            30+ native integrations with CRM, marketing automation, payments,
            and analytics platforms. Plus webhooks and REST APIs for custom
            workflows.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {integrations.map((integration, index) => (
            <Card
              key={index}
              className="bg-white rounded-xl border border-solid border-slate-200 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <img
                  className="w-12 h-12"
                  alt={integration.title}
                  src={integration.icon}
                />
                <h3 className="font-bold text-slate-900 text-lg tracking-[0] leading-7 [font-family:'Inter',Helvetica]">
                  {integration.title}
                </h3>
                <p className="font-normal text-gray-600 text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                  {integration.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 pt-8 pb-12 px-6 sm:px-12 w-full rounded-2xl bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(37,99,235,1)_100%)]">
          <h3 className="font-bold text-white text-2xl sm:text-3xl text-center tracking-[0] leading-9 [font-family:'Inter',Helvetica]">
            Need a Custom Integration?
          </h3>

          <p className="font-normal text-white text-base sm:text-lg text-center tracking-[0] leading-7 opacity-90 [font-family:'Inter',Helvetica] max-w-3xl">
            Our API-first architecture makes it easy to connect Musajil with any
            tool in your stack.
          </p>

          <Button
            variant="secondary"
            className="inline-flex items-center gap-2 px-8 py-3 h-auto bg-white rounded-lg hover:bg-gray-50"
          >
            <span className="font-normal text-blue-500 text-base text-center tracking-[0] leading-6 [font-family:'Inter',Helvetica]">
              View API Documentation
            </span>
            <ArrowRightIcon className="w-3.5 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
