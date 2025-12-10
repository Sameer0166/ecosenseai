import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' must be './' for GitHub Pages to find assets in the correct folder
  base: './', 
  define: {
    // Safely shim process.env so the app doesn't crash in the browser
    'process.env': JSON.stringify({}),
  }
});