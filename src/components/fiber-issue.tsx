import * as Atom from '@effect-atom/atom/Atom'
import { AtomRpcClient, ProtocolLive } from '@/domains/rpcs-client'
import * as Effect from 'effect/Effect'
import { useAtomSet, useAtomValue } from '@effect-atom/atom-react'
import * as RpcClient from '@effect/rpc/RpcClient'
import { Rpcs } from '@/domains/rpcs'
import * as FetchHttpClient from '@effect/platform/FetchHttpClient'
import * as HttpClient from '@effect/platform/HttpClient'
import * as Layer from 'effect/Layer'
import React from 'react'

const runtimeAtom = Atom.runtime(
  Layer.mergeAll(ProtocolLive, FetchHttpClient.layer),
)

const getHealthStatusAtom = runtimeAtom.fn(
  Effect.fn('getHealthStatusAtom')(function* () {
    const client = yield* RpcClient.make(Rpcs)
    // should give "Ok"
    const result = yield* client.Health()

    yield* Effect.logInfo(result)

    return result
  }),
)

const getHelloAtom = runtimeAtom.fn(
  Effect.fn('getHelloAtom')(function* () {
    const client = yield* HttpClient.HttpClient
    const response = yield* client.get('http://localhost:3000/api/hello')
    // should give "hello, world"
    const result = yield* response.text

    yield* Effect.log(result)
    return result
  }),
)

export function FiberIssue() {
  // using rpc
  // const getHealthStatus = useAtomSet(getHealthStatusAtom, { mode: 'promise' })
  // const healthStatus = useAtomValue(getHealthStatusAtom)
  const healthStatus = useAtomValue(AtomRpcClient.query('Health', void 0))

  // using http
  const getHello = useAtomSet(getHelloAtom, { mode: 'promise' })
  const hello = useAtomValue(getHelloAtom)

  // React.useEffect(() => {
  //   getHealthStatus(prefix)
  //   getHello(prefix)
  // }, [getHello, getHealthStatus])

  React.useEffect(() => {
    getHello()
  }, [getHello])

  return <div>check issue</div>
}
