"use client";

import dynamic from "next/dynamic";

const PythonDemo = dynamic(() => import("./PythonDemo"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-emerald-200 bg-white/90 p-6 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:border-emerald-500/40 dark:bg-slate-900/80 dark:text-emerald-200">
      Loading interactive demo…
    </div>
  ),
});

export default function PythonDemoClient(props) {
  return <PythonDemo {...props} />;
}
