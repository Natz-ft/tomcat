<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="sitemap">
	<span class="icons smtitle">您的位置</span>
	<c:forEach var="item" items="${sitemap}">
		<span class="icons smspace"></span>
		<a title="${item.label}" href="${item.url}">${item.label}</a>
	</c:forEach>
</div>