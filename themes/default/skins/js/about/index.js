
$(function(){
    $("#1").click(function(){
        $(this).addClass("changeColor").siblings().removeClass('changeColor');
        $(".introduction").show().siblings().hide();
    });
    $("#2").click(function(){
        $(this).addClass("changeColor").siblings().removeClass('changeColor');
        $(".statement").show().siblings().hide();
    });
    $("#3").click(function(){
        $(this).addClass("changeColor").siblings().removeClass('changeColor');
        $(".navigator").show().siblings().hide();
    });
    $("#4").click(function(){
        $(this).addClass("changeColor").siblings().removeClass('changeColor');
        $(".contact").show().siblings().hide();
    });
    
	var tab=GetQueryString("tab");
	switch(tab)
	{
	case "1":
		$("#1").click();
	  break;
	case "2":
		$("#2").click();
	  break;
	case "3":
		$("#3").click();
	  break;
	case "4":
		$("#4").click();
	  break;
	  default:
		  $("#1").click();
	}

});

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
