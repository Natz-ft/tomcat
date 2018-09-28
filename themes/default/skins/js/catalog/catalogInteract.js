//评论分页查询
var pageSize = 3; //每页显示条数初始化，改变显示条数修改这里即可
var pageCallback = function(index, jq) {
    queryPage(index + 1 );
    //执行查询，展现分页内容
};
var reloadPage = function(count,pageSize) {
	 $("#Pagination").pagination(count, {
	        num_edge_entries: 3,//连续分页主体部分分页条目数
	        num_display_entries: 4,//两侧首尾分页条目数
	        items_per_page: pageSize,//每页的数据个数
	        callback: pageCallback//回调函数
	    });
	 
};
var cur_message_id;
//评论回复列表分页
var pageCallbackForComment = function(index2, jq) {
    queryPageComment(index2 + 1,cur_message_id );
};
var reloadPageForComment = function(count,pageSize,message_id) {
	cur_message_id = message_id;
	 $("#PaginationReview").pagination(count, {
	        num_edge_entries: 3,//连续分页主体部分分页条目数
	        num_display_entries: 4,//两侧首尾分页条目数
	        items_per_page: pageSize,//每页的数据个数
	        callback: pageCallbackForComment//回调函数
	    });
	 
};

//评论列表
function queryPage(page){
	var cata_id = $("#cata_id").val();
	dialog.loading({text:'加载中',parent:$('body .content')});
    $.ajax({
		method: "post",
        url: "./catalogDetail.do?method=QueryCommentList",
        data: {
            "cata_id": cata_id,
            "page":page,
            "pageSize":pageSize
        },
        success: function(data) {
        	$('body .content>.dialog-loading').modal('hide');
        	if(null != data.records && data.records.length > 0){
        		var dataarr = new Array();
        		for(var i=0;i<data.records.length;i++){
        			var obj = data.records[i];
        			dataarr.push("<li><div class='list-box'><div class='user-img'>");
        			dataarr.push("<img src='"+obj.avatar+"' alt='' />");
        			dataarr.push("</div>");
        			dataarr.push("<div class='list-info'><div class='list-title'> ");
        			dataarr.push("<a href='#' class='list-user'>"+obj.nick_name+"</a><span>的评论</span> <a");
        			dataarr.push("href='#'  onclick='deleteMessage("+obj.parent_id+","+obj.message_id+")' class='dynamic-operate'>X</a>");
        			dataarr.push("</div>");
        			dataarr.push("<div class='list-content'>");
        			
        			var disLen = 69;  
                    var len = obj.content.length;  
                    if (len > disLen) {  
                         obj.content ="<div>" + obj.content.substring(0, disLen) + "<span style='font-size:25px' class='hide'>...</span><span class='hide'" 
                         +  "style = 'display:none;'>" + obj.content.substring(disLen + 1, len)  
                         + "</span> </div><div><a href='#' ><span class=' showmore hide'"  
                         + " act-id='"+i+"' >查看更多</span><span class='hidemore  hide'  act-id='"+i+"' style = 'display:none;'>隐藏</span></a></div>";  
                     }  
                    dataarr.push(obj.content); 
                    dataarr.push("</div>");
        			dataarr.push("<div class='list-time'>"+TimeObjectUtil.longMsTimeConvertToDateTime(obj.create_Time)+"</div>");
        			dataarr.push("</div>");
                    dataarr.push("<div class='list-operation'><ul>");
        			dataarr.push("<li><span class='operate-review' id='operate_review_"+obj.message_id+"' onClick='openComment("+obj.message_id+")' ><i class='fa fa-commenting-o'></i>评论<em>"+obj.reply_num+"</em></span></li>");  
                    if(obj.praise!=null&&obj.praise!=""){
                        dataarr.push("<li><span class='operate-like' id='operate_dlike_"+obj.message_id+"' onclick='dupvote("+obj.message_id+","+obj.praise.praise_id+")'><i class='fa fa-thumbs-o-up'></i>取消点赞<em>"+obj.support+"</em></span></li>");      
                    }else{
                    	dataarr.push("<li><span class='operate-like' id='operate_like_"+obj.message_id+"' onclick='upvote("+obj.message_id+")'><i class='fa fa-thumbs-o-up'></i>点赞<em>"+obj.support+"</em></span></li>");      
                    }
                    dataarr.push("</ul></div></div>");  
                    
                    dataarr.push("<div class='list-review'>");
                    dataarr.push("<div class='review-publish'>");
                    dataarr.push("<div class='user-img'><img src='"+session_avatar+"'/></div>");
                    dataarr.push("<div class='publish-input'>");
                    dataarr.push("<input type='text' class='m-input' id='comment_content_"+obj.message_id+"'/><i class='fa fa-smile-o emotion'></i><button class='m-btn btn-danger btn-xs' onclick='comment_publish("+obj.message_id+")'>评论</button>");   
                    dataarr.push("</div></div>"); 
                    dataarr.push("<div class='review-list'><ul></ul><div class='m-page pg-danger pg-sm pagination' id='PaginationReview'></div></div>");
                    dataarr.push("</div>");
                    dataarr.push("</li>");
        		}
        		$("#commentList").html(dataarr.join('')).parseEmotion();
        	}else{
        		$("#commentList").html("暂无信息");
        	}
			if (data.totalRecord>pageSize) {
				if(page == 1){
					reloadPage(data.totalRecord,pageSize);
				}
			}else{
				$("#Pagination").empty();
			}
        },
        error: function(data) {
        	$('body .content>.dialog-loading').modal('hide');
        	dialog.info('请求失败，请稍后重试',function(){},3000);
            return;
        },
        dataType: "json"
    });
};
$(".dynamic-main .dynamic-list").delegate('.showmore','click',function(){
	$(this).parent().parent().prev().children(".hide").toggle();
	$(this).toggle();
	$(this).next().toggle();
});
$(".dynamic-main .dynamic-list").delegate('.hidemore','click',function(){
	$(this).parent().parent().prev().children(".hide").toggle();
	$(this).toggle();
	$(this).prev().toggle();
});

