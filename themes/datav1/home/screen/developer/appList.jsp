<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="jstlfn" uri="http://java.sun.com/jsp/jstl/functions"%>

<website:script src="js/utils/jquery-1.7.1.min.js" />
<website:script src="js/developer/applist.js" />
<website:style href="css/developer/pagination.css" />
<website:style href="css/developer/applist.css" />
<website:script src="libs/assets/jquery.pagination.js" />
<style>
.sy_nav .sy_content_header_select {
	background-image: url("");
}
</style>
<script type="text/javascript">
	var appUrl = "${fn:getLink('developer/AppList.do')}";
	var appDetailUrl = "${fn:getConfValue('web_appdetail')}?version_id=";
	var contentPath = '${fn:getUrl('')}';
	var area_name = '${sessionScope.regionInfo.region_name }';
	var methodUrl = "GetMyFavoriteList";
	function showData(str)
	{
		if(str=="favorite")
			{
				methodUrl = "GetMyFavoriteList";
			}
		else
			{
				methodUrl = "GetVisitLogList";
			}
	}
</script>
<script type="text/javascript">
$("#myapp").addClass('menuon');
</script>
<div class="main">
	<div class="wdyy_b">
		<div class="wdyy_b1">
			<b>我的应用</b>
		</div>
		<div class="wdyy_b2">
			<form id="form1" name="form1" method="post" action=""></form>
		</div>
	</div>
	<!---->
	<div class="wdyy_xuanxiang">
		<ul id="geshichecklist">
			<li><a style="display: block;"
				onclick="javascript:showData('favorite')">我收藏的</a></li>
			<li><a style="display: block;"
				onclick="javascript:showData('visitlog')">我使用的</a></li>
		</ul>
	</div>
	<!---->

	<div class="sd_detailleft">
		<div class="sd_detaillist">
			<ul id="listul">
			</ul>
		</div>
	</div>
	<input type="hidden" id="tag" name="tag" value="" />
	<div class="pageye pagination" id="Pagination"></div>
</div>
<!--main-->

<script>
var defaulturl="${fn:getUrl('img/layout/default.jpg')}";
var appinfourl="${fn:getLink('appcenter/detail.htm?app_id=')}";
</script>


