/**
 * Created by Administrator on 2017/5/4.
 */
//var URL="http://10.130.43.2:8989/Channel_V4_BMS/";//bms地址
var URL="http://60.205.136.57:8888/Channel_V4_BMS/";//bms地址


/*是否登录*/
$.ajax({
    url: URL + "/user/selfInfo",
    type: "post",
    dataType: "jsonp",
    data: {
    },
    error: function () {
        $("#center_show").hide();
        $("#login_show").show();
    },
    success: function (json) {
        //console.log(json);
        var code=json.code;
        if (!json.success){
            if (code==4){
                $("#center_show").hide();
                $("#login_show").show();
            }else if (code==6){
                alert("该账号已被其他用户登录,请重新登录");
                //window.location.href="./login.html";
            }else if (code==7){
                alert("该账号密码已被修改，请重新登录");
                //window.location.href="./login.html";
            };
        }else {
            $("#login_show").hide();
            $("#center_show").show();
        }

    }
});
/*退出*/
$("#loginOut").click(function () {
    $.ajax({
        url: URL + "/user/logout",
        type: "post",
        dataType: "jsonp",
        data: {

        },
        error: function () {

        },
        success: function (data) {
            console.log(data)
            if (data.success){
                $("#center_show").hide();
                $("#login_show").show();
            }
        }
    });

});
/*if ($.cookie("login_success")){
    $("#login_show").hide();
    $("#center_show").show();

}else {
    $("#center_show").hide();
    $("#login_show").show();

}*/

function focusId(id){
    if(id.length >0){
        var input = document.getElementById(id);
        var val = input.value;
        input.value = "";
        input.value = val;
        document.getElementById(id).focus();
    }
};
function isPhoneNumber(phoneNumber){
    var isPhone = true;
    if(phoneNumber == null || phoneNumber == ''){
        isPhone =  false;
    }
    if(phoneNumber.length != 11){
        isPhone = false;
    }
    var str = "^[1][3,4,5,7,8][0-9]{9}$";
    //var str=/^[1][3,4,5,7,8][0,9]{9}$/;
    if(!phoneNumber.match(str)){
        isPhone = false;
    }
    return isPhone;
}
function showTip(id) {
  //var Tip_id=document.getElementById(id);
    setTimeout(
        function() {
           $("#"+id+"").css({"visibility":"hidden"});
            //Tip_id.css("visibility","hidden");
        },2000);
};




// 验证码倒计时
function setRemainTime() {

    if (count <= 0) {
        //	$("#generCode").removeClass("bcolor3").addClass("bcolor2");
        $("#stext").show();
        $("#timer").hide();
        count = 60;
        generate = false;
    } else {
        //	$("#generCode").removeClass("bcolor2").addClass("bcolor3");
        $('#timer').html(count + 's后重发');
        count--;
        setTimeout(setRemainTime, 1000);
    }
};
function checkPhone(phone) {

    var len = phone.length;
    if (len != 11 ||!isPhoneNumber(phone) ) {
        $("#right_ph").css("visibility","visible");

        showTip("right_ph");
        focusId("Re_phone");
        return false;
    }
    return true;
};

function checkMail(email){
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(email)) {
        return false;
    };
    return true;
}

