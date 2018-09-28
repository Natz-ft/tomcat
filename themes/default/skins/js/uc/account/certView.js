$(document).ready(function() {
	$("#dialog-confirm-delete").dialog({
   	  autoOpen:false,
	  bgiframe: true,
	  title:"确定删除",
	  modal: true,
	  buttons: {
	      '确定': function() {
	      	$(this).dialog('close');
	      	if($("#certViewIconsContainer").find("a").length < 2){
	      		//删除整个证照
	      		var viewerImg = $("#cert-viewer").find("img");
		      	var cert_id_delete = viewerImg.attr("action-cert-id");
		      	if(typeof deleteByIdUrl == "undefined")return;
		    	$.ajax({
		    		url:deleteByIdUrl,
		    		data: {id:cert_id_delete},
		    		type : "POST",
		    		success : function(data){
				    	if(data == 1){
				    		if(typeof certUrl == "undefined")return;
					    	window.location.href = certUrl;
					    }else{
						    alert('操作失败，请稍后重试！');
						}
		    		}
		    	});
	      	}else{
	      		//删除单个图片
	      		var viewerImg = $("#cert-viewer").find("img");
		      	var attach_id_del = viewerImg.attr("action-attach-id");
				var cert_type_del = viewerImg.attr("action-cert-type");
				var cert_code_del = viewerImg.attr("action-cert-code");
				if(typeof deleteAttachUrl == "undefined")return;
				$.ajax({
					url:deleteAttachUrl,
					data: {
						attach_id:attach_id_del,
						cert_type:cert_type_del,
						cert_code:cert_code_del
						},
					type : "POST",
					success : function(data){
						if(data == 1){
							window.location.reload();
						}else{
							alert("删除失败，请稍后重试！");
						}
					}
				});
	      	}
	     },
	     '取消':function() {
	  	   $(this).dialog('close');
		       }
		     }
	});
	
	$("#delete").on("click",function(){
		if($("#cert-viewer").find("img").attr("action-attach-id") != "none"){
			if($("#certViewIconsContainer").find("a").length < 2){
				$("#dialog-confirm-delete").find("div").html('当前证照下只有一张图片，删除图片将删除整个证照，确定删除？');
			}else{
				$("#dialog-confirm-delete").find("div").html('确定删除当前图片？');
			}
			$("#dialog-confirm-delete").dialog('open');
		}
	});
	
	$("#cert-box-imgs").slides({
		pause: 2500,
		hoverPause: true,
		generateNextPrev: true,
		generatePagination: true,  
		prev: "slides_prev",
		next: "slides_next"
	});
	
	$(".slides_prev").attr("hidefocus","hidefocus");
	$(".slides_next").attr("hidefocus","hidefocus");
	$("ul.pagination").hide();
	
	$(".cert-item").on("click",function(){
		var viewerImg = $("#cert-viewer").find("img");
		var img = $(this).find("img");
		if(viewerImg.length > 0 && img.length > 0){
			viewerImg[0].src = img[0].src;
			viewerImg.attr("action-attach-id",img.attr("action-attach-id")||"none");
		}
			
		$(".cert-item").removeClass("cur-item");
		$(this).addClass("cur-item");
	});
	if(typeof photo_id != "undefined"){
		$("#photo_id_" + photo_id).addClass("cur-item");
	}
	
});