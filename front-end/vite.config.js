import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src'),
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, 'src/components'),
      // eslint-disable-next-line no-undef
      '@pages': path.resolve(__dirname, 'src/pages'),
      // eslint-disable-next-line no-undef
      '@libs': path.resolve(__dirname, 'src/libs'),
      // eslint-disable-next-line no-undef
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      // eslint-disable-next-line no-undef
      '@context': path.resolve(__dirname, 'src/context')
    }
  },
  server: {
    host: true, 
    port: 3000, 
  },
})
