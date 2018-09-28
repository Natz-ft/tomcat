<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<website:title>${newsMap.title}_${regionStatistics.region_name }公共信息资源开放平台</website:title>
<website:meta name="Keywords" content="${newsMap.keywords}" />
<website:meta name="Description" content="${newsMap.abstracts}" />
<website:style href="css/news/yysd_style.css" />
<website:script src="js/news/mainDetail.js" />
<style>
.bdshare_popup_bottom {
	display: none;
}

.sidebar.side-r {
	float: right;
}
</style>
<script>
var commentSubmit_url = "${fn:getLink('interact/comment.do') }?method=addComment";
var object_code = "";
</script>
<div class="main sd_detail">
	<div class="g-main sd_content ">
		<div id="left" class="container">
			<c:if test="${not empty newsMap}">
				<div class="title ">
					<h1>
						<strong>${newsMap.title}</strong>
					</h1>
				</div>
				<div class="xian"></div>
				<div class="source">
					<span>时间：<fmt:setLocale value="zh" />
						<fmt:formatDate value="${newsMap.create_time}" /></span>&nbsp;&nbsp;&nbsp;&nbsp;
					<span>来源： <c:if test="${!empty newsMap.provider}">${newsMap.provider}</c:if>
						<c:if test="${empty newsMap.provider}">无</c:if></span>
				</div>
				<c:choose>
					<c:when test="${not empty newsMap.abstracts}">
						<div class="description">
							<span>文章摘要：</span>${newsMap.abstracts}</div>
					</c:when>
				</c:choose>
				<span class="text"
					style="font-size: 16px; line-height: 30px; display: block; padding: 0 20px 0 20px">${newsMap.content}</span>
				<c:if test="${newsMap.directory_id == 5}">
					<div style="text-align: center;">
						<img src="${fn:getUrl('/img/pic/weixin3.png')}" />
					</div>
				</c:if>

				<div class="bdsharebuttonbox fenxiang" style="margin-top: 10px;">
					<div style="float: left; font-size: 14px; margin-top: 5px;">分享到：</div>
					<a href="#" class="bds_more" data-cmd="more"></a> <a href="#"
						class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a> <a
						href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a> <a
						href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a> <a
						href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
				</div>
				<div class="sy_notitleleft"
					style="margin-left: 40px; margin-bottom: 20px;">
					推荐阅读：<br />
					<ul>
						<c:if test="${!empty newsList}">
							<c:forEach var="newsMap" items="${newsList}">
								<li style="margin-top: 10px;"><span class="recread">
										<a target="_blank" title="${newsMap.title}"
										href="newsDetail.htm?news_id=${newsMap.res_id}&resNewsType=0">
											${fn:subString(newsMap.title,60)} </a>
								</span></li>
							</c:forEach>
						</c:if>
					</ul>
				</div>
			</c:if>
			<c:if test="${empty newsMap }">
				<div class="title">无效记录,您查询的记录有误！</div>
			</c:if>
		</div>
		<div class="sidebar side-r">
			<website:widget path="appcenter/detailRight.jsp" />
		</div>

	</div>
</div>

<script type="text/javascript">
function closePage(){
	window.close();
}
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=86835285.js?cdnversion='+~(-new Date()/36e5)];
</script>