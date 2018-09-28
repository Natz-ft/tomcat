<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<!---- 数据详情页面 - 关联信息部分 ---->
<div class="m-dt-main">
    <div class="dt-side g-right">
        <div class="dt-section">
            <div class="dt-sec-title">相关数据目录</div>
            <div class="dt-sec-content">
                <div class="dt-relate-list">
                    <ul>
                    	<c:choose>
                    		<c:when test="${!empty relatedCatalog}">
		                    	<c:forEach items="${relatedCatalog}" var="item">
			                        <li><a href="${fn:getLink('catalog/catalogDetail.htm?cata_id=')}${item.cata_id}" target="_blank" title="${item.cata_title}">${item.cata_title}</a></li>
			                    </c:forEach>
	                    	</c:when>
	                	</c:choose>                        
                    </ul>
                </div>
            </div>
        </div>
        <div class="dt-section">
            <div class="dt-sec-title">相关应用</div>
            <div class="dt-sec-content">
                <div class="dt-relate-list">
                    <ul>
                    	<c:choose>
                    		<c:when test="${!empty applyList}">
		                    	<c:forEach items="${applyList}" var="item">
			                        <li><a href="${fn:getLink('catalog/catalogDetail.htm?cata_id=')}${item.cata_id}" target="_blank" title="${item.app_name}">${item.app_name}</a></li>
			                    </c:forEach>
	                    	</c:when>
	                	</c:choose>                          
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="dt-content">
    	<input type="hidden" name="cata_id" id="cata_id" value="${cata_id}">
        <div class="dt-relate-chart" id="chart-relate"></div>
    </div>
</div>
<script>
    function relateTabInit(){
        require([
            'echarts',
            'echarts/chart/tree' // 使用柱状图就加载bar模块，按需加载
        ], function (echarts) {
            var relateColors = {
                root: '#07b055',//根节点颜色
                app: '#2f137b',//应用节点颜色
                keyword: '#ec1620',//关键字节点颜色
                catalog: '#2f9ff3',//关联目录节点颜色
                api: '#ffb121'//服务节点颜色
            };
            var cata_id = $('#cata_id').val();
            var arry_node = [];
            var relateChart = echarts.init(document.getElementById('chart-relate'),'maracons');
            $.ajax({
            	url:getRootPath() +"/catalog/CatalogDetail.do?method=GetRelateInfo&cata_id="+cata_id,
				type : "POST",				
				success : function(data) {
					var result = JSON.parse(data);
					if($.isEmptyObject(data)){
						return;
					}
					if(result){
						var root = result.root;
						var appList = [],
						apiList = [],
						cataList = [],
						keywordList = [];
						$.each(result.applyList,function(key,value){
							appList.push({
                                        name: value.app_name,
                                        symbolSize: 10,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    position: 'right'
                                                },
                                                color: relateColors.app
                                            },
                                            emphasis: {
                                                color: relateColors.app
                                            }
                                        }
                                    });
						});
						$.each(result.relatedCatalogList,function(key,value){
							cataList.push({
                                        name: value.cata_title,
                                        symbolSize: 10,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    position: 'right'
                                                },
                                                color: relateColors.app
                                            },
                                            emphasis: {
                                                color: relateColors.app
                                            }
                                        }
                                    });
						});
						$.each(result.cataApiList,function(key,value){
							apiList.push({
                                        name: value.open_service_name,
                                        symbolSize: 10,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    position: 'right'
                                                },
                                                color: relateColors.app
                                            },
                                            emphasis: {
                                                color: relateColors.app
                                            }
                                        }
                                    });
						});
						$.each(result.keywordList,function(key,value){
							keywordList.push({
                                        name: value,
                                        symbolSize: 10,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    position: 'right'
                                                },
                                                color: relateColors.app
                                            },
                                            emphasis: {
                                                color: relateColors.app
                                            }
                                        }
                                    });
						});
						var serieData = [
				                            {
				                                name: root,
				                                itemStyle: {
				                                    normal: {
				                                        label: {
				                                            textStyle: {
				                                                color: '#333'
				                                            }
				                                        },
				                                        color: relateColors.root
				                                    },
				                                    emphasis: {
				                                        color: relateColors.root
				                                    }
				                                },
				                                children: [
				                                    {
				                                        name: '服务',
				                                        itemStyle: {
				                                            normal: {
				                                                color: relateColors.api
				                                            },
				                                            emphasis: {
				                                                color: relateColors.api
				                                            }
				                                        },
				                                        children: apiList
				                                    },
				                                    {
				                                        name: '关键字',
				                                        symbolSize: 60,
				                                        itemStyle: {
				                                            normal: {
				                                                color: relateColors.keyword
				                                            },
				                                            emphasis: {
				                                                color: relateColors.keyword
				                                            }
				                                        },
				                                        value: 2,
				                                        children: keywordList
				                                    },
				                                    {
				                                        name: '应用',
				                                        symbolSize: 50,
				                                        itemStyle: {
				                                            normal: {
				                                                color: relateColors.app
				                                            },
				                                            emphasis: {
				                                                color: relateColors.app
				                                            }
				                                        },
				                                        children: appList
				                                    },
				                                    {
				                                        name: '数据目录',
				                                        symbolSize: 60,
				                                        itemStyle: {
				                                            normal: {
				                                                color: relateColors.catalog
				                                            },
				                                            emphasis: {
				                                                color: relateColors.catalog
				                                            }
				                                        },
				                                        children: cataList
				                                    }
				                                ]
				                            }
				                        ];
						
						relateOption.series[0].data = serieData;
			            relateChart.setOption(relateOption);
			            $(window).resize(function(){
			                relateChart.resize();
			            });
					}else{
						$('#chart-relate').html('暂无数据');
					}
				},
				error : function(data) {
					dialog.info("网络错误！", function() {
					}, 2000);
				}
			});      
            var relateOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                calculable: true,
                series: [
                    {
                        name: '树图',
                        type: 'tree',
                        orient: 'radial',  // vertical horizontal
                        layerPadding: 80,
                        rootLocation: {x: '50%', y: '50%'}, // 根节点位置  {x: 'center',y: 10}
                        symbol: 'circle',
                        symbolSize: 60,
                        roam: true,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            emphasis: {
                                borderWidth: 0
                            }
                        },
                        data: []
                    }
                ]
            };
        });
    }
    
  //获取工程根路径
    function getRootPath(){  
    	    //获取当前网址，如： http://localhost:8088/test/test.jsp  
    	    var curPath=window.document.location.href;  
    	    //获取主机地址之后的目录，如： test/test.jsp  
    	    var pathName=window.document.location.pathname;  
    	    var pos=curPath.indexOf(pathName);  
    	    //获取主机地址，如： http://localhost:8088  
    	    var localhostPaht=curPath.substring(0,pos);  
    	    //获取带"/"的项目名，如：/test  
    	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    	    return(localhostPaht+projectName);  
    	};
</script>