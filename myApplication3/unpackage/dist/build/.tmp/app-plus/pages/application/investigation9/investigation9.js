(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/investigation9/investigation9"],{2671:function(t,e,i){"use strict";i.r(e);var a=i("8c09"),n=i("b0c1");for(var c in n)"default"!==c&&function(t){i.d(e,t,function(){return n[t]})}(c);i("549d");var o=i("2877"),s=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=s.exports},"549d":function(t,e,i){"use strict";var a=i("6838"),n=i.n(a);n.a},6838:function(t,e,i){},"72d6":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("43fa"),n=i("8938"),c={data:function(){return{now:"",inve:"",items:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current:1,tiid:"",pdId:"",piid:"",deptId:"",doc_id:"",status:0,mianId:"",comment:"",dataInfo:{}}},onNavigationBarButtonTap:function(e){t.navigateBack()},onLoad:function(t){this.acceptid=t.acceptid,this.tiid=t.tiid,this.pdid=t.pdid,this.piid=t.piid,this.doc_id=t.doc_id,this.deptId=t.deptId,this.getnode(),this.getData()},methods:{getnode:function(){var e="".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=approveDocView_YD&userID=").concat((0,n.getUserInfo)().userName,"&deptID=").concat(this.deptId,"&acceptId=").concat(this.acceptid,"&pdId=").concat(this.pdid,"&tiId=").concat(this.tiid,"&piId=").concat(this.piid,"&docId=").concat(this.doc_id,"&hr=true"),i=this;t.request({url:e,success:function(e){var a=e.data;t.setNavigationBarTitle({title:a.tokenName}),i.inve=a.tokenName}})},getData:function(){var e="".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=allInfoView_YD&acceptId=").concat(this.acceptid,"&tiId=").concat(this.tiid,"&pdId=").concat(this.pdid,"&hr=true"),i=this;t.request({url:e,success:function(e){var a=e.data;a.out_type="1"==a.leaveType?"事假":"2"==a.leaveType?"病假":"3"==a.leaveType?"婚假":"4"==a.leaveType?"丧假":"5"==a.leaveType?"产假":"5"==a.leaveType?"公假":"",i.dataInfo=a,t.hideLoading()}})},radioChange:function(t){for(var e=0;e<this.items.length;e++)if(this.items[e].value===t.target.value){this.current=e,this.status="tongyi"==t.target.value?1:0;break}},submitAcce:function(){var e="".concat((0,a.baseIp)(),"/ams/system/distribute.htm?module=approveDoc_YD&acceptId=").concat(this.acceptid,"&taskInstanceId=").concat(this.tiid,"&pdId=").concat(this.pdid,"&docId=").concat(this.doc_id,"&piId=").concat(this.piid,"&userId=").concat((0,n.getUserInfo)().userName,"&userId=").concat((0,n.getUserInfo)().userName,"&comment=").concat(this.comment,"&status=").concat(this.status,"&hr=true");t.showLoading({title:"提交中",mask:!0}),t.request({url:e,success:function(e){var i=e.data;1==i.code?(t.hideLoading(),t.showToast({title:i.message,duration:3e3,mask:!0}),setTimeout(function(){t.reLaunch({url:"/pages/tabBar/information/information"})},3e3)):t.showToast({title:i.message,icon:"none",duration:3e3,mask:!0})},fail:function(t){console.log(t," at pages\\application\\investigation9\\investigation9.vue:173")}})}}};e.default=c}).call(this,i("6e42")["default"])},"8c09":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},b0c1:function(t,e,i){"use strict";i.r(e);var a=i("72d6"),n=i.n(a);for(var c in a)"default"!==c&&function(t){i.d(e,t,function(){return a[t]})}(c);e["default"]=n.a}},[["7aa1","common/runtime","common/vendor"]]]);