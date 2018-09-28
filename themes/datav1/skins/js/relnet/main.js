$(function () {
	$(".ico_all").click(function(event) {
		$(".ico_depart").removeClass('depart_on');
		$(".ico_indus").removeClass('indus_on');
		$(".ico_all").addClass('all_on');
		$("#subType").val('0');
		$("input[name='sjtp_check']:eq(0)").click();
	});
	$(".ico_depart").live("click",function() {
		$(".ico_all").removeClass('all_on');
		$(".ico_indus").removeClass('indus_on');
		$(".ico_depart").addClass('depart_on');
		$("#subType").val('1');
		$("input[name='sjtp_check']:eq(1)").click();
	});
	$(".ico_indus").click(function(event) {
		$(".ico_all").removeClass('all_on');
		$(".ico_depart").removeClass('depart_on');
		$(".ico_indus").addClass('indus_on');
		$("#subType").val('2');
		$("input[name='sjtp_check']:eq(2)").click();
	});

    var i=1;
    $("#sjtp_hide").click(function(event) {
        if (i==1) {
            $(".sjtp_right").animate({width:"0px"});
            $(".sjtp_main").animate({left:"180px"});
            i=0;
        }
        else {
            $(".sjtp_right").animate({width:"274px"});
            $(".sjtp_main").animate({left:"0px"});
            i=1;
        }
        $("#sjtp_hide").toggleClass('hidebtn');
    });
    
    $("#relnetSearch").click(function(){
    	var page =1;
    	var searchKey = $("#relnetSearchKey").val();
    	if(searchKey.isEmpty() || null == searchKey || "" == searchKey || typeof(searchKey) == undefined){	
    		easyDialog.open({
    			container : {
    				content : "搜索关键字不能为空"
    			},
    			autoClose : 2000
    		});
    		return false;
    	}
    	relnetSearch(searchKey,1);
    	$("#preRelnetSearchKey").val(searchKey);
    });
	
	$('#list_xg_tag').click(function(){
		$('#relalist').show();
		$('#searchlist').hide();
		$(this).addClass('right_listlabel-1').removeClass('right_listlabel-2');
		$('#list_search_tag').addClass('right_listlabel-2').removeClass('right_listlabel-1');
	});	
	$('#list_search_tag').click(function(){
		$('#relalist').hide();
		$('#searchlist').show();
		$(this).addClass('right_listlabel-1').removeClass('right_listlabel-2');
		$('#list_xg_tag').addClass('right_listlabel-2').removeClass('right_listlabel-1');
	});

});


function relnetSearch(searchKey,page){
	
	$("#list_search_tag").removeClass("right_listlabel-2");
	$("#list_xg_tag").removeClass("right_listlabel-2");
	$("#list_search_tag").addClass("right_listlabel-1");
	$("#list_xg_tag").addClass("right_listlabel-2");
	
	var pageSize = 10; //每页显示条数初始化，修改显示条数，修改这里即可
	$.ajax({
		url: relentSearchUrl,
		type: "POST",
		data: {
			"searchKey":searchKey,
			"searchType":1,
			"pageNum": page
		},
		success: function(data) {
			$("#relalist").empty();
			if(data!=""&&data!=null){
				var arry_list = new Array();
				//赋值子标签信息
				for (var i = 0; i < data.records.length; i++) {
					var obj = data.records[i];
					arry_list.push("<li rel='"+obj.id+"'><span>"+obj.title+"</span><a href='"+contentPath+"catalog/detail.htm?cata_id="+obj.id+"'>详情</a></li>");
				}
				$("#relalist").append(arry_list.join(''));
				if (page == 1&&data.totalRecord>pageSize) {
					searchreloadPage(data.totalRecord);
				}else if(page == 1){
					$("#Pagination").empty();
				}
			}else{
				if (page == 1) {
					$("#Pagination").html("暂无数据");
					//reloadPage(0);
				}
			}
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
};

var searchreloadPage = function(totlePage) {
	$("#Pagination").pagination(totlePage, {
		num_display_entries: 5,
		items_per_page:10,
		callback: relnetSearchCallBack
		//回调函数
	});
};
var relnetSearchCallBack = function(page_id, jq){
	var searchKey = $("#preRelnetSearchKey").val();
	relnetSearch(searchKey,page_id + 1);
}


	
