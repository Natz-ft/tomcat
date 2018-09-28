<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:script src="js/appcenter/mainDetail.js" />
<website:style href="css/appcenter/yyxq_style.css" />
<style>
.bdshare_popup_bottom {
	display: none;
}
</style>
<script type="text/javascript">
	var commentUrl = "${fn:getLink('interact/Comment.do')}?method=addComment";
	var contentPath = '${fn:getUrl('')}'; 
	var favoriteSubmit_url = "${fn:getLink('interact/favorite.do') }?method=saveFavorite";
	var add_score="${fn:getLink('interact/grade.do?method=addScore')}";
	var object_type=2;
	var cancelFavoriteSubmit_url = "${fn:getLink('interact/favorite.do') }?method=cancelFavorite";
</script>
<div class="sd_detail">
	<div class="sd_content">
		<div class="sd_detailleft">
			<website:widget path="appcenter/detailContent.jsp" />
		</div>

		<div class="sd_detailright">
			<website:widget path="appcenter/detailRight.jsp" />
		</div>
	</div>
</div>