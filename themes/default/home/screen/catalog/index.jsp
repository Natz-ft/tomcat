<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:title> ${regionStatistics.region_name }公共数据开放平台_数据目录</website:title>
<website:meta name="title" content="数据开放平台_数据目录"/>
<website:meta name="Keywords" content="大数据,数据开放,数据应用"/>
<website:meta name="Description" content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。"/>

<website:style rel="stylesheet" href="css/catalog/catalog.css" />
<website:style rel="stylesheet" href="css/catalog/data-catalog.css" />
<style>
.m-select.sel-corner .sel-title{
	width: 100%
}
.m-select.sel-corner .sel-list{
	width: 100%
}
</style>
<input type="hidden" name="cata_type" value="${cata_type }"/>
<input type="hidden" name="tag_value" value="${keyWords}"/>
<div class="main clearfix">
	<div class="sidebar">
		<div class="side-main">
			<!--  左侧内容开始 -->
			<div class="side-title" niceScroll>
				<c:if test="${empty cata_type}">
				<span><em id="total_count"></em>个数据目录</span>
				</c:if>
				<c:if test="${(not empty cata_type) && cata_type == 'default' }">
				<span><em id="total_count"></em>个政务目录</span>
				</c:if>
				<c:if test="${(not empty cata_type) && cata_type == 'internet' }">
				<span><em id="total_count"></em>个互联网目录</span>
				</c:if>
				<c:if test="${(not empty cata_type) && cata_type == 'social' }">
				<span><em id="total_count"></em>个社会目录</span>
				</c:if>
			</div>
			<div class="side-content side-sort">
				<div class="m-form">
					<label class="form-label">排序方式</label>
					<div class="form-content">
						<select class="sel-corner" name="filter_order_by">
							<option style="width: 125px" value="cc.update_time">更新时间</option>
							<option style="width: 125px" value="s.data_count">数据量</option>
							<option style="width: 125px" value="s.use_visit">访问量</option>
							<option style="width: 125px" value="s.use_file_count">下载量</option>
							<option style="width: 125px"<c:if test="${order == 'use_grade' }"> selected="selected" </c:if>	 value="s.use_grade">评分</option>
						</select> <i id="sort-style" class="fa fa-sort-amount-desc"
							aria-hidden="true"></i>
					</div>
				</div>
			</div>
			<div class="side-title">
				<span>筛选条件</span> <span class="side-remove g-right"><i
					class="fa fa-ban" aria-hidden="true"></i>清空筛选条件</span>
			</div>
			<div class="side-content">
				<div class="side-checked">
					<ul id="filter_container">
					</ul>
				</div>
			</div>
			<div id="left_group_count">
				<div class="side-search">
					<input id="keyword" name="keywords" type="text" class="m-input"
						placeholder="在结果中搜索..." /> <a class="do-search"><i
						class="fa fa-search" aria-hidden="true"></i></a>
				</div>
			</div>
			<!--  左侧内容结束 -->
		</div>
	</div>
	<div class="content">
		<div class="container" style="margin:0 1em 1em 0;">
			<input name="tag" type="hidden" value="" id = "tag"/>
			<input name="grade" type="hidden" value="" id = "grade"/>
			<div class="cata-left">
				<div class="cata-filter">
					<div class="filter-toggle">
						<div class="filter-main">
							<div class="filter-header">关键词：</div>
							<div class="filter-body">
								<ul class="filter-list">
									<li class="active">不限</li>
									<c:forEach var="tag" items="${ tagInfos}">
										<c:if test="${not empty tag.tag_name}">
											<li>${tag.tag_name}</li>
										</c:if>
									</c:forEach>
								</ul>
							</div>
							<div class="filter-tag">更多<i class="fa fa-angle-down" aria-hidden="true"></i></div>
						</div>
						<div class="filter-main">
							<div class="filter-header">评分：</div>
							<div class="filter-body">
								<ul class="filter-list">
									<li data-point="" class="active">不限</li>
									<li data-point="5">5星</li>
									<li data-point="4">4星</li>
									<li data-point="3">3星</li>
									<li data-point="2">2星</li>
									<li data-point="1">1星</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--  主体内容开始 -->
		<div class="m-cata-list">
			<ul id="catalog-list">
			</ul>
		</div>
		<div class="m-page pagination pg-info" id="Pagination"
			style="text-align: right;"></div>

		<!--  主体内容结束 -->
	</div>
</div>
<script>
var cur_subjectId = "${subjectId}";
var cur_orgCode = "${org_code}";
console.log(cur_orgCode);
var web_doc = "${fn:getConfValue('web_down')}";
</script>
<script src="${fn:getUrl('libs/assets/jquery.nicescroll.min.js')}"></script>
<script src="${fn:getUrl('libs/assets/jquery.pagination.js')}"></script>
<script src="${fn:getUrl('js/catalog/catalog.js')}"></script>
