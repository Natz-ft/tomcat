<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:title>互动交流_${regionStatistics.region_name }政府数据统一开放平台</website:title>
<website:style href="css/interact/hdjl.css" />
<website:style href="css/interact/consult.css" />
<website:style href="css/interact/interact.css" />
<website:style href="css/common/pagination.css" />
<website:script src="js/utils/jquery.pagination.js" />
<style>
.list_header {
	overflow: hidden;
	line-height: 1;
	padding-top: 20px;
}

.body_title_even {
	padding-top: 0;
}

.body_title_even {
	height: auto !important;
}

#listul>li {
	overflow: hidden;
}

.pageye {
	text-align: center;
}
</style>

<div class="content" style="width: 1200px;">
	<div class="banner">
		<img src="${fn:getUrl('img/interact/bannercom.jpg')}" width="100%" />
	</div>
	<div id="mini_navi_box" class="mini_navi_box">
		<div class="mini_navi">
			<span class="mini_icon"></span>&nbsp;你的位置&nbsp; <span
				class="mini_navi_span"> <a href="${fn:getLink('index.jsp')}">首页</a>
				>> <a>互动交流 >> </a><a id="mianbao">最新动态</a>
			</span>
		</div>
	</div>
	<website:widget path="interact/leftmenu.jsp" />
	<div id="interactMainDiv" class="interact_right"></div>
</div>

<script type="text/javascript">
	var widgetName = "${widgetName}";
	function goToNewsList(){
		selectInteractMenu("#newsList");
		switchWidget("newsList");
	}
	function goToSurveyAdd(){
		selectInteractMenu("#surveyAdd");
		switchWidget("surveyAdd");
	}
	function goToAdviceAdd(){
		selectInteractMenu("#adviceAdd");
		switchWidget("adviceAdd");
	}
	function goToNewsDetail(obj_id){
		var param={"res_id":obj_id};
		selectInteractMenu("#newsList");
		switchWidget("newsDetail",param);
	}

	function switchWidget(name, param){
		var widgetUrl = "";  
		if("newsList"==name){
			$("#mianbao").html("最新动态");
			widgetUrl = "${fn:getLink('interact/newsList.jsp')}?isWidget=true";
		}else if("newsDetail"==name){
			$("#mianbao").html("新闻详情");
			widgetUrl = "${fn:getLink('interact/newsDetail.jsp')}?isWidget=true";
		}else if("surveyAdd"==name){
			$("#mianbao").html("需求调查");
			widgetUrl = "${fn:getLink('interact/surveyAdd.jsp')}?isWidget=true";
		}else if("adviceAdd"==name){
			$("#mianbao").html("咨询建议");
			widgetUrl = "${fn:getLink('interact/adviceAdd.jsp')}?isWidget=true";
		}
		requestWidget(widgetUrl, param);
	}
	
	function requestWidget(url, param){
		$("#interactMainDiv").load(url, param, function(data,status){
			//
		});
	}
	
	$(function() {
		if(widgetName=="newsList"){
			goToNewsList();
		}else if(widgetName=="surveyAdd"){
			goToSurveyAdd();
		}else if(widgetName=="adviceAdd"){
			goToAdviceAdd();
		}else{
			goToNewsList();
		}
		
	});
</script>