<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title> ${regionStatistics.region_name }公共数据开放平台_互动交流</website:title>
<website:meta name="title" content="数据开放平台_数据API_大数据" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<website:style href="css/libs/font-awesome.css" />
<website:style href="css/libs/iconfont/iconfont.css" />
<website:style href="css/interact/bigdata.css" />
<website:style href="css/interact/service.css" />
<style type="text/css">
/*无数据提示*/
.nodata_text_notice {
	font-family: "Microsoft YaHei";
	line-height: 30px;
	display: block;
	font-size: 22px;
	font-weight: bolder;
	letter-spacing: 2px;
	margin: 20px 0 10px;
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(126, 172, 223, 0.5)),
		to(rgba(20, 99, 172, 1)));
	color: #1463ac;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.no_data_notice {
	margin-left: 10%;
	float: left;
	margin-right: 20px;
}
</style>
<div class="banner">
	<!--    <img src="dist/img/bigdata/banner.png" style="width: 100%;height: 180px"> -->
</div>
<div class="main">
	<div class="bigdata-content">
		<div class="service-content" style="height: 600px; margin-top: 5px">
			<!--左侧蓝色头部-->
			<div class="lefthead">
				<img src="../img/communicate/blocktitle.png">
			</div>
			<div class="left">
				<div class="listul">
					<ul>
						<li class="li1 active">咨询建议</li>
						<li class="li2">数据申请</li>

					</ul>
				</div>
			</div>

			<div class="right" id="right1">

				<div class="main"
					style="background-color: #ffffff; padding-bottom: 13px">
					<form name="adviceForm">
						<div class="blockContainer">
							<label class="text1" style="">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</label>
							<input type="text" id="object_title" name="object_title"
								class="form-controller" placeholder="简要说明你的问题">
						</div>
						<div class="blockContainer" style="height: 200px">
							<label class="text1" style="top: 20px; vertical-align: top;">问题详情</label>
							<!--<input type="text" class="form-controller" style="height: 200px" placeholder="详细说明你的问题">-->
							<textarea id="content" name="content" typeof="text"
								style="height: 200px; width: 600px; padding-left: 10px;"
								placeholder="详细说明你的问题"></textarea>
						</div>
						<div class="blockContainer">
							<label class="text1">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
							<input type="text" name="user_name" id="user_name"
								class="form-controller" placeholder="请使用注册用户名"
								value="${zxjy_name }">
						</div>
						<div class="blockContainer">
							<label class="text1">电子邮箱</label> <input type="text"
								name="user_email" id="user_email" class="form-controller"
								placeholder="请正确填写邮箱地址，我们将把回复发送到你的邮箱" value="${zxjy_email }">
						</div>
						<div class="blockContainer">
							<label class="text1">联系方式</label> <input type="text"
								name="user_phone" id="user_phone" class="form-controller"
								placeholder="请正确填写固定电话或手机号码，以便回复和沟通" value="${zxjy_phone }">
						</div>
						<button type="button" id="addAdviceBtn" class="footerButton"
							style="margin-top: 20px; margin-bottom: 10px"
							onclick="doAddAdvice()">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>
					</form>
				</div>
			</div>



			<div class="right" style="display: none; height: 480px" id="right2">
				<div class="main" style="background-color: #ffffff">
					<c:if test="${not empty questions}">
						<form name="surveyForm" id="surveyForm">
							<table class="table table-bordered table-striped dmp-table"
								id="list-table"
								style="margin-top: 30px; margin-left: 30px; width: 90%;"
								cellspacing="0">
								<thead>
									<c:forEach items="${questions}" var="question"
										varStatus="status">
										<tr
											<c:if test="${status.count % 2 == 0}" >style="background-color: #F2F2F2"</c:if>>
											<th class="titleth"><i class="fa fa-star "
												style="font-size: 9px; color: red;"></i>&nbsp;&nbsp;${question.title
											}</th>
											<th class="contentth"><c:forEach
													items="${question.items}" var="item">
													<input type="${question.type }"
														name="item_${item.question_id}" value="${item.item_id }"
														<c:if test="${item.item_content == null}">class="form-controller" placeholder="" style="width: 580px;margin-left: 10px;outline: none;border: none;"</c:if>
														<c:if test="${item.item_content != null}">style="margin-left: 10px;"</c:if> />
													<span class="shujuContent">${item.item_content}</span>
												</c:forEach></th>
										</tr>
									</c:forEach>
								</thead>
								<tbody></tbody>
							</table>
							<button type="button" id="addSurveyBtn" class="footerButton">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>
						</form>
					</c:if>
					<c:if test="${empty questions}">
						<div style="margin: 218px auto; width: 500px;">
							<img src="../img/interact/no_data_ts.png" class="no_data_notice">
							<div style="display: inline-block; margin-top: 30px;">
								<div class="nodata_text_notice">暂时未发布调查问卷！</div>
							</div>
						</div>
					</c:if>
				</div>

			</div>

		</div>


	</div>
