(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/leave2/leave2"],{"013b":function(e,t,a){"use strict";var n=a("dc24"),o=a.n(n);o.a},"11ec":function(e,t,a){"use strict";a.r(t);var n=a("54c9"),o=a("89af");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);a("013b");var s=a("2877"),c=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=c.exports},"54c9":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},8967:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("f035"),o=a("43fa"),i=a("8938"),s=function(){return a.e("components/uni-number-box/uni-number-box").then(a.bind(null,"280f"))},c={components:{uniNumberBox:s},data:function(){return{type:"",startDate:(0,n.getDate)("start"),endDate:(0,n.getDate)("end"),index:0,array:["事假","病假","婚嫁","丧假","产假","公假"],arrayInfo:[{code:1,title:"事假"},{code:2,title:"病假"},{code:3,title:"婚假"},{code:4,title:"丧假"},{code:5,title:"产假"},{code:6,title:"公假"}],name:"请假审批",dataInfo:{title:1,jg:"",name:"",station:"",bm:"",phone:"",num:0,cause:"",time:(0,n.formateDate)(new Date,"h:min"),date:(0,n.formateDate)(new Date,"Y-M-D"),endtime:(0,n.formateDate)(new Date,"h:min"),enddate:(0,n.formateDate)(new Date,"Y-M-D")},dept_id:"",seq:"",ishold:!1}},onLoad:function(){this.getBm()},methods:{bindDateChange:function(e){this.dataInfo.date=e.target.value},bindTimeChange:function(e){this.dataInfo.time=e.target.value},bindDateChange2:function(e){this.dataInfo.enddate=e.target.value},bindTimeChange2:function(e){this.dataInfo.endtime=e.target.value},bindPickerChange:function(e){this.index=e.target.value,this.dataInfo.title=this.arrayInfo[e.target.value].code},getBm:function(){var t=this,a="".concat((0,o.baseIp)(),"/ams/system/distribute.htm?module=getUserId_YD&userId=").concat((0,i.getUserInfo)().userName);e.request({url:a,success:function(e){var a=e.data.object[0];t.type=a.type,t.dataInfo.jg=t.dataInfo.bm=a.dept_name,t.dataInfo.name=a.name,t.dataInfo.phone=a.mobie,t.dataInfo.station=a.post,t.dept_id=a.dept_id}})},change:function(e){this.dataInfo.num=e},isKeep:function(){if(0!=this.dataInfo.num)if(""!=this.dataInfo.cause){var t=this.dataInfo;t.start="".concat(t.date),t.end="".concat(t.enddate);var a="".concat((0,o.baseIp)(),"/ams/system/distribute.htm?module=addLeave_YD&id=").concat((0,i.getUserInfo)().userName,"&type=").concat(this.type,"&branchId=").concat(this.dept_id,"&busType=05&name=").concat(t.name,"&position=").concat(t.station,"&mobie=").concat(t.phone,"&day=").concat(t.num,"&leaveType=").concat(t.title,"&applayDate1=").concat(t.start,"&applayDate2=").concat(t.end,"&leaveReason=").concat(t.cause,"&hr=true");console.log(a," at pages\\application\\leave2\\leave2.vue:166");var n=this;e.showModal({title:"是否保存",content:"保存后，请直接提交受理！",success:function(t){t.confirm&&(e.showLoading({title:"保存中",mask:!0}),e.request({url:a,success:function(t){e.hideLoading();var a=t.data;console.log(a," at pages\\application\\leave2\\leave2.vue:179"),1==a.code?(n.ishold=!0,n.seq=a.seq,e.showToast({title:a.message,mask:!0,duration:1500})):e.showToast({title:a.message,icon:"none",mask:!0,duration:2e3})}}))}})}else e.showToast({title:"请输入请假事由",icon:"none"});else e.showToast({title:"请选择请假天数",icon:"none"})},submitAcce:function(){if(this.ishold){e.showLoading({title:"提交中",mask:!0});var t=this,a="".concat((0,o.baseIp)(),"/ams/system/distribute.htm?module=submitLeaveMainInfo_YD&Id=").concat(t.seq,"&userId=").concat((0,i.getUserInfo)().userName,"&hr=true");e.request({url:a,success:function(t){var a=t.data;e.hideLoading(),1==a.code&&(e.showToast({title:a.message,mask:!0,duration:3e3}),setTimeout(function(){e.reLaunch({url:"/pages/tabBar/information/information"})},3e3))},fail:function(e){console.log(e," at pages\\application\\leave2\\leave2.vue:235")}})}else e.showModal({title:"您还没有保存",content:"您还没有保存数据，请先保存！",success:function(e){e.confirm?console.log("用户点击确定"," at pages\\application\\leave2\\leave2.vue:201"):e.cancel&&console.log("用户点击取消"," at pages\\application\\leave2\\leave2.vue:203")}})}}};t.default=c}).call(this,a("6e42")["default"])},"89af":function(e,t,a){"use strict";a.r(t);var n=a("8967"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},dc24:function(e,t,a){}},[["24a1","common/runtime","common/vendor"]]]);