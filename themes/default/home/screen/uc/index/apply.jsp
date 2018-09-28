<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:style href="css/blockui_css.css"/>
<style type="text/css">
.form-body  dd.form-tip{
	width:140px;
}
.form-body  dd.form-tip span{
	line-height: 15px;
}
</style>
<!-- action需要使用全局变量然后加控制器 -->
<link href="${fn:getLink('css/index/signup.css')}" rel="stylesheet" type="text/css" />
<div style="width:100%;" class="clearfix">
	<div class="form-contain">
		<div style="width:650px; margin:0 auto;">
			<div class="form-type">
				<input type="button" class="btn-per btn-per-hover" id="btn-per" style="margin-left: 40px;" value="个人账号"> 
				<input type="button" class="btn-org" id="btn-org" value="单位账号">
			</div>
			<div class="form_per_contain" id="form_per_contain">
				<form id="applyfor_form_per" action="${fn:getLink('index/apply.do?method=apply') }" method="post">
					<div class="m_warn">请确保邮箱地址等关键信息的正确性！</div>
					<div class="form-body form-signup-body">
						<input id="user_type_per" name="user_type" value="11" type="hidden"/>
						<dl>
							<dt><em>*</em>&nbsp;您的姓名：</dt>
							<dd>
								<input id="nickname_per" class="input" name="nickname" type="text" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">不能超过20个字符串，汉字算一个字符。用以在全站显示的登录名称。</dd>
						</dl>
						<dl>
							<dt><em>*</em>&nbsp;您的邮箱：</dt>
							<dd>
								<input id="email_per" class="input" name="login_email" type="text" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule" >该邮箱用于接收申请的账号以及邮件通知等。</dd>
						</dl>
						<dl>
							<dt>您的手机号：</dt>
							<dd>
								<input id="login_name_per" class="input" name="phoneNum" type="text" />
							</dd>
							<dd class="form-tip" ></dd>
							<dd class="check_rule">该手机号将默认绑定账号，并用以接收通知短信。</dd>
						</dl>
						<dl>
							<dt>
								<em>*</em>&nbsp;验证码：
							</dt>
							<dd>
								<input id="checknum_per" class="input" name="checknum" type="text" style="width: 100px; padding: 0px 0px 0px 2px;" />
								&nbsp;
								<a href="javascript:changeVerify_per();" hideFocus="hidefocus">
									<img id="verifyImg_per" class="verify-img" src="${fn:getLink('index/verify.jsp')}" alt="换一张"/>
								</a>
								&nbsp;
								<a href="javascript:changeVerify_per();" style="font-size: 12px;" hideFocus="hidefocus">看不清楚？换一张</a>
								<input id="verifycode_hid_p" type="hidden" value="" />
							</dd>
							<dd class="form-tip"></dd>
						</dl>
						<dl>
							<dt></dt>
							<dd style="margin-left: -20px;">
								<input id="login_allow_per" class="checkbox" name="login_allow" type="checkbox" />
								&nbsp;&nbsp;我已阅读并同意
								<a class="m-link" href="${fn:getConfValue('global.index.odweb')}/register.html" target='_blank'  hideFocus="hidefocus">《浪潮IOP网络服务使用协议》</a>
								<label for="login_allow" class="error" generated="true"></label>
							</dd>
							<dd class="form-tip" style="width:120px;"></dd>
						</dl>
					</div>
					<div class="form-submit">
						<dl>
							<dd style="text-align: center;">
								<input type="button" class="btn-applyfor" id="btn-submit_per">
							</dd>
						</dl>
					</div>
				</form>
			</div>
			<div id="form_org_contain" class="form_org_contain" style="display: none;">
				<form id="applyfor_form_org" action="${fn:getLink('index/apply.do?method=apply')}" method="post"">
					<div class="m_warn">请确保邮箱地址等关键信息的正确性！</div>
					<div class="form-body form-signup-body">
						<input id="user_type_org" name="user_type" value="21" type="hidden"/>
						<dl>
							<dt><em>*</em>&nbsp;单位名称：</dt>
							<dd>
								<input id="nickname_org" class="input" name="nickname" type="text" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">不能超过20个字符串，汉字算一个字符。用以在全站显示的登录名称。</dd>
						</dl>
						<dl>
							<dt><em>*</em>&nbsp;单位邮箱：</dt>
							<dd>
								<input id="email_org" name="login_email" type="text" class="input" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">该邮箱用于接收申请的账号以及邮件通知等。</dd>
						</dl>
						<dl>
							<dt>单位电话：</dt>
							<dd>
								<input id="tel_phone_org" class="input" name="tel_phone" type="text" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">用以接收账号申请通知。</dd>
						</dl>
						<dl>
							<dt>联系人姓名：</dt>
							<dd>
								<input id="contacts_name_org" class="input" name="contacts_name" type="text" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule" style="height:15px;"></dd>
						</dl>
						<dl>
							<dt>
								<em>*</em>&nbsp;验证码：
							</dt>
							<dd>
								<input id="checknum_org" class="input" name="checknum" type="text" style="width: 100px; padding: 0px 0px 0px 2px;" />
								&nbsp;
								<a href="javascript:changeVerify_org();" hideFocus="hidefocus">
									<img id="verifyImg_org" class="verify-img" src="${fn:getLink('index/verify.jsp') }" alt="换一张" />
								</a>
								&nbsp;
								<a href="javascript:changeVerify_org();" style="font-size: 12px;" hideFocus="hidefocus">看不清楚？换一张</a>
								<input id="verifycode_hid_o" type="hidden" value="" />
							</dd>
							<dd class="form-tip"></dd>
						</dl>
						<dl>
							<dt></dt>
							<dd style="margin-left: -20px;">
								<input id="login_allow_org" name="login_allow" type="checkbox" class="checkbox" />
								&nbsp;&nbsp;我已阅读并同意
								<a class="m-link" href="${fn:getConfValue('global.index.odweb')}/register.html" target='_blank' hideFocus="hidefocus">《浪潮IOP网络服务使用协议》</a>
								<label for="login_allow" class="error" generated="true"></label>
							</dd>
							<dd class="form-tip" style="width:120px;"></dd>
						</dl>
					</div>
					<div class="form-submit">
						<dl>
							<dd style="text-align: center;">
								<input type="button" class="btn-applyfor" id="btn-submit_org">
							</dd>
						</dl>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="tip-box-contain" style="border-left:1px solid #D9EEF8">
		<div class="title">
			<h1><strong>说明</strong></h1>
		</div>
		<div class="content">
			<ul>
				<li style="padding-top: 0px;"><span>1. 申请的账号和初始密码将通过邮件的形式发送到填写的邮箱中，请正确填写您的邮箱。</span></li>
				<li><span>2. 若您填写了手机号，申请的账号将默认绑定该手机号，您可以使用手机号、邮箱任意一个进行登录。</span></li>
				<li><span>3. 个人姓名或单位名称是登录后显示的用户名，账号申请成功后可以修改。 </span></li>
                <li><span>4. 以上信息对于保护您的账号安全极为重要，请您慎重填写并牢记。 </span></li>
			</ul>
		</div>
	</div>
</div>
<script type="text/javascript" src="${fn:getLink('js/jquery.form.js')}"></script>
<script type="text/javascript" src="${fn:getLink('js/jquery.validate.js')}"></script>
<script type="text/javascript" src="${fn:getLink('js/jquery.validate.ext.js')}"></script>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>

<script type="text/javascript">
	var checkLoginNameUrl = "${fn:getLink('index/index.do?method=checkLoginName')}";
	var checkEmailUrl = "${fn:getLink('index/index.do?method=checkEmail')}";
	var checkPhoneUrl = "${fn:getLink('index/index.do?method=checkPhoneNum')}";
	var getVerifyCodeUrl = "${fn:getLink('index/index.do?method=getVerifyCode')}";
</script>
<script type="text/javascript" src="${fn:getLink('js/index/apply.js')}"></script>
