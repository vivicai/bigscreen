/**
 * Created by renyuankun on 2016/5/30.
 */

var themeId;
var path = $("#basePath").val();

$(window).resize(function(){
    var height = $(window).height() - $(".header").height();
    $(".main").css('height', height);
});

$(function(){

    var height = $(window).height() - $(".header").height();
    $(".main").css('height', height);

    themeId = $(":hidden[name='theme.id']").val();

    // 添加分辨率按钮
    // $("button.add").click(function(){
    //   $(".add_resolution").show('300');
    //
    // });

    // 分辨率点击
    $("#resolution li").click(function(){
        $(".resolution").val("");
        $(".add_resolution").find(':hidden').remove();

        var current = $("#resolution li.active");
        current.removeClass('active');
        current.find(':hidden').remove();
        $(this).addClass('active');
        $(this).append('<input type="hidden" name="theme.resolution" value="' + $(this).html() + '" />');
    });

    // 要手动输入分辨率 去掉所有的选中的分辨率
    $(".resolution").focus(function(event) {
        /* Act on the event */
        var current = $("#resolution li.active");
        current.removeClass('active');
        current.find(':hidden').remove();
    });

    // 焦点离开时判断输入的值是否正确
    $(".resolution").blur(function(event) {
        /* Act on the event */
        var resolutionWidth = $("#resolution_width").val().trim();
        var resolutionHeight = $("#resolution_height").val().trim();
        var reg = "^[1-9][0-9]{0,6}$";
        var regExp = new RegExp(reg);

        if(resolutionWidth == "" && resolutionHeight == "") {
            window.setTimeout(checkFocus,100);
            return;
        }

        // 验证
        if((regExp.test(resolutionWidth) && !regExp.test(resolutionHeight)) || (regExp.test(resolutionHeight) && !regExp.test(resolutionWidth))) {
            window.setTimeout(function(){
                if(!$(".resolution").is(":focus")) {
                    if($(".add_resolution").find(":hidden").length > 0) {
                        $(".add_resolution").find(":hidden").remove();
                    }
                    top.$.jBox.tip("请输入正确的分辨率", "warning");
                }
            },100);
            return;
        }
        if(regExp.test(resolutionWidth) && regExp.test(resolutionHeight)) {
            if($(".add_resolution").find(":hidden").length <= 0) {
                $(".add_resolution").append('<input type="hidden" name="theme.resolution" value="' + resolutionWidth + '*' + resolutionHeight + '" />');
            } else {
                $(".add_resolution").find(":hidden").val(resolutionWidth + '*' + resolutionHeight);
            }
        } else {
            if($(".add_resolution").find(":hidden").length > 0) {
                $(".add_resolution").find(":hidden").remove();
            }
            top.$.jBox.tip("分辨率输入错误", "warning");
        }
    });

    // 检查分辨率输入框的焦点
    function checkFocus() {
        if(!$(".resolution").is(":focus")) {
            if($("#resolution li.active").length <= 0) {
                $("[default]").click();
            }
        }
    }

    // 下一步
    $("#next").click(function(event) {
        var name = $(":text[name='theme.name']").val().trim();
        var row = $(":text[name='theme.row']").val().trim();
        var minRow = $(":text[name='theme.row']").attr("minval");
        var col = $(":text[name='theme.col']").val().trim();
        var minCol = $(":text[name='theme.col']").attr("minval");
        var resolution = $(":hidden[name='theme.resolution']");
        var reg = new RegExp("^[1-9][0-9]{0,1}$");
        if(name.length <= 0) {
            top.$.jBox.tip("主题名称不可空", "warning");
            return false;
        } else if(!reg.test(row) || !reg.test(col)) {
            top.$.jBox.tip("行列请输入正确的数字", "warning");
            return false;
        } else if(row <=1 || col <= 1) {
            top.$.jBox.tip("行列均不可小于1", "warning");
            return false;
        } else if(row * col > 32) {
            top.$.jBox.tip("屏幕总数不可超过32", "warning");
            return false;
        } else if(resolution.length <=0) {
            top.$.jBox.tip("分辨率输入错误", "warning");
            return false;
        } else if(row < minRow || col < minCol) {
            var submit = function (v, h, f) {
                if (v == 'ok') {
                    $.get(path + "/screen/emptyAllScreenByTheme", "id=" + themeId);
                    $("form").submit();
                }
                return true; //close
            };
            top.$.jBox.confirm("输入的行列小于之前的设置，是否要清空屏幕信息", "提示", submit);
            return false;
        }
        $("form").submit();
    });

    // 分辨率匹配选项
    if(themeId != undefined) {
        var resolution = $(":hidden[name='theme.resolution']").val();
        var current = $("li[value='" + resolution + "']");
        if(current.length == 1) {
            current.click();
        } else {
            $("#resolution_width").val(resolution.split("*")[0]);
            $("#resolution_height").val(resolution.split("*")[1]);
        }
    }
})