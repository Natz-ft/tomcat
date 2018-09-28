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
<website:style href="css/index/signup.css"/>
<website:style href="css/blockui_css.css"/>
<style>
	.form-signup-body{padding-left:100px;}
	.form-submit{margin-bottom:20px;}
</style>
<div class="panel account-show-panel">
	<!--头部说明 开始-->
	<div class="content-title clearfix">
		<span class="title-icon"></span><span>新建子账号</span>
	</div>
	
	<!--头部说明 结束-->
	<!-- 新建子账号 对话框   开始-->
	<div id="add_sub_account">
			<div class="form_per_contain" id="form_per_contain" style="margin-top: 10px;">
				<form action="${fn:getLink('account/accountAction.do?method=addSubAccount')}"
					method="post" id="register_form_per">
					<div class="form-body form-signup-body" style="width:740px;">
						<dl>
							<dt>
								<em>*</em>&nbsp;所属机构：
							</dt>
							<dd>
								<input id="dept_uid" name="dept_uid" type="text"
									value= ""
									class="input" />
								<input id="dept_uid_hidden" name="dept_uid_hidden"  type="hidden"
								value= ""
								class="input" />	
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">选择子账号所属机构，可选择当前机构或者其下级机构。</dd>
						</dl>
						<DIV id="layer_dept_list" action-event="none" style="display:none;" class="layer_dept_list">
							<a class="layer_close" title="关闭" hidefocus  href="javascript:;">
								<em style="display:inline-block;font-size:20px;margin:-16px 0px 0px 0px;">×</em>
							</a>
						<DIV class="layer_title"  id="layer_title">
							<!-- 追加   上级和当前级组织-->
						</DIV>
						<UL class="layer_all_list clearfix" id="layer_all_list" node-type="dept_list">
							<!-- 追加   下级组织-->
						</UL>
					</DIV>
						<dl>
							<dt>
								<em>*</em>&nbsp;登录邮箱：
							</dt>
							<dd>
								<input id="email_per" name="login_email" type="text"
									class="input" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">请正确填写您的邮箱地址，该邮箱用于账号激活及登录。</dd>
						</dl>
						<dl>
							<dt>
								<em>*</em>&nbsp;个人登录用户名：
							</dt>
							<dd>
								<input id="login_name_per" name="login_name" type="text"
									class="input" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">以字母开头，允许使用字母数字下划线，5-20位组成</dd>
						</dl>
						<dl>
							<dt>
								<em>*</em>&nbsp;昵称：
							</dt>
							<dd>
								<input id="nickname_per" name="nickname" type="text"
									class="input" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">不能超过20个字符串，汉字算一个字符</dd>
						</dl>
	
						<dl style="width:640px;">
							<dt>
								<em>*</em>&nbsp;登录密码：
							</dt>
							<dd>
								<input id="password_per" name="password" type="password"
									class="input " />
							</dd>
							<dd class="form-tip" style="width:180px;line-height:20px;"></dd>
							<dd class="check_rule">密码由6-15位字母、数字或特殊符号组成</dd>
						</dl>
	
						<dl>
							<dt>
								<em>*</em>&nbsp;确认密码：
							</dt>
							<dd>
								<input id="confirm_password_per" name="confirm_password"
									type="password" class="input" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">请再次输入您设置的密码</dd>
						</dl>
						<dl>
							<dt></dt>
							<dd style="margin-left:2px;">
								<a id="btn-submit_per" class="user_act_btn do" style="margin-right:32px;" href="javascript:void(0);" hideFocus="hidefocus"><span>保存子账号</span></a>
								<a class="user_act_btn back"  href="javascript:void(0);" id="cancel_btn" hideFocus="hidefocus"><span>重新输入</span></a>
							</dd>
						</dl>
							<input id="passwordStrength_per" name="passwordStrength"
								type="text" class="input" style="display: none" />
					</div>
				</form>
			</div>
	</div>
	</div>
	<!-- 机构列表 弹出框  end-->
	<!-- 新建子账号 对话框   结束-->
<website:script src="js/jquery.form.js"/>
<website:script src="js/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/jquery.validate.js"/>
<website:script src="js/jquery.validate.ext.js"/>
<website:script src="js/passwordStrength.js"/>
<website:script src="js/md5.js"/>
<website:script src="js/jquery-dom-ext.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<script type="text/javascript">
	var checkLoginNameUrl = "${fn:getLink('index/index.do?method=checkLoginName')}";
	var checkEmailUrl = "${fn:getLink('index/index.do?method=checkEmail')}";
	var subAccountUrl = "${fn:getLink('account/subAccount.jsp')}";
	var dept_list = eval('('+'${deptList}'+')');
	var sessionUid = "${uid}";
	
</script>
<script language="javascript" src="${fn:getLink('js/account/subaccountAdd.js')}"></script>

