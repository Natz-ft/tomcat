<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:title>开发者中心_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="数据开发,数据API,免费开发" />
<website:meta name="Description"
	content="开发者中心面向所有类型开发者，为开发者集中提供开发、托管、提交、推广、统计分析、换量、变现等全流程服务。目前具备web应用和网站两种合作类型，包含开发支持、运营支持、渠道推广和商业变现四大主要业务。" />
<website:style href="css/developer/ytyj_style.css" />
<website:style href="css/developer/style.css" />
<website:script src="js/developer/main.js" />
<website:script src="js/correction/correction.js" />
<script type="text/javascript">
var isLogin_url="${fn:getLink('interact/correctionFd.do') }?method=isLogin";
</script>
<style>
</style>
<div class="kfz_title">
	<div class="kfz_banner">
		<img src="${fn:getLink('/img/dev/img/kfzzx_banner2.png')}" alt="">
		<a id="appintroduce" href="javascript:void(0)">
			<div class="kfz_tjapp"></div>
		</a>
	</div>
</div>
<div class="kfz_update">
	<div class="kfz_scroll" id="scroll_div">
		<div class="kfz_sbegin" id="scroll_begin">
			<c:forEach items="${news_gg }" var="news" varStatus="status">
						·<a
					href="${fn:getLink('news/newsDetail.htm') }?news_id=${news.res_id}&res_type=${news.res_type}"
					target="_blank">${news.title}</a>
				<c:if test="${status.index<=1 }">
					<em class="sy_checked"></em>
				</c:if>
			</c:forEach>

		</div>
		<div class="kfz_send" id="scroll_end"></div>
	</div>
