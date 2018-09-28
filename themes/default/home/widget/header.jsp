<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%
String odweb = ConfUtil.getValue("global.index.odweb");
String devweb = ConfUtil.getValue("global.index.odweb");
String ucweb = ConfUtil.getValue("global.index.odweb");
String is_enable_multistation = ConfUtil.getValue("global.is_enable_multistation");
pageContext.setAttribute("odweb", odweb);
pageContext.setAttribute("devweb", odweb);
pageContext.setAttribute("ucweb", ucweb);
pageContext.setAttribute("is_enable_multistation", is_enable_multistation);
%>

<link rel="stylesheet" type="text/css" href="${odweb}/css/uc/public/header.css" />  
<website:script src="${odweb}/js/uc/common/template.js"/>
<website:script src="${odweb}/js/uc/common/loginDialog.js" />
<website:script src="${odweb}/js/uc/md5.js" />
<website:script src="${odweb}/js/uc/detectBrowser.js" />
<style>
.modal {
 z-index: 10001;
}
</style>
<script>
$(function() {
	var afterlogin = function(data){
		var nick_name = getCookie("uc_nick_name");
		if(nick_name!=null){
		nick_name = decodeURIComponent(nick_name);
			var loginhtml = '<span id="loginInfo" onclick="loginInfo()">'+ nick_name + '</span><span> | </span><span id="logout" onclick="logout()">退出</span>';
			if(document.getElementById('bounceIn')!= null){
				document.getElementById('bounceIn').style.display = "none";
				document.getElementById('bounceRe').style.display = "none";
			}
			$(".nav-btn").html(loginhtml);
		}
	}

   var loginDialog = new UCLoginDialog({
   	ucweb: $('#uc_home_url').val(),
   	go: 'http://127.0.0.1/odweb',
   	afterlogin: afterlogin
   });
   
   $('#bounceIn').on("click",
		function() {
	   loginDialog.login();
	})
	
	var region_name = getCookie("region_name");
    region_name = decodeURIComponent(region_name);
    if(region_name!=''&&region_name!=null){
	    document.getElementById("region_name").innerHTML = region_name;
    }
});
</script>

<input type="hidden" id="logoutUrl" value="${fn:getLoginKey('logoutAjax')}"/>
<input type="hidden" id="dataUrl" value="${fn:getConfValue('global.index.odweb')}"/>
<input type="hidden" id="uc_home_url" value="${fn:getConfValue('global.index.odweb')}"/>
<input type="hidden" id="loginAjax" value="${fn:getLoginKey('loginAjax')}"/>
<input type="hidden" id="register_url" value="${fn:getLoginKey('regUrl') }"/>

<div class="sy_header">
        <div class="sy_content">
            <div class="sy_headerleft">
                <span><label id="region_name"></label></span>
				<c:if test="${is_enable_multistation=='1' }">
					<span><a href="${odweb}/changeCity/" style="color:#FF0000;">【切换站点】</a></span>
				</c:if>
            </div>
        </div>
</div>
<div class="sy_line"></div>
<!--页面顶部END-->
<div class="header">
    <div class="g-main">
        <a href="${odweb}/index.htm" class="header-logo">
            <img src="${odweb}/img/uc/common/logo1.png"/>
            <img src="${odweb}/img/uc/common/logo_title.png"/>
            
        </a>
        <form id="searchFormat" action="${odweb}/search/index.htm"
            method="post" onsubmit="return checkSearch();">
        <div class="header-search">
            <select class="sel-corner" id="searchAllType" name="searchAllType">
                <option value="">全部</option>
                <option value="1"
	                <c:if test="${searchAllType == 1}">
	                	selected="selected"
	                </c:if>
                >数据目录</option>
                <option value="3"
	                <c:if test="${searchAllType == 3}">
	                	selected="selected"
	                </c:if>
                >APP应用</option>
                <option value="4"
	                <c:if test="${searchAllType == 4}">
	                	selected="selected"
	                </c:if>
                >API服务</option>
                <option value="5"
	                <c:if test="${searchAllType == 5}">
	                	selected="selected"
	                </c:if>
                >文件资讯</option>
            </select>
            <input type="text" class="m-input" id="searchAllKey" name="searchAllKey"  value="${searchAllKey}"/>
            <a id="searchButton" target="_blank" class="m-btn btn-info"></a>
        </div>
        </form>
    </div>
