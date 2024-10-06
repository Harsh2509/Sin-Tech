import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Head from "next/head";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title:
    "Sin-Tech Electronics - Affordable UPS, Inverters, Solar Solutions, and Batteries",
  description:
    "Discover the most affordable and high-quality UPS, inverters, solar panels, batteries, and more at Sin-Tech Electronics. Power your life with reliable solutions.",
  keywords:
    "UPS, Inverters, Solar Panels, Batteries, Affordable Electronics, Sin-Tech Electronics, Power Solutions, Delhi, Sin-Tech",
  authors: [
    {
      name: "Sin-Tech Electronics",
      url: "https://www.sintechelectronic.com",
    },
  ],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Sin-Tech Electronics - Powering Your World",
    description:
      "Explore affordable and reliable power solutions including UPS, inverters, solar panels, and batteries at Sin-Tech Electronics.",
    type: "website",
    url: "https://www.sintechelectronic.com",
    images: [
      {
        url: "/ogImage.png",
        width: 800,
        height: 600,
        alt: "Sin-Tech Electronics Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ogImage =
    Array.isArray(metadata?.openGraph?.images) &&
    metadata.openGraph.images.length
      ? (metadata.openGraph.images[0] as {
          url: string;
          width: number;
          height: number;
          alt: string;
        }) // Access the first image in the array
      : (metadata?.openGraph?.images as {
          url: string;
          width: number;
          height: number;
          alt: string;
        });
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={metadata?.openGraph?.title as string}
        />
        <meta
          property="og:description"
          content={metadata?.openGraph?.description}
        />
        <meta property="og:url" content={metadata?.openGraph?.url as string} />
        <meta property="og:type" content={"website"} />

        {ogImage && (
          <>
            <meta property="og:image" content={ogImage.url} />
            <meta
              property="og:image:width"
              content={ogImage.width.toString()}
            />
            <meta
              property="og:image:height"
              content={ogImage.height.toString()}
            />
            <meta property="og:image:alt" content={ogImage.alt} />
          </>
        )}
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={metadata?.openGraph?.title as string}
        />
        <meta
          name="twitter:description"
          content={metadata?.openGraph?.description}
        />
        {ogImage && <meta name="twitter:image" content={ogImage.url} />}
      </Head>
      <html lang="en">
        <body className={cn(poppins.className)}>
          <Navbar />
          {children}
        </body>
      </html>
    </>
  );
}
