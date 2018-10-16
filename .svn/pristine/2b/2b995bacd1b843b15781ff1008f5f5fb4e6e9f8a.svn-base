/**
 * Created by Administrator on 2017/8/28.
 */



//呼叫视频

$(document.body)
// 立即联系按钮
    .append("<div id='butel-video-icon'>" +
        "<img id='butel-video-call' src='./img/call.png' alt='视频客服'/>" +
        "<img id='butel-video-hangup' src='./img/hangup.png' alt='挂断'/>" +
        "</div>")
    // 视频容器及内部Flash区域，转接提示区域
    .append("<div id='butel-video-container'>" +
        "<div id='butel-video-area'></div>" +
        "</div>");
// 将flash组件(id='butelNetPhone')移动到正确的位置
$("#butel-video-area").append("<div id='flash' style='position: relative; overflow: hidden; width: 0px; height: 0px;'><div id='butelNetPhone' style='visibility: visible;'><h1>Alternative content</h1><p><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a></p></div></div>");
$("#butel-video-area").append('<div id="music"></div>')

//  1.  初始化
butelNetPhoneInit(711, 400, "div", "flash", '45070062', 16, 16,500, 500, false);
//butelNetPhoneInit(667, 390, "div","flash");
//  2.  初始化结果
function netPhoneReady(){
    console.log("sdk初始化成功");
    login();
}
//  3.  登录
function login(){
    butelNetPhoneLogin( "99999999", "99999999","c3b5a1ab4a2f4bcdb64d958d3c03dacc","baiduCol" );
    butelNetPhoneGetACD("80045413");   //登录的时候必须要调用这个函数才有可能登录成功，要带随路数据坐席才会显示这个用户
    console.log("正在登录...");
}
//  4.  登录结果
function netPhoneLoginSuccess(){
    console.log("登录成功");
}
function netPhoneLoginFailed(){
    console.log("登录失败，被拒绝登录");
}
function netPhoneRepermitLogin(){
    console.log("登录失败，连接超时");
}
//关联坐席回调
function netPhoneMyACD ( serviceNumber, code, str ){
    if(serviceNumber){
        console.log("关联坐席成功")
    }
}
//  6.  连接结果

//  7.  使用呼叫等一系列接口
$("#butel-video-call").click(function () {
    $("#butel-video-container").css("visibility", "visible");
    $(this).hide();
    $("#butel-video-hangup").show();
    console.log("视频呼叫");
    butelNetPhoneMakeCall("80045413", "", "客服", 60);
    $("#music").append('<video style="display:none" controls="" autoplay="" name="media"><source src="http://www.channelsoft.com/sounds/calling.mp3" type="audio/mpeg"></video>');

})
/**
 * ACD排队位置回调
 * @param accessNum 坐席接入号
 * @param pos 排队位置
 * */
//butelPhoneGetAcdQueue( accessNum, pos );
function netPhoneGetAcdQueue (accessNum,pos){
    console.log("获取坐席排队位置时回调：",accessNum,pos);
    console.log('排队中');
};

/**
 * 呼叫挂断回调
 * @param code 原因码
 * @param str 原因描述
 * @param sid 通话唯一标识
 * */
window.netPhoneCallEnd = function (code, str, sid) {
    console.log("code:" + code + ", str:" + str + ", sid" + sid);
    //   document.getElementById("music").innerHTML = "";
    //if(!vm.callStarted()){
    $("#butel-video-container").css("visibility", "hidden");
    $("#butel-video-hangup").hide();
    $("#butel-video-call").show();
    $("#music").empty();
    switch (code) {
        case "-4850":
            console.log("电话未接通");
            //vm.outputConsole("电话未接通");
            break;
        case "3":
            console.log(str);
            //vm.outputConsole(str);
            break;
        case "-6030":
            console.log(str);
            // vm.outputConsole(str);
            break;
        case "4":
            console.log(str);
            //vm.outputConsole("对方挂断");
            break;
        case "-4860":
            console.log("坐席忙");
            //vm.outputConsole("视频坐席忙！！！");
            break;
        default :
            break
    }
};
//1.37.butelNetPhoneGetStatus获取用户连接和呼叫状态
//butelNetPhoneGetStatus();
//返回用户的连接和呼叫状态。
function netPhoneOnGetStatus( connectStatus, callStatus ){
    console.log(connectStatus + "----" + callStatus)
}
//挂断，取消呼叫
$("#butel-video-hangup").click(function () {
    butelNetPhoneCallHangup();
    $("#butel-video-hangup").hide();
    $("#butel-video-call").show();
    $("#butel-video-area").css({"background":""});
    console.log("取消呼叫");
    $("#butel-video-container").css("visibility", "hidden");
    $("#music").empty();
})

//通话结束回调
function netPhoneCallEnd( code, str, sid ){
    $("#butel-video-container").css("visibility", "hidden");
    $("#butel-video-hangup").hide();
    $("#butel-video-call").show();
    console.log("呼叫挂断回调" + code + str)
    $("#music").empty();
}
//对方接听成功
function netPhoneCallStarted( targetNumber, sid){
    console.log("对方接听成功" + targetNumber);
    $("#makeCallGif").hide();
    $("#butel-video-area").css({"background":"#545CAD"});
    $("#butel-video-hangup").show();
    $("#butel-video-call").hide();
    $("#flash-container2").show();
    $("#music").empty();
};
























