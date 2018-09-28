<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"  %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<website:script src="js/utils/jquery.validate.js"/>
<website:script src="js/utils/jquery.validate.ext.js"/>
<website:script src="libs/assets/jquery.validate/jquery.validate.min.js"/>
<website:script src="libs/assets/jquery.validate/messages_cn.js"/>

<website:style href="css-open/developer.css"/>
<style>
#add_one{
    margin-left: 230px;
    border: 1px solid #E2E2E2;
    width: 81%;
        background-color: white;
}
 
.form-label em{
	color:red;
	text-align:right;
}
.form-body{
	width:100%;
	min-width:800px;
	margin-left:100px;
}
.form-label{
	margin-left:50px;
    font-family:"宋体";
    color: #333;
    font-size: 14px;
    text-align:right;
    font-weight:normal;
}
.btn-info{
	margin-left:170px;
}
.form-common-tip span {
	display: inline-block;
	min-height: 20px;
	line-height: 20px;
	word-wrap: break-word;
	word-break: break-all;
}
.form-common-tip {
	color: gray;
	margin-top: 2px;
}
.form-common-tip span {
	margin-top: 0;
	margin-left:40px;
}
.m-btn {
    position: relative;
    display: inline-block;
    padding: 5px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: 0;
    outline: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 0;
}
</style>
<script type="text/javascript">
$("#developerid").addClass('menuon');
</script>
<div class="content_holder">
	<div class="wrap_content clearfix">
		<!-- <div class="form-ct"> -->
			<input id="user_email_old" name="email_old" type="hidden" class="input" value="${dev_info.email}"/>
			<form id="add_one" action="" method="post" class="m-form panel" >
				<div class="form-body" style="margin-top: 20px">
					<input type="hidden" id="developer_id" value="${dev_info.id}">
					 <div class="form-row" style="display:none;">						
						 <label class="form-label">开发者类型：</label>								
						 <div class="form-content">
							<input type="radio" class="m-input" name="type" value="0" id="uretypecom"> <label for="uretypecom" class="label_r">公司</label>
							<input type="radio" class="m-input" name="type" value="1" checked="checked" id="uretypeperson"> <label for="uretypeperson" class="label_r">个人</label>
						 </div>						
					</div>
					
					<div class="form-row">
						<label class="form-label"><em>*</em>开发者名称：</label>	
						<div class="form-content">
							<input id="user_name" name="name" type="text" class="m-input" value="${dev_info.name}"/>
							<div class="form-common-tip"><span>不超过10个汉字</span></div>
						</div>	
					</div>
					<div class="form-row">
						<label class="form-label"><em>*</em>身份证：</label>	
						<div class="form-content">
							<input id="user_id_card_num" name="idcard" type="text" class="m-input" value="${dev_info.idcard}"/>
							<div class="form-common-tip"><span>请输入身份证号</span></div>
						</div>
					</div>
					<div class="form-row">
						<label class="form-label"><em>*</em>邮箱：</label>
						<div class="form-content">
							<input id="user_email" name="email" type="text" class="m-input" value="${dev_info.email}"/>
							<div class="form-common-tip"><span>此邮箱将用于找回密码</span></div>
						</div>
					</div>
					<div class="form-row">
						<label class="form-label">QQ：</label>
						<div class="form-content">
							<input id="user_qq" name="qq" type="text" class="m-input" value="${dev_info.qq}" />
							<div class="form-common-tip"><span>（此选项可以不填写）</span></div>
						</div>
					</div>
					<div class="form-row">
						<label class="form-label"><em>*</em>手机号码：</label>
						<div class="form-content">
							<input id="user_phone" name="tel" type="text" class="m-input" value="${dev_info.tel}"/>
							<div class="form-common-tip"><span>仅限中国境内手机号码，无需加0或+86，手机号用于验证信息</span></div>
						</div>
					</div>
					<div class="form-row">
						<label class="form-label">网站地址：</label>
						<div class="form-content">
							<input id="user_website" name="website" value="${dev_info.website}" type="text" class="m-input"/>
							<div class="form-common-tip"><span>（此选项可以不填写）</span></div>
						</div>
					</div>
					<div class="form-row">
						<input type="submit" id="btn_sub"  class="m-btn btn-info" value="保存">
					</div>
				</div>
			</form>
		</div>
	</div>
