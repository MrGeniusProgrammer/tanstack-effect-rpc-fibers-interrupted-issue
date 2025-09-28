import { AtomRpc } from '@effect-atom/atom-react'
import * as FetchHttpClient from '@effect/platform/FetchHttpClient'
import * as BrowserSocket from '@effect/platform-browser/BrowserSocket'
import * as BrowserHttpClient from '@effect/platform-browser/BrowserHttpClient'
import * as RpcClient from '@effect/rpc/RpcClient'
import * as RpcSerialization from '@effect/rpc/RpcSerialization'
import * as Layer from 'effect/Layer'

import { Rpcs } from './rpcs'

export const ProtocolLive = RpcClient.layerProtocolHttp({
  url: `http://localhost:3000/api/rpc/`,
}).pipe(
  Layer.provide([
    // BrowserHttpClient.layerXMLHttpRequest,
    FetchHttpClient.layer,
    RpcSerialization.layerNdjson,
  ]),
)

// export const ProtocolLive = RpcClient.layerProtocolSocket().pipe(
//   Layer.provide([
//     BrowserSocket.layerWebSocket('http://localhost:3000/api/rpc/'),
//     RpcSerialization.layerNdjson,
//   ]),
// )

// Use AtomRpc.Tag to create a special Context.Tag that builds the RPC client
export class AtomRpcClient extends AtomRpc.Tag<AtomRpcClient>()(
  'AtomRpcClient',
  {
    group: Rpcs,
    // Provide a Layer that provides the RpcClient.Protocol
    protocol: ProtocolLive,
  },
) {}
