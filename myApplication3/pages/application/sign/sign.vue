<template>
	<view class="content">
		<view v-if="showErr" class="showErr">
			<view>本地标准时间为：{{servetime}}</view>
			<view>您的手机时间为：{{nowtime}}</view>
			<view>时间相差太大，请调整您的手机时间</view>
		</view>

		<view v-else class="page-body">
			<view class="sign-title">
				<view class="sign-title-l">
					<view class="portrait">
						{{name.substr(-2)}}
					</view>
					<view class="text">
						<view class="name">
							{{name}}
						</view>
						<view class="gz" @click="goRule">
							<text class="t1">考勤组:公司考勤</text>
							<text>查看规则</text>
						</view>
					</view>
				</view>
				<view class="sign-title-r">
					<view class="date">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}
								<uni-icon type="arrowdown"></uni-icon>
							</view>
						</picker>
					</view>
				</view>
			</view>
			<view style="text-align: center;padding: 20upx 0;">当前位置: <text>{{address}}</text></view>
			<!-- <image :src="img" mode="aspectFill"></image> -->
			<view class="uni-timeline">
				<!-- 上午上班打卡 -->
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider" :style="{ background : (!isAm ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view class="uni-timeline-item-content-t1">上午上班时间{{morning_clock_in}}</view>
							<view class="desc-pad" v-if="isAm">
								<view class="time uni-timeline-item-content-t">
									打卡时间 {{(amSign.clock_time)}}
									<view class="iswq" v-if="amSign.iflegwork == '外勤'">外勤</view>
									<view class="iswq" v-if="amSign.status == '迟到'">迟到</view>
									<view class="iswq" v-if="amSign.status == '早退'">早退</view>
								</view>
								<view>
									<uni-icon type="location-filled" /> {{amSign.clock_place}}</view>
								<view class="bz last" @click="showBz('amSign')">
									备注 <uni-icon :style="{color:'rgb(0, 122, 255)'}" type="forward"></uni-icon>
								</view>
							</view>
							<view class="content-show" v-if="nowSign == 0">
								<view v-if="is === true">
									<view class="module CBlue" @click="clickSign('morning_clock_in')">
										<view class="text">上班打卡</view>
										<view class="time">{{time}}</view>
									</view>
									<view class="colorGreen" style="text-align: center;" v-if="is">
										已在考勤范围内 <text class="relocation" @click="relocation('morning_clock_in')">重新定位</text>
									</view>
								</view>
								<view v-else-if="is === false">
									<view class="module CGreen" @click="clickSign('morning_clock_in')">
										<view class="text">外勤打卡</view>
										<view class="time">{{time}}</view>
									</view>
									<view class="colorRed" style="text-align: center;" v-if="!is">
										不在考勤范围内 <text class="relocation" @click="relocation('morning_clock_in')">重新定位</text>
									</view>
								</view>
								<view v-else-if="is === null">
									<view class="module CAsh">
										<view class="text">请检查位置信息</view>
										<view class="time">{{time}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider" :style="{ background : (isAmOut ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view class="uni-timeline-item-content-t1">上午下班时间{{morning_clock_out}}</view>
							<view class="desc-pad">
								<view class="desc-pad" v-if="isAmOut">
									<view class="time uni-timeline-item-content-t">
										打卡时间 {{(amOutSign.clock_time)}}
										<view class="iswq" v-if="amOutSign.iflegwork == '外勤'">外勤</view>
										<view class="iswq" v-if="amOutSign.status == '迟到'">迟到</view>
										<view class="iswq" v-if="amOutSign.status == '早退'">早退</view>
									</view>
									<view>
										<uni-icon type="location-filled" /> {{amOutSign.clock_place}}</view>
									<view class="bz last" @click="showBz('amOutSign')">
										备注 <uni-icon :style="{color:'rgb(0, 122, 255)'}" type="forward"></uni-icon>
									</view>
								</view>
								<view class="content-show" v-if="nowSign == 1">
									<view v-if="is === true">
										<view class="module CBlue" @click="clickSign('morning_clock_out')">
											<view class="text">下班打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorGreen" style="text-align: center;" v-if="is">
											已在考勤范围内 <text class="relocation" @click="relocation('morning_clock_out')">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === false">
										<view class="module CGreen" @click="clickSign('morning_clock_out')">
											<view class="text">外勤打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorRed" style="text-align: center;" v-if="!is">
											不在考勤范围内 <text class="relocation" @click="relocation('morning_clock_out')">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === null">
										<view class="module CGreen">
											<view class="text">请检查位置信息</view>
											<view class="time">{{time}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider" :style="{ background : (isPmIn ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view class="uni-timeline-item-content-t1">下午上班时间{{afternoon_clock_in}}</view>
							<view class="desc-pad">
								<view class="desc-pad" v-if="isPmIn">
									<view class="time uni-timeline-item-content-t">
										打卡时间 {{(pmInSign.clock_time)}}
										<view class="iswq" v-if="pmInSign.iflegwork == '外勤'">外勤</view>
										<view class="iswq" v-if="pmInSign.status == '迟到'">迟到</view>
										<view class="iswq" v-if="pmInSign.status == '早退'">早退</view>
									</view>
									<view>
										<uni-icon type="location-filled" /> {{pmInSign.clock_place}}</view>
									<view class="bz last" @click="showBz('pmInSign')">
										备注 <uni-icon :style="{color:'rgb(0, 122, 255)'}" type="forward"></uni-icon>
									</view>
								</view>
								<view class="content-show" v-if="nowSign == 2">
									<view v-if="is === true">
										<view class="module CBlue" @click="clickSign('afternoon_clock_in')">
											<view class="text">上班打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorGreen" style="text-align: center;" v-if="is">
											已在考勤范围内 <text class="relocation" @click="relocation('afternoon_clock_in')">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === false">
										<view class="module CGreen" @click="clickSign('afternoon_clock_in')">
											<view class="text">外勤打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorRed" style="text-align: center;" v-if="!is">
											不在考勤范围内 <text class="relocation" @click="relocation('afternoon_clock_in')">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === null">
										<view class="module CGreen">
											<view class="text">请检查位置信息</view>
											<view class="time">{{time}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-divider" :style="{ background : (isPm ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view class="uni-timeline-item-content-t1">下午下班时间{{afternoon_clock_out}}</view>
							<view class="desc-pad">
								<view class="desc-pad" v-if="isPm">
									<view class="time uni-timeline-item-content-t">
										打卡时间 {{(pmSign.clock_time)}}
										<view class="iswq" v-if="pmSign.iflegwork == '外勤'">外勤</view>
										<view class="iswq" v-if="pmSign.status == '迟到'">迟到</view>
										<view class="iswq" v-if="pmSign.status == '早退'">早退</view>
									</view>
									<view>
										<uni-icon type="location-filled" /> {{pmSign.clock_place}}</view>
									<view class="bz last" @click="showBz('pmSign')">
										备注 <uni-icon :style="{color:'rgb(0, 122, 255)'}" type="forward"></uni-icon>
									</view>
								</view>
								<view class="content-show" v-if="nowSign == 3">
									<view v-if="is === true">
										<view class="module CBlue" @click="clickSign('afternoon_clock_out')">
											<view class="text">下班打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorGreen" style="text-align: center;" v-if="is">
											已在考勤范围内 <text class="relocation" @click="relocation('afternoon_clock_out')">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === false">
										<view class="module CGreen" @click="clickSign('afternoon_clock_out')">
											<view class="text">外勤打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorRed" style="text-align: center;" v-if="!is">
											不在考勤范围内 <text class="relocation" @click="relocation('afternoon_clock_out')">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === null">
										<view class="module CGreen">
											<view class="text">请检查位置信息</view>
											<view class="time">{{time}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<cpimg ref="cpimgs" @result="cpimgOk" :iscamera="true" @err="cpimgErr" :number="1" :fixOrientation="true" :size="500" :maxWidth="1000"
		 :ql="0.9" type="base64" />
		<!-- 备注 -->
		<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="title" style="padding: 20upx 0;font-weight: bold;width: 100%;text-align: center;border-bottom: 1px solid #666;">打卡备注</view>
			<view class="content" style="padding: 20upx 10upx;width: 100%;">
				<text class="text">打卡时间:</text>
				<text>{{bzText.time}}</text>
				<view class="text">打卡地点:</view>
				<view>{{bzText.address}}</view>
			</view>
			<view class="content" style="padding: 20upx 10upx;width: 100%;">
				<view>{{bzText.remarks}}</view>
				<view>
					<image style="width: 200upx;height: 200upx;" mode="aspectFill" :src="bzText.img"></image>
				</view>
			</view>
			<view class="bottom" style="padding: 20upx 10upx;color: cadetblue;width: 100%;text-align: center;border-top: 1px solid #666;"
			 @click="togglePopup('')">关闭</view>
		</uni-popup>
	</view>
</template>

<script>
	import cpimg from "@/components/cpimg.vue"

	import {
		getUserInfo
	} from '@/service.js';
	import {
		baseIp,
		txKey
	} from "@/config.js"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		formateDate,
		pointInsideCircle,
		isSameDay
	} from "@/common/util.js" //时间按格式化

	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		components: {
			uniCollapseItem,
			uniList,
			uniCollapse,
			uniIcon,
			uniPopup,
			cpimg
		},
		data() {
			return {
				inNum: null, //在打卡范围内的 第 N 个
				allInfo: [], //所有打卡范围内的信息
				allLoc: [], //所有打卡范围内的经纬度信息

				bankId: "", //部门Id
				standTime: "", //当前打卡标准时间

				nowSign: 0, //当前是哪个打卡   0 上午下班 1 上午下班 2 下午上班 3 下午下班

				name: getUserInfo().name,
				bzText: {
					time: "",
					address: "",
					img: "",
					remarks: ""
				},
				type: "",

				r: 80, //半径
				morning_clock_in: "",
				morning_clock_out: "",
				afternoon_clock_in: "",
				afternoon_clock_out: "", //上下班时间
				isAm: false, //上午上班是否打卡
				isAmOut: false, //上午下班是否打卡
				isPmIn: false, //下午上班是否打卡
				isPm: false, //下午下班是否打卡
				amSign: {
					clock_time: "",
					address: "",
					remarks: "",
					img: ""
				}, //上午打卡信息
				amOutSign: {
					clock_time: "",
					address: "",
					remarks: "",
					img: ""
				}, //上午打卡信息
				pmInSign: {
					clock_time: "",
					address: "",
					remarks: "",
					img: ""
				}, //下午打卡信息
				pmSign: {
					clock_time: "",
					address: "",
					remarks: "",
					img: ""
				}, //下午打卡信息
				clickNum: 0, //点击重新获取位置信息次数
				is: null, //是否正常打卡（外勤打卡）
				isSign: false, //是否打卡
				time: formateDate(new Date(), 'h:min:s'), //当前时分秒
				date: formateDate(new Date(), 'Y-M-D'),
				img: "",
				servetime: "",
				nowtime: "",
				showErr: false,
				latitude: "", //当前经度
				longitude: "", //当前维度
				address: "我的位置", //
				wqInfo: null,
				allSign: [], //所有打卡信息				
				signInfo: {
					mode: "",
					latitude: "",
					longitude: "",
					address: "",
					time: "",
					remarks: ""
				}, //打卡信息 （模式，经纬度，地址，时间）


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
		// 初始化
		onLoad() {
			this.getTime();
			this.getData()
		},
		methods: {
			doInfo() {
				var that = this;
				uni.showModal({
					title: '上传照片提示',
					content: '检测到您第一次打卡，请先拍照上传照片！',
					success: function(res) {
						if (res.confirm) {
							uni.chooseImage({
								count: 1,
								sizeType: ['compressed'], //'original', 
								sourceType: ['camera'], //
								success: function(res) {
									var img = res.tempFilePaths[0];
									that.img = img;
									var url =
										`${baseIp()}/ams/system/distribute.htm?module=saveBasicPhoto_YD&userId=${getUserInfo().userName}`;

									uni.uploadFile({
										url,
										filePath: res.tempFilePaths[0],
										name: 'file',
										success: (Res) => {
											let data = JSON.parse(Res.data)
											uni.showToast({
												title: data.message,
												mask: true
											})
										}
									});
								},
								fail: (err) => {
									uni.navigateBack();
								}
							})
						} else if (res.cancel) {
							uni.navigateBack();
						}
					},
				})
			},
			togglePopup(type) {
				this.type = type;
			},
			// 查看规则 
			goRule() {
				uni.navigateTo({
					url: "/pages/application/rule/rule"
				})
			},
			// 腾讯位置服务
			getAdd() {
				if (this.isAm && this.isPm && this.isAmOut && this.isPmIn) {
					return;
				}
				if (this.is === true) {
					return;
				}
				var that = this;
				var key = txKey;
				var url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${that.latitude},${that.longitude}&key=${key}`;
				uni.request({
					url,
					success(res) {
						var data = res.data;
						if (data.status != 0) {
							uni.showToast({
								title: data.message,
								icon: "none"
							})
							return;
						}
						if (that.is === null) {
							that.address = "请检查位置信息！";
						}
						if (that.is === false) {
							let address = res.data.result.address + res.data.result.formatted_addresses.recommend
							that.address = address;
							that.signInfo.address = address;
						}
					}
				})
			},
			// 初始化数据  （公司的经纬度 公司名称 打卡范围 ）
			getData() {
				var that = this;
				var url =`${baseIp()}/ams/system/distribute.htm?module=findAttendanceRules_YD&date=${this.date}&userId=${getUserInfo().userName}`;

				uni.request({
					url,
					success(res) {
						// console.log(res)
						var a = 5 * 60;
						var nowtime = Math.round(new Date() / 1000);
						var time = res.data.time;
						var jia = nowtime + a;
						var jian = nowtime - a;
						// console.log(formateDate((new Date(Number(jia+'000'))),"Y-M-D h:min:s"))
						// console.log(formateDate((new Date(Number(jian+'000'))),"Y-M-D h:min:s"))
						var bj = (jia > time && jian < time);
						if (!bj) {
							var sjc = time + '000';
							that.servetime = formateDate(new Date(Number(sjc)), "Y-M-D h:min:s");
							that.nowtime = formateDate(new Date(), 'Y-M-D h:min:s');;
							that.showErr = true;
							return;
						}
						if (res.data.code == 2) {
							uni.showToast({
								title: res.data.message,
								mask: true,
								icon: "none",
								duration: 3000
							});
							setTimeout(function() {
								uni.navigateBack();
							}, 3000)
							return;
						}
						let data = res.data.object;
						that.allInfo = data;
						var arr = [];
						data.map((item, index) => {
							var a1 = [];
							a1.push(Number(item.latitude), Number(item.longitude))
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
						// 是否有原始照片
						if (res.data.code1 == "0") {
							that.doInfo()
						}

						
						if (res.data.object2.length == 0) {
							that.nowSign = 0;
							that.isAm = false;
							that.isAmOut = false;
							that.isPmIn = false;
							that.isPm = false;
							that.amSign = {};
							that.amOutSign = {};
							that.pmInSign = {};
							that.pmSign = {};
							return;
						}
						res.data.object2.map((item, index) => {
							var i = item.picture.indexOf("ams");
							var img = item.picture.substring(i)

							img = img.replace(/\\/g, '/')
							item.picture = `${baseIp()}/${img}`;
						})
						// 是否有今天打卡信息
						
						if (res.data.object2.length != 0) {
							res.data.object2.map((item, index) => {
								item.clock_time = item.clock_time.substring(10, 16)
							})
						}
						
						// console.log(JSON.stringify(res.data.object2));
						
						if(res.data.object2.length == 1){
							if(res.data.object2[0].stand_time == that.morning_clock_in){
								that.isAm = true;
								that.nowSign = 1;
								that.amSign = res.data.object2[0];
							} else if(res.data.object2[0].stand_time == that.morning_clock_out){
								// that.isAm = false;
								that.isAmOut = true;
								that.nowSign = 2;
								// that.amSign = res.data.object2[0];
								that.amOutSign = res.data.object2[0];
							}else if(res.data.object2[0].stand_time == that.afternoon_clock_in){
								// that.isAm = false;
								// that.isAmOut = false;
								that.isPmIn = true;
								that.nowSign = 3;
								// that.amSign = res.data.object2[0];
								// that.amOutSign = res.data.object2[1];
								that.pmInSign = res.data.object2[0];
							}else if(res.data.object2[0].stand_time == that.afternoon_clock_out){
								// that.isAm = false;
								// that.isAmOut = false;
								// that.isPmIn = false;
								that.isPm = true;
								that.nowSign = 4;
								// that.amSign = res.data.object2[0];
								// that.amOutSign = res.data.object2[1];
								// that.pmInSign = res.data.object2[2];
								that.pmSign = res.data.object2[0];
							}
						}else if(res.data.object2.length == 2){
							if(res.data.object2[0].stand_time == that.morning_clock_in){
								that.isAm = true;
								that.amSign = res.data.object2[0];
								if(res.data.object2[1].stand_time == that.morning_clock_out){
									that.isAmOut = true;
									that.amOutSign = res.data.object2[1];
									that.nowSign = 2;
								}
								if(res.data.object2[1].stand_time == that.afternoon_clock_in){
									that.isPmIn = true;
									that.pmInSign = res.data.object2[1];
									that.nowSign = 3;
								}
								if(res.data.object2[1].stand_time == that.afternoon_clock_out){
									that.isPm = true;
									that.pmSign = res.data.object2[1];
									that.nowSign = 4;
								}
							} else if(res.data.object2[0].stand_time == that.morning_clock_out){
								that.isAmOut = true;
								that.amOutSign = res.data.object2[0];
								if(res.data.object2[1].stand_time == that.afternoon_clock_in){
									that.isPmIn = true;
									that.pmInSign = res.data.object2[1];
									that.nowSign = 3;
								}
								if(res.data.object2[1].stand_time == that.afternoon_clock_out){
									that.isPm = true;
									that.pmSign = res.data.object2[1];
									that.nowSign = 4;
								}
							}else if(res.data.object2[0].stand_time == that.afternoon_clock_in){
								that.isPmIn = true;
								that.pmInSign = res.data.object2[0];
								if(res.data.object2[1].stand_time == that.afternoon_clock_out){
									that.isPm = true;
									that.pmSign = res.data.object2[1];
									that.nowSign = 4;
								}
							}
							// else if(res.data.object2[0].stand_time == that.afternoon_clock_out){
							// 	that.isPmIn = true;
							// 	that.isPm = true;
							// 	that.nowSign = 4;
							// 	that.pmInSign = res.data.object2[0];
							// 	that.pmSign = res.data.object2[1];
							// }
						}else if(res.data.object2.length == 3){
							if(res.data.object2[0].stand_time == that.morning_clock_in){
								that.isAm = true;
								that.amSign = res.data.object2[0];
								if(res.data.object2[1].stand_time == that.morning_clock_out){
									that.isAmOut = true;
									that.amOutSign = res.data.object2[1];
									if(res.data.object2[2].stand_time == that.afternoon_clock_in){
										that.isPmIn = true;
										that.nowSign = 3;
										that.pmInSign = res.data.object2[2];
									}
									if(res.data.object2[2].stand_time == that.afternoon_clock_out){
										that.isPm = true;
										that.nowSign = 4;
										that.pmSign = res.data.object2[2];
									}
								}else if(res.data.object2[1].stand_time == that.afternoon_clock_in){
									that.isPmIn = true;
									that.nowSign = 3;
									that.pmInSign = res.data.object2[2];
									that.isPm = true;
									that.nowSign = 4;
									that.pmSign = res.data.object2[2];
								}
							} else if(res.data.object2[0].stand_time == that.morning_clock_out){
								that.isAmOut = true;
								that.isPmIn = true;
								that.isPm = true;
								that.nowSign = 4;
								that.amOutSign = res.data.object2[0];
								that.pmInSign = res.data.object2[1];
								that.pmSign = res.data.object2[2];
							}
							
						}else if(res.data.object2.length == 4){
							if(res.data.object2[0].stand_time == that.morning_clock_in){
								that.isAm = true;
								that.isAmOut = true;
								that.isPmIn = true;
								that.isPm = true;
								that.nowSign = 4;
								that.amSign = res.data.object2[0];
								that.amOutSign = res.data.object2[1];
								that.pmInSign = res.data.object2[2];
								that.pmSign = res.data.object2[3];
							} 
						}
					}
				})
			},
			// 获取当前位置
			getLocation() {
				var that = this;
				if (this.clickNum !== 0) {
					uni.showLoading({
						title: "获取中...",
						mask: true
					})
				}
				if (this.clickNum >= 3) {
					uni.showToast({
						title: "请稍后尝试！",
						icon: "none",
						mask: true
					});
					return;
				}
				this.clickNum++;
				// #ifdef MP-WEIXIN
				wx.getLocation({
					type: 'gcj02', //返回可以用于wx.openLocation的经纬度
					success (res) {
						uni.hideLoading();
								that.latitude = res.latitude;
								that.longitude = res.longitude;
								var as = that.allLoc.map((item, index) => {
									var arr = [];
									var s = pointInsideCircle([res.latitude, res.longitude], [item[0], item[1]], that.r / 100000);
									if (s) {
										arr[0] = s;
										arr[1] = index;
										return arr
									}
								})
								if (as[0] === undefined) {
									that.is = false;
									that.signInfo.mode = "外勤打卡";
								} else {
									that.is = true;
									that.signInfo.mode = "正常打卡";
									that.inNum = as[0][1];
									let address = that.allInfo[as[0][1]].place_name;
									that.address = address;
									that.signInfo.address = address;
								}
								that.signInfo.latitude = res.latitude;
								that.signInfo.longitude = res.longitude;
								that.getAdd()
							},
							fail(err) {
								uni.hideLoading();
								that.address = "请检查位置信息！"
								uni.showToast({
									title: "请检查位置信息状态！",
									icon: "none",
									mask: true,
									duration: 3000
								})
							}
					});
				// #endif
				
				// #ifndef MP-WEIXIN
				uni.getLocation({
					type: "gcj02", //gcj02
					success(res) {
							// console.log(res.latitude, res.longitude)
						uni.hideLoading();
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						var as = that.allLoc.map((item, index) => {
							var arr = [];
							var s = pointInsideCircle([res.latitude, res.longitude], [item[0], item[1]], that.r / 100000);
							if (s) {
								arr[0] = s;
								arr[1] = index;
								return arr
							}
						})
						if (as[0] === undefined) {
							that.is = false;
							that.signInfo.mode = "外勤打卡";
						} else {
							that.is = true;
							that.signInfo.mode = "正常打卡";
							that.inNum = as[0][1];
							let address = that.allInfo[as[0][1]].place_name;
							that.address = address;
							that.signInfo.address = address;
						}
						that.signInfo.latitude = res.latitude;
						that.signInfo.longitude = res.longitude;
						that.getAdd()
					},
					fail(err) {
						uni.hideLoading();
						that.address = "请检查位置信息！"
						uni.showToast({
							title: "请检查位置信息状态！",
							icon: "none",
							mask: true,
							duration: 3000
						})
					}
				});
				// #endif
				
			},
			// 重新定位
			relocation(e) {
				if (e == 'morning_clock_in') {
					var a = this.morning_clock_in;
				} else if (e == 'morning_clock_out') {
					var a = this.morning_clock_out;
				} else if (e == 'afternoon_clock_in') {
					var a = this.afternoon_clock_in;
				} else if (e == 'afternoon_clock_out') {
					var a = this.afternoon_clock_out;
				}
				uni.navigateTo({
					url: `/pages/application/sign2/sign2?standTime=${a}`,
				})
			},
			// 选择打卡日期
			bindDateChange: function(e) {
				var date = e.target.value;
				this.date = date;
				this.getData();
			},
			// 显示备注
			showBz(type) {
				this.type = 'middle-list';
				if (type == 'amSign') {
					this.bzText.time = this.amSign.clock_time;
					this.bzText.address = this.amSign.clock_place;
					this.bzText.remarks = this.amSign.remark;
					this.bzText.img = `${this.amSign.picture}`;
				}
				if (type == 'amOutSign') {
					this.bzText.time = this.amOutSign.clock_time;
					this.bzText.address = this.amOutSign.clock_place;
					this.bzText.remarks = this.amOutSign.remark;
					this.bzText.img = `${this.amOutSign.picture}`;
				}
				if (type == 'pmInSign') {
					this.bzText.time = this.pmInSign.clock_time;
					this.bzText.address = this.pmInSign.clock_place;
					this.bzText.img = `${this.pmInSign.picture}`;
					this.bzText.remarks = this.pmInSign.remark;
				}
				if (type == 'pmSign') {
					this.bzText.time = this.pmSign.clock_time;
					this.bzText.address = this.pmSign.clock_place;
					this.bzText.remarks = this.pmSign.remark;
					this.bzText.img = `${this.pmSign.picture}`;
				}
			},
			// 实时时间
			getTime() {
				var that = this;
				setInterval(function() {
					that.time = formateDate(new Date(), 'h:min:s')
				}, 1000)
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
			clickSign: function(e) {
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
				if (e == 'morning_clock_in') {
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
				} else if (e == 'morning_clock_out') {
					var a = this.morning_clock_out;
				} else if (e == 'afternoon_clock_in') {
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
				} else if (e == 'afternoon_clock_out') {
					var a = this.afternoon_clock_out;
				}

				// var img = res.tempFilePaths[0];
				// that.img = img;
				// uni.showLoading({title:"打卡记录中...",mask:true})
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
			
			// 时分比较
			compareDate(t1, t2) {
				var a1 = Number(t1.substr(0, 2));
				var a2 = Number(t1.substr(3));

				var b1 = Number(t2.substr(0, 2));
				var b2 = Number(t2.substr(3));
				if (a1 > b1) {
					return true
				} else if (a1 < b1) {
					return false
				} else if (a1 == b1) {
					if (a2 >= b2) {
						return true;
					} else if (a2 < b2) {
						return false;
					}
				}
			},
		},
	}
</script>

<style>
	.showErr {
		padding: 0 30upx;
	}

	.showErr view {
		margin: 30upx;
		text-align: center;
	}

	.map {
		width: 100%;
		height: 260px;
	}

	.uni-list-cell-left {
		padding: 0 30upx;
	}

	.text-desc {
		display: flex;
		justify-content: space-between;
		padding: 10upx 20upx
	}

	.colorRed {
		color: red;
	}

	.colorGreen {
		color: #32CD32;
	}

	.colorYellow {
		color: yellow;
	}

	.colorBlue {
		color: #007aff;
	}

	.bgBlue {
		background-color: #007aff;
	}

	.bgGreen {
		background-color: #32CD32;
	}

	.bgAsh {
		background-color: #C8C7CC;
	}

	.uni-timeline {
		padding: 30upx 20upx;
	}

	.uni-timeline-item-content-t {
		font-weight: bold;
	}

	.desc-pad {
		padding: 0 0upx
	}

	.desc-pad .bz {
		color: rgb(0, 122, 255);
	}

	.desc-pad .bz .icon {
		color: rgb(0, 122, 255)
	}

	.uni-timeline-last-item .uni-timeline-item-divider {
		background: #bbb;
	}

	.CBlue {
		background-color: #007aff;
		box-shadow: 0 5px 5px #007aff;
	}

	.CGreen {
		background-color: #32CD32;
		box-shadow: 0 5px 5px #32CD32;
	}

	.CAsh {
		background-color: #C8C7CC;
		box-shadow: 0 5px 5px #C8C7CC;
	}

	.module {
		overflow: hidden;
		margin: 20upx auto;
		width: 220upx;
		height: 220upx;
		border-radius: 50%;
		color: #fff;
		text-align: center;
	}

	.module .text {
		font-size: 20px;
		margin: 50upx auto 10upx;
	}

	.uni-timeline-item .uni-timeline-item-content {
		width: 100%;
		padding-right: 20upx;
	}

	.content-show {
		width: 100%
	}

	.sign-title {
		display: flex;
		justify-content: space-between;
		padding: 30upx 24upx;
		border-bottom: 1upx solid #333;
	}

	.sign-title .portrait {
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50%;
		background-color: rgb(56, 147, 243);
		color: #fff;
		font-size: 28upx;
		text-align: center;
	}

	.sign-title .sign-title-l {
		display: flex;
	}

	.sign-title .sign-title-l .text {
		margin-left: 20upx;
	}

	.sign-title .sign-title-l .text .name {
		font-size: 32upx;
	}

	.sign-title .sign-title-l .text .gz {
		color: darkblue;
		display: inline-flex;
	}

	.sign-title .sign-title-l .text .gz text {
		display: inline-block;
	}

	.sign-title .sign-title-l .text .gz .t1 {
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
		width: 166upx;
		/*需要配合宽度来使用*/
	}

	.iswq {
		padding: 0px 12px;
		color: #99CC33;
		border: 1px solid #99CC33;
		width: 30px;
		height: 24px;
		border-radius: 4px;
		margin-left: 20upx;
		display: inline-block;
	}

	.desc-pad .last {
		margin-bottom: 80upx;
	}

	.relocation {
		color: #0000FF;
	}

	.uni-popup .content .text {
		color: #666666;
	}
</style>
