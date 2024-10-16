import { MaxWithWrapper } from '@/components/max-with-wrapper'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { BackgroundPolygon } from '@/components/background-polygon'
import { StepsSection } from '@/components/steps-section'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <>
      <MaxWithWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            PDFExpert is now public!
          </p>
        </div>

        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chat with your <span className="text-blue-600">documents</span> in
          seconds.
        </h1>

        <p className="mt-5 max-w-prose light:text-zinc-700 dark:text-zinc-400 sm:text-lg">
          PDFExpert allows you to have conversations with any PDF document.
          Simply upload your file and start asking questions right away.
        </p>

        <Button asChild size="lg" className="mt-5">
          <Link href="/dashboard" target="_blank" className="flex items-center">
            Get started <ArrowRightIcon className="size-4 ml-2" />
          </Link>
        </Button>
      </MaxWithWrapper>

      <div>
        <div className="relative isolate">
          <BackgroundPolygon />

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-0">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-blue-900/35 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-blue-400/10  lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    priority
                    quality={100}
                    src="/dashboard-preview.jpg"
                    alt="product preview"
                    width={1364}
                    height={866}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 dark:ring-blue-400/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <BackgroundPolygon className="left-[calc(50%-13rem)] sm:left-[calc(50%-36rem)]" />
        </div>
      </div>

      <div className="mx-auto my-32 max-w-5xl sm:mt-56 ">
        <div className="mt-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 dark:text-zinc-300 sm:text-5xl">
              Start chatting in minutes.
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Chatting to your PDF files has never been easier than with
              PDFExpert.
            </p>
          </div>
        </div>

        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <StepsSection
            label="Step 1"
            title="Sign up for an account"
            description="Either staring out with free plan or choose our pro plan"
            link={{ href: '/pricing', label: 'pro plan' }}
          />
          <StepsSection
            label="Step 2"
            title="Upload your PDF file"
            description="We'll process your file make it ready for you to chat with"
          />
          <StepsSection
            label="Step 3"
            title="Start asking questions"
            description="It's that simple. Try out PDFExpert today - it really takes less than a minute"
          />
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-0">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-blue-900/35 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-blue-400/10  lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                priority
                quality={100}
                src="/file-upload-preview.jpg"
                alt="uploading preview"
                width={1419}
                height={732}
                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 dark:ring-blue-400/10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
