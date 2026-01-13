import Image from "next/image";

export default function ImageSection({ src, alt, caption }) {
  const hasImage = Boolean(src);

  return (
    <figure className="my-8 space-y-3 rounded-3xl border border-purple-100/70 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
      {hasImage ? (
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800" style={{ aspectRatio: "16 / 9" }}>
          <Image
            src={src}
            alt={alt || caption || "Illustration"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 60vw, 720px"
            priority={false}
            quality={90}
          />
        </div>
      ) : (
        <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-dashed border-purple-300 bg-purple-50/70 text-center text-sm font-medium text-purple-700 dark:border-purple-500 dark:bg-slate-900/60 dark:text-purple-200">
          Add an image by supplying the <code>src</code> prop.
        </div>
      )}
      {caption ? (
        <figcaption className="text-center text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
