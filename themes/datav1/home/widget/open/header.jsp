<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	var logoutUrl = "${fn:getLoginKey('logoutAjax') }";
	var loginAjax = "${fn:getLoginKey('loginAjax') }";
	var uc_home_url = "${fn:getConfValue('web_uc')}";
	var register_url = "${fn:getLoginKey('regUrl') }";
	var login_url = "${fn:getLoginKey('loginUrl') }";
	var dataUrl = "${fn:getUrl('')}";
</script>
<website:script src="js/common/search.js" />
<website:style href="css/common/header.css" />
<website:style href="css/common/login.css" />
<website:meta content="no-cache" />
<!-- 输出header -->
<website:head>
	<website:title>浪潮数据开放平台</website:title>
	<website:meta httpEquiv="Content-Type"
		content="text/html; charset=utf-8" />
</website:head>
<div id="dialogBg"></div>
<div id="dialog">
	<form id="formLogin" action="${fn:getLoginKey('loginAjax') }"
		method="post">
		<div class="loginBox">
			<div class="loginBoxCenter">
				<div class="loginTitle">
					<a href="javascript:;" class="claseDialogBtn"><div
							class="closebutton">关闭</div></a>
				</div>
				<p>
					<label for="username">用户账号：</label>
				</p>
				<p>
					<input type="text" id="account" name="account" class="loginInput"
						autofocus="autofocus" required="required" autocomplete="off"
						placeholder="请输入账号" value="" />
				</p>
				<p>
					<label for="password">密码：</label>
				</p>
				<p style="position: relative;">
					<input type="password" id="password" name="password"
						class="loginInput" required="required" placeholder="请输入密码"
						value="" /> <a href="${fn:getConfValue('web_getpwd')}"
						class="forgetLink"
						style="position: absolute; top: -30px; right: 0; width: 60px;">忘记密码?</a>
				</p>
				<input id="pwd" name="pwd" type="hidden" value="">
			</div>
			<div class="loginBoxButtons">
				<input id="remember" type="checkbox" name="remember" value="1" /> <label
					for="remember">记住登录状态</label> <img class="reginBtn"
					id="reginbutton" style="margin-top: 0px" />
				<button class="loginBtn" id="loginbutton"></button>
				<div class="threelogin">
					<span>使用第三方帐号登录</span> <a title="使用Sina微博账号登录"
						href="${fn:getConfValue('web_uc_context')}login.do?method=otherLogin&type=sina"
						hideFocus="hidefocus"> <img
						src="${fn:getUrl('/img/layout/weibobtn.png')}" alt=""></a> <a
						title="使用QQ账号登录"
						href="${fn:getConfValue('web_uc_context')}login.do?method=otherLogin&type=qq"
						hideFocus="hidefocus"> <img
						src="${fn:getUrl('/img/layout/qqbtn.png')}" alt=""></a>
				</div>
			</div>
		</div>
	</form>
</div>
<div class="sy_header">
	<div class="sy_content">
		<div class="sy_headerleft">
			<span> <a href="javascript:void(0);"
				onclick="SetHome(this,document.domain);">设为首页</a> <a
				href="javascript:void(0);"
				onclick="AddFavorite('数据开放平台',location.href)">收藏本站</a>
			</span> <span>|</span> <span>${regionStatistics.region_name }</span>
			<c:if test="${sessionScope.is_enable_multistation=='1' }">
				<span><a href="${fn:getUrl('changeCity/') }"
					style="color: #FF0000;">【切换城市】</a></span>
			</c:if>
		</div>
		<div class="sy_headeright">
			<input type="hidden" id="login_salt" value="${login_salt }">
			<c:if test="${empty sessionScope.userInfo }">
				<span><a href="javascript:;" class="bounceIn">登录</a></span>
				<span>|</span>
				<span><a href="${fn:getLoginKey('regUrl') }">注册</a></span>
			</c:if>
			<c:if test="${!empty sessionScope.userInfo }">
				<span><a href="${fn:getConfValue('web_uc') }"><c:if
							test="${empty sessionScope.userInfo.nick_name }">${sessionScope.userInfo.user_id }</c:if>
						<c:if test="${!empty sessionScope.userInfo.nick_name }">${sessionScope.userInfo.nick_name }</c:if></a><input
					id="uid" name="uid" type="hidden"
					value="${sessionScope.userInfo.uid}"><input id="uname"
					name="uname" type="hidden"
					value="${sessionScope.userInfo.nick_name}"></span>
				<span>|</span>
				<span><a id="logout">退出</a></span>
			</c:if>
		</div>
	</div>
