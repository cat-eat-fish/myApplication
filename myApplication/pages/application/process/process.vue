<template>
	<view class="process">
		<view class="process-card">
			<view class="process-card-title">
				<view class="process-card-title-text">业务名称：收回再贷</view>
				<uni-icon class="forward" type="forward" size="18"></uni-icon>
			</view>
			<view class="process-card-main">
				<view class="time">
					<view class="time-text">开始办理时间</view>
					<view class="time-time">
						<view class="time-time-d">2019-02-19</view>
						<view class="time-time-t">10:20:36</view>
					</view>
				</view>
				<view class="operation">
					<view class="operation-text">操作</view>
					<view class="operation-c">
						<text class="span">审批</text>
						<text class="span">流程图</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseIp} from "../../../config.js"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon},
		data() {
			return {
				
			};
		},
		onNavigationBarButtonTap(e) {
			console.log(1)
		},
	}
</script>
<style>
	/* #ifdef APP-PLUS MP-WEIXIN */
	.process-card{margin:30upx 24upx 0;border: 1px solid red;border-radius: 10px;box-shadow: 0px 0px 10px red;}
	/* #endif */
	.process-card{margin:30upx 24upx 0;border: 1px solid red;border-radius: 10px;box-shadow: 0px 0px 10px red;}
	.process-card-title{border-bottom: 1px solid rgb(230,230,230); display: flex;justify-content: space-between; padding: 37upx 24upx 40upx;}
	.process-card-title-text{font-size: 30upx;color: rgb(254,138,20);}
	.process-card-title .forward{color: #C8C7CC;}
	.process-card-main{display: flex;}
	.process-card-main .time{border-right: 1px solid rgb(230,230,230);}
	.process-card-main .time,.process-card-main .operation{width: 50%; padding: 40upx 0 40upx 76upx;text-align: center;}
	.process-card-main .time .time-text,.process-card-main .operation .operation-text{margin-bottom: 20upx; color: rgb(153,153,153);font-size: 24upx;}

	.process-card-main .time .time-time,.process-card-main .operation .operation-c{font-size: 30upx;color:rgb(51,51,51);}
	.operation-c .span{margin-right: 10upx;}





</style>
