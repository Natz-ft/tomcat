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
<website:style href="css/account/comauth.css"/>
<website:style href="css/blockui_css.css"/>
<div class="panel account-show-panel">
	
	<div class="content-title">
		<span class="title-icon"></span><span>实名认证</span>
	</div>
	
	<div class="m_warn m_warn_tip">
		<p>温馨提示：</p>
		<p>您可以放心进行实名认证，我们一定会妥善保管您的真实身份信息，确保隐私安全。</p>
	</div>
	
	<div class="form-contain" style="margin-top:0px;padding-top:0px;">
	<form class="form-body form-authenInfo" action="#" id="modify-form">
		<div class="form-info">
			<dl>
				<dt><em>*</em>&nbsp;真实姓名：</dt>
				<dd>
					<input id="uname" name="uname" type="text" class="input field" value="${perInfo.uname}" />
				</dd>
				<dd class="form-tip"></dd>
			</dl>
			<dl>
				<dt><em>*</em>&nbsp;身份证号：</dt>
				<dd>
					<input id="cert_num" name="cert_num" type="text" class="input field" value="${perInfo.certNum}" />
					<input id="cert_type" name="cert_type" type="hidden" class="input field" value="1" />
				</dd>
				<dd class="form-tip" id="cert_num_tip"></dd>
			</dl>
			<c:if test="${empty loginPhone}">
				<dl>
					<dt>
						<em>*</em>&nbsp;登录手机号：
					</dt>
					<dd>
						<input id="phoneNum_input" name="phoneNum" type="text"
							class="input field" value="" />
					</dd>
					<dd class="form-tip" id="phone_num_tip"></dd>
				</dl>
				<dl>
					<dt>
						<em>*</em>&nbsp;验证码：
					</dt>
					<dd class="dd-input" style="width: 240px;">
						<a class="user_act_btn do" style="line-height:30px;"
							href="javascript:void(0);" id="verify_btn"><span>免费获取短信验证码</span></a>
						<input id="vcode" name="vcode" type="text" class="input "
							style="width: 68px;" />
					</dd>
					<dd class="form-tip"></dd>
					<dd id="verifyOK" class="check_rule">请输入短信验证码</dd>
				</dl>
			</c:if>
			<c:if test="${!empty loginPhone}">
				<dl>
					<dt>
						<em>*</em>&nbsp;登录手机号：
					</dt>
					<dd>
						<label>${fn:phoneReplaced(loginPhone)}</label>
					</dd>
					<dd style='width: 160px;'>
						<span style='margin: 0px; padding: 0px;'> (已验证) </span>
					</dd>
				</dl>
			</c:if>
		 </div>
		 <div class="btn-contain">
			<dl>
			<dt></dt>
			<dd style="text-align: left; line-height:30px;padding-left:10px;">
				<a class="user_act_btn do" style="position: relative; left: 0px" href="javascript:;" id="submit_btn" hideFocus="hidefocus"><span>提交</span></a>
				<a class="user_act_btn back" style="position: relative; left: 20px" href="javascript:;" id="cancel_btn" hideFocus="hidefocus"><span>取消</span></a>
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
$(document).ready(function(){
	// validate rule
	jQuery.validator.addMethod("cert_num_rule", function(value, element) {
	     return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
    },
		function(){
			return "请正确填写身份证号码";
		 }
    );
	$(function(){
		$("#modify-form").validate({
			rules:{
				uname:{
					required:true
				},
				cert_num:{
					cert_num_rule: true,
					required:true
						},
				phoneNum:{
					phone_rule:true,
					required:true,
					remote:"${fn:getLink('index/index.do?method=checkPhoneNum')}"
					},
				vcode : {
					required : true,
					maxlength:4 ,
					number:true
				}		
				},
				
			messages:{
				uname:{
					required:"请填写您的姓名"
				},
				cert_num:{
					required:"身份证件号码不能为空"
						},
				phoneNum:{
					phone_rule:"请正确输入手机号码",
					required:"请填写手机号码"
					},
				vcode : {
					required : "请输入手机验证码",
					maxlength: "验证码输入错误" ,
					number: "验证码输入错误" 
				}
				}
			});
	});

	var authenLevel=${authenLevel};
	var modifyFlag = false;
	$(".field").change(function(){
		modifyFlag = true;
		$("#cert_num_tip").html('');
	});
	
	$('#submit_btn').on("click",function(){
		if((modifyFlag)||(authenLevel==0)){
			var validate=$("#modify-form").valid();
			var validtOK=(function(){
	             if($("#cert_type").val()>0&&!($("#cert_num").val())){
	            	 $("#cert_num_tip").html('<span for="cert_num" generated="true" class="invalid" style="">请填写证件号码</span>');
	                     return false;
	                 }else{
	                	 return true;
		                 }
				})();
			if(!validtOK){
				return false;
				}
			if(!validate){
				return false;
				}else{
				 $("#cert_num_tip").html('');
					}
			 $("#modify-form").ajaxSubmit({
		        url:"${fn:getLink('account/accountAction.do?method=authenRealName')}",
		        type:"post",
		        success:function(data){
		        	data = eval('('+data+')');
			        // 1-成功；0-失败  -1、验证码与当前用户不匹配；-2、验证码已失效
			       	 if(data==1) {
			       		dialog.success("认证通过！",function(){
			       			window.location.href= "${fn:getLink('account/perAuthen.jsp')}";
			       		});
			 		 }else if(data==0) {
			 			dialog.error("认证未通过，请确保所填信息的正确性！");
			 		 }else if(data==-1){
			 			dialog.error("验证码与当前用户不匹配！");
				 	 }else if(data==-2){
				 		dialog.error("验证码已失效！");
					 }else{
						 dialog.error("未登录或系统错误，请刷新并重试！");
		 			}
		        }
			 });
		}else{
			dialog.error("没有更改，无需提交！");
			 return false;
		}
	});
	$("#cancel_btn").on("click",function(){
		window.location.href="${fn:getLink('account/perAuthen.jsp')}";
	});

	$("#verify_btn").on("click",phoneClick);
	function phoneClick(){
		var validate=$("#phoneNum_input").valid();
		if(!validate){
			return false;
		}
		var data = {mobile : $("#phoneNum_input").val()};
		$.ajax({
			type : "POST",
			url : "${fn:getLink('account/accountAction.do?method=verifyPhone')}",
			data : data,
			success : function(data) {
				data = eval('('+data+')');
				if(data == '0'){
					dialog.error("尚未登录，请先登录!");
				}else if(data == '1'){
					dialog.success("已发送手机验证码，请查收并输入!");
				}else if(data == '-1'){
					dialog.error("服务器异常，获取验证码失败。请稍后重试！");
				}else{
					dialog.success(data);
					$("#verify_btn").addClass('back');
					phoneSettime();
					$("#verify_btn").unbind("click",phoneClick);
				}
			}
		 });
		}
	var phoneTimedown=30;
	function phoneSettime(){
		if (phoneTimedown == 0) {
		$("#verify_btn").removeClass("back");
		$("#verify_btn").attr("disabled", false);
		$("#verify_btn").find("span")[0].firstChild.nodeValue="获取短信验证码";
		$("#verify_btn").bind("click",phoneClick);
		$("#verifyOK").css("color","gray");
		$("#verifyOK")[0].firstChild.nodeValue = "请输入短信验证码";
		phoneTimedown = 30; 
		} else {  
			$("#verify_btn").find("span")[0].firstChild.nodeValue=phoneTimedown+"s后重新发送";
			phoneTimedown--; 
			setTimeout(function() { 
				phoneSettime();
				},1000); 
		} 
	}
});
</script>



