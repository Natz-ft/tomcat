<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div class="m-tab tab-panel hot-api">
	<div class="tab-header">
		<ul>
			<li class="active">热门API</li>
		</ul>
		<a
			href="${fn:getConfValue('global.index.odweb') }/dev/developer/serviceList.htm"
			target="_blank" class="more">更多&gt;&gt;</a>
	</div>
	<div class="tab-body">
		<ul>
			<li>
				<div class="panel-cata-list">
					<ul>
						<c:forEach var="api" items="${hotApiList}">
							<li>
								<div class="cata-info">
									<span class="format format-lbs">申请${api.num }</span>
								</div>
								<div class="cata-name">
									<a
										href="${fn:getConfValue('global.index.odweb') }/dev/developer/serviceDetail.htm?service_id=${api.service_id }"
										target="_blank">${api.service_name }</a>
								</div>
							</li>
						</c:forEach>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</div>