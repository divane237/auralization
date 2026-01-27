
import NavBar from "@/components/NavBar";
import ThemeProvider from "@/components/ThemeProvider";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata = {
  title: "Digital Signal Processing",
  description: "Welcome! ADSP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
