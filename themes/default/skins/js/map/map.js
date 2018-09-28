//indexOf()方法返回在数组中可以找到给定元素的第一个索引
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
//删除数组指定元素
Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

$("#listzk").hide();
var themeobj = 0;
var listobj = 1;
//toggleClass() 对设置或移除被选元素的一个或多个类进行切换
$("#themezk").click(function () {
    $("#themezk").toggleClass('themesq');
    $("#listzk").toggleClass('themesq');
    $(".themeul").toggleClass('heightauto');
    if (themeobj == 0) {
        themeobj = 1;
        listobj = 0;
    }
    else if (themeobj == 1) {
        themeobj = 0;
        listobj = 1;
        $("#listzk").hide();
        $(".schlist").show();
    }

});
$("#listzk").click(function () {
    $("#themezk").toggleClass('themesq');
    $("#listzk").toggleClass('themesq');
    $(".schlist").toggle();
    if (listobj == 0) {
        listobj = 1;
        themeobj = 0;
        $(".themeul").removeClass('heightauto');
        $("#listzk").hide();
    }
    else if (listobj == 1) {
        listobj = 0;
        themeobj = 1;
        $(".themeul").addClass('heightauto');
    }

});
//打点图标样式指针；
var pointIndex = 0;
// 百度地图API功能
// var map = new BMap.Map("dituContent"); // 创建Map实例
// window.map = map;//将map变量存储在全局
// initMap();//创建和初始化地图
// map.setMapStyle({style:'googlelite'});
//
// //创建和初始化地图函数：
// function initMap(){
//     createMap();//创建地图
//     setMapEvent();//设置地图事件
//     addMapControl();//向地图添加控件
// }
//创建地图函数：
function createMap() {
    if (cityCode.indexOf("0000") == 2) {
        map.centerAndZoom(cityName, 8); // 初始化地图,设置中心点坐标和地图级别
    } else if (cityCode == '100000') {
        map.centerAndZoom('中国', 5); // 初始化地图,设置中心点坐标和地图级别
    } else {
        map.centerAndZoom(cityName, 11); // 初始化地图,设置中心点坐标和地图级别
    }
}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

var marker = null;
var res = new Array();
var point = null;
var count = 0;
var label = null;
var group_code = null;
var schlist = $("#schlist");
var schlistul = $("#schlistul");
var title = "";
var pageselectCallback1 = function (page_id, jq) {
    queryResByPage(page_id + 1);
};

var searchCallBack = function (page_id, jq) {
    var mapSearchKey = $("#mapSearchKey").val();
    searchMap(mapSearchKey, page_id + 1);
};
// 创建分页元素
var reloadPage = function (totlePage) {
    $("#Pagination").pagination(totlePage, {
        num_edge_entries: 2,
        num_display_entries: 2,
        items_per_page: 10,
        callback: pageselectCallback1
        // 回调函数
    });
};
var searchreloadPage = function (totlePage) {
    $("#reloadPage").pagination(totlePage, {
        num_edge_entries: 2,
        num_display_entries: 2,
        items_per_page: 10,
        callback: searchCallBack
        // 回调函数
    });
};

