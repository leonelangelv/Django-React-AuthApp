import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@services': path.resolve(__dirname, './src/services'),
      '@constant': path.resolve(__dirname, './src/constant'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import 'src/styles/index.css';`
      }
    }
  }
});
