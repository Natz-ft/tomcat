$(document).ready(function() {
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
	};

	// 创建分页元素
	var reloadPage = function(maxentries, current_page) {
		$("#Pagination").pagination(maxentries, {
			items_per_page : pageSize,
			num_edge_entries : 2,
			num_display_entries : 8,
			callback : pageselectCallback,
			current_page : current_page
		});
	};
	var queryResByPage = function(page) {
		$.ajax({
					url : thisUrl,
					data : {
						method : "getAdviceByPage",
						page : page,
						pageSize : pageSize,
						t : Math.random()
					},
					success : function(datas) {
						if (datas != "" && datas != null) {
							var text = "";
							for (var i = 0; i < datas.data.length; i++) {
								var obj = datas.data[i];
								text += '<div class="n1"><p><span style="font-style: italic; color: #6BB1F7;">' + obj.object_title + '   </span>';
								text += obj.user_name + '</p><div>';
								text += obj.content;
//								text += '<a style="float:right" href="javascript:adviceDelete()">';
//								text += '<img src="/v0.1/img/interact/hd_x.png"></a>';
								text += '</div></div>';

							}
							$("#ulist").html(text);
							reloadPage(datas.recordsFiltered, page-1);
						}
					},
					error : function(data) {
						alert("网络错误");
					},
					dataType : "json"
				});

	};
	
	queryResByPage(1);

});

// 删除一条互动交流
function msgDelete(id) {
//	$.ajax({
//		url : thisUrl,
//		data : {
//			method : "deleteMyAdvice",
//			id : id,
//			t : Math.random()
//		},
//		success : function(data) {
//			var msg = data == 1 ? "删除成功" : "删除失败";
//			easyDialog.open({
//				container : {
//					content : msg
//				},
//				autoClose : 2000
//			});
//			var c_type = $("input[name='c_type']").val();
//			if (c_type == 0)
//				$('#interact_all').trigger("click");
//			if (c_type == 1)
//				$("#interact_msg").trigger("click");
//			if (c_type == 2)
//				$("#interact_request").trigger("click");
//			if (c_type == 3)
//				$("#interact_suggest").trigger("click");
//		},
//		error : function(data) {
//			easyDialog.open({
//				container : {
//					content : '网络异常'
//				},
//				autoClose : 2000
//			});
//		},
//		dataType : "json"
//	});
}