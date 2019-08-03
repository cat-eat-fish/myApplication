<template>
	<view class="forApproval">
		<view class="content-no" v-if="dataInfo.length === 0">
			<view class="iconfont iconc-kongzhuangtai"></view>
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
					<text class="txt">{{item.t_type}}</text>
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
				
				deptId:"",
			};
		},
		onLoad(){
			uni.showLoading({title:"加载中..."})
			this.getData()
		},
		methods:{
			getData(){
				var that = this;
				var userInfo =getUserInfo(),
					url = `${baseIp()}/ams/system/distribute.htm?module=pending&user_id=${userInfo.userName}`;
				uni.request({
					url,
					success(res){
						var data = res.data;
						// console.log(data)
						data.object.map((item)=>{
							if(data.deptId){
								item.deptId = data.deptId;
							}
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
						url:`/pages/application/investigation6/investigation6?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&deptId=${e.deptId}`,
					})
				}else if(e.flow_type == "06"){	//请假
					uni.navigateTo({
						url:`/pages/application/investigation7/investigation7?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&nodecode=${e.nodecode}&deptId=${e.deptId}`,
					})
				}else if(e.flow_type == "07"){	//用车
					uni.navigateTo({
						url:`/pages/application/investigation8/investigation8?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&nodecode=${e.nodecode}&deptId=${e.deptId}`,
					})
				}else if(e.flow_type == "05"){	//
					uni.navigateTo({
						url:`/pages/application/investigation9/investigation9?acceptid=${e.acceptid}&doc_id=${e.id}&pdid=${e.pdid}&piid=${e.processinstanceid}&tiid=${e.tiid}&nodecode=${e.nodecode}&deptId=${e.deptId}`,
					})
				}
			}
		}
	}
</script>

<style>
	
	.forApproval{background-color: rgb(239,238,243);min-height: 100%;}
	/* #ifdef APP-PLUS  */
	.forApproval{background-color: rgb(239,238,243);height:100%;min-height: 100vh;}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.forApproval{background-color: rgb(239,238,243);height:100%;min-height: 100vh;}
	/* #endif */
	.content-has{padding-top: 30upx;}
	.forApproval .content-no{height: 100%; background-position: center;background-size: 40%;}
	.forApproval .content-no .iconfont{font-size: 140px;margin: 48% 30%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;}
	.forApproval .content-no .text{font-size: 30upx;position: absolute;top: 740upx;bottom: 0;left: 0;right: 0;margin: auto;text-align: center;}
	.forApproval .item{margin: 30upx 24upx 0;border-radius: 10px;padding: 40upx 24upx;background-color: #FFFFFF;}
	.item-2,.item-3,.item-4,.item-5{margin-top: 40upx;}
	.item-5{font-size: 30upx;color: rgb(248,54,0);}
</style>
