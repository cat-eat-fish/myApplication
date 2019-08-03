<template>
	<view class="ratingProcess">
		<view class="ratingProcess-title">
			<view class="img">{{aa}}</view>
			<view class="text">{{dataInfo.name}}</view>
			<view class="text">{{bb}}</view>
		</view>
		<view class="ratingProcess-con">
			<view class="item">
				<view class="text-l">业务名称</view>
				<view class="text-r">{{dataInfo.approvename}}</view>
			</view>
			<view class="item">
				<view class="text-l">申请人</view>
				<view class="text-r">{{dataInfo.name}}</view>
			</view>
			<view class="item">
				<view class="text-l">所在部门</view>
				<view class="text-r">{{dataInfo.deptname}}</view>
			</view>
			<view class="item">
				<view class="text-l">岗位</view>
				<view class="text-r">{{dataInfo.post}}</view>
			</view>
			<view class="item">
				<view class="text-l">联系方式</view>
				<view class="text-r">{{dataInfo.mobie}}</view>
			</view>
			<view class="item" >
				<view class="text-l">请假天数</view>
				<view class="text-r">{{dataInfo.day}}</view>
			</view>
			<view class="item" >
				<view class="text-l">请假类型</view>
				<view class="text-r">{{dataInfo.out_type}}</view>
			</view>
			<view class="item" >
				<view class="text-l">请假时间</view>
				<view class="text-r">{{dataInfo.leave_start}} 至 {{dataInfo.leave_end}}</view>
			</view>
			<view class="item" >
				<view class="text-l">请假事由</view>
				<view class="text-r">{{dataInfo.leave_reason}}</view>
			</view>
			<view class="">
				<uni-steps :options="list2" direction="column" :active="active"></uni-steps>
			</view>
		</view>
	</view>
</template>

<script>
	import {getBase64Image} from "@/common/util.js"
	import {baseIp} from "../../../config.js"
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	
	import img from "@/static/img/color_red.png"
	export default {
		components: {uniIcon,uniSteps},
		data() {
			return {
				acceptid:"",
				aa:"",
				bb:"",
				dataInfo:{},
				active:0,
				list2: [],
			};
		},
		onLoad(e){
			this.acceptid = e.acceptid;
			this.getData();
		},
		methods:{
			getData(){
				var that = this,
					url = `${baseIp()}/ams/system/distribute.htm?module=approveMonitor_YD&acceptId=${this.acceptid}`;
				uni.request({
					url,
					success(res){
						var data = res.data.object[0];
						if(!data){
							uni.showToast({title:"正在审核中，请耐心等待...",icon:"none",duration:3000,mask:true});
							
							return;
						}
						var url2 = `${baseIp()}/ams/system/distribute.htm?module=approveRecord_YD&docId=${data.documentid}&acceptId=${that.acceptid}`;
						uni.request({
							url:url2,
							success(res2){
								let data2 = res2.data.object[0];
								let data = res2.data.object2;
								data2.out_type = data2.leavetype == '1' ? '事假' : data2.leavetype == '2' ? "病假" : data2.leavetype == '3' ? "婚假" : data2.leavetype == "4" ? "丧假" : data2.leavetype == "5" ? "产假" : data2.leavetype == "5" ? "公假" : "";
								that.dataInfo = data2;
								console.log(data2)
								
								data.map((item)=>{
									item.status = item.status == '1' ? "同意" :  item.status == '0' ? "不同意" : "";
								})
								that.aa = data[0].username.substr(data[0].username.length-2)
								that.bb = data[data.length-1].status;
								data.map((item)=>{
									item.title = item.comment_content == "" ? `${item.username}` : `${item.username} -- ${item.comment_content}`;
									item.desc =  !item.approve_time ? `${item.status}` : item.status ? `${item.tokenname} -- ${item.approve_time} -- ${item.status}` : `${item.tokenname} -- ${item.approve_time}`;
									
								})
								var active = data.map((item,index)=>{
									if(item.approve_time == ""){
										return index;
									}
								})
								var i = active.filter((val)=>{
									return val
								})
								that.active = i.length == 0 ? active.length  : that.active = i[0];
								data.unshift({title:`${data2.name} -- ${data2.leave_reason}`,desc:`我发起的`});
								that.list2 = data;
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import "../ratingProcess6/ratingProcess6.css"
</style>
