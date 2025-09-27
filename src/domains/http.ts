import * as RpcSerialization from '@effect/rpc/RpcSerialization'
import * as RpcServer from '@effect/rpc/RpcServer'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import { AppRpcs, Rpcs } from './rpcs'
import * as HttpLayerRouter from '@effect/platform/HttpLayerRouter'
import * as HttpServerResponse from '@effect/platform/HttpServerResponse'

const AppRpcsLive = AppRpcs.toLayer({
  Heaalth: () => Effect.succeed('Ok'),
})

const HelloRoute = HttpLayerRouter.add(
  'GET',
  '/api/hello',
  HttpServerResponse.text('hello, world!'),
)

const RpcRoute = RpcServer.layerHttpRouter({
  group: Rpcs,
  path: '/api/rpc',
  protocol: 'http',
}).pipe(
  Layer.provideMerge(AppRpcsLive),
  Layer.provide(RpcSerialization.layerNdjson),
)

export const AllRoutes = Layer.mergeAll(RpcRoute, HelloRoute)
