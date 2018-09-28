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
<website:style href="css/uc/security/sec.css"/>
<script type="text/javascript">
$("#pwdques").addClass('menuon');
</script>
<div class="panel sec-show-panel">
	<p class="act-tip">当您无法登录账户时，您可以根据填写的密保问题和密保答案找回密码。如果您提供的信息有误，将会在您找回密码时造成障碍，请牢记您的密保问题和答案。</p>
	<div class="m_form">				
		<form id="secAsk_form" method="post" action="javascript:;">
			<input type="hidden" name="submit_url"
				value="${fn:getLink('uc/security/securityAction.do?method=saveSecAsk')}"> 
			<input type="hidden"name="askOK_url" 
				value="${fn:getLink('uc/security/secAskOk.jsp')}">
			<div class="form-title" style="display: none;">
				<span>..</span>
			</div>
			<div class="form-body form-signup-body">
				<c:if test="${!empty oldQue}">
					<dl>
						<dt>
							<em></em>&nbsp;旧密保问题：
						</dt>
						<dd style="width: 228px; word-break: keep-all; white-space: nowrap; overflow: hidden;">
							<label id="oldQue">
								${oldQue}
							</label>
						</dd>
					</dl>
					<dl>
						<dt>
							<em>*</em>&nbsp;旧密保答案：
						</dt>
						<dd>
							<input id="oldAnswer" name="oldAnswer" type="text" class="input " autocomplete="off"/>
						</dd>
						<dd class="form-tip"></dd>
					</dl>
				</c:if>
				<dl>
					<dt>
						<em>*</em>&nbsp;新密保问题：
					</dt>
					<dd>
						<select id="secAsk_select" name="secAsk_select" class="fm_slect"
							style="height: 28px;width: 220px">
							<option value="">请选择</option>
							<option value="我手机号码的后6位？">我手机号码的后6位？</option>
							<option value="我母亲的生日？">我母亲的生日？</option>
							<option value="我父亲的生日？">我父亲的生日？</option>
							<option value="我最好朋友的生日？">我最好朋友的生日？</option>
							<option value="我儿时居住地的地址？">我儿时居住地的地址？</option>
							<option value="我小学校名全称？">我小学校名全称？</option>
							<option value="我中学校名全称？">我中学校名全称？</option>
							<option value="离我家最近的医院全称？">离我家最近的医院全称？</option>
							<option value="离我家最近的公园全称？">离我家最近的公园全称？</option>
							<option value="我的座右铭是？">我的座右铭是？</option>
							<option value="我最喜爱的电影？">我最喜爱的电影？</option>
							<option value="我最喜爱的歌曲？">我最喜爱的歌曲？</option>
							<option value="我最喜爱的食物？">我最喜爱的食物？</option>
							<option value="我最大的爱好？">我最大的爱好？</option>
							<option value="我最喜欢的小说？">我最喜欢的小说？</option>
							<option value="我最喜欢的运动队？">我最喜欢的运动队？</option>
							<option value="others">其它</option>
						</select><span></span>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl style="display:none" id="selfquestion">
					<dt>
						<em>*</em>&nbsp;自定义密保问题：
					</dt>
					<dd>
						<input id="selfQue" name="selfQue" type="text" class="input " />
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt>
						<em>*</em>&nbsp;新密保答案：
					</dt>
					<dd>
						<input id="newAnswer" name="newAnswer" type="text" class="input " autocomplete="off"/>
					</dd>
					<dd class="form-tip"></dd>
				</dl>

				<dl>
					<dt>
						<em>*</em>&nbsp;登录密码：
					</dt>
					<dd>
						<input id="askpassword" name="password" type="password"
							class="input " autocomplete="off"/>
					</dd>
					<dd class="form-tip"></dd>
					<dd class="check_rule">请输入您平台账号的登录密码。</dd>
				</dl>
				<dl>
					<dt></dt>
					<dd style="margin-left:2px;">
						<a class="user_act_btn do" style="margin-right:32px;" href="javascript:;" id="submit_btn" hideFocus="hidefocus"><span>提&nbsp;交</span></a>
						<a class="user_act_btn back" href="javascript:void(0);" id="cancle_btn" hideFocus="hidefocus"><span>重新输入</span></a>
					</dd>
				</dl>
			</div>
		</form>
	</div> 
 </div>
<website:script src="js/uc/jquery.form.js"/>
<website:script src="js/uc/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/uc/jquery.validate.js"/>
<website:script src="js/uc/md5.js"/>
<website:script src="js/uc/security/secAsk.js"/>
<website:script src="js/uc/jquery.validate.ext.js"/>
<website:script src="js/uc/jquery.blockUI.js"/>
<%-- <website:script src="js/uc/dialog.js"/> --%>
<website:script src="libs/assets/dialog/dialog.js" />