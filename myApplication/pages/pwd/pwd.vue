<template>
    <view class="pwd">
		<view class="pwd-form">
			<view class="input-row pass">
				<uni-icon class="icon" type="contact" size="30"></uni-icon>
				<input type="number" class="m-input" value="" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="input-row pass">
				<uni-icon class="icon"  type="contact" size="30"></uni-icon>
				<input type="text" class="m-input" value="" v-model="code" placeholder="请输入验证码" />
				<view class="getCode" @tap="getCode">{{getCodeText}}</view>
			</view>
			<view class="input-row pass">
				<uni-icon class="icon" type="contact" size="30"></uni-icon>
				<input type="password" class="m-input" value="" v-model="password" placeholder="请输入新密码" />
			</view>
			<button type="primary" @tap="findPassword">确定</button>
		</view>	
		
        <!-- <view class="input-group">
            <view class="input-row">
                <text class="title">邮箱：</text>
                <m-input type="text" focus clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">提交</button>
        </view> -->
    </view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {mInput,uniIcon},
        data() {
            return {
                email: '',
				phone:"",
				code:"",
				password:"",
				isclick:true,
				getCodeText:"获取验证码"
            }
        },
        methods: {
			getCode(){
				if(this.isclick){
					if (this.phone.length != 11) {
					    uni.showToast({icon: 'none',title: '手机号码不合法',});
					    return;
					}else{
						this.isclick = false;
						this.getCodeText = "已发送";
						uni.showToast({
						    icon: 'paperplane',
						    title: '已发送至手机，请注意查收。',
						    duration: 3000
						});
					}
				}
			},
            findPassword() {
                if (this.phone.length != 11) {
                    uni.showToast({icon: 'none',title: '手机号码不合法'});
                    return;
                }
				if(this.code.length !== 4){
					uni.showToast({icon: 'none',title: '验证码不合法'});
					return;
				}
				if(this.password.length < 6){
					uni.showToast({icon: 'none',title: '新密码长度必须大于等于6位'});
					return;
				}
                uni.showLoading({
					title: '等待中...'
				});
				
				setTimeout(function () {
					uni.hideLoading();
				}, 2000);
            }
        }
    }
</script>

<style>
	/* #ifdef APP-PLUS  MP-WEIXIN*/
	.pwd{background-color: #0A98D5;height: 100vh;}
	/* #endif */
	.pwd{background-color: #0A98D5;height: 100%;}
	.pwd-form{margin: 0 24upx;overflow: auto;}
	.pwd-form .input-row{display: flex;color:#fff;margin: 40upx 0;background-color: #929292;padding: 20upx;border-radius: 10px;}
	.pwd-form .input-row .icon{}
	.pwd-form .input-row .m-input{margin: 6upx 0 0 20upx;}
	.input-placeholder{color:#fff;}
	.pwd-form .input-row .getCode{flex: 1;text-align: right;margin: 0 10upx 0 0;border-radius: 10px;background-color: #0A98D5;color: #fff;align-items: center;display: flex;justify-content: center;}
</style>
