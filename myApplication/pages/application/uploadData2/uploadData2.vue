<template>
	<view class="uploadData">
		<view class="uploadData-title">
			<view class="line"></view>
			<view class="text">身份核查件</view>
		</view>
		<view class="uploadData-content con1">
			<view class="item" @tap="chooseImage" :style="{'background-image': image}">
				<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
				<view class="text">身份核查件</view>
			</view>
			<view class="item" @tap="chooseImage2" v-if="isstudy == 1" :style="{'background-image': image2}">
				<image class="pz" src="../../../static/img/icon_camera.png" mode=""></image>
				<view class="text">配偶身份核查件</view>
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
				
				uploadimg1:{uri:"",name:"request1"},
				uploadimg2:{uri:"",name:"request2"},
				
				num:"",
				mainFlag:"",
				mainId:"",
				doc_id:"",
				pdid:"",
				piid:"",
				tiid:"",
				nodecode:"",
				request:[],
				ishas:0,
			};
		},
		onLoad(e){
			this.isstudy = e.isstudy;
			this.mainId = e.mainId;
			this.num = e.isstudy;
			this.doc_id = e.doc_id;
			this.pdid = e.pdid;
			this.piid = e.piid;
			this.tiid = e.tiid;
			this.nodecode = e.nodecode;
		},
		onNavigationBarButtonTap(e) {
			this.isKeep()
		},
		methods:{
			chooseImage() {
				uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],
				success: (res) => {
					this.uploadimg1.uri = res.tempFilePaths[0];
					this.image = `url(${res.tempFilePaths[0]})`;
				}})
				
			},
			chooseImage2() {uni.chooseImage({count: 1,sourceType: ['album', 'camera'],sizeType: ['compressed', 'original'],success: (res) => {this.uploadimg2.uri = res.tempFilePaths[0];this.image2 = `url(${res.tempFilePaths[0]})`;}})},
			
			doKeep(){
				uni.showLoading({title:"上传中",mask:true});
				var request = [];
				if(this.ishas == 1){
					request[0] = this.uploadimg1;
					request[1] = this.uploadimg2;
					
				}else{
					request[0] = this.uploadimg1;
				}
				
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=uploadFile_YD&userId=${getUserInfo().userId}&mainId=${that.mainId}&mainFlag=exam&mate=${that.num}`;
				
				// console.log(url,request)
				// return ;
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
								uni.navigateTo({url:`/pages/application/investigation2/investigation2?acceptid=${that.mainId}&doc_id=${that.doc_id}&pdid=${that.pdid}&piid=${that.piid}&tiid=${that.tiid}&nodecode=${that.nodecode}&isUp=true`})
							},3000)
							
						}		
					},	
					fail:(err) => {
						console.log(err)
					}
				});
				
				
			},
			
			isKeep(){
				if(this.ishas == 1){
					if(this.image == "url(../../../static/img/img1.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					if(this.image2 == "url(../../../static/img/img2.png)"){
						uni.showToast({title:"请完善资料！",icon:"none"})
						return ;
					}
					
					this.doKeep();
				}else{
					if(this.image == "url(../../../static/img/img1.png)"){
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