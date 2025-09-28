import { AllRoutes } from '@/domains/http'
import { HttpLayerRouter } from '@effect/platform'
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node'
import { Layer } from 'effect'
import { createServer } from 'http'

HttpLayerRouter.serve(AllRoutes).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { port: 5173 })),
  Layer.launch,
  NodeRuntime.runMain,
)
