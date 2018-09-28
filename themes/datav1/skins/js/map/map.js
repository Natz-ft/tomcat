Array.prototype.indexOf = function(val) {              
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) return i;  
    }  
    return -1;  
}; 
Array.prototype.remove = function(val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
}; 

$("#listzk").hide();
var themeobj=0;
var listobj=1;
$("#themezk").click(function(){
	$("#themezk").toggleClass('themesq');
	$("#listzk").toggleClass('themesq');
	$(".themeul").toggleClass('heightauto');
	if(themeobj==0){
		themeobj=1;
		listobj=0;
	}
	else if(themeobj==1){
		themeobj=0;
		listobj=1;
		$("#listzk").hide();
		$(".schlist").show();
	}
	
});
$("#listzk").click(function(){
	$("#themezk").toggleClass('themesq');
	$("#listzk").toggleClass('themesq');
	$(".schlist").toggle();
	if(listobj==0){
		listobj=1;
		themeobj=0;
		$(".themeul").removeClass('heightauto');
		$("#listzk").hide();
	}
	else if(listobj==1){
		listobj=0;
		themeobj=1;
		$(".themeul").addClass('heightauto');
	}
	
});

// 百度地图API功能
var map = new BMap.Map("dituContent"); // 创建Map实例
if (cityCode.indexOf("0000") == 2 && municipality == 0) {
	map.centerAndZoom(cityName, 8); // 初始化地图,设置中心点坐标和地图级别
} else if (cityCode == '100000') {
	map.centerAndZoom('中国', 5); // 初始化地图,设置中心点坐标和地图级别
} else {
	map.centerAndZoom(cityName, 12); // 初始化地图,设置中心点坐标和地图级别
}
map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ]})); // 添加地图类型控件
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.enableScrollWheelZoom();
map.enableContinuousZoom();
if (cityName == '国家部委') {
	map.setCurrentCity("北京市"); // 设置地图显示的城市 此项是必须设置的
} else {
	map.setCurrentCity(cityName); // 设置地图显示的城市 此项是必须设置的
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
var pageselectCallback1 = function(page_id, jq) {
	queryResByPage(page_id + 1);
};

var searchCallBack = function(page_id, jq) {
	var mapSearchKey = $("#mapSearchKey").val();
	searchMap(mapSearchKey, page_id + 1);
};
// 创建分页元素
var reloadPage = function(totlePage) {
	$("#Pagination").pagination(totlePage, {
		num_edge_entries : 2,
		num_display_entries : 2,
		items_per_page : 10,
		callback : pageselectCallback1
	// 回调函数
	});
};
var searchreloadPage = function(totlePage) {
	$("#reloadPage").pagination(totlePage, {
		num_edge_entries : 2,
		num_display_entries : 2,
		items_per_page : 10,
		callback : searchCallBack
	// 回调函数
	});
};
var queryResByPage = function(page) {
	schlistul.empty();
	// $("#Pagination").empty();
	var subjectId = group_code;
	var pageSize = 10; // 每页显示条数初始化，修改显示条数，修改这里即可
	var title = $("#mapSearchKey").val();
	// ajax请求，并初始化资源列表
	$.ajax({
		url : resoucrceurl,
		type : "POST",
		data : {
			"subjectId" : subjectId,
			"page" : page,
			"pageSize" : pageSize,
			"title" : title
		},
		success : function(data) {
			var dataobj = data.records;
			if (dataobj != "" && dataobj != null) {
				var dataarr = new Array();
				for ( var i = 0; i < dataobj.length; i++) {
					var obj = dataobj[i];
					
					dataarr.push("<li><div><a href='"+ contentPath+ "catalog/detail.htm?cata_id="
							+ obj.cata_id+ "' class='listtitle' title='"+ obj.title+ "'>"+ obj.title+ "</a>"
							+"<span class='starcon'><span class='starmon' style='width:"+ obj.grade * 10 + "%'></span></span>"
							+"<span class='schbtn schbtnadd listuser' id='"+ obj.cata_id+ "' logo='"+obj.logo+"'>"+
							"<i class='dj'></i>叠加</span></div>"
							+"<div class='listdetail'>"+ obj.description + "</div>");
					
					//var markerimg = imgurl + "/catalog/mark_" + obj.cata_id + ".png";
					var markerimg = web_doc + obj.logo;
					dataarr.push("<img style='height:20px;' src='" + markerimg+ "'></li>");
				}
				schlistul.append(dataarr.join(''));
				// 获取总页码
				if (page == 1 && data.totalRecord!=0) {
					reloadPage(data.totalRecord);
				}
			} else {
				if (page == 1) {
					reloadPage(0);
				}
			}
		},error : function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		},
		dataType : "json"
	});
};
// 点击主题分类
function searchcatalog(gid) {
	//$("#alreadySelected").show();
	group_code = gid;
	queryResByPage(1);
}
function searchcatalogbyKey(gid) {
	//$("#alreadySelected").show();
	//group_code = gid;
	queryResByPage(1);
}

// 获取数据目录，在地图上进行标注
function getcatalog(cata_id,logo) {
	$.ajax({
		type : 'post',
		url : cataurl,
		dataType : 'json',
		data : {
			"id" : cata_id
		},
		success : function(data) {
			if(data!=null){
				var templist = data[2];
				//var logo = imgurl + "/catalog/mark_" + cata_id + ".png";
				var img = web_doc+logo;
				addMapLayer(templist,cata_id,img);
//				alert("img"+img);
			}
		},
		error : function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		}
	});
}
var markers = new Array(); //存放标注点对象的数组 

