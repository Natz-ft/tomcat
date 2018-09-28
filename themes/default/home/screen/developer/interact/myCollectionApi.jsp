<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_个人中心_我收藏的应用</website:title>
<website:meta name="title" content="数据开放平台_数据API_大数据" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<website:style href="css/libs/iconfont/iconfont.css" />
<website:style href="css/common/commonList.css" rel="stylesheet" />
<website:style href="css/interact/pagination.css" rel="stylesheet" />
<script type="text/javascript">
    var contentPath = '${fn:getLink('appcenter/detail.html')}';
</script>
<style>
.main {
	border-left: none;
}
</style>
<div class="main" style="margin-left: 0;">
	<div>
		<div class="container">
			<!--             <div class="cata-sort"> -->
			<!--                 <div class="sort-sum">共1024个结果</div> -->
			<!--                 <div class="sort-demand"> -->
			<!--                     <input type="text" class="m-input" placeholder="在结果中搜索"/> -->
			<!--                     <i class="iconfont">&#xe680;</i> -->
			<!--                 </div> -->
			<!--             </div> -->
			<input type=text id="search_api" value="${search_api }"
				style="display: none;">
			<c:if test="${empty app_list }">
				<div align="center">暂无收藏的应用</div>
			</c:if>
			<div class="cata-main">
				<div class="cata-list">
					<ul>
						<c:forEach items="${app_list }" var="app_info" varStatus="status">
							<li class="cata-item">
								<!--  <div class="item-icon"><i class="iconfont">&#xe6a6;</i></div>-->
								<div class="item-icon">
									<c:if test="${empty app_info.app_icon}">
										<i class="iconfont">&#xe6a6;</i>
									</c:if>
									<c:if test="${not empty app_info.app_icon}">

										<i class="iconfont"><img src="${app_info.logoUrl}"
											width="50" height="50" /></i>
									</c:if>
								</div>
								<div class="item-content">
									<div class="item-header">
										<div class="item-operation">
											<ul>
												<li name="del_collection" data="${app_info.app_id}"><i
													class="iconfont">&#xe691;</i>取消收藏</li>
												<!--<li><i class="iconfont">&#xe6c6;</i>安卓版</li>
	                                            <li><i class="iconfont">&#xe6d8;</i>iPhone版</li>
	                                            <li><i class="iconfont">&#xe637;</i>PC版</li>-->

												<c:forEach var="appFeature"
													items="${app_info.appFeatureList }">
													<c:if
														test="${'linux' eq appFeature.platform_type or 'windows' eq appFeature.platform_type or 'mac' eq appFeature.platform_type or 'window' eq appFeature.platform_type }">
														<li><a
															href="${fn:getLink('appcenter/Index.do')}?method=downloadFile&fileType=share_app_data&fileId=${appFeature.app_url}"
															target="_blank"><i class="iconfont">&#xe637;</i>PC版</a></li>
													</c:if>
													<c:if test="${'android' eq  appFeature.platform_type}">
														<li><a
															href="${fn:getLink('appcenter/Index.do')}?method=downloadFile&fileType=share_app_data&fileId=${appFeature.app_url}"
															target="_blank"><span class="detail-share"
																onMouseOut="hideImg(${appFeature.app_url})"
																onmouseover="showImg(${appFeature.app_url})"><i
																	class="iconfont">&#xe6c6;</i>安卓版</span></a></li>
														<input type="hidden" name="docids"
															value="${appFeature.app_url}">
														<input type="hidden" id="androidadds${appFeature.app_url}"
															value="${fn:getLink('appcenter/Index.do')}?method=downloadFile&fileType=share_app_data&fileId=${appFeature.app_url}">
														<div id="wxImg${appFeature.app_url}"
															style="display: none; height: 50px; back-ground: #f00; position: absolute;"></div>
													</c:if>
													<c:if test="${'ios' eq  appFeature.platform_type}">
														<li><a href="${appFeature.app_url}" target="_blank"><i
																class="iconfont">&#xe6d8;</i>iPhone版</a></li>
													</c:if>
													<c:if test="${'mobile_web' eq appFeature.platform_type }">
														<li><a href="${appFeature.app_url}" target="_blank"><i
																class="iconfont">&#xe637;</i>移动网站</a></li>
													</c:if>
												</c:forEach>
											</ul>
										</div>
										<div class="item-title">
											<span>[数据应用]</span> <a
												href="${fn:getLink('appcenter/detail.html')}?app_id=${app_info.app_id}"
												target="_blank">${app_info.app_name }</a>
										</div>
									</div>
									<div class="item-body">
										<div class="item-info">
											<div class="item-theme">发布者：${app_info.developer_name }</div>
											<div class="item-text">
												<%-- 	                                            <span>使用次数：${app_info.app_name }</span> --%>
												<span>创建时间：${app_info.create_time }</span>
											</div>
											<div>应用描述：${app_info.description }</div>
										</div>
									</div>
								</div>
							</li>
						</c:forEach>

					</ul>
					<c:if test="${!empty api_list }">
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
<%-- <website:script src="js/utils/tags-ball.js" /> --%>
<website:script src="js/interact/list.js" />
<website:script src="js/utils/qrcode.js" />
<script type="text/javascript">
$(function(){
	$("#myapp").addClass("menuon");

	var code = "${code}";
	// 没有登录，弹出登录页面
	if (code == "0000001") {
		register();
		return;
	}
	
	var pageSize = 10;
	
	var pageselectCallback = function(page_id, jq) {
// 		console.log(typeof page_id);
// 		console.log(page_id);
		var page = parseInt(page_id) + 1;
		var type = 3;
		window.location.href="myCollectionApi.htm?page=" + page + "&pageSize=" + pageSize + "&type=" + type;	
	};
	
	$("#Pagination").pagination("${count}", {
		items_per_page: pageSize, 
		num_edge_entries: 2,
		current_page: "${current_page -1}",
		num_display_entries: 8,
		callback: pageselectCallback
	});
	
// 	取消收藏
	$("li[name='del_collection']").click(function(){
		var id = $(this).attr("data");

		$.post(
				"myCollectionApi.do?method=delCollection",
			    {"id": id,"type":"3"},
			    function(data,status){
			    	if(data.code == "000001"){
			    		register();
			    		return;
			    	}
			    	dialog.info(data.msg,function(){},2000);
			    	window.location.href="myCollectionApi.htm";	
			    },
			    "json"		
		);
		
	});
	
});	
function appOnclick(id){
	window.open(contentPath+"?app_id="+id);  
}
//安卓版二维码
function showImg(docid){
	if(docid!=null){
		document.getElementById("wxImg"+docid).style.display='block';
	}
}
function hideImg(docid){
	if(docid!=null){
		document.getElementById("wxImg"+docid).style.display='none';
	}
}

$(function(){
	var docids = document.getElementsByName("docids");
	if(docids.length!=0){
		for(var i=0;i<docids.length;i++){
		    var qrcode = new QRCode(document.getElementById("wxImg"+docids[i].value), {
		        width : 120,//设置宽高
		        height : 120
		    });
		    var androidadds = $("#androidadds"+docids[i].value).val();
		    qrcode.makeCode(androidadds);
		}
	}
});
</script>