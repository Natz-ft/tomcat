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
//下拉列表END
/*
    var navLi=$("#checklist li");
    navLi.click(function(){
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
    });
*/
var listul = $("#listul");
var pageselectCallback = function(page_id, jq) {
	queryResByPage(page_id + 1);
	//执行查询，展现分页内容
};
// 创建分页元素
var reloadPage = function(totlePage) {
	$("#Pagination").pagination(totlePage, {
		prev_text: '上一页',
        next_text: '下一页', 
        items_per_page: 6, 
		num_edge_entries: 2,
		num_display_entries: 8,
		callback: pageselectCallback
		//回调函数
	});
};
var queryResByPage = function(page) {
	listul.empty();
	//$("#Pagination").empty();
	var tag = $("#tag").val();
	var pageSize = 6; //每页显示条数初始化，修改显示条数，修改这里即可
	//ajax请求，并初始化资源列表
	$.ajax({
		url: appUrl,
		type: "POST",
		data: {
//			"tag": tag,
			method : methodUrl,
			"page": page,
			"pageSize": pageSize
		},
		success: function(data) {
			if(data!=""&&data!=null&&!isEmptyObject(data)){
				var dataarr = new Array();
				for (var i = 0; i < data.records.length; i++) {
					var obj = data.records[i];
					if(obj!=null){
						var logo = obj.app_logo;
						if (logo==""||logo==null){logo=defaulturl;} else {logo = web_doc+logo;}
						var description;
						if (obj.description == null||obj.description=="")
							{
								description = "暂无描述";
							}
						else {
							description = obj.description;
							if(description.length>100){
								description = "<span title="+description+">"+description.substring(0,68)+"..."+"</span>";
							}else{
								description = "<span title="+description+">"+description+"</span>";
							}
						}
						var date = new Date(Date(parseInt(obj.app_update_time) * 1000).toLocaleString().substr(0,16));
						var upDateTime = date.getFullYear()+"年"+date.getMonth()+"月"+date.getDay()+"日";
						dataarr.push("<li><div class='sd_listcontent'><img src="+logo+" width='62' alt='' /><div class='sd_contop'><div class='sd_contopleft'" + "<a onclick='toappinfo("+ obj.app_id +")'>" + obj.app_alias + "<a/>" + "<span class='sd_constar-1'><em></em></span></div></div><div class='sd_conmiddle'><div class='sd_conmiddleleft'>");
						dataarr.push( upDateTime  + "更新</div></div>");
						dataarr.push(description + "</li>");
					}
				}
				listul.append(dataarr.join(''));
				if (page == 1) {
					reloadPage(data.totalRecord);
				}
			}else{
				if (page == 1) {
					reloadPage(0);
				}
				
				$("#Pagination").empty();
				easyDialog.open({
					container : {
						content : '没有数据'
					},
					autoClose : 2000
				});
			}
		},
		error: function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
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
$("#geshichecklist li").click(function(){
	$(this).addClass('current');
	$(this).siblings().removeClass('current');
	linkTypeFilter("tag",$(this).find("a").attr("rel"));
});
$("#geshichecklist li").eq(0).addClass('current');
var isEmptyObject=function(obj){
    for(var n in obj){return false} 
    return true; 
};
queryResByPage(1);

});

function toappinfo(app_id){
	location.href = appinfourl+app_id;
}




	
