import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
plugins: [react()],
base: '/CS571Honors/',
build: {
outDir: 'docs'
}
})