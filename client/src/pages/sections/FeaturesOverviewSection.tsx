import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const eventTypes = [
  {
    id: "conferences",
    title: "Conferences",
    description:
      "Multi-track agendas, session capacity management, speaker coordination, and attendee networking tools.",
    icon: "/figmaAssets/background-12.svg",
    borderColor: "border-blue-100",
    gradient:
      "bg-[linear-gradient(123deg,rgba(239,246,255,1)_0%,rgba(238,242,255,1)_100%)]",
    linkColor: "text-blue-500",
    features: [
      "Multi-track scheduling",
      "Session capacity limits",
      "Speaker management",
      "Networking features",
    ],
  },
  {
    id: "trade-shows",
    title: "Trade Shows",
    description:
      "Exhibitor management, floor plan visualization, lead capture, and real-time foot traffic analytics.",
    icon: "/figmaAssets/background-9.svg",
    borderColor: "border-green-100",
    gradient:
      "bg-[linear-gradient(123deg,rgba(240,253,244,1)_0%,rgba(236,253,245,1)_100%)]",
    linkColor: "text-emerald-500",
    features: [
      "Exhibitor portals",
      "Floor plan mapping",
      "Lead scanning & capture",
      "Foot traffic heatmaps",
    ],
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    description:
      "Internal meetings, town halls, training sessions with secure access controls and compliance features.",
    icon: "/figmaAssets/background-13.svg",
    borderColor: "border-purple-100",
    gradient:
      "bg-[linear-gradient(123deg,rgba(250,245,255,1)_0%,rgba(253,242,248,1)_100%)]",
    linkColor: "text-purple-600",
    features: [
      "SSO & SAML integration",
      "Department-based access",
      "Training certifications",
      "Compliance reporting",
    ],
  },
];

export const FeaturesOverviewSection = (): JSX.Element => {
  return (
    <section className="px-20 py-32 bg-white flex flex-col items-start w-full">
      <div className="flex flex-col max-w-screen-xl items-start gap-16 px-8 py-0 w-full mx-auto">
        <header className="flex flex-col items-center gap-4 w-full">
          <Badge
            variant="secondary"
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border-0"
          >
            <img
              className="mr-2"
              alt="Solutions icon"
              src="/figmaAssets/margin-25.svg"
            />
            <span className="font-normal text-blue-500 text-sm text-center tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
              Solutions
            </span>
          </Badge>

          <h2 className="font-bold text-slate-900 text-5xl text-center tracking-[0] leading-[48px] [font-family:'Inter',Helvetica]">
            Built for Every Event Type
          </h2>

          <p className="max-w-screen-md font-normal text-gray-600 text-lg text-center tracking-[0] leading-7 pt-2 [font-family:'Inter',Helvetica]">
            Whether you're running conferences, trade shows, or corporate
            events, Musajil adapts to
            <br />
            your specific needs.
          </p>
        </header>

        <div className="flex items-start justify-center gap-8 w-full">
          {eventTypes.map((eventType) => (
            <Card
              key={eventType.id}
              className={`flex-1 rounded-2xl border border-solid ${eventType.borderColor} ${eventType.gradient} overflow-visible`}
            >
              <CardContent className="p-8 relative min-h-[485px]">
                <img
                  className="w-[74px] h-[74px] mb-10"
                  alt={`${eventType.title} icon`}
                  src={eventType.icon}
                />

                <h3 className="font-bold text-slate-900 text-2xl tracking-[0] leading-8 mb-6 [font-family:'Inter',Helvetica]">
                  {eventType.title}
                </h3>

                <p className="font-normal text-gray-700 text-base tracking-[0] leading-6 mb-6 [font-family:'Inter',Helvetica]">
                  {eventType.description}
                </p>

                <ul className="flex flex-col gap-3 mb-6">
                  {eventType.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <img
                        className="flex-shrink-0"
                        alt="CheckIcon icon"
                        src="/figmaAssets/margin-15.svg"
                      />
                      <span className="font-normal text-gray-700 text-base tracking-[0] leading-6 [font-family:'Inter',Helvetica]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`inline-flex items-center gap-1 ${eventType.linkColor} hover:underline`}
                >
                  <span className="font-normal text-base text-center tracking-[0] leading-6 [font-family:'Inter',Helvetica]">
                    Learn more
                  </span>
                  <img
                    className="w-3.5 h-4"
                    alt="Arrow icon"
                    src="/figmaAssets/svg.svg"
                  />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
