<template>
	<view class="financialTrial">
		<view class="financialTrial-form">
			<view class="item">
				<view class="text">业务名称 </view>
				<view class="field">{{name}}</view>
			</view>
			<view class="item">
				<view class="text">业务机构 </view>
				<view class="field">{{dataInfo.jg}}</view>
			</view>
			<view class="item">
				<view class="text">用车人 </view>
				<view class="field">{{dataInfo.name}}</view>
			</view>
			<view class="item">
				<view class="text">岗位 </view>
				<view class="field">{{dataInfo.station}}</view>
			</view>
			<view class="item">
				<view class="text">部门 </view>
				<view class="field">{{dataInfo.bm}}</view>
			</view>
			<view class="item" >
				<view class="text">联系方式 </view>
				<view class="field">{{dataInfo.phone}}</view>
			</view>
			<view class="item" >
				<view class="text">司机 </view>
				<view class="field">
					<input type="text" value="" v-model="dataInfo.busname" placeholder="请输入司机名称" />
				</view>
			</view>
			<view class="item" >
				<view class="text">车牌号 </view>
				<view class="field">
					<input type="text" value="" v-model="dataInfo.busnum" placeholder="请输入车牌号" />
				</view>
			</view>
			<view class="item" >
				<view class="text">用车时间 </view>
				<view class="field isf">
					<view class="isf">
						<picker mode="date" :value="dataInfo.date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{dataInfo.date}}</view>
						</picker>
						<picker mode="date" :value="dataInfo.date" :start="startDate" :end="endDate" @change="bindDateChange2">
							<view class="uni-input">{{dataInfo.enddate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item" >
				<view class="text">用车事由 </view>
				<view class="field textarea">
					<textarea   v-model="dataInfo.cause"></textarea>
				</view>
			</view>
		</view>
		<view class="btns">
			<button class="gbg" @click="isKeep">保存</button>
			<button class="gbg" @click="submitAcce">提交受理</button>
		</view>
	</view>
</template>

<script>
    import {getUserInfo,getCid} from '@/service.js';
	import {getDate,formateDate} from "@/common/util.js"
	import {baseIp} from "@/config.js"
	export default {
		data() {
			return {
				type:"",
				startDate:getDate('start'),
				endDate:getDate('end'),
				name:"用车审批",
				dataInfo:{
					title:1,				//外出类型
					jg:"",					//业务机构
					name:"",				//姓名
					station:"",				//岗位
					bm:"",					//部门
					phone:"",				//联系方式
					cause:"",				//外出事由
					busname:"",				//司机
					busnum:"",				//车牌号
					date:formateDate(new Date(),'Y-M-D'),
					enddate:formateDate(new Date(),'Y-M-D'),
				},
				dept_id:"",
				seq:"",						//保存成功的返回值
				ishold:false,				//判断是否保存
			};
		},
		
		onLoad(){
			this.getBm();
		},
		methods:{
			bindDateChange: function(e) {
				this.dataInfo.date = e.target.value
			},
			bindDateChange2: function(e) {
				this.dataInfo.enddate = e.target.value
			},
			// 数据初始化
			getBm(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=getUserId_YD&userId=${getUserInfo().userName}`
				// console.log(url)
				uni.request({
					url,
					success(res){
						var data = res.data.object[0];
						that.type = data.type; 
						that.dataInfo.jg = that.dataInfo.bm = data.dept_name;
						that.dataInfo.name = data.name;
						that.dataInfo.phone = data.mobie;
						that.dataInfo.station = data.post;
						that.dept_id = data.dept_id
					}
				})
			},
			// 保存
			isKeep(){
				if(this.dataInfo.busname == ""){
					uni.showToast({title:"请输入司机名称",icon:"none"})
					return ;
				}
				if(this.dataInfo.busnum == ""){
					uni.showToast({title:"请输入车牌号",icon:"none"})
					return ;
				}
				if(this.dataInfo.cause == ""){
					uni.showToast({title:"请输入用车事由",icon:"none"})
					return ;
				}
				
				let uploadData = this.dataInfo;
				uploadData.start = `${uploadData.date}`;
				uploadData.end = `${uploadData.enddate}`;
				var url = `${baseIp()}/ams/system/distribute.htm?module=addCar_YD&id=${getUserInfo().userName}&branchId=${this.dept_id}&type=${this.type}&busType=07&name=${uploadData.name}&position=${uploadData.station}&mobie=${uploadData.phone}&dirver=${uploadData.busname}&carNumber=${uploadData.busnum}&applayDate1=${uploadData.start}&applayDate2=${uploadData.end}&carReason=${uploadData.cause}&hr=true`;
				// console.log(url)
				var that = this;
				uni.showModal({
					title: '是否保存',
					content: '保存后，请直接提交受理！',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({title:"保存中",mask:true})
							uni.request({
								url,
								success(res){
									var data = res.data;
									uni.hideLoading()
									if(data.code == 1){
										that.ishold = true;
										that.seq = data.seq
										uni.showToast({title:data.message,mask:true})
									}else{
										uni.showToast({title:data.message,mask:true})
									}
								}
							})
						}
					}
				});
			},
			// 提交受理
			submitAcce(){
				if(!this.ishold){
					uni.showModal({
						title: '您还没有保存',
						content: '您还没有保存数据，请先保存！',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					})
					return;
				}else{
					uni.showLoading({title:"提交中",mask:true})
					var that = this,
						url = `${baseIp()}/ams/system/distribute.htm?module=submitCarMainInfo_YD&Id=${that.seq}&userId=${getUserInfo().userName}&userId=${getUserInfo().userName}&hr=true`;
					// console.log(url)
					uni.request({
						url,
						success(res){
							var  data = res.data;
							if(data.code == 1){
								uni.hideLoading();
								uni.showToast({title:data.message,mask:true,duration:3000})
								setTimeout(function(){
									uni.reLaunch({url:`/pages/tabBar/information/information`})
								},3000)
							}
						},
						fail(err){
							console.log(err)
						}
					})
				}
			},
		}
	}
</script>

<style>
	@import url("../egress/moreS.css");
</style>
