(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/business/business"],{"029b":function(e,t,a){},"16fd":function(e,t,a){"use strict";a.r(t);var s=a("bd98"),i=a("2273");for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);var r=a("2877"),o=Object(r["a"])(i["default"],s["a"],s["b"],!1,null,null,null);t["default"]=o.exports},2273:function(e,t,a){"use strict";a.r(t);var s=a("3022"),i=a.n(s);for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);t["default"]=i.a},3022:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"tki-file-manager",props:{},data:function(){return{}},methods:{_openFile:function(){if("android"!=plus.os.name.toLowerCase())return e.showModal({title:"提示",content:"仅支持Android平台",success:function(e){}}),!1;var t=this,a=plus.android.runtimeMainActivity(),s=plus.android.importClass("android.content.Intent"),i=new s(s.ACTION_GET_CONTENT);i.setType("*/*"),i.addCategory(s.CATEGORY_OPENABLE),a.startActivityForResult(i,1),a.onActivityResult=function(e,s,i){var n=plus.android.importClass("android.app.Activity"),r=(plus.android.importClass("android.content.ContentUris"),plus.android.importClass("android.database.Cursor"),plus.android.importClass("android.net.Uri"),plus.android.importClass("android.os.Build")),o=plus.android.importClass("android.os.Environment"),u=plus.android.importClass("android.provider.DocumentsContract"),l=plus.android.importClass("android.provider.MediaStore"),c=a.getContentResolver();plus.android.importClass(c);var d="";if(s==n.RESULT_OK){var v=i.getData();if("file"==v.getScheme().toLowerCase())return void(d=v.getPath());d=r.VERSION.SDK_INT>r.VERSION_CODES.KITKAT?m(this,v):f(v),t.$emit("result",d)}function m(e,t){var a=r.VERSION.SDK_INT>=r.VERSION_CODES.KITKAT,s=t.getScheme().toLowerCase();if(a&&u.isDocumentUri(e,t)){if(h(t)){var i=u.getDocumentId(t),n=i.split(":"),c=n[0];return"primary"==c.toLowerCase()?o.getExternalStorageDirectory()+"/"+n[1]:"/storage/"+c+"/"+n[1]}if(_(t)){var d=u.getDocumentId(t),v=d.split(":");return v[1]}if(b(t)){var m=u.getDocumentId(t),f=m.split(":"),g=f[0],y=null;"image"==g.toLowerCase()?y=l.Images.Media.EXTERNAL_CONTENT_URI:"video"==g.toLowerCase()?y=l.Video.Media.EXTERNAL_CONTENT_URI:"audio"==g.toLowerCase()&&(y=l.Audio.Media.EXTERNAL_CONTENT_URI);var w="_id=?",C=[f[1]];return p(e,y,w,C)}}else{if("content"==s)return p(e,t,null,null);if("file"==s)return t.getPath()}}function f(e){var t=null,a=[l.Images.Media.DATA],s=c.query(e,a,null,null,null);if(null!=s&&s.moveToFirst()){var i=s.getColumnIndexOrThrow(l.Images.Media.DATA);t=s.getString(i),s.close()}return t}function p(e,t,a,s){var i=null,n="_data",r=[n];if(i=c.query(t,r,a,s,null),null!=i&&i.moveToFirst()){var o=i.getColumnIndexOrThrow(n);return i.getString(o)}}function h(e){return"com.android.externalstorage.documents"==e.getAuthority()}function _(e){return"com.android.providers.downloads.documents"==e.getAuthority()}function b(e){return"com.android.providers.media.documents"==e.getAuthority()}}}},onLoad:function(){}};t.default=a}).call(this,a("6e42")["default"])},"455b":function(e,t,a){"use strict";a.r(t);var s=a("9914"),i=a.n(s);for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);t["default"]=i.a},"5bee":function(e,t,a){"use strict";var s=a("029b"),i=a.n(s);i.a},"6afc":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"business"},[a("view",{staticClass:"business-excessive"},[a("view",{staticClass:"must"},[e._v("申请名称")]),a("view",{staticClass:"uni-list-cell"},[a("view",{staticClass:"uni-list-cell-left"},[e._v("请选择申报名称")]),a("view",{staticClass:"uni-list-cell-db"},[a("picker",{attrs:{value:e.index,range:e.array,eventid:"1e6a5892-0"},on:{change:e.bindPickerChange}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array[e.index]))])])],1)])]),a("view",{staticClass:"business-form"},[a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("业务名称")]),a("input",{attrs:{type:"text",disabled:"",value:e.businessData.businessName,placeholder:"请输入业务名称"}})]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("业务机构")]),a("input",{attrs:{type:"text",disabled:"",value:e.businessData.businessMechanism,placeholder:"请输入业务机构"}})]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("业务类型")]),a("input",{attrs:{type:"text",disabled:"",value:e.businessData.symboltablecode,placeholder:"请输入业务类型"}})]),a("view",{staticClass:"item"},[a("view",{staticClass:"text must"},[e._v("客户名称")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.businessData.customer_name,expression:"businessData.customer_name"}],attrs:{type:"text",disabled:e.isdis,placeholder:"请输入客户名称",eventid:"1e6a5892-1"},domProps:{value:e.businessData.customer_name},on:{input:function(t){t.target.composing||(e.businessData.customer_name=t.target.value)}}}),e.isdis?e._e():a("button",{staticClass:"js",attrs:{eventid:"1e6a5892-2"},on:{click:e.retrieval}},[e._v("检索")]),a("uni-popup",{attrs:{show:"middle-list"===e.type,position:"middle",mode:"fixed",eventid:"1e6a5892-4",mpcomid:"1e6a5892-0"},on:{hidePopup:function(t){e.togglePopup("")}}},[a("scroll-view",{staticClass:"uni-center center-box",attrs:{"scroll-y":!0}},e._l(e.list,function(t,s){return a("view",{key:s,staticClass:"uni-list-item",attrs:{eventid:"1e6a5892-3-"+s},on:{click:function(a){e.getName(t,s)}}},[e._v(e._s(t))])}))],1)],1),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("客户号")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.businessData.customer_id,expression:"businessData.customer_id"}],attrs:{type:"text",disabled:"",eventid:"1e6a5892-5"},domProps:{value:e.businessData.customer_id},on:{input:function(t){t.target.composing||(e.businessData.customer_id=t.target.value)}}})]),a("view",{staticClass:"item"},[a("view",{staticClass:"uni-list-cell-left text must"},[e._v("客户类型")]),a("view",{staticClass:"uni-list-cell-db"},[a("picker",{attrs:{value:e.index2,range:e.array2,eventid:"1e6a5892-6"},on:{change:e.bindPickerChange2}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array2[e.index2]))])])],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"text must"},[e._v("实际控制人")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.businessData.controlPer,expression:"businessData.controlPer"}],attrs:{type:"text",placeholder:"请输入实际控制人",eventid:"1e6a5892-7"},domProps:{value:e.businessData.controlPer},on:{input:function(t){t.target.composing||(e.businessData.controlPer=t.target.value)}}})]),a("view",{staticClass:"item"},[a("view",{staticClass:"uni-list-cell-left text must"},[e._v("营销责任人")]),a("view",{staticClass:"uni-list-cell-db"},[a("picker",{attrs:{value:e.index3,range:e.array3,eventid:"1e6a5892-8"},on:{change:e.bindPickerChange3}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array3[e.index3]))])]),0!=e.array3_1.length?a("picker",{attrs:{value:e.index3_1,range:e.array3_1,eventid:"1e6a5892-9"},on:{change:e.bindPickerChange3_1}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array3_1[e.index3_1]))])]):e._e()],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"uni-list-cell-left text must"},[e._v("评级模型")]),a("view",{staticClass:"uni-list-cell-db"},[a("picker",{attrs:{value:e.index4,range:e.array4,eventid:"1e6a5892-10"},on:{change:e.bindPickerChange4}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array4[e.index4]))])])],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"uni-list-cell-left text must"},[e._v("拟初评结果")]),a("view",{staticClass:"uni-list-cell-db"},[a("picker",{attrs:{value:e.index5,range:e.array5,eventid:"1e6a5892-11"},on:{change:e.bindPickerChange5}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array5[e.index5]))])])],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"uni-list-cell-left text must"},[e._v("上季度拟初评结果")]),a("view",{staticClass:"uni-list-cell-db"},[a("picker",{attrs:{value:e.index6,range:e.array6,eventid:"1e6a5892-12"},on:{change:e.bindPickerChange6}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array6[e.index6]))])])],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("申请日期")]),a("input",{attrs:{type:"text",disabled:"",value:e.businessData.applay_date,placeholder:"请输入申请日期"}})]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("申请理由")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.businessData.applay_reason,expression:"businessData.applay_reason"}],attrs:{type:"text",placeholder:"请输入申请理由",eventid:"1e6a5892-13"},domProps:{value:e.businessData.applay_reason},on:{input:function(t){t.target.composing||(e.businessData.applay_reason=t.target.value)}}})]),a("view",{staticClass:"item"},[a("view",{staticClass:"uni-list-cell-left text must"},[e._v("协助调查岗")]),a("view",{staticClass:"uni-list-cell-db"},[a("picker",{attrs:{value:e.index7,range:e.array7,eventid:"1e6a5892-14"},on:{change:e.bindPickerChange7}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array7[e.index7]))])]),0!=e.array7_1.length?a("picker",{attrs:{value:e.index7_1,range:e.array7_1,eventid:"1e6a5892-15"},on:{change:e.bindPickerChange7_1}},[a("view",{staticClass:"uni-input"},[e._v(e._s(e.array7_1[e.index7_1]))])]):e._e()],1)]),a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("资料上传")]),a("input",{attrs:{disabled:"",type:"text",placeholder:"附件上传",eventid:"1e6a5892-16"},on:{tap:e.openFile}}),a("tki-file-manager",{ref:"filemanager",attrs:{eventid:"1e6a5892-17",mpcomid:"1e6a5892-1"},on:{result:e.resultPath}})],1),0!=e.path.length?a("view",{staticClass:"item"},[a("view",{staticClass:"text"},[e._v("资料列表")]),a("view",{staticClass:"textarea"},e._l(e.path,function(t,s){return a("view",{key:s,staticClass:"item-list"},[a("view",{staticClass:"desc"},[e._v(e._s(t))]),a("view",{staticClass:"del",attrs:{"data-value":s,eventid:"1e6a5892-18-"+s},on:{click:e.delList}},[e._v("删除")])])}))]):e._e()]),a("view",{staticClass:"btns"},[a("button",{attrs:{type:"warn"}},[e._v("附件上传")]),a("button",{attrs:{type:"primary",eventid:"1e6a5892-19"},on:{click:e.submitAcce}},[e._v("提交受理")])],1)])},i=[];a.d(t,"a",function(){return s}),a.d(t,"b",function(){return i})},"92e7":function(e,t,a){"use strict";a("e716");var s=n(a("b0ce")),i=n(a("967a"));function n(e){return e&&e.__esModule?e:{default:e}}Page((0,s.default)(i.default))},"967a":function(e,t,a){"use strict";a.r(t);var s=a("6afc"),i=a("455b");for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);a("5bee");var r=a("2877"),o=Object(r["a"])(i["default"],s["a"],s["b"],!1,null,null,null);t["default"]=o.exports},9914:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a("43ce"),i=u(a("b072")),n=u(a("16fd")),r=a("33bf"),o=a("1ea5");function u(e){return e&&e.__esModule?e:{default:e}}var l={components:{tkiFileManager:n.default,uniPopup:i.default},data:function(){return{index:0,array:[],arrayInfo:[],index2:0,array2:[],array2Info:[],index3:0,array3:[],array3Info:[],index3_1:0,array3_1:[],array3_1Info:[],index4:0,array4:[],array4Info:[],index5:0,array5:[],array5Info:[],index6:0,array6:[],array6Info:[],index7:0,array7:[],array7Info:[],index7_1:0,array7_1:[],array7_1Info:[],isdis:!1,businessData:{title:"",businessName:"评级认定审批",businessMechanism:"孝义农商行全辖汇总",symboltablecode:"评级",customer_name:"",customer_id:"",cust_type:"",controlPer:"",evaluate_modle:"",first_level:"",applay_date:"",applay_reason:"",userIds:"",userIds2:"",lastLevel:""},type:"",getUserInfo:[],list:[],path:[],userIds:"",seq:"",ishold:!1}},onNavigationBarButtonTap:function(e){this.isKeep()},onLoad:function(){this.businessData.applay_date=(0,r.formateDate)(new Date,"Y-M-D");var t=this;e.request({url:"http://"+(0,s.baseIp)()+"/ams/system/distribute.htm?module=pullDown&XLX=sbType",success:function(e){var a=e.data;t.arrayInfo=a.object,a=a.object.map(function(e){return e.name}),t.array=a,t.businessData.title=t.arrayInfo[0].code}}),e.request({url:"http://"+(0,s.baseIp)()+"/ams/system/distribute.htm?module=pullDown&XLX=customerType",success:function(e){var a=e.data;t.array2Info=a.object,a=a.object.map(function(e){return e.name}),a.unshift("请选择客户类型"),t.array2=a}}),e.request({url:"http://"+(0,s.baseIp)()+"/ams/system/distribute.htm?module=pullDown&XLX=level_modle",success:function(e){var a=e.data;t.array4Info=a.object,a=a.object.map(function(e){return e.name}),a.unshift("请选择拟初评结果"),t.array4=a}}),e.request({url:"http://"+(0,s.baseIp)()+"/ams/system/distribute.htm?module=pullDown&XLX=levelType",success:function(e){var a=e.data;t.array6Info=t.array5Info=a.object,a=a.object.map(function(e){return e.name});var s=[].concat(a);a.unshift("请选择拟初评结果"),s.unshift("请选择上季度拟初评结果"),t.array5=a,t.array6=s}}),e.request({url:"http://"+(0,s.baseIp)()+"/ams/system/distribute.htm?module=check_dept",success:function(e){var a=e.data;t.array3Info=t.array7Info=a.object;var s=a.object.map(function(e){return e.dept_name}),i=[].concat(s);s.unshift("请选择营销责任人"),t.array3=s,i.unshift("请选择协助调查岗"),t.array7=i}})},beforeDestroy:function(){return!1},methods:{bindPickerChange:function(e){this.index=e.target.value,this.businessData.title=this.arrayInfo[e.target.value].code},bindPickerChange2:function(t){this.index2=t.target.value,0!=t.target.value?this.businessData.cust_type=this.array2Info[t.target.value-1].code:e.showToast({title:"选择失败",icon:"none"})},bindPickerChange3:function(t){var a=this;this.index3=t.target.value,0!=t.target.value?e.request({url:"http://".concat((0,s.baseIp)(),"/ams/system/distribute.htm?module=check_person&dept_id=").concat(a.array3Info[t.target.value].id-1),success:function(t){var s=t.data;if(0==s.object.length)e.showToast({title:"选择失败，请重新选择！",icon:"none"}),a.index3=0,a.array3_1=[],a.businessData.userIds2="";else{a.array3_1Info=s.object,e.showToast({title:"请选择具体信息",icon:"none"});var i=s.object.map(function(e){return e.dept_name});a.array3_1=i,a.businessData.userIds2=String(a.array3_1Info[a.index3_1].id)}}}):e.showToast({title:"选择失败",icon:"none"})},bindPickerChange3_1:function(e){this.index3_1=e.target.value,this.businessData.userIds2=String(this.array3_1Info[this.index3_1].id)},bindPickerChange4:function(t){this.index4=t.target.value,0!=t.target.value?this.businessData.evaluate_modle=this.array4Info[t.target.value-1].code:e.showToast({title:"选择失败",icon:"none"})},bindPickerChange5:function(t){this.index5=t.target.value,0!=t.target.value?this.businessData.first_level=this.array5Info[t.target.value-1].code:e.showToast({title:"选择失败",icon:"none"})},bindPickerChange6:function(t){this.index6=t.target.value,0!=t.target.value?this.businessData.lastLevel=this.array6Info[t.target.value-1].code:e.showToast({title:"选择失败",icon:"none"})},bindPickerChange7:function(t){var a=this;this.index7=t.target.value,0!=t.target.value?e.request({url:"http://".concat((0,s.baseIp)(),"/ams/system/distribute.htm?module=check_person&dept_id=").concat(a.array3Info[t.target.value].id-1),success:function(t){var s=t.data;if(0==s.object.length)e.showToast({title:"选择失败，请重新选择！"}),a.array7_1=[],a.businessData.userIds="";else{a.array7_1Info=s.object,e.showToast({title:"请选择具体信息",icon:"none"});var i=s.object.map(function(e){return e.dept_name});a.array7_1=i,a.businessData.userIds=String(a.array7_1Info[a.index7_1].id)}}}):e.showToast({title:"选择失败",icon:"none"})},bindPickerChange7_1:function(e){this.index7_1=e.target.value,this.businessData.userIds=String(this.array7_1Info[this.index7_1].id)},togglePopup:function(e){this.type=e},submitAcce:function(){if(this.ishold){var t=this;e.showLoading({title:"提交中",mask:!0}),e.request({url:"http://".concat((0,s.baseIp)(),"/ams/system/distribute.htm?module=submitApp&id=").concat(t.seq,"&userIds=").concat(t.userIds),success:function(t){var a=t.data;e.hideLoading(),1==a.code&&(e.showToast({title:a.message,duration:3e3,mask:!0}),setTimeout(function(){e.reLaunch({url:"/pages/tabBar/information/information?isRefresh=true"})},3e3))},fail:function(e){console.log(e)}})}else e.showModal({title:"您还没有保存",content:"您还没有保存数据，请先保存！",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})},getName:function(e,t){this.businessData.customer_name=this.getUserInfo[t].customer_name,this.businessData.customer_id=this.getUserInfo[t].customer_id,this.type="",this.isdis=!0},openFile:function(){this.$refs.filemanager._openFile()},resultPath:function(e){this.path.push(e)},delList:function(e){this.path.splice(e.target.dataset.value,1)},retrieval:function(){var t=this;if(""==this.businessData.customer_name)e.showToast({title:"请输入客户名称",duration:2e3,icon:"none"});else{e.showLoading({title:"检索中",mask:!0});var a="http://".concat((0,s.baseIp)(),"/ams/system/distribute.htm?module=checkCustomer&customerName=").concat(t.businessData.customer_name);e.request({url:a,success:function(a){e.hideLoading();var s=a.data;if(0==s.object.length)t.type="",t.list=s.object,e.showToast({title:"暂无数据"});else{t.getUserInfo=s.object;var i=s.object.map(function(e){return e.customer_name});t.type="middle-list",t.list=i}},fail:function(t){console.log(t),e.hideLoading()}})}},isKeep:function(){if(""!=this.businessData.customer_name)if(""!=this.businessData.customer_id)if(""!=this.businessData.cust_type)if(""!=this.businessData.controlPer)if(""!=this.businessData.userIds2)if(""!=this.businessData.evaluate_modle)if(""!=this.businessData.first_level)if(""!=this.businessData.lastLevel)if(""!=this.businessData.applay_date)if(""!=this.businessData.userIds){var t=this.businessData;t.user_id=String((0,o.getUserInfo)().userId),t.bus_code="",delete t.businessMechanism,delete t.businessName;var a="http://".concat((0,s.baseIp)(),'/ams/system/distribute.htm?module=saveBusiness&business={user_id:"').concat(t.user_id,'", title:"').concat(t.title,'",symboltablecode:"01",customer_name:"').concat(t.customer_name,'",customer_id:"').concat(t.customer_id,'",cust_type:"').concat(t.cust_type,'",bus_code:"').concat(t.bus_code,'",evaluate_modle:"').concat(t.evaluate_modle,'",first_level:"').concat(t.first_level,'",applay_date:"').concat(t.applay_date,'",applay_reason:"').concat(t.applay_reason,'",userIds:"').concat(t.userIds,'",userIds2:"').concat(t.userIds2,'",lastLevel:"').concat(t.lastLevel,'",controlPer:"').concat(t.controlPer,'"}'),i=this;e.showModal({title:"是否保存",content:"您还没有保存数据，是否保存？",success:function(t){t.confirm&&(e.showLoading({title:"保存中",mask:!0}),e.request({url:a,success:function(t){var a=t.data;1==a.code&&(e.showToast({title:"请及时提交!",mask:!0,duration:2e3}),i.userIds=a.object.userIds,i.ishold=!0,i.seq=a.object.seq),e.hideLoading()},fail:function(t){console.log(t),e.hideLoading()}}))}})}else e.showToast({title:"请选择协助调查岗",icon:"none"});else e.showToast({title:"请选择审评时间",icon:"none"});else e.showToast({title:"请选择上季度拟初评结果",icon:"none"});else e.showToast({title:"请选择拟初评结果",icon:"none"});else e.showToast({title:"请选择评级模型",icon:"none"});else e.showToast({title:"请选择营销责任人",icon:"none"});else e.showToast({title:"请填写实际控制人",icon:"none"});else e.showToast({title:"请选择客户类型",icon:"none"});else e.showToast({title:"请检索客户id",icon:"none"});else e.showToast({title:"请检索客户名称",icon:"none"})}}};t.default=l}).call(this,a("6e42")["default"])},bd98:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view")},i=[];a.d(t,"a",function(){return s}),a.d(t,"b",function(){return i})}},[["92e7","common/runtime","common/vendor"]]]);