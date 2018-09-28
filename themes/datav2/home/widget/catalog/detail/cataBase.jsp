<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<!---- 数据详情页面 - 基本信息部分 ---->
<div class="m-dt-main">
    <div class="dt-side g-right">
        <div class="dt-section">
            <div class="dt-sec-title">目录标签</div>
            <div class="dt-sec-content">
                <div class="dt-tag-list">
                    <ul>
                    <c:choose>
                    	<c:when test="${!empty tag_list}">
	                    	<c:forEach items="${tag_list}" var="item">
	                        <li><a target="_blank" title="${item}">${item}</a></li>
	                        </c:forEach>
                      	</c:when>
                        <c:otherwise>
                        	<li><a target="_blank" title="${openCatalog.cata_tags }">${openCatalog.cata_tags }</a></li>                        	
                        </c:otherwise>  
                    </c:choose>                  
                    </ul>
                </div>
            </div>
        </div>
        <div class="dt-section">
            <div class="dt-sec-title">相关数据目录</div>
            <div class="dt-sec-content">
                <div class="dt-relate-list">
                    <ul>
                    	<c:forEach items="${relatedCatalog}" var="item">
	                        <li><a href="${fn:getLink('catalog/catalogDetail.htm?cata_id=')}${item.cata_id}" target="_blank" title="${item.cata_title}">${item.cata_title}</a></li>
	                    </c:forEach>                       
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="dt-content">
        <div class="dt-section">
            <div class="dt-sec-title">目录简介</div>
            <div class="dt-sec-content">${openCatalog.description }</div>
        </div>
        <div class="dt-section">
            <div class="dt-sec-title">目录统计</div>
            <div class="dt-sec-content">
                <div class="dt-statistic">
                    <ul>
                        <li>访问量：<em>${empty openCatalog.catalogStatistic||empty openCatalog.catalogStatistic.use_visit ? 0:openCatalog.catalogStatistic.use_visit}</em>次</li>
                        <li>下载量：<em>${empty openCatalog.catalogStatistic||empty openCatalog.catalogStatistic.use_file_count ? 0:  openCatalog.catalogStatistic.use_file_count}</em>次</li>
                        <li>评分量：<em>${empty openCatalog.catalogStatistic||empty openCatalog.catalogStatistic.use_points ? 0:openCatalog.catalogStatistic.use_points}</em>次</li>
                        <li>评论量：<em>${empty openCatalog.catalogStatistic||empty openCatalog.catalogStatistic.use_comments ? 0:openCatalog.catalogStatistic.use_comments}</em>次</li>
                        <li>订阅量：<em>${empty openCatalog.catalogStatistic||empty openCatalog.catalogStatistic.use_favs ? 0: openCatalog.catalogStatistic.use_favs}</em>次</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="dt-section">
            <div class="dt-sec-title">统计图表<span class="dt-stati-month">
            <input type="text" class="m-input " value="" id="sta_type" onchange="JavaScript:baseTabInit()" readonly></span></div>
            <div class="dt-sec-content">
                <div class="dt-stati-chart" id="chart-stati"></div>
            </div>
        </div>
        <div class="dt-section">
            <div class="dt-sec-title">目录评分</div>
            <div class="dt-sec-content">
                <span style="vertical-align: middle;">我来评分：</span>
                <div class="dt-score-stars" style="vertical-align: middle;">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                </div>
                <div class="dt-score-info" style="vertical-align: middle;">请选择星级</div>
            </div>
        </div>
    </div>
