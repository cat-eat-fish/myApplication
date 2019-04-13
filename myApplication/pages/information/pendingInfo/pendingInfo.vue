<template>
	<view class="pendingInfo">
		<view class="item" v-for="(item,index) in info" :key="index">
			<view class="item-datetime">{{item.date}} {{item.time}}</view>
			<view class="item-main">
				<view class="vimg">
					<image class="img" src="../../../static/img/message_icon_01.png" mode=""></image>
				</view>
				<view class="text">
					<view class="text-t">待审信息</view>
					<view class="item-main-main">
						<view class="item-main-main-1">
							<view class="item-main-main-1-l">
								<view class="item-main-main-1-l-time">{{item.time}}</view>
								<view class="item-main-main-1-l-text">待审信息</view>
							</view>
							<view class="item-main-main-1-r">{{item.date}}</view>
						</view>
						<view class="item-main-main-2">
							<text >业务名称 : </text>
							<text> {{item.name}}</text>
						</view>
						<view class="item-main-main-3">
							<text>开始办理时间 : </text>
							<text> {{item.stateTime}}</text>
						</view>
						<view class="item-main-main-4">
							<text>发起人 : </text>
							<text> {{item.originator}}</text>
						</view>
						<view class="item-main-main-5">
							{{item.state}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseIp} from "../../../config.js"
	export default {
		data() {
			return {
				info:[
					{id:0,time:"10:20",date:"02月19日",name:"收回再贷",stateTime:"2019-02-26 10:20:36",originator:"张三",state:"退回"},
					{id:1,time:"10:20",date:"02月19日",name:"收回再贷",stateTime:"2019-02-26 10:20:36",originator:"张三",state:"结束"},
				]
			};
		},
		onLoad() {
			uni.setNavigationBarColor({
				frontColor:  "#000000",
				backgroundColor: "#FFFFFF"
			})
		}
	}
</script>
	
<style>
	/* #ifdef APP-PLUS MP-WEIXIN */
	.pendingInfo{background-color: rgb(239,238,243);height:100vh;overflow: auto;}
	/* #endif */
	.pendingInfo{background-color: rgb(239,238,243);height:100%;overflow: auto;}
	.pendingInfo .item {overflow: hidden;margin: 0 24upx;}
	.pendingInfo .item .item-datetime{font-size: 22upx;color: #FFFFFF;border-radius: 10px; text-align: center;padding: 26upx;background-color: rgb(206,206,206);width: 272upx;margin: 80upx auto 30upx;}
	.pendingInfo .item .item-main{display: flex;}
	.pendingInfo .item .item-main .img{width: 120upx;height: 120upx;margin-right: 24upx;}
	.pendingInfo .item .item-main .text-t{color: rgb(153,153,153);font-size: 22upx;}
	.pendingInfo .item .item-main .item-main-main{border-radius: 10px; background-color: #FFFFFF;padding: 30upx 24upx;margin-top: 10upx;}
	.item-main-main-1,.item-main-main-1-l{display: flex;}
	.item-main-main-1-l{color: rgb(51,51,51);font-size: 30upx;}
	.item-main-main-1-r{font-size: 22upx;color: rgb(153,153,153);flex: 1;text-align: right;}
	.item-main-main-2,.item-main-main-3,.item-main-main-4{color: rgb(102,102,102);font-size: 24upx;margin-top: 20upx;}
	.item-main-main-2{margin-top: 40upx;}
	.item-main-main-5{font-size: 26upx;color: rgb(254,138,20);margin-top: 40upx;}
</style>
