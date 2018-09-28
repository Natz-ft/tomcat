        // 路径配置
        require.config({
            paths:{ 
                'echarts' : './echarts/echarts',
                'echarts/chart/bar' : './echarts/echarts/chart/bar',
                'echarts/chart/line' : './echarts/echarts/chart/line'
            }
        });
         // 使用
        require(
            [
                'echarts',
                'echarts/chart/bar' ,// 使用柱状图就加载bar模块，按需加载
                'echarts/chart/line'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('sy_datashow')); 
option = {
    grid:{
        x:50,
        y:50,
        x2:45,
        y2:30
    },
    tooltip : {
        trigger: 'axis'
    },

    calculable : true,
    legend: {
        data:['搜索量','下载量','人气热度']
    },
    xAxis : [
        {
            type : 'category',
            data : ['企业','旅游','医疗','教育','质量']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '数量',
            axisLabel : {
                formatter: '{value} 次'
            }
        },
        {
            type : 'value',
            name : '热度',
            axisLabel : {
                formatter: '{value} °C'
            }
        }
    ],
    series : [

        {
            name:'搜索量',
            type:'bar',
            data:[210, 439, 870, 1312, 766]
        },
        {
            name:'下载量',
            type:'bar',
            data:[196, 389, 790, 1234, 587]
        },
        {
            name:'人气热度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 3.8, 8.1, 12.5, 6.3]
        }
    ]

};






            // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );