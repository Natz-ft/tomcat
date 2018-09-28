<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:script src="js/utils/jquery-1.7.1.min.js" />
<website:style href="css/appcenter/yysd_style.css" />

<div class="top">最新应用</div>
<div class="main">
	<c:forEach items="${appInfos_new}" var="appInfos_new" varStatus="xh">
		<div class="sd_gywmmodel">
			<div class="sd_gywmlogo">
				<c:if test="${empty appInfos_new.pic_info}">
					<a target="_blank"
						href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_new.app_id}"><img
						src="${fn:getUrl('/img/appcenter/default.jpg')}" width="58"
						height="58"></a>
				</c:if>
				<c:if test="${not empty appInfos_new.pic_info}">
					<a target="_blank"
						href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_new.app_id}"><img
						src="${fn:getDocUrl(appInfos_new.pic_info)}" width="58"
						height="58"></a>
				</c:if>
				<a target="_blank"
					href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfos_new.app_id}">${appInfos_new.app_alias}</a><span
					class="starcon"><span class="starmon"
					style="width:${appInfos_new.score*10}%"></span></span>
			</div>
			<div class="txt">${f:substring(appInfos_new.description,0,40) }...</div>
		</div>
	</c:forEach>
</div>