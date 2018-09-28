$(function () {
	
   $("#hotEst").click(function(){
	   document.getElementById("oderlist").value=1;
	   queryResByPage(1,"");
   });
   
   $("#newEst").click(function(){
	   document.getElementById("oderlist").value=2;
	   queryResByPage(1,"");
   });
   
   $("#scorEst").click(function(){
	   document.getElementById("oderlist").value=3;
	   queryResByPage(1,"");
   });
	$('.count-ico').each(function(){
	if($(this).text()<=3){
		$(this).addClass('ico-red');
	}
	else{
		$(this).addClass('ico-grey');
	}
	});
	//应用排行
	$("#appList  li").mouseover(function(){
		if(this.id.indexOf("big")>=0){
			return;
		}
		$("#appList  li").each(function(){
			if(this.id.indexOf("big")>=0){
				$(this).hide();
			}
			if(this.id.indexOf("small")>=0){
				document.getElementById(this.id).style.display = "block";
			}
		});
		if(this.id.indexOf("small")>=0){
			document.getElementById(this.id.replace("small", "big")).style.display = "block";
			document.getElementById(this.id).style.display = "none";
		}
	});
	$("#appList  li").eq(0).show();
	$("#appList  li").eq(1).hide();
	
	$(".sd_detailtjzy li").click(function(){
		if($(this).index()>0){
			$(this).addClass("current");
			$(this).siblings().removeClass('current');
		}
	});
   
	var listul = $("#listul");
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1,"");
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
	var queryResByPage = function(page,groupid) {
		listul.empty();
		var tag = $("#tag").val();
		var oderlist = $("#oderlist").val();
		var pageSize = 8; //每页显示条数初始化，修改显示条数，修改这里即可
		//ajax请求，并初始化资源列表
		$.ajax({
			url: appUrl,
			type: "POST",
			data: {
				"oderlist":oderlist,
				"tag": tag,
				"page": page,
				"pageSize": pageSize,
				"groupid":groupid
			},
			success: function(data) {
				if(data!=""&&data!=null&&!isEmptyObject(data)){
					var dataarr = new Array();
					for (var i = 0; i < data.records.length; i++) {
						var obj = data.records[i];
						var ctime = new Date(parseInt(obj.create_time)).toLocaleDateString().replace(/:\d{1,2}$/,' '); 
						var logo = null;
						var appLogo = obj.app_logo;
						var score = obj.score*20;
						var app_id=obj.app_id;
						if (!appLogo){appLogo="../default/img/appcenter/default.jpg";} else {appLogo = doc_url + appLogo;}
						var description = "";
						if(obj.description != null){
							description = obj.description.substr(0,48);
						}
						dataarr.push("<li><a target='_blank' href='detail.htm?app_id="+app_id+" '><img src='"+appLogo+"' alt='' width='62' height='62' /><div class='sd_listcontent'>"+
								"<div class='sd_contop'><div class='sd_contopleft' style='width:100%;height:20px;'>" + obj.app_name + "</a>"+
								"<div style='float:right;width:300px;'><span class='sd_constar-1'>评分结果：</span>"+
								"<span class=\"starcon\"><span class=\"starmon\" style=\"width:"+score+"%\"></span></span></div>"+
								"<span style='float: right;font-size: 12px;font-weight: 100;'>应用类别："+obj.group_name+"</span>"+
								"</div></div>"+
								"<div class='sd_conmiddleleft' style='height: 30px;'>");
						dataarr.push( "" + description + "</div>");
						/*if (obj.developer_name == "null") {
							dataarr.push("<div class='sd_conbottom'>" + ctime + "&nbsp;发布&nbsp;&nbsp;&nbsp;&nbsp; 发布者：" + obj.developer_name + "</div></div></li>");
						} else {
							dataarr.push("<div class='sd_conbottom'>" + ctime + "&nbsp;发布&nbsp;&nbsp;&nbsp;&nbsp;</div></div></li>");
						}*/
						
						var app_comment = obj.app_comment;
						if(app_comment=="" || app_comment=="null" || app_comment==undefined){
							app_comment=0;
						}
						
						var download_amount =obj.download_amount;
						if(download_amount=="" || download_amount=="null" || download_amount==undefined){
							download_amount=0;
						}
						
						var use_amount = obj.use_amount;
						if(use_amount=="" || use_amount=="null" || use_amount==undefined){
							use_amount=0;
						}
						dataarr.push("<div class='sd_conbottom'>" + "" + " 评论（"+app_comment+"）| 下载（"+download_amount+"）| 使用（"+use_amount+"）</div></div></li>");
					}
					listul.append(dataarr.join(''));
					if (page == 1&&data.totalRecord>pageSize) {
						reloadPage(data.totalRecord);
					}else if(page == 1){
						$("#Pagination").empty();
					}
				}else{
					if (page == 1) {
						//reloadPage(0);
						$("#Pagination").html("暂无数据");
					}
					//$("#Pagination").empty();
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
		queryResByPage(1,"");
	};
	//初始化标签选中动作
	$("#geshichecklist li").click(function(){
		$(this).addClass('current');
		$(this).siblings().removeClass('current');
		linkTypeFilter("tag",$(this).find("a").attr("rel"));
	});
	var isEmptyObject=function(obj){
	    for(var n in obj){return false} 
	    return true; 
	};
	
	$("#appgroup li").click(function(){
		queryResByPage(1,$(this).find("a").attr("rel"));
	});
	
	queryResByPage(1,"");

});


	
