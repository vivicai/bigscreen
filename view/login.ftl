<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>大屏配置工具</title>
    <link rel="stylesheet" type="text/css" href="${path}/css/login.css" />
    <link rel="stylesheet" type="text/css" href="${path}/css/jbox.css" />

</head>

<body>
<div class="wrap">
    <div class="header">
        <div class="title">
            用户登录
        </div>
    </div>
    <div class="content">
        <div class="login">
            <form>
                <div class="row">
                    <div class="hint name"></div>
                    <input type="text" id="userName" placeholder="用户名"/>
                </div>
                <div class="row">
                    <div class="hint pwd"></div>
                    <input type="password" id="passWord" placeholder="密码" />
                    <input type="hidden" id="path" value="${path}" />
                </div>

                <input type="button" value="登录"/>
            </form>
        </div>
    </div>
    <div class="footer">

    </div>
</div>
</body>
<script type="text/javascript" src="${path}/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${path}/js/jquery.jBox.src.js"></script>
<script type="text/javascript" src="${path}/js/jboxconfig.js"></script>
<script text="text/javascript" src="${path}/js/login.js"></script>
</html>
