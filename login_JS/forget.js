/**
 * Created by Administrator on 2017/5/8.
 */
var count = 60;
var generate = false;
var verifyTel="";
var lastVerify=false;

$(document).ready(function () {
    $(".Pforget").click(function () {
        $(this).addClass("forgetC").siblings().removeClass("forgetC");
        var index=$(this).index();
        $(".forgetP").eq(index).show().siblings().hide();
    });

    $("#generCode").click(function () {
        getCode(false);
    });
    $("#Fg_sub").click(function () {
        forgetPwd();
    });
    $("#Fg_Esub").click(function () {
        forgetE();
    })
    function forgetPwd(){
        var forgetPwd=$("#Fg_pass").val();
        var forgetconfimPwd=$("#Fg_password").val();

        var forgetPwdTel=$("#Re_phone").val();
        var forgetPwdCode=$("#Fg_code").val();
        if(!(/^1[34578]\d{9}$/.test(forgetPwdTel))){
            $("#right_ph").html("请录入正确手机号码")
            $("#right_ph").css("visibility","visible");
            showTip("right_ph");
            focusId("Re_phone");
            return;
        };
        if(forgetPwdCode.length == 0){
            $("#regiht_code").html("请输入验证码")
            $("#regiht_code").css("visibility","visible");
            showTip("regiht_code");
            focusId("Fg_code");
            return;
        };
        if(forgetPwd==""){
            $("#Fg_pwd").html("请填写密码")
            $("#Fg_pwd").css("visibility","visible");
            showTip("Fg_pwd");
            focusId("Fg_pass");
            return ;
        }
        if(forgetPwd.length<6||forgetPwd.length>16 ){
            $("#Fg_pwd").html("请设置大于6位且小于16位的密码");
            $("#Fg_pwd").css("visibility","visible");
            showTip("Fg_pwd");
            focusId("Fg_pass");
            return;
        };
        if(forgetPwd != forgetconfimPwd){
            $("#Fg_same").html("请填写一致的密码")
            $("#Fg_same").css("visibility","visible");
            showTip("Fg_same");
            focusId("Fg_pass");
            return ;
        };
        $.ajax({
            url:  URL + "/user/regist",
            type: 'post',
            dataType: 'jsonp',
            data: {
                isRegist:false,
                phone:forgetPwdTel,
                code:forgetPwdCode,
                password:forgetPwd,
            },
            error : function() {
                $("#Fg_same").html("网络异常");
                $("#Fg_same").css("visibility","visible");
                showTip("Fg_same");
            },
            success : function(json) {

                console.log(json);
                if (!json.success) {
                    $("#regiht_code").html("验证码错误");
                    $("#regiht_code").css("visibility","visible");
                    showTip("regiht_code");

                    $('#Fg_sub').attr("onclick", "forgetPwd()");

                } else {
                    window.location.href="./findP.html";
                }

            }
        });

    };

    function forgetE() {

        var Ephone=$("#Ephone").val();
        var Fgmail=$("#Fg-email").val();

        if(!(/^1[34578]\d{9}$/.test(Ephone))){
            $("#Etel").html("请录入正确手机号码")
            $("#Etel").css("visibility","visible");
            showTip("Etel");
            focusId("Ephone");
            return;
        };

        if (! /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(Fgmail)){
            $("#E_mail").html("请输入正确邮箱")
            $("#E_mail").css("visibility","visible");
            showTip("E_mail");
            focusId("Fg-email");
            return;
        };
        $.ajax({
            url:  URL + "/user/mail",
            type: 'post',
            dataType: 'jsonp',
            data: {
                add:false,
                phone:Ephone,
                email:Fgmail
            },
            error : function() {
                $("#E_mail").html("网络异常");
                $("#E_mail").css("visibility","visible");
                showTip("E_mail");
            },
            success : function(json) {

                console.log(json);
                if (!json.success) {
                    if(json.code==5){
                        $("#E_mail").html("手机号或邮箱错误");
                        $("#E_mail").css("visibility","visible");
                        showTip("E_mail");
                    };
                    if(json.code==1){
                        $("#E_mail").html("服务器出错");
                        $("#E_mail").css("visibility","visible");
                        showTip("E_mail");
                    };

                    $('#Fg_sub').attr("onclick", "forgetPwd()");

                } else {
                    localStorage.find_mail=Fgmail;
                    localStorage.find_tel=Ephone;
                    window.location.href="./findE.html";
                }

            }
        });





    }


})















































