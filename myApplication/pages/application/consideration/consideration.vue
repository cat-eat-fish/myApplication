<template>
	<view class="investigation consideration">
		<view class="investigation-title">受理详细信息</view>
		<view class="investigation-form form1">
			<view class="item">
				<view class="text">申请人 : </view>
				<view class="field">{{dataInfo.applay_per}}</view>
			</view>
			<view class="item">
				<view class="text">申请名称 : </view>
				<view class="field">{{dataInfo.title2}}</view>
			</view>
			<view class="item">
				<view class="text">客户名称 : </view>
				<view class="field">{{dataInfo.customer_name}}</view>
			</view>
			<view class="item">
				<view class="text">客户号 : </view>
				<view class="field">{{dataInfo.customer_id}}</view>
			</view>
			<view class="item">
				<view class="text">客户类型 : </view>
				<view class="field">{{dataInfo.cust_type}}</view>
			</view>
			<view class="item">
				<view class="text">营销责任人 : </view>
				<view class="field">{{dataInfo.market_per}}</view>
			</view>
			<view class="item">
				<view class="text">评级模型 : </view>
				<view class="field">{{dataInfo.evaluate_modle}}</view>
			</view>
			<view class="item">
				<view class="text">拟初评结果 : </view>
				<view class="field">{{dataInfo.first_level}}</view>
			</view>
			<view class="item">
				<view class="text">申请日期 : </view>
				<view class="field">{{dataInfo.applay_date}}</view>
			</view>
			<view class="item">
				<view class="text">申请理由 : </view>
				<view class="field">{{dataInfo.applay_reason}}</view>
			</view>
			<view class="item">
				<view class="text">上季度评级级别 : </view>
				<view class="field">{{dataInfo.last_level}}</view>
			</view>
			<view class="item">
				<view class="text">实际控制人 : </view>
				<view class="field">{{dataInfo.control_per}}</view>
			</view>
		</view>
		<view class="investigation-title">审议投票</view>
		<view class="investigation-form form1">
			<view class="item">
				<view class="text">投票意见 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange4">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items4" :key="index">
							<view>
								<radio :value="item.value" :checked="index === current4" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item text">
				<view class="text">投票意见 : </view>
				<view class="field textarea">
					<textarea v-model="votiOpinion"  auto-height />
				</view>
			</view>
		</view>
		<view class="investigation-title">审批信息</view>
		<view class="investigation-form form2">
			<view class="item">
				<view class="text">当前任务 : </view>
				<view class="field red">{{dataInfo.tokenName}}</view>
			</view>
			<view class="item">
				<view class="text">协助调查审批结果 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item text">
				<view class="text">协助调查审批意见 : </view>
				<view class="field textarea">
					<textarea v-model="comment"  auto-height />
				</view>
			</view>
			<view class="item" style="display: none;">
				<view class="text">发送短信通知 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange2">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items2" :key="index">
							<view>
								<radio :value="item.name" :checked="index === current2" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item" style="display: none;">
				<view class="text">发送短信通知 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange3">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items3" :key="index">
							<view>
								<radio :value="item.name" :checked="index === current3" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="btns">
				<button type="warn" @click="downEnclosure">附件列表</button>
				<button type="primary" @click="submitAcce">提交</button>
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
				items: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current: 1,
				
				items2: [{value: "shi",name: '是'},{value: "fou",name: '否'}],
				current2: 1,
				items3: [{value: "shi",name: '是'},{value: "fou",name: '否'}],
				current3: 1,
				acceptid:"",
				
				items4: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current4: 1,
				
				tiid:"",
				pdId:"",
				doc_id:"",
				status:"",
				comment:"",		
				voti:"",			//投票结果
				votiOpinion:"",		//投票意见
				dataInfo:{},
				Enclosure:[],		//附件
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateBack();
		},
		onLoad(e){
			this.acceptid = e.acceptid;
			this.tiid = e.tiid;
			this.pdid = e.pdid;
			this.doc_id = e.doc_id;
			var that = this;
			uni.request({
				url:`http://${baseIp()}/ams/system/distribute.htm?module=information&user_id=${getUserInfo().userId}&acceptid=${that.acceptid}&pdid=${e.pdid}&tiid=${e.tiid}&piid=455138&docid=30359`,
				success(res){
					var data = res.data;
					console.log(data)
					that.dataInfo = data.object[0];
					that.Enclosure = data.object1;
				}
			})
		},
		methods:{
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						this.status = evt.target.value == "tongyi" ? 0 : 1;
						break;
					}
				}
			},
			radioChange4(evt) {
				for (let i = 0; i < this.items4.length; i++) {
					if (this.items4[i].value === evt.target.value) {
						this.current4 = i;
						this.voti = evt.target.value == "tongyi" ? 0 : 1;
						break;
					}
				}
			},
			radioChange2(evt) {
				for (let i = 0; i < this.items2.length; i++) {
					if (this.items2[i].value === evt.target.value) {
						this.current2 = i;
						break;
					}
				}
			},
			radioChange3(evt) {
				for (let i = 0; i < this.items3.length; i++) {
					if (this.items3[i].value === evt.target.value) {
						this.current3 = i;
						break;
					}
				}
			},
			// 附件下载
			downEnclosure(){
				if(this.Enclosure.length == 0){
					uni.showToast({title:"暂无附件",icon:"none"})
				}else{
					console.log("有附件")
				}
			},
			// 提交审核
			submitAcce(){
// 				uni.showLoading({
// 					title:"加载中",
// 					mask:true,
// 				})
				var that = this;
// 				uni.request({
// 					url:`http://${baseIp()}/ams/system/distribute.htm?module=approveDoc&userId=${getUserInfo().userId}&taskInstanceId=${that.tiid}&pdId=${that.pdid}&piid=455138&docid=30359&comment=${that.comment}`,
// 					success(res){
// 						var data = res.data;
// 						uni.hideLoading();
// 					},
// 					fail(err){
// 						console.log(err)
// 					}
// 				})
			}
		}
	}
