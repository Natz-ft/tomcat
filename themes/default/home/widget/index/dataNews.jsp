<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
.tab-panel .news-header>ul>li.active {
	top: -2px;
	height: 40px;
	width: 96px;
	color: #c81623;
	background-color: #fff;
	border-top: 2px solid #c81623;
	padding: 0 15px;
	font-size: 16px;
}

.news-data .news-list .news-time {
	position: relative;
	float: left;
	width: 120px;
	padding: 15px 5px;
}

.news-data .news-list .news-time:after {
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

.news-data .news-list .news-info {
	overflow: hidden;
	padding: 15px 0 15px 30px;
	border-left: solid 1px #e5e5e5;
	height: 50px;
}

.news-data .news-list {
	margin-top: 25px;
}

.news-data .news-list>ul {
	width: 100%;
}

.news-data .news-list>ul>li:hover {
	background-color: #f7f7f7;
}

.news-data {
	float: right;
	width: 370px;
	min-height: 290px;
	background-color: #fff;
}

.news-data .news-header {
	position: relative;
	height: 40px;
	padding-left: 0px;
	line-height: 40px;
	background-color: #fafafa;
}

.news-data .news-header span:before {
	content: "";
	position: absolute;
	left: 12px;
	top: 14px;
	width: 5px;
	height: 14px;
	background-color: #fa9f27;
}

.news-data .news-header a {
	position: relative;
	float: right;
	line-height: 36px;
	margin-right: 15px;
	font-size: 12px;
	font-family: SimSun;
	color: #666;
}

.news-header>ul {
	position: absolute;
}

.news-header>ul>li {
	position: relative;
	float: left;
	padding: 0 1px;
	margin-left: -1px;
	line-height: 36px;
	font-size: 16px;
	border: 1px solid #d8d8d8;
	border-bottom: none;
}

.news-data .news-header a:hover {
	color: #2578c4;
}

.news-data .news-body {
	padding: 10px;
}

.news-data .news-body>ul {
	margin: 0;
	padding: 10px 0;
}

.news-data .news-body>ul>li {
	position: relative;
	padding-left: 15px;
	height: 25px;
	line-height: 25px;
}

.news-data .news-body a:hover {
	color: #34ADE6;
}

.news-data .news-body div {
	margin-left: 200px;
	text-align: right;
	font-size: 12px;
	color: #666;
}

.news-data .news-body div span+span {
	margin-left: 5px;
}
</style>

<div class="m-tab tab-panel news-data">
	<div class="news-header">
		<ul>
			<li class="active">数据新闻</li>
		</ul>
		<a href="news/newsList.htm" target="_blank" class="more">更多&gt;&gt;</a>
	</div>
	<div class="tab-body">
		<ul>
			<li style="padding: 5px 10px;">
				<div class="news-list">
					<ul>
						<c:forEach var="cata" items="${noticePage}">
							<li>
								<div class="news-time">${fn:dateFormat(cata.publish_time)}</div>
								<div class="news-info">
									<a
										href="${fn:getLink('news/newsDetail.htm?news_id=')}${cata.res_id }"><span
										style="color: #333;">${cata.title }</span> </a>
								</div>

							</li>
						</c:forEach>

					</ul>
				</div>
			</li>
		</ul>
	</div>
</div>