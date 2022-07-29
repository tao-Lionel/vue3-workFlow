import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(
  ({ mode }) => {
    const env = loadEnv(mode, __dirname)
    return {
      resolve: {
        alias: [
          {
            find: "@",
            replacement: resolve(__dirname, "./src")
          }
        ]
      },
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "./src")
        }
      ],
      server: {
        port: 5005,

      },
      define: {
        'process.env': {
          'BASE_URL': '/'
        }
      },
      plugins: [vue()]
    }
  },
)
