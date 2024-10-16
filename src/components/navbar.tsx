import Link from 'next/link'
import { MaxWithWrapper } from './max-with-wrapper'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRightIcon } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b bg-white/75 dark:bg-zinc-900/75 backdrop-blur-lg dark:border-zinc-800 transition-all">
      <MaxWithWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="fle z-40 font-semibold">
            <span>
              <span className="font-extrabold text-blue-500">PDF</span>Expert.
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center space-x-3 sm:flex">
              <Button asChild variant="ghost" size="sm">
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <LoginLink>Sign in</LoginLink>
              </Button>
              <Button asChild size="sm">
                <RegisterLink>
                  Get started <ArrowRightIcon className="size-4 ml-1.5" />
                </RegisterLink>
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6 hidden sm:flex" />
            <ModeToggle />
          </div>
        </div>
      </MaxWithWrapper>
    </nav>
  )
}
