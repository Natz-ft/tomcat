$(function() {
	$("#commentSubmit").click(function(){
		var obj_type = $("#obj_type").val();
		var obj_id = $("#obj_id").val();
		var obj_title = $("#obj_title").val();
		var obj_url = $("#obj_url").val();
		var content = $("#content").val();
		if(content==""){
			easyDialog.open({
				container : {
					content : "请输入评论内容"
						
				},
				autoClose : 2000
			});
			
		}else{
			easyDialog.open({
				container : {
					content : "请稍候"
				}
			});
			$.ajax({
				url: commentSubmit_url,
				type: "POST",
				data: {
					"obj_type":obj_type,
					"obj_id":obj_id,
					"obj_title":obj_title,
					"object_code":object_code,
					"obj_url":obj_url,
					"content":content
				},
				success: function(data) {
					$("#content").val("");
					debugger;
					if(data.code=='000001'){
						easyDialog.close();
						register();
						return;
					}else{
						easyDialog.open({
							container : {
								content : data.msg
							},
							autoClose : 2000
						});
					}
				},
				error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			});
		}
		
	});
	$("#favoriteSubmit").click(function(){
		var obj_name = $("#obj_name").val();
		var obj_type = $("#obj_type").val();
		var obj_id = $("#obj_id").val();
		easyDialog.open({
			container : {
				content : "请稍候"
			}
		});
		$.ajax({
			url: favoriteSubmit_url,
			type: "POST",
			data: {
				"obj_type":obj_type,
				"obj_name":obj_name,
				"obj_id":obj_id
			},
			success: function(data) {				
				if(data.code=='000001'){
					easyDialog.close();
					register();
					return;
				}else{
					if(data.code=="000000"){
						fav_id = data.fav_id;
					}
					easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
				}
				
				if(data.code=="000000"){
					$("#favoriteSubmit").css("display","none");
					$("#cancelFavoriteSubmit").css("display","block");
				}
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
		});
	});
	
	$("#cancelFavoriteSubmit").click(function(){
		var obj_id = $("#obj_id").val();
		var obj_type = $("#obj_type").val();
		easyDialog.open({
			container : {
				content : "请稍候"
			}
		});
		$.ajax({
			url: cancelFavoriteSubmit_url,
			type: "POST",
			data: {
				"obj_type":obj_type,
				"obj_id":obj_id			
			},
			success: function(data) {
				easyDialog.open({
					container : {
						content : data.msg
					},
					autoClose : 2000
				});
				
				if(data.code=="000000"){
					$("#cancelFavoriteSubmit").css("display","none");
					$("#favoriteSubmit").css("display","block");
				}
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
		});
	});
	
	//收藏
	$("#collectSubmit").click(function(){
		var obj_name = $("#obj_name").val();
		var obj_type = $("#obj_type").val();
		var obj_id = $("#obj_id").val();
		easyDialog.open({
			container : {
				content : "请稍候"
			}
		});
		$.ajax({
			url: favoriteSubmit_url,
			type: "POST",
			data: {
				"obj_type":obj_type,
				"obj_name":obj_name,
				"obj_id":obj_id
			},
			success: function(data) {				
				if(data.code=='000001'){
					easyDialog.close();
					register();
					return;
				}else{
					if(data.code=="000000"){
						fav_id = data.fav_id;
					}
					easyDialog.open({
						container : {
							content : '收藏成功！'
						},
						autoClose : 2000
					});
				}
				
				if(data.code=="000000"){
					$("#collectSubmit").css("display","none");
					$("#cancelCollectSubmit").css("display","block");
				}
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
		});
	});
	
	//取消收藏
	$("#cancelCollectSubmit").click(function(){
		var obj_id = $("#obj_id").val();
		var obj_type = $("#obj_type").val();
		easyDialog.open({
			container : {
				content : "请稍候"
			}
		});
		$.ajax({
			url: cancelFavoriteSubmit_url,
			type: "POST",
			data: {
				"obj_type":obj_type,
				"obj_id":obj_id			
			},
			success: function(data) {
				easyDialog.open({
					container : {
						content : '取消收藏成功！'
					},
					autoClose : 2000
				});
				
				if(data.code=="000000"){
					$("#cancelCollectSubmit").css("display","none");
					$("#collectSubmit").css("display","block");
				}
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
		});
	});
});