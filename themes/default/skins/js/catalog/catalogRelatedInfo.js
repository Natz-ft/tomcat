var CatalogRelatedInfo = function(){
	 	var cata_id = $("#cata_id").val();
		var init = function(){
			if(!cata_id){
				return;
			}
			loadData();
		};
		var htnl = "";
		var renderCatalog =function(data){
			if(data){
				html = template('catalog-related-div', data);
			}		
			$("#catalog-related-ul").html(html);
		};
		var renderApp =function(data){
			if(data){
				html = template('app-related-div', data);
			}		
			$("#app-related-ul").html(html);
		};
		
		var loadData = function(start){
			var param = {};
	    	param['cata_id'] = cata_id;
	    	dialog.loading({text:'加载中',parent:$('body .content')});
	    	$.ajax({
	    		url:"./catalogDetail.do?method=GetCataRelactionInfo",
				type: "POST",
				data: param,
				dataType: "json",
				success: function(ret){
					$('body .content>.dialog-loading').modal('hide');
					if(ret){
						renderCatalog(ret);
					}
					
		  		},error:function(e){
		  			$('body .content>.dialog-loading').modal('hide');
		  			dialog.info('请求失败，请稍后重试',function(){},3000);
		  		}
			});
	    	$.ajax({
	    		url:"./catalogDetail.do?method=GetAppRelactionInfo",
				type: "POST",
				data: param,
				dataType: "json",
				success: function(ret){
					$('body .content>.dialog-loading').modal('hide');
					if(ret){
						renderApp(ret);
					}
		  		},error:function(e){
		  			$('body .content>.dialog-loading').modal('hide');
		  			dialog.info('请求失败，请稍后重试',function(){},3000);
		  		}
			});
	    	
		};
	
	 return {
	        init: function() {
	            init();
	        }
	    };
}();

