<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="jstlfn" uri="http://java.sun.com/jsp/jstl/functions" %>


<website:title>数据目录详情-数据资源门户</website:title>
<website:meta content=""/>

<!-- 日期选择器，用于目录统计中月份的选择 -->
<website:style href="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.css"/>
<website:script src="libs/assets/bootstrap-datetimepicker/bootstrap-datetimepicker.js"/>

<!-- 代码高亮显示插件 -->
<website:style href="libs/assets/syntaxhighlighter/styles/shCoreEclipse.css"/>
<website:script src="libs/assets/syntaxhighlighter/scripts/shCore.js"/>
<website:script src="libs/assets/syntaxhighlighter/scripts/shBrushJava.js"/>
<website:script src="libs/assets/syntaxhighlighter/scripts/shBrushJScript.js"/>

<!-- Echarts2，用于基本信息中目录统计和关联信息的图谱 -->
<website:script src="libs/assets/echarts/echarts.js"/>

<!-- 页面级通用样式交互 -->
<website:style href="css/catalog/cataDetail.css"/>

<!-- 页面级通用Js -->
<website:script src="js/catalog/cataDetail.js"/>
<website:style href="css/common.css" rel="stylesheet" />
<script>
    //导航条添加选中样式
    $('#pCatalog').addClass('active');
</script>
<div class="g-main">
    <div class="m-panel detail-panel">
        <!-- 详情头部 数据目录简介 widget -->
        <website:widget path="catalog/detail/cataInfo.jsp"/>
        <!-- tab页切换 -->
         <div class="m-dt-tab">
            <div class="dt-tab-header">
                 <input type="hidden" id="cata_id"  name="cata_id" value="${cata_id}" />
                 <input type="hidden" id="details"  name="details" value="${details}" />
                <ul>
                    <li class="active" data-target="dt-base"><i class="fa fa-info-circle" aria-hidden="true"></i>基本信息
                    </li>
	                    <li data-target="dt-meta"><i class="fa fa-columns" aria-hidden="true"></i>数据项</li>
	                <c:if test="${1 == isShowOtherTab}">
	                    <c:if test="${jstlfn:contains(openCatalog.conf_use_type, '1') || jstlfn:contains(openCatalog.conf_use_type, '4')}">
	                    	<li data-target="dt-table"><i class="fa fa-list-ul" aria-hidden="true"></i>数据详情</li>
	                    </c:if>
	                    <c:if test="${jstlfn:contains(openCatalog.conf_use_type, '1') || jstlfn:contains(openCatalog.conf_use_type, '4')}">                   
	                    	<li data-target="dt-chart"><i class="fa fa-bar-chart" aria-hidden="true"></i>数据分析</li>
	                    </c:if>
	                    <c:if test="${jstlfn:contains(openCatalog.conf_use_type, '4')}">
	                    	<li data-target="dt-map"><i class="fa fa-map" aria-hidden="true"></i>数据地图</li>
	                    </c:if>
	                    <li data-target="dt-relate"><i class="fa fa-sitemap" aria-hidden="true"></i>关联信息</li>
                    </c:if>
                    <c:if test="${1 == isShowDownTab}">
                    	<li data-target="dt-file"><i class="fa fa-download" aria-hidden="true"></i>文件下载</li>
                    </c:if>
                    <c:if test="${1 == isShowOtherTab}">
                    	<li data-target="dt-api"><i class="fa fa-usb" aria-hidden="true"></i>API服务</li>
                    </c:if>
                    <li data-target="dt-comment"><i class="fa fa-comments" aria-hidden="true"></i>交流互动</li>
                </ul>
            </div>
            
            <div class="dt-tab-body">
                <ul>
                    <li class="active" id="dt-base">
                        <website:widget path="catalog/detail/cataBase.jsp"/>
                    </li>
                    <li id="dt-meta">
                        <website:widget path="catalog/detail/cataMeta.jsp"/>
                    </li>
                    <c:if test="${(jstlfn:contains(openCatalog.conf_use_type,'1') || jstlfn:contains(openCatalog.conf_use_type,'4'))}">
	                    <li  id="dt-table">
	                        <website:widget path="catalog/detail/cataTable.jsp"/>
	                    </li>
                    </c:if>
                     <c:if test="${(jstlfn:contains(openCatalog.conf_use_type,'1') || jstlfn:contains(openCatalog.conf_use_type,'4'))}">
	                    <li  id="dt-chart">
	                        <website:widget path="catalog/detail/cataChart.jsp"/>
	                    </li>
                    </c:if>
                    <c:if test="${jstlfn:contains(openCatalog.conf_use_type,'4')}">
	                    <li  id="dt-map">
	                        <website:widget path="catalog/detail/cataMap.jsp"/>
	                    </li>
                    </c:if>
                  	<li id="dt-relate">
                        <website:widget path="catalog/detail/cataRelate.jsp"/>
                    </li>
                    <li id="dt-file">
                    <website:widget path="catalog/detail/cataFile.jsp"/>
                    </li>
                    <li id="dt-api">
                        <website:widget path="catalog/detail/cataApi.jsp"/>
                    </li>
                	<li id="dt-comment">
                        <website:widget path="catalog/detail/cataComment.jsp"/>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</div>