<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="left">
	<div class="txt">
		<div class="zijj">
			<div class="biaoge">
				<span class="content-title"><img
					src="${fn:getUrl('/img/catalog/detail/right_ico.jpg')}" width="13"
					height="13" />资源简介</span>
			</div>
			<div class="xiazai">${dataCatalog.description}</div>
		</div>

		<div class="biaoge">
			<span class="content-title"><img
				src="${fn:getUrl('/img/catalog/detail/right_ico.jpg')}" width="13"
				height="13" />统计热度</span>
		</div>
		<c:if test="${not empty interactiveMap}">
			<div class="xiazai_1">
				<span class="info-cont" style="margin-right: 25px;">访问量：${interactiveMap.views}次</span>
				<span class="info-cont" style="margin-right: 25px;">下载量：${interactiveMap.downloads}次</span>
				<span class="info-cont" style="margin-right: 25px;">评论量
					：${interactiveMap.comments}次</span> <span class="info-cont"
					style="margin-right: 25px;">评分量 ：${interactiveMap.points}次</span> <span
					class="info-cont" style="margin-right: 25px;">订阅量
					：${interactiveMap.favs}人</span>
			</div>
		</c:if>
		<c:if test="${empty  interactiveMap}">
			<div class="xiazai_1">
				<span class="info-cont" style="margin-right: 25px;">访问量：0次</span> <span
					class="info-cont" style="margin-right: 25px;">下载量：0次</span> <span
					class="info-cont" style="margin-right: 25px;">评论量 ：0次</span> <span
					class="info-cont" style="margin-right: 25px;">评分量 ：0次</span> <span
					class="info-cont" style="margin-right: 25px;">订阅量 ：0人</span>
			</div>
		</c:if>

		<div class="tongji">
			<div class="title_1">
				<div class="fwl">日统计量</div>

				<div width="auto" style="float: right; padding-right: 10px;">
					<input id="statistic-btn" class="btn_gray" type="button"
						style="cursor: pointer;" value="确 定" onclick="myChartShow()">
				</div>
				<div class="birthday-picker">
					<select class="birth-year" id="birthYear">
						<c:forEach begin="0" end="10" step="1" varStatus="status">
							<c:choose>
								<c:when test="${1 == status.count}">
									<option value="${year-status.count+1}" selected="selected">${year-status.count+1}</option>
								</c:when>
								<c:otherwise>
									<option value="${year-status.count+1}">${year-status.count+1}</option>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</select> <select class="birth-month" id="birthMonth">
						<c:forEach begin="0" end="${month-1}" step="1" varStatus="status">
							<c:choose>
								<c:when test="${month == status.count}">
									<option selected="selected" value="${status.count}">${status.count}</option>
								</c:when>
								<c:otherwise>
									<option value="${status.count}">${status.count}</option>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</select>
				</div>
			</div>
			<div class="fwltj" id="fwltj"></div>
		</div>
		<div class="biaoge">
			<span class="content-title"><img
				src="${fn:getUrl('/img/catalog/detail/right_ico.jpg')}" width="13"
				height="13" />评分</span>
		</div>

		<div class="xiazai">
			<div>
				我来评分：
				<div class="wlpfdiv">
					<span class="wlpfspan"> <b class="sstar" id="pf_1"></b> <b
						class="sstar" id="pf_2"></b> <b class="sstar" id="pf_3"></b> <b
						class="sstar" id="pf_4"></b> <b class="sstar laststar" id="pf_5"></b>
					</span>
				</div>
				<span class="pfms"></span>
			</div>
		</div>
	</div>
</div>