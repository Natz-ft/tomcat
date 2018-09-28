<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="jstlfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:style href="css/menuleft.css" />
<script>
	$(document).ready(function() {
		$("#title1").click(function(event) {
			$("#detail1").slideToggle();
		});
		$("#title2").click(function(event) {
			$("#detail2").slideToggle();
		});
		$("#title3").click(function(event) {
			$("#detail3").slideToggle();
		});
		$("#commentbtn").click(function() {
			$("#commentbox").fadeToggle();
		});
	});
</script>
<div class="kfz_left">
	<div class="kfz_user">
		<div class="kfz_head">
			<c:if test="${sessionScope.userInfo.avatar==null}">
				<a
					href="${fn:getConfValue('global.index.ucweb')}/account/accountPhoto.htm"><img
					src="${fn:getUrl('/img/index/userhead.jpg')}" alt=""></a>
			</c:if>

			<c:if test="${sessionScope.userInfo.avatar!=null}">
				<a
					href="${fn:getConfValue('global.index.ucweb')}/account/accountPhoto.htm"><img
					src="${sessionScope.userInfo.avatar}" alt=""></a>
			</c:if>
		</div>
		<a href="${fn:getLink('account/account.jsp')}" class="kfz_name">${user.nick_name}</a>
	</div>
	<div class="kfz_menu">
		<c:if
			test="${sessionScope.developer_id !=null && sessionScope.developer_id !='' }">
			<div class="kfz_menutitle" id="title1">
				<span> <i class="icon icon1"></i>开发者控制台
				</span>
			</div>
			<div class="kfz_menudetail" id="detail1">
				<ul class="kfz_menulist">
					<%-- 				<li id="developstatis"><a href="${fn:getGlobalKey('global.index.ac')}/developer/devStatistics.jsp"><i class="icon icon5"></i>开发者统计</a></li> --%>
					<li id="appmanagelist"><a
						href="${fn:getConfValue('global.index.devweb')}/open/appList.htm"><i
							class="icon icon8"></i>应用管理</a></li>
					<li id="appcreate"><a
						href="${fn:getConfValue('global.index.devweb')}/open/appCreate.htm"><i
							class="icon icon3"></i>应用创建</a></li>
					<li id="appassesslist"><a
						href="${fn:getConfValue('global.index.devweb')}/developer/appAssessList.htm"><i
							class="icon icon05"></i>应用评价</a></li>
					<li id="serviceApply"><a
						href="${fn:getConfValue('global.index.devweb')}/developer/serviceApply.htm">
							<i class="icon icon03"></i>服务申请
					</a></li>
					<li id="applyedServiceList"><a
						href="${fn:getConfValue('global.index.devweb')}/developer/applyedServiceList.htm">
							<i class="icon icon08"></i>服务管理
					</a></li>
				</ul>
			</div>
		</c:if>

		<div class="kfz_menutitle" id="title2">
			<span> <i class="icon icon02"></i>个人中心
			</span>
		</div>
		<div class="kfz_menudetail" id="detail2">
			<ul class="kfz_menulist">
				<%-- 				<li id="mystatis"><a href="${fn:getConfValue('web_data')}/home/index.jsp"> <i class="icon icon005"></i>我的统计
				</a></li> --%>
				<li id="mydata"><a
					href="${fn:getConfValue('global.index.dataweb')}/developer/catalogList.htm">
						<i class="icon icon003"></i>我订阅的数据
				</a></li>
				<li id="myapp"><a
					href="${fn:getConfValue('global.index.dataweb')}/developer/appList.htm">
						<i class="icon icon008"></i>我的应用
				</a></li>
				<li id="mycon"><a
					href="${fn:getConfValue('global.index.dataweb')}/developer/interact/myInteract.htm">
						<i class="icon icon006"></i>我的消息
				</a></li>
				<li id="mysurvey"><a
					href="${fn:getConfValue('global.index.dataweb')}/developer/interact/mySurvey.htm">
						<i class="icon icon03"></i>我的需求
				</a></li>
				<li id="myadvice"><a
					href="${fn:getConfValue('global.index.dataweb')}/developer/interact/myAdvice.htm">
						<i class="icon icon05"></i>我的建议
				</a></li>
			</ul>
		</div>
		<div class="kfz_menutitle" id="title3">
			<span> <a href="#"> <i class="icon icon11"></i>账号设置
			</a>
			</span>
		</div>
		<div class="kfz_menudetail" id="detail3">
			<ul class="kfz_menulist">
				<c:if
					test="${sessionScope.developer_id == null || sessionScope.developer_id == ''}">
					<li id="developerid"><a
						href="${fn:getConfValue('dev.developer')}/console/developer.htm">
							<i class="icon icon15"></i>注册成为开发者
					</a></li>
				</c:if>
				<li id="personinfo"><a
					href="${fn:getConfValue('global.index.ucweb')}/account/account.htm">
						<i class="icon icon15"></i>个人资料
				</a></li>
				<li id="accountphoto"><a
					href="${fn:getConfValue('global.index.ucweb')}/account/accountPhoto.htm">
						<i class="icon icon13"></i>头像设置
				</a></li>
				<li id="bind"><a
					href="${fn:getConfValue('global.index.ucweb')}/account/accountBind.htm">
						<i class="icon icon18"></i>外部绑定
				</a></li>
			</ul>
		</div>
		<div class="kfz_menutitle" id="title3">
			<span> <i class="icon icon20"></i>安全中心
			</span>
		</div>
		<div class="kfz_menudetail" id="detail3">
			<ul class="kfz_menulist">
				<li id="changePwd"><a
					href="${fn:getConfValue('global.index.ucweb')}/security/secChangePwd.htm">
						<i class="icon icon21"></i>修改密码
				</a></li>
				<li id="bindphone"><a
					href="${fn:getConfValue('global.index.ucweb')}/security/secBindPhoneW.htm">
						<i class="icon icon22"></i>绑定手机
				</a></li>
				<li id="secemail"><a
					href="${fn:getConfValue('global.index.ucweb')}/security/secBindMailW.htm">
						<i class="icon icon23"></i>安全邮箱
				</a></li>
				<li id="pwdques"><a
					href="${fn:getConfValue('global.index.ucweb')}/security/secAsk.htm">
						<i class="icon icon24"></i>密保问题
				</a></li>
			</ul>
		</div>
	</div>
</div>

