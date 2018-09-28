<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>微信下载页面</website:title>
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<style>
*{margin:0; padding: 0;}
body{font:normal 14px/1.5 Arial,Microsoft Yahei; color:#333;}
.example{padding: 20px;}
.example p{margin: 20px 0;}
a{display: inline-block; background: #61B3E6; color:#fff; padding: 0 10px; border-radius: 4px; text-align: center; margin: 0 5px; line-height: 39px; font-size: 20px; text-decoration: none;width: 90%;}
a.btn-warn{background: #F0AD4E;}
a:hover{opacity: 0.8;}
/*核心css*/
	.wxtip{background: rgba(0,0,0,0.8); text-align: center; position: fixed; left:0; top: 0; width: 100%; height: 100%; z-index: 998; display: none;}
	.wxtip-icon{width: 52px; height: 67px; background: url(http://img.caibaojian.com/uploads/2016/01/weixin-tip.png) no-repeat; display: block; position: absolute; right: 30px; top: 20px;}
	.wxtip-txt{padding-top: 107px; color: #fff; font-size: 16px; line-height: 1.5;}
</style>

<div class="example">
	<website:widget path="appcenter/detailContentMini.jsp" />
	<div style="margin: 0 auto">
		<a href="${fn:getLink('appcenter/Index.do')}?method=downloadFile&fileType=${fileType}&fileId=${fileId}" id="JdownApp">点击下载APP</a>
	</div>
	<div class="wxtip" id="JweixinTip">
		<span class="wxtip-icon"></span>
		<p class="wxtip-txt">点击右上角<br/>选择在浏览器中打开</p>
	</div>
</div>

<script type="text/javascript">
<!--
function weixinTip(ele){
	var ua = navigator.userAgent;
	var isWeixin = !!/MicroMessenger/i.test(ua);
	if(isWeixin){
		ele.onclick=function(e){
			window.event? window.event.returnValue = false : e.preventDefault();
			document.getElementById('JweixinTip').style.display='block';
		}
		document.getElementById('JweixinTip').onclick=function(){
			this.style.display='none';
		}
	}
}
var btn1 = document.getElementById('JdownApp');//下载一
weixinTip(btn1);
var btn2 = document.getElementById('JdownApp2'); //下载二
weixinTip(btn2);
//-->
</script>
</html>