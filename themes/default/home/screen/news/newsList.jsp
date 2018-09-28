<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<website:title>数据资讯_${regionStatistics.region_name }公共信息资源开放平台</website:title>
<website:meta name="Keywords" content="数据资讯,数据信息,数据新闻" />
<website:meta name="Description" content="广州市数据开放平台数据更新公告，大数据和开放数据新闻资讯。" />
<website:style href="css/appcenter/style.css" />
<website:style href="css/common/pagination.css" />
<website:style href="css/libs/iconfont/iconfont.css" />
<website:script src="/libs/assets/jquery.pagination.js" />
<script type="text/javascript">
	var Url = "${fn:getLink('news/newsList.do')}?method=queryNewsList";
	 var contentPath = '${fn:getLink('')}';
</script>
<div class="banner"
	style="height: 200px;background: url('${fn:getUrl('/img/news/b_1.png')}') center"></div>
<!--详情BEGIN-->
<div class="main">
	<div class="g-main">
		<div class="sidebar side-r">
			<website:widget path="rightComment/downloadList.jsp" />
			<website:widget path="rightComment/mainTag.jsp" />
			<website:widget path="rightComment/app.jsp" />
		</div>
		<div class="container">
			<div class="cata-filter">
				<div class="filter-selected">
					<div class="selected-title">已选：</div>
					<div class="selected-empty">清除已选属性</div>
					<ul>
						<li><span class="selected-header">类别</span>: <span
							class="selected-body sel-tag"></span> <i class="iconfont">&#xe69e;</i>
						</li>
					</ul>
				</div>
				<div class="filter-toggle">
					<div class="filter-main">
						<div class="filter-header">类别：</div>
						<div class="filter-body">
							<ul class="filter-list">
								<c:forEach items="${NewsColumn}" var="item">
									<li><a rel="${item.column_id}">${item.column_name}</a></li>
									<input type="hidden" id="columnId" name="columnId"
										value="${item.column_id}" />
								</c:forEach>
							</ul>

						</div>
					</div>
				</div>
			</div>
			<div class="cata-sort">
				<div class="sort-sum" id="sort-sum">共0个新闻</div>
			</div>
			<div class="cata-main" id="cata-main">
				<div class="cata-list">
					<ul id="app-list">
					</ul>
					<div class="m-page pg-info pg-sm">
						<div id="Pagination" class="pagination"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<website:script src="js/news/index.js" />