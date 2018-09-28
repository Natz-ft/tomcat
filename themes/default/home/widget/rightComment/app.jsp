<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
	.sidebar .app-list ul {
		list-style: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
	.sidebar .app-list ul li {
		float: left;
		width: 80px;
		height: 80px;
		padding: 5px;
		margin: 5px 0 5px 10px;
		text-align: center;
		cursor: pointer;
	}
</style>
<div class="cata-app">
	<div class="right-title">
		<span>推荐应用</span>
	</div>
	<div class="app-list">
		<ul>
			<c:forEach items="${appInfos_tj}" var="appInfo_tj">
				<li title="${appInfo_tj.app_alias}"><a href="appDetail.html"
					target="_blank"> <i class="iconfont"> <a target="_blank"
							href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfo_tj.app_id}">
								<c:if test="${empty appInfo_tj.app_icon}">
									<img src="${fn:getUrl('img/appcenter/default.jpg')}" width="48"
										height="48">
								</c:if> <c:if test="${not empty appInfo_tj.app_icon}">
									<img src="${fn:getConfValue('global.index.rcservice')}/doc?doc_id=${appInfo_tj.app_icon}" width="48" height="48">
								</c:if>
						</a>
					</i>
						<div class="app-name">
							<a target="_blank"
								href="${fn:getLink('appcenter/detail.htm')}?app_id=${appInfo_tj.app_id}">${appInfo_tj.app_alias}</a>
						</div>
				</a></li>
			</c:forEach>
		</ul>
	</div>
</div>