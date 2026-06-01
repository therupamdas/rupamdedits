const ITEMS = [
  "Creator",
  "Brand",
  "Campaign",
  "Commercial",
  "Social",
  "Documentary",
];
function CarouselItem({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center text-sm font-medium font-bebas text-neutral-800 px-8 whitespace-nowrap">
      {text}
      <span className="ml-8 text-neutral-300">·</span>
    </div>
  );
}
export default function Navmarq() {
  return (
    <>
      <div className="w-full border-b pb-0.5 bg-white overflow-hidden">
        <div className="relative w-full mx-auto overflow-hidden">
          <div
            className="flex w-max gap-30 pr-8"
            style={{ animation: "marquee 36s linear infinite" }}
          >
            {[...Array(4)].flatMap((_, ci) =>
              ITEMS.map((item, i) => (
                <CarouselItem key={`${ci}-${i}`} text={item} />
              )),
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
