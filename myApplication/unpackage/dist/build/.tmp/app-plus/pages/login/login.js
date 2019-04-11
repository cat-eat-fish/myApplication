(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0a5c":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("view",{staticClass:"login"},[n("view",{staticClass:"login-excessive"}),n("view",{staticClass:"login-main"},[n("view",{staticClass:"login-text"},[t._v("登录")]),n("view",{staticClass:"input-row user"},[n("image",{staticClass:"userImg",attrs:{src:t.userimg,mode:""}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"m-input",attrs:{type:"text",value:"",placeholder:"请输入账号",eventid:"586b5fb6-0"},domProps:{value:t.account},on:{focus:t.onFocus,blur:t.onBlur,input:function(i){i.target.composing||(t.account=i.target.value)}}})]),n("view",{staticClass:"input-row pass"},[n("image",{staticClass:"userImg",attrs:{src:t.passimg,mode:""}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"m-input",attrs:{type:"password",value:"",placeholder:"请输入密码",eventid:"586b5fb6-1"},domProps:{value:t.password},on:{focus:t.onFocusP,blur:t.onBlurP,input:function(i){i.target.composing||(t.password=i.target.value)}}})]),n("view",[n("image",{staticClass:"loginBtn",attrs:{src:"../../static/img/login_touch_SIGN%20IN_icon.png",mode:"",eventid:"586b5fb6-2"},on:{tap:t.bindLogin,click:t.goF}})])]),n("view",{staticClass:"forgetPassword",attrs:{eventid:"586b5fb6-3"},on:{click:t.goF}},[n("text",{staticClass:"forgetPasswordText"},[t._v("忘记密码？")]),n("image",{staticClass:"forgetPasswordImg",attrs:{src:"../../static/img/login_forgot%20pas_icon.png",mode:""}})])])},o=[];n.d(i,"a",function(){return e}),n.d(i,"b",function(){return o})},"19c2":function(t,i,n){"use strict";n("e716");var e=s(n("b0ce")),o=s(n("e3da"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,e.default)(o.default))},"36af":function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=n("1ea5"),o=n("2f62"),s=a(n("c14f"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{},e=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.forEach(function(i){c(t,i,n[i])})}return t}function c(t,i,n){return i in t?Object.defineProperty(t,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[i]=n,t}var u={components:{mInput:s.default},data:function(){return{providerList:[],hasProvider:!1,account:"",password:"",positionTop:0,userF:!1,passF:!1,userimg:"../../static/img/login_user_default_icon.png",passimg:"../../static/img/login_pas_defaukt_icon.png"}},computed:(0,o.mapState)(["forcedLogin"]),watch:{userF:function(t,i){this.userimg=1==t?"../../static/img/login_user_selected_icon.png":"../../static/img/login_user_default_icon.png"},passF:function(t,i){this.passimg=1==t?"../../static/img/login_pas_selected_icon.png":"../../static/img/login_pas_defaukt_icon.png"}},onLoad:function(){var i=(0,e.getUserInfo)();!0===i.isLogin&&t.switchTab({url:"/pages/tabBar/mine/mine"})},methods:r({onFocus:function(){this.userF=!0},onBlur:function(){this.userF=!1},onFocusP:function(){this.passF=!0},onBlurP:function(){this.passF=!1},goF:function(){t.navigateTo({url:"/pages/pwd/pwd"})}},(0,o.mapMutations)(["login"]),{initProvider:function(){var i=this,n=["weixin","qq","sinaweibo"];t.getProvider({service:"oauth",success:function(t){if(t.provider&&t.provider.length){for(var e=0;e<t.provider.length;e++)~n.indexOf(t.provider[e])&&i.providerList.push({value:t.provider[e],image:"../../static/img/"+t.provider[e]+".png"});i.hasProvider=!0}},fail:function(t){console.error("获取服务供应商失败："+JSON.stringify(t))}})},initPosition:function(){this.positionTop=t.getSystemInfoSync().windowHeight-100},bindLogin:function(){var i=this;if(this.account.length<5)t.showToast({icon:"none",title:"账号最短为 5 个字符"});else if(this.password.length<6)t.showToast({icon:"none",title:"密码最短为 6 个字符"});else{this.account,this.password;var n=this;t.request({url:"http://192.168.3.125:8080/ams/system/distribute.htm?module=login&username="+n.account+"&password="+n.password+"&methodyd=1",success:function(n){var o=n.data;1==o.code?((0,e.setUserInfo)(o.user),i.login(),t.switchTab({url:"/pages/tabBar/mine/mine"})):(t.showToast({icon:"none",title:o.message}),i.account="",i.password="")}})}},oauth:function(i){var n=this;t.login({provider:i,success:function(e){t.getUserInfo({provider:i,success:function(t){n.toMain(t.userInfo.nickName)}})},fail:function(t){console.error("授权登录失败："+JSON.stringify(t))}})},toMain:function(i){this.login(i),this.forcedLogin?t.reLaunch({url:"../main/main"}):t.navigateBack()}}),onReady:function(){this.initPosition(),this.initProvider()}};i.default=u}).call(this,n("6e42")["default"])},"8c46":function(t,i,n){"use strict";n.r(i);var e=n("36af"),o=n.n(e);for(var s in e)"default"!==s&&function(t){n.d(i,t,function(){return e[t]})}(s);i["default"]=o.a},a667:function(t,i,n){},ccc1:function(t,i,n){"use strict";var e=n("a667"),o=n.n(e);o.a},e3da:function(t,i,n){"use strict";n.r(i);var e=n("0a5c"),o=n("8c46");for(var s in o)"default"!==s&&function(t){n.d(i,t,function(){return o[t]})}(s);n("ccc1");var a=n("2877"),r=Object(a["a"])(o["default"],e["a"],e["b"],!1,null,null,null);i["default"]=r.exports}},[["19c2","common/runtime","common/vendor"]]]);