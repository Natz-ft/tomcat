<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:style href="css/login.css" rel="stylesheet" />
<website:script src="js/common/header.js" />
<website:script src="js/common/md5.js" />
<website:script src="js/detectBrowser.js" />

<script type="text/javascript">
var logoutUrl = "${fn:getLoginKey('logoutAjax') }";
var loginAjax = "${fn:getLoginKey('loginAjax') }";
var uc_home_url = "${fn:getConfValues('global.index.odweb')}";
var register_url = "${fn:getLoginKey('regUrl') }";
var login_url = "${fn:getLoginKey('loginUrl') }";
var dataUrl = "${fn:getConfValues('global.index.odweb')}";
</script>
<div id="dialogBg"></div>
<div id="dialog" style="padding: 0px;">
	<form id="formLogin" action="${fn:getLoginKey('loginAjax') }"  method="post">
		<div class="loginBox">
			<div class="loginBoxCenter">
				<div class="loginTitle">
					<a href="javascript:;" class="claseDialogBtn"><div class="closebutton">关闭</div></a>
				</div>
				<p><label for="username">用户账号：</label></p>
				<p><input type="text" id="account" name="account" class="loginInput" autofocus="autofocus" required="required" autocomplete="off" placeholder="请输入账号" value="" /></p>
				<p><label for="password">密码：</label></p>
				<p style="position:relative;"><input type="password" id="password" name="password" class="loginInput" required="required" placeholder="请输入密码" value="" />
				<a href="${fn:getConfValues('web_getpwd')}" class="forgetLink" style="position:absolute;top:-30px;right:0;width:60px;">忘记密码?</a></p>
				<input id="pwd" name="pwd" type="hidden" value="">
			</div>
			<div class="loginBoxButtons">
				<input id="remember" type="checkbox" name="remember" value="1" />
				<label for="remember">记住登录状态</label>
                <img class="reginBtn" id="reginbutton" style="margin-top:0px"/>
				<button class="loginBtn" id="loginbutton"></button>
 				<div class="threelogin">
					<span>使用第三方帐号登录</span>
					<a title="使用Sina微博账号登录" href="${fn:getConfValues('global.index.odweb')}/login.do?method=otherLogin&type=sina" hideFocus="hidefocus">
					<img src="${fn:getUrl('/img/login/weibobtn.png')}" alt=""></a>
					<a title="使用QQ账号登录" href="${fn:getConfValues('global.index.odweb')}/login.do?method=otherLogin&type=qq" hideFocus="hidefocus">
					<img src="${fn:getUrl('/img/login/qqbtn.png')}" alt=""></a>
				</div> 
			</div>
		</div>
	</form>
</div>
<!--页面顶部START-->
<div class="sy_header">
		<div class="sy_content">
			<div class="sy_headerleft">
				<span>${regionStatistics.region_name }</span>
				<c:if test="${sessionScope.is_enable_multistation=='1' }">
					<span><a href="${fn:getConfValue('global.index.odweb')}/changeCity/" style="color:#FF0000;">【切换城市】</a></span>
				</c:if>
			</div>
			<div class="sy_headeright">
				<%-- <input type="hidden" id="login_salt" value="${login_salt }">
				<c:if test="${empty sessionScope.userInfo }">
					<span><a href="javascript:;" class="bounceIn">登录</a></span><span>|</span><span><a href="${fn:getLoginKey('regUrl') }">注册</a></span>
				</c:if>
				<c:if test="${!empty sessionScope.userInfo }">
					<span><a href="${fn:getConfValue('web_uc') }"><c:if test="${empty sessionScope.userInfo.nick_name }">${sessionScope.userInfo.user_id }</c:if><c:if test="${!empty sessionScope.userInfo.nick_name }">${sessionScope.userInfo.nick_name }</c:if></a><input id="uid" name="uid" type="hidden" value="${sessionScope.userInfo.uid}"><input id="uname" name="uname" type="hidden" value="${sessionScope.userInfo.nick_name}"></span><span>|</span><span><a id="logout">退出</a></span>
				</c:if> --%>
			</div>
		</div>
</div>
<div class="sy_line"></div>
<!--页面顶部END-->
<div class="header">
    <div class="g-main">
        <a href="${fn:getConfValue('global.index.odweb')}/index.htm" class="header-logo">
            <img src="${fn:getUrl('img/common/logo.png') }"/>
            <img src="${fn:getUrl('img/common/logo_title.png') }"/>
        </a>
        <form id="searchFormat" action="${fn:getLink('search/index.jsp')}"
        	method="post" onsubmit="return checkSearch();">
        <div class="header-search">
            <select class="sel-corner" id="searchType">
                <option>全部</option>
                <option>数据集</option>
                <option>API</option>
                <option>应用</option>
            </select>
            <input type="text" class="m-input" id="searchKey"/>
            <a id="searchButton" href="javascript:;" target="_blank" class="m-btn btn-info"></a>
        </div>
        </form>
    </div>
</div>
<div class="nav">
    <div class="g-main">
        <div class="nav-list">
            <ul>
                <li><a href="${fn:getLink('index.htm') }">首页</a></li>
                <li><a href="${fn:getLink('catalog/index.htm') }">数据目录</a></li>
                <li><a href="${fn:getLink('map/index.htm') }">地图服务</a></li>
                <li><a href="${fn:getLink('dataService/analyse.htm') }">数据服务</a></li>
                <li><a href="${fn:getLink('dataService/relnet.htm') }">数据图片</a></li>
                <li><a href="${fn:getLink('appcenter/index.htm') }">应用商店</a></li>
                <li><a href="${fn:getLink('interact/index.htm') }">互动交流</a></li>
                <li><a href="${fn:getLink('developer/index.htm') }">开发者中心</a></li>
                <li><a href="${fn:getLink('developer/api/index.htm') }">API超市</a></li>
            </ul>
        </div>
        <div class="nav-btn">
        <input type="hidden" id="login_salt" value="${login_salt }">
	        <c:if test="${empty sessionScope.userInfo }">
	            <button class="m-btn btn-blank btn-corner" id="bounceIn">登录</button>
	            <button class="m-btn btn-info btn-corner" id="bounceRe">注册</button>
            </c:if>
            
            <c:if test="${not empty sessionScope.userInfo }">
                <span id="loginInfo">
					<c:if test="${empty sessionScope.userInfo.nick_name }">${sessionScope.userInfo.uid }</c:if>
					<c:if test="${!empty sessionScope.userInfo.nick_name }">${sessionScope.userInfo.nick_name }</c:if>
					<input id="uid" name="uid" type="hidden" value="${sessionScope.userInfo.uid}">
					<input id="uname" name="uname" type="hidden" value="${sessionScope.userInfo.nick_name}"></span>
	            <span>|</span>
			    <span id="logout">退出</span>
            </c:if>
        </div>
    </div>
    <div id="refushhtml" style=""></div>
</div>

<script type="text/javascript">
$('#bounceRe').on(
		"click",
		function() {
			var reginUrl = "${fn:getLoginKey('regUrl')}";
			window.location.href = reginUrl;
		});
		
$('#loginInfo').on(
		"click",
		function() {
			var reginUrl = "${fn:getConfValues('global.index.odweb')}" + "/uc/account/account.htm";
			window.location.href = reginUrl;
		});
</script>