<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:style href="css/dev/developer/service/style.css" />
<website:style href="css/dev/developer/ytyj_style.css" />
<website:style href="css/dev/developer/pagination.css" />
<website:style href="libs/assets/bootstrap/css/bootstrap.css" />
<website:script src="libs/assets/bootstrap/bootstrap.js" />
<script type="text/javascript">
var applylist_url = "${fn:getLink('dev/console/applyedServiceList.do')}";
var applylist = "${fn:getLink('dev/console/applyedServiceList.do?method=queryMyApplyList')}";
var collectionlist = "${fn:getLink('dev/console/applyedServiceList.do?method=myCollectionService')}";

var serviceDetailUrl = "${fn:getLink('dev/developer/serviceDetail.htm?service_id=')}";
var serviceApplyUrl = "${fn:getLink('dev/console/serviceApply.htm?service_id=')}";
</script>
<script type="text/javascript">
$("#applyedServiceList").addClass('menuon');
</script>
<style>
.kfz_main{
	padding-left: 0px;
}
</style>
<div class="kfz_main">
	<div class="kfz_right">
			<ul id="myTab" class="nav nav-tabs" style="height: 43px;">
			    <li class="active"><a href="#passed" data-toggle="tab">已授权服务</a></li>
			    <li><a href="#created" data-toggle="tab">未授权服务</a></li>
			    <li><a href="#collection" data-toggle="tab">收藏服务</a></li>
			</ul>
			<div id="myTabContent" class="tab-content" style="margin-top: 10px;">
			    <div class="tab-pane fade in active" id="passed">
			       <table class="m-table table-bordered table-info" id="applyedService-passed" cellspacing="0" width="100%">
			             <thead>
			             <tr>
			                 <th>服务名称</th>
			                 <th>应用名称</th>
			                 <th>申请时间</th>
			                 <th>操作</th>
			             </tr>
			             </thead>
			             <tbody></tbody>
			        </table>
			    </div>
			    <div class="tab-pane fade" id="created">
					<table class="m-table table-bordered table-info" id="applyedService-created" cellspacing="0" width="100%">
			             <thead>
			             <tr>
			                 <th>服务名称</th>
			                 <th>应用名称</th>
			                 <th>申请时间</th>
			                 <th>操作</th>
			             </tr>
			             </thead>
			             <tbody></tbody>
			        </table>
			    </div>
			    <div class="tab-pane fade" id="collection">
			        <table class="m-table table-bordered table-info" id="applyedService-collection" cellspacing="0" width="100%">
			             <thead>
			             <tr>
			                 <th>服务名称</th>
			                <!--  <th>扩展信息</th> -->
			                 <th>收藏时间</th>
			                 <th>操作</th>
			             </tr>
			             </thead>
			             <tbody></tbody>
			        </table>
			    </div>
			</div>
	</div>
</div>
<website:script src="js/dev/developer/applyed-service.js" />