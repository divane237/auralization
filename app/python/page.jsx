import PythonDemoClient from "@/components/PythonDemoClient";
import Footer from "@/components/Footer";

const defaultCode = `# Welcome to the Python IDE!
# Write and run Python code directly in your browser
# Pyodide loads numpy, matplotlib, and scipy automatically

import numpy as np
import matplotlib.pyplot as plt

# Example: Generate and plot a sine wave
frequency = 440  # Hz
duration = 0.01  # seconds
sample_rate = 44100

t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
signal = np.sin(2 * np.pi * frequency * t)

print(f"Generated {len(signal)} samples")
print(f"Frequency: {frequency} Hz")
print(f"Duration: {duration} seconds")

# Plot the signal
plt.figure(figsize=(10, 4))
plt.plot(t[:1000], signal[:1000])  # Plot first 1000 samples
plt.title('Sine Wave (first 1000 samples)')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.grid(True)
plt.show()

# Try modifying the code above and click "Run code"!
`;

export const metadata = {
  title: "Python IDE | DSP Interactive Lab",
  description: "Interactive Python IDE powered by Pyodide. Write, run, and visualize Python code directly in your browser with numpy, matplotlib, and scipy support.",
};

export default function PythonIDEPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-12 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/60">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-500 dark:text-purple-300">
            Python IDE
          </p>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
            Interactive Python Environment
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-700 dark:text-slate-300">
            Write, run, and debug Python code directly in your browser. Powered by Pyodide with numpy, matplotlib, and scipy pre-loaded.
            Perfect for exploring signal processing, acoustics, and data visualization concepts.
          </p>
        </section>

        <PythonDemoClient
          id="python-ide"
          title="Python IDE"
          description="Write your Python code in the editor and see results, plots, and errors in real-time."
          defaultCode={defaultCode}
          packages={["numpy", "matplotlib", "scipy"]}
        />

        <Footer />
      </div>
    </div>
  );
}
