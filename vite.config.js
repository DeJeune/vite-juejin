import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {svgBuilder} from "./src/plugins/svgBuilder.js";
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  // 项目根目录
  root: process.cwd(),
  plugins: [vue(), svgBuilder('./src/icons/svg/')],
  // 在生产中服务时的基本公共路径
  base: process.env.VITE_PUBLIC_PATH,
  // 在开发时会被定义为全局变量，而在构建时则是静态替换
  define: '',
  // 静态资源服务的文件夹
  publicDir: 'assets',
  resolve: {
    // 目录别名
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  build: {
    // 压缩
    minify: "esbuild",
    assetsDir: "",
    outDir: `./dist/${process.env.VITE_ENV}`,
    brotliSize: false
  },
  ssr: false,
})
