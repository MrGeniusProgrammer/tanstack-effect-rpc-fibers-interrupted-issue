import { createRouter as createTanstackRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import * as Atom from '@effect-atom/atom/Atom'
import { RuntimeClientLayers } from './domains/runtime-client'

// Create a new router instance
export const getRouter = () => {
  Atom.runtime.addGlobalLayer(RuntimeClientLayers)

  return createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}
