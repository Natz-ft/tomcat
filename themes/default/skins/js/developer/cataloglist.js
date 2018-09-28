$(function () {

//选项卡切换BEGIN
$("#listview2").hide();
$("#topleft").removeClass('topleft');
$("#topleft").addClass('current1');
$("#topleft").mouseover(function () {
    $("#topleft").removeClass('topleft');
	$("#topleft").addClass('current1');
	$("#topright").removeClass('current2');
	$("#topright").addClass('topright');
	$("#listview1").show();
	$("#listview2").hide();
});
$("#topright").mouseover(function () {
    $("#topright").removeClass('topright');
	$("#topright").addClass('current2');
	$("#topleft").removeClass('current1');
	$("#topleft").addClass('topleft');
	$("#listview2").show();
	$("#listview1").hide();
});
//选项卡切换END


//展开收起BEGIN
$("#shouqi1").hide();
$("#zhankai1").show();
$("#shouqi2").hide();
$("#zhankai2").show();
$("#shouqi3").hide();
$("#zhankai3").show();
$("#zhankai1").click(function () {
	$(".fenlei").removeClass('fenleio');
	$("#zhankai1").hide();
	$("#shouqi1").show();
});
$("#shouqi1").click(function () {
	$(".fenlei").addClass('fenleio');
	$("#shouqi1").hide();
	$("#zhankai1").show();
});
$("#zhankai2").click(function () {
	$(".biaoqian").removeClass('biaoqiano');
	$("#zhankai2").hide();
	$("#shouqi2").show();
});
$("#shouqi2").click(function () {
	$(".biaoqian").addClass('biaoqiano');
	$("#shouqi2").hide();
	$("#zhankai2").show();
});
$("#zhankai3").click(function () {
    $("#ullist").removeClass('listo');
    $("#zhankai3").hide();
    $("#shouqi3").show();
});
$("#shouqi3").click(function () {
    $("#ullist").addClass('listo');
    $("#shouqi3").hide();
    $("#zhankai3").show();
});
//展开收起END

//下拉列表BEGIN
$(".xllist").hide();
$("#xialao").click(function () {
	$(".geshi").toggleClass('geshio');
	$(".xllist").toggle();
});
var listul = $("#listul");
var pageselectCallback = function(page_id, jq) {
	queryResByPage(page_id + 1);
	//执行查询，展现分页内容
};
// 创建分页元素
var reloadPage = function(totlePage) {
	$("#Pagination").pagination(totlePage, {
		num_edge_entries: 2,
		num_display_entries: 8,
		callback: pageselectCallback
		//回调函数
	});
};
var relUrl;
var queryResByPage = function(page) {
	listul.empty();
	//$("#Pagination").empty();
	var tag = $("#tag").val();
	var pageSize = 10; //每页显示条数初始化，修改显示条数，修改这里即可
	//ajax请求，并初始化资源列表
	$.ajax({
		url: catalogurl,
		type: "POST",
		data: {
			method : "SearchCatalog",
//			"tag": tag,
			"page": page,
			"pageSize": pageSize
		},
		success: 
		function(data) {
			if(data!=""&&data!=null&&!isEmptyObject(data)){
				var dataarr = new Array();
				for (var i = 0; i < data.records.length; i++) {
					var cataObj = data.records[i];
					if(!cataObj){
						break;
					}
					var use_grade = 0;
					var data_count = 0;
					var cataInteractive = cataObj.catalogStatistic;
					if(cataInteractive && cataInteractive.use_grade ){
						use_grade = cataInteractive.use_grade;
					}
					if(cataInteractive && cataInteractive.data_count ){
						data_count = cataInteractive.data_count;
					}
					
					
					var themes_name = '无';
					var occupation_name = '无';
					// 主题和行业数组
					var theme_array = [], ind_array = [];
			    	if (data[j].cataLogGroups != null && data[j].cataLogGroups.length>0) {
						$.each(data[j].cataLogGroups, function(key, value) {
							theme_array.push(value.group_name);
						});
			    	}
			    	if (data[j].cataLogIndustrys != null && data[j].cataLogIndustrys.length>0) {
			    		$.each(data[j].cataLogIndustrys, function(key, value) {
			    			ind_array.push(value.group_name);
						});
			    	}
			    	if (theme_array.length > 0) {
						themes_name = theme_array.join('，');
					}
					if (ind_array.length > 0) {
						occupation_name = ind_array.join('，');
					}
					
					relUrl=catalogdetailUrl.split('catalog/detail.htm?cata_id=').join('');
					dataarr.push("<li><div class='cata_header'><span class='cata_title'><a target='_blank' href='"+catalogdetailUrl+""+cataObj.cata_id+"'>" + cataObj.cata_title + "</a></span><span class='cata_starcon'><span class='cata_starmon' style='width:"+use_grade*10+"%'></span></span><span class='cata_class'>【" + themes_name + "】</span>");
					dataarr.push("<div class='cata_body'><div class='cata_left'><div class='cata_price'>数据标价：免费</div><div class='cata_info'><span>所属城市："+cataObj.org_name+"</span><span>数量：累计" + data_count + "条数据</span><span>发布时间：" + cataObj.conf_released_time + "</span></div>");
					dataarr.push("<div class='cata_content'>" + cataObj.description.substring(0,cataObj.description.length-1).substring(0,35)+"..." + "</div></div>");
					dataarr.push("<div class='cata_right'><div class='cata_operate'><span class='cata_relnet' rel='"+cataObj.cata_id+"'><i></i>图谱</span></div>");
					dataarr.push("</div></div></li>");
				}
				listul.append(dataarr.join(''));
				//获取总页码
				if (page == 1) {
					reloadPage(data.totalRecord);
				}
			}else{
				if (page == 1) {
					reloadPage(0);
				}
				$("#Pagination").empty();
				dialog.info('没有数据',function(){},3000);
			}
		},
		error: function(data) {
			dialog.info('网络异常',function(){},3000);
		},dataType:"json"
	});
};
var linkTypeFilter = function(type, value) {
	//if (!type.isEmpty()) {
		$("input[name=" + type + "]").val(value);
	//}
	queryResByPage(1);
};
//初始化标签选中动作
$("#filter-list li").click(function(){
	$(this).addClass('current');
	$(this).siblings().removeClass('current');
	linkTypeFilter("tag",$(this).find("a").attr("rel"));
});
var isEmptyObject=function(obj){
    for(var n in obj){return false} 
    return true; 
};
queryResByPage(1);
		$(".cata_relnet").live("click",function() {
				window.open(catalogRelnet + $(this).attr("rel"), '_blank');
		});
});



	
