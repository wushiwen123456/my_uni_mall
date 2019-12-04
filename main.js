import Vue from 'vue'
import App from './App'
import store from '@/store'
import Json from '@/Json.js'
Vue.config.productionTip = false


// 设置全局toast
const msg = (title,duration = 1500,mask = false,icon = 'none') => {
	if(!!title){
		return 
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	})
}

	// 模拟数据请求
const json = type => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type])
		},500)
	})
}

// 获取上一个页面
const prePage = () => {
	let pages = getCurrentPages()
	let prePage = pages[pages.length - 2]
	// #ifdef H5
	return prePage
	// #endif
	return prePage.$vm
}

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue()
Vue.prototype.$store = store

Vue.prototype.$api = { msg,json,prePage }
App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
