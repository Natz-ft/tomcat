<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<website:style href="css/sec.css" />
<website:style href="css/left-nav.css"/>
<div class="left-nav" id="leftNav">
		<ul>
			<li>
				<a  class='lnav-item <c:if test="${nav == 'secCenter' }">on</c:if>'
					href="${fn:getLink('security/secCenter.jsp')}" hideFocus="hidefocus">
					<img src="${fn:getLink('images/s.gif')}" class="p-icon aqzx" />
					安全中心
  				</a>
			</li>
			
			<li>
				<a class='lnav-item <c:if test="${nav == 'secChangePwd' }">on</c:if>'
					href="${fn:getLink('security/secChangePwd.jsp')}" hideFocus="hidefocus">
					<img src="${fn:getLink('images/s.gif')}" class="p-icon pwd" />
					修改密码
  				</a>
			</li>
			
			<li>
				<a class='lnav-item <c:if test="${nav == 'secBindPhoneW' }">on</c:if>'
					href="${fn:getLink('security/secBindPhoneW.jsp')}" hideFocus="hidefocus">
					<img src="${fn:getLink('images/s.gif')}" class="p-icon mob" />
					绑定手机
  				</a>
			</li>
			
			<li>
				<a class='lnav-item <c:if test="${nav == 'secBindMailW' }">on</c:if>'
					href="${fn:getLink('security/secBindMailW.jsp')}" hideFocus="hidefocus">
					<img src="${fn:getLink('images/s.gif')}" class="p-icon mail" />
					安全邮箱
  				</a>
			</li>
			
			<li>
				<a class='lnav-item <c:if test="${nav == 'secAsk' }">on</c:if>'
					href="${fn:getLink('security/secAsk.jsp')}" hideFocus="hidefocus">
					<img src="${fn:getLink('images/s.gif')}" class="p-icon sve" />
					密保问题
  				</a>
			</li>
					
		</ul>
	</div>

