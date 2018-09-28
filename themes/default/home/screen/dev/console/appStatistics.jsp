<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:style
	href="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.css" />
<website:style href="css/dev/developer/statistics.css" />


<script>
	if (document.getElementById("nav-app")) {
		var navOpen = document.getElementById("nav-app");
		if (navOpen.getAttribute("class")) {
			navOpen
					.setAttribute("class", navOpen.getAttribute("class")
							+ " on");
		} else {
			navOpen.className = navOpen.className + " on";
		}

	}
</script>
<style>
.kfz_main {
	margin-left: 0;
}
</style>

<div class="kfz_main">
	<div class="kfz_right">
		<website:widget path="dev/open/sitemap.jsp" />
		<div class="panel-body">
			<!-- 内容加载区域 -->
			<div class="statistics-title">应用统计</div>
			<div class="time-select">
				<input type="text" class="m-input" id="start_time"
					style="width: 209px; margin-right: 10px" name="start_time" readonly>至<input
					type="text" class="m-input" id="end_time"
					style="width: 209px; margin-left: 10px" name="end_time" readonly>
				<span class="group-btn statistics-query-btn"><button
						class="m-btn btn-info" id="query">查询</button></span>
			</div>

			<!-- chart图表 -->
			<div class="app_count_chart" id="app-count-chart"></div>
			<!--表格主体-->
			<table class="m-table table-bordered table-info"
				id="appStatistics-table" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>时间</th>
						<th>新增用户数</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
	<!-- 内容加载区域 -->
</div>
<script>
	var app_id = '${app_id}';
</script>
<website:script src="vendor/echarts/echarts.js" />
<website:script
	src="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.js" />
<website:script src="js/dev/console/appStatistics.js" />
