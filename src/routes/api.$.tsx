import { createFileRoute } from '@tanstack/react-router'
import { createServerOnlyFn } from '@tanstack/react-start'

const buildHandler = createServerOnlyFn(async () => {
  const { AllRoutes } = await import('@/domains/http')
  const HttpLayerRouter = await import('@effect/platform/HttpLayerRouter')

  const { handler: webHandler } = HttpLayerRouter.toWebHandler(AllRoutes)

  return async ({ request }: { request: Request }) => {
    return await webHandler(request)
  }
})

const handler = await buildHandler()

export const Route = createFileRoute('/api/$')({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
      OPTIONS: handler,
      ALL: handler,
      HEAD: handler,
      DELETE: handler,
      PUT: handler,
      PATCH: handler,
    },
  },
})
