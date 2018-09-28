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
<website:style href="css/account.css"/>
<website:style href="css/account/sub.css"/>
<website:style href="css/blockui_css.css"/>
<div class="panel account-show-panel">
	<!--头部说明 开始-->
	<div class="content-title">
		<span class="title-icon"></span><span>子账号管理</span>
		<a style="float:right;margin: 7px 25px 3px;" id="upload" class="user_act_btn do"  title="新建子账号" href="${fn:getLink('account/addSubAccount.jsp')}" hidefocus="hidefocus">
			<span style="font-size: 15px;line-height: 30px;display: inline-block;margin: 0 8px;color: #fff;">新建子账号</span>
		</a>
	</div>
	
	<div class="m_warn m_warn_tip">
		<p>温馨提示：</p>
		<p>支持当前选中组织及下级组织创建其子账号，并支持当前选中组织的子账号列表展现。</p>
	</div>
	
	<div class="parent_now_children_account_contain ">
	</div>
	<!-- 子账号列表 开始 -->
	<c:if test="${! empty subList}">
		<div id="sub_account_list">
			 <table class="m_table">
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
	<!-- 子账号列表 结束 -->
</div>
<script type="text/javascript">
	var delSubAccountUrl = "${fn:getLink('account/accountAction.do?method=delSubAccount')}";
 	var getSubAccountListUrl = "${fn:getLink('account/subListShow.jsp')}";
 	var tipPhotoUrl = "${fn:getLink('images/down.png')}";
 	var sessionUid = "${uid}";
 	var dept_list = eval('('+'${deptList}'+')');
</script>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<script language="javascript" src="${fn:getLink('js/account/subAccount.js') }"></script>

