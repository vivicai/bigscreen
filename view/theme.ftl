<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>大屏配置工具</title>
    <link rel="stylesheet" type="text/css" href="${path}/css/theme.css" />
</head>

<body>
<div class="wrap">
    <div class="header">
        <div class="title">
            <span class="fl"></span>
            <div class="fl">大屏基本参数配置</div>
        </div>
    </div>
    <div class="main">
        <div class="content">
           <form action="${path}/theme/saveTheme" method="post">
                <div class="thtme_name">
                    <div class="row">
                        <div class="hint fl">
                            <span class="required">*</span>
                            <span class="label">配置大屏主题：</span>
                        </div>
                        <div class="form_item fl">
                            <input type="text" placeholder="大屏名称" name="theme.name" value="<#if theme??>${theme.name}</#if>"/>
                            <#--<input type="hidden" name="theme.id" value="<#if theme??>${theme.id}</#if>"/>-->
                        </div>
                    </div>
                </div>

                <div class="other_parameter">

                    <#if theme??>
                        <div class="row">
                            <div class="hint fl">
                                <span class="required">*</span>
                                <span class="label">编号：</span>
                            </div>
                            <div class="form_item fl">
                                <input type="text" name="theme.id" value="${theme.id}" disabled/>
                                <input type="hidden" name="theme.id" value="${theme.id}"/>
                            </div>
                        </div>
                    </#if>

                    <div class="row">
                        <div class="hint fl">
                            <span class="required">*</span>
                            <span class="label">配置大屏主题：</span>
                        </div>
                        <div class="form_item fl">

                            <ul class="fl" id="resolution">
                                <li value="1280*720" >1280*720</li>
                                <li value="1366*768" >1366*768</li>
                                <li value="1920*1080" default <#if !theme??>class="active"</#if>>1920*1080<#if !theme??><input type="hidden" name="theme.resolution" value="1920*1080" /></#if></li>
                                <li value="2544*3266" >2544*3266</li>
                                <li value="4096*2160" >4096*2160</li>
                            </ul>
                            <div class="add_resolution fl">
                                <input type="text" class="resolution" id="resolution_width" placeholder="宽度" />&nbsp;*&nbsp;<input type="text" class="resolution" id="resolution_height" placeholder="高度"/>
                                <#if theme??><input type="hidden" name="theme.resolution" value="${theme.resolution}"></#if>
                                <!-- <input type="button" value="保存"/> -->
                            </div>
                            <!-- <button class="add">+</button> -->
                        </div>
                    </div>

                    <div class="row">
                        <div class="hint fl">
                            <span class="required">*</span>
                            <span class="label">是否触摸屏：</span>
                        </div>
                        <div class="form_item fl">
                            <input type="radio" name="theme.isTouch" id="isTouch_yes" checked="true" value="true" <#if theme??><#if theme.isTouch>checked</#if></#if>/>
                            <label for="isTouch_yes">是</label>

                            <input type="radio" name="theme.isTouch" id="isTouch_no" value="false" <#if theme??><#if !theme.isTouch>checked</#if></#if>/>
                            <label for="isTouch_no">否</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="hint fl">
                            <span class="required">*</span>
                            <span class="label">是否启动遥控：</span>
                        </div>
                        <div class="form_item fl">
                            <input type="radio" name="theme.isRemote" id="isRemote_yes" checked="true" value="true" <#if theme??><#if theme.isRemote>checked</#if></#if>/>
                            <label for="isRemote_yes">是</label>

                            <input type="radio" name="theme.isRemote" id="isRemote_no" value="false" <#if theme??><#if !theme.isRemote>checked</#if></#if>/>
                            <label for="isRemote_no">否</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="hint fl">
                            <span class="required">*</span>
                            <span class="label">大屏配置规模：</span>
                        </div>
                        <div class="form_item fl">
                        <#if theme??>
                            <input type="text" placeholder="行" minVal="${theme.row}" name="theme.row" value="${theme.row}"/>：<input type="text" placeholder="列" minVal="${theme.col}" name="theme.col" value="${theme.col}"/>
                        <#else>
                            <input type="text" placeholder="行" name="theme.row"/>：<input type="text" placeholder="列" name="theme.col"/>
                        </#if>
                        </div>
                    </div>
                </div>
           </form>
        </div>
        <div class="footer">
            <input type="hidden" id="basePath" value="${path}"/>
            <input type="button" value="下一步" id="next"/>
        </div>
    </div>
</div>
</div>
</body>
<script type="text/javascript" src="${path}/js/jquery-1.7.2.min.js"></script>
<#--<script type="text/javascript" src="${path}/js/jquery.jBox.src.js"></script>-->
<#--<script type="text/javascript" src="${path}/js/jboxconfig.js"></script>-->
<script text="text/javascript" src="${path}/js/theme.js"></script>
</html>
