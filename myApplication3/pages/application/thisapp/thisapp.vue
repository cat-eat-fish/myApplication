<template>
	<view>
		
	</view>
</template>

<script>
    import {getUserInfo,setUserInfo} from '@/service.js';
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			uni.showLoading({title:"加载中...",mask:true});
			let nowTime = Math.round(new Date() / 1000);
			if(getUserInfo()){
				let userInfo = getUserInfo();
				if(userInfo.overdue <= nowTime){
					uni.hideLoading()
					let userIn = {user:false}
					setUserInfo(userIn);
					uni.reLaunch({
						url:"/pages/login/login"
					});
				}else if(!getUserInfo().isLogin){
					uni.hideLoading()
					uni.reLaunch({url: '/pages/login/login'});
				}else{
					uni.hideLoading()
					uni.switchTab({url:"/pages/tabBar/information/information"})
				}
			}else{
				uni.hideLoading()
				uni.reLaunch({url: '/pages/login/login'});
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
