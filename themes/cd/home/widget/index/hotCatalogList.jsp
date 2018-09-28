<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!--数据中心-->
<%--<div class="b-container data-container">
    <div class="g-main">
        <div class="b-head">数据中心</div>
        <div class="b-body">
            <div class="data-list">
                <div class="data-block">
                    <div class="data-title-container">
                        <div class="title-name new-more">最新数据</div>
                        <div class="title-more "><a href="${fn:getLink('/catalog/index.htm?type=1')}">MORE</a></div>
                    </div>
                    <ul>
                        <c:forEach var="cata" begin='0'  end='3' items="${newCatalogList}">
							<li>
								<div class="d-list-title">
	                                <div class="d-list-name">
	                                    <a href="catalog/catalogDetail.htm?cata_id=${cata.cata_id}" target="_blank">${cata.cata_title}</a>
	                                </div>
	                                <div class="d-list-date">${cata.update_time }</div>
	                            </div>
	                            <div class="d-list-content">${cata.org_name}</div>
							</li>
						</c:forEach>
                    </ul>
                </div>
                <div class="data-block hot-data">
                    <div class="data-title-container">
                        <div class="title-name hot-more">热门数据</div>
                        <div class="title-more "><a href="${fn:getLink('/catalog/index.htm?type=2')}">MORE</a></div>
                    </div>
                    <ul>
                    	<c:forEach var="hotCata" begin='0'  end='5' items="${hotCatalogList}">
                    		<li>
	                            <div class="d-list-title">
	                                <div class="d-list-name">
	                                    <a href="catalog/catalogDetail.htm?cata_id=${hotCata.cata_id}" target="_blank">${hotCata.cata_title}</a>
	                                </div>
	                                <div class="d-list-date">${hotCata.catalogStatistic.use_file_count} 次下载</div>
	                            </div>
	                        </li>
						</c:forEach>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>--%>


<div class="data-block">
    <div class="data-title-container">
        <div class="title-name new-more">最新数据</div>
        <div class="title-more "><a href="${fn:getLink('/catalog/index.htm?type=1')}">更多</a></div>
    </div>
    <ul class="new-list">
        <c:forEach var="cata" begin='0'  end='7' items="${newCatalogList}">
            <li>
                <div class="d-list-title">
                    <div class="d-list-name">
                        <a href="catalog/catalogDetail.htm?cata_id=${cata.cata_id}" target="_blank">${cata.cata_title}</a>
                    </div>
                    <div class="d-list-dating">${cata.update_time}</div>
                </div>
                <%--<div class="d-list-content">${cata.org_name}</div>--%>
            </li>
        </c:forEach>
    </ul>
</div>
<div class="data-block">
    <div class="data-title-container">
        <div class="title-name hot-more">热门数据</div>
        <div class="title-more "><a href="${fn:getLink('/catalog/index.htm?type=2')}">更多</a></div>
    </div>
    <ul class="hot-list">
        <c:forEach var="hotCata" begin='0'  end='7' items="${hotCatalogList}">
            <li>
                <div class="d-list-title">
                    <div class="d-list-name">
                        <a href="catalog/catalogDetail.htm?cata_id=${hotCata.cata_id}" target="_blank">${hotCata.cata_title}</a>
                    </div>
                    <div class="d-list-date">${hotCata.catalogStatistic.use_file_count} 次下载</div>
                </div>
            </li>
        </c:forEach>
    </ul>
</div>

