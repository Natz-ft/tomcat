<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:style href="css/developer/modal.css" />
<website:style href="css/developer/serviceapply/apply.css" />
<website:style
	href="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.css" />
<website:style href="css/developer/pagination.css" />
<script type="text/javascript">
$("#serviceApply").addClass('menuon');
</script>
<div class="applyContent">
	<div class="wi-wtitle">服务申请</div>
	<form name="serviceForm" id="serviceForm">
		<table class="applytable" border="0" cellspacing="0">
			<tr>
				<td class="lefttd">申请服务:</td>
				<td><input type="text" readonly="readonly" name="service_name"
					id="service_name" id="service_name" value="${service_name}"><label
					id="service_namewar" class="tipWarning">*</label><input
					type="hidden" id="service_id" value="${service_id}"
					name="service_id"> <img
					src="${fn:getLink('img/dev/search.png')}" id="service_name_handler"></td>
				<td class="lefttd">所属应用：</td>
				<td><input readonly="readonly" type="text" name="app_name"
					id="app_name" value="${app_name}"><label id="app_namewar"
					class="tipWarning">*</label><input type="hidden" id="app_id"
					name="app_id" value="${app_id}"> <img
					src="${fn:getLink('img/dev/search.png') }" id="app_name_handler"></td>
			</tr>
			<tr>
				<td width="70px" class="lefttd">联系人：</td>
				<td><input type="text" id="contact_name" name="contact_name"
					value="${developInfo.name}" readonly><label
					id="contact_namewar" class="tipWarning">*</label></td>
				<td width="70px" class="lefttd">联系方式：</td>
				<td><input type="text" name="phone" id="phone"
					value="${developInfo.tel}"><label id="phonewar"
					class="tipWarning">*</label></td>
			</tr>
			<tr>
				<td class="lefttd">使用时间:</td>
				<td colspan="3"><input type="text" class="m-input"
					id="start_time" name="start_time" readonly>至<input
					type="text" class="m-input" id="end_time" name="end_time" readonly><label
					id="timewar" class="tipWarning">*</label></td>
			</tr>
			<c:if test="${not empty allServiceLevel }">
				<tr>
					<td class="lefttd">使用级别:</td>
					<td colspan="3"><c:forEach var="level"
							items="${allServiceLevel}" varStatus="status">
							<div class="level_div">
								<c:if test="${status.index == 0 }">
									<lable>
									<input type="radio" name="level_id" checked="checked"
										value="${level.level_id }"></lable>
								</c:if>
								<c:if test="${status.index > 0 }">
									<lable>
									<input type="radio" name="level_id" value="${level.level_id }"></lable>
								</c:if>
								<span class="_c_2" style="margin-left: 20px;"> <a
									href="javascript:;" title="${level.level_name }">${level.level_name }</a>
								</span> <span class="_c_2">${level.hour_maximum}次/时</span> <span
									class="_c_2">${level.day_maximum}次/天</span> <span class="_c_2">${level.month_maximum}次/月</span>
							</div>
						</c:forEach></td>
				</tr>
			</c:if>
			<tr>
				<td class="lefttd">申请事由:</td>
				<td colspan="3"><textarea cols="60" rows="4" name="description"
						id="description"></textarea> <label id="descriptionwar"
					class="tipWarning">*</label></td>
			</tr>
			<tr>
				<td class="lefttd" colspan="4" style="text-align: center"><input
					type="reset" value="取消" class="btn-green"
					style="width: 50px; height: 30px"> <input type="button"
					value="提交" id="submitBtn" class="btn-green"
					style="width: 50px; height: 30px" onclick="submitForm()"></td>
			</tr>
		</table>

	</form>
</div>

<div class="modal" id="serviceModal" tabindex="-1" role="dialog"
	style="display: none;">
	<div class="modal-dialog modal-lg" role="document"
		style="margin-top: 30px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close" onclick="closewinser()">
					<span aria-hidden="true">×</span>
				</button>
				<h4 class="modal-title">选择服务</h4>
			</div>
			<div class="modal-body">
				<table class="table-box" border="0" style="width: 100%">
					<thead>
						<th>服务名称</th>
						<th>服务版本</th>
						<th>操作</th>
					</thead>
					<tbody id="service_list"></tbody>
				</table>
				<div id="service_pagination" class="pagination"></div>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="appModal" tabindex="-1" role="dialog"
	style="display: none;">
	<div class="modal-dialog modal-lg" role="document"
		style="margin-top: 30px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close" onclick="closewinapp()">
					<span aria-hidden="true">×</span>
				</button>
				<h4 class="modal-title">选择应用</h4>
			</div>
			<div class="modal-body">
				<table class="table-box" border="0" style="width: 100%">
					<thead>
						<th>应用名称</th>
						<th>操作</th>
					</thead>
					<tbody id="app_list"></tbody>
				</table>
				<div id="app_pagination" class="pagination"></div>
			</div>
		</div>
	</div>
</div>
<website:script src="js/utils/layer/layer.min.js" />
<website:script
	src="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.js" />
<website:script src="js/developer/modal.js" />
<website:script src="js/developer/apply.js" />
<website:script src="libs/assets/jquery.pagination.js" />
<script type="text/javascript">
var service_apply_url = "${fn:getLink('developer/serviceApply.do')}";
var startTime = "";
var endTime = "";
$("#start_time").datetimepicker({
    language: 'cn',
    format: 'yyyy-mm-dd',
    autoclose: true,
    todayBtn: true,
    minView : 2
}).on("changeDate",function(ev){
	startTime = ev.date.valueOf();
    $("#start_time").datetimepicker("setEndDate", $("#end_time").val());
});
$("#end_time").datetimepicker({
    language: 'cn',
    format: 'yyyy-mm-dd',
    autoclose: true,
    todayBtn: true,
    minView : 2
}).on("changeDate", function (ev) {
	endTime = ev.date.valueOf();
    $("#end_time").datetimepicker("setStartDate", $("#start_time").val());
});

document.onkeydown = function () {
    if (window.event && window.event.keyCode == 13) {
        window.event.returnValue = false;
    }
}
</script>