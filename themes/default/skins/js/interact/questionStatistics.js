	/**
	 * 组装柱状图数据
	 * @param {} data
	 */
	function getColumnData(column_id,list){
		list = JSON.parse(list);
		var array = new Array();
		var list_data = new Object();
		var data = new Array();
		var xData = new Array();
		for(var i=0;i<list.length;i++){
			xData.push(list[i].name);
			data.push(Number(list[i].num));
		}
		showColumn(column_id,xData,null,data,'');
	}
	
	/**
	 * 绘制饼图
	 * @param {} chart_id
	 * @param {} data
	 * @param {} title
	 */
	function showPie(pie_id,data,title,size,center,num){
		//组装数据
		var list = JSON.parse(data);
		var array = new Array();
		var list_data = new Object();
		var input = new Array();
		for(var i=0;i<num-1;i++){
			var obj = new Object();
			obj.y = Number(list[i].amount);
			obj.name = list[i].name;
			input.push(obj);
		}
		var obj = new Object();
		
		obj.y = Number(list[list.length-1].amount);
		obj.name = list[list.length-1].name;
		input.push(obj);
		list_data.type = 'pie';
		list_data.data = input;
		list_data.center = [180,85];
		list_data.size = size-50;
		list_data.dataLabels = {enabled: false};
		array.push(list_data);
		
		//显示
		var chart = new Highcharts.Chart({
			//基础
	        chart: {
	        	renderTo : pie_id,
	        	height:size + 130,
	        	width:size + 176,
	        	borderWidth : 0,
	        	borderRadius : 5,
	        	backgroundColor : '#EDEDED', 
            	marginBottom: 30//底部间距/空隙  
	        },
	        //标题
	        title: {
	        	text:title,
	        	align:'center'
	        },
	        //滑过
	        tooltip: {
	           pointFormat: '{name}<b>{point.percentage:.1f}%</b>'
	        },
	        //版权
	        credits:{enabled: false},
	        //标注
	        legend: { //【图例】位置样式
			 	y : 3,
			 	x : 0,
			 	width:180,
			 	height:35,
			 	floating:false,
			 	borderWidth: 0,
			 	layout: 'vertical', //【图例】显示的样式：水平（horizontal）/垂直（vertical）
			 	verticalAlign: 'top', //纵向的位置
			 	symbolPadding:15,
			 	labelFormatter:function(){
			 		if(this.name.length > 7) this.name = this.name.substring(0,7);
			 		if(this.name.length == 1)this.name = this.name + "　　　　　　";
			 		if(this.name.length == 2)this.name = this.name + "　　　　　";
			 		if(this.name.length == 3)this.name = this.name + "　　　　";
			 		if(this.name.length == 4)this.name = this.name + "　　　";
			 		if(this.name.length == 5)this.name = this.name + "　　";
			 		if(this.name.length == 6)this.name = this.name + "　";
			 		if(this.name.length == 7)this.name = this.name + "";
			 		return this.name +  this.y + "</span>";
			 	}
			},
			//绘图线条控制 
			plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {enabled: false},
	                    showInLegend: true
	                }
	        },
	        //数据
	        series: array
	    });
	}
	
	
	/**
	 * 绘制柱状图
	 * @param {} chart_id
	 * @param {} data
	 * @param {} title
	 */
	function showColumn(column_id,xData,yData,data,title,width){
		//显示
		var chart = new Highcharts.Chart({
			//基础
	        chart: {
	        	width:width,
	        	height:300,
	        	renderTo : column_id,
	        	borderWidth : 0,
	        	borderRadius : 5,
	        	backgroundColor : '#EEE9BF'
	        },
	        //标题
	        title: {
	        	text:title
	        },
	        tooltip: { //鼠标滑向数据区显示的提示框 
	            formatter: function() {  //格式化提示框信息 
	                return '' + this.x + ': ' + this.y + ' 组'; 
	            } 
	        }, 
	        //版权
	        credits:{enabled: false},
	        //图注
	        legend: { //设置图例 
	        	y : 10,
			 	x : -300,
			 	width:80,
			 	height:70,
	        	shadow: true,  //设置阴影
	        	floating:false,
			 	borderWidth: 0,
			 	layout: 'vertical', //【图例】显示的样式：水平（horizontal）/垂直（vertical）
			 	verticalAlign: 'top', //纵向的位置
	            layout: 'horizontal' //水平排列图例 
	        },
			//绘图线条控制 
			plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {enabled: false}
	                }
	        },
	        xAxis: {  //设置X轴坐标值
	        	gridLineWidth: 1,  //设置网格宽度为0，因为第一个Y轴默认了网格宽度为1
            	categories: xData,//[ '2011年3月', '2011年4月', '2011年5月', '2011年6月', '2011年7月' ],  
                labels: {//X轴坐标值样式  
	                  rotation: -10,  
	                  align: 'right',  
	                  style: {  
	                     color: '#333333',
	                     font: '12px/1.5 Tahoma,Helvetica,"Simsun",sans-serif'  
	//                   	color: 'white'  
	                  }  
                },
                legend: {enabled: false}
            },  
            yAxis: {  
            	gridLineWidth: 1,  //设置网格宽度为0，因为第一个Y轴默认了网格宽度为1 
	            title: {text: ''},//Y轴标题设为空 
	            labels: { 
	                formatter: function() {//格式化标签名称 
	                    return this.value + ' '; 
	                }, 
	                style: { 
	                	color: '#333333',
                        font: '12px/2em Tahoma,Helvetica,"Simsun",sans-serif'
	                } 
	            },
                plotLines: [{  
                    value: 1,  
                    width: 2,  
                    color: '#55555'  
                }],
                opposite: false //显示在Y轴右侧，通常为false时，左边显示Y轴，下边显示X轴
            },  
	        //数据
	        series: [{  //数据列 
	            name: '数据集', 
	            color: '#4572A7', 
	            type: 'column', //类型：纵向柱状图 
	            data: data //金额数据 
	        }]
	    });
	}
	
	/**
	 * 绘制曲线图
	 * @param {} chart_id
	 * @param {} data
	 * @param {} title
	 */
	function showSpline(spline_id,data,title,size){
		//显示
		var chart = new Highcharts.Chart({
			//基础
	        chart: {
	        	type: 'spline',
	        	width:size,
	        	height:size + 10,
	        	renderTo : spline_id,
	        	backgroundColor : '#EDEDED'
	        },
	        //标题
	        title: {text:title},
	        
	        //滑过
	        tooltip: {
	            crosshairs: true,
                shared: true
	        },

	        //版权
	        credits:{enabled: false},
	        //图注
	        legend:{enabled: false},
			//绘图线条控制 
			plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            
            xAxis: {
                categories: ['特价','便宜的', '较便宜', '中等', '贵', '很贵']
            },
            yAxis: {
                title: {text: ''},
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            
	        //数据
	        series: [{//图形系列属性设置，以下有两个系列
	           type: 'spline' ,
               color: '#4572A7', //颜色
               lineWidth:2, //线条的宽度
//               data:[{y:"1"},{y:"2"},{y:"3"},{y:"4"},{y:"5"},{y:"6"},{y:"1"},{y:"2"},{y:"3"},{y:"4"},{y:"5"},{y:"6"}]
               data: [10, 50,100, 150, 200,250]
         	}]
	    });
	}
	
