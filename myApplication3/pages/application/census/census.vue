<template>
	<view class="content">
		<view class="page-body">
			<view class="">
				<view class="date">
					<picker @change="bindchange" mode="multiSelector"  @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}-{{multiArray[1][multiIndex[1]]}} <uni-icon type="arrowdown"></uni-icon></view>
					</picker>
				</view>
			</view>
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
			</view>
			<view class="uni-card" v-for="(list,index) in lists" :key="index">
				<view class="uni-list">
					<view class="uni-list-cell uni-collapse">
						<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.open ? 'uni-active' : ''"
						 @click="triggerCollapse(index)">
							<view class="uni-list-cell-l">{{list.name}}</view>
							<view :class="list.pageLength == 0 ? 'no uni-list-cell-r' : 'uni-list-cell-r'" >{{list.pageLength}}{{list.dw}}</view>
						</view>
						<view class="uni-list uni-collapse" :class="list.open ? 'uni-active' : ''">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.pages" :key="key" >
								<view class="uni-list-cell-navigate uni-navigate-right nof" > 
									<view>{{item.date_id ? item.date_id : item.clock_time ? item.clock_time : item}}</view>
									<view v-if="list.isshowadd" class="uni-list-cell-small">{{item.address}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {formateDate,pointInsideCircle ,isSameDay} from "@/common/util.js"	//时间按格式化
    import {getUserInfo} from '@/service.js';
	import {baseIp,txKey} from "@/config.js"
	export default {
		components: {uniIcon},
		data() {
			return {
				page:false,
				date:formateDate(new Date(),'Y-M'),
				name:getUserInfo().name,
				multiArray: [
					
				],
				arrM:[],
				arrM2:[],
				multiIndex: [0,0],
				lists: [
					{id: 'goDays',dw:"天",isshowadd:false, name: '出勤天数',open: false,pageLength:0,pages: []}, 
					{id: 'noDays',dw:"天",isshowadd:false,name: '休息天数',open: false,pageLength:0,pages: []},
					{id: 'chidao',dw:"次",isshowadd:false,name: '迟到',open: false,pageLength:0,pages: []},
					{id: 'zaotui',dw:"次",isshowadd:false,name: '早退',open: false,pageLength:0,pages: []},
					{id: 'queka',dw:"次",isshowadd:false,name: '缺卡',open: false,pageLength:0,pages: []},
					{id: 'kuanggong',dw:"次",isshowadd:false,name: '旷工',open: false,pageLength:0,pages: []},
					{id: 'waiqin',dw:"次",isshowadd:false,name: '外勤',open: false,pageLength:0,pages: []},
				]
			}
		},
		onLoad(){
			this.getDate()
			if(!this.page){
				uni.showLoading({title:"加载中...",mask:true,})
			}
			this.getData();
		},
		methods: {
			bindchange(e){
				uni.showLoading({title:"加载中...",mask:true})
				this.getData();
			},
			getData(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=findClockStatistics_YD&userId=${getUserInfo().userName}&date=${this.date}`;
				
				uni.request({
					url,
					success(res){
						var data = res.data;
						that.lists[0].pageLength = data.danceCount;
						that.lists[1].pageLength = data.restCount;
						that.lists[2].pageLength = data.tardyCount;
						that.lists[3].pageLength = data.earlyCount;
						that.lists[4].pageLength = data.lackCount;
						that.lists[5].pageLength = data.minerCount;
						that.lists[6].pageLength = data.courierCount;
						if(data.danceCount != 0){
							that.lists[0].pages = data.jsDance
						}
						if(data.restCount != 0){
							that.lists[1].pages = data.jsRest;
						}
						if(data.tardyCount != 0){
							that.lists[2].pages = data.jsTardy;
						}
						if(data.earlyCount != 0){
							that.lists[3].pages = data.jsEarly;
						}
						if(data.lackCount != 0){
							that.lists[4].pages = data.jsLack;
						}
						if(data.minerCount != 0){
							that.lists[5].pages = data.jsMiner
						}
						if(data.courierCount != 0){
							that.lists[6].pages = data.jsCourier;
						}
						
						uni.hideLoading();
					}
				})
			},
			getDate(){
				var num = 6;
				var Y = formateDate(new Date(),'Y');
				var M = Number(formateDate(new Date(),'M'));
				var arrY = [Y],arrM = [],arrM2=[];
				if(M-num < 0){
					arrY = [Y,Y-1];
					for(var i = M;i>0;i--){
						arrM.push(i)
					}
					var a = 0;
					for(var j = 12;M+a != num;j--){
						arrM2.push(j);
						a++;
					}
				}else{
					for(M;num>0;M--){
						arrM.push(M);
						num--;
					}
				}
				this.multiArray[0] = arrY;
				this.arrM = this.multiArray[1] = arrM;
				this.arrM2 = arrM2;
			},
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value;
				
				if(e.detail.column == 0){
					if(this.multiIndex[0] == 0){
						this.multiArray[1] = this.arrM;
					}
					if(this.multiIndex[0] == 1){
						this.multiArray[1] = this.arrM2;
					}
				}
				this.$forceUpdate();
				this.date = `${this.multiArray[0][this.multiIndex[0]]}-${this.multiArray[1][this.multiIndex[1]]}`;
				
			},
			// 查看规则
			goRule(){
				uni.navigateTo({url:"/pages/application/rule/rule"})
			},
			triggerCollapse(e) {
				if (!this.lists[e].pages) {
					this.goDetailPage(this.lists[e].url);
					return;
				}
				if(this.lists[e].pages.length === 0){
					uni.showToast({title:`本月无${this.lists[e].name}`,icon:"none"})
					return;
				}
				for (var i = 0; i < this.lists.length; ++i) {
					if (e === i) {
						this.lists[i].open = !this.lists[e].open;
					} else {
						this.lists[i].open = false;
					}
				}
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
	.sign-title .sign-title-l .text  .gz{color: darkblue;display: inline-flex;}
	.sign-title .sign-title-l .text .gz text{display: inline-block;}
	.sign-title .sign-title-l .text .gz .t1{
		overflow: hidden; /*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    width: 166upx;/*需要配合宽度来使用*/}
	
	.uni-card{margin: 0;}
	
	.nof{display: block;}
	.uni-list-cell-r{padding-right: 20upx;}
	.uni-list-cell-small{font-size: 14upx;}
	.uni-list-cell-r.no {color: #bbb;}
	.uni-list-cell-navigate.uni-active {background: #fff;}
	.uni-list.uni-active{background: #f1f1f1;}
</style>




