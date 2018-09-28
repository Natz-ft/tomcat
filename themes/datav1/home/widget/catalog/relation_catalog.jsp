<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<table align="left" width="100%">
	<c:choose>
		<c:when test="${!empty linkCatalogList }">
			<c:forEach var="catalog" items="${linkCatalogList}"
				varStatus="status">
				<tr class="${(status.index + 1)%2 == 0 ? 'trodd' : 'back_gray'}">
					<td width="5%" align="center">${ status.index + 1}</td>
					<td><a
						href="${fn:getLink('catalog/detail.htm?cata_id=')}${ catalog.cata_id }">${catalog.title}</a></td>
					<td width="15%" align="center">更新周期： <c:if
							test="${dataCatalog.update_cycle == '1' }">不定期</c:if> <c:if
							test="${dataCatalog.update_cycle == '2' }">每天 </c:if> <c:if
							test="${dataCatalog.update_cycle == '3' }">每周 </c:if> <c:if
							test="${dataCatalog.update_cycle == '4' }">每月 </c:if> <c:if
							test="${dataCatalog.update_cycle == '5' }">每季度 </c:if> <c:if
							test="${dataCatalog.update_cycle == '6' }">每半年 </c:if> <c:if
							test="${dataCatalog.update_cycle == '7' }">每年 </c:if></td>
					<td width="15%" align="left">数量：累计${catalog.data_count }条数据</td>
					<td width="22%" align="center">发布时间：${catalog.released_time }</td>
				</tr>
			</c:forEach>
		</c:when>
		<c:otherwise>
			<tr>
				<td align="center">暂无相关数据</td>
			</tr>
		</c:otherwise>
	</c:choose>
</table>