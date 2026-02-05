import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  // 使用相对路径，支持直接打开 dist/index.html
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    viteSingleFile()  // 将所有资源内联到单个 HTML 文件
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    // 内联所有资源
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  }
});
