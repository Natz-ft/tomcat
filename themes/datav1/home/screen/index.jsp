<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>${regionStatistics.region_name }数据开放平台_数据API_大数据</website:title>
<website:meta name="title" content="广州市数据开放平台_数据API_大数据" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="广州市数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<website:style href="css/index/sy_style.css" />
<website:script src="js/index/main.js" />
<website:script src="js/common/modal.js" />
<website:widget path="../widget/wechat.jsp" />
<website:style href="css/common/wechat.css" />
<script>
var queryOrgUrl="${fn:getLink('index.do')}?method=getRecord";
</script>
<div class="sy_carousel">
	<div class="sy_carobg sy_carobg1" name="carobg"></div>
	<div class="sy_carobg sy_carobg2" name="carobg"></div>
	<div class="sy_caroleft"></div>
	<div class="sy_content" id="sy_lunbobg">
		<div class="sy_carou sy_caro1" name="caro"></div>
		<div class="sy_carou sy_caro2" name="caro"></div>
		<div class="sy_notice">
			<div class="sy_noticetitle">
				<div class="sy_notitleleft" id="sy_titlegonggao">
					<a href="${fn:getLink('news/newsList.htm') }?column_id=1"
						target="_blank">更多公告</a>
				</div>
				<!-- <div class="sy_notitleright" id="sy_titlexinwen"><a href="${fn:getLink('news/newsList.htm') }?column_id=2" target="_blank">数据新闻</a></div> -->
			</div>
			<div class="sy_shownotice" id="sy_gonggao">
				<ul>
					<c:forEach items="${news_gg.records }" var="news"
						varStatus="status">
						<li>
							<div>
								<a
									href="${fn:getLink('news/newsDetail.htm') }?news_id=${news.res_id}&directory_id=${news.directory_id}"
									target="_blank" title='${news.title}'>${news.title}</a>
								<c:if test="${status.index<=1 }">
									<em class="sy_checked"></em>
								</c:if>
							</div>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="sy_carouselbutton">
			<a><div class="sy_carouchecked" id="sy_button1" name="buttons"></div></a>
			<a><div class="sy_carouncheck" id="sy_button2" name="buttons"></div></a>
		</div>
	</div>
</div>
<!--轮播END-->

<!--统计BEGIN-->
<div class="sy_count">
	<div class="sy_countbgleft"></div>
	<div class="sy_countbgright"></div>
	<div class="sy_content">
		<div class="sy_countleft">
			<span>${sumItem}</span>条数据；<span>${catalogCount}</span>个数据集；<span>${orgCount}</span>个部门
		</div>
		<div class="sy_countright">
			<span>${updateItemCount}</span>条数据；<span><c:if
					test="${empty updateCatalog }">0</c:if>
				<c:if test="${!empty updateCatalog }">${updateCatalog }</c:if></span>个数据集
		</div>
	</div>
</div>
<!--统计END-->

<!--主题BEGIN-->
<div class="sy_theme">
	<div class="sy_content">
		<div class="sy_themetitle"></div>
		<div class="sy_themeline"></div>
		<div class="sy_themelist">
			<ul>
				<c:forEach var="item" items="${resGroup}" varStatus="status">
					<a href="${fn:getLink('catalog/index.htm?subjectId=')}${item.id }"
						target="_blank">
						<li>
							<div class="hovercircle"></div>
							<div class="allicon sy_themel${item.order_id }"></div>
							<div class="sy_themelogo">
								<c:if test="${item.group_hot==1 }">
									<img src="${fn:getLink('/img/index/ico_hot.png')}">
								</c:if>
							</div>
							<div>${item.name }</div>
					</li>
					</a>
				</c:forEach>
				<a target="_blank"
					href="${fn:getLink('catalog/index.htm?subjectId=')}${item.id }">
					<li>
						<div class="hovercircle"></div>
						<div class="allicon sy_themel21"></div>
						<div class="sy_themelogo"></div>
						<div>查看更多</div>
				</li>
				</a>
			</ul>
		</div>
	</div>
</div>
<!--主题END-->

