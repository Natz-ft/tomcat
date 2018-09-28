<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:style href="css/developer/appAssess.css" />
<website:style href="css/developer/pagination.css" />
<website:script src="js/developer/appAssess.js" />
<website:script src="libs/assets/jquery.pagination.js" />
<style>
.sy_nav .sy_content_header_select {
	background-image: url("");
}
</style>
<div class="main">
	<div class="wdyy_b">
		<div class="wdyy_b1">
			<b>评价列表</b>
		</div>
	</div>
	<div class="sd_detailleft">
		<div class="sd_detaillist">
			<div class="ly_n">
				<ul>
				</ul>
			</div>
		</div>
	</div>
	<div class="ly_ym">
		<div align="center">
			<div id="Pagination" class="pagination"></div>
		</div>
	</div>
	<!--main-->
</div>

<script type="text/javascript">
	var appAssessListUrl = "${fn:getLink('developer/appAssessList.do') }";
	var contentPath = "${fn:getUrl('img/appcenter/default.jpg')}";
	var contentinteractPath = "${fn:getUrl('img/interact/pl_3.png')}";
	var pageSize = 8;
	var pageSize1 = 5;
	var parentid;
</script>
<script type="text/javascript">
$("#appassesslist").addClass('menuon');
</script>
