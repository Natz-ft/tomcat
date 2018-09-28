<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="product-nav-menu">
	<div class="menu-title-wrap">
		<span class="menu-title">产品服务<span class="entxt"></span></span>
	</div>
	<ul class="menu-list">
		<li class="menu-item<c:if test="${pid eq 'tqing'}"> on</c:if>">
			<span class="menu-icon tqing"></span>
			<span class="menu-txt">浪潮天擎</span>
			<input type="hidden" name="pid" value="tqing"/>
		</li>
		<li class="menu-item<c:if test="${pid eq 'tji'}"> on</c:if>">
			<span class="menu-icon tji"></span>
			<span class="menu-txt">浪潮天机</span>
			<input type="hidden" name="pid" value="tji"/>
		</li>
		<li class="menu-item<c:if test="${pid eq 'tmai'}"> on</c:if>">
			<span class="menu-icon tmai"></span>
			<span class="menu-txt">浪潮天脉</span>
			<input type="hidden" name="pid" value="tmai"/>
		</li>
		<li class="menu-item<c:if test="${pid eq 'tjie'}"> on</c:if>">
			<span class="menu-icon tjie"></span>
			<span class="menu-txt">浪潮天街</span>
			<input type="hidden" name="pid" value="tjie"/>
		</li>
		<li class="menu-item<c:if test="${pid eq 'tque'}"> on</c:if>">
			<span class="menu-icon tque"></span>
			<span class="menu-txt">浪潮天阙</span>
			<input type="hidden" name="pid" value="tque"/>
		</li>
		<li class="menu-item last<c:if test="${pid eq 'tlai'}"> on</c:if>">
			<span class="menu-icon tlai"></span>
			<span class="menu-txt">浪潮天籁</span>
			<input type="hidden" name="pid" value="tlai"/>
		</li>
	</ul>
</div>

<script type="text/javascript">
$(".product-nav-menu .menu-item").click(function() {
	var pid = $(this).children("input[name='pid']").val();
	window.location.href = "${fn:getLink('iop/productDetail.jsp')}?pid="+pid;
});
$(".product-nav-menu .menu-item").hover(function() {
	$(".product-nav-menu .menu-item.on").removeClass("on");
	$(this).addClass("on");
},function() {});
$(".product-nav-menu .menu-list").hover(function() {},function() {
	var curPid = "${pid}";
	$(".product-nav-menu .menu-item.on").removeClass("on");
	$(".product-nav-menu .menu-item").each(function() {
		if(curPid == $(this).children("input[name='pid']").val()) {
			$(this).addClass("on");
		}
	});
});
</script>