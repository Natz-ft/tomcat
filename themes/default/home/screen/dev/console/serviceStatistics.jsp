<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:style
	href="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.css" />
<website:style href="css/dev/developer/statistics.css" />
<website:style href="libs/assets/bootstrap/css/bootstrap.css" />
<website:script src="libs/assets/bootstrap/bootstrap.js" />
<!-- <script type="text/javascript"
	src="/devweb/default/libs/vendor/monui/js/form.js"></script> -->
<website:script
	src="libs/vendor/monui/js/form.js" />
<website:script src="vendor/echarts/echarts.js" />
<website:script
	src="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.js" />

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
<script type="text/javascript">
	$("#serviceStatistics").addClass('menuon');
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
			<div class="statistics-title">服务统计</div>

			<div id="key-target">
				<div class="statistics-sub-title">关键指标</div>
				<table class="table-service-statistics" border="0" cellspacing="0">
					<tr>
						<td class="table-content">
							<div class="target-name">调用次数</div>
							<div class="target-value" id="td-count">3200</div>
						</td>
						<td class="table-content">
							<div class="target-name">失败率</div>
							<div class="target-value" id="td-rate">0.2%</div>
						</td>
						<td class="table-content">
							<div class="target-name">平均耗时(毫秒)</div>
							<div class="target-value" id="td-average-consume">140.52</div>
						</td>
						<td class="table-content">
							<div class="target-name">最大耗时(毫秒)</div>
							<div class="target-value" id="td-max-consume">5,002</div>
						</td>
					</tr>
				</table>
			</div>

			<div id="key-target-detail">
				<div class="statistics-sub-title">关键指标详解</div>
				<ul id="myTab" class="nav nav-tabs" style="height: 43px;">
					<li class="active"><a href="#allCount" data-toggle="tab">使用次数</a></li>
					<li><a href="#loseRate" data-toggle="tab">失败率</a></li>
					<li><a href="#averageConsume" data-toggle="tab">平均耗时</a></li>
					<li><a href="#maxConsume" data-toggle="tab">最大耗时</a></li>
				</ul>
				<div class="time-select">
					<input type="text" class="m-input" id="start_time"
						style="width: 209px; margin-right: 10px" name="start_time"
						readonly>至<input type="text" class="m-input" id="end_time"
						style="width: 209px; margin-left: 10px" name="end_time" readonly>
					<span class="group-btn statistics-query-btn"><button
							class="m-btn btn-info" id="query">查询</button></span>
				</div>
				<div id="myTabContent" class="tab-content" style="margin-top: 10px;">
					<div class="tab-pane fade in active" id="allCount">
						<!-- chart图表 -->
						<div class="app_count_chart" id="all-count-chart"></div>
					</div>
					<div class="tab-pane fade" id="loseRate">
						<!-- chart图表 -->
						<div class="app_count_chart" id="loseRate-count-chart"></div>
					</div>
					<div class="tab-pane fade" id="averageConsume">
						<!-- chart图表 -->
						<div class="app_count_chart" id="averageConsume-count-chart"></div>
					</div>
					<div class="tab-pane fade" id="maxConsume">
						<!-- chart图表 -->
						<div class="app_count_chart" id="maxConsume-count-chart"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 内容加载区域 -->
	</div>
</div>
<script>
	var app_id = '${app_id}';
</script>
<website:script src="js/dev/console/serviceStatistics.js" />
