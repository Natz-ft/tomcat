$(function () {
	//点击选择添加到右侧
	$("#addList li > span[class='rela_plus']").live("click",function(){
		var count = $("#minuList li").length;
		if(count < 5){
			var str = $(this).parent().children().next().html();
			var leftId = $(this).parent().children().next().children().attr("id");
			var ids = "";
			if(count > 0){
				$("#minuList li").each(function(){
					var id = $(this).find("a").children("span").attr("id");
					ids = ids + id +",";
				});
			}
			if(ids.indexOf(leftId, 0) > -1){
				easyDialog.open({
					container : {
						content : '添加数据目录重复'
					},
					autoClose : 2000
				});
			}else{
				if(count  == 0){
					var fatalData = '<li><span class="rela_minu_main"></span><span class="rela_dataico dataico0">主数据集</span><a href="javaScript:void(0)">'+str+'</a></li>';
					$("#minuList").append(fatalData);
				}else{
					var commonData = '<li><span class="rela_minu"></span><a href="javaScript:void(0)">'+str+'</a><span class="rela_lead">设为主集</span></li>';
					$("#minuList").append(commonData);
				}
				count = $("#minuList li").length;
				$("#addable").html(5-count);
			}
		}else{
			easyDialog.open({
				container : {
					content : '最多选取5个数据目录'
				},
				autoClose : 2000
			});
		}
	});
	//设置还可以添加多少个数据集
	$("#minuList li > span[class='rela_minu']").live("click",function(){
		$(this).parent().remove();
		var count = $("#minuList li").length;
		$("#addable").html(5-count);
	});
	
	$("#minuList li > span[class='rela_minu_main']").live("click",function(){
		var count = $("#minuList li").length;
		if(count > 1){
			var html = $(this).parent().next().find("a").html();
			$(this).parent().next().remove();
			$(this).parent().find("a").html(html);
		}else{
			$(this).parent().remove();
			var count = $("#minuList li").length;
			$("#addable").html(5);
		}
	});
	
	//设置为主题目录显示动画
	$(".rela_rmain ul li").live("mouseover",function(event){
		$(this).children(".rela_lead").animate({width:'50px'});
	});
	
	//设置为主题目录隐藏动画
	$(".rela_rmain ul li").live("mouseleave",function(event){
		$(this).children(".rela_lead").animate({width:'0px'});
	});
	
	//设置主数据集
	$("#minuList li > span[class='rela_lead']").live("click",function(){
		var firstStr = $("#minuList li").first().children().next().next().html();
		var replaceStr = $(this).parent().children().next().html();
		$("#minuList li").first().children().next().next().html(replaceStr);
		$(this).parent().children().next().html(firstStr);
		$(this).html("设为主集");
	});
});