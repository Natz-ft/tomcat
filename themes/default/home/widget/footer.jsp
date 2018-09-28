<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" buffer="none"%>
<%
String odweb = ConfUtil.getValue("global.index.odweb");
String ucweb = ConfUtil.getValue("global.index.odweb");
pageContext.setAttribute("odweb", odweb);
pageContext.setAttribute("ucweb", ucweb);
%>

<link rel="stylesheet" type="text/css" href="${ucweb}/css/uc/public/footer.css" />
<style>
    .g-main {
        letter-spacing: 0!important;
        /*width: 745px;*/
        /*margin: auto;*/
    }
    .prop {
        font-size: 12px;
    }
    .m-ft .g-main ul li a .icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 50%;
    font-size: 16px;
    }
    .m-ft a:hover{
        text-decoration:none;
    }
    .m-ft a {
        color: #fff;
    }
    .m-ft ul li span{
        font-size: 14px;
    }
    .iconcd-jieshao {
        font-family: 'icomoon' !important;
    }
    .iconcd-jieshao:before {
        content: "\e902";
    }
    .iconcd-daohai:before {
        content: "\e901";
    }
    .iconcd-tall:before {
        content: "\e90a";
    }
</style>	
<div class="m-ft" style="padding: 14px 0 10px;color: #ddd;background-color: #313131;">
    <div class="g-main" style="width: 930px; margin: auto;">
        <ul style="display: flex;justify-content: space-between;overflow: hidden;padding-bottom: 10px;border-bottom: 1px solid #4f5665;">
            <li>
                <a href="${fn:getLink('about/index.htm?tab=1')}">
                    <div class="icon">
                        <span class="iconcd-jieshao" style="font-family:'icomoon'"></span>
                    </div>
                    <span class="info">平台介绍</span>
                </a>
            </li>
            <li>
                <a href="${fn:getLink('about/index.htm?tab=2')}">
                    <div class="icon">
                        <span class="iconcd-jieshao"></span>
                    </div>
                    <span class="info">平台声明</span>
                </a>

            </li>
            <li>
                <a href="${fn:getLink('about/index.htm?tab=3')}">
                    <div class="icon">
                        <span class="iconcd-daohai"></span>
                    </div>
                    <span class="info">平台导航</span>
                </a>
            </li>
            <li>
                <a href="${fn:getLink('about/index.htm?tab=4')}">
                    <div class="icon">
                        <span class="iconcd-tall"></span>
                    </div>
                    <span class="info">联系我们</span>
                </a>
            </li>
        </ul>
        <div class="prop center" style="margin-top: 10px">
            <span>主办：成都市人民政府</span>
            <span style="margin-left: 39px">承办：成都市大数据和电子政务管理办公室</span>
            <span style="margin-left: 30px">承建维护：成都市软件产业发展中心</span>
            <span style="margin-left: 30px">备案编号：蜀ICP备05003365号-1</span>
        </div>
        <div class="prop center" style="margin-top: 10px">(建议使用Chrome、360浏览器(极速模式)，1366*768以上分辨率浏览本站)</div>
    </div>
</div>