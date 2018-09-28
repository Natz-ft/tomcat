<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
if(document.getElementById("nav-app")){
	var navOpen = document.getElementById("nav-app");
	if(navOpen.getAttribute("class")){
		navOpen.setAttribute("class", navOpen.getAttribute("class")+" on");
	}else{
		navOpen.className = navOpen.className +" on";
	}
	
}
</script>
<script type="text/javascript">
$("#appmanagelist").addClass('menuon');
</script>
<website:style href="css-open/app-create.css"/>
<website:style href="css-open/app-list.css"/>
<style>
.kfz_main{
	margin-left: 0;
}
.content-wrap{
padding-bottom:0;
}
.app-all-list .app-type .txt{
	font-size: 13px;
}
.content-holder{
margin-bottom:20px;
}
.app-btn span{
display:block;
text-align:center;
}
.app-btn .app-num{
font-size:32px;
color:#23B3DA;
}
</style>

<div class="kfz_main">
	<div class="kfz_right">
	<!-- 内容加载区域 -->
	<div class="content-wrap" id="content-wrap" style="margin-top: 0px">
		<div id="appListHeaderWrapper">
			<div class="cont-title">
				<span class="title">
					<c:choose>
						<c:when test="${empty applist_title || applist_title eq null || applist_title eq ''}">全部应用</c:when>
						<c:otherwise>
							搜索应用：${applist_title}
						</c:otherwise>
					</c:choose>
				</span>
				<span class="title2">共<span class="num" id="appnum">${list.totalCount}</span>项应用</span>
				<div class="opt">
					<website:widget path="dev/open/searchBox.jsp?searchURL=${fn:getLink('console/appList.jsp')}"/>
				</div>
			</div>
		</div>
		<div class="app-list">
			<ul class="app-all-list">
				<c:forEach var="item" items="${list.data}"> 
					<li class="clearfix">
						<div class="c1">
							<a class="app-icon" href="./app.htm?app_id=${item.app_id}">
								<img class="appicon-css3" alt="${item.app_alias}" src="${fn:getConfValues('global.index.rcservice')}/doc?doc_id=${item.app_icon }"/>
							</a>
							<div class="app-info">
								<a class="app-name ellipse" href="./app.htm?app_id=${item.app_id}">${item.app_alias}</a>
								<p class="app-intro ellipse">
									<c:forEach var="p" items="${item.group_names}">
										<span>${p}</span>
									</c:forEach>
								</p>
							</div>
						</div>
						<div class="c2">
							<c:choose>
								<c:when test="${item.app_type=='default' }">
									<div class="app-type ${item.has_website eq '1' ? 'on' : ''}">
										<a href="./app.htm?app_id=${item.app_id}#outter">
											<p class="txt">站外应用</p>
											<div class="menu-icons outter"></div>
										</a>
									</div>
									<div class="app-type ${item.has_inner eq '1' ? 'on' : ''}">
										<a href="./app.htm?app_id=${item.app_id}#inner">
											<p class="txt">站内应用</p>
											<div class="menu-icons inner"></div>
										</a>
									</div>
									<div class="app-type ${item.has_mobile eq '1' ? 'on' : ''}">
										<a href="./app.htm?app_id=${item.app_id}#mobile">
											<p class="txt">移动应用</p>
											<div class="menu-icons mobile"></div>
										</a>
									</div>
									<div class="app-type ${item.has_pc eq '1' ? 'on' : ''}">
										<a href="./app.htm?app_id=${item.app_id}#pc">
											<p class="txt">桌面应用</p>
											<div class="menu-icons pc"></div>
										</a>
									</div>
								</c:when>
								<c:otherwise>
									<c:choose>
										<c:when test="${item.app_type=='mobile' }">
											<div class="app-type on">
												<a href="./app.htm?app_id=${item.app_id}#mobile">
													<p class="txt">移动应用</p>
													<div class="menu-icons mobile"></div>
												</a>
											</div>
										</c:when>
										
										<c:when test="${item.app_type=='inner' }">
											<div class="app-type on">
												<a href="./app.htm?app_id=${item.app_id}#inner">
													<p class="txt">站内应用</p>
													<div class="menu-icons inner"></div>
												</a>
											</div>
										</c:when>
										
										<c:when test="${item.app_type=='outter' }">
											<div class="app-type on">
												<a href="./app.htm?app_id=${item.app_id}#outter">
													<p class="txt">站外应用</p>
													<div class="menu-icons outter"></div>
												</a>
											</div>
										</c:when>
										<c:when test="${item.app_type=='pc' }">
											<div class="app-type on">
												<a href="./app.htm?app_id=${item.app_id}#pc">
													<p class="txt">桌面应用</p>
													<div class="menu-icons pc"></div>
												</a>
											</div>
										</c:when>
									</c:choose>
								</c:otherwise>
							</c:choose>
							
						</div>
					</li>
				</c:forEach>
			</ul>
		</div>
		<div id="paper" class="paper" style="width: 600px; margin: 10px auto;"></div>
	</div>
	</div>
	<!-- 内容加载区域 -->
</div>

<script type="text/javascript">
	var rcservice = "${fn:getConfValues('global.index.rcservice')}/doc?doc_id=";
	var ICON_PREFIX = "${fn:getUrl('')}";
	var keyword = '${applist_title}';
	seajs.use("modules/applists", function(applist){
		applist.renderPage("${list.totalCount}", "${list.pageSize}", "${list.nowPage}");
	});
</script>
