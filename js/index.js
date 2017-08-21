/**
 * Created by renyuankun on 2016/5/30.
 */
$(window).resize(function(){
    var width = $(window).width() - $(".main_left").width();
    $(".main_right").css('width', width);

    var height = $(window).height() - $(".header").height();
    $(".main").css('height', height);
});

$(function(){

    // 自动计算更改右边的宽度
    var width = $(window).width() - $(".main_left").width();
    $(".main_right").css('width', width);

    if(width < 1200)
        width = 1200;
    $("#content").css('width', width);

    // 自动计算适配整个内容区的高度
    var height = $(window).height() - $(".header").height();
    $(".main").css('height', height);

    // 菜单点击
    $(".nav ul li").click(function(event) {
        /* Act on the event */
        $(".nav ul li.active").removeClass('active');
        $(this).addClass('active');

        var src = $("#logo").attr('src');
        var end = src.lastIndexOf('/') + 1;
        var base = src.substring(0, end);

        var menuName = $(this).find("span").html();

        if(menuName == "主题信息") {
            $("#logo").attr("src", base + "theme.png");
        } else if(menuName == "主题配置") {
            $("#logo").attr("src", base + "basic_set.png");
        }
        var url = $(this).attr('url');
        $("#content").attr('src', url);
    });
})