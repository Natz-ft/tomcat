<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 

<website:style href="css/dev/document/left.css" />

<div class="menu-nav">
	<span  class="title menu-item info clearfix" style="cursor:pointer">
		<span class="menu-icons i1" style="float:left"></span> 
		<span class="txt" >1.&nbsp;总体介绍</span>
		<span class="title-triangle title_img"></span>
	</span>
	<span class="title-item" style="display:block;">
		<a  class="titleContent menu-item sub ${cur_css eq 'summarizeBack' ? 'on':''}" href="${fn:getLink('dev/document/summarizeBack.jsp')}">
			<span  class="txt">1.1&nbsp;概述和背景</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		 <a  class="titleContent menu-item sub ${cur_css eq 'platformValue' ? 'on':''}" href="${fn:getLink('dev/document/platformValue.jsp')}">
			<span class="txt"> 1.2&nbsp;平台价值</span>
			<span class="menu-icons right_arrow"></span>
		</a>
	</span>
	<span  class="title menu-item info clearfix" style="cursor:pointer">
		<span class="menu-icons i1"></span>
		<span class="txt">2.&nbsp;新手入门</span>
		<span class="title-triangle title_img"></span>
	</span>
	<span class="title-item" style="display:block;">
		<a class="titleContent menu-item sub ${cur_css eq 'register' ? 'on':''}" href="${fn:getLink('dev/document/register.jsp')}">
			<span class="txt">2.1&nbsp;注册开发者</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'foundApp' ? 'on':''}" href="${fn:getLink('dev/document/foundApp.jsp')}">
			<span class="txt">2.2&nbsp;应用创建</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'auditApp' ? 'on':''}" href="${fn:getLink('dev/document/auditApp.jsp')}">
			<span class="txt">2.3&nbsp;应用审核</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'visitApp' ? 'on':''}" href="${fn:getLink('dev/document/visitApp.jsp')}">
			<span class="txt">2.4&nbsp;应用访问</span>
			<span class="menu-icons right_arrow"></span>
		</a>
	</span>
	<span  class="title menu-item info clearfix" style="cursor:pointer">
		<span class="menu-icons i1"></span>
		<span class="txt">3.&nbsp;接入指南</span>
		<span class="title-triangle title_img"></span>
	</span>
	<span class="title-item" style="display:block;">
		<a class="titleContent menu-item sub ${cur_css eq 'summarizeAccess' ? 'on':''}" href="${fn:getLink('dev/document/summarizeAccess.jsp')}">
			<span class="txt">3.1&nbsp;概述</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'accessProcess' ? 'on':''}" href="${fn:getLink('dev/document/accessProcess.jsp')}">
			<span class="txt">3.2&nbsp;接入流程</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'accessRegister' ? 'on':''}" href="${fn:getLink('dev/document/accessRegister.jsp')}">
			<span class="txt">3.3&nbsp;应用注册</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'accessManage' ? 'on':''}" href="${fn:getLink('dev/document/accessManage.jsp')}">
			<span class="txt">3.4&nbsp;应用接入管理</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'applyService' ? 'on':''}" href="${fn:getLink('dev/document/applyService.jsp')}">
			<span class="txt">3.5&nbsp;申请服务管理</span>
			<span class="menu-icons right_arrow"></span>
		</a>
	</span>
	<span  class="title menu-item info clearfix" style="cursor:pointer">
		<span class="menu-icons i1"></span>
		<span class="txt">4.&nbsp;资源下载</span>
		<span class="title-triangle title_img"></span>
	</span>
	<span class="title-item" style="display:block;">
		<a class="titleContent menu-item sub ${cur_css eq 'download' ? 'on':''}" href="${fn:getLink('dev/document/download.jsp')}">
			<span class="txt">4.1&nbsp;SDK下载</span>
			<span class="menu-icons right_arrow"></span>
		</a>
	</span>
	<span  class="title menu-item info clearfix" style="cursor:pointer">
		<span class="menu-icons i1"></span>
		<span class="txt">5.&nbsp;RestAPI</span>
		<span class="title-triangle title_img"></span>
	</span>
	<span class="title-item" style="display:block;">
		<a class="titleContent menu-item sub ${cur_css eq 'apiSummarize' ? 'on':''}" href="${fn:getLink('dev/document/apiSummarize.jsp')}">
			<span class="txt">5.1&nbsp;API概述</span>
			<span class="menu-icons right_arrow"></span>
		</a>
		<a class="titleContent menu-item sub ${cur_css eq 'apiInvoking' ? 'on':''}" href="${fn:getLink('dev/document/apiInvoking.jsp')}">
			<span class="txt">5.2&nbsp;API调用</span>
			<span class="menu-icons right_arrow"></span>
		</a>
	</span>
</div>
<script type="text/javascript">
$(document).ready(function(){
	$(".title").on("click",function(){
		$(this).next(".title-item:first").find(".titleContent").each(function(){
			if($(this).is(":visible")){
				$(this).slideUp();
				$(this).parent(".title-item").prev(".title").find(".title-triangle").css("background-position","-5px -5px");
			}else{
				$(this).slideDown();
				$(this).parent(".title-item").prev(".title").find(".title-triangle").css("background-position","-16px -8px");
			}
		})
	})
})
</script>