/*打开评论*/
var openComment = function(message_id){
       $("#operate_review_"+message_id).parents('.list-box').siblings('.list-review').toggle();
       queryPageComment(1,message_id);
};
var queryPageComment = function(page,message_id){
	 $.ajax({
         url: "./catalogDetail.do?method=getCommentReplyList",
         type: "POST",
         data: {
              "message_id": message_id,
              "page":page,
              "pageSize":pageSize
         },
         dataType:"json",
         success: function(data) {
             var reviewlist = $("#operate_review_"+message_id).parents('.list-box').siblings('.list-review').children('.review-list:first');
             var dataarr = new Array();
             if(null != data.records && data.records.length > 0){
                  $(reviewlist).find('ul:first').empty();
                  for(var i=0;i<data.records.length;i++){
                  	var commentobj =  data.records[i];
	                     dataarr.push("<li id='comment_"+commentobj.message_id+"'><div class='user-img'><a href='#'><img src='"+commentobj.avatar+"'/></a></div>"); 
	                     dataarr.push("<div class='review-content'><div class='review-text'>"); 
	                     dataarr.push("<a href='#' class='user-name'>"+commentobj.nick_name+"</a>：");
	                     dataarr.push(commentobj.content+"</div>");       
	                     dataarr.push("<div><span class='review-time'>"+TimeObjectUtil.longMsTimeConvertToDateTime(commentobj.create_Time)+"</span>");     
	                                
	                     dataarr.push("<div class='review-operate'>");  
	                     if(session_uid == commentobj.uid){
	                         dataarr.push("<span class='review-delete' onclick='deleteMessage("+commentobj.parent_id+","+commentobj.message_id+")'>删除</span>");
	                     }
	                     dataarr.push("</div></div></div>");
	                     dataarr.push("<div  id='reply_box_"+commentobj.message_id+"'></div>");
	                     dataarr.push("</li>");
                  }
                  $(reviewlist).find('ul:first').empty().append(dataarr.join('')).parseEmotion();
             }
             if (data.totalRecord>pageSize) {
 				if(page == 1){
 					reloadPageForComment(data.totalRecord,pageSize,message_id);
 				}
 			}else{
 				$("#PaginationReview").empty();
 			}
         }
     });  
}
//删除评论
var deleteMessage = function(parent_id,message_id){
	  if(confirm('确定要删除吗?')) { 
		     $.ajax({
		           url: "./catalogDetail.do?method=deleteMessage",
		           type: "POST",
		           data: {
		                "parent_id": parent_id,
		                "message_id":message_id
		           },
		           dataType:"json",
		           success: function(data) {
		               if(data.status=="1"){
		                   alert(data.info);
		                   //删除成功
		                   $("#comment_"+message_id).remove();
		                   var count = $("#operate_review_"+parent_id).children("em:first").text();
		                    var newcount = parseInt(count) - parseInt(1);
		                    $("#operate_review_"+parent_id).children("em:first").text(newcount);
		                    $("#operate_review_"+parent_id).html("<i class='fa fa-commenting-o'></i>评论<em>"+newcount+"</em>");
		               }else{
		                   dialog.alert(data.info);
		                }
		           }
		     });
		     queryPage(1);
	     }
	     return false; 
};

