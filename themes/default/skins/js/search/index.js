/**
 * Created by longhongwen on 2016/10/18.
 */
$(function() {

	queryResByPage(1);
    //排序点击切换
    $('.sort-list ul li').each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
        });
    });
    //类别
    $(".filter-list li").each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
    		$("#searchType").val($(this).find("a").attr("rel"));
    		queryResByPage(1);
        });
	});
    //清除属性
    $(".selected-empty").click(function(){
		$("input[name=searchType]").val("");
		queryResByPage(1);
	});
    
   //搜索页内搜索框搜索
    $(".sort-demand .iconfont").click(function(){
    //	$("input[name=searchType]").val("");
		queryResByPage(1);
	});
    //综合排序
//    $(".sort-list ul li").click(function(){
//		$("input[name=sortEst]").val($(this).attr("rel"));
//		queryResByPage(1);
//	});
});

//搜索列表
function queryResByPage(page) {
	dialog.loading({text:'加载中',parent:$('#cata-main')});
	var listul = $("#catalog-list");
	listul.empty();
	var pageSize = 10; //每页显示条数初始化，修改显示条数，修改这里即可
	var searchType = $("#searchType").val();
	var searchKey = $("#dataKey").val();
	var searchAllKey =$("#searchAll").val();
	$.ajax({
		url: resoucrceurl,
		type: "POST",
		data: {
			"pageSize": pageSize,
			"page": page,
            "searchType":searchType,
            "searchKey":searchKey,
			"searchAllKey":searchAllKey
		},
		success: function(data) {
			$('#cata-main>.dialog-loading').modal('hide');
			if(data){
				try {

                    data=JSON.parse(data);
                    var dataarr = [];
                    if(data.records.length >0){
                        for (var i = 0; i < data.records.length; i++) {
                            var obj = data.records[i];
                            if(1 == obj.datatype){
                                var logo = obj.cata_logo;

                                if(logo){
                                    logo = web_doc+logo;
                                }

                                var description = "";
                                if(obj.description != null){
                                    description = obj.description;
                                    //.substr(0,68);
                                }
                                //li开始
                                dataarr.push("<li class='cata-item'>");

                                dataarr.push("<div class='item-icon'>");
                                if(logo!=null&&logo!=""){
                                    dataarr.push("<img src='"+logo+"' alt='' width='50' height='50' />");
                                }else{
                                    dataarr.push("<i class='iconfont icon-ziliaoku'></i>");
                                }
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-content'>");
                                dataarr.push("<div class='item-header'>");
                                dataarr.push("<div class='item-operation'>");
//								dataarr.push("<ul>");
//	                            if(obj.isFav>0){
//	                            	dataarr.push(" <li onclick=\"cancleCollection('"+obj.app_id+"',3)\"><i class='iconfont'>&#xe691;</i>已收藏</li>");
//	                            }else{
//	                            	dataarr.push(" <li onclick=\"collection('"+obj.app_id+"',3,'"+obj.app_name+"')\"><i class='iconfont'>&#xe691;</i>收藏</li>");
//	                            }
//							    dataarr.push("</ul>");
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-title'><span>[数据目录]</span><a href='"+getRootPath()+"/catalog/catalogDetail.htm?cata_id="+obj.id+"' target='_blank'>"+obj.title+"</a></div></div>");
                                dataarr.push("<div class='item-body'><div class='item-info'>");
                                dataarr.push("<div class='item-format'>");
                                if(obj.catalogformat && obj.catalogformat.indexOf("1")>-1){
                                    dataarr.push("<span class='format format-xls'>XLS</span> ");
                                }
                                if(obj.catalogformat && obj.catalogformat.indexOf("2")>-1){
                                    dataarr.push("<span class='format format-xml'>XML</span> ");
                                }
                                if(obj.catalogformat && obj.catalogformat.indexOf("3")>-1){
                                    dataarr.push("<span class='format format-json'>JSON</span> ");
                                }
                                if(obj.catalogformat && obj.catalogformat.indexOf("4")>-1){
                                    dataarr.push("<span class='format format-csv'>CSV</span> ");
                                }
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-text'><span>来源部门："+obj.orgname+"</span>");
                                if(obj.groupname){
                                    dataarr.push("<span>主题："+obj.groupname+"</span>");
                                }
                                if (obj.industryname) {
                                    dataarr.push("<span>行业："+obj.industryname+"</span>");
                                }
                                dataarr.push("<span>发布时间："+obj.releasedtime+"</span></div>");
                                if (obj.cata_tags) {
                                    dataarr.push("<div><span>关键词："+obj.cata_tags+"</span></div>")
                                }

                                dataarr.push("<div>"+description+"</div></div></div></div>");
                                dataarr.push("</li>");
                                //li结束
                                dataarr.push("</li>");
                            }else if('4' == obj.datatype){
                                var logo = obj.logo;

                                if(logo){
                                    logo = web_doc+logo;
                                }

                                var description = "";
                                if(obj.description != null){
                                    description = obj.description;
                                    //.substr(0,68);
                                }
                                //li开始
                                dataarr.push("<li class='cata-item'>");
                                dataarr.push("<div class='item-icon'>");
                                if(logo!=null&&logo!=""){
                                    dataarr.push("<img src='"+logo+"' alt='' width='50' height='50' />");
                                }else{
                                    dataarr.push("<i class='iconfont'>&#xe665;</i>");
                                }
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-content'>");
                                dataarr.push("<div class='item-header'>");
                                dataarr.push("<div class='item-operation'>");
//								dataarr.push("<ul>");
//	                            if(obj.isFav>0){
//	                            	dataarr.push(" <li onclick=\"cancleCollection('"+obj.app_id+"',3)\"><i class='iconfont'>&#xe691;</i>已收藏</li>");
//	                            }else{
//	                            	dataarr.push(" <li onclick=\"collection('"+obj.app_id+"',3,'"+obj.app_name+"')\"><i class='iconfont'>&#xe691;</i>收藏</li>");
//	                            }
//							    dataarr.push("</ul>");
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-title'><span>[API服务]</span><a href='"+devwebPath+"/dev/developer/serviceDetail.htm?service_id="+obj.id+"' target='_blank'>"+obj.title+"</a></div></div>");
                                dataarr.push("<div class='item-body'><div class='item-info'>");
                                dataarr.push("<div class='item-theme'>接口状态：正常</div><div class='item-text'>");
                                //dataarr.push("<span>连接应用数："+obj.appcount+"</span>");
                                dataarr.push("<span>更新时间："+obj.updatetime+"</span></div><div>"+description+"</div></div></div></div>");
                                dataarr.push("</li>");
                                //li结束
                                dataarr.push("</li>");
                            }else if('3' == obj.datatype){
                                var logo = obj.logo;

                                if(logo){
                                    logo = web_doc+logo;
                                }

                                var description = "";
                                if(obj.description != null){
                                    description = obj.description;
                                    //.substr(0,68);
                                }
                                //var logo = "../dist/img/app/default.jpg";
                                //li开始
                                dataarr.push("<li class='cata-item'>");

                                dataarr.push("<div class='item-icon'>");
                                if(logo!=null&&logo!=""){
                                    dataarr.push("<img src='"+logo+"' alt='' width='50' height='50' />");
                                }else{
                                    dataarr.push("<i class='iconfont'>&#xe6a6;</i>");
                                }
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-content'>");
                                dataarr.push("<div class='item-header'>");
                                dataarr.push("<div class='item-operation'>");
                                dataarr.push("<ul>");
                                if(obj.isFav>0){
                                    dataarr.push(" <li onclick=\"cancleCollection('"+obj.app_id+"',3)\"><i class='iconfont'>&#xe691;</i>已收藏</li>");
                                }else{
                                    dataarr.push(" <li onclick=\"collection('"+obj.app_id+"',3,'"+obj.app_name+"')\"><i class='iconfont'>&#xe691;</i>收藏</li>");
                                }


                                if(obj.appFeatureList!=null&&obj.appFeatureList!=""){
                                    for(var j = 0; j < obj.appFeatureList.length; j++){
                                        var appFeature = obj.appFeatureList[j];
                                        if('pc'==appFeature.app_type || 'website'==appFeature.app_type){
                                            dataarr.push("<li><a href='"+appFeature.app_url+"'><i class='iconfont'>&#xe637;</i>PC版</a></li>");
                                        }else if('android'==appFeature.app_type){
                                            dataarr.push("<li><a href='"+appFeature.app_url+"'><i class='iconfont'>&#xe6c6;</i>安卓版</a></li>");
                                        }else if('ios'==appFeature.app_type){
                                            dataarr.push("<li><a href='"+appFeature.app_url+"'><i class='iconfont'>&#xe6d8;</i>iPhone版</a></li>");
                                        }
                                    }
                                }

                                dataarr.push("</ul>");
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-title'><a href='"+getRootPath()+"/appcenter/detail.htm?app_id="+obj.id+"' target='_blank'>"+obj.title+"</a></div></div>");
                                dataarr.push("<div class='item-body'><div class='item-info'><div class='item-theme'>发布者："+obj.creator+"</div>");
//							dataarr.push("<div class='item-text'><span>使用次数："+obj.use_amount+"次</span>");
                                dataarr.push("<span>更新时间："+(new Date(obj.updatetime * 1000)).toLocaleString()+"</span></div><div>"+description+"</div></div></div></div>");
                                dataarr.push("</li>");
                                //li结束
                                dataarr.push("</li>");
                            }else if('5' == obj.datatype){
                                var logo = obj.logo;
                                if(logo){
                                    logo = web_doc+logo;
                                }
                                var description = "";
                                if(obj.description != null){
                                    description = obj.description;
                                    //.substr(0,68);
                                }
                                //li开始
                                dataarr.push("<li class='cata-item'>");
                                dataarr.push("<div class='item-icon'>");
                                if(logo!=null&&logo!=""){
                                    dataarr.push("<img src='"+logo+"' alt='' width='50' height='50' />");
                                }else{
                                    dataarr.push("<i class='iconfont'>&#xe684;</i>");
                                }
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-content'>");
                                dataarr.push("<div class='item-header'>");
                                dataarr.push("<div class='item-operation'>");
//								dataarr.push("<ul>");
//	                            if(obj.isFav>0){
//	                            	dataarr.push(" <li onclick=\"cancleCollection('"+obj.app_id+"',3)\"><i class='iconfont'>&#xe691;</i>已收藏</li>");
//	                            }else{
//	                            	dataarr.push(" <li onclick=\"collection('"+obj.app_id+"',3,'"+obj.app_name+"')\"><i class='iconfont'>&#xe691;</i>收藏</li>");
//	                            }
//							    dataarr.push("</ul>");
                                dataarr.push("</div>");
                                dataarr.push("<div class='item-title'><span>[文件资讯]</span><a href='"+getRootPath()+"/news/newsDetail.html?news_id="+obj.id+"' target='_blank'>"+obj.title+"</a></div></div>");
                                dataarr.push("<div class='item-body'><div class='item-info'>");
                                dataarr.push("<span>发布时间："+obj.releasedtime+"</span></div><div>"+description+"</div></div></div></div>");
                                dataarr.push("</li>");
                                //li结束
                                dataarr.push("</li>");
                            }

                        }

                        listul.append(dataarr.join(''));
                    }
                    //获取总页码
                    $("#sort-sum").html("共"+data.totalRecord+"个结果");
                    if (page == 1&&data.totalRecord>pageSize) {
                        reloadPage(data.totalRecord);
                    }else if(page == 1){
                        $("#Pagination").empty();
                    }
                    if(data.records.length <= 0){
                        $("#Pagination").html("暂无数据");
                        $("#sort-sum").html("共0个结果");
                    }
				}catch (e){
					console.log("json数据不合法。")
				}

			}else{
				if (page == 1) {
					$("#Pagination").html("暂无数据");
				}
				$("#sort-sum").html("共0个结果");
			}
		},
		error: function(data) {
  			dialog.info('应用列表数据请求失败，请稍后重试',function(){},3000);
  			$('#catalog-list>.dialog-loading').modal('hide');
		}
	});
}

//创建分页元素
function reloadPage(totlePage) {
	$("#Pagination").pagination(totlePage, {
		num_edge_entries: 2,
		num_display_entries: 4,
		callback: pageselectCallback
		//回调函数
	});
};

function pageselectCallback(page_id, jq) {
	queryResByPage(page_id + 1);
//	//滑动至顶部
//	var speed = 500;//自定义滚动速度
//    $( "html,body").animate({ "scrollTop" : 0 }, speed);
};
