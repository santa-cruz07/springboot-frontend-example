import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url))
    },
      server: {
          hmr: {
              overlay: false,
          },
          port: 3000,
          proxy: {
              '/api': {
                  target: 'http://toaster.local:8080',
                  ws: true,
                  changeOrigin: true
              }
          }
      }
  })
)
