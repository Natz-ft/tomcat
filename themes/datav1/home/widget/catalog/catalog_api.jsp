<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:choose>
	<c:when test="${null != apiList }">
		<table width="970" border="1" id="apidata">
			<tr>
				<th>服务名称</th>
				<th>服务描述</th>
				<th>服务版本号</th>
				<th>服务地址</th>
				<th>操作</th>
			</tr>
			<c:forEach var="api" items="${apiList}">
				<tr>
					<td align="center" valign="middle">${api.service_name }</td>
					<td align="center" valign="middle">${api.service_desc }</td>
					<td align="center" valign="middle">${api.version_name}</td>
					<td align="center" valign="middle">${api.service_uri}</td>
					<td align="center" valign="middle"><a
						href="${fn:getLink('developer/service/serviceDetail.htm')}?service_id=${api.open_service_id}">API明细</a></td>
				</tr>
			</c:forEach>
		</table>
	</c:when>
	<c:otherwise>
		<table width="970" border="1" id="apidata">
			<tr>
				<td colspan="4" style="text-align: center;">暂无服务</td>
			</tr>
		</table>
	</c:otherwise>
</c:choose>