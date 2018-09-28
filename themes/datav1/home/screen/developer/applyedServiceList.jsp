<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:style href="css/developer/service/style.css" />
<website:style href="css/developer/ytyj_style.css" />
<website:style href="css/developer/pagination.css" />

<website:script src="libs/assets/jquery.pagination.js" />
<website:script src="js/developer/applyed-service.js" />
<script type="text/javascript">
var applylist_url = "${fn:getLink('developer/applyedServiceList.do')}";
var pageSize = 10;
</script>
<script type="text/javascript">
$("#applyedServiceList").addClass('menuon');
</script>
<style>
.kfz_main {
	padding-left: 0px;
}

.sy_nav .sy_content_header_select {
	background-image: url("");
}
</style>
<div class="kfz_main">
	<div class="kfz_right">
		<div class="serv_title">服务管理</div>
		<table class="serv_table" border="0" cellspacing="0">
			<thead>
				<th width="100px">服务名称</th>
				<th>应用名称</th>
				<th width="100px"><a href="#" id="servtime">申请时间<span></span></a></th>
				<th width="70px"><a href="#" id="servstate">状态<span></span></a>
					<div class="serv_sx">
						<p>
							<input type="checkbox" name="serv_check" id="checkall"
								checked="checked">&nbsp;全选
						</p>
						<p>
							<input type="checkbox" name="serv_check" checked="checked">&nbsp;已保存
						</p>
						<p>
							<input type="checkbox" name="serv_check" checked="checked">&nbsp;待审核
						</p>
						<p>
							<input type="checkbox" name="serv_check" checked="checked">&nbsp;已通过
						</p>
						<p>
							<input type="checkbox" name="serv_check" checked="checked">&nbsp;被驳回
						</p>
						<p>
							<a href="#">确&nbsp;定</a>
						</p>
					</div></th>
				<th width="130px">操作</th>
			</thead>
			<tbody id="applyTable">
			</tbody>
		</table>
		<div class="ly_ym">
			<div align="center">
				<div id="Pagination" class="pagination" style="margin-left: 200px;"></div>
			</div>
		</div>
	</div>
</div>

<!-- <script>
$("#applyedServiceList").addClass('menuon');
</script> -->
