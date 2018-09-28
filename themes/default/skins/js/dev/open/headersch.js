$(document).ready(function(){  
	$(".ytyj_schlist").hide();
	$("#ytyj_schdown").click(function(event) {
		$(".ytyj_schlist").slideToggle();
	});
	var i=0;
	$(".sy_schtitle").mouseover(function(event) {
		i=1;
	});
	$(".sy_schtitle").mouseleave(function(event) {
		i=0;
	});
	$(document).click(function(){ 
		if(i==0){
			$(".ytyj_schlist").slideUp();
		}
	});
	var obj = $(".ytyj_schlist ul li");
	var m;
    obj.each(function(){
	    $(this).click(function(){
	    	var id = $(this).attr("id");
	    	$("#searchType").val(id);
	    	m= $(this).text();
	    	$("#schtxt").text(m);
	    	$(".ytyj_schlist").hide();
	    });
	});
}); 
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