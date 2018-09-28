

/*新增JS内容*/

function addinfo(obj,n){//左边浮动框点击添加到右边的功能
	_this = $(obj);
	var dataname=_this.parent('#place'+n).text();//获取点击的数据项名称
	var datatitle=_this.parents('.bzbody').siblings('.bztitle').text();//获取点击的数据项所在数据集名称
	var samebztitle=0;
	var samebzdata=0;
	$(".bznavlist ul li .tname").each(function(){//遍历检查是否已存在该数据集
		if($(this).text()==datatitle){//若已存在该数据集，遍历检查是否已存在该数据项
			samebztitle=1;
			$(this).parents('.bznavtitle').siblings('.bznavbody').children().children('.lname').each(function(){
				if($(this).text()==dataname){//若已存在该数据项，进行标记
					samebzdata=1;
					var count_label=$(this).parents('.bznavbody').children('label').length;
					if(count_label==1){
						$(this).parents('.bznavbody').parent().remove();//若是最后一个，在已选列表中删除整个数据集
					}
					$(this).parent('label').remove();//若已存在该数据项，将其删除
					var count_li=$('.bznavlist ul li').length;
					if(count_li==0){
						$('.bznavlist ul').text('当前没有选择的数据项');
					}
					
				}
			});
			if(samebzdata==0){//若不存在该数据项，检查数据集内有几个数据项，有一个则添加进去，有两个提示不能添加
				var label_count=$(this).parent('.bznavtitle').siblings('.bznavbody').children('label').length;
				if(label_count==2){
					_this.removeAttr("checked");
					alert('每个数据集最多只能选择两个数据项');
					return false;
				}
				var prev_class=$(this).parent('.bznavtitle').siblings('.bznavbody').children('label:last').children('i').attr("class");//获取前一个label内i标签的类名
				var i_count = prev_class.slice(28);
				if(i_count=='01'){
					i_count='02';
				}
				else if(i_count=='02'){
					i_count='01';
				}
				else if(i_count=='11'){
					i_count='12';
				}
				else if(i_count=='12'){
					i_count='11';
				}
				else if(i_count=='21'){
					i_count='22';
				}
				else if(i_count=='22'){
					i_count='21';
				}//选择定位图标的颜色
				$(this).parent('.bznavtitle').siblings('.bznavbody').append('<label><i class="iconfont icon-weizhi labelbg'+i_count+'"></i><span class="lname">'+dataname+'</span><span class="lremove">删除</span></label>');
			}
		}
	});
	if(samebztitle==0){//若不存在该数据集，添加新的数据集
		if($('.bznavlist ul').text()=='当前没有选择的数据项'){
			$('.bznavlist ul').text('');
		}
		if($('.bznavlist ul li').length==3){
			_this.removeAttr("checked");
			alert('最多只能选择三个数据集');
			return false;
		}
		$('.bznavlist ul').append('<li><div class="bznavtitle"><span class="tname">'+datatitle+'</span><span class="tremove">取消</span></div><div class="bznavbody"><label><i class="iconfont icon-weizhi labelbg'+$('.bznavlist ul li').length+'1"></i><span class="lname">'+dataname+'</span><span class="lremove">删除</span></label></div></li>');
		
	}
}


