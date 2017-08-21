/**
 * Created by renyuankun on 2016/5/30.
 */
var startX; // 鼠标点击时的X坐标
var startY; // 鼠标点击时的Y坐标
var isMouseDown = false; // 鼠标是不是按下状态
var width; // 单个屏幕的宽度
var height; // 单个屏幕的高度
var rangeSX; // 选择框的起点X坐标
var rangeSY; // 选择框的起点Y坐标
var rangeEX; // 选择框的终点X坐标
var rangeEY; // 选择框的终点Y坐标
var isMenuUp = false; // 是否悬浮在按钮上

var isMerge = false;
var isSave = false;

var path = $("#basePath").val();
var themeId;

$(window).resize(function(){
    var mainHeight = $(window).height() - $(".header").height();
    $(".main").css('height', mainHeight);
});

$(function(){

    var mainHeight = $(window).height() - $(".header").height();
    $(".main").css('height', mainHeight);

    $("body").width($(window).width());
    $("body").height($(window).height());

    $(".wrap").width($(window).width());

    $(".thead").width($(".urlParamContent").width());
    $(".tbody").width($(".urlParamContent").width());
    $("#urlParameters").width($(".urlParamContent").width());
    $(".viewport").width($(".urlParamContent").width() - 20);
    $(".overview").width($(".urlParamContent").width() - 20);

    var row = $("#row").val();
    var col = $("#col").val();

    themeId = $("#theme").val();

    initScreens(row, col);

    // 初始化屏幕
    function initScreens(row, col) {
        width = $(".screens").width() / col - 9;
        height = $(".screens").height() / row - 8;
        var html = "";
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= col; j++) {
                var index = ((i-1)*col) + j;
                var style='background-image: url(\'' + path + '/images/no_active_' + index + '.png\')';

                html += '<div class="screen useful" id="screen_' + i + '_' + j + '">'
                    + '<div class="icon" style="' +　style +　'">'
                    + '<input type="hidden" name="screen.id" />'
                    + '<input type="hidden" name="screen.name" />'
                    + '<input type="hidden" name="screen.url" />'
                    + '<input type="hidden" name="screen.method" />'
                    + '<input type="hidden" name="screen.sort" value="' + index + '" />'
                    + '<input type="hidden" name="screen.start" value="' + i + ',' + j + '" />'
                    + '<input type="hidden" name="screen.end" />'
                    + '<div class="isSave dn" title="正常保存"></div>'
                    + '</div>'
                    + '</div>';
            }
        }
        $(".screens").append(html);
        $(".screen").css('width',width);
        $(".screen").css('height',height);
        initExistScren();
    }

    // 屏幕鼠标悬浮
    $(".screen .icon").mouseover(function(event) {
        /* Act on the event */
        $(this).addClass('active');
        var index = $(this).find(':hidden[name="screen.sort"]').val();
        $(this).css('backgroundImage', 'url("' + path + '/images/active_' + index + '.png")');

    });

    // 屏幕鼠标离开
    $(".screen .icon").mouseout(function(event) {
        /* Act on the event */
        if(!$(this).attr('select')) {
            $(this).removeClass('active');
            var index = $(this).find(':hidden[name="screen.sort"]').val();
            $(this).css('backgroundImage', 'url("' + path + '/images/no_active_' + index + '.png")');
        }
    });

    // 屏幕点击
    $(".screen .icon").click(function(event) {
        /* Act on the event */
        var current = $(this);
        current.attr('select', 'true');
        current.addClass('active');
        var index = current.find(':hidden[name="screen.sort"]').val();
        current.css('backgroundImage', 'url("' + path + '/images/active_' + index + '.png")');
        // closeSuspension();
        refurbishButtonStatus();
        refurbishURLParam();

        $("#urlParameters").tinyscrollbar_update(0);
    });

    // 鼠标点击
    $(".screens").mousedown(function(event) {
        /* Act on the event */
        if(isMenuUp) {
            return true;
        }
        startX = event.pageX - 1;
        startY = event.pageY - $(this).offset().top - 4;
        $(".area").css({'left': startX, 'top': startY, 'width':0, 'height':0});
        isMouseDown = true;
        closeSuspension();
        // console.log(startX + "---" + startY + "---" + $(this).offset().left);

    });

    // 鼠标移动
    $(".screens").mousemove(function(event) {
        /* Act on the event */
        var x = event.pageX - 1;
        var y = event.pageY - $(this).offset().top - 4;

        var areaWidth = Math.abs(x - startX);
        var areaHeight = Math.abs(y - startY);

        if(isMouseDown) {
            if(areaWidth >= 5 && areaHeight >= 5) {
                $(".area").show();
                $(".menu").show();
            }
            $(".area").css({'left' :getMin(x, startX) + 1, 'top' : getMin(y, startY) + 4, 'width' : areaWidth, 'height' : areaHeight});
            $(".menu").css({'left' : getMax(x, startX) + 10, 'top' : getMin(y, startY) + 5});
            computeRange(startX, startY, x, y);
        }
    });

    // 鼠标松开
    $(".screens").mouseup(function(event) {
        /* Act on the event */

        if(!isMouseDown) {
            return;
        }
        if(isMenuUp) {
            return true;
        }
        isMouseDown = false;
        var x = event.pageX - 1;
        var y = event.pageY - $(this).offset().top - 4;
        computeRange(startX, startY, x, y);
    });

    // 菜单鼠标悬浮
    $(".menu").mouseover(function(event) {
        /* Act on the event */
        isMenuUp = true;
    });

    //菜单鼠标离开
    $(".menu").mouseout(function(event) {
        /* Act on the event */
        isMenuUp = false;
    });

    // 菜单关闭按钮
    $(".menu_title .close").click(function(event) {
        /* Act on the event */
        closeSuspension();
    });

    // 计算选中的范围
    function computeRange(downX, downY, upX, upY) {
        downX = downX - $(".screens").find('.screen:first').offset().left - 3;
        upX = upX - $(".screens").find('.screen:first').offset().left - 3;
        if(downX < 0)
            downX = 0;
        if(upX < 0)
            upX = 0;
        rangeSX = getMin(Math.floor(downX/(width + 7)) + 1, Math.floor(upX/(width + 7)) + 1);
        rangeSY = getMin(Math.floor(downY/(height + 7)) + 1, Math.floor(upY/(height + 7)) + 1);
        rangeEX = getMax(Math.floor(downX/(width + 7)) + 1, Math.floor(upX/(width + 7)) + 1);
        rangeEY = getMax(Math.floor(downY/(height + 7)) + 1, Math.floor(upY/(height + 7)) + 1);

        isMerge = false;
        isSave = false;

        // 去掉所有的选中状态
        clearSelect();

        // 移动范围小于5像素 不添加状态
        if(Math.abs(upX - downX) <= 5 && Math.abs(upY - downY) <= 5)
            return;
        // 添加选中状态
        for (var i = rangeSY; i <= rangeEY; i++) {
            for (var j = rangeSX; j <= rangeEX; j++) {
                var current = $("#screen_" + i + "_" + j);
                if(!current.hasClass('useful')) {
                    isMerge = true;
                    continue;
                }
                if(current.find(":hidden[name='screen.id']").val() != "") {
                    isSave = true;
                    continue;
                }

                var icon = current.find('.icon');
                icon.attr('select', 'true');
                icon.addClass('active');
                var index = icon.find(':hidden[name="screen.sort"]').val();
                icon.css('backgroundImage', 'url("' + path + '/images/active_' + index + '.png")');
            }
        }
        refurbishButtonStatus();
    }

    // 清除所有屏幕的选中状态
    function clearSelect() {
        var befores = $(".icon[select]");
        $.each(befores, function(index, el) {
            var before = $(el);
            before.removeClass('active');
            var index = before.find(':hidden[name="screen.sort"]').val();
            before.css('backgroundImage', 'url("' + path + '/images/no_active_' + index + '.png")');
            before.removeAttr('select');
        });
    }

    // 合并
    //$(".merge").click(function(event) {
    //    /* Act on the event */
    //    // 这里加验证
    //
    //
    //});


    var merge = function() {
        if(isSave) {
            top.$.jBox.tip("所选范围中存在已保存的屏幕，无法完成合并", "warning");
            closeSuspension();
            return;
        }

        if(isMerge) {
            top.$.jBox.tip("已经合并的大屏不能再次合并", "warning");
            closeSuspension();
            return;
        }

        if($("[select]").length <2) {
            top.$.jBox.tip("请至少选择两个屏幕进行操作", "warning");
            closeSuspension();
            return;
        }

        var current = $("#screen_" + rangeSY + "_" + rangeSX);
        var shadeX = current.offset().left;
        var shadeY = current.offset().top - $(".screens").offset().top;

        var last = $("#screen_" + rangeEY + "_" + rangeEX);
        var shadeWidth = last.offset().left + width - $(".screens").find('.screen:first').offset().left - ((rangeSX - 1) * (width + 8));
        var shadeHeight = last.offset().top + height - $(".screens").find('.screen:first').offset().top  - ((rangeSY - 1) * (height + 8));

        var newScreen = current.clone(true); // 复制选中的第一个屏幕
        current.after(newScreen); // 附加在第一个之后
        newScreen.attr('id', 'newScreen_' + rangeSY + "_" + rangeSX);
        newScreen.css({
            'position' : 'absolute',
            //'top' : shadeY,
            //'left' : shadeX,
            //'width' : shadeWidth,
            //'height' : shadeHeight,
            'z-index' : 3
        });
        newScreen.animate({
            'top' : shadeY,
            'left' : shadeX,
            'width' : shadeWidth,
            'height' : shadeHeight
        }, 'fast');

        newScreen.find(':hidden[name="screen.end"]').val(rangeEY + "," + rangeEX);
        abateBySelectScreen();
        closeSuspension();
        reloadSort();
    }


    $(".merge").bind('click', merge);


    // 分解
    $(".resolve").click(function(event) {
        /* Act on the event */
        var current = $("[select]");

        if(current.find(":hidden[name='screen.id']").val() != "") {
            top.$.jBox.tip("该屏幕已保存，无法分解", "warning");
            closeSuspension();
            return;
        }

        if(current.length <= 0 || current.find(':hidden[name="screen.end"]').val() == "") {
            top.$.jBox.tip("请选择一个合并过的屏幕进行分解操作", "warning");
            // abateBySelectScreen();
            closeSuspension();
            return;
        }
        var start = current.find(':hidden[name="screen.start"]').val().split(",");
        var end = current.find(':hidden[name="screen.end"]').val().split(",");

        var parent = current.parent();
        parent.animate({
            'height':0,
            'width':0,
            'top':0,
            'left':0
        }, 'fast', function(){
            parent.remove();
        });

        for (var i = start[0]; i <= end[0]; i++) {
            for (var j = start[1]; j <= end[1]; j++) {
                var current = $("#screen_" + i + "_" + j);
                current.addClass('useful');
            }
        }
        closeSuspension();
        window.setTimeout(reloadSort,500);
    });

    // 保存
    $(".save").click(function(){

        var name = $("#name").val().trim();
        if(name == "") {
            top.$.jBox.tip("屏幕名称不可空", "warning");
            return;
        }

        var url = $("#url").val().trim();
        if(url == "") {
            top.$.jBox.tip("屏幕名称不可空", "warning");
            return;
        }

        $.ajax({
            type: "post",
            url: "saveScreen",
            data: $("#screenParam").serialize(),
            success:function(data) {
                if(data.status == "success") {
                    //$(window).bind('beforeunload', leave);
                    var current = $("[select]");
                    current.find(":hidden[name='screen.id']").val(data.id);
                    $(".screenId").val(data.id);
                    current.find(":hidden[name='screen.name']").val(name);
                    current.find(":hidden[name='screen.url']").val(url);
                    current.find(":hidden[name='screen.method']").val($(":radio:checked").val());
                    //current.find(".save").show();
                    //current.find(".save").attr("title","已保存");
                    top.$.jBox.tip("保存成功", "success");
                    current.find(".isSave").css({"border-color" : "#00BFB0", 'border-left-color': 'transparent','border-top-color' : 'transparent'});
                    current.find(".isSave").attr("title", "正常保存");
                    current.find(".isSave").show('300');
                    refurbishButtonStatus();
                    refurbishURLParam();
                } else {
                    top.$.jBox.tip(data.msg, "error");
                }
            }
        });


    });

    // 删除屏幕
    $(".delScreen").click(function(){
        var current = $("[select]");
        var id = current.find(":hidden").val();

        var submit = function (v, h, f) {
            if (v == 'ok') {
                $.get(path + "/screen/deleteById", "screenId=" + id, function(data){
                    if(data == "success") {
                        top.$.jBox.tip("删除成功", "success");
                        clearScreenSaveStatus();
                    }
                });
            }else if (v == 'cancel') {

            }
            return true; //close
        };

        $.jBox.confirm("确定要删除吗？", "提示", submit);
    });

    //保存URL参数
    $(".urlParamSave").click(function(){


        var key = $(":text[name='parameter.key']").val().trim();
        var value = $(":text[name='parameter.value']").val().trim();

        if(key == "") {
            top.$.jBox.tip("参数名不可空", "warning");
            return;
        }

        if(value == "") {
            top.$.jBox.tip("参数值不可空", "warning");
            return;
        }

        var form = $("#urlParamForm");
        $.post(path + "/saveParameter", form.serialize(), function(data){

            if(data.status == "success") {
                top.$.jBox.tip("保存成功", "success");
                refurbishURLParam();
            } else {
                top.$.jBox.tip("该名称已存在", "warning");
            }
        });
    });


    var urlParamEdit = function() {
        var tbody = $(this).parent().parent();
        var key = tbody.find(".paramKey").html();
        var value = tbody.find(".paramValue").html();
        var id = tbody.find(":hidden").val();

        $(":text[name='parameter.key']").val(key);
        $(":text[name='parameter.value']").val(value);
        $(":hidden[name='parameter.id']").val(id);
    }


    var urlParamDel = function() {
        var tbody = $(this).parent().parent();
        var id = tbody.find(":hidden").val();
        $.get(path + "/deleteById","parameterId="+id,function(){

            tbody.animate({'height':0}, 'fast', function(){
                $("#parameter").val("");
                tbody.remove();
            });
            top.$.jBox.tip("删除成功", "success");
            $("#urlParameters").tinyscrollbar_update(0);
        });
    }


    //编辑参数
    $(".edit").bind('click', urlParamEdit);

    // 删除参数
    $(".del").bind('click', urlParamDel);

    // 使所有被合并的屏幕失效
    function abateBySelectScreen() {
        for (var i = rangeSY; i <= rangeEY; i++) {
            for (var j = rangeSX; j <= rangeEX; j++) {
                var current = $("#screen_" + i + "_" + j);
                current.removeClass('useful');
                current.find('.icon').removeAttr('select');
                current.find('.icon').removeClass('active')
                var index = current.find('.icon').find(':hidden[name="screen.sort"]').val();
                current.find('.icon').css('backgroundImage', 'url("' + path + '/images/no_active_' + index + '.png")');
            }
        }
    }

    // 刷新按钮的状态
    function refurbishButtonStatus(){
        if($("[select]").length == 1) {
            $(".save").removeAttr("disabled");

            if($("[select]").find(":hidden[name='screen.id']").val() != "") {
                $(".delScreen").removeAttr("disabled");
            } else {
                $(".delScreen").attr("disabled", true);
            }
        } else {
            $(".save").attr("disabled", true);
            //
        }
        refurbishInputValue();
        //refurbishURLParam();
    }

    // 刷新输入框的值
    function refurbishInputValue() {
        var current = $("[select]");
        var id = current.find(":hidden[name='screen.id']").val();
        var name = current.find(":hidden[name='screen.name']").val();
        var url = current.find(":hidden[name='screen.url']").val();
        var method = current.find(":hidden[name='screen.method']").val();
        var sort = current.find(":hidden[name='screen.sort']").val();
        var start = current.find(":hidden[name='screen.start']").val();
        var end = current.find(":hidden[name='screen.end']").val();

        $(".screenId").val(id);
        $("#name").val(name);
        $("#url").val(url);
        method = method?method:false;
        $(":radio[value='" + method + "']").attr("checked",true);
        $("#sort").val(sort);
        $("#start").val(start);
        $("#end").val(end);
    }

    // 刷新URL参数
    function refurbishURLParam() {

        $(":text[name='parameter.key']").val("");
        $(":text[name='parameter.value']").val("");
        $(":hidden[name='parameter.id']").val("");
        $(".overview").empty();
        var id = $("#id").val().trim();
        if(id == "") {
            $(".urlParamSave").attr("disabled", true);
            return;
        }
        $(".urlParamSave").removeAttr("disabled");

        $.ajax({
            type: "post",
            url: path + "/getAllParameterByScreen",
            dataType: "json",
            data: "screenId=" + id,
            success:function(data) {
                //if(data.length <= 0) {
                //    $(".overview").empty();
                //    return;
                //}
                var html = "";
                $.each(data, function(i, item){
                    html += '<div class="tbody">'
                            + '<div class="th paramKey">' + item.key + '</div>'
                            + '<div class="th paramValue">' + item.value + '</div>'
                            + '<input type="hidden" value="' + item.id + '" />'
                            + '<div class="th"><a href="javascript:void(0)" class="edit"><img src="' + path + '/images/edit.png" /></a></div>'
                            + '<div class="th"><a href="javascript:void(0)" class="del"><img src="' + path + '/images/del.png" /></a></div>'
                            + '</div>';
                });

                $(".overview").html(html);
                $(".tbody").width($(".urlParamContent").width());
                $("#urlParameters").tinyscrollbar_update(0);
                //编辑参数
                $(".edit").bind('click', urlParamEdit);
                // 删除参数
                $(".del").bind('click', urlParamDel);
            }
        });
    }

    // 关闭悬浮层
    function closeSuspension() {
        $(".area").hide('200');
        $(".menu").hide('200');
    }

    // 获取最小值
    function getMin(a, b) {
        if(a < b)
            return a;
        else
            return b;
    }

    // 获取最大值
    function getMax(a, b) {
        if(a > b)
            return a;
        else
            return b;
    }
    $('#urlParameters').tinyscrollbar();

    // 所有输入框增加获取焦点事件
    $(":text").focus(function(){
        $(this).select();
    });

    // 上一步
    $("#previous").click(function(){
        window.location.href = path + "/theme/" + $("#theme").val();
    });

    // 完成
    $("#finish").click(function(){
        //if(checkSave()) {
        top.$.jBox.tip("正在生成屏幕图标...", 'loading');
        // 将所有的没有保存的屏幕也插入到数据库中
        $.each($(".useful"), function(i, obj){

            var ele = $(obj);
            var id = ele.find(":hidden[name='screen.id']").val();
            if(id == "") {
                var start = "";
                var end = "";
                var name = ele.find(":hidden[name='screen.name']").val();
                var sort = ele.find(":hidden[name='screen.sort']").val();
                var start = ele.find(":hidden[name='screen.start']").val();
                var end = ele.find(":hidden[name='screen.end']").val();
                $.ajax({
                    type: "post",
                    url: "saveScreen",
                    data: "screen.theme=" + themeId + "&screen.name=" + name + "&screen.start=" + start + "&screen.end=" + end + "&screen.sort=" + sort,
                    success:function(data) {

                        if(data.status == "success") {
                            //$(window).bind('beforeunload', leave);
                            ele.find(":hidden[name='screen.id']").val(data.id);
                            ele.find(":hidden[name='screen.method']").val($(":radio:checked").val());
                            ele.find(".isSave").css({"border-color" : "#E6E6E6", 'border-left-color': 'transparent','border-top-color' : 'transparent'});
                            ele.find(".isSave").attr("title", "部分保存");
                            ele.find(".isSave").show();
                        }

                    }
                });
            }
        });

        setTimeout(function(){
            $.get(path + "/buildIcon", "theme.id=" + themeId, function(data){
                //window.setTimeout(function () {
                //	$.jBox.tip('生成成功。', 'success', {closed:function(){ window.location.href = "/"; }});
                //}, 1000);
                top.$.jBox.closeTip();
                var states = {};
                var html = '<div style="width:450px;">'
                    + '<p style="padding:10px;">请检查屏幕布局是否有问题，没问题请点击完成，若要重新配置请取消后进行重新配置。</p>'
                    + '<div style="width:193px;margin:5px auto;">'
                    + '<img src="' + data.path + '" />'
                    + '</div></div>';
                states.state1 = {
                    content: html,
                    buttons: { '完成': 1, '取消': 0 },
                    submit: function (v, h, f) {
                        if (v == 0) {
                            return true; // close the window
                        }
                        else {
                            $.get(path + "/valid", "theme.id=" + themeId, function() {
                                //$(window).unbind('beforeunload', leave);
                                top.$.jBox.tip('保存成功。', 'success', {closed:function(){ $(window.parent.document).find(".nav ul li:eq(0)").click(); }});
                            });
                            return true;
                        }
                        return false;
                    }
                };
                $.jBox.open(states, '生成效果展示', 450, 'auto');
            });
        },2000);
        //} else {
        //    top.$.jBox.tip("请至少保存一个屏幕！", "warning");
        //}
    });

    // 重置
    $("#resetting").click(function(){

        var submit = function (v, h, f) {
            if (v == 'ok') {
                //var id = $(":hidden[name='screen.theme']").val();
                $.get("emptyAllScreenByTheme", "id=" + themeId);
                //$(window).unbind('beforeunload', leave);
                window.location.reload();
            }
            return true; //close
        };
        $.jBox.confirm("重置将会删除所有屏幕相关的数据，确定要重置吗？", "提示", submit);
    });

    /**
     * 检查所有的屏幕是否已经保存
     */
    function checkSave() {

        var isSave = false;
        $.each($(".useful"), function(i, obj){
            var id = $(obj).find(":hidden[name='screen.id']").val();
            if(id != "") {
                isSave = true;
                return false;
            }
        });
        return isSave;
    }

    // 清除屏幕的保存状态
    function clearScreenSaveStatus() {

        var current = $("[select]");
        current.find(".isSave").hide('300');
        $(".screenId").val("");
        $(".save").attr("disabled", true);
        $(".urlParamSave").attr("disabled", true);
        $("#name").val("");
        $("#url").val("");
        $(":radio[value='false']").attr("checked",true);

        var start = current.find(':hidden[name="screen.start"]').val().split(",");
        var end = current.find(':hidden[name="screen.end"]').val().split(",");
        refurbishURLParam();
        if(end.length <= 1) {
            current.find(':hidden[name="screen.id"]').val("");
            current.find(':hidden[name="screen.name"]').val("");
            current.find(':hidden[name="screen.url"]').val("");
            current.find(':hidden[name="screen.method"]').val("");
            return;
        }

        var parent = current.parent();
        parent.animate({
            'height':0,
            'width':0,
            'top':0,
            'left':0
        }, 'fast', function(){
            parent.remove();
        });
        for (var i = start[0]; i <= end[0]; i++) {
            for (var j = start[1]; j <= end[1]; j++) {
                var currentSmall = $("#screen_" + i + "_" + j);
                currentSmall.addClass('useful');
            }
        }
        closeSuspension();
    }

    // 重新排序
    function reloadSort() {

        var index = 0;
        $.each($(".useful"), function(i, obj){
            //if($(obj).attr("id").indexOf("new") != 0) {
            //    index ++;
                $(obj).find(":hidden[name='screen.sort']").val(i + 1);
                //console.log(sort);
                $(obj).find(".icon").css('backgroundImage', 'url("' + path + '/images/no_active_' + (i + 1) + '.png")');
            //}
        });
    }

    // 根据已存在的屏幕进行初始化
    function initExistScren() {

        $.get(path + "/getAllScreenByTheme",{'themeId' : themeId}, function(data){
            var pid;
            if(data.screens.length > 0) {
                var index = 0;
                pid = window.setInterval(function(){
                    index += 1;
                    $("#progress").css('background-position', index);

                },10);
            } else {
                $(".progress").hide();
                window.clearInterval(pid);
                return;
            }
            $.each(data.screens, function(i, ele) {
                var id = ele.id;
                var startStr = ele.start;
                var endStr = ele.end;
                var name = ele.name;
                var url = ele.url;
                var method = ele.method;
                //var sort = ele.sort;

                var current;
                var start = startStr.split(",");
                rangeSX = start[1];
                rangeSY = start[0];

                var current = $("#screen_" + rangeSY + "_" + rangeSX);
                if(endStr != null){
                    var end = endStr.split(",");
                    rangeEX = end[1];
                    rangeEY = end[0];
                    current.find(".icon").attr("select", true);
                    $("#screen_" + rangeEY + "_" + rangeEX).find(".icon").attr("select", true);
                    merge();
                    current = $("#newScreen_" + rangeSY + "_" + rangeSX);
                }

                current.find(':hidden[name="screen.id"]').val(id);
                current.find(':hidden[name="screen.name"]').val(name);
                current.find(':hidden[name="screen.url"]').val(url);
                current.find(':hidden[name="screen.method"]').val(method);
                $("[select]").removeAttr("select");

                if(name == null) {
                    current.find(".isSave").css({"border-color" : "#E6E6E6", 'border-left-color': 'transparent','border-top-color' : 'transparent'});
                    current.find(".isSave").attr("title", "部分保存");
                }
                current.find(".isSave").show();
            })
            window.setTimeout(function(){
                $(".progress").hide();
                window.clearInterval(pid);
            },500);
        });
    }
})
