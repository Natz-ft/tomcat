var cataMapTool = function(){
	var markerWin = [];//地图信息面板数据
	var opts = {
	        width : 300,     // 信息窗口宽度
	        height: 0,     // 信息窗口高度
	        panel : "panel", //检索结果面板
	        enableAutoPan : true //自动平移
	    };
	function initMapAll(){
		var map = new BMap.Map("map");//在百度地图容器中创建一个地图
		window.map = map;//将map变量存储在全局
	    //var markerArea = "济南市";//默认行政区划
	    //开启信息窗口
	    initMap();//创建和初始化地图
	    map.setMapStyle({style:'googlelite'});
	    
	}
	 	
	    //创建和初始化地图函数：
	    function initMap(){
	        createMap();//创建地图
	        setMapEvent();//设置地图事件
	        addMapControl();//向地图添加控件
	    }
//	    window.initMap = initMap;
	    //创建地图函数：
	    function createMap(){
	    	if (cityCode.indexOf("0000") == 2) {
	    		map.centerAndZoom(cityName, 8); // 初始化地图,设置中心点坐标和地图级别
	    	} else if (cityCode == '100000') {
	    		map.centerAndZoom('中国', 5); // 初始化地图,设置中心点坐标和地图级别
	    	} else {
	    		/*map.centerAndZoom(cityName, 13); */
	    		map.centerAndZoom(cityName, 8); // 初始化地图,设置中心点坐标和地图级别	    		
	    	}
	    }
	    //地图事件设置函数：
	    function setMapEvent(){
	        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
	        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
	        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
	        map.enableKeyboard();//启用键盘上下左右键移动地图
	    }
	    //地图控件添加函数：
	    function addMapControl(){
	        //向地图中添加缩放控件
	        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	        map.addControl(ctrl_nav);
	        //向地图中添加比例尺控件
	        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	        map.addControl(ctrl_sca);
	    }
	    
	    var itemArr = [];
	    //添加项目标注
	    function addItem(obj){
	        $.each(obj,function(n,value) {
	            var item,
	                overArr = [];
	            //覆盖物类型是“点”
	            if(value.style == 'point'){
	                var typeIcon = new BMap.Icon(value.typeImg, new BMap.Size(20,27));
	                var itemPos = new BMap.Point(value.grid[0].lng, value.grid[0].lat);//获取坐标
	                item = new BMap.Marker(itemPos,{icon: typeIcon});
	                var objTitle = value.TITLE;
	            	if(objTitle == null || objTitle == "" || objTitle == undefined || objTitle == "null"){
	            		objTitle = value.title;
	            		if(objTitle == null || objTitle == "" || objTitle == undefined || objTitle == "null"){
	            			objTitle = "暂无";
	            		}
	            	}
	            	var objAddress = value.ADDRESS;
	            	if(objAddress == null || objAddress == "" || objAddress == undefined || objAddress == "null"){
	            		objAddress = value.address;
	            		if(objAddress == null || objAddress == "" || objAddress == undefined || objAddress == "null"){
	            			objAddress = "暂无";
	            		}
	            	}
	            	var objPhone = value.PHONE;
	            	if(objPhone == null || objPhone == "" || objPhone == undefined || objPhone == "null"){
	            		objPhone = value.phone;
	            		if(objPhone == null || objPhone == "" || objPhone == undefined || objPhone == "null"){
	            			objPhone = "暂无";
	            		}
	            	}
	                map.addOverlay(item);//添加覆盖物
	                var panelHtml = '<div class="v-name" style="margin:0 0 5px 0;padding:0.2em 0;font-size:12px;color:#4E4E4E">'+objTitle+'</div>' +
	                    '<div class="v-info">地址 ：'+objAddress+'</div>' + 
	                    '<div class="v-info">电话 ：'+objPhone+'</div>';
	                panelHtml = '<div class="v-panel">'+panelHtml+'</div>';
	                addClickHandler(panelHtml,item);//添加标注点击绑定
	                markerWin.push(panelHtml);

	                overArr.push(item);
	            }
	            //覆盖物类型是“线”
	            else if(value.style == 'line'){
	                var lineArr = [];
	                $.each(value.grid,function(m,gValue) {
	                    lineArr.push(new BMap.Point(gValue.lng, gValue.lat));
	                });
	                item = new BMap.Polyline(lineArr, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.5});
	                map.addOverlay(item);

	                //画完线，在线的起点添加图标
	                var typeIcon = new BMap.Icon(value.typeImg, new BMap.Size(20,27));
	                var itemPos = new BMap.Point(value.grid[0].lng, value.grid[0].lat);//获取坐标
	                lineMarker = new BMap.Marker(itemPos,{icon: typeIcon});
	                map.addOverlay(lineMarker);//添加覆盖物
	                var panelHtml = '<div class="v-name">'+value.name+'</div>' +
	                    '<div class="v-type"><span>'+value.typeFirst+'</span><span>'+value.typeSecond+'</span><span>'+value.typeThird+'</span></div>' +
	                    '<div class="v-info">'+value.address+'</div>';
	                panelHtml = '<div class="v-panel">'+panelHtml+'</div>';
	                addClickHandler(panelHtml,lineMarker);//添加标注点击绑定
	                markerWin.push(panelHtml);

	                overArr.push(item,lineMarker);
	            }
	            //覆盖物类型是“面”
	            else if(value.style == 'area'){
	                var areaArr = [];
	                $.each(value.grid,function(m,gValue) {
	                    areaArr.push(new BMap.Point(gValue.lng, gValue.lat));
	                });
	                item = new BMap.Polygon(areaArr, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});  //创建多边形
	                map.addOverlay(item);

	                overArr.push(item);
	            }
	            //覆盖物数组添加数据
	            var itemObj = {
	                'id': value.id,
	                'overlay': overArr
	            };
	            itemArr.push(itemObj);
	        });
	        
	    }
	    //删除项目标注
	    function delItem(obj){
	        //根据覆盖物ID删除，并更新覆盖物数组
	        var tmpArr = [];
	        $.each(itemArr,function(m,itemVal) {
	            var bDel = false;
	            $.each(obj,function(n,value) {
	                if(itemVal.id == value.id){
	                    for(i=0;i<itemArr[m].overlay.length;i++){
	                        map.removeOverlay(itemArr[m].overlay[i]);
	                    }
	                    bDel = true;
	                }
	            });
	            if(bDel == false){
	                tmpArr.push(itemVal);
	            }
	        });
	        itemArr = tmpArr;
	    }
	    //点击标注开启窗口
	    function addClickHandler(content,marker){
	        marker.addEventListener("mouseover",function(e){
	            var p = e.target;
	            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	            var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
	            map.openInfoWindow(infoWindow,point); //开启信息窗口
	        });
	    }
	    
	    var itemList_old = [];
