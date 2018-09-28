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
<website:style href="css/uc/blockui_css.css"/>
<website:style href="css/uc/security/activesecmail.css"/>
<script type="text/javascript">
$("#secemail").addClass('menuon');
</script>
<div class="panel sec-show-panel">

	<div class="m_sum">
		<c:if test="${flag==1}">
			<div class="prompt-contain">
				<div class="prompt-top"></div>
				<div class="prompt-content">
					<dl>
						<dt>马上激活邮件，完成安全邮箱的绑定。</dt>
						<dd>
							<span class="prompt-ok"> </span>
						</dd>
						<dd style="width: 460px; height: 150px">
							<p>
								我们已经将邮件发送到您登记的邮箱：
								${secEmail}
							</p>
							<p>请您收取新邮件，并点击邮件里的"验证链接"完成安全邮箱的绑定。</p>
							<p>
								<a href="http://${email_url}" target="_bank" hideFocus="hidefocus">立即查看我的邮箱</a>
							</p>
							<p style="color: #999;">
								<strong>提示：</strong></br>如果没收到新邮件，可能会出现在您的垃圾邮件目录里 。 <br />或者：
								&nbsp;&nbsp;<a href="javascript:void(0);"
									class="resend-mail" hideFocus="hidefocus">重新发送激活邮件</a>
							</p>
						</dd>
					</dl>
				</div>
			</div>
		</c:if>
		<c:if test="${flag == 0}">
			<div class="prompt-contain">
				<div class="prompt-top"></div>
				<div class="prompt-content">
					<dl>
						<dt>
							请点击右侧重新发送激活邮件，完成安全邮箱的绑定。 <span class="re-email"><a
								href="javascript:void(0);" class="resend-mail"
								hideFocus="hidefocus">重新发送激活邮件</a> </span>
						</dt>
						<dd>
							<span class="prompt-ok"> </span>
						</dd>
						<dd style="width: 460px; height: 150px">
							<p>我们会重新发送激活邮件到您登记的邮箱：${secEmail}</p>
							<p>请您收取新邮件，并点击邮件里的"验证链接"完成安全邮箱的绑定。</p>
							<p>
								<a href="http://${email_url}" hideFocus="hidefocus">立即查看我的邮箱</a>
							</p>
							<p style="color: #999;">
								<strong>提示：</strong></br>如果没收到新邮件，可能会出现在您的垃圾邮件目录里。 
							</p>
						</dd>
					</dl>
				</div>
			</div>
		</c:if>
	</div>
	</div>
<website:script src="js/uc/jquery.blockUI.js"/>
<%-- <website:script src="js/uc/dialog.js"/> --%>
<website:script src="libs/assets/dialog/dialog.js" />
<script type="text/javascript">
	$(".resend-mail").on("click",function(){
		$.post("${fn:getLink('uc/security/securityAction.do?method=reSendActivateEmail')}",{},
		   function(data){
			     if(data){
			    	 dialog.info("已成功发送邮件，请注意查收！");
				 }else{
					 dialog.info("发送未成功，请重新点击发送！");
				 }
		});
	});
		
</script>
	


