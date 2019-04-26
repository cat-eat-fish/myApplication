<template>
	<view class="financialTrial">
		<view class="financialTrial-form">
			<view class="item">
				<view class="text">业务名称 : </view>
				<view class="field">
					{{dataInfo.name}}
				</view>
			</view>
			<view class="item">
				<view class="text">业务机构 : </view>
				<view class="field">
					{{dataInfo.jg}}
				</view>
			</view>
			<view class="item">
				<view class="text">发起部门 : </view>
				<view class="field">
					{{dataInfo.fqbm}}
				</view>
			</view>
			<view class="item">
				<view class="text">申购项目 : </view>
				<view class="field">
					<input type="text" value="" v-model="dataInfo.sgxm" placeholder="请输入申购项目" />
				</view>
			</view>
			<view class="item">
				<view class="text">摘要 : </view>
				<view class="field">
					<input type="text" value="" v-model="dataInfo.msg" placeholder="请输入摘要" />
				</view>
			</view>
			<view class="item" >
				<view class="text">金额 : </view>
				<view class="field">
					<uni-number-box @change="change" :min="0"  :max="9999999"  :value="dataInfo.money"></uni-number-box>
				</view>
			</view>
			<view class="item" v-if="path.length != 0 ">
				<view class="text">资料列表</view>
				<view class="textarea">
					<view class="item-list" v-for="(item,index) in path" :key="index">
						<view class="desc">{{item}}</view>
						<view class="del" @click="delList" :data-value="index">删除</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btns">
			<button type="warn" @click="upload">附件上传</button>
			<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
			<button type="primary" @click="submitAcce">提交受理</button>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import tkiFileManager from "@/components/tki-file-manager.vue"
	import {baseIp} from "../../../config.js"
    import {getUserInfo} from '../../../service.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {uniPopup,tkiFileManager,uniNumberBox},
		data() {
			return {
				dataInfo:{
					name:"财审会认定审批",	//业务名称
					jg:"",					//业务机构
					fqbm:"",				//发起部门
					sgxm:"",				//申购项目	
					msg:"",					//摘要
					money:0,				//金额
				},
				seq:"",						//保存成功的返回值
				ishold:false,				//判断是否保存
				isupload:true,				//判断是否上传
				path:[],					//资料列表
			};
		},
		onNavigationBarButtonTap(e) {
			this.isKeep()
		},
		onLoad(e){
			this.getBm();
		},
		methods:{
			// 数据初始化
			getBm(){
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=returndeptName_YD&userId=${getUserInfo().userId}`
				uni.request({
					url,
					success(res){
						that.dataInfo.fqbm = that.dataInfo.jg = res.data.deptName
					}
				})
			},
			change(value) {
				this.dataInfo.money = value;
			},
			// 附件上传
			upload(){
				this.$refs.filemanager._openFile()
			},
			resultPath(e){
				this.path.push(e);
			},
			// 保存
			isKeep(){
				if(this.dataInfo.sgxm == ""){
					uni.showToast({
						title:"请输入申购项目",
						icon:"none"
					})
					return ;
				}
				if(this.dataInfo.msg == ""){
					uni.showToast({
						title:"请输入摘要",
						icon:"none"
					})
					return ;
				}
				if(this.dataInfo.money <= 0){
					uni.showToast({
						title:"请输入金额",
						icon:"none"
					})
					return ;
				}
				
				let uploadData = this.dataInfo;
				uploadData.userId = String(getUserInfo().userId)
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=addFinanceInfo_YD&credit={userId:"${String(uploadData.userId)}",purchaseAmount:"${String(uploadData.money)}",purchaseProject:"${String(uploadData.sgxm)}",ramrk:"${String(uploadData.msg)}"}`;
				var that = this;
				uni.showModal({
					title: '是否保存',
					content: '您还没有保存数据，是否保存？',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({title:"保存中",mask:true})
							uni.request({
								url,
								success(res){
									var data = res.data;
									if(data.code == 1){
										uni.hideLoading()
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
					var that = this,
						url = `http://${baseIp()}/ams/system/distribute.htm?module=submitMainInfo4_YD&id=${that.seq}&userId=${getUserInfo().userId}`;
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
	.financialTrial{background-color: rgb(239,238,243);height: 100%;overflow: auto;}
	/* #ifdef APP-PLUS */
	.financialTrial{background-color: rgb(239,238,243);height: 100vh;}
	/* #endif */
	
	.financialTrial-form{margin: 20upx 24upx 50upx;background-color: #fff;border-radius: 10px;padding: 20upx 0;}
	.financialTrial-form .item{display: flex;padding: 20upx 24upx;border-bottom: 1px solid rgb(230,230,230);}
	.financialTrial-form .item:last-child{border: none;}
	.financialTrial-form .item .text{    width: 30%;font-size: 26upx;color: rgb(51,51,51);}
	.financialTrial-form .item .field{font-size: 26upx;color: rgb(102,102,102);margin-left: 10upx;width:80%}
	.financialTrial-form .item .field .uni-numbox{width:100%}
	.financialTrial-form .item .field.red{color: red;}
	.financialTrial-form .item .field.ra{display: flex;color: rgb(102,102,102);}
	.financialTrial-form .field.first{width:70%}
	.financialTrial-form .group.first{flex-wrap: wrap;}
	
	.financialTrial-form .field.ra .group{display: flex;}
	.financialTrial-form .uni-list-cell {display: flex;}
	.financialTrial-form .uni-list-cell:nth-child(1),.uni-list-cell:nth-child(3),.uni-list-cell:nth-child(5){margin-left: 0;}
	.financialTrial-form .uni-list-cell:nth-child(2),.uni-list-cell:nth-child(4),.uni-list-cell:nth-child(6){margin-left: 0;}
	.financialTrial-form .uni-list-cell::after{height:0}
	.financialTrial-form .uni-list-cell-pd{padding: 0 30upx 0 0;}
	.financialTrial-form .item.text{display: block;}
	.financialTrial-form .item .field.textarea{width: 100%;height: 90upx;}
	.financialTrial .btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	.financialTrial .btns button{width: 48%;}
	
	.financialTrial .upload{flex:1;text-align: center;color: #FFFFFF;    width: 30px;
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
