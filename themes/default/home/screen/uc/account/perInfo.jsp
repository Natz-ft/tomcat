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
<website:style href="css/account/per.css"/>
<website:style href="css/blockui_css.css"/>

<style>
#_my97DP iframe{
	width:205px !important;
}

</style>

<div class="panel account-show-panel">
	<div class="content-title clearfix">
		<span class="title-icon"></span><span>身份资料</span>
	</div>
	<div class="m_warn m_warn_tip">
		<p>温馨提示：</p>
		<p>请您放心填写真实姓名、证件号码、地址等，我们一定会妥善保管您的登录信息，确保账号安全。</p>
	</div>
	<div class="form-contain" style="margin-top: 0px; padding-top: 0px;">
		<form class="form-body form-baseInfo" action="#" id="modify-form">
			<input type="hidden" name="is_downgrade" id="is_downgrade" value="0">
			<div class="form-info">
				<dl>
					<dt>
						<em>*</em>&nbsp;真实姓名：
					</dt>
					<c:if test="${userLevel == 0}">
						<dd>
							<input id='uname' name='uname' type='text' class='input field'
								value='${ perInfo.uname }' />
						</dd>
						<dd class='form-tip-ok'></dd>
					</c:if>
					<c:if test="${userLevel == 1 || userLevel == 3 || userLevel == 4}">
						<dd class='show-uname' style='width: 170px;'>
							<label class='detail-lable' style="line-height:40px;">${ perInfo.uname }</label>
						</dd>
						<dd class='show-uname' style='width: 105px;'>
							<span style='margin: 0px; padding: 0px;'> (已验证) <a
								class='m_warn' style='margin: 5px 0 5px 0;' id='btn-modifyUname'
								href='javascript:void(0);' hideFocus='hidefocus'><span>修改</span></a>
							</span>
						</dd>
						<dd class='change-uname' style='display: none;'>
							<input id='uname' name='uname' type='text' class='input field'
								value='${ perInfo.uname }' />
						</dd>
						<dd class='form-tip-ok change-uname' style='display: none;'></dd>
					</c:if>
					<c:if test="${userLevel == 2}">
						<dd>
							<label class='detail-lable' style="line-height:40px;">${ perInfo.uname }</label>
						</dd>
						<dd style='width: 160px;'>
							<span class='m_warn'>已认证 </span>
						</dd>
						<input style='display: none;' id='uname' name='uname' type='text'
							class='input field' value='${ perInfo.uname }' />
					</c:if>
					<dd class='form-tip-error'></dd>
				</dl>
				<dl style="margin-top: -4px;">
					<dt>性别：</dt>
					<dd>
						<input id="sex-male" name="sex" type="radio" class="field"
							value="0" style="margin-left: 10px;" /> <label
							style="margin-right: 20px;" for="sex-male">男</label> <input
							id="sex-female" name="sex" type="radio" class="field" value="1" />
						<label for="sex-female">女</label>
					</dd>
				</dl>
				<dl>
					<dt>出生年月日：</dt>
					<dd class="birthday">
						<input id="birthday" name="birthday" type="text" class="input field"
							value="${perInfo.birthday}"  onFocus="WdatePicker({isShowClear:false,readOnly:true,minDate:'1903-01-01',maxDate:'${nowDate}'})"/>
					</dd>
				</dl>
				<c:if test="${userLevel == 0}">
					<dl>
						<dt>证件类型：</dt>
						<dd>
							<select name='cert_type' id='cert_type' class='select field'></select>
						</dd>
					</dl>
					<dl>
						<dt>证件号码：</dt>
						<dd>
							<input id='cert_num' name='cert_num' type='text'
								class='input field' value='${ perInfo.cert_num }' />
						</dd>
						<dd class='form-tip-ok'></dd>
						<dd class='form-tip-error' id='cert_num_tip'></dd>
					</dl>
				</c:if>
				<c:if test="${userLevel == 1 || userLevel == 3 || userLevel == 4}">
					<dl class='show-cert-type'>
						<dt>证件类型：</dt>
						<dd>
							<label> <c:if test="${ perInfo.cert_type == 2}">护照</c:if>
								<c:if test="${ perInfo.cert_type == 1}">身份证</c:if> <c:if
									test="${ perInfo.cert_type != 1 && perInfo.cert_type != 2}">未设置</c:if>
							</label>
						</dd>
					</dl>
					<dl class='change-cert-type' style='display: none;'>
						<dt>证件类型：</dt>
						<dd>
							<select name='cert_type' id='cert_type' class='select field'>
							</select>
						</dd>
					</dl>
					<dl>
						<dt>证件号码：</dt>
						<dd class='show-cert-num' style='width: 170px;'>
							<label class='detail-lable' style="line-height:40px;">${ perInfo.cert_num}</label>
						</dd>
						<dd class='show-cert-num' style='width: 105px;'>
							<span style='margin: 0px; padding: 0px;'> (已验证) <a
								class='m_warn' style='margin: 5px 0 5px 0;'
								id='btn-modifyCertNum' href='javascript:void(0);'
								hideFocus='hidefocus'><span>修改</span></a>
							</span>
						</dd>
						<dd class='change-cert-num' style='display: none;'>
							<input id='cert_num' name='cert_num' type='text'
								class='input field' value='${ perInfo.cert_num}' />
						</dd>
						<dd class='form-tip-ok change-cert-num' style='display: none;'></dd>
						<dd class='form-tip-error change-cert-num' style='display: none;'
							id='cert_num_tip'></dd>
					</dl>
				</c:if>

				<c:if test="${userLevel == 2}">
					<dl>
						<dt>证件类型：</dt>
						<dd>
							<label> <c:if test="${ perInfo.cert_type == 2}">护照</c:if>
								<c:if test="${ perInfo.cert_type == 1}">身份证</c:if> <c:if
									test="${ perInfo.cert_type != 1 && perInfo.cert_type != 2}">未设置</c:if>
							</label>
						</dd>
					</dl>
					<dl>
						<dt>证件号码：</dt>
						<dd>
							<label class='detail-lable' style="line-height:40px;">${ perInfo.cert_num}</label>
						</dd>
						<dd style='width: 160px;'>
							<span class='m_warn'>已认证 </span>
						</dd>
						</dd>
						<select style='display: none;' name='cert_type' id='cert_type'
							class='select field'>
						</select>
						<input style='display: none;' id='cert_num' name='cert_num'
							type='text' class='input field' value='${ perInfo.cert_num}' />
					</dl>
				</c:if>
				<dl>
					<dt>邮寄地址：</dt>
					<dd>
						<input id="address" name="address" type="text" class="input field"
							value="${perInfo.address }" />
					</dd>
					<dd class='form-tip-ok'></dd>
					<dd class='form-tip-error'></dd>
				</dl>
				<dl>
					<dt>邮编：</dt>
					<dd>
						<input id="zip_code" name="zip_code" type="text"
							class="input field" value="${perInfo.zip_code }" />
					</dd>
					<dd class="form-tip-ok"></dd>
					<dd class='form-tip-error'></dd>
				</dl>
				<dl>
					<dt>QQ：</dt>
					<dd>
						<input id="qq" name="qq" type="text" class="input field"
							value="${perInfo.qq }" />
					</dd>
					<dd class='form-tip-ok'></dd>
					<dd class='form-tip-error'></dd>
				</dl>
			</div>
			<!-- 个人基本资料结束 -->
			<div class="btn-contain">
				<dl>
					<dt></dt>
					<dd style="text-align: left;line-height: 30px;padding-left:7px;">
						<a class="user_act_btn do" style="margin-right:32px;"
							href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提交</span></a>
						<a class="user_act_btn back"
							href="javascript:void(0);"
							id="cancel_btn" hideFocus="hidefocus"><span>取消</span></a>
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
<website:script src="js/data/WdatePicker.js"/>
<script type="text/javascript">
$(document).ready(function(){
	jQuery.validator.setDefaults({
		errorElement: "span",
		errorClass: "invalid",
		success: function(element,a) {
			element.addClass("valid");
			var dd = $(a).parents("dd:first").next(".form-tip-ok:first").empty().append(element);
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) ) {
				this.element(element);
			}
		},
		errorPlacement: function(error,element) {
			var errorCt = element.parents("dd:first").nextAll(".form-tip-error:first");
			if(errorCt.length==0){
				error.insertAfter(element);
			} else {
				error.appendTo(errorCt);
			}
		}
	});
	$.validator.prototype.errorsFor = function(element) {
		var name = this.idOrName(element);
		return this.errors().filter(function() {
			if($(this).attr('for') === name){
				$(this).remove();
			}
			return false;
		});
	};

		 
