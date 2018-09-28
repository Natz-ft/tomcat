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
<website:style href="css/disk-all.css"/>
<website:style href="css/account.css"/>
<website:style href="css/account/realauth.css"/>
<website:style href="css/blockui_css.css"/>
<website:style href="css/jquery-ui-1.8.18.custom.css"/>

<div class="panel account-show-panel clearfix">
	<div class="content-title">
		<span class="title-icon"></span><span>实名认证</span>
	</div>
	
	<div class="m_content clearfix">
		<dl class="true-mes">
			<dt>手机号：</dt>
			<dd>${fn:phoneReplaced(loginPhone)}</dd>
		</dl>
		<dl class="true-mes">
			<dt>真实姓名：</dt>
			<dd>${perInfo.uname}</dd>
		</dl>
		<dl class="true-mes">
			<dt>身份证号码：</dt>
			<dd style="padding-bottom: 10px; border-bottom: 1px dashed #B7B7B7;">
				${fn:getCertNumReplaced(perInfo.certNum) }
				<a href="${fn:getLink('account/comAuthen.jsp')}"
					style="display: inline-block; font-size: 12px; border: 1px solid #D1DEEB;padding: 1px 5px;line-height: 24px; margin-left: 5px; font-weight: 500;">修改</a>
			</dd>
		</dl>
		<dl class="photo-up" style="margin-top: 25px;">
			<dt>
				<em>*</em>&nbsp;身份证正面照片：
			</dt>
			<dd>
				<a act-uid="${uid}" act-flag="front"
					act-diskid="${disk_id}"
					class="upload-authen-photo front-up-do" href="javascript:;"
					hidefocus="hidefocus"> <span>点击上传</span>
				</a> <span class="error-tips front-tip"></span>
			</dd>
		</dl>
		<div class="photo-contain front">
			<span>示例：</span> <img class="photo-img"
				src="${fn:getLink('images/front-cert.jpg')}"> <a
				href="javascript:;" hidefocus="hidefocus" class="largen"></a>
			<div class="tips-upload">
				<p>1. 身份证有效期需在一个月以上</p>
				<p>2. 身份证上所有信息必须清晰可见</p>
				<p>3. 照片支持jpg、jpeg、bmp格式，最大不超过5M</p>
			</div>
			<img src="${fn:getLink('images/front-cert.jpg')}"
				class="largen-photo">
		</div>
		<div class="upload-contain front-upload">
			<img class="upload-img" src=""> <a href="javascript:;"
				hidefocus="hidefocus" class="img-act del-img">删除</a> <a href=""
				hidefocus="hidefocus" target="_blank" class="img-act look-img"
				style="padding-left: 5px;">查看</a>
		</div>
		<dl class="photo-up" style="margin-top: 15px;">
			<dt>
				<em>*</em>&nbsp;身份证反面照片：
			</dt>
			<dd>
				<a act-uid="${uid}" act-flag="reverse"
					act-diskid="${disk_id}"
					class="upload-authen-photo reverse-up-do" href="javascript:;"
					hidefocus="hidefocus"> <span>点击上传</span>
				</a> <span class="error-tips reverse-tip"></span>
			</dd>
		</dl>
		<div class="photo-contain reverse">
			<span>示例：</span> <img class="photo-img"
				src="${fn:getLink('images/reverse-cert.jpg')}"> <a
				href="javascript:;" hidefocus="hidefocus" class="largen"></a>
			<div class="tips-upload">
				<p>1. 身份证有效期需在一个月以上</p>
				<p>2. 照片必须可以看清有效期</p>
				<p>3. 照片支持jpg、jpeg、bmp格式，最大不超过5M</p>
			</div>
			<img src="${fn:getLink('images/reverse-cert.jpg')}"
				class="largen-photo">
		</div>
		<div class="upload-contain reverse-upload">
			<img class="upload-img" src=""> <a href="javascript:;"
				hidefocus="hidefocus" class="img-act del-img">删除</a> <a href=""
				hidefocus="hidefocus" target="_blank" class="img-act look-img">查看</a>
		</div>
		<dl class="photo-up" style="margin-top: 15px;">
			<dt>
				<em>*</em>&nbsp;手持身份证照片：
			</dt>
			<dd>
				<a act-uid="${uid}" act-flag="photo"
					act-diskid="${ disk_id }"
					class="upload-authen-photo  photo-up-do" href="javascript:;"
					hidefocus="hidefocus"> <span>点击上传</span>
				</a> <span class="error-tips photo-tip"></span>
			</dd>
		</dl>
		<div class="photo-contain photo" style="border-bottom: none;">
			<span>示例：</span> <img class="photo-img"
				src="${fn:getLink('images/photo-cert.jpg')}"> <a
				href="javascript:;" hidefocus="hidefocus" class="largen"></a>
			<div class="tips-upload">
				<p>1. 请手持身份证，临时身份证有效期需要15天以上</p>
				<p>2. 照片需免冠，建议未化妆，需身份证本人手持证件</p>
				<p>3. 必须看清身份证号，信息不能被遮挡</p>
				<p>4. 照片支持jpg、jpeg、bmp格式，最大不超过5M</p>
			</div>
			<img src="${fn:getLink('images/photo-cert.jpg')}"
				class="largen-photo">
		</div>
		<div class="upload-contain photo-upload">
			<img class="upload-img" src=""> <a href="javascript:;"
				hidefocus="hidefocus" class="img-act del-img">删除</a> <a href=""
				hidefocus="hidefocus" target="_blank" class="img-act look-img"
				style="padding-left: 5px;">查看</a>
		</div>
		<dl class="photo-up" style="margin-top: 15px;">
			<dt>
				<em>*</em>&nbsp;半身照片：
			</dt>
			<dd>
				<a act-uid="${uid}" act-flag="half"
					act-diskid="${disk_id}"
					class="upload-authen-photo  half-up-do" href="javascript:;"
					hidefocus="hidefocus"> <span>点击上传</span>
				</a> <span class="error-tips half-tip"></span>
			</dd>
		</dl>
		<div class="photo-contain half" style="border-bottom: none;">
			<span>示例：</span> <img class="photo-img"
				src="${fn:getLink('images/half-cert.jpg')}"> <a
				href="javascript:;" hidefocus="hidefocus" class="largen"></a>
			<div class="tips-upload">
				<p>1. 半身照与手持证件照需要在同一场景下拍摄</p>
				<p>2. 大头照和一寸照不可作为半身照使用</p>
				<p>3. 照片不能进行软件处理，包括裁剪、涂改等</p>
				<p>4. 照片支持jpg、jpeg、bmp格式，最大不超过5M</p>
			</div>
			<img src="${fn:getLink('images/half-cert.jpg')}"
				class="largen-photo">
		</div>
		<div class="upload-contain half-upload">
			<img class="upload-img" src=""> <a href="javascript:;"
				hidefocus="hidefocus" class="img-act del-img">删除</a> <a href=""
				hidefocus="hidefocus" target="_blank" class="img-act look-img"
				style="padding-left: 5px;">查看</a>
		</div>
	
		<div class="btn-contain" style="margin-top: 20px;">
			<dl style="margin-bottom: 50px;">
				<dd style="text-align: center; margin-left: 80px; line-height:30px;">
					<a class="user_act_btn do" style="position: relative; left: 0px"
						href="javascript:;" id="submit_btn" hideFocus="hidefocus"><span>确定</span>
					</a> <a class="user_act_btn back"
						style="position: relative; left: 20px" href="javascript:;"
						id="cancel_btn" hideFocus="hidefocus"><span>取消</span> </a>
				</dd>
			</dl>
		</div>
	</div>
	<div id="uploadbox" style="display: none; padding: 10px 20px">
		<div id="fsUploadProgress"
			style="background: #fff; height: 280px; border: 1px solid #ccc;">
			<p id="queuestatus"></p>
			<ol id="log"></ol>
		</div>
		<div class="upload-buttonpane">
			<div id="uploadfirstwrapper" class="atMC blueBtn r2">
				<span id="uploadfirst">选择文件</span>
			</div>
			<button id="cancelbtn"
				class="pt10 r r2 ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only small-btn"
				aria-disabled="false" style="padding-top: 0px;">
				<span>关闭</span>
			</button>
		</div>
	</div>
