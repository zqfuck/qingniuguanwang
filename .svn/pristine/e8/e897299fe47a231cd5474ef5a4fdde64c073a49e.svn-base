/**
 * Created by Administrator on 2017/4/20.
 */
//URL="http://10.130.43.2:8989/jeecmsext";//bms地址
//URL="http://10.130.24.240:8989/jeecmsext";//bms地址
URL="http://60.205.136.57:8089/jeecmsext";//bms地址
var url="http://60.205.136.57:8090/Channel_V4_BMS/";//意见反馈
var type=0;//建议或者投诉
var pageNo=1;
var pageNo2=1;
var pageNo3=1;
var pageSize=12;
var pageYe;//总页数
var val;
//var URL2="http://60.205.136.57:8089";//cms地址

$(document).ready(function () {
    //动态生成标题列表
    $.ajax({
        url: URL+"/help/catalog",
        type: "post",
        dataType: "jsonp",
        cache:false,
        data:{
        },
        error:function (data) {

        },
        success:function (data) {
            //console.log(data)
            if (data.success){
                var obj=data.obj;
                //console.log(obj);
                $.each(obj,function (i, ele) {
                    var str='';
                    var channelName1=ele.channelName;
                    var id1=ele.id;
                    var sub=ele.sub;
                   str='<div class="zq-slidebox"> <h3 class="zq-tit zq-biao" data-id="'+id1+'">'+channelName1+'</h3> <div class="zq-down none" id="'+id1+'"></div> </div>';
                    $(".middle-left").append(str);
                    $.each(sub,function (i, ele) {
                        var str2='';
                        var channelName2=ele.channelName;
                        var id2=ele.id;
                        str2='<p class="zq-list" id="'+id2+'">'+channelName2+'</p>';
                        $("#"+id1+"").append(str2);

                    });
                });
            }else {

            };

        }
    });

    $("#zq-advice").click(function () {
        $(".middle-right").hide();
        $(".zq-down").stop().slideUp();
        $("#zq_advise").show();

    })

    $("#search_Btn").click(function () {
        val=$("#search_Inp").val();
        $(".tcdPageCode").empty();
        if (val==""){
            $("#rightList").empty();
            var str2='<h5>请输入搜索内容。</h5>'
            $("#rightList").append(str2);
        }else {
            pageNo=1;
            search();
            setTimeout(function () {
                $(".tcdPageCode2").empty();
                $(".tcdPageCode3").empty();
                $(".tcdPageCode").createPage({
                    pageCount:pageYe,
                    current:1,
                    backFn:function(p){
                      //  console.log(p);
                        pageNo=p;
                        search();
                    }
                });
            },500);
        }


    });
    function search() {
        $.ajax({
            url: URL + "/help/search",
            type: "post",
            dataType: "jsonp",
            cache: false,
            data: {
                pageNo: pageNo,
                pageSize: pageSize,
                keyWords:val
            },
            error: function () {
                $("#rightList").empty();
                var str2='<h5>您搜索的内容不存在。</h5>'
                $("#rightList").append(str2);
            },
            success: function (data) {
                if (data.success){
                    var obj=data.obj;
                    if(obj==""||obj==undefined||obj==null){
                        $("#rightList").empty();
                        var str2='<h5>您搜索的内容不存在。</h5>'
                        $("#rightList").append(str2);
                    }else {
                        var total=data.total;
                        pageYe=Math.ceil(total/pageSize);
                        var str='';
                        $.each(obj,function (i, ele) {
                            var contentId=ele.contentId;

                            var title=ele.title;
                            str+='<h5><a href="./newList.html?id='+contentId+'" target="_blank">'+title+'</a></h5>'
                        });
                        $("#rightList").empty();
                        $("#rightList").append(str);
                    }

                };

            }
        });

    };



//标题点击
    $(".middle-left").on("click",".zq-biao",function  () {
        //$(".down").hide();
        $(".zq-down").stop().slideUp();
        $(this).siblings().stop().slideToggle();
        $("#zq_advise").hide();
        $("#zq_listS").show();
        var id=$(this).attr("data-id");
        pageNo2=1;
        list();
     function list() {

         $.ajax({
             url: URL + "/help/contentList",
             type: "post",
             dataType: "jsonp",
             cache: false,
             data: {
                 pageNo:pageNo2,
                 pageSize:pageSize,
                 id:id
             },
             error: function (data) {

             },
             success: function (data) {
                 //console.log(data);
                 if (data.success){
                     var obj=data.obj;
                     var total=data.total;
                     pageYe=Math.ceil(total/pageSize);
                     var str='';
                     $.each(obj,function (i, ele) {
                         var contentId=ele.contentId;

                         var title=ele.title;
                         str+='<h5></span><a href="./newList.html?id='+contentId+'" target="_blank"><span class="kuo">></span>'+title+'</a></h5>'
                     });
                     $("#rightList").empty();
                     $("#rightList").append(str);
                 }
             }
         });
     };
        setTimeout(function () {
            $(".tcdPageCode").empty();
            $(".tcdPageCode3").empty();
            $(".tcdPageCode2").createPage({
                pageCount:pageYe,
                current:1,
                backFn:function(p){
                    //console.log(p);
                    pageNo=p;
                    list();

                }
            });
        },500);

    });
//点击颜色变化
    $(".middle-left").on("click",".zq-tit",function  () {
        $(".zq-tit").removeClass("zq-color");
        $(this).addClass("zq-color");
    });
//二级列表点击
    $(".middle-left").on("click",".zq-list",function  () {
        $(".zq-tit").removeClass("zq-color");
        $(".zq-list").removeClass("zq-color");
        $(this).addClass("zq-color");
        var id=$(this).attr("id");
        pageNo3=1;
        list_small();
        function list_small() {

            $.ajax({
                url: URL + "/help/contentList",
                type: "post",
                dataType: "jsonp",
                cache: false,
                data: {
                    pageNo:pageNo3,
                    pageSize:pageSize,
                    id:id
                },
                error: function (data) {

                },
                success: function (data) {
                    //console.log(data);
                    if (data.success){
                        var obj=data.obj;
                        var total=data.total;
                        pageYe=Math.ceil(total/pageSize);
                        var str='';
                        $.each(obj,function (i, ele) {
                            var contentId=ele.contentId;

                            var title=ele.title;
                            str+='<h5><a href="./newList.html?id='+contentId+'" target="_blank"><span class="kuo">></span>'+title+'</a></h5>'
                        });
                        $("#rightList").empty();
                        $("#rightList").append(str);
                    }
                }
            });
        };
        setTimeout(function () {
            $(".tcdPageCode").empty();
            $(".tcdPageCode2").empty();
            $(".tcdPageCode3").createPage({
                pageCount:pageYe,
                current:1,
                backFn:function(p){
                    //console.log(p);
                    pageNo=p;
                    list_small();
                }
            });
        },500);
    });

    $('.middle-right label').click(function(){
        var radioId = $(this).attr('name');
        $('label').removeAttr('class') && $(this).attr('class', 'zq-clickLabel');
        $('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
    });

    $(".jian").click(function () {
        type=0;
    });
    $(".tou").click(function () {
        type=1;
    })
    $("#btn-sub").click(function () {
        var val=$("#Text").val();
        if (val==""||val==undefined){
            alert("请录入反馈信息");
        }else {

            if (val.length>200){
                val=val.substring(0,199);
            };
            $.ajax({
                url: url+"suggest/newSuggest",
                type: "post",
                dataType: "jsonp",
                cache:false,
                data:{
                    type:type,
                    txt:val
                },
                error:function () {
                },
                success:function (data) {
                   // console.log(data)
                    if(!data.success){
                        if (data.code==4){
                            alert("请先登录后再操作。")
                        }
                    }else {
                        alert("提交成功,谢谢您的反馈");
                    }
                }
            })

            $("#Text").val("");
        };
    });





});

























