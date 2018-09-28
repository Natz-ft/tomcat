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
					3.5申请服务管理
				</div>
				<div class="des-body">
				<div class="desc_catalog" style="height:103px;">
					<a class="catalog_header">目录</a>
					<ul>
						<li><a href="#3.5.1">3.5.1&nbsp;已有服务</a></li>
						<li><a href="#3.5.2">3.5.2&nbsp;申请服务</a></li>
					</ul>
				</div>
				<div class="desc_title" id="3.5.1">3.5.1已有服务</div>
				<p>已有服务视图可查看当前应用已申请的服务列表，分为默认服务和高级服务，默认服务指平台提供的基础服务，可满足应用开发的基本需求，高级服务是指应用根据开发需求去申请的高级接口。</p>
				<span class="applyService_img1"> </span>
				<div class="desc_title" id="3.5.2">3.5.2申请服务</div>
				<p>开发者在申请服务视图根据服务分类查看当前平台提供的所有的服务，也可根据服务关键字快速检索。</p>
				<span class="applyService_img2"></span>
				</div>
			</div>
		</div>
	</div>
</div>