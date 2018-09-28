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
pageContext.setAttribute("devweb", devweb);
pageContext.setAttribute("ucweb", ucweb);
pageContext.setAttribute("is_enable_multistation", is_enable_multistation);
%>
<link rel="stylesheet" type="text/css" href="${ucweb}/css/uc/public/header.css" />
<%--<website:script src="${ucweb}/js/common/template.js"/>
<website:script src="${ucweb}/js/common/loginDialog.js" />--%>
<website:script src="${odweb}/js/uc/common/template.js"/>
<website:script src="${odweb}/js/uc/common/loginDialog.js" />
<website:script src="${ucweb}/js/uc/md5.js" />
<website:script src="${ucweb}/js/uc/detectBrowser.js" />
<website:style href="${ucweb}/cd/css/common/common-cd.css" rel="stylesheet" />
<website:style href="${ucweb}/css/common/icon/style.css" rel="stylesheet" />
<website:style href="${ucweb}/libs/vendor/font-awesome/font-awesome.min.css" rel="stylesheet" />

<script>
    var loginDialog = null;
$(function() {
    var afterlogin = function(data){
		var nick_name = getCookie("uc_nick_name");
		if(nick_name!=null){
		nick_name = decodeURIComponent(nick_name);
			var loginhtml = '<span id="loginInfo" onclick="loginInfo()">'+ nick_name + '</span><span> | </span><span id="logout">退出</span>';
			if(document.getElementById('bounceIn')!= null){
				document.getElementById('bounceIn').style.display = "none";
				document.getElementById('bounceRe').style.display = "none";
			}
			$(".m-login").html(loginhtml);
		}
	}

   loginDialog = new UCLoginDialog({
   	ucweb: $('#uc_home_url').val(),
   	go: 'http://127.0.0.1/odweb',
   	afterlogin: afterlogin
   });


	/* var region_name = getCookie("region_name");
    region_name = decodeURIComponent(region_name);
    if(region_name!=''&&region_name!=null){
	    document.getElementById("region_name").innerHTML = region_name;
    } */
});
//导航选中
$(document).ready(function() {
    var str = window.location.href;
    str1 = str.split('odweb/');
    switch(str1[1]){
        case "catalog/index.htm":
            $("#pCatalog").toggleClass('active');
            break;
        case "dev/developer/serviceList.htm":
            $("#pApi").toggleClass('active');
            break;
        case "appcenter/index.htm":
            $("#pDev").toggleClass('active');
            $("#pIndex").removeClass('active');
            break;
        case "analyse/index.htm":
            $("#pNum").toggleClass('active');
            break;
        case "map/index.htm":
            $("#pApp").toggleClass('active');
            break;
        case "interact/index.htm":
            $("#pInteract").toggleClass('active');
            break;
        case "dev/developer/index.htm":
            $("#pFile").toggleClass('active');
            break;
        case "index.htm":
            $("#pIndex").toggleClass('active');
            break;
        case '':
            $("#pIndex").toggleClass('active');
            break;
    }
});
$(document).ready(function () {

    $(document).on("click","#bounceIn",function () {
        loginDialog.login();
    })

    //注册
    $(document).on("click",'#bounceRe',function() {
        var reginUrl = $("#register_url").val();
        window.location.href = reginUrl;
    });

    $(document).on("click","#logout",function () {
        var logoutUrl = $("#logoutUrl").val();
        var dataUrl = $("#dataUrl").val();
        $.ajax({
            type : "get",
            url : logoutUrl,
            data:{callback_url:dataUrl+"/index.htm"},
            success : function(data) {
//                dialog.info(data.substring(0,7),function(){},2000);
                $("#refushhtml").html(data);
            },
            error : function(e) {
//                dialog.info("网络异常",function(){},2000);
            }
        });
    })
})
</script>

<input type="hidden" id="logoutUrl" value="${fn:getLoginKey('logoutAjax')}"/>
<input type="hidden" id="dataUrl" value="${fn:getConfValue('global.index.odweb')}"/>
<input type="hidden" id="uc_home_url" value="${fn:getConfValue('global.index.ucweb')}"/>
<input type="hidden" id="loginAjax" value="${fn:getLoginKey('loginAjax')}"/>
<input type="hidden" id="register_url" value="${odweb}/uc/index/signupReal.htm"/>
<style>
  .m-hd .search-btn {
    top: 12px;
	right: 18px;
  }
  .active{
    border-bottom-color: #ffc80a;
  }
