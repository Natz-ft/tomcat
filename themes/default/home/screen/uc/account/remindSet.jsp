<%@page import="java.io.Writer"%>
<%@page import="java.util.*"%>
<%@page import="java.io.UnsupportedEncodingException"%>
<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<website:style href="css/account.css"/>
<website:style href="css/blockui_css.css"/>
<style>
.error {
	margin-left: 2px;
	color: red;
	font-size: 12px;
	text-align: left;
	background-color: #FFE7E7;
}
label.error{
	background: transparent;
}
.form-body dd {
	float: left;
	text-align: left;
	font-weight: normal;
	width:340px;
}
.form-body .input{
	width:220px;form-body
}
.form-body dl{
	padding-left:100px;
}
.panel .act-tip {
	margin: 15px 52px 5px;
}

</style>

<div class="panel account-show-panel">
<!--头部说明 开始-->
<div class="content-title clearfix">
	<span class="title-icon"></span><span>提醒设置</span>
</div>
<!--头部说明 结束-->	

<p class="act-tip">请选择消息提醒方式：</p>

<!--提交表单 开始-->
<div class="m_form">
	<div class="form-body" >
		<form id="modify-form" method="post" action="">
			<table class="m_table">
		            <tbody>
		            	<tr>
		            		<th><span>消息类型</span></th>
		            		<th>消息提醒</th>
		            		<th>邮件提醒
		            		<% 
		            		Map user_basic = (Map)request.getAttribute("user_basic");
		            		if(user_basic.get("login_email") == null || user_basic.get("login_email").toString().isEmpty()){
		            		%>
		            			<a href="${fn:getLink('account/account.jsp')}">(设置)</a>
		            		<% } %>
		            		</th>		            		
		            		<th>短信提醒
		            		<%
		            		if(user_basic.get("login_phone") == null || user_basic.get("login_phone").toString().isEmpty()){
		            		%>
		            			<a href="${fn:getLink('account/account.jsp')}">(设置)</a>
		            		<% } %>
		            		</th>	            		
		                </tr>
		               <%
		               Map remindSet = (Map)request.getAttribute("remindSet");
		               List<Map> messageTypes = (List<Map>)request.getAttribute("messageTypes");
		               if(messageTypes != null){
		            	   for(Map type:messageTypes){
		            		   String remindValue = String.valueOf(remindSet.get(type.get("type_id")));
		            		   boolean msg_checked = remindValue.indexOf("1")>-1;
		            		   boolean mail_checked = remindValue.indexOf("2")>-1;
		            		   boolean phone_checked = remindValue.indexOf("3")>-1;
		            		   %>
			            	 <tr node-type="remind_pwd">
			                	<td class="tl"><span><%=type.get("type_name") %></span></td>
			                	<td><input type="checkbox" class="field" name="<%=type.get("type_id") %>" value="1" <%=msg_checked?"checked":"" %>></td>                	
			                	<td><input type="checkbox" class="field" name="<%=type.get("type_id") %>" value="2" <%=mail_checked?"checked":"" %> <%=user_basic.get("login_email")==null?"disabled":"" %>></td>
			                	<td><input type="checkbox" class="field" name="<%=type.get("type_id") %>" value="3" <%=phone_checked?"checked":"" %> <%=user_basic.get("login_phone")==null?"disabled":"" %>></td>
			                </tr>
		            		   
		            	<%}
		               }
		                %>
		     		</tbody>
		     </table>
			<dl class="remindset-dl">
				<dd>
					<a class="user_act_btn do" style="margin-right:40px;" href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提交</span></a>
					<a class="user_act_btn back"  href="javascript:void(0);" id="cancel_btn" hideFocus="hidefocus"><span>取消</span></a>
				</dd>
			</dl>
		</form>
	</div>	
</div> 
<!--提交表单 结束-->

<!--底部说明 结束-->   

</div>

<website:script src="js/jquery.form.js"/>
<website:script src="js/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/jquery.validate.js"/>
<website:script src="js/md5.js"/>
<website:script src="js/jquery.validate.ext.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<script type="text/javascript">
$(document).ready(function(){
	var isOK=false;
	$(".field").change(function(){
		isOK=true;
	});
	//为提交按钮注册点击事件
	$("#submit_btn").on("click",function(){
		 if(isOK){
			 $("#modify-form").ajaxSubmit({
			        url:"${fn:getLink('account/remindSet.do?method=submitRemindSet')}",
			        type:"post",
			        success:function(data){
				           if(data==1){
				        	   dialog.success("设置成功！");
			               }else{
			            	  dialog.error("操作未成功，请重新设置！");
			               }
			            }
				 });
		 }else{
			 dialog.error("没有修改，无需提交！");
		}
	});
	$("#cancel_btn").on("click",function(){
		window.location.href="${fn:getLink('account/remindSet.jsp')}";
	});
});
</script>
<script type="text/javascript">
$("#remind").addClass('menuon');
</script>