function addMapLayer(templist,cata_id,logo){
	for(var i=0; i<templist.length; i++){
		tempFun(templist,i,logo,cata_id);
	}
	//$("#mapdiv .pop").css("line-height","22px"); //弹出框行距
}

var temp_index = 0; 
function tempFun(templist,i,logo,cata_id){ //闭包，避免所有标注的弹窗信息一样
	var str = "";
	str += "<h4 style='margin:0 0 5px 0;padding:0.2em 0;font-size:12px;color:#4E4E4E'>"+templist[i]['TITLE']+"</h4>";
	str += "<p style='font-size:13px;padding-top:10px;color:#4E4E4E'>地址 ："+templist[i]['ADDRESS']+"</p>";
	if(templist[i]['phone']!="暂无"){
		str += "<p style='font-size:13px;color:#4E4E4E'>电话 ："+templist[i]['PHONE']+"</p>";
	}
	var opts = {    
			 width : 320,     // 信息窗口宽度    
			 height: 90
			}
	var infoWindow = new BMap.InfoWindow(str, opts);  // 创建信息窗口对象
	var respoint = new BMap.Point(templist[i].LONGITUDE, templist[i].LATITUDE); // 创建点坐标, LATITUDE=36.665854, LONGITUDE=117.040835
//	alert("经度"+templist[i].longitude+"维度"+templist[i].latitude);
//	ADDRESS=济南市历下区泺源大街22号, AREA=历下区, BRANCH_NAME=中国银行济南分行, BRANCH_TYPE=营业厅, BUSINESS_TYPE=综合, CITY=济南市, LATITUDE=36.665854, LONGITUDE=117.040835, MONDAY=9:00-17:00, PHONE=0531-86995028, PROVINCE=山东省, SAT=9:00-17:00, TITLE=中国银行, inspur_id=1}
	if(logo!=null){
		var logoUrl = logo;
		var myLogo = new BMap.Icon(logoUrl, new BMap.Size(25,25),{imageOffset: new BMap.Size(2, 2)});//设置了2，2的偏移量，修复图标被剪切的问题
		myLogo.setImageSize(new BMap.Size(20,20));
	}
	
	// 创建地址解析器实例
	var marker = "";
 	if(logo!=null){
		marker = new BMap.Marker(respoint,{icon:myLogo,cata_id:cata_id});  
	}else{ 
		marker = new BMap.Marker(respoint,{cata_id:cata_id});	
	}
	
	//用于消点
	var label = new BMap.Label(cata_id);
	label.setStyle({display: "none"}); 
	marker.setLabel(label);
	// 将标注添加到地图中
	marker.addEventListener("mouseover", function(){ //给标注添加点击事件
		this.openInfoWindow(infoWindow);
	});
	markers.push(marker);
	
	temp_index ++;
	markOverHandler(templist.length,cata_id);
	
}

function markOverHandler(length,cata_id){
	if(temp_index == length){
		showparam(cata_id);
		temp_index = 0;
	}
}

var temp_map = null;
var markerClusterersMap = new Map();
function showparam(cata_id){
	var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers,gridSize:200,minClusterSize:20,maxZoom:13});
	markerClusterersMap.put(cata_id,markerClusterer);
	if(markers.length!=0){
		markers.length = 0;
	}
	
}

function removeMapLayer(cata_id){
	markerClusterersMap.get(cata_id).clearMarkers();
	markerClusterersMap.remove(cata_id);
}


$(".schbtnadd").live("click",function(){
	try{
		if(selectArr.length>2) return;
		//var divdom = $(this).parent().parent();
		var id=$(this).attr("id");
		var logo = $(this).attr("logo");
		$(this).removeClass("schbtn schbtnadd listuser").addClass("schbtn schbtndel");
		$(this).html("取消");
		//var checkhtml=$(this).parent().parent().html();
		getcatalog(id,logo);
	}catch (e) {
	}
	
});

$(".schbtndel").live("click",function(){
	//var divdom = $(this).parent().parent();
	//divdom.find("img").remove();
	var id=$(this).attr("id");
	$(this).removeClass("schbtn schbtndel").addClass("schbtn schbtnadd listuser");
	$("#"+id).removeClass("schbtn schbtndel").addClass("schbtn schbtnadd listuser");
	$("#"+id).html("<i class='dj'></i>叠加");
	removeMapLayer(id);
});


// 删除地图标注
function deletecatalog(id) {
	var markerarr = new Array();
	if (typeof (res[id]) != 'undefined') {
		markerarr = res[id];
		for ( var i = 0; i < markerarr.length; i++) {
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
		followText : "添加一个点"
	});
	myMarker.open();
}
function myFun(result) {
	//	var cityName = result.name;
	//	map.setCenter(cityName);
	//	alert("当前定位城市:"+cityName);
}



var myCity = new BMap.LocalCity();
myCity.get(myFun);
queryResByPage(1);

//全屏
$("#quanping").click(function(){
	if($(this).html() == "全屏显示"){
		$(this).html("退出全屏");
		var full_w = $("div.dtfw_main").width();
		$("div.dtfw_mainleft").hide();
		$("#dtfw_mainright").removeClass("dtfw_mainright");
	}else{
		$(this).html("全屏显示");
		$("div.dtfw_mainleft").show();
		$("#dtfw_mainright").addClass("dtfw_mainright");
	}
});