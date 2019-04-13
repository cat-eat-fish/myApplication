<template>
	<view class="information">
		<view class="information-search-bg">
			<view class="information-search">
				<uni-icon class="search" type="search" color="#ff9a43" size="30"></uni-icon>
				<input type="text" class="serachInput" placeholder="搜索" value="" />
			</view>
		</view>
		<view class="information-content" >
			<view class="item" @click="goPage1"  >
				<view class="icon">
					<image class="img" src="../../../static/img/message_icon_01.png" mode=""></image>
				</view>
				<view class="item-text">
					<view class="title">待审信息</view>
					<view class="desc" v-if="dataInfo.count1 != 0">{{dataInfo.title}}</view>
					<view class="desc" v-else>暂无新消息</view>
				</view>
				<view class="item-other">
					<view class="time">{{dataInfo.time1}}</view>	
					<view class="icon">
						<uni-badge v-if="dataInfo.count1 != 0" :text="dataInfo.count1" type="error"></uni-badge>
					</view>
				</view>
			</view>
			<view class="item" @click="goPage2"  >
				<view class="icon">
					<image class="img" src="../../../static/img/message_icon_02.png" mode=""></image>
				</view>
				<view class="item-text">
					<view class="title">审批信息通知</view>
					<view class="desc" v-if="dataInfo.title2 != ''">{{dataInfo.title2}}</view>
					<view class="desc" v-else>暂无新消息</view>
				</view>
				<view class="item-other">
					<view class="time">{{dataInfo.time2}}</view>
					<view class="icon">
						<uni-badge v-if="dataInfo.count2 != 0" :text="dataInfo.count2" type="error"></uni-badge>
					</view>
				</view>
			</view>
		</view>
		
		<button type="default" @click="goPage">测试页面</button>
	</view>
</template>

<script>
	import {baseIp} from "../../../config.js"
    import {getUserInfo,setUserInfo} from '../../../service.js';
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon,uniBadge},
		data() {
			return {
				info:[
					{id:0,url:"/pages/application/forApproval/forApproval",title:'待审核消息',pid:0,desc:"待审核信息待审核信息待审核信息待审核信息",time:"昨天",num:"2"},
					{id:1,url:"/pages/application/approvalNotice/approvalNotice",title:'审批信息通知',pid:1,desc:"审批信息通知审批信息通知",time:"昨天",num:"2"},
				],
				dataInfo:{count1: "0",count2: "0",time1: "",time2: "",title1: "",title2: "",}
			};
		},
		onLoad() {
			var that = this;
			var userInfo =getUserInfo();
			if(!userInfo.isLogin){
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}else{
				uni.request({
					url:`http://${baseIp()}/ams/system/distribute.htm?module=pending_topInfo&userId=${userInfo.userId}`,
					success(res) {
						var data = res.data;
						if(data.code == 1){	
							that.dataInfo = data.object[0];
						}
					},
					fail(err){
						console.log(err)
					}
				})
			}
		},
		methods:{
			goPage1(){
				uni.navigateTo({
					url:"/pages/application/forApproval/forApproval"
				})
			},
			goPage2(){
				uni.navigateTo({
					url:"/pages/application/approvalNotice/approvalNotice"
				})
			},
			// 测试页面
			goPage(){
				uni.navigateTo({
					url:"/pages/test/test"
				})
			}
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS MP-WEIXIN*/
	.information{width: 100vh;background-color: #fff;}
	/* #endif */
	.information{width: 100%;background-color: #fff;}
	.information-search-bg{width: 100%;background-color: #fead3a;overflow: hidden;}
	.information-search{padding: 25upx 24upx;margin: 10upx 24upx 40upx;border-radius: 10upx; background-color: #fff; display: flex;justify-content: flex-start;}
	.serachInput{width: 90%;margin-left: 20upx;margin-top: 6upx;}
	.information-content .item{display: flex;margin: 30upx 0upx 0 24upx;position: relative;}
	.information-content .item::after{content: "";position: absolute;bottom: 0;right: 0;height:1px;width:496upx;background-color: rgb(230,230,230);}
	.information-content .item .icon .img{width: 200upx;height: 200upx;margin-right: 30upx;}
	.information-content .item-text{}
	.information-content .item .title{width: 366upx;font-size: 30upx;color: rgb(51,51,51);margin-top: 26upx;}
	.information-content .item .desc{width: 366upx;font-size: 26upx;color: rgb(102,102,102);margin-top: 26upx;word-break:keep-all;whitewhite-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
	.information-content .time{margin-top:20upx;font-size: 22upx;color: rgb(153,153,153);}
	.information-content .item .item-other{text-align: right;flex: 1;margin-right: 24upx;}
	.information-content .item .item-other .icon{margin-top: 20upx;}
	
	
	.information-content-no{width:100%;height:65%;background-image: url(../../../static/img/icon_empty state.png);background-size: 228upx 180upx; background-repeat: no-repeat;background-position: center;}
	.noInfo{text-align: center;font-size: 30upx;padding-top: 480upx;
	background-image: -webkit-gradient(linear, left 0, right 0, from(#f83600), to(#f9c423));
    -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
    -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */}

</style>
