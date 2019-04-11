<template>
	<view class="application">
		<view class="application-notice-bg">
			<view class="application-notice">
				<image class="img" src="../../../static/img/home_nav_icon.png" mode=""></image>
				<text class="text">公告</text>
			</view>
		</view>
		<view class="application-content">
			<view class="item" v-for="(item,index) in applicationC" :key="index" @click="goPage(item.url)">
				<view class="icon">
					<image class="img" :src="item.icon" :mode="item.text"></image>
				</view>
				<text class="text">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applicationC:[
					{id:0,icon:"../../../static/img/home_application_icon1.png",url:"/pages/application/approvalExam/approvalExam",text:"审批受理"},
					{id:1,icon:"../../../static/img/home_application_icon2.png",url:"/pages/application/launched/launched",text:"我发起的"},
					{id:2,icon:"../../../static/img/home_application_icon3.png",url:"/pages/application/forApproval/forApproval",text:"待我审批"},
					{id:3,icon:"../../../static/img/home_application_icon4.png",url:"/pages/application/haveApproved/haveApproved",text:"我已审批"},
					{id:4,icon:"../../../static/img/home_application_icon5.png",url:"/pages/application/approvalMonitoring/approvalMonitoring",text:"审批监控"},
				]
			};
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
	.application{background-color: rgb(230,230,230);height: 100%;}
	/* #ifdef APP-PLUS MP-WEIXIN */
	.application{background-color: rgb(230,230,230);height: 100vh;}
	/* #endif */
	.application-notice{padding: 25upx 24upx;margin: 10upx 24upx 40upx; display: flex; border-radius: 10upx;background-color: #fff;}
	.application-notice-bg{width: 100%; background-color: #ffc045;overflow: hidden;}
	.application-notice .img{width: 40upx;height: 36upx;padding-right: 14px;}
	.application-notice .text{width: 600upx; font-size: 26upx;word-break:keep-all;whitewhite-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
	.application-content{display: flex;flex-wrap: wrap;margin-top: 32upx;}
	.application-content .item{overflow: hidden;margin-left: 32upx;margin-top: 24upx; width: 208upx;height: 208upx;border-radius: 10px;background-color: #fff;text-align: center;}
	.application-content .item .icon{width: 80upx;height: 80upx;margin: 40upx auto 0;}
	.application-content .item .icon .img{width: 80upx;height: 80upx;}
	.application-content .item .text{margin-top: 20upx;font-size: 26upx;color: rgb(102,102,102);}
	.application-content .item:nth-child(1){}

</style>
