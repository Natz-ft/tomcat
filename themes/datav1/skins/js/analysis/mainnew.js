$(function () {
/**新增部分begin**/
var checkobj;
$("#rela_scr3 .rela_demen .rela_deup").each(function(){
	$(this).click(function(){
		if (checkobj != null) {
    		checkobj.removeClass('rela_checked');
    	}
		checkobj=$(this);
		$(this).addClass('rela_checked');
	});	
});
$("#rela_scr3 .rela_demen .rela_deup").eq(0).click();
/**新增部分end**/
var map = null;
$("#rela_page").hide();
$("#rela_tab1").click(function(event) {
	$("#rela_tab1").addClass('rela_tabon');
	$("#rela_tab2").removeClass('rela_tabon');
	$("#rela_tab3").removeClass('rela_tabon');
	$("#rela_scr1").show();
	$("#rela_scr2").hide();
	$("#rela_scr3").hide();
	$("#jiantou1").show();
	$("#jiantou2").hide();
	$("#jiantou3").hide();
	$("#rela_change").hide();
});
$("#rela_tab2").click(function(event) {
	$("#rela_tab2").addClass('rela_tabon');
	$("#rela_tab1").removeClass('rela_tabon');
	$("#rela_tab3").removeClass('rela_tabon');
	$("#rela_scr2").show();
	$("#rela_scr1").hide();
	$("#rela_scr3").hide();
	$("#jiantou2").show();
	$("#jiantou1").hide();
	$("#jiantou3").hide();
	$("#rela_change").hide();
});
$("#rela_tab3").click(function(event) {
	$("#rela_tab3").addClass('rela_tabon');
	$("#rela_tab2").removeClass('rela_tabon');
	$("#rela_tab1").removeClass('rela_tabon');
	$("#rela_scr3").show();
	$("#rela_scr2").hide();
	$("#rela_scr1").hide();
	$("#jiantou3").show();
	$("#jiantou2").hide();
	$("#jiantou1").hide();
	$("#rela_change").show();
});
$("#rela_tab2").click();

var m;
$("#countbq").show();
$("#countwd").show();
$("#countpm").show();
$("#countclass").change(function(event) {
	m=$("#countclass").val();
	if(m==0){
		$("#countbq").show();
		$("#countwd").hide();
		$("#countpm").hide();
	}
	else if(m==1){
		$("#countwd").show();
		$("#countbq").hide();
		$("#countpm").hide();
	}
	else if (m==2) {
		$("#countpm").show();
		$("#countbq").hide();
		$("#countwd").hide();
	}
});


var i=0;

$("#rela_wdinput").click(function(event) {
});
$("#rela_wdmain").mouseover(function(event) {
	i=1;
});
$("#rela_wdmain").mouseleave(function(event) {
	i=0;
});
$(document).ready(function(){
	var i=0;
	$("#rela_wdmain").mouseover(function(event) {
		i=1;
	});
	$("#rela_wdmain").mouseleave(function(event) {
		i=0;
	});
});

$("#rela_wdsx").click(function(event) {
	$(".rela_wdlist").slideUp();
});
$("#dituContent").hide();
$("#barContent").hide();
$("#lineContent").hide();
$("#rela_dtab1").click(function(event) {
	$("#rela_dtab1").addClass('current');
	$("#rela_dtab2").removeClass('current');
	$("#rela_dtab3").removeClass('current');
	$("#dituContent").show();
	$("#barContent").hide();
	$("#lineContent").hide();
});
$("#rela_dtab2").click(function(event) {
	$("#rela_dtab2").addClass('current');
	$("#rela_dtab1").removeClass('current');
	$("#rela_dtab3").removeClass('current');
	$("#barContent").show();
	$("#dituContent").hide();
	$("#lineContent").hide();
});
$("#rela_dtab3").click(function(event) {
	$("#rela_dtab3").addClass('current');
	$("#rela_dtab1").removeClass('current');
	$("#rela_dtab2").removeClass('current');
	$("#lineContent").show();
	$("#showContent").hide();
	$("#barContent").hide();
});
$("#rela_dtab1").click();
$("#rela_wdinput").val(null);
var checkboxstr='';


$("#rela_dtab1").live("click",function(event) {
	$("#rela_dtab1").addClass('current');
	$("#rela_dtab2").removeClass('current');
	$("#rela_dtab3").removeClass('current');
	$("#dituContent").show();
	$("#barContent").hide();
	$("#lineContent").hide();
	$("#jiantou4").show();
	$("#jiantou5").hide();
	$("#jiantou6").hide();
});
$("#rela_dtab2").live("click",function(event) {
	$("#rela_dtab5").addClass('current');
	$("#rela_dtab4").removeClass('current');
	$("#rela_dtab6").removeClass('current');
	$("#barContent").show();
	$("#dituContent").hide();
	$("#lineContent").hide();
	$("#jiantou5").show();
	$("#jiantou4").hide();
	$("#jiantou6").hide();
});
$("#rela_dtab3").live("click",function(event) {
	$("#rela_dtab3").addClass('current');
	$("#rela_dtab2").removeClass('current');
	$("#rela_dtab1").removeClass('current');
	$("#lineContent").show();
	$("#barContent").hide();
	$("#dituContent").hide();
	$("#jiantou6").show();
	$("#jiantou5").hide();
	$("#jiantou4").hide();
});
$("#rela_dtab1").click();

contentAndShow();

//普通搜索
$("#traditionSearch").click(function(){
	var key = $("#traditionSearchKey").val();
	key = trim(key);
	var page = 1;
	if (key == '' || key == null || key == undefined) {
		easyDialog.open({
			container : {
				content : '搜索关键字不能为空'
			},
			autoClose : 2000
		});
		return null;
	}
	search("key="+key,page,null,1);

});

//统计关联模块
$("#queryByfilter").click(function(){
	var param = "";
	var index = 0;
	$(".rela_demen > div").each(function(){
		if($(this).hasClass("rela_checked")){
			index = $(this).index();
		}
	});
	var filterValue = "";
	if(0 == index){
		filterValue = $("#tagCount").val();
		if("0" != filterValue && 0 != filterValue){
			param = param + "filterName=tagBase&filterValue="+filterValue;
		}
	}else if(1 == index){
		filterValue = $("#relationCount").val();
		if("0" != filterValue && 0 != filterValue){
			param = param + "filterName=tagLat&filterValue="+filterValue;
		}
	}else{
		filterValue = $("#orderType").val();
		if("0" != filterValue && 0 != filterValue){
			param = param + "filterName=order&filterValue="+filterValue;
		}
	}
	var objectId = $("#relactionSubjectId").val();
	if("0" != objectId){
		param = param + "&subjectId="+objectId;
	}
	var orgId = $("#relactionOrgId").val();
	if("0" != orgId){
		param = param + "&orgId="+orgId;
	}
	var relactionKey = $("#relactionKey").val();
	relactionKey = trim(relactionKey);
	//排除空参数
	if("0" == filterValue && "0" == objectId && "0" == orgId && ("" == relactionKey || null == relactionKey) ){
		easyDialog.open({
			container : {
				content : '筛选项不能为空'
			},
			autoClose : 2000
		});
		return false;
	}
	if("" !=relactionKey && null != relactionKey && typeof(relactionKey) != undefined){
		param = param + "&key="+relactionKey;
	}
	easyDialog.open({
		container : {
			content : '筛选中'
		}
	});
	search(param,1,null,3);
});

//维度关联查询
$("#queryByRelaction").click(function(){
	var param = "";
	var theme = $("#theme").val();
	if("0" != theme){
		param = param + "&subjectId="+theme;
	}
	var depart = $("#depart").val();
	if("0" != depart){
		param = param + "&orgId="+depart;
	}
	var keyword = $("#rela_keyw").val();
	keyword = trim(keyword);
	if(""!=keyword && null != keyword && typeof(keyword) != undefined){
		param = param + "&key="+keyword;
	}
	var relactionCondition = "";
	$('input[id="reactionConditions"]:checked').each(function(){    
		relactionCondition = relactionCondition + $(this).val() +","
	});  
	relactionCondition = trim(relactionCondition);
	if(""!=relactionCondition && null != relactionCondition && typeof(relactionCondition) != undefined && "不限" !=relactionCondition){
		param = param + "&relactionCondition="+relactionCondition.substring(0,relactionCondition.length-1);
	}
	search(param,1,null,2);
});

//普通搜索上一下
$("#prePage").click(function(){
	var page = $("#page").val();
	if(parseInt(page) <=1){
		easyDialog.open({
			container : {
				content : '已是第一页'
			},
			autoClose : 2000
		});
		return null;
	}
	var key = $("#key").val();
	var type = $("#type").val();
	search(key,parseInt(page)-1,null,type);
});

//普通搜素下一页
$("#nextPage").click(function(){
	var page = $("#page").val();
	var totalPage = $("#totalPage").val();
	if(parseInt(page) >= parseInt(totalPage)){
		easyDialog.open({
			container : {
				content : '已是最后一页'
			},
			autoClose : 2000
		});
		return null;
	}
	var key = $("#key").val();
	var type = $("#type").val();
	search(key,parseInt(page)+1,null,type);
});


//对比
$("#Contrast").click(function(){
	//至少选择俩个数据目录进行对比
	var count = $("#minuList li").length;
	if(count < 2){
		easyDialog.open({
			container : {
				content : '至少选择两个数据目录对比'
			},
			autoClose : 2000
		});
		return false;
	}
	contentAndShow();
});
//换一批
$(".rela_replacement").live("click",function(){
	//$("#queryByfilter").click();
	var key = $("#key").val();
	var type = $("#type").val();
	easyDialog.open({
		container : {
			content : '筛选中'
		}
	});
	search(key,1,null,type);
});

/**
 * 对比和可视化
 */
function contentAndShow(){
	var mainCatalog = "";
	var listCatalog = "";
	$("#minuList li").each(function(){
		if($(this).index() == 0){
			mainCatalog = $(this).children().next().next().children().attr("id");
		}else{
			listCatalog = listCatalog + $(this).children().next().children().attr("id") +",";
		}
	});
	if("" != mainCatalog && "" != listCatalog){
		var ids = mainCatalog+","+listCatalog.substring(0,listCatalog.length-1);
		$.ajax({
		    type: "POST",
		    url: getRootPath()+"/analysis/index.do?method=contrast",
		    data: {"maincataId":mainCatalog,"relactionId":listCatalog.substring(0,listCatalog.length-1)},
		    dataType: "json",
		    success: function(data){
		    	var detailHtml = "";
		    	var headHtml = "<tr><th class=\"rela_caption\">对比情况</th>";
		    	//设置表格标题
		    	for(var i = 0; i<data[1].length; i++){
		    		if(i == 0){
		    			headHtml = headHtml + "<th><div class=\"color1\"></div><div class=\"ralalabel1\">主数据集</div></th>"
		    		}else{
		    			headHtml = headHtml + "<th><div class=\"color"+(i+1)+"\"></div><div class=\"ralalabel1\">对比数据集"+(i+1)+"</div></th>"
		    		}
		    	}
		    	headHtml = headHtml + "</tr>";
		    	$("#dataHead").html(headHtml);
				var lbsFlag = "";
				var barFlag = "";
				var lineFlag = "";
		    	//设置表格内容
		    	for(var i=0;i<data.length;i++){
		    		if(0 == i){
			    		detailHtml = detailHtml +"<tr><th>数据集名称</th>";
		    		}
		    		if(1 == i){
			    		detailHtml = detailHtml +"<tr><th>发布部门</th>";
		    		}
		    		if(2 == i){
			    		detailHtml = detailHtml +"<tr><th>所属行业（主题）</th>";
		    		}
		    		if(3 == i){
			    		detailHtml = detailHtml +"<tr><th>与主数据集的维度关联度</th>";
		    		}
		    		if(4 == i){
			    		detailHtml = detailHtml +"<tr><th>与主数据集的标签关联度</th>";
		    		}
		    		if(5 == i){
			    		detailHtml = detailHtml +"<tr><th>时间交叉情况</th>";
		    		}
		    		if(6 == i){
			    		detailHtml = detailHtml +"<tr><th>相同对象数</th>";
		    		}
		    		if(7 == i){
			    		detailHtml = detailHtml +"<tr><th>与主数据集地点关联情况</th>";
		    		}
		    		if(8 == i){
			    		detailHtml = detailHtml +"<tr><th>相同属性数</th>";
		    		}
		    		if(9 == i){
			    		detailHtml = detailHtml +"<tr><th>相同标签数</th>";
		    		}
		    		if(10 == i){
			    		detailHtml = detailHtml +"<tr><th>可视化展现形式</th>";
		    		}
		    		var cata = data[i];
		    		if(i < 10){
			    		for(var j=0;j<cata.length;j++){
			    			detailHtml = detailHtml +"<td>"+cata[j]+"</td>";
			    		}
		    		}else{
			    		for(var a=0;a<cata.length;a++){
			    			var cataId = ids.split(",")[a];
			    			detailHtml = detailHtml +"<td>";
			    			var viewType = cata[a];
			    			if("/" != viewType && "null" != viewType && null != viewType && typeof(viewType) != undefined){
			    				var views = viewType.split("-");
			    				for(var n=0;n<views.length;n++){
			    					if("lbs" == views[n]){
			    						detailHtml = detailHtml +"<img src='../img/analysis/ico-1.png' style='margin-right:5px'/>";
			    						lbsFlag = lbsFlag + cataId +",";
			    					}
			    					if("bar" == views[n]){
			    						detailHtml = detailHtml +"<img src='../img/analysis/ico-2.png' style='margin-right:5px'/>";
			    						barFlag = barFlag + cataId +",";
			    					}
			    					if("line" == views[n]){
			    						detailHtml = detailHtml +"<img src='../img/analysis/ico-3.png' style='margin-right:5px'/>";
			    						lineFlag = lineFlag + cataId +",";
			    					}
			    				}
			    			}else{
			    				detailHtml = detailHtml + "/"
			    			}
			    			detailHtml = detailHtml +"</td>";
			    		}
		    		}
		    		detailHtml = detailHtml +"</tr>";
		    	}
		    	$("#dataBody").html(detailHtml);
		    	$(".rela_conpare").show();
		    	$("#rela_ul").html('');
		    	var flag = data[10][0];
		    	if("/" == flag){
		    		$(".rela_draw").hide();
		    	}else{
			    	//可视化展示
			    	if(null != lineFlag && "" != lineFlag){
			       		var url = getRootPath()+"/analysis/index.do?method=queryDataByCataId";
			    		var obj = $("#rela_dtab3").html();
			    		if(null == obj || typeof(obj) == undefined){
			    			$("#rela_ul").append("<li id='rela_dtab3'><div class='jiantou-1' id='jiantou6'></div><img src='../img/analysis/ico-3.png' width='20' height='20' />趋势图</li>");
			    		}
						$.ajax({
						    type: "POST",
						    url: url,
						    data: {"ids":lineFlag.substring(0,lineFlag.length-1)},
						    dataType: "json",
						    success: function(root){
						    	var titleArray = new Array();
						    	var yArray = new Array();
						    	for(var n=0;n<root.length;n++){
						    		xArray = new Array();
						    		var data = root[n];
							    	var columnLabelMap = data[0][0];
							    	var columnNameArray = data[1];
							    	var columnValueArray = data[2];
							    	var label = columnLabelMap["label"]
							    	var value = columnLabelMap["value"];
							    	//设置titleArray
						    		for(var j = 0 ; j<columnNameArray.length ; j++){
						    			if(columnNameArray[j]["name_en"] == value){
						    				titleArray.push(columnNameArray[j]["name_cn"]);
						    			}
						    		}
							    	//设置xArray
							    	for(var i = 0 ;i< columnValueArray.length;i++){
							    		xArray.push(columnValueArray[i][label]);
							    	}
							    	//设置yArray
					     			var map = {};
						    		for(var j = 0 ; j<columnNameArray.length ; j++){
						    			if(columnNameArray[j]["name_en"] == value){
						    				map["name"] = columnNameArray[j]["name_cn"];
						    				break;
						    			}
						    		}
					    			map["type"] = "line";
					    			var dataArray = new Array();
							    	for(var i = 0 ;i< columnValueArray.length;i++){
							    		dataArray.push(columnValueArray[i][value]);
							    	}
							    	map["data"] = dataArray;
							    	yArray.push(map);
						    	}
						    	//折现
						    	var option = {
						    		    tooltip : { trigger: 'axis'},
						    		    legend: { data:titleArray},
						    		    xAxis : [{
						    		            type : 'category',
						    		            data : xArray
						    		        }],
						    		    yAxis : [{ type : 'value',scale:true}],
						    		    series : yArray
						    		};
						    		                    
						    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
						    		myChart = ec.init(document.getElementById('lineContent'));
						    		myChart.setOption(option); 
						    	});   
				    			$("#rela_dtab3").addClass('current');
				    			$("#rela_dtab2").removeClass('current');
				    			$("#rela_dtab1").removeClass('current');
				    			$("#lineContent").show();
				    			$("#barContent").hide();
				    			$("#dituContent").hide();
				    			$("#jiantou6").show();
				    			$("#jiantou5").hide();
				    			$("#jiantou4").hide();
						    },
						     error : function(dataq) {
									easyDialog.open({
										container : {
											content : '折线图网络异常'
										},
										autoClose : 2000
									});
								}
						});
			    		
			    	}
			    	if(null != barFlag && "" != barFlag){
			    		var url = getRootPath()+"/analysis/index.do?method=queryDataByCataId";
						var obj = $("#rela_dtab2").html();
						if(null == obj || typeof(obj) == undefined){
							$("#rela_ul").append("<li id='rela_dtab2'><div class='jiantou-1' id='jiantou5'></div><img src='../img/analysis/ico-2.png' width='20' height='20' />分布图</li>");
						}
						$.ajax({
						    type: "POST",
						    url: url,
						    data: {"ids":barFlag.substring(0,barFlag.length-1)},
						    dataType: "json",
						    success: function(root){
						    	var titleArray = new Array();
						    	var yArray = new Array();
						    	for(var n=0;n<root.length;n++){
						    		xArray = new Array();
						    		var data = root[n];
							    	var columnLabelMap = data[0][0];
							    	var columnNameArray = data[1];
							    	var columnValueArray = data[2];
							    	var label = columnLabelMap["label"]
							    	var value = columnLabelMap["value"];
							    	//设置titleArray
						    		for(var j = 0 ; j<columnNameArray.length ; j++){
						    			if(columnNameArray[j]["name_en"] == value){
						    				titleArray.push(columnNameArray[j]["name_cn"]);
						    			}
						    		}
							    	//设置xArray
							    	for(var i = 0 ;i< columnValueArray.length;i++){
							    		xArray.push(columnValueArray[i][label]);
							    	}
							    	//设置yArray
					     			var map = {};
						    		for(var j = 0 ; j<columnNameArray.length ; j++){
						    			if(columnNameArray[j]["name_en"] == value){
						    				map["name"] = columnNameArray[j]["name_cn"];
						    				break;
						    			}
						    		}
					    			map["type"] = "bar";
					    			var dataArray = new Array();
							    	for(var i = 0 ;i< columnValueArray.length;i++){
							    		dataArray.push(columnValueArray[i][value]);
							    	}
							    	map["data"] = dataArray;
							    	yArray.push(map);
						    	}
						    	//柱状图
						    	var option = {
						    		    tooltip : { trigger: 'axis'},
						    		    legend: { data:titleArray},
						    		    xAxis : [{
						    		            type : 'category',
						    		            data : xArray
						    		        }],
						    		    yAxis : [{ type : 'value',scale:true}],
						    		    series : yArray
						    		};
						    		                    
						    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
						    		myChart = ec.init(document.getElementById('barContent'));
						    		myChart.setOption(option); 
						    	}); 
								$("#rela_dtab5").addClass('current');
								$("#rela_dtab4").removeClass('current');
								$("#rela_dtab6").removeClass('current');
								$("#barContent").show();
								$("#dituContent").hide();
								$("#lineContent").hide();
								$("#jiantou5").show();
								$("#jiantou4").hide();
								$("#jiantou6").hide();
						    },
						     error : function(dataq) {
									easyDialog.open({
										container : {
											content : '饼状图查询网络异常'
										},
										autoClose : 2000
									});
								}
						});
			    	}
			    	if(null != lbsFlag && "" != lbsFlag){
			    		var url = getRootPath()+"/analysis/index.do?method=queryDataByCataId";
			    		var obj = $("#rela_dtab1").html();
			    		if(null == obj || typeof(obj) == undefined){
			    			$("#rela_ul").append("<li id='rela_dtab1'><div class='jiantou-1' id='jiantou4'></div><img src='../img/analysis/ico-1.png' width='20' height='20' />地图</li>");
			    		}
						$.ajax({
						    type: "POST",
						    url: url,
						    data: {"ids":lbsFlag.substring(0,lbsFlag.length-1)},
						    dataType: "json",
						    success: function(root){
						    	var  cityName = null;
						    	//纬度
						    	var  xName = null;
						    	//经度
						    	var  yName = null;
						    	//标题
						    	var titleName = null;
						    	//获取地市名称和标签
						    	cityName = root[0][0][0]["city"];
						    	//=================地图初始化开始========================
						    	map = new BMap.Map("dituContent");
						    	map.centerAndZoom(cityName,12);  
						        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
						        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
						        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
						        map.enableKeyboard();//启用键盘上下左右键移动地图
						        //向地图中添加缩放控件
						    	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
						    	map.addControl(ctrl_nav);
						            //向地图中添加缩略图控件
						    	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
						    	map.addControl(ctrl_ove);
						            //向地图中添加比例尺控件
						    	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
						    	map.addControl(ctrl_sca);
						    	//=================地图初始化结束========================
						    	//=================地图设置标记点开始=====================
						    	for(var n = 0;n<root.length;n++){
						    		var data = root[n];
						    		var labelMap = data[0][0];
						    		titleName = labelMap["title"];
						    		xName = labelMap["longitude"];
						    		yName = labelMap["latitude"]
						    		var valueList = data[2];
						    		for(var i =0;i<valueList.length;i++){
						    			var value = valueList[i];
						    			var xValue = value[xName];
						    			var yValue = value[yName];
						    			var title = value[titleName];
						    			var point = new BMap.Point(xValue,yValue);
						    			addMarker(point,title,(n+1));
						    		}
						    	}
						    	//=================地图设置标记点开始=====================
					    		$("#rela_dtab1").addClass('current');
					    		$("#rela_dtab2").removeClass('current');
					    		$("#rela_dtab3").removeClass('current');
					    		$("#dituContent").show();
					    		$("#barContent").hide();
					    		$("#lineContent").hide();
					    		$("#jiantou4").show();
					    		$("#jiantou5").hide();
					    		$("#jiantou6").hide();
						    },
						     error : function(dataq) {
									easyDialog.open({
										container : {
											content : '地图数据查询网络异常'
										},
										autoClose : 2000
									});
								}
						});
			    	}
			    	$(".rela_draw").show();
		    }
	
		    },
		     error : function(dataq) {
					easyDialog.open({
						container : {
							content : "网络异常"
						},
						autoClose : 2000
					});
				}
		});
	}
}


