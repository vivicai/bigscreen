<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>大屏配置工具</title>
    <link rel="stylesheet" type="text/css" href="${path}/css/index.css" />
    <link rel="stylesheet" type="text/css" href="${path}/css/jbox.css" />

</head>

<body>
<div class="wrap">
    <div class="header">
        <div class="title">
            <span>大屏基础信息配置</span>
        </div>
    </div>
    <div class="main">
        <div class="main_left fl">
            <div class="mark">
                <img id="logo" src="${path}/images/theme.png" />
                <div class="hr"></div>
            </div>
            <div class="nav">
                <ul>
                    <li class="active" url="theme/themeList">
                        <span>主题信息</span>
                    </li>
                    <li url="theme">
                        <span>主题配置</span>
                    </li>
                    <#--<li url="">
                        <span>权限配置</span>
                    </li>-->
                </ul>
            </div>
        </div>
        <div class="main_right fl">
            <iframe height="100%" id="content" frameborder="0" style="overflow-x:scroll" scrolling="no" src="theme/themeList"></iframe>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="${path}/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${path}/js/jquery.jBox.src.js"></script>
<script type="text/javascript" src="${path}/js/jboxconfig.js"></script>
<script text="text/javascript" src="${path}/js/index.js"></script>
</html>
