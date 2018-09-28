	/**
	 * 收藏应用
	 * @param {} a
	 * @param {} fav_url
	 * @param {} app_id
	 */
	function appFavourite(a,app_id,version_id){
		if(a.innerHTML == '取消收藏'){
			var fav_data = {is_favourite:"0",app_id:app_id,version_id:version_id};
		}else{
			var fav_data = {is_favourite:"1",app_id:app_id,version_id:version_id};
		}
	 	$.ajax({
	 		//url:"${fn:getLink('store/extapp.do?method=isLogged')}",
			url:login_url,
	 		type:"POST",
			success:function(res){
				if(res == 1){
					$.ajax({
						type:"POST",
						data:fav_data,
						url:favourite_url,
						error:function(){
							dialog.error('操作失败');
						},
						success:function(data){
							if (typeof(data) == "string") {
				                data = JSON.parse(data);
				            }
							if(data.code == "0000"){
								if(data.data == "1"){
									a.innerHTML = '收藏';
									layer.msg("已取消收藏",1,1);
								}else if(data.data == "2"){
									a.innerHTML = '取消收藏';
									layer.msg("收藏成功",1,1);
								}
								} else {
									layer.msg("操作失败",1,5);
								}
							}
					});
				}else{
					layer.msg("尚未登陆",1,5);
				}
				}
			})
	}
	
	
	/**
	 * 卸载应用
	 * @param {} a
	 * @param {} app_id
	 */
	function appUninstall(a,app_id,version_id){
		if(!confirm("是否卸载应用")){ 
			return; 
		}
	
		$.ajax({
			type:'post',
			url:uninstall_url,
			data:{'app_id':app_id,'version_id':version_id},
			success:function(data){
				
				if(data==""||data==null){
					dialog.error("卸载失败");
					return;
				}
				
				if (typeof(data) == "string") {
	                data = JSON.parse(data);
	            }
				if(data.code == "0000"){
					dialog.success("卸载成功");
					$(a).parent().remove();
				} else {
					dialog.error("卸载失败");
				}
			},
			error:function(){
				dialog.error("卸载失败");
			}
		});
	}
	
	/**
	 * 我“收藏的应用”，分页请求，通过Ajax刷新应用列表分页请求
	**/
	function getMyCollectedAppPage(data){
		var page_data = {pagesize:data.pagesize,count:data.count,index:data.index};
		$.ajax({
			type:"POST",
			data:page_data,
			url: getMyCollectedAppList_url,
			success: function(data){
				if((typeof(data) == "string")){
		    	  	data = JSON.parse(data);
		      	}
				getMyCollectedAppHandler(data,page_data);
	  		},
			error:function(){
//				alert("获取收藏的应用失败");
			}
		});
	}
	
	/**
	 *我使用的应用，分页请求回调操作
	 * @param {} data
	 * @param {} count
	 * @param {} index
	 * @param {} pagesize
	 */
	function getMyCollectedAppHandler(data,page_data){
		var tags = "";
		if(data && data.data){
			var list = data.data;
			for(var i = 0;i < list.length; i++) {
				var item = list[i];
				var app_detail = appDetail_url + item.app_id;//应用明细链接地址
				var app_img = appImg_url + item.pic_info.icon+icon_size_para;//应用图片地址
				tags += '<li><a target="_blank" href="' + app_detail + '" class="unLine">'
					 + '<img src="' + app_img + '" class="app-item-icon" title="'+item.app_alias+'"></a>'
					 + '<a target="_blank" href="' + app_detail + '" class="app-name m-text" title="'+item.app_alias+'">'
					 + item.app_alias + '</a>'
					 + '<p>'
					 	+ '<span class="app-score"><span class="app-score app-score-color" style="width:' + item.grade * 10  + '%"></span></span>'
				     	+ '<span class="app-grade">' + splitStr(item.grade) + '</span>'
				     + '</p>' 
				     + '<a class="btn_wg" onclick="appFavourite(this,' + item.app_id +','+item.version_id+ ')">取消收藏</a>'
			         + '</li>';
			}
			$("#myCollectedAppId").empty().append(tags);
			
			$("#myCollected_paper").ui_paper({
				count: page_data.count,					
				current: page_data.index,
				pagesize: page_data.pagesize,
				fun:"getMyCollectedAppPage"
			});
		}else{
		}
	}
	
	/**
	 * 截取字符串
	 * @param {} str
	 */
	function splitStr(str){
		if(str != null){
			str = str.toString();
			if(str.length >= 3){
				return str.substring(0,3);
			}
			
			if(str == "0.0"){
				return "0";
			}
			
			return str;
		}else{
			return 0;
		}
	}
	
	/**
	 * 我使用的应用，分页请求，通过Ajax刷新应用列表分页请求
	**/
	function getMyUsedAppPage(data){
		var page_data = {pagesize:data.pagesize,count:data.count,index:data.index};
		$.ajax({
			type:"POST",
			data:page_data,
			url: getMyUsedAppList_url,
			success: function(data){
				if((typeof(data) == "string")){
		    	  	data = JSON.parse(data);
		      	}
				getMyUsedAppHandler(data,page_data);
	  		}
		});
	}
	
	/**
	 *我使用的应用，分页请求回调操作
	 * @param {} data
	 * @param {} count
	 * @param {} index
	 * @param {} pagesize
	 */
	function getMyUsedAppHandler(data,page_data){
		var tags = "";
		if(data && data.data){
			var list = data.data;
			for(var i = 0;i < list.length; i++) {
				var item = list[i];
				var app_detail = appDetail_url + item.app_id;//应用明细链接地址
				var app_img = appImg_url + item.pic_info.icon+icon_size_para;//应用图片地址
				tags += '<li><a target="_blank" href="' + app_detail + '" class="unLine">'
					 + '<img src="' + app_img + '" class="app-item-icon" title="' + item.app_alias + '"></a>'
					 + '<a target="_blank" href="' + app_detail + '" class="app-name m-text" title="' + item.app_alias +'">'
					 + item.app_alias + '</a>'
					 + '<p>'
					 	+ '<span class="app-score"><span class="app-score app-score-color" style="width:' + item.grade * 10  + '%"></span></span>'
				     	+ '<span class="app-grade">' + splitStr(item.grade) + '</span>'
				     + '</p>' 
				     + '<a class="btn_wg" onclick="appUninstall(this,' + item.app_id +','+item.version_id+ ')">卸载应用</a>'
			         + '</li>';
			}
			$("#myUsedAppId").empty().append(tags);
			
			$("#myUsedApp_paper").ui_paper({
				count: page_data.count,					
				current: page_data.index,
				pagesize: page_data.pagesize,
				fun:"getMyUsedAppPage"
			});
		}else{
		}
	}