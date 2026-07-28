import Navbar from '#/components/Navbar'
import ThemeToggle from '#/components/theme-toggle'
import { Switch } from '#/components/ui/switch'
import { authClient } from '#/lib/auth-client'
import { getSession } from '#/lib/auth.function'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location }) => {
    const sesssion = await getSession()
    if (!sesssion) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
})
function Home() {
  const { data } = authClient.useSession()
  return <div>hello</div>
}
