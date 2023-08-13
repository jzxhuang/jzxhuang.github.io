"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useTheme } from "next-themes"
import { memo } from "react"
import { MdOutlineDarkMode, MdOutlineDesktopWindows, MdOutlineLightMode } from "react-icons/md"

export const ColorThemePicker = memo(function ColorThemePicker() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="underline focus-visible:outline-none" asChild>
        <button className="relative inline-flex h-4 w-4 px-0">
          <MdOutlineLightMode className="h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MdOutlineDarkMode className="absolute h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Change color theme</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="grid w-40 overflow-hidden rounded-md bg-white 
      p-1 text-black shadow-sm dark:border-dracula-darker dark:bg-dracula-dark dark:text-dracula-light"
        side="top"
        sideOffset={8}
        align="end"
      >
        <DropdownMenu.Item
          className="flex cursor-pointer items-center rounded py-2 px-2 text-left outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-dracula-darker-400"
          onClick={() => setTheme("light")}
        >
          <MdOutlineLightMode className="mr-2" />
          <span>Light</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="flex cursor-pointer items-center rounded py-2 px-2 text-left outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-dracula-darker-400"
          onClick={() => setTheme("dark")}
        >
          <MdOutlineDarkMode className="mr-2" />
          <span>Dark</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="flex cursor-pointer items-center rounded py-2 px-2 text-left outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-dracula-darker-400"
          onClick={() => setTheme("system")}
        >
          <MdOutlineDesktopWindows className="mr-2" />
          <span>System</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
})
