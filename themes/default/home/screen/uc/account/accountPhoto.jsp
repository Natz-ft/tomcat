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
<website:style href="css/uc/blockui_css.css"/>
<script type="text/javascript">
$("#accountphoto").addClass('menuon');
</script>
<div class="panel account-show-panel">
	<c:set var="HEADER_EDITOR" value="${fn:getLink('js/uc/headEditor.swf')}?url=${UPLOADPHOTO_URL}&uid=${uid}&callback=save&default_place=head&file_post_name=uploadfile&type=image"></c:set>
	<input type="hidden" name="saveMyPhotoURL_url" value="${fn:getLink('uc/account/accountAction.do?method=saveMyPhotoURL')}"/>
	<div class="m_sum photo-contain" style="background:transparent;">
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		id="headEditor" width="100%" height="500"
		codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
		<param name="movie" value="${ HEADER_EDITOR }" />
		<param name="quality" value="high" />
		<param name="wmode" value="transparent" />
		<param name="allowScriptAccess" value="always" />
		<embed src="${ HEADER_EDITOR }" quality="high"
			width="700" height="500" name="Main" align="middle"
			loop="false"
			quality="high"
			wmode="transparent"
			allowScriptAccess="always"
			type="application/x-shockwave-flash"
			pluginspage="http://www.adobe.com/go/getflashplayer">
		</embed>
		</object>
	</div>
</div>
<website:script src="js/uc/jquery.blockUI.js"/>
<%-- <website:script src="js/uc/dialog.js"/> --%>
<website:script src="libs/assets/dialog/dialog.js" />
<script type="text/javascript">
	function save(photo_id){
		if(!photo_id){
			dialog.error("上传失败!");
		}else{
			saveMyPhotoURL(photo_id);
		}
		
	}
//	photo_id为头像图片id（callback返回后的函数参数就是头像图片id）
	function saveMyPhotoURL(photo_id){
		var submit_url=  $("body").find("input[name='saveMyPhotoURL_url']").val();
		var data = {
			photo_id : photo_id
		}; 
		//ajax submit
		$.ajax({
			url: submit_url,
			data : data,
			type : "POST",
			success : function(data){
				data = eval('('+data+')');
				if(data == 1){
					dialog.info("设置成功！");
					location.reload();
				}
				else if(data == -1){
					dialog.info("设置失败！");
				}
				else if(data == 0){
					dialog.error("未登录或者登录已失效或者提交参数无效，请重试！");
				}
			}
		});
	}
</script>


