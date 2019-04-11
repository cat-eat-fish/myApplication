<template>
	<view class="approvalExam">
		<view class="item" @click="goPage(item.url)" v-for="(item,index) in dataInfo" :key="index">
			<view class="img">
				<image class="img-a" :src="item.img" mode="item.text"></image>
			</view>
			<view class="text">
				{{item.text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:[
					{id:0,img:"../../../static/img/icon_1.png",text:"评级审批",url:"/pages/application/business/business"},
					{id:1,img:"../../../static/img/icon_2.png",text:"授信审批",},
					{id:2,img:"../../../static/img/icon_3.png",text:"用信审批",},
					{id:3,img:"../../../static/img/icon_4.png",text:"征信查询审批",url:"/pages/application/reportingProcess/reportingProcess"}
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
	.approvalExam{height: 100%;background-color: rgb(239,238,243);display: flex;flex-wrap: wrap;align-content: start;justify-content: space-around;}
	/* #ifdef APP-PLUS  MP-WEIXIN*/
	.approvalExam{height: 100vh;background-color: rgb(239,238,243);display: flex;flex-wrap: wrap;align-content: start;justify-content: space-around;}
	/* #endif */
	
	.approvalExam .item{width: 324upx;height: 324upx; background-color: #FFFFFF;border-radius: 10px;}
	.approvalExam .item .img-a{width: 136upx;height: 130upx;margin: 68upx auto 0;display: flex;}
	.approvalExam .item:nth-child(1),.approvalExam .item:nth-child(3),.approvalExam .item:nth-child(2),.approvalExam .item:nth-child(4){margin-left: 24upx;}
	.approvalExam .item:nth-child(1),.approvalExam .item:nth-child(2){margin-top: 40upx;}
	.approvalExam .item:nth-child(3),.approvalExam .item:nth-child(4){margin-top: 24upx;}
	.approvalExam .item:nth-child(2),.approvalExam .item:nth-child(4){margin-right: 24upx;}
	.approvalExam .item .text{margin-top: 8upx;text-align: center;color: rgb(102,102,102);font-size: 26upx;}
</style>
