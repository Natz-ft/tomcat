<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:style href="css/appcenter/detail.css" />
<website:style href="css/libs/iconfont/iconfont.css" />
<website:style href="css/common/common.css" />
<website:style href="css/common/commonDetail.css" />
<website:style href="css/common/pagination.css" />
<website:style href="css/dev/developer/common.css" rel="stylesheet" />
<style>
.bdshare_popup_bottom {
	display: none;
}
</style>
<script type="text/javascript">
	var commentUrl = "${fn:getLink('interact/Comment.do')}?method=addComment";
	var add_score="${fn:getLink('interact/grade.do?method=addScore')}";
	var object_type=2;
	var queryMessageUrl = "${fn:getLink('interact/Comment.do')}?method=queryCommentList";
	var contentPath = '${fn:getLink('')}';
</script>
<div class="main">
	<div class="g-main">
		<div class="sidebar side-r">
			<website:widget path="appcenter/detailRight.jsp" />
		</div>
		<div class="container">
			<website:widget path="appcenter/detailContent.jsp" />
		</div>
	</div>
</div>

<website:script src="js/appcenter/detail.js" />
<website:script src="js/common/collection.js" />
<website:script src="libs/assets/jquery.pagination.js" />