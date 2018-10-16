/**
 * Created by Administrator on 2017/5/6.
 */
var pageNo=1;
var pageSize=4;
var pageYe;//总页数
$(document).ready(function () {
    /*退出*/
    $("#center_loginOut").click(function () {
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
                    window.location.href="./indexPc.html";
                }
            }
        });

    });




    $.ajax({
        url: URL + "/user/selfInfo",
        type: "post",
        dataType: "jsonp",
        data: {

        },
        error: function () {

        },
        success: function (json) {
            //console.log(json)
            var  obj=json.obj;
            var phone=obj.phone;
            var email=obj.email;
            var registTime=longTimeToDateNoMillisecond(obj.registTime);
           // console.log(registTime)
            $(".bank").html(phone);
            $(".re_time").html(registTime);
            if (email==""||email==undefined||email==null){

            }else {
                $("#save_unbind").html("已绑定");
                $("#save_bind").css({"display":"none"});
            }
        }
    });
    user();
    setTimeout(function () {
        $(".tcdPageCode").createPage({
            pageCount:pageYe,
            current:1,
            backFn:function(p){
                //console.log(p);
                pageNo=p;
                user();

                $(".center_all").addClass("none");
                $("#center_some").removeClass("none");
                $(".checkInp").addClass("none");
            }
        });
    },500);
   function user() {
       $("#center_msg").empty();
       $.ajax({
           url: URL + "/message/messageList",
           type: "post",
           dataType: "jsonp",
           data: {
               pageNo:pageNo,
               pageSize:pageSize
           },
           error: function () {

           },
           success: function (json) {
             //  console.log(json)
               var total=json.total;
               pageYe=Math.ceil(total/pageSize);
               var  obj=json.obj;
               var str='';
               $.each(obj,function (i, ele) {
                   var content=ele.content;
                   var subject=ele.subject;
                   var sendTime=longTimeToDateNoMillisecond(ele.sendTime);
                   var id=ele.id;
                   str+='<div class="center_message"> <h3>'+subject+' <span class="center_time">'+sendTime+'</span></h3> <div class="center_con">'+content+' </div> <p class="check_delete"><input type="checkbox" class="checkInp none" id="'+id+'"><span class="single_dle">删除</span></p> </div>'
               });
               $("#center_msg").append(str);
           }
       });
   }



    $(".center_check").click(function () {
        $(".center_check").removeClass("center_color");
        $(this).addClass("center_color");

        var index=$(this).index();

       $(".centerR_box").eq(index).show().siblings().hide();


    });
    $("#hu").click(function () {
        $(this).removeClass("center_color");
        $("#person").addClass("center_color");
    });
    $("#center_some").click(function () {
        $(this).addClass("none");
        $(".center_all").removeClass("none");
        $(".checkInp").removeClass("none");
        $("#cancel").click(function () {
            $(".center_all").addClass("none");
            $("#center_some").removeClass("none");
            $(".checkInp").addClass("none");
        })

    });

    $("#save_change").click(function () {
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
               // console.log(json);
                var code=json.code;
                if (!json.success){
                    if (code==4){
                        $("#center_show").hide();
                        $("#login_show").show();
                        window.location.href="./login.html";
                    }
                }else {
                    window.open("./login/changePass.html")
                }
            }
        });
    });
    $("#save_bind").click(function () {
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
                        window.location.href="./login.html";
                    }
                }else {
                    window.open("./login/bindEmail.html");
                }
            }
        });



    });

    $("#center_msg").on("click",".single_dle",function () {
        var arrId=[];
        var id= $(this).prev().attr("id");
        arrId.push(id);
        $.ajax({
            url: URL + "/message/deleteMessage",
            type: "post",
            dataType: "jsonp",
            data: {
               ids:arrId
            },
            error: function () {
            },
            success: function (json) {
                user();
                setTimeout(function () {
                    $(".tcdPageCode").createPage({
                        pageCount:pageYe,
                        current:pageNo,
                        backFn:function(p){
                            //console.log(p);
                            pageNo=p;


                        }
                    });
                },100);
                //$(this).parent().parent().remove();

            }
        });
       // $(this).parent().parent().remove();
    });
    var idArr=[];
    $("#center_msg").on("click","input",function () {
        if ($(this).is(":checked")==true){
            var id= $(this).attr("id");
            // alert(id)
            idArr.push(id);

        }else {
            var id= $(this).attr("id");
            var index = idArr.indexOf(id);
            idArr.splice(index,1);
        }
    });
   $("#delete_check").click(function () {
       $.ajax({
           url: URL + "/message/deleteMessage",
           type: "post",
           dataType: "jsonp",
           data: {
               ids:idArr
           },
           error: function () {

           },
           success: function (json) {
                user();
               $(".center_all").addClass("none");
               $("#center_some").removeClass("none");
               $(".checkInp").addClass("none");
               setTimeout(function () {
                   $(".tcdPageCode").createPage({
                       pageCount:pageYe,
                       current:pageNo,
                       backFn:function(p){
                           //console.log(p);
                           pageNo=p;


                       }
                   });
               },100);
           }
       });


   });
   /* if ( $("input[type='checkbox']").is(':checked')){

        //$("input[type='checkbox']").is(':checked').parent().parent().remove();
    }*/


})























