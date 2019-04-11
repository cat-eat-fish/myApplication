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
	export default {
		data() {
			return {
// 				dataInfo:[
// 					{id:0,title:"法定代表人",content:[{id:0,img:"../../../static/img/img1.png",text:"身份证正面"},{id:1,img:"../../../static/img/img2.png",text:"身份证背面"},{id:2,img:"../../../static/img/img3.png",text:"手持身份证正面照"}]},
// 					{id:0,title:"授权书证照",content:[{id:0,img:"../../../static/img/img4.png",text:"授权书正面"},{id:1,img:"../../../static/img/img4.png",text:"授权书反面"}]}
// 				],
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
				
				ishas:true
			};
		},
		onLoad(e){
			this.ishas = e.ishas;
		},
		methods:{
			chooseImage() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage2() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image2 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage3() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image3 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage4() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image4 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage5() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image5 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage6() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image6 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage7() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image7 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage8() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image8 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage9() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image9 = `url(${res.tempFilePaths[0]})`;}})},
			chooseImage10() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.image10 = `url(${res.tempFilePaths[0]})`;}})},
		}
	}
</script>

<style>
	.uploadData{height:100%;background-color: rgb(239,238,243);overflow: auto;}
	/* #ifdef APP-PLUS MP-WEIXIN */
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
