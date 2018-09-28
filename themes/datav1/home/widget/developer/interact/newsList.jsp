<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>

<div class="top_container border_radius">
	<div class="interact_one" style="height: 30px;"></div>
</div>

<div class="list_body">
	<div class="body_title_even">
		<ul id="listul">
		</ul>
	</div>

	<div class="pageye">
		<div id="Pagination" class="pagination"></div>
	</div>
</div>

<script>
	var listul = $("#listul");
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
		//执行查询，展现分页内容
	};
	// 创建分页元素
	var reloadPage = function(totalRecord, pageSize) {
		$("#Pagination").pagination(totalRecord, {
			num_edge_entries: 2,
			num_display_entries: 8,
			callback: pageselectCallback,
			items_per_page: pageSize
			//回调函数
		});
	};
	var queryResByPage = function(page) {
		var pageSize = 15; //每页显示条数初始化，修改显示条数，修改这里即可
		
		$.ajax({
			url: "index.do?method=GetApplynews",
			type: "POST",
			data: {
				"page": page,
				"pageSize": pageSize
			},
			success: function(data) {
				if(data!=""&&data!=null){
					var dataarr = new Array();
	                for (var i = 0; i < data.records.length; i++) {
						var obj = data.records[i];
						dataarr.push("<li><div class='list_col2' style='width: 60%;'><a onclick='goToNewsDetail(\""+obj.res_id+"\")'>" + obj.title + "</a></div>");
				    }
					listul.html(dataarr.join(''));
					//获取总页码
					if (page == 1&&data.totalRecord>pageSize) {
						reloadPage(data.totalRecord, pageSize);
					}else if(page == 1){
						$("#Pagination").empty();
					}
				}else{
					if (page == 1) {
						$("#Pagination").html("暂无数据");
					}
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
	};
	
	jQuery(document).ready(function() {
		queryResByPage(1);
	});
</script>