<template>
	<view class="content">
		<!-- 示例代码 开始-->
		<nav-bar  type="transparentFixed" :scrollTop="scrollTop" transparentFixedFontColor="#FFF" :bgColor="['#f00','#00cdff']" title="透明固定导航">
			<view slot="right" class="search_box"></view>
			<view slot="transparentFixedRight" class="search_transparent_box"></view>
		</nav-bar>
		<u-tabbar v-model="vuex_current" :activeColor="vuex_activeColor" :list="vuex_tabbar"></u-tabbar>
	</view>
</template>

<script>
	import navBar from "@/components/zhouWei-navBar"
	export default {
		components:{
			navBar
		},
		data() {
			return {
				scrollTop:0
			}
		},
		onLoad() {

		},
		methods: {

		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
</style>
