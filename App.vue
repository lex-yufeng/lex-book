<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	@import "uview-ui/index.scss";
</style>
<style>
	@import "./static/icon/iconfont.css";
	@import '/static/css/animation.css';
	/*每个页面公共css */
	.tabbar_bottom {
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}  
</style>
