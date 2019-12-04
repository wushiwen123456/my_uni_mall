// 登录,注册,重置密码的方法
import http from '@/http'

export function login(data){
	return http({
		url:"http://156.236.72.165:8082/login",
		data:{
			...data
		},
		method:"GET"
	})
}