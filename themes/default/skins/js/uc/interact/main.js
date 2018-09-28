$(function () {

//选项卡切换BEGIN
$("#listview2").hide();
$("#topleft").removeClass('topleft');
$("#topleft").addClass('current1');
$("#topleft").mouseover(function () {
    $("#topleft").removeClass('topleft');
	$("#topleft").addClass('current1');
	$("#topright").removeClass('current2');
	$("#topright").addClass('topright');
	$("#listview1").show();
	$("#listview2").hide();
});
$("#topright").mouseover(function () {
    $("#topright").removeClass('topright');
	$("#topright").addClass('current2');
	$("#topleft").removeClass('current1');
	$("#topleft").addClass('topleft');
	$("#listview2").show();
	$("#listview1").hide();
});
//选项卡切换END


//展开收起BEGIN
$("#shouqi1").hide();
$("#zhankai1").show();
$("#shouqi2").hide();
$("#zhankai2").show();
$("#shouqi3").hide();
$("#zhankai3").show();
$("#zhankai1").click(function () {
	$(".fenlei").removeClass('fenleio');
	$("#zhankai1").hide();
	$("#shouqi1").show();
});
$("#shouqi1").click(function () {
	$(".fenlei").addClass('fenleio');
	$("#shouqi1").hide();
	$("#zhankai1").show();
});
$("#zhankai2").click(function () {
	$(".biaoqian").removeClass('biaoqiano');
	$("#zhankai2").hide();
	$("#shouqi2").show();
});
$("#shouqi2").click(function () {
	$(".biaoqian").addClass('biaoqiano');
	$("#shouqi2").hide();
	$("#zhankai2").show();
});
$("#zhankai3").click(function () {
    $("#ullist").removeClass('listo');
    $("#zhankai3").hide();
    $("#shouqi3").show();
});
$("#shouqi3").click(function () {
    $("#ullist").addClass('listo');
    $("#shouqi3").hide();
    $("#zhankai3").show();
});
//展开收起END

//下拉列表BEGIN
$(".xllist").hide();
$("#xialao").click(function () {
	$(".geshi").toggleClass('geshio');
	$(".xllist").toggle();
});
//下拉列表END
/*
    var navLi=$("#checklist li");
    navLi.click(function(){
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
    });
*/
//点击选中效果
var tempObj1;
var obj1 = $("#geshichecklist li");
    obj1.each(function(){
    $(this).click(function(){
    	if (tempObj1 != null) {
    		tempObj1.removeClass('current');
    	}
    	$(this).addClass('current');
        tempObj1 = $(this);
    });
    obj1.eq(0).click();
})
var tempObj2;
var obj2 = $("#biaoqianchecklist li");
    obj2.each(function(){
    $(this).click(function(){
    	if (tempObj2 != null) {
    		tempObj2.removeClass('current');
    	}
    	$(this).addClass('current');
        tempObj2 = $(this);
    });
    obj2.eq(0).click();
})
var tempObj3;
var obj3 = $("#paixuchecklist li");
    obj3.each(function(){
    $(this).click(function(){
    	if (tempObj3 != null) {
    		tempObj3.removeClass('current');
    	}
    	$(this).addClass('current');
        tempObj3 = $(this);
    });
})


});



	
