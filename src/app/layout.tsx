import { Open_Sans } from "@next/font/google"

import { GlobalContexts } from "./global-contexts"

import "./globals.css"

const openSans = Open_Sans({ subsets: ["latin"], display: "swap" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Jeff Huang | jzxhuang</title>
        <meta name="description" content="Personal portfolio site :)" />
        {/* Google Search Console */}
        <meta name="google-site-verification" content="oWN-7MScfVJWYHbPM5BGkrlsIX1d_y9HSFpIPP1myNI" />

        {/* Favicon generated with https://realfavicongenerator.net/*/}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000405" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-zinc-50 dark:bg-dracula-dark">
        <GlobalContexts>{children}</GlobalContexts>
      </body>
    </html>
  )
}