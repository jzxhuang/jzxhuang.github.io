import { createContext, useContext, useEffect, useState } from "react"

import { createContextStub } from "../context-stub"

const LOCAL_STORAGE_KEY = "colorTheme"

export const enum ColorTheme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

const DefaultColorTheme = ColorTheme.System

interface IColorThemeContext {
  theme: ColorTheme
  setTheme: React.Dispatch<React.SetStateAction<ColorTheme>>
}

const iniitalState: IColorThemeContext = {
  theme: DefaultColorTheme,
  setTheme: createContextStub("ColorThemeProvider"),
}

const applyDarkTheme = () => {
  document.documentElement.classList.add("dark")
  document.documentElement.classList.remove("light")
}

const applyLightTheme = () => {
  document.documentElement.classList.remove("dark")
  document.documentElement.classList.add("light")
}

const applyClassForTheme = (theme: ColorTheme) => {
  switch (theme) {
    case ColorTheme.Dark:
      applyDarkTheme()
      break
    case ColorTheme.Light:
      applyLightTheme()
      break
    default:
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyDarkTheme()
      } else {
        applyLightTheme()
      }
  }
}

const ColorThemeContext = createContext(iniitalState)

export const ColorThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage === "undefined") {
      return DefaultColorTheme
    }

    const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY)
    return (localStorageValue as ColorTheme) || DefaultColorTheme
  })

  useEffect(() => {
    applyClassForTheme(theme)
    localStorage.setItem(LOCAL_STORAGE_KEY, theme)
  }, [theme])

  return <ColorThemeContext.Provider value={{ theme, setTheme }}>{children}</ColorThemeContext.Provider>
}

export const useColorTheme = () => useContext(ColorThemeContext)
