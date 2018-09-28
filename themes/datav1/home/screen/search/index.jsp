<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<website:script src="js/search/main.js" />
<website:style href="css/search/ssym_style.css" />
<website:script src="js/utils/jquery.pagination.js" />
<website:style href="css/common/pagination.css" />
<div class="ssym_detail">
	<div class="ssym_content">
		<div class="ssym_contenttop">首页 > 搜索</div>
		<div class="ssym_detailleft">
			<div class="ssym_detailtop">
				<ul>
					<li><strong>搜索结果：</strong></li>
					<li><c:if test="${0 == allCount }">全部</c:if> <c:if
							test="${0 != allCount }">
							<a href="javaScript:void(0)" onclick="allPage()">全部</a>
		                		(${allCount})
		                		<input type="hidden" id="allCount"
								value="${allCount}" />
						</c:if></li>
					<li><c:if test="${0 == catalogCount }">数据集</c:if> <c:if
							test="${0 != catalogCount }">
							<a href="javaScript:void(0)" onclick="catalogPage()">数据集</a>
		                		(${catalogCount})
		                		<input type="hidden" id="catalogCount"
								value="${catalogCount}" />
						</c:if> <!--  </li>  
		                <li > 数据集
		                		<c:if test="${ 0 == catalogCount }">
		                			（${catalogCount}）
		                		</c:if>
		                		<c:if test="${0 != catalogCount }">
		                			 <a href="javaScript:void(0)" onclick="catalogPage()">（${catalogCount}）</a>
		                		</c:if>
		                </li>  -->
					<li>API <c:if test="${ 0 == apiCount }">
		                			（${apiCount}）
		                		</c:if> <c:if test="${0 != apiCount }">
							<a href="javaScript:void(0)" onclick="apiPage()">（${apiCount}）</a>
						</c:if>
					</li>
					<li>应用 <c:if test="${ 0 == appCount }">
		                			（${appCount}）
		                		</c:if> <c:if test="${0 != appCount }">
							<a href="javaScript:void(0)" onclick="appPage()">（${appCount}）</a>
						</c:if>
					</li>
					<!--  广州暂时无须
		                <li > 相关资讯
		                		<c:if test="${ 0 == newsCount }">
		                			（${newsCount}）
		                		</c:if>
		                		<c:if test="${0 != newsCount }">
		                			 <a href="javaScript:void(0)" onclick="newsPage()">（${newsCount}）</a>
		                		</c:if>	
		                </li>  
		                 -->
				</ul>
			</div>
			<div class="ssym_detaillist">
				<span class="ssym_ss">找到关于搜索项（<span class="orange">${searchKey}</span>）相关结果${allCount}个
				</span>
				<ul id="searchListUl">
					<c:choose>
						<c:when test="${null != searchCatalogList}">
							<c:forEach var="data" items="${searchCatalogList}">
								<c:if test="${'1' == data.datatype }">
									<li>
										<div class="ssym_lefttop_1"></div>
										<div class="ssym_listcontent">
											<div class="ssym_contop">
												<div class="ssym_contopleft">
													<a
														href="${fn:getLink('catalog/detail.htm?cata_id=')}${data.id}">${data.title}</a>
													<!-- <span class="ssym_constar"><span class="ssym_constar1" style="width: ${data.grade*10}%"></span> </span>--!>
												</div>
						                        <%-- <div class="ssym_fl">【${data.creator}】</div> --%>
									        </div>
					                        <div class="ssym_conbottom"><%-- 发布时间：${data.updatetime } --%>  发布者：${data.creator}<%-- &nbsp;${data.cityname }&nbsp;累计${data.data_count}条数据 --%>	</div>	
					                    	<!-- <div class="ssym_img">
												<img src="../img/index/icon_tjzy_xml.png" alt=""/>	
												<img src="../img/index/icon_tjzy_xls.png" alt=""/>
					                    	</div> -->
													<div class="ssym_conmiddle">
														<div class="ssym_conmiddleleft">${data.description}</div>
													</div>
												</div>
									</li>
								</c:if>
								<c:if test="${'2' == data.datatype }">
									<li>
										<div class="ssym_lefttop_4"></div>
										<div class="ssym_listcontent">
											<div class="ssym_contop">
												<div class="ssym_contopleft">
													<a
														href="${fn:getLink('news/newsDetail.htm') }?news_id=${data.id}&res_type=${data.version}">${data.title}</a>
												</div>
												<div class="ssym_conbottom1">&nbsp;&nbsp;&nbsp;&nbsp;${data.updatetime }
												</div>
											</div>
											<div class="ssym_conmiddle1">
												<div class="ssym_conmiddleleft1">${data.description}</div>
											</div>
										</div>
									</li>
								</c:if>
								<c:if test="${'3' == data.datatype }">
									<li>
										<div class="ssym_lefttop_3"></div>
										<div class="ssym_listcontent">
											<div class="ssym_contop">
												<div class="ssym_contopleft">
													<a
														href="${fn:getLink('appcenter/appUse.htm')}?app_id=${data.id}&version_id=${data.version}">${data.title}</a>
													<span class="ssym_constar"><span
														class="ssym_constar1" style="width: ${data.score*10}%"></span></span>
												</div>
												<div class="ssym_fl">【${data.subjectname}】</div>
											</div>
											<div class="ssym_conbottom">${data.updatetime }发布&nbsp;&nbsp;&nbsp;&nbsp;
												发布者：${data.creator}</div>
											<div class="ssym_img">
												<img src="../img/search/ico_tjzy_sc.png" width="38"
													height="18">
											</div>
											<div class="ssym_conmiddle">
												<div class="ssym_conmiddleleft">${data.description}</div>
											</div>
										</div>
									</li>
								</c:if>
								<c:if test="${'4' == data.datatype }">
									<li>
										<div class="ssym_lefttop_2"></div>
										<div class="ssym_listcontent">
											<div class="ssym_contop">
												<div class="ssym_contopleft">
													<a
														href="${fn:getLink('developer/service/serviceDetail.htm') }?service_id=${data.id}">${data.title}</a>
												</div>
												<div class="ssym_fl">【${data.subjectname}】</div>
											</div>
											<div class="ssym_conbottom">${data.updatetime }发布&nbsp;&nbsp;&nbsp;&nbsp;发布者：${data.creator}
											</div>
											<div class="ssym_img">
												<img src="../img/search/ico_tjzy_sq.png" width="38"
													height="18"><img src="../img/search/ico_tjzy_api.png"
													width="38" height="18">
											</div>
											<div class="ssym_conmiddle">
												<div class="ssym_conmiddleleft">${data.description}</div>
											</div>
										</div>
									</li>
								</c:if>
							</c:forEach>
						</c:when>
						<c:otherwise>
							<li>暂无与${searchKey}相关的搜索数据</li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
			<input type="hidden" id="pageCount" value="${allCount}" /> <input
				type="hidden" id="preSearchKey" value="${searchKey}" /> <input
				type="hidden" id="preSearchType" value="" />
			<div class="pageye">
				<div id="Pagination" class="pagination"></div>
			</div>
		</div>
		<website:widget path="developer/apiRec.jsp" />
	</div>
</div>
