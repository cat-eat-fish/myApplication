<template>
	<view class="business">
		<view class="business-excessive">
			<view class="must">申请名称</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					请选择申报名称
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="business-form">
			<view class="item">
				<view class="text">业务名称</view>
				<input type="text" disabled :value="businessData.businessName" placeholder="请输入业务名称">
			</view>
			<view class="item"> 
				<view class="text must">客户名称</view>
				<input type="text"  v-model="businessData.customer_name" :disabled="isdis"  placeholder="请输入客户名称">
				<button class="js" v-if="!isdis" @click="retrieval" >检索</button>
				<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
					<scroll-view class="uni-center center-box" :scroll-y="true">
						<view @click="getName(item,index)" class="uni-list-item" v-for="(item, index) in list" :key="index">
							{{ item }}
						</view>
					</scroll-view>
				</uni-popup>
			</view>
			<view class="item">
				<view class="text">客户号</view>
				<input type="text" v-model="businessData.customer_id"  disabled  />
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">
					客户类型
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange2" :value="index2" :range="array2">
						<view class="uni-input">{{array2[index2]}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">
					申请授信额度
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange8" :value="index8" :range="array8">
						<view class="uni-input">{{array8[index8]}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">
					评级模型
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange4" :value="index4" :range="array4">
						<view class="uni-input">{{array4[index4]}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">
					信用等级
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange5" :value="index5" :range="array5">
						<view class="uni-input">{{array5[index5]}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">
					贷款用途
				</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.use" placeholder="请填写贷款用途">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">
					利率
				</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.rate" placeholder="请填写利率">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">
					贷款类型
				</view>
				<view class="">
					<checkbox-group class="group"  @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in businessData.type" :key="item.value">
							<view>
								<checkbox :value="item.value" :checked="item.checked" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</checkbox-group>
				</view>
			</view>
			<view v-if="businessData.type[1].checked == true" class="item">
				<view class="uni-list-cell-left text must">担保人</view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange2">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items2" :key="index">
							<view>
								<radio :value="item.name" :checked="index === current2" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view v-if="businessData.type[2].checked == true" class="item">
				<view class="uni-list-cell-left text must">抵押类型</view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange3">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items3" :key="index">
							<view>
								<radio :value="item.name" :checked="index === current3" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view v-if="businessData.type[3].checked == true" class="item">
				<view class="uni-list-cell-left text must">质押品</view>
				<input type="text" v-model="businessData.zyp" placeholder="请输入质押品">
			</view>
			<view class="item">
				<view class="text">申请日期</view>
				<input type="text" disabled :value="businessData.applay_date" placeholder="请输入申请日期">
			</view>
			<view class="item">
				<view class="text">申请理由</view>
				<input type="text" v-model="businessData.applay_reason" placeholder="请输入申请理由">
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">协助调查岗</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange7" :value="index7" :range="array7">
						<view class="uni-input">{{array7[index7]}}</view>
					</picker>
					<picker v-if="array7_1.length != 0" @change="bindPickerChange7_1" :value="index7_1" :range="array7_1">
						<view class="uni-input">{{array7_1[index7_1]}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="text">资料上传</view>
				<input  @tap="openFile" disabled  type="text" placeholder="附件上传">
				<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
			</view>
			<view class="item" v-if="path.length != 0 ">
				<view class="text">资料列表</view>
				<view class="textarea">
					<view class="item-list" v-for="(item,index) in path" :key="index">
						<view class="desc">{{item}}</view>
						<view class="del" @click="delList" :data-value="index">删除</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btns">
			<button type="warn" @click="doUpload">附件上传</button>
			<button type="primary" @click="submitAcce">提交受理</button>
		</view>
	</view>
</template>

<script>
	import {baseIp} from "../../../config.js"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import tkiFileManager from "@/components/tki-file-manager.vue"
	import {formateDate} from "@/common/util.js"
    import {getUserInfo,setUserInfo} from '../../../service.js';
	export default {
		components:{tkiFileManager,uniPopup},
		data() {
			return {
				index: 0,
				array: [],	//['新增', '续贷', '收回再贷']
				arrayInfo:[],
				
				index2:0,
				array2:[],// ['请选择客户类型', '企业法人','事业单位','其他经济组织','农民专业合作社','金融机构','农业产业化企业龙头']
				array2Info:[],
				
				index3: 0,
				array3: [],	//['请选择营销责任人', ]
				array3Info:[],
				index3_1: 0,
				array3_1: [],	//['请选择营销责任人', ]
				array3_1Info:[],
				
				index4: 0,
				array4: [],	// ['请选择评级模型','大中型企业','小企业','新建企业','新开户法人','集团客户','事业单位','新建小企业' ]
				array4Info:[],
				
				index5: 0,
				array5: [],// ['请选择拟初评结果','AAA','AA','A','BBB','BB','B','CCC','CC','C' ]
				array5Info:[],
				
				index6: 0,
				array6: [],//['请选择上季度拟初评结果','AAA','AA','A','BBB','BB','B','CCC','CC','C' ]
				array6Info:[],
				
				index7: 0,
				array7: [],	//'请选择协助调查岗',[]
				array7Info:[],
				index7_1: 0,
				array7_1: [],	//['请选择营销责任人', ]
				array7_1Info:[],
				
				
				index8: 0,
				array8: [],	// ['请选择评级模型','大中型企业','小企业','新建企业','新开户法人','集团客户','事业单位','新建小企业' ]
				array8Info:[],
				isdis:false,
				getType:[],
				items2: [{value: "单人",name: '单人'},{value: "多人",name: '多人'}],
				current2: 0,
				items3: [{value: "0",name: '抵押物'},{value: "抵押物所有权人",name: '抵押物所有权人'}],
				current3: 0,
				businessData:{
					type:[
						{value: '信用',name: '信用'},
						{value: '保证',name: '保证'},
						{value: '抵押',name: '抵押'},
						{value: '质押',name: '质押'},
					],		
					loadType:"",			//贷款类型
					creditRating:"",		//信用等级
					bandsman:"",			//担保人
					mortgageType:"",		//抵押类型
					zyp:"",					//质押品
					use:"",					//贷款用途
					rate:"",				//利率
					title:"",				// 申报名称
					businessName:"授信认定审批",	//业务名称
					customer_name:"",		//客户名称
					customer_id:"",			//客户号
					cust_type:"",					//客户类型
					controlPer:"",					//申请信用额度
					evaluate_modle:"",		//评级模型
					first_level:"",			//拟初评结果
					applay_date:"",			//申请时间
					applay_reason:"",		//申请理由
					userIds:"",				//协助调查岗
					userIds2:"",			//营销责任人
					lastLevel:"",			//上季度评级级别
				},
				type: '',
				getUserInfo:[],
				list: [],
				path:[],
				// 保存完返回的userIds
				userIds:"",
				seq:"",
				isUp:false,
				ishold:false,
			};
		},
		onNavigationBarButtonTap(e) {
			this.isKeep();
		},
		onLoad(){
			this.businessData.applay_date = formateDate(new Date(),"Y-M-D");
// 			this.businessData.bandsman = "单人"
// 			this.businessData.mortgageType = "抵押物"
			var that = this;
			uni.request({
				url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=sbType",
				success(res){
					var data = res.data;
					that.arrayInfo = data.object;
					// console.log(data)
					data = data.object.map((item)=>{
						return item.name
					})
					that.array = data;
					that.businessData.title = that.arrayInfo[0].code
				}
			})
			uni.request({
				url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=customerType",
				success(res){
					var data = res.data;
					that.array2Info = data.object;
					
					data = data.object.map((item)=>{
						return item.name
					})
					data.unshift("请选择客户类型")
					that.array2 = data;
				}
			})
			uni.request({
				url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=level_modle",
				success(res){
					var data = res.data;
					that.array4Info = data.object;
					data = data.object.map((item)=>{
						return item.name
					})
					data.unshift("请选择拟初评结果")
					that.array4 = data;
				}
			})
			uni.request({
				url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=levelType",
				success(res){
					var data = res.data;
					that.array6Info = that.array5Info = data.object;
					// console.log(data)
					data = data.object.map((item)=>{
						return item.name
					})
					var data2 = [].concat(data);
					data.unshift("请选择拟初评结果")
					data2.unshift("请选择上季度拟初评结果")
					that.array5 = data;
					that.array6 = data2;
				}
			})
			uni.request({
				url:"http://"+baseIp()+"/ams/system/distribute.htm?module=check_dept",
				success(res){
					var data = res.data;
					that.array3Info = that.array7Info = data.object;
					var dataInfo = data.object.map((item)=>{
						return item.dept_name
					})
					var data2Info = [].concat(dataInfo);
					dataInfo.unshift("请选择营销责任人")
					that.array3 = dataInfo;
					
					data2Info.unshift("请选择协助调查岗")
					that.array7 = data2Info;
				}
			})
			this.getMonryList()
		},
		beforeDestroy(){
			return false
		},
		
		methods:{
			// 附件上传
			doUpload(){
				if(!this.ishold){
					uni.showModal({
						title: '您还没有保存',
						content: '您还没有保存数据，请先保存！',
						success: function (res) {
							if (res.confirm) {
								// console.log('用户点击确定');
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						},
					})
					return;
				}
				if(this.path.length == 0){
					uni.showToast({title:"请先选择资料！",icon:"none"});
					return;
				}
				uni.showLoading({title:"上传中",mask:true})
				var request = []
				this.path.map((item,index)=>{
					request[index] = {name:index+1,uri:""}
				})
				this.path.map((item,index)=>{
					request[index].uri = item;
				})
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=PJupload&userId=${getUserInfo().userId}&mainId=${that.seq}`;
				
				// return;
				uni.uploadFile({
					url, 
					filePath: "",
					name: '',
					files:request,
					success: (res) => {
						if(typeof(res.data) == 'string'){
							var data = JSON.parse(res.data);
						}else{
							var data =res.data;
						}
						if(data.code == 1){
							that.isUp = true;
							uni.hideLoading();
							uni.showToast({title:data.message,mask:true})
						}
					}
				});
			},
			// 贷款类型 - 保证
			radioChange2(evt) {
				for (let i = 0; i < this.items2.length; i++) {
					if (this.items2[i].value === evt.target.value) {
						this.current2 = i;
						if(i == 1){
							this.businessData.bandsman = "多人"
						}else if(i == 0){
							this.businessData.bandsman = "单人"
						}
						break;
					}
				}
			},
			// 贷款类型 - 保证
			radioChange3(evt) {
				for (let i = 0; i < this.items3.length; i++) {
					if (this.items3[i].value === evt.target.value) {
						this.current3 = i;
						if(i == 1){
							this.businessData.mortgageType = "抵押物所有权人"
						}else if(i == 0){
							this.businessData.mortgageType = "抵押物"
						}
						
						break;
					}
				}
			},
			// 贷款类型
			checkboxChange: function (e) {
				var items = this.businessData.type,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
				if(values.indexOf('保证') != -1){
					this.businessData.bandsman = "单人"
				}
				if(values.indexOf('抵押') != -1){
					this.businessData.mortgageType = "抵押物"
				}
				this.getType = items.filter(item=>{
					return item.checked == true
				})
				var a = this.getType.map(item=>{
					return item.value;
				})
				
				this.businessData.loadType = a.join(',');
			},
			getMonryList(){
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=pullDown&XLX=creditLimit`;
				uni.request({
					url,
					success(res){
						var data = res.data;
						that.array8Info = that.array8Info = data.object;
						var dataInfo = data.object.map((item)=>{
							return item.name
						})
						dataInfo.unshift("请选择授信额度")
						that.array8 = dataInfo
					}
				})
			},
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.businessData.title = this.arrayInfo[e.target.value].code;
			},
			bindPickerChange2: function(e) {
				this.index2 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return;
				}
				this.businessData.cust_type = this.array2Info[e.target.value - 1].code;
			},
			bindPickerChange3: function(e) {
				var that = this;
				this.index3 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return ;
				}
				uni.request({
					url:`http://${baseIp()}/ams/system/distribute.htm?module=check_person&dept_id=${that.array3Info[e.target.value].id-1}`,
					success(res){
						var data = res.data;
						if(data.object.length == 0){
							uni.showToast({
								title:"选择失败，请重新选择！",
								icon:"none"
							})
							that.index3 = 0;
							that.array3_1 = [];
							that.businessData.userIds2 = "";
						}else{
							that.array3_1Info = data.object;
							uni.showToast({
								title:"请选择具体信息",
								icon:"none"
							})
							var dataInfo = data.object.map((item)=>{
								return item.dept_name
							})
							that.array3_1 = dataInfo;
							that.businessData.userIds2 = String(that.array3_1Info[that.index3_1].id);
						}
					}
				})
			},
			bindPickerChange3_1: function(e) {
				this.index3_1 = e.target.value;
				this.businessData.userIds2 = String(this.array3_1Info[this.index3_1].id);
				
			},
			bindPickerChange4: function(e) {
				this.index4 = e.target.value
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return;
				}
				this.businessData.evaluate_modle = this.array4Info[e.target.value - 1].code;
			},
			bindPickerChange5: function(e) {
				this.index5 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return;
				}
				this.businessData.creditRating = this.array5Info[e.target.value - 1].code;
			},
			bindPickerChange6: function(e) {
				this.index6 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return;
				}
				this.businessData.lastLevel = this.array6Info[e.target.value - 1].code;
			},
			bindPickerChange7: function(e) {
				var that = this;
				this.index7 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return ;
				}
				uni.request({
					url:`http://${baseIp()}/ams/system/distribute.htm?module=check_person&dept_id=${that.array3Info[e.target.value].id-1}`,
					success(res){
						var data = res.data;
						if(data.object.length == 0){
							uni.showToast({
								title:"选择失败，请重新选择！",
							})
							that.array7_1 = [];
							that.businessData.userIds = "";
						}else{
							that.array7_1Info = data.object;
							uni.showToast({
								title:"请选择具体信息",
								icon:"none"
							})
							var dataInfo = data.object.map((item)=>{
								return item.dept_name
							})
							that.array7_1 = dataInfo;
							that.businessData.userIds = String(that.array7_1Info[that.index7_1].id);
						}
					}
				})
			},
			bindPickerChange7_1: function(e) {
				this.index7_1 = e.target.value;
				this.businessData.userIds = String(this.array7_1Info[this.index7_1].id);
			},
			bindPickerChange8: function(e) {
				this.index8 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return;
				}
				this.businessData.controlPer = this.array8Info[e.target.value - 1].code;
				// console.log(this.businessData.controlPer)
			},
			togglePopup(type) {
				this.type = type;
			},
			// 提交受理
			submitAcce(){
				if(!this.ishold){
					uni.showModal({
						title: '您还没有保存',
						content: '您还没有保存数据，请先保存！',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					})
				}else if(!this.isUp){
					uni.showModal({
						title: '您还没有上传资料',
						content: '您还没有上传资料，请先上传！',
						success: function (res) {
							if (res.confirm) {
								// console.log('用户点击确定');
								return ;
							} else if (res.cancel) {
								// console.log('用户点击取消');
								return ;
							}
						},
					})
					return;
				}else{
					var that = this;
					uni.showLoading({
						title:"提交中",
						mask:true
					})
					uni.request({
						url:`http://${baseIp()}/ams/system/distribute.htm?module=submitMainInfo5_YD&Id=${that.seq}&userIds=${that.businessData.userIds}`,
						success(res){
							var data = res.data;
							uni.hideLoading()
							if(data.code == 1){
								uni.showToast({title:data.message,duration:3000,mask:true})
								setTimeout(function(){
									uni.reLaunch({url:"/pages/tabBar/information/information"})
								},3000)
							}
						},
						fail(err){
							console.log(err)
						}
					})
				}
			},
			getName(item,index){
				this.businessData.customer_name = this.getUserInfo[index].customer_name;
				this.businessData.customer_id = this.getUserInfo[index].customer_id;
				this.type = '';
				this.isdis = true
			},
			openFile(){
				this.$refs.filemanager._openFile()
			},
			resultPath(e){this.path.push(`file://${e}`);},	
			delList(e){
				this.path.splice(e.target.dataset.value, 1)
			},
			// 用户名检索
			retrieval(){
				var that = this;
				if(this.businessData.customer_name == ""){
					uni.showToast({
						title:"请输入客户名称",
						duration: 2000,
						icon:'none'
					})
				}else{
					uni.showLoading({
						title: '检索中',
						mask:true
					});
					var url = `http://${baseIp()}/ams/system/distribute.htm?module=checkCustomer&customerName=${that.businessData.customer_name}`;
					
					uni.request({
						url:url,
						success(res){
							uni.hideLoading();
							var data = res.data;
							if(data.object.length == 0){
								that.type = "";
								that.list = data.object;
								uni.showToast({title:"暂无数据"})
							}else{
								that.getUserInfo = data.object
								var dataInfo = data.object.map((item)=>{
									return item.customer_name
								})
								that.type = "middle-list";
								that.list = dataInfo
							}
						},
						fail(err){
							console.log(err);
							uni.hideLoading()
						}
					})
				}
			},
			isKeep(){
				if(this.ishold){
					uni.showToast({title:"您已经保存过了！"});
					return;
				}
				if(this.businessData.customer_name == ""){
					uni.showToast({
						title:"请检索客户名称",
						icon:"none"
					})
					return;
				}
				if(this.businessData.customer_id == ""){
					uni.showToast({
						title:"请检索客户id",
						icon:"none"
					})
					return;
				}
				if(this.businessData.cust_type == ""){
					uni.showToast({
						title:"请选择客户类型",
						icon:"none"
					})
					return;
				}
				if(this.businessData.controlPer == ""){
					uni.showToast({
						title:"请选择申请授信额度",
						icon:"none"
					})
					return;
				}
				if(this.businessData.evaluate_modle == ""){
					uni.showToast({
						title:"请选择评级模型",
						icon:"none"
					})
					return;
				}
				if(this.businessData.creditRating == ""){
					uni.showToast({
						title:"请选择信用等级",
						icon:"none"
					})
					return;
				}
				if(this.businessData.use == ""){
					uni.showToast({
						title:"请输入贷款用途",
						icon:"none"
					})
					return;
				}
				if(this.businessData.rate == ""){
					uni.showToast({
						title:"请输入利率",
						icon:"none"
					})
					return;
				}
				if(this.businessData.userIds == ""){
					uni.showToast({
						title:"请选择协助调查岗",
						icon:"none"
					})
					return;
				}
				if(this.getType.lenth == 0){
					uni.showToast({
						title:"请选择贷款类型",
						icon:"none"
					})
					return;
				}
				if(this.businessData.type[1].checked == true){
					if(this.businessData.bandsman == ""){
						uni.showToast({
							title:"请选择选择担保人",
							icon:"none"
						})
						return;
					}
				}
				if(this.businessData.type[2].checked == true){
					if(this.businessData.bandsman == ""){
						uni.showToast({
							title:"请选择选择抵押类型",
							icon:"none"
						})
						return;
					}
				}
				if(this.businessData.type[3].checked == true){
					if(this.businessData.pledge == ""){
						uni.showToast({
							title:"请输入质押品",
							icon:"none"
						})
						return;
					}
				}
				
				
				
				let uploadData = this.businessData;
				uploadData.user_id = String(getUserInfo().userId);
				uploadData.bus_code = "";
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=addCreditInfo_YD&credit={userId:"${uploadData.user_id}",title:"${uploadData.title}",customer_name:"${uploadData.customer_name}",customer_id:"${uploadData.customer_id}",cust_type:"${uploadData.cust_type}",applyCreditLine:"${uploadData.controlPer}",evaluate_modle:"${uploadData.evaluate_modle}",creditRating:"${uploadData.creditRating}",useProceeds:"${uploadData.use}",applay_reason:"${uploadData.applay_reason}",rateInterest:"${uploadData.rate}",userIds:"${uploadData.userIds}",bandsman:"${uploadData.bandsman}",mortgageType:"${uploadData.mortgageType}",pledge:"${uploadData.zyp}",loadType:"${uploadData.loadType}"}`
				// console.log(url)
				var that = this;
				uni.showModal({
					title: '是否保存',
					content: '您还没有保存数据，是否保存？',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({
								title: '保存中',
								mask:true
							})
							uni.request({
								url:url,
								success(res){
									var data = res.data;
									if(data.code == 1){
										uni.hideLoading()
										uni.showToast({title:`请及时提交!`,mask:true,duration:2000})
										that.userIds = data.object.userIds;
										that.ishold = true;
										that.seq = data.object.seq;
									}
								},
								fail(err){
									console.log(err);
									uni.hideLoading()
								}
							})
						} 
					}
				});
			}
		}
	}
</script>
	
<style>
	.business{background-color: rgb(239,238,243);padding-bottom: 60upx;}
	.business-excessive{height: 225upx;color: #fff;padding: 0 15px;background: -webkit-linear-gradient(rgb(255, 128, 31), #ffbd43); background: -o-linear-gradient(rgb(255, 128, 31), #ffbd43); background: -moz-linear-gradient(rgb(255, 128, 31), #ffbd43); background: linear-gradient(rgb(255, 128, 31), #ffbd43); }
	  
	  .xl{width: 18px;height: 13px;margin-left: 40upx;}
	  .must{position: relative;}
	  .must::before{content: "*";color: red;position: absolute;left: -8px;top: -2px;}
	  .business-form{border-radius: 10px;margin: -80upx 24upx 0;background-color: #fff;}
	  .business-form .item{display: flex; border-bottom:1px solid rgb(230,230,230) ;}
	  .business-form .item .text{margin: 40upx 0 40upx 40upx;font-size: 26upx;width: 28%;color: rgb(51,51,51);}
	  .business-form .item input{margin: 32upx 0 40upx 40upx;font-size: 26upx;color: rgb(51,51,51);}
	  .business .group{display: flex;flex-wrap: wrap;}
	  button.js{width: 80upx;height: 40upx;text-align: center;line-height: 40upx;font-size: 22upx;margin: 33upx 24upx 33upx 0;color: rgb(255,255,255);border: none;border-radius: 5px;
		background: -webkit-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Firefox 3.6 - 15 */
		background: linear-gradient(rgb(255, 128, 31), #ffbd43); /* 标准的语法 */
	  }
	  .item-xl{width: 14px;height: 10px;margin: 44upx 24upx 0 0;}
	  .btns {margin: 60upx 24upx 0;}
	  /* .btns button{color: #fff;background-color: #CFCFCF;} */
	  .btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	  .btns button{width: 48%;}
	  
	  .textarea{width: 60%;}
	  .item-list{display: flex;width: 100%;margin: 20upx 0;}
	  .item-list .desc{width: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	  .item-list .del{width: 20%;text-align: center;background-color: rgb(255, 128, 31);color: #FFFFFF;border-radius: 10px;}
	  .uni-list-cell-pd{padding: 5px;}
	  
	  .business .uni-input{padding: 7px 0px;margin: 24upx 0;}
	  .business .uni-list-cell::after{height: 0;}
	  .business .uni-list-cell-left{padding: 0 30upx 0 0;}
	  .business .uni-input{background: none;}
	  
	  .business .item .field.ra{display: flex;color: rgb(102,102,102);}
	.business uni-radio-group {display: flex;}
	  .example {padding: 0 30upx 30upx}
	  .example-title {font-size: 32upx;line-height: 32upx;color: #777;margin: 40upx 25upx;position: relative}
	  .example .example-title {margin: 40upx 0}
	  .example-body {padding: 0 40upx }
	  .uni-padding-wrap {padding: 0 30upx;}
	  button {margin: 20upx 0;}
	  .uni-helllo-text {height: 100upx;line-height: 100upx;text-align: center;}
	  .center-box {width: 500upx;height: 500upx;}
	  .uni-list-item {text-align: left;line-height: 80upx;border-bottom: 1px #f5f5f5 solid;}
	  .uni-list-item:last-child {border: none;}
	  .center-box .image {width: 100%;height: 100%;}
	  .bottom-title {line-height: 60upx;font-size: 24upx;padding: 15upx 0;}
	  .bottom-content {display: flex;flex-wrap: wrap;padding: 0 35upx;}
	  .bottom-content-box {display: flex;flex-direction: column;align-items: center;margin-bottom: 15upx;width: 25%;box-sizing: border-box;}
	  .bottom-content-image {display: flex;justify-content: center;align-items: center;width: 90upx;height: 90upx;overflow: hidden;background: #007aff;border-radius: 10upx;}
	  .bottom-content-text {font-size: 26upx;color: #333;margin-top: 10upx;}
	  .bottom-btn {height: 90upx;line-height: 90upx;border-top: 1px #f5f5f5 solid;}
	  .bottom-content-image.wx {background: #00ce47;}
	  .bottom-content-image.qq {background: #00b6f6;}
	  .bottom-content-image.sina {background: #ff766a;}
	  .bottom-content-image.copy {background: #07ccd0;}
	  @font-face {font-family: 'iconfont';src: url('https://at.alicdn.com/t/font_1028200_47ewtwy4t04.ttf') format('truetype');}
	  .icon {font-family: 'iconfont';font-size: 40upx;color: #fff;}
</style>
