
function score(starid,msg){
    var star_b = $("#"+starid);
    var len = star_b.length,score_num_txt,i=0,j=0;
    var score_words = ['很差','差','一般',"好","很好"];
	//初始化当前评分
	score_grade = recently_grade;
    function initStarAndWord() {
    	for(j=0; j<score_grade; j++) {
    		star_b.eq(j).addClass("star");
    	}
    	if(score_grade > 0) 
    		$(".score_label").html("我已评分：");
		score_num_txt = score_grade;
		if(score_grade > 0 && score_grade < 10) 
			score_num_txt += ".0";
		$(".score_num").html(score_num_txt);
		$(".score_word").html("&nbsp;").hide();
    }
  	//初始化当前评分及星星的显示
	initStarAndWord();
	if(msg&&msg.length>0){
		$("#bottomstar").hover(function(){
			$(".score_word").html(msg).show();
		},function(){
			$(".score_word").html("&nbsp;").hide();
		});
		return;
	}
    for(i=0; i<len; i++){
    	star_b.eq(i).attr("index",i);
    	star_b.eq(i).hover(function(){
    			var pos = parseInt($(this).attr("index"));
	        	for(j=0; j<=pos; j++) {
	        		star_b.eq(j).addClass("star");
	        	}
	        	for(j=pos+1; j<len; j++) {
	        		star_b.eq(j).removeClass("star");
	        	}
	        	score_num_txt = (pos+1);
	        	if(score_num_txt < 10) 
					score_num_txt += ".0";
				$(".score_num").html(score_num_txt);
	        	$(".score_word").html(score_words[Math.floor(pos/2)]).show();
    		},function() {
    			for(j=0; j<len; j++) {
    				star_b.eq(j).removeClass("star");
	        	}
    			initStarAndWord();
    		}
    	);
    	
    	star_b.eq(i).click(function(){
        	_self = $(this);
        	//判断是否登录 未登录需要先登录
	       	$.ajax({
				//url:"${fn:getLink('store/extapp.do?method=isLogged')}",
	       		url:login_url,
				type:"POST",
				success:function(res){
					
					if(res == 1) {
						score_grade = parseInt(_self.attr("index"))+1;
					    $.ajax({
							//url:"${fn:getLink('store/extapp.do?method=grade')}",
							url:grade_url,
							data:{appid:appid,grade:score_grade},
							type:'POST',
							success:function(res){
								if(res) {
									//alert('评分成功');
									layer.msg("评分成功",1,1);
										initStarAndWord();
								} else {
									layer.msg("操作失败",1,5);
								}
							}
						});
					} else {
						layer.msg("尚未登陆",1,5);
					}
				}
			 });
        });
    }
}
