import { z } from 'zod'

export const sendMessageValidator = z.object({
  filedId: z.string(),
  message: z.string(),
})
