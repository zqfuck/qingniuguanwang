/**
 * Created by Administrator on 2017/5/6.
 */
var count = 60;
var generate = false;
var verifyTel="";
var lastVerify=false;
$("#picCode").focus();

$("#picImg").click(function () {
    $(this).prop("src",URL+"CheckCodeServlet?id=" + new Date().getTime());
});

$("#generCode").click(function () {
    getCode(true);

});

$("#Re_sub").click(function () {
    verify();
});


function inputchange() {

    var vcode = $('#vcode').val();
    if(!(/^[0-9]\d*$/.test(vcode))){
        $('#vcode').val(vcode.replace(/\D/g,''));
        vcode = $('#vcode').val();
    }
    var val=$('#agree').attr("data-val");
    if (vcode != ''&& val == 2) {
        $('#buttsure').attr("onclick", "sureClick();");
        $('#buttsure').removeClass("bcolor3").addClass("bcolor2");
    } else {
        $('#buttsure').attr("onclick", "");
        $('#buttsure').removeClass("bcolor2").addClass("bcolor3");
    }
};

function verify() {
    //$('#regeist').attr("onclick", "");
    var picCode=$("#picCode").val();
    var code = $("#Re_code").val();
    var phone = $("#Re_phone").val();
    pwd=$("#Re_pass").val();
    var confimPwd=$("#Re_password").val();
    if(picCode.length ==0){
        $("#regihtPic").html("请输入正确图片验证码");
        $("#regihtPic").css("visibility","visible");
        showTip("regihtPic");
        // $('#Re_sub').attr("onclick", "verify()");
        return;
    };
    if(!checkPhone(phone)){
        //$('#regeist').attr("onclick", "verify()");
        return;
    };
    /*if(!checkPhone(tel)){
     $('#regeist').attr("onclick", "verify()");
     return;
     };*/
   
    if(code.length ==0){
        $("#regiht_code").html("请输入验证码");
        $("#regiht_code").css("visibility","visible");
        showTip("regiht_code");
       // $('#Re_sub').attr("onclick", "verify()");
        return;
    };
    if(pwd.length ==0 ){

        $("#right_pass").css("visibility","visible");
        showTip("right_pass");
       // $('#Re_sub').attr("onclick", "verify()");
        return;
    };
    if(pwd.length<6||pwd.length>16 ){
        $("#right_pass").html("请设置大于6位且小于16位的密码");
        $("#right_pass").css("visibility","visible");
        showTip("right_pass");
        //$('#Re_sub').attr("onclick", "verify()");
        return;
    };
    if(pwd != confimPwd ){
        $("#right_password").html("请填写一致的密码");
        $("#right_password").css("visibility","visible");
        showTip("right_password");
       // $('#Re_sub').attr("onclick", "verify()");
        return;
    };

    if(phone != verifyTel){
        $.ajax({
            //url :getPath()+"/system/verifyCode.action?code="  + code + "&type=2&tel=" + phone,
            url:URL + "/user/regist",
            type : "post",
            dataType : "jsonp",
            jsonp:"callback",
            data:{
                isRegist:true,
                code:code,
                phone:phone,
                password:pwd,
            },
            error : function() {
                lastVerify= false;
                $("#regiht_code").html("验证验证码失败");
                $("#regiht_code").css("visibility","visible");
                showTip("regiht_code");
                //$('#Re_sub').attr("onclick", "verify()");
            },
            success : function(data) {
                if (!data.success) {
                    lastVerify= false;
                   $("#regiht_code").html("验证码错误");

                    $("#regiht_code").css("visibility","visible");
                    showTip("regiht_code");

                    //$('#Re_sub').attr("onclick", "verify()");

                } else {
                    verifyTel = phone;
                    lastVerify = true;
                    $(".ReBox").hide();
                    $(".Re-succes").show();
                    var i=3;
                    var timer=setInterval(function () {
                            $("#num").html(i);
                            i--;
                        console.log(i)
                            if(i<=0){
                                clearInterval(timer);
                                window.location.href="../login.html";
                            }

                        },1000);


                    //成功的跳转
                    //login(tel,pwd,getMyInfoUrl(),"");
                }
            }
        });
    }else{
        //	gotoRegisterInvestor();
    }

}




























































