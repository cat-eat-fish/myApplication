<template>
	<view class="census">
		<catLabel text="日志类型" :initIndex="initIndex" :selectList="selectList" dataType="selector" @handSelect='handSelect' />
		<catLabel text="主题" :hasX="true" :value="upData.title" v-model="upData.title" dataType="text" />
		<catLabel text="内容" :hasX="true" :value="upData.content" v-model="upData.content" dataType="textarea"  />
		<catLabel text="图片资料" :preview='false' dataType="img" :imgNumber='1'  :editImg='true' @getImg="getImg" />
		<view class="btns">
			<button class="btn" @tap="handDo" type="primary">提交</button>
		</view>
	</view>
</template>
<script>
    import {baseIp} from '@/config.js';
	var  checker = require("@/common/checker.js");
	import {formateDate} from "@/common/util.js"
	import catLabel from "@/components/cat-label/cat-label.vue"
	export default{
		components:{catLabel},
		data(){
			return{
				selectList:[
					{label:'日报',value:1,index:0},
					{label:'周报',value:2,index:1},
					{label:'月报',value:3,index:2},
				],
				initIndex:0,
				upData:{
					userId:this.$store.state.userInfo.userName,
					bankId:this.$store.state.userInfo.deptId,
					title:'',
					content:'',
					file:'',
					type:1,
					creatTime:formateDate(new Date() , 'Y-M-D'),
				},
				rule : [
					{name:"title", checkType : "noempty",  errorMsg:"请输入日志主题"},
					{name:"content", checkType : "noempty", errorMsg:"请输入日志内容"},
				],
			}
		},
		methods:{
			handSelect(val){
				this.initIndex = val.checkArr.index
				this.upData.type = val.checkArr.value
			},
			getImg(file){
				this.upData.file = file[0];
			},
			handDo(){
				var formData = this.upData;
				var checkRes = checker.check(formData, this.rule);
				if(!checkRes){
					uni.showToast({ title: checker.error, icon: "none" });
					return
				}
				var url = `${baseIp()}/ams/system/distribute.htm?module=saveWeekWork_YD`;
				var data = this.upData;
				uni.request({
					url,
					method:'post',
					data,
					success(res) {
						let data = res.data;
						if(data.code == 1){
							uni.showToast({title:data.message,mask:true,duration:3000});
							setTimeout(function(){
								uni.switchTab({url:"/pages/tabBar/information/information"})
							},3000)
						}else{
							uni.showToast({title:data.message,icon:'none'});
							return
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss"> 
	.btns{
		position: fixed;
		margin: 24upx 30upx;
		bottom: 40upx;
		left: 30upx;
		right: 30upx;
	}
	
</style>