//评论
var comment_publish = function(parent_id){
	var title=$("#dataCatalogTitle").html();
	var org_code=$("#org_code").html();
	if(null != session_uid && "" != session_uid){
		var comment_content = $("#comment_content_"+parent_id).val();
	    if(comment_content.trim()==""){
	        dialog.info("评论内容不能为空");
	        return;
	    }else{
	         $.ajax({
	               url: "./catalogDetail.do?method=publishComment",
	               type: "POST",
	               data: {
	                    "parent_id": parent_id,
	                    "comment_content": comment_content,
	                    "title":title,
					    "org_code":org_code
	               },
	               dataType:"json",
	               success: function(data) {
	                   if(data.success=="1"){
	                       var reviewlist = $("#operate_review_"+parent_id).parents('.list-box').siblings('.list-review').children('.review-list:first').children("ul");
	                       /*var dataarr = new Array();
	                       dataarr.push("<li id='comment_"+data.message_id+"'><div class='user-img'><a href='#'><img src='"+data.avatar+"'/></a></div>"); 
	                       dataarr.push("<div class='review-content'><div class='review-text'>"); 
	                       dataarr.push("<a href='#' class='user-name'>"+data.nick_name+"</a>："+comment_content+"</div>");
	                       dataarr.push("<div><span class='review-time'>"+data.creat_time+"</span>");                 
	                       dataarr.push("<div class='review-operate'>");    
	                       dataarr.push("<span class='review-delete' onclick='deleteMessage("+parent_id+","+data.message_id+")'>删除</span>");         
	                       dataarr.push("</div></div>");
	                       dataarr.push("</div>");
	                       dataarr.push("</li>"); 
	                       $(reviewlist).prepend(dataarr.join("")).parseEmotion();*/
	                       //alert("回复成功，进入审核系统");
	                       dialog.info('评论成功，请等待管理员审核',function(){
		                		 return;
		                	},3000);
	                       $("#comment_content_"+parent_id).val("");
	                       var count = $("#operate_review_"+parent_id).children("em:first").text();
	                       var newcount = parseInt(count);
	                       $("#operate_review_"+parent_id).children("em:first").text(newcount);
	                      // dialog.alert(data.msg);
	                    }else{
	                    	dialog.alert(data.msg);
	                    }
	               }
	         });
	    }
	}else{
		$('#bounceIn').click();
	}
    
};
	//点赞
	var upvote = function(message_id){
		if(null != session_uid && "" != session_uid){
			$.ajax({
		        url:"./catalogDetail.do?method=Praise",
		        type:"POST",
		        data:{
		            "message_id":message_id
		        },
		        success:function(data){
                	var count =  $("#operate_like_"+message_id).children("em:first").text();
		            var newcount = parseInt(count)+parseInt(1);
		            var html ="<span class='operate-like' id='operate_dlike_"+message_id+"' onclick='dupvote("+message_id+","+data.id+")'><i class='fa fa-thumbs-o-up'></i>取消点赞<em>"+newcount+"</em></span>";
		            $("#operate_like_"+message_id).parent("li").empty().append(html);
		            dialog.info(data.info);
		        },
		        error: function(data) {
		            dialog.alert("失败");
		        },dataType:"json"
		    });
		}else{
			$('#bounceIn').click();
		}
	    
	};

	//取消点赞
	var dupvote = function(message_id,praise_id){
	    $.ajax({
	        url:"./catalogDetail.do?method=DelPraise",
	        type:"POST",
	        data:{
	            "praise_id":praise_id,
	            "message_id":message_id
	        },
	        success:function(data){
	            var count =  $("#operate_dlike_"+message_id).children("em:first").text();
	            var newcount = parseInt(count)-parseInt(1);
	            var html ="<span class='operate-like' id='operate_like_"+message_id+"' onclick='upvote("+message_id+")'><i class='fa fa-thumbs-o-up'></i>点赞<em>"+newcount+"</em></span>";
	            $("#operate_dlike_"+message_id).parent("li").empty().append(html);
	            dialog.info(data.info);
	        },
	        error: function(data) {
	            dialog.alert("失败");
	        },dataType:"json"
	    });
	};

