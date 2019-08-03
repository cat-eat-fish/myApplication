<template>
    <view class="pwd">
		<view class="pwd-form">
			<view class="input-row pass">
				<uni-icon class="icon" color="rgb(56, 147, 243)" type="contact" size="30"></uni-icon>
				<input type="text" class="m-input" value="" v-model="password" placeholder="请输入当前密码" />
			</view>
			<view class="input-row pass">
				<uni-icon class="icon" color="rgb(56, 147, 243)" type="gear-filled" size="30"></uni-icon>
				<input type="password" class="m-input" value="" v-model="updatePassword" placeholder="请输入新密码" />
			</view>
			<view class="input-row pass">
				<uni-icon class="icon" color="rgb(56, 147, 243)" type="gear-filled" size="30"></uni-icon>
				<input type="password" class="m-input" value="" v-model="confirmPassword" placeholder="请重新输入新密码" />
			</view>
			<button class="logout" type="primary" @tap="findPassword">确定</button>
		</view>	
    </view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
    import {getUserInfo,setUserInfo,setCid} from '@/service.js';
	import {baseIp} from "@/config.js"

    export default {
        components: {uniIcon},
        data() {
            return {
				password:"",
				updatePassword:"",
				confirmPassword:"",
				isclick:true,
            }
        },
        methods: {
            findPassword() {
                if (this.password.length < 6 ||  this.password.length > 18) {
                    uni.showToast({icon: 'none',title: '当前密码输入有误'});
                    return;
                }
				if(this.updatePassword.length < 6 ||  this.updatePassword.length > 18){
					uni.showToast({icon: 'none',title: '新密码不能小于6位或大于18位'});
					return;
				}
				if(this.confirmPassword.length < 6 ||  this.confirmPassword.length > 18 ){
					uni.showToast({icon: 'none',title: '新密码长度必须大于等于6位'});
					return;
				}else if(this.confirmPassword != this.updatePassword){
					uni.showToast({icon: 'none',title: '两次密码输入不一致！'});
					return;
				}
				if(this.password == this.updatePassword){
					uni.showToast({icon: 'none',title: '修改的密码不能与当前密码相同！'});
					return;
				}
				
				
                uni.showLoading({title: '提交中...'});
				var url = `${baseIp()}/ams/system/distribute.htm?module=updatePassword_YD&userId=${getUserInfo().userName}&password=${this.password}&updatePassword=${this.updatePassword}&confirmPassword=${this.confirmPassword}&hr=true`;	
				var that = this;
				uni.request({
					url,
					success(res){
						uni.hideLoading()
						let data = res.data;
						if(data.code == 1){
							uni.showToast({title:data.message,duration:3000})
							let userIn = {user:false}
							setUserInfo(userIn);
							let userInfo = getUserInfo();
							setTimeout(()=>{
								uni.reLaunch({
									url:"/pages/login/login"
								});
							},3000)
						}else{
							that.password = '';
							that.updatePassword = "";
							that.confirmPassword = "";
							uni.showToast({title:data.message,icon:"none",duration:3000,})
						}
					},
					fail(err){
						uni.hideLoading()
						uni.showToast({title:err.errMsg,icon:"none"})
					}
				})
            }
        }
    }
</script>

<style>
	/* #ifdef APP-PLUS */
	.pwd{height: 100vh;min-height:100vh}
	/* #endif */
	.pwd{height: 100%;}
	.pwd-form{margin: 0 24upx;overflow: auto;}
	.pwd-form .input-row{display: flex;color:#fff;margin: 40upx 0;background-color: #dedcdc;padding: 20upx;border-radius: 10px;}
	.pwd-form .input-row .icon{color: rgb(56, 147, 243);}
	.pwd-form .input-row .m-input{margin: 6upx 0 0 20upx; color: #111;width: 100%;}
	.input-placeholder{color:#fff;}
	.logout{color: #FFFFFF;position: fixed;bottom: 60upx;left: 24upx;right: 24upx;height: 42px;line-height: 42px;background-color: rgb(56, 147, 243);}
	.pwd-form .input-row .getCode{flex: 1;text-align: right;margin: 0 10upx 0 0;border-radius: 10px;background-color: #0A98D5;color: #fff;align-items: center;display: flex;justify-content: center;}
</style>
