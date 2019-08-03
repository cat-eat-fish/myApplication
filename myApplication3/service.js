export function setUserInfo(userINFO){
	let time =60*60*24;
	let overdue = Math.round(new Date() / 1000) + time;
	// let userInfo = {userId:userINFO.id,userName:userINFO.userName,name:userINFO.name,overdue:overdue,isLogin:true};
	if(userINFO.user === false){
		var userInfo = {userId:"",userName:"",name:"",overdue:0,isLogin:false,deptId:''};
	}else {
		var userInfo = {userId:userINFO.id,deptId:userINFO.deptId,type:userINFO.type,userName:userINFO.userName,name:userINFO.name,overdue:overdue,isLogin:true};
	}
	uni.setStorageSync("userInfo", JSON.stringify(userInfo));
}
export function getUserInfo(){
	let userInfo = uni.getStorageSync("userInfo")
	if(!userInfo){userInfo = '{}'}
	return JSON.parse(userInfo);
};

export function setHeadimg(headimg){
	var img = {headimg}
	uni.setStorageSync("headimg", JSON.stringify(img));
}
export function getHeadimg(){
	let img = uni.getStorageSync("headimg")
	if(!img){img = '{}'}
	return JSON.parse(img);
}

export function getCid(){
	let cid = uni.getStorageSync("cid");
	if(!cid){cid = ''}
	return cid
}

export function setCid(cid){
	uni.setStorageSync("cid", cid);
}


















