<template>
	<view class="setting">
		<uni-list>
			<uni-list-item title="用户Id" :showArrow="false" :showText="true" :text="userName" />
			<uni-list-item title="头像" @tap="getTx" :showArrow="false" :showImg="true" :imgU='imgUrl2' />
			<uni-list-item title="修改密码" @tap="restpwd" />
			<uni-list-item title="清除本地缓存" @tap="delHc" />
			<!-- <uni-list-item :disabled="true" :show-switch="true" :switch-checked="true" :show-arrow="false" title="禁用状态" @switchChange="switchChange" /> -->
		</uni-list>
		<cpimg ref="cpimgs" @result="cpimgOk" @err="cpimgErr" :number="1" :fixOrientation="true" :size="500" :maxWidth="1000"
		 :ql="0.9" type="base64" />
		 
		<view class="tx" v-if="img">
			<image class="icon" :src="img" mode="aspectFill"></image>
			<view class="btns">
				<button type="primary" class="doupload" @tap="douoload">点击上传</button>
				<button type="primary" class="noupload" @tap="noupload">取消</button>
			</view>
		</view>
		 
		<view class="logout" >
			<button type="primary" class="btn" @tap="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import cpimg from "@/components/cpimg.vue"
    import {getUserInfo,setUserInfo,setHeadimg,getHeadimg} from '@/service.js';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import {baseIp} from "@/config.js"
	
	export default {
		components: {uniList,uniListItem,cpimg},
		data() {
			return {
				imgUrl2:"/static/img/mine0.png",
				userName:getUserInfo().userName,
				img:"",
				
			}
		},
		onLoad() {
			if(getHeadimg()){
				this.imgUrl2 = getHeadimg().headimg
			}
			
		},
		methods: {
			noupload(){
				this.img = ''
			},
			douoload(){
				var that = this;
				var data = {
					file:that.img,
					userId:that.userName,
				}
				var url = `${baseIp()}/ams/system/distribute.htm?module=updatePhoto_YD`;
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
								var url2 = `${baseIp()}/ams/system/distribute.htm?module=readPhoto_YD&userId=${that.userName}`
							
								uni.request({
									url:url2,
									success:res2=>{
										let data2 = res2.data;
										console.log(data2);
										var headimg = data2.headImg;
										var i = headimg.indexOf("ams");
										var img = headimg.substring(i);
										img = img.replace(/\\/g, '/')
										headimg = `${baseIp()}/${img}`;
										// data2.headImg = headimg;
										console.log(headimg)
										setHeadimg(headimg)
										that.imgUrl2 = headimg;
									}
								})
								that.img = '';
							}
						}
					},
					fail:err=>{
						uni.hideLoading()
						uni.showToast({title: err.errMsg,icon: "none"})
					}
				})
			},
			cpimgOk(file) {
				uni.hideLoading()
				this.img = file;
			},
			cpimgErr(e) {
				console.log(e)
			},
			getTx(){
				var that = this;
				that.$refs.cpimgs._changImg()
				
			},
			logout(){
				uni.clearStorageSync();
				uni.reLaunch({url:"/pages/login/login"});
			},
			restpwd(){
				uni.navigateTo({url:"/pages/pwd/pwd"})
			},
			delHc(){
				uni.showModal({
					title:"清除缓存",
					content:"清除缓存将会清除本地数据并重新登录，您确定吗？",
					success:res=>{
						if(res.confirm){
							uni.clearStorageSync();
							uni.reLaunch({url:"/pages/other/login/login"});
						}else if(res.cancel){
							
						}
					}
				})
			}
		}
	}
</script>

<style>
	.logout{
		margin-top: 80upx;width: 96%;position: fixed;bottom: 80upx;left: 2%;
	}
	.tx{width: 400upx;height:400upx;margin:50upx auto 0; }
	.tx .icon{width: 100%;height: 100%;border-radius: 50%;}
	.tx .btns{width: 100%;display: flex;justify-content: space-between;}
	.tx .doupload{width: 48%;}
	.tx .noupload{width: 48%;}
</style>
