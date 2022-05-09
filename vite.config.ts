import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: './auto-imports.d.ts'
    })
  ],
  base: './',
  server: {
    host: true
  },
  build: {
    // 消除打包大小超过 500kb 警告
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    // 移除 console.log、debugger 和 注释
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
        // pure_funcs: ['console.log']
      },
      output: {
        // 删除注释
        comments: false
      }
    }
  }
})
