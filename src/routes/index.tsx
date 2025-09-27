import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import * as Atom from '@effect-atom/atom/Atom'
import { AtomRpcClient, ProtocolLive } from '@/domains/rpcs-client'
import * as Effect from 'effect/Effect'
import { useAtomValue } from '@effect-atom/atom-react'
import * as RpcClient from '@effect/rpc/RpcClient'
import { Rpcs } from '@/domains/rpcs'
import * as FetchHttpClient from '@effect/platform/FetchHttpClient'
import * as HttpClient from '@effect/platform/HttpClient'
import * as Layer from 'effect/Layer'

export const Route = createFileRoute('/')({
  component: App,
})

const runtimeAtom = Atom.runtime(
  Layer.mergeAll(ProtocolLive, FetchHttpClient.layer),
)

const healthStatusAtom = runtimeAtom
  .atom(
    Effect.gen(function* () {
      const client = yield* RpcClient.make(Rpcs)
      // should give "Ok"
      return yield* client.Heaalth()
    }),
  )
  .pipe(Atom.keepAlive)

const helloAtom = runtimeAtom
  .atom(
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient
      const response = yield* client.get('http://localhost:3000/api/hello')
      // should give "hello, world"
      return yield* response.text
    }),
  )
  .pipe(Atom.keepAlive)

function App() {
  // using rpc
  const healthStatus = useAtomValue(healthStatusAtom)
  // const healthStatus = useAtomValue(AtomRpcClient.query('Heaalth', void 0))
  console.log('health: ', healthStatus)

  // using http
  const hello = useAtomValue(helloAtom)
  console.log('hello: ', hello)

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
