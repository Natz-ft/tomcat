<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<website:title>${newsMap.title}_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="${newsMap.keywords}" />
<website:meta name="Description" content="${newsMap.abstracts}" />
<website:style href="css/news/yysd_style.css" />
<website:script src="js/appcenter/mainDetail.js" />
<style>
.bdshare_popup_bottom {
	display: none;
}
</style>
<script>
var commentSubmit_url = "${fn:getLink('interact/comment.do') }?method=addComment";
var object_code = "";
</script>
<div class="main sd_detail">
	<div class="sd_content">
		<div id="left">
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
				<div class="sx">
					<c:if test="${!empty newsMapLast&&!empty newsMapLast.title}">
						<span>上一篇：</span>
						<a
							href="newsDetail.htm?news_id=${newsMapLast.res_id}&resNewsType=0">${newsMapLast.title }</a>
					</c:if>
					<c:if test="${empty newsMapLast||empty newsMapLast.title}">
						<span>上一篇：</span>
						<a style="color: #333">没有了</a>
					</c:if>
					&nbsp; &nbsp; &nbsp; &nbsp;
					<c:if test="${!empty newsMapNext&&!empty newsMapNext.title}">
						<span>下一篇：</span>
						<a
							href="newsDetail.htm?news_id=${newsMapNext.res_id}&resNewsType=0">${newsMapNext.title }</a>
					</c:if>
					<c:if test="${empty newsMapNext||empty newsMapNext.title}">
						<span>下一篇：</span>
						<a style="color: #333">没有了</a>
					</c:if>
				</div>
				<div class="sy_notitleleft" style="margin-left: 20px;">
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

				<div class="pinglun">
					<div class="pl">评论</div>
					<input type="hidden" name="obj_type" id="obj_type" value="3">
					<input type="hidden" name="obj_id" id="obj_id"
						value="${resNews.res_id}">
					<textarea name="content" id="content"
						style="width: 660px; height: 70px"></textarea>
				</div>
				<div class="fb">
					<a><div class="plnr" id="commentSubmit">
							<!-- <img src="/data-portal/img/interact/hd_5.png"> -->
							<img src="${fn:getUrl('img/interact/hd_5.png')}">
						</div></a>
				</div>

			</c:if>
			<c:if test="${empty newsMap }">
				<div class="title">无效记录,您查询的记录有误！</div>
			</c:if>
		</div>

		<div class="sd_detailright">
			<%-- 			<website:widget path="appcenter/detailRight.jsp" /> --%>
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