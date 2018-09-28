$(function(){
	$(".qleft_num").hide();
	require(['echarts','echarts/chart/map'],function (ec) {
		var default_region_code = $("#default_region_code").val();
		var default_region_abbr = $("#default_region_abbr").val();
		var myChart = ec.init(document.getElementById('qhcs_draw'));    
		var ecConfig = require('echarts/config');
		//var zrEvent = require('zrender/tool/event');
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
				//data : data,
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
			//返回全国地图
			$("#qleft_return").click(function(event) {
	            $.ajax({
	    			url: getRootPath()+"/changeCity/index.do?method=queryCityListByParams",
	    			type : "POST",
	    			data : {},
	    			dataType : 'json',
	    			success : function(objArr) {
	    				var html = "<ul>";
	    				if(objArr==null){
	    					$("#gov_amount").html("0");
	    					html = html +"<li style='color:#fff'>暂无开放城市</li>";
	    					option.dataRange.max = 0;
	    				}else{
	    					$("#gov_amount").html(objArr.data_amount);
	        				if(objArr.list.length > 0){
	        					for(var j = 0;j < objArr.list.length; j++){
	        						html = html +"<li><div class='qright_num'>"+(j+1)+"</div>";
	        						html = html +"<div class='qright_cityname' id='qright_sel' onclick=\"enterCity('"+objArr.list[j]["region_abbr"]+"')\">"+objArr.list[j]["region_name"]+"</div>";
	        						html = html +"<div class='qright_citynum' style='width:"+(objArr.list[j]["cata_amount"]/objArr.max_data_amount)*50+"%'></div></li>";
	        					}
	        				}else{
	        					html = html +"<li style='color:#fff'>暂无开放城市</li>";
	        				}
	        				option.dataRange.max = objArr.max_data_amount;
	    				}
						myChart.setOption(option);
	    				html = html +"</ul>";
	    				$("#cityName").val("");
	    			    var len = mapType.length;
	    			    var mt = mapType[curIndx % len];
	    			    curIndx = 0;
	    			    mt = 'china';
	    			    $("#qleft_name").html("全国站");
	    			    $(".qleft_num").hide();
	    			    $(".qleft_click").html("<a href='javaScript:void(0)' onclick=\"enterCity('国家部委')\">(点击进入)</a>");
	    			    $("#qhcs_draw").removeClass('qhcs_drawpro');
						$("#qleft_return").hide();
	    			    option.series[0].mapType = mt;
	    			    myChart.setOption(option, true);
	    				$("#scroll-1").html(html);
	    			}
	            });
			});
			
			myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
				if($("#qhcs_draw").text().indexOf("-") > 0){
					easyDialog.open({
						container : {
							content : '暂未开通'
						},
						autoClose : 2000
					});
					return;
				}
			    var len = mapType.length;
			    var mt = mapType[curIndx % len];
			    if (mt == 'china') {
			        // 全国选择时指定到选中的省份
			        var selected = param.selected;
			        for (var i in selected) {
			            if (selected[i]) {
			                mt = i;
			                if(mt!='北京'&&mt!='天津'&&mt!='上海'&&mt!='重庆'&&mt!='香港'&&mt!='澳门'&&mt!='台湾'&&mt!='南海诸岛'){
			                	while (len--) {
				                    if (mapType[len] == mt) {
				                        curIndx = len;
				                    }
				                }
			                	//获取省份下的城市
				                $.ajax({
				        			url: getRootPath()+"/changeCity/index.do?method=queryCityListByParams",
				        			type : "POST",
				        			data : {"cityName" : i , "cityLevel" : 2},
				        			dataType : 'json',
				        			success : function(objArr) {
				        				$(".qleft_num").show();
				        				var html = "<ul>";
				        				if(objArr==null){
				        					$("#gov_amount").html("0");
				        					$(".qleft_num").hide();
				        					html = html +"<li style='color:#fff'>暂无开放城市</li>";
				        					option.dataRange.max = 0;
				        				}else{
				        					$("#gov_amount").html(objArr.data_amount);
				        					$("#gov_paihang").html(objArr.regionNum);
					        				if(null != objArr.list && objArr.list.length > 0){
					        					for(var j = 0;j < objArr.list.length; j++){
					        						html = html +"<li><div class='qright_num'>"+(j+1)+"</div>";
					        						if(objArr.list[j]["region_level"]=="2"){
					        							html = html +"<div class='qright_cityname' id='qright_sel_go'>"+objArr.list[j]["region_name"]+"</div>";
					        						}else{
					        							html = html +"<div class='qright_cityname'>"+objArr.list[j]["region_name"]+"</div>";
					        						}
													html = html +"<div class='qright_citynum' style='width:"+(objArr.list[j]["cata_amount"]/objArr.max_data_amount)*50+"%'></div></li>";
					        					}

					        				}else{
					        					html = html +"<li style='color:#fff'>暂无开放城市</li>";
					        				}
					        				option.dataRange.max = objArr.max_data_amount;
				        				}
				        				html = html +"</ul>";
				        				$("#cityName").val("");
				        				$("#scroll-1").html(html);
						                $(".qleft_click").empty();
						                $("#qleft_name").html(mt);
						                $(".qleft_click").html("<a href=\"javaScript:enterCity('"+mt+"')\">(点击进入)</a>");
										myChart.setOption(option);
				        			}
				                });
								$("#qhcs_draw").addClass('qhcs_drawpro');
				                $("#qleft_return").show();
				                break;
			                }else{
			                	mt='china';
			                	var selected = param.selected;
			    		        for (var i in selected) {
			    		            if (selected[i]) {
			    		            	enterCity(i)
			    		            }
			    		        }
			                }
			            }
			        }
			    }else {
			    	//点击进入相应城市
			        var selected = param.selected;
			        for (var i in selected) {
			            if (selected[i]) {
			            	enterCity(i);
			            }
			        }
			    }
			    option.series[0].mapType = mt;
			    myChart.setOption(option, true);
			});		
		
		
		}else{		
			//如果默认是某省市，展现该省市地图
				$.ajax({
					url: getRootPath()+"/changeCity/index.do?method=queryAllCity",
					type : "POST",
					data : {"default_region_code" : default_region_code },
					dataType : 'json',
					success : function(objArr) {
						var default_region_abbr = $("#default_region_abbr").val();
						//初始化地图
						option.series.push( {
								name: '个性化地方站',
								type: 'map',
								mapType: default_region_abbr,
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
			
					//默认省份，点击某市的效果
					myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
					if($("#qhcs_draw").text().indexOf("-") > 0){
						easyDialog.open({
							container : {
								content : '暂未开通'
							},
							autoClose : 2000
						});
						return;
					}
				    var len = mapType.length;

				    	//点击进入相应城市
				        var selected = param.selected;
				        for (var i in selected) {
				            if (selected[i]) {
				            	enterCity(i);
				            }
				        }
				    
				    option.series[0].mapType = mt;
				    myChart.setOption(option, true);
				});
			
			}

	});  
	
	//搜索
	$("#searchByKey").click(function(){
		var value = $("#cityName").val();
		if(null == value || typeof(value) == undefined || "" == value){
			easyDialog.open({
				container : {
					content : '搜索值不能为空'
				},
				autoClose : 2000
			});
			return false;
		}
        $.ajax({
			url: getRootPath()+"/changeCity/index.do?method=queryCityListByParams",
			type : "POST",
			data : {"keyWord":value},
			dataType : 'json',
			success : function(objArr) {
				var html = "<ul>";
				if(null != objArr && objArr != ""){
					for(var j = 0;j < objArr.list.length; j++){
						html = html +"<li><div class='qright_num'>"+(j+1)+"</div>";
						html = html +"<div class='qright_cityname' id='qright_sel_go'>"+objArr.list[j]["region_name"]+"</div>";
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
	
	$("#qright_sel_go").live("click",function(){
		$.ajax({
			url: getRootPath()+"/changeCity/index.do?method=enterCity",
			type : "POST",
			data : {"cityName" : $(this).html() },
			dataType : 'json',
			success : function(objArr) {
				if("success" == objArr){
					window.location.href = getRootPath();
				}else{
					alert("11");
					easyDialog.open({
						container : {
							content : '暂未开通'
						},
						autoClose : 2000
					});
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
				alert("22");
				easyDialog.open({
					container : {
						content : '暂未开通'
					},
					autoClose : 2000
				});
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