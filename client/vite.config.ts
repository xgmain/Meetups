import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/x-date-pickers',
      '@emotion/react',
      '@emotion/styled'
    ]
  },
  server: {
    port: 3000
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    mkcert()
  ],
})
