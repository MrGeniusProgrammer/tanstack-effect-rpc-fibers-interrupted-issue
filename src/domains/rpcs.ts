import * as RpcGroup from '@effect/rpc/RpcGroup'
import * as Rpc from '@effect/rpc/Rpc'
import * as Schema from 'effect/Schema'

export class AppRpcs extends RpcGroup.make(
  Rpc.make('Heaalth', {
    success: Schema.String,
  }),
) {}

export class Rpcs extends RpcGroup.make().merge(AppRpcs) {}