var queryResByPage = function (page) {
    schlistul.empty();
    var subjectId = group_code;
    var pageSize = 10; // 每页显示条数初始化，修改显示条数，修改这里即可
    var title = $("#mapSearchKey").val();
    $.ajax({
        url: resoucrceurl,
        type: "POST",
        data: {
            "subjectId": subjectId,
            "page": page,
            "pageSize": pageSize,
            "title": title
        },
        success: function (data) {
            var dataobj = data.records;
            if (dataobj != "" && dataobj != null) {
                var dataarr = new Array();
                for (var i = 0; i < dataobj.length; i++) {
                    var obj = dataobj[i];
                    var use_grade = 0;
                    if (obj.catalogStatistic && obj.catalogStatistic.use_grade) {
                        use_grade = obj.catalogStatistic.use_grade;
                    }
                    if (flag_cataId != null && flag_cataId != "") {
                        if (contains(flag_cataId, obj.cata_id)) {
                            dataarr.push("<li><div><a href='" + contentPath + "catalog/catalogDetail.htm?cata_id="
                                + obj.cata_id + "' class='listtitle' title='" + obj.cata_title + "'>" + obj.cata_title + "</a>"
                                + "<span class='starcon'><span class='starmon' style='width:" + parseFloat(use_grade) * 20 + "%'></span></span>"
                                + "<span class='schbtn schbtndel' onclick='delbtn(this);' id='" + obj.cata_id + "' logo='" + obj.cata_logo + "'>" +
                                "<i class='dj'></i>取消</span></div>"
                                + "<div class='listdetail'>" + obj.description + "</div>");
                        } else {
                            dataarr.push("<li><div><a href='" + contentPath + "catalog/catalogDetail.htm?cata_id="
                                + obj.cata_id + "' class='listtitle' title='" + obj.cata_title + "'>" + obj.cata_title + "</a>"
                                + "<span class='starcon'><span class='starmon' style='width:" + parseFloat(use_grade) * 20 + "%'></span></span>"
                                + "<span class='schbtn schbtnadd listuser' onclick='addbtn(this);' id='" + obj.cata_id + "' logo='" + obj.cata_logo + "'>" +
                                "<i class='dj'></i>叠加</span></div>"
                                + "<div class='listdetail'>" + obj.description + "</div>");
                        }
                    } else {
                        dataarr.push("<li><div><a href='" + contentPath + "catalog/catalogDetail.htm?cata_id="
                            + obj.cata_id + "' class='listtitle' title='" + obj.cata_title + "'>" + obj.cata_title + "</a>"
                            + "<span class='starcon'><span class='starmon' style='width:" + parseFloat(use_grade) * 20 + "%'></span></span>"
                            + "<span class='schbtn schbtnadd listuser' onclick='addbtn(this);' id='" + obj.cata_id + "' logo='" + obj.cata_logo + "'>" +
                            "<i class='dj'></i>叠加</span></div>"
                            + "<div class='listdetail'>" + obj.description + "</div>");
                    }
                    var defaultImg = imgurl + "defimg.png";//默认logo
                    var markerimg = imgurl + "defimg.png";//默认logo
                    if (obj.cata_logo != "" && null != obj.cata_logo) {
                        markerimg = obj.cata_logo;
                    }
                    var onerrorimg = 'this.onerror=null;this.src="' + defaultImg + '"';
                    dataarr.push("<img style='height:20px;right:20px;' onerror='" + onerrorimg + "' src='" + markerimg + "'></li>");
                    var onerrorimg = 'this.onerror=null;this.src="' + defaultImg + '"';
                }
                schlistul.append(dataarr.join(''));
                // 获取总页码
                if (page == 1 && data.totalRecord != 0) {
                    reloadPage(data.totalRecord);
                }
            } else {
                if (page == 1) {
                    reloadPage(0);
                }
            }
        }, error: function (data) {
            dialog.info('网络异常', function () {
            }, 3000);
        },
        dataType: "json"
    });
};

// 点击主题分类
function searchcatalog(gid) {
    group_code = gid;
    queryResByPage(1);
}

$('#mapSearchKey').keydown(function (event) {
    if (event.keyCode == 13) {
        queryResByPage(1);
    }
});

function searchcatalogbyKey(gid) {
    queryResByPage(1);
}


var arr_columns = new Array();
var markerClusterer = null;

// map.addEventListener("tilesloaded",function(){
// 	clearMap();
// 	if(arr_columns.length>0){
// 		columnList=[];
// 		loadMapData(arr_columns);
// 		//打点
// 	/*	addPoint(loadMapData);*/
// 	}
// });

