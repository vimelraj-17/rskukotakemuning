import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryBasePath = '/rskukotakemuning/'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: mode === 'production' ? env.VITE_BASE_PATH || repositoryBasePath : '/',
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  }
})
