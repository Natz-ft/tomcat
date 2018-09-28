<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>数据目录_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="医疗数据,交通数据,教育数据" />
<website:meta name="Description"
	content="数据目录按照主题类别、组织机构、热门标签三种维度提供教育，医疗，交通，农业，工业，文化，旅游等各类数据资源。" />
<website:script src="js/catalog/main.js" />
<website:script src="js/common/modal.js" />
<website:widget path="../widget/wechat.jsp" />
<website:style href="css/common/wechat.css" />

<website:script src="js/catalog/index.js" />
<website:script src="js/utils/echarts/esl.js" />
<website:script src="js/index/data.js" />
<website:style href="css/catalog/style.css" />
<website:script src="js/utils/jquery.pagination.js" />

<website:style href="css/common/pagination.css" />
<script type="text/javascript">
	var resoucrceurl = "${fn:getLink('catalog/index.do') }?method=SearchCatalog";
	var contentPath = '${fn:getLink('/')}';
	var orgUrl="${fn:getLink('catalog/index.do') }?method=searchOrg";
	var subChildUrl="${fn:getLink('catalog/index.do') }?method=getSubChildList";
	var queryOrgUrl="${fn:getLink('index.do')}?method=getRecord";
	var tag_html='${tag}';
</script>

<div class="catalog_contrast">
	<div class="contrast_body">
		<ul>
		</ul>
		<span class="contrast_submit">关联分析</span> <span
			class="contrast_remove">清空</span>
	</div>
	<a class="contrast_ico">对比</a>
</div>
<div class="catalog_title">
	<div class="catalog_banner">
		<div class="catalog_main">
			<img src="${fn:getUrl('/img/catalog/bannertitle.png')}" alt="">
		</div>
	</div>
	<div class="catalog_screen">
		<div class="catalog_main">
			<div class="catalog_checked">
				<span class="checked_operation checked_default">清除已选属性</span> <span
					class="checked_default">已选：</span> <span
					class="checked_item theme_checked">一级主题：<em></em><i></i></span> <span
					class="checked_item themesecond_checked">二级主题：<em></em><i></i></span>
				<span class="checked_item depart_checked">部门：<em></em><i></i></span>
				<span class="checked_item tag_checked">标签：<em></em><i></i></span> <span
					class="checked_item format_checked">格式：<em></em><i></i></span> <span
					class="checked_item grade_checked">评级：<em></em><i></i></span>
			</div>
			<div class="item_togglebtn togglebtnup"></div>
			<div class="catalog_item">
				<div class="item_main">
					<div class="item_header">
						<span class="item_category"></span>
					</div>
					<div class="item_body">
						<div class="item_content">
							<ul class="item_list cate_list">
								<li>推荐</li>
								<li>主题</li>
								<li>机构</li>
							</ul>
							<div class="item_themelist">
								<span class="theme_viewmore viewmore_event">更多</span>
								<ul class="theme_firstlevel" id="sub-list">
									<c:forEach var="item" items="${resGroups}" varStatus="status">
										<li><img
											src="${fn:getUrl('/img/catalog/icon/')}${item.order_id}.png"
											alt="" /><a rel="${item.id}">${item.name }</a>
										<%-- <span>(${item.cata_amount})</span> --%></li>
									</c:forEach>
								</ul>
								<div class="theme_secondlevel">
									<div class="theme_title">
										<div id="theme-name"></div>
									</div>
									<ul id="sub-child-list">
									</ul>
								</div>
							</div>
							<div class="item_departlist">
								<ul id="depa-list">
									<div>
										<div class="depart_first" id="A-G">A-G</div>
									</div>
									<div>
										<div class="depart_first" id="H-N">H-N</div>
									</div>
									<div>
										<div class="depart_first" id="O-T">O-T</div>
									</div>
									<div>
										<div class="depart_first" id="U-Z">U-Z</div>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="item_main">
					<div class="item_header">
						<span class="item_tag"></span>
					</div>
					<div class="item_body">
						<div class="item_content">
							<span class="item_viewmore viewmore_event">更多</span>
							<ul class="item_list tag_list" id="tag-list">
								<li><a rel="">不限</a></li>
								<c:forEach var="item" items="${tagInfos.records}"
									varStatus="status">
									<li rel="${item.tag }">${item.tag }</li>
								</c:forEach>
							</ul>
						</div>
					</div>
				</div>
				<div class="item_main">
					<div class="item_header">
						<span class="item_format"></span>
					</div>
					<div class="item_body">
						<div class="item_content">
							<ul class="item_list format_list" id="filetype-top-list">
								<li>不限</li>
								<li rel='1'>Xls</li>
								<li rel='2'>Xml</li>
								<li rel='3'>Json</li>
								<li rel='4'>Cvs</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="item_main">
					<div class="item_header">
						<span class="item_grade"></span>
					</div>
					<div class="item_body">
						<div class="item_content" style="border-bottom: 0">
							<ul class="item_list grade_list" id="score-list">
								<li>不限</li>
								<li rel="5">5星</li>
								<li rel="4">4星</li>
								<li rel="3">3星</li>
								<li rel="2">2星</li>
								<li rel="1">1星</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="catalog_sort">
		<div class="catalog_main">
			<div class="sort_sum">
				<span id="record_count"></span>
			</div>
			<div class="sort_cate">
				<ul id="order-list">
					<a rel="releasedDown"><li>默认<i></i></li></a>
					<a rel="modifyTimeDown"><li>更新时间<i></i></li></a>
					<a rel="dataCountDown"><li>数据量<i></i></li></a>
					<a rel="browseDown"><li>访问量<i></i></li></a>
					<a rel="downloadDown" id="down"><li>下载量<i></i></li></a>
					<a rel="scoreDown"><li>评分<i></i></li></a>
					<!-- <a rel="modifyTimeDown"><li>价格<i></i></li></a> -->
				</ul>
			</div>
		</div>
	</div>