</script>

<style>
	.investigation{background-color: rgb(239,238,243);height: 100%;overflow: auto;}
	/* #ifdef APP-PLUS  */
	.investigation{background-color: rgb(239,238,243);height: 100vh;overflow: auto;}
	/* #endif */
	.investigation-title{font-size: 30upx;color: rgb(254,138,20);margin: 40upx 0 20upx 30upx;}
	.investigation-form{margin: 20upx 24upx 50upx;background-color: #fff;border-radius: 10px;padding: 20upx 0;}
	.investigation-form .item{display: flex;padding: 20upx 24upx;}
	.investigation-form .item .text{font-size: 26upx;color: rgb(55,55,55);}
	.investigation-form .item .field{font-size: 26upx;color: rgb(102,102,102);margin-left: 10upx;}
	.investigation-form .item .field.red{color: red;}
	.investigation-form .item .field.ra{display: flex;color: rgb(102,102,102);}
	
	.investigation-form .field.ra .group{display: flex;}
	.investigation-form .uni-list-cell {display: flex;}
	.investigation-form .uni-list-cell:nth-child(1),.uni-list-cell:nth-child(3),.uni-list-cell:nth-child(5){margin-left: 35upx;}
	.investigation-form .uni-list-cell:nth-child(2),.uni-list-cell:nth-child(4),.uni-list-cell:nth-child(6){margin-left: 100upx;}
	.investigation-form .item.text{display: block;}
	.investigation-form .item .field.textarea{width: 100%;height: 90upx;}
	.btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	.btns button{width: 48%;}
	
	.investigation-form .uni-list-cell::after{height:0}
	.investigation-form .uni-list-cell-pd {padding: 0;}
</style>
