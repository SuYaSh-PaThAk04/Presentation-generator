import { auth } from '#/lib/auth'
import { AUTH_LOGIN_PATH, isLoginPath, isPublicPath } from '#/lib/auth-paths'

import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import { redirect } from '@tanstack/react-router'

export const authMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ request, next }) => {
    const { pathname } = new URL(request.url)
    const headers = getRequestHeader()
    const session = auth.api.getSession({ headers })

    if (isLoginPath(pathname) && session) throw redirect({ to: '/' })
    if (isPublicPath(pathname)) return next()
    if (!session) throw redirect({ to: AUTH_LOGIN_PATH })

    return next({ context: { session } })
  },
)
