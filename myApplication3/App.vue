<script>
    import {getCid,setCid,getUserInfo} from './service.js';
    import {baseIp} from './config.js';
	import {mapMutations} from 'vuex';
	export default {
		data(){
			return{
				version:"",
				ciid:"",
				
				wgtUrl : `${baseIp()}/app/ams.wgt`, // 线上版本在线更新的.wgt文件路径
				apkUrl: `${baseIp()}/app/ams.apk`,
				wgtVer : "",
				nowVer :'',
			}
		},
		onLaunch(){
			let userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo){
				//更新登陆状态 
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
					}
				});
			}
			
			// #ifdef APP-PLUS
				this.setIgexin();
			
				this.version = plus.runtime.version;
				plus.screen.lockOrientation("portrait-primary")
				var pinf = plus.push.getClientInfo();  
				var cid = pinf.clientid;//客户端标识 
				this.ciid = cid
				setCid(cid);
				if(getUserInfo()){
					if(getUserInfo().userName){
						this.setCiid();
					}
				}
			
				let _handlePush = function(msg) {  
					// TODO  
					var payload = msg.payload;
					
					var testArr = payload.split(',');
					if(payload){
						// console.log(testArr)
						var doc_id = testArr[3].substr(3),
							acceptid = testArr[4].substr(9),
							pdid = testArr[1].substr(5),
							processinstanceid =  testArr[5].substr(18),
							tiid = testArr[0].substr(5),
							deptId = testArr[6].substr(7),
							flowType = testArr[7].substr(9);
						var info = `acceptid=${acceptid}&doc_id=${doc_id}&pdid=${pdid}&piid=${processinstanceid}&tiid=${tiid}&deptId=${deptId}`
						// console.log(info)
						if(flowType == "08"){
							setTimeout(()=>{
								uni.navigateTo({
									url:`/pages/application/investigation6/investigation6?${info}`,
								})
							},1000)
							
						}else if(flowType == "06"){	//请假
							setTimeout(()=>{
								uni.navigateTo({
									url:`/pages/application/investigation7/investigation7?${info}`,
								})
							},1000)
							
						}else if(flowType == "07"){	//用车
							setTimeout(()=>{
								uni.navigateTo({
									url:`/pages/application/investigation8/investigation8?${info}`,
								})
							},1000)
						}else if(flowType == "05"){	//
							setTimeout(()=>{
								uni.navigateTo({
									url:`/pages/application/investigation9/investigation9?${info}`,
								})
							},1000)
						}
					}
				};
				//监听系统通知栏消息点击事件  
				plus.push.addEventListener('click', _handlePush, false);  
				//监听接收透传消息事件  
				plus.push.addEventListener('receive', _handlePush, false);  
							
			// #endif
		},
		onShow(){
			
		},
		created() {
			// #ifdef APP-PLUS
			var that = this;
			setTimeout(function(){
				that.checkUpdate();
			},800)
			// #endif
		},
		methods:{
			...mapMutations(['login','setVersion']),
			// #ifdef APP-PLUS
				//开启推送
				 setIgexin(){
					uni.getProvider({
						service: 'push',
						success: function (res) {
							// console.log(res.provider)

							// 个推的名称为 igexin
							if (~res.provider.indexOf('igexin')) {
								uni.subscribePush({
									provider: 'igexin',
									success: function (res) {
										// console.log('success:' + JSON.stringify(res));
									}
								});
							}
						}
					});
				},
				// 版本升级
				checkUpdate(){
					var that = this;
					uni.request({  
					    url: `${baseIp()}/app/version.json`,
					    success: res => {
							that.wgtVer = res.data.nhams;
							//获取当前版本号 
							plus.runtime.getProperty(plus.runtime.appid,function(inf){
								that.nowVer=inf.version;
								
								console.log(`本地版本:${inf.version},服务器版本:${res.data.nhams}`)
								that.setVersion(inf.version);		//同步本地数据
								var arr = inf.version.split(".", 4);
								var serArr = that.wgtVer.split(".", 4);
								var localBigVersion = Number(arr[0]);
								var localSmallVersion = Number(arr[2]);
								var serveBigVersion = Number(serArr[0]);
								var serveSmallVersion = Number(serArr[2]);
								if(localBigVersion < serveBigVersion){				// 大版本升级
									if(plus.os.name === 'Android'){
										plus.nativeUI.confirm('有新版本，是否下载安装？', function(e){
											if(e.index>0){
												plus.runtime.openURL(that.apkUrl)
											}
										}, '版本升级', ['取消','确定']);
									}
								}else if(localSmallVersion < serveSmallVersion){	//小版本升级
									// 下载 wgt资源升级包 
									plus.downloader.createDownload( that.wgtUrl, {filename:"_doc/update/"}, function(d,status){
										if ( status == 200 ) {
											// 下载成功 安装
											plus.nativeUI.showWaiting("安装升级文件...");
											plus.runtime.install(d.filename,{},function(){
												// 安装成功 重启生效
												plus.nativeUI.closeWaiting();
												plus.nativeUI.confirm('应用资源更新完成，是否立即重启生效？', function(e){
													if(e.index>0){
														plus.runtime.restart();
													}
												}, '版本升级', ['取消','确定']);
											},function(e){
												plus.nativeUI.closeWaiting();
												console.log("安装wgt文件失败["+e.code+"]："+e.message);
												plus.nativeUI.toast("安装wgt文件失败["+e.code+"]："+e.message);
										   });
										} else {
											console.log("下载wgt失败！");
										}
									}).start();
								}
							});
					    } 
					});
				},
				setCiid(){
					var url = `${baseIp()}/ams/system/distribute.htm?module=push_YD&userId=${getUserInfo().userName}&clientId=${this.ciid}`;
					// console.log(url)
					uni.request({
						url,
						success: (res) => {
							let data = res.data;
							// console.log(data)
						},
						fail:(err)=>{
							console.log(err)
						}
					})
				},
			// #endif
		},
	}
</script>

<style>
	@import './common/uni.css';
	@import url("static/css/reset.css");
	@import url("static/font/iconfont.css");
	uni-page-body, uni-page-refresh{height: 100%;min-height: 100%;}
	
	.iconfont{color: #3893f3;}
	.gbg{background-color: #3893f3;color: #fff;}
	.uni-btn-icon{display: block;margin-right: 12px;}
	/* uni-page-head[uni-page-head-type=default]~uni-page-wrapper{height: calc(100% - 44px)} */
	
</style>
