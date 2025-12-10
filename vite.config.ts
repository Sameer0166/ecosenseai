import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' should be set to './' so assets load correctly on GitHub Pages (e.g. username.github.io/repo-name)
  base: './', 
  define: {
    // Shim process.env to prevent crashes when accessing process.env.API_KEY in the browser
    'process.env': {}
  }
});