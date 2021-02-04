<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false"></u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">uView ui</view>
				<view class="u-font-14 u-tips-color">微信号:helang_uView</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<!-- <u-icon name="scan" color="#969799" size="28"></u-icon> -->
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="阅读口味"></u-cell-item>
				<u-cell-item icon="photo" title="阅读记录"></u-cell-item>
				<u-cell-item icon="coupon" title="评论记录"></u-cell-item>
				<u-cell-item icon="heart" title="意见反馈"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="登录" @tap='taplogin'></u-cell-item>
			</u-cell-group>
		</view>
		<u-tabbar v-model="vuex_current" :activeColor="vuex_activeColor" :list="vuex_tabbar"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'http://q1.qlogo.cn/g?b=qq&nk=23898589&s=100',
				show:true
			}
		},
		onLoad() {
			
		},
		methods: {
			taplogin(){
				uni.navigateTo({
				    url: '/pages/index/login'
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
