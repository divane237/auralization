export default function VideoSection({ src, caption }) {
  const hasVideo = Boolean(src);

  return (
    <figure className="my-8 space-y-3 rounded-3xl border border-blue-100/70 bg-blue-50/60 p-4 shadow-sm dark:border-blue-400/20 dark:bg-slate-900/50">
      {hasVideo ? (
        <div className="aspect-video w-full overflow-hidden rounded-2xl">
          <iframe
            src={src}
            title={caption || "Embedded video"}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-blue-300 bg-white/70 text-center text-sm font-medium text-blue-700 dark:border-blue-400 dark:bg-slate-900/60 dark:text-blue-200">
          Supply a <code>src</code> (YouTube, Loom, etc.) to embed a video.
        </div>
      )}

      {caption ? (
        <figcaption className="text-center text-xs uppercase tracking-wide text-blue-500 dark:text-blue-300">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
