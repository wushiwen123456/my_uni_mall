import http from '@/http'


// 请求主页商品列表数据
export function getHomeData(type,page,showModal){
	return http({
		url:'http://106.54.54.237:8000/api/v1/home/data',
		data:{
			type,
			page
		},
		method:"GET",
		showModal:!!showModal
	})
}
