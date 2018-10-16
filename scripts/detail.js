/**
 * Created by Administrator on 2017/4/18.
 */
var URL="http://60.205.136.57:8089";

var id=fnBase.request("id");
detail();
function detail() {
    $(".article").empty();
    $.ajax({
        url: URL+"/jeecmsext/news/queryNews",
        type: "post",
        dataType: "jsonp",
        cache:false,
        data:{
            contentId:id
        },
        error:function () {
            alert(服务器异常);
        },
        success:function (data) {
            console.log(data.obj)
            var obj=data.obj;
            var str="";
            var title=obj.title;
            var description=obj.description;
            var releaseDate=longTimeToDateNoMillisecond(obj.releaseDate);
            var txt=obj.txt;
            var typeImg=obj.typeImg;
            var views=obj.views;
            str+='<h1 class="article-title">'+title+'</h1> <div class="article-attr"> <span>'+releaseDate+'</span><span>'+views+' 次阅读</span> </div><p>&nbsp;</p><p>'+txt+'</p>'
            $(".article").append(str);

        }

    });
};
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