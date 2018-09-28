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
var queryResByPage = function(page) {
	listul.empty();
	var pageSize = 15; //每页显示条数初始化，修改显示条数，修改这里即可
	//ajax请求，并初始化资源列表
	$.ajax({
		url: resoucrceurl,
		type: "POST",
		data: {
			"page": page,
			"pageSize": pageSize
		},
		success: function(data) {
			if(data!=""&&data!=null){
				var dataarr = new Array();
                for (var i = 0; i < data.records.length; i++) {
					var obj = data.records[i];
					dataarr.push("<li><div class='list_col2' style='width: 60%;'><a onclick='goToDetail(\""+obj.res_id+"\")'>" + obj.title + "</a></div>");
					dataarr.push("<div class='list_col4'>"+new Date(obj.create_time).Format("yyyy-MM-dd")+"</div></li>");
			    }
				listul.append(dataarr.join(''));
				//获取总页码
				if (page == 1&&data.totalRecord>pageSize) {
					reloadPage(data.totalRecord);
				}else if(page == 1){
					$("#Pagination").empty();
				}
			}else{
				if (page == 1) {
					$("#Pagination").html("暂无数据");
				}
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

function goToDetail(obj_id){
	var param={"res_id":obj_id};
	switchWidget("newsDetail",param);
	
}

Date.prototype.Format = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
    str=str.replace(/MM/,this.getMonth()+1>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
    str=str.replace(/M/g,this.getMonth()+1);   
    str=str.replace(/w|W/g,Week[this.getDay()]);   
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
    return str;   
};
//if($("#column_id").val()=="1"){
//	$("#top_title li")[0].click();
//}else if($("#column_id").val()=="2"){
//	$("#top_title li")[1].click();
//}else if($("#column_id").val()=="3"){
//	$("#top_title li")[2].click();
//}else if($("#column_id").val()=="4"){
//	$("#top_title li")[3].click();
//}