function getCode(type) { // 获取验证码
    if (count != 60)
        return; // 60秒后重新获取
    var phone = $("#Re_phone").val();

    if (checkPhone(phone)) { // 手机号正确

        if (!generate){
            generateCode(type);
        }
        /*
         * if (generateCode()==true) { //正确发送验证码
         *
         * countDown(); //倒计时 canlog = true; }else{ alert("获取验证码失败"); }
         */
    }
}
function generateCode(type) { // 发送验证码
    generate = true;
    type=type;
    var phone = $("#Re_phone").val();
    var val=$("#picCode").val();
    console.log(val)
    $.ajax({
        //url :getPath()+ "/system/getCode.action?tel=" + phone + "&type="+type,
        url: URL+"user/sendSecCode",
        type : "post",
        dataType : "jsonp",
        jsonp:"callback",
        data:{
            isRegist:type,
            code:val,
            phone:phone
        },
        error : function() {
            alert("网络异常")
            focusId("phone");
            generate = false;
            count=0;
        },
        success : function(data) {

            console.log(data);
            if(data.success){
                if (data.code=="1"){
                    $("#picImg").prop("src",URL+"CheckCodeServlet?id=" + new Date().getTime());
                    $("#right_ph").html("验证码发送失败");
                    $("#right_ph").css("visibility","visible");
                    showTip("right_ph")
                    generate = false;
                }else if(data.code=="2"){

                    if (type){
                        $("#picImg").prop("src",URL+"CheckCodeServlet?id=" + new Date().getTime());
                        $("#right_ph").html("手机号已被注册");
                        $("#right_ph").css("visibility","visible");
                        showTip("right_ph");
                        verifyTel=phone;
                        generate = false;
                    }else {
                        $("#picImg").prop("src",URL+"CheckCodeServlet?id=" + new Date().getTime());
                        $("#right_ph").html("请输入您的账号");
                        $("#right_ph").css("visibility","visible");
                        showTip("right_ph");
                        generate = false;
                    }
                }else {
                    countDown();// 倒计时
                    $("#right_ph").html("发送成功");
                    $("#right_ph").css("visibility","visible");
                    showTip("right_ph")
                    //showTip("发送成功");
                }
            }else {
                $("#right_ph").html(data.msg);
                $("#right_ph").css("visibility","visible");
                showTip("right_ph");
                $("#picImg").prop("src",URL+"CheckCodeServlet?id=" + new Date().getTime());
                generate = false;
            }
        }
    });

}

function countDown() {
    var phone = $("#phone").val();
    $('#timer').show();
    $('#stext').hide();
    if (count != 60)
        count = 60;
    else
        setRemainTime();

}



function longTimeToDateNoMillisecond(longTime){
    var day = new Date(longTime); //将毫秒转化为当前日期
    var year = day.getFullYear();
    var month = day.getMonth()+1;
    var date = day.getDate();
    var hours = day.getHours();
    var minutes = day.getMinutes();
    var second = day.getSeconds();
    if(month<10){
        month = "0"+month;
    }
    if(date<10){
        date = "0"+date;
    }
    if(hours<10){
        hours = "0"+hours;
    }
    if(minutes<10){
        minutes = "0"+minutes;
    }
    if(second<10){
        second = "0"+second;
    }

    var newDay = year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+second;

    return newDay;
};






/*
 * 如果登录成功需要跳转，则传action，否则刷新页面
 * operation传空即可
 *
 * */
function login(loginName,loginPwd ,action,operation){

    $.ajax({
        url:URL + "/user/login",
        type : "post",
        dataType : "jsonp",
        data:{
            phone:loginName,
            password:loginPwd,
            type:"1"
        },
        error : function() {
            if(operation ==1){
                $('#doLogin').attr("onclick", "doLogin()");
            }
            return false;
        },
        success : function(json) {
            console.log(json)
            if (!json.success) {
                $("#lo_pass").html("用户名或密码错误");

                $("#lo_pass").css("visibility","visible");
                showTip("lo_pass");
                if(operation ==1){
                    $('#doLogin').attr("onclick", "doLogin()");
                }
            } else {
                var json=json.obj;
                $.cookie("login_success","true");
                localStorage.find_tel=loginName;
                window.location.href = "./indexPc.html";

            }
        }
    });
};

//试用连接
$(".try").click(function () {
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
        isMobile = isAndroid || isIos;

    if(isMobile){
        window.open("http://www.cdesk.v114.com/views/register/registerPhone.html");
    }else{
        window.open("http://www.cdesk.v114.com/register/gotoRegister");
    }
});





















