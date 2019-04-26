import Vue from "vue"
import { connect } from '../common/js/mqtt.min.js'
//import {Client, Message} from '../common/js/paho-mqtt-min.js'
let client = null
//let countNum = 0
//let listenMqttTimer = null
// 开启订阅（登录成功后调用）
export const startMqtt = function() {

	/*
client = new Client('ws://iot.syniot.cn:8083/mqtt', 'wx_' + Math.random().toString(16).substr(2, 8))

console.log(client)
//*
	client.connect({
		//timeout: 4000,
		useSSL: false,
		userName: "syniot",
		password: "syniot",
		cleanSession: true,
		keepAliveInterval: 5,
		//reconnect: true,
		mqttVersion: 4,
		onSuccess: function() {
		console.log('connected')		
		//监听关闭
		client.onConnectionLost = function(responseObject) {
			if (responseObject.errorCode !== 0) {
			console.log("onConnectionLost:" + responseObject.errorMessage);
			}
		}	
		},
		onFailure: function(err) {
			console.log(JSON.stringify(err))
			console.log('连接失败111')
		}
	})
	//*/
	//*
	client = connect('ws://127.0.0.1:61623/mqtt', {
		//port: 8083,
		clientId: "clienthtml",
		protocolVersion: 4,
		clean: false,
		password: "password",
		userName: "admin",
		//keepalive: 5,
	})

	client.on('connect', function () {
   console.log('>>> connected');
}).on('error', function(err) {
	console.log("链接mqtt报错:"+ err)
		//client.end()
    //client.reconnect()
})
//*/
  Vue.prototype.$mqtt = client    // 方便在vue组件中可以直接使用this.$mqtt -> client
  //Vue.prototype.$listenMqttTimer = listenMqttTimer
}
