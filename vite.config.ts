import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset URLs allow the app to work from a GitHub Pages project subpath.
  base: './',
  server: { host: '0.0.0.0', port: 4173, strictPort: true },
  preview: { host: '0.0.0.0', port: 4173, strictPort: true },
  worker: { format: 'es' },
});
