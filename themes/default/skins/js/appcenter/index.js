/**
 * Created by longhongwen on 2016/10/18.
 */
var pageSize = 8;
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
    		$("input[name=groupId]").val($(this).find("a").attr("rel"));
    		queryResByPage(1);
        });
	});
    //清除属性
    $(".selected-empty").click(function(){
		$("input[name=groupId]").val("");
		queryResByPage(1);
	});
   //实现enter键搜索的功能
    $("#dataKey").keydown(function(event){
    	if(event.which == "13")    
    		queryResByPage(1);
    });
   //清除属性
    $(".iconfont").click(function(){
    	$("input[name=groupId]").val("");
		queryResByPage(1);
	});
    //综合排序
    $(".sort-list ul li").click(function(){
    	var rel = $(this).attr("rel");
    	if("hotEst"==rel || "zh"==rel ){
    		$("input[name=oderlist]").val(1);
    	}else if("newEst"==rel){
    		$("input[name=oderlist]").val(2);
    	}else if("scorEst"==rel){
    		$("input[name=oderlist]").val(3);
    	}
		
		queryResByPage(1);
	});
});

//应用列表
function queryResByPage(page) {
	dialog.loading({text:'加载中',parent:$('#cata-main')});
	var listul = $("#app-list");
	listul.empty();
	var groupId = $("#groupId").val();
	var oderlist = $("#oderlist").val();
	var searchKey = $("#dataKey").val();
	$.ajax({
		url: appUrl,
		type: "POST",
		async: false,
		data: {
			"pageSize": pageSize,
			"page": page,
            "groupid":groupId,
            "oderlist":oderlist,
            "searchKey":searchKey
		},
		success: function(data) {
			$('#cata-main>.dialog-loading').modal('hide');
			if(data){
				data=JSON.parse(data);
				var dataarr = [];
				if(data.records.length >0){
					for (var i = 0; i < data.records.length; i++) {
						var obj = data.records[i];
						var logo = obj.app_icon;
						
						if(logo!=null&&logo!=null){
							logo = web_doc+logo;
						}
						
						var description = "";
						if(obj.description != null){
							description = obj.description.substr(0,68);
						}
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
                            	dataarr.push(" <li onclick=\"cancleCollection('"+obj.app_id+"',3)\" style='color:#DAA520'><i class='iconfont'>&#xe691;</i></li>");
                            }else{
                            	dataarr.push(" <li onclick=\"collection('"+obj.app_id+"',3,'"+obj.app_name+"')\"><i class='iconfont'>&#xe691;</i></li>");
                            }
							if(obj.pc!=null){
								var pcdownfile = downloadFile+"&fileType=share_app_data&fileId="+obj.pc;
								dataarr.push("<li><a href='"+pcdownfile+"' target='_blank'><i class='iconfont'>&#xe67f;</i></a></li>");
							}else{
								dataarr.push("<li><a  target='_blank' style='color: #7b7c7d'><i class='iconfont'>&#xe67f;</i></a></li>");
							}
							if(obj.android!=null){
								var downfile = downloadFile+"&fileType=share_app_data&fileId="+obj.android+"&app_id="+obj.app_id;
								var downfileUrl = downloadFileUrl+"&fileType=share_app_data&fileId="+obj.android+"&app_id="+obj.app_id;
								dataarr.push("<li><a href='"+downfile+"' target='_blank'><span onMouseOut='hideImg(\""+obj.android+":"+obj.feature_id+"\")' onmouseover='showImg(\""+obj.android+":"+obj.feature_id+"\")'><i class='iconfont'>&#xe6c6;</i></span></a></li>");
								dataarr.push("<input type='hidden' name='docids' value='"+obj.android+":"+obj.feature_id+"'>");
								dataarr.push("<input type='hidden' id='androidadds"+obj.android+"' onclick='appdownUse(\""+downfileUrl+"\",\""+obj.feature_id+"\",\""+obj.app_id+"&app_id="+obj.app_id+"\")' value='"+downfileUrl+"'>");
								dataarr.push("<div id='wxImg"+obj.android+":"+obj.feature_id+"' style='display:none;height:50px;back-ground:#f00;position:absolute;margin-left: 200px'></br></div>");
							}else{
								dataarr.push("<li><a  target='_blank' style='color: #7b7c7d'><span><i class='iconfont'>&#xe6c6;</i></span></a></li>");
							}
							if(obj.ios!=null){
								dataarr.push("<li><a href='"+obj.ios+"' target='_blank'><i class='iconfont'>&#xe6d8;</i></a></li>");
							}else{
								dataarr.push("<li><a  target='_blank' style='color: #7b7c7d'><i class='iconfont'>&#xe6d8;</i></a></li>");
							}
							if(obj.inner!=null){
								var downfile = downloadFile+"&fileType=share_app_data&fileId="+obj.inner+"&app_id="+obj.app_id;
								dataarr.push("<li><a href='"+obj.inner+"' target='_blank'><i class='iconfont'>&#xe637;</i></a></li>");
							}else{
								dataarr.push("<li><a  target='_blank' style='color: #7b7c7d'><i class='iconfont'>&#xe637;</i></a></li>");
							}
							if(obj.outter!=null){
								dataarr.push("<li><a href='"+obj.outter+"' target='_blank'><i class='iconfont'>&#xe651;</i></a></li>");
							}else{
								dataarr.push("<li><a  target='_blank' style='color: #7b7c7d'><i class='iconfont'>&#xe651;</i></a></li>");
							}
						    dataarr.push("</ul>");
						dataarr.push("</div>");
						dataarr.push("<div class='item-title'><a href='"+contentPath+"detail.htm?app_id="+obj.app_id+"' target='_blank'>"+obj.app_name+"</a></div></div>");
						dataarr.push("<div class='item-body'><div class='item-info'>");
						if(obj.developer_name!=null&&obj.developer_name!=""){
							dataarr.push("<div class='item-theme'>发布者："+obj.developer_name+"</div>");
						}
						dataarr.push("<div class='item-text'>");
						dataarr.push("<span>发布时间："+obj.updatetime+"</span></div><div class='item-text'><span>下载次数：");
						if(obj.use_amount==null||obj.use_amount==''||obj.use_amount=='null'){
							dataarr.push("0");
						}else{
							dataarr.push(obj.use_amount);
						}
						dataarr.push("次</span></div><div>"+description+"</div></div></div></div>");
						dataarr.push("</li>");
						//li结束
						dataarr.push("</li>");
					}
					
					listul.append(dataarr.join(''));
					imgcode();
				}
				//获取总页码
				$("#sort-sum").html("共"+data.totalRecord+"个应用");
				if (page == 1&&data.totalRecord>pageSize) {
					reloadPage(data.totalRecord);
				}else if(page == 1){
					$("#Pagination").empty();
				}
				if(data.records.length <= 0){
					$("#Pagination").html("暂无数据");
					$("#sort-sum").html("共0个应用");
				}
			}else{
				if (page == 1) {
					$("#Pagination").html("暂无数据");
				}
				$("#sort-sum").html("共0个应用");
			}
		},
		error: function(data) {
  			dialog.info('应用列表数据请求失败，请稍后重试',function(){},3000);
  			$('#app-list>.dialog-loading').modal('hide');
		}
	});
}

//创建分页元素
function reloadPage(totlePage) {
	$("#Pagination").pagination(totlePage, {
		items_per_page:8,
		num_edge_entries: 2,
		num_display_entries: 4,
		items_per_page: pageSize,
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

function appdownUse(downurl,feature_id,app_id){
	window.localtion.href = downurl;
	$.ajax({
		url: downAppUse,
		type: "POST",
		data: {
			"feature_id": feature_id,
			"app_id": app_id
		},
		success: function(data) {
		}
	});
}