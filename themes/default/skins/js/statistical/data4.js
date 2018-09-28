/*
 * 主题指数
 * 路径配置
 */
require.config({
    paths: {
        'echarts': getRootPath() + '/libs/assets/echarts3/echarts'
    }
});
// 使用
require([getRootPath() + '/libs/assets/echarts3/echarts'], function (echarts) {
    top();
    api();

    // 数据集下载
    function top() {
        var yAxisData = [],
            countData = [];
        var views_option = {
            color: ["#FFBF43"],
            textStyle: {
                color: '#fff'
            },
            barWidth: 12,     
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['直接访问'],
                show: false
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show:false,
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
                splitLine:{
                    show:false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },  
                axisLabel:{  
                    formatter:function(value,index) {
                        return '{a|'+value+'}'
                    },
                    rich: {
                        a: {
                            width: 200,
                            align: 'left'
                        },
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
                    data: countData
                },
            ]
        };
        $.ajax({
			url:getRootPath()+"/analyse/viewStatistics.do?method=GetToptenCata",
			type:"POST",
			// dataType:"json",
			success:function(data) {
                var data = JSON.parse(data);
                for(var i=9;i<10&&i>=0;i--) {
                    yAxisData.push(i+1+' .'+ data[i].name);
                    countData.push(data[i].count);
                }
                var viewsChart = echarts.init(document.getElementById('top'));
                viewsChart.setOption(views_option);
                setTimeout(function () {
                    window.onresize = function () {
                        viewsChart.resize();
                    };
                }, 200);
			}
		})
    }

    // API调用
    function api() {
        var yAxisData = [],
            countData = [];
        var views_option = {
            color: ["#D75BFF"],
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
            legend: {
                data: ['直接访问'],
                show: false
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show: false,
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
                data: yAxisData,
                show: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    }
                },
                axisLabel:{  
                    formatter:function(value,index) {
                        return '{a|'+value+'}'
                    },
                    rich: {
                        a: {
                            width: 250,
                            align: 'left'
                        },
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
                    data: countData
                },
            ]
        };
        $.ajax({
			url:getRootPath()+"/analyse/viewStatistics.do?method=GetToptenApi",
			type:"POST",
			// dataType:"json",
			success:function(data) {
                var data = JSON.parse(data);
                for(var i =9;i<10&&i>=0;i--) {
                    yAxisData.push(i+1+' .'+ data[i].service_name) ;
                    countData.push(data[i].num)
                }
                var viewsChart = echarts.init(document.getElementById('api'));
                viewsChart.setOption(views_option);
                setTimeout(function () {
                    window.onresize = function () {
                        viewsChart.resize();
                    };
                }, 200);
			}
		})
    }
});