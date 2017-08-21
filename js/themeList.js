/**
 * Created by renyuankun on 2016/6/1.
 */
var isCtrlDown = false; // shift 是否按下

$(window).resize(function(){
    var mainHeight = $(window).height() - $(".header").height();
    $(".main").css('height', mainHeight);
});

$(function(){
    var mainHeight = $(window).height() - $(".header").height();
    $(".main").css('height', mainHeight);

    $(window).keydown(function(event) {
        /* Act on the event */
        if(event.keyCode == 16 && !isCtrlDown) {
            isCtrlDown = true;
        }
    });

    $(window).keyup(function(event) {
        /* Act on the event */
        if(event.keyCode == 16 && isCtrlDown) {
            isCtrlDown = false;
        }
    });

    // 点击
    $(".theme").click(function(){
        if($(this).attr('select')) {
            if(isCtrlDown) {
                $(this).removeAttr('select');
            } else {
                removeAllSelect();
                $(this).attr('select', 'true');
                $(this).addClass('active');
            }
        } else {
            if(!isCtrlDown)
                removeAllSelect();
            $(this).attr('select', 'true');
        }
        refurbishButtonStatus();
    })

    // 鼠标悬浮
    $(".theme").mouseover(function(){
        $(this).addClass('active');
    })

    // 鼠标离开
    $(".theme").mouseout(function(){
        if($(this).attr('select'))
            return;
        $(this).removeClass('active');
    })

    // 输入框回车事件
    $(":text[name='keyword']").keydown(function(event){
        if(event.keyCode == 13) {
            $("#search").submit();
        }
    });

    // 获得焦点后全选文字
    $(":text[name='keyword']").focus(function(event){
        $(this).select();
    });

    // 按钮点击
    $("#send").click(function(){
        $("#search").submit();
    });

    // 编辑
    $("#edit").click(function(){

        var current = $("[select]");
        var id = current.find(":hidden").val();
        $(window.parent.document).find(".nav ul li:eq(1)").click();
        window.location.href = id;
    });

    // 删除
    $("#del").click(function(){

        var selects = $("[select]").find(":hidden");
        var submit = function (v, h, f) {
            if (v == 'ok') {
                var selects = $("[select]").find(":hidden");
                var ids = new Array();
                $.each(selects, function(i,ele) {
                    ids[i] = $(ele).val();
                })

                $.get("deleteByIds","ids=" + ids,function(data){
                    if(data == 'success') {
                        window.location.reload();
                    }
                })
            }else if (v == 'cancel') {

            }
            return true; //close
        };
        top.$.jBox.confirm("确定要删除这" + selects.length + "个主题吗？", "提示", submit);
    });

    $("#add").click(function(){
        $(window.parent.document).find(".nav ul li:eq(1)").click();
        window.location.href = "add";
    });

})

// 去掉所有已选中的屏幕的状态
function removeAllSelect() {
    var themes = $("[select]");
    $.each(themes, function(index, el) {
        var theme = $(el);
        theme.removeAttr('select');
        theme.removeClass('active');
    });
}

// 刷新按钮的状态
function refurbishButtonStatus() {
    if($("[select]").length == 1) {
        $("#edit").removeAttr("disabled");
        $("#del").removeAttr("disabled");
    } else if($("[select]").length > 1) {
        $("#edit").attr("disabled", true);
        $("#del").removeAttr("disabled");
    } else {
        $("#edit").attr("disabled", true);
        $("#del").attr("disabled", true);
    }

}