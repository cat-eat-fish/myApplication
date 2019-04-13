<template>
	<view class="approvalNotice">
		<view class="content-no" v-if="dataInfo.length === 0">
			<image class="img" src="../../../static/img/content-null.png"></image>
			<view class="text">暂无任何审批通知</view>
		</view>
		<view class="content-has" v-else>
			<view class="item" v-for="(item,index) in dataInfo" :key="index">
				<view class="item-datetime">{{item.approvetime}}</view>
				<view class="item-main">
					<view class="vimg">
						<image class="img" src="../../../static/img/message_icon_01.png" mode=""></image>
					</view>
					<view class="text">
						<view class="text-t">审批通知</view>
						<view class="item-main-main">
							<view class="item-main-main-1">
								<view class="item-main-main-1-l">
									<view class="item-main-main-1-l-time">{{item.time}}</view>
									<!-- <view class="item-main-main-1-l-text">待审信息</view> -->
								</view>
								<view class="item-main-main-1-r">{{item.date}}</view>
							</view>
							<view class="item-main-main-2">
								<text >标题 : </text>
								<text> {{item.title}}</text>
							</view>
							<view class="item-main-main-3">
								<text >业务名称 : </text>
								<text> {{item.symboltablename}}</text>
							</view>
							<view class="item-main-main-3">
								<text>开始办理时间 : </text>
								<text> {{item.start_time}}</text>
							</view>
							<view class="item-main-main-4">
								<text>发起人 : </text>
								<text> {{item.approve_per}}</text>
							</view>
							<view class="item-main-main-4">
								<text>受理人 : </text>
								<text> {{item.username}}</text>
							</view>
							<!-- <view class="item-main-main-5">
								{{item.status}}
							</view> -->
						</view>
					</view>
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
				dataInfo:[],
				items:{}
			};
		},
		onLoad() {
			var that = this;
			uni.setNavigationBarColor({
				frontColor:  "#000000",
				backgroundColor: "#FFFFFF"
			});
			var url = `http://${baseIp()}/ams/system/distribute.htm?module=approveList&userId=${getUserInfo().userId}`;
			
			uni.request({
				url:url,
				success(res){
					that.dataInfo = res.data.object;
// 					uni.request({
// 						url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=useType",
// 						success(res){
// 							var data = res.data;
// 							that.items = data.object;
// 							that.dataInfo.map((item,index)=>{
// 								if(!Boolean(Number(item.bus_type))){
// 									item.bus_type = item.bus_type;
// 								}else{
// 									item.bus_type = that.items[Number(item.bus_type) - 1].name
// 								}
// 							})
// 							
// 						}
// 					})
				}
			})
		}
	}
</script>

<style>
	uni-page-body, uni-page-refresh{height: auto;}
	.approvalNotice{background-color: rgb(239,238,243);height:100%}
	/* #ifdef APP-PLUS  MP-WEIXIN*/
	.approvalNotice{background-color: rgb(239,238,243);height:100%}
	/* #endif */
	.approvalNotice .content-no{height: 100%; background-position: center;background-size: 40%;}
	.approvalNotice .content-no .img{width: 400upx;height: 400upx;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: 48% auto;}
	.approvalNotice .content-no .text{position: absolute;top: 740upx;bottom: 0;left: 0;right: 0;margin: auto;text-align: center;
		background-image: -webkit-linear-gradient(0deg, #cc5500, #ccbb00);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;
		  -webkit-animation: hue 60s infinite linear;
	}
	.approvalNotice .item {overflow: hidden;margin: 0 24upx;}
	.approvalNotice .item .item-datetime{font-size: 22upx;color: #FFFFFF;border-radius: 10px; text-align: center;padding: 26upx;background-color: rgb(206,206,206);width: 272upx;margin: 80upx auto 30upx;}
	.approvalNotice .item .item-main{display: flex;}
	.approvalNotice .item .item-main .img{width: 120upx;height: 120upx;margin-right: 24upx;}
	.approvalNotice .item .item-main .text-t{color: rgb(153,153,153);font-size: 22upx;}
	.approvalNotice .item .item-main .item-main-main{border-radius: 10px; background-color: #FFFFFF;padding: 30upx 24upx;margin-top: 10upx;}
	.item-main-main-1,.item-main-main-1-l{display: flex;}
	.item-main-main-1-l{color: rgb(51,51,51);font-size: 30upx;}
	.item-main-main-1-r{font-size: 22upx;color: rgb(153,153,153);flex: 1;text-align: right;}
	.item-main-main-2,.item-main-main-3,.item-main-main-4{color: rgb(102,102,102);font-size: 24upx;margin-top: 20upx;}
	.item-main-main-2{margin-top: 40upx;}
	.item-main-main-5{font-size: 26upx;color: rgb(254,138,20);margin-top: 40upx;}
</style>
