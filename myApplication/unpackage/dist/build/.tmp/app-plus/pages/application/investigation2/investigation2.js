(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/investigation2/investigation2"],{"2b3b":function(t,e,a){"use strict";a.r(e);var i=a("8a10"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);e["default"]=n.a},"4d50":function(t,e,a){"use strict";a.r(e);var i=a("e395"),n=a("2b3b");for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);a("b34b");var s=a("2877"),c=Object(s["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},"8a10":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a("33bf");var i=a("43ce"),n=a("1ea5"),o=function(){return a.e("components/tki-file-manager").then(a.bind(null,"16fd"))},s=function(){return a.e("components/uni-popup/uni-popup").then(a.bind(null,"b072"))};function c(t){var e=new Date,a=e.getFullYear(),i=e.getMonth()+1,n=e.getDate();return"start"===t?a-=60:"end"===t&&(a+=2),i=i>9?i:"0"+i,n=n>9?n:"0"+n,"".concat(a,"-").concat(i,"-").concat(n)}var u={components:{uniPopup:s,tkiFileManager:o},data:function(){return{pageActive:!1,dataInfo:{},dataUoload:[],dataUoloadInfo:[],path1:"",path2:"",text1:"",text2:"",now:"",inve:"",inveder:"",index2:0,array2:["a","b"],array2Info:[],items:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current:1,items2:[{value:"shi",name:"是"},{value:"fou",name:"否"}],current2:1,items3:[{value:"shi",name:"是"},{value:"fou",name:"否"}],current3:1,acceptid:"",items4:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current4:-1,items5:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current5:-1,index7:0,array7:[],array7Info:[],index7_1:0,array7_1:[],array7_1Info:[],tprList:[],thistp:"",votiOpinion:"",isvoti:!1,votiStatus:-1,votiResult:"",nowstate:!1,index5:0,array5:[],array5Info:[],sd:"",date:"请选择生效时间",startDate:c("start"),endDate:c("end"),date2:"请选择失效时间",startDate2:c("start"),endDate2:c("end"),tiid:"",pdId:"",piid:"",doc_id:"",status:0,mianId:"",comment:"",Enclosure:[],type:"",backReasion:"",tokenId:"",nodeId:"",nodeListInfo:[],nodeList:[],num:"",showFileName1:"",showFileName2:"",uploadimg1:{uri:"",name:"request"},uploadimg2:{uri:"",name:"request"}}},onNavigationBarButtonTap:function(e){t.navigateBack()},onLoad:function(t){this.acceptid=t.acceptid,this.tiid=t.tiid,this.pdid=t.pdid,this.piid=t.piid,this.doc_id=t.doc_id,this.nodecode=t.nodecode,this.getInfo(),this.getUpload(),this.getNodeList()},methods:{getInfo:function(){var e=this,a="http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=ZXInfo&user_id=").concat((0,n.getUserInfo)().userId,"&acceptid=").concat(e.acceptid,"&doc_id=").concat(e.doc_id,"&pdid=").concat(e.pdid,"&pdid=").concat(e.pdid,"&tiid=").concat(e.tiid,"&piid=").concat(e.piid);t.request({url:a,success:function(a){var i=a.data;console.log(i," at pages\\application\\investigation2\\investigation2.vue:445"),e.dataInfo=i.object[0],e.inve=i.tokenName,e.num="是"==i.object[0].isstudy?1:"否"==i.object[0].isstudy?0:null,t.setNavigationBarTitle({title:i.tokenName})}})},getUpload:function(){var e=this;t.request({url:"http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=zllb_YD&mainId=").concat(e.acceptid),success:function(t){var a=t.data;console.log(a," at pages\\application\\investigation2\\investigation2.vue:460"),e.dataUoloadInfo=a.object;var i=a.object.map(function(t){return t.imgPath});e.dataUoload=i}})},openFile1:function(){this.$refs.filemanager1._openFile()},resultPath1:function(t){this.path1="file://".concat(t),this.uploadimg1.uri="file://".concat(t),this.showFileName1="".concat(this.path1.substring(0,9),"...").concat(this.path1.substr(-20))},openFile2:function(){this.$refs.filemanager2._openFile()},resultPath2:function(t){this.path2="file://".concat(t),this.uploadimg2.uri="file://".concat(t),this.showFileName2="".concat(this.path2.substring(0,9),"...").concat(this.path2.substr(-20)),console.log(this.path2,this.showFileName2," at pages\\application\\investigation2\\investigation2.vue:484")},uploadF1:function(){if(""!=this.path1){var e=[];e[0]=this.uploadimg1,t.showLoading({title:"上传中",mask:!0});var a=this,o="http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=uploadFile_YD&userId=").concat((0,n.getUserInfo)().userId,"&mainId=").concat(a.acceptid,"&mainFlag=cred&mate=").concat(a.num);t.uploadFile({url:o,filePath:"",name:"",files:e,success:function(e){if("string"==typeof e.data)var a=JSON.parse(e.data);else a=e.data;1==a.code&&(t.hideLoading(),t.showToast({title:a.message,mask:!0,duration:3e3}))},fail:function(t){console.log(t," at pages\\application\\investigation2\\investigation2.vue:516")}})}else t.showToast({title:"请选择客户征信报告",icon:"none"})},uploadF2:function(){if(""!=this.path2){var e=[];e[0]=this.uploadimg1,t.showLoading({title:"上传中",mask:!0});var a=this,o="http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=uploadFile_YD&userId=").concat((0,n.getUserInfo)().userId,"&mainId=").concat(a.acceptid,"&mainFlag=cred&mate=").concat(a.num);t.uploadFile({url:o,filePath:"",name:"",files:e,success:function(e){if("string"==typeof e.data)var a=JSON.parse(e.data);else a=e.data;1==a.code&&(t.hideLoading(),t.showToast({title:a.message,mask:!0,duration:3e3}))},fail:function(t){console.log(t," at pages\\application\\investigation2\\investigation2.vue:547")}})}else t.showToast({title:"请选择客户征信报告",icon:"none"})},showImg:function(e){t.previewImage({current:this.dataUoload[e],urls:this.dataUoload})},goupload:function(){var e=this,a="是"==this.dataInfo.isstudy?1:"否"==this.dataInfo.isstudy?0:"";t.navigateTo({url:"/pages/application/uploadData2/uploadData2?isstudy=".concat(a,"&mainId=").concat(e.acceptid)})},bindDateChange:function(t){this.date=t.target.value},bindDateChange2:function(t){this.date2=t.target.value},getsyr:function(){var e=this;t.request({url:"http://"+(0,i.baseIp)()+"/ams/system/distribute.htm?module=check_dept",success:function(t){var a=t.data;e.array7Info=a.object;var i=a.object.map(function(t){return t.dept_name}),n=[].concat(i);n.unshift("请选择协助调查岗"),e.array7=n}})},togglePopup:function(t){this.type=t},getpj:function(){var e=this;t.request({url:"http://"+(0,i.baseIp)()+"/ams/system/distribute.htm?module=pullDown&XLX=levelType",success:function(t){var a=t.data;e.array5Info=a.object,a=a.object.map(function(t){return t.name}),a.unshift("请选择拟初评结果"),e.array5=a}})},bindPickerChange5:function(e){this.index5=e.target.value,0!=e.target.value?this.sd=this.array5Info[e.target.value-1].code:t.showToast({title:"选择失败",icon:"none"})},getNodeList:function(){var e=this,a="http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=backNodeList&piId=").concat(e.piid);t.request({url:a,success:function(t){var a=t.data;console.log(a," at pages\\application\\investigation2\\investigation2.vue:627"),e.nodeListInfo=a.object,a.object.map(function(t){t.value=t.NAME_,t.name=t.NAME_}),e.items4=a.object}})},radioChange:function(t){for(var e=0;e<this.items.length;e++)if(this.items[e].value===t.target.value){this.current=e,this.status="tongyi"==t.target.value?1:0;break}},radioChange4:function(t){for(var e=0;e<this.items4.length;e++)if(this.items4[e].value===t.target.value){this.current4=e,console.log(this.nodeListInfo[e]," at pages\\application\\investigation2\\investigation2.vue:650"),this.tokenId=this.nodeListInfo[e].TOKENID,this.nodeId=this.nodeListInfo[e].NODEID,this.tiid=this.nodeListInfo[e].TIID;break}},radioChange5:function(t){for(var e=0;e<this.items5.length;e++)if(this.items5[e].value===t.target.value){this.current5=e,this.votiStatus="tongyi"==t.target.value?1:0;break}},bindPickerChange2:function(e){this.index2=e.target.value,0!=e.target.value?this.inveder=String(this.array2Info[e.target.value-1].id):t.showToast({title:"请重新选择",icon:"none"})},radioChange2:function(t){for(var e=0;e<this.items2.length;e++)if(this.items2[e].value===t.target.value){this.current2=e;break}},radioChange3:function(t){for(var e=0;e<this.items3.length;e++)if(this.items3[e].value===t.target.value){this.current3=e;break}},bindPickerChange7:function(e){var a=this;this.index7=e.target.value,0!=e.target.value?t.request({url:"http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=check_person&dept_id=").concat(a.array7Info[e.target.value].id-1),success:function(e){var i=e.data;if(0==i.object.length)t.showToast({title:"选择失败，请重新选择！"}),a.array7_1=[],a.businessData.userIds="";else{a.array7_1Info=i.object,t.showToast({title:"请选择具体信息",icon:"none"});var n=i.object.map(function(t){return t.dept_name});a.array7_1=n,a.tprList.push({name:a.array7_1Info[0].dept_name,code:a.array7_1Info[0].id})}}}):t.showToast({title:"选择失败",icon:"none"})},bindPickerChange7_1:function(t){this.index7_1=t.target.value,this.tprList.push({name:this.array7_1Info[t.target.value].dept_name,code:this.array7_1Info[t.target.value].id})},doVote:function(){if(0!=this.votiStatus){t.showLoading({title:"投票中",mask:!0});var e=this,a="http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=saveVote&userId=").concat((0,n.getUserInfo)().userId,"&status=").concat(e.votiStatus,"&comment=").concat(e.votiOpinion,"&taskInstanceId=").concat(e.tiid,"&acceptId=").concat(e.acceptid,"&docId=").concat(e.doc_id,"&tokenName=").concat(e.inve,"&pdid=").concat(e.pdid);t.request({url:a,success:function(a){var i=a.data;1==i.code&&(e.isvoti=!0,e.pageActive=!e.pageActive,t.hideLoading(),t.showToast({title:i.message,duration:3e3,mask:!0}),setTimeout(function(){t.reLaunch({url:"/pages/tabBar/information/information"})},3e3))}})}else t.showToast({title:"请投票，并填写投票意见！",icon:"none"})},delList:function(t){this.tprList.splice(t.target.dataset.value,1)},downEnclosure:function(){0==this.dataUoload.length?t.showToast({title:"暂无附件",icon:"none"}):this.type="middle-list"},back:function(){if(console.log(this.tokenId," at pages\\application\\investigation2\\investigation2.vue:774"),""!==this.tokenId){var e=this,a="http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=goBack&userId=").concat((0,n.getUserInfo)().userId,"&pdId=").concat(e.pdid,"&tiId=").concat(e.tiid,"&nodeId=").concat(e.nodeId,"&piId=").concat(e.piid,"&tokenId=").concat(e.tokenId,"&docId=").concat(e.doc_id,"&backReasion=").concat(e.backReasion,"&tokenName2=").concat(e.inve);console.log(a," at pages\\application\\investigation2\\investigation2.vue:783"),t.showLoading({title:"退回中",mask:!0}),t.request({url:a,success:function(e){var a=e.data;console.log(e," at pages\\application\\investigation2\\investigation2.vue:789"),1==a.code&&(t.hideLoading(),t.showToast({title:a.message,mask:!0,duration:3e3}),setTimeout(function(){t.reLaunch({url:"/pages/tabBar/information/information?isRefresh=true"})},3e3))}})}else t.showToast({title:"请选择退回节点",icon:"none"})},submitAcce:function(){if("信贷会计核查"!=this.inve||5!=this.dataUoloadInfo.length&&10!=this.dataUoloadInfo.length){if("征信查询"==this.inve){var e="是"==this.dataInfo.isstudy?1:"否"==this.dataInfo.isstudy?0:"";if(1==e){if(""==this.path1)return void t.showToast({title:"请先上传核查件！",icon:"none"});if(""==this.path2)return void t.showToast({title:"请先上传配偶核查件！",icon:"none"});if(""==this.text1)return void t.showToast({title:"请输入征信报告编码！",icon:"none"});if(""==this.text2)return void t.showToast({title:"请输入征信报告编码！",icon:"none"})}if(0==e){if(""==this.path1)return void t.showToast({title:"请先上传核查件！",icon:"none"});if(""==this.text1)return void t.showToast({title:"请输入征信报告编码！",icon:"none"})}}var a=this,o="http://".concat((0,i.baseIp)(),"/ams/system/distribute.htm?module=approveZX&userId=").concat((0,n.getUserInfo)().userId,"&acceptId=").concat(a.acceptid,"&tiid=").concat(a.tiid,"&mainId=").concat(a.acceptid,"&pdId=").concat(a.pdid,"&docId=").concat(a.doc_id,"&comment=").concat(a.comment,"&status=").concat(a.status,"&piId=").concat(a.piid);t.showLoading({title:"提交中",mask:!0}),t.request({url:o,success:function(e){var a=e.data;1==a.code?(t.hideLoading(),t.showToast({title:a.message,duration:3e3,mask:!0}),setTimeout(function(){t.reLaunch({url:"/pages/tabBar/information/information"})},3e3)):2==a.code&&t.showToast({title:a.message,icon:"none",duration:3e3,mask:!0})},fail:function(t){console.log(t," at pages\\application\\investigation2\\investigation2.vue:860")}})}else t.showToast({title:"请先上传核查件！",icon:"none"})}}};e.default=u}).call(this,a("6e42")["default"])},b34b:function(t,e,a){"use strict";var i=a("e431"),n=a.n(i);n.a},e395:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},e431:function(t,e,a){}},[["3884","common/runtime","common/vendor"]]]);