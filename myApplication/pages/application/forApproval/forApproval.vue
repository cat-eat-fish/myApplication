<template>
	<view class="forApproval">
		<view class="content-no" v-if="dataInfo.length === 0">
			<image class="img" src="../../../static/img/content-null.png"></image>
			<view class="text">暂无任何我审批的</view>
		</view>
		<view class="content-has" v-else>
			<view class="item" @click="goPage(item)" v-for="(item,index) in dataInfo" :key="index">
				<view class="item-1">
					<text class="text">业务名称 ： </text>
					<text class="txt">{{item.title}}</text>
				</view>
				<view class="item-2">
					<text class="text">开始办理时间 ： </text>
					<text class="txt">{{item.start_time}}</text>
				</view>
				<view class="item-3">
					<text class="text">业务类型 ： </text>
					<text class="txt">{{item.this_type}}</text>
				</view>
				<view class="item-4">
					<text class="text">发起人 ： </text>
					<text class="txt">{{item.name}}</text>
				</view>
				<view class="item-5">
					<text>待审批</text>
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
					// {id:0,name:"收回再贷",stateTime:"2019-02-19 10:20:36",originator:"张三"},
				],
			};
		},
		onLoad(){
			var that = this;
			var userInfo =getUserInfo();
			uni.request({
				url:`http://${baseIp()}/ams/system/distribute.htm?module=pending&user_id=${userInfo.userId}`,
				success(res){
					var data = res.data;
					data.object.map((item)=>{
						item.this_type = item.bus_type == "01"? "评级认定审批" : item.bus_type == "04" ? "征信审批" : "";
					})
					that.dataInfo = data.object;	
				}
			})
		},
		methods:{
			goPage(e){
				uni.navigateTo({
					url:`/pages/application/investigation/investigation?acceptid=${e.acceptid}&doc_id=${e.doc_id}&pdid=${e.pdid}&piid=${e.piid}&tiid=${e.tiid}`,
				})
			}
		}
	}
</script>

<style>
	
	/* #ifdef APP-PLUS MP-WEIXIN */
	.forApproval{background-color: rgb(239,238,243);min-height: 100vh;}
	/* #endif */
	.forApproval{background-color: rgb(239,238,243);min-height: 100%;}
	.content-has{padding-top: 30upx;}
	.forApproval .content-no{height: 100%; background-position: center;background-size: 40%;}
	.forApproval .content-no .img{width: 400upx;height: 400upx;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: 48% auto;}
	.forApproval .content-no .text{font-size: 30upx;position: absolute;top: 740upx;bottom: 0;left: 0;right: 0;margin: auto;text-align: center;
		background-image: -webkit-linear-gradient(0deg, #cc5500, #ccbb00);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;
		  -webkit-animation: hue 60s infinite linear;
	}
	.forApproval .item{margin: 30upx 24upx 0;border-radius: 10px;padding: 40upx 24upx;background-color: #FFFFFF;}
	.item-2,.item-3,.item-4,.item-5{margin-top: 40upx;}
	.item-5{font-size: 30upx;color: rgb(248,54,0);}
</style>
