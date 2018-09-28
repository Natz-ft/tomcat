<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>${appinfo.app_name}_浪潮数据开放平台</website:title>
<website:meta name="Keywords" content="${appinfo.tags}" />
<website:meta name="Description" content="${appinfo.description}" />
<script>
var app_id=${appinfo.app_id};
var fav_id=${isFav};
var object_code=${appinfo.app_name};
</script>
<div class="ico">
	<c:if test="${empty appinfo.app_logo}">
		<img src="${fn:getUrl('img/appcenter/default.jpg')}" width="128"
			height="128">
	</c:if>
	<c:if test="${not empty appinfo.app_logo}">
		<img src="${fn:getDocUrl(appinfo.app_logo)}" width="128" height="128">
	</c:if>
</div>
<input type="hidden" id="obj_id" value="${appinfo.app_id}" />
<input type="hidden" id="obj_name" value="${appinfo.app_name}" />
<input type="hidden" id="obj_type" value="3" />
<div class="txt">
	<div class="base_txt">
		<strong>应用名称：</strong>${appinfo.app_name}<br />
		<div class="">
			<strong>发布者：</strong>${appinfo.developer_name}</div>
		<div class="">
			<strong>下载次数：</strong>${appinfo.use_count}次
		</div>
		<strong>标 签：</strong> ${appinfo.tag} <br /> <strong>分 类：</strong>${appinfo.group}
	</div>
	<div class="pf_result">
		<dt>当前评分：</dt>
		<dd>
			<span class="starcon"><span class="starmon"
				style="width:${appinfo.score*20}%"></span></span><span class="app-grade">${appinfo.score}</span>
		</dd>
	</div>
</div>
<div class="anniu">
	<a href="javascript:void(0)" id="favoriteSubmit"
		<c:if test="${isFav>0}">style="display:none"</c:if>><img
		src="${fn:getUrl('img/appcenter/button_1.jpg')}" width="46"
		height="29" align="right"></a> <a href="javascript:void(0)"
		id="cancelFavoriteSubmit"
		<c:if test="${isFav==0}">style="display:none"</c:if>><img
		src="${fn:getUrl('img/appcenter/cancelcol.jpg')}" width="83"
		height="28" align="right"></a> <a
		href="appUse.htm?app_id=${app_id}&feature_id=${appinfo.feature_id}"><img
		src="${fn:getUrl('img/appcenter/button_2.jpg')}" width="83"
		height="28" align="right"></a>
</div>

<div class="yyjj">应用简介</div>
<div class="yyjjtxt">
	<p>${appinfo.description}</p>
</div>
<div class="yytp">应用图片</div>
<div class="yytptxt">
	<c:if test="${empty appinfo.app_preview}">
		<img src="../default/img/appcenter/preview-default.png"
			style="max-width: 497px; max-height: 317px;" align="absmiddle">
	</c:if>
	<c:if test="${!empty appinfo.app_preview}">
		<c:forEach items="${appinfo.app_preview}" var="app_pic">
			<img src="${fn:getDocUrl(app_pic)}"
				style="max-width: 497px; max-height: 317px;" align="absmiddle">
		</c:forEach>
	</c:if>

</div>
<div class="fenxiang bdsharebuttonbox">
	<div style="float: left; font-size: 14px; margin-top: 5px;">分享到：</div>
	<a href="#" class="bds_more" data-cmd="more"></a> <a href="#"
		class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a> <a href="#"
		class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a> <a href="#"
		class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a> <a href="#"
		class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