//加载地图信息
var columnList = new Array();
var loadMapData = function (arr_columns) {
    console.log(arr_columns)
    pointIndex = arr_columns.length;
    var _curFilter = {};
    _curFilter["showLevel"] = 1;
    // var bounds = map.getBounds();
    // _curFilter["longiLeft"] = bounds.getSouthWest().lng;
    // _curFilter["longiRight"] = bounds.getNorthEast().lng;
    // _curFilter["latiLeft"] = bounds.getSouthWest().lat;
    // _curFilter["latiRight"] = bounds.getNorthEast().lat;
    // 加载数据
    for (var j = 0; j < arr_columns.length; j++) {
        _curFilter["cata_id"] = arr_columns[j];
        loadMap(_curFilter);

    }
};

//定义地图数据加载打点数目方法
var loadMap = function (data) {
    $.post(
        "Index.do?method=GetMapDataType",
        data,
        function (dataType, status) {
            //判断加载的地图数据是历史数据还是新数据
            if ("old" == dataType) {
                // loadOldMapData(data);
                loadNewMapData(data);
            } else if ("new" == dataType) {
                loadNewMapData(data);
            }
        },
        "json"
    );
}

function loadOldMapData(_curFilter) {
    if (_curFilter && _curFilter.cata_id) {
        //加载数据
        var data = _curFilter;
        //获取当前区域点的个数
        $.post(
            "Index.do?method=GetMapPointNum",
            data,
            function (pointList, status) {
                var pointNum = pointList[0].inspur_total_number;
                for (var temp = 0; temp < pointNum; temp += 1000) {
                    //循环加载点
                    _curFilter["temp"] = temp;
                    loadPoint(_curFilter);
                }

            },
            "json"
        );
    }
}

// 获取数据目录，在地图上进行标注
function loadNewMapData(_curFilter) {
    //加载数据
    loadPoint(_curFilter);
    // //根据地图显示级别执行不同的打点操作
    // if(parseInt(showLevel)>=12){
    // 	var data =_curFilter;
    // 	//获取当前区域点的个数
    // 	$.ajax({
    // 		type : 'post',
    // 		url : "Index.do?method=GetMapPointNum",
    // 		dataType : 'json',
    // 		data :data,
    // 		success : function (pointList){
    // 			var pointNum=pointList[0].inspur_total_number;
    // 			for (var temp=0;temp<pointNum;temp+=1000){
    // 				//循环加载点
    // 				_curFilter["temp"]=temp;
    // 				loadPoint(_curFilter);
    // 			}
    // 		},
    // 		error : function(pointList) {
    // 			dialog.info('网络异常',function(){},3000);
    // 		}
    // 	});
    // }else{
    // 	loadPoint(_curFilter);
    // }
}

