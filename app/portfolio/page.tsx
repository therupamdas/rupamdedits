import PortfolioGrid from "./portfoliogrid";

export default async function PortfolioPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  // ⚡ Generate both the video and the ultra-fast poster image
  const items = Array.from({ length: 11 }, (_, i) => {
    const n = i + 1;

    return {
      id: String(n),
      title: `Project ${n}`,
      video_url: `${supabaseUrl}/storage/v1/object/public/P/videos/${n}.mp4`,
      // Assuming you create a "posters" folder in your bucket next to "videos"
      poster_url: `${supabaseUrl}/storage/v1/object/public/P/posters/${n}.webp`,
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