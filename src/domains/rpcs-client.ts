import { AtomRpc } from '@effect-atom/atom-react'
import * as FetchHttpClient from '@effect/platform/FetchHttpClient'
import * as RpcClient from '@effect/rpc/RpcClient'
import * as RpcSerialization from '@effect/rpc/RpcSerialization'
import * as Layer from 'effect/Layer'

import { Rpcs } from './rpcs'

export const ProtocolLive = RpcClient.layerProtocolHttp({
  url: `http://localhost:3000/api/rpc/`,
}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerNdjson]))

// Use AtomRpc.Tag to create a special Context.Tag that builds the RPC client
export class AtomRpcClient extends AtomRpc.Tag<AtomRpcClient>()(
  'AtomRpcClient',
  {
    group: Rpcs,
    // Provide a Layer that provides the RpcClient.Protocol
    protocol: ProtocolLive,
  },
) {}