//定义地图打点方法
function loadPoint(cata_id) {
    var data = {
        showLevel: 11, longiLeft: 103.508343,
        longiRight: 104.654725, latiLeft: 30.39102, latiRight: 30.919893,
        cata_id: cata_id, temp: 0
    };
    ;
    $.post(
        "Index.do?method=GetCatalog",
        data,
        function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var dataLst = data[0].dataList;
                addCord(cata_id, dataLst)
            }
            //清除地图节点
            /*clearMap();*/
            // if (itemList) {
            // 	$.each(itemList,function(key,itemInfo){
            // 		// 区分打点类型：普通打点、点计数
            // 		if ((typeof itemInfo.inspur_InfoList) != 'undefined') {
            // 			//坐标信息获取
            // 			var lng = itemInfo.LONGITUDE;
            // 			var lat = itemInfo.LATITUDE;
            // 			if (itemInfo.LONGITUDE != null) {
            // 				lng = itemInfo.LONGITUDE;
            // 				delete itemInfo.LONGITUDE;
            // 			} else {
            // 				lng = itemInfo.longitude;
            // 				delete itemInfo.longitude;
            // 			}
            // 			if (itemInfo.LATITUDE != null) {
            // 				lat = itemInfo.LATITUDE;
            // 				delete itemInfo.LATITUDE;
            // 			} else {
            // 				lat = itemInfo.latitude;
            // 				delete itemInfo.latitude;
            // 			}
            //
            // 			var grid_item = {};
            // 			grid_item["lng"] = parseFloat(lng);
            // 			grid_item["lat"] = parseFloat(lat);
            //
            // 			var grid = [];
            // 			grid.push(grid_item);
            //
            // 			itemInfo["grid"] = grid;
            // 			var itemInfoList = itemInfo.inspur_InfoList;
            // 			var inspur_total_number = 0;
            // 			var htmlinfo = '<div class="v-name">'+itemInfo.region_name+'</div>';
            // 			$.each(itemInfoList,function(key,itemInfoDetal){
            // 				inspur_total_number = inspur_total_number + itemInfoDetal.inspur_total_number;
            // 				htmlinfo += '<div class="v-info">'+itemInfoDetal.cata_title + "：" + itemInfoDetal.inspur_total_number+'</div>';
            // 			});
            //
            // 			itemInfo['lable'] = inspur_total_number;
            // 			itemInfo['htmlinfo'] = htmlinfo;
            //
            // 			//添加新的坐标点
            // 			addItem(itemInfo);
            // 		} else {
            // 			var dataList = itemInfo.dataList;
            // 			$.each(dataList,function(key,data){
            // 				var lng = data.LONGITUDE;
            // 			var lat = data.LATITUDE;
            // 			if(data.LONGITUDE!=null){
            // 				lng = data.LONGITUDE;
            // 				delete data.LONGITUDE;
            // 			}else{
            // 				lng = data.longitude;
            // 				delete data.longitude;
            // 			}
            // 			if(data.LATITUDE!=null){
            // 				lat = data.LATITUDE;
            // 				delete data.LATITUDE;
            // 			}else{
            // 				lat = data.latitude;
            // 				delete data.latitude;
            // 			}
            //
            // 			var grid_item = {};
            // 			grid_item["lng"] = parseFloat(lng);
            // 			grid_item["lat"] = parseFloat(lat);
            //
            // 			var grid = [];
            // 			grid.push(grid_item);
            //
            // 			data["grid"] = grid;
            // 			});
            // 			/*var dataPoint={
            // 					datalist:dataList,
            // 					logo:itemInfo.cata_logo
            // 			};
            // 			columnList.push(dataPoint);*/
            // 			addPoint(dataList,itemInfo.cata_logo);
            // 		}
            // 	});
            // }
        }, "json");
}

//地图信息面板
var opts = {
    width: 320,     // 信息窗口宽度
    height: 90,     // 信息窗口高度
    panel: "panel", //检索结果面板
    enableAutoPan: true //自动平移
};
var markerWin = [];//地图信息面板数据
//添加项目标注
function addItem(obj) {
    // //覆盖物类型是“点”
    // var itemPos = new BMap.Point(obj.grid[0].lng, obj.grid[0].lat);//获取坐标
    // var opts = {
    //     position : itemPos,    // 指定文本标注所在的地理位置
    //     offset   : new BMap.Size(0,-10)    //设置文本偏移量
    // };
    // var item = new BMap.Label(obj.lable, opts);  // 创建文本标注对象
    // item.setStyle({
    // 	color : "#fff",
    // 	fontSize : "9px",
    // 	height : "20px",
    // 	lineHeight : "16px",
    // 	borderRadius:"3px",
    // 	padding:"0px 3px 2px 3px",
    // 	minWidth:"20px",
    // 	textAlign:"center",
    // 	backgroundColor:"#EE7600",
    // 	borderColor:"#EE7600",
    // 	fontFamily:"Microsoft YaHei"
    // });
    //
    // map.addOverlay(item);//添加覆盖物
    // var panelHtml = obj.htmlinfo;
    // addClickHandler(panelHtml,item);//添加标注点击绑定
    // markerWin.push(panelHtml);
}


//打点
var dataPoint = [];

