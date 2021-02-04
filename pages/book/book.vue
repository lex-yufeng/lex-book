<template>
	<view>
		<nav-bar type="transparentFixed" :titleCenter="false" :scrollTop="scrollTop" transparentFixedFontColor="rgba(0, 0, 0, 0)">
			<view slot="left" style="padding-left: 30px;">
				<text style="font-weight: bold;font-size: 50rpx;margin-right:10rpx;">100</text>
				<text>分钟</text>
			</view>
			<view slot="right">
				<u-icon name="search" :size="50" style="margin-right: 20px;"></u-icon>
				<u-icon :name="vuex_bookbutton" :size="50" style="margin-right: 20px;" @click="tabook"></u-icon>
			</view>
			<view slot="transparentFixedRight" style="color: #000000;">
				<u-icon name="search" :size="50" style="margin-right: 20px;"></u-icon>
				<u-icon :name="vuex_bookbutton" :size="50" style="margin-right: 20px;" @click="tabook"></u-icon>
			</view>
		</nav-bar>
		<view class="status_bar" style="background-image: url(../../static/image/bj.jpg);background-position:center;">
			<view style="margin-left:50px;text-align:center;margin-top: calc(var(--status-bar-height) + 30px);position: absolute;">
				<view style="font-weight: bold;font-size: 70rpx;">100</view>
				<text class="u-font-10 u-type-info-info">今日已读/分钟</text>
			</view>
		</view>
		<view class="book-wrap">
			<view class="title"> 
				最近阅读
			</view>
			<image src="https://img03.sogoucdn.com/v2/thumb/resize/w/146/h/196?appid=10070003&name=F65C3F52C78D1B347E6D793D08AC40DE&from=vrv2vr4type4pc" mode="aspectFill"></image>
			<view class="content">
				<view class="booktitle">仙武帝尊</view>
				<view class="bookcontent u-line-2 u-light-color">
					上次阅读至 31 章
				</view>
				<view class="bookfoot u-light-color">
					继续阅读 >
				</view>
			</view>
			<view class="foot">
				<u-line length="65px" margin="30rpx" direction="col" :hair-line="false"></u-line>
				<u-icon name="clock" :size="60" color="#82848a" label-color="#82848a" label-pos="bottom" label="阅读记录"></u-icon>
			</view>
		</view>
		<view style="margin-top:97px;">
			<mescroll-body-diy height="470px" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				<view v-if="vuex_bookstyle == 'card'">
					<u-row style="padding:0 30rpx;margin-top:5rpx;">
						<u-col span="4" style="margin-bottom: 40rpx;padding:0 23rpx;" v-for="(itme,index) in booklist" @click="tabinfo">
							<view class="book-grid-item" @longtap="touchstart(index)">
								<view class="image">
									<u-lazy-load style="width:100%;" border-radius="6" height="250" :image="itme.image" threshold="300" img-mode="aspectFill"></u-lazy-load>
									<u-badge v-if="itme.reading" :absolute="false" :is-dot="true" type="error" style="margin-left:-8rpx;margin-top:-5rpx;"></u-badge>
								</view>
								<view class="title u-line-1">
									{{ itme.name }}
								</view>
								<view class="u-light-color u-font-12">
									{{ itme.read ==0 ?'未读' : itme.read+'章' }}/{{ itme.newest }}章
								</view>
							</view>
						</u-col>
						<u-col span="4" style="margin-bottom: 40rpx;padding:0 23rpx;" @click="gohome">
							<view class="book-grid-item">
								<view class="u-book-wrap u-flex u-row-center">
									<u-icon name="/static/image/san_book.png" size="80" label="点我发现\n更多书籍" label-pos="bottom" label-size="23" label-color="#cdcdcd" margin-top="20"></u-icon>
								</view>
								<view style="height: 45px;"></view>
							</view>
						</u-col>
					</u-row>
				</view>
				
				<view v-if="vuex_bookstyle == 'list'">
					<u-swipe-action :options="options" btn-width="120" style="width:100%;padding-bottom: 40rpx;" v-for="(itme,index) in booklist">
						<view class="u-body-item" @click="tabinfo">
							<!-- <image :src="itme.image" mode="aspectFill"></image> -->
							<u-lazy-load class="images" height="160" :image="itme.image" threshold="300" img-mode="aspectFill"></u-lazy-load>
							<view class="content">
								<view class="booktitle">
									<view>{{ itme.name }}</view>
									<view style="position: absolute;right:120rpx;margin-right: 30rpx;">
										<u-tag v-if="itme.update" style="margin-right: 10rpx;" text="更新" type="error" mode="dark" size="mini" />
										<u-tag v-if="itme.reading" style="margin-right: 10rpx;" text="上次阅读" mode="dark" size="mini" />
									</view>
								</view>
								<view class="bookcontent u-line-2">
									更新至：{{ itme.newestname }}
								</view>
								<view class="bookfoot">
									<view class="msg u-type-info-dark">
										<u-icon name="bookmark" color="u-type-info-dark"></u-icon>
										{{ itme.read ==0 ?'未读' : '已读'+itme.read+'章' }}
									</view>
								</view>
							</view>
						</view>
					</u-swipe-action>
				</view>
				<view style="margin-bottom:30rpx;">
					<u-divider>您的书架共有9本书</u-divider>
				</view>
			</mescroll-body-diy>
		</view>
		<u-tabbar v-model="vuex_current" :activeColor="vuex_activeColor" :list="vuex_tabbar"></u-tabbar>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBodyDiy from "@/components/mescroll-diy/book/mescroll-body.vue";
	export default {
		mixins: [MescrollMixin], 
		components: {
			MescrollBodyDiy 
		},
		data() {
			return {
				btnWidth: 180,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],		
				booklist:[
					{
						image: '/static/image/196.jpg',
						name: '仙武帝尊',
						read: 699,
						newest: 700,
						newestname: '第700章 我是你爹',
						update: true,
						reading:true
					},
					{
						image: "https://pic.baike.soso.com/ugc/baikepic2/19045/cut-20191023134121-548097394_jpg_190_238_7208.jpg/300",
						name: '元尊',
						read: 0,
						newest: 1384,
						newestname: '第一千三百八十四章 再聚苍玄',
						update: false,
						reading:false
					},
					{
						image: 'https://bookcover.yuewen.com/qdbimg/349573/1209977/180',
						name: '斗破苍穹',
						read: 0,
						newest: 1624,
						newestname: '第一千六百二十四章 结束，也是开始。〔大结局〕',
						update: false,
						reading:false
					},
					{
						image: 'https://bookcover.yuewen.com/qdbimg/349573/2048120/180',
						name: '武动乾坤',
						read: 0,
						newest: 1327,
						newestname: '第1327章 新书大主宰已发。',
						update: false,
						reading:false
					},
					{
						image: 'http://img03.sogoucdn.com/app/a/10070003/4F3048984D05ABC2098AF9FBB7036EDE',
						name: '大主宰',
						read: 0,
						newest: 1551,
						newestname: '第一千五百五十一章 邪神陨落（大结局）',
						update: false,
						reading:false
					},
					{
						image: '/static/image/196.jpg',
						name: '仙武帝尊',
						read: 699,
						newest: 700,
						newestname: '第700章 我是你爹',
						update: false,
						reading:false
					},
					{
						image: '/static/image/196.jpg',
						name: '仙武帝尊',
						read: 699,
						newest: 700,
						newestname: '第700章 我是你爹',
						update: false,
						reading:false
					},
					{
						image: '/static/image/196.jpg',
						name: '仙武帝尊',
						read: 699,
						newest: 700,
						newestname: '第700章 我是你爹',
						update: false,
						reading:false
					},
					{
						image: '/static/image/196.jpg',
						name: '仙武帝尊',
						read: 699,
						newest: 700,
						newestname: '第700章 我是你爹',
						update: false,
						reading:false
					},
					{
						image: '/static/image/196.jpg',
						name: '仙武帝尊',
						read: 699,
						newest: 700,
						newestname: '第700章 我是你爹',
						update: false,
						reading:false
					}
				],
				scrollTop:0,
				downOption: {
					auto: false,
					offset: 50
				},
				upOption: {
					auto: true,
					use : false, 
					isBounce: true,
					page: {
						num : 0 , 
						size : 10 , 
						time : null 
					},
					empty:{
						use : true , 
						icon : null , 
						tip : "暂无相关数据",
						btnText : "", 
						fixed: false, 
						top: "100rpx", 
						zIndex: 99 
					}
				}
			}
		},
		onShow() {
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			tabinfo(){
				this.$u.route({
					url: 'pages/book/bookinfo'
				})
			},
			touchstart(index){
				console.log(index)  
				return false;
			},
			tabook(){
				if(this.vuex_bookstyle == 'card'){
					this.$u.vuex('vuex_bookstyle', 'list');
					this.$u.vuex('vuex_bookbutton', 'list-dot');
				}else if(this.vuex_bookstyle == 'list'){
					this.$u.vuex('vuex_bookstyle', 'card');
					this.$u.vuex('vuex_bookbutton', 'grid');
				}
				// this.mescroll.scrollTo(0);
				// this.mescroll.triggerDownScroll()
			},
			/*下拉刷新的回调 */
			downCallback() {
				setTimeout(() => {
				 	this.mescroll.endSuccess();
				}, 2000);
				
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				setTimeout(() => {
				 	this.mescroll.endErr();
				}, 2000);
			},
			gohome(){
				this.$u.route({
					type: 'tab',
					url: 'pages/home/home'
				})
			}
		}
	}
