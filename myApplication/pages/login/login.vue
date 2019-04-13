<template>
    <view class="login">
		<view class="login-excessive"></view>
		<view class="login-main">
			<view class="login-text">登录</view>
			<view class="input-row user">
				<image class="userImg" :src="userimg" mode=""></image>
				<input type="text" class="m-input" value="" v-model="account" placeholder="请输入账号" @focus="onFocus" @blur="onBlur" />
				<!-- <m-input ison="true" class="m-input" type="text" clearable  v-model="account" placeholder="请输入账号" @focus="onFocus" @blur="onBlur"></m-input> -->
			</view>
			<view class="input-row pass">
				<image class="userImg" :src="passimg" mode=""></image>
				<input type="password" class="m-input" value="" v-model="password" placeholder="请输入密码" @focus="onFocusP" @blur="onBlurP" />
				<!-- <m-input class="m-input" type="password"  displayable clearable  v-model="password" placeholder="请输入密码" ></m-input> -->
			</view>
			<view>
				<image @tap="bindLogin" @click="goF" class="loginBtn" src="../../static/img/login_touch_SIGN%20IN_icon.png" mode=""></image>
			</view>
		</view>
		<view class="forgetPassword" @click="goF">
			<text class="forgetPasswordText">忘记密码？</text>
			<image class="forgetPasswordImg"  src="../../static/img/login_forgot%20pas_icon.png" mode=""></image>
		</view>
    </view>
</template>

<script>
	import {baseIp} from "../../config.js"
    import {getUserInfo,setUserInfo} from '../../service.js';
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
				userimg:"../../static/img/login_user_default_icon.png",
				passimg:"../../static/img/login_pas_defaukt_icon.png"
            }
        },
        computed: mapState(['forcedLogin']),
		watch:{
			userF(val,oldval){
				this.userimg = val == true ? "../../static/img/login_user_selected_icon.png" : "../../static/img/login_user_default_icon.png";
			},
			passF(val,oldval){
				this.passimg = val == true ? "../../static/img/login_pas_selected_icon.png" : "../../static/img/login_pas_defaukt_icon.png";
			},
		},
		onLoad() {
			let userInfo = getUserInfo();
			if(userInfo.isLogin === true){
				uni.switchTab({
					url:"/pages/tabBar/mine/mine"
				})
			}
		},
        methods: {
			onFocus(){this.userF = true;},
			onBlur(){this.userF = false;},
			onFocusP(){this.passF = true;},
			onBlurP(){this.passF = false;},
			goF(){
				uni.navigateTo({
					url:"/pages/pwd/pwd"
				})
			},
            ...mapMutations(['login']),
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
				var that = this;
				uni.request({
					url:"http://"+baseIp()+"/ams/system/distribute.htm?module=login&username="+that.account+"&password="+that.password+"&methodyd=1",
					success: (res) => {
						var data = res.data;
						if(data.code == 1){
							setUserInfo(data.user);
							this.login();
							uni.switchTab({
								url:"/pages/tabBar/mine/mine"
							})
						}else{
							uni.showToast({
								icon: 'none',
								title: data.message,
							});
							this.account = "";
							this.password = "";
						}
					}
				});
            },
        },
    }
</script>

<style>
	/* #ifdef APP-PLUS MP-WEIXIN */
	.login{width: 100vh;position: relative;}
	/* #endif */
	.login{width: 100%;position: relative;}
	.login-main{position: relative; margin: 0 60upx;padding: 0 60upx 1px; background-color: #fff;margin-top: -120upx;border-radius: 10px;box-shadow: 2px 4px 20px rgb(230,230,230);}
	.userImg{width: 22px;height: 30px;    margin: 0 24upx 10upx 10upx;}
	.login-excessive{height: 300upx;background-color: #ffa33e;}
	.login-text{font-size:36px;font-weight: bold;text-align: center;padding-top: 60upx;
	background-image: -webkit-gradient(linear, left 0, right 0, from(#f83600), to(#f9c423));
	-webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
	-webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */}
	.input-row{position: relative;}
	.input-row::after{content:'';position: absolute;bottom: -8px; height: 1px;width: 100%;background-color: #cfcfcf;}
	
	.input-row.user{margin-top: 170upx;}
	.input-row.pass{margin: 100upx 0 100px;}
	.loginBtn{width: 120px;height: 120px;position: absolute;bottom: -75px;left: 0;right: 0;margin: 0 auto;}
	.forgetPassword{margin-top: 200upx; position: relative; display: flex;justify-content: center;font-size: 26upx;color: rgb(254,138,20);}
	.forgetPassword::after{content: "";position: absolute;bottom: -10upx;height: 1px;width: 176upx;background-color: rgb(254,198,20);}
	.forgetPasswordImg{width: 30upx;height: 26upx;}
	
	
	
	
	
	
	
	/* #ifdef MP-BAIDU */
	page {width: 100%;height: 100%;display: block;}
	swan-template {width: 100%;min-height: 100%;display: flex;}
	/* #endif */
	/* 原生组件模式下需要注意组件外部样式 */
	m-input {width: 100%;min-height: 100%;display: flex;}
	.content {display: flex;flex: 1;flex-direction: column;background-color: #efeff4;padding: 20upx;}
	.input-group {background-color: #ffffff;margin-top: 40upx;position: relative;}
	.input-group::before {position: absolute;right: 0;top: 0;left: 0;height: 1upx;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
	.input-group::after {position: absolute;right: 0;bottom: 0;left: 0;height: 1upx;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
	.input-row {display: flex;flex-direction: row;position: relative;}
	.input-row .title {width: 20%;height: 50upx;min-height: 50upx;padding: 15upx 0;padding-left: 30upx;line-height: 50upx;}
	.input-row.border::after {position: absolute;right: 0;bottom: 0;left: 15upx;height: 1upx;content: '';-webkit-transform: scaleY(.5);transform: scaleY(.5);background-color: #c8c7cc;}
	.btn-row {margin-top: 50upx;padding: 20upx;}
	button.primary {background-color: #0faeff;}
</style>
