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
<website:style href="css/uc/account.css"/>
 
<style>
.setItems
{
	width: 100%;
	margin-top: 10px;
	float: left;
	background-image: none;
	background-attachment: scroll;
	background-repeat: repeat;
	background-position-x: 0%;
	background-position-y: 0%;
	background-size: auto;
	background-origin: padding-box;
	background-clip: border-box;
	background-color: rgb(255, 255, 255);
}
.setFold
{
	overflow: hidden;
	padding-top: 8px;
	padding-right: 15px;
	padding-bottom: 8px;
	padding-left: 15px;
	border-top-color: #c0c7d9;
	border-right-color: #c0c7d9;
	border-bottom-color: #c0c7d9;
	border-left-color: #c0c7d9;
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	cursor: pointer;
	background-attachment: scroll;
	background-repeat: no-repeat;
	background-position-x: 95%;
	background-position-y: center;
	background-size: auto;
	background-origin: padding-box;
	background-clip: border-box;
	background-color: rgb(233, 237, 244);
}
.setFold h2
{
	line-height: 25px;
	font-size: 14px;
	font-weight: bold;
	display: block;
}
.setItemsInfo
{
	overflow: hidden;
	padding-top: 15px;
	padding-right: 15px;
	padding-bottom: 15px;
	padding-left: 15px;
	border-top-color: currentColor;
	border-right-color: #c0c7d9;
	border-bottom-color: #c0c7d9;
	border-left-color: #c0c7d9;
	border-top-width: 0px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: none;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
}
.data
{
	overflow: hidden;
}
.data ul
{
	overflow: hidden;
	padding-top: 0px;
	padding-right: 0px;
	padding-bottom: 0px;
	padding-left: 0px;
}
.data ul li
{
	width: 100%;
	line-height: 24px;
	overflow: hidden;
	padding-top: 5px;
	padding-bottom: 5px;
}
.form-signup-body{
	width:750px;
}
</style>
<div class="panel account-show-panel">
	<!-- 外部绑定的编辑 -->
	<div class="info-modify"  id="info-modify">
	<div class="m_form" style="margin-top:0px;padding-top:0px;">
		<div class="form-body form-signup-body m_sum m_contain">
			<div class="mainbox_C_C" style="width: 100%">
	            <div class="setupBox" style="margin-right:0px;">
					<div class="setItems" style="_width:100%">
						<!-- 新浪微博绑定 begin  -->
						<div class="setFold" rel="sina">
							<h2>
								<img
									src="${fn:getLink('images/uc/login/btn_sina.gif')}"
									class="alM" /> 
									新浪微博
									<c:if test="${ empty bindSina }">未绑定</c:if>
									<c:if test="${ !empty bindSina }">已绑定</c:if>
							</h2>
						</div>
						<div class="setItemsInfo">
							<div class="data">
								<c:if test="${ empty bindSina }">
									<ul>
										<li>您未绑定新浪微博</li>
										<li>
											<a class="btn_b" href="${fn:getLink('uc/index/index.do?method=logoutAll')}&callback_url=${sinaOauthUrl}">
												开始绑定
											</a>
										</li>
									</ul>
								</c:if>
								<c:if test="${ !empty bindSina }">
									<ul>
										<li>您已绑定新浪微博</li>
										<li>
											<a class="btn_b" href="${fn:getLink('uc/account/accountAction.do?method=unbind')}?type=sina">
												取消绑定
											</a>
										</li>
									</ul>
								</c:if>
							</div>
						</div>
					</div>
	             	 <!-- 新浪微博绑定 end  -->   
	              	 <!-- 腾讯QQ绑定 begin  -->
					<div class="setItems" style="_width: 100%">
						<div class="setFold" rel="qq">
							<h2>
								<img
									src="${fn:getLink('images/uc/login/btn_qq.gif')}"
									class="alM" />
									腾讯QQ
									<c:if test="${ empty bindQQ }">未绑定</c:if>
									<c:if test="${ !empty bindQQ }">已绑定</c:if>
							</h2>
						</div>
						<div class="setItemsInfo">
							<div class="data">
								<c:if test="${ empty bindQQ }">
									<ul>
										<li>您未绑定腾讯QQ</li>
										<li>
											<a class="btn_b" href="${fn:getLink('uc/index/index.do?method=logoutAll')}&callback_url=${qqOauthUrl}">
												开始绑定
											</a>
										</li>
									</ul>
								</c:if>
								<c:if test="${ !empty bindSina }">
									<ul>
										<li>您已绑定腾讯QQ</li>
										<li>
											<a class="btn_b" href="${fn:getLink('uc/account/accountAction.do?method=unbind')}?type=qq">
												取消绑定
											</a>
										</li>
									</ul>
								</c:if>
							</div>
						</div>
					</div>
	              <div class="c"></div>
	           </div>
	        </div>
		</div>
	</div>
</div>
</div>
<website:script src="js/uc/jquery.form.js"/>
<website:script src="js/uc/jquery-ui-1.8.18.custom.min.js"/>
	
<script type="text/javascript">
$(document).ready(function(){
    var hs = document.location.hash;
    changeModel( hs.replace('#','') );
    $('.setFold').click(function(){
      if( $(this).attr('class')=='setFold' ){
      	changeModel( $(this).attr('rel') );
      }else{
	      $(this).removeClass('setUnfold');
	      $(this).next('.setItemsInfo').hide();
      }
      location.href='#'+$(this).attr('rel');
    })
});
//切换操作模块
function changeModel( type ){
	var t = type || 'base';
	$('.setFold').removeClass('setUnfold');
	$('.setItemsInfo').hide();
	var handle = $('div[rel="'+t+'"]');
	handle.addClass('setUnfold');
	handle.next('.setItemsInfo').show();
}
</script>
<script type="text/javascript">
$("#bind").addClass('menuon');
</script>

