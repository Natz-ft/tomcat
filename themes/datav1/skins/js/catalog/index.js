var DataFormat={Excel:'xls',Json:'json',Xml:'xml',Lbs:'lbs',Csv:'csv'};
$(function() {
	
	var tags=[];
	var themeobj;
		$('.theme_firstlevel li a').live("click",function(){
			$('.catalog_checked').children('.checked_default').show();
			$('.theme_firstlevel').hide();
			$(this).parents('ul').prev('.theme_viewmore').hide();
			$('.theme_secondlevel').show();
			if (themeobj != null) {
    			themeobj.removeClass('item_current');
    		}
    		$(this).addClass('item_current');
        	themeobj = $(this);
        	var subid=$(this).attr('rel');
        	var themename=$(this).text();
        	$(".theme_checked").show();
        	$('.theme_checked em').text(themename);
        	$('.theme_checked em').attr("title","subjectId");
        	getSubChildList(subid,themename);
		});	
	var secondobj;
		$('.theme_secondlevel li a').live("click",function(){
			if (secondobj != null) {
    			secondobj.removeClass('item_current');
    		}
    		$(this).addClass('item_current');
        	secondobj = $(this);
        	var secondname=$(this).text();
        	$(".themesecond_checked").show();
        	$('.themesecond_checked em').text(secondname);
        	$('.themesecond_checked em').attr("title","childsubjectId");
		});	
	
	var listul = $("#listul");
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
		//执行查询，展现分页内容
	};
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#Pagination").pagination(totlePage, {
			num_edge_entries: 2,
			num_display_entries: 4,
			callback: pageselectCallback
			//回调函数
		});
	};
	var queryResByPage = function(page) {
		listul.empty();
		var tag = $("#tag").val();
		var subjectId = $("#subjectId").val();
		var childsubjectId = $("#childsubjectId").val();
		//二级主题ID
		if(childsubjectId!=""){
			subjectId= childsubjectId;
		}
		var orgId = $("#orgId").val();
		var orglevel = $("#orglevel").val();
		var fileType = $("#fileType").val();
		var orderType = $("#orderType").val();
		var score = $("#score").val();
		var pageSize = 10; //每页显示条数初始化，修改显示条数，修改这里即可
		//ajax请求，并初始化资源列表
		$.ajax({
			url: resoucrceurl,
			type: "POST",
			data: {
				"tag": tag,
				"subjectId": subjectId,
				"orgId": orgId,
				"orglevel":orglevel,
				"fileType":fileType,
				"orderType":orderType,
				"page": page,
				"pageSize": pageSize,
				"score":score
			},
			success: function(data) {
				if(data){
					data=JSON.parse(data);
					var dataarr = [];
					if(data.records.length >0){
						for (var i = 0; i < data.records.length; i++) {
							var obj = data.records[i];
							dataarr.push("<li><div class='cata_header'><span class='cata_title'><a target='_blank' href='"+contentPath+"catalog/detail.htm?cata_id="+obj.cata_id+"'>" + obj.title + "</a></span><span class='cata_starcon'><span class='cata_starmon' style='width:"+obj.grade*10+"%'></span></span>");
							dataarr.push("<span class='cata_class'>【"+obj.group_name+"】</span></div><div class='cata_body'><div class='cata_left'>");
							dataarr.push("<div class='cata_info'><span>所属部门："+obj.org_name+"</span><span>数量：累计"+obj.data_count+"条数据</span><span>发布时间："+obj.released_time+"</span>");
							dataarr.push("</div><div class='cata_content'>"+obj.description.substring(0,obj.description.length-1).substring(0,80)+"</div></div>");
							dataarr.push("<div class='cata_right'><div class='cata_operate'>");
							dataarr.push("<span class='cata_relnet' rel='"+obj.cata_id+"'><i></i>图谱</span></div><div class='cata_format'>");
							var dataformat=DataFormat[obj.data_format];
							if(dataformat){
								dataarr.push('<span class="cata_'+dataformat+'"></span>');
							}
							dataarr.push("</div></div></div></li>");
						}
						listul.append(dataarr.join(''));
					}
					$(function(){
					    $("span.cata_class").each(function(index, element) {
					        var $this=$(element);
					        var text=$this.text();
					        var length=text.length;
					        if(length > 7)
					        {
					            $this.html(text.substring(0,7)+"...】");
					        }
					    });
					});
					//获取总页码
					$("#record_count").html("共"+data.totalRecord+"个数据集");
					if (page == 1&&data.totalRecord>pageSize) {
						reloadPage(data.totalRecord);
					}else if(page == 1){
						$("#Pagination").empty();
					}
					if(data.records.length <= 0){
						$("#Pagination").html("暂无数据");
						$("#record_count").html("共 0 个数据集");
					}
				}else{
					if (page == 1) {
						$("#Pagination").html("暂无数据");
					}
					$("#record_count").html("共 0 个数据集");
				}
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			}
			
		});
		
	};
	//选中标签
	var linkTypeFilter = function(type, value,name) {
		if(value=="不限") value="";
		if (!type.isEmpty()) {
			$("input[name=" + type + "]").val(value);
		}
		queryResByPage(1);
	};
	//主题选中
	$("#sub-list li").click(function(){
		linkTypeFilter("subjectId",$(this).find("a").attr("rel"),$(this).find("a").html());
	});
	$("#sub-child-list li").click(function(){
		linkTypeFilter("subjectId",$(this).find("a").attr("rel"),$(this).find("a").html());
	});
	$("#tag-list li").click(function(){
		linkTypeFilter("tag",$(this).attr("rel"),$(this).html());
	});
	$("#filetype-top-list li").click(function(){
		linkTypeFilter("fileType",$(this).attr("rel"),$(this).html());
	});
	$("#score-list li").click(function(){
		linkTypeFilter("score",$(this).attr("rel"),$(this).find("a").html());
	});
	
	$("#order-list a").click(function(){
		linkTypeFilter("orderType",$(this).attr("rel"),$(this).find("a").html());
	});
	
	
	
	//初始化
	var sub_val = $("input[name='subjectId']").val();
	var cate_list_index = 0;
	$("#sub-list li").each(function(){
		if($(this).find("a").attr("rel")==sub_val){
			cate_list_index = 1;
			$(this).find("a").click();
		}
	});
	var tag_val = $("input[name='tag']").val();
	$("#tag-top-list li").each(function(){
		tags.push($(this).find("a").attr("rel"));
		if($(this).find("a").attr("rel")==tag_val){
			
		}
	});
	var fileTypeVal = $("input[name='fileType']").val();
	$("#filetype-list li").each(function(){
		if($(this).find("a").attr("rel")==fileTypeVal){
			
		}
	});
	
	var hash;
	hash=window.location.hash; 
	if(hash=="#down"){
		$("#down").trigger("click");
	}
	//组织机构
	$(".depart_first").parent().find("li").click(function(){
		linkTypeFilter("orgId",$(this).find("a").attr("rel"),$(this).find("a").html());
	});
	var stillOver = 0;
	$("#sub-list").children().each(function(index){
		$(this).mouseover(function(){
			stillOver = 1;
			showContent(index);
		});
		$(this).mouseout(function(){
			stillOver = 0;
			hideContent(index);
		});
	});
	var contentBox = $(".midhide").children();
	contentBox.each(function(index){
		$(this).mouseover(function(){
			stillOver = 1;
		});
		$(this).mouseout(function(){
			stillOver = 0;
			hideContent(index);
		});
		$(this).removeClass('chouzhun');
	});

	function showContent(theIndex){
		contentBox.each(function(index){
			if (index == theIndex) {
				return true;
			}
			else
			{
				$(this).removeClass('chouzhun');
			}
		});
		contentBox.eq(theIndex).addClass('chouzhun');
		
	}
	function hideContent(theIndex){
		setTimeout(function(){
			if (stillOver == 0) {
				contentBox.eq(theIndex).removeClass('chouzhun');
			}
			
		},'1000');
		
	}
	
	function getOrg(index){
		var listorg="";
		if(index==1){
			 listorg = $("#A-G");
		}
		if(index==2){
			 listorg = $("#H-N");
		}
		if(index==3){
			 listorg = $("#O-T");
		}
		if(index==4){
			 listorg = $("#U-Z");
		}
		$.ajax({
			url: orgUrl,
			type: "POST",
			data: {
				"value": index			
			},
			success: function(data) {
				if(data!=""&&data!=null){
					var dataarr = new Array();
					for (var i = 0; i < data.length; i++) {
						var obj = data[i];
						dataarr.push("<li><a rel='"+obj.org_code+"'>"+obj.general_code+"</a></li>");
					}
				}
				listorg.parent().append(dataarr.join(''));
				
				listorg.parent().find("li").bind("click",function(){
					linkTypeFilter("orgId",$(this).find("a").attr("rel"),$(this).find("a").html());
					}); 
				
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
	    });
	}
	getOrg(1);
	getOrg(2);
	getOrg(3);
	getOrg(4);
	function getSubChildList(subid,themename){
		var listul=$("#sub-child-list");
		listul.empty();
		$.ajax({
			url: subChildUrl,
			type: "POST",
			data: {
				"subid": subid			
			},
			success: function(data) {
				if(data!=""&&data!=null){
					var dataarr = new Array();
					for (var i = 0; i < data.length; i++) {
						var obj = data[i];
						dataarr.push("<li><a rel='"+obj.id+"'>"+obj.name+"</a></li>");
					}
				}
				listul.append(dataarr.join(''));
				$("#theme-name").html(themename);
				listul.find("li").bind("click",function(){
					linkTypeFilter("childsubjectId",$(this).find("a").attr("rel"),$(this).find("a").html());
					}); 
				
			},
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
	    });
	}

	/*删除已选项事件*/
		$('.checked_item i').live("click",function(){
			$(this).parent().hide();
			$(this).prev().text('');
			var itemname=$.trim($(this).parent().text());
			var type = $(this).parent().find("em").attr("title");
			$("input[name=" + type + "]").val("");
			if(type=="fileType"){
				$("#filetype-list li").removeClass('current');
				$("#filetype-top-list li").eq(0).addClass("current");
				$("#filetype-top-list li").eq(0).siblings().removeClass('current');
			}else if(type=="tag"){
				$("#tag-list li").removeClass('current');
				$("#tag-top-list li").eq(0).addClass("current");
				$("#tag-top-list li").eq(0).siblings().removeClass('current');
			}else if(type=="subjectId"){
				$("#sub-list li").removeClass('current');
			}else if(type=="score"){
				$("#score-list li").removeClass('current');
			}
			if(itemname=='标签：'){
				$('.tag_list li').removeClass('item_current');
				$('.tag_list li').eq(0).addClass('item_current');
				$("input[name='tag']").val('');
			}
			if(itemname=='格式：'){
				$('.format_list li').removeClass('item_current');
				$('.format_list li').eq(0).addClass('item_current');
				$("input[name='fileType']").val('');
			}
			if(itemname=='评级：'){
				$('.grade_list li').removeClass('item_current');
				$('.grade_list li').eq(0).addClass('item_current');
				$("input[name='score']").val('');
			}
			if(itemname=='一级主题：'){
				$('.theme_checked').hide();
				$('.theme_secondlevel').hide();
				$('.theme_secondlevel ul li a').removeClass('item_current');
				$('.theme_firstlevel').show();
				$('.theme_firstlevel li a').removeClass('item_current');
				$("input[name='subjectId']").val('');
				$("input[name='childsubjectId']").val('');
			}
			if(itemname=='二级主题：'){
				$('.theme_secondlevel ul li a').removeClass('item_current');
				$('.depart_checked').hide();
				$('.theme_viewmore').show();
				$("input[name='childsubjectId']").val('');
			}
			if(itemname=='部门：'){
				$("#depa-list li").removeClass("item_current");
				$("input[name='orgId']").val('');
			}
			if(itemname=='一级主题：'||itemname=='部门：'||itemname=='二级主题：'){
				if(($('.theme_checked').css('display')=='none')&&($('.depart_checked').css('display')=='none')){
					$('.cate_list li').removeClass('item_current');
					$('.cate_list li').eq(0).addClass('item_current');
					$('.catalog_checked').children().hide();
					$('.item_themelist').hide();
					$('.item_departlist').hide();
				}
			}
			var countobj=0;
			$('.checked_item').each(function(){
				var displayobj=$(this).css('display');
				if(displayobj!='none'){
					countobj++;
				}else{
					
				}
			});
			if(countobj==0){
				$('.catalog_checked').children().hide();
			}
			queryResByPage(1);
		});
		var cateobj;
		$('.cate_list li').live("click",function(){
				if (cateobj != null) {
	    			cateobj.removeClass('item_current');
	    		}
	    		$(this).addClass('item_current');
	        	cateobj = $(this);
	        	var catename=$.trim($(this).text());
	        	if(catename=='推荐'){
	        		$('.item_themelist').slideUp();
	        		$('.item_departlist').slideUp();
	        		$(".theme_checked").hide();
	        		$('.theme_checked em').text('');
	        		$(".themesecond_checked").hide();
	        		$('.themesecond_checked em').text('');
	        		$(".depart_checked").hide();
	        		$('.depart_checked em').text('');
	        		$('.theme_firstlevel').show();
					$('.theme_viewmore').show();
					$('.theme_secondlevel').hide();
					$('.item_themelist ul li a').removeClass('item_current');
					$('.item_departlist ul li').removeClass('item_current');
					$('.checked_item').hide();
					$('.catalog_checked').children().hide();
					$("input[name='childsubjectId']").val('');
					$("input[name='orgId']").val('');
					queryResByPage(1);
	        	}
	        	else if(catename=='主题'){
	        		$(this).siblings().removeClass('item_current');
	        		$(this).addClass("item_current");
	        		$('.item_departlist').hide();
	        		$('.item_themelist').show();
	        		var h=$('.item_main').eq(0).height();
	        	}
	        	else if(catename=='机构'){
	        		$(this).siblings().removeClass('item_current');
	        		$('.item_themelist').hide();
	        		$('.item_departlist').show();
	        		var h=$('.item_main').eq(0).height();
	        	}
		});
		$('.cate_list li').eq(cate_list_index).click();
	/*清除已选属性*/
	$('.checked_operation').live("click",function(){
		$('.checked_item em').text('');
		$('.checked_item').hide();
		$('.catalog_checked').children().hide();
		$('.item_content ul li a').removeClass('item_current');
		$('.item_content ul li').removeClass('item_current');
		$('.cate_list li').eq(0).addClass('item_current');
		$('.tag_list li').eq(0).addClass('item_current');
		$('.format_list li').eq(0).addClass('item_current');
		$('.grade_list li').eq(0).addClass('item_current');
		$("input[type='hidden']").val("");
		$('.cate_list li').eq(0).click();
	});
	$(function(){
	    $(window).scroll(function(){
	        if($(window).scrollTop()>100){
	            $("#gototop").css("display",'block');
	        }else{
	            $("#gototop").css("display",'none');
	        }
	 
	    });
	});
	function goTop(){
	    $(window).scrollTop(1);
	}
	//数据指数链接处理
	if(tag_html!=''){
			$('.catalog_checked').children('.checked_default').show();
    		$(".tag_checked").show();
    		$('.tag_checked em').text(tag_html);
    		$('.tag_checked em').attr("title","tag");
			$('li[rel='+tag_html+']').click();
	}
});
