/*
 * 主题指数
 * 路径配置
 */
require.config({
    paths: {
        'echarts': getRootPath() + '/libs/assets/echarts'
    }
});
// 使用
require(['echarts', 'echarts/chart/radar', // 使用柱状图就加载bar模块，按需加载
    'echarts/chart/pie'], function (ec) {
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            textStyle: {
                color: '#fff',
                fontSize: '12',
                fontFamily: '微软雅黑'
            },
            x: 'left',
            y: 'top',
            data: []
        },
        calculable: true,
        series: []
    };
    // 主题分类
    $.ajax({
        type: "POST",
        url: getRootPath() + "/analyse/index.do?method=getResGroup",
        data: {
            "t": new Date().getTime()
        },
        dataType: "json",
        success: function (data) {
            var datas = [];
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                option.legend.data.push(obj.group_name);
                datas.push({
                    value: obj.cata_amount,
                    name: obj.group_name,
                    group_code: obj.group_code
                });
            }
            ;
            option.series.push({
                name: '主题开放指数',
                type: 'pie',
                radius: ['20%', '60%'],
                center: ['60%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        labelLine: {
                            show: false
                        }

                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        labelLine: {
                            show: true
                        }
                    }
                },

                data: datas
            });
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('main3'));
            // 为echarts对象加载数据
            myChart.setOption(option);
            var ecConfig = require('echarts/config');
            // 点击事件
            myChart.on(ecConfig.EVENT.CLICK, eConsole);
            setTimeout(function () {
                window.onresize = function () {
                    myChart.resize();
                };
            }, 2000);
            eConsole({
                data: datas[0]
            });

        },
        error: function (data) {
            dialog.info('网络异常', function () {
            }, 2000);
        }
    });
});

function eConsole(param) {
    var grou_code = null;
    var resGroup_name = null;
    try {
        grou_code = param.data.group_code;
        // resGroup_name=data.resGroup.name;
    } catch (e) {
        grou_code = 0;
        // resGroup_name
    }
    option_view = {
        title: {
            x: 'center',
            y: 'top',
            itemGap: -20,
            text: "",
            textStyle: {
                fontSize: 20,
                fontFamily: "微软雅黑",
                color: '#fff'
            },
            subtextStyle: {
                fontFamily: "微软雅黑",
                fontSize: 15,
                color: '#fff',
                fontWeight: 'bold'
            }

        },
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        polar: [{
            indicator: [{
                text: '数据量',
                max: 1
            }, {
                text: '浏览量',
                max: 1
            }, {
                text: '下载量',
                max: 1
            }, {
                text: '订阅量',
                max: 1
            }, {
                text: '数据集',
                max: 1
            }],
            name: {
                textStyle: {color: '#fff'}
            },
            radius: '60%'
        }],
        series: [{
            name: '主题开放',
            type: 'radar',
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: []
        }]
    };
    require(['echarts', 'echarts/chart/radar', // 使用柱状图就加载bar模块，按需加载
        'echarts/chart/pie'], function (ec, b, c) {
        $.ajax({
            type: "POST",
            url: getRootPath() + "/analyse/index.do?method=getGroupAnalyse",
            data: {
                "index": grou_code,
                "t": new Date().getTime()
            },
            dataType: "json",
            success: function (data) {
                try {
                    option_view.title.text = data.resGroup.name;
                    var value = [];
                    value.push(data.dataAnalyse);
                    value.push(data.visitAnalyse);
                    value.push(data.downloadAnalyse);
                    value.push(data.favAnalyse);
                    value.push(data.cataAnalyse);
                    option_view.series.push({
                        name: data.resGroup.name,
                        type: 'radar',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: [{
                            value: value,
                            name: data.resGroup.name
                        }]
                    });

                } catch (e) {
                    option_view.title.text = "教育文化";
                    var value = [];
                    value.push(data.dataAnalyse);
                    value.push(data.visitAnalyse);
                    value.push(data.downloadAnalyse);
                    value.push(data.favAnalyse);
                    value.push(data.cataAnalyse);
                    option_view.series.push({
                        name: "政府办指数",
                        type: 'radar',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: [{
                            value: value,
                            name: "政府办"
                        }]
                    });

                }

                myChart_view = ec.init(document.getElementById('main4'));
                myChart_view.setOption(option_view);
                setTimeout(function () {
                    window.onresize = function () {
                        myChart_view.resize();
                    };
                }, 200);
            },
            error: function (data) {
                dialog.info('网络异常', function () {
                }, 2000);
            }
        });
    });
}
