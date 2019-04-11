import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo} from "../service.js"
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /* 是否需要强制登录*/
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		userInfo:{userId:"",userName:"",name:"",overdue:0,isLogin:false}
    },
    mutations: {
        login(state) {
            state.userInfo = getUserInfo() || {userId:"",userName:"",name:"",overdue:0,isLogin:false};
        },
        logout(state) {
            state.userInfo = {userId:"",userName:"",name:"",overdue:0,isLogin:false};
        }
    }
})

export default store
