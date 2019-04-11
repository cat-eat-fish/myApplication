<template>
	<view class="approvalRecord">
		<view class="item" v-for="(item,index) in dataInfo" :key="index">
			<view class="item-1">
				<text class="text">节点名 ： </text>
				<text class="txt">{{item.nodeName}}</text>
			</view>
			<view class="item-2">
				<text class="text">审批人 ： </text>
				<text class="txt">{{item.approver}}</text>
			</view>
			<view class="item-3">
				<text class="text">审批时间 ： </text>
				<text class="txt">{{item.approvalTime}}</text>
			</view>
			<view class="item-4">
				<view class="text">评论内容</view>
				<view class="txt">{{item.content}}</view>
			</view>
			<view class="item-5">
				<text class="text">审批结果 ： </text>
				<text class="txt">{{item.result}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:[
					{id:0,nodeName:"节点名",approver:"审批人",approvalTime:"审批时间",content:"评论内容",result:"同意"},
				]
			};
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS MP-WEIXIN */
	.approvalRecord{background-color: rgb(239,238,243);height:100vh;overflow: auto;}
	/* #endif */
	.approvalRecord{background-color: rgb(239,238,243);height:100%;overflow: auto;}
	.approvalRecord .item{margin: 30upx 24upx 0;border-radius: 10px;padding: 40upx 24upx;background-color: #FFFFFF;}
	.approvalRecord .item-2,.approvalRecord .item-3,.approvalRecord .item-4{margin-top: 40upx;}
	.approvalRecord .item-5 .txt{font-size: 30upx;color: rgb(248,54,0);}
	.approvalRecord .item-5{margin-top: 50upx;}
</style>
