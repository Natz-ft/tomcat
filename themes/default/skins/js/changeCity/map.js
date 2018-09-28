$(function(){
	$(".qleft_num").hide();
	require.config({
	    paths: {
	    	'echarts' : getRootPath() + '/libs/assets/echarts'
	    }
	});
	require(['echarts','echarts/chart/map'],function (ec) {
		var default_region_code = $("#default_region_code").val();
		var default_region_abbr = $("#default_region_abbr").val();
		var myChart = ec.init(document.getElementById('qhcs_draw'));    
		var ecConfig = require('echarts/config');
		var curIndx = 0;
		var mapType = [
		               'china',
		               // 23个省
		               '广东', '青海', '四川', '海南', '陕西', 
		               '甘肃', '云南', '湖南', '湖北', '黑龙江',
		               '贵州', '山东', '江西', '河南', '河北',
		               '山西', '安徽', '福建', '浙江', '江苏', 
		               '吉林', '辽宁', '台湾',
		               // 5个自治区
		               '新疆', '广西', '宁夏', '内蒙古', '西藏', 
		               // 4个直辖市
		               '北京', '天津', '上海', '重庆',
		               // 2个特别行政区
		               '香港', '澳门'
		           ];

		option = {
			    tooltip : {trigger: 'item',formatter: '点击进入 <b>{b}</b><br/>数据总量：{c}' },
			    dataRange: { orient: 'horizontal', x : '30', y: 'bottom', splitNumber : 5, min: 0, color: ['#005c86','#0084be','#00a2e9','#3fbeef','#97d6f5'], text:['热度高','热度低'], calculable : false },
			    series : []
		};   

		//如果默认是全国，展现全国地图
		if(default_region_abbr==""){
			$.ajax({
				url: getRootPath()+"/changeCity/index.do?method=queryAllCity",
				type : "POST",
				data : {},
				dataType : 'json',
				success : function(objArr) {
					//初始化地图
					option.series.push( {
			            name: '全国站',
			            type: 'map',
			            mapType: 'china',
			            selectedMode : 'single',
			            itemStyle:{
			                normal:{
			                    borderWidth:0,
			                    borderColor:'#F0FFFF',
			                    color: '#97d6f5',
			                    label:{show:true, textStyle: {color: '#fff',fontSize: 13,fontFamily: '微软雅黑'}}
			                },
			                emphasis:{
			                    borderWidth:3,
			                    borderColor:'#F0FFFF',
			                    color: '#099999',
			                    label:{show:true, textStyle: { color: '#fff',fontSize: 15,fontFamily: '微软雅黑'}}
			                }
			            },
			            data:objArr
			        });
					option.dataRange.max = max_data_amount;
					myChart.setOption(option);
				}
			});
			
		}else{
			//如果默认是某省市，展现该省市地图
			$.ajax({
				url: getRootPath()+"/changeCity/index.do?method=queryCityByParam",
				type : "POST",
				data : {"region_code" : default_region_code,
						"region_abbr" : default_region_abbr
					},	
				dataType : 'json',
				success : function(data) {
					if(null != data && "" != data){
						//初始化地图
						option.series.push( {
								name: '地方站',
								type: 'map',
								mapType: data.regionName,
								selectedMode : 'single',
								itemStyle:{
									normal:{
										borderWidth:0,
										borderColor:'#F0FFFF',
										color: '#97d6f5',
										label:{show:true, textStyle: {color: '#fff',fontSize: 13,fontFamily: '微软雅黑'}}
									},
									emphasis:{
										borderWidth:3,
										borderColor:'#F0FFFF',
										color: '#099999',
										label:{show:true, textStyle: { color: '#fff',fontSize: 15,fontFamily: '微软雅黑'}}
									}
								},
								data:data.regionList
							});
							option.dataRange.max = max_data_amount;
							myChart.setOption(option);
							$('#qleft_return').show();
						}
					}
				});
		}
		
		myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
			if($.inArray(param.target,mapType)== -1){
				var cityName = param.target;
				enterCity(cityName);
			}
			else{
				var region_code = "";
				var region_name = "";
				$.each(option.series[0].data,function(key,value){
					if(value.name == param.target){
						region_code = value.id;
						return false;
					}
				});
				//进入某省市，展现该省市地图
				$.ajax({
					url: getRootPath()+"/changeCity/index.do?method=queryCityByParam",
					type : "POST",
					data : {"region_code" : region_code},	
					dataType : 'json',
					success : function(data) {
						if(null != data && "" != data){
							//初始化地图
							option.series= [];
							option.series.push({
									name: '地方站',
									type: 'map',
									mapType: data.regionName,
									selectedMode : 'single',
									itemStyle:{
										normal:{
											borderWidth:0,
											borderColor:'#F0FFFF',
											color: '#97d6f5',
											label:{show:true, textStyle: {color: '#fff',fontSize: 13,fontFamily: '微软雅黑'}}
										},
										emphasis:{
											borderWidth:3,
											borderColor:'#F0FFFF',
											color: '#099999',
											label:{show:true, textStyle: { color: '#fff',fontSize: 15,fontFamily: '微软雅黑'}}
										}
									},
									data:data.regionList
								});
							option.dataRange.max = max_data_amount;
							myChart.setOption(option);
							$('#qleft_return').show();
						}
					}
				});
				//右侧数据展现
				$.ajax({
	    			url: getRootPath()+"/changeCity/index.do?method=getCityList",
	    			type : "POST",
	    			data : {"region_code" : region_code},
	    			dataType : 'json',
	    			success : function(objArr) {
	    				var html = "<ul>";
	    				if(null != objArr && objArr != ""){
	    					for(var j = 0;j < objArr.length; j++){
	    						html = html +"<li><div class='qright_num'>"+(j+1)+"</div>";
	    						html = html +"<div class='qright_cityname' id='qright_sel_go'>"+objArr[j]["region_name"]+"</div>";
	    						html = html +"<div class='qright_citynum'></div></li>";
	    					}
	    					
	    				}else{
	    					html = html +"<li><div class='qright_cityname' id='qright_sel'>暂无开放城市</div></li>";
	    				}
	    				html = html +"</ul>";
	    				$("#scroll-1").html(html);
	    			}
	            });
			}
			
		});
		
		
		//返回全国地图
		$("#qleft_return").click(function(event) {
            $.ajax({
    			url: getRootPath()+"/changeCity/index.do?method=queryAllCity",
    			type : "POST",
    			data : {},
    			dataType : 'json',
    			success : function(objArr) {
					option.series= [];
					option.series.push( {
			            name: '全国站',
			            type: 'map',
			            mapType: 'china',
			            selectedMode : 'single',
			            itemStyle:{
			                normal:{
			                    borderWidth:0,
			                    borderColor:'#F0FFFF',
			                    color: '#97d6f5',
			                    label:{show:true, textStyle: {color: '#fff',fontSize: 13,fontFamily: '微软雅黑'}}
			                },
			                emphasis:{
			                    borderWidth:3,
			                    borderColor:'#F0FFFF',
			                    color: '#099999',
			                    label:{show:true, textStyle: { color: '#fff',fontSize: 15,fontFamily: '微软雅黑'}}
			                }
			            },
			            data:objArr
			        });
					option.dataRange.max = max_data_amount;
					myChart.setOption(option);
    			}
            });
            //右侧数据展现
            $.ajax({
    			url: getRootPath()+"/changeCity/index.do?method=getCityList",
    			type : "POST",
    			data : { },
    			dataType : 'json',
    			success : function(objArr) {
    				var html = "<ul>";
    				if(null != objArr && objArr != ""){
    					for(var j = 0;j < objArr.length; j++){
    						html = html +"<li><div class='qright_num'>"+(j+1)+"</div>";
    						html = html +"<div class='qright_cityname' id='qright_sel_go'>"+objArr[j]["region_name"]+"</div>";
    						html = html +"<div class='qright_citynum'></div></li>";
    					}
    					
    				}else{
    					html = html +"<li><div class='qright_cityname' id='qright_sel'>暂无开放城市</div></li>";
    				}
    				html = html +"</ul>";
    				$("#scroll-1").html(html);
    			}
            });
		});

	});  
	
	//搜索
	$("#searchByKey").click(function(){
		var cityName = $("#cityName").val();
		if(null == cityName || typeof(cityName) == undefined || "" == cityName || "输入您要搜索的城市名称" == cityName){
			dialog.info('搜索值不能为空',function(){},3000);
			return false;
		}
        $.ajax({
			url: getRootPath()+"/changeCity/index.do?method=getCityList",
			type : "POST",
			data : { "region_name" : cityName },
			dataType : 'json',
			success : function(objArr) {
				var html = "<ul>";
				if(null != objArr && objArr != ""){
					for(var j = 0;j < objArr.length; j++){
						html = html +"<li><div class='qright_num'>"+(j+1)+"</div>";
						html = html +"<div class='qright_cityname' id='qright_sel_go'>"+objArr[j]["region_name"]+"</div>";
						html = html +"<div class='qright_citynum'></div></li>";
					}
					
				}else{
					html = html +"<li><div class='qright_cityname' id='qright_sel'>暂无开放城市</div></li>";
				}
				html = html +"</ul>";
				$("#scroll-1").html(html);
			}
        });
	});
	
	$('body').on('click','#qright_sel_go',function(){
		$.ajax({
			url: getRootPath()+"/changeCity/index.do?method=enterCity",
			type : "POST",
			data : {"cityName" : $(this).html() },
			dataType : 'json',
			success : function(objArr) {
				if("success" == objArr){
					window.location.href = getRootPath();
				}else{
					dialog.info('暂未开通',function(){},2000);
				}
			}
        });
	});
	
});

function enterCity(cityName){
    $.ajax({
		url: getRootPath()+"/changeCity/index.do?method=enterCity",
		type : "POST",
		data : {"cityName" : cityName },
		dataType : 'json',
		success : function(objArr) {
			if("success" == objArr){
				window.location.href = getRootPath();
			}else{
				dialog.info('暂未开通',function(){},2000);
			}
		}
    });
}

//js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}