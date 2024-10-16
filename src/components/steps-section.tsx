import Link from 'next/link'

type StepsSectionProps = {
  label: string
  title: string
  description: string
  link?: {
    href: string
    label: string
  }
}

export function StepsSection({
  description,
  label,
  title,
  link,
}: StepsSectionProps) {
  return (
    <li className="md:flex-1">
      <div className="flex flex-col border-l-4 py-2 pl-4 border-muted-foreground md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
        <span className="text-sm font-medium text-blue-600">{label}</span>
        <span className="text-xl font-semibold">{title}</span>
        <span className="mt-2 text-muted-foreground">
          {description}{' '}
          {link?.href && (
            <Link
              href={link.href}
              className="text-blue-700 dark:text-blue-500 underline underline-offset-2 hover:text-blue-500 dark:hover:text-blue-600 "
            >
              {link.label}
            </Link>
          )}
          .
        </span>
      </div>
    </li>
  )
}
