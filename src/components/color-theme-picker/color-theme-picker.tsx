"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { memo } from "react"

import { ColorTheme, useColorTheme } from "../../contexts/color-theme/color-theme"

export const ColorThemePicker = memo(function ColorThemePicker() {
  const { setTheme } = useColorTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="underline focus-visible:outline-none">Change color theme</DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="grid rounded-md w-40 shadow-sm border bg-white dark:bg-dracula-dark 
      border-gray-100 dark:border-dracula-darker text-black dark:text-dracula-light"
        side="top"
        sideOffset={16}
      >
        <DropdownMenu.Item className="cursor-pointer py-2 px-2 text-left" asChild>
          <button onClick={() => setTheme(ColorTheme.Light)}>Light</button>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="cursor-pointer py-2 px-2 text-left" asChild>
          <button onClick={() => setTheme(ColorTheme.Dark)}>Dark</button>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="cursor-pointer py-2 px-2 text-left" asChild>
          <button onClick={() => setTheme(ColorTheme.System)}>System</button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
})
