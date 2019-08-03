<template>
	<view class="register">
		<view class="form">
			<catLabel text="账号" :value="upData.userid" v-model="upData.userid" dataType="text"  />
			<catLabel text="密码" :value="upData.password" v-model="upData.password" dataType="text" inputType="password"  />
			<catLabel text="重复密码" :value="password2" v-model="password2" dataType="text" inputType="password"  />
			<catLabel text="姓名" :value="upData.username" v-model="upData.username" dataType="text"  />
			<catLabel text="职位级别" :initIndex="initIndex" dataType="selector" :selectList="list2" @handSelect="handSelect2"  />
			<view class="btns">
				<button @tap="handDo" type="primary" class="btn">确定</button>
				<view class="goLogin" @tap="goLogin">已有账号？点击登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseIp} from "@/config.js"
	var  checker = require("@/common/checker.js");
	import catLabel from "@/components/cat-label/cat-label.vue"
	export default {
		components:{catLabel},
		data() {
			return {
				list1:[
					{label:"test",value:1},
					{label:"test2",value:2},
				],
				list2:[
					{label:"劳务派遣人员",value:0,index:0},
					{label:"一般人员",value:1,index:1},
					{label:"中层副职",value:1,index:2},
					{label:"中层正职",value:2,index:3},
					{label:"分管领导",value:4,index:4},
				],
				initIndex:0,
				upData:{
					userid:'',		//用户名 
					username:'',	//姓名
					password:'',	//密码
					type:'0',		//职位级别
				},
				rule:[
					{name:'userid',checkType:'noempty',errorMsg:"请输入账号"},
					{name:'password',checkType:'noempty',errorMsg:"请输入密码"},
					{name:'username',checkType:'noempty',errorMsg:"请输入姓名"},
				],
				password2:'',
			}
		},
		onLoad() {
		},
		methods: {
			handSelect2(val){
				this.initIndex = val.checkArr.index
				this.upData.type = val.checkArr.value;
			},
			reset(){
				for(var i in this.upData){
					this.upData[i] = "";
				}
			},
			goLogin(){
				uni.reLaunch({url:'/pages/login/login'})
			},
			handDo(){
				var that = this;
				var formData = this.upData;
				var checkRes = checker.check(formData, this.rule);
				if(checkRes){
					if(this.upData.password != this.password2){
						uni.showToast({title:"两次密码不一致!", icon:"none"});
						return;
					}
					uni.showLoading({title:'注册中...'})
					var url = `${baseIp()}/ams/system/distribute.htm?module=register_YD&userid=${this.upData.userid}&password=${this.upData.password}&username=${this.upData.username}&type=${this.upData.type}`;
					
					uni.request({
						url,
						success(res) {
							uni.hideLoading()
							let data = res.data;
							if(data.code == 1){
								uni.showToast({title:data.message,duration:3000,mask:true});
								setTimeout(function(){
									uni.reLaunch({url:'/pages/login/login'})
								},3000)
							}else{
								uni.showToast({title:data.message,icon:'none',duration:3000});
								that.reset()
							}
						}
					})
				}else{
					uni.showToast({ title: checker.error, icon: "none" });
				}
			}
		}
	}
</script>

<style lang="scss">
	.register{
		.form{
			.label::after{content: "";bottom:0;width:100%;height: 1px;background-color: #999;position: absolute;}
			.label{
				display: flex;padding:24upx 30upx; position: relative;
				.text{width: 30%;}
				.data{width: 70%}
			}
		}
		.btns{
			padding: 24upx 30upx;
			.goLogin{font-size: 28upx;color: rgb(56, 147, 243);margin-top: 20upx;}
		}
	}
</style>
