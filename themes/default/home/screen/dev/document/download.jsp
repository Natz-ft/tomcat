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
					4.1SDK下载
				</div>
				<div class="des-body">
				<p style="margin-top:15px;">SDK封装服务中心的API。服务中心提供多种SDK供开发者下载参考。</p>
		    	
		    	<h3 class="des-title fb margin_6">Java SDK</h3>
		    	<table border="1" class="table_border W_100 td_center" style="margin-bottom: 15px;">
			   			<tr class="W_100" style="line-height:22px;">
			   			<td style="width:50%;"><p>立即下载  <a href="${fn:getLink('public/resource/IOP_JAVA_SDK_cq1.0.zip') }" style="font-size: 13px;">JAVA-SDK</a></p></td>
			   			<td>2018年6月20日更新</td>
			   			</tr>
			   	</table>
		    	
				</div>
			</div>
		</div>
	</div>
</div>
