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
				<image class="thumb" src="/static/img/portrait_icon.png" mode=""></image>
			</view>
			<view class="imgtext" @tap="goSetting" v-if="isLogin && Headimg">
				<image class="img" :src="Headimg" mode="aspectFill"></image>
			</view>
			<view class="imgtext" @tap="goSetting"  v-else>
				{{aa}}
			</view>
		</view>
		
		<view class="banner">
			<image class="img" src="/static/img/bannermine.png" mode="aspectFill"></image>
			<view class="title">审核人员专用</view>
			<view class="desc">快速审批，提高审核效率。</view>
		</view>
		<uni-collapse :accordion="true" border="0" >
			<uni-collapse-item :open=" false " :title="item.title" :show-animation="true" v-for="(item,index) in collData" :key="index">
				<view class="con-c" v-html="item.content">
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<view class="login-v" v-if="!isLogin">
			<button  @click="login" class="login">立即登录</button>
		</view>
		<!-- <button @click="restpwd" class="restpwd">修改密码</button>
		<button @click="logout" class="logout">退出登录</button> -->
	
	</view>
</template>

<script>
	import {baseIp} from "@/config.js"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
    import {getUserInfo,setUserInfo,getHeadimg,setHeadimg} from '@/service.js';
	export default {
		components: {uniCollapse,uniCollapseItem,},
		data() {
			return {
				Headimg:'',
				aa:"",
				isLogin:false,
				userInfo:{},
				collData:[
					{
						id:0,
						title:"关于APP",
						content:`本应用不提供注册方式,如有需求联系主管.<br/>本应用提供外出审批,用车审批,请假审批,上下班打卡等服务.<br/>`,
					},{
						id:1,
						title:"常见问题",
						content:`1.位置不准确:为确保打卡位置与您当前的位置保持一致,请在打卡时确保手机信息服务为开启状态.<br/>`,
					},
				]
			};
		},
		onPullDownRefresh() {
			this.getother();
		},
		onLoad() {
			this.getInfo();
			if(getHeadimg()){
				this.Headimg = getHeadimg().headimg
			}
		},
		onNavigationBarButtonTap(e) {
			this.goSetting()
		},
		methods:{
			goSetting(){
				uni.navigateTo({
					url: '/pages/mine/setting/setting'
				});
			},
			getother(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=readPhoto_YD&userId=${that.userInfo.userName}`					
				uni.request({
					url,
					success:res=>{
						let data = res.data;
						uni.stopPullDownRefresh();
						if(data.headImg){
							var headimg = data.headImg;
							var i = headimg.indexOf("ams");
							var img = headimg.substring(i);
							img = img.replace(/\\/g, '/')
							headimg = `${baseIp()}/${img}`;
							setHeadimg(headimg)
							that.Headimg = headimg;
						}
					}
				})
			},
			// 初始化
			getInfo(){
				if(getUserInfo()){
					var userInfo = getUserInfo();
					this.isLogin = userInfo.isLogin;
					this.userInfo = userInfo
					this.aa = userInfo.name.substr(userInfo.name.length-2)
				}
			},
			// 点击登录
			login(){
				uni.reLaunch({
					url:"/pages/login/login"
				});
			},
			// 推出
			logout(){
				let userIn = {user:false}
				setUserInfo(userIn);
				let userInfo = getUserInfo();
				
				uni.reLaunch({
					url:"/pages/login/login"
				});
			},
			restpwd(){
				uni.navigateTo({url:"/pages/pwd/pwd"})
			}
		}
	}
</script>
<style scoped>
	.mine{width: 100%;}
	/* #ifdef APP-PLUS */
	
	/* #endif */
	.mine-excessive{height:180upx;padding: 0 30upx;display: flex;justify-content: space-between;overflow: hidden;
		background: rgb(56, 147, 243); 
	}
	.mine-excessive .thumb{width: 100upx;height: 100upx;margin-top: 29upx;border-radius: 50%;}
	.login-text{margin: 60upx 0 0;color: rgb(255,255,255);font-size: 34upx;}
	.login-desc{margin: 0;color: rgb(255,243,223);font-size: 24upx;}
	
	.banner{position: relative; color: #fff; width: 96%;height: 100px;margin: 20upx 24upx;margin: 20upx auto;border-radius:10upx;overflow: hidden;background: url(/static/img/bannermine.png) ;background-size: 100% 100%; ;background-repeat: no-repeat;}
	.banner .img{width: 100%;height: 100%;position: absolute;top: 0;left: 0; z-index: -10;}
	.banner .title{font-size: 36upx; margin:14upx 100upx 0;}
	.banner .desc{font-size: 28upx;margin: 14upx 52upx 0;}
	
	
	.mine-excessive .imgtext{width: 120upx;height:120upx;border-radius: 50%;background-color: #fff;text-align: center;line-height: 120upx;color: rgb(56, 147, 243);margin-top: 36upx;}
	.mine-excessive .imgtext .img{width: 100%;height: 100%;border-radius: 50%;}
	.mine-main{border-radius: 10px 10px 0 0;margin-top: -50upx;background: #fff;padding: 30upx 30upx 0;}
	.item{display: flex;position: relative;margin: 30upx;}
	.item-img{width: 80upx;height: 80upx;}
	.item .text{margin-left: 30upx;line-height: 60upx;font-size: 30upx;color: rgb(102,102,102);}
	.item::after{font-family: uniicons;content: '\E583';font-size: 26px;position: absolute;right: 12px;top: 50%;color: #bbb;-webkit-transform: translateY(-50%);-ms-transform: translateY(-50%);transform: translateY(-50%);}
	.login-v {margin: 160upx;}
	.login-v .login{background-color: rgb(230,230,230);color: #FFFFFF;position: fixed;bottom: 160upx;left: 160upx;right: 160upx;}
	.logout{color: #FFFFFF;position: fixed;bottom: 160upx;left: 40px;right: 40px;height: 42px;line-height: 42px;background-color: rgb(255, 128, 31);}
	.restpwd{color: #FFFFFF;position: fixed;bottom: 60upx;left: 40px;right: 40px;height: 42px;line-height: 42px;background-color: rgb(255, 128, 31);}
	.uni-collapse{margin: 72upx auto 0;width: 100%;}
	.uni-collapse-cell--open{    background-color: #fafbfb;}
	.con-c{padding: 10upx 20upx 50upx;}
	
	.uni-collapse-cell:after,.uni-collapse:before,.uni-collapse:after{height: 0;}
</style>