//评论保存
	function saveComment(){
		if(!isLogged()) {
			showLoginDialog();
			return;
		}
		var comment = $("#pub-textarea").val();
		var cata_id = $("#cata_id").val();
		var type = $("#commentType").val();
		var title=$("#dataCatalogTitle").html();
		var org_code=$("#org_code").val();
	  comment=comment.replace(/[\r\n]/g,"<br>");
	    if(comment != ""){
	    	$.ajax({
	    		method: "post",
	            url: getRootPath() + "/catalog/catalogDetail.do?method=AddComment",
	            data: {
	            	"obj_id": cata_id,
	                "content":comment,
	                "content_type":type,
	                "title":title,
					"org_code":org_code
	            },
	            success: function(data) {
	            	//if(data.code=='000003'){
	            		//dialog.info('当前用户已发布过评论',function(){return;},3000);
	            	//}
	                if (data.code == '000000') {
	                	dialog.info('评论成功，请等待管理员审核',function(){return;},3000);
	                } else {
	                	dialog.info(data.msg,function(){return;},3000);
	                    return;
	                }
	                $("#pub-textarea").val("");
	            },
	            error: function(data) {
	            	dialog.info('请求失败，请稍后重试',function(){},3000);
	                return;
	            },
	            dataType: "json"
	        });
	    }else{
	    	dialog.info('请先填写评论',function(){},3000);
	    }
		
	}
//收藏
function collection(){
	var obj_id = $("input[name='cata_id']").val();
	var obj_type = "1";
	var obj_name = $("#cata_name").val();
    //收藏操作
	$.ajax({
		url: getRootPath()+"/catalog/catalogDetail.do?method=saveFavorite",
		type: "POST",
		data: {
			"obj_type":obj_type,
			"obj_name":obj_name,
			"cata_id":obj_id
		},
		success: function(data) {
			if(data.code=='000001'){
				$('#bounceIn').click();
			}else{
				if(data.code=="000000"){
					dialog.info('收藏成功',function(){
    					$("#collection").hide();
    					$("#cancelCollection").show();
					},3000);
				}else{
					dialog.info('收藏失败，请稍后重试！',function(){},3000);
				}
			}
		},
		error: function(data) {
			dialog.info('网络异常，请稍候重试！',function(){},3000);
		},dataType:"json"
	});
}

//取消收藏
function cancleCollection(){
	var obj_id = $("input[name='cata_id']").val();
	var obj_type = "1";
	var obj_name = $("#cata_name").val();
    //取消收藏操作
	$.ajax({
		url: getRootPath()+"/catalog/catalogDetail.do?method=cancelFavorite",
		type: "POST",
		data: {
			"obj_type":obj_type,
			"cata_id":obj_id			
		},
		success: function(data) {
			if(data.code=="000000"){
				dialog.info('取消收藏成功',function(){
					$("#cancelCollection").hide();
					$("#collection").show();
				},3000);
			}else{
				dialog.info('取消收藏失败，请稍后重试！',function(){},3000);
			}
		},
		error: function(data) {
			dialog.info('网络异常，请稍候重试！',function(){},3000);
		},dataType:"json"
	});

}

