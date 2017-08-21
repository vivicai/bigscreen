/**
 * Created by renyuankun on 2016/5/30.
 */

$(window).resize(function(){
    // 自动计算适配整个内容区的高度
    var height = $(window).height() - $(".header").height() - $(".footer").height();
    $(".content").css({'height': height, 'line-height': height});

    var top = ($(".content").height()/2) - ($(".login").height()/2);
    var left = ($(".content").width()/2) - ($(".login").width()/2);
    $(".login").css({'top' : top, 'left' : left});
});

$(function() {

    // 自动计算适配整个内容区的高度
    var height = $(window).height() - $(".header").height() - $(".footer").height();
    $(".content").css({'height': height});

    var top = ($(".content").height()/2) - ($(".login").height());
    var left = ($(".content").width()/2) - ($(".login").width()/2);
    $(".login").css({'top' : top, 'left' : left});


    var login = function() {

        var userName = $("#userName").val().trim();
        var passWord = $("#passWord").val().trim();
        if(userName == "") {
            $.jBox.tip("用户名不可空", "warning");
            return;
        }
        if(passWord == "") {
            $.jBox.tip("密码不可空", "warning");
            return;
        }
        $.get("userLogin", {'userName':userName, 'passWord':passWord}, function(data){
            if(data == "success") {
                var path = $("#path").val();
                window.location.href = path + "/";
            } else {
                $.jBox.tip("登录失败，请检查后重试", "warning");
            }
        })
    }



    $(":button").bind('click',login);
    $(window).bind('keydown',function(keyEvent){
        if(keyEvent.keyCode == 13) {
            login();
        }
    });

})