</style>
<div class="m-hd">
    <div class="g-main">
        <div class="u-logo" style="height: 100%;">
            <image src="${ucweb}/img/index/logotitle.png" alt="logotitle"></image>
        </div>

         <form id="searchFormat" action="${odweb }/search/index.htm"  method="post" onsubmit="return checkSearch();">
	       <div class="m-search">
	            <input type="text" class="m-input" id="searchAllKey" name="searchAllKey" value="${searchAllKey}" placeholder="请输入数据/应用/移动应用名称关键词..."/>
	            <button id="searchButton" type="_blank" class="m-btn btn-info"><i class="fa fa-search search-btn" aria-hidden="true"></i></button>
	        </div>
        </form>


        <div class="m-login">
        	<input type="hidden" id="login_salt" value="${login_salt }">
            <c:if test="${empty cookie.sso_token }">
	            <a class="m-btn" id="bounceIn">登录</a>
           		<a class="m-btn login" id="bounceRe">注册</a>
            </c:if>
        </div>
    </div>
</div>
<div class="m-nav">
    <div class="g-main">
        <ul id="nav-ui" style="display: flex;justify-content: space-around;">
             <li id="pIndex">
                <a href="${odweb}/index.htm"><span class="iconcd-index icon"></span><span class="info">首页</span></a>
            </li>
            <li id="pCatalog">
                <a href="${odweb}/catalog/index.htm"><span class="iconcd-datatile icon"></span><span class="info">数据目录</span></a>
            </li>
            <li id="pApi">
                <a href="${devweb}/dev/developer/serviceList.htm"><span class="iconcd-API icon"></span><span class="info">API目录</span></a>
            </li>
			<li id="pDev">
                <a href="${odweb}/appcenter/index.htm"><span class="iconcd-more icon"></span><span class="info">APP应用</span></a>
            </li>
            <li id="pNum">
                <a href="${odweb}/analyse/index.htm"><span class="iconcd-zhishu icon"></span><span class="info">开放统计</span></a>
            </li>
            <li id="pApp">
                <a href="${odweb}/map/index.htm"><span class="iconcd-map icon"></span><span class="info">地图服务</span></a>
            </li>
            <li id="pInteract">
                <a href="${odweb}/interact/index.htm"><span class="iconcd-xingxi icon"></span><span class="info">互动交流</span></a>
            </li>
            <li id="pNew"   style="display:none">
                <a href="http://www.cbdia.org/article/show/6/page:6.html"    target="_blank"><span class="iconcd-shengming icon"></span><span class="info">新闻资讯</span></a>
                <!-- <iframe src="http://www.cbdia.org/article/show/6/page:6.html" frameborder="0"></iframe> -->
            </li>
            <li id="pFile">
                <a href="${devweb}/dev/developer/index.htm"><span class="iconcd-kaifa icon"></span><span class="info">开发者中心</span></a>
            </li>
            <li style="display:none">
                <a href="${odweb}/Innovation/index.htm"><span class="iconcd-chuangxin icon"></span><span class="info">创新大赛</span></a>
            </li>
        </ul>
    </div>
</div>
 <div id="refushhtml" style="display:none"></div>

<script type="text/javascript">
//登录信息
function loginInfo(){
	var reginUrl = $("#uc_home_url").val() + "/uc/account/account.htm";
	window.location.href = reginUrl;
}

//function logout(){
//    var logoutUrl = $("#logoutUrl").val();
//    var dataUrl = $("#dataUrl").val();
//    $.ajax({
//        type : "get",
//        url : logoutUrl,
//        data:{callback_url:dataUrl+"/index.htm"},
//        success : function(data) {
//            dialog.info(data.substring(0,7),function(){},2000);
//            console.log(data);
//            $("#refushhtml").html(data);
//        },
//        error : function(e) {
//            dialog.info("网络异常",function(){},2000);
//        }
//    });
//}
//搜索相关
$(function(){

	$("#searchButton").click(function(){
		var flag = checkSearch();
		if(flag){
			$("#searchFormat").submit();
		}

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

// $("#nav-ui").on('click', "li", function() {
//     $(this).toggleClass('active');
// })

</script>
