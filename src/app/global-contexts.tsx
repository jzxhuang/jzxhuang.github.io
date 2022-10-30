"use client"

import { ColorThemeProvider } from "../contexts/color-theme/color-theme"
import { MouseFollowerProvider } from "../contexts/mouse-follower/mouse-follower"

export function GlobalContexts({ children }: { children: React.ReactNode }) {
  return (
    <ColorThemeProvider>
      <MouseFollowerProvider>{children}</MouseFollowerProvider>
    </ColorThemeProvider>
  )
}
