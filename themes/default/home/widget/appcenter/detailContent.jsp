<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:style href="libs/assets/slick/slick.css" rel="stylesheet" />
<website:style href="libs/assets/slick/slick-theme.css" rel="stylesheet" />
<website:script src="libs/assets/slick/slick.min.js" />
<website:script src="js/utils/qrcode.js" />
<website:title>${appinfo.app_name}_成都市公共数据开放平台</website:title>
<website:meta name="Keywords" content="${appinfo.tags}" />
<website:meta name="Description" content="${appinfo.description}" />
<website:script src="js/utils/template-native.js" />

<style>
.detail-header .bdshare-button-style0-16 a {
	background-image: none;
}

.bdshare-button-style0-16 a, .bdshare-button-style0-16 .bds_more {
	padding-left: 0px;
}
.wrap-app-img{
	margin:0 10px;
}
.slick-prev:before, .slick-next:before{
	color:#333;
}
.slick-prev {
    left: -20px;
}
.slick-next {
    right: -20px;
}
.wrap-app-img {
	text-align:center;
}
.detail-appimg img{
	width:33%;
	max-height:480px;
	margin: 0 auto;
}
</style>
<script>
var app_id='${appinfo.app_id}';
var app_name='${appinfo.app_name}';
var fav_id='${isFav}';
var object_code='${appinfo.app_name}';
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
			<div
				class="detail-operation bdsharebuttonbox bdshare-button-style0-16 xz_dy xz_dyfx"
				style="margin-right: 5px;">
				<a href="#" class="bds_more" data-cmd="more"
					style="padding-left: 0px"> <span class="detail-share"> <i
						class="iconfont icon-fenxiang" style="color: #1890cf;"></i>

				</span>分享
				</a>

				<script>
								window._bd_share_config = {
									"common" : {
										"bdSnsKey" : {},
										"bdText" : "",
										"bdMini" : "2",
										"bdPic" : "",
										"bdStyle" : "0",
										"bdSize" : "16",
										"bdPopupOffsetTop" : "-40",
										"bdPopupOffsetLeft" : "-40"
									},
									"share" : {}

								};
								with (document)
									0[(getElementsByTagName('head')[0] || body)
											.appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
											+ ~(-new Date() / 36e5)];
							</script>

				<c:if test="${isFav>0}">
					<a> <span class="detail-collection active"
						onclick="cancleCollection('${appinfo.app_id}','3')"><i
							class="iconfont icon-shoucang"></i></span></a>
				</c:if>
				<c:if test="${isFav==0}">
					<a> <span class="detail-collection"
						onclick="collection('${appinfo.app_id}','3','${appinfo.app_name}')"><i
							class="iconfont icon-shoucang"></i></span></a>

				</c:if>
				<c:if test="${appinfo.pc!=null }">
					<a
						href="${fn:getLink('appcenter/Index.do')}?method=downloadFile&fileType=share_app_data&fileId=${appinfo.pc}"
						onclick="useAmount('${appinfo.feature_id}')"><span
						class="detail-share"><i class="iconfont">&#xe67f;</i></span></a>
				</c:if>
				<c:if test="${appinfo.pc==null }">
					<a target="_blank" style="color: #7b7c7d"><span
						class="detail-share"><i class="iconfont">&#xe67f;</i></span></a>
				</c:if>
				<c:if test="${appinfo.android!=null }">
					<input type="hidden" name="docids" value="${appinfo.android}">
					<input type="hidden" id="androidadds${appinfo.android}"
						value="${fn:getLink('appcenter/Index.do')}?method=downloadFile&fileType=share_app_data&fileId=${appinfo.android}">
					<a onclick="useAmount('${appinfo.feature_id}')"
						href="${fn:getLink('appcenter/Index.do')}?method=downloadFile&fileType=share_app_data&fileId=${appinfo.android}"
						target="_blank"><span class="detail-share"
						onMouseOut="hideImg(${appinfo.android})"
						onmouseover="showImg(${appinfo.android})"><i
							class="iconfont">&#xe6c6;</i></span></a>
					<div id="wxImg${appinfo.android}"
						style="display: none; height: 50px; back-ground: #f00; position: absolute;">
						</br>
					</div>
				</c:if>
				<c:if test="${appinfo.android==null }">
					<a target="_blank" style="color: #7b7c7d"><span
						class="detail-share"><i class="iconfont">&#xe6c6;</i></span></a>
				</c:if>
				<c:if test="${appinfo.ios!=null }">
					<a onclick="useAmount('${appinfo.feature_id}')"
						href="${appinfo.ios}" target="_blank"><span
						class="detail-share"><i class="iconfont">&#xe6d8;</i></span></a>
				</c:if>
				<c:if test="${appinfo.ios==null }">
					<a target="_blank" style="color: #7b7c7d"><span
						class="detail-share"><i class="iconfont">&#xe6d8;</i></span></a>
				</c:if>
				<c:if test="${appinfo.inner!=null }">
					<a onclick="useAmount('${appinfo.feature_id}')"
						href="${appinfo.inner}" target="_blank"><span
						class="detail-share"><i class="iconfont">&#xe637;</i></span></a>
				</c:if>
				<c:if test="${appinfo.inner==null }">
					<a target="_blank" style="color: #7b7c7d"><span
						class="detail-share"><i class="iconfont">&#xe637;</i></span></a>
				</c:if>
				<c:if test="${appinfo.website!=null }">
					<c:if test="${appinfo.website_app_open_type==0 }">
						<a onclick="useAmount('${appinfo.feature_id}')"
							href="${appinfo.website}" target="_blank"><span
							class="detail-share"><i class="iconfont">&#xe651;</i></span></a>
					</c:if>
					<c:if test="${appinfo.website_app_open_type==1 }">
						<a onclick="useAmount('${appinfo.feature_id}')"
							href="${appinfo.website}" target="_parent"><span
							class="detail-share"><i class="iconfont">&#xe651;</i></span></a>
					</c:if>
				</c:if>
				<c:if test="${appinfo.website==null }">
					<a target="_blank" style="color: #7b7c7d"><span
						class="detail-share"><i class="iconfont">&#xe651;</i></span></a>
				</c:if>
			</div>
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
		<div class="detail-comment detail-img">
			<div class="comment-title content-title">
				&nbsp;&nbsp;<i class="iconfont">&#xe613;</i>应用图片
			</div>
			<div class="detail-appimg">
				<c:if test="${empty appinfo.app_preview}">
					<div class="wrap-app-img"><img src="${fn:getUrl('/img/appcenter/app.png') }" /></div>
				</c:if>
				<c:if test="${!empty appinfo.app_preview}">
					<c:forEach items="${appinfo.app_preview}" var="app_pic">
						<div class="wrap-app-img"><img src="${app_pic}" max-width="497" max-height="317"
							align="absmiddle"></div>
					</c:forEach>
				</c:if>
			</div>
		</div>
		<div class="detail-comment">
			<div class="comment-title content-title">
				&nbsp;&nbsp;<i class="iconfont icon-icon"></i>评论
			</div>
			<div class="comment-textarea">
				<textarea cols="30" rows="5" name="commentContent"
					id="commentContent"></textarea>
				<div class="comment-star">
					<span>评分</span> <i class="iconfont icon-pingfen"></i> <i
						class="iconfont icon-pingfen"></i> <i
						class="iconfont icon-pingfen"></i> <i
						class="iconfont icon-pingfen"></i> <i
						class="iconfont icon-pingfen"></i></br> <span
						class="comment-description">(点击星号对数据集进行评分)</span> <input
						type="hidden" id="score" name="score" value="" />
				</div>
				<button class="m-btn btn-info" id="comSubmit">评论</button>
			</div>
			<div class="comment-list">
				<ul id="message-list">

				</ul>
				<div class="m-page pg-info pg-sm">
					<div id="Pagination" class="pagination"></div>
				</div>
			</div>
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

$(document).ready(function(){
  $('.detail-appimg').slick({
    infinite: true,
  	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
  	autoplaySpeed: 2000,
  });
});
</script>
