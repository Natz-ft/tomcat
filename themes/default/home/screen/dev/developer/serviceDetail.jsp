<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>API超市-${serviceInfo.service_name }详情</website:title>
<website:style href="dist/css/commonDetail.css"/>
<website:style href="dist/css/apiDetail.css"/>
<style>
.modal-dialog{
	z-index: 1051;
}
</style>
<div class="main">
    <div class="g-main">
        <div class="sidebar side-r">
			<website:widget path="rightComment/downloadList.jsp"/>
			<website:widget path="rightComment/mainTag.jsp"/>
			<website:widget path="rightComment/app.jsp"/>
        </div> 
        <div class="container">
            <div class="detail-right">
                <div class="right-title">
                    <div class="detail-header">
                        <span class="detail-title">${serviceInfo.service_name }</span>
                        <div class="detail-operation">
                        	<span class="detail-share" onclick="testService('${serviceInfo.service_id}')"><i class="iconfont icon-shezhi"></i><em>服务测试</em></span>
                            <span class="detail-share" onclick="serviceApply('${serviceInfo.service_id}')"><i class="iconfont">&#xe665;</i><em>申请服务</em></span>
                            <c:choose>
                            	<c:when test="${'1' == isCollection}">
                            		<span class="detail-collection active"><i class="iconfont icon-shoucang"></i><em>已收藏</em></span>
                            	</c:when>
                            	<c:otherwise>
                            		<span class="detail-collection"><i class="iconfont icon-shoucang"></i><em>收藏</em></span>
                            	</c:otherwise>
                            </c:choose>
                        </div>
                    </div>
                    <div class="detail-simple-info">
                        <div>接口状态：正常</div>
                        <div>提供部门：${serviceInfo.org_name}</div>
                        <div>服务简介：${serviceInfo.service_desc}</div>
                        <div class="detail-count">
                            <span>调用次数：${serviceInfo.total_visits_count}</span>
                            <span>连接应用数：${serviceInfo.app_count}</span>
                            <span>最近更新时间：${serviceInfo.online_time}</span>
                        </div>
                    </div>
                </div>
                <div class="m-tab">
                    <div class="right-nav tab-header">
                        <ul>
                            <li class="data-info active"><i class="iconfont icon-xinxi"></i>接口描述</li>
                            <li class="data-table"><i class="iconfont">&#xe6b3;</i>错误代码</li>
                            <li class="data-api"><i class="iconfont icon-jinru"></i>请求限制</li>
                            <li class="data-download" onclick="showLine('${serviceInfo.service_id}')"><i class="iconfont">&#xe670;</i>服务质量</li>
                        </ul>
                    </div>
                    <input type="hidden" name="serviceId" id="serviceId" value="${serviceInfo.service_id}">
                    <input type="hidden" name="serviceTitle" id="serviceTitle" value="${serviceInfo.service_name}">
                    <input type="hidden" id="odWebUrl" value="${odWebUrl}">
                    <div class="detail-info-list tab-body">
                        <ul>
                            <li>
                                <div class="detail-api">
                                    <ul class="api-list">
                                        <li>
                                            <div class="api-body">
                                                <div class="api-body-left">
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont icon-yingyong"></i>功能说明</div>
                                                        <div class="api-detail">${serviceInfo.service_desc}</div>
                                                    </div>
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont icon-APIjieru"></i>调用说明</div>
                                                        <div class="api-detail">
                                                            <div>调用方式：${serviceInfo.call_type}</div>
                                                            <div>请求地址：${authUrl}${serviceInfo.context}/${serviceInfo.version_name}</div>
                                                        </div>
                                                    </div>
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont icon-jinru"></i>请求参数</div>
                                                        <div class="api-detail">
                                                            <div>所有参数都需进行URL编码，编码时请遵守 RFC 1738。</div>
                                                            <div class="api-table">
                                                                <div>通用参数</div>
                                                                <table>
                                                                    <thead>
                                                                    <tr>
                                                                        <th width="25%">参数名称</th>
                                                                        <th width="15%">是否必须</th>
                                                                        <th width="10%">类型</th>
                                                                        <th width="50%">描述</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td><span>access_token</span></td>
                                                                        <td><span>必填</span></td>
                                                                        <td><span>字符</span></td>
                                                                        <td class="api-desc">OAuth2.0验证授权后获得的token</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="api-table">
                                                                <div>私有参数</div>
                                                                <table>
                                                                    <thead>
                                                                    <tr>
                                                                        <th width="25%">参数名称</th>
                                                                        <th width="15%">是否必须</th>
                                                                        <th width="10%">类型</th>
                                                                        <th width="50%">描述</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                   	<c:choose>
                                                                   		<c:when test="${!empty serviceInfo.add_info.parameter_desc }">
																			<c:forEach var="it" items="${serviceInfo.add_info.parameter_desc}">
			                                                                    <tr>
			                                                                        <td><span>${it.name }</span></td>
			                                                                        <td><span><c:if test="${'1' ==  it.requires}">必填</c:if><c:if test="${'0' ==  it.requires}">非必填</c:if></span></td>
			                                                                        <td><span>${it.type }</span></td>
			                                                                        <td>${it.description }</td>
			                                                                    </tr>																		
																			</c:forEach>
                                                                   		</c:when>
                                                                   		<c:otherwise>
		                                                                    <tr>
		                                                                        <td colspan="4" align="center"><span>无私有参数</span></td>
		                                                                    </tr>                                                                   		
                                                                   		</c:otherwise>
                                                                   	</c:choose>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont icon-chexiao"></i>返回参数</div>
                                                        <div class="api-detail">
                                                            <div class="api-table">
                                                                <table>
                                                                    <thead>
                                                                    <tr>
                                                                        <th width="25%">返回属性名称</th>
                                                                        <th width="75%">描述</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    	<c:choose>
                                                                    		<c:when test="${!empty serviceInfo.add_info.result_desc }">
																				<c:forEach var="it" items="${serviceInfo.add_info.result_desc}">
				                                                                    <tr>
				                                                                        <td><span>${it.name }</span></td>
				                                                                        <td>${it.description }</td>
				                                                                    </tr>																		
																				</c:forEach>                                                                    		
                                                                    		</c:when>
                                                                    		<c:otherwise>
			                                                                    <tr>
			                                                                        <td colspan="2" align="center"><span>无返回参数</span></td>
			                                                                    </tr>                                                                    		
                                                                    		</c:otherwise>
                                                                    	</c:choose>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont icon-APIjieru"></i>测试用例</div>
                                                         <div class="api-detail">
                                                            <div><span>
                                                            	<c:if test="${!empty servicDoc.doc_url }">
	                                                            <a href="${fn:getConfValues('global.index.odweb')}/catalog/catalogDetail.do?method=DownLoadFile&fileType=share_app_data&fileId=${servicDoc.doc_url}&fileName=${servicDoc.doc_name}">
																${servicDoc.doc_name}</a>
																</c:if>
																<c:if test="${empty servicDoc.doc_url }">
																	暂无
	                                                            </c:if>
															</span></div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div class="detail-api">
                                    <ul class="api-list">
                                        <li>
                                            <div class="api-body">
                                                <div class="api-body-left">
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont">&#xe69e;</i>服务级错误码参照</div>
                                                        <div class="api-detail">
                                                            <div class="api-table">
                                                                <table>
                                                                    <thead>
                                                                    <tr>
                                                                        <th width="25%">错误码</th>
                                                                        <th width="75%">说明</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    	<c:choose>
                                                                    		<c:when test="${null != serviceErrorCode && !empty serviceErrorCode }">
                                                                    			<c:forEach var="it" items="${serviceErrorCode }">
				                                                                    <c:if test="${it.errorcode!=''&&it.errorcode!=null&&it.errordesc!=''&&it.errordesc!=null }">
					                                                                    <tr>
					                                                                        <td width="25%">${it.errorcode }</td>
					                                                                        <td width="75%">${it.errordesc }</td>
					                                                                    </tr>                                                                    				
				                                                                    </c:if>
                                                                    			</c:forEach>
                                                                    			<c:if test="${f:length(serviceErrorCode)==1 && serviceErrorCode[0].errorcode==''&&serviceErrorCode[0].errordesc==''}">
	                                                                    			<tr>
	                                                                    				<td colspan="2" align="center">暂无服务级错误码数据</td>
	                                                                    			</tr>
                                                                    			</c:if>
                                                                    		</c:when>
                                                                    		<c:otherwise>
                                                                    		    <tr>
                                                                    				<td colspan="2" align="center">暂无服务级错误码数据</td>
                                                                    			</tr>
                                                                    		</c:otherwise>
                                                                    	</c:choose>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont">&#xe69e;</i>系统级错误码参照</div>
                                                        <div class="api-detail">
                                                            <div class="api-table">
                                                                <table>
                                                                    <thead>
                                                                    <tr>
                                                                        <th width="25%">错误码</th>
                                                                        <th width="75%">说明</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
	                                                                    <c:choose>
	                                                                   		<c:when test="${null != systemErrorCode && !empty systemErrorCode }">
	                                                                   			<c:forEach var="it" items="${systemErrorCode }">
				                                                                    <tr>
				                                                                        <td width="25%">${it.errorcode }</td>
				                                                                        <td width="75%">${it.errordesc }</td>
				                                                                    </tr>                                                                    				
	                                                                   			</c:forEach>
	                                                                   		</c:when>
	                                                                    	<c:otherwise>
	                                                                    	    <tr>
	                                                                    			<td colspan="2" align="center">暂无系统级错误码数据</td>
	                                                                    		</tr>
	                                                                    	</c:otherwise>
	                                                                    </c:choose>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div class="detail-api">
                                    <ul class="api-list">
                                        <li>
                                            <div class="api-body">
                                                <div class="api-body-left">
                                                    <div class="api-part">
                                                        <div class="api-title"><i class="iconfont">&#xe69c;</i>请求限制说明</div>
                                                        <div class="api-detail">
                                                            <div class="api-table">
                                                                <table>
                                                                    <thead>
                                                                    <tr>
                                                                        <th width="25%">级别名称</th>
                                                                        <th width="15%">每时访问量限制</th>
                                                                        <th width="15%">日访问量限制</th>
                                                                        <th width="15%">月访问量限制</th>
                                                                        <th width="30%">说明</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
																		<c:choose>
																			<c:when test="${null != servceLevelList && !empty servceLevelList }">
																				<c:forEach var="level" items="${servceLevelList }">
																					<tr>
																						<td>${level.level_name }</td>
																						<td>${level.hour_maximum }次</td>
																						<td>${level.day_maximum }次</td>
																						<td>${level.month_maximum }次</td>
																						<td>${level.level_desc }</td>
																					</tr>
																				</c:forEach>
																			</c:when>
																			<c:otherwise>
																				<tr>
																					<td colspan="5">暂未定义服务限制级别</td>
																				</tr>
																			</c:otherwise>
																		</c:choose>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                               <div class="api-chart" id="api-line"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<website:script src="libs/assets/echarts/echarts.js"/>
<website:script src="dist/js/api/apiDetail.js"/>
