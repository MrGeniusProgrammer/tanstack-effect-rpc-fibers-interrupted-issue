import { createFileRoute } from '@tanstack/react-router'
import { createServerOnlyFn } from '@tanstack/react-start'

const handler = createServerOnlyFn(
  () =>
    async ({ request }: { request: Request }) => {
      const { AllRoutes } = await import('@/domains/http')
      const HttpLayerRouter = await import('@effect/platform/HttpLayerRouter')

      const { handler: webHandler } = HttpLayerRouter.toWebHandler(AllRoutes)

      return await webHandler(request)
    },
)

export const Route = createFileRoute('/api/$')({
  server: {
    handlers: {
      GET: handler(),
      POST: handler(),
      OPTIONS: handler(),
      ALL: handler(),
      HEAD: handler(),
      DELETE: handler(),
      PUT: handler(),
      PATCH: handler(),
    },
  },
})
