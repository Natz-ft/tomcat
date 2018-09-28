// 使用
$(document).ready(function() {
	for (var j = 0; j < items_bingtu.length; j++) {
		var item = items_bingtu[j];
		createBingTu(item);
	}
	function createBingTu(item) {
		require([ 'echarts', 'echarts/chart/pie'
		], function(ec) {
			$.ajax({
				type : "POST",
				url : faqUrl,
				data : {
					"item":item,
					"faq_id":faq_id
				},
				dataType : "json",
				success : function(data) {
					var myChart = ec.init(document.getElementById("bingtu" + item));
					// 基于准备好的dom，初始化echarts图表
					option = {
						legend : {
							orient : 'vertical',
							x : 'left',
							data : []
						},

						calculable : true,
						series : []
					};
					//循环
					var datas=[];
					for(var j = 0; j < data.length; j++){
						option.legend.data.push(data[j].ITEM_CONTENT);
						datas.push({
							value : data[j].COUNT,
							name : data[j].ITEM_CONTENT
						});
					}
					option.series.push({
						name : '信息统计',
						type : 'pie',
						radius : '55%',
						center : [ '50%', '60%' ],
						data :datas
					});
					// 为echarts对象加载数据
					myChart.setOption(option);
				},
				error : function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				}
			});
		});
	}
});