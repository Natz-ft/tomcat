<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="func" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_数据目录</website:title>
<website:meta name="title" content="数据开放平台_数据目录" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />

<website:script src="libs/assets/dialog/dialog.js" />
<website:style rel="stylesheet" href="css/catalog/commonDetail.css" />
<website:script src="libs/assets/plupload/plupload.full.min.js" />
<website:script src="libs/assets/plupload/button.js" />
<website:script src="libs/assets/plupload/jquery.plupload.bs3.js" />
<website:style rel="stylesheet"
	href="libs/assets/plupload/jquery.plupload.bs3.css" />
<website:style rel="stylesheet" href="css/catalog/catalog.css" />
<style>
.m-select .sel-list>ul>li {
	min-width: 100px;
}
</style>

<div class="content" style="margin-top: 20px">
	<div>数据目录申请</div>
	<form class="m-form" id="form_advance" style="margin-top: 20px"
		action="">
		<div class="form-row">
			<label class="form-label">申请者：</label>
			<div class="form-content">${sessionScope.userInfo.nick_name}</div>
		</div>
		<div class="form-row">
			<label class="form-label">联系人：</label>
			<div class="form-content">
				<input name="contact_name" class="m-input" id="contact_name"
					type="text">
			</div>
		</div>
		<div class="form-row">
			<label class="form-label">联系电话：</label>
			<div class="form-content">
				<input name="phone" class="m-input" id="phone" type="text">
			</div>
		</div>
		<div class="form-row">
			<label class="form-label">数据目录：</label>
			<div class="form-content">${cata_name}</div>
		</div>
		<div class="form-row">
			<label class="form-label">申请理由：</label>
			<div class="form-content">
				<textarea class="m-input" id="apply_reason" rows="3"></textarea>
			</div>
		</div>
		<div class="form-row">
			<label class="form-label">上传附件：</label>
			<div class="form-content">
				<div id="filelist"></div>
				<div id="container">
					<a id="pickfiles" href="javascript:;">[选择文件]</a> 
					<a id="uploadfiles" href="javascript:;">[上传]</a>
				</div>
				<div style="margin-top:10px;">请上传png，gif，jpg格式附件</div>
			</div>
			<pre id="console"></pre>
			<input id="doc_ids" name="doc_ids" type="hidden" value="" />
		</div>
		<div class="form-row">
			<button type="button" class="m-btn btn-info"
				onclick="disableElement()">提交</button>
		</div>
	</form>
</div>
<script type="text/javascript">
	var __rcservice = '${fn:getConfValue("filestore_rcservice")}';
	var catalogUrl = "${fn:getLink('catalog/CatalogDetail.do')}";
	var uid = "${sessionScope.uid}";
	var cata_id = '${cata_id}';
	var cata_name = '${cata_name}';
	//提交表单
	function disableElement() {
		debugger;
		if ($("#contact_name").val().trim() == '') {
			dialog.info("请输入联系人名称！", function() {
			}, 2000);
			return false;
		}
		if ($("#phone").val().trim() == '') {
			dialog.info("请输入联系人电话！", function() {
			}, 2000);
			return false;
		}
		if ($("#apply_reason").val().trim() == '') {
			dialog.info("请输入申请事由！", function() {
			}, 2000);
			return false;
		}
		var doc_ids = $("#doc_ids").val();
		/* if (doc_ids == null || doc_ids == "") {
			dialog.info("请上传资质文件！", function() {
			}, 2000);
			return false;
		}  */
		var contact_name = $("#contact_name").val().trim();
		var phone = $("#phone").val().trim();
		var applyreason = $("#apply_reason").val().trim();
		$.ajax({
					url : catalogUrl,
					type : "POST",
					data : {
						method : "addCatalogApply",
						"apply_phone" : phone,
						"apply_reason" : applyreason,
						"apply_files" : doc_ids,
						"conf_type" : "2",
						"cata_id" : cata_id,
						"cata_name" : cata_name,
					},
					success : function(data) {
						if (data != null && data.code > 0) {
							dialog
									.info(
											"您的申请已提交,等待审核中！",
											function() {
												window.location.href = "${fn:getLink('catalog/index.jsp')}?cata_type=default";
											}, 2000);
						} else {
							dialog.info("申请提交失败！", function() {
							}, 2000);
						}
					},
					error : function(data) {
						alert('网络异常');
					},
					dataType : "json"
				});

	};
	$(function() {
		var uploader = new plupload.Uploader(
				{
					runtimes : 'html5,flash,silverlight,html4',
					browse_button : 'pickfiles', // you can pass an id...
					container : document.getElementById('container'), // ... or DOM Element itself
					url : __rcservice + '/upload',
					multipart_params : {
						uid : uid,
						type : 'doc',
						disk_id : '1',
						real_path : 'orgfileset',
						folder_id : 0
					},
					filters : {
						max_file_size : '50mb',
						mime_types : [ {
							title : "Image files",
							extensions : "jpg,gif,png"
						}, {
							title : "Zip files",
							extensions : "zip"
						} ]
					},

					init : {
						PostInit : function() {
							document.getElementById('filelist').innerHTML = '';
							document.getElementById('uploadfiles').onclick = function() {
								uploader.start();
								return false;
							};
						},

						FilesAdded : function(up, files) {
							plupload
									.each(
											files,
											function(file) {
												document
														.getElementById('filelist').innerHTML += '<div id="' + file.id + '">'
														+ file.name
														+ ' ('
														+ plupload
																.formatSize(file.size)
														+ ') <b></b></div>';
											});
						},

						UploadProgress : function(up, file) {
							document.getElementById(file.id)
									.getElementsByTagName('b')[0].innerHTML = '<span>'
									+ file.percent + "%</span>";
						},
						FileUploaded : function(up, file, info) {
							var r = info.response;
							var object = eval('(' + r + ')');
							var fileUUID = object.uuid;
							var fileDocId = object.docid;
							if (fileDocId != null) {
								var doc_ids = $("#doc_ids").val();
								if (doc_ids == "") {
									doc_ids = fileDocId;
								} else {
									doc_ids = doc_ids + "," + fileDocId;
								}
								$("#doc_ids").val(doc_ids);
							}
							try {
								if (fileUUID != null) {
									dialog.info("上传成功！", function() {
									}, 1000);
								} else {
									dialog.info("上传失败！", function() {
									}, 1000);
								}
							} catch (e) {

							}
						},
						Error : function(up, err) {
							document.getElementById('console').appendChild(
									document.createTextNode("\nError #"
											+ err.code + ": " + err.message));
						}
					}
				});

		uploader.init();
	});
</script>
