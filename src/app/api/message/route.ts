import { db } from '@/db'
import { sendMessageValidator } from '@/lib/validators/send-message-validator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import type { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const { id: userId } = user

  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { filedId, message } = sendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: { id: filedId, userId },
  })

  if (!file) return new Response('Not found', { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId: file.id,
    },
  })
}
