<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>地图服务_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="地图搜索,地图数据" />
<website:meta name="Description" content="地图服务将数据采用地图标识的方式展现给用户。" />

<website:style href="css/map/dtfw_style.css" />
<website:style href="css/map/iconfont.css" />
<website:style href="css/common/pagination.css" />
<website:script src="js/utils/jquery.pagination.js" />

<script type="text/javascript"
	src="http://api.map.baidu.com/api?v=2.0&ak=06hfQa7Ybnb2mHlQBIbGPEKV"></script>
<script type="text/javascript"
	src="http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js"></script>

<script type="text/javascript"
	src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>


<website:script src="js/map/MakerClusterer.js" />
<website:script src="js/map/util.js" />

<script type="text/javascript">
	var cataurl = "${fn:getLink('map/index.do') }?method=GetCatalog";
	var resoucrceurl = "${fn:getLink('map/index.do') }?method=searchCatalog";
	var searchUrl = "${fn:getLink('search/index.do') }?method=SearchByParam";
	var web_doc = "${fn:getConfValue('web_doc')}";
	var contentPath = '${fn:getLink('/')}';
	var imgurl = "${fn:getLink('/img/map/')}";
	var selectArr = [];
	function showSubNav(id) {
		document.getElementById(id).style.display = 'block';
	}
	function hideSubNav(id) {
		document.getElementById(id).style.display = 'none';
	}
	var cityName = "${sessionScope.regionStatistics.region_name }";
	var cityCode = "${sessionScope.regionStatistics.region_code }";
	var municipality = "${sessionScope.regionStatistics.municipality }";
</script>

<div class="dtfw_line"></div>
<!--详情BEGIN-->
<div class="dtfw_con">
	<div class="dtfw_main">
		<div class="dtfw_mainleft" id="dtfw_mainleft"
			style="overflow-y: hidden;">
			<div class="dtfw_ss">
				<div id="search-box">
					<input name="mapSearchKey" type="text" class="input-box"
						id="mapSearchKey" placeholder="输入搜索地图目录名称"/ > <input
						name="" value="搜索" class="button" id="search"
						onclick="searchcatalogbyKey()" />
				</div>
			</div>
			<div class="dtfw_ztfl">
				<div class="ztfltop">
					主题分类<span class="themezk" id="themezk"></span>
				</div>
				<ul class="themeul">
					<c:forEach var="item" items="${reslist}" varStatus="status">
						<a title="${item.name}" rel="${item.id}"
							onclick="searchcatalog('${item.id}');">
							<li><img src="${fn:getUrl('/img/map/sub/')}${item.id}.png"
								width="40" height="40" alt="${item.name}" title="${item.name}">
								<a title="${item.name}" rel="${item.id}"
								onclick="searchcatalog('${item.id}');" class="themeck">${item.name}</a>
						</li>
						</a>
					</c:forEach>
				</ul>

				<div class="ztfltop">
					<a class="listchecked" id="schlb">列表明细</a>
					<!-- &nbsp;&nbsp;|&nbsp;&nbsp;
					<a id="chelb" class="">已选列表</a> -->
				</div>

				<div id="schlist" class="schlist">
					<ul id="schlistul" class='newschlist mainlist'>
					</ul>
				</div>
				<div class="pageye">
					<div id="Pagination" class="pagination"></div>
				</div>
			</div>
		</div>

		<div class="dtfw_mainright" id="dtfw_mainright" style="height: 530px;">
			<div class="dtfw_mainrighttop">

				<ul class="main_nav">
					<li class="navs" style="width: 74px;" id="fscreen"><a
						class="nav_a" id="quanping">全屏显示</a></li>
				</ul>
				<div class="clear"></div>
			</div>
			<div class="mapdraw" id="dituContent"></div>
		</div>
	</div>
</div>
<script type="text/javascript" src="${fn:getUrl('js/map/map.js')}"></script>
