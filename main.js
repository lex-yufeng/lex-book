import Vue from 'vue'
import App from './App'
import store from '@/store'
import uView from "uview-ui";
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import navBar from "@/components/zhouWei-navBar";
Vue.component('nav-bar', navBar)
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.use(uView);
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
