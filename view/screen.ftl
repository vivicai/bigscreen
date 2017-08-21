<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>大屏配置工具</title>
    <link rel="stylesheet" type="text/css" href="${path}/css/screen.css" />
    <link rel="stylesheet" type="text/css" href="${path}/css/jbox.css" />
    <link rel="stylesheet" type="text/css" href="${path}/css/tinyscrollbar.css" />
</head>

<body>
<div class="wrap">
    <div class="main">
        <div class="content">
            <div class="content_left fl">
                <div class="header">
                    <div class="title">
                        <span class="fl"></span>
                        <div class="fl">屏幕布局配置</div>
                    </div>
                </div>
                <div class="screens">
                    <div class="area dn"></div>
                    <div class="menu dn">
                        <div class="menu_title">
                            <span>大屏布局</span>
                            <span class="close">X</span>
                        </div>
                        <div class="ment_but">
                            <input type="button" value="合并" class="merge"/>
                            <input type="button" value="分解" class="resolve"/>
                        </div>
                    </div>
                    <div class="progress">
                        <div id="progress">请稍后···</div>
                    </div>
                </div>
            </div>
            <div class="content_right fl">
                <div class="header">
                    <div class="title">
                        <span class="fl"></span>
                        <div class="fl">屏幕信息配置</div>
                    </div>
                </div>
                <div class="basicParam">
                    <form id="screenParam">
                        <div class="row">
                            <div class="hint fl">名称：</div>
                            <div class="param fl">
                                <input type="text" placeholder="屏幕名称" id="name" name="screen.name"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="hint fl">URL：</div>
                            <div class="param fl">
                                <input type="text" placeholder="屏幕URL" id="url" name="screen.url"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="hint fl">方法：</div>
                            <div class="param fl">
                                <input type="radio" name="screen.method" id="method_get" checked="true" value="false"/>
                                <label for="method_get">GET</label>

                                <input type="radio" name="screen.method" id="method_post" value="true"/>
                                <label for="method_post">POST</label>

                                <input type="hidden" class="screenId" id="id" name="screen.id"/>
                                <input type="hidden" id="sort" name="screen.sort"/>
                                <input type="hidden" id="start" name="screen.start"/>
                                <input type="hidden" id="end" name="screen.end"/>
                                <input class="fr save" type="button" value="保存" disabled="true"/>
                                <input class="fr delScreen" type="button" value="删除" disabled="true"/>

                                <input type="hidden" id="basePath" value="${path}"/>
                                <input type="hidden" id="theme" name="screen.theme" value="${theme.id}"/>
                                <input type="hidden" id="row" value="${theme.row}"/>
                                <input type="hidden" id="col" value="${theme.col}"/>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="header">
                    <div class="title">
                        <span class="fl"></span>
                        <div class="fl">地址参数配置</div>
                    </div>
                </div>
                <div class="urlParam">
                    <div class="urlParamContent">
                        <div class="inputArea">
                            <form id="urlParamForm">
                                <input type="text" class="fl" placeholder="参数名" name="parameter.key"/>
                                <input type="text" class="fl" placeholder="参数值" name="parameter.value"/>
                                <input type="hidden" class="screenId" name="parameter.screen" />
                                <input type="hidden" id="parameter" name="parameter.id" />
                                <input type="button" class="urlParamSave" value="保存" disabled="true"/>
                            </form>
                        </div>

                        <div class="thead">
                            <div class="th paramKey">参数名</div>
                            <div class="th paramValue">参数值</div>
                            <div class="th">编辑</div>
                            <div class="th">删除</div>
                        </div>


                        <div id="urlParameters">
                            <div class="scrollbar">
                                <div class="track"><!--滚动条轨道-->
                                    <div class="thumb"><!--滚动按钮-->
                                        <div class="end"></div><!--可以设置滚动按钮上或下的样式-->
                                    </div>
                                </div>
                            </div>
                            <div class="viewport"><!--内容滚动区域-->
                                <div class="overview"><!--要滚动的内容-->
                                    <#--<div class="tbody">
                                        <div class="th paramKey">参数名</div>
                                        <div class="th paramValue">参数值</div>
                                        <div class="th"><a href="javascript:void(0)" class="edit"><img src="${path}/images/edit.png" /></a></div>
                                        <div class="th"><a href="javascript:void(0)" class="del"><img src="${path}/images/del.png" /></a></div>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <input type="button" value="完  成" id="finish" />
            <input type="button" value="重  置" id="resetting" />
            <input type="button" value="上一步" id="previous" />
        </div>
    </div>
</body>
<script type="text/javascript" src="${path}/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${path}/js/jquery.jBox.src.js"></script>
<script type="text/javascript" src="${path}/js/jboxconfig.js"></script>
<script type="text/javascript" src="${path}/js/tinyscrollbar.js"></script>
<script text="text/javascript" src="${path}/js/screen.js"></script>
</html>
