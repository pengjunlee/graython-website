import '@/assets/styles/css/main.css'
// 图标css导入
import '@/assets/styles/iconfont/blossom/iconfont.css'
import '@/assets/styles/iconfont/graython/iconfont.css'
import '@/assets/styles/iconfont/weblogo/iconfont.js'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores/store-config'
import router from '@/router/index'
import '@/router/route-init'

// 重写element样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 主题样式
import '@/assets/styles/css/theme.css'


import BLRow from '@/components/BLRow.vue'
import BLCol from '@/components/BLCol.vue'
import BLTag from '@/components/BLTag.vue'

import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'
import common from './utils/common'

// 全局指令
import vSlideIn from '@/directives/vSlideIn'
import vLazy from '@/directives/vLazy'
import vViewRequest from '@/directives/vViewRequest'


const app = createApp(App)
app.directive('slide-in',vSlideIn)
app.directive('lazy',vLazy)
app.directive('view-request',vViewRequest)
app.use(pinia)
app.use(router)
// 挂载 $common 到 globalProperties 上
app.config.globalProperties.$common = common;

app.component('bl-row', BLRow)
.component('bl-col', BLCol)
.component('bl-tag', BLTag)
.component('svg-icon',SvgIcon)

app.mount('#app')