var DownloadFileList = function(){
	 	var cata_id = $("#cata_id").val();
		var init = function(){
			if(!cata_id){
				return;
			}
			loadData();
		};
		
		var renderHtml =function(data){
			if(data){
				html = template('download-file-div', data);
			}		
			$("#download-file-ul").html(html);
			initEvent();
		};
		var initEvent = function(){
			$(".downloadFileLink").click(function(){
				var id = $(this).attr("id");
		    	$.ajax({
		    		url:getRootPath()+"/catalog/catalogDetail.do?method=CheckLogin",
					type: "POST",
					dataType: "json",
					success: function(ret){
						if("000000" == ret.code){
							checkDownAuth(id);
						}else{
							$('#bounceIn').click();
						}
			  		},error:function(e){
			  			dialog.info('网络异常，请稍后再试',function(){},3000);
			  		}
				});
			});
	    };
		var loadData = function(start){
			var param = {};
	    	param['cata_id'] = cata_id;
	    	param['conf_type'] = 2;
	    	param['file_type'] = '1,3';
	    	dialog.loading({text:'加载中',parent:$('body .content')});
	    	$.ajax({
	    		url:"./catalogDetail.do?method=GetDownLoadInfo",
				type: "POST",
				data: param,
				dataType: "json",
				success: function(ret){
					$('body .content>.dialog-loading').modal('hide');
					if(ret){
						renderHtml(ret);
					}else{
						$('#download-file-ul').html('<li>暂无数据文件</li>');
					}
					
		  		},error:function(e){
		  			$('body .content>.dialog-loading').modal('hide');
		  			dialog.info('请求失败，请稍后重试',function(){},3000);
		  		}
			});
		};
		function checkDownAuth(id) {
			$.ajax({
	    		url:getRootPath()+"/catalog/catalogDetail.do?method=CheckDownloadAuth",
				type: "POST",
				dataType: "json",
				data : {
					"fileId" : id
				},
				success: function(ret){
					if("0000" == ret.code){
						location.href=getRootPath()+"/catalog/CatalogDetailDownload.do?method=getFileDownloadAddr&fileId="+id;
					}else{
						dialog.info(ret.msg,function(){},3000);
					}
		  		},error:function(e){
		  			dialog.info('网络异常，请稍后再试',function(){},3000);
		  		}
			});
		}
	
	 return {
	        init: function() {
	            init();
	        }
	    };
}();

