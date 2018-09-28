$(function() {
	var column_id;
	var tab = $("#top_title li");
	$(tab.eq(0)).click(function(event) { 
		$(tab.eq(0)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t01.png\"/><span style=\"color:#247dcf\">平台公告</span>");
		$(tab.eq(1)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t2.png\"/><span style=\"color:#333333\">数据新闻</span>");
		$(tab.eq(2)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t3.png\"/><span style=\"color:#333333\">行业资讯</span>");
		$(tab.eq(3)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t4.png\"/><span style=\"color:#333333\">数据应用</span>");
		$(tab.eq(0)).addClass('li_bg');
		$(tab.eq(1)).removeClass('li_bg');
		$(tab.eq(2)).removeClass('li_bg');
		$(tab.eq(3)).removeClass('li_bg');
		column_id = $(this).val();
		queryResByPage(1);
		
	});
	$(tab.eq(1)).click(function(event) { 
		$(tab.eq(0)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t1.png\"/><span style=\"color:#333333\">平台公告</span>");
		$(tab.eq(1)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t02.png\"/><span style=\"color:#247dcf\">数据新闻</span>");
		$(tab.eq(2)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t3.png\"/><span style=\"color:#333333\">行业资讯</span>");
		$(tab.eq(3)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t4.png\"/><span style=\"color:#333333\">数据应用</span>");
		$(tab.eq(0)).removeClass('li_bg');
		$(tab.eq(1)).addClass('li_bg');
		$(tab.eq(2)).removeClass('li_bg');
		$(tab.eq(3)).removeClass('li_bg');
		column_id = $(this).val();
		queryResByPage(1);
	});
	$(tab.eq(2)).click(function(event) { 
		$(tab.eq(0)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t1.png\"/><span style=\"color:#333333\">平台公告</span>");
		$(tab.eq(1)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t2.png\"/><span style=\"color:#333333\">数据新闻</span>");
		$(tab.eq(2)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t03.png\"/><span style=\"color:#247dcf\">行业资讯</span>");
		$(tab.eq(3)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t4.png\"/><span style=\"color:#333333\">数据应用</span>");
		$(tab.eq(0)).removeClass('li_bg');
		$(tab.eq(1)).removeClass('li_bg');
		$(tab.eq(2)).addClass('li_bg');
		$(tab.eq(3)).removeClass('li_bg');
		column_id = $(this).val();
		queryResByPage(1);
	});
	$(tab.eq(3)).click(function(event) { 
		$(tab.eq(0)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t1.png\"/><span style=\"color:#333333\">平台公告</span>");
		$(tab.eq(1)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t2.png\"/><span style=\"color:#333333\">数据新闻</span>");
		$(tab.eq(2)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t3.png\"/><span style=\"color:#333333\">行业资讯</span>");
		$(tab.eq(3)).html("<img style=\"vertical-align:middle\" src=\"../img/news/b_t04.png\"/><span style=\"color:#247dcf\">数据应用</span>");
		$(tab.eq(0)).removeClass('li_bg');
		$(tab.eq(1)).removeClass('li_bg');
		$(tab.eq(2)).removeClass('li_bg');
		$(tab.eq(3)).addClass('li_bg');
		column_id = $(this).val();
		queryResByPage(1);
	});
	$(tab.eq(0)).click();
	
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
		//执行查询，展现分页内容
	};
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#Pagination").pagination(totlePage, {
			items_per_page:12,
			num_edge_entries: 2,
			num_display_entries: 8,
			callback: pageselectCallback
			//回调函数
		});
	};
	function queryResByPage(page) {
		$("#box").empty();
		var pageSize = 12; //每页显示条数初始化，修改显示条数，修改这里即可
		$.ajax({
			url: resoucrceurl,
			type: "POST",
			data: {
				"column_id":column_id,
				"page": page,
				"pageSize": pageSize
			},
			success: function(data) {
				if(data!=""&&data!=null&&data.totalRecord>0){
					$("#box").html("");
					var dataarr = "";
					var datatime = "";
					for (var i = 0; i < data.records.length; i++) {
						var obj = data.records[i];
						dataarr = dataarr + "<li><a target='_blank' href='newsDetail.htm?news_id="+obj.res_id+"&res_type="+obj.res_type+"&column_id="+obj.directory_id+"'><div class=\"ptgg_n\">"+obj.title+"</div>";
						var days=Math.floor((new Date().getTime()-new Date(obj.create_time).getTime())/(24*3600*1000));
						if(days <= 0){
							dataarr = dataarr + "<img src=\"../img/news/ico_new.png\" width='26' height='12'>";
						}
						dataarr = dataarr + "<div class=\"ptgg_time\">"+new Date(obj.create_time).Format("yyyy-MM-dd")+"</div></a> </li>";
					}
					$("#box").append(dataarr);
					//获取总页码
					if (page == 1&&data.totalRecord>pageSize) {
						reloadPage(data.totalRecord);
					}else if(page == 1){
						$("#Pagination").empty();
					}
				}else{
					$("#Pagination").empty();
					$("#box").html("暂无数据");
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
	if($("#column_id").val()=="1"){
		$("#top_title li")[0].click();
	}else if($("#column_id").val()=="2"){
		$("#top_title li")[1].click();
	}else if($("#column_id").val()=="3"){
		$("#top_title li")[2].click();
	}else if($("#column_id").val()=="4"){
		$("#top_title li")[3].click();
	}
});