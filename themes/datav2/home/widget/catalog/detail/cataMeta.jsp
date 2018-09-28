<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<!---- 数据详情页面 - 数据项元数据部分 ---->
<div class="m-dt-main">
    <div class="dt-content">
        <div class="dt-section">
            <div class="dt-sec-content">
                <table id="metaTable" class="m-table table-hover dt-table">
                    <thead>
                    <tr>
                        <th width="60px">序号</th>
                        <th width="100px">英文名称</th>
                        <th width="200px">中文名称</th>
                        <th width="80px">数据格式</th>
                        <th width="90px">是否统计项</th>
                        <th width="90px">是否展现项</th>
                        <th width="90px">是否搜索项</th>
                        <th width="90px">是否排序项</th>
                        <th>中文描述</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:choose>
                    	<c:when test="${!empty openCatalog.columns}">
                    	<c:set var="line_num" value="1" />
                    	<c:forEach var="item" items="${openCatalog.columns}">
		                    <tr>
		                        <td>${line_num}</td>
		                        <td>${empty item.cataLogOpenColumnConfigure||empty item.cataLogOpenColumnConfigure.meta_column_name_en ? "":item.cataLogOpenColumnConfigure.meta_column_name_en}</td>
		                        <td>${item.name_cn}</td>
		                        <td>${item.data_format}</td>
		                        <td>
		                        	<c:if test="${item.is_count!=0}">√</c:if> 
		                        	<c:if test="${item.is_count==0}">×</c:if>
		                        </td>
		                        <td>
		                        	<c:if test="${item.is_list!=0}">√</c:if> 
		                        	<c:if test="${item.is_list==0}">×</c:if>
								</td>
		                        <td>
									<c:if test="${item.is_search!=0}">√</c:if> 
		                        	<c:if test="${item.is_search==0}">×</c:if>
		                        </td>
		                        <td>
		                        	<c:if test="${item.is_order!=0}">√</c:if> 
		                        	<c:if test="${item.is_order==0}">×</c:if>
		                        </td>
		                        <td title="国家">${item.yw_die}</td>
		                    </tr>
		                <c:set var="line_num" value="${line_num+1 }" />
		                </c:forEach>
		            	</c:when>
		            	<c:otherwise>
							<tr>
								<td colspan="9">暂无元数据信息</td>
							</tr>
						</c:otherwise> 
                    </c:choose>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>