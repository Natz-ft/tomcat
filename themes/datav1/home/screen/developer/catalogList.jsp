<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="jstlfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:script src="js/utils/jquery-1.7.1.min.js" />
<website:script src="js/developer/cataloglist.js" />
<website:style href="css/developer/cataloglist.css" />
<website:style href="css/developer/pagination.css" />
<website:script src="libs/assets/jquery.pagination.js" />

<div class="right">
	<div class="top3">
		<div class="wdsj_b">
			<div class="wdsj_b1">
				<b>我的数据</b>
			</div>
			<div class="wdsj_b2"></div>
		</div>
		<div class="listshow catalog_list">
			<ul class="listdata" id="listul">
			</ul>
		</div>
		<input type="hidden" id="tag" name="tag" value="" />
		<div class="pageye">
			<div id="Pagination" class="pagination"></div>
		</div>
	</div>
</div>

<script type="text/javascript">
	var catalogurl = "${fn:getLink('developer/CatalogList.do')}";
	var contentPath = '${fn:getUrl('')}';
	var area_name = '${sessionScope.regionInfo.region_name }';
	var catalogdetailUrl = "${fn:getLink('catalog/detail.htm')}?cata_id=";
	var catalogRelnet = "${fn:getLink('relnet/')}?cata_id=";
</script>
<script type="text/javascript">
$("#mydata").addClass('menuon');
</script>