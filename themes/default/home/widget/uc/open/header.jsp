<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:style href="css/uc/login.css" rel="stylesheet" />
<website:script src="js/uc/common/header.js" />
<website:script src="js/uc/md5.js" />
<script type="text/javascript">
var logoutUrl = "${fn:getLoginKey('logoutAjax') }";
var loginAjax = "${fn:getLoginKey('loginAjax') }";
var uc_home_url = "${fn:getConfValue('global.index.odweb')}";
var register_url = "${fn:getLoginKey('regUrl') }";
var login_url = "${fn:getLoginKey('loginUrl') }";
var dataUrl = "${fn:getConfValue('global.index.odweb')}";
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
				<p><input type="text" id="account" name="account" class="loginInput" autofocus="autofocus" required="required" autocomplete="off" placeholder="" value="" /></p>
				<p><label for="password">密码：</label></p>
				<p style="position:relative;"><input type="password" id="password" name="password" class="loginInput" required="required" autocomplete="off" placeholder="" value="" />
				<a href="${fn:getConfValue('web_getpwd')}" class="forgetLink" style="position:absolute;top:-30px;right:0;width:60px;">忘记密码?</a></p>
				<input id="pwd" name="pwd" type="hidden" value="">
				<input id="is_internal_web" name="is_internal_web" type="hidden" value="open">
			</div>
			<div class="loginBoxButtons">
				<input id="remember" type="checkbox" name="remember" value="1" />
				<label for="remember">记住登录状态</label>
                <img class="reginBtn" id="reginbutton" style="margin-top:0px"/>
				<button class="loginBtn" id="loginbutton"></button>
 				<div class="threelogin">
					<span>使用第三方帐号登录</span>
					<a title="使用Sina微博账号登录" href="${fn:getConfValue('global.index.odweb')}/uc/login.do?method=otherLogin&type=sina" hideFocus="hidefocus">
					<img src="${fn:getLink('/img/login/weibobtn.png')}" alt=""></a>
					<a title="使用QQ账号登录" href="${fn:getConfValue('global.index.odweb')}/uc/login.do?method=otherLogin&type=qq" hideFocus="hidefocus">
					<img src="${fn:getLink('/img/login/qqbtn.png')}" alt=""></a>
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
			</div>
		</div>
</div>
<div class="sy_line"></div>
<!--页面顶部END-->
<div class="header">
    <div class="g-main">
        <a href="${fn:getConfValue('global.index.odweb')}/index.htm" class="header-logo">
            <img src="${fn:getLink('img/uc/common/logo.png') }"/>
            <img src="${fn:getLink('img/uc/common/logo_title.png') }"/>
        </a>
        <form id="searchFormat" action="${fn:getConfValue('global.index.odweb')}/search/index.jsp"
        	method="post" onsubmit="return checkSearch();">
        <div class="header-search" id="headser">
            <select class="sel-corner" id="searchAllType" name="searchAllType">
                <option value="">全部</option>
                <option value="1"
	                <c:if test="${searchAllType == 1}">
	                	selected="selected"
	                </c:if>
                >数据目录</option>
                <option value="3"
	                <c:if test="${searchAllType == 3}">
	                	selected="selected"
	                </c:if>
                >APP应用</option>
                <option value="4"
	                <c:if test="${searchAllType == 4}">
	                	selected="selected"
	                </c:if>
                >API服务</option>
                <option value="5"
	                <c:if test="${searchAllType == 5}">
	                	selected="selected"
	                </c:if>
                >文件资讯</option>
            </select>
            <input type="text" class="m-input" id="searchAllKey" name="searchAllKey" value="${searchAllKey}"/>
            <a id="searchButton" target="_blank" class="m-btn btn-info"></a>
        </div>
        </form>
    </div>
</div>
<div class="nav">
    <div class="g-main">
        <div class="nav-list">
            <ul>
                <li><a href="${fn:getConfValue('global.index.odweb')}/index.htm">首页</a></li>
                <li>
                	<a href="javascript:;">数据目录</a>
                 	<ul>
			            <li ><a href="${fn:getConfValue('global.index.odweb')}/catalog/index.htm?cata_type=default">政务目录</a></li>
			            <li ><a href="${fn:getConfValue('global.index.odweb')}/catalog/index.htm?cata_type=internet">互联网目录</a></li>
			            <li ><a href="${fn:getConfValue('global.index.odweb')}/catalog/index.htm?cata_type=social">社会目录</a></li>
			        </ul>
                </li>
                <li><a href="${fn:getConfValue('global.index.odweb')}/map/index.htm">地图服务</a></li>
                <li><a href="${fn:getConfValue('global.index.odweb')}/analyse/index.htm">统计服务</a></li>
                <li><a href="${fn:getConfValue('global.index.odweb')}/relnet/index.htm">关联服务</a></li>
                <li><a href="${fn:getConfValue('global.index.odweb')}/appcenter/index.htm">应用商店</a></li>
                <li><a href="${fn:getConfValue('global.index.odweb')}/interact/index.htm">互动交流</a></li>
                <li><a href="${fn:getConfValue('global.index.odweb')}/dev/developer/index.htm">开发者中心</a></li>
                <li><a href="${fn:getConfValue('global.index.odweb')}/dev/developer/serviceList.htm">API超市</a></li>
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
			var reginUrl = "${fn:getConfValue('global.index.odweb')}" + "/uc/account/account.htm";
			window.location.href = reginUrl;
		});
</script>