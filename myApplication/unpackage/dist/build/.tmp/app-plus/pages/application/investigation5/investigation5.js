(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/investigation5/investigation5"],{"065c":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("33bf"),a=i("43ce"),o=i("1ea5"),s=function(){return i.e("components/tki-file-manager").then(i.bind(null,"16fd"))},c=function(){return i.e("components/uni-popup/uni-popup").then(i.bind(null,"b072"))};function r(t){var e=new Date,i=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();return"start"===t?i-=60:"end"===t&&(i+=2),n=n>9?n:"0"+n,a=a>9?a:"0"+a,"".concat(i,"-").concat(n,"-").concat(a)}var d={components:{uniPopup:c,tkiFileManager:s},data:function(){return{pageActive:!1,now:"",inve:"",inveder:"",index2:0,array2:["a","b"],array2Info:[],items:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current:1,items2:[{value:"shi",name:"是"},{value:"fou",name:"否"}],current2:1,items3:[{value:"shi",name:"是"},{value:"fou",name:"否"}],current3:1,acceptid:"",items4:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current4:-1,items5:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current5:-1,index7:0,array7:[],array7Info:[],index7_1:0,array7_1:[],array7_1Info:[],tprList:[],thistp:"",votiOpinion:"",isvoti:!1,votiStatus:-1,votiResult:"",nowstate:!1,index5:0,array5:[],array5Info:[],sd:"",date:"请选择生效时间",startDate:r("start"),endDate:r("end"),date2:"请选择失效时间",startDate2:r("start"),endDate2:r("end"),tiid:"",pdId:"",piid:"",doc_id:"",status:0,mianId:"",comment:"",dataInfo:{load_type:""},Enclosure:[],type:"",backReasion:"",tokenId:"",nodeId:"",nodecode:"",nodeListInfo:[],nodeList:[],lists:[{id:"view",name:"图片预览",open:!1,pages:[]},{id:"view",name:"附件下载查看",open:!1,pages:[]}],listImgInfo:[],listFJInfo:[],path:[],isUp:!1}},onNavigationBarButtonTap:function(e){t.navigateBack()},onLoad:function(e){this.acceptid=e.acceptid,this.tiid=e.tiid,this.pdid=e.pdid,this.piid=e.piid,this.doc_id=e.doc_id,this.nodecode=e.nodecode;var i=this;this.getsyr(),t.request({url:"http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=check_person&dept_id=557823"),success:function(t){var e=t.data;i.array2Info=e.object;var n=e.object.map(function(t){return t.dept_name});n.unshift("请选择人员"),i.array2=n}});var n="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=informationYX_YD&user_id=").concat((0,o.getUserInfo)().userId,"&acceptid=").concat(e.acceptid,"&pdid=").concat(e.pdid,"&tiid=").concat(e.tiid,"&piid=").concat(e.piid,"&docid=").concat(i.doc_id);console.log(n," at pages\\application\\investigation5\\investigation5.vue:679"),t.request({url:n,success:function(e){var n=e.data;console.log(n," at pages\\application\\investigation5\\investigation5.vue:684"),i.dataInfo=n.object[0],i.mianId=n.object[0].id,i.now=n.object[0].tokenName,t.setNavigationBarTitle({title:n.object[0].tokenName}),i.inve=n.object[0].tokenName,i.listFJInfo=n.object2.map(function(t,e){return t.imgPath}),i.listFJInfo=i.listFJInfo.filter(function(t){return t}),i.lists[1].pages=n.object2.map(function(t,e){return t.annexname}),i.lists[1].pages=i.lists[1].pages.filter(function(t){return t})}}),this.getNodeList(),this.getpj()},methods:{delImgList:function(t){this.path.splice(t.target.dataset.value,1)},doUpload:function(){t.showLoading({title:"上传中",mask:!0});var e=[];this.path.map(function(t,i){e[i]={name:i+1,uri:""}}),this.path.map(function(t,i){e[i].uri=t});var i=this,n="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=PJupload&userId=").concat((0,o.getUserInfo)().userId,"&mainId=").concat(i.acceptid);console.log(n," at pages\\application\\investigation5\\investigation5.vue:728"),t.uploadFile({url:n,filePath:"",name:"",files:e,success:function(e){if("string"==typeof e.data)var n=JSON.parse(e.data);else n=e.data;1==n.code&&(i.isUp=!0,t.hideLoading(),t.showToast({title:n.message,mask:!0}))}})},openFile:function(){this.$refs.filemanager._openFile()},resultPath:function(t){this.path.push("file://".concat(t))},triggerCollapse:function(t){if(this.lists[t].pages)for(var e=0;e<this.lists.length;++e)this.lists[e].open=t===e&&!this.lists[t].open;else this.goDetailPage(this.lists[t].url)},goDetailPage:function(e,i){t.previewImage({current:this.listImgInfo[i],urls:this.listImgInfo})},goDetailPage2:function(e,i){t.navigateTo({url:"/pages/web-view/web-view?url=".concat(this.listFJInfo[i])})},bindDateChange:function(t){this.date=t.target.value},bindDateChange2:function(t){this.date2=t.target.value},getsyr:function(){var e=this;t.request({url:"http://"+(0,a.baseIp)()+"/ams/system/distribute.htm?module=check_dept",success:function(t){var i=t.data;e.array7Info=i.object;var n=i.object.map(function(t){return t.dept_name}),a=[].concat(n);a.unshift("请选择协助调查岗"),e.array7=a}})},togglePopup:function(t){this.type=t},getpj:function(){var e=this;t.request({url:"http://"+(0,a.baseIp)()+"/ams/system/distribute.htm?module=pullDown&XLX=levelType",success:function(t){var i=t.data;e.array5Info=i.object,i=i.object.map(function(t){return t.name}),i.unshift("请选择拟初评结果"),e.array5=i}})},bindPickerChange5:function(e){this.index5=e.target.value,0!=e.target.value?this.sd=this.array5Info[e.target.value-1].code:t.showToast({title:"选择失败",icon:"none"})},getNodeList:function(){var e=this,i="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=backNodeList&piId=").concat(e.piid);t.request({url:i,success:function(t){var i=t.data;e.nodeListInfo=i.object,i.object.map(function(t){t.value=t.NAME_,t.name=t.NAME_}),e.items4=i.object}})},radioChange:function(t){for(var e=0;e<this.items.length;e++)if(this.items[e].value===t.target.value){this.current=e,this.status="tongyi"==t.target.value?1:0;break}},radioChange4:function(t){for(var e=0;e<this.items4.length;e++)if(this.items4[e].value===t.target.value){this.current4=e,console.log(this.nodeListInfo[e]," at pages\\application\\investigation5\\investigation5.vue:862"),this.tokenId=this.nodeListInfo[e].TOKENID,this.nodeId=this.nodeListInfo[e].NODEID,this.tiid=this.nodeListInfo[e].TIID;break}},radioChange5:function(t){for(var e=0;e<this.items5.length;e++)if(this.items5[e].value===t.target.value){this.current5=e,this.votiStatus="tongyi"==t.target.value?1:0;break}},bindPickerChange2:function(e){this.index2=e.target.value,0!=e.target.value?(this.inveder=String(this.array2Info[e.target.value-1].id),console.log(this.inveder," at pages\\application\\investigation5\\investigation5.vue:886")):t.showToast({title:"请重新选择",icon:"none"})},radioChange2:function(t){for(var e=0;e<this.items2.length;e++)if(this.items2[e].value===t.target.value){this.current2=e;break}},radioChange3:function(t){for(var e=0;e<this.items3.length;e++)if(this.items3[e].value===t.target.value){this.current3=e;break}},bindPickerChange7:function(e){var i=this;this.index7=e.target.value,0!=e.target.value?t.request({url:"http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=check_person&dept_id=").concat(i.array7Info[e.target.value].id-1),success:function(e){var n=e.data;if(0==n.object.length)t.showToast({title:"选择失败，请重新选择！"}),i.array7_1=[],i.businessData.userIds="";else{i.array7_1Info=n.object,t.showToast({title:"请选择具体信息",icon:"none"});var a=n.object.map(function(t){return t.dept_name});i.array7_1=a,i.tprList.push({name:i.array7_1Info[0].dept_name,code:i.array7_1Info[0].id})}}}):t.showToast({title:"选择失败",icon:"none"})},bindPickerChange7_1:function(t){this.index7_1=t.target.value,this.tprList.push({name:this.array7_1Info[t.target.value].dept_name,code:this.array7_1Info[t.target.value].id})},doVote:function(){if(0!=this.votiStatus){t.showLoading({title:"投票中",mask:!0});var e=this,i="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=saveVote2_YD&userId=").concat((0,o.getUserInfo)().userId,"&status=").concat(e.votiStatus,"&comment=").concat(e.votiOpinion,"&taskInstanceId=").concat(e.tiid,"&acceptId=").concat(e.acceptid,"&docId=").concat(e.doc_id,"&tokenName=").concat(e.inve,"&pdid=").concat(e.pdid,"&nodeCode=").concat(e.nodecode);console.log(i," at pages\\application\\investigation5\\investigation5.vue:954"),t.request({url:i,success:function(i){var n=i.data;1==n.code&&(e.isvoti=!0,e.pageActive=!e.pageActive,t.hideLoading(),t.showToast({title:n.message,duration:3e3,mask:!0}),setTimeout(function(){t.reLaunch({url:"/pages/tabBar/information/information"})},3e3))}})}else t.showToast({title:"请投票，并填写投票意见！",icon:"none"})},delList:function(t){this.tprList.splice(t.target.dataset.value,1)},downEnclosure:function(){0==this.Enclosure.length?t.showToast({title:"暂无附件",icon:"none"}):console.log("有附件"," at pages\\application\\investigation5\\investigation5.vue:983")},back:function(){if(console.log(this.tokenId," at pages\\application\\investigation5\\investigation5.vue:988"),""!==this.tokenId){var e=this,i="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=goBack&userId=").concat((0,o.getUserInfo)().userId,"&pdId=").concat(e.pdid,"&tiId=").concat(e.tiid,"&nodeId=").concat(e.nodeId,"&piId=").concat(e.piid,"&tokenId=").concat(e.tokenId,"&docId=").concat(e.doc_id,"&backReasion=").concat(e.backReasion,"&tokenName2=").concat(e.inve);console.log(i," at pages\\application\\investigation5\\investigation5.vue:997"),t.showLoading({title:"退回中",mask:!0}),t.request({url:i,success:function(e){var i=e.data;console.log(e," at pages\\application\\investigation5\\investigation5.vue:1003"),1==i.code&&(t.hideLoading(),t.showToast({title:i.message,mask:!0,duration:3e3}),setTimeout(function(){t.reLaunch({url:"/pages/tabBar/information/information?isRefresh=true"})},3e3))}})}else t.showToast({title:"请选择退回节点",icon:"none"})},submitAcce:function(){var e=this,i="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=approveYX_YD&userId=").concat((0,o.getUserInfo)().userId,"&taskInstanceId=").concat(e.tiid,"&mainId=").concat(e.mianId,"&pdId=").concat(e.pdid,"&piId=").concat(e.piid,"&docId=").concat(e.doc_id,"&comment=").concat(e.comment,"&status=").concat(e.status,"&userIds=").concat(e.inveder,"&acceptId=").concat(e.acceptid);if("分网点审查（一般新增）"==this.inve){if(this.tprList.length<2||this.tprList.length>3)return void t.showToast({title:"请选择两个或三个投票人",icon:"none"});this.tprList=(0,n.deteleObject)(this.tprList);var s=[];this.tprList.map(function(t){s.push(t.code)}),this.inveder=s.join(",");e=this,i="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=approveYX_YD&userId=").concat((0,o.getUserInfo)().userId,"&taskInstanceId=").concat(e.tiid,"&mainId=").concat(e.mianId,"&pdId=").concat(e.pdid,"&piId=").concat(e.piid,"&docId=").concat(e.doc_id,"&comment=").concat(e.comment,"&status=").concat(e.status,"&userIds=").concat(e.inveder,"&acceptId=").concat(e.acceptid)}if("分网点审议（一般新增）"==this.inve){if(!this.isvoti)return void t.showToast({title:"请先投票！",icon:"none"});if(this.dataInfo.yj_num!=this.dataInfo.zg_num)return void t.showToast({title:"投票未结束！",icon:"none"})}if("投票"==this.inve){if(this.thistp)return void t.showToast({title:"您已投过票了！",icon:"none"});e=this,i="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=saveVote2_YD&userId=").concat((0,o.getUserInfo)().userId,"&status=").concat(e.status,"&comment=").concat(e.comment,"&taskInstanceId=").concat(e.tiid,"&acceptId=").concat(e.acceptid,"&docId=").concat(e.doc_id,"&tokenName=").concat(e.inve,"&pdid=").concat(e.pdid,"&nodeCode=").concat(e.nodecode)}if("县审查"==this.inve){if(this.tprList.length<2||this.tprList.length>3)return void t.showToast({title:"请选择两个或三个投票人",icon:"none"});this.tprList=(0,n.deteleObject)(this.tprList);s=[];this.tprList.map(function(t){s.push(t.code)}),this.inveder=s.join(",");e=this,i="http://".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=approveYX_YD&userId=").concat((0,o.getUserInfo)().userId,"&taskInstanceId=").concat(e.tiid,"&mainId=").concat(e.mianId,"&pdId=").concat(e.pdid,"&piId=").concat(e.piid,"&docId=").concat(e.doc_id,"&comment=").concat(e.comment,"&status=").concat(e.status,"&userIds=").concat(e.inveder,"&acceptId=").concat(e.acceptid)}if("县审议"==this.inve){if(!this.isvoti)return void t.showToast({title:"请先投票！",icon:"none"});if(this.dataInfo.yj_num!=this.dataInfo.zg_num)return void t.showToast({title:"投票未结束！",icon:"none"})}t.showLoading({title:"提交中",mask:!0}),console.log(i," at pages\\application\\investigation5\\investigation5.vue:1087"),t.request({url:i,success:function(e){var i=e.data;1==i.code?(t.hideLoading(),t.showToast({title:i.message,duration:3e3,mask:!0}),setTimeout(function(){t.reLaunch({url:"/pages/tabBar/information/information"})},3e3)):2==i.code&&t.showToast({title:i.message,icon:"none",duration:3e3,mask:!0})},fail:function(t){console.log(t," at pages\\application\\investigation5\\investigation5.vue:1104")}})}}};e.default=d}).call(this,i("6e42")["default"])},7824:function(t,e,i){"use strict";var n=i("f538"),a=i.n(n);a.a},8920:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},bc68:function(t,e,i){"use strict";i.r(e);var n=i("8920"),a=i("d9ec");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("7824");var s=i("2877"),c=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},d9ec:function(t,e,i){"use strict";i.r(e);var n=i("065c"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},f538:function(t,e,i){}},[["df5b","common/runtime","common/vendor"]]]);