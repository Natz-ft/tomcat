<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!--热门应用-->
<div class="b-container app-container">
    <div class="g-main">
        <div class="b-head">
            热门应用 <span>/ Hot App</span>
        </div>
        <div class="b-body">
            <div class="app-list">
                <ul>
                    <c:forEach var="appInfo" items="${hotAppList}">
                    	<li>
	                        <a href="#">
	                            <div class="left-part">
	                                <div class="logo-container">
	                                	<c:choose>
											<c:when test="${!empty appInfo.app_logo && !empty appInfo.app_icon  }">
												<image src="${appInfo.app_logo}" class="app-logo"></image>
											</c:when>
											<c:otherwise>
												<image src="${fn:getUrl('/img/common/default_app.jpg')}" class="app-logo"></image>
											</c:otherwise>
										</c:choose>
	                                </div>
	                            </div>
	                            <div class="right-part">
	                                <div class="app-name">${appInfo.app_alias}</div>
	                                <div class="app-score">评分：
	                                    <i class="fa fa-star"></i>
	                                    <i class="fa fa-star"></i>
	                                    <i class="fa fa-star"></i>
	                                    <i class="fa fa-star"></i>
	                                    <i class="fa fa-star"></i>
	                                </div>
	                                <div class="app-system">
	                                    <div class="sys-container green">
	                                        <i class="fa fa-android"></i>
	                                    </div>
	                                    <div class="sys-container blue">
	                                        <i class="fa fa-apple"></i>
	                                    </div>
	                                </div>
	                            </div>
	                        </a>
	                    </li>
	                    </c:forEach>
                    <li>
                        <a href="${fn:getLink('/appcenter/index.htm')}">
                            <div class="more-container">
                                <div class="icon-more icon more-app-icon" style="font-family: 'icomoon' !important;"></div>
                                <div class="more-app">更多应用</div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>