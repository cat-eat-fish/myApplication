<template>
	<view class="launched">
		<view class="content-no" v-if="dataInfo.length === 0">
			<view class="iconfont iconc-kongzhuangtai"></view>
			<view class="text">暂无任何我发起的</view>
		</view>
		<view class="content-has" v-else>
			<view class="item" @click="goPage(item)" v-for="(item,index) in dataInfo" :key="index">
				<view class="item-1">
					<text class="text">业务名称 ： </text>
					<text class="txt">{{item.title}}</text>
				</view>
				<view class="item-2">
					<text class="text">受理时间 ： </text>
					<text class="txt">{{item.applay_date}}</text>
				</view>
				<view class="item-3">
					<text class="text">业务类型 ： </text>
					<text class="txt">{{item.t_type}}</text>
				</view>
				<view class="item-4">
					<text class="text">客户名称 ：</text>
					<text class="txt">{{item.name}}</text>
				</view>
				<view class="item-5">
					<text class="text">状态 ：</text>
					<text class="txt">{{item.status}}</text>
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
				dataInfo:[]
			};
		},
		onLoad(){
			uni.showLoading({title:"加载中..."})
			this.getData()
		},
		methods:{
			getData(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=mySend_YD&userId=${getUserInfo().userName}`
				uni.request({
					url,
					success(res){
						var data = res.data;
						data.object.map((item)=>{
							item.status = item.status == 0 ? "办理完成" : item.status == 2 ? "办理中" : item.status == 9 ? "办理拒绝" : "";
							item.t_type =  item.flow_type == "08" ? "外出审批" : item.flow_type == "06" ? "请假审批" : item.flow_type == "07" ? "公车审批" : "";
						})
						that.dataInfo = data.object;
						uni.hideLoading()
					},
					fail(err){
						uni.hideLoading();
						uni.showToast({title:err.message,icon:"none"})
					}
				})
			},
			goPage(e){
				if(e.flow_type == "08"){
					uni.navigateTo({
						url:`/pages/application/ratingProcess6/ratingProcess6?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&deptId=${e.deptId}`,
					})
				}else if(e.flow_type == "06"){	//请假
					uni.navigateTo({
						url:`/pages/application/ratingProcess7/ratingProcess7?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&nodecode=${e.nodecode}&deptId=${e.deptId}`,
					})
				}else if(e.flow_type == "07"){	//用车
					uni.navigateTo({
						url:`/pages/application/ratingProcess8/ratingProcess8?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&nodecode=${e.nodecode}&deptId=${e.deptId}`,
					})
				}else if(e.flow_type == "05"){	//请假
					uni.navigateTo({
						url:`/pages/application/ratingProcess9/ratingProcess9?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&nodecode=${e.nodecode}&deptId=${e.deptId}`,
					})
				}
			}
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS  */
	.launched{background-color: rgb(239,238,243);height:100%;min-height:100vh;overflow: auto;}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.launched{background-color: rgb(239,238,243);height:100%;min-height:100vh;overflow: auto;}
	/* #endif */
	.launched{background-color: rgb(239,238,243);height:100%;overflow: auto;}
	.launched .content-no{height: 100%; background-position: center;background-size: 40%;}
	.launched .content-no .iconfont{font-size: 140px;margin: 48% 30%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;}
	.launched .content-no .text{position: absolute;top: 740upx;bottom: 0;left: 0;right: 0;margin: auto;text-align: center;}
	
	.launched .item{position: relative; margin: 80upx 24upx 0;border-radius: 10px;padding: 40upx 24upx;background-color: #FFFFFF;}
	.launched .item:first-child{margin-top: 30upx;}
	.launched .item-2,.launched .item-3,.launched .item-4,.launched .item-5{margin-top: 20upx;}
	.launched .item-5 .txt{font-size: 30upx;color: rgb(248,54,0);}
	
	.launched .operation{display: flex;justify-content: space-evenly; position: absolute;margin: 0 24upx;bottom: -50upx;left: 0;right: 0;padding: 10upx 26upx;border-radius: 20px;font-size: 24upx;color: #FFFFFF;
		background-color: rgb(56, 147, 243);
		}
	 .launched  .operation-i{position: relative;width: 50%;text-align: center;}
	.operation-i::after{content:""; top: 14upx; right:-12upx; position: absolute;width: 1px;height: 26upx;background-color: #FFFFFF;}
	.operation-i:last-child::after{width: 0;}
</style>