</div>
<div class="nav">
    <div class="g-main">
        <div class="nav-list">
            <ul>
                <li><a href="${odweb}/index.htm">首页</a></li>
                <li>
                	<a href="javascript:;">数据目录</a>
                 	<ul>
			            <li ><a href="${odweb}/catalog/index.htm?cata_type=default">政务目录</a></li>
			            <li ><a href="${odweb}/catalog/index.htm?cata_type=internet">互联网目录</a></li>
			            <li ><a href="${odweb}/catalog/index.htm?cata_type=social">社会目录</a></li>
			        </ul>
                </li>
                <li><a href="${odweb}/map/index.htm">地图服务</a></li>
                <li><a href="${odweb}/analyse/index.htm">统计服务</a></li>
                <li><a href="${odweb}/relnet/index.htm">关联服务</a></li>
                <li><a href="${odweb}/appcenter/index.htm">应用商店</a></li>
                <li><a href="${odweb}/interact/index.htm">互动交流</a></li>
                <li><a href="${odweb}/dev/developer/index.htm">开发者中心</a></li>
                <li><a href="${odweb}/dev/developer/serviceList.htm">API超市</a></li>
            </ul>
        </div>
        <div class="nav-btn">
        <input type="hidden" id="login_salt" value="${login_salt }">
	        <c:if test="${empty cookie.sso_token }">
	            <button class="m-btn btn-blank btn-corner" id="bounceIn">登录</button>
	            <button class="m-btn btn-info btn-corner" id="bounceRe">注册</button>
            </c:if>
        </div>
    </div>
    <div id="refushhtml" style=""></div>
</div>

<script type="text/javascript">
//登录信息
function loginInfo(){
	var reginUrl = $("#uc_home_url").val() + "/uc/account/account.htm";
	window.location.href = reginUrl;
}

function logout(){
	var logoutUrl = $("#logoutUrl").val();
	var dataUrl = $("#dataUrl").val();
	 $.ajax({
			type : "get",
			url : logoutUrl,
			data:{callback_url:dataUrl+"/index.htm"},
			success : function(data) {
				dialog.info(data.substring(0,7),function(){},2000);
				console.log(data);
				$("#refushhtml").html(data);
			},
			error : function(e) {
				dialog.info("网络异常",function(){},2000);
			}
		});
}

			
//搜索相关
$(function(){

	$("#searchButton").click(function(){
		var flag = checkSearch();
		if(flag){
			$("#searchFormat").submit();
		}
		
	});
	
	//注册
	$('#bounceRe').on("click",
			function() {
				var reginUrl = $("#register_url").val();
				window.location.href = reginUrl;
	});
});

function checkSearch(){
	var searchAllKey = $("#searchAllKey").val();
	
	if(null == searchAllKey || "" == searchAllKey || typeof(searchAllKey) == undefined){	
		dialog.info("搜索关键字不能为空",function(){},2000);
		return false;
	}
	return true;
};
</script>
<script  type="text/javascript" charset="utf-8">
    $(function(){
       	$("#searchAllKey").val("${searchAllKey}");
    	var searchAllType="${searchAllType}";
		$("#searchAllType").val(searchAllType);

		if(searchAllType==1){
		$("div.sel-title").find('span').text("数据目录");
		}else if(searchAllType==3){
		$("div.sel-title").find('span').text("APP应用");
		}else if(searchAllType==4){
		$("div.sel-title").find('span').text("API服务");
		}else if(searchAllType==5){
		$("div.sel-title").find('span').text("文件资讯");
		}else{
		$("div.sel-title").find('span').text("全部");
		}
	});  

</script>
