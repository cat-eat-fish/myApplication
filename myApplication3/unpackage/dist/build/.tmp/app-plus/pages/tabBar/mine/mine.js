(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/mine/mine"],{"083b":function(n,e,t){"use strict";var o=t("50f2"),i=t.n(o);i.a},"50f2":function(n,e,t){},"6c63":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t("43fa"),i=t("8938"),a=function(){return t.e("components/uni-collapse/uni-collapse").then(t.bind(null,"58db"))},u=function(){return t.e("components/uni-collapse-item/uni-collapse-item").then(t.bind(null,"9f13"))},s={components:{uniCollapse:a,uniCollapseItem:u},data:function(){return{Headimg:"",aa:"",isLogin:!1,userInfo:{},collData:[{id:0,title:"关于APP",content:"本应用不提供注册方式,如有需求联系主管.<br/>本应用提供外出审批,用车审批,请假审批,上下班打卡等服务.<br/>"},{id:1,title:"常见问题",content:"1.位置不准确:为确保打卡位置与您当前的位置保持一致,请在打卡时确保手机信息服务为开启状态.<br/>"}]}},onPullDownRefresh:function(){this.getother()},onLoad:function(){this.getInfo(),(0,i.getHeadimg)()&&(this.Headimg=(0,i.getHeadimg)().headimg)},onNavigationBarButtonTap:function(n){this.goSetting()},methods:{goSetting:function(){n.navigateTo({url:"/pages/mine/setting/setting"})},getother:function(){var e=this,t="".concat((0,o.baseIp)(),"/ams/system/distribute.htm?module=readPhoto_YD&userId=").concat(e.userInfo.userName);n.request({url:t,success:function(t){var a=t.data;if(n.stopPullDownRefresh(),a.headImg){var u=a.headImg,s=u.indexOf("ams"),r=u.substring(s);r=r.replace(/\\/g,"/"),u="".concat((0,o.baseIp)(),"/").concat(r),(0,i.setHeadimg)(u),e.Headimg=u}}})},getInfo:function(){if((0,i.getUserInfo)()){var n=(0,i.getUserInfo)();this.isLogin=n.isLogin,this.userInfo=n,this.aa=n.name.substr(n.name.length-2)}},login:function(){n.reLaunch({url:"/pages/login/login"})},logout:function(){var e={user:!1};(0,i.setUserInfo)(e);(0,i.getUserInfo)();n.reLaunch({url:"/pages/login/login"})},restpwd:function(){n.navigateTo({url:"/pages/pwd/pwd"})}}};e.default=s}).call(this,t("6e42")["default"])},a26a:function(n,e,t){"use strict";t.r(e);var o=t("e149"),i=t("a8e5");for(var a in i)"default"!==a&&function(n){t.d(e,n,function(){return i[n]})}(a);t("083b");var u=t("2877"),s=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,"019e3862",null);e["default"]=s.exports},a8e5:function(n,e,t){"use strict";t.r(e);var o=t("6c63"),i=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,function(){return o[n]})}(a);e["default"]=i.a},e149:function(n,e,t){"use strict";var o=function(){var n=this,e=n.$createElement;n._self._c},i=[];t.d(e,"a",function(){return o}),t.d(e,"b",function(){return i})}},[["308d","common/runtime","common/vendor"]]]);