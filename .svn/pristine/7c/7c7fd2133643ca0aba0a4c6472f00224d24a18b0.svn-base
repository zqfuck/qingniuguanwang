
/**
 * Created by Administrator on 2017/5/8.
 */
//var URL="http://10.130.43.2:8989/Channel_V4_BMS/";//bms地址
//var URL="http://10.130.24.240:8989/Channel_V4_BMS/";//bms地址
$(document).ready(function () {
    $("#login").click(function () {
        doLogin();
    })


    function doLogin(){
        //$('#doLogin').attr("onclick", "");
        var tel=$("#login_ph").val();
        var pwd=$("#login_pass").val();

        if(!(/^1[34578]\d{9}$/.test(tel))){
           // $("#lo_phone").html("请录入正确手机号码");

            $("#lo_phone").css("visibility","visible");
            showTip("lo_phone");
            focusId("tel");
            //$('#doLogin').attr("onclick", "login()");
            return;
        }
        if(pwd.length == 0){
            $("#lo_pass").html("请录入密码")
            $("#lo_pass").css("visibility","visible");
            showTip("lo_pass");
            //$('#doLogin').attr("onclick", "login()");
            return;
        }
        login(tel,pwd,"","1");
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


















});







































