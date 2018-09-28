<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="detail-sidebar">
	<div class="ds-title">
		<span>数据集评分</span>
	</div>
	<div class="ds-content" id="da-content-my" style="height: 160px;">
		<div class="star-num" id="star-num">
			<fmt:formatNumber value="${interactiveMap.use_grade}" pattern="#0.0#"></fmt:formatNumber>
		</div>
		<div class="comment-star">
			<span class="starcon"> <span class="starmon"
				style="width:<c:if test="${!empty interactiveMap.use_scores }">${interactiveMap.use_grade*20}</c:if><c:if test="${empty interactiveMap.use_scores }">0</c:if>%"></span>
			</span>
			<div id="star-points">(${interactiveMap.use_points}人评分)</div>
		</div>
	</div>
	<div class="ds-title">
		<span>我来评分</span>
	</div>
	<c:choose>
		<c:when test="${score!=0}">
			<!--如果当前用户已评分的话显示其评分数值 -->
			<div class="ds-content" style="height: 160px;">
				<div class="comment-star" id="comment-star-my">
					<c:if test="${score>0 }">
						<i class='iconfont icon-pingfen' style='color: rgb(205, 194, 12);'></i>
					</c:if>
					<c:if test="${score-1>0 }">
						<i class='iconfont icon-pingfen' style='color: rgb(205, 194, 12);'></i>
					</c:if>
					<c:if test="${score-2>0 }">
						<i class='iconfont icon-pingfen' style='color: rgb(205, 194, 12);'></i>
					</c:if>
					<c:if test="${score-3>0 }">
						<i class='iconfont icon-pingfen' style='color: rgb(205, 194, 12);'></i>
					</c:if>
					<c:if test="${score-4>0 }">
						<i class='iconfont icon-pingfen' style='color: rgb(205, 194, 12);'></i>
					</c:if>
					<c:if test="${score<5 }">
						<i class='iconfont icon-pingfen'
							style='color: rgb(153, 153, 153);'></i>
					</c:if>
					<c:if test="${score+1<5 }">
						<i class='iconfont icon-pingfen'
							style='color: rgb(153, 153, 153);'></i>
					</c:if>
					<c:if test="${score+2<5 }">
						<i class='iconfont icon-pingfen'
							style='color: rgb(153, 153, 153);'></i>
					</c:if>
					<c:if test="${score+3<5 }">
						<i class='iconfont icon-pingfen'
							style='color: rgb(153, 153, 153);'></i>
					</c:if>
					<div class='comment-description'>
						<c:if test="${score==1 }">1星：很差</c:if>
						<c:if test="${score==2 }">2星：较差</c:if>
						<c:if test="${score==3 }">3星：一般</c:if>
						<c:if test="${score==4 }">4星：较好</c:if>
						<c:if test="${score==5 }">5星：很好</c:if>
					</div>
				</div>
			</div>
		</c:when>
		<c:otherwise>
			<div class="ds-content" style="height: 160px;">
				<div class="comment-star" id="comment-star-my">
					<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
					<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
					<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
					<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
					<i class="iconfont icon-pingfen" style="color: rgb(153, 153, 153);"></i>
					<div class="comment-description"></div>
				</div>
			</div>
		</c:otherwise>
	</c:choose>
</div>


<div class="m-dynamic">
	<div class="dynamic-publish">
		<div class="publish-tab-content">
			<ul>
				<li>
					<div class="publish-box share-pub">
						<img src="${fn:getUrl('img/hd_1.png')}" " alt="" />
						<div class="publish-input">
							<textarea rows="3" class="m-input" id="pub-textarea"></textarea>
						</div>
						<div class="publish-operation">
							<div class="g-left">
								<ul>
									<li id="pub-at"><i>@</i></li>
									<li><i class="fa fa-smile-o emotion"></i></li>
								</ul>
							</div>
							<div class="g-right">
								<button class="m-btn btn-danger btn-sm" style="height: 36px;"
									onclick="javascript:saveComment()">发布</button>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="dynamic-main">
		<div class="dynamic-list">
			<ul id="commentList">

			</ul>
			<div class="m-page pg-info pagination" id="Pagination"></div>
		</div>
	</div>
</div>

