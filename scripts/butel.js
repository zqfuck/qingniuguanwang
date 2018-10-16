/**
 * Created by Administrator on 2017/8/24.
 */

(function(Butel, $) {
    "use strict";

    var defaults = {

        server : "192.168.12.31:1935",
        self : "99999999",
        password : "99999999",
        appKey : "94165571c20d4e62992f69c16c59c794",
        nickName : "青牛软件官网",
        card:{
            "source":"channelsoft",
        },
        // 默认接入号
        // accessNumber : "40045621",

        //线上用
        accessNumber : "80045413",

        //测试用
        //accessNumber : "80070097",


        // 默认坐席号
        // agentNumber : "70001276",
        agentNumber : "45070062",

        // 16:9比例
        videoWidth : 711,
        videoHeight : 400
    };

    var Log = {
        log : function(message) {
            if (window.console && window.console.log) {
                window.console.log(message);
            }
        }
    };

    /**
     * 请求状态
     * 0-未请求 1-正在请求 2-通话中
     * @type {number}
     */
    var status = 0;

    /**
     * flash是否已经初始化成功
     * @type {boolean}
     */
    var initSuccess = false;

    /**
     * flash是否已经登录成功
     * @type {boolean}
     */
    var loginSuccess = false;

    var initButelDom = function() {
        $(document.body)
        // 立即联系按钮
            .append("<div id='butel-video-icon'>" +
                "<img id='butel-video-call' src='butel/butel-call-new.png' alt='视频客服'/>" +
                "<img id='butel-video-hangup' src='butel/butel-hangup.png' alt='挂断'/>" +
                "</div>")
            /*            .append("<div id='butel-video-im'>" +
             "<button id='imChat' type='button'>IM客服</button>"+
             "</div>")*/
            // 视频容器及内部Flash区域，转接提示区域
            .append("<div id='butel-video-container'>" +
                "<div id='butel-video-area'></div>" +
                "</div>");

        // 将flash组件(id='butelNetPhone')移动到正确的位置
        //$("#butel-video-area").append($("#butelNetPhone"));

        // 初始化Flash
        Butel.initFlash();

        // 立即联系
        $("#butel-video-call").bind("click", function() {
            if(initSuccess){
                Butel.loginFlash();
                Butel.getACD();
            }

            if (Butel.updating) {
                alert("对不起，系统正在升级，暂时无法联系到客服。");
                return;
            }

            if (status === 1) {
                Log.log("请求已发出...");
                return;
            }

            // 正在请求
            status = 1;

            // 图片分离
            var offset = parseInt(defaults.videoWidth / 2);

            $("#butel-left-img").animate({"left": -offset + "px"}, 1500);
            $("#butel-right-img").animate({"right": -offset + "px"}, 1500, null, function() {

                $("#butel-video-container").css("opacity", "1");

                var userAgent = navigator.userAgent;

                if (userAgent.indexOf("MSIE 8.0") >= 0 || userAgent.indexOf("MSIE 7.0") >= 0) {
                    $("#butel-video-container").css("opacity", "");
                }

                // 通话中的状态
                status = 2;

                $("#butel-video-tip").show();

                // 切换按钮显隐
                $("#butel-video-call").hide();
                $("#butel-video-hangup").show();

                // login butel flash
                // Butel.loginFlash();
                if(loginSuccess){
                    Butel.makeCall(defaults.accessNumber);
                }
                //
            });

        });

        // 立即挂断
        $("#butel-video-hangup").bind("click", function() {

            // 强制恢复状态，不依赖挂断事件
            status = 0;
            resume();
            Butel.hangupFlash();
        });
    };

    /**
     * 恢复
     */
    var resume = function() {
        // flash窗口收回

        $("#butel-video-container").css("opacity", "0");

        // 图片归位
        $("#butel-left-img").animate({"left": "0"}, 1000);
        $("#butel-right-img").animate({"right": "0"}, 1000, null, function() {
            // 切换按钮显隐
            $("#butel-video-hangup").hide();
            $("#butel-video-call").show();
        });
    };

    /**
     * 通话是否接通
     * @type {boolean}
     */
    var callStarted = false;

    /**
     * 是否手动触发挂断
     * @type {boolean}
     */
    var manualHangup = false;

    /**
     * 是否正在系统升级（升级时，立即联系不可用）
     * @type {boolean}
     */
    Butel.updating = false;

    /**
     * 初始化Flash
     */
    Butel.initFlash = function() {
        //butelNetPhoneInit(defaults.videoWidth, defaults.videoHeight, "div", "butel-video-area-temp");
        butelNetPhoneInit(defaults.videoWidth, defaults.videoHeight, "div", "butel-video-area");
    };

    /**
     * 登录Butel
     * 如果已登录，则直接呼叫
     */
    Butel.loginFlash = function() {
        // if (!loginSuccess) {
        butelNetPhoneLogin(defaults.self, defaults.password, defaults.appKey, defaults.nickName, true);
        // } else {
        //     Butel.makeCall(defaults.accessNumber);
        // }
        //testLogin(defaults.server, defaults.self, defaults.password, defaults.appKey, defaults.nickName, true);
    };

    Butel.netPhoneReady = function() {
        Log.log("phone ready...");
        Butel.hideLogPanel();
        initSuccess = true;
        Butel.loginFlash();
        // console.log("登录");
    };

    Butel.hideLogPanel = function() {
        butelNetPhoneLogPanal(false);
    };

    Butel.netPhoneCallStarted = function() {
        Log.log("call started...");
        $("#butel-video-tip").hide();
        callStarted = true;
        // 打开摄像头，显示自身预览
        butelNetPhoneCamera(false);
        stopPlaySound();
    };

    /**
     * 登录成功回调
     */
    Butel.loginFlashSuccess = function() {
        Log.log("login flash success.");
        //Butel.getACD();
        Butel.makeCall(defaults.accessNumber)

        loginSuccess = true;


    };

    /**
     * 登录失败回调
     * @param code
     * @param str
     */
    Butel.netPhoneLoginFailed = function(code, str) {
        Log.log("login flash failed. code=" + code + ", message=" + str);

        loginSuccess = false;
    };

    /**
     * 获取坐席号码
     */
    Butel.getACD = function() {
        Log.log("start to get ACD.");
        butelNetPhoneGetACD(defaults.accessNumber,JSON.stringify(defaults.card));
    };

    Butel.netPhoneMyACD = function(agentNumber) {
        if (!agentNumber) {
            Log.log("未获取到坐席号码");
        } else {
            Log.log("获取到坐席号码：" + agentNumber);
            // Butel.makeCall(accessNumber);
        }
    };

    /**
     * 呼叫
     * @param to
     */
    Butel.makeCall = function(to) {
        Log.log("准备呼叫：" + to);

        try {
            butelNetPhoneMakeCall(to, "video", "客服",60);
            playCallingSound();
        } catch (e) {
            Log.log("make call error: " + e.toString());
        }
    };

    /**
     * 挂断
     */
    Butel.hangupFlash = function() {
        try {
            manualHangup = true;
            butelNetPhoneCallHangup();
        } catch (e) {
            Log.log("Hang up error: " + e.toString());
        }
        stopPlaySound();
    };

    /**
     * 挂断回调事件（正常挂断，无法呼通，坐席拒接，网络断开都会执行）
     */
    Butel.netPhoneCallEnd = function() {
        Log.log("挂断事件到来");
        if (!callStarted && !manualHangup) {    // 在非手动挂断的呼叫未接通时，播放声音
            playNotOnlineSound();
        }

        callStarted = manualHangup = false;
        resume();
    };

    Butel.netPhoneRepermitLogin = function() {
        Log.log("phone logout...");
    };

    /**
     * 释放坐席号码资源
     */
    Butel.releaseACD = function() {
        butelNetPhoneReleaseACD();
    };

    /**
     * 页面卸载时释放坐席号码
     */
    window.onunload = function() {
        //Butel.releaseACD();
    };

    /**
     * 播放呼叫音
     */
    function playCallingSound() {
        audioPlayer.play("sounds/calling.mp3");
    }

    /**
     * 播放未接通音
     */
    function playNotOnlineSound() {
        audioPlayer.play("sounds/notonline.mp3");
    }

    /**
     * 停止播放声音
     */
    function stopPlaySound() {
        audioPlayer.pause();
    }

    $(function() {
        initButelDom();
    });

    window.Butel = Butel;

})(window.Butel || {}, window.jQuery);