//**********生成左边的浮动框****************
$(function () {
var liobj;
$(".bzbtnadd").live("click",function(){
	var bzname=$(this).siblings('.listtitle').text();//获取点击的数据集名称
	var ptop = $(this).parent().parent().offset().top ;//计算所点击按钮所在li到窗口顶部距离
	var pleft= $(this).parent().parent().offset().left + 320;//计算浮动框到窗口左边的距离
	var footertop= $('.footer-wrap').offset().top ;//计算页脚到窗口顶部距离
	if($(".bzmodal").length>0){
		$('.bzbody ul').empty();
	}//若存在浮动框，内容替换
	else{
		$('body').append("<div class='bzmodal'><div class='bztitle'></div><div class='subtitle'>请选择数据项进行标注：</div><div class='bzbody'><ul></ul></div></div>");
	}//不存在则生成浮动框
	$('.bztitle').text(bzname);//数据集名称
	for (var m=1 ; m<=10; m++){
		$(".bzbody ul").append('<li><label id="place'+m+'" ><input type="checkbox" onclick="addinfo(this,'+m+')">企业地址'+m+'</label></li>');
	}//添加左边浮动框列表内容
	
	var samebztitle=0;
	$(".bznavlist ul li .tname").each(function(){//遍历检查是否已选该数据集
		if($(this).text()==bzname){
			samebztitle=1;
			$(this).parent('.bznavtitle').siblings('.bznavbody').children('label').children('.lname').each(function(){
				var checkedname=$(this).text();
				$(".bzbody ul label").each(function(){
					if($(this).text()==checkedname){
						$(this).children().attr("checked", true);
					}
				});
			});
		}
	});
	var modalheight=$('.bzmodal').height()+12;//计算浮动框高度 加上padding的10px和border的2px
	var ulheight=$('.schlist').offset().top + $('.schlist').height();//计算列表底部到窗口顶部的距离
	if((modalheight+ptop)>footertop){
		if((ptop+96)>ulheight){
			ptop = $(this).offset().top + 20 - modalheight;
		}
		else{
			ptop = $(this).parent().parent().offset().top + 96 - modalheight;
		}
	}//浮动框位置调整，保证不会覆盖到页脚
	$('.bzmodal').attr("style","top:"+ptop+"px;left:"+pleft+"px;display:none");//浮动框位置赋值
	$(this).parent().parent().siblings('li').removeClass('active');
	$(this).parent().parent().addClass('active');//添加选中效果
	$('.bzmodal').slideDown();//显示浮动框


	//鼠标离开元素点击或滚动后 浮动框消失
	var mark;
	$('.schlist').mouseover(function(event) {
		mark=1;
	});
	$('.schlist').mouseleave(function(event) {
		mark=0;
	});
	$('.bzmodal').mouseover(function(event) {
		mark=1;
	});
	$('.bzmodal').mouseleave(function(event) {
		mark=0;
	});
	$('.shouqi').click(function(){ 
		if(mark==0){
			$(".bzmodal").slideUp();
			$('.newschlist li').removeClass('active');
		}
	});
	$(document).click(function(){ 
		if(mark==0){
			$(".bzmodal").slideUp();
			$('.newschlist li').removeClass('active');
		}
	});
	$('.schlist').scroll(function(){
		$(".bzmodal").slideUp();
		$('.newschlist li').removeClass('active');
	});//鼠标离开元素点击或滚动后 浮动框消失

});




//***********以下为已标注列表操作**************
$('.bzbtn').click(function(event) {
	$('.bznavlist').slideToggle();
});
$('.lname').live("click",function(){//点击切换到该数据集的该数据项列表
	var title=$(this).parents('.bznavbody').siblings('.bznavtitle').children('.tname').text();
	var i_color=($(this).siblings('i').css('color'));//获取定位图标的颜色，设置给左侧列表的图标
	$('.mainlist').hide();
	$('.datalist').show();
	$('.datalist i').css('color',i_color);
	$('.ultitle').html('<a class="listchecked" id="schlb" title="'+title+'">'+title+'</a><span title="'+$(this).text()+'">&nbsp;-&nbsp;'+$(this).text()+'</span><div>返回</div>')
});
$('.ultitle div').live("click",function(){//返回
	$('.mainlist').show();
	$('.datalist').hide();
	$('.ultitle').html('<a class="listchecked" id="schlb">列表明细</a>');
});

$("#checklist").hide();
$("#schlb").click(function(){
	$("#schlist").show();
	$("#checklist").hide();
	$("#schlb").addClass('listchecked');
	$("#chelb").removeClass('listchecked');
});
$("#chelb").click(function(){
	$("#schlist").hide();
	$("#checklist").show();
	$("#schlb").removeClass('listchecked');
	$("#chelb").addClass('listchecked');
});

$(".userxz").mouseover(function(){
  $(".downlist").show();
});
$(".userxz").mouseleave(function(){
  $(".downlist").hide();
});




//选项卡切换BEGIN
$("#sy_xinwen").hide();
$("#sy_titlegonggao").addClass('sy_notitleborder');
$("#sy_titlegonggao").mouseover(function () {
	$("#sy_titlegonggao").addClass('sy_notitleborder');
	$("#sy_titlexinwen").removeClass('sy_notitleborder');
	$("#sy_gonggao").show();
	$("#sy_xinwen").hide();
});
$("#sy_titlexinwen").mouseover(function () {
    $("#sy_titlexinwen").addClass('sy_notitleborder');
    $("#sy_titlegonggao").removeClass('sy_notitleborder');
    $("#sy_xinwen").show();
    $("#sy_gonggao").hide();
});
//选项卡切换END

$(".sy_caro2").hide();
$(".sy_caro3").hide();
var tempObj;
var obj = $(".sy_carouselbutton div");
    obj.each(function(){
  
    if($(this).index()==0){
    	$("#sy_lunbobg").removeClass('sy_lunbobg2');
    	$("#sy_lunbobg").removeClass('sy_lunbobg3');
    	$("#sy_lunbobg").addClass('sy_lunbobg1');
    }
    else if($(this).index()==1){
    	$("#sy_lunbobg").removeClass('sy_lunbobg1');
    	$("#sy_lunbobg").removeClass('sy_lunbobg3');
    	$("#sy_lunbobg").addClass('sy_lunbobg2');
    }
    else if($(this).index()==2){
    	$("#sy_lunbobg").removeClass('sy_lunbobg1');
    	$("#sy_lunbobg").removeClass('sy_lunbobg2');
    	$("#sy_lunbobg").addClass('sy_lunbobg3');
    }
    return false;
    });

    obj.eq(0).click();

  

$("#sy_button1").click(function() {
	$(this).removeClass().addClass("sy_carouchecked");
	$("#sy_button2").removeClass().addClass("sy_carouncheck");
	$("#sy_button3").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro2").fadeOut(500);
    $(".sy_caro3").fadeOut(500);
    $(".sy_caro1").fadeIn(500);
});
$("#sy_button2").click(function() {
	$(this).removeClass().addClass("sy_carouchecked");
	$("#sy_button1").removeClass().addClass("sy_carouncheck");
	$("#sy_button3").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro1").fadeOut(500);
    $(".sy_caro3").fadeOut(500);
    $(".sy_caro2").fadeIn(500);
});
$("#sy_button3").click(function() {
	$(this).removeClass().addClass("sy_carouchecked");
	$("#sy_button1").removeClass().addClass("sy_carouncheck");
	$("#sy_button2").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro1").fadeOut(500);
    $(".sy_caro2").fadeOut(500);
    $(".sy_caro3").fadeIn(500);
});


$(".dtfw_mainlb").hide();
$("#mapTab > li").click(function(){
	if(0 == $(this).index()){
		$("#maptab_li1").removeClass("lb2");
		$("#maptab_li1").addClass("lb1");
		$("#maptab_li2").removeClass("lb1");
		$("#maptab_li2").addClass("lb2");
		$(".dtfw_main").show();
		$(".dtfw_mainlb").hide();
		$(".dtfw_ztfl").show();
		$("#alreadySelected").hide();
		$("#pager").remove();
	}else{
		$("#maptab_li2").removeClass("lb2");
		$("#maptab_li2").addClass("lb1");
		$("#maptab_li1").removeClass("lb1");
		$("#maptab_li1").addClass("lb2");
		$(".dtfw_main").hide();
		$(".dtfw_mainlb").show();
		$("#pager").remove();
	}
});
$("#alreadySelected").hide();


$(".dtfw_ztfl ul li a ").live("click",function(){
	var dtfw_mainleft=$("#dtfw_mainleft");
	dtfw_mainleft.append("<div class='pageye'><div id='pager' class='pagination'></div></div>");
	
});

$("#dtlb_ul li").live("click",function(){
	if($(this).find(".miaoshu").is(':hidden')){
		$(this).find(".miaoshu").show();
	}else{
		$(this).find(".miaoshu").hide();
	}
	$(this).siblings().find(".miaoshu").hide();
});
var fscrn=0;
$("#fscreen").click(function(){
	if(fscrn==0){
		$(".dtfw_mainright").addClass("fullscreen");
		$("#dituContent").addClass("fullscreen1");
		$("#fscreen a").text("退出全屏");
		fscrn=1;
	}
	else{
		$(".dtfw_mainright").removeClass("fullscreen");
		$("#dituContent").removeClass("fullscreen1");
		$("#fscreen a").text("全屏显示");
		fscrn=0;
	}
});


$("#shouqi").click(function(){
	$(".dtfw_mainright").toggleClass("mapwidth");
	$("#dituContent").toggleClass("mapwidth");
	
	$(".dtfw_mainleft").slideLeftToggle(1);
    $("#shouqi").toggleClass("shouqi");
	$("#shouqi").toggleClass("shouqi2") ;  
	$("#arrow").toggleClass("arrow");
	$("#arrow").toggleClass("arrow2") ;	
		return false;
	
});

});

