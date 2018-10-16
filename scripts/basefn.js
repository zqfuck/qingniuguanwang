// JavaScript Document
if(!Function.prototype.bind){
    Function.prototype.bind = function(obj) {

        var _this = this,
            fnslice = Array.prototype.slice,
            args = fnslice.call(arguments, 1),
            innerArgs,finalArgs;
        return function () {
            innerArgs = fnslice.call(arguments);
            finalArgs = args.concat(innerArgs)
            return _this.call(obj,finalArgs);
        };

    }
}

var fnBase = {
    fnMouseEvent: function(arr,mouseevent,str,fn){
        if(typeof arguments[2] != 'string')
        {
        }
        switch(mouseevent){

            case 'click':
                if(!str){
                    var str = 'active';
                }
                arr.click(function(){
                    if($(this).hasClass(str)) return;
                    arr.removeClass(str);
                    $(this).addClass(str);
                    var iNow =arr.index(this);
                    var _this = $(this);

                    if(fn) fn(iNow,_this);
                });
                break;

            case 'mouseover':
                if(!str){
                    var str = 'hover';
                }
                arr.mouseover(function(){
                    if($(this).hasClass(str)) return;
                    arr.removeClass(str);
                    $(this).addClass(str);
                    var iNow =arr.index(this);
                    var _this = $(this);
                    if(fn) fn(iNow,_this);
                });
                break;
        }

    },
    fnFocus2:function(obj,opt,fn){
        var oPrev,oNext,oUl,aLi,aBtn,t1,t2,num,notAuto,cellBack,move,mouseevent,mousestr,opt,iNow =0,len= 0;
        oPrev=obj.prev;
        oNext=obj.next;
        oUl=obj.ul;
        aLi=obj.li;
        aBtn=obj.btn;
        opt = opt || {}
        t1=opt.t1||300;
        t2=opt.t2||2000;
        num=opt.num || 1;
        move=opt.move || 'scroll';
        mouseevent = opt.mouseevent || 'mouseover';
        mousestr = opt.mousestr || 'active';
        notAuto=opt.notAuto && true || false;
        cellBack=function(iNow){
            if(fn) fn(iNow);
        };
        len = aLi.length;
        aBtn && aBtn.addClass('select-not');
        oPrev && oPrev.addClass('select-not');
        oNext && oNext.addClass('select-not');

        if(move=='scroll'){
            var l = 0,w= 0;
            var ml = parseInt(aLi.css('marginLeft'))||0;
            var mr = parseInt(aLi.css('marginRight'))||0;
            w = mr+ml;

            w+=aLi.outerWidth();
            len = Math.ceil(aLi.length/num);
            l = w*num;
            oUl.css('width',w*aLi.length);

        } else {
            aLi.hide()
            aLi.eq(iNow).show();
            aBtn.eq(iNow).addClass(mousestr);
        }

        oPrev&&oPrev.click(function(){

            iNow--;
            iNow <0 && (iNow= len-1);
            iNow=iNow%len;
            objmove(iNow)
        });
        oNext&&oNext.click(function(){
            iNow++;
            iNow=iNow%len;
            objmove(iNow)
        });
        notAuto || function(){
            var timer = null;
            oUl.parent().hover(function(){
                clearInterval(timer)
            },function(){
                autoPlay()
            });
            autoPlay()
            function autoPlay(){
                timer = setInterval(function(){
                    iNow++;
                    iNow=iNow%len;

                    objmove(iNow)
                },t2)
            }
        }();
        aBtn && this.fnMouseEvent(aBtn,mouseevent,mousestr,function(index, _this ){
            if(iNow == index) return;
            iNow =index;
            objmove(iNow);
        });

        function objmove(iNow){
            switch (move){
                case 'scroll' :
                    aBtn && aBtn.removeClass(mousestr).eq(iNow).addClass(mousestr);
                    oUl.stop().animate({'left':-iNow*l},t1,function(){
                        cellBack(iNow);
                    });
                    break;
                case  'fade' :
                    aBtn && aBtn.removeClass(mousestr).eq(iNow).addClass(mousestr);
                    aLi.fadeOut();
                    aLi.eq(iNow).fadeIn();
                    cellBack(iNow);
                    break;
                default :
                    break;
            }
        }

    },
    /*
     fnSlide: function (oPrev,oNext,oUl,aLi,num,t,abtn,fn)
     {

     var l = 0,w=0;
     var ml = parseInt(aLi.css('marginLeft'))||0;
     var mr = parseInt(aLi.css('marginRight'))||0;
     var t=t||300;
     var num = num||1;
     w = mr&&(ml&&mr+ml)||ml&&(mr&&mr+ml)||0
     w+=aLi.outerWidth();

     oUl.css('width',w*aLi.length);


     oPrev.click(function(){

     l+=w*num;
     if(l>0){
     l = -(oUl.width()-w*num);;
     }
     oUl.stop().animate({'left':l},t);
     });
     oNext.click(function(){
     l =l-w*num;
     if(l<-(oUl.width()-w*num)){
     l = 0;
     };
     oUl.stop().animate({'left':l},t);

     });
     if(abtn){
     abtn.click(function(){
     var index = $(this).index()
     l =-index*w*num;
     if(l<-(oUl.width()-w*num)){
     l = 0;
     };
     oUl.stop().animate({'left':l},t);
     })
     }
     function callBack (){
     if(fn) fn()
     }
     },*/


    fnFocusWF:function(obj,opts,fn){
        var oPrev,oNext,oUl,aLi,aBtn,t1,t2,num,notAuto,cellBack,mouseevent,mousestr,opt,iNow =0,len= 0,bAnim;
        oPrev=obj.prev;
        oNext=obj.next;
        oUl=obj.ul;
        aLi=obj.li;
        aBtn=obj.btn;
        opt = opts || {};
        t1=opt.t1||300;
        t2=opt.t2||2000;
        num=opt.num || 1;

        mouseevent = opt.mouseevent || 'mouseover';
        mousestr = opt.mousestr || 'active';
        notAuto=opt.notAuto && true || false;
        cellBack=function(iNow){
            if(fn) fn(iNow);
        };
        len = aLi.length;

        aBtn && aBtn.addClass('select-not');
        oPrev && oPrev.addClass('select-not');
        oNext && oNext.addClass('select-not');

        var l = 0,w= 0;
        var ml = parseInt(aLi.css('marginLeft'))||0;
        var mr = parseInt(aLi.css('marginRight'))||0;
        w = mr+ml;
        w+=aLi.outerWidth();
        len = (aLi.length/num);
        if(aLi.length%num!=0||len<2){
            aBtn && aBtn.hide();
            oPrev && oPrev.hide();
            oNext && oNext.hide();
            return}

        l = w*num;
        oUl.html(oUl.html()+oUl.html());
        oUl.css('width',2*w*aLi.length);

        oPrev&&oPrev.click(function(){
            if(bAnim) return;
            console.log(parseInt(oUl.css('left'))+"+"+len*l)
            if(parseInt(oUl.css('left'))>=0){

                oUl.css('left',-len*l);
                iNow = len
            }
            iNow--;

            objmove()
        });
        oNext&&oNext.click(function(){
            if(bAnim) return;
            console.log(parseInt(oUl.css('left'))+"+"+len*l)
            if(parseInt(oUl.css('left'))<=-len*l){
                oUl.css('left',0);
                iNow = 0
            }
            iNow++;

            objmove()
        });
        notAuto || function(){
            var timer = null;
            oUl.parent().hover(function(){
                clearInterval(timer)
            },function(){
                autoPlay()
            });
            autoPlay()
            function autoPlay(){
                timer = setInterval(function(){
                    iNow++;
                    iNow=iNow%len;

                    objmove()
                },t2)
            }
        }();
        aBtn && this.fnMouseEvent(aBtn,mouseevent,mousestr,function(index, _this ){
            if(bAnim) return;
            if(iNow == index) return;
            iNow =index;
            objmove(iNow);
        });

        function objmove(){
            bAnim = true;
            aBtn && aBtn.removeClass(mousestr).eq(iNow).addClass(mousestr);
            oUl.animate({'left':-iNow*l},t1,function(){
                bAnim = false;
                cellBack(iNow);
            });
        }

    },
    fnSearch: function (obj,val,fnInt,fnOut){

        obj.val(val);

        obj.focus(function(){

            if(obj.val()==val)
            {
                obj.val('');
            }
            if(fnInt) fnInt();


        });
        obj.blur(function(){
            if(obj.val()=='')
            {
                obj.val(val);
            }
            if(fnOut) fnOut();
        });

    },
    fnFocusPic: function(obj,opt){
            var moving,aLi,auto,l,aBtn,aWrap,aBtnStr,iW,timer,t1,t2, iNow= 0 ,index = 0;

            aLi = obj.li
            aBtn =  obj.btn
            aWrap = obj.wrap || aLi.parent().parent();

            var opt = opt || {};
            auto = opt.auto || true;
            aBtnStr = opt.str || 'active';
            t1 = opt.t1||500;
            t2 = opt.t2||4000;

            l = aLi.length;
            iW = parseInt(aLi.css('width'));
            timer = null;
            moving = false;

            aLi.css('left',iW).eq(0).css('left',0);
            aBtn.on('click',function(){
                index = $(this).index();
                anima();
            });

            auto && function(){
                autoPaly ();
                aWrap.hover(function(){
                    clearInterval(timer);
                },autoPaly);
            }();

            function autoPaly (){
                timer = setInterval(function(){
                    index++;
                    index%=l;
                    anima();
                },t2)
            };
            function anima(){
                if(moving) return;
                moving = true;
                aBtn.removeClass(aBtnStr).eq(index).addClass(aBtnStr);

                if(iNow < index){

                    aLi.eq(index).css('left',iW)
                    aLi.eq(index).animate({'left':0},t1);
                    aLi.eq(iNow).animate({'left':-iW},t1,function(){
                        moving = false;
                    });
                } else if(iNow > index){

                    aLi.eq(index).css('left',-iW)
                    aLi.eq(index).animate({'left':0},t1);
                    aLi.eq(iNow).animate({'left':iW},t1,function(){
                        moving = false;
                    });
                }
                iNow = index;
            }



    },
    //放大镜 oSmImg鼠标移入对象，oBgImg放大显示的图像，oWarp放大显示的区域，oMoveMouse鼠标移入的时，放大的选区
    fnBlowUp:function (oSmImg,oBgImg,oWarp,oMoveMouse){

        oSmImg.on('mouseover',function(e){
            oWarp.show();
            oMoveMouse.show();

            var disx = oBgImg.width()-oWarp.width();
            var disy = oBgImg.height()-oWarp.height();
            var e = e||window.event;
            var l=e.pageX-oSmImg.offset().left-oMoveMouse.width()/2;
            var t=e.pageY-oSmImg.offset().top-oMoveMouse.height()/2;

            oSmImg.on('mousemove',function(e){
                var e = e||window.event;
                var l=e.pageX-oSmImg.offset().left-oMoveMouse.width()/2;
                var t=e.pageY-oSmImg.offset().top-oMoveMouse.height()/2;

                if(l<0)
                {
                    l=0;
                }
                else if(l>oSmImg.width()-oMoveMouse.width())
                {
                    l=oSmImg.width()-oMoveMouse.width();
                }

                if(t<0)
                {
                    t=0;
                }
                else if(t>oSmImg.height()-oMoveMouse.height())
                {
                    t=oSmImg.height()-oMoveMouse.height();
                }
                oMoveMouse.css({'top':t,'left':l});
                var percentX=l/(oSmImg.width()-oMoveMouse.width());
                var percentY=t/(oSmImg.height()-oMoveMouse.height());
                oBgImg.css({'top':-percentY*disy,'left':-percentX*disx});
            });

        });
        oSmImg.on('mouseout',function(){
            oMoveMouse.hide();
            oWarp.hide();
            oSmImg.off('mousemove');
        });
    },
    fnTimingUpdate: function (obj,iTime) {
        setInterval(function () {
            iTime -= 1000;
            var iRemain = iTime / 1000;
            var iDay = parseInt(iRemain / 86400);
            iRemain %= 86400;

            var iHour = parseInt(iRemain / 3600);
            iRemain %= 3600;

            var iMin = parseInt(iRemain / 60);
            iRemain %= 60;

            var iSec = parseInt(iRemain);

            obj.date && obj.date.text(iDay);
            obj.hour && obj.hour.text(iHour);
            obj.mint && obj.mint.text(iMin);
            obj.sec && obj.sec.text(iSec);
            //return  [iDay,iHour,iMin,iSec]
            console.log("还剩" + iDay + "天" + iHour + "时" + iMin + "分" + iSec + "秒");
        }, 1000)
    },
    fnTime: function(endTime,now){
        var oDateNow =  now ;
        var oYear = oDateNow.getFullYear();
        var lostTime = []
        for(var i = 0; i<endTime.length;i++){


            var oDateEnd = new Date();
            oDateEnd.setFullYear(endTime[i].year || oYear);
            oDateEnd.setMonth(endTime[i].month||oDateEnd.getMonth());
            oDateEnd.setDate(endTime[i].date||oDateEnd.getDate());
            oDateEnd.setHours(endTime[i].hour||24);
            oDateEnd.setMinutes(endTime[i].mint||0);
            oDateEnd.setSeconds(endTime[i].sec||0);

            lostTime[i] = upDate(oDateEnd);

        };
        return lostTime;

        function upDate(oDateEnd){

            var oDateNow = now || new Date();

            var iTime = oDateEnd.getTime()-oDateNow.getTime();

            var iRemain = iTime/1000;

            var iDay=parseInt(iRemain/86400);
            iRemain%=86400;

            var iHour=parseInt(iRemain/3600);
            iRemain%=3600;

            var iMin=parseInt(iRemain/60);
            iRemain%=60;

            var iSec=parseInt(iRemain);

            return  [iDay,iHour,iMin,iSec]
            //console.log("还剩"+iDay+"天"+iHour+"时"+iMin+"分"+iSec+"秒");
        }

    },
    fnTiming:function(obj,time,cellBack,sevTime){
        var now =sevTime|| new Date(),
            arr =this.fnTime([time],now);
        cellBack = cellBack || function(){$('.timing').html('活动结束');$('#vals').val(1)};
        setInterval(function(){
            for(var i =0 ;i <arr.length;i++){
                if(arr[i]){
                    arr[i][3]--;
                    if(arr[i][3]<=-1){

                        arr[i][3] =59;
                        arr[i][2]--;
                        if(arr[i][2]<=-1){
                            arr[i][2]=59;
                            arr[i][1]--;
                            if(arr[i][1]<=-1){
                                arr[i][1]=23;
                                arr[i][0]--;
                                if(arr[i][0]<=-1){

                                    arr[i] =false;
                                    return cellBack();
                                }
                            }
                        }
                    }
                    obj.date&&obj.date.text(arr[i][0]);
                    obj.hour.text(arr[i][1]);
                    obj.mint.text(arr[i][2]);
                    obj.sec.text(arr[i][3]);
                }
            }

        },1000)

    },
    textDrop: function (aText,aBtn) {
        var arr = [];
        aText.each(function(index){
            arr.push($(this).text());
            if(arr[index].length>100){
                $(this).text(arr[index].substring(0,100));
                aBtn.eq(index).show();

            } else {
                aBtn.eq(index).hide();
            }

            aBtn.eq(index).on('click',function(){
                $(this).hide();
                console.log(arr[index])
                aText.eq(index).text(arr[index]);
            });
        })
        console.log(arr)
    },
    /*go-top*/
    goTop:function  (obj, t){
        obj.hide();
        $(window).scroll(function(){
            $(this).scrollTop()>300?obj.fadeIn():obj.fadeOut()
        })
        obj.click(function(){
            $('body, html').animate({scrollTop:0},t)

        })


    },
    setLetterSpacing: function(obj){
        obj.each(function(){
            switch ($(this).text().length){
                case 2:
                    $(this).css('letter-spacing','15px')
                    break;
                case 3:
                    $(this).css('letter-spacing','5px')
                    break;
                case 4:
                    $(this).css('letter-spacing','1px')
                    break;
                default :
                    $(this).css('letter-spacing','1px')
                    break;
            }
        })
    },
    request: function(name){

        var url = window.location.href;
        if(url){
            var valArray = url.split("?")[1];
            if(valArray && valArray.length >0){
                var valArr = valArray.split("&");
                if(valArr && valArr.length > 0){
                    for(var i in valArr){
                        if(valArr[i].split("=")[0] == name){
                            return valArr[i].split("=")[1];
                        }
                    }
                }
            }
        }
    },
    //乘法计算
    accMul:function(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {}

        try {
            m += s2.split(".")[1].length
        } catch (e) {}

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)

    },
    //加法计算
    accAdd:function (arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }

        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }

        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2))
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m
    }

};



