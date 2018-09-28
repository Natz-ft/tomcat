<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<website:title>数据资讯_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="数据资讯,数据信息,数据新闻" />
<website:meta name="Description" content="广州市数据开放平台数据更新公告，大数据和开放数据新闻资讯。" />
<website:script src="js/news/main.js" />
<website:style href="css/news/zixun.css" />
<website:script src="js/utils/jquery.pagination.js" />
<website:style href="css/common/pagination.css" />
<website:script src="js/common/modal.js" />
<website:style href="css/common/wechat.css" />
<website:widget path="../widget/wechat.jsp" />
<script type="text/javascript">
	var resoucrceurl = "newsList.do?method=queryNewsList";
</script>
<div class="banner">
	<img src="${fn:getUrl('/img/news/b_1.png')}" />
</div>
<!--详情BEGIN-->
<div class="content">
	<div class="main">
		<div class="tab">
			<ul id="top_title">
				<li value=1><img src="${fn:getUrl('/img/news/b_t1.png')}" />平台公告</li>
				<li value=2><img src="${fn:getUrl('/img/news/b_t2.png')}" />数据新闻
				</li>
				<li value=3><img src="${fn:getUrl('/img/news/b_t3.png')}" />行业资讯</li>
				<li value=4><img src="${fn:getUrl('/img/news/b_t4.png')}" />数据应用</li>
			</ul>
			<input id="column_id" name="column_id" value="${column_id}"
				type="hidden" />
		</div>
		<div class="tab_ptgg">
			<ul id="box">
			</ul>
			<div style="text-align: center;">
				<div class="pageye pagination" id="Pagination"></div>
			</div>
		</div>
	</div>
	<!-- 右侧边栏 -->
	<div class="side">
		<div class="side_top">
			<div class="side_guanzhu datasay_attention"></div>
		</div>
		<div class="side_zhu">
			<div class="side_zhu_top">
				<div class="top_main">
					<div class="top_main_b">
						<a target="_blank"
							href="newsDetail.htm?news_id=${SideNewsBig.res_id}&res_type=${SideNewsBig.res_type}&column_id=${SideNewsBig.directory_id}">${f:substring(SideNewsBig.title,0,10)}...</a>
					</div>
					<span style="color: #898989;"><fmt:setLocale value="zh" />
						<fmt:formatDate value="${SideNewsBig.create_time}" /> </span> <br />
					<div class="top_main_n">
						<a target="_blank"
							href="newsDetail.htm?news_id=${SideNewsBig.res_id}&res_type=${SideNewsBig.res_type}&column_id=${SideNewsBig.directory_id}">
							<img src="${SideNewsBig.logo}" width="240" height="110" /><br />
							<div class="top_main_1">${f:substring(SideNewsBig.abstracts,0,60)}...</div>
							<div class="ydqw">
								<span style="font-family: '微软雅黑';"> 阅读全文</span> <span
									style="float: right; margin-right: 10px; margin-top: 6px;"><img
									src="${fn:getUrl('/img/news/c_4.png')}" width="6" height="10" /></span>
							</div>
						</a>
					</div>
				</div>
			</div>
			<div class="side_zhu_main">
				<ul>
					<c:forEach items="${SideNewsSmall}" var="SideNewsSmall"
						varStatus="xh">
						<li><a target="_blank"
							href="newsDetail.htm?news_id=${SideNewsSmall.res_id}&res_type=${SideNewsSmall.res_type}&column_id=${SideNewsSmall.directory_id}">
								<div class="side_main_z">${f:substring(SideNewsSmall.title,0,10)}...</div>
								<div class="side_main_t">
									<img src="${SideNewsSmall.logo}" width="43" height="41" />
								</div>
						</a></li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
</div>
