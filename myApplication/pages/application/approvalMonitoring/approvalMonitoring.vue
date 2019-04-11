<template>
	<view class="approvalMonitoring">
		<view class="content-no" v-if="dataInfo.length === 0">
			<image class="img" src="../../../static/img/content-null.png"></image>
			<view class="text">暂无任何审批监控</view>
		</view>
		<view class="content-has" v-else>
			<view class="item" v-for="(item,index) in dataInfo" :key="index">
				<view class="item-1">
					<text class="text">项目名称 ： </text>
					<text class="txt">{{item.name}}</text>
				</view>
				<view class="item-2">
					<text class="text">状态 ： </text>
					<text class="txt">{{item.state}}</text>
				</view>
				<view class="item-3">
					<text class="text">当前节点 ： </text>
					<text class="txt">{{item.nowNode}}</text>
				</view>
				<view class="item-4">
					<text class="text">申请时间 ：</text>
					<text class="txt">{{item.time}}</text>
				</view>
				<view class="item-5">
					<text class="text">类型（评级） ： </text>
					<text class="txt">{{item.type}}</text>
				</view>
				<view class="item-5">
					<text class="text">操作 ： </text>
				</view>
				<view class="operation">
					<view class="operation-i">审批记录</view>
					<view class="operation-i">流程图</view>
					<view class="operation-i">评级认定书</view>
					<view class="operation-i">使用等级确认书</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:[
					// {id:0,name:"项目名称",state:"状态",nowNode:"当前节点",time:"申请时间",type:"类型"},
				]
			};
		},
		onLoad(){
// 			var that = this;
// 			uni.request({
// 				url:`http://192.168.3.125:8080/ams/system/distribute.htm?module=ZXInfo&acceptid=${that.$store.state.userInfo.userId}`,
// 				success(res){
// 					var data = res.data
// 					that.dataInfo = data.object;
// 				}
// 			})
		}
	}
</script>

<style>
	
	.approvalMonitoring{background-color: rgb(239,238,243);height:100%;overflow: auto;}
	/* #ifdef APP-PLUS  MP-WEIXIN*/
	.approvalMonitoring{background-color: rgb(239,238,243);height:100vh;overflow: auto;}
	/* #endif */
	.approvalMonitoring .content-no{height: 100%; background-position: center;background-size: 40%;}
	.approvalMonitoring .content-no .img{width: 400upx;height: 400upx;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: 48% auto;}
	.approvalMonitoring .content-no .text{position: absolute;top: 740upx;bottom: 0;left: 0;right: 0;margin: auto;text-align: center;
		background-image: -webkit-linear-gradient(0deg, #cc5500, #ccbb00);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;
		  -webkit-animation: hue 60s infinite linear;
	}
	
	.approvalMonitoring .item{position: relative; margin: 30upx 24upx 0;border-radius: 10px;padding: 40upx 24upx;background-color: #FFFFFF;}
	.approvalMonitoring .item-2,.approvalMonitoring .item-3,.approvalMonitoring .item-4,.approvalMonitoring .item-5{margin-top: 20upx;}
	.approvalMonitoring .item-5 .txt{font-size: 30upx;color: rgb(248,54,0);}
	
	.approvalMonitoring .operation{display: flex;justify-content: space-between; position: absolute;margin: 0 24upx;bottom: -50upx;left: 0;right: 0;padding: 10upx 26upx;border-radius: 20px;font-size: 24upx;color: #FFFFFF;
		background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
	  background: -o-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Opera 11.1 - 12.0 */
	  background: -moz-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Firefox 3.6 - 15 */
	  background: linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* 标准的语法 */
	  }
	 .approvalMonitoring  .operation-i{position: relative;}
	.operation-i::after{content:""; top: 14upx; right:-12upx; position: absolute;width: 1px;height: 26upx;background-color: #FFFFFF;}
	.operation-i:last-child::after{width: 0;}
</style>
