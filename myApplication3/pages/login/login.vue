<template>
    <view class="login">
		<view class="login-excessive"></view>
		<view class="login-main">
			<view class="login-text">登录</view>
			<view class="input-row user">
				<view class="iconfont iconicon-test1  loginIcon"></view>
				<input type="text" class="m-input" value="" v-model="account" placeholder="请输入账号"  />
				<!-- <m-input ison="true" class="m-input" type="text" clearable  v-model="account" placeholder="请输入账号" @focus="onFocus" @blur="onBlur"></m-input> -->
			</view>
			<view class="input-row pass">
				<view class="iconfont iconicon-test loginIcon"></view>
				<input type="password" class="m-input" value="" v-model="password" placeholder="请输入密码"  />
				<!-- <m-input class="m-input" type="password"  displayable clearable  v-model="password" placeholder="请输入密码" ></m-input> -->
			</view>
			<view>
				<image @click="bindLogin" class="loginBtn" src="/static/img/login.png" mode=""></image>
			</view>
		</view>
		<view class="forgetPassword" @click="goF" style="display: none;">
			<text class="forgetPasswordText">忘记密码？</text>
			<image class="forgetPasswordImg"  src="../../static/img/login.png" mode=""></image>
		</view>
		<view class="goReg"  @tap="goReg">去注册</view>
		<!-- #ifdef APP-PLUS -->
		<view class="version">
			当前版本：{{version}}
		</view>
		<!-- #endif -->
    </view>
</template>

<script>
	import {baseIp} from "@/config.js"
    import {getUserInfo,setUserInfo,setCid,setHeadimg,getHeadimg} from '@/service.js';
    import {mapState,mapMutations} from 'vuex'
    import mInput from '../../components/m-input.vue'
    export default {
        components: {mInput},
        data() {
            return {
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
                positionTop: 0,
				
				userF:false,
				passF:false,
				
				version:'',	//版本号
				
				info:{
					latitude:'',
					longitude:'',
				}
            }
        },
        computed: mapState(['forcedLogin']),
		
		onLoad() {
			var that = this;
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,function(inf){
				that.version = inf.version;
				that.setVersion(inf.version);
			})
			// #endif
			let userInfo = getUserInfo();
			var that = this;
			if(userInfo.isLogin === true){
				uni.reLaunch({
					url:"/pages/tabBar/mine/mine"
				})
			}
		},
        methods: {
			
			...mapMutations(['login','setVersion']),
			goReg(){
				uni.navigateTo({url:'/pages/register/register'})
			},
			goF(){
				uni.navigateTo({
					url:"/pages/pwd/pwd"
				})
			},
			// #ifdef APP-PLUS
			setCiid(){
				var pinf = plus.push.getClientInfo();  
				var cid = pinf.clientid;//客户端标识 
				setCid(cid);
				var url = `${baseIp()}/ams/system/distribute.htm?module=push_YD&userId=${getUserInfo().userName}&clientId=${cid}`;
				// console.log(url)
				uni.request({
					url,
					success: (res) => {
						let data = res.data;
						// console.log(data)
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			},
			// #endif
			
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({icon: 'none',title: '账号最短为 5 个字符'});
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({icon: 'none',title: '密码最短为 6 个字符'});
                    return;
                }
                const data = {
                    account: this.account,
                    password: this.password
                };
				uni.showLoading({title:"登录中...",mask:true});
				var clientid = plus.push.getClientInfo().clientid;
				var that = this,
				
					url = `${baseIp()}/ams/system/distribute.htm?module=login&methodyd=1&username=${data.account}&password=${data.password}&clientid=${clientid}`;
				// console.log(url)
				// return;
				uni.request({
					url,
					success: (res) => {
						var data = res.data;
						// console.log(data)
						uni.setStorageSync("type",res.data.msg)
						uni.hideLoading();
						if(data.code == 1){
							if(data.user.headimg){
								var headimg = data.user.headimg;
								var i = headimg.indexOf("ams");
								var img = headimg.substring(i);
								img = img.replace(/\\/g, '/')
								headimg = `${baseIp()}/${img}`;
								data.user.headimg = headimg;
								setHeadimg(headimg);
							}
							setUserInfo(data.user);
							that.login();
							// #ifdef APP-PLUS
							that.setCiid()
							// #endif
							uni.switchTab({
								url:"/pages/tabBar/information/information"
							})
						}else{
							uni.showToast({icon: 'none',title: data.message,});
							this.account = "";
							this.password = "";
						}
					},
					fail:(err)=>{
						console.log(err)
						uni.hideLoading();
						uni.showToast({title:err.errMsg,mask:true,icon:"none"})
					}
				});
            },
        },
    }