/**
 * ajax 获取数据目录
 * @param key 搜索关键字
 * @param subjectId 主题ID
 * @param orgId 部门ID
 * @param filterName 过滤条件名称
 * @param filterValue 过滤条件值
 * @param relationValue 维度关联筛选条件
 * @param page 第几页
 * @param pageSize 每页数量
 * @param type 1：搜索关联  2：维度关联 3：统计关联
 */
function search(param,page,pageSize,type){
	$("#key").val(param);
	$("#type").val(type);
	var param = param + "&page="+page +"&pageSize="+pageSize;
	var url = getRootPath()+"/analysis/index.do?method=traditionSearch";
	if(1 == type){
		url = getRootPath()+"/analysis/index.do?method=traditionSearch"
	}else if(3 == type){
		url = getRootPath()+"/analysis/index.do?method=AnalysisFilterSearch"
	}else{
		url = getRootPath()+"/analysis/index.do?method=AnalysisRelactionSearch"
	}
	$.ajax({
	    type: "POST",
	    url: url,
	    data: param,
	    dataType: "json",
	    success: function(data){
	    	if(null == data || "null" == data){
//	    		$("#rela_page").hide();
//	    		$("#addList").html("<span>请先添加筛选结果</span>");
//	    		$("#minuList").html("")
//	    		$("#addable").html("5");
//	    		//隐藏对比
//	    		$(".rela_conpare").hide();
//	    		$(".rela_draw").hide();
				easyDialog.open({
					container : {
						content : '暂无相关搜索数据'
					},
					autoClose : 2000
				});
	    	}else{
	    		var pageList = null;
	    		//<li title="添加数据集到左边已选"><span class="rela_plus"></span><a href="#"><span>政府采购项目结构分析</span></a></li>
	    		if(3 == type){
	    			var index = 0;
	    			$(".rela_demen > div").each(function(){
	    				if($(this).hasClass("rela_checked")){
	    					index = $(this).index();
	    				}
	    			});
		    		var showHtml = "";
		    		if(0 == index){
		    			showHtml = "相同标签：<span class='replacement_nomal'>"+data[0]+"</span><span class='rela_replacement'>换一批</span>"
		    		}
		    		if(1 == index){
		    			showHtml = "相同维度：<span class='replacement_nomal'>"+data[0]+"</span><span class='rela_replacement'>换一批</span>"
		    		}
		    		$("#rela_change").html(showHtml);
		    		pageList = data[1];
	    		}else{
	    			pageList = data;
	    		}
	    		var html = "";
	    		var catalogList = pageList["records"];
	    		if("1" == type){
		    		for(var i = 0; i < catalogList.length; i++){
		    			var id = catalogList[i]["id"];
		    			var title = catalogList[i]["title"];
		    			html = html + "<li title=\"添加数据集到左边已选\"><span class=\"rela_plus\"></span><a href=\"javaScript:void(0)\"><span id='"+id+"'>"+title+"</span></a></li>";
		    		}
	    		}else if("3" == type){
		    		for(var i = 0; i < catalogList.length; i++){
		    			var id = catalogList[i]["catalogId"];
		    			var title = catalogList[i]["catalogName"];
		    			html = html + "<li title=\"添加数据集到左边已选\"><span class=\"rela_plus\"></span><a href=\"javaScript:void(0)\"><span id='"+id+"'>"+title+"</span></a></li>";
		    		}
	    		}else{
		    		for(var i = 0; i < catalogList.length; i++){
		    			var id = catalogList[i]["cata_id"];
		    			var title = catalogList[i]["cata_title"];
		    			html = html + "<li title=\"添加数据集到左边已选\"><span class=\"rela_plus\"></span><a href=\"javaScript:void(0)\"><span id='"+id+"'>"+title+"</span></a></li>";
		    		}
	    		}
	    		$("#addList").html(html);
	    		$("#totalRecode").html("共"+pageList["totalRecord"]+"条数据集");
	    		$("#pageNumber").html(page+"/"+pageList["totalPage"]);
	    		$("#page").val(page);
	    		$("#totalPage").val(pageList["totalPage"]);
	    		$("#rela_page").show();
	    		easyDialog.close();
	    	}
	    },
	     error : function(dataq) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			}
	});
	
}

function trim(str){
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	str = str.replace(/(^\s*)/g,"");
	str = str.replace(/(\s*$)/g,"");
	return str;
}
function addMarker(point,title,n){
		var markerimg=getRootPath()+"/img/map/mark_"+n+".png";
		var icon = new BMap.Icon(markerimg, new BMap.Size(19, 25), {
		    anchor: new BMap.Size(7.5, 7.5)
		});
	  var marker = new BMap.Marker(point,{icon: icon});
	  map.addOverlay(marker);
	  map.centerAndZoom(point, 15);
	var opts = {
			  width : 200,     // 信息窗口宽度
			  height: 100     // 信息窗口高度
			  //title : "海底捞王府井店" , // 信息窗口标题
			  //enableMessage:true,//设置允许信息窗发送短息
			 // message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
			}
	var infoWindow = new BMap.InfoWindow(title, opts);  // 创建信息窗口对象 
	marker.addEventListener("click", function(){          
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	});
}
});




