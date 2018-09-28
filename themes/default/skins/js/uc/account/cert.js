$(document).ready(function() {
	
	$("#showByLists").on("click",function(){
		$("#certListsContainer").show();
		$("#certIconsContainer").hide();
		$("#showByIcons").removeClass("tab-icon-cur");
		$("#showByLists").addClass("tab-icon-cur");
	})
	$("#showByIcons").on("click",function(){
		$("#certListsContainer").hide();
		$("#certIconsContainer").show();
		$("#showByIcons").addClass("tab-icon-cur");
		$("#showByLists").removeClass("tab-icon-cur");
	})
	
	$("#cert-box-imgs").slides({
		pause: 2500,
		hoverPause: true,
		generateNextPrev: true,
		prev: "slides_prev",
		next: "slides_next"
	});
	var img_num = 2;
	$("ul.pagination").width(img_num*16);
	$(".slides_prev").attr("hidefocus","hidefocus");
	$(".slides_next").attr("hidefocus","hidefocus");
	$("ul.pagination").find("a").attr("hidefocus","hidefocus");

});
//删除证照类型
var cert_id_delete = null;
function delete_by_id(id){
	cert_id_delete = id;
	$("#dialog-confirm-delete").dialog('open');
}
$(document).ready(function() {
	$("#dialog-confirm-delete").dialog({
	 	  autoOpen:false,
		  bgiframe: true,
		  title:"确定删除",
		  modal: true,
		  buttons: {
		      '确定': function() {
		      	if(typeof deleteByIdUrl == "undefined")return;
		    	$.ajax({
		    		url:deleteByIdUrl,
		    		data: {id:cert_id_delete},
		    		type : "POST",
		    		success : function(data){
				    	$(this).dialog('close');
				    	if(data == 1){
					    	window.location.reload();
					    }else{
						    alert('操作失败，请稍后重试！');
						}
		    		}
		    	});
		},
	   '取消':function() {
		   $(this).dialog('close');
		       }
		     }
	});
});