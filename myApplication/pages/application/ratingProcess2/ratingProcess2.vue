<template>
	<view class="ratingProcess">
		<view class="ratingProcess-title">
			<view class="img">{{aa}}</view>
			<view class="text">{{dataInfo.name}}</view>
			<view class="text">{{bb}}</view>
		</view>
		<view class="ratingProcess-con">
			<view class="item">
				<view class="text-l">用途</view>
				<view class="text-r">{{dataInfo.usertype}}</view>
			</view>
			<view class="item">
				<view class="text-l">客户名称</view>
				<view class="text-r">{{dataInfo.customer_name}}</view>
			</view>
			<view class="item">
				<view class="text-l">客户类型</view>
				<view class="text-r">{{dataInfo.custtype}}</view>
			</view>
			<view class="item">
				<view class="text-l">证件号码</view>
				<view class="text-r">{{dataInfo.certno}}</view>
			</view>
			<view class="item">
				<view class="text-l">是否有配偶</view>
				<view class="text-r">{{dataInfo.isstudy}}</view>
			</view>
			<view class="item" v-if="dataInfo.isstudy == '是'">
				<view class="text-l">配偶名称</view>
				<view class="text-r">{{dataInfo.spousename}}</view>
			</view>
			<view class="item" v-if="dataInfo.isstudy == '是'">
				<view class="text-l">配偶证件号码</view>
				<view class="text-r">{{dataInfo.spouseno}}</view>
			</view>
			<view class="item">
				<view class="text-l">申请日期</view>
				<view class="text-r">{{dataInfo.applay_date}}</view>
			</view>
			
			<view class="uni-card" >
				<view class="uni-list">
					<view class="uni-list-cell uni-collapse">
						<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="lists[0].open ? 'uni-active' : ''"
						 @click="triggerCollapse(0)">
							{{lists[0].name}}
						</view>
						<view class="uni-list uni-collapse" :class="lists[0].open ? 'uni-active' : ''">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in lists[0].pages" :key="key" @click="goDetailPage(item,key)">
								<view class="uni-list-cell-navigate uni-navigate-right"> {{item.name ? item.name : item}} </view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<uni-steps :options="list2" direction="column" :active="active"></uni-steps>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {baseIp} from "../../../config.js"
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon,uniSteps,uniPopup},
		data() {
			return {
				aa:"",
				bb:"",
				dataInfo:{},
				active:0,
				list2: [],
				
				// 附件信息
				type: '',
				annexeImg:"",
				listsInfo:[],
				lists: [{
						id: 'view',
						name: '附件预览',
						open: false,
						pages: []
					}
				],
				listImgInfo:[],
				// 附件信息
			};
		},
		onLoad(e){
			var that = this,
				url = `http://${baseIp()}/ams/system/distribute.htm?module=informationZX&acceptid=${e.acceptid}&doc_id=${e.doc_id}&pdid=${e.pdid}&piid=${e.piid}&mainId=${e.id2}`;
			// console.log(url)
			uni.request({
				url,
				success(res){
					var data = res.data;
					that.dataInfo = data.object[0];
					console.log(data)
					that.aa = data.object[0].name.substr(data.object[0].name.length-2)
					data.object1.map((item)=>{
						item.title = item.info == "" ? `${item.name}` : `${item.name} -- ${item.info}`;
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
					that.active = i.length == 0 ? active.length : that.active = i[0]-1;
					// data.object1.unshift({title:`${data.object[0].applay_per}`,desc:`我发起的 -- ${data.object[0].applay_date}`});
					that.list2 = data.object1;
					that.bb = data.object1[data.object1.length-1].status;
					
					that.listsInfo = data.object3;
					that.lists[0].pages = data.object3.map((item)=>{
						return item.annexname
					})
					that.listImgInfo = data.object3.map((item)=>{
						return item.imgPath
					})
				}
			})
		},
		methods:{
			togglePopup(type) {
				this.type = type;
			},
			triggerCollapse(e) {
				if (!this.lists[e].pages) {
					this.goDetailPage(this.lists[e].url);
					return;
				}
				for (var i = 0; i < this.lists.length; ++i) {
					if (e === i) {
						this.lists[i].open = !this.lists[e].open;
					} else {
						this.lists[i].open = false;
					}
				}
			},
			goDetailPage(e,i) {
				uni.previewImage({
					current:this.listsInfo[i].imgPath,
					urls: this.listImgInfo
				});
			}
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS  */
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
