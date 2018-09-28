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
<website:style href="css/relation/find.css" />
<website:style href="css/widgets.css"/>
<style>
.m_sum{
	margin: 10px;
	padding: 10px;
	line-height: 36px;
	font-size: 14px;
	border-bottom: 1px  dashed #CCCBCB;
}
</style>

<div class="panel follow-show-panel">
	<div class="m_sum" style="margin-bottom:0px;padding-bottom:0px;">
		<div class="search-fieldset">
			<em>*</em>&nbsp;昵称：
			<input style="height:25px;line-height:30px;width:200px;" 
				id="nick-name-input" type="text" 
				value="<c:if test='${!empty sechName}'>${sechName}</c:if>"/>
			<a style="margin-right:20px;margin-left:10px;height: 29px;" id="search_by_nickname"  class="user_act_btn do"  title="查找" href='${fn:getLink("relation/find.jsp")}' hidefocus="hidefocus">
				<span style="font-size: 15px;line-height: 29px;display: inline-block;margin: 0 10px;color: #fff;">查找</span>
			</a>
			<span class="please_input_tip">请输入昵称</span>
		</div>
		<c:if test="${isRecommend}">
			<h3 class="title">推荐用户：
				<a id="anotherFind" href='${fn:getLink("relation/find.jsp")}'>[换一换]</a>
			</h3>
		</c:if>
		<c:if test="${!empty userList}">
			<c:if test="${!isRecommend}">
				<h3 class="title">符合条件的用户有：</h3>
			</c:if>
		</c:if>
	</div>
	<div id="mylistBox" class="mylistBox clearfix">
		<c:if test="${empty userList}">
			<div style="margin:10px 0px;">没有符合条件的用户。</div>
		</c:if>
		<c:if test="${!empty userList}">
			 <c:forEach var="user" items="${userList}">
				<div class="user_item">
					<div class="photo">
						<a href="javascript:;" hidefocus >
							<img alt="${user.nick_name}" src="${user.avatar}"/>
						</a>
					</div>
					<ul class="info">
						<li>
							<a href="javascript:;" class="info-name" title="${user.nick_name}" hidefocus>${user.nick_name}</a>
						</li>
						<li>我的关注 &nbsp;<a class="m_num" href="javascript:;" hidefocus>${user.followCount}</a>
							<span class="vline">|</span>
							关注我的<a class="m_num" href="javascript:;" hidefocus>${user.fansCount}</a>
						</li>
					</ul> 
					<div class="info-intro-hover">
						<c:if test="${(empty user.attenFlag) && user.uid != myuid}">
							<a style="display:inline-block;" href="javascript:;" class="info-atten-btn" action-fid="${user.uid}" hidefocus>
								<span class="info-atten">
									<em class="info-atten-icon info-atten-icon-one"></em>
									<em class="vline" style="margin-left:0px;">|</em><em class="info-icon-add">+</em>关注
								</span>
							</a>
						</c:if>
						<c:if test="${(!empty user.attenFlag) && user.attenFlag != 1 && user.attenFlag != 3}">
							<a style="display:inline-block;" href="javascript:;" class="info-atten-btn" action-fid="${user.uid}" hidefocus>
								<span class="info-atten">
									<em class="info-atten-icon info-atten-icon-one"></em>
									<em class="vline" style="margin-left:0px;">|</em><em class="info-icon-add">+</em>关注
								</span>
							</a>
						</c:if>
						<c:if test="${(!empty user.attenFlag) && user.attenFlag == 1}">
							<a style="display:inline-block;" href="javascript:;" class="info-atten-label info-atten-label-one" action-fid="${user.uid}" hidefocus>
								<span class="info-atten">
									<em class="info-atten-icon info-atten-icon-one"></em>
									<em class="vline" style="margin-left:0px;">|</em>&nbsp;已关注
								</span>
							</a>
						</c:if>
						<c:if test="${(!empty user.attenFlag) && user.attenFlag == 3}">
							<a style="display:inline-block;" href="javascript:;" class="info-atten-label info-atten-label-two" action-fid="${user.uid}" hidefocus>
								<span class="info-atten">
									<em class="info-atten-icon info-atten-icon-two"></em>
									<em class="vline" style="margin-left:0px;">|</em>互相关注
								</span>
							</a>
						</c:if>
				    </div> 
					<div class="info-intro-hover info-friends-do-hover  friend-${user.uid}">
						<c:if test="${((empty user.friendFlag) && user.uid != myuid) }">
							<a style="display:inline-block;" href="javascript:;" class="info-friend-add-btn" action-fid="${user.uid}" hidefocus>
								<span class="info-atten">
									<em class="info-atten-icon info-atten-icon-one"></em>
									<em class="vline" style="margin-left:0px;">|</em><em class="info-icon-add">+</em>申请加好友
								</span>
							</a>
						</c:if>
						<c:if test="${!empty user.friendFlag }">
							<c:if test="${ user.friendFlag == 0}">
								<a style="display:inline-block;" href="javascript:;" class="info-friend-add-btn" action-fid="${user.uid}" hidefocus>
									<span class="info-atten">
										<em class="info-atten-icon info-atten-icon-one"></em>
										<em class="vline" style="margin-left:0px;">|</em><em class="info-icon-add">+</em>申请加好友
									</span>
								</a>
							</c:if>
							<c:if test="${user.friendFlag == 1 || user.friendFlag == 3 || user.friendFlag == 4}">
								<a style="display:inline-block;" href="javascript:;" class="info-friend-label-btn" action-fid="${user.uid}" hidefocus>
									<span class="info-atten">
										<em class="info-atten-icon info-atten-icon-one"></em>
										<em class="vline" style="margin-left:0px;">|</em>&nbsp;&nbsp;已申请好友
									</span>
								</a>
							</c:if>
							<c:if test="${user.friendFlag == 2}">
								<a style="display:inline-block;" href="javascript:;" class="info-atten-label info-atten-label-two" action-fid="${user.uid}" hidefocus>
									<span class="info-atten">
										<em class="info-atten-icon info-atten-icon-two"></em>
										<em class="vline" style="margin-left:0px;">|</em>互为好友
									</span>
								</a>
							</c:if>
						</c:if>
						 
				    </div> 
				</div>
			</c:forEach> 
		</c:if>
	</div>
	<c:if test="${!isRecommend && !empty userList}">
		<div id="paper" class="paper" style="width:600px;color:black; margin: 30px auto 30px; *margin: 30px auto 10px;"></div>
	</c:if>
