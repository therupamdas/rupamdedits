import PortfolioGrid from "./portfoliogrid";

export default async function PortfolioPage() {
  // ⚡ Generate both the video and the ultra-fast poster image directly from the public folder
  const items = Array.from({ length: 18 }, (_, i) => {
    const n = i + 1;

    return {
      id: String(n),
      title: `Project ${n}`,
      // Paths map directly to the public/videos and public/posters folders
      video_url: `/videos/${n}.mp4`,
      poster_url: `/posters/${n}.webp`,
    };
  });

  return (
    <section className="animate-in fade-in duration-1000 ease-out fill-mode-forwards mx-5 md:mx-20 py-10">
      <div className="mb-10">
        <h1 className="text-5xl md:text-8xl font-bebas uppercase text-neutral-800">
          Portfolio
        </h1>

        <p className="mt-2 text-neutral-500 max-w-xl">
          Commercial edits, social media reels, event films, music videos and
          cinematic storytelling.
        </p>
      </div>

      <PortfolioGrid items={items} />
    </section>
  );
}