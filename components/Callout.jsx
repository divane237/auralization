// This component will be used to highligh any indication. Success, Warning etc

export default function Callout({ type = "info", title, children }) {
  const styles = {
    info: "border-blue-400 bg-blue-50 text-blue-900 dark:border-blue-400/70 dark:bg-blue-950/40 dark:text-blue-100",
    warning:
      "border-yellow-500 bg-yellow-50 text-yellow-900 dark:border-amber-400/70 dark:bg-amber-950/30 dark:text-amber-100",
    danger:
      "border-red-500 bg-red-50 text-red-900 dark:border-rose-400/70 dark:bg-rose-950/30 dark:text-rose-100",
    success:
      "border-green-500 bg-green-50 text-green-900 dark:border-emerald-400/70 dark:bg-emerald-950/30 dark:text-emerald-100",
  };

  const icons = {
    info: "💡",
    warning: "⚠️",
    danger: "🔥",
    success: "✔️",
  };

  const style = styles[type] || styles.info;
  const icon = icons[type] || icons.info;

  return (
    <div className={`border-l-4 p-4 rounded-md mb-4 ${style}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{icon}</span>
        <div>
          {title && <p className="font-bold mb-1">{title}</p>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
