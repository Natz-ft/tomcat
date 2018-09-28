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
    	m= $(this).text();
    	$("#schtxt").text(m);
    	$(".ytyj_schlist").hide();
    });
	})
});  