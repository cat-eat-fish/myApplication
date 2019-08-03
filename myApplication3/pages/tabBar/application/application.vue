<template>
	<view class="application">
		<view class="application-content">
			<view class="item" v-for="(item,index) in applicationC" :key="index" >
				<view class="item-title">
					<view class="icon"></view>
					<view class="text">{{item.titTxt}}</view>
				</view>
				<view class="item-content" >
					<view class="con-item" @tap="goPage(item2.url)" v-for="(item2,index2) in item.con" :key="index2">
						<view class="img">
							<image class="icon" :src="item2.img" mode="aspectFill"></image>
						</view>
						<view class="text">{{item2.text}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applicationC:[
					
					{id:0,titTxt:"业务受理",con:[{id:0,text:"审批受理",img:"/static/img/icon1.png",url:"/pages/application/approvalExam/approvalExam"},{id:1,text:"待我审批",img:"/static/img/icon2.png",url:"/pages/application/forApproval/forApproval"}]},
					{id:1,titTxt:"业务查询",con:[{id:0,text:"我发起的",img:"/static/img/icon3.png",url:"/pages/application/launched/launched"},{id:1,text:"我已审批",img:"/static/img/icon4.png",url:"/pages/application/haveApproved/haveApproved"}]},
					{id:2,titTxt:"考勤",con:[{id:0,text:"考勤打卡",img:"/static/img/icon5.png",url:"/pages/application/sign/sign"},{id:1,text:"考勤统计",img:"/static/img/icon6.png",url:"/pages/application/census/census"}]},
					{id:3,titTxt:"周报月报",con:[{id:0,text:"写日志",img:"/static/img/icon3.png",url:"/pages/information/census/census"},{id:1,text:"查看日志",img:"/static/img/icon6.png",url:"/pages/information/list/list"}]},
				]
			};
		},
		methods:{
			goPage(url){
				uni.navigateTo({url})
			},
		}
	}
</script>

<style>
	.application{background-color: rgb(245,245,245);}
	.application-content{padding-bottom: 50px;}
	view.iconfont{font-size: 30px;}
	.application-notice{}
	.application-notice .item{width: 100%;}
	.item .item-title{display: flex;padding: 24upx 24upx;}
	.item .item-title .icon{width: 10upx;border-radius: 30upx;height: 48upx;background: rgb(56, 147, 243);}
	.item .item-title .text{margin-left: 20upx;}
	
	.item-content{width: 100%;display: flex;justify-content: center;}
	.con-item{width: 300upx;height:300upx;background-color: #fff; overflow: hidden;border-radius: 30upx;}
	.con-item .img{width: 160upx;height: 160upx;margin: 40upx auto 0;}
	.con-item .img .icon{width: 100%;    height: 100%;}
	.con-item .text{line-height: 80upx;text-align: center;}
	.item-content .con-item:nth-child(2){margin-left: 20px;}
	/* .application-notice{padding: 25upx 24upx;margin: 10upx 24upx 10upx; display: flex; border-radius: 10upx;background-color: #fff;}
	.application-notice-bg{width: 100%; background-color: #ffc045;overflow: hidden;}
	.application-notice .img{width: 40upx;height: 36upx;padding: 3px;padding-right: 14px;}
	.application-notice .text{width: 600upx; font-size: 26upx;word-break:keep-all;whitewhite-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
	.application-content{display: flex;flex-wrap: wrap;padding-top: 80upx;}
	.application-content .item{overflow: hidden;margin-left: 32upx;margin-top: 24upx; width: 208upx;height: 208upx;border-radius: 10px;background-color: #fff;text-align: center;}
	.application-content .item .icon{width: 80upx;height: 80upx;margin: 40upx auto 0;}
	.application-content .item .icon .img{width: 80upx;height: 80upx;}
	.application-content .item .text{margin-top: 20upx;font-size: 26upx;color: rgb(102,102,102);}
	.application-content .item:nth-child(1){} */

</style>
