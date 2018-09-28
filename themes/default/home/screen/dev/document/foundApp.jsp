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
					2.2应用创建
				</div>
				<div class="des-body">
				<div class="desc_catalog" style="height:165px;">
					<a class="catalog_header">目录</a>
					<ul>
						<li><a href="#2.2.1">2.2.1&nbsp;注册应用</a></li>
						<li><a href="#2.2.2">2.2.2&nbsp;应用基本信息</a></li>
						<li><a href="#2.2.3">2.2.3&nbsp;应用接入</a></li>
						<li><a href="#2.2.4">2.2.4&nbsp;编辑基本信息</a></li>
						<li><a href="#2.2.5">2.2.5&nbsp;添加组件</a></li>
						<li><a href="#2.2.6">2.2.6&nbsp;服务管理</a></li>
					</ul>
				</div>
				<div class="desc_title" id="2.2.1">2.2.1注册应用</div>
				<p>成为开发者之后便可进入开发者控制台，点击【创建您的应用】按钮</p>
				<span class="foundApp_img1"></span>
				<p>点击创建应用按钮后，转向创建新应用界面，创建者必须填入应用名称、应用类别和关键词等信息，方便平台进行统一管理以及上线后用户检索使用。</p>
				<span class="foundApp_img2"></span>
				<div class="desc_title" id="2.2.2">2.2.2 应用基本信息</div>
				<p>应用创建完成后系统会分配App Key和App Secret并转向至基本信息页面，开发者可以在此查看应用的基本信息。</p>
				<span class="foundApp_img3"></span>
				<p><span style="color:red;">*说明：</span>App Key和App Secret为应用的app_id和密钥secret_key，是应用在平台的唯一标识，用于应用的身份认证，开发者需妥善保管。</p>
				<p>通过点击右上角编辑按钮对应用基本信息进行编辑。</p>
				<p>如果应用密钥不慎发生泄漏，开发者可以在应用基本信息页面通过重置密钥按钮重新生成新的密钥。</p>
				<div class="desc_title" id="2.2.3">2.2.3应用接入</div>
				<p>应用创建成功后可以在应用开发控制台进行应用的接入，平台提供站内应用、站外应用和移动应用三种形态的接入，开发者根据实际的业务需求进行选择。
					无论是哪种形态的应用，都必须基于版本，以接入站外应用为例，首先需要创建该应用形态版本，然后点击保存按钮生效。
				</p>
				<div class="desc_title" id="2.2.4">2.2.4编辑基本信息</div>
				<p>接入某一版本的应用后，需要完善应用的基本信息，以站外应用为例，需要填写站外应用的链接地址和应用详细介绍说明，同时上传应用的相应规格的图片(包括小图标，大图标，推荐图片以及预览图)，并保存。</p>
				<div class="desc_title" id="2.2.5">2.2.5添加组件</div>
				<p>应用控制台提供组件管理的功能，开发者可以添加、编辑基于该应用的组件。</p>
				<div class="desc_title" id="2.2.6">2.2.6服务管理</div>
				<p>开发者可以在应用控制台查看并管理应用已有的服务，并可对应用开发所需的高级服务进行申请，审核通过后便可使用相应的服务。</p>
				</div>
			</div>
		</div>
	</div>
</div>