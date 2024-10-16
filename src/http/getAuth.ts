import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export async function getUser(params?: string) {
  const { getUser: getUserKinder } = getKindeServerSession()
  const userKinder = await getUserKinder()

  let path: string
  if (params) {
    path = `/auth-callback?origin=dashboard/${params}`
  } else {
    path = '/auth-callback?origin=dashboard'
  }

  if (!userKinder || !userKinder.id) redirect(path)

  const dbUser = await db.user.findFirst({
    where: { id: userKinder.id },
  })

  if (!dbUser) redirect(path)

  return dbUser
}
