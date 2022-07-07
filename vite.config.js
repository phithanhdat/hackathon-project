import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^~/, replacement: '' }],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { 'primary-color': '#ab33d4' },
        javascriptEnabled: true,
      },
    },
  },
})
