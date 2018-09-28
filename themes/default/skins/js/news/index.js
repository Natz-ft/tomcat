/**
 * Created by longhongwen on 2016/10/18.
 */
$(function() {
	$(".filter-list li:nth-child(1)").addClass('active');
	queryResByPage(1);
    //排序点击切换
    $('.sort-list ul li').each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
        });
    });
    
    //类别
    $(".filter-list li").each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
    		$("input[name=columnId]").val($(this).find("a").attr("rel"));
    		queryResByPage(1);
        });
	});
    //清除属性
    $(".selected-empty").click(function(){
		$("input[name=groupId]").val("");
		queryResByPage(1);
	});
    
   //清除属性
    $(".iconfont").click(function(){
    	$("input[name=groupId]").val("");
		queryResByPage(1);
	});
    //综合排序
    $(".sort-list ul li").click(function(){
    	var rel = $(this).attr("rel");
    	if("hotEst"==rel){
    		$("input[name=oderlist]").val(1);
    	}else if("newEst"==rel){
    		$("input[name=oderlist]").val(2);
    	}else if("scorEst"==rel){
    		$("input[name=oderlist]").val(3);
    	}
		
		queryResByPage(1);
	});
});

//应用列表
function queryResByPage(page) {
	dialog.loading({text:'加载中',parent:$('#cata-main')});
	var listul = $("#app-list");
	listul.empty();
	var pageSize = 10; //每页显示条数初始化，修改显示条数，修改这里即可
	var column_id = $("#columnId").val();
	$.ajax({
		url: Url,
		type: "POST",
		data: {
			"pageSize": pageSize,
			"page": page,
            "column_id":column_id,
		},
		success: function(data) {
			$('#cata-main>.dialog-loading').modal('hide');
			if(data){
				data=JSON.parse(data);
				var dataarr = [];
				if(data.records.length >0){
					for (var i = 0; i < data.records.length; i++) {
						var obj = data.records[i];
						var logo = obj.app_logo;
						
						if(logo!=null&&logo!=null){
							logo = web_doc+logo;
						}
						
						var description = "";
						if(obj.description != null){
							description = obj.description.substr(0,68);
						}
						//var logo = "../dist/img/app/default.jpg";
						//li开始
						dataarr.push("<li class='cata-item'>");
						
						dataarr.push("<div class='item-icon'>");
						if(logo!=null&&logo!=""){
							dataarr.push("<img src='"+logo+"' alt='' width='50' height='50' />");
						}else{
							dataarr.push("<i class='iconfont'>&#xe6a6;</i>");
						}
						dataarr.push("</div>");
						dataarr.push("<div class='item-content'>");
						dataarr.push("<div class='item-header'>");
						
						dataarr.push("<div class='item-title'><a href='"+contentPath+"newsDetail.htm?news_id="+obj.res_id+"' target='_blank'>"+obj.title+"</a></div></div>");
						dataarr.push("<div class='item-body'><div class='item-info'>");
						if(obj.provider!=null&&obj.provider!=""){
							dataarr.push("<div class='item-theme'>发布者："+obj.provider+"</div>");
						}
						dataarr.push("<span>发布时间："+obj.publish_time+"</span></div><div>"+obj.abstracts+"</div></div></div>");
						dataarr.push("</li>");
						//li结束
						dataarr.push("</li>");
					}
					
					listul.append(dataarr.join(''));
				}
				//获取总页码
				$("#sort-sum").html("共"+data.totalRecord+"条新闻");
				if (page == 1&&data.totalRecord>pageSize) {
					reloadPage(data.totalRecord);
				}else if(page == 1){
					$("#Pagination").empty();
				}
				if(data.records.length <= 0){
					$("#Pagination").html("暂无数据");
					$("#sort-sum").html("共0条新闻");
				}
			}else{
				if (page == 1) {
					$("#Pagination").html("暂无数据");
				}
				$("#sort-sum").html("共0条新闻");
			}
		},
		error: function(data) {
  			dialog.info('应用列表数据请求失败，请稍后重试',function(){},3000);
  			$('#app-list>.dialog-loading').modal('hide');
		}
	});
}

//创建分页元素
function reloadPage(totlePage) {
	$("#Pagination").pagination(totlePage, {
		num_edge_entries: 2,
		num_display_entries: 4,
		callback: pageselectCallback
		//回调函数
	});
};

function pageselectCallback(page_id, jq) {
	queryResByPage(page_id + 1);
//	//滑动至顶部
//	var speed = 500;//自定义滚动速度
//    $( "html,body").animate({ "scrollTop" : 0 }, speed);
};