<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<div class="bottomwrap">
	<div id="footer">
		<div class="footer_nav" style="color:#333;">
			主办单位：<a href="http://sdaic.gov.cn" target="_blank"></a>
			
		</div>
		<div class="footer_nav">
			<a>使用帮助</a>
			<span>|</span>
			<a>常见问题</a>
			<span>|</span>
			<a>隐私声明</a>
			<!-- <span class="fcopy"> 建议使用1024×768分辨率 IE7.0 以上版本浏览器</span> -->
			<span class="fcopy" style="color:#333;">技术支持：<a href="http://www.inspur.com" target="_blank">浪潮集团</a></span>
		</div>
		<a id="totop" class="icons totop">&nbsp;</a>
		<script type="text/javascript">
			$(document).ready(function() {
				$("#totop").click(function(){
					$('body,html').animate({scrollTop:0}, 300);
					return false;
				});
			});
		</script>
	</div>
</div>