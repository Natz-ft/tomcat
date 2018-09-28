<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_个人中心_我收藏的数据</website:title>
<website:meta name="title" content="数据开放平台_数据API_大数据"/>
<website:meta name="Keywords" content="大数据,数据开放,数据应用"/>
<website:meta name="Description" content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。"/>
<website:style href="css/libs/iconfont/iconfont.css"/>
<website:style href="css/common/commonList.css" rel="stylesheet" />
<website:style href="css/interact/pagination.css" rel="stylesheet" />
<style>
.item-operation{width:450px!important;}
.main{border-left:none;}
</style>
<div class="main"  style="margin-left: 0;">
    <div>
        <div class="container">
        	<c:if test="${empty collect_list }">
				<div align="center">暂无收藏的数据</div>
			</c:if>
            <div class="cata-main">
                <div class="cata-list">
                    <ul>
                    	<c:forEach items="${collect_list }" var="collect" varStatus="status">
                    	<c:if test="${not empty collect && not empty collect.openCatalog}">
	                        <li class="cata-item" >
	                            <!-- <div class="item-icon"><i class="iconfont icon-ziliaoku"></i></div> -->
	    					<div class="item-icon" >
	                            <c:if test="${empty collect.openCatalog.cata_logo}">
	           						<i class="fa fa-reorder"></i>
		    					</c:if>
            					<c:if test="${not empty collect.openCatalog.cata_logo}">
			   					<i class="iconfont"><img src="${collect.openCatalog.cata_logo }" width="50" height="50"/></i>
		    					</c:if>
		    					</div> 
	                            <div class="item-content">
	                                <div class="item-header" data-cata="${collect.openCatalog.cata_id }">
	                                    <div class="item-operation">
<!-- 	                                     `dataset_type` int(4) NOT NULL COMMENT '数据格式（1：数据集；2：文件集；3：API；4：地图；5：统计；6：图表）', -->
	                                        <ul>
	                                        	<li name="del_collection" data="${collect.openCatalog.cata_id}"><i class="iconfont">&#xe691;</i>取消收藏</li>
	                                           <!--  <li><i class="iconfont icon-fuzhiwenjian"></i>实验</li> -->
	                                           <!--  <li><i class="iconfont">&#xe717;</i>图谱</li>
	                                            <li><i class="iconfont icon-weizhi"></i>地图</li> -->
<!-- 	                                            <li><i class="iconfont icon-shezhi"></i>API</li> -->
													<c:if test="${f:contains(collect.openCatalog.conf_use_type,'3') }">
	                                            		<li target="data-api" class="active"><a href="javascript:;"><i class="fa fa-plug"></i>API服务</a></li>
	                                            	</c:if>
 													 <c:if test="${f:contains(collect.openCatalog.conf_use_type,'4') }">
	                                            		<li target="data-map" class="active"><a href="javascript:;"><i class="fa fa-map"></i>地图服务</a></li>
	                                            	</c:if>
 													<!-- <c:if test="${collect.openCatalog.cata_type==10 }">
	                                            		<li class="active"><a href="${fn:getLink('/relnet/index.htm')}?cata_id=${collect.openCatalog.cata_id }"><i class="fa fa-sitemap"></i>关联服务</a></li>
	                                            	</c:if> -->
	                                            	 <c:if test="${f:contains(collect.openCatalog.conf_use_type,'2') }">
	                                            	 <li target="data-download" class="active"><a href="javascript:;"><i class="fa fa-cloud-download"></i>文件下载</a></li></c:if> 
	                                        </ul>
	                                    </div>
                                 <div class="item-title">
	                                        <span>[数据目录]</span>
	                                        <a href="${fn:getLink('catalog/catalogDetail.htm')}?cata_id=${collect.openCatalog.cata_id}" target="_blank">${collect.openCatalog.cata_title }</a>
	                                    </div>
	                                </div>
	                                <div class="item-body">
	                                    <div class="item-info">
	                                        <div class="item-format">
	                                           <!--  <span class="format format-xml">XML</span>
	                                            <span class="format format-xls">XLS</span>
	                                            <span class="format format-lbs">LBS</span>
	                                            <span class="format format-json">JSON</span>
	                                            <span class="format format-csv">CSV</span> -->
	                                            <c:if test="${not empty collect.catalog_format_list }">
		                                            <c:forEach items="${collect.catalog_format_list }" var="format"> 
		                                            
		                                            	<c:if test="${format=='1' }">
		                                            		<span class="label label-success">XLS</span>
		                                            	</c:if>
		                                            	<c:if test="${format=='2' }">
		                                            		<span class="label label-info">XML</span>
		                                            	</c:if>
		                                            	<c:if test="${format=='3' }">
		                                            		<span class="label label-warning">JSON</span>
		                                            	</c:if>
		                                            	<c:if test="${format=='4' }">
		                                            		<span class="label label-primary">CSV</span>
		                                            	</c:if>
		                                            </c:forEach>
	                                            </c:if>
	                                        </div>
<%-- 	                                        <div class="item-theme">
	                                        	<span>状态：${catalog.cata_is_public_cn}</span>
	                                        </div> --%>
	                                        <div class="item-text">
	                                            <span>来源部门：${collect.openCatalog.org_name}</span>
	                                            <span>所属主题：${collect.cataLogGroupsStr}</span>
	                                            <span>发布时间：<fmt:formatDate value="${collect.openCatalog.conf_released_time}"
														type="both" />
												</span>
	                                        </div>
	                                        <div>${collect.openCatalog.description}</div>
	                                    </div>
	                                </div>
	                            </div>
	                        </li>
	                        </c:if>
	                    </c:forEach>
                    </ul>
                    <c:if test="${!empty catalog_list }">
	                    <div class="ly_ym">
							<div align="center">
								<div id="Pagination" class="pagination"></div>
							</div>
						</div>
					</c:if>
                </div>
            </div>
        </div>
    </div>
</div>
<website:script src="libs/assets/jquery.pagination.js" />
<website:script src="js/interact/list.js" />
<script type="text/javascript">
//增加图标点击事件
$(document).delegate('.item-operation a', 'click', function() {
	var cata_id = $(this).parents(".item-header").attr("data-cata");
	var detailUrl = "../../catalog/catalogDetail.htm?cata_id="+cata_id;
	var target = $(this).parents("li.active").attr("target");
	if(typeof target!= 'undefined'){
		window.open(detailUrl+"&target_tab="+target);
	}
}); 
$(function(){
	$("#mydata").addClass("menuon");
	var code = "${code}";
	// 没有登录，弹出登录页面
	if (code == "0000001") {
		register();
		return;
	}
	var pageSize = 10;
	
	var pageselectCallback = function(page_id, jq) {
		var page = parseInt(page_id) + 1;
		var type = 1;
		window.location.href="myCollectionData.htm?page=" + page + "&pageSize=" + pageSize + "&type=" + type;	
	};
	
	$("#Pagination").pagination("${count}", {
		items_per_page: pageSize, 
		num_edge_entries: 2,
		current_page: "${current_page - 1}",
		num_display_entries: 8,
		callback: pageselectCallback
	});
	
// 	取消收藏
	$("li[name='del_collection']").click(function(){
		var id = $(this).attr("data");
		$.post(
				"myCollectionApi.do?method=delCollection",
			    {"id": id,
					"type":"1"},
			    function(data,status){
			    	if(data.code == "000001"){
			    		register();
			    		return;
			    	}
			    	dialog.info(data.msg,function(){},2000);
			    	window.location.href="myCollectionData.htm";
			    },
			    "json"		
		);
		
	});
	
});	
</script>