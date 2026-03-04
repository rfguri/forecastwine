import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ServiceWorkerRegister } from "@/components/sw-register";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Forecast Wine | Biodynamic Wine Calendar",
  description: "Is today a good day to open wine? Check the biodynamic wine calendar forecast.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Forecast Wine",
  },
  openGraph: {
    title: "Forecast Wine",
    description: "Is today a good day to open wine?",
    type: "website",
    url: "https://forecastwine.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7B2D45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
