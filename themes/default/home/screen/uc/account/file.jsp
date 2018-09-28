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
<website:style href="css/blockui_css.css"/>
<website:style href="css/jquery-ui-1.8.18.custom.css"/>
<website:style href="css/disk-all.css"/>
<website:style href="css/widgets.css"/>
<website:style href="css/account.css"/>
<style>
	.file-list .list_table  tr {font-size: 12px;}
	.file-list .list_table  th {
		background-color: #F0EFEE;
		width: 157px;
		border-top: 0px;
		line-height: 45px;
		height: 30px;
		text-align: center;
		font-size: 14px;
		border-collapse: collapse;
		text-align: center;
		color: #373838;
		text-align: center;
		color: #373838;
	}
	.file-list .list_table td {
		border-top: 0px;
		padding:4px 0;
		height: 33px;
		text-align: center;
		font-size: 14px;
		border-collapse: collapse;
	}
	.file-name{
		display: inline-block;
		width: 320px;
		text-overflow: ellipsis;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
	}
	.list_table{width:95%;margin-top:5px;}
	.f-index{width:10%;}
	.f-name{width:55%;}
	.f-type{width:10%;}
	.f-do{width:29%;}
	#del-file{margin-left: 20px;}
	.right{
		text-align: right;
		padding-right: 15px;
		margin: 5px;
		font-size: 14px;
	}
	.right a{
		border: 0;
		margin-top:10px;
	}
</style>
<div class="panel account-show-panel">

		<div class="content-title clearfix">
			<span class="title-icon"></span><span>我的电子档案</span>
			<a style="float:right;margin: 7px 25px 3px;" id="upload-file" act-uid = "${uid}"  class="user_act_btn do"  title="添加电子档案" href="javascript:;" hidefocus="hidefocus">
				<span style="font-size: 15px;line-height: 30px;display: inline-block;margin: 0 8px;color: #fff;">添加电子档案</span>
			</a>
		</div>
		
		<div class="m_warn m_warn_tip">
			<p>温馨提示：</p>
			<p>您可以选择上传jpg、jpeg、png、gif、doc、docx、xls、xlsx等格式的电子档案，但是最大不可以超过10M。</p>
		</div>
		
		<div class="file-list" style="margin:10px 35px;">
			<c:if test="${empty fileList}">
				<p style="margin-left:10px;">暂无档案列表，点击右上角按钮添加电子档案，方便您办事时使用。</p>
			</c:if>
			<c:if test="${!empty fileList}">
				<table class="list_table">
					<tbody  id="file-list-body" style="border: 1px solid #CCC8C3;">
						<tr>
					      <th>序号</th>
					      <th>文件名称</th>
					      <th>文件类型</th>
					      <th>操作</th>
					   	</tr>
						<c:forEach var="file" items="${fileList}" varStatus="status">
							<tr>
								<td class="f-index">${status.index + 1}</td>
								<td class="f-name"><a class="file-name" target="_bank"
									title="${file.file_name}"
									href="${docUrl }/doc?doc_id=${file.doc_uuid }">
										${file.file_name}
								</a></td>
								<td class="f-type">
									<c:if test="${empty file.file_type}">
										未知
									</c:if>
									<c:if test="${!empty file.file_type}">
										<img class="
											<c:if test="${file.file_type == 'img'}">
												imgFile
											</c:if>
										" style="width: 48px; height: 48px;"
											src="
											<c:if test="${file.file_type == 'img'}">
												${docUrl}/doc?doc_id=${file.doc_uuid}
											</c:if>
											<c:if test="${file.file_type == 'doc'}">
												${fn:getLink('images/doc.png')}
											</c:if>
											<c:if test="${file.file_type == 'xls'}">
												${fn:getLink('images/xls.png')}
											</c:if>
											">
									</c:if>
								</td>
								<td class="f-do"><a class="change-file" href="javascript:;"
									act-id="${file.id}" act-doc-id="${file.doc_id}" act-file-type="${file.file_type}">替换文件</a> <a class="del-file"
									href="javascript:;" act-id="${file.id}"  act-doc-id="${file.doc_id}">删除</a></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			<div id="paper" class="paper" style="width:600px;color:black; margin: 30px auto 30px; *margin: 30px auto 10px;"></div>
			</c:if>
		</div>
	
	<div id="uploadbox" style="display:none;padding:10px 20px">
		<div id="fsUploadProgress"  style="background:#fff;height:280px;border:1px solid #ccc;">
			<p id="queuestatus"></p>
			<ol id="log"></ol>
		</div>
		<div class="upload-buttonpane">
			<div id="uploadfirstwrapper" class="atMC blueBtn r2">
				<span id="uploadfirst">选择文件</span>
			</div>
			<button id="cancelbtn" class="pt10 r r2 ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only small-btn" aria-disabled="false" style="padding-top:0px;"><span>关闭</span></button>
		</div>
	</div>


	<div id="del-confirm" title="删除文件" act-id = "" style="display: none;">
		<p>
			<span class="ui-icon ui-icon-alert"
				style="float: left; margin: 0px 7px 20px 0px;"></span>
		<div>确定删除该文件？</div>
		</p>
	</div>
</div>
<website:script src="js/account/file/jquery-ui.min.js"/>
<website:script src="js/account/file/jquery.swfupload.js"/>
<website:script src="js/account/file/swfupload.js"/>
<website:script src="js/account/file/uploadcode.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<website:script src="js/core.js"/>

<script>
	var delFileUrl = "${fn:getLink('account/accountAction.do?method=delFileById')}";
	var hrefUrl = "${fn:getLink('account/file.jsp')}";
	var fileAddUrl = "${fn:getLink('account/accountAction.do?method=fileAdd')}";
	var fileChangeUrl = "${fn:getLink('account/accountAction.do?method=fileChange')}";
	var uploadUrl = "${docUpUrl}";
	var resourceUrl = "${fn:getLink('js/account/file/swfupload.swf')}";
	var loadingUrl = "${fn:getLink('images/loading.gif')}";
	var rcUrl = "${docUrl}";
	var xlsImgUrl = "${fn:getLink('images/xls.png')}";
	var docImgUrl = "${fn:getLink('images/doc.png')}";
	$(document).ready(function(){
		$("#paper").ui_paper({
			pagesize: parseInt("${pageSize }"),
			current: parseInt("${index }"),
			count: parseInt("${count }"),
			url: ""
		});
	});
</script>
<script type="text/javascript" src="${fn:getLink('js/account/file/file.js')}"></script>




