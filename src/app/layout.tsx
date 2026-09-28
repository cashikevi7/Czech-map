import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "OpenMind",
  description: "Interaktivní mapa České republiky",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
