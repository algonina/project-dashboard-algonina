import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs/promises';
import envCompatible from 'vite-plugin-env-compatible';
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';
import vitePluginRequire from 'vite-plugin-require';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
  },
  preview: {
    port: 3001,
    host: 'localhost',
  },
  esbuild: {
    loader: 'jsx',
  },
  publicDir: '../public',
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  envPrefix: 'REACT_APP',
  plugins: [
    react({
      include: '**/*.js',
    }),
    EnvironmentPlugin('all', {
      prefix: 'REACT_APP',
    }),
    vitePluginRequire.default(),
  ],
  base: '/',
});
