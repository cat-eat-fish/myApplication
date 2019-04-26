<template>
	<view class="reportingProcess">
		<view class="reportingProcess-form">
			<view class="item">
				<view class="text">用途 : </view>
				<view class="field ra first">
					<radio-group class="group first" @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
							<view>
								<radio :value="item.code" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item">
				<view class="text">客户类型 : </view>
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
			<view class="item">
				<view class="text">证件类型 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange5">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items5" :key="index">
							<view>
								<radio :value="item.name" :checked="index === current5" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item">
				<view class="text">客户名称 : </view>
				<view class="field">
					<input type="text" value="" v-model="dataInfo.customer_name" placeholder="请输入客户名称" />
				</view>
			</view>
			<view class="item">
				<view class="text">证件号码 : </view>
				<view class="field">
					<input type="text" value="" v-model="dataInfo.certNo" placeholder="请输入证件号码" />
				</view>
			</view>
			
			<view class="item">
				<view class="text">是否有配偶 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange3">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items3" :key="index">
							<view>
								<radio :value="item.value" :checked="index === current3" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item" v-if="isShowOther">
				<view class="text">配偶名称 : </view>
				<view class="field">
					<input type="text" value=""  v-model="dataInfo.spouseName" placeholder="请输入配偶名称" />
				</view>
			</view>
			<view class="item" v-if="isShowOther">
				<view class="text">配偶证件号 : </view>
				<view class="field">
					<input type="text" value="" v-model="dataInfo.spouseNo" placeholder="请输入配偶证件号" />
				</view>
			</view>
		</view>
		<view class="btns">
			<button type="warn" @click="goUploadPage">上传文件</button>
			<button type="warn" @click="showDataImg">附件列表</button>
			<button type="primary" @click="submitAcce">提交受理</button>
		</view>
		
		<!-- 附件列表 -->
		<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<scroll-view class="uni-center center-box" :scroll-y="true">
				<view class="uni-list-item" v-for="(item, index) in uploadData" :key="index">
					<view @click="showImg(item.imgPath)" style="margin: 20upx 0;">
						{{ item.annexname }}
					</view>
				</view>
			</scroll-view>
		</uni-popup>
		<!-- 附件具体图片 -->
		<uni-popup :show="type === 'middle-img'" position="middle" mode="insert" @hidePopup="togglePopup('')">
			<view class="uni-center center-box">
				<image class="image" :src="annexeImg" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {baseIp} from "../../../config.js"
    import {getUserInfo,setUserInfo} from '../../../service.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {uniPopup},
		data() {
			return {
				items: [],
				current: 0,
				items2: [{value: "shi",name: '个人客户'}],
				current2: 0,
				items3: [{value: "1",name: '是'},{value: "0",name: '否'}],
				current3: 0,
				items5: [{value: "身份证",name: '身份证'}],
				current5: 0,
				
				isShowOther:true,
				
				ishold:false,		//是否保存
				isupload:false,		//是否上传
				uploadData:[],
				seq:"",
				type:"",
				annexeImg:"",
				
				
				dataInfo:{
					userType:"",			//用途
					customer_name:"",		//客户名称
					certNo:"",				//客户证件号
					checkForSpouse:"",		//是否有配偶
					spouseName:"",			//配偶名称
					spouseNo:"",			//配偶证件号
					applay_reason:"",		//申请理由
				}
			};
		},
		onNavigationBarButtonTap(e) {
			this.isKeep()
		},
		onLoad(e){
			this.getType();
			this.seq = e.mainId ? e.mainId : "";
			this.current3 = e.ishas == null ? 0 : e.ishas == 1 ? 0 : e.ishas == 0 ? 1 : "";
			this.isShowOther = this.current3 == 0 ? true : false;
			this.dataInfo.checkForSpouse = this.items3[this.current2].value;
			this.isupload = e.isupload == undefined ? false : true;
			this.ishold = e.ishold == undefined ? false : true;
		},
		watch:{
			seq(val,oldval){
				if(val != ""){
					this.getDataImg();
				}
			},
			
		},
		methods:{
			togglePopup(type) {
				this.type = type;
			},
			showDataImg(){
				if(this.uploadData == ""){
					uni.showToast({title:"暂无附件",mask:true,icon:"none"});
					return;
				}else{
					this.togglePopup('middle-list')
				}
			},
			showImg(path){
				this.annexeImg = path;
				this.togglePopup('middle-img');
				console.log(path)
			},
			getType(){
				var that = this;
				uni.request({
					url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=useType",
					success(res){
						var data = res.data;
						// console.log(data)
						that.items = data.object;
						that.dataInfo.userType = that.items[that.current].code
					}
				})
			},
			// 
			getDataImg(){
				var that = this;
				if(this.seq != ""){
					var url = `http://${baseIp()}/ams/system/distribute.htm?module=zllb_YD&mainId=${that.seq}`
					console.log(url)
					uni.request({
						url,
						success(res){
							var data = res.data;
							that.uploadData = data.object;
						}
					})
				}
			},
			
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].code === evt.target.value) {
						this.current = i;
						this.dataInfo.userType = this.items[i].code;
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
						if(i == 1){
							this.isShowOther = false;
							this.dataInfo.checkForSpouse = "0"
						}else{
							this.isShowOther = true;
							this.dataInfo.checkForSpouse = "1"
						}
						break;
					}
				}
			},
			radioChange5(evt) {
				for (let i = 0; i < this.items5.length; i++) {
					if (this.items5[i].value === evt.target.value) {
						this.current5 = i;
						break;
					}
				}
			},
			goUploadPage(){
				var that = this;
				if(this.ishold){
					var ishas = this.current3 == 0 ? true : false;
					uni.navigateTo({
						url:`/pages/application/uploadData/uploadData?ishas=${ishas}&mainId=${that.seq}`
					})
				}else{
					uni.showToast({title:"请先保存数据，再上传文件！",icon:"none"})
				}
				
			},
			// 保存
			isKeep(){
				var that = this;
				var pattcard = /^((d{18})|([0-9x]{18})|([0-9X]{18}))$/;
				if(this.dataInfo.customer_name == ""){
					uni.showToast({
						title:"请输入客户名称",
						icon:"none"
					})
					return ;
				}
				if(this.dataInfo.certNo == ""){
					uni.showToast({
						title:"请输入客户证件号",
						icon:"none"
					})
					return ;
				}
				if(!pattcard.test(this.dataInfo.certNo)){
					uni.showToast({
						title:"请正确输入客户证件号",
						icon:"none"
					})
					return ;
				}
				if(this.dataInfo.checkForSpouse == "1"){
					if(this.dataInfo.spouseName == ""){
						uni.showToast({
							title:"请输入配偶名称",
							icon:"none"
						})
						return ;
					}
					if(this.dataInfo.spouseNo == ""){
						uni.showToast({
							title:"请输入配偶证件号码",
							icon:"none"
						})
						return ;
					}
					if(!pattcard.test(this.dataInfo.spouseNo)){
						uni.showToast({
							title:"请正确输入客户证件号",
							icon:"none"
						})
						return ;
					}
				}else{
					this.dataInfo.spouseName = ""
					this.dataInfo.spouseNo = ""
				}
				let uploadData = this.dataInfo;
				uploadData.userId = String(getUserInfo().userId)
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=saveCredit&credit={userId:"${String(uploadData.userId)}",useType:"${String(uploadData.userType)}",customer_name:"${String(uploadData.customer_name)}",certNo:"${String(uploadData.certNo)}",checkForSpouse:"${String(uploadData.checkForSpouse)}",spouseName:"${String(uploadData.spouseName)}",spouseNo:"${String(uploadData.spouseNo)}",applay_reason:"${String(uploadData.applay_reason)}"}`;
				// console.log(url)
				var that = this;
				uni.showModal({
					title: '是否保存',
					content: '您还没有保存数据，是否保存？',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({title:"保存中",mask:true})
							uni.request({
								url:url,
								success(res){
									var data = res.data;
									uni.hideLoading()
									if(data.code == 1){
										that.ishold = true;
										that.seq = data.object.seq
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
				}else if(!this.isupload){
					uni.showModal({
						title: '您还没有上传文件',
						content: '您还没有上传文件，请先上传！',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					})
				}else{
					uni.showLoading({title:"提交中"})
					var that = this;
					uni.request({
						url:`http://${baseIp()}/ams/system/distribute.htm?module=submitZX&id=${that.seq}&userId=${getUserInfo().userId}`,
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
	.reportingProcess{background-color: rgb(239,238,243);height: 100%;overflow: auto;}
	/* #ifdef APP-PLUS */
	.reportingProcess{background-color: rgb(239,238,243);height: 100vh;}
	/* #endif */
	
	.reportingProcess-form{margin: 20upx 24upx 50upx;background-color: #fff;border-radius: 10px;padding: 20upx 0;}
	.reportingProcess-form .item{display: flex;padding: 20upx 24upx;border-bottom: 1px solid rgb(230,230,230);}
	.reportingProcess-form .item:last-child{border: none;}
	.reportingProcess-form .item .text{    width: 30%;font-size: 26upx;color: rgb(51,51,51);}
	.reportingProcess-form .item .field{font-size: 26upx;color: rgb(102,102,102);margin-left: 10upx;}
	.reportingProcess-form .item .field.red{color: red;}
	.reportingProcess-form .item .field.ra{display: flex;color: rgb(102,102,102);}
	.reportingProcess-form .field.first{width:70%}
	.reportingProcess-form .group.first{flex-wrap: wrap;}
	
	.reportingProcess-form .field.ra .group{display: flex;}
	.reportingProcess-form .uni-list-cell {display: flex;}
	.reportingProcess-form .uni-list-cell:nth-child(1),.uni-list-cell:nth-child(3),.uni-list-cell:nth-child(5){margin-left: 0;}
	.reportingProcess-form .uni-list-cell:nth-child(2),.uni-list-cell:nth-child(4),.uni-list-cell:nth-child(6){margin-left: 0;}
	.reportingProcess-form .uni-list-cell::after{height:0}
	.reportingProcess-form .uni-list-cell-pd{padding: 0 30upx 0 0;}
	.reportingProcess-form .item.text{display: block;}
	.reportingProcess-form .item .field.textarea{width: 100%;height: 90upx;}
	.reportingProcess .btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	.reportingProcess .btns button{width: 100%;}
	
	.reportingProcess .upload{flex:1;text-align: center;color: #FFFFFF;    width: 30px;
		background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
		  background: -o-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Opera 11.1 - 12.0 */
		  background: -moz-linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* Firefox 3.6 - 15 */
		  background: linear-gradient(rgb(255, 128, 31), rgb(255,191,67)); /* 标准的语法 */
	}
	
	.btns {margin: 60upx 24upx 0;}
	/* .btns button{color: #fff;background-color: #CFCFCF;} */
	.btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	.btns button{width: 28%;}
</style>