function addPoint(itemList, cata_logo) {
    // var overArr = [];
    // if((typeof cata_logo) == 'undefined' || cata_logo==null || cata_logo==''){
    // 	cata_logo = '../img/index/minzheng.png';
    // }
    // var myIcon = new BMap.Icon(cata_logo, new BMap.Size(20, 20));
    // myIcon.setImageSize(new BMap.Size(20,20));
    // $.each(itemList,function(key,value){
    //     var point = new BMap.Point(value.grid[0].lng, value.grid[0].lat);
    //     var item = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    //     var panelHtml = "";
    // 	var i=1;
    // 	var len =value.showInfoList;
    // 	if(len.length>0){
    // 		$.each(value.showInfoList,function(key,column){
    //             var col_name_cn = column.name_cn;
    //             var col_value = column.value;
    //             if(col_value!=null&&col_value!=''){
    //             	if(i==0){
    //             		panelHtml += '<div class="v-name">'+col_value+'</div>';
    //             	}else{
    //             		panelHtml += '<div class="v-info">' + col_name_cn + ' ：' + col_value + '</div>';
    //             	}
    //             	i++;
    //             }
    //         });
    // 	}else{
    // 		//默认地图配置打点
    // 		var objTitle = value.TITLE;
    //     	if(objTitle == null || objTitle == "" || objTitle == undefined || objTitle == "null"){
    //     		objTitle = value.title;
    //     		if(objTitle == null || objTitle == "" || objTitle == undefined || objTitle == "null"){
    //     			objTitle = "暂无";
    //     		}
    //     	}
    //     	panelHtml += '<div class="v-name">'+objTitle+'</div>';
    //     	var objAddress = value.ADDRESS;
    //     	if(objAddress == null || objAddress == "" || objAddress == undefined || objAddress == "null"){
    //     		objAddress = value.address;
    //     		if(objAddress == null || objAddress == "" || objAddress == undefined || objAddress == "null"){
    //     			objAddress = "暂无";
    //     		}
    //     	}
    //     	panelHtml += '<div class="v-info">' + '地址' + ' ：' + objAddress + '</div>';
    //     	var objPhone = value.PHONE;
    //     	if(objPhone == null || objPhone == "" || objPhone == undefined || objPhone == "null"){
    //     		objPhone = value.phone;
    //     		if(objPhone == null || objPhone == "" || objPhone == undefined || objPhone == "null"){
    //     			objPhone = "暂无";
    //     		}
    //     	}
    //
    //     	panelHtml += '<div class="v-info">' + '电话' + ' ：' + objPhone + '</div>';
    // 	}
    //
    //     panelHtml = '<div class="v-panel">' + panelHtml + '</div>';
    //     addClickHandler(panelHtml,item);//添加标注点击绑定
    //     markerWin.push(panelHtml);
    //     overArr.push(item);
    // });
    // dataPoint.push(overArr);
    // if(pointIndex==1){
    //   markerClusterer = new BMapLib.MarkerClusterer(map, {markers:overArr});
    //
    // }
    // if(pointIndex==2){
    //
    //  markerClusterer = new BMapLib.MarkerClusterer(map, {markers:overArr});
    //  var style=markerClusterer.getStyles();
    //  style[0]=style[1];
    //  markerClusterer.setStyles(style);
    // }
    // if(pointIndex==3){
    //  markerClusterer = new BMapLib.MarkerClusterer(map, {markers:overArr});
    //  var style=markerClusterer.getStyles();
    //  style[0]=style[2];
    //  markerClusterer.setStyles(style);
    // }

    //打点并支持点聚合

}

//点击标注开启窗口
function addClickHandler(content, marker) {
    //  var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
    // marker.addEventListener("mouseover",function(e){
    //    var p = e.target;
    //    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    //
    //    map.openInfoWindow(infoWindow,point); //开启信息窗口
    // });
    // marker.addEventListener("mouseout", function(){
    // 	map.closeInfoWindow(infoWindow,point); //关闭信息窗口
    // });
}

var clearMap = function (id) {
    // map.clearOverlays();
    // if(markerClusterer!=null){
    // 	markerClusterer.clearMarkers();
    // }
    deleteImage(id);
};

var temp_map = null;
var markerClusterersMap = new Map();

