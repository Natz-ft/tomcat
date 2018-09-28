$(function() {

	var subject_val = $("#subjectId").val();
	var org_val = $("#orgId").val();
	if(org_val!=""){
		$("#s2P").show();
		$("#s2").html($("#"+org_val).html());
	}
	if(subject_val!=""){
		$("#s1P").show();
		$("#s1").html($("#"+subject_val).html());
	}

	var listdiv = $("#api_list");
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
		// 执行查询，展现分页内容
	};
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#Pagination").pagination(totlePage, {
			items_per_page : 20,
			num_edge_entries : 2,
			num_display_entries : 8,
			callback : pageselectCallback
		// 回调函数
		});
	};
	var queryResByPage = function(page) {
		listdiv.empty();

		var pageSize = 10; // 每页显示条数初始化，修改显示条数，修改这里即可
		// ajax请求，并初始化资源列表
		// ajax请求，并初始化资源列表
		$
				.ajax({
					url : resoucrceurl,
					type : "POST",
					data : {
						"subjectId" : $("#subjectId").val(),
						"orgId" : $("#orgId").val(),
						"page" : page,
						"pageSize" : pageSize
					},
					success : function(data) {
						debugger;
						if (data != "" && data != null && data.data!=null) {
							var dataarr = new Array();
							var obj=data.data;
							$("#totle_api_num").html("共有API服务接口&nbsp;<b><span class=\"orange\">"+data.count+"</span></b>&nbsp;个");
							for (var i = 0; i < obj.length; i++) {
								var api = obj[i];
								var item = "<li>"
										+ "<div class='ssym_lefttop_2'></div>"
										+ "<div class='ssym_listcontent'>"
										+ "<div class='ssym_contop'>"
										+ "<div class='ssym_contopleft'>"
										+ "<a targe='_blank' href='serviceDetail.htm?service_id="+api.service_id+"'>"
										+ api.service_name
										+ "</a>"
										+ "</div>"
//										+ "<div class='ssym_fl'>【"
//										+ api.group_name
//										+ "】</div>"
										+ "</div>"        
										+ "<div class='ssym_img'>"
										+ "<a href='javascript:checkDev()'><img "
										+ "src='../../img/dev/list/ico_tjzy_sq.png' "
										+ "width='40' height='20'></a><input type='hidden' id='serviceId' value='"+api.service_id+"'><a href='serviceDetail.htm?service_id="+api.service_id+"'><img "
										+ "src='../../img/dev/list/apimx.png' width='40' "
										+ "height='20'></a>"
										+ "</div>"
										+ "<div class='ssym_conmiddle'>"
//										+ "<div class='ssym_conmiddleleft'>"
//										+ api.service_desc
//										+ "</div>"
										+ "</div>" + "</div>" + "</li>";
								dataarr.push(item);
							}
							listdiv.append(dataarr.join(''));
							// 获取总页码
							if (page == 1&&data.count>pageSize) {
								reloadPage(data.count);
							}else if(page == 1){
								$("#Pagination").empty();
							}
						} else {
							$("#Pagination").empty();
							$("#totle_api_num").html("共有API服务接口&nbsp;<b><span class=\"orange\">0</span></b>&nbsp;个");
							listdiv
									.html("<div style='width:100%;text-align:center;height:30px;'>暂无数据</div>");
						}
					},
					error : function(data) {
						easyDialog.open({
							container : {
								content : '网络异常'
							},
							autoClose : 2000
						});
					},
					dataType : "json"
				});
	};

	var h;
	var i = 0;
	var txt1;
	$("#app_ztzk").click(function(event) {
		if (i == 0) {
			h = 100 + '%';
			i = 1;
			txt1 = "收起<img src='../../img/dev/list/arrowup.png'>";
		} else {
			h = 20 + 'px';
			i = 0;
			txt1 = "展开<img src='../../img/dev/list/arrowdown.png'>";
		}
		$("#app_ztzk").empty();
		$("#app_ztzk").append(txt1);
		$("#app_ztul").animate({
			height : h
		});
	});
	var h2;
	var m = 0;
	var txt2;
	$("#app_bmzk").click(function(event) {
		if (m == 0) {
			h = 100 + '%';
			m = 1;
			txt2 = "收起<img src='../../img/dev/list/arrowup.png'>";
		} else {
			h = 20 + 'px';
			m = 0;
			txt2 = "展开<img src='../../img/dev/list/arrowdown.png'>";
		}
		$("#app_bmzk").empty();
		$("#app_bmzk").append(txt2);
		$("#app_bmul").animate({
			height : h
		});
	});

	$("#app_ztul a li").click(function() {
		$("#s1").html($(this).html());
		$("#s1P").css("display", "inline-block");
		$("#subjectId").attr("value", $(this).attr("id"));
		queryResByPage(1);
	});

	$("#app_bmul a li").click(function() {
		$("#s2").html($(this).html());
		$("#s2P").css("display", "inline-block");
		$("#orgId").attr("value", $(this).attr("id"));
		queryResByPage(1);
	});

	$("#s1Close").click(function() {
		$("#s1P").css("display", "none");
		$("#subjectId").attr("value", "");
		queryResByPage(1);
	});
	$("#s2Close").click(function() {
		$("#s2P").css("display", "none");
		$("#orgId").attr("value", "");
		queryResByPage(1);
	});
	queryResByPage(1);
});

function checkDev(){
	var uid = $("#uid").val();
	var isLogin = $("#uid").html();
	if(isLogin == null){
		easyDialog.open({
			container : {
				content : "请先登陆！"
			},
			autoClose : 2000
		});
	}
	else{
		location.href = serviceApplyUrl;
	}
}
