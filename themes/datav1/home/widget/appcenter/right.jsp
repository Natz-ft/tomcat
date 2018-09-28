<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:script src="js/utils/jquery-1.7.1.min.js" />
<website:script src="js/appcenter/main.js" />
<script src="../js/utils/jquery.pagination.js"></script>
<link href="../css/common/pagination.css" rel="stylesheet"
	type="text/css" />
<website:style href="css/appcenter/yysd_style.css" />

<script type="text/javascript">
    var appUrl = "${fn:getLink('appcenter/Index.do')}?method=GetAppListByPage";
	var doc_url = "${fn:getDocUrl('')}";
</script>

<div class="sd_detailtjzy">
	<ul>
		<li style="height: 40px"><strong>排序方式：</strong></li>
		<li class="current"><a id="hotEst">最热<span class="jiantou"></span></a>
		</li>
		<li><a id="newEst">最新<span class="jiantou"></span></a></li>
		<li><a id="scorEst">评级<span class="jiantou"></span></a></li>
	</ul>
</div>
<div class="sd_detaillist">
	<ul id="listul">
		<c:forEach items="${appInfo}" var="appInfpo">

		</c:forEach>
	</ul>
</div>
<input type="hidden" id="oderlist" name="oderlist" value="">
<div class="pageye">
	<div id="Pagination" class="pagination"></div>
</div>