</div>
<div class="catalog_content">
	<div class="catalog_main">
		<div class="catalog_left">
			<ul class="catalog_list" id="listul">
			</ul>
			<input type="hidden" id="subjectId" name="subjectId"
				value="${subjectId}" /> <input type="hidden" id="childsubjectId"
				name="childsubjectId" value="" /> <input type="hidden" id="orgId"
				name="orgId" value="" /> <input type="hidden" id="tag" name="tag"
				value="${tag }" /> <input type="hidden" id="orglevel"
				name="orglevel" value="" /> <input type="hidden" id="fileType"
				name="fileType" value="" /> <input type="hidden" id="orderType"
				name="orderType" value="releasedDown" /> <input type="hidden"
				id="score" name="score" value="" />
			<div class="pageye">
				<div id="Pagination" class="pagination"></div>
			</div>
		</div>
		<div class="catalog_right">
			<div class="catalog_datasay">
				<div class="datasay_header">
					<div class="datasay_attention"></div>
				</div>
				<div class="datasay_body">
					<c:if test="${!empty SideNewsBig}">
						<div class="datasay_title">
							<a
								href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.res_id}&res_type=${SideNewsBig.res_type}&column_id=${SideNewsBig.directory_id}">${f:substring(SideNewsBig.title,0,10)}...</a>
						</div>
						<div class="datasay_date">
							<fmt:setLocale value="zh" />
							<fmt:formatDate value="${SideNewsBig.create_time}" />
						</div>
						<a
							href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.res_id}&res_type=${SideNewsBig.res_type}&column_id=${SideNewsBig.directory_id}"><img
							src="${SideNewsBig.logo}" width="240" height="110" /></a>
						<div class="datasay_content">
							<a
								href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.res_id}&res_type=${SideNewsBig.res_type}&column_id=${SideNewsBig.directory_id}">${f:substring(SideNewsBig.abstracts,0,60)}...</a>
						</div>
						<a
							href="${fn:getLink('news/newsDetail.htm')}?news_id=${SideNewsBig.res_id}&res_type=${SideNewsBig.res_type}&column_id=${SideNewsBig.directory_id}"><div
								class="datasay_viewall">阅读全文</div></a>
					</c:if>
				</div>
			</div>

			<div class="catalog_downloadrank">
				<div class="catalog_ranktitle">
					<div>下载排行</div>
					<a href="${fn:getLink('catalog/index.htm')}">更多&gt;&gt;</a>
				</div>
				<div class="catalog_rankcontent">
					<ul>
						<website:widget path="catalog/downloadList.jsp" />
					</ul>
				</div>
			</div>
			<div class="catalog_ad"></div>
			<div class="catalog_hottag">
				<div class="catalog_tagtitle">
					<div>热门标签</div>
					<a href="${fn:getUrl('analyse/')}">更多&gt;&gt;</a>
				</div>
				<div id="sy_datashow" class="catalog_tagcontent"></div>
			</div>

		</div>
	</div>
</div>