</div>
<website:script src="js/jquery.form.js"/>
<website:script src="js/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/jquery.validate.js"/>
<website:script src="js/jquery.validate.ext.js"/>
<website:script src="js/account/file/jquery.swfupload.js"/>
<website:script src="js/account/file/swfupload.js"/>
<website:script src="js/account/file/uploadcode2.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<website:script src="js/jquery-ui-1.8.18.custom.min.js"/>


<script type="text/javascript">
var img_rc_url = "${docCenterService}"
var front_doc_id = "";
var reverse_doc_id = "";
var photo_doc_id = "";
$(document).ready(function(){
	$("#photo-success-confirm").dialog({
	    autoOpen:false,
		bgiframe: true,
		title:"成功",
		modal: true,
		buttons: {
		    '确定':function() {
		     		$(this).dialog('close');
		     		window.location.href="${fn:getLink('account/perAuthen.jsp')}";
	         		}
		       }
		  }
	);
	
	var uploadUrl = "${uploadUrl}";
	var resourceUrl = "${fn:getLink('js/account/file/swfupload.swf')}";
	var loadingUrl = "${fn:getLink('images/loading.gif')}";
	$(".upload-authen-photo").live("click",function(){
		$(".error-tips").html("");
		$_this = $(this);
		var disk_id = $(this).attr("act-diskid");
		var uid = $(this).attr("act-uid");
		var photo_flag = $(this).attr("act-flag");
		setTimeout(function() {
			if(typeof RC_UPLOAD != "undefined"){
				RC_UPLOAD.showPanel({
					uploadUrl : uploadUrl,
					resourceUrl : resourceUrl,
					postParams : {
						uid: uid,
						update_uid: uid,
						disk_id: disk_id,
						type: "doc",
						is_update: '0',
						folder_name:uid
					},
					fileType : "*.jpg;*.jpeg;*.png;*.gif;",
					success : function(doc_id){
						if(photo_flag == "front"){
							var img_upload = $(".front-upload").children(".upload-img");
							$(".front-upload").children(".look-img").attr("href",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("src",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("act-id",doc_id);
							$(".front").hide();
							$(".front-upload").show();
							$_this.children("span").html("重新上传");
						}
						if(photo_flag == "reverse"){

							var img_upload = $(".reverse-upload").children(".upload-img");
							$(".reverse-upload").children(".look-img").attr("href",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("src",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("act-id",doc_id);
							$(".reverse").hide();
							$(".reverse-upload").show();
							$_this.children("span").html("重新上传");
						}
						if(photo_flag == "photo"){
							var img_upload = $(".photo-upload").children(".upload-img");
							$(".photo-upload").children(".look-img").attr("href",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("src",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("act-id",doc_id);
							$(".photo").hide();
							$(".photo-upload").show();
							$_this.children("span").html("重新上传");
						}
						if(photo_flag == "half"){
							var img_upload = $(".half-upload").children(".upload-img");
							$(".half-upload").children(".look-img").attr("href",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("src",img_rc_url+"/doc?doc_id="+doc_id);
							img_upload.attr("act-id",doc_id);
							$(".half").hide();
							$(".half-upload").show();
							$_this.children("span").html("重新上传");
							}
						//暂注释，ie安全机制没有处理
						//$("#uploadbox").dialog('close');
						
					}
				});
			}
		}, 50);
	});
	$("#submit_btn").on("click",function(){
		authenPhotoPer();
	});
	$("#cancel_btn").on("click",function(){
		window.location.href="${fn:getLink('account/perAuthen.jsp')}";
	});

	$(".largen").live("click",function(){
		$(this).parent(".photo-contain").children(".largen-photo").show();
	});
	$(".photo-img").hover(
			  function () {
				  $(this).parent(".photo-contain").children(".largen-photo").show();
			  },
			  function () {
				  $(this).parent(".photo-contain").children(".largen-photo").hide();
			  }
			);
	$(".largen-photo").live("click",function(){
		$(this).hide();
	});
	$(".del-img").live("click",function(){
		var uploadContain = $(this).parent(".upload-contain");
		uploadContain.hide();
		if(uploadContain.hasClass("photo-upload")){
			$(".photo").show();
			$(".photo-up-do").children("span").html("点击上传");
		}
		if(uploadContain.hasClass("half-upload")){
			$(".half").show();
			$(".half-up-do").children("span").html("点击上传");
		}
		if(uploadContain.hasClass("front-upload")){
			$(".front").show();
			$(".front-up-do").children("span").html("点击上传");
		}
		if(uploadContain.hasClass("reverse-upload")){
			$(".reverse").show();
			$(".reverse-up-do").children("span").html("点击上传");
		}
		uploadContain.children(".upload-img").attr("act-id","");
		uploadContain.children(".upload-img").attr("src","");
		uploadContain.children(".look-img").attr("href","");
	});
	
});
function authenPhotoPer(){
	front_doc_id = $(".front-upload").children(".upload-img").attr("act-id");
	if("undefined" == typeof front_doc_id || front_doc_id ==""){
		$(".front-tip").html('<span style="margin-left:18px;">请点击上传身份证正面照片！</span>');
		return;
	}
	reverse_doc_id = $(".reverse-upload").children(".upload-img").attr("act-id");
	if("undefined" == typeof reverse_doc_id || reverse_doc_id ==""){
		$(".reverse-tip").html('<span style="margin-left:18px;">请点击上传身份证反面照片！</span>');
		return;
	}
	photo_doc_id = $(".photo-upload").children(".upload-img").attr("act-id");
	if("undefined" == typeof photo_doc_id || photo_doc_id ==""){
		$(".photo-tip").html('<span style="margin-left:18px;">请点击上传手持身份证照片！</span>');
		return;
	}
	half_doc_id = $(".half-upload").children(".upload-img").attr("act-id");
	if("undefined" == typeof half_doc_id || half_doc_id ==""){
		$(".half-tip").html('<span style="margin-left:18px;">请点击上传半身照！</span>');
		return;
	}
	var doc_ids = "";
	if(front_doc_id != "" && reverse_doc_id != "" && photo_doc_id != "" && half_doc_id != ""){
		doc_ids = front_doc_id + "," + reverse_doc_id + "," + photo_doc_id + "," + half_doc_id;
	}
	if(doc_ids == ""){
		$(".error-tips").html("请按要求正确上传相应的照片");
		return ;
	}
	$.ajax({
		url:"${fn:getLink('account/accountAction.do?method=authenPhotoPer')}",
		data: {doc_ids:doc_ids},
		type : "POST",
		success: function(res) {
			res = eval('('+res+')');
			if(res.success){
				dialog.success("保存成功！");
			}else{
				dialog.error(res.info);
			}
		},
		error: function(){
			dialog.error("网络反应较慢，请稍后重试！");
		}
	});
}

</script>

