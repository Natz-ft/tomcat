Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

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
						method : "getSurveyByPage",
						page : page,
						pageSize : pageSize,
						t : Math.random()
					},
					success : function(datas) {
						if (datas != "" && datas != null) {
							console.log(datas);
							
							var text = "";
							for (var i = 0; i < datas.data.length; i++) {
								var obj = datas.data[i];
								var ctime = new Date(obj.create_time).Format("yyyy-MM-dd HH:mm:ss");
								
								text += '<div class="n1"><p><span style="font-style: italic; color: #6BB1F7;">' + ctime + '   </span>';
								text += '<a id="surveyDetail" uid="' + obj.uid + '" survey_id="' + obj.survey_id + '" create_time="' + ctime + '">';
								text += obj.survey_name + '</a></p>';
//								text += '<div><a style="float:right" href="javascript:adviceDelete()">';
//								text += '<img src="/v0.1/img/interact/hd_x.png"></a></div>';
								text += '</div>';

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

	//点击问卷调查
	$("#ulist").on("click", '#surveyDetail', function(){
		var uid = $(this).attr('uid');
		var survey_id = $(this).attr('survey_id');
		var create_time = $(this).attr('create_time');
		
		var that = $(this).parents("div.n1");
		$.ajax({
			url: thisUrl + "?method=getSurveyDetail",
			type: 'post',
			data: {
				uid : uid,
				survey_id : survey_id,
				create_time : create_time
			},
			dataType: 'json',
			success: function(data){
				var text = "<ul>";
				for(var i = 0; i < data.length; i++){
					obj = data[i];
					text += "<li>" + obj.title + " : " + obj.note + "</li>";
				}
				text += "</ul>";
				
				if(that.find("ul").size() >= 1){
					that.find("ul").remove();
					return;
				}
				$("#ulist").find("div.n1").find("ul").each(function(){
					$(this).remove();
				})
				that.append(text);
			}, 
			error: function(){
				alert("网络异常");
			}
		});
	});
});

// 删除一条互动交流
function msgDelete(id) {
	
}