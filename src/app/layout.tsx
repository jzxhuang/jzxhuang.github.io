import clsx from "clsx"
import { Open_Sans } from "next/font/google"
import { type Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

const openSans = Open_Sans({ subsets: ["latin"], display: "swap", variable: "--font-sans" })

const DESCRIPTION = "Hi! My name is Jeff. I like to code, travel, eat, and drink tea :)"

export const metadata: Metadata = {
  title: "Jeff Huang | jzxhuang",
  description: DESCRIPTION,
  keywords: ["Jeff Huang", "jzxhuang"],
  // OG image generated using @vercel/og in open-graph.tsx (just to experiment)
  // See https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#image-files-jpg-png-gif
  openGraph: {
    title: "Jeff Huang | jzxhuang",
    description: DESCRIPTION,
  },
  manifest: "/site.webmanifest",
  // Google Search Console
  verification: {
    google: "oWN-7MScfVJWYHbPM5BGkrlsIX1d_y9HSFpIPP1myNI",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable} suppressHydrationWarning>
      <body className={clsx("bg-background text-foreground font-sans", openSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
