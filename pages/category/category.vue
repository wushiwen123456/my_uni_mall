<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside" >
			<view 
				class="f-item b-b" 
				v-for="(item,index) in first" :key="item.id" 
				@click="firstClick(item,index)"
				:class="{active:index == firstCurrent}"
			>
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-y scroll-with-animation class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop" >
			<view v-for="(item,index) in slist" :key="index" :id="'main' + item.id" >
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view v-for="(vo,key) in tlist" :key="key" v-if="vo.pid == item.id" class="t-item">
						<image :src="vo.picture" mode=""></image>
						<text>{{vo.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				first:[],
				slist:[],
				tlist:[],
				firstCurrent:0,
				sizeCalcState:false,
				tabScrollTop:0 // y轴滚动的距离
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			// 网络相关方法
			async loadData(){
				let list = await this.$api.json('cateList')
				list.forEach(item => {
					if(!item.pid){
						this.first.push(item)
					}else if(!item.picture){
						this.slist.push(item)
					}else{
						this.tlist.push(item)
					}
					
				})
			},
			
			// 监听滚动相关方法
			firstClick(item,index){
				this.firstCurrent = index
				if(!this.sizeCalcState){
					this.calcSize()
				}
				let cur = this.slist.findIndex( x => x.pid == item.id)
				this.tabScrollTop = this.slist[cur].top
			},
			// 滚动时监听
			asideScroll(e){
				const top = e.detail.scrollTop
				if(!this.sizeCalcState){
					this.calcSize()
				}
				const tabs = this.slist.filter(x => x.top <= top).reverse()
				if(tabs.length > 0 ){
					this.firstCurrent = tabs[0].pid-1
				}
			},
			// 计算tabBar右侧栏每个高度信息
			calcSize(){
				let h = 0
				this.slist.forEach(x => {
					let view = uni.createSelectorQuery().select('#main' + x.id)
					view.fields({
						size:true
					},data => {
						x.top = h
						h += data.height 
						x.bottom = h
					}).exec()
				})
				this.sizeCalcState = true
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content{
		height: 100%;
		background-color: #f8f8f8;
	}
	.content{
		display: flex;
	}
	.left-aside{
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}
	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background-color: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
