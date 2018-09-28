<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
.news-dynamic .dynamic-list .dyna-info {
	overflow: hidden;
	padding: 15px 0 15px 30px;
	border-left: solid 1px #e5e5e5;
	height: 50px;
}

.news-dynamic .dynamic-list>ul {
	width: 100%;
}

.news-dynamic .dynamic-list .dyna-time {
	position: relative;
	float: left;
	width: 120px;
	padding: 15px 5px;
}

.news-dynamic .dynamic-list .dyna-time:after {
	content: '';
	display: block;
	width: 12px;
	height: 12px;
	background: #fff;
	border: solid 2px #00baf2;
	border-radius: 50%;
	position: absolute;
	left: 112px;
	top: 16px;
}
</style>
<div class="m-tab tab-panel news-dynamic">
	<div class="tab-header">
		<ul>
			<li class="active">数据动态</li>
		</ul>
	</div>
	<div class="tab-body" style="height: 235px">
		<ul>
			<li style="padding: 5px 10px; height: 235px">
				<div class="dynamic-list">
					<ul>
						<c:forEach var="messageFeedBack"
							items="${MessageFeedBackList.records}">
							<li>
								<div class="dyna-time">${fn:dateFormat2(messageFeedBack.create_time,'yyyy-MM') }</div>
								<div class="dyna-info"
									style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
									<a title="${messageFeedBack.content}" style="color: inherit;">${messageFeedBack.content}</a>
								</div>

							</li>
						</c:forEach>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</div>