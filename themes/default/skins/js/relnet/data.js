var catalogtagreload = function(id){
	if(id!=""){
		getcatalogtaglist(id,"",1,"");
		$("#cata_id").val(id);
		$("#cata_title").val("");
	}
}

var getcatalogtaglist;

$(function () {
	
var a = 0;
	
	var mmmn=0;
	function functionShow(){if(mmmn==0){
		return false;
		
	}
	if(mmmn==1){
		
		return true;
	}}
	
	
	var cata_id_load = $("#cata_id").val();
	if(cata_id_load!=""){
		defaultId = cata_id_load;
	}
	var win_width = $(window).width();
	$(".sjtp_main").css("width",win_width-294);
	$("#sec1").on("change",function() {
		var id = $(this).children('option:selected').val();
		$("#orgId").val(id);
		getcatalistbyorg(id);
	});
	
	$("input[name='sjtp_check']").click(function(){ 
		var id = $("#cata_id").val();
		if(id!=""){
			getcatalogtaglist(id,"",1,"");
			$("#cata_id").val(id);
			$("#cata_title").val("");
		}
	});

	
	var id = $("#sec1").children('option:selected').val();
	if(id!=""){
		getcatalistbyorg(id);
	}

	$("#sec2").on("change",function() {
		var id = $(this).children('option:selected').val();
		if(id!=""){
			getcatalogtaglist(id,"",1,"");
			$("#cata_id").val(id);
			$("#cata_title").val("");
		}
	});
	
	
	//加载下拉框数据
	function getcatalistbyorg(id) {
		
		var list = $("#sec2");
		list.empty();
		list.append("<option value=''>选择数据集</option>");
		$.ajax({
			type: 'post',
			url: catalogbyorgurl,
			dataType: 'json',
			data: {
				"id": id
			},
			success: function(data) {
				if (data != "" && data != null) {
					var dataarr = new Array();
					for (var i = 0; i < data.records.length; i++) {
						var obj = data.records[i];
						if(defaultId!=obj.cata_id){
							dataarr.push("<option value='" + obj.cata_id +"'>" + obj.cata_title + "</option>");
						}else{
							dataarr.push("<option value='" + obj.cata_id +"' selected=\"selected\">" + obj.cata_title + "</option>");
						}
					}
					list.append(dataarr.join(''));
				}
			},
			error: function(data) {
				dialog.info('网络异常',function(){},2000);
			}
		});
	}
	
	//标签数据集关系图
	allOption = {
			tooltip: {trigger: 'item',formatter: '{a} : {b}'},
			legend: {
				x: 'right',
				y: 3,
				data: [
					{
						name:'标签',
						icon : 'image://../img/relnet/b.png'
					},
					'关联数据集'
				]
			},
			toolbox: {show : false,x:'30%',
			        feature : {
			            restore : {show: false},
			            saveAsImage : {show: false}
			        }
			    },
			series: []
			
	};
	option2 = {
			tooltip: {trigger: 'item',formatter: '{a} : {b}'},
			legend: {x: 'right',y: 3,data: [{name:'关联数据集',textStyle:{color:'#fff'}}]},
			series: []
	};
	//加载图谱及相关列表数据
	//id:数据集编码，title：数据集标题 type：请求类型（0：初始化，1：标签数据集图谱；2：数据集图谱，tag：标签）
	getcatalogtaglist = function(id,title,type,tag) {
		if(type!="0"){
			dialog.info('数据加载中',function(){},1000);
		}
		allOption.series.length=0;
		if(tag==""){
			option2.series.length=0;
		}
		var arry_node1 = [];
		var arry_node2 = [];
		require.config({
			paths: {
				'echarts' : getRootPath() + '/libs/assets/echarts'
			}
		});
		// 使用
		require(['echarts', 'echarts/chart/force'],function(ec) {
			var subType=$("#subType").val();
			var url;
			$("#cata_id").val(id);
			if(tag==""){
				url = catalogtagurl;
				$("#cata_tag").val("");
				$("#sjtp_checkbox").show();
			}else{
				url = catalogtagbytagurl;
				$("#sjtp_checkbox").hide();
			}
			$.ajax({
				type: 'post',
				url: url,
				dataType: 'json',
				data: {
					"id": id,
					"subType":subType,
					"title":title,
					"tag":tag,
					"pageSize":5
				},
				success: function(data) {
					if($.isEmptyObject(data)){
						return;
					}
					var root = data.root;
					if(tag==""){
						//赋值根节点
						arry_node1.push("{category:0," + "name:'" + root + "',symbolSize: 30}");
						arry_node2.push("{category:0," + "name:'" + root + "',symbolSize: 30}");
						//赋值标签信息
						for (var i = 0; i < data.taglist.length; i++) {
							var obj = data.taglist[i];
							arry_node1.push("{category:1," + "name:'" + obj +"',id:'tag'}");
						}
						//赋值子数据集数据
						for (var i = 0; i < data.subList.length; i++) {
							var obj = data.subList[i];
							if(obj.cata_id!=id){
								arry_node1.push("{category:2," + "name:'" + obj.org_name+"-"+obj.cata_title + "',id:'"+obj.cata_id+"'}");
								arry_node2.push("{category:1," + "name:'" + obj.org_name+"-"+obj.cata_title + "',id:'"+obj.cata_id+"'}");
							}
						}
					}else{
						arry_node1.push("{category:3," + "name:'" + root + "',id:'tag',symbolSize: 30}");
						//赋值子数据集数据
						for (var i = 0; i < data.subList.length; i++) {
							var obj = data.subList[i];
							arry_node1.push("{category:2," + "name:'" + obj.org_name+"-"+obj.cata_title + "',id:'"+obj.cata_id+"'}");
							for(var j = 0;j < obj.tags.length; j++){
								var objtag =  obj.tags[j];
								if(objtag != tag){
									arry_node1.push("{category:1," + "name:'" +objtag + "',id:'tag'}");
								}
							}
						}
					}
					arry_node1 = unique(arry_node1);
					allOption.series.push({
						type: 'force',
						name: "关联",
						categories:[{name:'根数据集',itemStyle:{normal:{color:'#F985FE',label:{show:true}},emphasis:{color:'#63B8FF'}}},{name:'标签',symbol:'triangle',itemStyle:{normal:{color: '#22ECFE'}}},{name:'关联数据集',itemStyle:{normal:{color:'#FDE984'},emphasis:{color:'#00EE76'}}},{name:'根标签',symbol:'triangle',itemStyle:{normal:{color:'#008dd5'},emphasis:{color:'#63B8FF'}}}],
						itemStyle:{
							normal:{
								label:{
									show:functionShow(),textStyle:{color:'#fff'}
								},
								nodeStyle:{
									brushType:'both',strokeColor:'rgba(255,215,0,0.4)',lineWidth:1
								},
								linkStyle:{
									color:'white'
								}
							},
							emphasis:{
								label:{show:false},nodeStyle:{}
							}
						},
						useWorker: false,
						minRadius: 13,
						maxRadius: 25,
						coolDown: 0.995,
						steps: 10,
						steps: 1,
						gravity: 0.5,
						scaling: 1.1,
						linkSymbol: 'arrow',
						nodes: eval("(["+arry_node1.toString()+"])"),
						links: data.Lklist
					});
					
					arry_node2 = unique(arry_node2);

					if(tag==""){
						option2.series.push({
							type: 'force',
							name: "关联关系",
							categories: [{name: '根数据集',itemStyle:{normal:{label:{show:true}}}},{name: '关联数据集'}],
							itemStyle:{
								normal:{
									label:{
										show:functionShow(),textStyle:{color:'#fff'}
									},
									nodeStyle:{
										brushType:'both',strokeColor:'rgba(255,255,255,255)',lineWidth:1
									},
									linkStyle:{
										color:'white'
									}
								},
								emphasis:{
									label:{show:false},nodeStyle:{}
								}
							},
							useWorker: false,
							minRadius: 10,
							maxRadius: 25,
							gravity: 0.5,
							scaling: 1.1,
							linkSymbol: 'arrow',
							nodes: eval("(["+arry_node2.toString()+"])"),
							links: data.notagLklist
						});
					}
					$("#wangluotp").click(function(event) {
						if (event.clientX) {
							$("#sjtp_draw1").show();
							$("#sjtp_draw2").hide();
//							$("#kaiguan").addClass('title_off');
//							$("#kaiguan").removeClass('title_on');
							$(".ico_tag").addClass('tag_on');
//							$(".ico_data").removeClass('data_on');
							$("#tags").addClass('data_on');
							$("#dataset").removeClass('data_on');
						}else{
							
						}
							
							
							
							
						
						
						
						
						var myChart = ec.init(document.getElementById('sjtp_draw1'));
//						
						allOption.series.length=0;
						
						allOption.series.push({
							type: 'force',
							name: "关联",
							categories:[{name:'根数据集',itemStyle:{normal:{color:'#F985FE',label:{show:true}},emphasis:{color:'#63B8FF'}}},{name:'标签',symbol:'triangle',itemStyle:{normal:{color: '#22ECFE'}}},{name:'关联数据集',itemStyle:{normal:{color:'#FDE984'},emphasis:{color:'#00EE76'}}},{name:'根标签',symbol:'triangle',itemStyle:{normal:{color:'#008dd5'},emphasis:{color:'#63B8FF'}}}],
							itemStyle:{
								normal:{
									label:{
										show:functionShow(),textStyle:{color:'#fff'}
									},
									nodeStyle:{
										brushType:'both',strokeColor:'rgba(255,215,0,0.4)',lineWidth:1
									},
									linkStyle:{
										color:'white'
									}
								},
								emphasis:{
									label:{show:false},nodeStyle:{}
								}
							},
							useWorker: false,
							minRadius: 13,
							maxRadius: 25,
							coolDown: 0.995,
							steps: 10,
							steps: 1,
							gravity: 0.5,
							scaling: 1.1,
							linkSymbol: 'arrow',
							nodes: eval("(["+arry_node1.toString()+"])"),
							links: data.Lklist
						});
//						
						myChart.setOption(allOption);
						var ecConfig = require('echarts/config');
						function focus(param) {
						   if(param.value.id!='tag'){
							   if(param.value.category!="0"){
								   getcatalogtaglist(param.value.id,"",1,"");
							   }else{
								   return false;
							   }
						   }else{
							   $("#cata_tag").val(param.value.name);
							   getcatalogtaglist("","",1,param.value.name);
						   }
						}
						myChart.on(ecConfig.EVENT.CLICK, focus);
						
						$("#kaiguan").unbind("click");
						$("#kaiguan").bind("click",function(event) {
							if(mmmn==0){
								$("#kaiguan").addClass('title_on');
								$("#kaiguan").removeClass('title_off');
								myChart.setOption({series : [{itemStyle:{normal:{label:{show:true},linkStyle:{color:'white'}}}}]});
								mmmn=1;
							}
							else if(mmmn==1){
								$("#kaiguan").addClass('title_off');
								$("#kaiguan").removeClass('title_on');
								myChart.setOption({series : [{itemStyle:{normal:{label:{show:false},linkStyle:{
									color:'white'
								}}}}]});
								mmmn=0;
							}
							
						});	
						
						
					});
					
					if(tag==""){
						$("#fenbutp").click(function(event) {
							$("#kaiguan").unbind("click");
							$("#sjtp_draw2").show();
							$("#sjtp_draw1").hide();
//							$("#kaiguan").addClass('title_off');
//							$("#kaiguan").removeClass('title_on');
//							$(".ico_tag").removeClass('tag_on');
							$("#dataset").addClass('data_on');
							$("#tags").removeClass('data_on');
							
//							$(".ico_data").removeClass('data_on');
							
							myChart2 = ec.init(document.getElementById('sjtp_draw2'));
							option2.series.length=0;
							
							option2.series.push({
								type: 'force',
								name: "关联关系",
								categories: [{name: '根数据集',itemStyle:{normal:{label:{show:true}}}},{name: '关联数据集'}],
								itemStyle:{
									normal:{
										label:{
											show:functionShow(),textStyle:{color:'#fff'}
										},
										nodeStyle:{
											brushType:'both',strokeColor:'rgba(255,255,255,255)',lineWidth:1
										},
										linkStyle:{
											color:'white'
										}
									},
									emphasis:{
										label:{show:false},nodeStyle:{}
									}
								},
								useWorker: false,
								minRadius: 10,
								maxRadius: 25,
								gravity: 0.5,
								scaling: 1.1,
								linkSymbol: 'arrow',
								nodes: eval("(["+arry_node2.toString()+"])"),
								links: data.notagLklist
							});
							
							
							myChart2.setOption(option2);
							var ecConfig = require('echarts/config');
							function focus(param) {
								if(param.value.category!="0"){
									getcatalogtaglist(param.value.id,"",2,"");
								}else{
									return false;
								}
							}
							myChart2.on(ecConfig.EVENT.CLICK, focus);
							var mmm=0;
							$("#kaiguan").unbind("click");
							$("#kaiguan").bind("click",function(event) {
								if(mmm==0){
									$("#kaiguan").addClass('title_on');
									$("#kaiguan").removeClass('title_off');
									myChart2.setOption({series : [{itemStyle:{normal:{label:{show:true},linkStyle:{
										color:'white'
									}}}}]});
									mmm=1;
								}
								else if(mmm==1){
									$("#kaiguan").addClass('title_off');
									$("#kaiguan").removeClass('title_on');
									myChart2.setOption({series : [{itemStyle:{normal:{label:{show:false},linkStyle:{
										color:'white'
									}}}}]});
									mmm=0;
								}
							});	
						});
					}
					if(type=="0"){
						$("#wangluotp").click();
					}else if(type=="1"){
						$("#wangluotp").click();
					}if(type=="2"){
						$("#fenbutp").click();
					}
					$("#cata_tag").val(tag);
					loadPageData(1);
					if(type!="0"){
					}
				},
				error: function(data) {
					dialog.info('网络异常',function(){},2000);
				}
			});
		});
		
	};
	
	
	var pageselectCallback = function(page_id, jq) {
		loadPageData(page_id + 1);
		//执行查询，展现分页内容
	};
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#relalist .pagination").pagination(totlePage, {
			num_display_entries: 5,
			items_per_page:10,
			callback: pageselectCallback
			//回调函数
		});
	};
	
	var loadPageData = function(page){
		
		
		$("#list_search_tag").removeClass("right_listlabel-2");
		$("#list_xg_tag").removeClass("right_listlabel-2");
		$("#list_search_tag").addClass("right_listlabel-2");
		$("#list_xg_tag").addClass("right_listlabel-1");
		
		var subType=$("#subType").val();
		var relalist = $("#relalist>ul");
		var cata_tag = $("#cata_tag").val();
		var cata_id = $("#cata_id").val();
		var cata_title = $("#cata_title").val();
		var pageSize = 10; //每页显示条数初始化，修改显示条数，修改这里即可
		relalist.empty();
		$.ajax({
			type: 'post',
			url: catalogtagbypageurl, //relentSearchUrl,
			dataType: 'json', //dataType: 'json',
			data: {
				"id": cata_id,
				"subType":subType,
				"tag":cata_tag,
				"page": page,
				"pageSize": pageSize,
				"title":cata_title,
				"pageSize":pageSize
			},
			dataType:"json",
			success: function(data) {
				if(data!=""&&data!=null){
					var arry_list = new Array();
					//赋值子标签信息
					for (var i = 0; i < data.records.length; i++) {
						var obj = data.records[i];
						if(obj.cata_id!=id){
							arry_list.push("<li rel='"+obj.cata_id+"'><span onclick='catalogtagreload("+obj.cata_id+")'>"+obj.cata_title+"</span><a href='"+contentPath+"catalog/catalogDetail.htm?cata_id="+obj.cata_id+"'>详情</a></li>");
						}
					}
					relalist.append(arry_list.join(''));
					if (page == 1&&data.totalRecord>pageSize) {
						reloadPage(data.totalRecord);
					}else if(page == 1){
						$("#relalist .pagination").empty();
					}
				}else{
					if (page == 1) {
						$("#relalist .pagination").html("暂无数据");
					}
				}
			},
			error: function(data) {
				dialog.info('网络异常',function(){},2000);
			}
		});
	};
	
	function unique(arr) {
	    var result = [], hash = {};
	    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
	        if (!hash[elem]) {
	            result.push(elem);
	            hash[elem] = true;
	        }
	    }
	    return result;
	}
	getcatalogtaglist(defaultId,"",0,"");
	$("#cata_id").val(defaultId);
	
	$("#cata_title").val("");
});


