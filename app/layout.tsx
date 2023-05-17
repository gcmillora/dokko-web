import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { StyleSwitcher } from "@/components/style-switcher";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dokko",
  description: "Clinic Management System",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator />
          <Toaster />
          <StyleSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
