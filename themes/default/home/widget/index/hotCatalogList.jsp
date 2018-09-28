<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div class="m-tab tab-panel hot-catalog">
	<div class="tab-header">
		<ul>
			<li class="active">热门数据</li>
		</ul>
		<a href="${fn:getLink('catalog/index.htm') }" target="_blank"
			class="more">更多&gt;&gt;</a>
	</div>
	<div class="tab-body">
		<ul>
			<li>
				<div class="panel-cata-list">
					<ul>
						<c:forEach var="cata" items="${hotCatalogList}">
							<li>
								<div class="cata-info">
									<span class="format format-lbs"><img alt=""
										src="${fn:getUrl('img/index/download.png') }">${cata.catalogStatistic.use_file_count
										}</span>
									<span class="format format-csv">${fn:subString2(cata.org_name,5)
										}</span>
								</div>
								<div class="cata-name">
									<a href="catalog/catalogDetail.htm?cata_id=${cata.cata_id}"
										target="_blank">${cata.cata_title}</a>
								</div>
							</li>
						</c:forEach>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</div>