<template>
	<view class="investigation">
		<view class="investigation-title">受理详细信息</view>
		<view class="investigation-form form1">
			<view class="item">
				<view class="text">审批类型 : </view>
				<view class="field">{{dataInfo.approveName}}</view>
			</view>
			<view class="item">
				<view class="text">申请人 : </view>
				<view class="field">{{dataInfo.name}}</view>
			</view>
			<view class="item">
				<view class="text">所在部门 : </view>
				<view class="field">{{dataInfo.deptName}}</view>
			</view>
			<view class="item">
				<view class="text">所在岗位 : </view>
				<view class="field">{{dataInfo.post}}</view>
			</view>
			<view class="item" >
				<view class="text">联系方式 : </view>
				<view class="field">{{dataInfo.mobie}}</view>
			</view>
			<view class="item">
				<view class="text">外出开始时间 : </view>
				<view class="field">{{dataInfo.applayDate1}}</view>
			</view>
			<view class="item" v-if="dataInfo.applayDate2">
				<view class="text">外出结束时间 : </view>
				<view class="field">{{dataInfo.applayDate2}}</view>
			</view>
			<!-- <view class="item" >
				<view class="text">外出时长 : </view>
				<view class="field">{{dataInfo.outDuration}}</view>
			</view> -->
			<view class="item" >
				<view class="text">外出类别 : </view>
				<view class="field">{{dataInfo.out_type}}</view>
			</view>
			<view class="item" >
				<view class="text">外出事由 : </view>
				<view class="field">{{dataInfo.outReason}}</view>
			</view>
			<view class="item" >
				<view class="text">附件 : </view>
				<view class="field">
					<image style="width: 200upx;height: 200upx;" mode="aspectFill"  :src="dataInfo.picture"></image>
				</view>
			</view>
		</view>
		<view class="investigation-title">审批信息</view>
		<view class="investigation-form form2">
			<view class="item">
				<view class="text">当前任务 : </view>
				<view class="field red">{{inve}}</view>
			</view>
			<view v-if="nowName == getName">
				<view class="item" >
					<view class="text">外出结束时间 : </view>
					<view class="field isf">
						<view class="isf">
							<picker mode="date" :value="dataInfo2.enddate" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{dataInfo2.enddate}}</view>
							</picker>
							<picker class="ise" mode="time" :value="dataInfo2.endtime"  @change="bindTimeChange">
								<view class="uni-input">{{dataInfo2.endtime}}</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- <view class="item" >
					<view class="text">外出时长 : </view>
					<view class="field">
						<uni-number-box @change="change" :min="0"  :max="999"  :value="dataInfo2.num"></uni-number-box>
					</view>
				</view> -->
			</view>
			<view>
				<view class="item">
					<view class="text">审批结果 : </view>
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
				<view class="item text" >
					<view class="text">审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
		</view>
		<view class="btns">
			<button class="gbg" @click="submitAcce">提交</button>
		</view>
	</view>
</template>

<script>
	import {getDate,formateDate} from "@/common/util.js"
	import {baseIp} from "../../../config.js"
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
    import {getUserInfo,setUserInfo,getCid} from '../../../service.js';
	
	export default {
		components: {uniNumberBox},
		data() {
			return {
				dataInfo:[],
				deptId:"",
				inve:"",
				items: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current: 1,
				tiid:"",
				pdId:"",
				piid:"",
				doc_id:"",
				mianId:"",
				status:0,
				comment:"",
				startDate:getDate('start'),
				endDate:getDate('end'),
				dataInfo2:{
					endtime:formateDate(new Date(),'h:min'),
					enddate:formateDate(new Date(),'Y-M-D'),
					num:0,
				},
				
				nowName:"",
				getName:"",
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateBack();
		},
		onLoad(e){
			uni.showLoading({title:"加载中...",mask:true})
			this.nowName = getUserInfo().name;
			this.deptId = e.deptId;
			this.acceptid = e.acceptid;
			this.tiid = e.tiid;
			this.pdid = e.pdid;
			this.piid = e.piid;
			this.doc_id = e.doc_id;
			this.nodecode = e.nodecode;
			this.getnode()
			this.getData()
		},
		methods:{
			bindDateChange: function(e) {
				this.dataInfo2.enddate = e.target.value
			},
			bindTimeChange: function(e) {
				this.dataInfo2.endtime = e.target.value
			},
			change(value) {
				this.dataInfo2.num= value;
			},
			// 初始化节点名称
			getnode(){
				var url = `${baseIp()}/ams/system/distribute.htm?module=approveDocView_YD&userID=${getUserInfo().userName}&deptID=${this.deptId}&acceptId=${this.acceptid}&pdId=${this.pdid}&tiId=${this.tiid}&piId=${this.piid}&docId=${this.doc_id}&hr=true`;
				
				var that = this;
				uni.request({
					url,
					success(res){
						var data = res.data;
						uni.setNavigationBarTitle({title: data.tokenName})
						that.inve = data.tokenName;
					}
				})
			},
			// 初始化数据
			getData(){
				var url2 =`${baseIp()}/ams/system/distribute.htm?module=allInfoView_YD&acceptId=${this.acceptid}&tiId=${this.tiid}&pdId=${this.pdid}&hr=true`
				var that = this;
				uni.request({
					url:url2,
					success(res){
						let data = res.data;
						data.out_type = data.outType == '1' ? '公事' : data.outType == '2' ? "私事" : "";
						var i = data.imgPath.indexOf("ams");
						var img = data.imgPath.substring(i)
						
						img = img.replace(/\\/g, '/')
						var img2 = img.replace(/\\/g, '/')
						data.picture = `${baseIp()}/${img2}`;
						that.dataInfo = data;
						that.getName = data.name;
						uni.hideLoading()
					}
				})
			},
			// 点击审批
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						this.status = evt.target.value == "tongyi" ? 1 : 0;
						break;
					}
				}
			},
			// 提交审核
			submitAcce(){
				var that = this;
				var url =`${baseIp()}/ams/system/distribute.htm?module=approveDoc_YD&acceptId=${this.acceptid}&taskInstanceId=${this.tiid}&pdId=${this.pdid}&docId=${this.doc_id}&piId=${this.piid}&userId=${getUserInfo().userName}&userName=${getUserInfo().name}&comment=${this.comment}&status=${this.status}&hr=true`;
				
				if(this.nowName == this.getName){
					var end = `${this.dataInfo2.enddate} ${this.dataInfo2.endtime}`;
					url = `${baseIp()}/ams/system/distribute.htm?module=approveDoc_YD&acceptId=${this.acceptid}&taskInstanceId=${this.tiid}&pdId=${this.pdid}&docId=${this.doc_id}&piId=${this.piid}&userId=${getUserInfo().userName}&userName=${getUserInfo().name}&comment=${this.comment}&status=${this.status}&hr=true&applayDate2=${end}`;
				}
				uni.showLoading({title:"提交中",mask:true})
				uni.request({
					url,
					success(res){
						uni.hideLoading();
						var data = res.data;
						if(data.code == 1){
							uni.showToast({title:data.message,duration:3000,mask:true});
							setTimeout(function(){
								uni.reLaunch({url:"/pages/tabBar/information/information"})
							},3000)
						}else{
							uni.showToast({title:data.message,icon:"none",duration:3000,mask:true});
						}
					},
					fail(err){
						// console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
@import "./investigation6.css";
.ise{margin-left: 30upx;}
</style>
