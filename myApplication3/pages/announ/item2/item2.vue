<template>
	<view class="info">
		<view class="title">{{title}}</view>
		<view class="content" v-for="(item,index) in content" :key="index">
			<view class="hh">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"宁波市中心支行推动全国首笔人脸识别 线下支付交易顺利完成",
				content:[
					"为推进人脸识别等生物特征技术在支付领域的安全应用，人民银行科技司组织相关单位研究制定了人脸识别线下支付安全应用技术标准，在不突破现有业务规则的前提下，利用机器学习、图像识别、密码技术等科技手段提升用户支付体验，增强交易安全防护能力。宁波市中心支行根据总行部署，组织银联宁波分公司、宁波银行、宁波银联商务等14家试点机构密切配合，按要求完成系统改造，于5月23日在真实消费场景下完成首笔支付交易，率先启动试点验证工作。下一步，宁波市中心支行将组织试点机构在内部场景广泛开展应用验证工作，为今后人脸识别线下支付规范应用积累实践经验。"
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style >
	@import url("../item1/item.css");
</style>