<!-- </div> -->
<script>

</script>
<script type="text/javascript">
jQuery.validator.setDefaults({
	  debug: true,
	  success: "valid"
	});
$(function(){
	$("#add_one").validate({		
		rules:{
			name:{
				required:true,
				string:true,
				maxlength:10,
				minlength:2				
			},
			idcard:{
				required:true,
				isIdCardNo:true
			},
			email:{
				required:true,
				email:true
			},
			tel:{
				required:true,
				isMobile:true
			},
			user_agree:{
				required:true
			}
		},
		messages:{
			name:{
				required:"请输入姓名",
				maxlength:"最多10字符",
				minlength:"至少2字符"
				},
			idcard:{
				required:"请输入身份证号",
				idcard:"请输入正确身份证号"		 		
				},
			tel:{
				required:"请输入手机号",
				isMobile:"请输入正确手机号"	 	 		
				},			
			user_agree:{
				required:"没有接受《开放平台开发者服务协议》不能成为开发者 "
				}
		}
	});
});
$(document).ready(function(){
	var add_one = $("#add_one");
	 $('#btn_sub').on('click',function(){
		if(!add_one.valid()){
			return false;
		}else{
			//增加邮箱唯一性校验 （ 20150211尚未同时修改其他主题）
			if(checkEmail() == true){
				submit_form();
			}
		}
	}) 
})
function checkEmail(){
	//如果是当前使用的地址，则不检查是否已使用
	if($("#user_email_old").val() == $("#user_email").val()){
		return true;
	}
	var isUniqueEmail = false;
	var isUniqueEmailUrl="${fn:getLink('dev/console/developer.do?method=isUniqueEmail')}";
	$.ajax({
		type:"POST",
		async:false,
		data:{email:$("#user_email").val()},
		url:isUniqueEmailUrl,
		error:function(){
			layer.msg('操作失败！',2,0);
			isUniqueEmail = false;
		},
		success:function(res){
			if(res == "true"){
				isUniqueEmail = true;
			}else{
				isUniqueEmail = false;
			}
		}
	});
	if(isUniqueEmail == false){
		var tip = '<span for="user_email" generated="true" class="invalid">邮箱已经被使用，请重新填写</span>'
		$("#user_email").parents("dl").find(".form-tip").html(tip);
	}
	return isUniqueEmail;
}
function submit_form(){
		var updateDeveloperUrl="${fn:getLink('dev/console/developer.do?method=updateDeveloper')}";
		var data={
				developer_id:$("#developer_id").val(),
				email:$("#user_email").val(),
				idcard:$("#user_id_card_num").val(),
				name:$("#user_name").val(),
				qq:$("#user_qq").val(),
				tel:$("#user_phone").val(),
				type:$("#uretypeperson").val(),
				user_agree:$("#user_agree").val(),
				website:$("#user_website").val()
			};
		$.layer({
			shade : [0.5, '#000', true],
		    area : ['255','150'],
			dialog : {
			    msg:'确定要保存修改的信息吗？',
				btns:2, 
		        type:4,
		        btn : ['确定','取消'],
			    yes : function(){
					layer.closeAll();
					layer.load('保存中...');
					$.ajax({
						type:"POST",
						data:data,
						url:updateDeveloperUrl,
						error:function(){
							layer.closeAll();
							layer.error();
							layer.msg('操作失败！',2,0);
						},
						success:function(res){
							var intRes=parseInt(res);
							if(intRes>0){
								if($("#developer_id").val()==""){
									$("#developer_id").val(res);
								}
								layer.closeAll();
								layer.msg('信息更新成功！',2,1);
								setTimeout(function(){
									var url = "./appList.htm";
									if(url){
										window.parent.window.location.href = url;
									}
								},3000);
							}else {
								layer.closeAll();
								layer.msg('信息更新失败！',2,0);
							}
						}
					});
		        }
		    }
		});
}	  	       
if(document.getElementById("nav-app")){
	var navOpen = document.getElementById("nav-app");
	if(navOpen.getAttribute("class")){
		navOpen.setAttribute("class", navOpen.getAttribute("class")+" on");
	}else{
		navOpen.className = navOpen.className +" on";
	}
	
}
</script>


