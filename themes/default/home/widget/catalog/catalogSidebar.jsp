<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<div class="side-title" style="margin-bottom: 10px;">
	<span><em id="filter_count"> <c:choose>
				<c:when test="${not empty all_count }">
						    ${all_count }
					    </c:when>
				<c:otherwise>
					        0
					    </c:otherwise>
			</c:choose>
	</em>条数据</span>
</div>
<div class="side-title">
	<span>筛选条件</span> <span class="side-remove g-right"><i
		class="fa fa-ban" aria-hidden="true"></i>清空筛选条件</span>
</div>
<div class="side-content">
	<div class="side-checked">
		<ul id="filter_container">
		</ul>
	</div>
	<div class="side-search">
		<input type="text" class="m-input" placeholder="在结果中搜索..." /> <i
			class="fa fa-search" aria-hidden="true"></i>
	</div>
	<div id="left_group_count"></div>
</div>
