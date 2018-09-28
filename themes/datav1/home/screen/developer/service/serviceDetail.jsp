<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:style href="css/developer/service//mhkf.css" />

<div class="content">
	<div class="mini_navi_box">
		<a href="${fn:getLink('index.htm')}"
			style="color: black; text-decoration: none">首页 </a>> <a
			href="${fn:getLink('developer/index.htm')}"
			style="color: black; text-decoration: none">开发者中心</a> > 接口明细
	</div>
	<div class="content_main">
		<div class="list_body">
			<div class=wi-wtitle>
				<span>
					<h2>${serviceInfo.service_name}</h2>
				</span>
				<div style="TOP: 10px" class=btn-right>
					<a class="btn-imitate btn-blue" id="ontest">在线测试</a> <a
						class="btn-imitate btn-blue " id="onService"
						href="javascript:checkDev()">申请服务</a>
				</div>
			</div>
			<div class=apicontent>
				<div class=api-moheader>
					<span>1</span> <span>功能说明</span>
				</div>
				<div class=api-mod-desc>${serviceInfo.service_desc}</div>

				<div class=api-moheader>
					<span>2</span> <span>调用说明</span>
				</div>
				<div class=api-mod-desc>
					<h3>
						<span>2.1</span> <span>调用方式</span>
					</h3>
					<div class=mod-text>${serviceInfo.service_desc}</div>
					<h3>
						<span>2.2</span> <span>请求地址</span>
					</h3>
					<div class=mod-text>${serviceInfo.context}</div>
				</div>

				<div class=api-moheader>
					<span>3</span> <span>请求参数</span>
				</div>
				<div class=api-mod-desc>
					<span class=menue_param>所有参数都需进行URL编码，编码时请遵守 RFC 1738。 </span>
					<div>
						<h3>
							<span>3.1</span> <span>通用参数</span>
						</h3>
					</div>
					<div class=mod-text>
						<span>所有api统一传的参数</span>
						<table id=serviceTable class=table-box>
							<thead>
								<tr>
									<th width="25%">参数名称</th>
									<th width="10%">是否必须</th>
									<th width="10%">类型</th>
									<th width="55%">描述</th>
								</tr>
							</thead>
							<tbody>
								<tr class=data_item>
									<td><span>access_token</span></td>
									<td><span>必填</span></td>
									<td><span>字符</span></td>
									<td class=api-desc>OAuth2.0验证授权后获得的token</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div>
						<h3>
							<span>3.2</span> <span>私有参数</span>
						</h3>
					</div>
					<div class=mod-text>
						<table id=inputParamShow class=table-box>
							<thead>
								<tr>
									<th width="25%">参数名称</th>
									<th width="10%">是否必须</th>
									<th width="10%">类型</th>
									<th width="55%">描述</th>
								</tr>
							</thead>
							<tbody>
								<c:choose>
									<c:when test="${empty serviceInfo.add_info.parameter_desc}">
										<tr class="data_item">
											<td colspan=4>无数据存在</td>
										</tr>
									</c:when>
									<c:otherwise>
										<c:forEach var="ite"
											items="${serviceInfo.add_info.parameter_desc}">
											<tr class="data_item">
												<td>${ite.name}</td>
												<td><c:if test="${ite.type eq 'string'}">字符型</c:if> <c:if
														test="${ite.type eq 'number'}">数值型</c:if> <c:if
														test="${ite.type eq 'boolean'}">布尔型</c:if></td>
												<td><c:if test="${ite.requires eq '1' }">必填</c:if> <c:if
														test="${ite.requires eq '0' }">选填</c:if></td>
												<td>${ite.description}</td>
											</tr>
										</c:forEach>
									</c:otherwise>
								</c:choose>
							</tbody>
						</table>
					</div>
				</div>
				<div class=api-moheader>
					<span>4</span> <span>返回参数</span>
				</div>
				<div class=api-mod-desc>
					<div>
						<h3>
							<span>4.1</span> <span>返回参数列表</span>
						</h3>
					</div>
					<div class=mod-text>
						<table id=outputParamShow class=table-box>
							<thead>
								<tr>
									<th width="20%">返回属性名称</th>
									<th width="40%">描述</th>
								</tr>
							</thead>
							<tbody>
								<c:choose>
									<c:when test="${empty serviceInfo.add_info.result_desc}">
										<tr class="data_item">
											<td colspan=4>无数据存在</td>
										</tr>
									</c:when>
									<c:otherwise>
										<c:forEach var="ite"
											items="${serviceInfo.add_info.result_desc}">
											<tr class="data_item">
												<td>${ite.name}</td>
												<td>${ite.description}</td>
											</tr>
										</c:forEach>
									</c:otherwise>
								</c:choose>
							</tbody>
						</table>
					</div>
				</div>
				<div class=api-moheader>
					<span>5</span> <span>返回示例</span>
				</div>
				<div class=api-mod-desc>
					<pre id="code1">${serviceInfo.api_result}</pre>
					<pre id="code2"></pre>
				</div>
				<div class=api-moheader>
					<span>6</span> <span>申请服务</span>
				</div>
				<div class=api-mod-desc>
					<a class=basea href="#">进行申请 </a>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$('#ontest').click(function(event) {
		var id='${serviceInfo.service_id}';
	//	var page=$('#page').val();
	//	var pagesize=$('#pagesize').val();
		window.location.href="${fn:getLink('developer/service/serviceTest.htm')}?service_id="+id;
	})
	
	function checkDev(){
		var uid = $("#uid").val();
		var isLogin = $("#uid").html();
		if(isLogin == null){
/* 			easyDialog.open({
				container : {
					content : "请先登陆！"
				},
				autoClose : 2000
			}); */
			
			className = $(this).attr('class');
			$('#dialogBg').fadeIn(300);
			$('#dialog').removeAttr('class').addClass('animated ' + className + '').fadeIn();
		}
		else{
			window.location.href="${fn:getConfValue('global.index.devweb')}/console/serviceApply.htm";
		}
	}
	function escapeHtml(string) {
	    var entityMap = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': '&quot;',
	        "'": '&#39;',
	        "/": '&#x2F;'
	    };
	    return String(string).replace(/[&<>"'\/]/g, function (s) {
	        return entityMap[s];
	    });
	}
	var code = escapeHtml($('#code1').html());
	$('#code2').html(code);

</script>