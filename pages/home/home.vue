<template>
	<view>
		<u-navbar :title="title" :is-back="false" height="100" :border-bottom="false">
			<view style="width: 100%;">
				<u-tabs :list="list" font-size="35" :current="current" @change="change"></u-tabs>
				<u-search shape="square" height="70" color="#909399" margin="30rpx" :disabled="true" :show-action="false"></u-search>
			</view>
		</u-navbar>
		<!-- <u-grid :col="3" :border="false">
			<u-grid-item>
				<u-icon name="/static/image/ranking.png" :size="64"></u-icon>
				<view class="u-font-13 u-light-color">排行</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="/static/image/end.png" :size="64"></u-icon>
				<view class="u-font-13 u-light-color">完结</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="/static/image/book.png" :size="64"></u-icon>
				<view class="u-font-13 u-light-color">新书</view>
			</u-grid-item>
		</u-grid> -->
		<mescroll-body-diy @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
			<view class="wrap">
				<view class="item">
					<view class="title">
						猜你都喜欢
					</view>
					<view class="bookcard">
						<view class="u-body-item" v-for="itme in 9" @click="tabinfo">
							<image src="https://img03.sogoucdn.com/v2/thumb/resize/w/146/h/196?appid=10070003&name=F65C3F52C78D1B347E6D793D08AC40DE&from=vrv2vr4type4pc" mode="aspectFill"></image>
							<view class="content">
								<view class="booktitle">仙武帝尊</view>
								<view class="bookcontent u-line-2 u-light-color">
									九千年前，仙武帝尊率领百万神将打入太古洪荒，却无一人归来，只有一缕真火遗留世间。九千年后，门派废徒叶辰，被赶出宗门，无以为家，机缘巧合之下偶得真火，再踏仙武之路。这是一个神魔仙佛并立的世界，这是一个诸天万域混乱的年代，叶辰的逆天征途，由此开始。
								</view>
								<view class="bookfoot">
									<view class="tag">
										<u-tag style="margin-right: 10rpx;" text="奇幻玄幻" type="info" mode="plain" size="mini" />
										<u-tag style="margin-right: 10rpx;" text="奇幻玄幻" type="info" mode="plain" size="mini" />
									</view>
									<view class="msg u-light-color">
										连载 ~ 100万人气
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body-diy>
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
				title: '',
				list: [{
					name: '推荐'
				}, {
					name: '男频'
				}, {
					name: '女频'
				}],
				current: 0,
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
			// console.log(this.$u.config.v);
		},
		methods: {
			change(index) {
				this.current = index;
			},
			tabinfo(){
				this.$u.route({
					url: 'pages/book/bookinfo'
				})
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
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		padding: 18rpx;
	}
	.item {
		margin: 30rpx 0;
		margin-top: 20rpx;
		.title {
			font-size: 38rpx;
			font-weight: bold;
			position: relative;
			line-height: 1;
			padding-left: 25rpx;
		}
	}
	.bookcard {
		margin-top: 20rpx;
	}
	.u-body-item {
		display: flex;
		height: auto;
		font-size: 32rpx;
		color: #333;
		padding: 18rpx 10rpx;
		.content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 30rpx;
			.booktitle {
				font-size: 35rpx;
				line-height: 40rpx;
			}
			.bookcontent {
				font-size: 28rpx;
				margin-top: 10rpx;
			}
			.bookfoot {
				align-items: flex-end;
				display: flex;
				justify-content: space-between;
				width: 100%;
				.tag {
					justify-content: flex-start;
				}
				.msg {
					font-size: 12px;
					align-content: flex-start;
				}
			}
		}
	}
		
	.u-body-item image {
		width: 125rpx;
		flex: 0 0 120rpx;
		height: 180rpx;
		border-radius: 8rpx;
		margin-left: 15rpx;
	}
</style>
