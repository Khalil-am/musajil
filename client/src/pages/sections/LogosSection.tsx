const logos = [
  { src: "/figmaAssets/logo-1.svg", alt: "Partner Logo 1" },
  { src: "/figmaAssets/logo-2.svg", alt: "Partner Logo 2" },
  { src: "/figmaAssets/logo-3.svg", alt: "Partner Logo 3" },
  { src: "/figmaAssets/logo-4.svg", alt: "Partner Logo 4" },
  { src: "/figmaAssets/logo-5.svg", alt: "Partner Logo 5" },
  { src: "/figmaAssets/logo-6.svg", alt: "Partner Logo 6" },
];

export const LogosSection = (): JSX.Element => {
  return (
    <section className="bg-white border-y border-slate-200 px-20 py-12 flex flex-col items-center w-full">
      <div className="flex flex-col max-w-screen-xl items-center gap-8 w-full px-8">
        <p className="font-semibold text-gray-500 text-sm text-center tracking-widest uppercase [font-family:'Inter',Helvetica]">
          Trusted by leading organizations worldwide
        </p>
        <div className="flex items-center justify-center gap-8 opacity-60 w-full flex-wrap">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center flex-1 min-w-[80px]">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-9 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
