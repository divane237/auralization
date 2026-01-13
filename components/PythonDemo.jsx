"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const PYODIDE_VERSION = "0.29.0";
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_SCRIPT = `${PYODIDE_INDEX}pyodide.js`;

const FALLBACK_CODE = String.raw`
import numpy as np

duration = 0.02
sample_rate = 44100
time = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
wave = np.sin(2 * np.pi * 440 * time)

print(f"Generated \${len(wave)} samples for a 440 Hz tone.")
print(f"Peak amplitude: \${wave.max():.3f}, RMS: \${np.sqrt(np.mean(wave ** 2)):.3f}")
`.trim();

const DEFAULT_PACKAGES = ["numpy", "matplotlib"];

const statusLabels = {
  loading: "Loading Pyodide…",
  ready: "Pyodide ready",
  error: "Pyodide failed to load",
};

const IMAGE_DATA_REGEX = /IMGDATA:([A-Za-z0-9+/=]+)\s*/g;

const extractImageOutputs = (rawText) => {
  const urls = [];
  const cleaned = (rawText ?? "").replace(IMAGE_DATA_REGEX, (_, encoded) => {
    urls.push(`data:image/png;base64,${encoded}`);
    return "";
  });
  return { cleaned: cleaned.trim(), urls };
};

const ensurePyodideScript = () => {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("Pyodide can only load in a browser environment"));
  }

  if (globalThis.__pyodideScriptPromise) {
    return globalThis.__pyodideScriptPromise;
  }

  if (typeof globalThis.loadPyodide === "function") {
    globalThis.__pyodideScriptPromise = Promise.resolve();
    return globalThis.__pyodideScriptPromise;
  }

  const script = document.createElement("script");
  script.src = PYODIDE_SCRIPT;
  script.async = true;

  globalThis.__pyodideScriptPromise = new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Pyodide script failed to load from CDN"));
  });

  document.head.appendChild(script);

  return globalThis.__pyodideScriptPromise;
};

const loadPyodideFromCDN = async () => {
  await ensurePyodideScript();

  if (typeof globalThis.loadPyodide !== "function") {
    throw new Error("Pyodide did not register a loader on the global scope");
  }

  if (!globalThis.__pyodideInstancePromise) {
    globalThis.__pyodideInstancePromise = globalThis.loadPyodide({
      indexURL: PYODIDE_INDEX,
    });
  }

  return globalThis.__pyodideInstancePromise;
};

export default function PythonDemo({ id, title, description, defaultCode, imagesPlacement = "output", packages }) {
  const baseCode = useMemo(() => defaultCode ?? FALLBACK_CODE, [defaultCode]);
  const [code, setCode] = useState(baseCode);
  const [output, setOutput] = useState("");
  const [runtimeError, setRuntimeError] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [status, setStatus] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [images, setImages] = useState([]);
  const packageList = packages ?? DEFAULT_PACKAGES;
  const packageKey = packageList.join(",");

  useEffect(() => {
    setCode(baseCode);
    setOutput("");
    setRuntimeError("");
    setImages([]);
  }, [baseCode]);

  useEffect(() => {
    let canceled = false;
    setStatus("loading");
    setLoadError("");

    async function init() {
      try {
        const instance = await loadPyodideFromCDN();

        await instance.loadPackage([...packageList]);

        if (canceled) {
          return;
        }

        setPyodide(instance);
        setStatus("ready");
      } catch (error) {
        if (canceled) {
          return;
        }
        setLoadError(error?.message ?? String(error));
        setStatus("error");
      }
    }

    init();
    return () => {
      canceled = true;
    };
  }, [packageKey]);

  const runCode = useCallback(async () => {
    if (!pyodide) {
      return;
    }

    setIsRunning(true);
    setRuntimeError("");
    setOutput("");
    setImages([]);

    const wrapped = `
import contextlib
import io

stdout = io.StringIO()
with contextlib.redirect_stdout(stdout):
    exec(${JSON.stringify(code)}, globals())
    try:
        import matplotlib.pyplot as _plt
        _plt.close("all")
    except Exception:
        pass
stdout.getvalue()
`;

    try {
      const result = await pyodide.runPythonAsync(wrapped);
      const value = result?.toString ? result.toString() : String(result ?? "");
      const { cleaned, urls } = extractImageOutputs(value);
      setOutput(cleaned);
      setImages(urls);
      result?.destroy?.();
    } catch (error) {
      setRuntimeError(error?.message ?? String(error));
    } finally {
      setIsRunning(false);
    }
  }, [code, pyodide]);

  const handleClearImages = useCallback(() => {
    setImages([]);
  }, []);

  const handleRemoveImage = useCallback((index) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  }, []);

  const handleReset = () => {
    setCode(baseCode);
    setOutput("");
    setRuntimeError("");
    setImages([]);
  };

  const renderImageGallery = () => {
    if (images.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-col gap-3">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-2 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute right-3 top-3 z-10 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-500"
            >
              Remove
            </button>
            <img
              src={src}
              alt={`Plot ${index + 1}`}
              className="h-[220px] w-full object-contain"
            />
          </div>
        ))}
      </div>
    );
  };

  const kind = status === "ready" ? "bg-emerald-100 text-emerald-700" : status === "loading" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-700";

  return (
    <section className="space-y-6 rounded-3xl border border-emerald-200 bg-white/90 p-6 shadow-sm dark:border-emerald-500/30 dark:bg-slate-900/60">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500 dark:text-emerald-200">
              Python Lab
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title ?? "Interactive Python console"}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${kind}`}>
              {statusLabels[status]}
            </span>
            {status === "ready" ? (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">
                v{PYODIDE_VERSION}
              </span>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-slate-300">
          {description ??
            "Edit the snippet, press run, and inspect the printed output to explore signals or algorithms in real time."}
        </p>
        {loadError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 dark:border-rose-400/80 dark:bg-rose-900/60 dark:text-rose-200">
            <span>Pyodide failed to load:</span>
            <p className="mt-1 text-left text-[0.65rem] font-normal normal-case tracking-normal">{loadError}</p>
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col gap-3">
          <label htmlFor={`python-demo-${id ?? "default"}`} className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-500 dark:text-purple-300">
            Code
          </label>
          <textarea
            id={`python-demo-${id ?? "default"}`}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            rows={16}
            className="min-h-[220px] w-full flex-1 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm font-mono text-slate-900 outline-none transition focus:border-purple-400 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-purple-500"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={runCode}
              disabled={status !== "ready" || isRunning}
              className="inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-200"
            >
              {isRunning ? "Running…" : "Run code"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isRunning}
              className="inline-flex items-center justify-center rounded-full border border-purple-200 px-6 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-purple-700 transition hover:border-purple-400 hover:text-purple-900 disabled:opacity-60"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500 dark:text-emerald-200">
              Output
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              {runtimeError ? "Error" : isRunning ? "Running…" : "Latest run"}
            </p>
          </div>
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleClearImages}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-500"
              >
                Clear graphs
              </button>
            </div>
          ) : null}
          <pre
            aria-live="polite"
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-900/90 p-4 text-[0.85rem] text-slate-50 dark:border-slate-800 whitespace-pre-wrap wrap-break-words overflow-auto"
          >
            {runtimeError
              ? runtimeError
              : output
              ? output
              : "Execute the snippet to see printed output and messages from Pyodide here."}
          </pre>
          {imagesPlacement === "output" ? renderImageGallery() : null}
        </div>
      </div>
      {imagesPlacement === "bottom" ? (
        <div className="mt-3">{renderImageGallery()}</div>
      ) : null}
    </section>
  );
}
