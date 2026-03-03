import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    value: "10,000+",
    label: "Events Managed",
  },
  {
    value: "2.5M+",
    label: "Attendees Checked In",
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
  },
];

export const EventTypesSection = (): JSX.Element => {
  return (
    <section className="px-8 md:px-52 py-16 md:py-32 bg-[linear-gradient(170deg,rgba(15,23,42,1)_0%,rgba(30,41,59,1)_100%)] flex flex-col items-center w-full">
      <div className="flex flex-col max-w-screen-lg items-center gap-6 w-full">
        <header className="flex flex-col items-center w-full">
          <h2 className="font-bold text-white text-3xl md:text-5xl text-center tracking-[0] leading-tight md:leading-[48px] [font-family:'Inter',Helvetica]">
            Ready to Transform Your Events?
          </h2>
        </header>

        <div className="flex flex-col max-w-screen-md items-center w-full">
          <p className="font-normal text-blue-100 text-lg md:text-xl text-center tracking-[0] leading-7 [font-family:'Inter',Helvetica]">
            Join thousands of event organizers who trust Musajil to deliver
            seamless, data-driven event experiences.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
          <Button
            variant="default"
            className="h-auto inline-flex items-center gap-2 px-10 py-4 bg-white hover:bg-white/90 text-blue-500 rounded-lg shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]"
          >
            <span className="font-bold text-lg text-center tracking-[0] leading-7 whitespace-nowrap [font-family:'Inter',Helvetica]">
              Start Free Trial
            </span>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            className="h-auto inline-flex items-center gap-2 px-10 py-4 rounded-lg border-2 border-white bg-transparent hover:bg-white/10 text-white"
          >
            <span className="font-bold text-lg text-center tracking-[0] leading-7 whitespace-nowrap [font-family:'Inter',Helvetica]">
              Schedule Demo
            </span>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row max-w-screen-md items-start justify-center gap-8 pt-6 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1 w-full"
            >
              <div className="flex flex-col items-center w-full">
                <h3 className="font-bold text-white text-3xl md:text-4xl text-center tracking-[0] leading-10 whitespace-nowrap [font-family:'Inter',Helvetica]">
                  {stat.value}
                </h3>
              </div>

              <div className="flex flex-col items-center w-full">
                <p className="font-normal text-blue-200 text-base text-center tracking-[0] leading-6 whitespace-nowrap [font-family:'Inter',Helvetica]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
