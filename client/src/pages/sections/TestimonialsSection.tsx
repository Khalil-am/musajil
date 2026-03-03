import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Director of Events, TechCorp",
    avatar: "/figmaAssets/sarah-chen.png",
    text: "The Ops Forecast feature saved our conference. We predicted a registration desk bottleneck 2 hours before it would have happened and adjusted staffing. Game changer.",
  },
  {
    name: "Marcus Johnson",
    role: "VP Operations, EventPro",
    avatar: "/figmaAssets/marcus-johnson.png",
    text: "Guest checkout increased our conversion rate by 34%. Attendees love not being forced to create an account just to register. Simple but powerful.",
  },
  {
    name: "Emily Rodriguez",
    role: "Event Manager, Global Summit",
    avatar: "/figmaAssets/emily-rodriguez.png",
    text: "The offline check-in capability was crucial. When our venue WiFi went down, we didn't miss a beat. QR scanning kept working flawlessly.",
  },
  {
    name: "David Kim",
    role: "Head of Marketing, InnovateCon",
    avatar: "/figmaAssets/david-kim.png",
    text: "Analytics linking registration to revenue to engagement gave us insights we never had before. ROI reporting is now a breeze.",
  },
  {
    name: "Lisa Thompson",
    role: "Conference Director, MedTech",
    avatar: "/figmaAssets/lisa-thompson.png",
    text: "Capacity-aware scheduling eliminated our room overflow issues. Real-time alerts let us redirect attendees before sessions filled up.",
  },
  {
    name: "James Parker",
    role: "Operations Lead, ExpoWorld",
    avatar: "/figmaAssets/james-parker.png",
    text: "The mission control dashboard is exactly what we needed. All critical metrics in one place, updated in real-time. No more spreadsheet chaos.",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="px-4 sm:px-8 md:px-20 py-16 md:py-32 bg-slate-50 flex flex-col items-center w-full">
      <div className="flex flex-col max-w-screen-xl items-center gap-16 w-full">
        <header className="flex flex-col items-center gap-4 w-full">
          <Badge
            variant="secondary"
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border-0"
          >
            <img
              className="mr-2"
              alt="Margin"
              src="/figmaAssets/margin-31.svg"
            />
            <span className="font-normal text-blue-500 text-sm text-center tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
              Testimonials
            </span>
          </Badge>

          <h2 className="font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl text-center tracking-[0] leading-tight md:leading-[48px] [font-family:'Inter',Helvetica]">
            Trusted by Event Leaders
          </h2>

          <p className="max-w-screen-md font-normal text-gray-600 text-base sm:text-lg text-center tracking-[0] leading-7 pt-2 [font-family:'Inter',Helvetica]">
            See how organizations are transforming their events with Musajil.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white rounded-2xl border border-slate-200 shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]"
            >
              <CardContent className="p-8 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  </Avatar>

                  <div className="flex flex-col">
                    <h3 className="font-bold text-slate-900 text-lg tracking-[0] leading-7 [font-family:'Inter',Helvetica]">
                      {testimonial.name}
                    </h3>
                    <p className="font-normal text-gray-600 text-sm tracking-[0] leading-5 [font-family:'Inter',Helvetica]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <img
                  className="w-full h-4"
                  alt="Rating stars"
                  src="/figmaAssets/container-3.svg"
                />

                <p className="font-normal text-gray-700 text-base tracking-[0] leading-[26px] [font-family:'Inter',Helvetica]">
                  {testimonial.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
