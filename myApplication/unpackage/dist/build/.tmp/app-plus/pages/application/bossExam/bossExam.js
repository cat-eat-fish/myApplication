(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/bossExam/bossExam"],{"168d":function(t,e,s){"use strict";s.r(e);var a=s("79af"),i=s("51ed");for(var l in i)"default"!==l&&function(t){s.d(e,t,function(){return i[t]})}(l);s("17af");var n=s("2877"),v=Object(n["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=v.exports},"17af":function(t,e,s){"use strict";var a=s("36f4"),i=s.n(a);i.a},"36f4":function(t,e,s){},"51ed":function(t,e,s){"use strict";s.r(e);var a=s("e44f"),i=s.n(a);for(var l in a)"default"!==l&&function(t){s.d(e,t,function(){return a[t]})}(l);e["default"]=i.a},"79af":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"bossExam"},[s("view",{staticClass:"bossQuery-title"},[t._v("受理详细信息")]),t._m(0),s("view",{staticClass:"bossQuery-title"},[t._v("查询信息")]),s("view",{staticClass:"bossExam-form form2"},[t._m(1),t._m(2),s("view",{staticClass:"btns"},[s("button",{attrs:{type:"default"}},[t._v("附件下载")]),s("button",{attrs:{type:"default"}},[t._v("提交")])],1)])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"bossExam-form form1"},[s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("申请人 :")]),s("view",{staticClass:"field"},[t._v("system")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("用途 :")]),s("view",{staticClass:"field"},[t._v("贷前调查")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("客户类型 :")]),s("view",{staticClass:"field"},[t._v("个人客户")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("客户名称 :")]),s("view",{staticClass:"field"},[t._v("张三三")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("证件类型 :")]),s("view",{staticClass:"field"},[t._v("居民身份证（例）")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("证件号码 :")]),s("view",{staticClass:"field"},[t._v("******************（例）")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("是否有配偶 :")]),s("view",{staticClass:"field"},[t._v("是")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("配偶名称 :")]),s("view",{staticClass:"field"},[t._v("李四")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("配偶证件号码 :")]),s("view",{staticClass:"field"},[t._v("******************（例）")])]),s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("资料列表 :")]),s("view",{staticClass:"field"})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"item"},[s("view",{staticClass:"text"},[t._v("上传资料 :")]),s("view",{staticClass:"field"},[s("input",{attrs:{type:"text",placeholder:"请点击上传",value:""}})]),s("view",{staticClass:"upload"},[t._v("上传")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"item"},[s("view",{staticClass:"text x"},[t._v("征信报告编码 :")]),s("view",{staticClass:"field"},[s("input",{attrs:{type:"text",placeholder:"请输入报告编码",value:""}})])])}];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i})},"7d12":function(t,e,s){"use strict";s("e716");var a=l(s("b0ce")),i=l(s("168d"));function l(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},e44f:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a(s("43ce"));function a(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{items:[{value:"tongyi",name:"同意"},{value:"butongyi",name:"不同意"}],current:0,items2:[{value:"shi",name:"是"},{value:"fou",name:"否"}],current2:0,items3:[{value:"shi",name:"是"},{value:"fou",name:"否"}],current3:0}},onNavigationBarButtonTap:function(t){console.log(1)},methods:{radioChange:function(t){for(var e=0;e<this.items.length;e++)if(this.items[e].value===t.target.value){this.current=e;break}},radioChange2:function(t){for(var e=0;e<this.items2.length;e++)if(this.items2[e].value===t.target.value){this.current2=e;break}},radioChange3:function(t){for(var e=0;e<this.items3.length;e++)if(this.items3[e].value===t.target.value){this.current3=e;break}}}};e.default=i}},[["7d12","common/runtime","common/vendor"]]]);