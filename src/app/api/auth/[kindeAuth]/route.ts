import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server'
import type { NextRequest } from 'next/server'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function GET(request: NextRequest, { params }: any) {
  const endpoint = params.kindeAuth
  return handleAuth(request, endpoint)
}