</div>
<style>.ui-dialog{width:360px !important;}</style>
<div id="apply-reason" title="提交好友申请" style="display: none;" act-fid="" act-parent="">
	<p>
		<div name="prompt-tips" >
			<div style="float:left;line-height:25px;margin-right:5px;"><em>*</em>&nbsp;好友申请理由：</div>
			<input type="text" value=''
					style="height: 25px; width: 190px;line-height:25px;border:1px solid #d4d0c8;border-top-color:gray;border-left-color:gray;"/>
		</div>
	</p>
</div>
<website:script src="js/jquery.form.js"/>
<website:script src="js/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/core.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/jquery-ui-1.8.18.custom.min.js"/>
<website:script src="js/dialog.js"/>
<script type="text/javascript">
$(document).ready(function(){
	if($("#paper").length > 0){
		$("#paper").ui_paper({
			pagesize: parseInt("${pageSize }"),
			current: parseInt("${index }"),
			count: parseInt("${count }"),
			url: "${fn:getLink('relation/find.jsp')}?sech=${sechName}"
		});
	}
});
var findUrl = "${fn:getLink('relation/find.jsp')}";
var addFollowUrl = "${fn:getLink('relation/Follow.do?method=addFollow')}";
var isFansUrl = "${fn:getLink('relation/Find.do?method=isFans')}";
var addFriendUrl = "${fn:getLink('relation/Find.do?method=addFriend')}";
</script>


