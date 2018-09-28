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
					3.1概述
				</div>
				<div class="des-body">
				<span class="summarizeAccess_img"> </span>
				<p>开发者控制台提供应用注册到上线整个流程的管理。其主要功能包括：</p> 
				<p>1.应用注册</p>
				<p>2.应用接入管理</p>
				<p>3.申请服务管理</p>
				</div>
			</div>
		</div>
	</div>
</div>