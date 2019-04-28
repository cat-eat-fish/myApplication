<template>
	<view class="investigation">
		<view class="investigation-title">受理详细信息</view>
		<view class="investigation-form form1">
			<view class="item">
				<view class="text">申请人 : </view>
				<view class="field">{{dataInfo.applay_per}}</view>
			</view>
			<view class="item">
				<view class="text">申请名称 : </view>
				<view class="field">{{dataInfo.title}}</view>
			</view>
			<view class="item">
				<view class="text">客户名称 : </view>
				<view class="field">{{dataInfo.customer_name}}</view>
			</view>
			<view class="item">
				<view class="text">客户号 : </view>
				<view class="field">{{dataInfo.customer_id}}</view>
			</view>
			<view class="item">
				<view class="text">客户类型 : </view>
				<view class="field">{{dataInfo.cust_type}}</view>
			</view>
			<view class="item">
				<view class="text">评级模型 : </view>
				<view class="field">{{dataInfo.evaluate_modle}}</view>
			</view>
			<view class="item">
				<view class="text">信用等级 : </view>
				<view class="field">{{dataInfo.level_modle}}</view>
			</view>
			<view class="item">
				<view class="text">申请日期 : </view>
				<view class="field">{{dataInfo.applay_date}}</view>
			</view>
			<view class="item">
				<view class="text">申请理由 : </view>
				<view class="field">{{dataInfo.applay_reason}}</view>
			</view>
			<view class="item">
				<view class="text">贷款用途 : </view>
				<view class="field">{{dataInfo.use_proceeds}}</view>
			</view>
			<view class="item" >
				<view class="text">贷款类型 : </view>
				<view class="field">{{dataInfo.load_type}}</view>
			</view>
			<view class="item" v-if=" (dataInfo.load_type.split(',')).indexOf('保证') != -1 ">
				<view class="text">担保人 : </view>
				<view class="field">{{dataInfo.bandsman}}</view>
			</view>
			<view class="item" v-if=" (dataInfo.load_type.split(',')).indexOf('抵押') != -1 ">
				<view class="text">抵押类型 : </view>
				<view class="field">{{dataInfo.mortgage_type}}</view>
			</view>
			<view class="item" v-if=" (dataInfo.load_type.split(',')).indexOf('质押') != -1 ">
				<view class="text">质押品 : </view>
				<view class="field">{{dataInfo.pledge}}</view>
			</view>
			<view class="item">
				<view class="text">授信额度 : </view>
				<view class="field">{{dataInfo.creditlimit}}</view>
			</view>
			<view class="item">
				<view class="text">利率 : </view>
				<view class="field">{{dataInfo.rate_interest}}</view>
			</view>
		</view>
		<view class="investigation-title"  v-if="(inve == '审议' && !thistp)  || (inve == '风险管理委员会投票' && !thistp)">审议投票</view>
		<view class="investigation-form form1"  v-if="(inve == '审议' && !thistp) || (inve == '风险管理委员会投票' && !thistp)">
			<view class="item">
				<view class="text">投票意见 : </view>
				<view class="field ra">
					<radio-group class="group" @change="radioChange5">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items5" :key="index">
							<view>
								<radio :value="item.value" :checked="index === current5" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="item text">
				<view class="text">投票意见 : </view>
				<view class="field textarea">
					<textarea v-model="votiOpinion"  auto-height />
				</view>
			</view>
			<view class="btns">
				<button class="vote" type="warn" :disabled="nowstate" @click="doVote">确定</button>
			</view>
		</view>
		<view class="investigation-title">审批信息</view>
		<view class="investigation-form form2">
			<view class="item">
				<view class="text">当前任务 : </view>
				<view class="field red">{{inve}}</view>
			</view>
			<view v-if="inve == '协助调查'">
				<view class="item">
					<view class="text">协助调查审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">协助调查审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '审查'">
				<view class="item">
					<view class="text">审查审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">审查审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
				<view class="item">
					<view class="text">审批协助调查岗 : </view>
					<view class=" field">
						<picker @change="bindPickerChange2" :value="index2" :range="array2">
							<view class="uni-input">{{array2[index2]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view  v-if="inve == '协助审查'">
				<view class="item">
					<view class="text">协助审查审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">协助审查审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view  v-if="inve == '审议选人'">
				<view class="item">
					<view class=" text must">选择审议投票人 : </view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange7" :value="index7" :range="array7">
							<view class="uni-input">{{array7[index7]}}</view>
						</picker>
						<picker v-if="array7_1.length != 0" @change="bindPickerChange7_1" :value="index7_1" :range="array7_1">
							<view class="uni-input">{{array7_1[index7_1]}}</view>
						</picker>
					</view>
				</view>
				<view class="item" v-if="tprList.length != 0 ">
					<view class="text">投票人列表 : </view>
					<view class="textarea">
						<view class="item-list" v-for="(item,index) in tprList" :key="index">
							<view class="desc">{{item.name}}</view>
							<view class="del" @click="delList" :data-value="index">删除</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="inve == '审议'">
				<view class="item">
					<view class="text">审议审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio :disabled="!thistp" :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">审议审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
				<view class="item">
					<view class="text">审议投票结果 : </view>
					<view class="field">
						{{votiResult}}
					</view>
				</view>
			</view>
			<view v-if="inve == '投票'">
				<view class="item">
					<view class="text">投票审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio :disabled="thistp" :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">投票审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '审定'">
				<view class="item">
					<view class="text">审定审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio  :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">审定审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
				<view class="item">
					<view class="text">审定评级 ： </view>
					<view class="field">
						<picker @change="bindPickerChange5" :value="index5" :range="array5">
							<view class="uni-input">{{array5[index5]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view v-if="inve == '回复'">
				<view class="item">
					<view class="text">回复审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio  :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">回复审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '风险管理委员会审议选人'">
				<view class="item">
					<view class=" text must">选择审议投票人 : </view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange7" :value="index7" :range="array7">
							<view class="uni-input">{{array7[index7]}}</view>
						</picker>
						<picker v-if="array7_1.length != 0" @change="bindPickerChange7_1" :value="index7_1" :range="array7_1">
							<view class="uni-input">{{array7_1[index7_1]}}</view>
						</picker>
					</view>
				</view>
				<view class="item" v-if="tprList.length != 0 ">
					<view class="text">投票人列表 : </view>
					<view class="textarea">
						<view class="item-list" v-for="(item,index) in tprList" :key="index">
							<view class="desc">{{item.name}}</view>
							<view class="del" @click="delList" :data-value="index">删除</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="inve == '风险管理委员会投票'">
				<view class="item">
					<view class="text">管理委员会审批结果 : </view>
					<view class="field ra">
						<radio-group class="group" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
								<view>
									<radio :disabled="!thistp" :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item text" >
					<view class="text">管理委员会审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
				<view class="item">
					<view class="text">审议投票结果 : </view>
					<view class="field">
						{{votiResult}}
					</view>
				</view>
			</view>
			
			
			<view class="item" style="display: none;">
				<view class="text">发送短信通知 : </view>
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
			<view class="item" style="display: none;">
				<view class="text">发送短信通知 : </view>
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
			
		</view>
		<view class="investigation-title">资料列表</view>
		<view class="investigation-form form3">
			<view class="uni-card" >
				<view class="uni-list">
					<view class="uni-list-cell uni-collapse">
						<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="lists[1].open ? 'uni-active' : ''"
						 @click="triggerCollapse(1)">
							{{lists[1].name}}
						</view>
						<view class="uni-list uni-collapse" :class="lists[1].open ? 'uni-active' : ''">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in lists[1].pages" :key="key" @click="goDetailPage2(item,key)">
								<view class="uni-list-cell-navigate uni-navigate-right"> {{item}} </view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="item" v-if="path.length != 0 ">
				<view class="text">新增列表</view>
				<view class="textarea">
					<view class="item-list" v-for="(item,index) in path" :key="index">
						<view class="desc">{{item}}</view>
						<view class="del" @click="delImgList" :data-value="index">删除</view>
					</view>
				</view>
			</view>
			<view class="itemBtn" v-if="path.length != 0 ">
				<button type="primary" @click="doUpload">点击上传</button>
			</view>
		</view>
		<view class="btns">
			<button type="warn" @tap="openFile">增加资料</button>
			<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
			<button type="warn" v-if="inve == '审查' || inve == '选择审议投票人' || inve == '审议	'" @click="togglePopup('bottom-share')" data-position="bottom">退回</button>
			<uni-popup :show="type === 'bottom-share'" position="bottom" @hidePopup="togglePopup('')">
				<view class="bottom-title">退回节点</view>
				<view class="bottom-content">
					<view class="field ra">
						<radio-group class="group" @change="radioChange4">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items4" :key="index">
								<view>
									<radio :value="item.value" :checked="index === current4" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
					<view class="item text" >
						<view class="text">退回原因 : </view>
						<view class="field textarea">
							<textarea class="textarea-t" v-model="backReasion"  auto-height />
						</view>
					</view>
				</view>
				<view class="bottom-btn uni-popup-btns" >
					<button type="primary" @click="back">确定</button>
					<button type="warn" @click="togglePopup('')">取消</button>
				</view>
			</uni-popup>
			<button type="primary" @click="submitAcce">提交</button>
		</view>
	</view>
</template>

<script>
	import tkiFileManager from "@/components/tki-file-manager.vue"
	import {deteleObject} from "@/common/util.js"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {baseIp} from "../../../config.js"
    import {getUserInfo,setUserInfo} from '../../../service.js';
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		components: {uniPopup,tkiFileManager},
		data() {
			return {
				
				pageActive:false,
				
				// 当前任务 -- 审查
				now:"",
				inve:"",
				inveder:"",
				// 当前任务
				index2:0,
				array2:["a","b"],// ['请选择客户类型', '企业法人','事业单位','其他经济组织','农民专业合作社','金融机构','农业产业化企业龙头']
				array2Info:[],
				
				
				items: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current: 1,
				
				items2: [{value: "shi",name: '是'},{value: "fou",name: '否'}],
				current2: 1,
				items3: [{value: "shi",name: '是'},{value: "fou",name: '否'}],
				current3: 1,
				acceptid:"",
				
				items4: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current4: -1,
				
				items5: [{value: "tongyi",name: '同意'},{value: "butongyi",name: '不同意'}],
				current5: -1,
				
				// 审议投票人
				index7: 0,
				array7: [],	//'请选择协助调查岗',[]
				array7Info:[],
				index7_1: 0,
				array7_1: [],	//['请选择营销责任人', ]
				array7_1Info:[],
				
				tprList:[],
				// 审议投票人
				
				// 投票
				thistp:"",
				// 投票
				
				// 审议
				votiOpinion:"",
				isvoti:false,
				votiStatus:-1,
				votiResult:"",
				nowstate:false,
				// 审议
				
				// 审定
				index5: 0,
				array5: [],// ['请选择拟初评结果','AAA','AA','A','BBB','BB','B','CCC','CC','C' ]
				array5Info:[],
				sd:"",
				// 审定
				
				// 回复
				date: "请选择生效时间",
				startDate:getDate('start'),
				endDate:getDate('end'),
				date2: "请选择失效时间",
				startDate2:getDate('start'),
				endDate2:getDate('end'),
				// 回复
				
				tiid:"",
				pdId:"",
				piid:"",
				doc_id:"",
				status:0,
				nodecode:"",
				mianId:"",
				comment:"",		
				dataInfo:{
					load_type:"",
				},
				Enclosure:[],		//附件
				
				type:"",
				// 退回
				backReasion:"",		//退回理由
				tokenId:"",			//退回节点id
				nodeId:"",
				nodeListInfo:[],
				nodeList:[],
				// 退回
				// 资料相关
				lists: [
					{id: 'view',name: '图片预览',open: false,pages: []},
					{id: 'view',name: '附件下载查看',open: false,pages: []}
				],
				listImgInfo:[],
				
				listFJInfo:[],
				path:[],
				isUp:false,
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateBack();
		},
		onLoad(e){
			this.acceptid = e.acceptid;
			this.tiid = e.tiid;
			this.pdid = e.pdid;
			this.piid = e.piid;
			this.doc_id = e.doc_id;
			this.nodecode = e.nodecode;
			var that = this;
			this.getsyr();
			uni.request({
				url:`http://${baseIp()}/ams/system/distribute.htm?module=check_person&dept_id=557823`,
				success(res){
					var data = res.data;
					// console.log(data)
					that.array2Info =  data.object;
					var dataInfo = data.object.map((item)=>{
						return item.dept_name
					})
					dataInfo.unshift("请选择人员")
					that.array2 = dataInfo;
				}
			})
			var url = `http://${baseIp()}/ams/system/distribute.htm?module=informationSX_YD&user_id=${getUserInfo().userId}&acceptid=${e.acceptid}&pdid=${e.pdid}&tiid=${e.tiid}&piid=${e.piid}&docid=${that.doc_id}`;
			console.log(url)
			uni.request({
				url,
				success(res){
					var data = res.data;
					// console.log(data)
					that.dataInfo = data.object[0];
					that.mianId = data.object[0].id;
					that.now = data.object[0].tokenName;
					uni.setNavigationBarTitle({title: data.object[0].tokenName})
					that.inve = data.object[0].tokenName;
					
					that.listFJInfo = data.object2.map((item,index)=>{
						return item.imgPath
					})
					that.listFJInfo = that.listFJInfo.filter(item=>{
						return item;
					})
					that.lists[1].pages = data.object2.map((item,index)=>{
						return item.annexname
					})
					that.lists[1].pages = that.lists[1].pages.filter(item=>{
						return item;
					})
					
				}
			})
			this.getNodeList();
			this.getpj();
		},
		methods:{
			// 上传文件
			delImgList(e){
				this.path.splice(e.target.dataset.value, 1)
			},
			doUpload(){
				uni.showLoading({title:"上传中",mask:true})
				var request = []
				this.path.map((item,index)=>{
					request[index] = {name:index+1,uri:""}
				})
				this.path.map((item,index)=>{
					request[index].uri = item;
				})
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=PJupload&userId=${getUserInfo().userId}&mainId=${that.acceptid}`;
				console.log(url)
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
			openFile(){
				this.$refs.filemanager._openFile()
			},
			resultPath(e){
				this.path.push(`file://${e}`);
			},
			// 资料相关
			triggerCollapse(e) {
				if (!this.lists[e].pages) {
					this.goDetailPage(this.lists[e].url);
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
			goDetailPage(e,i) {
				uni.previewImage({  current:this.listImgInfo[i],urls: this.listImgInfo});
			},
			goDetailPage2(e,i) {
				uni.navigateTo({url:`/pages/web-view/web-view?url=${this.listFJInfo[i]}`})
			},
			// 选择时间
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			// 选择结束时间
			bindDateChange2: function(e) {
				this.date2 = e.target.value
			},
			// 审议投票人列表
			getsyr(){
				var that = this;
				uni.request({
					url:"http://"+baseIp()+"/ams/system/distribute.htm?module=check_dept",
					success(res){
						var data = res.data;
						that.array7Info = data.object;
						var dataInfo = data.object.map((item)=>{
							return item.dept_name
						})
						var data2Info = [].concat(dataInfo);
						data2Info.unshift("请选择协助调查岗")
						that.array7 = data2Info;
					}
				})
			},
			// 审议投票人列表
			togglePopup(type) {
				this.type = type;
			},
			// 审定评级列表
			getpj(){
				var that = this;
				uni.request({
					url:"http://"+baseIp()+"/ams/system/distribute.htm?module=pullDown&XLX=levelType",
					success(res){
						var data = res.data;
						that.array5Info = data.object;
						data = data.object.map((item)=>{return item.name})
						data.unshift("请选择拟初评结果")
						that.array5 = data;
					}
				})
			},
			// 选定评级
			bindPickerChange5: function(e) {
				this.index5 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({
						title:"选择失败",
						icon:"none"
					})
					return;
				}
				this.sd = this.array5Info[e.target.value - 1].code;
			},
			// 退回节点列表数据
			getNodeList(){
				var that = this,
					url = `http://${baseIp()}/ams/system/distribute.htm?module=backNodeList&piId=${that.piid}`;
				
				uni.request({
					url,
					success(res){
						var data = res.data;
						// console.log(data);
						that.nodeListInfo = data.object;
						data.object.map((item)=>{
							item.value = item.NAME_;
							item.name = item.NAME_;
						})
						that.items4 = data.object;
					}
				})
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						this.status = evt.target.value == "tongyi" ? 1 : 0;
						break;
					}
				}
			},
			radioChange4(evt) {
				for (let i = 0; i < this.items4.length; i++) {
					if (this.items4[i].value === evt.target.value) {
						this.current4 = i;
						console.log(this.nodeListInfo[i])
						this.tokenId = this.nodeListInfo[i].TOKENID;
						this.nodeId = this.nodeListInfo[i].NODEID;
						this.tiid = this.nodeListInfo[i].TIID;
						break;
					}
				}
			},
			radioChange5(evt) {
				for (let i = 0; i < this.items5.length; i++) {
					if (this.items5[i].value === evt.target.value) {
						this.current5 = i;
						this.votiStatus = evt.target.value == "tongyi" ? 1 : 0;
						break;
					}
				}
			},
			bindPickerChange2: function(e) {
				this.index2 = e.target.value;
				if(e.target.value == 0){
					uni.showToast({title:"请重新选择",icon:"none"})
					return ;
				}
				this.inveder = String(this.array2Info[e.target.value-1].id);
				console.log(this.inveder)
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
					url:`http://${baseIp()}/ams/system/distribute.htm?module=check_person&dept_id=${that.array7Info[e.target.value].id-1}`,
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
							that.tprList.push({name:that.array7_1Info[0].dept_name,code:that.array7_1Info[0].id});
						}
					}
				})
			},
			bindPickerChange7_1: function(e) {
				this.index7_1 = e.target.value;
				this.tprList.push({name:this.array7_1Info[e.target.value].dept_name,code:this.array7_1Info[e.target.value].id})
				
			},
			// 审议 投票
			doVote(){
				if(this.votiStatus == false){
					uni.showToast({title:"请投票，并填写投票意见！",icon:"none"})
					return ;
				}
				
				uni.showLoading({title:"投票中",mask:true,})
				var that = this,
					url = `http://${baseIp()}/ams/system/distribute.htm?module=saveVote&userId=${getUserInfo().userId}&status=${that.votiStatus}&comment=${that.votiOpinion}&taskInstanceId=${that.tiid}&acceptId=${that.acceptid}&docId=${that.doc_id}&tokenName=${that.inve}&pdid=${that.pdid}&nodeCode=${that.nodecode}`;
				// console.log(url)
				uni.request({
					url,
					success(res){
						var data = res.data;
						if(data.code == 1){
							that.isvoti = true;
							that.pageActive = !that.pageActive;
							uni.hideLoading();
							uni.showToast({title:data.message,duration:3000,mask:true});
							setTimeout(function(){
								uni.reLaunch({url:"/pages/tabBar/information/information"})
							},3000)
						}
					}
				})
				
				
			},
			// 审议
			// 删除审议投票人
			delList(e){
				this.tprList.splice(e.target.dataset.value, 1)
			},
			
			// 退回
			back(){
				console.log(this.tokenId)
				// 验证
				if(this.tokenId === ""){
					uni.showToast({title:"请选择退回节点",icon:"none"});
					return;
				}
				
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=goBack&userId=${getUserInfo().userId}&pdId=${that.pdid}&tiId=${that.tiid}&nodeId=${that.nodeId}&piId=${that.piid}&tokenId=${that.tokenId}&docId=${that.doc_id}&backReasion=${that.backReasion}&tokenName2=${that.inve}`;
				console.log(url)
				uni.showLoading({title:"退回中",mask:true})
				uni.request({
					url,
					success(res){
						var data = res.data;
						console.log(res)
						if(data.code == 1){
							uni.hideLoading();
							uni.showToast({title:data.message,mask:true,duration:3000});
							setTimeout(function(){
								uni.reLaunch({url:"/pages/tabBar/information/information?isRefresh=true"})
							},3000)
						}
					}
				})
			},
			// 提交审核
			submitAcce(){
				
				var that = this;
				var url =`http://${baseIp()}/ams/system/distribute.htm?module=approveSX_YD&userId=${getUserInfo().userId}&taskInstanceId=${that.tiid}&mainId=${that.mianId}&pdId=${that.pdid}&piId=${that.piid}&docId=${that.doc_id}&comment=${that.comment}&status=${that.status}&userIds=${that.inveder}&acceptId=${that.acceptid}`;
				if(this.inve == "审查"){
					if(this.inveder == ""){
						uni.showToast({title:"请选择审批协助调查岗",icon:"none"})
						return;
					}
				}
				if(this.inve == "投票"){
					if(this.thistp){
						uni.showToast({title:"您已投过票了！",icon:"none"});
						return ;
					}
				}
				if(this.inve == "审议"){
					if(!this.isvoti){
						uni.showToast({title:"请先投票！",icon:"none"})
						return ;
					}
					if(this.dataInfo.yj_num != this.dataInfo.zg_num){
						uni.showToast({title:"投票未结束！",icon:"none"})
						return ;
					}
				}
				if(this.inve == "审议选人"){
					if(this.tprList.length<2){
						uni.showToast({title:"请选择两个或以上的投票人",icon:"none"})
						return;
					}
					this.tprList = deteleObject(this.tprList)
					var a = [];
					this.tprList.map((item)=>{
						a.push(item.code)
					})
					this.inveder = a.join(',');
					var that = this;
					var url =`http://${baseIp()}/ams/system/distribute.htm?module=approveSX_YD&userId=${getUserInfo().userId}&taskInstanceId=${that.tiid}&mainId=${that.mianId}&pdId=${that.pdid}&piId=${that.piid}&docId=${that.doc_id}&comment=${that.comment}&status=${that.status}&userIds=${that.inveder}&acceptId=${that.acceptid}`;
					
				}
				if(this.inve == "风险管理委员会审议选人"){
					if(this.tprList.length<2){
						uni.showToast({title:"请选择两个或以上的投票人",icon:"none"})
						return;
					}
					this.tprList = deteleObject(this.tprList)
					var a = [];
					this.tprList.map((item)=>{
						a.push(item.code)
					})
					this.inveder = a.join(',');
					var that = this;
					var url =`http://${baseIp()}/ams/system/distribute.htm?module=approveSX_YD&userId=${getUserInfo().userId}&taskInstanceId=${that.tiid}&mainId=${that.mianId}&pdId=${that.pdid}&piId=${that.piid}&docId=${that.doc_id}&comment=${that.comment}&status=${that.status}&userIds=${that.inveder}&acceptId=${that.acceptid}`;
				
				}
				if(this.inve == "风险管理委员会投票"){
					if(!this.isvoti){
						uni.showToast({title:"请先投票！",icon:"none"})
						return ;
					}
					if(this.votiResult.length < 2){
						uni.showToast({title:"投票未结束！",icon:"none"})
						return ;
					}
				}
				
			
				uni.showLoading({title:"提交中",mask:true})
				// console.log(url)
				uni.request({
					url,
					success(res){
						var data = res.data;
						// console.log(data)
						uni.hideLoading();
						if(data.code == 1){
							uni.showToast({title:data.message,duration:3000,mask:true});
							setTimeout(function(){
								uni.reLaunch({url:"/pages/tabBar/information/information"})
							},3000)
						}else if(data.code == 2){
							uni.showToast({title:data.message,icon:"none",duration:3000,mask:true});
						}
					},
					fail(err){
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS  */
	.investigation{background-color: rgb(239,238,243);height: 100%;min-height: 100%; overflow: auto;}
	/* #endif */
	.investigation{background-color: rgb(239,238,243);height: 100%;min-height: 100%;overflow: auto;}
	.investigation-title{font-size: 30upx;color: rgb(254,138,20);margin: 40upx 0 20upx 30upx;}
	.investigation-form{margin: 20upx 24upx 50upx;background-color: #fff;border-radius: 10px;padding: 20upx 0;}
	.investigation-form .item{display: flex;padding: 20upx 24upx;}
	.investigation-form .item .text{font-size: 26upx;color: rgb(55,55,55);}
	.investigation-form .item .field{font-size: 26upx;color: rgb(102,102,102);margin-left: 10upx;}
	.investigation-form .item .field.red{color: red;}
	.investigation-form .item .field.ra{display: flex;color: rgb(102,102,102);}
	
	.investigation-form .field.ra .group{display: flex;}
	.investigation-form .uni-list-cell {display: flex;}
	.investigation-form .uni-list-cell:nth-child(1),.uni-list-cell:nth-child(3),.uni-list-cell:nth-child(5){margin-left: 35upx;}
	.investigation-form .uni-list-cell:nth-child(2),.uni-list-cell:nth-child(4),.uni-list-cell:nth-child(6){margin-left: 100upx;}
	.investigation-form .item.text{display: block;}
	.investigation-form .item .field.textarea{width: 100%;height: 90upx;border: 1px solid #000;box-sizing: border-box;}
	.investigation-form .item .textarea .textarea-t{height: 100% !important;}
	.investigation-form .item .uni-input{padding: 0;}
	.btns{display: flex;justify-content: space-between;margin: 60upx 24upx;}
	.btns button{width: 48%;}
	
	.textarea{width: 70%;margin-left: 40upx;}
	.item-list{display: flex;width: 100%;margin: 0 0 20upx;}
	.item-list:last-child{margin: 0;}
	.item-list .desc{width: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	.item-list .del{width: 20%;text-align: center;background-color: rgb(255, 128, 31);color: #FFFFFF;border-radius: 10px;}
	
	
	
	.investigation-form .uni-list-cell::after{height:0}
	.investigation-form .uni-list-cell-pd {padding: 0;}
	
	button.vote{width: 100%;}
	.investigation-form.form3 .uni-list-cell{margin: 0;}
	
	.example {padding: 0 30upx 30upx}
	.example-title {font-size: 32upx;line-height: 32upx;color: #777;margin: 40upx 25upx;position: relative}
	.example .example-title {margin: 40upx 0}
	.example-body {padding: 0 40upx}
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
	.icon {font-family: 'iconfont';font-size: 40upx;color: #fff;}
	.uni-popup-btns{display: flex;justify-content: space-around;align-items: flex-start;}
	
	
	/*  */
	.uni-popup-insert{}
	.investigation-form .uni-popup-insert  .field.ra .group{flex-wrap: wrap;justify-content: start;}
	.investigation-form .uni-popup-insert .uni-list-cell:nth-child(1),
	.investigation-form .uni-popup-insert .uni-list-cell:nth-child(2),
	.investigation-form .uni-popup-insert .uni-list-cell:nth-child(3),
	.investigation-form .uni-popup-insert .uni-list-cell:nth-child(4),
	.investigation-form .uni-popup-insert .uni-list-cell:nth-child(5),
	.investigation-form .uni-popup-insert .uni-list-cell:nth-child(6){margin-left: 20upx;}





</style>
