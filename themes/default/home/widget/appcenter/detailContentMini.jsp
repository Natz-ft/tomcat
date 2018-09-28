<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:script src="js/utils/qrcode.js" />
<website:script src="libs/vendor/jquery.min.js" />
<website:title>${appinfo.app_name}_成都市公共信息资源开放平台</website:title>
<website:meta name="Keywords" content="${appinfo.tags}" />
<website:meta name="Description" content="${appinfo.description}" />
<website:script src="js/utils/template-native.js" />
<website:style href="css/appcenter/detail.css"/>
<website:style href="css/libs/iconfont/iconfont.css"/> 
<website:style href="css/common/commonDetail.css"/> 

<style>
.detail-header .bdshare-button-style0-16 a {
	background-image: none;
}

.bdshare-button-style0-16 a, .bdshare-button-style0-16 .bds_more {
	padding-left: 0px;
}
}
</style>
<script>
var app_id='${appinfo.app_id}';
var app_name='${appinfo.app_name}';
var fav_id='${isFav}';
var object_code='${appinfo.app_name}';
</script>
<style>
.detail-right .right-title {
	padding-bottom: 20px;
}
</style>
<div class="detail-right">
	<div class="right-title">
		<div class="detail-icon">
			<c:if test="${empty appinfo.app_icon}">
				<i class="iconfont">&#xe6fa;</i>
			</c:if>
			<c:if test="${not empty appinfo.app_icon}">
				<img
					src="${fn:getConfValue('global.index.rcservice')}/doc?doc_id=${appinfo.app_icon}"
					width="88" height="88">
			</c:if>
		</div>
		<div class="detail-header">
			<span class="detail-title">${appinfo.app_name}</span>
		</div>
		<div class="detail-simple-info">
			<div>发布者：${appinfo.developer_name}</div>
			<div class="app-star">评分：
				<c:choose>
					<c:when test="${empty appinfo.scores  }">
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
					</c:when>
					<c:when test="${appinfo.scores == 0 }">
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
					</c:when>
					<c:when
						test="${appinfo.scores >= 2 &&  appinfo.scores <4}">
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
					</c:when>
					<c:when
						test="${appinfo.scores >= 4 &&  appinfo.scores <6}">
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
					</c:when>
					<c:when
						test="${appinfo.scores>= 6 &&  appinfo.scores<8}">
					<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>

					</c:when>
					<c:when
						test="${appinfo.scores >= 8 &&  appinfo.scores <10}">
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
							style="color: rgb(153, 153, 153);"></i>
					</c:when>
					<c:when test="${appinfo.scores >= 10}">
					<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
						<i class="iconfont icon-pingfen"
						style="color: rgb(252, 101, 7);"></i>
					</c:when>
				</c:choose>
			</div>
		</div>
		
		<div class="detail-comment">
			<div class="comment-title content-title">
				&nbsp;&nbsp;<i class="iconfont">&#xe68f;</i>应用简介
			</div>
			<div class="detail_content">${appinfo.description}</div>
		</div>
	</div>
	<script
		src="${fn:getUrl('libs/assets/jquery-sinaEmotion/jquery-sinaEmotion.js')}"></script>
	<script
		src="${fn:getUrl('libs/assets/jquery.tagsinput/jquery.tagsinput.js')}"></script>
	<script src="${fn:getUrl('libs/assets/jquery.nicescroll.min.js')}"></script>
	<script>
function useAmount(feature_id){
	$.ajax({
		type : "POST",
		url : getRootPath()+"/appcenter/Index.do?method=AddUseAmount",
		data : {
			"feature_id":feature_id,
		},
		dataType : "json",
		success : function(data) {
		},
		error : function(data) {
		}
	});
}
</script>