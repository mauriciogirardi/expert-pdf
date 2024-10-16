import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function getUser() {
  const { getUser: getUserKinder } = getKindeServerSession()
  const user = await getUserKinder()

  return { user }
}
