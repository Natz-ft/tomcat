<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<website:style href="css/left-nav.css"/>
<div class="left-nav" id="leftNav">
		<ul>
			<li>
				<a class='lnav-item <c:if test="${accountType == 'accountBase' && accountType_l2 != 'accountPhoto'}">on</c:if>'
					href="${fn:getLink('account/account.jsp')}" hideFocus="hidefocus">
					<c:if test="${is_person}">
					<img src="${fn:getLink('images/s.gif')}"
							class="p-icon grzl" /> 个人资料
					</c:if>
					<c:if test="${is_organ}">
					<img src="${fn:getLink('images/s.gif')}"
							class="p-icon gwzl" />单位资料</c:if>
				</a>
			</li>
			<li>
				<a class='lnav-item next-item <c:if test="${accountType_l2 == 'accountBase_account'}">next-on</c:if>'href="${fn:getLink('account/account.jsp')}" hideFocus="hidefocus">
					<span>账号信息</span>
				</a>
			</li>
			<li >
				<c:if test="${is_organ}">
					<a class='lnav-item next-item <c:if test="${accountType_l2 == 'accountBase_info'}">next-on</c:if>' href="${fn:getLink('account/orgInfo.jsp')}" hideFocus="hidefocus"> 
						<span>基本资料</span>
					</a>
				</c:if>
				<c:if test="${is_person}">
					<a class='lnav-item next-item <c:if test="${accountType_l2 == 'accountBase_info'}">next-on</c:if>'href="${fn:getLink('account/perInfo.jsp')}" hideFocus="hidefocus"> 
						<span>身份资料</span>
					</a>
					<li >
						<a class=' lnav-item <c:if test="${accountType == 'authenSet'}">on </c:if>'
							href="${fn:getLink('account/perAuthen.jsp')}"
							hideFocus="hidefocus"> <img
							src="${fn:getLink('images/s.gif')}"
							class="p-icon authen" /> 实名认证
						</a>
					</li>
				</c:if>
			</li>
			<c:if test="${is_organ}">
				<li>
					<a class='lnav-item next-item <c:if test="${accountType_l2 == 'accountBase_bank'}">next-on</c:if>' href="${fn:getLink('account/bankInfo.jsp')}" hideFocus="hidefocus"> 
						<span>银行信息</span>
					</a>
				</li>
				<li>
					<a class='lnav-item next-item <c:if test="${accountType_l2 == 'accountBase_contact'}"> next-on</c:if>' href="${fn:getLink('account/contactInfo.jsp')}" hideFocus="hidefocus"> 
						<span>联系人信息</span>
					</a>
				</li>
				<li>
					<a class=' lnav-item <c:if test="${accountType == 'authenSet'}">on </c:if>'
						href="${fn:getLink('account/eAuthen.jsp')}"
					hideFocus="hidefocus"> <img
						src="${fn:getLink('images/s.gif')}"
						class="p-icon authen" /> 实名认证
					</a>
				</li>
			</c:if>
			
			<li >
				<a class='lnav-item <c:if test="${accountType_l2 == 'accountPhoto'}">on </c:if>'
					href="${fn:getLink('account/accountPhoto.jsp')}"hideFocus="hidefocus"> 
				<img src="${fn:getLink('images/s.gif')}"
					class="p-icon photo" />
					头像设置
				</a>
			</li>
			<li >
				<a class='lnav-item <c:if test="${accountType == 'accountBind'}">on </c:if>'
					href="${fn:getLink('account/accountBind.jsp')}"hideFocus="hidefocus"> 
				<img src="${fn:getLink('images/s.gif')}"
					class="p-icon bind" />
					外部绑定
				</a>
			</li>
			<li >
				<a class='lnav-item <c:if test="${accountType == 'remindSet'}">on </c:if>'
					href="${fn:getLink('account/remindSet.jsp')}"hideFocus="hidefocus"> 
				<img src="${fn:getLink('images/s.gif')}"
					class="p-icon pers" />
					提醒设置
				</a>
			</li>
			<c:if test="${is_person}">
				<li>
					<a class='lnav-item <c:if test="${accountType == 'accountCert'}">on</c:if>'
						href="${fn:getLink('account/file.jsp')}" hideFocus="hidefocus"> 
						<img src="${fn:getLink('images/s.gif')}"
							class="p-icon cert" />
							电子档案
					</a>
				</li>
			</c:if>
			<c:if test="${is_organ}">
				<li>
					<a class='lnav-item <c:if test="${accountType == 'subAccount'}">on</c:if>'
						href="${fn:getLink('account/subAccount.jsp')}" hideFocus="hidefocus"> 
						<img src="${fn:getLink('images/s.gif')}"
							class="p-icon subaccount" />
							子账号管理
					</a>
				</li>
			</c:if>
			<li >
				<a class='lnav-item <c:if test="${accountType == 'userSystemBind'}">on </c:if>'
					href="${fn:getLink('account/systemBind.jsp')}"hideFocus="hidefocus"> 
				<img src="${fn:getLink('images/s.gif')}"
					class="p-icon pers" />
					绑定管理
				</a>
			</li>
		</ul>
	</div>
