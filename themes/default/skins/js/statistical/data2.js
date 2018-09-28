/*
 * 主题指数
 * 路径配置
 */
// require.config({
//     paths: {
//         'echarts': getRootPath() + '/libs/assets/echarts3/echarts'
//     }
// });
// 使用

require([getRootPath() + '/libs/assets/echarts3/echarts'
], function (ec) {
    // init
    line();
    bar();
    viewsArea();
    getRegCount();
    getRegBusinessCount();
    // 部门开放数据量top10
    var departmentDataTop10 = [];
    var myChartDepartment = ec.init(document.getElementById('department'));
    myChartDepartment.on('click', function (params) { //点击左边柱状图对应更新右侧雷达图
        // 控制台打印数据的名称
        for (var i = 0; i <departmentDataTop10.length; i++) {
            if (params.name.split('.')[1] == departmentDataTop10[i].name) {
                radar(departmentDataTop10[i].code);
            }
        }
    });
    function bar() {
        var cataData = [],
            yAxisData = [],
            apiData = [];
        var option = {
            color:['#41FDFE','#D75BFF','#FFBF43'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            barWidth: 12,
            textStyle: {
                color:'#fff'
            },
            legend: {
                top: 20,
                data: ['数据集', 'api','app'],
                textStyle: {
                    color: "#fff"
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value',
                show: true,
                splitLine: {
                    show: false
                },
                show:false,
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
                show: true,
                position:'left',
                axisLabel:{
                    clickable:true
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            },
            series: [
                {
                    name: '数据集',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 2
                        },
                        normal: {
                            barBorderRadius: 2
                        },
                    },
                    data: cataData
                },
                {
                    name: 'api',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 2
                        },
                        normal: {
                            barBorderRadius: 2
                        },
                    },
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 2
                        },
                        normal: {
                            barBorderRadius: 2
                        },
                    },
                    data: apiData
                },
                {
                    name: 'app',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 2
                        },
                        normal: {
                            barBorderRadius: 2
                        },
                    },
                    data: []
                }
            ]
        };
        $.ajax({ //数据量
            url: getRootPath()+"/analyse/viewStatistics.do?method=GetToptenOrg",
            type: "POST",
            // dataType:"json",
            success: function (data) {
                var data = JSON.parse(data);
                departmentDataTop10
                for(var i=9;i<10&&i>=0;i--) {
                    yAxisData.push(i+1 + ' .'+ data[i].name);
                    cataData.push(data[i].cata_count)
                    apiData.push(data[i].api_count)
                    departmentDataTop10.push({
                        name:data[i].name,
                        code:data[i].code
                    })
                }
                radar(departmentDataTop10[0].code);
                myChartDepartment.setOption(option);
                setTimeout(function () {
                    window.onresize = function () {
                        myChartDepartment.resize();
                    };
                }, 200);
            }
        }); 
    }
    // 数据开放趋势
    function line() {
        var xAxisData = [],
            cataData = [],
            countData =[];
        var line_option = {
            color:['#41FDFE','#D75BFF'],
            textStyle: {
                color:'#fff'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                top:20,
                data: ['数据集', '数据量'],
                textStyle:{
                    color:'#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    show: true,
                    splitLine: {
                        show: false
                    },
                    textStyle:{
                        color:'#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(0,0,0,0)",
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: true,
                    splitLine: {
                        show: false
                    },
                    textStyle:{
                        color:'#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(0,0,0,0)",
                        }
                    },
                },{
                    type: 'value',
                    show: true,
                    splitLine: {
                        show: false
                    },
                    textStyle:{
                        color:'#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(0,0,0,0)",
                        }
                    },
                }
            ],
            series: [
                {
                    name: '数据集',
                    type: 'line',
                    yAxisIndex:0,
                    smooth: true,
                    areaStyle: {normal: {
                        color: new ec.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#41FDFE'
                            }, {
                                offset: 1,
                                color: 'rgba(0,0,0,0)'
                            }]),
                    }},
                    data: countData
                },
                {
                    name: '数据量',
                    type: 'line',
                    yAxisIndex:1,
                    smooth: true,
                    areaStyle: {normal: {
                        color: new ec.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#D75BFF'
                            }, {
                                offset: 1,
                                color: 'rgba(0,0,0,0)'
                            }]),
                    }},
                    data: cataData
                },
            ]
        };
        // 两图分开的格式
        var option = {
            color:['#41FDFE','#D75BFF','#FFBF43'],
            textStyle: {
                color:'#fff'
            },
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }, {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0,
                min: 0,
                max: xAxisData.length - 1
            }],            
            title: [{
                left: 'center',
                text: '数据量',
                textStyle: {
                    color:'#fff',
                    fontSize:14,
                    fontWeight:'normal'
                },
            }, {
                top: '55%',
                left: 'center',
                text: '数据集',
                textStyle: {
                    color:'#fff',
                    fontSize:14,
                    fontWeight:'normal'
                },
            }],
            tooltip: {
                trigger: 'axis'
            },
            lineStyle:{
                color: ['#41FDFE','#D75BFF','#FFBF43'],
            },
            xAxis: [{
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            }, {
                data: xAxisData,
                gridIndex: 1,
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            }],
            yAxis: [{
                splitLine: {show: false},
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            }, {
                splitLine: {show: false},
                gridIndex: 1,
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            }],
            grid: [{
                bottom: '60%',
                left: '25%'
            }, {
                top: '60%',
                left: '25%'
            }],
            series: [{
                type: 'line',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new ec.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#D75BFF'
                        }, {
                            offset: 1,
                            color: 'rgba(0,0,0,0)'
                        }]),
                    }
                },
                showSymbol: false,
                data: cataData
            }, {
                type: 'line',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new ec.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#D75BFF'
                        }, {
                            offset: 1,
                            color: 'rgba(0,0,0,0)'
                        }]),
                    }
                },
                showSymbol: false,
                data: countData,
                xAxisIndex: 1,
                yAxisIndex: 1
            }]
        };
        $.ajax({ //数据量
            url: getRootPath()+"/analyse/viewStatistics.do?method=GetDataList",
            type: "POST",
            // dataType:"json",
            success: function (data) {
                var data = JSON.parse(data)
                data.forEach(function(item) {
                    xAxisData.push(item.statistics_date.replace(/-/g,'/').substring(5,10));
                    cataData.push(item.data_total_count);
                });
                $.ajax({ //数据集
                    url: getRootPath()+"/analyse/viewStatistics.do?method=GetCatalogList",
                    type: "POST",
                    // dataType:"json",
                    success: function (data) {
                        var data = JSON.parse(data)
                        data.forEach(function(item) {
                            countData.push(item.cata_count)
                        })
                        var myChart = ec.init(document.getElementById('line-chart'));
                        myChart.setOption(line_option);
                        setTimeout(function () {
                            window.onresize = function () {
                                myChart.resize();
                            };
                        }, 200);
                    }
                });
            }
        }); 
        
    }
    // 市教育局更新频率
    function radar(code) {
        var indicatorData = [],
            valueData = [];
        var option = {
            radar: [
                {
                    indicator: indicatorData,
                    center: ['50%', '50%'],
                    radius: 120,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    name: {
                        formatter:'【{value}】',
                        textStyle: {
                            color:'#72ACD1'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(114, 172, 209, 0.2)',
                            'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                            'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    }
                }
            ],
            tooltip:{
                show:true
            },
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    symbol: "none",
                    lineStyle:{
                        normal:{
                            color: '#FFD81E'
                        }
                    },
                    data: [
                        {
                            value: valueData,
                            name: '更新频率',
                            areaStyle: {
                                normal: {
                                    opacity: 1,
                                    color: new ec.graphic.RadialGradient(0.5, 0.5, 1, [
                                        {
                                            color: '#FBD97F',
                                            offset: 0
                                        },
                                        {
                                            color: '#F7B553',
                                            offset: 1
                                        }
                                    ])
                                }
                            }
                        }
                    ]
                },       
            ]
        };
        var param = {code:code};
        $.ajax({ //更新频率
            url: getRootPath()+"/analyse/viewStatistics.do?method=GetUpdatefreqOrg",
            type: "POST",
            data:param,
            success: function (data) {
                var data = JSON.parse(data);
                data.forEach(function(item) {
                    indicatorData.push({
                        text: item.name
                    });
                    valueData.push(item.num)
                })
                var myChart = ec.init(document.getElementById('radar'));
                myChart.setOption(option);
                setTimeout(function () {
                    window.onresize = function () {
                        myChart.resize();
                    };
                }, 200);
                // 测试
                /*
                var testData = [[{"num":141,"name":"每年"},{"num":223,"name":"实时"},{"num":101,"name":"每月"}],[{"num":8,"name":"每年1111"},{"num":3,"name":"实时1111"},{"num":5,"name":"每月111"}]];
                var i = 0
                var times
                times && clearInterval(times)
                times = setInterval(function(){
                    indicatorData = []
                    valueData = []
                    testData[i].forEach(function(item) {
                        indicatorData.push({
                            text: item.name
                        });
                        valueData.push(item.num)
                    })
                    option.radar[0].indicator = indicatorData.slice(0)
                    option.series[0].data[0].value = valueData.slice(0)
                    rendRadar(option)
                    if(i++ >= testData.length - 1) {
                        i = 0
                    }
                },5000)*/
            }
        });
    }
    function rendRadar(option){
        var myChart = ec.init(document.getElementById('radar'));
        myChart.setOption(option);
        setTimeout(function () {
            window.onresize = function () {
                myChart.resize();
            };
        }, 200);
    }
    // 访问量分省排名
    function viewsArea() {
        var yAxisData = [],
            valueData = [];
        views_option = {
            color: ["#41FDFE"],
            barWidth: 12,
            textStyle: {
                color: '#fff'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                show:false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            },
            yAxis: {
                type: 'category',
                // data: ['10. 北京', '9. 浙江', '8. 河北', '7. 新疆', '6. 江苏', '5. 上海', '4. 贵州', '3. 重庆' , '2. 广东', '1. 四川'],
                data:yAxisData,
                show:true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
            },
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    textStyle: {
                        color: '#fff'
                    },
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 2
                        },
                        normal: {
                            barBorderRadius: 2
                        },
                    },
                    // data: [200, 240, 280, 320, 360, 400, 440, 480, 520, 560]
                    data:valueData
                },
            ]
        };
        $.ajax({
            url:getRootPath()+"/analyse/viewStatistics.do?method=GetIpList",
            type:"POST",
            success: function(data) {
                var data = JSON.parse(data)
                if(data.length >= 9) {
                    for(var i=9;i<10&&i>=0;i--) {
                        yAxisData.push(i+1 + ' .'+ data[i].provName);
                        valueData.push(data[i].ViewCount)
                    }
                }else {
                    data.forEach(function(item) {
                        yAxisData.push(item.provName);
                        valueData.push(item.ViewCount)
                    })
                }
                var viewsChart = ec.init(document.getElementById('views'));
                viewsChart.setOption(views_option);
                setTimeout(function () {
                    window.onresize = function () {
                        viewsChart.resize();
                    };
                }, 200);
            }
        })
    }

    // 获取企业 个人注册数量
    var sort_option = {
        color:['#F7B553',"#00AAF1"],
        textStyle: {
            color:'#fff'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                labelLine: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        lineStyle:{
                            type:'solid'
                        }
                    }, 
                },
                data: [
                    { value: 20, name: '注册个人',itemStyle: {
                        normal: {
                            color: new ec.graphic.LinearGradient(0, 0, 0, 1, [{
        
        
                             // 0% 处的颜色   
                            offset: 0, color: '#00AAF1'  },
                           {
                            
                            // 100% 处的颜色
                           offset: 1, color: '#41FDFE' 
                          }], false)
                        }
                    }, },
                    { value: 80, name: '注册企业' ,itemStyle: {
                        normal: {
                            color: new ec.graphic.LinearGradient(0, 0, 0, 1, [{
        
        
                             // 0% 处的颜色   
                            offset: 0, color: '#FBD97F'  },
                           {
                            
                            // 100% 处的颜色
                           offset: 1, color: '#F7B553 ' 
                          }], false)
                        }
                    },}
                ]
            }
        ]
    };

	function getRegCount() {
		$.ajax({
			url:getRootPath()+"/analyse/viewStatistics.do?method=GetRegPersonCount",
			type:"POST",
			// dataType:"json",
			success:function(data) {
                var data = JSON.parse(data)
                sort_option.series[0].data[0].value = data.regPerCnt;
                sort_option.series[0].data[1].value = data.regOrgCnt;
                var sortChart = ec.init(document.getElementById('sort'));
                sortChart.setOption(sort_option);
                setTimeout(function () {
                    window.onresize = function () {
                        sortChart.resize();
                    };
                }, 200);
			}
		})
    };
    
    // 注册用户所属行业
	function getRegBusinessCount() {
		$.ajax({
			url:getRootPath()+"/analyse/viewStatistics.do?method=GetIndustCount",
			type:"POST",
			// dataType:"json",
			success:function(data) {
                var data = JSON.parse(data)
                var html = "";
                var regBusiness = $("#regBusiness");
                data.forEach(function(item){
                    html += '<li><a href="javascript:;">'+ item.tradeName +'</a></li>'                    
                })
                regBusiness.html(html)
                textAnim();
			}
		})
    };
    function textAnim() {
        try {
            TagCanvas.Start('cloudCanvas', 'tags2', {
                textFont: "Arial, Helvetica, sans-serif",
                maxSpeed: 0.05,
                minSpeed: 0.01,
                textColour: '#41FDFE',
                textHeight: 12,
                outlineMethod: "colour",
                fadeIn: 800,
                outlineColour: "#41b1c3",
                outlineOffset: 0,
                depth: 0.97,
                minBrightness: 0.2,
                wheelZoom: false,
                reverse: true,
                shadowBlur: 2,
                shuffleTags: true,
                shadowOffset: [1, 1],
                stretchX: 1.2,
                initial: [0, 0.1],
                clickToFront: 600,
                maxSpeed: 0.01,
                outlineDashSpeed: 0.5,
            });
        } catch (e) {
            // something went wrong, hide the canvas container
            document.getElementById('myCanvasContainer2').style.display = 'none';
        }
      
    }    
});