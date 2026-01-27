// Enhanced Callout component for highlighting important information

export default function Callout({ type = "info", title, children }) {
  const styles = {
    info: {
      container: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40",
      icon: "text-blue-600 dark:text-blue-400",
      title: "text-blue-900 dark:text-blue-100",
      content: "text-blue-800 dark:text-blue-200",
      glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    },
    warning: {
      container: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40",
      icon: "text-amber-600 dark:text-amber-400",
      title: "text-amber-900 dark:text-amber-100",
      content: "text-amber-800 dark:text-amber-200",
      glow: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    },
    danger: {
      container: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40",
      icon: "text-red-600 dark:text-red-400",
      title: "text-red-900 dark:text-red-100",
      content: "text-red-800 dark:text-red-200",
      glow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    },
    success: {
      container: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
      icon: "text-emerald-600 dark:text-emerald-400",
      title: "text-emerald-900 dark:text-emerald-100",
      content: "text-emerald-800 dark:text-emerald-200",
      glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    },
    tip: {
      container: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/40",
      icon: "text-purple-600 dark:text-purple-400",
      title: "text-purple-900 dark:text-purple-100",
      content: "text-purple-800 dark:text-purple-200",
      glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    },
  };

  const icons = {
    info: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    danger: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tip: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  };

  const style = styles[type] || styles.info;
  const icon = icons[type] || icons.info;

  return (
    <div
      className={`group relative my-6 rounded-xl border-l-4 p-6 
                  ${style.container} ${style.glow}
                  transition-all duration-300 hover:translate-x-1`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 overflow-hidden rounded-tr-xl">
        <div className={`w-full h-full ${style.icon} transform rotate-12 scale-150`}>
          {icon}
        </div>
      </div>

      <div className="relative flex items-baseline gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 ${style.icon} transition-transform group-hover:scale-110`}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {title && (
            <h4 className={`font-bold text-lg ${style.title}`}>
              {title}
            </h4>
          )}
          <div className={`text-sm leading-relaxed ${style.content}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}