</div>
<script>
      //初始化时间框
      $(function(){
		    //统计月份选择
		    $(".dt-stati-month .m-input").datetimepicker({
		        language: 'cn',
		        format: 'yyyy-mm',
		        autoclose: true,
		        startView: 3,
		        minView : 3
		    });
			//获取当前年月
		    var date=new Date;
			 var year=date.getFullYear(); 
			 var month=date.getMonth()+1;
			 month =(month<10 ? "0"+month:month); 
			 var mydate = (year.toString()+'-'+month.toString());
			 $("#sta_type").val(mydate);   	
		});  
		//评分星星
		$('.dt-score-stars i').each(function(event) {
		    $(this).mouseover(function(event) {
		        var star_des = $(this).index()+1;
		        $(this).css('color','#CD950C');
		        $(this).prevAll('i').css('color','#CD950C');
		        if(star_des==1){
		        	$('.dt-score-info').html("1星：很差");
		        }
		        else if(star_des==2){
		        	$('.dt-score-info').html("2星：较差");
		        }
		        else if(star_des==3){
		        	$('.dt-score-info').html("3星：一般");
		        }
		        else if(star_des==4){
		        	$('.dt-score-info').html("4星：较好");
		        }
		        else if(star_des==5){
		        	$('.dt-score-info').html("5星：很好");
		        }
		    });
		    $(this).mouseleave(function(event) {
		        $('.dt-score-stars i').css('color','#999');
		        $('.dt-score-info').text("");
		    });
		    $(this).click(function(event) {
		    	var star_des = $(this).index()+1;
		    	var obj_id = $("#cata_id").val();
		    	$.ajax({
		    		url: getRootPath()+"/catalog/catalogDetail.do?method=AddScore",
		    		type: "POST",
		    		data: {
		    			"score":star_des,
		    			"cata_id":obj_id,
		    		},
		    		success: function(data) {
		    			if(data.code=='000001'){
		    				$('#bounceIn').click();
		    			}else if(data.code=='000003'){
		    				dialog.info('当前用户已参与过评分！',function(){},3000);
		    			}else if(data.code=='000000'){
		    				dialog.info('评分成功！',function(){},3000);
		    			}else{
		    				dialog.info('评分失败，请稍候重试！',function(){},3000);
		    			}
		    		},
		    		error: function(data) {
		    			dialog.info('网络异常，请稍候重试！',function(){},3000);
		    		},dataType:"json"
		    	});
		    });
		});
     function baseTabInit(){
        //统计月份选择
        $(".dt-stati-month .m-input").datetimepicker({
            language: 'cn',
            format: 'yyyy-mm',
            autoclose: true,
            startView: 3,
            minView : 3
        });


        //统计折线图
        require([
            'echarts',
            'echarts/chart/line' // 使用折线图就加载line模块，按需加载
        ], function (echarts) {
            // 基于准备好的dom，初始化echarts实例
            
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
           	var cata_id = $("#cata_id").val();
           	var sta_type = $("#sta_type").val()+'-01';
            var statiOption = {
        			tooltip : {
        				trigger: 'axis'
        			},
        			legend: {
        				data:['访问量']
        			},

        			calculable : true,
        			xAxis : [
        				{  
        					name: '日', 
        					type : 'category',
        					boundaryGap : false,
        					data :  []
        				}
        			],
        			yAxis : [
        		                {
        		                	name: '数量', 
        		                    type : 'value',
        		                    axisLabel : {
        		                        formatter: '{value}'
        		                    }
        		                }
        			],
        			series : [
        				{
        					name:'访问量',
        					type:'line',
        					stack: '总量',
        					itemStyle : { normal:{ 	color: function(params) {
				            	return '#f39646';
				            	}}},
        			
        				}
        			]
        		};
            $.ajax({
                url : getRootPath()+'/catalog/CatalogDetail.do?method=getCatalogStaticsChart',
                type : 'POST',
                dataType : 'JSON',
                data: {
                	cata_id: cata_id,
                    sta_type: sta_type
                },
                success : function(data) {
                		var str1 = new Array();
                		var str2 = new Array();
                    	for(var i=0;i<data.length;i++){
                    		if(data[i].visit_count > 0 ){
                        	    var da = data[i].statistics_date;
                        	    da = new Date(da);
                        	    var year = da.getFullYear();
                        	    var month = da.getMonth()+1;
                        	    var date = da.getDate();
                        	    var time =   ([year,month,date].join('-'));
                        		str1.push(time);
                        		str2.push(data[i].visit_count);
                    		}
                    	}
                	require(['echarts', 'theme/blue', 'echarts/chart/line'], function(ec , theme) {
    		        	var statiChart = ec.init(document.getElementById('chart-stati'), theme);
    		                statiOption.xAxis[0].data = str1;
    		        		statiOption.series[0].data = str2;
    		        		statiChart.setOption(statiOption);
    		                $(window).resize(function(){
    		                	statiChart.resize();
    		                });
                    });
                },
                error : function() {
 //   layer.msg("网络错误5！",2,0);
          alert("网络错误");
                }
            });
        });
    } 
</script>
