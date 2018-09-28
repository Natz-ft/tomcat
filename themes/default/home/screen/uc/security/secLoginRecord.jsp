<%@page import="java.io.Writer"%>
<%@page import="java.util.*"%>
<%@page import="java.io.UnsupportedEncodingException"%>
<%@page import="java.net.URLDecoder"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<website:style href="css/widgets.css"/>
<div class="panel sec-show-panel">
	<div class="content-title clearfix">
		<span class="title-icon"></span><span>登录记录</span>
	</div>
	<div class="m_warn m_warn_tip">
		<p>温馨提示：</p>
		<p>以下是您最近一个月的登录记录，为确保您的账号安全，我们不会在有安全风险的环境显示这个页面。</p>
	</div>
	
	<c:if test="${!empty historyList}">
		<div id="login_log_list">
			<table class="m_table" style="width: 712px;">
				<tbody>
					<tr>
						<th>登录时间</th>
						<th>登录地点</th>
						<th>ip地址</th>
					</tr>
					<c:forEach var="history" items="${historyList }">
						<tr>
							<td class="time">
								<span>${fn:formatDateBySeconds(history.login_time,null)}</span>
							</td>
							<td class="local">
								<span>${history.login_address}</span>
							</td>
							<td class="ip">
								<span>${history.login_ip}</span>
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<div id="paper" class="paper" style="width:600px;color:black; margin: 30px auto 30px; *margin: 30px auto 10px;"></div>
	</c:if>
	<div class="m_tip">
		<h3 class="title">小贴士</h3>
		<div class="tip_text">由于近期一些宽带服务提供商在做网络调整，可能出现登录地点不准确的情况，请您先核对登录时间；如果确定在该时间段内没有登录，
			请立即<a href="${fn:getLink('security/secChangePwd.jsp')}" hideFocus="hidefocus">修改密码</a>。
			为更好保护您的账号安全，建议您完善更多安全设置。</div>
	</div>
</div>
 <website:script src="js/core.js"/>
 <website:script src="js/jquery.form.js"/>
 <website:script src="js/jquery-ui-1.8.18.custom.min.js"/>
 <website:script src="js/jquery.validate.js"/>
 <website:script src="js/md5.js"/>
 <website:script src="js/security/bindMail.js"/>
 <website:script src="js/jquery.validate.ext.js"/>
 <script type="text/javascript">
	 $(document).ready(function(){
			$("#paper").ui_paper({
				pagesize: parseInt("${pageSize }"),
				current: parseInt("${index }"),
				count: parseInt("${count }"),
				url: ""
			});
		});
 </script>
	
	
