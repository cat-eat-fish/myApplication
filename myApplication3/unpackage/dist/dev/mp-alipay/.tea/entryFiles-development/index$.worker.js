if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../pages/application/thisapp/thisapp');
require('../../pages/tabBar/information/information');
require('../../pages/login/login');
require('../../pages/tabBar/application/application');
require('../../pages/tabBar/mine/mine');
require('../../pages/information/pendingInfo/pendingInfo');
require('../../pages/application/forApproval/forApproval');
require('../../pages/application/approvalMonitoring/approvalMonitoring');
require('../../pages/application/launched/launched');
require('../../pages/application/haveApproved/haveApproved');
require('../../pages/application/approvalExam/approvalExam');
require('../../pages/application/approvalNotice/approvalNotice');
require('../../pages/application/sign/sign');
require('../../pages/application/leave/leave');
require('../../pages/application/egress/egress');
require('../../pages/application/bus/bus');
require('../../pages/application/sign2/sign2');
require('../../pages/application/rule/rule');
require('../../pages/application/investigation6/investigation6');
require('../../pages/application/investigation7/investigation7');
require('../../pages/application/investigation8/investigation8');
require('../../pages/application/ratingProcess6/ratingProcess6');
require('../../pages/application/ratingProcess7/ratingProcess7');
require('../../pages/application/ratingProcess8/ratingProcess8');
require('../../pages/application/census/census');
require('../../pages/application/leave2/leave2');
require('../../pages/application/ratingProcess9/ratingProcess9');
require('../../pages/application/investigation9/investigation9');
require('../../pages/tabBar/announ/announ');
require('../../pages/announ/item1/item1');
require('../../pages/announ/item2/item2');
require('../../pages/announ/item3/item3');
require('../../pages/announ/item4/item4');
require('../../pages/announ/item5/item5');
require('../../pages/announ/item6/item6');
require('../../pages/announ/item7/item7');
require('../../pages/announ/item8/item8');
require('../../pages/announ/item9/item9');
require('../../pages/announ/item10/item10');
require('../../pages/pwd/pwd');
require('../../pages/mine/setting/setting');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}