//评分星星
$('.comment-star i').each(function(event) {
    $(this).mouseover(function(event) {
        var star_des = $(this).index()+1;
        $(this).css('color','#CD950C');
        $(this).prevAll('i').css('color','#CD950C');
        if(star_des==1){
            $('.comment-description').text("1星：很差");
        }
        else if(star_des==2){
            $('.comment-description').text("2星：较差");
        }
        else if(star_des==3){
            $('.comment-description').text("3星：一般");
        }
        else if(star_des==4){
            $('.comment-description').text("4星：较好");
        }
        else if(star_des==5){
            $('.comment-description').text("5星：很好");
        }
    });
    $(this).mouseleave(function(event) {
        $('.comment-star i').css('color','#999');
        $('.comment-description').text("");
    });
    $(this).click(function(event) {
    	var star_des = $(this).index()+1;
    	var obj_id = $("input[name='cata_id']").val();
    	var use_score=$("#star-num").text();
    	var use_points=$("#star-points").text();
    	$.ajax({
    		url: getRootPath()+"/catalog/catalogDetail.do?method=AddScore",
    		type: "POST",
    		data: {
    			"score":star_des,
    			"cata_id":obj_id,
    		},
    		success: function(data) {
    			if(data.code=='000001'){
    				$('#bounceIn').click();
    			}else if(data.code=='000003'){
    				dialog.info('当前用户已参与过评分！',function(){},3000);
    			}else if(data.code=='000000'){
    				var html ="";
    				var html1='';
    				var percent=0;
    				var score=parseFloat(use_score);
    				var points=parseInt(use_points.substring(1));
    				if(isNaN(score)){
    					score=0;
    				}
    				if(isNaN(points)){
    					points=0;
    				}
					score=(score*points+star_des)/(points+1);
					points=points+1;
					percent=score/5*100;
    				html1=html1+'<div class="star-num">'+score.toFixed(2)+'</div>';
    				html1=html1+'<div class="comment-star"><span class="starcon"><span class="starmon" style="width:'+percent+'% "></span></span>';
    				html1=html1+'<div>('+points+'人评分)</div></div>';
    				for(var i =0;i<star_des;i++){
    					html = html +"<i class='iconfont icon-pingfen' ";
    					html = html +"style='color: rgb(205, 194, 12);'></i>";
    				}
    				for(var i =0 ;i<(5-star_des);i++){
    					html = html +"<i class='iconfont icon-pingfen' ";
    					html = html +"style='color: rgb(153, 153, 153);'></i>";
    				}
    				html = html +"<div class='comment-description'>";
    		        if(star_des==1){
    		        	html = html +"1星：很差";
    		        }
    		        else if(star_des==2){
    		        	html = html +"2星：较差";
    		        }
    		        else if(star_des==3){
    		        	html = html +"3星：一般";
    		        }
    		        else if(star_des==4){
    		        	html = html +"4星：较好";
    		        }
    		        else if(star_des==5){
    		        	html = html +"5星：很好";
    		        }
    				html = html +"</div>";
					$("#comment-star-my").html(html);
					$("#da-content-my").html(html1);
    				dialog.info('评分成功！',function(){},3000);
    				//location.reload(true);
    			}else{
    				dialog.info('评分失败，请稍候重试！',function(){},3000);
    			}
    		},
    		error: function(data) {
    			dialog.info('网络异常，请稍候重试！',function(){},3000);
    		},dataType:"json"
    	});
    });
});

//评论类型选择
	/*('.publish-range>div').click(function(){
	    $(this).siblings('ul').slideToggle();
	});
	$('.publish-range>ul>li').click(function(){
	    var text_range = $(this).text();
	    $(this).parent().siblings('div').find('span').text(text_range);
	});
	var bRange = false;
	$('.publish-range>div').mouseover(function(){
	    bRange = true;
	});
	$('.publish-range>div').mouseleave(function(){
	    bRange = false;
	});
	$(document).click(function(){
	    if(!bRange){
	        $('.publish-range>ul').hide();
	    }
	});*/