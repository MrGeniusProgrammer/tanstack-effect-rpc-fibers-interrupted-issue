import * as ConfigProvider from 'effect/ConfigProvider'
import * as Layer from 'effect/Layer'
import * as Logger from 'effect/Logger'
import * as ManagedRuntime from 'effect/ManagedRuntime'

export const RuntimeClientLayers = Layer.empty.pipe(
  Layer.provideMerge(
    Layer.setConfigProvider(ConfigProvider.fromJson(import.meta.env)),
  ),
  (layer) => {
    if (!import.meta.env.DEV) return layer
    return Layer.provideMerge(
      Logger.replace(
        Logger.defaultLogger,
        Logger.prettyLogger({
          mode: 'browser',
        }),
      ),
      layer,
    )
  },
)

export const RuntimeClient = ManagedRuntime.make(RuntimeClientLayers)
