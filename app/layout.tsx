import type { Metadata } from "next";
import "./globals.css";
import { PersonalizationProvider } from "../lib/context/personalization-context";
import { IBM_Plex_Sans, Inter, Outfit, Akshar } from "next/font/google";

const headingFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

const interFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const aksharFont = Akshar({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-akshar",
});

export const metadata: Metadata = {
  title: "Jenny's Design Portfolio",
  description:
    "A personal portfolio that adapts theme, density, and motion based on how you like to move through the work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${interFont.variable} ${aksharFont.variable} antialiased`}
        style={{ backgroundColor: 'var(--background-primary)', color: 'var(--text-primary)' }}
      >
        <PersonalizationProvider>{children}</PersonalizationProvider>
      </body>
    </html>
  );
}
