import { createFileRoute } from '@tanstack/react-router'
import { createServerOnlyFn } from '@tanstack/react-start'

const handler = createServerOnlyFn(async () => {
  const { AllRoutes } = await import('@/domains/http')
  const HttpLayerRouter = await import('@effect/platform/HttpLayerRouter')

  const { handler: webHandler } = HttpLayerRouter.toWebHandler(AllRoutes)
  return async ({ request }: { request: Request }) => {
    return await webHandler(request)
  }
})

export const Route = createFileRoute('/api/$')({
  server: {
    handlers: {
      GET: await handler(),
      POST: await handler(),
      OPTIONS: await handler(),
      ALL: await handler(),
      HEAD: await handler(),
      DELETE: await handler(),
      PUT: await handler(),
      PATCH: await handler(),
    },
  },
})
