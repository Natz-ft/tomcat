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

<c:if test="${! empty subList}">
	<div id="sub_account_list">
		 <table class="m_table" style="width: 95%;margin-top:5px;">
			<tbody>
				<tr>
					<th>登录账号</th>
					<th>昵称</th>
					<th>登录邮箱</th>
					<th>操作</th>
				</tr>
				<c:forEach var="sub" items="${subList}">
					<tr id='tr_${sub.uid}'>
						<td >
							<span>${sub.user_id}</span>
						</td>
						<td >
							<span>${sub.nick_name}</span>
						</td>
						<td >
							<span>${fn:getEmailReplaced(sub.login_email)}</span>
						</td>
						<td>
							<span>
							 <a href="${fn:getLink('account/subAccountEdit.jsp')}?subUid=${sub.uid }&mainUid=${mainAccountId}">编辑  </a>
							  <a href="javascript:;" alt-uid=${sub.uid}  alt-nick=${sub.nick_name} class="del-account">删除</a>
							</span>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table> 
	</div>
</c:if>
<c:if test="${empty subList}">
	<div id="sub_account_list">
		<span style="margin-left:30px; padding-left:2px; font-size:12px;"> 提示：当前选中组织暂无子账号，可点击右上角按钮新建子账号！</span>
	</div>
</c:if>


