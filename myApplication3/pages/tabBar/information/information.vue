<template>
	<view class="information">
		<uni-swiper-dot :info="swiperInfo" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in swiperInfo" :key="index">
					<view :class="item.colorClass" class="swiper-item">
						<image :src="item.url" mode="aspectFill" @click="goPage(item.page)" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="information-content" v-if="pageActive">
			<view class="item" @click="goPage1"  >
				<view class="icon">
					<view class="iconfont icondaishenpi"></view>
				</view>
				<view class="item-text">
					<view class="title">待审信息</view>
					<view class="desc" v-if="dataInfo.count1 != 0">{{dataInfo.title1}}</view>
					<view class="desc" v-else>暂无新消息</view>
				</view>
				<view class="item-other">
					<view class="time" v-if="dataInfo.count1 == 0"></view>
					<view class="time" v-else>{{dataInfo.time1.substring(5,11) }}</view>
					<view class="icon">
						<uni-badge v-if="dataInfo.count1 != 0" :text="String(dataInfo.count1)" type="error"></uni-badge>
					</view>
				</view>
			</view>
			<view class="item" @click="goPage2"  >
				<view class="icon">
					<view class="iconfont iconnotice"></view>
				</view>
				<view class="item-text">
					<view class="title">审批信息通知</view>
					<view class="desc" v-if="dataInfo.count2 != 0">{{dataInfo.title2}}</view>
					<view class="desc" v-else>暂无新消息</view>
				</view>
				<view class="item-other">
					<view class="time" v-if="dataInfo.count2 != 0">{{dataInfo.time2.substring(5,11) }}</view>
					<view class="icon">
						<!-- <uni-badge v-if="dataInfo.count2 != 0" :text="String(dataInfo.count2)" type="error"></uni-badge> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
    import {getUserInfo,setUserInfo} from '../../../service.js';
	import {baseIp} from "../../../config.js"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon,uniBadge,uniSwiperDot},
		data() {
			return {
				swiperInfo: [{
						colorClass: 'uni-bg-red',
						url: '/static/img/swiper1.png',
						content: '外出审批',
						page:"/pages/application/egress/egress"
					},
					{
						colorClass: 'uni-bg-green',
						url: '/static/img/swiper2.png',
						content: '用车审批',
						page:"/pages/application/bus/bus"
					},
					// {
					// 	colorClass: 'uni-bg-blue',
					// 	url: '/static/img/swiper3.png',
					// 	content: '淡季请假审批',
					// 	page:"/pages/application/leave/leave"
					// }
				],
				dotsStyles: {},
				current: 0,
				mode: 'long',
				
				
				pageActive:true,
				info:[
					{id:0,url:"/pages/application/forApproval/forApproval",title:'待审核消息',pid:0,desc:"待审核信息待审核信息待审核信息待审核信息",time:"昨天",num:"2"},
					{id:1,url:"/pages/application/approvalNotice/approvalNotice",title:'审批信息通知',pid:1,desc:"审批信息通知审批信息通知",time:"昨天",num:"2"},
				],
				dataInfo:{count1: "0",count2: "0",time1: "",title1:"", time2:"",title2:""}
			};
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getInfo();
		},
		onLoad() {
			this.getInfo();
		},
		onReady() {
			var that = this;
			
		},
		onHide() {
			
		},
		methods:{
			change(e) {
				this.current = e.detail.current
			},
			goPage(e){
				uni.navigateTo({url:e})
			},
			getInfo(){
				var that = this;
				uni.request({
					url:`${baseIp()}/ams/system/distribute.htm?module=waitApprove_YD&userId=${getUserInfo().userName}`,
					success(res) {
						uni.stopPullDownRefresh();
						var data = res.data;
						if(data.code == 1){	
							that.dataInfo.count1 = data.count1;
							that.dataInfo.count2 = data.count2;
							if(data.time1.length == 0){
								that.dataInfo.time1 = ""
								that.dataInfo.title1 = ""
							}else{
								that.dataInfo.time1 = data.time1[0].APPLAY_DATE;
								that.dataInfo.title1 = data.time1[0].TITLE2;
							}
							if(data.time2.length == 0){
								that.dataInfo.time2 = ""
								that.dataInfo.title2 = ""
							}else{
								that.dataInfo.time2 = data.time2[0].APPLAY_DATE;
								that.dataInfo.title2 = data.time2[0].TITLE2;
							}
							
							that.pageActive = true;
						}
					},
					fail(err){
						uni.showToast({title:err.errmsg,icon:"none"})
					}
				})
			},
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
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS */
	.information{width: 100vh;background-color: #fff;}
	/* #endif */
	
	.icon .iconfont{font-size: 36px;margin: 20px 38px;}
	.information{width: 100%;background-color: #fff;}
	.information-search-bg{width: 100%;background-color: #fead3a;overflow: hidden;}
	.information-search{padding: 8upx 24upx;margin: 10upx 24upx;border-radius: 10upx; background-color: #fff; display: flex;justify-content: flex-start;}
	.serachInput{width: 90%;margin-left: 20upx;margin-top: 7px;}
	.information-content .item{display: flex;border-bottom: 1px solid #c5c5c5;position: relative;}
	
	.information-content .item .icon .img{width: 200upx;height: 200upx;margin-right: 30upx;}
	.information-content .item-text{}
	.information-content .item .title{width: 366upx;font-size: 30upx;color: rgb(51,51,51);margin-top: 26upx;}
	.information-content .item .desc{width: 366upx;font-size: 26upx;color: rgb(210, 210, 210);margin-top: 26upx;word-break:keep-all;whitewhite-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
	.information-content .time{margin-top:20upx;font-size: 22upx;color: rgb(153,153,153);}
	.information-content .item .item-other{text-align: right;flex: 1;margin-right: 24upx;}
	.information-content .item .item-other .icon{margin-top: 20upx;}
	.uni-icon{ margin: 3px 0;}
	
	.information-content-no{width:100%;height:65%;background-image: url(../../../static/img/icon_empty state.png);background-size: 228upx 180upx; background-repeat: no-repeat;background-position: center;}
	.noInfo{text-align: center;font-size: 30upx;padding-top: 480upx;
	background-image: -webkit-gradient(linear, left 0, right 0, from(#f83600), to(#f9c423));
    -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
    -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */}

	.swiper-box {height: 400upx;}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}

</style>
