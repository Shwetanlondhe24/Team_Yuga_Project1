import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/yuga/', // Replace <repository-name> with your GitHub repo name
});
