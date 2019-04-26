<template>
	<view class="uploadData">
		<view class="uploadData-title">
			<view class="line"></view>
			<view class="text">法定代表人证件</view>
		</view>
		<view class="uploadData-content con1">
			<view class="item" @tap="chooseImage" :style="{'background-image': image}">
				<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
				<view class="text">身份证正面</view>
			</view>
			<view class="item" @tap="chooseImage2" :style="{'background-image': image2}">
				<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
				<view class="text">身份证背面</view>
			</view>
			<view class="item" @tap="chooseImage3" :style="{'background-image': image3}">
				<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
				<view class="text">手持身份证正面照</view>
			</view>
		</view>
		<view class="uploadData-title tit2">
			<view class="line"></view>
			<view class="text">授权书证照</view>
		</view>
		<view class="uploadData-content con2">
			<view class="item" @tap="chooseImage4" :style="{'background-image': image4}">
				<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
				<view class="text">授权书正面</view>
			</view>
			<view class="item" @tap="chooseImage5" :style="{'background-image': image5}">
				<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
				<view class="text">授权书反面</view>
			</view>
		</view>
		<view v-if="ishas == 'true'">
			<view class="uploadData-title tit2">
				<view class="line"></view>
				<view class="text">配偶证件照</view>
			</view>
			<view class="uploadData-content con1">
				<view class="item" @tap="chooseImage6" :style="{'background-image': image6}">
					<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
					<view class="text">身份证正面</view>
				</view>
				<view class="item" @tap="chooseImage7" :style="{'background-image': image7}">
					<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
					<view class="text">身份证背面</view>
				</view>
				<view class="item" @tap="chooseImage8" :style="{'background-image': image8}">
					<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
					<view class="text">手持身份证正面照</view>
				</view>
			</view>
			<view class="uploadData-title tit2">
				<view class="line"></view>
				<view class="text">配偶授权书证照</view>
			</view>
			<view class="uploadData-content con2">
				<view class="item" @tap="chooseImage9" :style="{'background-image': image9}">
					<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
					<view class="text">授权书正面</view>
				</view>
				<view class="item" @tap="chooseImage10" :style="{'background-image': image10}">
					<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
					<view class="text">授权书反面</view>
				</view>
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
				image: 'url(../../../static/img/img1.png)',
				image2: 'url(../../../static/img/img2.png)',
				image3: 'url(../../../static/img/img3.png)',
				image4: 'url(../../../static/img/img4.png)',
				image5: 'url(../../../static/img/img4.png)',
				
				image6: 'url(../../../static/img/img1.png)',
				image7: 'url(../../../static/img/img2.png)',
				image8: 'url(../../../static/img/img3.png)',
				image9: 'url(../../../static/img/img4.png)',
				image10: 'url(../../../static/img/img4.png)',
				
				uploadimg1:{uri:"",name:"request1"},
				uploadimg2:{uri:"",name:"request2"},
				uploadimg3:{uri:"",name:"request3"},
				uploadimg4:{uri:"",name:"request4"},
				uploadimg5:{uri:"",name:"request5"},
				uploadimg6:{uri:"",name:"request6"},
				uploadimg7:{uri:"",name:"request7"},
				uploadimg8:{uri:"",name:"request8"},
				uploadimg9:{uri:"",name:"request9"},
				uploadimg10:{uri:"",name:"request10"},
				
				num:"",
				mainFlag:"",
				mainId:"",
				request:[],
				ishas:true
			};
		},
		onLoad(e){
			this.ishas = e.ishas;
			this.num = e.ishas == "true" ? 1 : e.ishas == "false" ? 0 : null;
			console.log(this.num)
			this.mainId = e.mainId;
		},
		onNavigationBarButtonTap(e) {
			this.isKeep()
		},
		methods:{
			chooseImage() {uni.chooseImage({count: 1,sizeType: [ 'original'],success: (res) => {this.uploadimg1.uri = res.tempFilePaths[0];this.image = `url(${res.tempFilePaths[0]})`;},})},
			chooseImage2() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg2.uri = res.tempFilePaths[0];this.image2 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage3() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg3.uri = res.tempFilePaths[0];this.image3 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage4() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg4.uri = res.tempFilePaths[0];this.image4 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage5() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg5.uri = res.tempFilePaths[0];this.image5 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage6() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg6.uri = res.tempFilePaths[0];this.image6 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage7() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg7.uri = res.tempFilePaths[0];this.image7 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage8() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg8.uri = res.tempFilePaths[0];this.image8 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage9() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg9.uri = res.tempFilePaths[0];this.image9 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage10() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg10.uri = res.tempFilePaths[0];this.image10 = `url(${res.tempFilePaths[0]})`;}})},
		
			doKeep(){
				uni.showLoading({title:"上传中",mask:true});
				var request = [];
				if(this.ishas == "true"){
					request[0] = this.uploadimg1;
					request[1] = this.uploadimg2;
					request[2] = this.uploadimg3;
					request[3] = this.uploadimg4;
					request[4] = this.uploadimg5;
					request[5] = this.uploadimg6;
					request[6] = this.uploadimg7;
					request[7] = this.uploadimg8;
					request[8] = this.uploadimg9;
					request[9] = this.uploadimg10;
				}else if(this.ishas == "false"){
					request[0] = this.uploadimg1;
					request[1] = this.uploadimg2;
					request[2] = this.uploadimg3;
					request[3] = this.uploadimg4;
					request[4] = this.uploadimg5;
				}
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=uploadFile_YD&userId=${getUserInfo().userId}&mainId=${that.mainId}&mainFlag=${that.mainFlag}&mate=${that.num}&flag=3`;	
				
				uni.uploadFile({
					url, 
					filePath:"",
					name:"",
					files:request,
					success: (res) => {
						if(typeof(res.data) == 'string'){
							var data = JSON.parse(res.data);
						}else{
							var data =res.data;
						}
						if(data.code == 1){
							uni.hideLoading();
							uni.showToast({title:data.message,mask:true,duration:3000})
							setTimeout(function(){
								uni.navigateTo({url:`/pages/application/reportingProcess/reportingProcess?mainId=${that.mainId}&ishas=${that.num}&isupload=true&ishold=true`})
							},3000)
							
						}
					},	
					fail:(err) => {
						console.log(err)
					}
				});
				
				
			},
			
			isKeep(){
				if(this.ishas == true){
					if(this.image == "url(../../../static/img/img1.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image2 == "url(../../../static/img/img2.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image3 == "url(../../../static/img/img3.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image4 == "url(../../../static/img/img4.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image5 == "url(../../../static/img/img4.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image6 == "url(../../../static/img/img1.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image7 == "url(../../../static/img/img2.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image8 == "url(../../../static/img/img3.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image9 == "url(../../../static/img/img4.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image10 == "url(../../../static/img/img4.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					
					this.doKeep();
				}else{
					if(this.image == "url(../../../static/img/img1.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image2 == "url(../../../static/img/img2.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image3 == "url(../../../static/img/img3.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image4 == "url(../../../static/img/img4.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image5 == "url(../../../static/img/img4.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					this.doKeep()
				}
			}
		}
	}
</script>

<style>
	.uploadData{height:100%;background-color: rgb(239,238,243);overflow: auto;}
	/* #ifdef APP-PLUS  */
	.uploadData{height:100vh;background-color: rgb(239,238,243);}
	/* #endif */
	.uploadData .uploadData-title{margin: 40upx 30upx 30upx;display: flex;}
	.uploadData .uploadData-title .line{background: url(../../../static/img/icon_bar.png) no-repeat;width: 5px;height: 20px;background-size: 100% 100%;}
	.uploadData .uploadData-title .text{margin-left: 20upx;font-size: 24upx;color:rgb(102,102,102)}
	.uploadData-content{display: flex;justify-content: space-between; flex-wrap: wrap;margin: 0 24upx;}
	.uploadData-content .item{background-size: 100% 100%;width: 48%;height: 200upx;}
	.uploadData-content.con1 .item:nth-child(1){}
	.uploadData-content.con1 .item:nth-child(2){margin-left: 22upx;}
	.uploadData-content.con1 .item:nth-child(3){margin-top: 80upx;}
	.uploadData-content.con2 .item:nth-child(1){}
	.uploadData-content.con2 .item:nth-child(2){margin-left: 22upx;}
	.uploadData-content .item:nth-child(3){}
	.uploadData-content .item .pz{width: 100upx;height: 100upx;display: flex;margin: 50upx auto;}
	.uploadData-content .item .text{text-align: center;padding-top: 15upx;}
	.uploadData .uploadData-title.tit2{margin-top: 84upx;}
</style>