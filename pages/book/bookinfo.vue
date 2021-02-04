<template>
	<view>
		<nav-bar type="transparentFixed" title="斗破苍穹" :scrollTop="scrollTop" transparentFixedFontColor="rgba(0, 0, 0, 0)">
			<view slot="left" style="padding-left: 15px;">
				<u-icon name="arrow-left" :size="45"></u-icon>
			</view>
			<view slot="transparentFixedLeft" style="padding-left: 15px;color: #FFFFFF;">
				<u-icon name="arrow-left" :size="45"></u-icon>
			</view>
			<view slot="right">
				<u-icon name="download" :size="45" style="margin-right: 20px;"></u-icon>
				<u-icon name="zhuanfa" :size="45" style="margin-right: 20px;"></u-icon>
			</view>
			<view slot="transparentFixedRight" style="color: #FFFFFF;">
				<u-icon name="download" :size="45" style="margin-right: 20px;"></u-icon>
				<u-icon name="zhuanfa" :size="45" style="margin-right: 20px;"></u-icon>
			</view>
		</nav-bar>
		<view class="status_bar">
			<view class="bg"></view>
			<view class="content" :style="'padding-top:'+vuex_systemInfo.statusBarHeight+'px'">
				<view class="wrap">
					<view class="header">
						<image src="https://bookcover.yuewen.com/qdbimg/349573/1209977/180" mode="aspectFill"></image>
						<view class="header-content">
							<view class="booktitle">斗破苍穹</view>
							<view class="bookcontent">
								天蚕土豆
							</view>
							<view class="u-flex u-font-25">
								完结 <u-line color="#FFFFFF" direction="col" length='30' :hair-line="false" margin="0rpx 10rpx"></u-line> 1150万字
							</view>
							<view>
								<u-tag text="奇幻玄幻" type="info" mode="dark" size="mini" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="book-wrap">
			<u-grid :col="3" :border="false">
				<u-grid-item>
					<view style="font-weight: bold;font-size: 40rpx;">8.7</view>
					<u-rate :current="3.7" size="25" active-color="#ff9900" :disabled="true"></u-rate>
				</u-grid-item>
				<u-grid-item>
					<view style="font-weight: bold;font-size: 40rpx;">1330万</view>
					<text style="font-size: 25rpx;color:#909399">在读人数</text>
				</u-grid-item>
				<u-grid-item>
					<view style="font-weight: bold;font-size: 40rpx;">1330万</view>
					<text style="font-size: 25rpx;color:#909399">人气值</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="wrap" style="margin-top:80px;margin-left: 20rpx;">
			<view style="font-weight: bold;font-size: 33rpx;">内容简介</view>
			<view class="u-flex u-margin-top-30">
				<u-tag class="u-margin-right-10" text="奇幻玄幻" type="info" mode="dark" bg-color="#f4f4f5" color="#82848a"/>
				<u-tag class="u-margin-right-10" text="奇幻玄幻" type="info" mode="dark" bg-color="#f4f4f5" color="#82848a"/>
				<u-tag class="u-margin-right-10" text="奇幻玄幻" type="info" mode="dark" bg-color="#f4f4f5" color="#82848a"/>
			</view>
			<view style="padding: 10rpx;">
				<u-read-more style="height: auto;" :toggle="true" show-height="250">
					<rich-text :nodes="content"></rich-text>
				</u-read-more>
			</view>
			<view class="u-flex" @click="tabcatalog">
				<view class="u-flex-1" style="font-weight: bold;font-size: 33rpx;">目录</view>
				<u-section class="u-flex-6" color="#909399" :show-line="false" :bold="false" title="连载至114章" sub-title="查看更多"></u-section>
			</view>
		</view>

		<view v-show="catalog" class="group" style="animation-duration:0.2s;"
			:class="animation?'animation-catalog-bottom':'animation-reverse animation-slide-bottom'" 
			:style="{height: (vuex_systemInfo.windowHeight-100) +'px'}" @touchmove.stop.prevent="">
			<view class="header">
				<view class="title">目录</view>
				<view @click="tabcatalog">
					<u-icon class="close" name="close" size="28"></u-icon>
				</view>
			</view>
			<view class="content">
				<view style="position:absolute;left:40rpx;color:#2979ff;">共114章</view>
				<view style="position:absolute;right:40rpx;" @click="tabsore">
					<u-icon custom-prefix="icon-book" :name="sore?'daoxu':'zhengxu'" :label="sore?'倒序':'正序'" size="28" color="#2979ff" label-color="#2979ff"></u-icon>
				</view>
			</view>
			<mescroll-uni height="550px" @init="mescrollInit" :down="downOption" :up="upOption">
				<view style="padding:30rpx 30rpx;font-size:28rpx;font-weight: bold;color:#606266;" v-for="(item,index) in cataloglist">
					第{{index}}章 {{item.name}}
				</view>
			</mescroll-uni>
		</view>
		<u-gap height="30" bg-color="#f3f4f6"></u-gap>
		<view class="wrap" style="margin-left: 20rpx;">
			<view style="font-weight: bold;font-size: 33rpx;margin-bottom: 10rpx">第一章</view>
			<u-read-more style="height: auto;" :toggle="true">
				<rich-text :nodes="text"></rich-text>
			</u-read-more>
		</view>
		<view class="wrap" style="margin-left: 20rpx;">
			<view style="font-weight: bold;font-size: 33rpx;">版权信息</view>
			<view style="margin-top: 20rpx;color:#909399">本书的数字版权由“起点中文网”提供并授权发行，如有任何疑问，请通过"我的-意见反馈"告知我们。</view>
		</view>
		<u-divider>我是有底线的</u-divider>
		<view style="height:200rpx;width: 100%;"></view>
		<view class="tabbar u-border-top u-flex tabbar_bottom">
			<view class="u-flex-7 u-text-center">
				<u-icon custom-prefix="icon-book" name="jiarushujia" size="40" label-size="30" label="加入书架" color="#2979ff" label-color="#2979ff"></u-icon>
			</view>
			<u-button @click="goread" class="u-flex-6" type="primary" shape="circle" style="margin: 10rpx;background-image: linear-gradient(45deg, #0081ff, #1cbbb4);">免费阅读</u-button>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				scrollTop:0,
				animation:false,
				catalog: false,
				sore: true,
				content: `这里是属于斗气的世界，没有花俏艳丽的魔法，有的，仅仅是繁衍到巅峰的斗气！`,
				text: `“斗之力，三段！” <br>&emsp;&emsp;望着测验魔石碑上面闪亮得甚至有些刺眼的五个大字，少年面无表情`,
				downOption: {
					use : false
				},
				upOption: {
					use : false
				},
				cataloglist: [
					{
						name:'陨落的天才1'
					},
					{
						name:'陨落的天才2'
					},
					{
						name:'陨落的天才3'
					},
					{
						name:'陨落的天才4'
					},
					{
						name:'陨落的天才5'
					},
					{
						name:'陨落的天才6'
					},
					{
						name:'陨落的天才7'
					}
				]
			}
		},
		onShow() {
			console.log(123)
		},
		methods: {
			tabcatalog(){
				let that = this;
				if(!this.catalog){
					this.animation = true;
					this.catalog = true;
				}else{
					this.animation = false;
					setTimeout(()=>{
						that.catalog = false;
					},300)
				}
			},
			tabsore(){
				this.cataloglist = this.cataloglist.reverse();
				this.sore = !this.sore;
			},
			goread(){
				this.$u.route({
					url: 'pages/book/read'
				})
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			}
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: calc(var(--status-bar-height) + 200px); 
		width: 100%;
		overflow: hidden;
		.bg {
			width: 100%;
			height: 100%;
			background: url('https://bookcover.yuewen.com/qdbimg/349573/1209977/180');
			background-position: left;
			// background-size: cover;
			-webkit-filter: blur(2px);
			-moz-filter: blur(2px);
			-ms-filter: blur(2px);
			-o-filter: blur(2px);
			filter: blur(40px);
		}
		.content {
			position:absolute;
			top: calc(var(--status-bar-height));
		}
	}
	.wrap {
		padding: 18rpx;
	}
	.header {
		display: flex;
		height: auto;
		font-size: 32rpx;
		color: #FFFFFF;
		padding: 0rpx 35rpx;
		.header-content {
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;
			.booktitle {
				font-family: sans-serif;
				font-size: 38rpx;
				font-weight: bold;
			}
			.bookcontent {
				font-size: 28rpx;
				margin-top: 10rpx;
			}
		}
	}
	.header image {
		width: 180rpx;
		height: 240rpx;
		border-radius: 8rpx;
		margin-left: 15rpx;
	}
	.book-wrap {
		margin-bottom: 15px;
		border-radius: 2px;
		background-color: #fff;
		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, .05);
		-webkit-box-shadow: #d4d2d2 0px 0px 10px;
		-moz-box-shadow: #d4d2d2 0px 0px 10px;
		
		position: absolute;
		display: flex;
		overflow:hidden;
		height: 160rpx;
		width: auto;
		margin-top: -15px;
		left: 30rpx;
		right: 30rpx;
		border-radius: 25rpx;
		background-color: #FFFFFF;
	}

	.group {
		position: fixed;
		top: calc(var(--status-bar-height) + 80px); 
		width: 100%;
		padding: 18rpx;
		overflow: hidden;
		background-color: #FFFFFF;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		z-index: 999;
		.header {
			justify-content:center;
			.title {
				color: #303133;
				font-size: 35rpx;
				font-weight: bold;
			}
			.close {
				color: #c0c4cc;
				position: absolute;
				right: 40rpx;
				padding-top: 10rpx;
			}
		}
		.content {
			padding: 30rpx 35rpx;
			margin-bottom: 30rpx;
		}
	}
	.tabbar {
		width: 100%;
		height: 55px;
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
	}
</style>
