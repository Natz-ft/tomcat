<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="sitemap" class="hclear">
	<span class="icons home"></span>
	<span class="smtitle">您的位置</span>
		<span class="icons smspace"></span>
		<a title="我开发的应用" href="${fn:getLink('dev/console/appList.jsp')}">应用管理</a>
		<span class="icons smspace"></span>
		<a title="${app.app_alias}" href="#" id="app_alias_nav">${app.app_alias}</a>
</div>