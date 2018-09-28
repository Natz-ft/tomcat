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
					2.4应用访问
				</div>
				<div class="des-body">
				<p style="margin-top:15px;">应用审核通过后，会在平台应用商店上线，并可被推荐、排名、搜索、安装、使用以及评分评价。</p> 
				<span class="visitApp_img"> </span>
				</div>
			</div>
		</div>
	</div>
</div>