//用法如下:
//mui.plusReady(function(){
//	checkUpdate();
//});

import {baseIp} from "../../config.js"


var checkUrl = baseIp() + "/app/version.json?" + new Date();
var wgtUrl = baseIp() + "/app/ams.wgt";
var androidUrl = baseIp() + "/app/ams.apk";
var iosUrl = "ios的url地址,例如:itms-apps://itunes.apple.com/cn/app/hello-h5+/id682211190?l=zh&mt=8";

// 检测更新
export function checkUpdate() {
	//如果不是公网,自动跳过升级
	if (baseIp().indexOf("139.224.150.165") == -1) {
		return;
	}

	var localBigVersion;
	var localSmallVersion;


	//plus.nativeUI.showWaiting("检测更新...");

	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		//console.log(JSON.stringify(inf) )
		var wgtVer = inf.version.split(".", 4);
		localBigVersion = wgtVer[0];
		localSmallVersion = wgtVer[2];

		uni.request({
			url: checkUrl,
			success: checkSuccess
		})
	});

} //#checkUpdate

function checkSuccess(res) {
	var newVerJson = res.data;
	var tbShopVersion = newVerJson.nhams;
	var serverVersions = tbShopVersion.split(".", 4);

	var serverBigVersion = serverVersions[0];
	var serverSmallVersion = serverVersions[2];

	/*
	 *检查IOS大版本
	 */
	if (mui.os.ios) {
		//通过appstore提示更新
		//也可以通过本地检测更新,将来再做决定
		//if(localBigVersion!=serverBigVersion){
		//plus.runtime.openURL( androidUrl );
		//   return;
		//}
	}

	/*
	 *检查安卓大版本
	 */
	if (mui.os.android) {
		if (localBigVersion != serverBigVersion) {
			var btn = ["取消", "确定"];
			mui.confirm('检查到有新版本,请您升级,现在升级吗?', '审核', btn, function(e) {
				if (e.index == 1) {
					plus.runtime.openURL(androidUrl);
				}
			});
		}
	}
	//必须大版本升级后,才能升级小版本
	/*
	 *检查安卓/ios小版本
	 */
	if (serverSmallVersion != localSmallVersion) {
		downWgt(); // 下载升级包
	} else {
		//plus.nativeUI.alert("无新版本可更新！");
		//window.location.href="login.html";
	}
}

// 下载wgt文件
function downWgt() {
	//plus.nativeUI.showWaiting("下载升级文件...");
	plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(d, status) {
		if (status == 200) {
			//console.log("下载升级成功："+d.filename);
			installWgt(d.filename); // 安装wgt包
		} else {
			//console.log("下载升级失败！");
			//plus.nativeUI.alert("下载升级失败！");
			//window.location.href="login.html";
		}
		//plus.nativeUI.closeWaiting();
	}).start();
}


// 更新应用资源
function installWgt(path) {
	//plus.nativeUI.showWaiting("安装wgt文件...");
	plus.runtime.install(path, {
		force: true
	}, function() {
		//plus.nativeUI.closeWaiting();
		console.log("安装wgt文件成功！");
		//plus.nativeUI.alert("应用资源更新完成！",function(){
		//plus.runtime.restart();
		//});
	}, function(e) {
		//plus.nativeUI.closeWaiting();
		console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
		//window.location.href="login.html";
	});
}
