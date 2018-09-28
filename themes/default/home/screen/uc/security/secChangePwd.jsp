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
<website:style href="css/uc/security/sec.css"/>
<website:style href="css/uc/blockui_css.css"/>
<script type="text/javascript">
$("#changePwd").addClass('menuon');
</script>
<div class="panel sec-show-panel">
	<p class="act-tip" style="text-align:center;">如果你正在使用与其他网站相同的密码，建议您修改，降低账号被盗风险。</p>
    
	<div class="m_form">
		<form id="changePwd_form" method="post"
			action="${fn:getLink('uc/security/SecChangePwd.do?method=changePwd')}">
			<div class="form-body form-signup-body">
				<dl>
					<dt>
						<em>*</em>&nbsp;当前密码：
					</dt>
					<dd class="dd-input">
						<input id="oldPassWord" name="oldPassWord" type="password"
							class="input " />
					</dd>
					<dd class="form-tip"></dd>
					<dd class="check_rule">请输入您当前登录密码</dd>
				</dl>
				<dl>
					<dt>
						<em>*</em>&nbsp;新密码：
					</dt>
					<dd class="dd-input">
						<input id="newPassWord" name="newPassWord" type="password"
							class="input" /> <input id="newPassWordStrength"
							name="newPassWordStrength" type="text" class="input"
							style="display: none" />
					</dd>
					<dd class="form-tip" style="width: 190px; line-height: 15px;"></dd>
					<dd class="check_rule">请输入您的新密码，由6-15位字母、数字或特殊符号组成</dd>
				</dl>
				<dl>
					<dt>
						<em>*</em>&nbsp;确认密码：
					</dt>
					<dd class="dd-input">
						<input id="confirm_password" name="confirm_password"
							type="password" class="input" />
					</dd>
					<dd class="form-tip"></dd>
					<dd class="check_rule">请再次输入您设置的密码</dd>
				</dl>
				<dl>
					<dt></dt>
					<dd style="margin-left:2px;">
						<a class="user_act_btn do" style="margin-right: 32px;"
							href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提&nbsp;交</span></a>
						<a class="user_act_btn back" href="javascript:void(0);"
							id="clear_btn" hideFocus="hidefocus"><span>重新输入</span></a>
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
<website:script src="js/uc/passwordStrength.js"/>
<website:script src="js/uc/jquery.validate.ext.js"/>
<website:script src="js/uc/security/changePwd.js"/>
<website:script src="js/uc/jquery.blockUI.js"/>
<%-- <website:script src="js/uc/dialog.js"/> --%>
<website:script src="libs/assets/dialog/dialog.js" />
<script type="text/javascript">
var suburl = "${fn:getLink('uc/security/SecChangePwd.do?method=changePwd')}";
</script>