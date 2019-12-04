import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		hasLogin:false,
		userInfo:{}
	},
	mutations:{
		login(state,provider){
			state.hasLogin = true
			state.userInfo = provider
			uni.setStorage({//缓存用户登录状态
				key:"userInfo",
				data:provider
			})
			console.log(state.userInfo)
		},
		logon(state){
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key:'userInfo'
			})
		}
	},
	getters:{},
	actions:{},
	modules:{}
})

export default store