</script>

<style>
	.loginIcon{font-size: 24px;margin: -16upx 20upx;}
	/* #ifdef APP-PLUS  */
	.login{width: 100vh;position: relative;min-height:100vh;}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.login{width: 100vh;position: relative;min-height:100vh;}
	/* #endif */
	.login{width: 100%;position: relative;min-height:100%;}
	.login-main{position: relative; margin: 0 60upx;padding: 0 60upx 1px; background-color: #fff;margin-top: -120upx;border-radius: 10px;box-shadow: 2px 4px 20px rgb(230,230,230);}
	.userImg{width: 22px;height: 30px;    margin: 0 24upx 10upx 10upx;}
	.login-excessive{height: 300upx;background-color: rgb(56, 147, 243);}
	.login-text{font-size:36px;font-weight: bold;text-align: center;padding-top: 60upx;color: rgb(56, 147, 243);}
	.input-row{position: relative;    border-bottom: 1px solid #cfcfcf;}
	/* .input-row::after{content:'';position: absolute;bottom: -8px; height: 1px;width: 100%;background-color: #cfcfcf;} */
	
	.input-row.user{margin-top: 170upx;}
	.input-row.pass{margin: 100upx 0 100px;}
	.loginBtn{width: 200upx;height: 200upx;position: absolute;bottom: -100upx;left: 0;right: 0;margin: 0 auto;}
	.forgetPassword{margin-top: 200upx; position: relative; display: flex;justify-content: center;font-size: 26upx;color: rgb(254,138,20);}
	.forgetPassword::after{content: "";position: absolute;bottom: -10upx;height: 1px;width: 176upx;background-color: rgb(254,198,20);}
	.forgetPasswordImg{width: 30upx;height: 26upx;}
	
	.version {margin-top:60upx; justify-content: center;color: #ccc;text-align: center;}
	
	
	
	
	
	/* #ifdef MP-BAIDU */
	page {width: 100%;height: 100%;display: block;}
	swan-template {width: 100%;min-height: 100%;display: flex;}
	/* #endif */
	/* 原生组件模式下需要注意组件外部样式 */
	.m-input {width: 100%;min-height: 100%;display: flex;}
	.content {display: flex;flex: 1;flex-direction: column;background-color: #efeff4;padding: 20upx;}
	.input-group {background-color: #ffffff;margin-top: 40upx;position: relative;}
	.input-group::before {position: absolute;right: 0;top: 0;left: 0;height: 1upx;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
	.input-group::after {position: absolute;right: 0;bottom: 0;left: 0;height: 1upx;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
	.input-row {display: flex;flex-direction: row;position: relative;}
	.input-row .title {width: 20%;height: 50upx;min-height: 50upx;padding: 15upx 0;padding-left: 30upx;line-height: 50upx;}
	.input-row.border::after {position: absolute;right: 0;bottom: 0;left: 15upx;height: 1upx;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
	.btn-row {margin-top: 50upx;padding: 20upx;}
	button.primary {background-color: #0faeff;}
	
	.goReg{text-align: center;margin: 120upx auto 0;color: #999;text-decoration: underline;}
</style>