</div>
<div class="kfz_main">
	<div class="kfz_middle">
		<div class="kfz_intro">
			<ul>
				<li><a target="_blank" href="${fn:getLink('catalog/') }"><div
							class="kfz_bico bico1"></div></a>
					<div class="kfz_doc">
						<div class="kfz_btitle">
							<a target="_blank" href="${fn:getLink('catalog/') }">海量数据</a>
						</div>
						<div class="kfz_detail">
							<a target="_blank" href="${fn:getLink('catalog/') }">基于海量数据进行应用开发</a>
						</div>
					</div></li>
				<li><a target="_blank"
					href="${fn:getLink('developer/service/serviceList.htm') }"><div
							class="kfz_bico bico2"></div></a>
					<div class="kfz_doc">
						<div class="kfz_btitle">
							<a target="_blank"
								href="${fn:getLink('developer/service/serviceList.htm') }">服务接口</a>
						</div>
						<div class="kfz_detail">
							<a target="_blank"
								href="${fn:getLink('developer/service/serviceList.htm') }">利用服务接口实时获取数据</a>
						</div>
					</div></li>
				<li id="appcreate"><a href="javascript:void"><div
							class="kfz_bico bico3"></div></a>
					<div class="kfz_doc">
						<div class="kfz_btitle">
							<a href="javascript:void()">应用接入</a>
						</div>
						<div class="kfz_detail">
							<a
								href="${fn:getConfValue('global.index.devweb')}/console/appCreate.htm">开发移动端应用或接入外部应用</a>
						</div>
					</div></li>
				<li><a target="_blank" href="${fn:getLink('appcenter/') }"><div
							class="kfz_bico bico4"></div></a>
					<div class="kfz_doc">
						<div class="kfz_btitle">
							<a target="_blank" href="${fn:getLink('appcenter/') }">应用推广</a>
						</div>
						<div class="kfz_detail">
							<a target="_blank" href="${fn:getLink('appcenter/') }">方便地利用平台资源推广应用</a>
						</div>
					</div></li>
			</ul>
		</div>
		<div class="kfz_interface">
			<div class="kfz_facetitle">
				<img src="${fn:getUrl('/img/dev/img/ico_command.jpg')}" alt="">
				<a href="${fn:getLink('developer/service/serviceList.htm') }">推荐接口服务</a>
			</div>
			<!--  
			<div class="kfz_facelist">
				<ul>
					<c:forEach items="${apiRec }" var="api" varStatus="status">
						<li><span class="kfz_flist"></span><a href="${fn:getLink('developer/service/serviceDetail.htm') }?service_id=${api.service_id}"  id="${api.service_id}">${fn:subString(api.service_name,15)}</a></li>
					</c:forEach>
				</ul>
			</div>
			-->
			<div class="kfz_facebutton">
				<%-- <a href="javascript:void(0)" id="corBtn"><img src="${fn:getLink('/img/dev/img/btn_1.png')}" alt=""></a> --%>
				<c:if test="${devId == 0 || devId == '0'}">
					<a
						href="${fn:getConfValue('global.index.devweb')}/open/developer.htm"><img
						src="${fn:getUrl('/img/dev/img/btn_1.png')}" alt=""></a>
				</c:if>
				<c:if
					test="${devId != 0 && devId != '0' && devId != -1 && devId != '-1'}">
					<a
						href="${fn:getConfValue('global.index.devweb')}/console/appCreate.htm">创建应用</a>
				</c:if>
				<c:if test="${devId == -1 || devId == '-1'}">
					<a href="javascript:;" id="login">请先登录</a>
				</c:if>
			</div>
		</div>
	</div>
	<div class="kfz_opera">
		<div class="kfz_otitle">作为开发者，您可以</div>
		<div class="kfz_odetail">
			<div class="kfz_omain">
				<div class="kfz_oimg oimg1"></div>
				<div class="kfz_oico">1</div>
				<div class="kfz_otxt">创建应用</div>
			</div>
			<div class="kfz_arrow"></div>
			<div class="kfz_omain">
				<div class="kfz_oimg oimg2"></div>
				<div class="kfz_oico">2</div>
				<div class="kfz_otxt">申请服务</div>
			</div>
			<div class="kfz_arrow"></div>
			<div class="kfz_omain">
				<div class="kfz_oimg oimg3"></div>
				<div class="kfz_oico">3</div>
				<div class="kfz_otxt">认证授权</div>
			</div>
			<div class="kfz_arrow"></div>
			<div class="kfz_omain">
				<div class="kfz_oimg oimg4"></div>
				<div class="kfz_oico">4</div>
				<div class="kfz_otxt">开发应用</div>
			</div>
			<div class="kfz_arrow"></div>
			<div class="kfz_omain">
				<div class="kfz_oimg oimg5"></div>
				<div class="kfz_oico">5</div>
				<div class="kfz_otxt">审核发布</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(function() {
		$("#login").click(function(){
			register();
		});
		
		$("#appintroduce").click(function(){
			$.ajax({
				url: isLogin_url,
				type: "POST",
				data: {
				},
				success: function(data) {
					if(data.code=='000000'){
						developerApply();
					}
					
					if(data.code=='000001'){
						register();
						
						
					}
				},
				error: function(data) {
					easyDialog.open({
						container : {
							content : "网络错误！"
						},
						autoClose : 2000
					});
				},dataType:"json"
			});
		});
		$("#appcreate").click(function(){
			$.ajax({
				url: isLogin_url,
				type: "POST",
				data: {
				},
				success: function(data) {
					if(data.code=='000000'){
						developerApply();
					}
					
					if(data.code=='000001'){
						register();
						
						
					}
				},
				error: function(data) {
					easyDialog.open({
						container : {
							content : "网络错误！"
						},
						autoClose : 2000
					});
				},dataType:"json"
			});
		});
		
		$("#corBtn").click(function(){

			$.ajax({
				url: isLogin_url,
				type: "POST",
				data: {
				},
				success: function(data) {
					debugger
					developerApply();
     				/*if(data.code=='000000'){
						developerApply();
					}
					
					if(data.code=='000001'){
						register();
						
						
					}*/
				},
				error: function(data) {
					easyDialog.open({
						container : {
							content : "网络错误！"
						},
						autoClose : 2000
					});
				},dataType:"json"
			});
		});
		
		
		ScrollImgLeft();
		
		function developerApply(){
			var devApply_url = "${fn:getConfValue('global.index.devweb')}/open/appCreate.htm";
			var uid = "${userInfo.uid}";
			$.ajax({
				url: devApply_url,
				type: "POST",
				data: {
					uid:uid,
				},
				success: function(res) {
					 /* if(res==0)
						{ */
							location.href = "${fn:getConfValue('global.index.devweb')}/open/appCreate.htm";
				/* 		}
					else{
						window.open("${fn:getConfValue('web_uc_context')}developer/devApplyNotice.htm"); */
							/*easyDialog.open({
			    				container : {
			    					content : '已申请，请等待审核！'
			    				},
			    				autoClose : 1000
			    			});*/
					/* }  */
				},
				error: function(res) {
					location.href = "${fn:getConfValue('global.index.devweb')}/open/appCreate.htm";
				/*	easyDialog.open({
						container : {
							content : "网络错误！"
						},
						autoClose : 2000
					});*/
				},dataType:"json"
			});
		}
	});
	</script>
