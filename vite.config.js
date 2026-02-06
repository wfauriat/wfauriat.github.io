import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          // Helper function to include partial HTML files
          include: (file) => {
            const filePath = path.resolve(__dirname, 'src/partials', file)
            return fs.readFileSync(filePath, 'utf-8')
          }
        }
      }
    })
  ],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html')
      }
    }
  },
  server: {
    open: true  // Auto-open browser on npm run dev
  }
})
