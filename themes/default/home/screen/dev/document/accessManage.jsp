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
					3.4应用接入管理
				</div>
				<div class="des-body">
				<p style="margin:15px;">应用注册完成之后，开发者可以为该应用接入多种形态的端，平台提供站内应用、站外应用、移动应用三种类型，每种类型都支持自定义版本，开发者可以根据实际的业务需求选择合适的接入类型。</p>
				<div class="desc_catalog" style="height:320px;">
					<a class="catalog_header">目录</a>
					<ul>
						
						<li><a href="#3.4.1">3.4.1&nbsp;移动应用</a><li>
						<ul>
							<li><a href="#3.4.1.1">3.4.1.1&nbsp;Andriod应用</a><li>
							<li><a href="#3.4.1.2">3.4.1.2&nbsp;IOS应用</a><li>
							<li><a href="#3.4.1.4">3.4.1.4&nbsp;移动网站</a><li>
						</ul>
						<li><a href="#3.4.2">3.4.2&nbsp;站内应用</a></li>
						<ul>
							<li><a href="#3.4.2.1">3.4.2.1&nbsp;概述</a><li>
							<li><a href="#3.4.2.2">3.4.2.2&nbsp;基本信息设置</a><li>
						</ul>
						<li><a href="#3.4.3">3.4.3&nbsp;站外应用</a></li>
						<ul>
							<li><a href="#3.4.3.1">3.4.3.1&nbsp;概述</a><li>
							<li><a href="#3.4.3.2">3.4.3.2&nbsp;基本信息设置</a><li>
						</ul>
					</ul>
				</div>
				<div class="desc_title" id="3.4.1">3.4.1移动应用</div>
				<p>如果是第一次接入，则首先需要添加该类型新版本，并选择应用运行的终端设备类型，目前平台支持　IOS、Andriod两种主流的终端类型。</p>
				<span class="accessManage_img1"></span>
				<div class="desc_title" id="3.4.1.1">3.4.1.1Andriod应用</div>
				<p>开发者可以在移动应用视图看到当前接入的Andriod版本信息，包括基本信息、图标设置和详细信息，完善完信息后才可提交审核。</p>
				<p>基本信息</p>
				<span class="accessManage_img2"></span>
				<p>开发者可在控制台查看该版本的状态并完善该版本的基本信息， Andriod应用需要上传应用的安装包 apk文件，同时选择该应用支持的Andriod系统版本。</p>
				<p>图标设置</p>
				<span class="accessManage_img3"></span>
				<p>在图标设置视图，开发者可以上传该应用所需的全部图片，其中应用小图标在应用商店首页最新应用以及热门应用等展示，大图标将在应1用详1细信息页面展示，应用推荐图将展示到推荐应用轮播图，预览图片将在应用详情页应用介绍处展示，具体规格在各类型上传处有详细说明。</p>
				<p>详细信息</p>
				<span class="accessManage_img4"></span>
				<p>开发者可以在详细信息视图添加该版本的详细介绍，方便用户更加快速的了解应用用途。</p>
				<div class="desc_title" id="3.4.1.2">3.4.1.2IOS应用</div>
				<p>开发者可在控制台查看该版本的状态并完善该版本的基本信息，IOS应用需要填写应用的下载地址。</p>
				<p>应用图标设置和详细信息设置同Andriod应用。</p>
			
				<span class="accessManage_img6"></span>
				<div class="desc_title" id="3.4.1.4">3.4.1.3移动网站</div>
				<p>如果开发者仅想在移动端做移动网站接入，则可选择添加移动网站，开发者仅需维护移动网站链接地址，遍可在Andriod、IOS接入移动网站。</p>
				<span class="accessManage_img7"></span>
				<div class="desc_title" id="3.4.2">3.4.2站内应用</div>
				<div class="desc_title" id="3.4.2.1">3.4.2.1概述</div>
				<p>为更好的规范第三方应用的开发质量，提高用户的应用使用体验，应用接入平台推出站内应用框架服务。通过该服务，可以将您的应用接入平台，让用户在应用商店内使用应用。</p>
				<div class="desc_title" id="3.4.2.2">3.4.2.2基本信息设置</div>
				<p>开发者可以在站内应用视图维护应用的信息，实际地址是指站内应用的网站地址，该地址会以iframe的形式嵌套在应用商店应用详情页面，平台提供两种iframe模板，开发者可以根据需求选择相应的宽度。站内应用的图标设置和详细信息设置可参考移动网站。</p>
				<span class="accessManage_img8"></span>
				<div class="desc_title" id="3.4.3">3.4.3站外应用</div>
				<div class="desc_title" id="3.4.3.1">3.4.3.1概述</div>
				<p>站外应用是平台针对第三方网站提供的社会化网络接入方案，通过接入站外应用，用户可方便快捷的通过平台链接到第三方网站，可快速为网站增加用户、流量。</p>
				<div class="desc_title" id="3.4.3.2">3.4.3.2基本信息设置</div>
				<p>接入站外应用需要填写网站的链接地址，图标设置和详细信息设置参考移动网站设置。</p>
				<span class="accessManage_img9"></span>
				</div>
			</div>
		</div>
	</div>
</div>