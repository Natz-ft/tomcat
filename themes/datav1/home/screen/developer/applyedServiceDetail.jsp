<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<website:style href="css/developer/service/style.css" />
<website:style href="css/developer/ytyj_style.css" />
<style>
.level_div {
	position: relative;
	height: 30px;
	line-height: 30px;
}

.level_div ._c_2 {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 20%;
	display: inline-block;
	margin-right: 10px;
}
</style>
<div class="kfz_main">
	<div class="main_right">
		<div class="right_top">服务详情</div>
		<table class="applytable" border="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="lefttd">申请服务:</td>
					<td>${apply.service_name}</td>
					<td class="lefttd">所属应用：</td>
					<td>${apply.app_name}</td>
				</tr>
				<tr>
					<td class="lefttd" width="70px">联系人：</td>
					<td>${apply.name}</td>
					<td class="lefttd" width="70px">联系方式：</td>
					<td>${apply.tel}</td>
				</tr>
				<tr>
					<td class="lefttd">使用时间:</td>
					<td colspan="3">${apply.start}&nbsp;&nbsp;至&nbsp;&nbsp;${apply.end}</td>
				</tr>
				<tr>
					<td class="lefttd">使用级别:</td>
					<td colspan="3">
						<div class="level_div">
							<c:if test="${not empty level }">
								<span class="_c_2" style="margin-left: 20px;">${level.level_name }</span>
								<span class="_c_2">${level.hour_maximum}次/时</span>
								<span class="_c_2">${level.day_maximum}次/天</span>
								<span class="_c_2">${level.month_maximum}次/月</span>
							</c:if>
							<c:if test="${ empty level }">
								<span class="_c_2">未设置</span>
							</c:if>
						</div>

					</td>
				</tr>
				<tr style="line-height: 10;">
					<td class="lefttd">申请事由:</td>
					<td colspan="3">${apply.subscription_reason}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
