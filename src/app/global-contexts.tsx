"use client"

import { ColorThemeProvider } from "../contexts/color-theme/color-theme"

export function GlobalContexts({ children }: { children: React.ReactNode }) {
  return <ColorThemeProvider>{children}</ColorThemeProvider>
}
