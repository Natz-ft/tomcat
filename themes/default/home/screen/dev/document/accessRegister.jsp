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
					3.3创建应用
				</div>
				<div class="des-body">
				<div class="desc_catalog" style="height:103px;">
					<a class="catalog_header">目录</a>
					<ul>
						<li><a href="#3.3.1">3.3.1&nbsp;创建应用</a></li>
						<li><a href="#3.3.2">3.3.2&nbsp;应用基本信息管理</a></li>
						<li><a href="#3.3.3">3.3.3&nbsp;密钥重置</a></li>
					</ul>
				</div>
				<div class="desc_title" id="3.3.1">3.3.1创建应用</div>
				<p style="margin:15px;">开发者可以在控制台首页创建新应用。注册应用必须填入应用名称和应用类别、关键词，方便平台进行统一管理以及上线后用户检索使用。</p>
				<span class="accessRegister_img1"> </span>
				<div class="desc_title" id="3.3.2">3.3.2应用基本信息管理</div>
				<p>应用创建完成后系统会分配App Key和App Secret并转向至基本信息页面，开发者可以在此查看应用的基本信息。</p>
				<span class="accessRegister_img2"></span>
				<p>通过点击右上角编辑按钮对应用基本信息进行编辑</p>
				<span class="accessRegister_img3"></span>
				<p>包括应用的名称、关键词、类别，同时可以设置应用的授权方式和回调地址。</p>
	            <div class="desc_title" id="3.3.3">3.3.3密钥重置</div>
				<p>如果App Secret不慎发生泄漏，开发者可以在应用基本信息页面通过重置密钥按钮重新生成新的密钥。</p>
				</div>
			</div>
		</div>
	</div>
</div>