//init cert option
 	(function (){
		  		var i;
		  		var html='<option value=0 selected="selected">请选择 </option>';
		  		var natlty=cert_typeList.cert_type;
		  		for(i in natlty){
		  			html+='<option value='+natlty[i].id+'>'+natlty[i].name+'</option>';
		  			}
		  		$("#cert_type").html(html);
		  })();
	//init sex
	if(${!empty perInfo}){
	
		if(${!empty perInfo.sex}){
			var index = '${perInfo.sex}';
		}else{
			var index = -1;
		}
		if(index!=-1){
			document.getElementsByName('sex')[index].checked=true;}
		}
		
		
//init cert
	if(${!empty perInfo.cert_type}){
		(function(){
			  	var i;
			  	var natlty=cert_typeList.cert_type;
			  	for(i in natlty){
			  		if(natlty[i].id=="${perInfo.cert_type}"){
			  			var tempI = ++i;
			  			$("#cert_type")[0].selectedIndex = tempI;
			  			//ie6
			  			$("#cert_type")[0].options[tempI].setAttribute('selected', true);
			  			break;
			  			}
			  		}
			  	})();
		}
	
	//validation rule
	jQuery.validator.addMethod("cert_num_rule", function(value, element) {
	    if($("#cert_type")[0].selectedIndex==1) {
	     	return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
        }else if($("#cert_type")[0].selectedIndex==2){
		 return this.optional(element) || /^(P\d{7})|(G\d{8})$/.test(value);
        }else{ 
	       if($("#cert_num").val()) {
	    	  // return false;
		       }else{
		      return true;   
	       }
		 }
    },
		function(){
		    if($("#cert_type").val()==0){
		        return "请先选择证件类型";
		    }else if($("#cert_type").val()==1){
				return "请正确填写身份证号码";
		 	}
		    else if($("#cert_type").val()==2){
				return "请正确填写护照号码";
		 	}
		 });
	//init validation
	$(function(){
		$("#modify-form").validate({
			rules:{
				uname:{
					required:true,
					maxlength:15
				},
				phone:{
					phone_rule:function(){ return $("#phone").val()==null?false:true;}
				},
				zip_code:{
					zip_code_rule:function(){ return $("#zip_code").val()==null?false:true;}
				},
				cert_num:{
					cert_num_rule: true
				},
				qq:{
					qq_rule: true
				}
			},
				
			messages:{
				uname:{
					required:"请填写您的姓名",
					maxlength:"所填姓名超出最大长度限制"
				},
				phone:{
					phone_rule:"请正确输入手机号"
				},
				zip_code:{
					zip_code_rule:"请正确输入邮政编码"
				},
				qq:{
					qq_rule:"请输入正确的qq号"
				}
			}
		});
	});
