<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>

<website:style href="css/dev/document/dev_admin_entrance.css" />
<script type="text/javascript">
if(document.getElementById("nav-doc")){
	document.getElementById("nav-doc").setAttribute("class", "nav-item on");
}
</script>
<div class="body-wrap clearfix">
	<website:widget path="dev/document/leftNav.jsp?cur_css=unAuditedApps" />
	<div class="wrap_content clearfix">
		<div class="devbox cont_main main_pad clearfix" style="background-color: #ffffff;">
			<div class="des-box">
				<div class="form-title">
					1.1概述和背景
				</div>
				<div class="des-body">
				<div class="desc_catalog" style="height:95px;">
					<a class="catalog_header">目录</a>
					<ul>
						<li><a href="#1.1.1">1.1.1&nbsp;概述</a></li>
						<li><a href="#1.1.2">1.1.2&nbsp;背景</a></li>
					</ul>
				</div>
				<div class="desc_title" id="1.1.1">1.1.1 概述</div>
				<p>数据开放平台服务中心，是一个基于开放架构的应用商店框架，以开放技术服务为基础 , 采用 “平台+应用”的开放模式，为开发者集中提供开发、接入、管理、推广、统计分析等全流程服务，帮助开发者快速构建出基于应用，贯通平台服务、应用提供者与目标用户的生态链，与应用开发者，一道建立真正开放、稳定、良性的应用生态系统。</p>
				<div class="desc_title" id="1.1.2">1.1.2 背景</div>
				<p>随着信息化水平的快速提高，企业内部应用数量变得愈发庞大、臃肿，而且组织内往往因为缺乏沟通而导致很多应用之间功能重复，不仅造成开发资源的浪费，也增加了应用的维护和管理成本，同时这些繁杂、臃肿的应用也给用户的检索使用带来了极大的不便，面对用户日益多元化和个性化的需求，企业自身的资源与能力已然变得力不从心。</p>
				<p>因此信息化迎来了一波开放化的发展潮流，企业提供基本的服务，然后通过开放自身接口，让第三方开发者得以通过运用和组装其接口以及其他第三方服务接口产生新的应用，使得该应用能够统一运行在这个平台上，既能实现市场的拓展，又让用户需求得到了最大程度的满足。这种传统模式向 “开放平台”模式转型，成为新一代互联网发展的主旋律。</p>
				</div>
			</div>
		</div>
	</div>
</div>