import { Separator } from "@/components/ui/separator";
import { MusajilLogo } from "@/components/MusajilLogo";

const productLinks = [
  "Features",
  "Integrations",
  "Pricing",
  "Roadmap",
  "Changelog",
];

const solutionsLinks = [
  "Conferences",
  "Trade Shows",
  "Corporate Events",
  "Training Sessions",
  "Hybrid Events",
];

const resourcesLinks = [
  "Documentation",
  "API Reference",
  "Help Center",
  "Blog",
  "Case Studies",
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="flex flex-col items-start px-20 py-16 w-full bg-slate-900">
      <div className="flex flex-col max-w-screen-xl items-start gap-12 px-8 py-0 w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
          <div className="flex flex-col items-start gap-6 lg:col-span-1">
            <div className="flex items-center w-full">
              <MusajilLogo variant="white" size="xl" />
            </div>

            <p className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-[26px]">
              Enterprise-grade event management platform designed for organizers
              who demand precision, control, and real-time intelligence.
            </p>

            <img
              className="w-full"
              alt="Social media links"
              src="/figmaAssets/container-9.svg"
            />
          </div>

          <nav className="flex flex-col items-start gap-4">
            <h3 className="[font-family:'Inter',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
              Product
            </h3>
            <ul className="flex flex-col items-start gap-3 w-full">
              {productLinks.map((link, index) => (
                <li key={`product-${index}`} className="w-full">
                  <a
                    href="#"
                    className="[font-family:'Inter',Helvetica] font-normal text-gray-300 text-base tracking-[0] leading-6 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col items-start gap-4">
            <h3 className="[font-family:'Inter',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
              Solutions
            </h3>
            <ul className="flex flex-col items-start gap-3 w-full">
              {solutionsLinks.map((link, index) => (
                <li key={`solutions-${index}`} className="w-full">
                  <a
                    href="#"
                    className="[font-family:'Inter',Helvetica] font-normal text-gray-300 text-base tracking-[0] leading-6 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col items-start gap-4">
            <h3 className="[font-family:'Inter',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
              Resources
            </h3>
            <ul className="flex flex-col items-start gap-3 w-full">
              {resourcesLinks.map((link, index) => (
                <li key={`resources-${index}`} className="w-full">
                  <a
                    href="#"
                    className="[font-family:'Inter',Helvetica] font-normal text-gray-300 text-base tracking-[0] leading-6 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Separator className="bg-slate-800" />

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-sm tracking-[0] leading-5 whitespace-nowrap">
            © {new Date().getFullYear()} Musajil. All rights reserved.
          </p>

          <nav className="flex items-center gap-6">
            {legalLinks.map((link, index) => (
              <a
                key={`legal-${index}`}
                href={link.href}
                className="[font-family:'Inter',Helvetica] font-normal text-gray-300 text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
