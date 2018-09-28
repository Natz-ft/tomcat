<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" buffer="none"%>
<%
String odweb = ConfUtil.getValue("global.index.odweb");
String ucweb = ConfUtil.getValue("global.index.odweb");
pageContext.setAttribute("odweb", odweb);
pageContext.setAttribute("ucweb", ucweb);
%>

<link rel="stylesheet" type="text/css" href="${odweb}/css/uc/public/footer.css" />
	
<div class="footer" style="clear:both;">
    <div class="g-main">
        <div class="u-footer-up">
            <span><a href="${odweb}/about/index.htm">网站介绍</a></span>
            <span><a href="${odweb}/about/index.htm">网站声明</a></span>
            <span><a href="${odweb}/about/index.htm">网站导航</a></span>
            <span><a href="${odweb}/about/index.htm">联系我们</a></span>
        </div>
        <div class="u-footerline"></div>
        <p>版权所有 浪潮集团</p>
        <p>建议使用1300x768分辨率IE9.0以上版本浏览器</p>
    </div>
</div>