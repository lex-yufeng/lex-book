import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_bookstyle','vuex_bookbutton'];
// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		vuex_bookstyle: lifeData.vuex_bookstyle ? lifeData.vuex_bookstyle : 'card',
		vuex_bookbutton: lifeData.vuex_bookbutton ? lifeData.vuex_bookbutton : 'grid',
		vuex_systemInfo: uni.getSystemInfoSync(),
		vuex_current: 1,
		vuex_activeColor: '#5098FF',
		vuex_tabbar: [{
				iconPath: "home",
				selectedIconPath: "home-fill",
				text: '书城',
				pagePath: '/pages/home/home',
			},
			{
				iconPath: "bookmark",
				selectedIconPath: "bookmark-fill",
				text: '书架',
				pagePath: '/pages/book/book',
			},
			{
				iconPath: "grid",
				selectedIconPath: "grid-fill",
				text: '分类',
				pagePath: '/pages/class/class',
			},
			{
				iconPath: "account",
				selectedIconPath: "account-fill",
				text: '我的',
				pagePath: '/pages/user/user',
			}
		]
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
