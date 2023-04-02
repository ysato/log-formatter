import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
  plugins: [react(), stylelint(), eslint()],
});
