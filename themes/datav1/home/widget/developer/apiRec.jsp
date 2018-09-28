<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="ssym_detailright">
	<div class="ssym_detailqbyy">
		<div class="ssym_qbyytitle">
			<div>推荐数据集</div>
			<a href="${fn:getLink('catalog/index.htm')}">更多 >></a>
		</div>
		<ul>
			<c:forEach items="${hotCatalogList}" var="cata" varStatus="status"
				begin="0" end="3">
				<li><a
					href="${fn:getLink('catalog/detail.htm')}?cata_id=${cata.id}"
					target="_blank">${fn:subString(cata.name,15)}</a></li>
			</c:forEach>
		</ul>
	</div>

	<div class="ssym_detailqbyy">
		<div class="ssym_qbyytitle">
			<div>推荐API接口</div>
			<a href="${fn:getLink('developer/service/serviceList.htm')}">更多>></a>
		</div>
		<ul>
			<c:forEach items="${apiRecs}" var="api" varStatus="status">
				<li><a
					href="${fn:getLink('developer/service/serviceDetail.htm')}?service_id=${api.service_id}"
					id="${api.service_id}">${fn:subString(api.service_name,15)}</a></li>
			</c:forEach>
		</ul>
	</div>
	<div class="ssym_detailwssymc"></div>
	<div class="ssym_detailgywm">
		<div class="ssym_gywmtitle">
			<div>应用推荐</div>
			<a href="${fn:getLink('appcenter/index.htm')}" class="more">更多 >></a>
		</div>
		<div class="ssym_gywmcontent">
			<c:forEach items="${appInfos_tj}" var="appInfos_tj"
				varStatus="status">
				<div class="ssym_gywmmodel">
					<div class="ssym_gywmlogo">
						<a target="_blank"
							href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_tj.app_id}">
							<c:if test="${empty appInfos_tj.pic_info}">
								<img src="${fn:getUrl('/img/appcenter/default.jpg')}" width="48"
									height="48">
							</c:if> <c:if test="${not empty appInfos_tj.pic_info}">
								<img src="${fn:getDocUrl(appInfos_tj.pic_info)}" width="48"
									height="48">
							</c:if>
						</a>
					</div>
					<div class="ssym_gywmtext">
						<a target="_blank"
							href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_tj.app_id}"
							title="${appInfos_tj.app_alias}">${f:substring(appInfos_tj.app_alias,0,4)}</a>
					</div>
				</div>
			</c:forEach>
		</div>
	</div>
</div>



