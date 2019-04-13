<template>
	<view class="bossQuery">
		<view class="bossQuery-title">受理详细信息</view>
		<view class="bossQuery-form form1">
			<view class="item">
				<view class="text">申请人 : </view>
				<view class="field">system</view>
			</view>
			<view class="item">
				<view class="text">用途 : </view>
				<view class="field">贷前调查</view>
			</view>
			<view class="item">
				<view class="text">客户类型 : </view>
				<view class="field">个人客户</view>
			</view>
			<view class="item">
				<view class="text">客户名称 : </view>
				<view class="field">张三三</view>
			</view>
			<view class="item">
				<view class="text">证件类型 : </view>
				<view class="field">居民身份证（例）</view>
			</view>
			<view class="item">
				<view class="text">证件号码 : </view>
				<view class="field">******************（例）</view>
			</view>
			<view class="item">
				<view class="text">是否有配偶 : </view>
				<view class="field">是</view>
			</view>
			<view class="item">
				<view class="text">配偶名称 : </view>
				<view class="field">李四</view>
			</view>
			<view class="item">
				<view class="text">配偶证件号码 : </view>
				<view class="field">******************（例）</view>
			</view>
			<view class="item">
				<view class="text">资料列表 : </view>
				<view class="field"></view>
			</view>
		</view>
		<view class="bossQuery-title">审查信息</view>
		<view class="bossQuery-form form2">
			<view class="item">
				<view class="text">支行长审批结果 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
							<view>
								<radio :value="item.name" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item text">
				<view class="text">支行行长审查意见 : </view>
				<view class="field textarea">
					<textarea  auto-height />
				</view>
			</view>
			<view class="btns">
				<button type="default">附件下载</button>
				<button type="default">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import baseIp from "../../../config.js"
	export default {
		data() {
			return {
				items: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current: 0,
				
				items2: [{value: "shi",name: '是'},{value: "fou",name: '否'}],
				current2: 0,
				items3: [{value: "shi",name: '是'},{value: "fou",name: '否'}],
				current3: 0
			};
		},
		onNavigationBarButtonTap(e) {
			console.log(1)
		},
		methods:{
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			radioChange2(evt) {
				for (let i = 0; i < this.items2.length; i++) {
					if (this.items2[i].value === evt.target.value) {
						this.current2 = i;
						break;
					}
				}
			},
			radioChange3(evt) {
				for (let i = 0; i < this.items3.length; i++) {
					if (this.items3[i].value === evt.target.value) {
						this.current3 = i;
						break;
					}
				}
			}
		}
	}
</script>

<style>
	.bossQuery{background-color: rgb(239,238,243);height: 100%;overflow: auto;}
	
	/* #ifdef APP-PLUS MP-WEIXIN */
	.bossQuery{background-color: rgb(239,238,243);height: 100vh;overflow: auto;}
	/* #endif */
	.bossQuery-title{font-size: 30upx;color: rgb(254,138,20);margin: 40upx 0 20upx 30upx;}
	.bossQuery-form{margin: 20upx 24upx 50upx;background-color: #fff;border-radius: 10px;padding: 20upx 0;}
	.bossQuery-form .item{display: flex;padding: 20upx 24upx;}
	.bossQuery-form .item .text{font-size: 26upx;color: rgb(121,121,121);}
	.bossQuery-form .item .field{font-size: 26upx;color: rgb(102,102,102);margin-left: 10upx;}
	.bossQuery-form .item .field.red{color: red;}
	.bossQuery-form .item .field.ra{display: flex;color: rgb(102,102,102);}
	
	.bossQuery-form .field.ra .group{display: flex;}
	.bossQuery-form .uni-list-cell {display: flex;}
	.bossQuery-form .uni-list-cell:nth-child(1),.uni-list-cell:nth-child(3),.uni-list-cell:nth-child(5){margin-left: 35upx;}
	.bossQuery-form .uni-list-cell:nth-child(2),.uni-list-cell:nth-child(4),.uni-list-cell:nth-child(6){margin-left: 100upx;}
	.bossQuery-form .item.text{display: block;}
	.bossQuery-form .item .field.textarea{width: 100%;height: 90upx;}
	.btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	.btns button{width: 48%;}
	
	.bossQuery-form .uni-list-cell::after{height:0}
	.bossQuery-form .uni-list-cell-pd {padding: 0;}
</style>
