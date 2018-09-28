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
<website:style href="css/account/org.css"/>
<website:style href="css/blockui_css.css"/>
<div class="panel account-show-panel">
	<div class="content-title clearfix">
		<span class="title-icon"></span><span>身份资料</span>
	</div>
	
	<div class="m_warn m_warn_tip">
		<p>温馨提示：</p>
		<p>请您放心填写单位信息，我们一定会妥善保管您的单位信息，确保信息安全。</p>
	</div>
	
	<div class="form-contain" style="margin-top: 0px; padding-top: 0px;">
		<form class="form-body form-baseInfo" id="modify-form"  
		      action="${fn:getLink('account/accountAction.do?method=orgSubmit')}" method="post">
			<input type="hidden" name="is_downgrade" id="is_downgrade" value="0">
			<!--组织表基本资料开始-->
			<div class="form-info">
				<dl>
					<dt>单位名称：</dt>
					<c:if test="${userLevel == 0 }">
						<dd>
							<input id='org_name' name='org_name' type='text' class='input field' value='${ orgInfo.org_name }'/></dd>
						<dd class='form-tip'></dd>
					</c:if>
					<c:if test="${userLevel == 1 }">
						<dd class='show-orgname' style='line-height: 30px;'>
							<label class='detail-lable'>${ orgInfo.org_name }</label>
						</dd>
						<dd class='show-orgname' style='width: 160px;'>
							<span style='margin: 0px; padding: 0px;'> (已验证) <a
								class='m_warn' style='margin: 5px;' id='btn-modifyOrgName'
								href='javascript:void(0);' hideFocus='hidefocus'><span>修改</span></a>
							</span>
						</dd>
						<dd class='change-orgname' style='display: none;'>
							<input id='org_name' name='org_name' type='text'
								class='input field' value='${ orgInfo.org_name }' />
						</dd>
						<dd class='form-tip change-orgname' style='display: none;'></dd>
					</c:if>
					<c:if test="${userLevel == 2 }">
						<dd style='line-height: 30px;'>
							<label class='detail-lable'>${ orgInfo.org_name }</label>
						</dd>
						<dd style='width: 160px;'>
							<span class='m_warn'>已认证 </span>
						</dd>
						<input style='display: none;' id='org_name' name='org_name'
							type='text' class='input field' value='${ orgInfo.org_name }' />
					</c:if>
					    
				</dl>
				<dl>
					<dt>单位类型：</dt>
					<dd style="_margin-left:5px;">
						<select name="org_type" id="org_type" class="select field"></select>
					</dd>
					<dd class="form-tip" ></dd>
				</dl>
				<dl style="width: 580px;_width:580px;">
					<dt>组织机构代码：</dt>
					
					<c:if test="${userLevel == 0 }">
						<dd>
							<input id='org_code' name='org_code' type='text' class='input field' value='${ orgInfo.org_code }'/>
						</dd>
						<dd class='form-tip'></dd>
						<dd class='check_rule' style='width:350px;height: 20px;line-height: 20px;'>注：填写组织机构9位代码，请省略短线。</dd>
					</c:if>
					
					<c:if test="${userLevel == 1 }">
						<dd class='show-orgcode' style='line-height: 30px;'>
							<label class='detail-lable'>${orgInfo.org_code}</label>
						</dd>
						<dd class='show-orgcode' style='width: 160px;'>
							<span style='margin: 0px; padding: 0px;'> (已验证) <a
								class='m_warn' style='margin: 5px;' id='btn-modifyOrgCode'
								href='javascript:void(0);' hideFocus='hidefocus'><span>修改</span></a>
							</span>
						</dd>
						<dd class='change-orgcode' style='display: none;'>
							<input id='org_code' name='org_code' type='text'
								class='input field' value='${orgInfo.org_code}' />
						</dd>
						<dd class='form-tip change-orgcode' style='display: none;'></dd>
						<dd class='check_rule change-orgcode'
							style='display: none; width: 350px; height: 20px; line-height: 20px;'>注：填写组织机构9位代码，请省略短线。</dd>
					</c:if>
					<c:if test="${userLevel == 2 }">
						<dd style='line-height:30px;'>
							<label class='detail-lable'>${orgInfo.org_code}</label>
						</dd>
						<dd style='width:160px;'>
							<span class='m_warn'>已认证</span>
						</dd>
							<input style='display:none;' id='org_code' name='org_code' type='text' class='input field' value='${ orgInfo.org_code }'/>
					</c:if>
				</dl>
	
				<dl>
					<dt>工商注册号：</dt>
					<c:if test="${userLevel == 0 }">
						<dd>
							<input id='business_license' name='business_license' type='text'
								class='input field' value='${orgInfo.business_license}' />
						</dd>
						<dd class='form-tip'></dd>
					</c:if>
					<c:if test="${userLevel == 2 }">
						<dd style='line-height: 30px;'>
							<label class='detail-lable'>${orgInfo.business_license}</label>
						</dd>
						<dd style='width: 160px;'><span class='m_warn'>已认证</span></dd>
						<input style='display: none;' id='business_license'
							name='business_license' type='text' class='input field'
							value='${orgInfo.business_license}' />
					</c:if>
				</dl>
				<dl>
					<dt>税务登记证号：</dt>
					<c:if test="${userLevel == 0 }">
						<dd>
							<input id='tax_register_no' name='tax_register_no' type='text'
								class='input field' value='${orgInfo.tax_register_no}' />
						</dd>
						<dd class='form-tip'></dd>
					</c:if>
					<c:if test="${userLevel == 2 }">
						<dd style='line-height: 30px;'>
							<label class='detail-lable'>${orgInfo.tax_register_no}</label>
						</dd>
						<dd style='width: 160px;'><span class='m_warn'>已认证</span></dd>
						<input style='display: none;' id='tax_register_no'
							name='tax_register_no' type='text' class='input field'
							value='${orgInfo.tax_register_no}' />
					</c:if>
				</dl>
				<dl>
					<dt>单位负责人：</dt>
					<dd>
						<input id="legal_person" name="legal_person" type="text" class="input field" 
						value="${orgInfo.legal_person}" />
					</dd>
					<dd class="form-tip" ></dd>
				</dl>
				<dl>
					<dt>单位地址：</dt>
					<dd>
						<input id="address" name="address" type="text" class="input field"
							value="${orgInfo.address}"/>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt>联系电话：</dt>
					<dd>
						<input id="contact_phone" name="contact_phone" type="text"
							class="input field"
							value="${orgInfo.contact_phone}"/>
					</dd>
					<dd class="form-tip"></dd>
					<dd class='check_rule' style='width:350px;height: 20px;line-height: 20px;'>注：请输入手机号或者电话号码（格式如：区号-号码）</dd>
				</dl>
				<dl>
					<dt>邮政编码：</dt>
					<dd>
						<input id="zip_code" name="zip_code" type="text"
							class="input field"
							value="${orgInfo.zip_code}"/>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt>单位网址：</dt>
					<dd>
						<input id="org_website" name="org_website" type="text"
							class="input field"
							value="${orgInfo.org_website}"/>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt>微博网址：</dt>
					<dd>
						<input id="gov_affairs_weibo" name="gov_affairs_weibo" type="text"
							class="input field"
							value="${userExtend.gov_affairs_weibo }"/>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl style="display: none;">
					<dt>单位信息网址：</dt>
					<dd>
						<input id="org_info" name="org_info" type="text"
							class="input field"
							value="${userExtend.org_info }"/>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl style="display: none;">
					<dt>单位介绍：</dt>
					<dd
						style="height: 85px; width: 350px; _width: 330px; margin-left: 2px;">
						<textarea id="org_intro" class="field" name="org_intro"
							style="height: 75px; width: 350px; _width: 330px;">
							${orgInfo.org_intro}
						</textarea>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
			</div>
		<!-- 组织表基本资料结束 -->
		<div class="btn-contain">
			<dl>
				<dt></dt>
				<dd style="text-align: left; line-height:30px;padding-left:8px;">
					<a class="user_act_btn do" style="position: relative; left: 0px" href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提交</span></a> 
					<a class="user_act_btn back" style="position: relative; left: 20px" href="javascript:void(0);" id="cancel_btn" hideFocus="hidefocus"><span>取消</span></a>
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
			zip_code:{
				zip_code_rule:function(){ return $("#zip_code").val()==null?false:true;}
					},
			org_code:{
				org_code_rule:function(){ return $("#org_code").val()==null?false:true;}
				},		
			org_website:{
				url:function(){ return $("#org_website").val()==null?false:true;}
				},		
			gov_affairs_weibo:{
				url:function(){ return $("#gov_affairs_weibo").val()==null?false:true;}
				},		
			contact_phone:{
				telephone_rule:function(){ return $("#contact_phone").val()==null?false:true;}
				}		
			},
		messages:{
			zip_code:{
				zip_code_rule:"请正确输入邮政编码"
			},
			org_website:{
				url:"请正确输入单位网址"
			},
			gov_affairs_weibo:{
				url:"请正确输入微博网址"
			},
			contact_phone:{
				telephone_rule:"请正确输入联系电话"
			}
		}
		});
});
$(document).ready(function(){
 //获取机构类型的下拉框
	(function getOrg_type(){
		  		var i;
		  		var html='<option value=0>请选择 </option>';
		  		var natlty=org_typeList.org_type;
		  		for(i in natlty){
		  			html+='<option value='+natlty[i].name+'>'+natlty[i].name+'</option>';
		  		}
		  		$("#org_type").html(html);
		  })();
 //初始化机构类型,依据基本信息表设置机构类型selected
if(${!empty orgInfo.org_type}){
		(function(){
		  	var i;
		  	var orgtypeList=org_typeList.org_type;
		  	for(i in orgtypeList){
		  		if(orgtypeList[i].name=="${orgInfo.org_type}"){
		  			var tempI = ++i;
		  			$("#org_type")[0].selectedIndex = tempI;
		  			//ie6
		  			$("#org_type")[0].options[tempI].setAttribute('selected', true);
		  			break;
		  			}
		  		}
		  })();
}


//监听修改事件，当内容发生变化时，触发
	var modifyFlag='false';
	$(".field").change(function(){
		modifyFlag='true';
		});

	var ajaxInit={
		         success:function(data){
		        	 data = eval('('+data+')');
		        	 if(data==1) {
		        		 dialog.success("修改成功！",function(){
		        			 window.location.href="${fn:getLink('account/orgInfo.jsp')}";
		        		 });
	  				}else if(data==0) {
	  					dialog.error("修改失败，请重新操作！");
	  				}else {
	  					dialog.error("系统错误，请重试！",function(){
	  						window.location.href="${fn:getLink('account/orgInfo.jsp')}";
	  					});
	  				}
		           }
				 };
	
//提交表单
 $('#submit_btn').on("click",function(){
		//监听到内容发生变化时，进行异步提交，否则提示无需更改
		if(modifyFlag=='true'){
			var validate=$("#modify-form").valid();
			if(!validate){
				return false;
				}
		 $("#modify-form").ajaxSubmit(ajaxInit);
	  }else{
		  dialog.error("没有更改，无需操作！");
		  return false;
	 }
 });

 	$("#btn-modifyOrgName").on("click",function(){
 	 	$("#is_downgrade").val(1);
		$(".show-orgname").hide();
		$(".change-orgname").attr("status","show");
		$(".change-orgname").show();
	});
 	$("#btn-modifyOrgCode").on("click",function(){
 		$("#is_downgrade").val(1);
		$(".show-orgcode").hide();
		$(".change-orgcode").attr("status","show");
		$(".change-orgcode").show();
	});
 	$("#btn-modifyLegalPerson").on("click",function(){
 		$("#is_downgrade").val(1);
		$(".show-legalperson").hide();
		$(".change-legalperson").attr("status","show");
		$(".change-legalperson").show();
	});
 
 $("#cancel_btn").on("click",function(){
	window.location.href="${fn:getLink('account/orgInfo.jsp')}";
 });
});
 



</script>








