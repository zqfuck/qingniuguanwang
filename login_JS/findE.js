/**
 * Created by Administrator on 2017/5/8.
 */

$(document).ready(function () {
    $("#find_mail").html(localStorage.find_mail);

    $(".resend").click(function () {
        var Ephone=localStorage.find_tel;
        var Fgmail=localStorage.find_mail;

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
            },
            success : function(json) {

            }
        });


    })


})






























