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
			<view class="item">
				<view class="text">假期联系方式 : </view>
				<view class="field">{{dataInfo.mobie}}</view>
			</view>
			<view class="item">
				<view class="text">请假天数 : </view>
				<view class="field">{{dataInfo.day}}</view>
			</view>
			<view class="item">
				<view class="text">请假日期 : </view>
				<view class="field">{{dataInfo.applayDate1}} 至 {{dataInfo.applayDate2}}</view>
			</view>
			<view class="item">
				<view class="text">请假类型 : </view>
				<view class="field">{{dataInfo.out_type}}</view>
			</view>
			<view class="item" >
				<view class="text">请假事由 : </view>
				<view class="field">{{dataInfo.leaveReason}}</view>
			</view>
		</view>
		<view class="investigation-title">审批信息</view>
		<view class="investigation-form form2">
			<view class="item">
				<view class="text">当前任务 : </view>
				<view class="field red">{{inve}}</view>
			</view>
			<view >
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
	import {baseIp} from "../../../config.js"
    import {getUserInfo,setUserInfo,getCid} from '../../../service.js';
	export default {
		data() {
			return {
				now:"",
				inve:"",
				items: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current: 1,
				tiid:"",
				pdId:"",
				piid:"",
				deptId:"",
				doc_id:"",
				status:0,
				mianId:"",
				comment:"",		
				dataInfo:{},
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateBack();
		},
		onLoad(e){
			this.acceptid = e.acceptid;
			this.tiid = e.tiid;
			this.pdid = e.pdid;
			this.piid = e.piid;
			this.doc_id = e.doc_id;
			// this.nodecode = e.nodecode;
			this.deptId = e.deptId;
			this.getnode()
			this.getData()
		},
		methods:{
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
							data.out_type = data.leaveType == '1' ? '事假' : data.leaveType == '2' ? "病假" : data.leaveType == '3' ? "婚假" : data.leaveType == "4" ? "丧假" : data.leaveType == "5" ? "产假" : data.leaveType == "5" ? "公假" : "";	
							that.dataInfo = data;
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
				
				uni.showLoading({title:"提交中",mask:true})
				// console.log(url);
				// return;
				uni.request({
					url,
					success(res){
						var data = res.data;
						if(data.code == 1){
							uni.hideLoading();
							uni.showToast({title:data.message,duration:3000,mask:true});
							setTimeout(function(){
								uni.reLaunch({url:"/pages/tabBar/information/information"})
							},3000)
						}else{
							uni.showToast({title:data.message,icon:"none",duration:3000,mask:true});
						}
					},
					fail(err){
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../investigation6/investigation6.css")
</style>




var time = formateDate(new Date(123),"Y-M-D h:min:s")