function showparam(cata_id) {
    // var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers,gridSize:200,minClusterSize:20,maxZoom:13});
    // markerClusterersMap.put(cata_id,markerClusterer);
    // if(markers.length!=0){
    // 	markers.length = 0;
    // }

}


function removeMapLayer(cata_id) {
    // //根据数据目录cata_id删除，并更新地图数据目录覆盖
    // var tmpArr = [];
    // $.each(addArr,function(m,addVal) {
    //     var bDel = false;
    //
    //     if(addVal.cata_id==cata_id){
    //     	for(i=0;i<addArr[m].itemArr.length;i++){
    //     		for(n=0;n<addArr[m].itemArr[i].overlay.length;n++){
    //                 map.removeOverlay(addArr[m].itemArr[i].overlay[n]);
    //             }
    //     	}
    //     	 bDel = true;
    //     }
    //     if(bDel == false){
    //         tmpArr.push(addVal);
    //     }
    // });
    addArr = tmpArr;
}


var addbtn = function (obj) {
    try {
        // loadJsonFile();
        // if(selectArr.length>2) return;
        var id = $(obj).attr("id");
        // var logo = $(obj).attr("logo");
        // if(arr_columns.length<5){
        $(obj).removeClass("schbtn schbtnadd listuser").addClass("schbtn schbtndel");
        $(obj).attr("onclick", "delbtn(this);");
        $(obj).html("取消");
        arr_columns.push(id);
        loadPoint(id)
        // /*	clearMap();*/
        // 	columnList=[];
        // 	loadMapData(arr_columns);
        // 	/*//打点
        // 	addPoint(loadMapData(arr_columns));*/
        // }else{
        // layer.msg("地图叠加不允许超过5个！",2,0);
        // }
        // if(flag_cataId.length==0){
        // 	flag_cataId.push(id);
        // }else{
        // 	$.each(flag_cataId,function(i,item) {
        // 		if(item != id){
        // 			flag_cataId.push(id);
        // 		}
        // 	});
        // }
    } catch (e) {
    }
}
var delbtn = function (obj) {
    var id = $(obj).attr("id");
    $(this).removeClass("schbtn schbtndel").addClass("schbtn schbtnadd listuser");
    $("#" + id).removeClass("schbtn schbtndel").addClass("schbtn schbtnadd listuser");
    $(obj).attr("onclick", "addbtn(this);");
    $("#" + id).html("<i class='dj'></i>叠加");
    // arr_columns.removeByValue(id);
    clearMap(id);
    // columnList=[];
    // if(arr_columns.length>0){
    //
    // 	loadMapData(arr_columns);
    // 	//打点
    // /*	addPoint(columnList);*/
    // }
    // var cataIds = [];
    // $.each(flag_cataId,function(i,item) {
    // 	if(item != id){
    // 		cataIds.push(item);
    // 	}
    // });
    // flag_cataId = cataIds;
}

//删除地图标注
function deletecatalog(id) {
    var markerarr = new Array();
    if (typeof (res[id]) != 'undefined') {
        markerarr = res[id];
        for (var i = 0; i < markerarr.length; i++) {
            var obj = markerarr[i];
            map.removeOverlay(obj);
        }
    }
}

// 测距
function distancetool() {
    var myDis = new BMapLib.DistanceTool(map);
    myDis.open();
}

//标注
function markertool() {
    var myMarker = new BMapLib.MarkerTool(map, {
        followText: "添加一个点"
    });
    myMarker.open();
}

// var myCity = new BMap.LocalCity();
queryResByPage(1);

//全屏
$("#quanping").click(function () {
    if ($(this).html() == "全屏显示") {
        $(this).html("退出全屏");
        var full_w = $("div.dtfw_main").width();
        $("div.dtfw_mainleft").hide();
        $("#dtfw_mainright").removeClass("dtfw_mainright");
    } else {
        $(this).html("全屏显示");
        $("div.dtfw_mainleft").show();
        $("#dtfw_mainright").addClass("dtfw_mainright");
    }
});

function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
