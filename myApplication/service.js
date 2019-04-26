// 管理账号信息
// const USERS_KEY = 'USERS_KEY';
// const STATE_KEY = 'STATE_KEY';
// 
// const getUsers = function () {
//     let ret = '';
//     ret = uni.getStorageSync(USERS_KEY);
//     if (!ret) {ret = '[]';}
//     return JSON.parse(ret);
// }
// const addUser = function (userInfo) {
//     let users = getUsers();
//     users.push({account: userInfo.account,password: userInfo.password});
//     uni.setStorageSync(USERS_KEY, JSON.stringify(users));
// }
// 
// export default {getUsers,addUser}



export function setUserInfo(userINFO){
	let time =60*60*24;
	let overdue = Math.round(new Date() / 1000) + time;
	// let userInfo = {userId:userINFO.id,userName:userINFO.userName,name:userINFO.name,overdue:overdue,isLogin:true};
	if(userINFO.user === false){
		var userInfo = {userId:"",userName:"",name:"",overdue:0,isLogin:false};
	}else {
		var userInfo = {userId:userINFO.id,userName:userINFO.userName,name:userINFO.name,overdue:overdue,isLogin:true};
	}
	uni.setStorageSync("userInfo", JSON.stringify(userInfo));
}
export function getUserInfo(){
	let userInfo = uni.getStorageSync("userInfo")
	if(!userInfo){userInfo = '{}'}
	return JSON.parse(userInfo);
};

export function getCid(){
	let cid = uni.getStorageSync("cid");
	if(!cid){cid = ''}
	return cid
}

export function setCid(cid){
	uni.setStorageSync("cid", cid);
}
