<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:title>服务测试</website:title>
<website:style href="dist/css/developer/serviceTest.css"/>
<style>
.modal-dialog{
	z-index: 1051;
}
</style>
<div class="main">
    <div class="g-main">
        <div class="head">${serviceInfo.service_name} —— 在线测试</div>
       <div class="left">
           <strong>服务名称：</strong>
           <div class="text">${serviceInfo.service_name}</div>
           <strong>服务地址：</strong>
           <div class="text">${serviceInfo.context}</div>
           <strong>服务版本：</strong>
           <div class="text">${serviceInfo.version_name}</div>
           <div class="service-param">
               <div class="request-test">
                   <input name="@service-id=" id="serviceId" value="${serviceInfo.service_id}" type="hidden">
                   	服务参数：
                 	<c:choose>
					<c:when test="${serviceInfo.call_type ne 'webservice'}">
						<c:forEach var="item" items="${additional_info.parameter_desc}">
							<div style="height: auto;" class="service-param-item">
								<div>
									<font title="${item.description}" style="font-size: 13px;">${item.name}</font>
									<font style="font-size: 13px;">${item.requires eq 1? "(必填)": "(选填)"}</font>
									<font style="font-size: 13px;">类型:
										<c:choose>
											<c:when test="${item.type eq 'string' }">字符串</c:when>
											<c:when test="${item.type eq 'number' }">数值型</c:when>
											<c:when test="${item.type eq 'boolean' }">布尔型</c:when>
											<c:otherwise>未指定</c:otherwise>
										</c:choose>
									</font>
 									<c:if test="${1 == item.requires}">
										<font style="color: red; font-size: 13px;">*</font>
									</c:if>
									<c:if test="${1 != item.requires}">
										<font style="display: none;color: red; font-size: 13px;">*</font>
									</c:if> 
								</div>
								<div>
									<input type="text" title="${item.requires}" class="param-input"  name="${item.name}">
								</div>
							</div>
						</c:forEach>
					</c:when>
					<c:otherwise>
						<div style="height: auto;" class="service-param-item">
							<div style="margin-bottom: 5px; padding-left: 5px;">
								<font title="请输入调用webservice的soap消息" style="font-size: 13px;">soap_parameter</font>
								<font style="font-size: 13px;">(必填)</font>
								<font style="font-size: 13px;">类型:&nbsp;字符串</font>
								<font style="color: red; font-size: 13px;">*</font>
							</div>
							<div>
								<input type="text" value="" title="${item.requires}" class="param-input"  name="${item.name}">
							</div>
						</div>
					</c:otherwise>
				</c:choose>
               </div>
               <div id="call-service" class="call-service">
                   <input name="" value="" onclick="testService()" type="button">
               </div>
           </div>
       </div>
       <div class="right">
           <p>请求：</p>
           <textarea  placeholder="请求" class="param-textarea"></textarea>
           <br/>
           <br/>
           <br/>
           <p>返回的内容：</p>
           <div id="result-textarea" placeholder="内容" class="result-textarea"></div>
       </div>
    </div>
</div>
<website:script src="js/servicebus/service/catalog/json.js"/>
<website:script src="dist/js/developer/serviceTest.js" />