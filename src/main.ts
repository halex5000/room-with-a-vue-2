import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import { LDPlugin } from 'launchdarkly-vue-client-sdk'
import type { LDPluginOptions } from 'launchdarkly-vue-client-sdk'

import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    const { app } = ctx
    const launchDarklyPluginOptions: LDPluginOptions = {
      clientSideID: import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_ID,
    }
    app.use(LDPlugin, launchDarklyPluginOptions)
  },
)
