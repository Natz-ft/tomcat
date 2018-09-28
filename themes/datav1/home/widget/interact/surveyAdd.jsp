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

form li div {
	padding-left: 2% !important;
	width: 96% !important;
	margin: 0 10px;
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
	margin-top: 15px;
}

input[type='text'] {
	width: 370px;
	height: 20px;
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
	<form name="examenForm" id="examenForm">
		<ul>

			<c:forEach items="${questions}" var="question">
				<li>
					<div class="list_colexamen1">${question.title }<span
							style="color: red;">*</span>
					</div>
				</li>
				<li>
					<div class="list_colexamen2">
						<c:forEach items="${question.items}" var="item">
							<input type="${question.type }" name="item_${item.question_id}"
								value="${item.item_id }" />${item.item_content}
					</c:forEach>
					</div>
				</li>
			</c:forEach>

			<li>
				<div class="list_colexamen1">&nbsp;</div>
			</li>
			<li>
				<div class="list_colexamen2" style="text-align: left;">
					<input type="submit" style="background: #6CA6CD;" class="btns"
						value="提交">
				</div>
			</li>
		</ul>
	</form>
</div>
<script type="text/javascript">
	$(function(){
		var form = $("#examenForm");
		var options = {
			url: "index.do?method=surveyAdd",
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
						initForm();
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
					if(data[i].value === ""){
						easyDialog.open({
							container : {
								content : "请填入必填数据！"
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
		
		var initForm = function(){
			$("div").each(function(){
				$(this).find("input[type='radio']:first").prop("checked",'checked');	
			});
		}
		initForm();
});
</script>
