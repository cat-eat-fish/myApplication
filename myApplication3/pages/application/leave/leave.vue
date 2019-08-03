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
				<view class="text">姓名 </view>
				<view class="field">
					{{dataInfo.name}}
				</view>
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
				<view class="text">假期联系方式 </view>
				<view class="field">{{dataInfo.phone}}</view>
			</view>
			<view class="item" >
				<view class="text">请假天数 </view>
				<view class="field">
					<uni-number-box @change="change" :min="0"  :max="999"  :value="dataInfo.num"></uni-number-box>
				</view>
			</view>
			<view class="item" >
				<view class="text">请假类型 </view>
				<view class="field">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item" >
				<view class="text">请假日期 </view>
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
				<view class="text">请假事由 </view>
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
	import {getDate,formateDate} from "@/common/util.js"
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import {baseIp} from "../../../config.js"
    import {getUserInfo,getCid} from '@/service.js';
	export default {
		components: {uniNumberBox},
		data() {
			return {
				type:"",
				startDate:getDate('start'),
				endDate:getDate('end'),
				index: 0,
				array: ['事假',"病假","婚嫁","丧假","产假","公假"],	//
				arrayInfo:[{code:1,title:"事假"},{code:2,title:"病假"},{code:3,title:"婚假"},{code:4,title:"丧假"},{code:5,title:"产假"},{code:6,title:"公假"}],
				
				name:"请假审批",
				dataInfo:{
					title:1,				//外出类型
					jg:"",					//业务机构
					name:"",				//姓名
					station:"",				//岗位
					bm:"",					//部门
					phone:"",				//联系方式
					num:0,					//外出时长
					cause:"",				//外出事由
					time:formateDate(new Date(),'h:min'),
					date:formateDate(new Date(),'Y-M-D'),
					endtime:formateDate(new Date(),'h:min'),
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
			bindTimeChange: function(e) {
				this.dataInfo.time = e.target.value
			},
			bindDateChange2: function(e) {
				this.dataInfo.enddate = e.target.value
			},
			bindTimeChange2: function(e) {
				this.dataInfo.endtime = e.target.value
			},
			// 外出类型
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.dataInfo.title = this.arrayInfo[e.target.value].code;
			},
			// 数据初始化
			getBm(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=getUserId_YD&userId=${getUserInfo().userName}`
				uni.request({
					url,
					success(res){
						var data = res.data.object[0];
						that.type = data.type;
						that.dataInfo.jg = that.dataInfo.bm = data.dept_name;
						that.dataInfo.name = data.name;
						that.dataInfo.phone = data.mobie;
						that.dataInfo.station = data.post;
						that.dept_id = data.dept_id;
					}
				})
			},
			change(value) {
				this.dataInfo.num= value;
			},
			// 保存
			isKeep(){
				if(this.dataInfo.num == 0){
					uni.showToast({title:"请选择请假天数",icon:"none"})
					return ;
				}
				if(this.dataInfo.cause == ""){
					uni.showToast({title:"请输入请假事由",icon:"none"})
					return ;
				}
				
				let uploadData = this.dataInfo;
				uploadData.start = `${uploadData.date}`;
				uploadData.end = `${uploadData.enddate}`;
				var url = `${baseIp()}/ams/system/distribute.htm?module=addLeave_YD&id=${getUserInfo().userName}&type=${this.type}&branchId=${this.dept_id}&busType=06&name=${uploadData.name}&position=${uploadData.station}&mobie=${uploadData.phone}&day=${uploadData.num}&leaveType=${uploadData.title}&applayDate1=${uploadData.start}&applayDate2=${uploadData.end}&leaveReason=${uploadData.cause}&hr=true`;
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
									uni.hideLoading();
									var data = res.data;
									// console.log(data,typeof(data))
									if(typeof(data) === "string"){
										data = JSON.parse(data)
									}
									if(typeof(data) === "object"){
										if(data.code == 1){
											that.ishold = true;
											that.seq = data.seq
											uni.showToast({title:data.message,mask:true,duration:1500})
										}else{
											uni.showToast({title:data.message,icon:"none",mask:true,duration:2000})
										}
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
					url = `${baseIp()}/ams/system/distribute.htm?module=submitLeaveInfo_YD&Id=${that.seq}&userId=${getUserInfo().userName}&hr=true`;
					// console.log(url)
					uni.request({
						url,
						success(res){
							var  data = res.data;
							uni.hideLoading();
							if(data.code == 1){
								uni.showToast({title:data.message,mask:true,duration:3000});
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
