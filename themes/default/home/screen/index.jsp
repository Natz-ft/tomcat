<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_数据API_大数据</website:title>
<website:meta name="title" content="数据开放平台" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />

<website:style href="css/index/index.css" />
<website:script src="js/index/index.js" />
<website:script src="libs/assets/vticker/jquery.vticker.min.js" />

<!--轮播BEGIN-->
<div class="banner">
	<div class="g-main-banner">
		<div class="g-main banner-main">
			<img src="${fn:getUrl('img/index/banner_sm.jpg')}" alt="" />
			<div class="banner-pro">
				<div class="pro1">
					<img src="${fn:getUrl('img/index/arrow_gif.gif')}"
						style="left: 114px; top: 91px;" />
				</div>
				<div class="pro2">
					<img src="${fn:getUrl('img/index/arrow_gif.gif')}"
						style="left: 410px; top: 92px;" />
				</div>
				<div class="pro3">
					<img src="${fn:getUrl('img/index/arrow_gif.gif')}"
						style="left: 732px; top: 92px;" />
				</div>
				<div class="pro4">
					<img src="${fn:getUrl('img/index/arrow_gif.gif')}"
						style="left: 1010px; top: 92px;" />
				</div>
				<div class="banner-lab">
					<img src="${fn:getUrl('img/index/banner_data_txt.png')}"
						style="left: 254px; top: 23px;" /> <img
						src="${fn:getUrl('img/index/bottom.png')}"
						style="left: 205px; top: 68px;" /> <img class="banner-gif"
						src="${fn:getUrl('img/index/circle.gif')}"
						style="left: 204px; top: 69px;" /> <img
						src="${fn:getUrl('img/index/banner_data.png')}"
						style="left: 256px; top: 54px;" />
				</div>
				<div class="serv serv1">
					<a title="API服务"
						href="${fn:getConfValue('global.index.odweb') }/dev/developer/serviceList.htm"
						target="_blank" style="left: 509px; top: 8px; height: 70px;">
						<img src="${fn:getUrl('img/index/banner_api_sm.png')}"
						style="left: 20px; top: 10px;" /> <img
						src="${fn:getUrl('img/index/banner_api_txt.png')}"
						style="left: 75px; top: 20px;" />
					</a>
				</div>
				<div class="serv serv2">
					<a title="目录服务" href="${fn:getLink('catalog/index.htm') }"
						target="_blank" style="left: 505px; top: 112px; height: 70px;">
						<img src="${fn:getUrl('img/index/banner_cata_sm.png')}"
						style="left: 20px;" /> <img
						src="${fn:getUrl('img/index/banner_cata_txt.png')}"
						style="left: 75px; top: 10px;" />
					</a>
				</div>
				<%-- <div class="serv serv3">
                      <a title="地图服务" href="${fn:getLink('map/index.htm') }" target="_blank" style="left: 465px;top: 285px;"></a>
                      <img src="${fn:getUrl('img/index/banner_map.png')}" style="left: 490px;top: 285px;"/>
                      <img src="${fn:getUrl('img/index/banner_map_txt.png')}" style="left: 545px;top: 320px;"/>
                  </div> --%>
				<div class="banner-lab">
					<%-- <a title="数据分析" href="${fn:getLink('analyse/index.htm') }" target="_blank" style="left: 819px;top: 1px;width: 202px;height: 185px;"></a> --%>
					<img src="${fn:getUrl('img/index/banner_lab_txt.png')}"
						style="left: 880px; top: 20px;" /> <img
						src="${fn:getUrl('img/index/bottom.png')}"
						style="left: 860px; top: 106px; width: 120px;" /> <img
						class="banner-gif" src="${fn:getUrl('img/index/circle.gif')}"
						style="left: 859px; top: 107px; width: 120px;" /> <img
						src="${fn:getUrl('img/index/banner_lab.gif')}"
						style="left: 832px; top: 55px; width: 155px;" />
				</div>
				<a title="创新应用" href="${fn:getLink('appcenter/index.htm') }"
					target="_blank"
					style="left: auto; right: -8px; top: 5px; width: 140px; height: 220px; background: #fff; opacity: 0; filter: alpha(opacity = 0);">
				</a>
			</div>
		</div>
		<div class="banner-txt">
			<span class="banner-txt-span"></span> <span><em>${orgCount}</em>个部门;<em>${catalogCount}</em>个数据集;<em>${cataDataCount}</em>条数据;
				<em>${fileCount}</em>个数据文件;<em>${apiCount}</em>个API数; <em>${cataViewCount}</em>访问量;<em>${cataDownCount}</em>下载量</span>
		</div>
	</div>
