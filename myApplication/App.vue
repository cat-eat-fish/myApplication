<script>
	
	
	
	
	
    import {getCid,setCid} from './service.js';
	// #ifdef APP-PLUS
		
		var pinf = plus.push.getClientInfo();  
		var cid = pinf.clientid;//客户端标识 
		setCid(cid);
		//监听click事件，用户从消息中心点击触发的
		plus.push.addEventListener("click", function (msg) {
			//根据payload传递过来的数据，打开一个详情
			var payload = msg.payload;
			if (payload) {
				// payload 按照规范是 Object，但实际推送过来有可能是 String，需要多一步处理；
				if (typeof payload === 'string') {
					payload = JSON.parse(payload);
				}
				if (typeof payload === 'object') {
					if(payload.url){
						setTimeout(function(res){
							uni.navigateTo({
								url:payload.url
							})
						},1000)
					}
				}
			}
		}, false);
		
		//监听receive事件
		plus.push.addEventListener("receive", function (msg) {
			if (plus.os.name != 'iOS') {
				plus.push.createMessage(msg.title,msg.payload);
			}
			//根据payload传递过来的数据，打开一个详情
			var payload;
			if (msg.payload) {
				//如透传消息不符合格式，则“payload”属性为string类型
				//这里的示例以json字符串去解析，实际上也可以做字符串匹配
				if (typeof (msg.payload) == "string") {
					try {
						payload = JSON.parse(msg.payload);
					} catch (error) {
						console.log(error);
					}
				} else if (typeof (msg.payload) == "object") {
					//iOS应用正处于前台运行时收到推送，也触发receive事件，此时payload为json对象
					plus.push.createMessage(msg.title,msg.content);
				}
			}
		}, false);
	// #endif
	
	export default {
		
		onLaunch: function() {
			// console.log('App Launch');
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		},
	}
</script>

<style>
	@import './common/uni.css';
	@import url("static/css/reset.css");
	
	uni-page-body, uni-page-refresh{height: 100%;min-height: 100%;}
	/* uni-page-head[uni-page-head-type=default]~uni-page-wrapper{height: calc(100% - 44px)} */
	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	
</style>
