import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// In dev, the Vite SPA middleware intercepts /resume_*.pdf requests and serves index.html.
// Workaround: embed PDFs as base64 data URLs at config time so no HTTP request is needed.
// In production (GitHub Pages), static files are served directly — the normal path works fine.
const toDataUrl = (filePath) =>
  `data:application/pdf;base64,${fs.readFileSync(filePath).toString('base64')}`

const pdfEnPath = path.resolve(__dirname, 'src/public/resume_en.pdf')
const pdfFrPath = path.resolve(__dirname, 'src/public/resume_vf.pdf')
const pdfcourse1 = path.resolve(__dirname, 'src/public/J1_ProbaStats.pdf')
const pdfcourse2 = path.resolve(__dirname, 'src/public/J5_Decision.pdf')

export default defineConfig({
  plugins: [
    tailwindcss(),
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
  define: {
    __PDF_DATA_URL_EN__: JSON.stringify(toDataUrl(pdfEnPath)),
    __PDF_DATA_URL_FR__: JSON.stringify(toDataUrl(pdfFrPath)),
    __PDF_DATA_URL_C1__: JSON.stringify(toDataUrl(pdfcourse1)),
    __PDF_DATA_URL_C2__: JSON.stringify(toDataUrl(pdfcourse2)),
  },
  root: 'src',
  publicDir: path.resolve(__dirname, 'src/public'),
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
