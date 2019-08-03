<template>
	<view class="content sign2">
		
		<view class="page-body">
			<cpimg ref="cpimgs" @result="cpimgOk" :iscamera="true" @err="cpimgErr" :number="1" :fixOrientation="true" :size="500" :maxWidth="1000"
			 :ql="0.9" type="base64" />
	        <view class="page-section page-section-gap">
	            <map 
					v-if="mapShow"
					class="map"  
					@controltap="controltap"
					:scale="scale"  
					:controls="controls"
					:latitude="latitude" 
					:longitude="longitude" 
					:circles="circles" 
					:markers="covers" 
				/>
	        </view>
			<view class="text-info">
				<view class="inputV" style="display: flex;justify-content: space-between;">
					<view>我的位置 （<text :class="isTrue ? 'colorBlue' : 'colorRed'">{{signstate}}</text> ）</view>
					<view>精确度:{{accuracy}}</view>
				</view>
				<view class="inputV">
					<view class="t">当前位置</view>
					<view class="text" >{{address}}</view>
				</view>
				<view class="inputV">
					<view class="t">备注</view>
					<input class="text" type="text" v-model="signInfo.remarks" placeholder="选填备注">
				</view>
				<view class="inputV">
					<button 
						style="color: white;" 
						:class="isTrue === true ? 'bgBlue' : isTrue === false ? 'bgGreen' : isTrue === null ? 'bgAsh' : ''" 
						@click="clickSign"
					>
						{{time}} --- {{signText}}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cpimg from "@/components/cpimg.vue"
	import { pathToBase64, base64ToPath } from '@/js_sdk/gsq-image-tools/image-tools/index.js'
    import {getUserInfo} from '@/service.js';
	import {baseIp,txKey} from "@/config.js"
	// import {handleSignClick,setSignInfo,addSignInfo,getSignInfo,delSignInfo,getInfo} from "../sign/sign.js"
	import {formateDate,pointInsideCircle,getBase64Image} from "@/common/util.js"	//时间按格式化
	export default {
		components:{cpimg},
		data() {
			return {
				inNum:null,			//在打卡范围内的 第 N 个
				allInfo:[],			//所有打卡范围内的信息
				allLoc:[],			//所有打卡范围内的经纬度信息
				
				bankId: "",								//部门Id
				standTime:"",							//当前打卡标准时间
				img:"",
				morning_clock_in:"",
				morning_clock_out:"",
				afternoon_clock_in:"",
				afternoon_clock_out:"",
				
				mapShow:false,
				isTrue:null,							//是否在考勤范围内
				signText:"",							//打卡文字
				signstate:"",							//打卡状态
				r : 80,									//半径
				scale:"17",								//缩放
				clickNum:0,								//点击重新获取位置信息次数
				latitude: "",							//当前经度
				longitude: "",							//当前维度
				accuracy:"",
				address:"我的位置",								//公司位置-名称	
				time:formateDate(new Date(),'h:min:s'),	//当前时分秒
				signInfo:{mode:"", latitude:"",longitude:"",address:"",time:"",remarks:""},	//打卡信息 （模式，经纬度，地址，时间 备注）
				covers: [
					// 公司点信息 latitude:37.788338,longitude:112.557031
					// {id:0,callout:{content:"*****科技有限公司",display:"ALWAYS",},latitude:37.788338,longitude:112.557031,iconPath: '../../../static/img/location.png'},
				],
				circles:[
					// 公司圆信息
					// {latitude:0,longitude:0,radius:0,strokeWidth:1,fillColor:"#7fff0099"},
				],
				controls:[
					// 控件
					{id:0,position:{left:280,top:260,width:32,height:32},iconPath:"../../../static/img/resetlo.png",clickable:true}
				],
				
				showData:{
					standTime:'',
					clockTime:'',
					status:'',
					file:'',
					userId:getUserInfo().userName,
					bankId:'',
				},
			}
		},
		onLoad(e){
			this.getData()
			this.getTime()
			this.showData.standTime = this.standTime = e.standTime;
		},
		methods: {
			getData(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=findAttendanceRules_YD&userId=${getUserInfo().userName}`;
				uni.request({
					url,
					success(res){
						let data = res.data.object;
						that.allInfo = data;
						that.r = Number(data[0].clock_scope);
						var arr = [];
						data.map((item,index)=>{
							that.covers[index]= {id:index,callout:{content:Number(item.address),display:"ALWAYS",},latitude:Number(item.latitude),longitude:Number(item.longitude),iconPath: '../../../static/img/location.png'};
							that.circles[index] = {latitude:item.latitude,longitude:item.longitude,radius:Number(item.clock_scope),strokeWidth:1,fillColor:"#7fff0099"};
							var a1 = [];
							a1.push(Number(item.latitude),Number(item.longitude))
							arr.push(a1)
						})
						that.allLoc = arr.concat();
						that.r = Number(data[0].clock_scope);
						that.getLocation()
						that.morning_clock_in = data[0].morning_clock_in;
						that.morning_clock_out = data[0].morning_clock_out;
						that.afternoon_clock_in = data[0].afternoon_clock_in;
						that.afternoon_clock_out = data[0].afternoon_clock_out;
						
						
						that.showData.bankId = that.bankId = res.data.object[0].deptid;
						that.mapShow = true;
					}
				})
			},
			// 实时时间
			getTime(){
				var that = this;
				setInterval(function(){
					that.time = formateDate(new Date(),'h:min:s')
				},1000)
			},
			
			cpimgOk(file) {
				this.showData.file = this.img = file[0];
				var that = this;
				setTimeout(()=>{
					that.handSign()
				},800)
				
			},
			handSign(){
				uni.showLoading({title:'打卡记录中'})
				var url = `${baseIp()}/ams/system/distribute.htm?module=workRecord_YD`;
				var data = {
					file: this.showData.file,
					userId: getUserInfo().userName,
					bankId: this.showData.bankId,
					clockTime: formateDate(new Date(), 'Y-M-D h:min:s'),
					standTime: this.showData.standTime,
					remark: this.signInfo.remarks,
					longitude: this.longitude,
					latitude: this.latitude,
					status: this.showData.status,
					clockPlace: this.signInfo.address
				};
				uni.request({
					url,
					method: "POST",
					data,
					success: (Res) => {
						uni.hideLoading();
						var data = Res.data;
						if (typeof(data) == "string") {
							data = eval('(' + data + ')');
						}
						if (typeof(data) == "object") {
							if (data.code == 1) {
								uni.showToast({title: data.message,mask: true,duration: 3000})
								setTimeout(function() {
									uni.reLaunch({
										url: `/pages/tabBar/information/information`
									})
								}, 3000)
							} else {
								uni.showToast({title: data.message,icon: "none",mask: true,duration: 3000})
							}
						}
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({title: err.errMsg,icon: "none"})
					}
				})
			},
			cpimgErr(e) {
				console.log(e)
			},
			
			
			// 点击打卡
			clickSign: function() {
				var that = this;
				var isTrue = this.is;
				if (isTrue === null) {
					uni.showToast({
						title: "请检查位置信息状态！",
						icon: "none",
						mask: true,
						duration: 3000
					})
					return;
				}
				var logTime = 1000 * 60 * 30;
				if (this.standTime ==  this.morning_clock_in) {
					var a = this.morning_clock_in;
					var nowTime = new Date().getTime();
					var time = formateDate(new Date(), "Y-M-D") + ' ' + a;
					time = time.replace(/-/g, ':').replace(' ', ':');
					time = time.split(':');
					var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
					var bzTime = time1.getTime()
					var textbz = formateDate(new Date(bzTime), "h:min")
					var logTime = bzTime - logTime;
					var textlog = formateDate(new Date(logTime), "h:min");
					if (nowTime < logTime) {
						uni.showToast({
							title: `上午上班打卡时间范围为${textlog} -- ${textbz}！`,
							icon: "none",
							mask: true,
							duration: 3000
						})
						return;
					}
				} else if (this.standTime == this.morning_clock_out) {
					var a = this.morning_clock_out;
				} else if (this.standTime == this.afternoon_clock_in) {
					var a = this.afternoon_clock_in;
					var nowTime = new Date().getTime();
					var time = formateDate(new Date(), "Y-M-D") + ' ' + a;
					time = time.replace(/-/g, ':').replace(' ', ':');
					time = time.split(':');
					var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
					var bzTime = time1.getTime()
					var textbz = formateDate(new Date(bzTime), "h:min")
					var logTime = bzTime - logTime;
					var textlog = formateDate(new Date(logTime), "h:min");
					if (nowTime < logTime) {
						uni.showToast({
							title: `下午上班打卡时间范围为${textlog} -- ${textbz}！`,
							icon: "none",
							mask: true,
							duration: 3000
						})
						return;
					}
				} else if (this.standTime == this.afternoon_clock_out) {
					var a = this.afternoon_clock_out;
				}
			
			
				var a = this.standTime;
				if (a == that.morning_clock_in) {
					var status1 = that.compareDate(a.substr(0, 5), formateDate(new Date(), 'h:min')) ? '00' : '01';
				} else if (a == that.morning_clock_out) {
					var status1 = that.compareDate(a.substr(0, 5), formateDate(new Date(), 'h:min')) ? '02' : '00';
				} else if (a == that.afternoon_clock_in) {
					var status1 = that.compareDate(a.substr(0, 5), formateDate(new Date(), 'h:min')) ? '00' : '01';
					
				} else if (a == that.afternoon_clock_out) {
					var status1 = that.compareDate(a.substr(0, 5), formateDate(new Date(), 'h:min')) ? '02' : '00';
				}
				var status2 = that.signInfo.mode === '正常打卡' ? '00' : that.signInfo.mode == '外勤打卡' ? '03' : '';
				
				var status = `${status1},${status2}`;
				
				this.showData.standTime = a;
				this.showData.status = status;
				
				// if(that.signInfo.mode == '外勤打卡'){
				// 	uni.showModal({title: '',content: '您当前为外勤，不能打卡！'});
				// 	return;
				// }
				
				this.$refs.cpimgs._changImg()
				
			},
			doSign(){
				var data = this;
			},
			// 腾讯位置服务
			getAdd(){
				if(this.isTrue === true){
					return;
				}
				var that = this;
				var key = txKey;
				var url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${that.latitude},${that.longitude}&key=${key}`;
				uni.request({
					url,
					success(res){
						var data = res.data;
						if(data.status != 0){
							uni.showToast({title:data.message,icon:"none"})
							return;
						}
						if(that.isTrue === false){
							let address = res.data.result.address + res.data.result.formatted_addresses.recommend
							that.address = address;
							that.signInfo.address = address;
						}
					}
				})
			},
			// 重新获取位置
			controltap(e){
				this.getLocation()
			},
			// 获取当前位置
			getLocation(){
				var that = this;
				if(this.clickNum !== 0){
					uni.showLoading({title:"获取中...",mask:true})
				}
				if(this.clickNum >= 10){
					uni.showToast({title:"请稍后尝试！",icon:"none",mask:true});
					return ;
				}
				this.clickNum++;
				// #ifdef MP-WEIXIN
					wx.getLocation({
						type: 'gcj02', //返回可以用于wx.openLocation的经纬度
						success (res) {
							uni.hideLoading();
						  	that.accuracy = res.accuracy;
						  	that.latitude = res.latitude;
						  	that.longitude = res.longitude;
						  	that.scale = 17;
						  	let len = that.covers.length;
						  	that.covers[1] = {id:len,latitude:res.latitude,longitude : res.longitude,iconPath: '../../../static/img/location.png'}
						  	var as = that.allLoc.map((item,index)=>{
						  		var arr = [];
						  		var s = pointInsideCircle([res.latitude,res.longitude],[item[0],item[1]],that.r/100000);
						  		if(s){
						  			arr[0] = s;
						  			arr[1] = index;
						  			return arr
						  		}
						  	})
						  	if(as[0] === undefined){
						  		that.isTrue = false;
						  		that.signInfo.mode = that.signText = that.signstate = "外勤打卡";
						  	}else{
						  		that.isTrue = true;
						  		that.signInfo.mode = that.signText = that.signstate = "正常打卡";
						  		that.inNum = as[0][1];
						  		let address = that.allInfo[as[0][1]].place_name;
						  		that.address = address;
						  		that.signInfo.address = address;
						  	}
						  	that.signInfo.latitude = res.latitude;
						  	that.signInfo.longitude = res.longitude;
						  	that.getAdd()
						},
						fail(err){
						  	uni.hideLoading()
						  	that.signText = "请检查位置信息";
						  	uni.showToast({title:"请检查位置信息状态！",icon:"none", mask:true,duration:3000})
						}
					})
				// #endif
				// #ifndef MP-WEIXIN
					uni.getLocation({
						type:"gcj02",	//gcj02 wgs84
						success(res) {
							uni.hideLoading();
							that.accuracy = res.accuracy;
							that.latitude = res.latitude;
							that.longitude = res.longitude;
							that.scale = 17;
							let len = that.covers.length;
							that.covers[1] = {id:len,latitude:res.latitude,longitude : res.longitude,iconPath: '../../../static/img/location.png'}
							var as = that.allLoc.map((item,index)=>{
								var arr = [];
								var s = pointInsideCircle([res.latitude,res.longitude],[item[0],item[1]],that.r/100000);
								if(s){
									arr[0] = s;
									arr[1] = index;
									return arr
								}
							})
							if(as[0] === undefined){
								that.isTrue = false;
								that.signInfo.mode = that.signText = that.signstate = "外勤打卡";
							}else{
								that.isTrue = true;
								that.signInfo.mode = that.signText = that.signstate = "正常打卡";
								that.inNum = as[0][1];
								let address = that.allInfo[as[0][1]].place_name;
								that.address = address;
								that.signInfo.address = address;
							}
							that.signInfo.latitude = res.latitude;
							that.signInfo.longitude = res.longitude;
							that.getAdd()
						},
						fail(err){
							uni.hideLoading()
							that.signText = "请检查位置信息";
							uni.showToast({title:"请检查位置信息状态！",icon:"none", mask:true,duration:3000})
						}
					});
				// #endif
				
			},
			// 时分比较
			compareDate(t1,t2){
				var a1 = Number(t1.substr(0,2));
				var a2 = Number(t1.substr(3));
		 
				var b1 = Number(t2.substr(0,2));
				var b2 = Number(t2.substr(3));
				if(a1 > b1){
					return true
				}else if(a1 < b1){
					return false
				}else if(a1 == b1){
					if(a2 >= b2){
						return true;
					}else if(a2 < b2){
						return false;
					}
				}
			},
			// 选择地址
			openLocation(){
				var that = this;
				uni.chooseLocation({
					success: function (res) {
						that.address = res.address;
						that.signInfo.address = res.address;
						// 这里是有问题的 .返回的 res 中有经纬度，地址名  如果使用这个经纬度 就会存在问题，（当前位置和公司位置重合），所以不建议使用这个经纬度。
						var s = pointInsideCircle([that.latitude,that.longitude],[that.circles[0].latitude,that.circles[0].longitude],that.r/10000);
						that.isTrue = s;
						that.signstate = s ? "在考勤范围内" : "不在考勤范围内";
						that.signText = s ? "正常打卡" : "外勤打卡";
						
					}
				});
			},
		}
	}
</script>

<style>
	uni-page-body{height: 100%;overflow: hidden;width:100%}
	.sign2{width: 100%;height: 100%; min-height: 100vh;}
	.map{width: 100%; height: 310px;}
	.colorGreen{color: #32CD32;}
	.colorBlue{color:#007aff}
	.colorRed{color:red}
	.bgBlue{background-color: #007aff;}
	.bgGreen{background-color: #32CD32;}
	.bgAsh{background-color: #C8C7CC;}
	.inputV {padding:20upx}
	.inputV .t{font-size:36upx}
	.inputV .text{border-bottom:1px solid #000;width: 100%;color:#666;}
</style>
