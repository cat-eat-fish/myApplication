<template>
	<view class="info" v-if="pageState">
		<view class="title">{{info.title}}</view>
		<view class="time">{{info.creattime}}</view>
		<view class="content" >
			<view class="hh">{{info.content}}</view>
			<view class="imgs" v-if="info.picture">
				<image class="img" :src="info.picture" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
    import {baseIp} from '@/config.js';
	export default {
		data() {
			return {
				pageState:false,
				id:'',
				info:{},
			}
		},
		onLoad(e) {
			uni.showLoading({
				title:'加载中...'
			});
			if(e.id){
				this.id = e.id;
				this.getListData();
			}
		},
		methods: {
			getListData(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=findWorkDetails_YD&id=${this.id}`;
				uni.request({
					url,
					success(res){
						let data = res.data;
						if(data.object[0].picture){
							var i = data.object[0].picture.indexOf("ams");
							var img = data.object[0].picture.substring(i)
							img = img.replace(/\\/g, '/')
							data.object[0].picture = `${baseIp()}/${img}`;
						}
						
						that.info = data.object[0];
						that.pageState = true;
						uni.hideLoading()
					}
				})
			}    
		}
	}
</script>

<style >
	.info{padding: 0 30upx;}
	.title{text-align: center;font-size: 18px;font-weight: 600;margin: 40upx 0 0;line-height:1.5;}
	.time{font-size: 24upx;color: #333;text-align: center;}
	.hh{text-indent: 2em;padding-bottom: 20upx;}
	.imgs{width: 300upx;height: 300upx;}
	.imgs .img{width: 100%;height: 100%;border-radius: 12upx;}
</style>
