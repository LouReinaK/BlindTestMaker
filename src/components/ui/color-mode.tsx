import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { IconButton, Skeleton } from '@chakra-ui/react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function ColorModeProvider(props: React.PropsWithChildren<{}>) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
}

export function useColorMode() {
  // next-themes hooks are not typed here for brevity
  const { resolvedTheme, setTheme, forcedTheme }: any = (React as any).useContext?.(null) || {}
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, any>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      <Skeleton boxSize="9">
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
          size="sm"
          ref={ref}
          {...props}
        >
          <ColorModeIcon />
        </IconButton>
      </Skeleton>
    )
  },
)

export const LightMode = React.forwardRef(function LightMode(props: any, ref: any) {
  return <span ref={ref} {...props} />
})

export const DarkMode = React.forwardRef(function DarkMode(props: any, ref: any) {
  return <span ref={ref} {...props} />
})
