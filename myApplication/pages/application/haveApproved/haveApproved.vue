<template>
	<view class="haveApproved">
		<view class="content-no" v-if="dataInfo.length === 0">
			<image class="img" src="../../../static/img/content-null.png"></image>
			<view class="text">暂无任何我已审批</view>
		</view>
		<view class="content-has" v-else>
			<view class="item" @click="goPage(item)" v-for="(item,index) in dataInfo" :key="index">
				<!-- <view class="item-1">
					<text class="text">业务类型 ： </text>
					<text class="txt">{{item.title}}</text>
				</view> -->
				<view class="item-2">
					<text class="text">业务名称 ： </text>
					<text class="txt">{{item.title}}</text>
				</view>
				<view class="item-3">
					<text class="text">受理时间 ： </text>
					<text class="txt">{{item.applay_date}}</text>
				</view>
				<view class="item-4">
					<text class="text">业务类型 ：</text>
					<text class="txt">{{item.bus_type}}</text>
				</view>
				<view class="item-5">
					<text class="text">发起人 ：</text>
					<text class="txt">{{item.name}}</text>
				</view>
				
				<view class="operation">
					<view class="operation-i">审批记录</view>
					<view class="operation-i">流程图</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseIp} from "../../../config.js"
    import {getUserInfo,setUserInfo} from '../../../service.js';
	export default {
		data() {
			return {
				dataInfo:[
					// {id:0,type:"类型",time:"时间",userName:"usename",name:"业务名称"},
				]
			};
		},
		onLoad(){
			var that = this;
			uni.request({
				url:`http://${baseIp()}/ams/system/distribute.htm?module=approvedByMI&userId=${getUserInfo().userId}`,
				success(res){
					var data = res.data
					that.dataInfo = data.object;
				}
			})
		},
		methods:{
			goPage(e){
				uni.navigateTo({
					url:`/pages/application/ratingProcess/ratingProcess?acceptid=${e.acceptid}&doc_id=${e.doc_id}&pdid=${e.pdid}&piid=${e.piid}&id2=${e.id2}`
				})
			}
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS MP-WEIXIN */
	.haveApproved{background-color: rgb(239,238,243);height:100vh;overflow: auto;}
	/* #endif */
	.haveApproved{background-color: rgb(239,238,243);height:100%;overflow: auto;}
	.haveApproved .content-no{height: 100%; background-position: center;background-size: 40%;}
	.haveApproved .content-no .img{width: 400upx;height: 400upx;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: 48% auto;}
	.haveApproved .content-no .text{position: absolute;top: 740upx;bottom: 0;left: 0;right: 0;margin: auto;text-align: center;
		background-image: -webkit-linear-gradient(0deg, #cc5500, #ccbb00);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;
		  -webkit-animation: hue 60s infinite linear;
	}
	
	.haveApproved .item{position: relative; margin:  80upx 24upx 0;border-radius: 10px;padding: 40upx 24upx;background-color: #FFFFFF;}
	.haveApproved .item:first-child{margin-top: 30upx;}
	.haveApproved .item-2,.haveApproved .item-3,.haveApproved .item-4,.haveApproved .item-5{margin-top: 20upx;}
	.haveApproved .item-5 .txt{font-size: 30upx;color: rgb(248,54,0);}
	
	.haveApproved .operation{display: flex;justify-content: space-evenly; position: absolute;margin: 0 24upx;bottom: -50upx;left: 0;right: 0;padding: 10upx 26upx;border-radius: 20px;font-size: 24upx;color: #FFFFFF;
		background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
	  background: -o-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Opera 11.1 - 12.0 */
	  background: -moz-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Firefox 3.6 - 15 */
	  background: linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* 标准的语法 */
	  }
	 .haveApproved  .operation-i{position: relative;width: 50%;text-align: center;}
	.operation-i::after{content:""; top: 14upx; right:-12upx; position: absolute;width: 1px;height: 26upx;background-color: #FFFFFF;}
	.operation-i:last-child::after{width: 0;}
</style>
