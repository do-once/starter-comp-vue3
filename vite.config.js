/**
 * @author GuangHui
 * @description vite 配置
 */

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default {
  define: {
    /** 构建标志 */
    /** https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags */
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  resolve: {
    alias: {
      /* vite启动本地服务时使用的index.html，其中使用了template语法，所以无法使用runtime版本 */
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: format => {
        return `index.${format}.js`
      },
      formats: ['es']
    },
    rollupOptions: {
      external:Object.keys(pkg?.peerDependencies ?? [])
    }
  },
  plugins: [
    vue(),
    /* 生成声明文件 */
    dts({
      rollupTypes:true
    })
  ]
}