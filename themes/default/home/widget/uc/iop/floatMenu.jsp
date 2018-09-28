<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="menu-float">
	<a href="javascript:void(0)" class="menu-item" onclick="scrollToTop()">回顶部</a>
	<div class="menu-item-gap"></div>
	<a href="#parts-prodect-services" class="menu-item">产品服务</a>
	<div class="menu-item-gap"></div>
	<a href="#parts-cooperation-case" class="menu-item">合作案例</a>
	<div class="menu-item-gap"></div>
	<a href="#parts-advantage-of-product" class="menu-item">产品优势</a>
	<div class="menu-item-gap"></div>
	<div class="menu-item qrcode">
		<img src="${fn:getLink('images/iop/iop-qrcode.jpg')}"/>
	</div>
</div>

<script type="text/javascript">
$(function() {
	$(window).scroll(function() {
		var vtop = $(document).scrollTop();
		if(vtop >= 300) {
			$(".menu-float").css({top:"202px"});
			$(".menu-float").fadeIn(500);
		} else {
			$(".menu-float").css({top:(502-vtop)+"px"});
			$(".menu-float").fadeOut(500);
		}
	});
});
function scrollToTop() {
	$('html, body').animate({scrollTop:0}, 500);
}
</script>