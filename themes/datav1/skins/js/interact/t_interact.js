function getDateString(time){
	var myDate = new Date(time);
	return myDate.getMonth()+1 + "月" + myDate.getDate() + "日  " + myDate.getHours() + ":" + myDate.getMinutes();
}

function getTimeString(time){
	var myDate = new Date(time);
	return  myDate.getHours() + ":" + myDate.getMinutes();
}

$(document).ready(function() {
	$("input[name='c_type']").val("");
	
	$("#commentbtn").click(function() {
		$("#commentbox").fadeToggle();
	});
	
	//发布一条留言
	$("#msg_submit").click(function() {
		var content = $("#content_input").attr("value");		
		content = encodeURI(content);		
		var interactType = $("input[name='interactType']:checked").val();
		if (content.isEmpty()) {
			easyDialog.open({
				container : {
					content : '请输入留言内容！'
				},
				autoClose : 1000
			});
			return;
		} else {			
			$.ajax({url:interactUrl, data:{
				method : "addInteractive",
				content : content,
				interactType:interactType,
				t:Math.random()
			},success:function(data) {
				$("#content_input").val("");
				if(data.code=='000001'){
					register();
					return;
				}else{
					easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 1000
					});
					$("#content_input").attr("value", "");
					clearBackground();
					$("#interact_all").parent().attr("class", "current");
					$("input[name='c_type']").val(0);
					queryResByPage(1);
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
	});
	
	$('.rmht_n .count-ico').each(function(){
		if($(this).text()<=3){
			$(this).addClass('ico-red');
		}
		else{
			$(this).addClass('ico-grey');
		}
	});
	//查询全部动态
	$("#interact_all").click(function() {
		clearBackground();
		$("#interact_all").parent().attr("class", "current");
		$("input[name='c_type']").val(0);
		queryResByPage(1);
	});
	
	//查询留言信息
	$("#interact_msg").click(function() {
		clearBackground();
		$("#interact_msg").parent().attr("class", "current");
		$("input[name='c_type']").val(1);
		queryResByPage(1);
	});
	
	//查询申请信息
	$("#interact_request").click(function() {
		clearBackground();
		$("#interact_request").parent().attr("class", "current");
		$("input[name='c_type']").val(2);
		queryResByPage(1);
	});
	
	//查询建议信息
	$("#interact_suggest").click(function() {
		clearBackground();
		$("#interact_suggest").parent().attr("class", "current");
		$("input[name='c_type']").val(3);
		queryResByPage(1);
	});
	
	//清除所有选中状态
	var clearBackground = function(){
		$("#type_list").children("li").each(function(){
			$(this).removeAttr("class");
		});
	};
	
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
		var c_type = $("input[name='c_type']").val();
		$.ajax({url:interactUrl, data:{
			method : "queryInteractiveList",
			interactType:c_type,
			page:page,
			pageSize:pageSize,
			t:Math.random()
		},success:function(datas) {
			if(datas!=""&&datas!=null&&datas.totalRecord>0){
				//循环输出
				var dataarr = new Array();
				for (var i = 0; i < datas.records.length; i++) {
					var obj = datas.records[i];
					dataarr.push("<li><div class=\"n1\"><div class=\"n1_1\">");
					
					if(obj.avatar!=null&&obj.avatar!='0'){
						dataarr.push("<div class=\"tx\"><img src=\""+obj.avatar+"\" width='58' height='58'/></div>");
					}else{
						dataarr.push("<div class=\"tx\"><img src=\""+contentPath+"img/img/default-avatars.jpg\" width=\"58\" height=\"58\"/></div>");
					}
					
					dataarr.push("<div class=\"nr\"><p><b>"+ obj.nick_name + " </b> <br /> "+obj.content+"</p></div>");
					dataarr.push("<div class=\"n1_2\">");
					if(obj.c_type==1){
						dataarr.push("<div class=\"biaoqian\"><img src=\""+contentPath+"img/interact/hd_12.png\" /></div>");
					}else if(obj.c_type==2){
						dataarr.push("<div class=\"biaoqian\"><img src=\""+contentPath+"img/interact/hd_8.png\" /></div>");
					}else{
						dataarr.push("<div class=\"biaoqian\"><img src=\""+contentPath+"img/interact/hd_11.png\" /></div>");
					}
					if(obj.create_time!=null){
						dataarr.push("<div class=\"sj\"> "+getDateString(obj.create_time)+"</div>");
					}
					dataarr.push("<div class=\"pl\"><ul><li><a id=\"supportbtn"+obj.id+"\" onclick=\"supportPlus('"+obj.id+"')\" href=\"javascript:void(0);\"> <img src=\""+contentPath+"img/interact/hd_9.png\" /> (<span id='support"+obj.id+"'>"+obj.support+"</span>)</a></li><li><img src=\""+contentPath+"img/interact/hd_10.png\" /></li><li><a id=\"commentbtn"+obj.id+"\" onclick=\"showComment('"+obj.id+"')\" href=\"javascript:void(0);\">评论（"+obj.comment_count+"） </a></li><li><a id=\""+obj.id+"\" " +
							"onclick=\"deleteComment('"+obj.parent_Id+"','"+obj.id+"')\" " +
									"href=\"javascript:void(0);\">删除 </a></li><input type='hidden' id='nickname' name='nickname' value='"+obj.nick_name+"'></ul></div>");
					dataarr.push("</div>");
					dataarr.push("</div></div><div id=\"comment-"+obj.id+"\" class=\"pinglun\" style=\"margin-left: 80px; display: none\"></div></li>");
				}
				listUl.append(dataarr.join(''));
				
					var inputText = $("#ulist").html();
					$("#ulist").html(AnalyticEmotion(inputText));					
				
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
	//暂时采用延时方法处理首次加载表情不能显示问题
	 setTimeout(function () { 
		 var inputText = $("#ulist").html();
			$("#ulist").html(AnalyticEmotion(inputText));
	    }, 500);
});

function showComment(id, refresh){
	var display = $("#comment-"+id).css("display");
	if(display == "block" && !refresh){
		$("#comment-"+id).fadeToggle();
		return;
	}
	$("#comment-"+id).empty();
	$.ajax({url:commentUrl, data:{
		method : "QueryCommentList",
		parent_id: id,
		page:1,
		t:Math.random()
	},success:function(datas) {
			
		if(datas!=""&&datas!=null){			
			var length=0;
			if (datas.records.length<6) {
				length=datas.records.length;
			} else {
				length=5;
			}
			//循环输出
			
			var dataarr = new Array();
			dataarr.push("<div class=\"pl_head\">");
			dataarr.push("<img src=\""+contentPath+"img/interact/pl_01.png\" />");
			dataarr.push("</div>");
			dataarr.push("<div class=\"pl_main\">");
			dataarr.push("<div class=\"pl_ly\">");
			dataarr.push("<textarea name=\"textfield\" cols=\"68\" rows=\"1\" class=\"commentContent\" id=\"commentContent-"+ id + "\"></textarea>");
			dataarr.push("<div class=\"anniu\">");
			dataarr.push("<a href=\"javascript:void(0);\" onclick=\"addComment('"+id+"')\">评论</a>");
			dataarr.push("</div>");
			dataarr.push("</div>");
			if(length>0){
				dataarr.push("<div class=\"pl_n\">");
				dataarr.push("<ul>");
			}
			for (var i = 0; i < length; i++) {
				var obj = datas.records[i];
				dataarr.push("<li>");
				dataarr.push("<div class=\"pl_n1\">");
				dataarr.push("<div class=\"n1_tx\">");
				if(obj.avatar!=null&&obj.avatar!='0'){
					dataarr.push("<a href=\"javascript:void(0);\"><img src=\""+img_url+obj.avatar+"\" width='31' height='31'/></a>");
				}else{
					dataarr.push("<a href=\"javascript:void(0);\"><img src=\""+contentPath+"img/interact/default_logo.jpg\" /></a>");
				}
				dataarr.push("</div>");
				dataarr.push("<div class=\"n1_n\">");
				dataarr.push("<span style=\"color: #0CC;\"> <a href=\"javascript:void(0);\">"+obj.nick_name+"</a> </span>");
				dataarr.push(obj.content);
				dataarr.push("</div>");
				dataarr.push("</div>");
				dataarr.push("</li>");				
			}
			
			if (datas.records.length>5) {
				dataarr.push("<li>");
				dataarr.push("<div class=\"pl_n1\" id=\"morepinglun\">");
				$("#commentbtn"+id).html("评论（"+datas.totalRecord+"） ");
				dataarr.push("一共"+ datas.totalRecord +"条评论, ");
				dataarr.push("<span><a id=\"commentbtn1\" href=\"javascript:void(0); \" style=\"color: #FF0000;\">点击查看</a></span>");
				dataarr.push("</div>");
				dataarr.push("</li>");
				
				dataarr.push("<div id=\"commentbox1\" class=\"pinglun1\" style=\"display:none\">");
				dataarr.push("<ul>");
				for (var i = 5; i < datas.records.length; i++) {
					var obj = datas.records[i];
					dataarr.push("<li>");
					dataarr.push("<div class=\"pl_n2\">");
					dataarr.push("<div class=\"n1_tx1\">");
					if(obj.avatar!=null){
						dataarr.push("<a href=\"javascript:void(0);\"><img src=\""+img_url+obj.avatar+"\" width='31' height='31'/></a>");
					}else{
						dataarr.push("<a href=\"javascript:void(0);\"><img src=\""+contentPath+"img/interact/pl_3.png\" /></a>");
					}
					dataarr.push("</div>");
					dataarr.push("<div class=\"n1_n1\">");
					dataarr.push("<span style=\"color: #0CC;\"> <a href=\"javascript:void(0);\">"+obj.nick_name+"</a> </span>");
					dataarr.push(obj.content);
					dataarr.push("</div>");
					dataarr.push("</div>");
					dataarr.push("</li>");				
				}
			}
			if(length>0){
				dataarr.push("</ul>");
				dataarr.push("</div>");
			}
			dataarr.push("</ul>");
			dataarr.push("</div>");
			dataarr.push("</div>");
			dataarr.push("<div class=\"pl_foot\">");
			dataarr.push("<img src=\""+contentPath+"img/interact/pl_001.png\" />");
			dataarr.push("</div>");
			var pinglun=dataarr.join('');
			document.getElementById("comment-"+id).innerHTML=pinglun;
			$("#comment-"+id).show();
			var inputText = $("#ulist").html();
			$("#ulist").html(AnalyticEmotion(inputText));
		}
		
		
		$("#commentbtn1").click(function(){
		    $("#commentbox1").fadeToggle();
			$("#morepinglun").hide();
		});
		
	},error:function(data) {
		easyDialog.open({
			container : {
				content : '网络异常'
			},
			autoClose : 2000
		});
	},dataType:"json"});
	
}
function deleteComment(parent_id,message_id){
	var uid = $("#uid").val();
	var uname = $("#uname").val();
	var nick_name = $("#nickname").val();
	var uidhtml = $("#uid").html();
//	if(uidhtml==null){
//		easyDialog.open({
//			container : {
//				content : '请先登陆'
//			},
//			autoClose : 2000
//		});
//	}
//	else{
//		if(uname==nick_name || uid=="5"){
				$.ajax(
						{url:commentUrl, data:{
					method : "deleteInteractive",
					parent_id:/*parent_id*/2,
					message_id:message_id
				},success:function(data) {
						easyDialog.open({
							container : {
								content : data.msg
							},
							autoClose : 2000
						});
						if(data.code=="000000"){
							location.reload();
						}
				
				},
				error:function(data) {
					easyDialog.open({
						container : {
							content : '删除失败'
						},
						autoClose : 2000
					});
				},dataType:"json"});
//			}
//		else{
//			easyDialog.open({
//				container : {
//					content : '只能删除自己的评论！'
//				},
//				autoClose : 2000
//			});
//		}
//	}
}


function addComment(msgid){
	var commentContent = $("#commentContent-" + msgid).attr("value");
	commentContent = encodeURI(commentContent);
	if (commentContent.isEmpty()) {
		easyDialog.open({
			container : {
				content : '请输入评论内容！'
			},
			autoClose : 2000
		});
		return;
	} else {
		$.ajax({url:commentUrl, data:{
			method : "addInteractive",
			content : commentContent,
			parent_id:msgid,
			t:Math.random()
		},success:function(data) {
			if(data.code=='000001'){
				register();
				return;
			}else{
				easyDialog.open({
					container : {
						content : data.msg
					},
					autoClose : 2000
				});
				$("#commentContent-" + msgid).attr("value", "");
				showComment(msgid, true);
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
}

function supportPlus(id){
	$.ajax({url:commentUrl, data:{
		method : "UpdateSupportById",
		id: id
	},success:function(data) {
		if(data.code=='000001'){
			register();
			return;
		}else{
			$("#support"+id).html(parseInt($("#support"+id).html())+1);
			/*easyDialog.open({
				container : {
					content : '点赞成功'
				},
				autoClose : 2000
			});*/
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