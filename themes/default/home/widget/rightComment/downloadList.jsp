<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
	.cata-rank {
		margin-bottom: 20px;
	}
	.right-title {
		margin-bottom: .5em;
		border-bottom: 1px solid #dadada;
		line-height: 2;
		font-size: 16px;
		font-family: "Microsoft Yahei";
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cata-rank .rank-list {
		line-height: 30px;
		margin-left: 5px;
	}
	.sidebar .right-title span {
		padding: 0 10px;
		display: inline-block;
		border-bottom: 2px solid #cc0000;
	}
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
	}
</style>
<div class="cata-rank">
	<div class="right-title">
		<span>下载排行</span>
	</div>
	<ul class="rank-list">
		<c:forEach var="dataCatalog" items="${dataCatalogDownloadPageList}"
			varStatus="status">
			<li><span>${status.count}</span> <a
				href="${fn:getLink('catalog/catalogDetail.htm?cata_id=')}${dataCatalog.cata_id}"
				target="_blank">${dataCatalog.cata_title}</a></li>
		</c:forEach>
	</ul>
</div>
