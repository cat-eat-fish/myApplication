(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/ratingProcess/ratingProcess"],{"08cd":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a("43ce"),i=n(a("de98")),c=n(a("709d"));function n(t){return t&&t.__esModule?t:{default:t}}var o={components:{uniIcon:c.default,uniSteps:i.default},data:function(){return{aa:"",bb:"",dataInfo:{},active:0,list2:[]}},onLoad:function(e){var a=this;t.request({url:"http://".concat((0,s.baseIp)(),"/ams/system/distribute.htm?module=informationPJ&acceptid=").concat(e.acceptid,"&doc_id=").concat(e.doc_id,"&pdid=").concat(e.pdid,"&piid=").concat(e.piid,"&mainId=").concat(e.id2),success:function(t){var e=t.data;a.dataInfo=e.object[0],console.log(e),a.aa=e.object[0].applay_per.substr(e.object[0].applay_per.length-2),e.object1.map(function(t){t.title=""==t.info?"".concat(t.name):"".concat(t.name," -- ").concat(t.info),t.desc=t.approve_time?t.status?"".concat(t.tokenname," -- ").concat(t.approve_time," -- ").concat(t.status):"".concat(t.tokenname," -- ").concat(t.approve_time):"".concat(t.status)});var s=e.object1.map(function(t,e){if(""==t.approve_time)return e}),i=s.filter(function(t){return t});a.active=0==i.length?s.length:a.active=i[0],e.object1.unshift({title:"".concat(e.object[0].applay_per),desc:"我发起的 -- ".concat(e.object[0].applay_date)}),a.list2=e.object1,a.bb=e.object1[e.object1.length-1].status}})},methods:{change:function(){this.active<this.list2.length-1?this.active+=1:this.active=0}}};e.default=o}).call(this,a("6e42")["default"])},"220d":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"uni-steps"},[a("view",{staticClass:"uni-steps-items",class:"uni-steps-"+t.direction},t._l(t.options,function(e,s){return a("view",{key:s,staticClass:"uni-steps-item",class:{"uni-steps-process":s===t.active,"uni-steps-finish":s<t.active}},[a("view",{staticClass:"uni-steps-item-title-container",style:{color:s===t.active?t.activeColor:""}},[a("view",{staticClass:"uni-steps-item-title"},[t._v(t._s(e.title))]),e.desc?a("view",{staticClass:"uni-steps-item-desc"},[t._v(t._s(e.desc))]):t._e()]),a("view",{staticClass:"uni-steps-item-circle-container"},[s!==t.active?a("view",{staticClass:"uni-steps-item-circle",style:{backgroundColor:s<t.active?t.activeColor:""}}):a("uni-icon",{attrs:{type:"checkbox-filled",size:"14",color:t.activeColor,mpcomid:"4598103f-0-"+s}})],1),s!==t.options.length-1?a("view",{staticClass:"uni-steps-item-line",style:{backgroundColor:s<t.active?t.activeColor:""}}):t._e()])}))])},i=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},"400f":function(t,e,a){"use strict";var s=a("c096"),i=a.n(s);i.a},"5c2f":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i(a("709d"));function i(t){return t&&t.__esModule?t:{default:t}}var c={name:"uni-steps",components:{uniIcon:s.default},props:{direction:{type:String,default:"row"},activeColor:{type:String,default:"#1aad19"},active:{type:Number,default:0},options:Array},data:function(){return{}}};e.default=c},7391:function(t,e,a){},9714:function(t,e,a){"use strict";a.r(e);var s=a("9d03"),i=a("a3a1");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);a("400f");var n=a("2877"),o=Object(n["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},"9d03":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"ratingProcess"},[a("view",{staticClass:"ratingProcess-title"},[a("view",{staticClass:"img"},[t._v(t._s(t.aa))]),a("view",{staticClass:"text"},[t._v(t._s(t.dataInfo.name))]),a("view",{staticClass:"text"},[t._v(t._s(t.bb))])]),a("view",{staticClass:"ratingProcess-con"},[a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("申报名称")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.title2))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("客户名称")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.customer_name))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("客户号")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.customer_id))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("客户类型")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.cust_type))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("营销责任人")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.customer_name))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("评级模型")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.evaluate_modle))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("拟初评结果")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.first_level))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("申请日期")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.applay_date))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("申请理由")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.applay_reason))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("上季度评级级别")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.last_level))])]),a("view",{staticClass:"item"},[a("view",{staticClass:"text-l"},[t._v("实际控制人")]),a("view",{staticClass:"text-r"},[t._v(t._s(t.dataInfo.applay_per))])]),a("view",{staticClass:"item-other"},[a("view",{staticClass:"text-l"},[t._v("附件列表")]),a("view",{staticClass:"text-r"},[a("uni-icon",{attrs:{type:"arrowright",size:"20",mpcomid:"71e11f10-0"}})],1)]),a("view",{},[a("uni-steps",{attrs:{options:t.list2,direction:"column",active:t.active,mpcomid:"71e11f10-1"}})],1)])])},i=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},a1cf:function(t,e,a){"use strict";a.r(e);var s=a("5c2f"),i=a.n(s);for(var c in s)"default"!==c&&function(t){a.d(e,t,function(){return s[t]})}(c);e["default"]=i.a},a3a1:function(t,e,a){"use strict";a.r(e);var s=a("08cd"),i=a.n(s);for(var c in s)"default"!==c&&function(t){a.d(e,t,function(){return s[t]})}(c);e["default"]=i.a},b5a0:function(t,e,a){"use strict";a("e716");var s=c(a("b0ce")),i=c(a("9714"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},b718:function(t,e,a){"use strict";var s=a("7391"),i=a.n(s);i.a},c096:function(t,e,a){},de98:function(t,e,a){"use strict";a.r(e);var s=a("220d"),i=a("a1cf");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);a("b718");var n=a("2877"),o=Object(n["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports}},[["b5a0","common/runtime","common/vendor"]]]);