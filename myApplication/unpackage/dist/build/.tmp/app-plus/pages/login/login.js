(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"19c2":function(t,e,n){"use strict";n("e716");var s=o(n("b0ce")),a=o(n("e3da"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))},"36af":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n("43ce"),a=n("1ea5"),o=n("2f62"),i=c(n("c14f"));function c(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},s=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),s.forEach(function(e){u(t,e,n[e])})}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l={components:{mInput:i.default},data:function(){return{providerList:[],hasProvider:!1,account:"",password:"",positionTop:0,userF:!1,passF:!1,userimg:"../../static/img/login_user_default_icon.png",passimg:"../../static/img/login_pas_defaukt_icon.png"}},computed:(0,o.mapState)(["forcedLogin"]),watch:{userF:function(t,e){this.userimg=1==t?"../../static/img/login_user_selected_icon.png":"../../static/img/login_user_default_icon.png"},passF:function(t,e){this.passimg=1==t?"../../static/img/login_pas_selected_icon.png":"../../static/img/login_pas_defaukt_icon.png"}},onLoad:function(){var e=(0,a.getUserInfo)();!0===e.isLogin&&t.switchTab({url:"/pages/tabBar/mine/mine"})},methods:r({onFocus:function(){this.userF=!0},onBlur:function(){this.userF=!1},onFocusP:function(){this.passF=!0},onBlurP:function(){this.passF=!1},goF:function(){t.navigateTo({url:"/pages/pwd/pwd"})}},(0,o.mapMutations)(["login"]),{bindLogin:function(){var e=this;if(this.account.length<5)t.showToast({icon:"none",title:"账号最短为 5 个字符"});else if(this.password.length<6)t.showToast({icon:"none",title:"密码最短为 6 个字符"});else{this.account,this.password;var n=this,o=(0,s.api_login)(n.account,n.password);t.request({url:o,success:function(n){var s=n.data;1==s.code?((0,a.setUserInfo)(s.user),e.login(),t.switchTab({url:"/pages/tabBar/mine/mine"})):(t.showToast({icon:"none",title:s.message}),e.account="",e.password="")}})}}})};e.default=l}).call(this,n("6e42")["default"])},"8c46":function(t,e,n){"use strict";n.r(e);var s=n("36af"),a=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e["default"]=a.a},a481:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"login"},[n("view",{staticClass:"login-excessive"}),n("view",{staticClass:"login-main"},[n("view",{staticClass:"login-text"},[t._v("登录")]),n("view",{staticClass:"input-row user"},[n("image",{staticClass:"userImg",attrs:{src:t.userimg,mode:""}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"m-input",attrs:{type:"text",value:"",placeholder:"请输入账号",eventid:"586b5fb6-0"},domProps:{value:t.account},on:{focus:t.onFocus,blur:t.onBlur,input:function(e){e.target.composing||(t.account=e.target.value)}}})]),n("view",{staticClass:"input-row pass"},[n("image",{staticClass:"userImg",attrs:{src:t.passimg,mode:""}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"m-input",attrs:{type:"password",value:"",placeholder:"请输入密码",eventid:"586b5fb6-1"},domProps:{value:t.password},on:{focus:t.onFocusP,blur:t.onBlurP,input:function(e){e.target.composing||(t.password=e.target.value)}}})]),n("view",[n("image",{staticClass:"loginBtn",attrs:{src:"../../static/img/login_touch_SIGN%20IN_icon.png",mode:"",eventid:"586b5fb6-2"},on:{tap:t.bindLogin,click:t.goF}})])]),n("view",{staticClass:"forgetPassword",attrs:{eventid:"586b5fb6-3"},on:{click:t.goF}},[n("text",{staticClass:"forgetPasswordText"},[t._v("忘记密码？")]),n("image",{staticClass:"forgetPasswordImg",attrs:{src:"../../static/img/login_forgot%20pas_icon.png",mode:""}})])])},a=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return a})},a667:function(t,e,n){},ccc1:function(t,e,n){"use strict";var s=n("a667"),a=n.n(s);a.a},e3da:function(t,e,n){"use strict";n.r(e);var s=n("a481"),a=n("8c46");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("ccc1");var i=n("2877"),c=Object(i["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=c.exports}},[["19c2","common/runtime","common/vendor"]]]);