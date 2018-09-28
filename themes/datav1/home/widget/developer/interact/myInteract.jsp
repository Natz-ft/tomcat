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
<website:script src="js/interact/interact.js" />
<script>
var interactUrl = "${fn:getLink('interact/myInteract.do') }";
var contentPath = '${fn:getUrl('')}'; 
var pageSize = 5;
</script>

<style>
.sy_nav .sy_content_header_select {
	background-image: url("");
}
</style>

<!--side-->
<div class="main">
	<div class="wdhd_b">
		<div class="wdhd_b1">
			<b>我的互动信息</b>
		</div>
	</div>
	<div class="wdhd_xuanxiang">
		<ul id="geshichecklist">
			<li class="current"><a id="interact_all"
				style="padding-left: 15px; padding-right: 15px; display: block;">全部</a></li>
			<li><a id="interact_msg"
				style="padding-left: 15px; padding-right: 15px; display: block;">留言</a></li>
			<li><a id="interact_request"
				style="padding-left: 15px; padding-right: 15px; display: block;">申请</a></li>
			<li><a id="interact_suggest"
				style="padding-left: 15px; padding-right: 15px; display: block;">建议</a></li>
			<li><a id="interact_correction"
				style="padding-left: 15px; padding-right: 15px; display: block;">纠错</a></li>
		</ul>
	</div>

	<input type="hidden" id="c_type" name="c_type" value="1" />
	<div class="wdhd_n" id="ulist">
		<ul>

		</ul>
	</div>

	<div class="ly_ym">
		<div align="center">
			<div id="Pagination" class="pagination"></div>
		</div>
	</div>
</div>

<script type="text/javascript">
// 绑定表情
$('#face').SinaEmotion($('.emotion'));

// 测试本地解析
function out(){
	var inputText = $('.emotion').val();
	$('#out').html(AnalyticEmotion(inputText));
}
</script>
