$(function() {
    
	$("#correctionBtn").click(function(){
		var desc = $("#desc").val();
		
		var visit_url = $("#visit_url").find("option:selected").val();
		var cataid = $("#cataid").val();
		var title=$("#titlename").val();
		var catacode = $("#catacode").val();
	   if(desc==""){
			easyDialog.open({
				container : {
					content : "请输入描述内容"
				},
				autoClose : 2000
			});
			
		}else{
			// easyDialog.open({
			// 	container : {
			// 		content : "请稍候"
			// 	}
			// });
			
			// var ajax_option={

					

					// success:function(data){
						
						$.ajax({
							url: correctionSubmit_url,
							type: "POST",
							data: {
								"desc":desc,
								"cataid":cataid,
								"visit_url":visit_url,
								
								"title":title
							},
							success: function(data) {
								easyDialog.open({
									container : {
										content :data
									},
									autoClose : 2000
								});
								
								$('.closeBtn').click();
							},
							error: function(data) {
								easyDialog.open({
									container : {
										content : "网络错误！"
									},
									autoClose : 2000
								});
							}
						});

					// }
			// }

			// $("#correctSubmit").ajaxSubmit(ajax_option);

		}
		
	});
	
	$("#resetAll").click(function(){
		$("#desc").val('');
		$("#qf").val('');
		$("#visit_url").val('');
		$("#name").val('');
		$("#phone").val('');
		$("#mail").val('');
		$("#qq").val('');
		$("#titlename").val('');
		var file = $("#file");
		file.after(file.clone().val(""));
		file.remove();
	});
	
	$("#corBtn").click(function(){
		$.ajax({
			url: isLogin_url,
			type: "POST",
			data: {},
			success: function(data) {
				if(data.code=='000000'){
					$("#modalLink").trigger("click");
				}
				if(data.code=='000001'){
					register();
					return;
				}
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : "网络错误！"
					},
					autoClose : 2000
				});
			},dataType:"json"
		});
	});
	
});