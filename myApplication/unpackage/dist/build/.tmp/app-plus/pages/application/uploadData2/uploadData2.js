(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/uploadData2/uploadData2"],{"157f":function(i,t,a){"use strict";(function(i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=a("43ce"),n=a("1ea5"),o={data:function(){return{image:"url(../../../static/img/img1.png)",image2:"url(../../../static/img/img2.png)",uploadimg1:{uri:"",name:"request1"},uploadimg2:{uri:"",name:"request2"},num:"",mainFlag:"",mainId:"",doc_id:"",pdid:"",piid:"",tiid:"",nodecode:"",request:[],ishas:0,isstudy:""}},onLoad:function(i){this.isstudy=i.isstudy,this.mainId=i.mainId,this.num=i.isstudy},onNavigationBarButtonTap:function(i){this.isKeep()},methods:{chooseImage:function(){var t=this;i.chooseImage({count:1,sourceType:["album","camera"],sizeType:["compressed","original"],success:function(i){t.uploadimg1.uri=i.tempFilePaths[0],t.image="url(".concat(i.tempFilePaths[0],")")}})},chooseImage2:function(){var t=this;i.chooseImage({count:1,sourceType:["album","camera"],sizeType:["compressed","original"],success:function(i){t.uploadimg2.uri=i.tempFilePaths[0],t.image2="url(".concat(i.tempFilePaths[0],")")}})},doKeep:function(){i.showLoading({title:"上传中",mask:!0});var t=[];1==this.isstudy?(t[0]=this.uploadimg1,t[1]=this.uploadimg2):t[0]=this.uploadimg1;var a=this,o="http://".concat((0,e.baseIp)(),"/ams/system/distribute.htm?module=uploadFile_YD&userId=").concat((0,n.getUserInfo)().userId,"&mainId=").concat(a.mainId,"&mainFlag=exam&mate=").concat(a.num,"&flag=3");i.uploadFile({url:o,filePath:"",name:"",files:t,success:function(t){if("string"==typeof t.data)var a=JSON.parse(t.data);else a=t.data;1==a.code&&(i.hideLoading(),i.showToast({title:a.message,mask:!0,duration:3e3}),setTimeout(function(){i.reLaunch({url:"/pages/tabBar/information/information"})},3e3))},fail:function(i){console.log(i," at pages\\application\\uploadData2\\uploadData2.vue:97")}})},isKeep:function(){if(1==this.ishas){if("url(../../../static/img/img1.png)"==this.image)return void i.showToast({title:"请完善资料！",icon:"none"});if("url(../../../static/img/img2.png)"==this.image2)return void i.showToast({title:"请完善资料！",icon:"none"});this.doKeep()}else{if("url(../../../static/img/img1.png)"==this.image)return void i.showToast({title:"请完善资料！",icon:"none"});this.doKeep()}}}};t.default=o}).call(this,a("6e42")["default"])},"1d97":function(i,t,a){},"2c6c":function(i,t,a){"use strict";a.r(t);var e=a("e5b6"),n=a("32ae");for(var o in n)"default"!==o&&function(i){a.d(t,i,function(){return n[i]})}(o);a("b931");var s=a("2877"),u=Object(s["a"])(n["default"],e["a"],e["b"],!1,null,null,null);t["default"]=u.exports},"32ae":function(i,t,a){"use strict";a.r(t);var e=a("157f"),n=a.n(e);for(var o in e)"default"!==o&&function(i){a.d(t,i,function(){return e[i]})}(o);t["default"]=n.a},b931:function(i,t,a){"use strict";var e=a("1d97"),n=a.n(e);n.a},e5b6:function(i,t,a){"use strict";var e=function(){var i=this,t=i.$createElement;i._self._c},n=[];a.d(t,"a",function(){return e}),a.d(t,"b",function(){return n})}},[["82a1","common/runtime","common/vendor"]]]);