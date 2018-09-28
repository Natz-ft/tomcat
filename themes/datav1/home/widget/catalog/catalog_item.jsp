<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<table width="970" border="1" id="yuandata">
	<tr>
		<th width="40px" style="text-align: center;">序号</th>
		<th width="100px" style="text-align: left">英文名称</th>
		<th width="150px" style="text-align: left">中文名称</th>
		<th width="65px" style="text-align: center;">数据格式</th>
		<th width="65px" style="text-align: center;">是否搜索项</th>
		<th width="65px" style="text-align: center;">是否排序项</th>
		<th style="text-align: left">中文描述</th>
	</tr>
	<c:set var="line_num" value="1" />
	<c:forEach var="item" items="${miflist}">
		<c:if test="${item.name_en != 'inspur_id'}">
			<tr class="${line_num%2 == 0 ? 'back_gray' : ''}">
				<td style="text-align: center;">${line_num}</td>
				<td>${item.meta_column_name_en}</td>
				<td class="textleft">${item.name_cn}</td>
				<td style="text-align: center">${item.data_format}</td>
				<td style="text-align: center;"><c:if
						test="${item.is_search!=0}">
												√
											</c:if> <c:if test="${item.is_search==0}">
												×
											</c:if></td>

				<td style="text-align: center;"><c:if
						test="${item.is_order!=0}">
												√
											</c:if> <c:if test="${item.is_order==0}">
												×
											</c:if></td>

				<td title="${item.yw_die }"><c:if test="${empty(item.yw_die)}">无</c:if>
					<c:if test="${!empty(item.yw_die)}">${fn:subString(item.yw_die,10)}</c:if>
				</td>

			</tr>
			<c:set var="line_num" value="${line_num+1 }" />
		</c:if>
	</c:forEach>
</table>