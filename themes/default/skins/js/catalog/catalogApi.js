var APIList = function(){
	 	var cata_id = $("#cata_id").val();
		var init = function(){
			if(!cata_id){
				return;
			}
			loadData();
		};
		
		var renderPage =function(data){
			if(data){
				html = template('detail-api-div', data);
			}		
			$("#detail_api_list").html(html);
			initEvent();
		};
		var initEvent = function(){
	   	 /****服务接口 展开收起****/	
	   	 $('#detail_api_list .api-operate').click(function(event) {
	   	        $(this).parent().siblings('.api-body').slideToggle(500);
	   	        if($(this).find('i').text()=='展开'){
	   	            $(this).find('i').text('收起');
	   	        }
	   	        else{
	   	            $(this).find('i').text('展开');
	   	        }
	   	    });
	    };
		var pageSize = 1;
		var loadData = function(start){
			start = start||0;
			var param = {};
			param['start'] = start;
	    	param['length'] = pageSize;
	    	param['pageLength'] = pageSize;
	    	param['cata_id'] = cata_id;
	    	dialog.loading({text:'加载中',parent:$('body .content')});
	    	$.ajax({
	    		url:"./catalogDetail.do?method=GetApi",
				type: "POST",
				data: param,
				dataType: "json",
				success: function(ret){
					$('body .content>.dialog-loading').modal('hide');
					if(ret){
						if(ret.recordsTotal>0){
		    				renderPage(ret);
		    				if(start == 0){
		    					initPage(ret.recordsTotal,pageSize);
		    				}
		    			}else{
		    				$('#detail_api_list').html('<li><div class="no-data">暂无API服务信息</div></li>');
		    				$('#Pagination_api').hide();
		    			}
					}else{
						$('#detail_api_list').html('<li><div class="no-data">暂无API服务信息</div></li>');
		    			$('#Pagination_api').hide();
					}
					
		  		},error:function(e){
		  			$('body .content>.dialog-loading').modal('hide');
		  			dialog.info('请求失败，请稍后重试',function(){},3000);
		  		}
			});
		};
		var pageCallback = function(index, jq) {
			loadData(index*pageSize);
	    };
		var initPage = function(count, pageSize){
	    		var count = parseInt(count); 
	    		var pageSize = parseInt(pageSize);
	    		if(count > pageSize){
	    			$("#Pagination_api").show();
	    			 $("#Pagination_api").pagination(count, {
	    			        num_edge_entries: 3,//连续分页主体部分分页条目数
	    			        num_display_entries: 4,//两侧首尾分页条目数
	    			        items_per_page: pageSize,//每页的数据个数
	    			        callback: pageCallback//回调函数
	    			    });
	    		}
	    		else{
	    			$("#Pagination_api").hide();
	    		}
	    };
	
	 return {
	        init: function() {
	            init();
	        }
	    };
}();

/*$(function(){
	//监听tab页面切换事件
    $("body .m-tab").bind("tabChange", function (event, target, message2) {  
    	if(target == "data-api"){
    		APIList.init();
    	}
    });
});*/

