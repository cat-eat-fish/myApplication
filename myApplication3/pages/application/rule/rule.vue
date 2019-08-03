<template>
	<view>
		<view class="sign-title">
			<view class="sign-title-l">
				<view class="portrait">
					{{name.substr(-2)}}
				</view>
				<view class="text">
					<view class="name">
						{{name}}
					</view>
					<view class="gz" >
						考勤组:公司考勤
					</view>
				</view>
			</view>
		</view>
		<uni-collapse :accordion="true"  v-if="page">
			<uni-collapse-item :open=" index == 0 ? true : false " :title="item.title" :show-animation="true" v-for="(item,index) in collData" :key="index">
				<view style="padding: 30upx 20upx;" v-for="(item2,index2) in item.content1" :key="index2">
					<view class="con-t">
						{{item2.title}}
					</view>
					<view class="con-c" v-html="item2.content">
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import {baseIp} from "@/config.js"
	import {getUserInfo} from '@/service.js';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {uniCollapse,uniCollapseItem,},
		data() {
			return {
				name:getUserInfo().name,
				page:false,
				info:null,
				collData:[
					{
						id:0,
						title:"考勤时间",
						content1:[
							{title:`上班时间`,content:` `},
						],
					},
					{
						id:1,
						title:"考勤范围",
						content1:[
							{title:"办公地点",content:[]},
						],
					},
				]
			}
		},
		onLoad(){
			this.getData()
		},
		methods: {
			getData(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=findAttRules_YD&userId=${getUserInfo().userName}`;
				uni.request({
					url,
					success(res){
						let data = res.data;
						if(data.code == 1){
							that.collData[0].content1[0].content = `${data.object} <br/> ${data.object2}<br/>`;
							var str = '';
							data.object1.map((item,index)=>{
								str += `${index+1}. ${item.place_name} <br/>`
							})
							that.collData[1].content1[0].content = str;
							that.page = true;
						}
					}
				})
			},
		}
	}
</script>

<style>
	.sign-title{display: flex;justify-content: space-between; padding: 30upx 24upx;border-bottom: 1upx solid #333;}
	.sign-title .portrait{width: 100upx;height: 100upx;line-height: 100upx;border-radius: 50%;background-color: rgb(56, 147, 243);color: #fff;font-size: 28upx;text-align: center;}
	.sign-title .sign-title-l{display: flex;}
	.sign-title .sign-title-l .text{margin-left: 20upx;}
	.sign-title .sign-title-l .text .name{font-size: 32upx;}
	.sign-title .sign-title-l .text  .gz{color: #111;}
	
	.con-t{font-weight: bold;color:#000;}
	.con-c{color:#555;}
</style>
