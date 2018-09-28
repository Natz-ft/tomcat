<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>${regionStatistics.region_name }公共数据开放平台_APP应用</website:title>
<website:meta name="Keywords" content="大数据应用 ,应用查询,便民应用" />
<website:meta name="Description"
	content="应用商店提供水电煤气费查询，社保查询，公积金余额查询，教育培训查询，政务信息查询等与市民生活息息相关的便民在线应用。" />
<website:style href="css/appcenter/style.css" />
<website:style href="css/common/pagination.css" />
<website:style href="css/libs/iconfont/iconfont.css" />
<website:script src="js/utils/qrcode.js" />
<script type="text/javascript">
    var contentPath = '${fn:getLink('')}';
    var appUrl = "${fn:getLink('appcenter/Index.do')}?method=GetAppListByPage";
    var web_doc = "${fn:getConfValue('web_down')}";
    var downAppUse = "${fn:getLink('appcenter/Index.do')}?method=insertUserApp";
    var downloadFile = "${fn:getLink('appcenter/Index.do')}?method=downloadFile";
    var downloadFileUrl = "${fn:getLink('weixin.jsp')}?method=downloadFile";
    
    function  showImg(feature_id){
    	if(feature_id!=null){
    		document.getElementById("wxImg"+feature_id).style.display='block';
    	}
    }
    function hideImg(feature_id){
    	if(feature_id!=null){
    		document.getElementById("wxImg"+feature_id).style.display='none';
    	}
    }
    
    function imgcode(){
    	var docids = document.getElementsByName("docids");
    	if(docids.length!=0){
    		for(var i=0;i<docids.length;i++){
    			if(docids[i].value!=null && docids[i].value!=""){
	    		    var qrcode = new QRCode(document.getElementById("wxImg"+docids[i].value), {
	    		        width : 120,//设置宽高
	    		        height : 120
	    		    });
	    		    var vals = docids[i].value.split(":");
	    		    var androidadds = $("#androidadds"+vals[0]).val();
	    		    qrcode.makeCode(androidadds);
    			}
    		}
    	}
    }
</script>

<div class="banner"
	style="height: 180px;background: url('${fn:getUrl('/img/appcenter/app_banner.png')}') center"></div>
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
								<li class="active">不限</li>
								<c:forEach items="${resGroup}" var="item">
									<li><a rel="${item.group_code}">${item.group_name}</a></li>
								</c:forEach>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="cata-sort">
				<div class="sort-sum" id="sort-sum">共0个应用</div>
				<div class="sort-list">
					<ul>
						<li class="active" rel="zh">综合排序<i
							class="iconfont icon-xiangxiapaixujiantou"></i></li>
						<li rel="hotEst">最热<i
							class="iconfont icon-xiangxiapaixujiantou"></i></li>
						<li rel="newEst">最新<i
							class="iconfont icon-xiangxiapaixujiantou"></i></li>
						<li rel="scorEst">评级<i
							class="iconfont icon-xiangxiapaixujiantou"></i></li>
					</ul>
					<input type="hidden" id="groupId" name="groupId" value="" /> <input
						type="hidden" id="oderlist" name="oderlist" value="">
				</div>
				<div class="sort-demand">
					<input type="text" class="m-input" name="dataKey" id="dataKey"
						vlaue="123" placeholder="在结果中搜索" /> <i class="iconfont">&#xe680;</i>
				</div>
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

<website:script src="js/appcenter/index.js" />
<website:script src="js/common/collection.js" />
