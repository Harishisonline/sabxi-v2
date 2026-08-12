import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./styles/globals.css";
import { ThemeScript } from "@/app/components/ThemeScript";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";

const outfit = localFont({
  src: [
    { path: "../public/fonts/Outfit-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Outfit-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Outfit-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Outfit-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

const bebasNeue = localFont({
  src: "../public/fonts/BebasNeue-Regular.woff2",
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "SABXI — Freshly Cut Vegetables, Fruits & Juices Delivered in 30 Minutes",
    template: "%s | SABXI",
  },
  description:
    "SABXI is a D2C fresh food brand delivering freshly cut veggies, cut fruits, cold-pressed juices, whole produce, and smoothies — prepared live at SABXI Studio and delivered in under 30 minutes.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.NODE_ENV === "production"
        ? "https://sabxi.com"
        : "http://localhost:3000")
  ),
  openGraph: {
    title: "SABXI — Freshly Cut, Quickly Delivered",
    description:
      "SABXI is a D2C fresh food brand delivering freshly cut veggies, cut fruits, cold-pressed juices, whole produce, and smoothies — prepared live at SABXI Studio and delivered in under 30 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#FF8533",
          borderRadius: "8px",
        },
        elements: {
          formButtonPrimary: "sabxi-clerk-btn",
          socialButtons: "sabxi-clerk-social",
        },
      }}
    >
      <html lang="en" className={`${outfit.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
        <head>
          <ThemeScript />
        </head>
        <body suppressHydrationWarning>
          <SiteHeader />
          {children}
          <SiteFooter />
        </body>
      </html>
    </ClerkProvider>
  );
}