/*$("#search").click(function(){
	var page =1;
	var mapSearchKey = $("#mapSearchKey").val();
	if(mapSearchKey.isEmpty() || null == mapSearchKey || "" == mapSearchKey || typeof(mapSearchKey) == undefined){	
		easyDialog.open({
			container : {
				content : "搜索关键字不能为空"
			},
			autoClose : 2000
		});
		return false;
	}
	$("#keyWord").val(mapSearchKey);
	searchMap(mapSearchKey,1);
	$("#alreadySelected").show();
});

function searchMap(mapSearchKey,page){
	$.ajax({
		url: searchUrl,
		type: "POST",
		data: {
			"searchKey":mapSearchKey,
			"searchType":1,
			"pageNum": page,
			"type":1
		},
		success: function(data) {
			
			if(data!=""&&data!=null){
				var dataarr = new Array();
				$("#res_record").html(data.totalRecord);
				for (var i = 0; i < data.records.length; i++) {
					var obj = data.records[i];
					if(selectArr.indexOf(obj.cata_id)<0){
						dataarr.push("<li><div><a title=\""+obj.title+"\" class=\"listtitle\" href=\"/data-portal/catalog/detail.htm?cata_id="+obj.id+"\">"+obj.title+"</a><span class=\"starcon\"><span style=\"width:"+obj.grade*10+"%\" class=\"starmon\"></span></span><span id=\""+obj.id+"\" class=\"schbtn schbtnadd listuser\"><i class=\"dj\"></i>叠加</span></div>");
						dataarr.push("<div class='listdetail'>"+obj.description+"</div> ");
						var markerimg = getCatalogMarker(obj.id);
						if(markerimg!=null){
							dataarr.push("<img src='"+markerimg+"'></li>");
						}else{
							dataarr.push("</li>");
						}
						
					}
				}
				$("#schlist").html(dataarr.join(''));
				//获取总页码
				if (page == 1) {
					searchreloadPage(data.totalRecord);
				}
			}
			else{
				if (page == 1) {
					searchreloadPage(0);
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
}*/