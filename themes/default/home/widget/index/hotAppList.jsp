<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:style href="css/libs/iconfont/iconfont.css" />
<style>
.iconfont {
	font-size: 13px;
}

@media \0screen {
	.panel-app-list .app-info {
		padding-top: 0;
	}
}

</style>
<div class="m-tab tab-panel hot-app">
	<div class="tab-header">
		<ul>
			<li class="active">热门应用</li>
		</ul>
		<a href="${fn:getLink('appcenter/index.htm') }" target="_blank"
			class="more">更多&gt;&gt;</a>
	</div>
	<div class="tab-body">
		<ul>
			<li>
				<div class="panel-app-list">
					<ul>
						<c:forEach var="appInfo" items="${hotAppList}">
							<li>
								<div class="app-icon">
									<c:choose>
										<c:when test="${!empty appInfo.app_logo && !empty appInfo.app_icon  }">
											<img src="${appInfo.app_logo}" width="55px" height="55px"
												title="${appInfo.app_alias }">
										</c:when>
										<c:otherwise>
											<img src="${fn:getUrl('/img/common/default_app.jpg')}"
												width="55px" height="55px" title="${appInfo.app_alias }">
										</c:otherwise>
									</c:choose>
								</div>
								<div class="app-info">
									<div>
										<a
											href="${fn:getLink('appcenter/detail.htm') }?app_id=${appInfo.app_id}"
											target="_blank">${appInfo.app_alias}</a>
									</div>
									<div class="app-type">
										<ul>
											<c:forEach var="appFeature"
												items="${appInfo.appFeatureList }">
												<c:if
													test="${'mac' eq appFeature.platform_type||'linux' eq appFeature.platform_type||'windows' eq appFeature.platform_type}">
													<li><a
														href="${fn:getConfValue('web_down')}${appFeature.app_url}"
														target="_blank" style="color: #65ace9"><i
															class="iconfont">&#xe637;</i>PC版</a></li>
												</c:if>
												<c:if test="${'android' eq  appFeature.platform_type}">
													<li><a
														href="${fn:getConfValue('web_down')}${appFeature.app_url}"
														target="_blank" style="color: #65ace9"><i
															class="iconfont">&#xe6c6;</i>安卓版</a></li>
												</c:if>
												<c:if test="${'ios' eq  appFeature.platform_type}">
													<li><a href="${appFeature.app_url}" target="_blank"
														style="color: #65ace9"><i class="iconfont">&#xe6d8;</i>ios版</a></li>
												</c:if>
											</c:forEach>
										</ul>
									</div>
									<div class="app-star">
   										<c:choose>
										<c:when test="${empty appInfo.appStatistics.avg_grade }">
										<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
										</c:when>	
										<c:when test="${appInfo.appStatistics.avg_grade == 0 }">
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
											</c:when>
											<c:when test="${appInfo.appStatistics.avg_grade>= 2 &&  appInfo.appStatistics.avg_grade<4}">
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
											</c:when>
											<c:when test="${appInfo.appStatistics.avg_grade >= 4 &&  appInfo.appStatistics.avg_grade <6}">
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
											</c:when>
											<c:when test="${appInfo.appStatistics.avg_grade>= 6 &&  appInfo.appStatistics.avg_grade <8}">
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
												
											</c:when>
											<c:when test="${appInfo.appStatistics.avg_grade >= 8 &&  appInfo.appStatistics.avg_grade <10}">
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
											</c:when>
											<c:when test="${appInfo.appStatistics.avg_grade >= 10}">
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
												<i class="iconfont icon-pingfen"></i>
											</c:when>
										</c:choose>
									</div>
								</div>
							</li>
						</c:forEach>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</div>