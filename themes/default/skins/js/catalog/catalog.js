
/*
 * 左侧UI效果
 */
$(function(){
	//获取左侧filter内容
	var getLeftFilter = function(){
		var filter = {};
		//过滤条件
		var _order =  ' ' + $("select[name='filter_order_by']").find("option:selected").val();
		if(_order){
			if($('#sort-style').hasClass('fa-sort-amount-asc')){
				_order += ' asc';
			}else{
				_order += ' desc';
			}
		}
		filter['_order'] = _order;
		//排序条件
		$("#filter_container li").each(function(){
			/*filter[$(this).attr("action-dimension")] = [];每个可以多选时用*/
			filter[$(this).attr("action-dimension")] = "";
		});
		for(var key in filter){
			$("#filter_container").find("li[action-dimension='" + key + "']").each(function(){
				/*filter[key].push($(this).attr("action-member"));每个可以多选时用*/
				filter[key] = $(this).attr("action-member");
			});
		}
		//搜索条件
		filter['keywords'] = $("input[name='keywords']").val();
		//标签
		filter['tag'] = $("input[name='tag']").val();
		filter['grade'] = $("input[name='grade']").val();
		return filter;
	};
    //排序切换
    $('.side-sort .fa').click(function(){
        $(this).toggleClass('fa-sort-amount-desc fa-sort-amount-asc');
        //触发leftFilterChange事件
        $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
    });
    //点击筛选条件
    $('body').on('click','.filter-list>ul>li',function(){
        var selList = $(this).parent('ul').attr('action-dimension');
        //取消选中
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('#filter_container li[action-dimension='+selList+']').attr("action-member","").css('display','none').find('span').text('');
            var count = 0;
            $('.filter-list>ul>li').each(function(){
               if($(this).hasClass('active')){
                   count++;
               }
            });
            if(count == 0){
                $('.side-remove').hide();
                $('.side-checked').hide();
            }
        }
        //选中
        else{
            $(this).addClass('active').siblings('li').removeClass('active');
            if(selList){
                var selText = $(this).find('span').text();
                var selValue = $(this).attr("action-member");
                $('#filter_container li[action-dimension='+selList+']').css('display','inline-block').attr('action-member',selValue).find('span').text(selText);
                $('.side-remove').show();
                $('.side-checked').show();
            }
        }
        //触发leftFilterChange事件
        $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
    });
	$('#keyword').keydown(function(event){
    	if(event.keyCode==13){
            var selList = $(this).parent('ul').attr('action-dimension');
            //取消选中
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $('#filter_container li[action-dimension='+selList+']').attr("action-member","").css('display','none').find('span').text('');
                var count = 0;
                $('.filter-list>ul>li').each(function(){
                   if($(this).hasClass('active')){
                       count++;
                   }
                });
                if(count == 0){
                    $('.side-remove').hide();
                    $('.side-checked').hide();
                }
            }
            //选中
            else{
                $(this).addClass('active').siblings('li').removeClass('active');
                if(selList){
                    var selText = $(this).find('span').text();
                    var selValue = $(this).attr("action-member");
                    $('#filter_container li[action-dimension='+selList+']').css('display','inline-block').attr('action-member',selValue).find('span').text(selText);
                    $('.side-remove').show();
                    $('.side-checked').show();
                }
            }
            //触发leftFilterChange事件
            $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
    	}
    });
    //筛选条件点击切换
    $('.filter-list li').each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
            var filter_obj = $(this).text();//获取点击筛选条件
            var filter_obj_value = $(this).attr("data-point");//获取点击筛选条件
            var parent_obj = $(this).parents('.filter-body').siblings('.filter-header').text();//获取点击筛选条件的类别
            if(filter_obj!='不限'){
                if(parent_obj=='关键词：'){
                    $("#tag").val(filter_obj);
                }
                if(parent_obj=='评分：'){
                    $("#grade").val(filter_obj_value);
                }
            }
            //点击不限
            if(filter_obj=='不限'){
                $(this).siblings('li').removeClass('active');
                if(parent_obj=='关键词：'){
                    $("#tag").val("");
                }
                if(parent_obj=='评分：'){
                    $("#grade").val("");
                }
            }
            $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
        });
    });
    //点击已选条件
    $('body').on('click','.side-checked>ul>li',function(){
        var selList = $(this).attr('action-dimension');
        $(this).attr("action-member","").css('display','none').find('span').text('');
        $('.filter-list>ul[action-dimension="'+selList+'"]>li').removeClass('active');

        var count = 0;
        $('.filter-list>ul>li').each(function(){
            if($(this).hasClass('active')){
                count++;
            }
        });
        if(count == 0){
            $('.side-remove').hide();
            $('.side-checked').hide();
        }
        //触发leftFilterChange事件
        $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
    });
     
    $('body').on('click','.do-search',function(){
    	//触发leftFilterChange事件
        $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
    });
	$('#keyword').keydown(function(event){
    	if(event.keyCode==13){
    		$("body .content").trigger("leftFilterChange", [getLeftFilter(),""]); 
    	}
    });
    //清空所有条件
    $('body').on('click','.side-remove',function(){
        $('.filter-list>ul>li').removeClass('active');
        $('.side-checked>ul>li').attr("action-member","").css('display','none').find('span').text('');
        $('.side-remove').hide();
        $('.side-checked').hide();
        $("#tag").val("");
        $("#grade").val("");
        $('.filter-main').find('.filter-list li').removeClass('active');
        $('.filter-main').eq(0).find('.filter-list li').eq(0).addClass('active');
        $('.filter-main').eq(1).find('.filter-list li').eq(0).addClass('active');
        //触发leftFilterChange事件
        $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
    });
    $('.sel-corner').on('change',function(){
    	 //触发leftFilterChange事件
        $("body .content").trigger("leftFilterChange", [getLeftFilter(),""]);  
    });
    //点击查看更多
    $('body').on('click','.filter-more',function(){
        $(this).siblings('ul').toggleClass('auto-height');
    });
    //点击查看更多
    $('body').on('click','.filter-tag',function(){
        $(this).siblings('.filter-body').toggleClass('auto-height');
        $(this).find('.fa').toggleClass('fa-angle-down fa-angle-up');
    });
    
    //滚动条初始化
    $('[niceScroll]').niceScroll({
        cursoropacitymin: 0,
        cursorcolor:"#eee",
        cursorborder: '#eee'
    });
    //滚动后筛选条件定位为固定
    var iTop = $('.side-main').offset().top;
    $(window).scroll(function () {
        if(($(window).scrollTop())>iTop){
            $('.sidebar').addClass('side-fixed');
        }
        else{
            $('.sidebar').removeClass('side-fixed');
        }
    });
    
});
/*
 * 左侧加载数据
 */
