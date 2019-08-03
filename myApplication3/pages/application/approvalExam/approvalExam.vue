<template>
	<view class="approvalExam">
			<view class="item" v-if="isShow1" @click="goPage('/pages/application/egress/egress')">
				<view class="img">
					<image class="icon" src="/static/img/icon7.png" mode="aspectFill"></image>
				</view>
				<view class="text">
					外出审批
				</view>
			</view>
			<view class="item" v-if="isShow2" @click="goPage('/pages/application/bus/bus')">
				<view class="img">
					<image class="icon" src="/static/img/icon8.png" mode="aspectFill"></image>
				</view>
				<view class="text">
					公车管理审批
				</view>
			</view>
			<view class="item" v-if="isShow3" @click="goPage('/pages/application/leave/leave')">
				<view class="img">
					<image class="icon" src="/static/img/icon9.png" mode="aspectFill"></image>
				</view>
				<view class="text">
					淡季请假审批
				</view>
			</view>
			<view class="item" v-if="isShow4" @click="goPage('/pages/application/leave2/leave2')">
				<view class="img">
					<image class="icon" src="/static/img/icon10.png" mode="aspectFill"></image>
				</view>
				<view class="text">
					旺季请假审批
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow1:true,
				isShow2:true,
				isShow3:false,
				isShow4:false,
			};
		},
		onLoad() {
			var type = uni.getStorageSync("type");
			// var type = '07';
			if(type == "05"){
				this.isShow4 = true;
			}else if(type == "06"){
				this.isShow3 = true;
			}else if(type == "07"){
				this.isShow3 = true;
				this.isShow4 = true;
			}
		},
		methods:{
			goPage(e){
				uni.navigateTo({
					url:e
				})
			},
		}
	}
</script>

<style>
	.approvalExam{min-height: 100%;background-color: rgb(245,245,245);display: flex;flex-wrap: wrap;align-content: start;justify-content: space-between;}
	
	/* #ifdef APP-PLUS */
	.approvalExam{min-height: 100vh;background-color: rgb(245,245,245);display: flex;flex-wrap: wrap;align-content: start;justify-content: space-between;}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.approvalExam{min-height: 100vh;background-color: rgb(245,245,245);display: flex;flex-wrap: wrap;align-content: start;justify-content: space-between;}
	/* #endif */
	.approvalExam .item{position: relative; width: 340upx;height: 324upx; background-color: red;border-radius: 10px;margin-top: 24upx;}
	
	.approvalExam .item:nth-child(1){background-color: #72aefd;}
	.approvalExam .item:nth-child(2){background-color: #ffa92e;}
	.approvalExam .item:nth-child(3){background-color: #ff6b6a;}
	.approvalExam .item .img-a{width: 136upx;height: 130upx;margin: 68upx auto 0;display: flex;}
	
	.img .iconfont{font-size: 30px;margin: 26px auto 0;width: 30px;}
	.approvalExam .item .img{bottom: 24upx;right: 24upx;position: absolute;width: 180upx;height: 180upx;}
	.approvalExam .item .img .icon{width: 100%;height: 100%;}
	.approvalExam .item .text{position: absolute;top: 60upx;left: 24upx ;font-size: 36upx;color: #fff;}
	.approvalExam .item:nth-child(odd){margin-left: 24upx;}
	.approvalExam .item:nth-child(even){margin-right: 24upx;}
	.approvalExam .item:nth-child(1),
	.approvalExam .item:nth-child(2){margin-top: 40upx;}
</style>
