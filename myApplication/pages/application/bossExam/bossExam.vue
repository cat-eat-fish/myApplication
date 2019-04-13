<template>
	<view class="bossExam">
		<view class="bossQuery-title">受理详细信息</view>
		<view class="bossExam-form form1">
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
		<view class="bossQuery-title">查询信息</view>
		<view class="bossExam-form form2">
			<view class="item">
				<view class="text">上传资料 : </view>
				<view class="field">
					<input type="text" placeholder="请点击上传" value="" />
				</view>
				<view class="upload">上传</view>
			</view>
			<view class="item">
				<view class="text x">征信报告编码 : </view>
				<view class="field">
					<input type="text" placeholder="请输入报告编码" value="" />
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
	/* #ifdef APP-PLUS MP-WEIXIN */
	.bossExam{background-color: rgb(239,238,243);height: 100vh;overflow: auto;}
	/* #endif */
	.bossExam{background-color: rgb(239,238,243);height: 100%;overflow: auto;}
	.bossExam-title{font-size: 30upx;color: rgb(254,138,20);margin: 40upx 0 20upx 30upx;}
	.bossExam-form{margin: 20upx 24upx 50upx;background-color: #fff;border-radius: 10px;padding: 20upx 0;}
	.bossExam-form .item{display: flex;padding: 20upx 24upx;}
	.bossExam-form .item .text{font-size: 26upx;color: rgb(121,121,121);}
	.bossExam-form .item .field{font-size: 26upx;color: rgb(102,102,102);margin-left: 10upx;}
	.bossExam-form .item .field.red{color: red;}
	.bossExam-form .item .field.ra{display: flex;color: rgb(102,102,102);}
	
	.bossExam-form .field.ra .group{display: flex;}
	.bossExam-form .uni-list-cell {display: flex;}
	.bossExam-form .uni-list-cell:nth-child(1),.uni-list-cell:nth-child(3),.uni-list-cell:nth-child(5){margin-left: 35upx;}
	.bossExam-form .uni-list-cell:nth-child(2),.uni-list-cell:nth-child(4),.uni-list-cell:nth-child(6){margin-left: 100upx;}
	.bossExam-form .item.text{display: block;}
	.bossExam-form .item .field.textarea{width: 100%;height: 90upx;}
	.btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	.btns button{width: 48%;}
	.item .text.x{position: relative;}
	.item .text.x::before{position: absolute;content:"*";color: red;top: -2px;left: -6px;}
	.bossExam-form .uni-list-cell::after{height:0}
	.bossExam-form .uni-list-cell-pd {padding: 0;}
	
	.bossExam-form .upload{color: #ffffff;width: 40px;background-color: red;text-align: center;flex: 1;border-radius: 10px;
		background: -webkit-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Firefox 3.6 - 15 */
		background: linear-gradient(rgb(255, 128, 31), #ffbd43); /* 标准的语法 */
	}
</style>
