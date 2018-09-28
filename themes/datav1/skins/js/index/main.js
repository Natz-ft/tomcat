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

$('.count-ico').each(function(){
	if($(this).text()<=3){
		$(this).addClass('ico-red');
	}
	else{
		$(this).addClass('ico-grey');
	}
});

$(".sy_caro2").hide();
//$(".sy_caro3").hide();
$(".sy_carobg2").hide();
var tempObj;
var obj = $(".sy_carouselbutton div");
    obj.each(function(){
  
    if($(this).index()==0){
        $("#sy_lunbobg").removeClass('sy_lunbobg2');
        //$("#sy_lunbobg").removeClass('sy_lunbobg3');
        $("#sy_lunbobg").addClass('sy_lunbobg1');
    }
    else if($(this).index()==1){
        $("#sy_lunbobg").removeClass('sy_lunbobg1');
        //$("#sy_lunbobg").removeClass('sy_lunbobg3');
        $("#sy_lunbobg").addClass('sy_lunbobg2');
    }
    /*
    else if($(this).index()==2){
        $("#sy_lunbobg").removeClass('sy_lunbobg1');
        $("#sy_lunbobg").removeClass('sy_lunbobg2');
        $("#sy_lunbobg").addClass('sy_lunbobg3');
    }
    */
    return false;
    });

    obj.eq(0).click();

  
var obj = setInterval("mround()",3000);

$("#sy_button1").click(function() {
    $(this).removeClass().addClass("sy_carouchecked");
    $("#sy_button2").removeClass().addClass("sy_carouncheck");
    //$("#sy_button3").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro2").fadeOut(500);
    //$(".sy_caro3").fadeOut(500);
    $(".sy_caro1").fadeIn(500);

    $(".sy_carobg2").fadeOut(500);
    $(".sy_carobg1").fadeIn(500);
    obj = setInterval('mround()',3000);
});
$("#sy_button2").click(function() {
    $(this).removeClass().addClass("sy_carouchecked");
    $("#sy_button1").removeClass().addClass("sy_carouncheck");
    //$("#sy_button3").removeClass().addClass("sy_carouncheck");
    clearInterval(obj);
    $(".sy_caro1").fadeOut(500);
    //$(".sy_caro3").fadeOut(500);
    $(".sy_caro2").fadeIn(500);

    $(".sy_carobg1").fadeOut(500);
    $(".sy_carobg2").fadeIn(500);
    obj = setInterval('mround()',3000);
});
/*
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
*/
/*图谱操作*/
$(".cata_relnet").live("click",function(){
	window.open ( getRootPath()+"/relnet/?cata_id="+$(this).attr("rel"), '_blank') ;
});


});

var timer = 2;
  function mround(){
        if (timer == 3) { 
            timer = 1 ;
        }
        $("div[name='buttons']").each(function(){
            $(this).removeClass().addClass("sy_carouncheck");
        });
        var classname = "#sy_button" + timer;
        $(classname).removeClass().addClass("sy_carouchecked");

        $("div[name='caro']").each(function(){
            $(this).fadeOut(500);
        })
        var classname = ".sy_caro" + timer; 
        $(classname).fadeIn(500);

        $("div[name='carobg']").each(function(){
            $(this).fadeOut(500);
        })
        var classname = ".sy_carobg" + timer; 
        $(classname).fadeIn(500);

        timer++;
    }



	
