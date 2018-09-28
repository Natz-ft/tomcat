$(function () {

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

  
var obj = setInterval("mround()",3000);

$("#sy_button1").click(function() {
	$(this).removeClass().addClass("sy_carouchecked");
	$("#sy_button2").removeClass().addClass("sy_carouncheck");
	$("#sy_button3").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro2").fadeOut(500);
    $(".sy_caro3").fadeOut(500);
    $(".sy_caro1").fadeIn(500);
    obj = setInterval('mround()',3000);
});
$("#sy_button2").click(function() {
	$(this).removeClass().addClass("sy_carouchecked");
	$("#sy_button1").removeClass().addClass("sy_carouncheck");
	$("#sy_button3").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro1").fadeOut(500);
    $(".sy_caro3").fadeOut(500);
    $(".sy_caro2").fadeIn(500);
    obj = setInterval('mround()',3000);
});
$("#sy_button3").click(function() {
	$(this).removeClass().addClass("sy_carouchecked");
	$("#sy_button1").removeClass().addClass("sy_carouncheck");
	$("#sy_button2").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro1").fadeOut(500);
    $(".sy_caro2").fadeOut(500);
    $(".sy_caro3").fadeIn(500);
    obj = setInterval('mround()',3000);
});

	//应用排行
	$("#appList  li").click(function(){
		$("#appList  li").each(function (){
				$(this).html("<img src='img/ico_"+($(this).index()+1)+".png' alt=''><a href='#'><strong>停车场名录</strong></a><div class='ssym_xzphico'><span class='gray'>1234次</span></div>");
			});
		var count = $(this).index();
		 $("#appList  li").eq(count).html("<img src='img/ico_"+(count+1)+".png' alt='' align='middle'><img src='img/ico_tjzy1.png' width='45' height='45' align='middle'><div class='yyphtitle'><a href='#'><strong>餐饮服务单位名录</strong></a><br/><span class='gray'>使用1234次</span></div>");
	});
	$("#appList  li").mouseover(function(){
		$("#appList  li").each(function (){
				$(this).html("<img src='img/ico_"+($(this).index()+1)+".png' alt=''><a href='#'><strong>停车场名录</strong></a><div class='ssym_xzphico'><span class='gray'>1234次</span></div>");
			});
		var count = $(this).index();
		$("#appList  li").eq(count).html("<img src='img/ico_"+(count+1)+".png' alt='' align='middle'><img src='img/ico_tjzy1.png' width='45' height='45' align='middle'><div class='yyphtitle'><a href='#'><strong>餐饮服务单位名录</strong></a><br/><span class='gray'>使用1234次</span></div>");
	});
	
	//排序方式
	$(".ssym_detailtjzy li").click(function(){
		$(".ssym_detailtjzy li").attr("style","");
		if($(this).index() !=0){
			$(this).attr("style","background:#fff");
		}
	});
	$(".ssym_detailtjzy li").mouseover(function(){
		$(".ssym_detailtjzy li").attr("style","");
		if($(this).index() !=0){
			$(this).attr("style","background:#fff");
		}
	});
	var pageCount = $("#pageCount").val();
	reloadPage(pageCount);
	
});

