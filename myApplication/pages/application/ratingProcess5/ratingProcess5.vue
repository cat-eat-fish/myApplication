<template>
	<view class="ratingProcess">
		<view class="ratingProcess-title">
			<view class="img">{{aa}}</view>
			<view class="text">{{dataInfo.applay_per}}</view>
			<view class="text">{{bb}}</view>
		</view>
		<view class="ratingProcess-con">
			<view class="item">
				<view class="text-l">申请人</view>
				<view class="text-r">{{dataInfo.applay_per}}</view>
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
				<view class="text-l">证件类型</view>
				<view class="text-r">{{dataInfo.certtype}}</view>
			</view>
			<view class="item">
				<view class="text-l">证件号码</view>
				<view class="text-r">{{dataInfo.certno}}</view>
			</view>
			<view class="item" >
				<view class="text-l">产品名称</view>
				<view class="text-r">{{dataInfo.product_name}}</view>
			</view>
			<view class="item" >
				<view class="text-l">流资合同号</view>
				<view class="text-r">{{dataInfo.contract_no}}</view>
			</view>
			<view class="item" >
				<view class="text-l">业务品种金额</view>
				<view class="text-r">{{dataInfo.category_amount}}</view>
			</view>
			<view class="item" >
				<view class="text-l">可用金额</view>
				<view class="text-r">{{dataInfo.amount_available}}</view>
			</view>
			<view class="item" >
				<view class="text-l">申请金额</view>
				<view class="text-r">{{dataInfo.apply_amount}}</view>
			</view>
			<view class="item" >
				<view class="text-l">币种</view>
				<view class="text-r">{{dataInfo.currency}}</view>
			</view>
			<view class="item" >
				<view class="text-l">申请期限</view>
				<view class="text-r">{{dataInfo.application_period}}</view>
			</view>
			<view class="item" >
				<view class="text-l">贷款性质</view>
				<view class="text-r">{{dataInfo.nature_loan}}</view>
			</view>
			<view class="item" >
				<view class="text-l">贷款方式</view>
				<view class="text-r">{{dataInfo.loan}}</view>
			</view>
			<view class="item" >
				<view class="text-l">贷款投向</view>
				<view class="text-r">{{dataInfo.loans_to}}</view>
			</view>
			<view class="item" >
				<view class="text-l">贷款类型</view>
				<view class="text-r">{{dataInfo.load_type}}</view>
			</view>
			<view class="item" >
				<view class="text-l">贷款用途</view>
				<view class="text-r">{{dataInfo.use_proceeds}}</view>
			</view>
			<view class="item" >
				<view class="text-l">贷款种类</view>
				<view class="text-r">{{dataInfo.loan_types}}</view>
			</view>
			<view class="item" >
				<view class="text-l">用途明细</view>
				<view class="text-r">{{dataInfo.use_detail}}</view>
			</view>
			<view class="item" >
				<view class="text-l">还款方式</view>
				<view class="text-r">{{dataInfo.reimbursement_means}}</view>
			</view>
			<view class="item" >
				<view class="text-l">还款来源</view>
				<view class="text-r">{{dataInfo.source_repayment}}</view>
			</view>
			<view class="item" >
				<view class="text-l">结息方式</view>
				<view class="text-r">{{dataInfo.interest_settlement_way}}</view>
			</view>
			<view class="item" >
				<view class="text-l">退出措施</view>
				<view class="text-r">{{dataInfo.exit_measures}}</view>
			</view>
			<view class="item" >
				<view class="text-l">退出期限</view>
				<view class="text-r">{{dataInfo.exit_deadline}}</view>
			</view>
			<view class="item" >
				<view class="text-l">营销人</view>
				<view class="text-r">{{dataInfo.market_per}}</view>
			</view>
			<view class="item" >
				<view class="text-l">是否营销贷款</view>
				<view class="text-r">{{dataInfo.is_marketing_loan == 1 ? '是' : '否'}}</view>
			</view>
			<view class="item" >
				<view class="text-l">是否社团贷款</view>
				<view class="text-r">{{dataInfo.is_corporate_loan == 1 ? '是' : '否'}}</view>
			</view>
			<view class="item" >
				<view class="text-l">是否存量贷款</view>
				<view class="text-r">{{dataInfo.is_stock_loans == 1 ? '是' : '否'}}</view>
			</view>
			<view class="item">
				<view class="text-l">申请日期</view>
				<view class="text-r">{{dataInfo.applay_date}}</view>
			</view>
			
			<view class="uni-card" v-for="(list,index) in lists" :key="index">
				<view class="uni-list">
					<view class="uni-list-cell uni-collapse">
						<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.open ? 'uni-active' : ''"
						 @click="triggerCollapse(index)">
							{{list.name}}
						</view>
						<view class="uni-list uni-collapse" :class="list.open ? 'uni-active' : ''">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.pages" :key="key" @click="goDetailPage(item,key)">
								<view class="uni-list-cell-navigate uni-navigate-right"> {{item.name ? item.name : item}} </view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-popup :show="type === 'middle-img'" position="middle" mode="insert" @hidePopup="togglePopup('')">
				<view class="uni-center center-box">
					<image class="image" :src="annexeImg" />
				</view>
			</uni-popup>
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
				dataInfo:{
					load_type:"",
				},
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
				// 附件信息
			};
		},
		onLoad(e){
			var that = this,
				url = `http://${baseIp()}/ams/system/distribute.htm?module=yxInfo_YD&acceptid=${e.acceptid}&doc_id=${e.doc_id}&pdid=${e.pdid}&piid=${e.piid}&mainId=${e.id2}`;
			// console.log(url)
			uni.request({
				url,
				success(res){
					var data = res.data;
					that.dataInfo = data.object[0];
					console.log(data)
					that.aa = data.object[0].customer_name.substr(data.object[0].customer_name.length-2)
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
					that.active = i.length == 0 ? active.length  : that.active = i[0];
					
					data.object1.unshift({title:`${data.object[0].applay_per}`,desc:`我发起的 -- ${data.object[0].applay_date}`});
					that.list2 = data.object1;
					
					that.bb = data.object1[data.object1.length-1].status;
					
					that.listsInfo = data.object2;
					that.lists[0].pages = data.object2.map((item)=>{
						return item.annexname
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
				this.annexeImg = this.listsInfo[i].imgPath;
				this.togglePopup('middle-img')
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