</div>
<!--页头END-->
<div class="sy_line"></div>
<!--标题BEGIN-->
<div class="sy_title">
	<div class="sy_content">
		<div class="sy_flash">
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
				width="380" height="100">
				<param name="movie"
					value="${fn:getUrl('/img/layout/flash_0107.swf')}" />
				<param name="quality" value="high" />
				<param name="wmode" value="transparent" />
				<param name="swfversion" value="6.0.65.0" />
				<!-- This param tag prompts users with Flash Player 6.0 r65 and higher to download the latest version of Flash Player. Delete it if you don’t want users to see the prompt. -->
				<param name="expressinstall" value="Scripts/expressInstall.swf" />
				<!-- Next object tag is for non-IE browsers. So hide it from IE using IECC. -->
				<!--[if !IE]>-->
				<object type="application/x-shockwave-flash"
					data="${fn:getUrl('/img/layout/flash_0107.swf')}" width="380"
					height="100">
					<!--<![endif]-->
					<param name="quality" value="high" />
					<param name="wmode" value="transparent" />
					<param name="swfversion" value="6.0.65.0" />
					<param name="expressinstall" value="Scripts/expressInstall.swf" />
					<!-- The browser displays the following alternative content for users with Flash Player 6.0 and older. -->
					<div>
						<h4>Content on this page requires a newer version of Adobe
							Flash Player.</h4>
						<p>
							<a href="http://www.adobe.com/go/getflashplayer"><img src=""
								alt="Get Adobe Flash player" width="112" height="33" /></a>
						</p>
					</div>
					<!--[if !IE]>-->
				</object>
				<!--<![endif]-->
			</object>
		</div>
		<!--
			<div class="sy_logo"></div>
			<div class="sy_keyword"></div>-->
		<div class="sy_search">
			<form id="searchFormat" action="${fn:getLink('search/index.jsp')}"
				method="post" onsubmit="return checkSearch();">
				<div class="sy_schtitle">
					<div>
						<span id="schtxt">全部</span>
						<div class="ytyj_schlist">
							<ul>
								<li id="" style="display: none;"><a>全部</a></li>
								<li id="1"><a>数据集</a></li>
								<li id="4"><a>API</a></li>
								<li id="3"><a>应用</a></li>
								<li id="2"><a>资讯</a></li>
							</ul>
						</div>
						<a id="ytyj_schdown"><img
							src="${fn:getUrl('/img/layout/top_arrow_search.jpg')}" alt=""></a>
					</div>
				</div>
				<div class="sy_schinput">
					<input type="text" class="sy_inputext" id="searchKey"
						name="searchKey" /> <input type="hidden" id="searchType"
						name="searchType" />
				</div>
				<div class="sy_schbutton">
					<a href="javaScript:void(0)" id="searchButton"><div></div></a>
				</div>
			</form>
		</div>
	</div>
</div>
<!--标题END-->
<!--导航BEGIN-->
<div class="sy_nav">
	<div class="sy_content">
		<ul>
			<a href="${fn:getUrl('')}"><li>首页</li></a>
			<a href="${fn:getUrl('catalog/')}"><li>数据目录</li></a>
			<a href="${fn:getUrl('analyse/')}"><li>数据指数</li></a>
			<a href="${fn:getUrl('relnet/')}"><li>数据图谱</li></a>
			<a href="${fn:getUrl('map/')}"><li>地图服务</li></a>
			<!-- <a href="${fn:getUrl('analysis/')}"><li>关联分析</li></a> -->
			<a href="${fn:getUrl('appcenter/')}"><li>应用商店</li></a>
			<a href="${fn:getUrl('interact/')}"><li>互动交流</li></a>
			<a href="${fn:getUrl('developer/')}"><li>开发者中心</li></a>
			<%-- 				<a href="${fn:getUrl('')}"><li>首页</li></a>
				<a href="${fn:getUrl('catalog/')}"><li>数据目录</li></a>
				<a href="${fn:getUrl('analyse/')}"><li>数据指数</li></a>
				<a href="${fn:getUrl('relnet/')}"><li>数据图谱</li></a>
				<a href="${fn:getUrl('map/')}"><li>地图服务</li></a>
				<!-- <a href="${fn:getUrl('analysis/')}"><li>关联分析</li></a> -->
				<a href="${fn:getUrl('appcenter/')}"><li>应用商店</li></a>
				<a href="${fn:getUrl('interact/')}"><li>互动交流</li></a>
				<a href="${fn:getUrl('developer/')}"><li>开发者中心</li></a> --%>
		</ul>
	</div>
</div>
<div id="refushhtml" style=""></div>

<website:script src="js/common/base64.js" />
<website:script src="js/md5.js" />
<website:script src="js/common/jquery.form.js" />
<website:script src="js/common/headersch.js" />
