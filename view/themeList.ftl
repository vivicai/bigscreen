<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>主题信息</title>
    <link rel="stylesheet" type="text/css" href="${path}/css/themeList.css" />
</head>
<body>
<div class="wrap">
    <div class="main">
        <div class="header">
            <div class="title">
                <span class="fl"></span>
                <div class="fl">搜索您想要的主题</div>
                <div class="search">
                    <form id="search" action="${path}/theme/themeList" method="post">
                        <input type="text" name="keyword" value="<#if keyWord??>${keyWord}</#if>"/>
                        <input type="hidden" name="pageNo" />
                        <input type="button" id="send"/>
                    </form>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="themes">
                <#list themes.list as theme>
                    <div class="theme">
                        <img src="
                        <#if theme.isValid>
                            <#if theme.front??>
                                ${theme.front}
                            <#else >
                                ${path}/images/icon_invalid.png
                            </#if>
                        <#else>
                                ${path}/images/invalid.png
                        </#if>" />
                        <#--<br />-->
                        <input type="hidden" value="${theme.id}" />
                        <span>${theme.name}</span>
                    </div>
                </#list>
            </div>
            <div class="tcdPageCode"></div>
        </div>
    </div>
    <div class="footer">
        <input type="button" value="编辑" id="edit" disabled/>
        <input type="button" value="删除" id="del" disabled/>
        <input type="button" value="新建" id="add" />
    </div>
</div>
</body><!--057189853546-->
<script type="text/javascript" src="${path}/js/jquery-1.7.2.min.js"></script>
<#--<script type="text/javascript" src="${path}/js/jquery.jBox.src.js"></script>-->
<#--<script type="text/javascript" src="${path}/js/jboxconfig.js"></script>-->
<script type="text/javascript" src="${path}/js/jquery.page.js"></script>
<script text="text/javascript" src="${path}/js/themeList.js"></script>
<script>

    $(function(){
        $(".tcdPageCode").createPage({
            pageCount:${themes.totalPage},
            current:${themes.pageNumber},
            backFn: function (p) {
                $(":hidden[name='pageNo']").val(p);
                $("#search").submit();
            }
        });
    })
</script>
</html>
