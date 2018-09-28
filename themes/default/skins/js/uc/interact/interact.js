$(document).ready(function() {
	
	 $("input[name='c_type']").val("");
	 
	 $("#commentbtn2").click(function(){
		 $("#commentbox2").fadeToggle();
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
			items_per_page: pageSize, 
			num_edge_entries: 2,
			num_display_entries: 8,
			callback: pageselectCallback
			//回调函数
		});
	};
	
	var queryResByPage = function(page) {
			var listUl= $(".wdhd_n ul");
			listUl.empty();
			var c_type = $("input[name='c_type']").val();
			$.ajax({url:interactUrl, data:{
				method : "queryMyInteractiveList",
				interactType:c_type,
				page:page,
				pageSize:pageSize,
				t:Math.random()
			},success:function(datas) {
				if(datas!=""&&datas!=null){
					//循环输出
					var preCreateTime;
					var dataarr = new Array();
					var needClose = false;
					for (var i = 0; i < datas.records.length; i++) {
						var obj = datas.records[i];
						var recordCreateTime = getDateString2(obj.create_time)
//						if(preCreateTime == null){
//							preCreateTime = recordCreateTime;
//						}
						if(preCreateTime != null && preCreateTime != recordCreateTime){
							dataarr.push("</div>");
							dataarr.push("</li>");
						}
						if(preCreateTime == null || preCreateTime != recordCreateTime){
							dataarr.push("<li>");
							dataarr.push("<div class=\"wdhd_n1\">");
							dataarr.push("<div class=\"n1_sj\">"+ getDateString3(obj.create_time) +"</div>");
							
						}
						dataarr.push("<div class=\"n1\">");
						dataarr.push("<p> <span style=\"font-style: italic; color: #6BB1F7;\">"+ getTimeString(obj.create_time) +"</span> ");
						dataarr.push(obj.content + "</p>");
						if(obj.c_type==1){
							dataarr.push("<div><img src=\""+contentPath+"images/interact/hd_12.png\" />");
						}else if(obj.c_type==2){
							dataarr.push("<div><img src=\""+contentPath+"images/interact/hd_8.png\" />");
						}else{
							dataarr.push("<div><img src=\""+contentPath+"images/interact/hd_11.png\" />");
						}
						dataarr.push("<a style=\"float:right\" href=\"javascript:msgDelete(" + obj.id + ")\"><img src=\""+contentPath+"images/interact/hd_x.png\" /></a></div>");
						dataarr.push("</div>");
						
						preCreateTime = recordCreateTime;
					}
					listUl.append(dataarr.join(''));
					
					var inputText = $("#ulist").html();
					$("#ulist").html(AnalyticEmotion(inputText));
					
					if (page == 1) {
						reloadPage(datas.totalRecord);
					}
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

//删除一条互动交流
function msgDelete(id){
	$.ajax({url:interactUrl, data:{
		method : "deleteMyInteractive",
		id : id,
		t:Math.random()
	},success:function(data) {
		var msg = data==1?"删除成功" : "删除失败";
		easyDialog.open({
			container : {
				content : msg
			},
			autoClose : 2000
		});
		var c_type = $("input[name='c_type']").val();
		if(c_type==0)
			$('#interact_all').trigger("click");
		if(c_type==1)
			$("#interact_msg").trigger("click");
		if(c_type==2)
			$("#interact_request").trigger("click");
		if(c_type==3)
			$("#interact_suggest").trigger("click");
	},error:function(data) {
		easyDialog.open({
			container : {
				content : '网络异常'
			},
			autoClose : 2000
		});
	},dataType:"json"});
}