<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="jstlfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:style href="css/uc/menuleft.css" />
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
				<c:if test="${sessionScope.userInfo.avatar==null}"><a href="${fn:getConfValue('global.index.odweb')}/uc/account/accountPhoto.htm"><img src="http://www.cddata.gov.cn/rcservice/doc?doc_id=2116" alt=""></a></c:if>
				<c:if test="${sessionScope.userInfo.avatar!=null}"><a href="${fn:getConfValue('global.index.odweb')}/uc/account/accountPhoto.htm"><img src="http://www.cddata.gov.cn/rcservice/doc?doc_id=2116" alt=""></a></c:if>
		</div>
		<a style="height:1px" href="${fn:getLink('uc/account/account.jsp')}" class="kfz_name">${user.nick_name}</a>
	</div>
	<div class="kfz_menu">
	<c:if test="${sessionScope.developer_id !=null && sessionScope.developer_id !='' }">
		<div class="kfz_menutitle" id="title1">
			<span> <i class="icon icon1"></i>开发者控制台
			</span>
		</div>
		<div class="kfz_menudetail" id="detail1">
			<ul class="kfz_menulist">
<%-- 				<li id="developstatis"><a href="${fn:getGlobalKey('global.index.odweb')}/developer/devStatistics.jsp"><i class="icon icon5"></i>开发者统计</a></li> --%>
				<li id="appmanagelist"><a href="${fn:getConfValue('global.index.odweb')}/dev/console/appList.htm"><i class="icon icon8"></i>应用管理</a></li>
				<li id="appcreate"><a href="${fn:getConfValue('global.index.odweb')}/dev/console/appCreate.htm"><i class="icon icon3"></i>应用创建</a></li>
				<li id="appassesslist"><a href="${fn:getConfValue('global.index.odweb')}/dev/console/appAssessList.htm"><i class="icon icon05"></i>应用评价</a></li>
	 			<li id="serviceApply"><a href="${fn:getConfValue('global.index.odweb')}/dev/console/serviceApply.htm"> <i class="icon icon03"></i>服务申请</a></li>
				<li id="applyedServiceList"><a href="${fn:getConfValue('global.index.odweb')}/dev/console/applyedServiceList.htm"> <i class="icon icon08"></i>服务管理</a></li>
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
				<c:if test="${sessionScope.userInfo.user_type=='21'&& authen_level=='2'}">
				<li id="myapplydata"><a href="${fn:getConfValue('global.index.odweb')}/developer/interact/myApplyedData.htm"> <i class="icon icon003"></i>我的数据
				</a></li>
				</c:if>
				<li id="mydata"><a href="${fn:getConfValue('global.index.odweb')}/developer/interact/myCollectionData.htm"> <i class="icon icon003"></i>我收藏的数据
				</a></li>
				<li id="myapp"><a href="${fn:getConfValue('global.index.odweb')}/developer/interact/myCollectionApi.htm"> <i class="icon icon008"></i>我收藏的应用
				</a></li>
				<li id="mysurvey"><a href="${fn:getConfValue('global.index.odweb')}/developer/interact/mySurvey.htm"> <i class="icon icon006"></i>我参与的调查
				</a></li>
				<li id="myapplyed"><a href="${fn:getConfValue('global.index.odweb')}/developer/interact/myApplyedData.htm"> <i class="icon icon006"></i>我申请的数据
				</a></li>
				<li id="myadvice"><a href="${fn:getConfValue('global.index.odweb')}/developer/interact/myAdvice.htm"> <i class="icon icon006"></i>我的建议
				</a></li>
			</ul>
		</div>
		<div class="kfz_menutitle" id="title3">
			<span><i class="icon icon11"></i>账号设置
			</span>
		</div>
		<div class="kfz_menudetail" id="detail3">
			<ul class="kfz_menulist">
			<c:if test="${sessionScope.developer_id == null || sessionScope.developer_id == ''}">
				<li id="developerid"><a href="${fn:getConfValue('global.index.odweb')}/dev/console/developer.htm"> <i class="icon icon15"></i>注册成为开发者
				</a></li>
			</c:if>
				<li id="personinfo"><a href="${fn:getConfValue('global.index.odweb')}/uc/account/account.htm"> <i class="icon icon15"></i>个人资料
				</a></li>
				<li id="accountphoto" style="display: none;"><a href="${fn:getConfValue('global.index.odweb')}/uc/account/accountPhoto.htm"> <i class="icon icon13"></i>头像设置
				</a></li>
				<li id="bind" style="display: none;"><a href="${fn:getConfValue('global.index.odweb')}/uc/account/accountBind.htm"> <i class="icon icon18"></i>外部绑定
				</a></li>
			</ul>
		</div>
		<div class="kfz_menutitle" id="title3">
			<span> <i class="icon icon20"></i>安全中心
			</span>
		</div>
		<div class="kfz_menudetail" id="detail3">
			<ul class="kfz_menulist">
				<li id="changePwd"><a href="${fn:getConfValue('global.index.odweb')}/uc/security/secChangePwd.htm"> <i class="icon icon21"></i>修改密码
				</a></li>
				<li id="bindphone"><a href="${fn:getConfValue('global.index.odweb')}/uc/security/secBindPhoneW.htm"> <i class="icon icon22"></i>绑定手机
				</a></li>
				<li id="secemail" style="display: none;"><a href="${fn:getConfValue('global.index.odweb')}/uc/security/secBindMailW.htm"> <i class="icon icon23"></i>安全邮箱
				</a></li>
				<li id="pwdques" style="display: none;"><a href="${fn:getConfValue('global.index.odweb')}/uc/security/secAsk.htm"> <i class="icon icon24"></i>密保问题
				</a></li>
			</ul>
		</div>
	</div>
</div>

