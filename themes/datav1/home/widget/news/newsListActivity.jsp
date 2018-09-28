<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<website:style href="css/news/lb_style.css" />


<!--详情BEGIN-->
<div class="lb_detail">

	<div class="lb_content">
		<div class="top">
			<ul id="top_title">
				<li><a href="#">更新公告</a></li>
				<li><a href="#">数据新闻</a></li>
				<li><a href="#">活动与竞赛</a></li>
			</ul>
		</div>
		<div class="main">
			<div class="left">
				<c:forEach var="item" items="${listNotice}" varStatus="status">
					<c:if test="${item.create_time>today}">
						<div class="dian"></div>
					</c:if>
					<c:if test="${item.create_time<today}">
						<div class="dian_1"></div>
					</c:if>
				</c:forEach>
			</div>
			<div class="time">
				<c:forEach var="item" items="${listNotice}" varStatus="status">
					<c:if test="${item.create_time>today}">
						<div class="time-1">
							<fmt:formatDate value="${item.create_time}" />
						</div>
					</c:if>
					<c:if test="${item.create_time<today}">
						<div class="time-2">
							<fmt:formatDate value="${item.create_time}" />
						</div>
					</c:if>
				</c:forEach>
			</div>
			<div class="right">
				<ul>
					<c:forEach var="item" items="${listNotice}" varStatus="status">
						<li><c:if test="${item.create_time>today}">
								<a href="#" target="_blank">${fn:subString(item.title,60)}</a>
								<img src="${fn:getUrl('img/img/ico_new.png')}" width="26"
									height="12">
							</c:if> <c:if test="${item.create_time<today}">
								<a href="#" target="_blank">${fn:subString(item.title,60)}</a>
							</c:if></li>
					</c:forEach>
				</ul>
			</div>
			<div class="pageye">
				<ul>
					<a href="#"><li>&laquo;</li></a>
					<a href="#"><li>1</li></a>
					<a href="#"><li>2</li></a>
					<a href="#"><li>3</li></a>
					<a href="#"><li>4</li></a>
					<a href="#"><li>···</li></a>
					<a href="#"><li>下一页</li></a>
					<a href="#"><li class="rpage">&raquo;</li></a>
				</ul>
			</div>
		</div>

	</div>


</div>
<!--详情END-->

