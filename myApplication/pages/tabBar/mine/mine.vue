<template>
	<view class="mine">
		<view class="mine-excessive" >
			<view class="text" v-if="!isLogin">
				<view  class="login-text" @click="login">登录</view>
				<view class="login-desc" @click="login">立即登录，解锁更多功能！</view>
			</view>
			<view class="text a" v-else>
				<view class="login-text" >{{userInfo.name}}</view>
				<view class="login-desc" >{{userInfo.userName}}</view>
			</view>
			
			<view class="img" v-if="!isLogin">
				<image class="thumb" src="../../../static/img/portrait_icon.png" mode="头像"></image>
			</view>
			<view class="imgtext" v-else>
				{{aa}}
			</view>
		</view>
		<view class="mine-main">
			<view class="item" v-for="(item,index) in dataInfo" :key="index">
				<view>
					<image class="item-img" :src="item.img" :mode="item.text"></image>
				</view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
		<view class="login-v" v-if="!isLogin">
			<button type="primary" @click="login" class="login">立即登录</button>
		</view>
		<view class="login-v" v-else>
			<button type="primary" @click="logout" class="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
    import {getUserInfo,setUserInfo} from '../../../service.js';
	export default {
		data() {
			return {
				aa:"",
				dataInfo:[
					{id:0,img:"../../../static/img/center_list_icon1.png",text:"公司管理",url:""},
					{id:1,img:"../../../static/img/center_list_icon2.png",text:"设置",url:""},
				],
				isLogin:false,
				userInfo:{}
			};
		},
		onLoad() {
			let userInfo = getUserInfo();
			let nowTime = Math.round(new Date() / 1000);
			if(userInfo.overdue <= nowTime){
				let userIn = {user:false}
				setUserInfo(userIn);
				this.login()
			}else{
				this.isLogin = userInfo.isLogin;
				this.userInfo = userInfo
				this.aa = userInfo.name.substr(userInfo.name.length-2)
			}
		},
		methods:{
			login(){
				uni.reLaunch({
					url:"/pages/login/login"
				});
			},
			logout(){
				let userIn = {user:false}
				setUserInfo(userIn);
				let userInfo = getUserInfo();
				
				uni.reLaunch({
					url:"/pages/login/login"
				});
			}
		}
	}
</script>
<style>
	/* #ifdef APP-PLUS  MP-WEIXIN*/
	
	/* #endif */
	.mine-excessive{height:230upx;padding: 0 30upx;display: flex;justify-content: space-between;overflow: hidden;
		background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
		  background: -o-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Opera 11.1 - 12.0 */
		  background: -moz-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Firefox 3.6 - 15 */
		  background: linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* 标准的语法 */
	}
	.mine-excessive .thumb{width: 100upx;height: 100upx;margin-top: 29upx;border-radius: 50%;}
	.login-text{margin: 40upx 0 0;color: rgb(255,255,255);font-size: 34upx;}
	.login-desc{margin: 20upx 0 0;color: rgb(255,243,223);font-size: 24upx;}
	
	.mine-excessive .imgtext{width: 120upx;height:120upx;border-radius: 50%;background-color: red;text-align: center;line-height: 120upx;color: #fff;margin-top: 30upx;}
	.mine-main{border-radius: 10px 10px 0 0;margin-top: -50upx;background: #fff;padding: 30upx 30upx 0;}
	.item{display: flex;position: relative;margin: 30upx;}
	.item-img{width: 80upx;height: 80upx;}
	.item .text{margin-left: 30upx;line-height: 60upx;font-size: 30upx;color: rgb(102,102,102);}
	.item::after{font-family: uniicons;content: '\E583';font-size: 26px;position: absolute;right: 12px;top: 50%;color: #bbb;-webkit-transform: translateY(-50%);-ms-transform: translateY(-50%);transform: translateY(-50%);}
	.login-v {margin: 160upx;}
	.login-v .login{background-color: rgb(230,230,230);color: #FFFFFF;position: fixed;bottom: 160upx;left: 160upx;right: 160upx;}
	.login-v .logout{color: #FFFFFF;position: fixed;bottom: 160upx;left: 160upx;right: 160upx;
	background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
	  background: -o-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Opera 11.1 - 12.0 */
	  background: -moz-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Firefox 3.6 - 15 */
	  background: linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* 标准的语法 */}
</style>
