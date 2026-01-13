import katex from "katex";

export default function MathFormula({ children, inline = false }) {
  if (!children) return null;

  const content = (Array.isArray(children) ? children.filter(Boolean).join("") : children)?.trim();

  if (!content) {
    return null;
  }

  let rendered = "";

  try {
    rendered = katex.renderToString(content, {
      displayMode: !inline,
      throwOnError: false,
      strict: "ignore",
      output: "html",
    });
  } catch (error) {
    rendered = content;
  }

  if (inline) {
    return (
      <span
        className="whitespace-nowrap text-base text-gray-900 dark:text-slate-100"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    );
  }

  return (
    <div className="my-6 overflow-x-auto">
      <div
        className="inline-block min-w-full rounded-2xl bg-white px-4 py-5 text-center text-lg text-gray-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  );
}
