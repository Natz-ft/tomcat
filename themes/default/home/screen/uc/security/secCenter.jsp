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

<div class="panel sec-show-panel" style="min-height:565px;_height:570px;">

	<div class="content-title clearfix">
		<span class="title-icon"></span><span>安全中心</span>
	</div>

	<div class="login-detail" style="float:left;line-height: 36px;margin: 10px;padding:0px 40px 20px;font-size: 14px;">
		<dl style="float:left ; width:100%;">
			<dt style="float:left">登录名：</dt>
			<dd style="float:left">${userBasic.user_id}</dd>
		</dl>
		<dl style="float:left;width:100%;">
			<dt style="float:left">上次登录时间：</dt>
			<dd style="float:left"><span>${fn:formatDateBySeconds(userLoginInfo.last_login_time,null)}
				</span></dd>
			<dd style="float:left">
				<span class="m_warn" style="margin: 0px 10px;"> 
					<a href="${fn:getLink('security/secLoginRecord.jsp')}"
					hideFocus="hidefocus">查看我的登录记录</a>
				</span></dd>
		</dl>
		<dl style="float:left ; width:100%;">
			<dt style="float:left">账号安全度：
				<b>
					<c:if test="${accountSec == 1 }">
						很低
					</c:if>
					<c:if test="${accountSec == 2 }">
						一般
					</c:if>
					<c:if test="${accountSec == 3 }">
						高
					</c:if>
					<c:if test="${accountSec == 4 }">
						较高
					</c:if>
					<c:if test="${accountSec == 5 }">
						极高
					</c:if>
					&nbsp;
				</b>
			</dt>
			<dd style="float:left">
				<div class="sec_lev_wrap">
					<span class="sec_lev 
						<c:if test="${accountSec == 1 }">
							sec_lev_1
						</c:if>
						<c:if test="${accountSec == 2 }">
							sec_lev_2
						</c:if>
						<c:if test="${accountSec == 3 }">
							sec_lev_3
						</c:if>
						<c:if test="${accountSec == 4 }">
							sec_lev_4
						</c:if>
						<c:if test="${accountSec == 5 }">
							sec_lev_5
						</c:if>
						">
					</span>
				</div>
			
			</dd>
		</dl>
	</div>
	<%-- <div class="m_sum">
		<dl class="clearfix">
			<dt>登录名：</dt>
			<dd>${userBasic.user_id}</dd>
		</dl>
		<dl class="clearfix">
			<dt>上次登录时间：</dt>
			<dd>
				<span>${fn:formatDateBySeconds(userLoginInfo.last_login_time,null)}
				</span>
			</dd>
			<dd>
				<span class="m_warn" style="margin: 0px 10px;"> 
				<a href="${fn:getLink('security/secLoginRecord.jsp')}"
					hideFocus="hidefocus">查看我的登录记录</a>
				</span>
			</dd>
		</dl>
		<dl class="clearfix">
			<dt>账号安全度：
				<b>
					<c:if test="${accountSec == 1 }">
						很低
					</c:if>
					<c:if test="${accountSec == 2 }">
						一般
					</c:if>
					<c:if test="${accountSec == 3 }">
						高
					</c:if>
					<c:if test="${accountSec == 4 }">
						较高
					</c:if>
					<c:if test="${accountSec == 5 }">
						极高
					</c:if>
					&nbsp;
				</b>
			</dt>
			<dd>
				<div class="sec_lev_wrap">
					<span class="sec_lev 
						<c:if test="${accountSec == 1 }">
							sec_lev_1
						</c:if>
						<c:if test="${accountSec == 2 }">
							sec_lev_2
						</c:if>
						<c:if test="${accountSec == 3 }">
							sec_lev_3
						</c:if>
						<c:if test="${accountSec == 4 }">
							sec_lev_4
						</c:if>
						<c:if test="${accountSec == 5 }">
							sec_lev_5
						</c:if>
						">
					</span>
				</div>
			</dd>
		</dl>
	</div> --%>
	<div class="m_secu_lvl" style="float: left;width: 96%;">
	   	<h2 class="sec_sum">您的账号存在<span name="total">&nbsp;&nbsp;</span>项风险，完善后账号安全度立即增高：</h2>
	       <div class="warn_wrap">	
	       	<c:if test="${!empty userSecPass.security_phone && userSecPass.security_phone_status == 2}">
				<dl class="clearfix">
					<dt>
						<img src="${fn:getLink('images/main/transparent.gif')}"
							class="icon_secu icon_veri" /> <span class="sec_item_text">绑定手机：</span>
					</dt>
					<dd>
						<div class="opt_wrap">
							<a class="opt_link"
								href="${fn:getLink('security/secBindPhoneW.jsp')}"
								hideFocus="hidefocus"> 修改</a>
						</div>
						<p>
							您已经绑定手机：
							${fn:phoneReplaced(userSecPass.security_phone)}
						</p>
						<p class="opt_tip">使用手机可以轻松找回密码、订阅平台提供的各种资讯消息。</p>
					</dd>
				</dl>
			</c:if>
			
			<c:if test="${ empty userSecPass.security_phone || userSecPass.security_phone_status != 2}">
				<dl class="warn clearfix">
					<dt>
						<img src="${fn:getLink('images/main/transparent.gif')}"
							class="icon_secu icon_warn" /> <span class="sec_item_text">绑定手机：</span>
					</dt>
					<dd>
						<div class="opt_wrap">
							<a class="opt_btn opt_btn_blue"
								href="${fn:getLink('security/secBindPhoneW.jsp')}"
								hideFocus="hidefocus"> <span>立即设置</span>
							</a>
						</div>
						<p>您尚未绑定手机</p>
						<p class="opt_tip">使用手机可以轻松找回密码、订阅平台提供的各种资讯消息。</p>
					</dd>
				</dl>
			</c:if>
			
			<dl class="warn clearfix">
				<dt>
					<img src="${fn:getLink('images/main/transparent.gif')}"
						class="icon_secu 
						<c:if test="${userBasic.password_strength<3 || empty userBasic.password_strength }">
							icon_warn
						</c:if>
						<c:if test="${userBasic.password_strength>2}">
							icon_veri
						</c:if>
						"><span class="sec_item_text">修改密码：</span>
				</dt>
				<dd>
					<div class="opt_wrap">
						<a class="opt_link" href="${fn:getLink('security/secChangePwd.jsp')}" hideFocus="hidefocus">
							修改</a>
					</div>
					<p>您的密码安全强度：
						<c:if test="${userBasic.password_strength > 2}">
							较高
						</c:if>
						<c:if test="${userBasic.password_strength == 2 }">
							一般
						</c:if>
						<c:if test="${userBasic.password_strength < 2 || empty userBasic.password_strength}">
							较低
						</c:if>
					</p>
					<p class="opt_tip">建议密码由8位以上数字、字母和特殊字符组成。</p>
				</dd>
			</dl>
		<c:if test="${!empty userSecPass.security_email && userSecPass.security_email_status == 2}">
			<dl class="clearfix">
				<dt>
					<img src="${fn:getLink('images/main/transparent.gif')}"
						class="icon_secu icon_veri" /> <span class="sec_item_text">安全邮箱：</span>
				</dt>
				<dd>
					<div class="opt_wrap">
						<a class="opt_link"
							href="${fn:getLink('security/secBindMailW.jsp')}"
							hideFocus="hidefocus"> 修改</a>
					</div>
					<p>
	                      <p class="opt_tip"></p>
						您的安全邮箱为：${fn:getEmailReplaced(userSecPass.security_email)}
				</p>
				<p class="opt_tip">请确保此邮箱是您的常用邮箱，避免因邮箱服务异常而收不到找回密码邮件。</p>
			</dd>
		</dl>
	</c:if>
	<c:if test="${empty userSecPass.security_email || userSecPass.security_email_status != 2}">
		<dl class="warn clearfix">
			<dt>
				<img src="${fn:getLink('images/main/transparent.gif')}"
					class="icon_secu icon_warn" /> <span class="sec_item_text">安全邮箱：</span>
			</dt>
			<dd>
				<div class="opt_wrap">
					<a class="opt_btn opt_btn_blue"
						href="${fn:getLink('security/secBindMailW.jsp')}"
						hideFocus="hidefocus"> 
						<span>立即设置</span>
					</a>
				</div>
				<p>您尚未绑定安全邮箱</p>
				<p class="opt_tip">请确保此邮箱是您的常用邮箱，避免因邮箱服务异常而收不到找回密码邮件。</p>
			</dd>
		</dl>
	</c:if>

		<dl class="clearfix">
            <dt>
               	<img src="${fn:getLink('images/main/transparent.gif')}" class="icon_secu icon_veri"/>
              	<span class="sec_item_text">提醒设置：</span>
			</dt>
            <dd>
                <div class="opt_wrap">
                	<a class="opt_link" href="${fn:getLink('account/remindSet.jsp')}" hideFocus="hidefocus">
                		修改</a>
                </div>
                <p>您可以点击修改进行相关提醒的设置</p>
                <p class="opt_tip">使用消息、邮件、短信等方式可以接收重要提醒。</p>
            </dd>
        </dl>
    <c:if test="${!empty userSecPass.question}">
    	<dl class="clearfix">
               <dt>
               	<img src="${fn:getLink('images/main/transparent.gif')}" class="icon_secu icon_veri"/>
               	<span class="sec_item_text">密保问题：</span>
               </dt>
               <dd>
                   <div class="opt_wrap">
                   	<a class="opt_link" href="${fn:getLink('security/secAsk.jsp')}" hideFocus="hidefocus">
                   		修改</a>
                   </div>
                   <p>您已经设置了密保问题： ${userSecPass.question}</p>
	                   <p class="opt_tip">设置密保问题和答案可以在您忘记密码时方便找回。</p>
	               </dd>
	         </dl>
	    </c:if>
	    <c:if test="${empty userSecPass.question}">
	    	<dl class="warn clearfix">
	               <dt>
	               	<img src="${fn:getLink('images/main/transparent.gif')}" class="icon_secu icon_warn"/>
	               	<span class="sec_item_text">密保问题：</span>
	               </dt>
	               <dd>
	                   <div class="opt_wrap">
	                   	  <a class="opt_btn opt_btn_blue" href="${fn:getLink('security/secAsk.jsp')}" hideFocus="hidefocus">
	                   		<span>立即设置</span>
	                   	  </a>
	                   </div>
	                   <p>您尚未设置密保问题</p>
	                   <p class="opt_tip">设置密保问题和答案可以在您忘记密码时方便找回。</p>
	               </dd>
	        </dl>
	    </c:if>
	   </div>   
	</div> 
</div> 
<script type="text/javascript">
$(document).ready(function() {
	var total = $("body").find("div[class='warn_wrap']").find("dl[class='warn clearfix']").length;
	$("body").find("span[name='total']")[0].firstChild.nodeValue = total;
});
</script>