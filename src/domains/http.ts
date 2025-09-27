import * as RpcSerialization from '@effect/rpc/RpcSerialization'
import * as RpcServer from '@effect/rpc/RpcServer'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import { AppRpcs, Rpcs } from './rpcs'

const AppRpcsLive = AppRpcs.toLayer({
  Heaalth: () => Effect.succeed('Ok'),
})

const RpcRoute = RpcServer.layerHttpRouter({
  group: Rpcs,
  path: '/api/rpc',
  protocol: 'http',
}).pipe(
  Layer.provideMerge(AppRpcsLive),
  Layer.provide(RpcSerialization.layerNdjson),
)

export const AllRoutes = Layer.mergeAll(RpcRoute)