var timer = 1;
  function mround(){
        if (timer == 4) { 
            timer = 1 ;
        }
        $("div[name='buttons']").each(function(){
        	console.log(123);
        	$(this).removeClass().addClass("sy_carouncheck");
        });
        var classname = "#sy_button" + timer;
        $(classname).removeClass().addClass("sy_carouchecked");

        $("div[name='caro']").each(function(){
            $(this).fadeOut(500);
        });
        var classname = ".sy_caro" + timer; 
        $(classname).fadeIn(500);
        timer++;
    }

	var pageselectCallback = function(page_id, jq) {
		var searchKey = $("#preSearchKey").val();
		var searchType = $("#preSearchType").val();
		searchByParam(searchKey,page_id + 1,searchType);
		//执行查询，展现分页内容
	};
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#Pagination").pagination(totlePage, {
			num_edge_entries: 2,
			num_display_entries: 8,
			callback: pageselectCallback
			//回调函数
		});
	};
  
 function catalogPage(){
	 var searchKey = $("#preSearchKey").val();
	 $("#preSearchType").val("1");
	 searchByParam(searchKey,1,1);
 }
 
 function apiPage(){
	 var searchKey = $("#preSearchKey").val();
	 $("#preSearchType").val("4");
	 searchByParam(searchKey,1,4);
 }
 
 function appPage(){
	 var searchKey = $("#preSearchKey").val();
	 $("#preSearchType").val("3");
	 searchByParam(searchKey,1,3);
 }
 
 function newsPage(){
	 var searchKey = $("#preSearchKey").val();
	 $("#preSearchType").val("2");
	 searchByParam(searchKey,1,2);
 }
 
 function allPage(){
	 var searchKey = $("#preSearchKey").val();
	 $("#preSearchType").val("");
	 searchByParam(searchKey,1,null); 
 }
 
 function searchByParam(searchKey,pageNum,searchType){
		$.ajax({
			url: getRootPath()+"/search/index.do?method=SearchByParam",
			type: "POST",
			data: {
				"searchKey":searchKey,
				"searchType": searchType,
				"pageNum": pageNum,
			},
			success: function(data) {
				var datas = data.records;
				var html = "";
				if(datas.length>0){
					for(var i=0;i<datas.length;i++){
						var obj = datas[i];
						var fileType = obj.filetype;
						if("1" == obj.datatype){
							/*html += "<li><div class='ssym_lefttop_1'></div><div class='ssym_listcontent'><div class='ssym_contop'><div class='ssym_contopleft'>"; 
							html += "<a href='"+getRootPath()+"/catalog/detail.htm?cata_id="+obj.id+"'>"+obj.title+"</a>"; 
							html += "<span class='ssym_constar'><span class='ssym_constar1' style='width: "+obj.score*10+"%'></span></span>"; 
							html += "</div><div class='ssym_fl'>"; 
							if(checkString(obj.subjectname)){
								html += "【"+obj.subjectname+"】"; 
							}
							html += "</div></div>"; 
							html += " <div class='ssym_conbottom'>";
							if(checkString(obj.updatetime)){
								html += obj.updatetime+" 更新，&nbsp;";
							}
							if(checkString(obj.cityname)){
								html += obj.cityname+" &nbsp;";
							}
							html += "累计"+obj.datacount+"条数据</div><div class='ssym_img'>"; 
							html += "<div >"; 
							if(fileType.indexOf("xml") > -1){
								html += "<img src='../img/index/icon_tjzy_xml.png' alt=''/>"; 
							}
							if(fileType.indexOf("xls") > -1){
								html += "<img src='../img/index/icon_tjzy_xls.png' alt=''/>"; 
							}
							html += "</div>"; 
							html += "<div>"; 
							if(fileType.indexOf("json") > -1){
								html += "<img src='../img/index/icon_tjzy_json.png' alt=''/>"; 
							}
							if(fileType.indexOf("lbs") > -1){
								html += "<img src='../img/index/ico_tjzy_lbs.png' alt=''/>"; 
							}
							html += "</div></div><div class='ssym_conmiddle'><div class='ssym_conmiddleleft'>"; 
							if(checkString(obj.description)){
								html += obj.description;
							}
							html += "</li></div></div></div>";*/
							
							html += "<li><div class='ssym_lefttop_1'></div><div class='ssym_listcontent'><div class='ssym_contop'><div class='ssym_contopleft'>";
							html += "<a href='"+getRootPath()+"/catalog/detail.htm?cata_id="+obj.id+"'>"+obj.title+"</a>";
							//html += "<span class='ssym_constar'><span class='ssym_constar1' style='width: ${data.grade*10}%'></span></span></div></div>";
							html += "</div></div>";			
							html += "<div class='ssym_conbottom'>发布者："+obj.creator+"</div>";	
			                /*html += "<div class='ssym_img'><img src='../img/index/icon_tjzy_xml.png' alt=''/><img src='../img/index/icon_tjzy_xls.png' alt=''/></div>"*/;
							html += "<div class='ssym_conmiddle'><div class='ssym_conmiddleleft'>"+obj.description+"</div></div></div></li>";
							
							
						}
						if("2" == obj.datatype){
							html += "<li><div class='ssym_lefttop_4'></div><div class='ssym_listcontent'><div class='ssym_contop'>";
							html += "<div class='ssym_contopleft'><a href='"+getRootPath()+"/news/newsDetail.htm?news_id="+obj.id+"&res_type="+obj.version+"'>"+obj.title+"</a></div>";
							html += "<div class='ssym_conbottom1'>&nbsp;&nbsp;&nbsp;&nbsp;";
							if(checkString(obj.updatetime)){
								html += obj.updatetime;
							}
							html += " </div></div><div class='ssym_conmiddle1'><div class='ssym_conmiddleleft1'>";
							if(checkString(obj.description)){
								html += obj.description;
							}
							html +=	"</div></div></div></li>";
						}
						if("3" == obj.datatype){
							html += "<li><div class='ssym_lefttop_3'></div><div class='ssym_listcontent'><div class='ssym_contop'>";
							html += "<div class='ssym_contopleft'><a href='"+getRootPath()+"/appcenter/detail.htm?version_id="+obj.version+"&app_id="+obj.id+"'>"+obj.title+"</a> <span class='ssym_constar'><span class='ssym_constar1' style='width: "+obj.score*10+"%'></span></span></div>  ";
							html += "<div class='ssym_fl'>";
							if(checkString(obj.subjectname)){
								html += "【"+obj.subjectname+"】"; 
							}
							html += "</div></div>";
							html += "<div class='ssym_conbottom'>";
							if(checkString(obj.updatetime)){
								html += obj.updatetime +"发布";
							}
							if(checkString(obj.creator)){
								html += "&nbsp;&nbsp;&nbsp;&nbsp; 发布者："+obj.creator;
							}
							html += "</div><div class='ssym_img'><img src='../img/search/ico_tjzy_sc.png' width='38' height='18'></div>";
							html += "<div class='ssym_conmiddle'>";
							html += "<div class='ssym_conmiddleleft'>";
							if(checkString(obj.description)){
								html += obj.description;
							}
							html += "</div></div></div></li>";
						}
						if("4" == obj.datatype){
							html += "<li><div class='ssym_lefttop_2'></div><div class='ssym_listcontent'><div class='ssym_contop'>";
							html += "<div class='ssym_contopleft'><a href='"+getRootPath()+"/developer/service/serviceDetail.htm?service_id="+obj.id+"'>"+obj.title+"</a><span class='ssym_constar'><span class='ssym_constar1' style='width: "+obj.score*10+"%'></span></span></div>";
							html += "<div class='ssym_fl'>";
							if(checkString(obj.subjectname)){
								html += "【"+obj.subjectname+"】"; 
							}
							html += "</div></div><div class='ssym_conbottom'>";
							if(checkString(obj.updatetime)){
								html += obj.updatetime +"发布";
							}
							if(checkString(obj.creator)){
								html += "&nbsp;&nbsp;&nbsp;&nbsp; 发布者："+obj.creator;
							}
							html += "</div><div class='ssym_img'><img src='../img/search/ico_tjzy_sq.png' width='38' height='18'><img src='../img/search/ico_tjzy_api.png' width='38' height='18'></div>";
							html += "<div class='ssym_conmiddle'><div class='ssym_conmiddleleft'>";
							if(checkString(obj.description)){
								html += obj.description;
							}
							html +="</div></div></div></li>";
						}
					}
				}else{
					html = html +"<li>暂无与"+searchKey+"相关的搜索数据</li>";
				}
				$("#searchListUl").html(html);
				if(pageNum == 1){
					reloadPage(data.totalRecord);
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
 }
 

 
 function checkString(str){
	 if(null != str && ""!=str && "null" != str && undefined != typeof(str)){
		 return true;
	 }else{
		 return false;
	 }
	 
	//js获取项目根路径，如： http://localhost:8083/uimcardprj
	 function getRootPath(){
	     //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	     var curWwwPath=window.document.location.href;
	     //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	     var pathName=window.document.location.pathname;
	     var pos=curWwwPath.indexOf(pathName);
	     //获取主机地址，如： http://localhost:8083
	     var localhostPaht=curWwwPath.substring(0,pos);
	     //获取带"/"的项目名，如：/uimcardprj
	     var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	     return(localhostPaht+projectName);
	 }
 }

