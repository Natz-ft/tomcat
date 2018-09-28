<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<website:title>${regionStatistics.region_name }公共数据开放平台_地图服务</website:title>
<website:meta name="Keywords" content="地图搜索,地图数据"/>
<website:meta name="Description" content="地图服务将数据采用地图标识的方式展现给用户。"/>
<website:style href="css/map/dtfw_style.css"/>
<website:style href="css/map/iconfont.css"/>
<website:style href="css/common/pagination.css"/>
<website:script src="/libs/assets/jquery.pagination.js"/>
<link rel="stylesheet" href="http://125.70.9.194:801/3.15/esri/css/esri.css">
<script src="http://125.70.9.194:801/3.15/init.js"></script>
<script>

    dojo.require("esri.map");
    var myMap;

    //用于保存地图图层对象
    var imageArr = new Array();

    /**
     * 初始化地图底图图层
     * */
    function init() {
        var options = {logo: false}
        esri.symbols = esri.symbol;
        myMap = new esri.Map("dituContent", options);//在mapDiv中创建map地图对象
        var myTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://125.70.9.194:6080/common/rest/services/ITSMap/MapServer");//切片服务
        myMap.centerAndZoom([104.064, 30.675], 7);
        myMap.addLayer(myTiledMapServiceLayer);//将底图图层对象添加到地图中
    }

    dojo.addOnLoad(init);//页面加载完毕后自动调用init方法

    /**
     * 将获取的经纬度信息通过创建的图层并在图层打点
     * @param imageName
     * @param obj
     */
    function addCord(imageName, cordObj) {
        var gLayer = new esri.layers.GraphicsLayer(); //创建图形显示图层，图形显示图层专门用于在地图上显示点，线，面图形数据
        myMap.addLayer(gLayer);//将图形显示图层添加到地图中
        myMap.setInfoWindowOnClick(true);
        var imageJson = null;
       // for (var i = 0; i < imageArr.length; i++) {
       //     imageJson = imageArr[i];
       //     if (imageName == imageJson['imageName']) {
       //         imageJson = imageArr[i];
       //         continue;
       //     }
       // }
       // if (imageJson != undefined) {

       //     imageJson['layer'] = gLayer;
       //     imageJson['show'] = true;
       // } else {
            imageJson = {"layer": gLayer, "imageName": imageName, "show": true};

            imageArr.push(imageJson);
       // }
        if (cordObj != null && cordObj != undefined) {

            for (var i = 0; i < cordObj.length; i++) {
                //创建点的显示样式对象
                var dataObj = cordObj[i];
                if (dataObj.longitude == undefined || dataObj.longitude == 0 ||
                    dataObj.latitude == undefined || dataObj.latitude == 0) {
                    return;
                }
                var picSymbol = new esri.symbols.PictureMarkerSymbol();
                picSymbol.url="${fn:getLink('/img/map/RedPin1LargeB.png')}"
                picSymbol.width=32;
                picSymbol.height=32;
                var pt = new esri.geometry.Point(dataObj.longitude, dataObj.latitude);//创建点对象
                //设置相关的属性信息对象
                var attr = {"Xcoord": dataObj.longitude, "Ycoord": dataObj.latitude, "Plant": "Mesa Mint"};
                var showInfoList=dataObj.showInfoList;
                var comname = undefined;
                var cphone=undefined;
                for(var m=0;m<showInfoList.length;m++){
                    var dataInfo = showInfoList[m];
                    if(dataInfo.name_cn=="联系电话" || dataInfo.name_cn=="电话"|| dataInfo.name_cn=="咨询电话"){
                        cphone=dataInfo.value;
                    }else if (dataInfo.name_cn=="公司名称" || dataInfo.name_cn=="鉴定机构名称"|| dataInfo.name_cn=="登记机构名称" || dataInfo.name_cn=="机构名称" || dataInfo.name_cn=="机关名称"){
                        comname=dataInfo.value;
                    }
                }
                var infoTemplate = new esri.InfoTemplate((comname==undefined?"":comname),
                    "公司(机构)名称: " + (comname==undefined?"":comname) + " <br/>" +
                    "公司(机构)联系电话:" + (cphone==undefined?"":cphone) + "<br/>"
                );
                var graphic = new esri.Graphic(pt, picSymbol, attr, infoTemplate);//创建图形对象
                gLayer.add(graphic);//将图形对象添加到图形显示图层
            }
        }

    }

    /**
     * 删除图层
     * @param imageName 图层名称
     */
    function deleteImage(imageName) {
        if (imageName == undefined || imageName == null) {
            console.log("图层不能为空");
            return;
        }
        var imageJson = null;
        for (var i = 0; i < imageArr.length; i++) {
            imageJson = imageArr[i];
            if (imageName == imageJson['imageName']) {
                imageJson = imageArr[i];
                imageJson['show'] = false;
                var gLayer = imageJson["layer"];
                gLayer.clear();
                continue;
            }
        }
//        if (imageJson != undefined) {
//            imageJson['show'] = false;
//            var gLayer = imageJson["layer"];
//            gLayer.clear();
//        } else {
//            console.log("图层没有找到")
//        }
    }
</script>

<script type="text/javascript">
    var cataurl = "${fn:getLink('map/index.do') }?method=GetCatalog";
    var map_marker_01 = "${fn:getLink('img/map/maker/map-marker-01.png') }";
    var map_marker_02 = "${fn:getLink('img/map/maker/map-marker-02.png') }";
    var map_marker_03 = "${fn:getLink('img/map/maker/map-marker-03.png') }";
    var map_marker_04 = "${fn:getLink('img/map/maker/map-marker-04.png') }";
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
</script>
<style>
    .m-ft {
        display: none !important;
    }
    path{
        stroke: none !important;
    }
	.esriPopup .titleButton.close{
		opacity: 1;
	}
</style>
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
                        onclick="searchcatalogbyKey()"/>
                </div>
            </div>
            <div class="dtfw_ztfl">
                <div class="ztfltop">
                    主题分类<span class="themezk" id="themezk"></span>
                </div>
                <ul class="themeul" style="height: 76px;">
                    <c:forEach var="item" items="${reslist}" varStatus="status">
                        <%-- 	<a title="${item.name}" rel="${item.id}" onclick="searchcatalog('${item.id}');"> --%>
                        <li><img
                                src="${fn:getUrl('/img/map/sub/')}${item.order_id}.png"
                                width="40" height="40" alt="${item.name}" title="${item.name}"
                                onclick="searchcatalog('${item.id}');"/> <a title="${item.name}"
                                                                            rel="${item.id}"
                                                                            onclick="searchcatalog('${item.id}');"
                                                                            class="themeck">${item.name}</a></li>
                        <!-- </a> -->
                    </c:forEach>
                </ul>

                <div class="ztfltop">
                    <a class="listchecked" id="schlb">列表明细</a>
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
			<div class="mapdraw" id="dituContent" style="position:relative;width:100%;height:100%"></div>
			<div style="position:absolute;margin-left:235px;bottom: 5px;background:rgba(255,255,255,0.7);">审图号：川S(2017)44号(成都) 成S(2017)034号(简阳) 乙测资字 5110222</div>
            <%--<div id="searchMap"></div>--%>
        </div>
    </div>
</div>
<script type="text/javascript" src="${fn:getUrl('js/map/map.js')}"></script>
<script>
    var flag_cataId = [];
</script>
