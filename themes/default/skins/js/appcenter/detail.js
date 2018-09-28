/**
 * Created by longhongwen on 2016/10/18.
 */
$(function() {
	
	//评论列表
	queryResByPage(1)
	
    //评论
    $("#comSubmit").click(function(){
    	// 调用common.js判断是否登录
    	if(!isLogged()) {
    		showLoginDialog();
    		return;
    	}
    	var commentContent = $("#commentContent").val();
    	if (commentContent==null||commentContent=="") {
    		dialog.info('请输入评论内容！',function(){},2000);
    		return;
    	} else {
    		$.ajax({
    			url:commentUrl, 
    			type:"post",
    			data:{
    			"content": commentContent,
    			"obj_id":app_id,
    			"obj_name":app_name,
    			"object_code":object_code,
    			"obj_title":object_code,
    			"obj_type":2,
    			"content_type":1,
    			"t":Math.random()
    		},success:function(data) {
    			dialog.info(data.msg,function(){},2000);
    			$("#commentContent").attr("value", "");
    		},error:function(data) {
    			dialog.info('网络异常',function(){},2000);
    		},dataType:"json"});
    	}
	});
	
    /****评分星星****/
    $('.comment-star i').each(function(event) {
        $(this).mouseover(function(event) {
            var star_des = $(this).index();
            $(this).css('color','#CD950C');
            $(this).prevAll('i').css('color','#CD950C');
            if(star_des==1){
                $('.comment-description').text("1星：很差");
                $("input[name=score]").val("2");
            }
            else if(star_des==2){
                $('.comment-description').text("2星：较差");
                $("input[name=score]").val("4");
            }
            else if(star_des==3){
                $('.comment-description').text("3星：一般");
                $("input[name=score]").val("6");
            }
            else if(star_des==4){
                $('.comment-description').text("4星：较好");
                $("input[name=score]").val("8");
            }
            else if(star_des==5){
                $('.comment-description').text("5星：很好");
                $("input[name=score]").val("10");
            }
            //$(this).nextAll().css("color","#999")
        });
	    $(this).mouseleave(function(event) {
	        $('.comment-star i').css('color','#999');
	        $('.comment-description').text("");
	    });
    });
    
    //点击评分
    $('.comment-star i').each(function(event) {
    	$(this).bind("click",function(){
        	if(!isLogged()) {
        		showLoginDialog();
        		return;
        	}
    		var score = $("#score").attr("value");
    		$.ajax({
    			method: "post",
    			url:add_score,
    			data:{obj_id:app_id,object_code:object_code,score:score,obj_type:3},
    			  success: function(data){
    				  if(data.code=='000001'){
    					    showLoginDialog();
    						return;
    					}
    				  dialog.info(data.msg,function(){},2000);
    			  },
    			  error: function(data) {
    					dialog.info('网络异常',function(){},2000);
    				},dataType:"json"
    			
    		});
    	});
	});
});

function queryResByPage(page) {
	var listul = $("#message-list");
	listul.empty();
	
	var pageSize = 6; //每页显示条数初始化，修改显示条数，修改这里即可
	$.ajax({
		url: queryMessageUrl,
		type: "POST",
		data: {
			"pageSize": pageSize,
			"page": page,
            "object_id":app_id
		},
		success: function(data) {
			if(data){
				data=JSON.parse(data);
				var dataarr = [];
				if(data.records!=null){
					if(data.records.length >0){
						for (var i = 0; i < data.records.length; i++) {
							var obj = data.records[i];
							var score = obj.score;
							dataarr.push("<li>");
							dataarr.push("<div class='comment-left'><a href='#'>");
							if(obj.avatar!=null&&obj.avatar!=""){
								dataarr.push("<img src='"+obj.avatar+"' alt='' width='64' height='64'>");
							}else{
								dataarr.push("<img src='"+contentPath+"../img/appcenter/eric.jpg' alt=''>");
							}
							
							dataarr.push("</a></div>");
							dataarr.push("<div class='comment-right'><div class='comment-info'>");
							dataarr.push("<span class='comment-user'><a href='#'>"+obj.nick_name+"</a></span>");
							dataarr.push("<span class='comment-date'>"+obj.create_time+"</span>");
							//应用评分
							/*dataarr.push("<span class='comment-userstar'>");
							if(score!=null&&score!=""){
								for(var j=0;j<Math.round(score/2);j++){
									dataarr.push("<i class='iconfont icon-pingfen'></i>");
								}
							}
							*/
							dataarr.push("</span></div>");
							dataarr.push("<div class='comment-content'>"+obj.content+"</div>");
							dataarr.push("</div>");
							dataarr.push("</li>");
						}
						
						listul.append(dataarr.join(''));
					}
				}
				//获取总页码
				if (page == 1&&data.totalRecord>pageSize) {
					reloadPage(data.totalRecord);
				}else if(page == 1){
					$("#Pagination").empty();
				}

			}
		},
		error: function(data) {
			dialog.info('网络异常',function(){},2000);
		}
	});
}

//创建分页元素
function reloadPage(totlePage) {
	$("#Pagination").pagination(totlePage, {
		items_per_page:6,
		num_edge_entries: 2,
		num_display_entries: 4,
		callback: pageselectCallback
		//回调函数
	});
};

function pageselectCallback(page_id, jq) {
	queryResByPage(page_id + 1);
};