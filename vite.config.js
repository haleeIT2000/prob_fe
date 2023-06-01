import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  server: {
    proxy: {
      '/public': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
