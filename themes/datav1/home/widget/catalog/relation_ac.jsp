<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<table align="left" width="100%">
	<c:choose>
		<c:when test="${!empty relateApp}">
			<c:forEach var="app" items="${relateApp}" varStatus="status">
				<tr>
					<td width="5%" align="center">${ status.index + 1}</td>
					<td width="20%">英文名称：${app.app_name}</a></td>
					<td width="20%">中文名称：${app.app_alias}</a></td>
					<td width="30%" align="center">描述： ${app.description}</td>
					<td width="20%" align="center">创建时间：${app.create_time }</td>
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