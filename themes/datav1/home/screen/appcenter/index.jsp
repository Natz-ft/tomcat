<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>应用商店_济南市数据开放平台</website:title>
<website:meta name="Keywords" content="大数据应用 ,应用查询,便民应用" />
<website:meta name="Description"
	content="应用商店提供水电煤气费查询，社保查询，公积金余额查询，教育培训查询，政务信息查询等与市民生活息息相关的便民在线应用。" />
<website:script src="js/utils/jquery-1.7.1.min.js" />
<website:style href="css/appcenter/yysd_style.css" />
<div class="sd_carousel">
	<div class="sd_content"></div>
</div>

<div class="sd_detail">
	<div class="sd_content">
		<div class="sd_detailleft">
			<website:widget path="appcenter/right.jsp" />
		</div>
		<div class="sd_detailright">
			<website:widget path="appcenter/left.jsp" />
		</div>
		<div class="zxyy">
			<website:widget path="appcenter/bottom.jsp" />
		</div>
	</div>
</div>