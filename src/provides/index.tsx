'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { TRPCProvider } from './trpc-provider'

export function ProvidesClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCProvider>{children}</TRPCProvider>
    </ThemeProvider>
  )
}
