<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_网站介绍</website:title>
<website:meta name="title" content="数据开放平台_数据目录" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<style>
	.content {
		text-indent: 2em;
		margin-top: 15px;
		font-size: 14px;
		line-height: 35px;
		color: #003333;
	}
</style>
<div class="g-main">
	<div class="body">
		<div class="b-left">
			<image src="${fn:getLink('img/about/menubg2.png')}"></image>
			<ul>
				<li id="1" <c:if test="${'1' == tab }">class="changeColor"</c:if>>网站介绍</li>
				<li id="2" <c:if test="${'2' == tab }">class="changeColor"</c:if>>网站声明</li>
				<li id="3" <c:if test="${'3' == tab }">class="changeColor"</c:if>>网站导航</li>
				<li id="4" <c:if test="${'4' == tab }">class="changeColor"</c:if>>联系我们</li>
			</ul>
		</div>
		<div class="b-right">
			<!--网站介绍-->
			<div class="introduction"
				<c:if test="${'1' != tab }">style="display: none"</c:if>>
				<div class="website">网站介绍</div>
				<image src="${fn:getLink('img/about/Introduction.png')}" style="width: 100%;height: 100%"></image>
				<div class="content">本网站致力于提供成都市政务部门可开放的各类数据的下载与服务，为企业和个人开展政务信息资源的社会化开发利用提供数据支撑， 推动信息增值服务业的发展以及相关数据分析与研究工作的开展。 我们真诚邀请您光临和深入了解本网站， 欢迎您指出我们工作中存在的不足，提出建议和意见，帮助改善我们的服务水平。</div>
			</div>
			<!--网站声明-->
			<div class="statement"
				<c:if test="${'2' != tab }">style="display: none"</c:if>>
				<div class="website">网站声明</div>
				<image src="${fn:getLink('img/about/Statement.png')}"  style="width: 100%;height: 100%"></image>
				<div class="content">网站声明</div>
			</div>
			<!--网站导航-->
			<div class="navigator"
				<c:if test="${'3' != tab }">style="display: none"</c:if>>
				<div class="website bottom-line">网站导航</div>
			</div>
			<!--联系我们-->
			<div class="contact"
				<c:if test="${'4' != tab }">style="display: none"</c:if>>
				<div class="website bottom-line">联系我们</div>
				<div class="imgContainer">
					<image src="${fn:getLink('img/about/ContactUs.png')}"></image>
				</div>
				<div class="ContactInfo" style="">
					<p>E- Mail：</p>
					<p>联系电话：</p>
					<p>联系地址：</p>
					<p>邮政编码：</p>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
</script>
<!-- reference css -->
<website:style href="css/about/index.css" />

<!-- reference javascript-->
<website:script src="js/about/index.js" />
