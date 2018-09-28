<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<website:style rel="stylesheet"
	href="libs/assets/jquery-sinaEmotion/jquery-sinaEmotion.css" />
<script src="${fn:getUrl('libs/assets/jquery-sinaEmotion/jquery-sinaEmotion.js')}"></script>
<script src="${fn:getUrl('js/catalog/timeUtil.js')}"></script>
<website:script src="libs/assets/jquery.pagination.js" />
<!---- 数据详情页面 - 交流互动部分 ---->
<div class="m-dt-main">
    <div class="dt-content">
        <div class="dt-section">
            <div class="dt-sec-content">
                <div class="dt-publish">
                    <textarea rows="3" class="m-input"  id="pub-textarea"></textarea>
                    <div class="dt-pub-operation">
                        <div class="g-left">
                            <ul>
                                <li>
                                    <i class="fa fa-smile-o emotion"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="g-right">
                            <button class="m-btn btn-info btn-corner" onclick="javascript:saveComment()">评论</button>
                        </div>
                    </div>
                </div>
                <input type="hidden" id="imgtemp"  value="data:image/jpg;base64,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">
                <div class="dt-comment-list">
                    <ul id="ul-comment-list">
                    </ul>
	                <div class="m-page pagination pg-info pg-corner pg-sm" id="comment_Pagination">
	                </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
