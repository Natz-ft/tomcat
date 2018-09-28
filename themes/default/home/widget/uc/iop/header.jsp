<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="header-wrap">
	<div class="header-top-wrap">
		<div class="header-top clearfix">
			<div class="sitemap fl">
				<span class="txt">网站导航</span>
				<div class="dropdown">
				</div>
			</div>
			<div class="userinfo fr">
				<c:if test="${empty sessionScope.userInfo}">
				<a href="javascript:doLogin()">登录</a>
				<span class="vline"></span>
				<a href="javascript:void(0)">注册</a>
				</c:if>
				<c:if test="${!empty sessionScope.userInfo}">
				<a href="${fn:getHome()}">您好，${sessionScope.userInfo.nick_name}</a>
				<span class="vline"></span>
	 			<a href="javascript:void(0)">退出</a>
				</c:if>
			</div>
		</div>
	</div>
	<div class="header-nav-wrap">
		<div class="header-nav clearfix">
			<img class="logo" src="${fn:getLink('images/iop/header-logo.png')}"/>
			<ul class="nav-items">
				<li class="nav-item<c:if test="${action eq 'index'}"> on</c:if>">
					<a class="nav-item-txt" href="${fn:getLink('iop/index.jsp')}">首&nbsp;页</a>
				</li>
				<li class="nav-item">
					<a class="nav-item-txt">产品理念</a>
				</li>
				<li class="nav-item<c:if test="${action eq 'productDetail'}"> on</c:if>">
					<a class="nav-item-txt" href="${fn:getLink('iop/productDetail.jsp')}">产品服务</a>
					<div class="nav-item-dropdown">
						<ul class="drop-items">
							<li class="drop-item">
								<span class="parts-icon tqing"></span>
								<span class="parts-txt">浪潮天擎</span>
								<input type="hidden" name="pid" value="tqing"/>
							</li>
							<li class="drop-item">
								<span class="parts-icon tji"></span>
								<span class="parts-txt">浪潮天机</span>
								<input type="hidden" name="pid" value="tji"/>
							</li>
							<li class="drop-item">
								<span class="parts-icon tmai"></span>
								<span class="parts-txt">浪潮天脉</span>
								<input type="hidden" name="pid" value="tmai"/>
							</li>
							<li class="drop-item">
								<span class="parts-icon tjie"></span>
								<span class="parts-txt">浪潮天街</span>
								<input type="hidden" name="pid" value="tjie"/>
							</li>
							<li class="drop-item">
								<span class="parts-icon tque"></span>
								<span class="parts-txt">浪潮天阙</span>
								<input type="hidden" name="pid" value="tque"/>
							</li>
							<li class="drop-item last">
								<span class="parts-icon tlai"></span>
								<span class="parts-txt">浪潮天籁</span>
								<input type="hidden" name="pid" value="tlai"/>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item">
					<a class="nav-item-txt">合作案例</a>
				</li>
				<li class="nav-item">
					<a class="nav-item-txt">帮助中心</a>
				</li>
				<li class="nav-item last">
					<a class="nav-item-txt">客户服务</a>
				</li>
			</ul>
		</div>
	</div>
</div>

<script type="text/javascript">
$(".header-nav .nav-item").hover(function() {
	if($(this).children(".nav-item-dropdown").length > 0) {
		$(this).addClass("hover");
		$(this).children(".nav-item-dropdown").addClass("show");
	}
},function() {
	if($(this).children(".nav-item-dropdown").length > 0) {
		$(this).removeClass("hover");
		$(this).children(".nav-item-dropdown").removeClass("show");
	}
});
$(".header-nav .drop-item").click(function() {
	var pid = $(this).children("input[name='pid']").val();
	window.location.href = "${fn:getLink('iop/productDetail.jsp')}?pid="+pid;
});
function doLogin() {
	var SSO_URL = "${fn:getLink('uc/login/login.jsp')}"; 	
 	var RelayState = window.location.href;
 	window.location.href = SSO_URL+"?RelayState="+encodeURIComponent(RelayState);
	return false;
}
</script>