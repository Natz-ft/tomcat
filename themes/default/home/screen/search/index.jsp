<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>搜索结果</website:title>
<website:style href="css/libs/font-awesome.css" />
<website:style href="css/libs/iconfont/iconfont.css" />
<website:style href="css/common/pagination.css" />
<website:style href="css/common/commonList.css" />
<script type="text/javascript">
var contentPath = '${fn:getLink('')}';
var devwebPath = '${fn:getConfValue('global.index.odweb')}';
var resoucrceurl = "${fn:getLink('search/index.do') }?method=SearchByParam";
var searchAllKey = "${searchAllKey}";
var searchAllType = "${searchAllType}";
var web_doc = "${fn:getConfValue('web_doc')}";
</script>
<style>
.container {
	margin-top: 20px;
}
.g-main {
	width: 1200px;
}
.g-main:after {
	content: '';
	display: block;
	clear: both;
}
.sidebar {
	float: left;
	width: 300px;
	padding: 10px;
}
.sidebar.side-r {
	float: right;
}
.container {
	display: block;
	overflow: hidden;
	-webkit-box-shadow: none;
	box-shadow: none;
	margin-left: 0;
}
.container .cata-main .cata-list .cata-item .item-content .item-body .item-format {
    float:none;
    margin-top: 0px;
}
.catalog-list {
	 	padding: 0;
    margin: 0;
    list-style: none;
}
.container .cata-main .cata-list .cata-item {
	  border: 1px solid #ececec;
	  border-bottom-color: #ddd;
	  background: #fff;
	  padding: 1em;
	  overflow: hidden;
	  border-radius: 0.25em;
	  box-shadow:0 1px 2px rgba(0, 0, 0, 0.1);
	  margin-bottom:10px;
}
</style>
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
			</div>
			<div class="filter-toggle">
				<div class="filter-main">
					<div class="filter-header">类别：</div>
					<div class="filter-body">
						<ul class="filter-list">
							<li
								<c:if test="${empty searchAllType}">
				                	class="active"
				                </c:if>>不限</li>
							<li
								<c:if test="${searchAllType == 1}">
				                	class="active"
				                </c:if>><a
								rel="1">数据目录</a></li>
							<li
								<c:if test="${searchAllType == 3}">
				                	class="active"
				                </c:if>><a
								rel="3">APP应用</a></li>
							<li
								<c:if test="${searchAllType == 4}">
				                	class="active"
				                </c:if>><a
								rel="4">API服务</a></li>
							<!--   <li><a rel="4">实验模型</a></li> -->
							<li
								<c:if test="${searchAllType == 5}">
				                	class="active"
				                </c:if>><a
								rel="5">文件资讯</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="cata-sort">
				<div class="sort-sum" id="sort-sum">共0个结果</div>
				<div class="sort-demand">
					<input type="text" class="m-input" name="dataKey" id="dataKey" placeholder="在结果中搜索" value="" />
					<input type="hidden" class="m-input" name="searchAll" id="searchAll" value="${searchAllKey}" />
					<input type="hidden" id="searchType" name="searchType" value="${searchAllType}" /> <i class="iconfont">&#xe680;</i>
				</div>
			</div>
			<div class="cata-main" id="cata-main">
				<div class="cata-list">
					<ul id="catalog-list">
					</ul>
					<div class="m-page pg-info pg-sm">
						<div id="Pagination" class="pagination"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<website:script src="libs/vendor/jquery.min.js" />
<website:script src="js/utils/tags-ball.js" />
<website:script src="libs/vendor/monui/js/form.js" />
<website:script src="libs/assets/jquery.pagination.js" />
<website:script src="js/common/common.js" />
<website:script src="js/search/list.js" />
<website:script src="js/search/index.js" />