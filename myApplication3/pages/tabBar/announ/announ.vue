<template>
	<view class="announ">
		<view class="list">
			<uni-list  >
				<uni-list-item v-for="(item,index) in list" :key="index" @click="goPage(item.url)"  :title="item.title" :note="item.time"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {uniList,uniListItem},
		data() {
			return {
				list:[
					{id:0,title:"宁夏全面取消企业银行账户许可",url:"/pages/announ/item1/item1",time:"2019-06-11 15:29:06",},
					{id:1,title:"宁波市中心支行推动全国首笔人脸识别 线下支付交易顺利完成",url:"/pages/announ/item2/item2",time:"2019-06-06 16:37:10",},
					{id:2,title:"\“五个坚持\”助脱贫 贵阳中心支行推动全省金融精准扶贫实现可持续发展",url:"/pages/announ/item3/item3",time:"2019-06-06 15:23:05"},
					{id:3,title:"人民银行海北州中心支行以“4+3”创新宣传机制 助力国债下乡惠民生",url:"/pages/announ/item4/item4",time:"2019-06-06 10:35:37"},
					{id:4,title:"人民银行上海总部召开金融机构座谈会",url:"/pages/announ/item5/item5",time:"2019-06-05 16:41:07"},
					{id:5,title:"“一带一路”引领内蒙古荒漠变牧场 ——赤峰澳亚现代牧场纪实",url:"/pages/announ/item6/item6",time:"2019-06-05 10:22:23"},
					{id:6,title:"天津 创新科技金融 助力科技企业",url:"/pages/announ/item7/item7",time:"2019-06-04 14:20:25"},
					{id:7,title:"普洱市创新金融服务普洱茶产业产融发展取得初步成效",url:"/pages/announ/item8/item8",time:"2019-06-04 11:26:11"},
					{id:8,title:"人民银行长沙中心支行“零距离”服务民企和小微",url:"/pages/announ/item9/item9",time:"2019-05-31 15:44:58"},
					{id:9,title:"陕西铜川：取消企业银行账户许可为实体经济再添动力",url:"/pages/announ/item10/item10",time:"2019-05-31 15:29:11"},
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			goPage(e){
				uni.navigateTo({url:e})
			}
		}
	}
</script>

<style lang="scss">
	.announ{
		height:100%
	}
	/* #ifdef H5*/
	.uni-list{
		padding-bottom:100upx;
	}
	/* #endif */ 
</style>