var session_uid = "${sessionScope.uid}";
var session_avatar = "${sessionScope.userInfo.avatar}";
    function commentTabInit(){
        /** 初始化表情包交互 **/
        $('body').on('click','.emotion',function(event){
            var text_input;
            if($(this).parents('.publish-input').length>0){
                text_input = $(this).parents('.publish-input').find('.m-input');
            }
            else{
            	text_input = $('.dt-publish textarea');
            }
            $(this).sinaEmotion(text_input);
            event.stopPropagation();
        });
        $('.dt-publish').parseEmotion();
    }
    
    var pageSize = 3;
    $(function() {
    	
       var reloadPage = function(count, pageSize,currPage){
    		var count = parseInt(count); 
    		var pageSize = parseInt(pageSize);
    		var currPage = parseInt(currPage);
    		if(count > pageSize){
    			 $("#comment_Pagination").show();
    			 $("#comment_Pagination").pagination(count, {
    			        num_edge_entries: 3,//连续分页主体部分分页条目数
    			        current_page: currPage-1,
    			        num_display_entries: 4,//两侧首尾分页条目数
    			        items_per_page: pageSize,//每页的数据个数
    			        callback: pageCallback//回调函数
    			    });
    		}
    		else{
    			$("#comment_Pagination").hide();
    		}
    	};
    	
        var pageCallback = function(index, jq) {
            queryPage(index+1);
            //执行查询，展现分页内容
        };
        
      //评论列表
        var queryPage = function(page){
        	var cata_id = $("#cata_id").val();
            $.ajax({
        		type: "post",
                url: getRootPath()+"/catalog/CatalogDetail.do?method=QueryCommentList",
                data: {
                    "cata_id": cata_id,
                    "page":page,
                    "pageSize":pageSize
                },
                success: function(data) {
                	if(null != data.records && data.records.length > 0){
                		var dataarr = new Array();
                		for(var i=0;i<data.records.length;i++){
                			var obj = data.records[i];
                			dataarr.push("<li><div class='dt-comment-left'>");
                			if(obj.avatar==null || obj.avatar==""){
                				var defaultimg = $("#imgtemp").val();
    	            			dataarr.push("<a href='#'><image src='"+defaultimg+"' alt='' /></a>");
                			}else{
                				dataarr.push("<a href='#'><img src='"+obj.avatar+"' alt='' /></a>");
                			}
                			dataarr.push("</div>");
                			dataarr.push("<div class='dt-comment-right'><div class='dt-comment-info'> ");
                			dataarr.push("<span class='dt-comment-user'><a href='#'>"+obj.nick_name+"</a></span>");
                			dataarr.push("<span class='dt-comment-date'>"+TimeObjectUtil.longMsTimeConvertToDateTime(obj.create_Time)+"</span></div>");
                			dataarr.push("<div class='dt-comment-content'>"+obj.content+"</div>");
                			dataarr.push("</div>");
                			
                            dataarr.push("<div class='list-operation'><ul>");
                			dataarr.push("<li><span class='operate-review' id='operate_review_"+obj.message_id+"' onClick='openComment("+obj.message_id+")' ><i class='fa fa-commenting-o'></i>评论<em>"+obj.reply_num+"</em></span></li>");  
                            if(obj.praise!=null&&obj.praise!=""){
                                dataarr.push("<li><span class='operate-like' id='operate_dlike_"+obj.message_id+"' onclick='dupvote("+obj.message_id+","+obj.praise.praise_id+")'><i class='fa fa-thumbs-o-up'></i>取消点赞<em>"+obj.support+"</em></span></li>");      
                            }else{
                            	dataarr.push("<li><span class='operate-like' id='operate_like_"+obj.message_id+"' onclick='upvote("+obj.message_id+")'><i class='fa fa-thumbs-o-up'></i>点赞<em>"+obj.support+"</em></span></li>");      
                            }
                            dataarr.push("</ul></div>");
                            
                            dataarr.push("<div class='list-review'>");
                            dataarr.push("<div class='review-publish'>");
                            dataarr.push("<div class='user-img'><img src='"+session_avatar+"'/></div>");
                            dataarr.push("<div class='publish-input'>");
                            dataarr.push("<input type='text' class='m-input' id='comment_content_"+obj.message_id+"'/><i class='fa fa-smile-o emotion'></i><button class='m-btn btn-danger btn-xs' onclick='comment_publish("+obj.message_id+")'>评论</button>");   
                            dataarr.push("</div></div>"); 
                            dataarr.push("<div class='review-list'><ul></ul><div class='m-page pg-danger pg-sm pagination' id='PaginationReview'></div></div>");
                			dataarr.push("</li>");
                		}
                		$("#ul-comment-list").html(dataarr.join('')).parseEmotion();
                	}else{
                		$("#ul-comment-list").html("暂无信息");
                	}
        			if (data.totalRecord>pageSize) {
        				if(page == 1){
        					reloadPage(data.totalRecord,pageSize,data.currPage);
        				}
        			}else{
        				$("#comment_Pagination").empty();
        			}
                },
                error: function(data) {
                    return;
                },
                dataType: "json"
            });
        }
      
        queryPage(1);
    });
  
    /** 评论显示 **/
    $('.list-operation>ul>li a').click(function(e){
        e.preventDefault();
    });
    $('.operate-review').click(function(){
        $(this).parents('.dt-comment-left').siblings('.list-review').toggle();
    });
    
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
	  	comment=comment.replace(/[\r\n]/g,"<br>");
	    if(comment != ""){
	    	$.ajax({
	    		method: "post",
	            url: getRootPath() + "/catalog/catalogDetail.do?method=AddComment",
	            data: {
	            	"obj_id": cata_id,
	                "content":comment,
	                "content_type":type,
	                "title":title
	            },
	            success: function(data) {
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
  
	/*打开评论*/
	var openComment = function(message_id){
	       $("#operate_review_"+message_id).parents('.list-operation').siblings('.list-review').toggle();
	       queryPageComment(1,message_id);
	};
	var queryPageComment = function(page,message_id){
		 $.ajax({
	         url: getRootPath() + "/catalog/catalogDetail.do?method=getCommentReplyList",
	         type: "POST",
	         data: {
	              "message_id": message_id,
	              "page":page,
	              "pageSize":pageSize
	         },
	         dataType:"json",
	         success: function(data) {
	        	 debugger;
	             var reviewlist = $("#operate_review_"+message_id).parents('.list-operation').siblings('.list-review').children('.review-list:first');
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
	
	//评论
	var comment_publish = function(parent_id){
		var title=$("#dataCatalogTitle").html();
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
		                    "title":title
		               },
		               dataType:"json",
		               success: function(data) {
		                   if(data.success=="1"){
		                       var reviewlist = $("#operate_review_"+parent_id).parents('.list-box').siblings('.list-review').children('.review-list:first').children("ul");
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
	
	//删除评论
	function deleteMessage(parent_id,message_id){
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
	
	//点赞
	function upvote(message_id){
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
	function dupvote(message_id,praise_id){
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
</script>