$(function(){
	//过滤条件
	var _leftFilter = {};
	
	$("body .content").bind("leftFilterChange", function (event, leftFilter, message2) {  
		loadLeft(true,leftFilter);
		_leftFilter = leftFilter;
		loadData(0,false);
	});
	var loadLeft = function(reload,leftFilter){
		reload = reload||false;
		var param = leftFilter||{};
		param['cata_type'] = $("input[name='cata_type']").val();
		dialog.loading({text:'加载中',parent:$('body .side-content')});
		$.post(
	    	    "./catalog.do?method=GetCatalogStaticsByMutiDimi",
	    	    param,
	    	    function(data,status){
	    	    	$('body .side-content>.dialog-loading').modal('hide');
	    	    	var left = "";
	    	    	var filter = "";
	    	    	for(var i in data){
	    	    		left += '<div class="side-filter"><div class="filter-title">';
	    	    		left += data[i].column_id_desc;
	    	    		left += '</div><div class="filter-list"><ul action-dimension="' + data[i].column_id_en +'">';	
	    	    		var groups_str = data[i].group_count_num;
	    	    		var groups = groups_str;
	    	    		for(var j in groups){
	    	    			var item  = groups[j].item;
	    	    			var item_value  = groups[j].item_value;
	    	    			var count = groups[j].count_num;
	    	    			if($.trim(item) === ""){
	    	    				item = "未指定";
	    	    			}
	    	    			if(count==0){
	    	    				left += '<li action-member="' + item_value + '" style="display:none;"> <span>' + item + '</span><em>' + count + '</em></li>';
	    	    				
	    	    			}else{
	    	    				left += '<li action-member="' + item_value + '"> <span>' + item + '</span><em>' + count + '</em></li>';

	    	    			}
	    	    		}
	    	    		
	    	    		left += '</ul>';
	    	    		if(groups.length > 5){
	    	    			left += '<div class="filter-more"><i class="fa fa-angle-right" aria-hidden="true"></i></div>';
	    	    		}
	    	    		left +='</div></div>';
	    	    		
	    	    		filter += '<li action-dimension="'+ data[i].column_id_en +'" action-member=""><span></span>&nbsp;&nbsp;</li>';
	    	    	}
	    	    	$("#left_group_count .side-filter").remove();
	    	    	$("#left_group_count").append(left);
	    	    	if(!reload){
	    	    		$("#filter_container").append(filter);
	    	    	}
	    	    	//标注已选过滤条件
	    	    	if(leftFilter){
	    	    		for(var key in leftFilter){
			    			$("#left_group_count").find("ul[action-dimension='" + key + "']").find("li[action-member='" + leftFilter[key] + "']").addClass('active');
		    	    	}
	    	    	}
	    	    },
	    	    "json"
	    	);
	};
	
	/*
	 * 右侧加载数据
	 */
    var renderPage = function(data){
    	var html = "";
    	if(data!=null && data.length>0){
    		
	    	for(var j=0;j<data.length;j++){
	    		
	    		var use_type = data[j].conf_use_type;
	    		
	    		html += '	<li class="cata-item" data-cata="'+data[j].cata_id+'">';
	    		if("" != data[j].cata_logo && data[j].cata_logo!=null){
	    			html += '<div class="item-icon"><img style="width:50px;height:50px;" src="'+data[j].cata_logo+'"/></div>';
	    		}else{
	    			html +='<div class="item-icon"><i class="fa fa-reorder"></i></div>';
	    		}
	    		
	    		html += '	<div class="item-option">'
		    	+'	    <ul>';
	    		if (use_type) {
		    		if(use_type.indexOf("3") >=0){
		    			html+= '<li target="data-api" class="active"><a href="javascript:; "><i class="fa fa-plug"></i>API服务</a></li>';
		    		}
			    	if(use_type.indexOf("4") >=0){
		    			html+= '<li target="data-map" class="active"><a href="javascript:;"><i class="fa fa-map"></i>地图服务</a></li>';
		    		}
			    	// if(data[j].cata_type == 10){
			    	// 	html+= '<li class="active"><a href="../relnet/index.htm?cata_id='+data[j].cata_id+'"  target="_blank"><i class="fa fa-sitemap"></i>关联服务</a></li>';
			    	// }
			    	if(use_type.indexOf("2") >=0){
			    		html+= ' <li target="data-download" class="active"><a href="javascript:;"><i class="fa fa-cloud-download"></i>文件下载</a></li>';
			    	}
	    		}
		    	html += ' </ul>'
		    	+'	</div>'
		    	+'	<div class="item-content">'
		    	+'	    <div class="item-header">'
		    	+'	        <div class="item-title" action-data="'+data[j].cata_id+'">'
		    	+'	            <a target="_blank" href="catalogDetail.htm?cata_id='+data[j].cata_id +'">'+ data[j].cata_title  +'</a>'
		    	+'	        </div>'
		    	+'	    </div>'
		    	+'	    <div class="item-body">'
		    	+'	        <div class="item-info">'
		    	+'	            <div class="item-format">';
	    		
		    	if(use_type != null && (use_type.indexOf("2") >=0) ){
		    		if(data[j].conf_catalog_format && data[j].conf_catalog_format.length>0){
			    		data[j].conf_catalog_format = data[j].conf_catalog_format.split(",");
						for(var i=0;i<data[j].conf_catalog_format.length;i++){
							if(data[j].conf_catalog_format[i]==1){
								html += '<span class="label label-success">XLS</span>';
							}else if(data[j].conf_catalog_format[i]==2){
								html += '<span class="label label-info">XML</span>';
							}else if(data[j].conf_catalog_format[i]==3){
								html += '<span class="label label-warning">JSON</span>';
							}else if(data[j].conf_catalog_format[i]==4){
								html += '<span class="label label-primary">CSV</span>';
							}
						}
		    		}else{
		    			html += '<span class="label"></span>';
		    		}
		    	}else{
		    		html += '<span class="label"></span>';
		    	}
				
		    	html += '       </div>'
		    	+'		        <div class="item-theme">';
		    	if (use_type) {
			    	if(use_type.indexOf("1") >=0 || use_type.indexOf("4") >=0){
			    		html +=  '<span>数据量：'+ (data[j].catalogStatistic ? data[j].catalogStatistic.data_count||0 : 0)+'</span>&nbsp;&nbsp;';
			    	}
			    	if(use_type.indexOf("2") >=0){
			    		html +=  '<span>文件数：'+ (data[j].catalogStatistic ? data[j].catalogStatistic.file_count||0 : 0)+'</span>&nbsp;&nbsp;';
			    	}
			    	if(use_type.indexOf("3") >=0){
			    		html +=  '<span>接口数量：'+ (data[j].catalogStatistic ? data[j].catalogStatistic.api_count||0 : 0)+'</span>&nbsp;&nbsp;';
			    	}
		    	} else {
		    		html +=  '<span></span>&nbsp;&nbsp;';
		    	}
		    	html +=				'</div>'
		    	+'		        <div class="item-text">';
		    	html +='		        <div title="'+data[j].open_type+'">开放状态：'+ data[j].open_type +'</div>';
		    	if(data[j].cata_type == 10){
		    		html +='		    <span>来源部门：'+ (data[j].org_name || "无")  +'</span>';
		    	}
		    	var themes_name = "无";
		    	var occupation_name = "无";
		    	// 主题和行业数组
				var theme_array = [], ind_array = [];
		    	if (data[j].cataLogGroups != null && data[j].cataLogGroups.length>0) {
					$.each(data[j].cataLogGroups, function(key, value) {
						theme_array.push(value.group_name);
					});
		    	}
		    	if (data[j].cataLogIndustrys != null && data[j].cataLogIndustrys.length>0) {
		    		$.each(data[j].cataLogIndustrys, function(key, value) {
		    			ind_array.push(value.group_name);
					});
		    	}
		    	if (theme_array.length > 0) {
					themes_name = theme_array.join('，');
				}
				if (ind_array.length > 0) {
					occupation_name = ind_array.join('，');
				}
		    	
		    	html +=	'		        </div>'
		    	+'	            <div><span>所属主题：'+ (themes_name)  +'</span></div>'
		    	+'		        <div>更新时间：'+ data[j].update_time +' </div>'
		    	+'		        <div title="'+data[j].description+'">描述：'+ data[j].description +'</div>'
		    	+'		       </div>'
		    	+'		    </div>'
		    	+'		</div>'
		    	+'		</li>';
	    	}
	    	$("#catalog-list").html(html);
	    	//触发catalogListChange事件
	        $("#catalog-list").trigger("catalogListChange", ["",""]); 
    	}
    };
    
   //增加图标点击事件
    $(document).delegate('.item-option a', 'click', function() {
    	var cata_id = $(this).parents(".cata-item").attr("data-cata");
    	var detailUrl = "./catalogDetail.htm?cata_id="+cata_id;
    	var target = $(this).parents("li.active").attr("target");
    	if(typeof target!= 'undefined'){
    		window.open(detailUrl+"&target_tab="+target);
    	}
    	
    });
    
    var pageSize = 6; //每页显示条数初始化，改变显示条数修改这里即可
    
    //加载数据。strat:开始记录数，setAll：是否初始化总数据
    var loadData = function(start,setAll){
    	start=start||0;
    	setAll=setAll||false;
		var param = _leftFilter||{};
    	param['start'] = start;
    	param['length'] = pageSize;
    	param['pageLength'] = pageSize;
    	param['cata_type'] = $("input[name='cata_type']").val();
    	param['keywords'] = $("input[name='keywords']").val();
    	var _orders = param['_order']||$("select[name='filter_order_by']").find("option:selected").val();
    	if(_orders.indexOf('asc')>0 || _orders.indexOf('desc')>0){
    		param['_order'] = _orders;
    	}else{
    		param['_order'] = _orders + " desc";
    	}

    	dialog.loading({text:'加载中',parent:$('body')});
    	$.ajax({
    		url:"./catalog.do?method=GetCatalog",
			type: "POST",
			data: param,
			dataType: "json",
			success: function(ret){
				$('body>.dialog-loading').modal('hide');
				if(ret){
    					$("#total_count").text(ret.recordsTotal);
					if(ret.recordsTotal>0){
	    				var data=ret.data;
	    				renderPage(data);
	    				if(start==0){
	    					initPage(ret.recordsTotal,pageSize);
	    				}
	    			}else{
	    				$('#catalog-list').html('<li><div class="no-data">数据在路上…</div></li>');
	    				$('.pagination').hide();
	    			}
				}else{
    				$("#total_count").text(0);
					$('#catalog-list').html('<li><div class="no-data">数据在路上…</div></li>');
	    			$('.pagination').hide();
				}
				
	  		},error:function(e){
				$("#total_count").text(0);
	  			dialog.info('请求失败，请稍后重试',function(){},3000);
	  			$('body .side-content>.dialog-loading').modal('hide');
	  		}
		});
    }
    var pageCallback = function(index, jq) {
    	loadData(index*pageSize,false);
    };	
    var initPage = function(count, pageSize){
    		var count = parseInt(count); 
    		var pageSize = parseInt(pageSize);
    		if(count > pageSize){
    			$("#Pagination").show();
    			 $("#Pagination").pagination(count, {
    			        num_edge_entries: 3,//连续分页主体部分分页条目数
    			        num_display_entries: 4,//两侧首尾分页条目数
    			        whether_select: true,
    			        items_per_page: pageSize,//每页的数据个数
    			        callback: pageCallback//回调函数
    			    });
    		}
    		else{
    			$("#Pagination").hide();
    		}
    };
    //开始加载第一页数据，并初始化总数据
   // loadData(0,true);
    loadLeft(false,{'group_id':cur_subjectId,'org_code':cur_orgCode});
	_leftFilter = {'group_id':cur_subjectId,'org_code':cur_orgCode};
	loadData(0,false);
	
});
