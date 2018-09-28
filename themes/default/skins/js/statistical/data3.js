
require([getRootPath() + '/libs/assets/echarts3/echarts'], function (ec) {

    keyword();

    var theme_option = {
        color:["#00AAF1","#BFE381","#FBD97F","#5168FF","#ED94FF","#00AAF1","#BFE381","#FBD97F","#5168FF","#ED94FF","#00AAF1","#BFE381","#FBD97F","#5168FF","#ED94FF","#00AAF1","#BFE381","#FBD97F","#5168FF","#ED94FF",,"#5168FF","#ED94FF",,"#5168FF","#ED94FF"],
        textStyle: {
            color:'#fff'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            show:false,
            textStyle: {
                color: '#fff',
                fontSize: '12',
                fontFamily: '微软雅黑'
            },
            data: []
        },
        series: []
    };
    // 主题分类
    $.ajax({
        type: "POST",
        url: getRootPath()+"/analyse/viewStatistics.do?method=GetThemesList",
        data: {
            "t": new Date().getTime()
        },
        // dataType: "json",
        success: function (data) {
            var data = JSON.parse(data);
            var datas = [];
            var colorArr = [{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#BFE381',
                item2:'#8BC34A'
            },{
                item1:'#FBD97F',
                item2:'#F7A153'
            },{
                item1:'#5168FF',
                item2:'#78B1FB'
            },{
                item1:'#ED94FF',
                item2:'#D75BFF'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#5168FF',
                item2:'#78B1FB'
            },{
                item1:'#ED94FF',
                item2:'#D75BFF'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#5168FF',
                item2:'#78B1FB'
            },{
                item1:'#ED94FF',
                item2:'#D75BFF'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            },{
                item1:'#FBD97F',
                item2:'#F7A153'
            },{
                item1:'#5168FF',
                item2:'#78B1FB'
            },{
                item1:'#ED94FF',
                item2:'#D75BFF'
            },{
                item1:'#00AAF1',
                item2:'#41FDFE'
            }];
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var itemColor = colorArr[i]
                theme_option.legend.data.push(obj.group_name);
                if (obj.count > 11) {
                    datas.push({
                        value: obj.count,
                        name: obj.name,
                        group_code: obj.id,
                        itemStyle: {
                            normal: {
                                color: new ec.graphic.LinearGradient(0, 0, 0, 1, [{
                                    // 0% 处的颜色   
                                    offset: 0, color: itemColor.item1
                                }, {
                                    // 100% 处的颜色
                                    offset: 1, color: itemColor.item2
                                }], false)
                            }
                        },
                    });
                }
            }
            ;
            theme_option.series.push({
                name: '主题开放指数',
                type: 'pie',
                radius : ['50%', '70%'],
                avoidLabelOverlap: false,
                labelLine: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        lineStyle:{
                            type:'solid'
                        }
                    }
                },
                // center: ['50%', '50%'],
                // itemStyle: {
                //     normal: {
                //         // color: '#c23531',
                //         shadowBlur: 200,
                //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                //     },
                // },
                // animationType: 'scale',
                // animationEasing: 'elasticOut',
                // animationDelay: function (idx) {
                //     return Math.random() * 200;
                // },
                data: datas,
                // roseType: 'radius',
            });
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('theme-chart'));
            // 为echarts对象加载数据
            myChart.setOption(theme_option);
            // var ecConfig = require('echarts/config');
            // 点击事件
            // myChart.on(ecConfig.EVENT.CLICK, eConsole);
            setTimeout(function () {
                window.onresize = function () {
                    myChart.resize();
                };
            }, 2000);
            // eConsole({
            //     data: datas[0]
            // });

        },
        error: function (data) {
            dialog.info('网络异常', function () {
            }, 2000);
        }
    });

    // 关键词分析
    function keyword() {
        var keywordList = $('#keywordList');
        $.ajax({
            type: "POST",
            url: getRootPath()+"/analyse/viewStatistics.do?method=GetKeyWordList",
            // dataType: "json",
            success: function (data) {
                var data = JSON.parse(data);
                var html = '';
                data.forEach(function(item) {
                    html += '<li><a href="javascript:;">'+ item.tag_name +'</a></li>';
                })
                keywordList.html(html);
                textAnimation();
            },
            error: function (dataq) {
                dialog.info('网络异常', function () { }, 2000);
            }
        });
    };

    function textAnimation() {
        try {
            TagCanvas.Start('myCanvas', 'tags', {
                textFont: "Arial, Helvetica, sans-serif",
                maxSpeed: 0.05,
                minSpeed: 0.01,
                textColour: '#41FDFE',
                textHeight: 14,
                outlineMethod: "colour",
                fadeIn: 800,
                outlineColour: "#41b1c3",
                outlineOffset: 0,
                depth: 0.97,
                minBrightness: 0.2,
                wheelZoom: false,
                reverse: true,
                shadowBlur: 1,
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
            document.getElementById('myCanvasContainer').style.display = 'none';
        }
    }
});