</div>
<script type="text/javascript">
	function doAddAdvice() {
		var object_title = $("#object_title").val();
		var content = $("#content").val();
		var user_name = $("#user_name").val();
		var user_email = $("#user_email").val();
		var user_phone = $("#user_phone").val();

		if (object_title == "" || object_title == null) {
			dialog.info("请输入标题", function() {
			}, 2000);
			return false;
		}

		if (content == "" || content == null) {
			dialog.info("请输入问题详情", function() {
			}, 2000);
			return false;
		}
		if (user_name == "" || user_name == null) {
			dialog.info("请输入姓名", function() {
			}, 2000);
			return false;
		}
		if (user_email == "" || user_email == null) {
			dialog.info("请输入电子邮件", function() {
			}, 2000);
			return false;
		}
		var email_format = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if (!email_format.test(user_email)) {
			dialog.info("邮箱格式有误", function() {
			}, 2000);
			return false;
		}
		if (user_phone == "" || user_phone == null) {
			dialog.info("请输入联系方式", function() {
			}, 2000);
			return false;
		}
		var phone_format = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/;
		if (!phone_format.test(user_phone)) {
			dialog.info("联系电话格式有误", function() {
			}, 2000);
			return false;
		}

		$
				.ajax({
					url : "${fn:getLink('interact/Index.do?method=adviceAdd')}",
					type : "post",//
					dataType : "JSON",
					data : {
						object_title : object_title,
						content : $.trim(content).replace(/[\r\n]/g, "<br>")
								.replace(/[+]/g, "+"),
						user_name : user_name,
						user_email : user_email,
						user_phone : user_phone
					},
					contentType : "application/x-www-form-urlencoded; charset=UTF-8",
					success : function() {
						dialog
								.info(
										"提交成功",
										function() {
											window.location.href = "${fn:getLink('interact/index.jsp')}";
										}, 2000);
					},
					error : function() {
						dialog.info("操作失败", function() {
						}, 2000);
					}
				});
	}
	$(function() {
		var form = $("#surveyForm");
		var options = {
			url : "index.do?method=surveyAdd",
			type : "post",
			dataType : "json",
			success : function(data) {
				if (data.code == '000000') {
					form.ajaxSubmit(function(data) {
						dialog.info("提交成功！", function() {
							window.location.href = "${fn:getLink('interact/questionStatistics.jsp')}";
						}, 2000);
						form[0].reset();
						initForm();
					});
				}

				if (data.code == '000001') {
					$('#bounceIn').click();
				}
			},
			error : function(data) {
				dialog.info("网络错误！", function() {
				}, 2000);
			},
			beforeSubmit : function(data) {
				for ( var i in data) {
					if (data[i].value === "") {
						dialog.info("请填入必填数据！", function() {
						}, 2000);
						return false;
					}
				}
				return true;
			}
		};

		var initForm = function() {
			$("th").each(
					function() {
						$(this).find("input[type='radio']:first").prop(
								"checked", 'checked');
					});
		}
		initForm();

		$("#addSurveyBtn").click(function() {
			// 调用common.js中判断登录方法和弹出登录窗口
			if(isLogged()) {
				form.ajaxSubmit(options);
			} else {
				showLoginDialog();
			}
		});
	});
</script>

<website:script src="js/interact/service.js" />
