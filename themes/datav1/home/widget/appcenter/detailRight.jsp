<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="sd_detailqbyy">
	<div class="sd_qbyytitle">
		<a href="${fn:getLink('interact/index.htm?widgetName=')}surveyAdd"><img
			src="${fn:getLink('img/appcenter/pic_dc.jpg') }" height="177" /></a>
	</div>
</div>
<!--应用推荐 -->
<div class="sd_detailgywm">
	<div class="sd_gywmtitle">
		<div>应用推荐</div>
	</div>
	<div class="sd_gywmcontent">
		<c:forEach items="${appInfos_tj}" var="appInfo_tj">
			<div class="sd_gywmmodel">
				<div class="sd_gywmlogo">
					<a target="_blank"
						href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfo_tj.app_id}">
						<c:if test="${empty appInfo_tj.app_logo}">
							<img src="${fn:getUrl('/img/appcenter/default.jpg')}" width="48"
								height="48">
						</c:if> <c:if test="${not empty appInfo_tj.app_logo}">
							<img src="${fn:getDocUrl(appInfo_tj.app_logo)}" width="48"
								height="48">
						</c:if>
					</a>
				</div>
				<div class="sd_gywmtext">
					<a target="_blank"
						href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfo_tj.app_id}">${appInfo_tj.app_alias}</a>
				</div>
			</div>
		</c:forEach>
	</div>
</div>
<!--应用推荐 结束-->

<!-- 应用排行 -->
<div class="sd_detailxzph">
	<div class="sd_xzphtitle">
		<div>应用排行</div>
	</div>
	<div class="sd_xzphcontent">
		<ul id="appList">
			<c:forEach items="${appInfos_hot}" var="appInfos_hot" varStatus="xh">
				<li id="big${appInfos_hot.app_id}" style="display: none"><span
					class="count-ico">${xh.index+1}</span> <c:if
						test="${empty appInfos_hot.app_logo}">
						<a target="_blank"
							href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_hot.app_id}"><img
							src="${fn:getUrl('/img/appcenter/default.jpg')}" width="45"
							height="45" align="middle"></a>
					</c:if> <c:if test="${not empty appInfos_hot.app_logo}">
						<a target="_blank"
							href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_hot.app_id}"><img
							src="${fn:getDocUrl(appInfos_hot.app_logo)}" width="45"
							height="45" align="middle"></a>
					</c:if>
					<div class="yyphtitle">
						<a target="_blank"
							href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_hot.app_id}"><strong>${appInfos_hot.app_alias}</strong></a>
						<br /> <span class="gray">使用${appInfos_hot.use_amount}次</span>
					</div></li>
				<li id="small${appInfos_hot.app_id}"><span class="count-ico">${xh.index+1}</span><a
					href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_hot.app_id}">${appInfos_hot.app_alias}</a>
					<div class="sd_xzphico">
						<span class="gray">${appInfos_hot.use_amount}次</span>
					</div></li>
			</c:forEach>
		</ul>
	</div>
</div>
<!-- 应用排行结束 -->