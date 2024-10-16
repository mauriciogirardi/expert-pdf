import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type TMaxWithWrapperProps = {
  className?: string
  children: ReactNode
}

export function MaxWithWrapper({ children, className }: TMaxWithWrapperProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
        className
      )}
    >
      {children}
    </div>
  )
}