//	    定义地图数据加载方法
	    function loadMap(data){
	    	$.post(
	    			"CatalogDetail.do?method=GetMapPointData",
	    			data,
	    		    function(itemList,status){
	    				if(itemList){
		    				for(var i in itemList){
		    					var lng = itemList[i].LONGITUDE;
		    					var lat = itemList[i].LATITUDE;
		    					if(itemList[i].LONGITUDE!=null){
		    						lng = itemList[i].LONGITUDE;
		    						delete itemList[i].LONGITUDE;
		    					}else{
		    						lng = itemList[i].longitude;
		    						delete itemList[i].longitude;
		    					}
		    					if(itemList[i].LATITUDE!=null){
		    						lat = itemList[i].LATITUDE;
		    						delete itemList[i].LATITUDE;
		    					}else{
		    						lat = itemList[i].latitude;
		    						delete itemList[i].latitude;
		    					}
		    					
		    					var grid_item = {};
		    					grid_item["lng"] = parseFloat(lng);
		    					grid_item["lat"] = parseFloat(lat);
		    					
		    					var grid = [];
		    					grid.push(grid_item);
		    					
		    					itemList[i]["grid"] = grid;
		    					itemList[i]['style'] = 'point';
		    					itemList[i]['typeImg'] = '../img/common/ico1.png';
		    				}
		    				delItem(itemList_old);
		    				itemList_old = itemList;
		    			    addItem(itemList);
	    				}
	    		    },
	    		    "json"
	    		);
	    }
	 return {
		 loadMap: function(filter_condition_param) {
			 loadMap(filter_condition_param);
	        },
	     initMapAll: function(){
	    	 initMapAll();
	     }
	    };
}();


