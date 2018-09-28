<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:title>开发者中心-服务接口测试</website:title>
<website:style href="css/devCenter/serviceTest.css" />
<website:style href="css/devCenter/zxcs.css" />
<website:script src="js/utils/jsonformat.js" />
<website:script src="js/developer/serviceTest.js" />
<div class="content">
	<div class="mini_navi_box">
		<a href="${fn:getLink('index.htm')}"
			style="color: black; text-decoration: none">首页 </a>> <a
			href="${fn:getLink('developer/index.htm')}"
			style="color: black; text-decoration: none">开发者中心</a> > <a
			href="${fn:getLink('developer/service/serviceDetail.htm')}?service_id=${serviceInfo.service_id}"
			style="color: black; text-decoration: none">接口明细</a> > 服务测试
	</div>
	<div class="main_top">${serviceInfo.service_name}——在线测试</div>
	<div class="content_main">
		<div class="main_left">
			<div class="left_n">
				<p>
					服务名称：<br />
					<b>${serviceInfo.service_name}</b>
				</p>
				<p>
					服务地址：<b>${serviceInfo.context}</b>
				</p>
				<p>
					服务版本：<b>${serviceInfo.version_name}</b>
				</p>
				<p class="line"></p>

				<div class="service-param">
					<form action="" class="request-test">
						<input type="hidden" name="@service-id="
							value="${serviceInfo.service_id}"> 服务参数：
						<%-- <div style="height: auto;" class="service-param-item">
						<div>
									<font style="font-size: 13px;" title="页码">page</font>
									<font style="font-size: 13px;">(必填)</font>
									<font style="font-size: 13px;">类型:
										整形</font>
									<font style="color: red; font-size: 13px;">*</font>
								</div><div><input type="text" class="param-input" id="page" name="page" value=""></div>
								</div>
								<div style="height: auto;" class="service-param-item">
						<div>
									<font style="font-size: 13px;" title="分页大小">pagesize</font>
									<font style="font-size: 13px;">(必填)</font>
									<font style="font-size: 13px;">类型:
										整形</font>
									<font style="color: red; font-size: 13px;">*</font>
								</div><div><input type="text" class="param-input" id="pagesize" name="pagesize" value=""></div></div> --%>
						<c:choose>
							<c:when test="${serviceInfo.call_type ne 'webservice'}">
								<c:forEach var="item" items="${additional_info.parameter_desc}">
									<div style="height: auto;" class="service-param-item">
										<div>
											<font title="${item.description}" style="font-size: 13px;">${item.name}</font>
											<font style="font-size: 13px;">${item.requires eq 1? "(必填)": "(选填)"}</font>
											<font style="font-size: 13px;">类型: <c:choose>
													<c:when test="${item.type eq 'string' }">字符串</c:when>
													<c:when test="${item.type eq 'number' }">数值型</c:when>
													<c:when test="${item.type eq 'boolean' }">布尔型</c:when>
													<c:otherwise>未指定</c:otherwise>
												</c:choose>
											</font> <font style="display: none; color: red; font-size: 13px;">*</font>
										</div>
										<div>
											<input type="text" value="" class="param-input"
												name="${item.name}">
										</div>
									</div>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<div style="height: auto;" class="service-param-item">
									<div style="margin-bottom: 5px; padding-left: 5px;">
										<font title="请输入调用webservice的soap消息" style="font-size: 13px;">soap_parameter</font>
										<font style="font-size: 13px;">(必填)</font> <font
											style="font-size: 13px;">类型:&nbsp;字符串</font> <font
											style="display: none; color: red; font-size: 13px;">*</font>
									</div>
									<div>
										<input type="text" value="" class="param-input"
											name="soap_parameter">
									</div>
								</div>
							</c:otherwise>
						</c:choose>
					</form>
					<div id="call-service" class="call-service">
						<input type="button" name="" value="" onclick="testService();">
					</div>
				</div>

			</div>
		</div>

		<div class="main_right">
			<div>
				<font style="font-size: 14px;">请求：</font>
			</div>
			<div>
				<textarea class="param-textarea" readonly></textarea>
			</div>
			<div style="margin-top: 20px;">
				<font style="font-size: 14px;">返回的内容：</font>
			</div>
			<div>
				<textarea class="result-textarea"></textarea>
			</div>
		</div>
	</div>
</div>