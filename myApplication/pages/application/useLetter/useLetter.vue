<template>
	<view class="business">
		<view class="business-excessive">
			<view class="must">业务类型</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">请选择业务类型</view>
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
				<input type="text" disabled value="用信认定审批" >
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
				<view class="uni-list-cell-left text must">客户号</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.customer_id"  disabled  />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">证件类型</view>
				<view class="uni-list-cell-db">
					<input type="text"  :value="businessData.certType"  disabled  />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">证件号码</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.certNo"  placeholder="请输入证件号码" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">客户类型</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange2" :value="index2" :range="array2">
						<view class="uni-input">{{array2[index2]}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">产品名称</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.productName"  placeholder="请输入产品名称" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">流资合同号</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.contractNo"  placeholder="请输入产品名称" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">业务品种金额</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.categoryAmount"  placeholder="请输入业务品种金额" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">可用金额</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.amountAvailable"  placeholder="请输入可用金额" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">申请金额</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.applyAmount"  placeholder="请输入申请金额" />
				</view>
			</view>
			<view class="item">
				<view class=" uni-list-cell-left text must">币种</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.currency"  placeholder="请输入币种" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">申请期限</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.applicationPeriod"  placeholder="请输入申请期限" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">货款性质</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.natureLoan"  placeholder="请输入货款性质" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">货款方式</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.loan"  placeholder="请输入货款方式" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">货款投向</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.loansTo"  placeholder="请输入货款投向" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">货款类型</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.loadType"  placeholder="请输入货款类型" />
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">贷款用途</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.useProceeds" placeholder="请填写贷款用途">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">贷款种类</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.loanTypes" placeholder="请填写贷款种类">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">用途明细</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.useDetail" placeholder="请填写用途明细">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">还款方式</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.reimbursementMeans" placeholder="请填写还款方式">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">还款来源</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.sourceRepayment" placeholder="请填写还款来源">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">结息方式</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.interestSettlementWay" placeholder="请填写还款方式">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">退出措施</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.exitMeasures" placeholder="请填写退出措施">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">退出期限</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.exitDeadline" placeholder="请填写退出期限">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">营销人</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.marketPer" placeholder="请填写营销人">
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">是否营销贷款</view>
				<view class="uni-list-cell-db">
					<view class="field ra first">
						<radio-group class="group first" @change="radioChange1">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items1" :key="index">
								<view>
									<radio :value="item.name" :checked="index === current1" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">是否社团贷款</view>
				<view class="uni-list-cell-db">
					<view class="field ra first">
						<radio-group class="group first" @change="radioChange2">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items2" :key="index">
								<view>
									<radio :value="item.name" :checked="index === current2" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="uni-list-cell-left text must">是否存量贷款</view>
				<view class="uni-list-cell-db">
					<view class="field ra first">
						<radio-group class="group first" @change="radioChange3">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items3" :key="index">
								<view>
									<radio :value="item.name" :checked="index === current3" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			
			
			<view class="item">
				<view class="uni-list-cell-left text">申请理由</view>
				<view class="uni-list-cell-db">
					<input type="text" v-model="businessData.applayReason" placeholder="请输入申请理由">
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
			<button type="warn">附件上传</button>
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
				
				items1: [{value: "1",name: '是'},{value: "0",name: '否'}],
				current1: 0,
				items2: [{value: "1",name: '是'},{value: "0",name: '否'}],
				current2: 0,
				items3: [{value: "1",name: '是'},{value: "0",name: '否'}],
				current3: 0,
				
				isdis:false,
				getType:[],
				businessData:{
					customer_name:"",		//客户名称
					customer_id:"",			//客户号
					cust_type:"",			//客户类型
					
					busType:"01",				//业务类型
					certType:"身份证",		//证件类型
					certNo:"",				//证件号码
					productName:"",			//产品名称
					contractNo:"",			//流资合同号
					categoryAmount:"",		//业务品种金额
					amountAvailable:"",		//可用金额
					applyAmount:"",			//申请金额 
					currency:"",			//币种
					applicationPeriod:"",	//申请期限
					natureLoan:"",			//贷款性质
					loan:"",				//贷款方式
					loansTo:"",				//贷款投向
					loadType:"",			//贷款类型
					useProceeds:"",			//贷款用途
					loanTypes:"",			//贷款种类
					useDetail:"",			//用途明细
					reimbursementMeans:"",	//还款方式
					sourceRepayment:"",		//还款来源
					interestSettlementWay:"",//结息方式
					exitMeasures:"",		// 退出措施
					exitDeadline:"",		//退出期限
					marketPer:"",			//营销人	
					isMarketingLoan:"1",		//是否营销贷款
					isCorporateLoan:"1",		//是否社团贷款
					isStockLoans:"1",		//是否存量贷款
					applayReason:"",		//申请理由
				},
				type: '',
				getUserInfo:[],
				list: [],
				path:[],
				// 保存完返回的userIds
				userIds:"",
				seq:"",
				ishold:false,
			};
		},
		onNavigationBarButtonTap(e) {
			this.isKeep();
		},
		onLoad(){
			this.businessData.applay_date = formateDate(new Date(),"Y-M-D");
			this.getProType();
			this.getUserType();
		},
		beforeDestroy(){
			return false
		},
		
		methods:{
			// 获取客户类型
			getUserType(){
				var that = this;
				uni.request({
					url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=customerType",
					success(res){
						var data = res.data;
						that.array2Info = data.object;
						// console.log(data)
						data = data.object.map((item)=>{
							return item.name
						})
						data.unshift("请选择客户类型")
						that.array2 = data;
					}
				})
			},
			// 获取业务类型
			getProType(){
				var that = this;
				uni.request({
					url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=busType2",
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
			
			radioChange1(evt) {
				for (let i = 0; i < this.items1.length; i++) {
					// console.log(evt.target.value)
					if (this.items1[i].name === evt.target.value) {
						this.current1 = i;
						this.businessData.isMarketingLoan = i == 0 ? 1 : 0;
						break;
					}
				}
			},
			radioChange2(evt) {
				for (let i = 0; i < this.items2.length; i++) {
					if (this.items2[i].name === evt.target.value) {
						this.current2 = i;
						this.businessData.isCorporateLoan = i == 0 ? 1 : 0;
						break;
					}
				}
			},
			radioChange3(evt) {
				for (let i = 0; i < this.items3.length; i++) {
					if (this.items3[i].name === evt.target.value) {
						this.current3 = i;
						this.businessData.isStockLoans = i == 0 ? 1 : 0;
						break;
					}
				}
			},
			
			
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.businessData.busType = this.arrayInfo[e.target.value].code;
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
				}else{
					var that = this;
					uni.showLoading({
						title:"提交中",
						mask:true
					})
					uni.request({
						url:`http://${baseIp()}/ams/system/distribute.htm?module=submitMainInfo6_YD&Id=${that.seq}&userIds=${that.businessData.userIds}`,
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
			resultPath(e){
				this.path.push(e);
			},	
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
				// 是否保存
				if(this.ishold){
					uni.showToast({title:"您已经保存过了！"});
					return;
				}
				// 判断客户名
				var pattId = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if(this.businessData.customer_name == ""){
					uni.showToast({title:"请检索客户名称",icon:"none",mask:true})
					return;
				}
				// 判断客户号不为空
				if(this.businessData.customer_id == ""){
					uni.showToast({title:"请检索客户id",icon:"none",mask:true})
					return;
				}
				// 判断客户类型不为空
				if(this.businessData.cust_type == ""){
					uni.showToast({title:"请选择客户类型",icon:"none",mask:true})
					return;
				}
				// 判断证件号码不为空
				if(this.businessData.certNo == ""){
					uni.showToast({title:"请填写证件号码",icon:"none",mask:true})
					return;
				}
				if(pattId.test(this.businessData.certNo)){
					uni.showToast({title:"请填写正确的证件号码",icon:"none",mask:true})
					return;
				}
					
				// 判断产品名称不为空
				if(this.businessData.productName == ""){
					uni.showToast({title:"请填写产品名称",icon:"none",mask:true})
					return;
				}
				// 判断 流资合同号 不为空
				if(this.businessData.contractNo == ""){
					uni.showToast({title:"请填写流资合同号",icon:"none",mask:true})
					return;
				}
				// 
				if(this.businessData.categoryAmount == ""){
					uni.showToast({title:"请填写业务品种金额",icon:"none",mask:true})
					return;
				}
				if(this.businessData.amountAvailable == ""){
					uni.showToast({title:"请填写可用金额",icon:"none",mask:true})
					return;
				}
				if(this.businessData.applyAmount == ""){
					uni.showToast({title:"请填写申请金额",icon:"none",mask:true})
					return;
				}
				if(this.businessData.currency == ""){
					uni.showToast({title:"请填写币种",icon:"none",mask:true})
					return;
				}
				if(this.businessData.applicationPeriod == ""){
					uni.showToast({title:"请填写申请期限",icon:"none",mask:true})
					return;
				}
				if(this.businessData.natureLoan == ""){
					uni.showToast({title:"请填写贷款性质",icon:"none",mask:true})
					return;
				}
				if(this.businessData.loan == ""){
					uni.showToast({title:"请填写贷款方式",icon:"none",mask:true})
					return;
				}
				if(this.businessData.loansTo == ""){
					uni.showToast({title:"请填写贷款投向",icon:"none",mask:true})
					return;
				}
				if(this.businessData.loadType == ""){
					uni.showToast({title:"请填写贷款类型",icon:"none",mask:true})
					return;
				}
				if(this.businessData.useProceeds == ""){
					uni.showToast({title:"请填写贷款用途",icon:"none",mask:true})
					return;
				}
				if(this.businessData.loanTypes == ""){
					uni.showToast({title:"请填写贷款种类",icon:"none",mask:true})
					return;
				}
				if(this.businessData.useDetail == ""){
					uni.showToast({title:"请填写用途明细",icon:"none",mask:true})
					return;
				}
				if(this.businessData.reimbursementMeans == ""){
					uni.showToast({title:"请填写还款方式",icon:"none",mask:true})
					return;
				}
				if(this.businessData.sourceRepayment == ""){
					uni.showToast({title:"请填写还款来源",icon:"none",mask:true})
					return;
				}
				if(this.businessData.interestSettlementWay == ""){
					uni.showToast({title:"请填写结息方式",icon:"none",mask:true})
					return;
				}
				if(this.businessData.exitMeasures == ""){
					uni.showToast({title:"请填写退出措施",icon:"none",mask:true})
					return;
				}
				if(this.businessData.exitDeadline == ""){
					uni.showToast({title:"请填写退出期限",icon:"none",mask:true})
					return;
				}
				if(this.businessData.marketPer == ""){
					uni.showToast({title:"请填写营销人",icon:"none",mask:true})
					return;
				}
				
				
				let D = this.businessData;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=addFinanceInfo2_YD&credit={userId:"${getUserInfo().userId}",busType:"${D.busType}",customerName:"${D.customer_name}",customerId:"${D.customer_id}",custType:"${D.cust_type}",certType:"${D.certType}",certNo:"${D.certNo}",productName:"${D.productName}",contractNo:"${D.contractNo}",categoryAmount:"${D.categoryAmount}",amountAvailable:"${D.amountAvailable}",applyAmount:"${D.applyAmount}",currency:"${D.currency}",applicationPeriod:"${D.applicationPeriod}",natureLoan:"${D.natureLoan}",loan:"${D.loan}",loansTo:"${D.loansTo}",loadType:"${D.loadType}",useProceeds:"${D.useProceeds}",loanTypes:"${D.loanTypes}",useDetail:"${D.useDetail}",reimbursementMeans:"${D.reimbursementMeans}",sourceRepayment:"${D.sourceRepayment}",interestSettlementWay:"${D.interestSettlementWay}",exitMeasures:"${D.exitMeasures}",exitDeadline:"${D.exitDeadline}",marketPer:"${D.marketPer}",isMarketingLoan:"${D.isMarketingLoan}",isCorporateLoan:"${D.isCorporateLoan}",isStockLoans:"${D.isStockLoans}",applayReason:"${D.applayReason}"}`
				console.log(url)
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
	  .business uni-checkbox-group{display: flex;flex-wrap: wrap;}
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
	  
	  .business .item .field.ra{display: flex;color: rgb(102,102,102);margin: 20upx 0;}
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
	  
	  .field.ra .group{display: flex;} 
</style>
