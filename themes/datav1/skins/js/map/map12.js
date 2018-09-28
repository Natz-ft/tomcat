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
map.addControl(new BMap.MapTypeControl()); // 添加地图类型控件
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());
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
					if (selectArr.indexOf(obj.cata_id) < 0) {
						dataarr.push("<li><div><a href='"+ contentPath+ "catalog/detail.htm?cata_id="
										+ obj.cata_id+ "' class='listtitle' title='"+ obj.title+ "'>"+ obj.title+ "</a>"
										+"<span class='starcon'><span class='starmon' style='width:"+ obj.grade * 10 + "%'></span></span>"
										+"<span class='schbtn schbtnadd listuser' id='"+ obj.cata_id+ "'>"+
										"<i class='dj'></i>叠加</span></div>"
										+"<div class='listdetail'>"+ obj.description + "</div>");
					} else {
						dataarr
								.push("<li><div><a href='"
										+ contentPath
										+ "catalog/detail.htm?cata_id="
										+ obj.cata_id
										+ "' class='listtitle' title='"
										+ obj.title
										+ "'>"
										+ obj.title
										+ "</a><span class='starcon'><span class='starmon' style='width:"
										+ obj.grade
										* 10
										+ "%'></span></span><span class='schbtn schbtndel' id='"
										+ obj.cata_id
										+ "'>取消</span></div><div class='listdetail'>"
										+ obj.description + "</div>");
					}
							var markerimg = getCatalogMarker(obj.cata_id);
							if (markerimg != null) {
								dataarr.push("<img src='" + markerimg
										+ "'></li>");
							} else {
								dataarr.push("</li>");
							}
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
				},
				error : function(data) {
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


function getCatalogMarker(id) {
	debugger;
	if (typeof (res[id]) != 'undefined') {
		var markerarr = new Array();
		markerarr = res[id];
		var markering = "";
		for ( var i = 0; i < markerarr.length; i++) {
			var obj = markerarr[i];
			markering = obj.getIcon().imageUrl;
			map.addOverlay(obj);
		}
		return markering;
	} else {
		return null;
	}

}

// 获取数据目录，在地图上进行标注
function getcatalog(id) {
	if (typeof (res[id]) != 'undefined') {
		var markerarr = new Array();
		markerarr = res[id];
		var markering = "";
		for ( var i = 0; i < markerarr.length; i++) {
			var obj = markerarr[i];
			markering = obj.getIcon().imageUrl;
			map.addOverlay(obj);
		}
		return markering;
	} else {
		count++;
		
		var markerimg = imgurl + "mark_" + count + ".png";
		var icon = new BMap.Icon(markerimg, new BMap.Size(19, 25), {
			anchor : new BMap.Size(7.5, 7.5)
		});
		$.ajax({
			type : 'post',
			url : cataurl,
			dataType : 'json',
			data : {
				"id" : id
			},
			success : function(data) {
				var item = data[2];
				var markerarr = new Array();
				for ( var i = 0; i < item.length; i++) {
					var obj = item[i];
					point = new BMap.Point(obj.longitude, obj.latitude);
					marker = new BMap.Marker(point, {
						icon : icon
					});
					markerarr[i] = marker;
					map.addOverlay(marker);
					(function() {
						var index = i;
						var str = "<b class='iw_poi_title' title='" + obj.title
								+ "'>" + obj.title
								+ "</b><div class='iw_poi_content'>";
						if (obj.TELEPHONE != undefined) {
							str = str + "电话：" + obj.tel + "<br>";
						}
						if (obj.ADDRESS != undefined) {
							str = str + "地址：" + obj.address + "</div>";
						}
						var _iw = new BMap.InfoWindow(str);
						var _marker = marker;
						_marker.addEventListener("click", function() {
							this.openInfoWindow(_iw);
						});
						if (!!obj.isOpen) {
							_marker.openInfoWindow(_iw);
						}
					})();
				}
				res[id] = markerarr;
				
				
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
		return markerimg;
	}
}

$(".schbtnadd").live("click",function(){
	try{
		if(selectArr.length>2) return;
		var divdom = $(this).parent().parent();
		var id=$(this).attr("id");
		$(this).removeClass("schbtn schbtnadd listuser").addClass("schbtn schbtndel");
		$(this).html("取消");
		var checkhtml=$(this).parent().parent().html();
		var markerimg = getcatalog(id);
		if(selectArr.indexOf(id)<0){
			$("#checklist").append("<li class='selectlist' id='select"+id+"'>"+checkhtml+"<img src='"+markerimg+"'>"+"</li>");
		}
		divdom.append("<img src='"+markerimg+"'>");
		selectArr.push(id);
//		$(this).parent().remove();
	}catch (e) {
	}
	
});

$(".schbtndel").live("click",function(){
	var divdom = $(this).parent().parent();
	divdom.find("img").remove();
	var id=$(this).attr("id");
	$(this).removeClass("schbtn schbtndel").addClass("schbtn schbtnadd listuser");
	$("#"+id).removeClass("schbtn schbtndel").addClass("schbtn schbtnadd listuser");
	$("#"+id).html("<i class='dj'></i>叠加");
	$("#select"+id).remove();
	deletecatalog(id);
	selectArr.remove(id);
});








// 删除地图标注
function deletecatalog(id) {
	debugger;
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
