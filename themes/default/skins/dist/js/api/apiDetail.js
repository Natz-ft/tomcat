require.config({
	paths : {
		'echarts' : getRootPath() + '/libs/assets/echarts'
	}
});

	function showLine(id){
		$.ajax({
			type : "POST",
			url : getRootPath()+"/dev/developer/serviceDetail.do?method=GetRespData",
			data : {
				"service_id":id
			},
			dataType : "json",
			success : function(data) {
				if(null != data && data.length > 0){
					var xArray = new Array();
					var yArray = new Array();
					for(var i=0; i< data.length; i++){
						var obj = data[i];
						xArray.push(obj["name"]);
						yArray.push(obj["count"]);
					}
			    var line_option = {
			            tooltip : {
			                trigger: 'axis'
			            },
			            legend: {
			                data:['响应时间(单位：毫秒)']
			            },
			            calculable : true,
			            xAxis : [
			                {
			                    type : 'category',
			                    boundaryGap : false,
			                    data : xArray
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    axisLabel : {
			                        formatter: '{value} ms'
			                    }
			                }
			            ],
			            series : [
			                {
			                    name:'响应时间(单位：毫秒)',
			                    type:'line',
			                    data:yArray,
			                    markPoint : {
			                        data : [
			                            {type : 'max', name: '最大值'},
			                            {type : 'min', name: '最小值'}
			                        ]
			                    },
			                    markLine : {
			                        data : [
			                            {type : 'average', name: '平均响应时间'}
			                        ]
			                    }
			                }
			            ]
			        };
				    require(['echarts','echarts/chart/line'],function(ec,theme){
				        var lineChart = ec.init(document.getElementById("api-line"),theme);
				        lineChart.setOption(line_option);
				        $('.data-download').click(function(){
				            lineChart.clear();
				            lineChart.setOption(line_option);
				        });
				    });
				}
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
	}


$(function(){
    $('.detail-collection').click(function(event) {
    	if($(this).hasClass('active')){
    		$.ajax({
    			type : "POST",
    			url : getRootPath()+"/dev/developer/ServiceDetail.do?method=CancelCollection",
    			data : {
    				"id":$("#serviceId").val(),
    				"obj_type":2,
    				"obj_name":$("#serviceTitle").val()
    			},
    			dataType : "json",
    			success : function(data) {
    				if(data.code=="000001"){
						$('#bounceIn').click();
					} else {
	    				dialog.info(data.msg,function(){
	    					if("000000" == data.code){
	    						$('.detail-collection').removeClass('active');
	    						$('.detail-collection').children('em').text('收藏');
	    					}
	    				},3000);
					}
    			},
    			error : function(data) {
    				dialog.info("网络忙，请稍后再试",function(){},3000);
    			}
    		});
    	}else{
    		$.ajax({
    			type : "POST",
    			url : getRootPath()+"/dev/developer/ServiceDetail.do?method=Collection",
    			data : {
    				"id":$("#serviceId").val(),
    				"obj_type":2,
    				"obj_name":$("#serviceTitle").val()
    			},
    			dataType : "json",
    			success : function(data) {
					if(data.code=="000001"){
						$('#bounceIn').click();
					} else {
	    				dialog.info(data.msg,function(){
	    					if("000000" == data.code){
	    						$('.detail-collection').addClass('active');
	    						$('.detail-collection').children('em').text('已收藏');
	    					}
	    				},3000);
					}
    			},
    			error : function(data) {
    				dialog.info("网络忙，请稍后再试",function(){},3000);
    			}
    		});
    	}
    });
})

function testService(id){
	window.location.href=getRootPath()+"/dev/developer/serviceTest.htm?service_id="+id;
}

function serviceApply(id){
	$.ajax({
		type : "POST",
		url : getRootPath()+"/dev/developer/serviceList.do?method=CheckLogin",
		data : {},
		dataType : "json",
		success : function(data) {
			if("1" == data || 1 == data){
				$('#bounceIn').click();
				//dialog.info("您尚未登录，请先登录",function(){},3000);
			}else if("2" == data || 2 == data){
				dialog.info("请先认证成为平台开发者",function(){
					location.href=getRootPath()+"/dev/console/developer.htm";
				},3000);
			}else{
				//跳转服务申请页面
				location.href = getRootPath()+"/dev/console/serviceApply.htm?service_id="+id;
			}
		},
		error : function(data) {
			dialog.info("网络忙，请稍后再试",function(){},3000);
		}
	});
}