//listen "change" event
	var modifyFlag='false';
	$(".field").change(function(){
		$("#cert_num_tip").html('');
		modifyFlag='true';
	});
	var birthday = "${perInfo.birthday}";

//submit
$('#submit_btn').click(function(){
	if($("#birthday").val() != birthday){
		modifyFlag = 'true';
	}
	//监听到内容发生变化时，进行异步提交，否则提示无需更改
	if(modifyFlag=='true'){
		var validate=$("#modify-form").valid();
		var validtOK=(function(){
             if($("#cert_type").val()>0&&!($("#cert_num").val())){
            	 $("#cert_num_tip").html('<span for="cert_num" generated="true" class="invalid" style="">请填写证件号码</span>');
                 return false;
                 }
             else{
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
        url:"${fn:getLink('account/accountAction.do?method=personSubmit')}",
        type:"post",
        success:function(data){
        	data = eval('('+data+')');
	       	 if(data==1) {
	       		 dialog.success("修改成功！",function(){
	       			window.location.href="${fn:getLink('account/perInfo.jsp')}";
	       		 });
	 			}else if(data==0) {
	 				dialog.error("修改失败，请重新操作！");
	 			}else {
	 				dialog.error("系统错误，请重试！",function(){
	 					window.location.href="${fn:getLink('account/perInfo.jsp')}";
	 				});
	 		 	}
            }
		 });
	 }else{
		 dialog.error("没有更改，无需操作！");
		return false;
	}
	 
});

	$("#btn-modifyUname").on("click",function(){
		$("#is_downgrade").val(1);
		$(".show-uname").hide();
		$(".change-uname").attr("status","show");
		$(".change-uname").show();
	});
	$("#btn-modifyCertNum").on("click",function(){
		$("#is_downgrade").val(1);
		$(".show-cert-type").hide();
		$(".show-cert-num").hide();
		$(".change-cert-type").attr("status","show");
		$(".change-cert-type").show();
		$(".change-cert-num").attr("status","show");
		$(".change-cert-num").show();
	});

$("#cancel_btn").click(function(){
	window.location.href="${fn:getLink('account/perInfo.jsp')}";
	});
});
</script>




