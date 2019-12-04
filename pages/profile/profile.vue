<template>
	<view>
		<view>
			<button type="primary" @click="login">我的</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login(){
				uni.navigateTo({
					url:"../public/login"
				})
			}
		}
	}
</script>

<style scoped>

</style>
