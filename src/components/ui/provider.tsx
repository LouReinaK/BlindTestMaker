import React, { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider({ children }: PropsWithChildren<{}>) {
  return (
    <ChakraProvider>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}

export default Provider
