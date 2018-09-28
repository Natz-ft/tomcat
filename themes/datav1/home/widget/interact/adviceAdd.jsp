<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>

<style>
<!--
.list_header {
	overflow: hidden;
	line-height: 1;
}

input[type='submit'] {
	height: 31px;
	position: relative;
	color: #fff;
	cursor: pointer;
	border-color: lightgrey;
	margin: 2px 5px 0 0;
	border-radius: 4px;
	width: 65px;
	text-align: center;
	font: bold 13px Microsoft YaHei;
}

.titleSpan {
	float: left;
	width: 65px;
	text-align: right;
}

form li {
	list-style-type: none;
}
-->
</style>

<div class="top_container border_radius">
	<div class="interact_one" style="height: 30px;"></div>
</div>

<div class="list_header">
	<form name="adviceForm" id="adviceForm">
		<ul style="margin-left: 100px;">
			<li>
				<div class="list_coladvice" style="margin-top: 20px;">
					<span class="titleSpan">标题：</span> <input type="text"
						name="object_title" id="object_title"
						style="width: 370px; height: 20px;" /> <span
						style="margin-left: 5px; color: red">*简要说明你的问题</span>
				</div>
			</li>
			<li>
				<div class="list_coladvice">
					<span class="titleSpan" style="margin-top: 30px;">问题详细：</span>
					<textarea id="content" name="content" rows="5" cols="50"
						style="margin-top: 9px;"></textarea>
					<span style="margin-left: 5px; color: red">*详细说明你的问题</span>
				</div>
			</li>
			<li style="display: none">
				<div class="list_coladvice">
					<span class="titleSpan">姓名：</span> <input type="text"
						name="user_name" id="user_name"
						style="width: 370px; height: 20px;" placeholder="使用注册用户名" readonly />
				</div>
			</li>

			<li>
				<div class="list_coladvice">
					<span class="titleSpan">电子邮件：</span> <input type="text"
						name="user_email" id="user_email"
						style="width: 370px; height: 20px;" /> <span
						style="margin-left: 5px; color: red">*填写电子邮件地址，我们将把回复发到您的邮箱</span>
				</div>
			</li>
			<li>
				<div class="list_coladvice">
					<span class="titleSpan">联系电话：</span> <input type="text"
						name="user_phone" id="user_phone"
						style="width: 370px; height: 20px;" /> <span
						style="margin-left: 5px; color: red">*填写固定电话或手机号码，以便与您联系沟通问题或电话回复</span>
				</div>
			</li>
			<li>
				<div class="list_coladvice"
					style="margin-left: 65px; text-align: left;">
					<input type="submit" style="background: #6CA6CD;" class="btns"
						value="提交">
				</div>
			</li>
		</ul>
	</form>
</div>

<script type="text/javascript">
	$(function(){
		var form = $("#adviceForm");
		var options = {
				url: "index.do?method=adviceAdd",
				type: "post",
				dataType : "json",
				success: function(data){
					if(data.code=='000000'){				
						form.ajaxSubmit(function(data){
							easyDialog.open({
								container : {
									content : "提交成功！"
								},
								autoClose : 1000
							});
							form[0].reset();
						});	
					}
					
					if(data.code=='000001'){
						register();
					}
				},
				error: function(data) {
					easyDialog.open({
						container : {
							content : "网络错误！"
						},
						autoClose : 1000
					});
				},
				beforeSubmit: function(data){
					for(var i in data){
						if(data[i].name !== "user_name" && data[i].value === ""){
							easyDialog.open({
								container : {
									content : "请填入必填数据！"
								},
								autoClose : 1000
							});
							return false;
						}
						var email_format = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
						if(data[i].name === "user_email" && !email_format.test(data[i].value)){
							easyDialog.open({
								container : {
									content : "邮箱格式有误！"
								},
								autoClose : 1000
							});
							return false;
						}
						var phone_format = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
						if(data[i].name === "user_phone" && !phone_format.test(data[i].value)){
							easyDialog.open({
								container : {
									content : "联系电话格式有误！"
								},
								autoClose : 1000
							});
							return false;
						}
					}
					return true;
				}
			};
		form.ajaxForm(options);
	});
</script>
