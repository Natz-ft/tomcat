<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_个人中心_我申请的数据</website:title>
<website:meta name="title" content="数据开放平台_数据API_大数据" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />

<website:style href="css/interact/pagination.css" />
<website:style href="libs/assets/bootstrap/css/bootstrap.css" />
<website:script src="libs/assets/bootstrap/bootstrap.js" />
<website:script src="libs/vendor/monui/js/form.js" />
<website:script src="libs/vendor/monui/css/monui.css" />
<website:script src="libs/vendor/monui/js/monui.js" />

<script type="text/javascript">
	$("#myapplyed").addClass('menuon');
</script>
<style>
.kfz_main {
	padding-left: 0px;
}

.dataTables_wrapper, table.dataTable {
	clear: none;
}
</style>
<div class="kfz_main">
	<div class="kfz_right">
		<div class="m-tablet tab-bg tab-bordered">
			<div id="myTabContent" class="tab-body">
				<ul>
						<table class="m-table table-bordered table-info"
							id="applyedData-passed" cellspacing="0" width="100%">
							<thead>
								<tr>
									<th>目录名称</th>
									<th>申请日期</th>
									<th>有效期</th>
									<th>允许下载次数</th>
									<th>申请状态</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
				</ul>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
var __rcservice = '${fn:getConfValue("filestore_rcservice")}';
$(function(){
	if(!isLogged()) {
		showLoginDialog();
	}
});
</script>
<website:script src="js/interact/myApplyedData.js" />