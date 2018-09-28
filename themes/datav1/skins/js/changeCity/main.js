$(function () {
	$("#qright_btn").click(function(event) {
		$("#qright_btn").toggleClass('qright_btnhide');
		$(".qhcs_left").toggleClass('qleft_hide');
		$(".qhcs_right").toggleClass('qright_hide');
	});
	$("#qleft_return").hide();
	var count=0;
	$(".qright_num").each(function(){
		count++;
		if(count <=10){
			$(this).addClass('qright_numten');
		}
	});
	
	var height = $(window).height();
	$("body").height(height-20);
	$("body").css("overflow","hidden");
	
});