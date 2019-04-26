// 
import {getUserInfo} from './service.js';
var userId = getUserInfo().userId;

export function baseIp(){
	return "192.168.3.108:8080";
}
export function baseIp_1(){
	return "http://192.168.3.108:8080/";
}


// API 信息
// 登录
export function api_login(username,password){
	return `${baseIp_1()}ams/system/distribute.htm?module=login&methodyd=1&username=${username}&password=${password}`;
}
// 首页 信息--返回参数 {code:"1",message:"成功",object:[{count1:"1",count2:"1",tiid:456178,time1:"",time2:"",title:"",title2:""}]}
export function api_information(){
	return `${baseIp_1()}ams/system/distribute.htm?module=pending_topInfo&userId=${userId}`;
}
// 待审信息	(带我审批列表信息)
export function api_pendingTrial(){
	return `${baseIp_1()}ams/system/distribute.htm?module=pending&user_id=${userId}`;
}





