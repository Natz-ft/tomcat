<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>

<div style="min-height: 400px; background: #fff; padding: 10px;">
	<div>
		<div
			style="font-size: 16px; font-weight: bolder; text-align: center; margin: 20px auto;">
			<label>${newsInfo.title}</label> <br />
			<c:if test="${!empty newsInfo.provider}">
				<label style="font-size: 12px;">来源： ${newsInfo.provider}
			</c:if>
			</label> <label style="font-size: 12px;">发布日期： <fmt:formatDate
					value="${newsInfo.issue_time}" type="date" dateStyle="medium" />
			</label>
		</div>
		<div>${newsInfo.content}</div>
	</div>
</div>


