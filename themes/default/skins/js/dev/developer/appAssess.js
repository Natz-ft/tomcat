$(document).ready(function() {
    var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
		//执行查询，展现分页内容
	};
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#Pagination").pagination(totlePage, {
			prev_text: '上一页',
            next_text: '下一页', 
            items_per_page: pageSize, 
			num_edge_entries: 2,
			num_display_entries: 8,
			callback: pageselectCallback
			//回调函数
		});
	};
	var queryResByPage = function(page) {
		var listUl= $(".ly_n ul");
		listUl.empty();
		console.log(appAssessListUrl);
		$.ajax({url:appAssessListUrl, type: "POST",data:{
			method : "queryAppList",
			page:page,
			pageSize:pageSize
		},success:function(datas) {
			if(datas!=""&&datas!=null&&datas.totalRecord>0){
				//循环输出
				var dataarr = new Array();
				for (var i = 0; i < datas.data.length; i++) {
					var obj = datas.data[i];
					dataarr.push("<li class=\"li1\">");
				    dataarr.push("<img  src="+contentPath+" alt=\"\" width=\"62\" height=\"62\" />");
				    dataarr.push("<div class=\"sd_listcontent\">");
				    dataarr.push("<div class=\"sd_contop\">");
					dataarr.push("<div class=\"sd_contopleft\">"+obj.app_alias+"</div>");
				    dataarr.push("</div>");
				    dataarr.push("<div class=\"sd_conmiddle\">");
				    dataarr.push("<div class=\"sd_conmiddleleft\"> <table width=\"421\" height=\"31\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
				    dataarr.push("<tr>");
				    dataarr.push("<td width=\"130\" height=\"29\" scope=\"col\"><div align=\"left\">累计评分次数: "+obj.grade_time+"</div></td>");
				    dataarr.push("<td width=\"126\" scope=\"col\"><div align=\"center\">评分: "+obj.grade+"</div></td>");
				    dataarr.push("<td width=\"165\" scope=\"col\"><div align=\"center\">累计评论次数: "+obj.assess_time+"</div></td>");
				    dataarr.push("</tr>");
				    dataarr.push("</table>");
				    dataarr.push("</div>");
				    if(obj.assess_time==0){
				    	dataarr.push("<div class=\"sd_conmiddleright\" style=\"color:#c0c0c0\">【展开】</div>");	
				    }else{
				    	dataarr.push("<div class=\"sd_conmiddleright\"><a id=\"commentbtn-"+obj.app_id+"\" onclick=\"showCommentDiv("+obj.app_id+",1)\" href=\"javascript:void(0);\">【展开】</a></div>");  
				    }
				    dataarr.push("</div>");
				    dataarr.push("</div>");
					dataarr.push("</li>");
					dataarr.push("<div id=\"commentDiv-"+obj.app_id+"\" class=\"pinglun\" style=\"margin-left: 80px; display: none\">"); 
					dataarr.push("<div id=\"comment-"+obj.app_id+"\"></div>"); 
					dataarr.push("<div id=\"Pagination-"+obj.app_id+"\" class=\"pagination\"></div></div>");
				}
				listUl.append(dataarr.join(''));
				if (page == 1&&datas.totalRecord>pageSize) {
					reloadPage(datas.totalRecord);
				}else if(page == 1){
					$("#Pagination").empty();
				}
			}else{
				$("#Pagination").empty();
				listUl.html("暂无数据");
			}
		},error:function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		},dataType:"json"});
		
	};
	queryResByPage(1);
});


function showCommentDiv(id,page,refresh){
var display = $("#commentDiv-"+id).css("display");
	
	if(display == "block" && !refresh){
		$("#commentDiv-"+id).fadeToggle();
		$("#commentbtn-"+id).html("【展开】");
		return;
	}else{
		$("*[id^=commentbtn]").each(function(){
			$(this).html("【展开】");
		});
		$("*[id^=commentDiv]").each(function(){
			$(this).css("display","none");
		});
		$("#commentDiv-"+id).fadeToggle();
		$("#commentbtn-"+id).html("【收起】");
	}
	showComment(id,page,refresh);
}
function showComment(id,page,refresh){
	parentid=id;
	$("#comment-"+id).empty();
	$.ajax({url:appAssessListUrl,type: "POST", data:{
		method : "QueryCommentList",
		parent_id: id,
		page:page,
		pageSize:pageSize1
	},success:function(datas) {
		if(datas!=""&&datas!=null){			
			var length=0;
			if (datas.data.length<6) {
				length=datas.data.length;
			} else {
				length=5;
			}
			//循环输出
			var dataarr = new Array();
			if(length>0){
				dataarr.push("<div class=\"pl_n\">");
				dataarr.push("<ul>");
			}
			for (var i = 0; i < length; i++) {
				var item = datas.data[i];
			dataarr.push("<li>  <div class=\"pl_n1\">");
			dataarr.push("<div class=\"n1_tx\"><a href=\"#\"><img src="+contentinteractPath+" /></a> </div>  ");
			dataarr.push(" <div class=\"n1_n\"><span style=\" color:#0CC;\">  <a href=\"javascript:void(0);\">"+item.user_name+":</a></span>"+item.content+"</div> ");
			dataarr.push("</div>");
			dataarr.push("</li> ");
			}
			dataarr.push("</ul> ");
			dataarr.push("</div> ");
			
			$("#comment-"+id).append(dataarr.join(''));
			if (page == 1&&datas.count>pageSize1) {
				reloadPage1(datas.count,id);
			}else if(page == 1){
				$("#Pagination-"+id).empty();
			}
			$("#comment-"+id).show();
		}
		
		
	},error:function(data) {
		easyDialog.open({
			container : {
				content : '网络异常'
			},
			autoClose : 2000
		});
	},dataType:"json"});
	
}
var pageselectCallback1 = function(page_id, jq) {
	var pagetext=page_id+1;
	showComment(parentid,pagetext);
	//$("#comment-"+parentid).fadeToggle();
	//执行查询，展现分页内容
};
// 创建分页元素
var reloadPage1 = function(totlePage,id) {
	$("#Pagination-"+id).pagination(totlePage, {
		prev_text: '上一页',
        next_text: '下一页', 
        items_per_page: pageSize1, 
		num_edge_entries: 2,
		num_display_entries: 8,
		callback: pageselectCallback1
		//回调函数
	});
};