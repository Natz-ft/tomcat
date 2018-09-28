function addComment(appid){
	var commentContent = $("#commentContent").attr("value");
	if (commentContent.isEmpty()) {
		dialog.info('请输入评论内容！',function(){},3000);
		return;
	} else {
		commentContent = encodeURI(commentContent);
		$.ajax({url:commentUrl, data:{
			"content": commentContent,
			"obj_id":appid,
			"object_code":object_code,
			"obj_type":2,
			"t":Math.random()
		},success:function(data) {
			dialog.info(data.msg,function(){},3000);
			$("#commentContent").attr("value", "");
			showComment(msgid, true);
		},error:function(data) {
			dialog.info('网络异常',function(){},3000);
		},dataType:"json"});
	}
}

$(function () {
	$('.count-ico').each(function(){
	if($(this).text()<=3){
		$(this).addClass('ico-red');
	}
	else{
		$(this).addClass('ico-grey');
	}
	});
	
	//应用排行
	$("#appList  li").mouseover(function(){
		if(this.id.indexOf("big")>=0){
			return;
		}
		$("#appList  li").each(function(){
			if(this.id.indexOf("big")>=0){
				$(this).hide();
			}
			if(this.id.indexOf("small")>=0){
				document.getElementById(this.id).style.display = "block";
			}
		});
		if(this.id.indexOf("small")>=0){
			document.getElementById(this.id.replace("small", "big")).style.display = "block";
			document.getElementById(this.id).style.display = "none";
		}
	});
	$("#appList  li").eq(0).show();
	$("#appList  li").eq(1).hide();

	
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

	
	//排序方式
	$(".sd_detailtjzy li").click(function(){
		$(".sd_detailtjzy li").attr("style","");
		if($(this).index() !=0){
			$(this).attr("style","background:#fff");
		}
	});
	$(".sd_detailtjzy li").mouseover(function(){
		$(".sd_detailtjzy li").attr("style","");
		if($(this).index() !=0){
			$(this).attr("style","background:#fff");
		}
	});

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
        })
        var classname = ".sy_caro" + timer; 
        $(classname).fadeIn(500);
        timer++;
    }


