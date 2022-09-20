import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    createVuePlugin(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    // checker({
    //   eslint: {
    //     lintCommand: 'eslint "js/**/*.{js,vue}"'
    //   },
    // }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'TodoDir': `${__dirname}/src/js/todo`,
      'TodoRouterDir': `${__dirname}/src/js/todoRouter`,
      'TodoVuexDir': `${__dirname}/src/js/todoVuex`,
      'VuexSample': `${__dirname}/src/js/todoVuex_sample`,
    },
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
      ],
    },
  },
  server: {
    open: true,
    port: 8080,
  },
});