</div>
<!--轮播END-->

<div class="main">
	<!--主题BEGIN-->
	<div class="m-widget subjH">
		<div class="g-main">
			<div class="subj-title">
				<div class="title-list">
					<ul>
						<li class="active"><span>主题分类</span> <i>SUBJECT</i></li>
						<li><span>行业分类</span> <i>INDUSTRY</i></li>
					</ul>
				</div>
			</div>
			<div class="subj-content">
				<ul>
					<li>
						<div class="num">
							<div class="g-main">
								<div class="num-list">
									<ul>
										<c:forEach var="item" items="${resGroup}" varStatus="status">
											<li><a
												href="${fn:getLink('catalog/index.htm?subjectId=')}${item.id}"
												target="_blank">
													<div class="num-icon">
														<i class="iconfont sy_themel${item.order_id}"></i>
													</div>
													<div class="num-type">${item.name}</div>
													<div class="num-number">
														<em>${item.amount }</em>个数据集
													</div>
											</a></li>
										</c:forEach>
									</ul>
								</div>
								<c:if test="${resGroup.size()>12}">
									<div class="toDowm topNow upDown">
										<img src="${fn:getUrl('img/index/indextop.png')}" alt="">
									</div>
								</c:if>
							</div>
							<div style="clear: both"></div>
						</div>
					</li>
					<li style="display: none;">
						<div class="indus-list">
							<ul>
								<c:forEach var="item" items="${instrGroup}">
									<li><a
										href="${fn:getLink('catalog/index.htm?subjectId=')}${item.id}"
										target="_blank" title="${item.name}">${item.name}</a></li>
								</c:forEach>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!--主题END-->

	<div class="hot">
		<div class="g-main">
			<!--热门数据BEGIN-->
			<website:widget path="index/hotCatalogList.jsp" />
			<!--热门数据END-->

			<!--热门API BEGIN-->
			<website:widget path="index/hotApiList.jsp" />
			<!--热门API END-->

			<!--热门APP BEGIN-->
			<website:widget path="index/hotAppList.jsp" />
			<!--热门APP END-->
		</div>
	</div>

	<div class="news">
		<div class="g-main">
			<!--数据新闻BEGIN-->
			<website:widget path="index/dataNews.jsp" />
			<!--数据新闻END-->

			<!--数据动态BEGIN-->
			<website:widget path="index/dataNewsDynamic.jsp" />
			<!--数据动态END-->
		</div>
	</div>


</div>
<script>
    $(function(){
        $("body").on("click",".topNow",function(){
            $(this).children("img").attr("src","${fn:getUrl('img/index/indexbottom.png')}");
            $(this).removeClass("topNow").addClass("bottomNow");
            $('.num-list').animate({height:'640px'});
        });
        $("body").on("click",".bottomNow",function(){
            $(this).children("img").attr("src","${fn:getUrl('img/index/indextop.png')}");
            $(this).removeClass("bottomNow").addClass("topNow");
            $('.num-list').animate({height:'320px'});
        });
    })
    $('.m-widget.subjH .title-list>ul>li').click(function () {
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('.subj-title').siblings('.subj-content').children('ul').children('li').hide().eq(index).show();
        });
    
</script>