</div>
<div class="yypf">应用评分</div>
<div class="yypftxt">
	<div class="txt-1">
		<p>平均得分</p>
		<span class="green">${appinfo.score}分</span>
		<p>
			<span class="starcon"><span class="starmon"
				style="width:${appinfo.score*20}%"></span></span>
		</p>
		<p>
			<c:if test="${empty appgrade.total}">0</c:if>
			<c:if test="${!empty appgrade.total}">
				<fmt:formatNumber value="${appgrade.total }" type="number"></fmt:formatNumber>
			</c:if>
			人评分
		</p>
	</div>
	<div class="pingfen_arr">
		<div class="pingfen">
			<div class="xing">
				<span class="black_star"></span> <span class="black_star"></span> <span
					class="black_star"></span> <span class="black_star"></span> <span
					class="black_star"></span>
			</div>
			<c:if test="${appgrade.gcount5==0 }">
				<div class="tiao-gray"></div>
				<div class="pf">0</div>
			</c:if>

			<c:if test="${appgrade.gcount5!=0 }">
				<div class="tiao"></div>
				<div class="pf">${appgrade.gcount5 }</div>
			</c:if>
		</div>

		<div class="pingfen">
			<div class="xing">
				<span class="black_star"></span> <span class="black_star"></span> <span
					class="black_star"></span> <span class="black_star"></span>
			</div>

			<c:if test="${appgrade.gcount4==0 }">
				<div class="tiao-gray"></div>
				<div class="pf">0</div>
			</c:if>

			<c:if test="${appgrade.gcount4!=0 }">
				<div class="tiao"></div>
				<div class="pf">${appgrade.gcount4 }</div>
			</c:if>

		</div>
		<div class="pingfen">
			<div class="xing">
				<span class="black_star"></span> <span class="black_star"></span> <span
					class="black_star"></span>
			</div>
			<c:if test="${appgrade.gcount3==0 }">
				<div class="tiao-gray"></div>
				<div class="pf">0</div>
			</c:if>

			<c:if test="${appgrade.gcount3!=0 }">
				<div class="tiao"></div>
				<div class="pf">${appgrade.gcount3 }</div>
			</c:if>
		</div>
		<div class="pingfen">
			<div class="xing">
				<span class="black_star"></span> <span class="black_star"></span>
			</div>
			<c:if test="${appgrade.gcount2==0 }">
				<div class="tiao-gray"></div>
				<div class="pf">0</div>
			</c:if>

			<c:if test="${appgrade.gcount2!=0 }">
				<div class="tiao"></div>
				<div class="pf">${appgrade.gcount2 }</div>
			</c:if>
		</div>
		<div class="pingfen">
			<div class="xing">
				<span class="black_star"></span>
			</div>
			<c:if test="${appgrade.gcount1==0 }">
				<div class="tiao-gray"></div>
				<div class="pf">0</div>
			</c:if>

			<c:if test="${appgrade.gcount1!=0 }">
				<div class="tiao"></div>
				<div class="pf">${appgrade.gcount1 }</div>
			</c:if>
		</div>
	</div>
	<div class="yypfcomment" style="width: 220px;">
		我来评分：
		<div class="wlpfdiv">
			<span class="wlpfspan"> <b id="pf_1" class="sstar"></b> <b
				id="pf_2" class="sstar"></b> <b id="pf_3" class="sstar"></b> <b
				id="pf_4" class="sstar"></b> <b id="pf_5" class="sstar laststar"></b>
			</span>
		</div>
		<span class="pfms"></span>
	</div>
</div>

<div class="yypl">应用评论</div>
<div class="yypltxt">
	<div class="kuang">
		<label><textarea name="commentContent" id="commentContent"
				cols="83" rows="6" class="textfield" style="width: 697px"></textarea></label>
	</div>
	<div class="button">
		<img src="${fn:getUrl('img/appcenter/fb.png')}" width="70" height="28"
			onclick="addComment(${appinfo.app_id})">
	</div>
</div>
<script type="text/javascript">
$(function () {
	$("#pf_1").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").removeClass('shixing');
		$("#pf_3").removeClass('shixing');
		$("#pf_4").removeClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 1星");
	});
	$("#pf_2").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").removeClass('shixing');
		$("#pf_4").removeClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 2星");
	});
	$("#pf_3").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").addClass('shixing');
		$("#pf_4").removeClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 3星");
	});
	$("#pf_4").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").addClass('shixing');
		$("#pf_4").addClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 4星");
	});
	$("#pf_5").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").addClass('shixing');
		$("#pf_4").addClass('shixing');
		$("#pf_5").addClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 5星");
	});
	$("#pf_1").click(function(event) {
		
		var object_code = $("#app_name").val();
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:app_id,object_code:object_code,score:2,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_2").click(function(event) {
	
	var object_code = $("#app_name").val();
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:app_id,object_code:object_code,score:4,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_3").click(function(event) {
	
	var object_code = $("#versionid").val();
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:app_id,object_code:object_code,score:6,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_4").click(function(event) {
	
	var object_code = $("#versionid").val();
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:app_id,object_code:object_code,score:8,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_5").click(function(event) {
	
	var object_code = $("#versionid").val();
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:app_id,object_code:object_code,score:10,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
			
		});
	});
});
function closePage(){
	window.close();
}
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=86835285.js?cdnversion='+~(-new Date()/36e5)];
</script>
