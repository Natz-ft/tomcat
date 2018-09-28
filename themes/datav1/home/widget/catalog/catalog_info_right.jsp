<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="right">
	<div class="zwbk xgsjbq">
		<div class="xgsj">标签</div>
		<ul>
			<c:set var="strs" value="${f:split(dataCatalog.cata_tags,',') }"></c:set>
			<c:choose>
				<c:when test="${null != strs }">
					<c:forEach items="${strs}" varStatus="count" var="str">
						<li><a href="${fn:getLink('catalog/index.htm') }?tag=${str}">${str}</a></li>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<li>暂无标签</li>
				</c:otherwise>
			</c:choose>
		</ul>
	</div>
	<div class="zwbk_1">
		<div class="xgsj">相关数据</div>
		<ul>
			<c:choose>
				<c:when test="${null != linkCatalogList }">
					<c:forEach var="catalog" items="${linkCatalogList}">
						<li><a
							href="${fn:getLink('catalog/detail.htm?cata_id=')}${ catalog.cata_id }">${catalog.title}</a></li>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<li>暂无相关数据</li>
				</c:otherwise>
			</c:choose>
		</ul>
	</div>
	<div class="zwbk zwbk2">
		<div class="xgsj">热门数据</div>
		<ul>
			<c:choose>
				<c:when test="${null != hotCatalogList }">
					<c:forEach var="catalog" items="${hotCatalogList}">
						<li><a
							href="${fn:getLink('catalog/detail.htm?cata_id=')}${ catalog.cata_id }">${catalog.title}</a></li>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<li>暂无热门数据</li>
				</c:otherwise>
			</c:choose>
		</ul>
	</div>
</div>