<template>
	<view class="investigation">
		<view class="investigation-title">受理详细信息</view>
		<view class="investigation-form form1">
			<view class="item">
				<view class="text">业务名称 : </view>
				<view class="field">{{"财审会认定审批"}}</view>
			</view>
			<view class="item">
				<view class="text">业务机构 : </view>
				<view class="field">{{dataInfo.dept_name}}</view>
			</view>
			<view class="item">
				<view class="text">发起部门 : </view>
				<view class="field">{{dataInfo.dept_name}}</view>
			</view>
			<view class="item">
				<view class="text">申购项目 : </view>
				<view class="field">{{dataInfo.purchase_project}}</view>
			</view>
			<view class="item">
				<view class="text">摘要 : </view>
				<view class="field">{{dataInfo.remark}}</view>
			</view>
			<view class="item">
				<view class="text">金额 : </view>
				<view class="field">{{dataInfo.purchase_amount}}</view>
			</view>
		</view>
		<view class="investigation-title"  v-if="inve == '审议' && !thistp">审议投票</view>
		<view class="investigation-form form1"  v-if="inve == '审议' && !thistp">
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
			<view class="item " >
				<view class="text">当前任务 : </view>
				<view class="field red">
					{{inve}}
				</view>
			</view>
			<view v-if="inve == '科长审批'">
				<view class="item">
					<view class="text">科长审批结果 : </view>
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
					<view class="text">科长审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '财务审批'">
				<view class="item">
					<view class="text">财务审批结果 : </view>
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
					<view class="text">财务审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '联社财务主任审批'">
				<view class="item">
					<view class="text">联社财务主任结果 : </view>
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
					<view class="text">联社财务主任审查意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '审批小组审批1'">
				<view class="item">
					<view class="text">审批小组1审批结果 : </view>
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
					<view class="text">审批小组1审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '审批小组审批2'">
				<view class="item">
					<view class="text">审批小组2审批结果 : </view>
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
					<view class="text">审批小组2审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '财务管理委员会审批1'">
				<view class="item">
					<view class="text">财务管理1审批结果 : </view>
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
					<view class="text">财务管理1审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '财务管理委员会审批2'">
				<view class="item">
					<view class="text">财务管理2审批结果 : </view>
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
					<view class="text">财务管理2审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
					</view>
				</view>
			</view>
			<view v-if="inve == '财务管理委员会审批3'">
				<view class="item">
					<view class="text">财务管理3审批结果 : </view>
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
					<view class="text">财务管理3审批意见 : </view>
					<view class="field textarea">
						<textarea class="textarea-t" v-model="comment"  auto-height />
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
		
		
		<view class="investigation-form form2" v-if="inve == '征信查询' ">
			<view class="item">
				<view class="text">客户名称 : </view>
				<view class="field">{{dataInfo.customer_name}}</view>
			</view>
			<view class="item">
				<view class="text">证件号码 : </view>
				<view class="field">{{dataInfo.certno}}</view>
			</view>
			<view class="item">
				<view class="text">上传征信报告 : </view>
				<input  @tap="openFile1" disabled  type="text" placeholder="点击选择文件">
				<tki-file-manager ref="filemanager1" @result="resultPath1"></tki-file-manager>
				<view class="field">
					<button type="primary" @click="uploadF1" class="js">上传</button>
				</view>
			</view>
			<view class="item">
				<view class="text">征信报告编码 : </view>
				<input   v-model="text1"  type="text" placeholder="请输入报告编码">
			</view>
			
		</view>
		<view class="investigation-form form2" v-if="inve == '征信查询' && dataInfo.isstudy == '是'">
			<view class="item">
				<view class="text">配偶名称 : </view>
				<view class="field">{{dataInfo.spousename}}</view>
			</view>
			<view class="item">
				<view class="text">证件号码 : </view>
				<view class="field">{{dataInfo.spouseno}}</view>
			</view>
			<view class="item">
				<view class="text">上传征信报告 : </view>
				<input  @tap="openFile2" disabled  type="text" placeholder="点击选择文件">
				<tki-file-manager ref="filemanager2" @result="resultPath2"></tki-file-manager>
				<view class="field">
					<button type="primary" @click="uploadF2"  class="js">上传</button>
				</view>
			</view>
			<view class="item">
				<view class="text">征信报告编码 : </view>
				<input  v-model="text2"    type="text" placeholder="请输入报告编码">
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
			<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
				<scroll-view class="uni-center center-box" :scroll-y="true">
					<view class="uni-list-item" v-for="(item, index) in dataUoloadInfo" :key="index">
						<view @click="showImg(index)" style="margin:18upx 0">
							{{item.annexname}}
						</view>
					</view>
				</scroll-view>
			</uni-popup>
			<button type="warn" v-if="inve == '客户经理打印'" @click="togglePopup('bottom-share')" data-position="bottom">退回</button>
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
				dataInfo:{},			//页面初始化数据  详细信息
				dataUoload:[],			//页面初始化数据  附件信息
				dataUoloadInfo:[],			//附件原始信息
				
				path1:[],				//征信报告1
				path2:[],				//征信报告2
				text1:"",				//客户编码
				text2:"",				//配偶编码
				// 当前任务  
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
				mianId:"",
				comment:"",		
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
			this.getInfo();
			this.getUpload();
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
			// 页面初始化数据  详细信息
			getInfo(){
				var that = this;
				var url = `http://${baseIp()}/ams/system/distribute.htm?module=cshInfo_YD&user_id=${getUserInfo().userId}&acceptid=${that.acceptid}&pdid=${that.pdid}&tiid=${that.tiid}&piid=${that.piid}&docid=${that.doc_id}`;
				console.log(url)
				uni.request({
					url,
					success(res){
						var data = res.data;
						console.log(data)
						that.dataInfo = data.object[0];
						that.inve = data.tokenName;
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
						uni.setNavigationBarTitle({title: data.tokenName});
					}
				})
			},
			// 页面初始化数据  附件信息
			getUpload(){
// 				var that = this;
// 				uni.request({
// 					url:`http://${baseIp()}/ams/system/distribute.htm?module=zllb_YD&mainId=${that.acceptid}`,
// 					success(res){
// 						var data = res.data;
// 						console.log(data)
// 						that.dataUoloadInfo = data.object;
// 						var a = data.object.map(item=>item.imgPath)
// 						that.dataUoload = a;
// 					}
// 				})
			},
			//选择文件  1.
			openFile1(){
				this.$refs.filemanager1._openFile()
			},
			resultPath1(e){
				this.path1.push(e);
			},
			//选择文件  2.
			openFile2(){
				this.$refs.filemanager2._openFile()
			},
			resultPath2(e){
				this.path2.push(e);
			},
			// 上传文件
			uploadF1(){
				if(this.path1 == ""){
					uni.showToast({title:"请选择客户征信报告",icon:"none"})
					return;
				}
			},
			uploadF2(){
				if(this.path2 == ""){
					uni.showToast({title:"请选择客户征信报告",icon:"none"})
					return;
				}
			},
			// 多图片预览
			showImg(e){
				uni.previewImage({
					current:this.dataUoload[e],
					urls: this.dataUoload
				});
			},	
			// 去上传页面
			goupload(){
				var isstudy = this.dataInfo.isstudy == "是" ? 1 : this.dataInfo.isstudy == "否" ? 0 : "";
				uni.navigateTo({url:`/pages/application/uploadData2/uploadData2?isstudy=${isstudy}`})
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
					url = `http://${baseIp()}/ams/system/distribute.htm?module=saveVote&userId=${getUserInfo().userId}&status=${that.votiStatus}&comment=${that.votiOpinion}&taskInstanceId=${that.tiid}&acceptId=${that.acceptid}&docId=${that.doc_id}&tokenName=${that.inve}&pdid=${that.pdid}`;
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
			// 附件下载
			downEnclosure(){
				if(this.dataUoload.length == 0){
					uni.showToast({title:"暂无附件",icon:"none"})
				}else{
					this.type = "middle-list";
				}
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
				if(this.inve == "信贷会计核查"){
					if(this.dataUoloadInfo.length == 5 || this.dataUoloadInfo.length == 10){
						uni.showToast({title:"请先上传核查件！",icon:"none"});
						return ;
					}
				}
				if(this.inve == "征信查询"){
					let isstudy = this.dataInfo.isstudy == "是" ? 1 : this.dataInfo.isstudy == "否" ? 0 : "";
					if(isstudy == 1){
						if(this.path1 == ""){
							uni.showToast({title:"请先上传核查件！",icon:"none"});
							return ;
						}
						if(this.path2 == ""){
							uni.showToast({title:"请先上传配偶核查件！",icon:"none"});
							return ;
						}
					}
					if(isstudy == 0){
						if(this.path1 == ""){
							uni.showToast({title:"请先上传核查件！",icon:"none"});
							return ;
						}
					}
				}
				
				
				var that = this;
				
				var url =`http://${baseIp()}/ams/system/distribute.htm?module=approveCSH_YD&userId=${getUserInfo().userId}&taskInstanceId=${that.tiid}&tiid=${that.tiid}&pdId=${that.pdid}&docId=${that.doc_id}&comment=${that.comment}&status=${that.status}&acceptId=${that.acceptid}&piId=${that.piid}`;
				uni.showLoading({title:"提交中",mask:true})
				console.log(url)
				uni.request({
					url,
					success(res){
						var data = res.data;
						console.log(res)
						if(data.code == 1){
							uni.hideLoading();
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



 button.js{width: 80upx;height: 40upx;text-align: center;line-height: 40upx;font-size: 22upx;margin:  0;color: rgb(255,255,255);border: none;border-radius: 5px;
		background: -webkit-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(rgb(255, 128, 31), #ffbd43); /* Firefox 3.6 - 15 */
		background: linear-gradient(rgb(255, 128, 31), #ffbd43); /* 标准的语法 */
	  }

</style>
