<template>
	<view class="ratingProcess">
		<view class="ratingProcess-title">
			<view class="img">{{aa}}</view>
			<view class="text">{{dataInfo.name}}</view>
			<view class="text">{{bb}}</view>
		</view>
		<view class="ratingProcess-con">
			<view class="item">
				<view class="text-l">申报名称</view>
				<view class="text-r">{{dataInfo.title2}}</view>
			</view>
			<view class="item">
				<view class="text-l">客户名称</view>
				<view class="text-r">{{dataInfo.customer_name}}</view>
			</view>
			<view class="item">
				<view class="text-l">客户号</view>
				<view class="text-r">{{dataInfo.customer_id}}</view>
			</view>
			<view class="item">
				<view class="text-l">客户类型</view>
				<view class="text-r">{{dataInfo.cust_type}}</view>
			</view>
			<view class="item">
				<view class="text-l">营销责任人</view>
				<view class="text-r">{{dataInfo.customer_name}}</view>
			</view>
			<view class="item">
				<view class="text-l">评级模型</view>
				<view class="text-r">{{dataInfo.evaluate_modle}}</view>
			</view>
			<view class="item">
				<view class="text-l">拟初评结果</view>
				<view class="text-r">{{dataInfo.first_level}}</view>
			</view>
			<view class="item">
				<view class="text-l">申请日期</view>
				<view class="text-r">{{dataInfo.applay_date}}</view>
			</view>
			<view class="item">
				<view class="text-l">申请理由</view>
				<view class="text-r">{{dataInfo.applay_reason}}</view>
			</view>
			<view class="item">
				<view class="text-l">上季度评级级别</view>
				<view class="text-r">{{dataInfo.last_level}}</view>
			</view>
			<view class="item">
				<view class="text-l">实际控制人</view>
				<view class="text-r">{{dataInfo.applay_per}}</view>
			</view>
			<view class="item-other">
				<view class="text-l">附件列表</view>
				<view class="text-r"><uni-icon type="arrowright" size="20"></uni-icon></view>
			</view>
			<view class="">
				<uni-steps :options="list2" direction="column" :active="active"></uni-steps>
				<!-- <button type="primary" @click="change">改变状态</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {baseIp} from "../../../config.js"
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon,uniSteps},
		data() {
			return {
				aa:"",
				bb:"",
				dataInfo:{},
				active:0,
				list2: []
			};
		},
		onLoad(e){
			var that = this;
			uni.request({
				url:`http://${baseIp()}/ams/system/distribute.htm?module=informationPJ&acceptid=${e.acceptid}&doc_id=${e.doc_id}&pdid=${e.pdid}&piid=${e.piid}&mainId=${e.id2}`,
				success(res){
					var data = res.data;
					that.dataInfo = data.object[0];
					console.log(data)
					that.aa = data.object[0].applay_per.substr(data.object[0].applay_per.length-2)
					data.object1.map((item)=>{
						item.title = item.name
						item.desc =  !item.approve_time ? `${item.status}` : item.status ? `${item.tokenname} -- ${item.approve_time} -- ${item.status}` : `${item.tokenname} -- ${item.approve_time}`;
						
					})
					var active = data.object1.map((item,index)=>{
						if(item.approve_time == ""){
							return index;
						}
					})
					var i = active.filter((val)=>{
						return val
					})
					that.active = i.length == 0 ? active.length : that.active = i[0];
					data.object1.unshift({title:`${data.object[0].applay_per}`,desc:`我发起的 -- ${data.object[0].applay_date}`});
					that.list2 = data.object1;
					that.bb = data.object1[data.object1.length-1].status
				}
			})
		},
		methods:{
			change() {
				if (this.active < this.list2.length - 1) {
					this.active += 1
				} else {
					this.active = 0
				}
			}
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS MP-WEIXIN */
	.ratingProcess{}
	/* #endif */
	.ratingProcess{}
	.ratingProcess-title{display: flex;justify-content: space-between; margin: 20upx 24upx;padding-bottom: 10px;border-bottom: 1px solid #000;}
	.ratingProcess-title .img{width: 120upx;height:120upx;border-radius: 50%;background-color: red;text-align: center;line-height: 120upx;color: #fff;}
	.ratingProcess-title .text{margin-top: 60upx;}
	.ratingProcess-con{margin: 20upx 24upx 0;}
	.ratingProcess-con .item{margin: 0 0 30upx;display: flex;}
	.ratingProcess-con .item .text-l{color: #929292;width: 200upx;}
	.ratingProcess-con .item .text-r{margin-left: 20upx;}
	.ratingProcess-con .item-other{display: flex;justify-content: space-between;border: 5px solid #999999;border-right: none;border-left: none;padding: 10px 0;}
</style>
