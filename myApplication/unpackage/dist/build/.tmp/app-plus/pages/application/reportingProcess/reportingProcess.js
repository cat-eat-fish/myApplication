(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/reportingProcess/reportingProcess"],{"450c":function(e,t,a){"use strict";a.r(t);var s=a("9c5e"),i=a("e996");for(var o in i)"default"!==o&&function(e){a.d(t,e,function(){return i[e]})}(o);a("c6ee");var n=a("2877"),c=Object(n["a"])(i["default"],s["a"],s["b"],!1,null,null,null);t["default"]=c.exports},"64d0":function(e,t,a){},"9c5e":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"reportingProcess"},[a("view",{staticClass:"reportingProcess-form"},[a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("用途 :")]),a("view",{staticClass:"field ra first"},[a("radio-group",{staticClass:"group first",attrs:{eventid:"9da0ec9c-0",mpcomid:"9da0ec9c-0"},on:{change:e.radioChange}},e._l(e.items,function(t,s){return a("label",{key:s,staticClass:"uni-list-cell uni-list-cell-pd"},[a("view",[a("radio",{attrs:{value:t.code,checked:s===e.current}})],1),a("view",[e._v(e._s(t.name))])])}))],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("客户类型 :")]),a("view",{staticClass:"field ra"},[a("radio-group",{staticClass:"group",attrs:{eventid:"9da0ec9c-1",mpcomid:"9da0ec9c-1"},on:{change:e.radioChange2}},e._l(e.items2,function(t,s){return a("label",{key:s,staticClass:"uni-list-cell uni-list-cell-pd"},[a("view",[a("radio",{attrs:{value:t.name,checked:s===e.current2}})],1),a("view",[e._v(e._s(t.name))])])}))],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("证件类型 :")]),a("view",{staticClass:"field ra"},[a("radio-group",{staticClass:"group",attrs:{eventid:"9da0ec9c-2",mpcomid:"9da0ec9c-2"},on:{change:e.radioChange5}},e._l(e.items5,function(t,s){return a("label",{key:s,staticClass:"uni-list-cell uni-list-cell-pd"},[a("view",[a("radio",{attrs:{value:t.name,checked:s===e.current5}})],1),a("view",[e._v(e._s(t.name))])])}))],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("客户名称 :")]),a("view",{staticClass:"field"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.dataInfo.customer_name,expression:"dataInfo.customer_name"}],attrs:{type:"text",value:"",placeholder:"请输入客户名称",eventid:"9da0ec9c-3"},domProps:{value:e.dataInfo.customer_name},on:{input:function(t){t.target.composing||(e.dataInfo.customer_name=t.target.value)}}})])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("证件号码 :")]),a("view",{staticClass:"field"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.dataInfo.certNo,expression:"dataInfo.certNo"}],attrs:{type:"text",value:"",placeholder:"请输入证件号码",eventid:"9da0ec9c-4"},domProps:{value:e.dataInfo.certNo},on:{input:function(t){t.target.composing||(e.dataInfo.certNo=t.target.value)}}})])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("申请理由 :")]),a("view",{staticClass:"field"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.dataInfo.applay_reason,expression:"dataInfo.applay_reason"}],attrs:{type:"text",value:"",placeholder:"请输入申请理由",eventid:"9da0ec9c-5"},domProps:{value:e.dataInfo.applay_reason},on:{input:function(t){t.target.composing||(e.dataInfo.applay_reason=t.target.value)}}})])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("是否有配偶 :")]),a("view",{staticClass:"field ra"},[a("radio-group",{staticClass:"group",attrs:{eventid:"9da0ec9c-6",mpcomid:"9da0ec9c-3"},on:{change:e.radioChange3}},e._l(e.items3,function(t,s){return a("label",{key:s,staticClass:"uni-list-cell uni-list-cell-pd"},[a("view",[a("radio",{attrs:{value:t.value,checked:s===e.current3}})],1),a("view",[e._v(e._s(t.name))])])}))],1)]),e.isShowOther?a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("配偶名称 :")]),a("view",{staticClass:"field"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.dataInfo.spouseName,expression:"dataInfo.spouseName"}],attrs:{type:"text",value:"",placeholder:"请输入配偶名称",eventid:"9da0ec9c-7"},domProps:{value:e.dataInfo.spouseName},on:{input:function(t){t.target.composing||(e.dataInfo.spouseName=t.target.value)}}})])]):e._e(),e.isShowOther?a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("配偶证件号 :")]),a("view",{staticClass:"field"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.dataInfo.spouseNo,expression:"dataInfo.spouseNo"}],attrs:{type:"text",value:"",placeholder:"请输入配偶证件号",eventid:"9da0ec9c-8"},domProps:{value:e.dataInfo.spouseNo},on:{input:function(t){t.target.composing||(e.dataInfo.spouseNo=t.target.value)}}})])]):e._e()]),a("view",{staticClass:"btns"},[a("button",{attrs:{type:"default",eventid:"9da0ec9c-9"},on:{click:e.goUploadPage}},[e._v("上传文件")]),a("button",{attrs:{type:"default"}},[e._v("附件列表")]),a("button",{attrs:{type:"default",eventid:"9da0ec9c-10"},on:{click:e.submitAcce}},[e._v("提交受理")])],1)])},i=[];a.d(t,"a",function(){return s}),a.d(t,"b",function(){return i})},ad7f:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a("43ce"),i=a("1ea5"),o={data:function(){return{items:[],current:0,items2:[{value:"shi",name:"个人客户"}],current2:0,items3:[{value:"1",name:"是"},{value:"0",name:"否"}],current3:0,items5:[{value:"身份证",name:"身份证"}],current5:0,isShowOther:!0,ishold:!1,seq:"",dataInfo:{userType:"",customer_name:"",certNo:"",checkForSpouse:"",spouseName:"",spouseNo:"",applay_reason:""}}},onNavigationBarButtonTap:function(e){this.isKeep()},onLoad:function(){var t=this;e.request({url:"http://"+(0,s.baseIp)()+"/ams/system/distribute.htm?module=pullDown&XLX=useType",success:function(e){var a=e.data;console.log(a),t.items=a.object,t.dataInfo.userType=t.items[t.current].code}}),this.dataInfo.checkForSpouse=this.items3[this.current2].value},methods:{radioChange:function(e){for(var t=0;t<this.items.length;t++)if(this.items[t].code===e.target.value){this.current=t,this.dataInfo.userType=this.items[t].code;break}},radioChange2:function(e){for(var t=0;t<this.items2.length;t++)if(this.items2[t].value===e.target.value){this.current2=t;break}},radioChange3:function(e){for(var t=0;t<this.items3.length;t++)if(this.items3[t].value===e.target.value){this.current3=t,1==this.current3?(this.isShowOther=!1,this.dataInfo.checkForSpouse="0"):(this.isShowOther=!0,this.dataInfo.checkForSpouse="1");break}},radioChange5:function(e){for(var t=0;t<this.items5.length;t++)if(this.items5[t].value===e.target.value){this.current5=t;break}},goUploadPage:function(){var t=this;if(this.ishold){var a=0==this.current3;e.navigateTo({url:"/pages/application/uploadData/uploadData?ishas=".concat(a,"&mainId=").concat(t.seq)})}else e.showToast({title:"请先保存数据，再上传文件！",icon:"none"})},isKeep:function(){var t=this,a=/^((d{18})|([0-9x]{18})|([0-9X]{18}))$/;if(""!=this.dataInfo.customer_name)if(""!=this.dataInfo.certNo)if(a.test(this.dataInfo.certNo)){if("1"==this.dataInfo.checkForSpouse){if(""==this.dataInfo.spouseName)return void e.showToast({title:"请输入配偶名称",icon:"none"});if(""==this.dataInfo.spouseNo)return void e.showToast({title:"请输入配偶证件号码",icon:"none"});if(!a.test(this.dataInfo.spouseNo))return void e.showToast({title:"请正确输入客户证件号",icon:"none"})}else this.dataInfo.spouseName="",this.dataInfo.spouseNo="";var o=this.dataInfo;o.userId=String((0,i.getUserInfo)().userId);var n="http://".concat((0,s.baseIp)(),'/ams/system/distribute.htm?module=saveCredit&credit={userId:"').concat(String(o.userId),'",useType:"').concat(String(o.userType),'",customer_name:"').concat(String(o.customer_name),'",certNo:"').concat(String(o.certNo),'",checkForSpouse:"').concat(String(o.checkForSpouse),'",spouseName:"').concat(String(o.spouseName),'",spouseNo:"').concat(String(o.spouseNo),'",applay_reason:"').concat(String(o.applay_reason),'"}');t=this;e.showModal({title:"是否保存",content:"您还没有保存数据，是否保存？",success:function(a){a.confirm&&(e.showLoading({title:"保存中",mask:!0}),e.request({url:n,success:function(a){var s=a.data;e.hideLoading(),1==s.code&&(t.ishold=!0,t.seq=s.object.seq,e.showToast({title:s.message}))}}))}})}else e.showToast({title:"请正确输入客户证件号",icon:"none"});else e.showToast({title:"请输入客户证件号",icon:"none"});else e.showToast({title:"请输入客户名称",icon:"none"})},submitAcce:function(){if(this.ishold){e.showLoading({title:"提交中"});var t=this;e.request({url:"http://".concat((0,s.baseIp)(),"/ams/system/distribute.htm?module=submitZX&id=").concat(t.seq,"&userId=").concat((0,i.getUserInfo)().userId),success:function(t){var a=t.data;e.hideLoading(),1==a.code&&(e.showToast({title:a.message,duration:3e3}),setTimeout(function(){e.navigateBack()},3e3))},fail:function(e){console.log(e)}})}else e.showModal({title:"您还没有保存",content:"您还没有保存数据，请先保存！",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})}}};t.default=o}).call(this,a("6e42")["default"])},c6ee:function(e,t,a){"use strict";var s=a("64d0"),i=a.n(s);i.a},e996:function(e,t,a){"use strict";a.r(t);var s=a("ad7f"),i=a.n(s);for(var o in s)"default"!==o&&function(e){a.d(t,e,function(){return s[e]})}(o);t["default"]=i.a},fce1:function(e,t,a){"use strict";a("e716");var s=o(a("b0ce")),i=o(a("450c"));function o(e){return e&&e.__esModule?e:{default:e}}Page((0,s.default)(i.default))}},[["fce1","common/runtime","common/vendor"]]]);