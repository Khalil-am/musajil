import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { MusajilLogo } from "@/components/MusajilLogo";
import { FeaturesDetailSection } from "./sections/FeaturesDetailSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { PricingSection } from "./sections/PricingSection";

const navigationItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export const Home = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-start relative bg-white">
      <header className="flex flex-col w-full items-start px-8 md:px-28 py-0 fixed top-0 left-0 bg-white border-b border-slate-200 z-50">
        <nav className="flex h-24 items-center justify-between w-full">
          <div className="inline-flex items-center">
            <MusajilLogo variant="default" size="xl" />
          </div>

          <ul className="hidden md:inline-flex items-center gap-8">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-medium text-gray-700 text-base leading-6 whitespace-nowrap [font-family:'Inter',Helvetica] hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:inline-flex items-center gap-4">
            <Button
              variant="ghost"
              className="h-auto px-5 py-2.5 font-medium text-gray-700 text-base [font-family:'Inter',Helvetica]"
              onClick={() => navigate("/login")}
              data-testid="button-signin"
            >
              Sign In
            </Button>
            <Button
              className="h-auto px-6 py-2.5 bg-blue-500 hover:bg-blue-600 font-medium text-white text-base [font-family:'Inter',Helvetica]"
              onClick={() => navigate("/register")}
              data-testid="button-start-trial"
            >
              Start Free Trial
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg border border-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col w-full pb-4 border-t border-slate-100">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-3 px-2 font-medium text-gray-700 text-base [font-family:'Inter',Helvetica] hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 pt-3 px-2">
              <Button
                variant="outline"
                className="flex-1 font-medium text-gray-700 text-base"
                data-testid="mobile-link-signin"
                onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
              >
                Sign In
              </Button>
              <Button
                className="flex-1 bg-blue-500 hover:bg-blue-600 font-medium text-white text-base"
                data-testid="mobile-link-register"
                onClick={() => { setMobileMenuOpen(false); navigate("/register"); }}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex flex-col w-full pt-20">
        <HeroSection />
        <FeaturesDetailSection />
        <PricingSection />
        <FooterSection />
      </main>
    </div>
  );
};
