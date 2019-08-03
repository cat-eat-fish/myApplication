<template>
	<view class="list">
		<view class="list" v-if="list.length != 0">
			<uni-list  >
				<uni-list-item v-for="(item,index) in list" :key="index" @click="goPage(item.id)"  :title="item.title" :note="item.creattime"></uni-list-item>
			</uni-list>
		</view>
		<view v-else class="noList">
			暂无数据
			<text class="add" @tap="goAdd">去添加</text>
		</view>
	</view>
</template>

<script>
    import {baseIp} from '@/config.js';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components:{uniList,uniListItem},
		data() {
			return {
				list:[
					
				]
			}
		},
		onLoad() {
			this.getListData()
		},
		methods: {
			getListData(){
				var that = this;
				var url = `${baseIp()}/ams/system/distribute.htm?module=findWorkList_YD&userId=${that.$store.state.userInfo.userName}&bankId=${that.$store.state.userInfo.deptId}&type=${that.$store.state.userInfo.type}`;
				// console.log(url)
				uni.request({
					url,
					success(res){
						let data = res.data;
						that.list = data.object;
					}
				})
			},
			goPage(e){
				uni.navigateTo({url:`/pages/information/desc/desc?id=${e}`})
			},
			goAdd(){
				uni.navigateTo({
					url: '/pages/information/census/census',
				});
			},
		}
	}
</script>

<style lang="scss">
	.noList{text-align: center;margin: 40upx auto;color: #333;font-size: 28upx;
		.add{color: rgb(56, 147, 243);margin-left:20upx;}
	}
</style>
