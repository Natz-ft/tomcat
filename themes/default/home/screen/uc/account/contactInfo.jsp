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
<website:style href="css/account/contact.css"/>
<website:style href="css/blockui_css.css"/>
<div class="panel account-show-panel">
	<div class="content-title clearfix">
		<span class="title-icon"></span><span>联系人信息</span>
	</div>
	
	<div class="m_warn m_warn_tip">
		<p>温馨提示：</p>
		<p>请您放心填写联系人信息，我们会对您填写的联系人信息做好保密工作。</p>
	</div>
	
	
	<div class="form-contain" style="margin-top: 0px; padding-top: 0px;">
		<form class="form-body form-baseInfo" id="modify-form" action="#">
			<!--组织表基本资料开始-->
			<div class="form-info">
				<dl>
					<dt>联系人：</dt>
					<dd>
						<input id="contact_name" name="contact_name" type="text" class="input field" 
						value="<c:if test="${!empty orgInfo}">${orgInfo.contact_name}</c:if>"/>
					</dd>
					<dd class="form-tip" ></dd>
				</dl>
				<dl>
					<dt>联系人电话：</dt>
					<dd style="height:30px;">
						<input id="contact_phone" name="contact_phone" type="text" class="input field" 
						value="<c:if test="${!empty orgInfo}">${orgInfo.contact_phone}</c:if>"/>
					</dd>
					<dd class="form-tip" style="height:30px;" ></dd>
					<dd class="check_rule" style="height:30px;width:500px;">请输入11位手机号或者电话号码，电话支持“区号-号码”。</dd>
				</dl>
				<dl>
					<dt>联系人邮箱：</dt>
					<dd>
						<input id="contact_email" name="contact_email" type="text" class="input field"
						value="<c:if test="${!empty orgInfo}">${orgInfo.contact_email}</c:if>"/>
					</dd>
					<dd class="form-tip" ></dd>
				</dl>
			</div>
			<!-- 组织表基本资料结束 -->
			<div class="btn-contain">
				<dl>
					<dt></dt>
					<dd style="text-align: left;line-height:30px;padding-left:8px;">
						<a class="user_act_btn do"  style="margin-right:25px;"href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提交</span></a> 
						<a class="user_act_btn back"  href="javascript:void(0);" id="cancel_btn" hideFocus="hidefocus"><span>取消</span></a>
					</dd>
				</dl>
			</div>
		</form>
</div>
</div>
<website:script src="js/jquery.form.js"/>
<website:script src="js/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/jquery.validate.js"/>
<website:script src="js/infoBase.comboBox.js"/>
<website:script src="js/jquery.validate.ext.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<script type="text/javascript">
//校验规则初始化
$(function(){
	$("#modify-form").validate({
		rules:{
			contact_email:{
				email:function(){ return $("#contact_email").val()==null?false:true;},
				maxlength:35
				},
			contact_phone:{
				telephone_rule:function(){ return $("#contact_phone").val()==null?false:true;}
				}
			},
			
		messages:{
			contact_email:{
				email:"请输入正确的邮箱",
				maxlength:"邮箱长度超出限制"
				},
			contact_phone:{
				telephone_rule:"请正确输入电话"
				}
			}
		});
});
$(document).ready(function(){
//监听修改事件，当内容发生变化时，触发
	var modifyFlag='false';
	$(".field").change(function(){
		modifyFlag='true';
		});
	
//提交表单
 $('#submit_btn').click(function(){
		//监听到内容发生变化时，进行异步提交，否则提示无需更改
		if(modifyFlag=='true'){
			var validate=$("#modify-form").valid();
			if(!validate){
				return false;
			}
	 $("#modify-form").ajaxSubmit({
         url:"${fn:getLink('account/accountAction.do?method=orgSubmit')}",
         type:"post",
         success:function(data){
        	 data=eval('('+data+')');
        	 if(data==1) {
        		 dialog.success("修改成功！",function(){
   					window.location.href="${fn:getLink('account/contactInfo.jsp')}";
   				});
  			}else if(data==0) {
  				dialog.error("修改失败，请重新操作！");
  			}else {
  				dialog.error("发生错误，请重试！");
  			}
          }
	 	});
	 }else{
	 	dialog.error("没有更改，无需操作！");
		return false;
	}
 });
 	$("#cancel_btn").on("click",function(){
		window.location.href="${fn:getLink('account/contactInfo.jsp')}";
	});
 });
 
</script>


