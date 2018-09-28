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

<div class="panel sec-show-panel">
	
    	
    	<div class="content-title clearfix">
			<a style="float:right;margin: 7px 25px 3px;" id="upload" class="user_act_btn do"  title="修改密保" href="${fn:getLink('uc/security/secAsk.jsp')}" hidefocus="hidefocus">
				<span style="font-size: 15px;line-height: 30px;display: inline-block;margin: 0 8px;color: #fff;">修改密保</span>
			</a>
		</div>
    	
    	<div class="m_sum" style="text-align: center;">
	    	<c:if test="${empty result}">
	    		<p>对不起，您当前没有权限访问该页面。</p>
				<p>请尝试访问其他页面。</p>
	    	</c:if>
	    	<c:if test="${!empty result}">
	    		<p>您已成功设置密保问题:&nbsp;${result}</p>
				<p>绑定密保问题是您找回密码的一种重要凭证。</p>
	    	</c:if>
		</div>
		
</div>


