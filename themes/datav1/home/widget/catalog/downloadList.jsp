<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:forEach var="dataCatalog"
	items="${dataCatalogDownloadPageList.records}" varStatus="status">
	<li><span class="count-ico">${status.count}</span> <a
		href="${fn:getLink('catalog/detail.htm?cata_id=')}${dataCatalog.cata_id}"
		target="_blank">${dataCatalog.title}</a></li>
</c:forEach>