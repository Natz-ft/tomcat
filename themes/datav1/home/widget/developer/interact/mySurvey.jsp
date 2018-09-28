<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:style href="css/common/pagination.css" />
<website:style href="css/interact/jquery.sinaEmotion.css" />
<website:style href="css/interact/wdhd.css" />
<website:style href="css/common/login.css" />
<website:style href="css/open/header.css" />
<website:script src="js/utils/jquery.js" />
<website:script src="js/common/header.js" />
<website:script src="js/interact/jquery.sinaEmotion.js" />
<website:script src="js/interact/jquery.pagination.js" />
<website:script src="js/interact/main.js" />
<website:script src="js/interact/datefomatUtil.js" />
<website:script src="js/interact/mysurvey.js" />
<script>
	var thisUrl = "${fn:getLink('interact/mySurvey.do') }";
	var pageSize = 5;
</script>
<style>
#ulist div {
	margin-top: 20px;
}
</style>

<!--side-->
<div class="main">
	<div class="wdhd_b">
		<div class="wdhd_b1">
			<b>我的需求调查</b>
		</div>
	</div>

	<div class="wdhd_n" id="ulist"></div>

	<div class="ly_ym">
		<div align="center">
			<div id="Pagination" class="pagination"></div>
		</div>
	</div>
</div>

<script type="text/javascript">
	
</script>