</script>
<style lang="scss">
	.u-body-item {
		display: flex;
		height: auto;
		width: 100%;
		padding-left: 30rpx;
		color: #333;
		.content {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 30rpx;
			.booktitle {
				display: flex;
				padding-top: 5rpx;
				font-size: 30rpx;
				line-height: 40rpx;
			}
			.bookcontent {
				color: #82848a;
				font-size: 25rpx;
			}
			.bookfoot {
				align-items: flex-end;
				display: flex;
				justify-content: space-between;
				width: 100%;
				.msg {
					font-size: 12px;
				}
			}
		}
	}
	.u-body-item .images {
		width: 125rpx;
		flex: 0 0 120rpx;
		height: 160rpx;
		// border-radius: 6rpx;
		margin-left: 15rpx;
	}
	.book-grid-item {
		display: flex;
		flex-direction: column;
		width: auto;
		.image {
			display: flex;
			width: 100%;
		}
		.title {
			line-height: 40rpx;
			padding-top: 15rpx;
		}
		.u-book-wrap {//虚线边框
			width: auto;
			height: 250rpx;
			border-width: 1px;
			border-color: #ddd;
			border-style: dashed;
			background-color: rgb(250, 250, 250);
			border-radius: 6px;
		}
	}
	
	.status_bar {
		height: calc(var(--status-bar-height) + 130px); 
		width: 100%;
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
		height: auto;
		margin-top: -15px;
		left: 30rpx;
		right: 30rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		.title {
			text-align: center;
			writing-mode: vertical-lr;
			padding: 46rpx 10rpx;
			font-size: 23rpx;
			color: #2b85e4;
			font-weight: bold;
			background-color: #E3F1FC;
		}
		.content {
			display: flex;
			flex-direction: column;
			padding: 25rpx 25rpx 0 0;
			.booktitle {
				font-size: 28rpx;
				line-height: 40rpx;
			}
			.bookcontent {
				font-size: 25rpx;
			}
			.bookfoot {
				margin-top: 28rpx;
				font-size: 25rpx;
			}
		}
		.foot {
			display: flex;
			position: absolute;
			right: 30rpx;
		}
	}
	.book-wrap image {
		padding: 25rpx;
		width: 100rpx;
		height: 140rpx;
	}
</style>
