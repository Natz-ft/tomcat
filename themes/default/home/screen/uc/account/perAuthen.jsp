<%@page import="java.io.Writer"%>
<%@page import="java.util.*"%>
<%@page import="java.io.UnsupportedEncodingException"%>
<%@page import="java.net.URLDecoder"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<website:style href="css/account.css"/>
<style>
.authen-status {
	margin-top: 20px;
	margin-left: 28px;
	width: 760px;
	height: 150px;
	border: 1px solid #eaeaea;
	background-color: #f3f8fc;
}

.service-contain {
	margin: 40px 25px 100px;
	width: 90%;
	float: left;
}

.service-contain img {
	width: 64px;
	height: 64px;
	margin: 5px 25px;
}

.service-contain ul {
	margin: 0;
	margin-left: 80px;
	width: 90%;
	float: left;
}

.service-contain li {
	text-align: center;
	float: left;
	width: 130px;
	height: 120px;
	padding: 0;
	margin: 0;
	margin-left: 10px;
	list-style-type: none;
	font-size: 14px;
}

.service-detail {
	margin: 0px;
	padding: 15px 0 0;
	border-bottom: 1px dashed #dbdbdc;
	width: 100%;
	float: left;
}

.service-detail  p {
	font-size: 16px;
	line-height: 26px;
	padding-bottom: 20px;
}
.com-user{
	display:block;
	float:left;
	width:155px;
	height: 53px;
	background: url(${fn:getLink('images/com-bj.png')}) 0 0;
	border: 1px solid #bed4e3;
	background-repeat: repeat-x;
	margin:20px 10px 75px 45px;
	font-size:16px;
	text-align:center;
	line-height:53px;
	color:#2f86c5;
}
.jt{
	display:block;
	float:left;
	width:60px;
	height: 15px;
	background: url(${fn:getLink('images/jt.png')}) no-repeat 0 0;
	margin:42px 10px 75px 10px;

}
.shiming-contain,.renzheng-contain{
	margin:10px;
	padding:0;
	float:left;
	width:156px;
	color:#2f86c5;
}
.shiming-user{
	display:block;
	float:left;
	width:155px;
	height: 53px;
	background: url(${fn:getLink('images/com-bj.png')}) 0 0;
	border: 1px solid #bed4e3;
	background-repeat: repeat-x;
	margin:10px 0px 10px;
	font-size:16px;
	text-align:center;
}
.renzheng-user{
	display:block;
	float:left;
	width:155px;
	height: 53px;
	background: url(${fn:getLink('images/com-bj.png')}) 0 0;
	border: 1px solid #bed4e3;
	background-repeat: repeat-x;
	margin:10px 0px 10px;
	font-size:16px;
	text-align:center;
}
.shiming-status ,.renzheng-status{
	width: 40px;
	margin: 0px auto;
	height: 16px;
	padding: 1px 5px;
	line-height: 16px;
	text-align: center;
	display: inline-block;
	background-color: #1d98de;
	color: #ffffff;
	font-size: 12px;
	font-weight: bold;
}
.shiming-user-tip,.renzheng-user-tip{
	display: inline-block;
	width: 100%;
	float: left;
	margin-top: 8px;
	line-height: 18px;
}
.need-tip{
	font-size:14px;
	color:#333333;
}
</style>
<div class="panel account-show-panel">
	<div class="content-title">
		<span class="title-icon"></span><span>实名认证</span>
	</div>
	
	<div class="authen-out-contain clearfix">
		<div class="authen-status">
			<span class="com-user">一般注册用户</span> 
			<span class="jt"></span>
			<div class="shiming-contain">
				<c:if test="${authenLevel == 0}">
					<a href="${fn:getLink('account/comAuthen.jsp')}"> 
						<span class="shiming-user">
							<span class="shiming-user-tip">实名注册用户</span>
							<span class="shiming-status"> 未通过 </span>
						</span>
					</a>
				</c:if>
				<c:if test="${authenLevel > 0}">
					<span class="shiming-user"> 
						<span class="shiming-user-tip">实名注册用户</span>
						<span class="shiming-status"> 已通过 </span>
					</span>
				</c:if>
				<span class="need-tip">
					需填写个人姓名、身份证号码，并验证手机号码
				</span>
			</div>
			<span class="jt"></span>
			<div class="renzheng-contain">
				<c:if test="${authenLevel == 0}">
					<span class="renzheng-user">
						<span class="renzheng-user-tip">认证用户</span>
						<span class="renzheng-status"> 未认证 </span>
					</span> 
				</c:if>
				<c:if test="${authenLevel == 1}">
					<a href="${fn:getLink('account/realAuthen.jsp')}"> 
						<span class="renzheng-user">
							<span class="renzheng-user-tip">认证用户</span>
							<span class="renzheng-status"> 未认证 </span>
						</span>
					</a> 
				</c:if>
				<c:if test="${authenLevel == 2}">
					<span class="renzheng-user">
						<span class="renzheng-user-tip">认证用户</span>
						<span class="renzheng-status">已认证</span>
					</span>
				</c:if>
				<c:if test="${authenLevel == 3}">
					<span class="renzheng-user">
						<span class="renzheng-user-tip">认证用户</span>
						<span class="renzheng-status">待审核 </span>
					</span>
				</c:if>
				<c:if test="${authenLevel == 4}">
					<a href="${fn:getLink('account/rejectAuthen.jsp')}"> 
						<span class="renzheng-user">
							<span class="renzheng-user-tip">认证用户</span>
							<span class="renzheng-status">已驳回  </span>
						</span>
					</a>
				</c:if>
				<span class="need-tip">
					需上传本人持身份证照片
				</span>
			</div>
		</div>
		<div class="service-contain">
			<P
				style="font-size: 16px; line-height: 26px; padding-bottom: 20px; border-bottom: 1px dashed #dbdbdc;">实名认证成功后能使用的服务：</P>
			<div class="service-detail">
				<p style="color: #2f86c5;">实名注册用户：能使用一般注册用户使用的服务，还可以使用：</p>
				<ul>
					<li><img src="${fn:getLink('images/smyx.png')}"> <span>市民邮箱</span>
					</li>
				</ul>
			</div>
			<div class="service-detail" style="border-bottom:none;">
				<p style="color: #0f74bc;">认证用户：能使用一般注册用户和实名注册用户使用的服务，还可以使用：</p>
				<ul>
					<li><img src="${fn:getLink('images/clwz.png')}"> <span>车辆违章信息订阅</span>
					</li>
					<li><img src="${fn:getLink('images/shebao.png')}"> <span>个人社保信息订阅</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>




