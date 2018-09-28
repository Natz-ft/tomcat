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
<style>
.tips-go-authen {
	font-size: 14px;
	margin: 20px 52px 20px;
	line-height: 24px;
}

.go-authen {
	color: #ee882f;
}

.e-tips {
	border: 1px solid #e9e8e8;
	margin: 0 auto;
	width: 820px;
	background: url(${fn:getLink('images/bj-e.png')}) 0 0;
	background-repeat: repeat-x;
}
.service-contain li{
	text-align: center;
	float: left;
	width: 120px;
	height: 100px;
	padding:0px;
	margin: 5px 10px;
	list-style-type: none;
	font-size: 12px;
}
.service-contain li img{
	width: 64px;
	height: 64px;
	margin: 0 25px;
}
.service-contain li span{
	width: 120px;
}
.service-contain{
	margin: 30px auto;
	font-size:16px;
	width:820px;
}
</style>
<div class="panel account-show-panel" >
	<div class="content-title">
		<span class="title-icon"></span><span>实名认证</span>
	</div>
	
	
	<p class="tips-go-authen">
		拥有“e证通”企业数字证书的用户才能升级成认证用户，请插入数字证书，点击“<a class="go-authen"
			href="#"
			style="text-decoration: underline;">认证</a>”。
	</p>
	<div class="e-tips">
		<p
			style="line-height: 24px; margin: 24px 20px 45px; font-size: 16px; color: #0f71ba;">“e证通”企业数字证书介绍</p>
		<img src="${fn:getLink('/images/e.png')}"
			style="width: 350px; height: 150px; margin: 0 200px;">
		<p
			style="line-height: 26px; font-size: 14px; margin: 0 35px 20px 25px; text-indent: 2em;">为给企业提供安全可靠的网上办事环境，降低往返政府机关的办事成本，拓展网上办事服务，2011年起，五年内由青岛市政府出资统一为企业办理数字证书，并支付相应的更新服务费。企业到各区市行政审批大厅数字证书发放受理点可免费申请一张标示企业身份的数字证书，使用数字证书就可能通过网络办理政府部门的各项业务。</p>
	</div>

	<div class="service-contain clearfix">
		<p style="line-height:24px;padding: 5px 0 5px 0;color: #0f71ba; border-bottom:1px dashed #e9e8e8;margin: 0 10px 20px 0px; ">认证用户可以使用的服务：</p>
		<ul style="float:left;width:720px; margin:5px 20px  100px; ">
			<li><img src="${fn:getLink('images/dswsbs.png')}"><span>地税网上办税综合业务</span></li>
			<li><img src="${fn:getLink('images/jgjy.png')}"><span>建设工程交易监管</span></li>
			<li><img src="${fn:getLink('images/kjgl.png')}"><span>科技计划管理</span></li>
			<li><img src="${fn:getLink('images/ldyg.png')}"><span>劳动用工网上登记</span></li>
			<li><img src="${fn:getLink('images/qynj.png')}"><span>企业年度检验</span></li>
			<li><img src="${fn:getLink('images/qyxx.png')}"><span>企业信息查询</span></li>
			<li><img src="${fn:getLink('images/sb.png')}"><span>社会保险网上申报</span></li>
			<li><img src="${fn:getLink('images/wryjc.png')}"><span>污染源在线监测数据查询</span></li>
			<li><img src="${fn:getLink('images/st.png')}"><span>税税通网上办税</span></li>
		</ul>
	</div>
</div>




