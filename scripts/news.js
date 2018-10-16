/**
 * Created by Administrator on 2017/4/18.
 */
var URL="http://60.205.136.57:8089";
var pageNo=1;
var pageSize=5;
var pageYe;//总页数

newsList();//首页初始化
//点击首页
$(".zq-first").click(function () {
    pageNo=1;
    newsList();
});
//点击上一页
$(".zq-pre").click(function () {
    pageNo--;
    if (pageNo<=1){
        pageNo=1;
    };
    newsList();
});
//点击下一页
$(".zq-next").click(function () {
    pageNo++;
    if (pageNo>=pageYe){
        pageNo=pageYe;
    };
    newsList();
});
//点击尾页
$(".zq-end").click(function () {
    pageNo=pageYe;
    newsList();
});

function newsList() {
    $(".news-list").empty();
    $.ajax({
        url: URL+"/jeecmsext/news/normal",
        type: "post",
        dataType: "jsonp",
        cache:false,
        data:{
            pageNo:pageNo,
            pageSize:pageSize
        },
        error:function () {
            alert(服务器异常);
        },
        success:function (data) {
            var obj=data.obj;
            var total=data.total;
            pageYe=Math.ceil(total/pageSize);

            var str="";
            $.each(obj,function (i,ele) {
                var description=ele.description;
                var releaseDate=longTimeToDateNoMillisecond(ele.releaseDate);
                var title=ele.title;
                var typeImg=URL+ele.typeImg;
                var contentId=ele.contentId;
                str+='<li class="clearfix"> <div class="pull-left pictrue"><a href="news/93.html?id='+contentId+'" target="_blank"><img src="'+typeImg+'" alt='+title+' /></a></div> <div class="pull-right info"> <h3><a href="news/93.html?id='+contentId+'" target="_blank">'+title+'</a></h3> <div class="attr"><span>'+releaseDate+'</span></div> <p class="desc">'+description+'</p></div> </li>'

            });
            $(".news-list").append(str);
        }

    });
}

/*时间转换*/
function longTimeToDateNoMillisecond(longTime){
    var day = new Date(longTime); //将毫秒转化为当前日期
    var year = day.getFullYear();
    var month = day.getMonth()+1;
    var date = day.getDate();
    if(month<10){
        month = "0"+month;
    }
    if(date<10){
        date = "0"+date;
    };
    var newDay = year+"-"+month+"-"+date+" ";
    return newDay;
};