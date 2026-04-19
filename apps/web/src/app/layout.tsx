import "@workspace/ui/globals.css"

import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { preconnect } from "react-dom";
import { CombinedJsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { getNavigationData } from "@/lib/navigation";

const fontGalaxieCopernicus = localFont({
  variable: "--font-galaxie-copernicus",
  src: [
    {
      path: "../fonts/Copernicus-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../fonts/Copernicus-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  const nav = await getNavigationData();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content={"#f3f0ed"} name="theme-color" />
      </head>
      <body className={`${fontGalaxieCopernicus.variable} antialiased`}>
        <Navbar navbarData={null} settingsData={nav.settingsData} />
        {children}
       
       
        <CombinedJsonLd includeOrganization includeWebsite />
        {(await draftMode()).isEnabled && (
          <>
            <PreviewBar />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
