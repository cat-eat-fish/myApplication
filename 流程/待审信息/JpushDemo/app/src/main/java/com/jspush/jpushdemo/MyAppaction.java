package com.jspush.jpushdemo;

import android.app.Application;

import cn.jpush.android.api.JPushInterface;

/**
 * Created by admin on 2018/7/13.
 */

public class MyAppaction extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        //TODO: 设置开启日志,发布时请关闭日志
        JPushInterface.setDebugMode(true);
        //初始化极光推送
        JPushInterface.init(this);
    }
}
