import * as Layer from 'effect/Layer'
import * as Logger from 'effect/Logger'

export const RuntimeServerLayers = Layer.empty.pipe((layer) => {
  if (process.env.DEV !== 'true') return layer
  return Layer.provideMerge(
    Logger.replace(
      Logger.defaultLogger,
      Logger.prettyLogger({
        mode: 'tty',
      }),
    ),
    layer,
  )
})