<!--详情BEGIN-->
<div class="sy_detail">
	<div class="sy_content">
		<div class="sy_detailleft">
			<div class="sy_detailtjzy">
				<a href="${fn:getLink('catalog/index.htm')}" target="_blank">更多&gt;&gt;</a>
			</div>
			<div class="catalog_left">
				<ul class="catalog_list">
					<c:forEach var="dataCatalog" items="${dataCatalogPageList.records}"
						varStatus="status">
						<li>
							<div class="cata_header">
								<span class="cata_title"><a target="_blank"
									href="${fn:getLink('catalog/detail.htm?cata_id=')}${dataCatalog.cata_id}">${dataCatalog.title}</a></span>
								<span class="cata_class">【${fn:subString(dataCatalog.group_name,6)}】</span>
							</div>
							<div class="cata_body">
								<div class="cata_left">
									<!-- 	     <div class="cata_price">
							      数据标价：免费
							     </div> -->
									<div class="cata_info">
										<span>所属部门：${dataCatalog.org_name}</span> <span>数量：累计${dataCatalog.data_count}条数据</span>
										<span>发布时间：${dataCatalog.released_time}</span>
									</div>
									<div class="cata_content">${dataCatalog.description }</div>
								</div>
								<div class="cata_right">
									<div class="cata_operate">
										<!-- <span class="cata_contrast"><i></i>对比</span> -->
										<span><i></i><a target="_blank"
											href="${fn:getLink('relnet/?cata_id=')}${dataCatalog.cata_id}">图谱</a></span>
									</div>
									<%-- <div class="cata_format">
							     			<c:if test="${f:contains(dataCatalog.data_format,'xml')}">
												<span class="cata_xml"></span>
											</c:if>
											<c:if test="${f:contains(dataCatalog.data_format,'xls')}">
												<span class="cata_xls"></span>
											</c:if>
											<c:if test="${f:contains(dataCatalog.data_format,'json')}">
												<span class="cata_json"></span>
											</c:if>
											<c:if test="${f:contains(dataCatalog.data_format,'lbs')}">
												<span class="cata_lbs"></span>
											</c:if>
							      
							      
							     </div> --%>
								</div>
							</div>
						</li>

					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="sy_detailright">
			<%-- 				<div class="catalog_datasay">
					<div class="datasay_header">
						<div class="datasay_attention"></div>
					</div>
					<div class="datasay_body">
						<div class="datasay_title"><a href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.news_id}&column_id=${SideNewsBig.directory_id}">${f:substring(SideNewsBig.title,0,10)}...</a></div>
						<div class="datasay_date"><fmt:setLocale value="zh"/><fmt:formatDate value="${SideNewsBig.create_time}"/></div>
						<a href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.news_id}&column_id=${SideNewsBig.directory_id}"><img src="${SideNewsBig.logo}" width="240" height="110"/></a>
						<div class="datasay_content">
							<a href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.news_id}&column_id=${SideNewsBig.directory_id}">${f:substring(SideNewsBig.abstracts,0,60)}...</a>
						</div>
						<a href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.news_id}&column_id=${SideNewsBig.directory_id}"><div class="datasay_viewall">阅读全文</div></a>
					</div>
				</div> --%>
			<div class="sy_detailxzph">
				<div class="sy_xzphtitle">
					<div>下载排行</div>
					<a href="${fn:getLink('catalog/#down') }" target="_blank">更多&gt;&gt;</a>
				</div>
				<%-- 	<div class="sy_xzphcontent">
					<ul>
						<c:forEach var="dataCatalog"
							items="${dataCatalogDownloadPageList.list}" varStatus="status">
							<li><span class="count-ico" >${status.count}</span>
							<a href="${fn:getLink('catalog/detail.htm?cata_id=')}${dataCatalog.id}" target="_blank">${dataCatalog.name}</a></li>
						</c:forEach>
					</ul>
				</div> --%>

				<div class="sy_xzphcontent">
					<ul>
						<website:widget path="catalog/downloadList.jsp" />
					</ul>
				</div>
			</div>

			<div class="sy_detailrmbq">
				<div class="sy_rmbqtitle">
					<div>热门标签</div>
					<a href="analyse/index.htm" target="_blank">更多&gt;&gt;</a>
				</div>
				<div id="sy_datashow" class="sy_rmbqcontent"></div>
			</div>
			<!-- 
			<div class="sy_detailwsdc">
				<a href="${fn:getLink('interact/Faq.htm?faq_id=13') }" target="_blank"><img src="${fn:getLink('img/index/pic_dc.jpg')}" alt=""></a>
			</div>
			 -->
			<!-- <div class="sy_detailgywm">
				<div class="sy_gywmtitle">
					<div>关注我们</div>
				</div>
				<div class="sy_gywmcontent">
					<div class="sy_gywmmodel">
						<div class="sy_gywmlogo">
							<a href="javascript:void(0);" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"> <img
								src="img/index/ico_xlwb.jpg" alt="">
							</a>
						</div>
						<div class="sy_gywmtext">
							<a href="javascript:void(0);" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a>
						</div>
					</div>
					<div class="sy_gywmmodel">
						<div class="sy_gywmlogo">
							<a title="分享到腾讯微博" href="javascript:void(0);"> <img
								src="img/index/ico_txwb.jpg" alt="">
							</a>
						</div>
						<div class="sy_gywmtext">
							<a href="javascript:void(0);" title="分享到腾讯微博">腾讯微博</a>
						</div>
					</div>
					<div class="sy_gywmmodel">
						<div class="sy_gywmlogo">
							<a class="jiathis_button_weixin" href="javascript:void(0);"
								title="分享到微信"> <img src="img/index/ico_wx.jpg" alt="">
							</a>
						</div>
						<div class="sy_gywmtext">
							<a title="分享到微信" href="javascript:void(0);"
								class="jiathis_button_weixin">微信</a>
						</div>
					</div>
					<script type="text/javascript"
						src="http://v3.jiathis.com/code/jia.js?uid=1" charset="utf-8"></script>
				</div>
			</div> -->
			<div class="sy_detailtjyy">
				<div class="sy_tjyytitle">
					<div>推荐应用</div>
					<a href="${fn:getLink('appcenter/') }" target="_blank">更多&gt;&gt;</a>
				</div>
				<div class="sy_tjyycontent">

					<c:forEach items="${AppInfoList }" var="appInfo" varStatus="status">
						<div class="sy_tjyymodel">
							<div class="sy_tjyylogo">
								<a
									href="${fn:getLink('appcenter/detail.htm') }?app_id=${appInfo.app_id}"
									target="_blank"><c:if test="${empty appInfo.app_logo }">
										<img src="${fn:getUrl('/img/appcenter/default.jpg')}"
											alt="${appInfo.app_alias }" width="55">
									</c:if> <c:if test="${!empty appInfo.app_logo }">
										<img src="${fn:getDocUrl(appInfo.app_logo) }"
											alt="${appInfo.app_alias }" width="55" height="55" />
									</c:if></a>
							</div>
							<div class="sy_tjyytext">
								<a
									href="${fn:getLink('appcenter/detail.htm') }?app_id=${appInfo.app_id}"
									target="_blank">${appInfo.app_alias }</a>
							</div>
						</div>
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
</div>
<website:script src="js/utils/echarts/esl.js" />
<website:script src="js/index/data.js" />
