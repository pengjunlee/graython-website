import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import Components from "unplugin-vue-components/vite";
// @ts-ignore
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// @ts-ignore
import { chromeExtension } from "./build/chromeExtension";


const npm_lifecycle_event = process.env.npm_lifecycle_event

const isSpring = () => {
  return npm_lifecycle_event && npm_lifecycle_event === 'build:spring'
}

console.log('当前运行脚本: ', npm_lifecycle_event)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: isSpring() ? '../graython-back/gray-website-adapter/src/main/resources/static/station' : 'dist',    // 警告大小, 单位kb
    assetsDir: "assets", // 静态资源目录
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  base: "./",// 设置项目的根路径
  // 服务端渲染
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 3001,
    host: "0.0.0.0",
    // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy: {
      // 第一个代理后端地址
      "^/website-api": {
        target: 'http://localhost:8081', // 本机 80 端口
        changeOrigin: true,           // 修改请求头中的 origin
        rewrite: (path) => path.replace(/^\/website-api/, ''), // 去除前缀
      },
    },
  },
  plugins: [
    vue(),
    // 按需加载 ant-design-vue
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    process.env.BUILD_CRX && chromeExtension(),
  ].filter(Boolean),
});
