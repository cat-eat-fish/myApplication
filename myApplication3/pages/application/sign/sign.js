export function handleSignClick(){
	console.log(1)
}
// 本地存储打卡信息
export function setSignInfo(info){
	var signInfo = {main:[info]}
	uni.setStorageSync("signInfo",JSON.stringify(signInfo));
}
// 本地添加打卡信息
export function addSignInfo(info,sign){
	sign.main.push(info);
	uni.setStorageSync("signInfo",JSON.stringify(sign));
}
// 本地获取打卡信息
export function getSignInfo(){
	let sign = uni.getStorageSync("signInfo");
	if(!sign){
		return;
	}
	return JSON.parse(sign)
}
// 本地打卡信息清理
export function delSignInfo(){
	uni.removeStorage({
		key: 'signInfo',
		success(){
			uni.showToast({title:"重置成功"})
		}
	});
}
// 打卡信息
export function getInfo(signInfo){
	var nowT = new Date();
	var info = {mode:signInfo.mode, nowT:nowT,address:signInfo.address,time:signInfo.time,latitude:signInfo.latitude,longitude:signInfo.longitude,remarks:signInfo.remarks};
	return info;
}


export function setSignNum(num){
	uni.setStorageSync('signNum',num);
}
export function getSignNum(){
	let signNum = uni.getStorageSync("signNum");
	if(!signNum){
		return;
	}
	return signNum
}
export function delSignNum(){
	uni.removeStorage({key: 'signNum'});
}




