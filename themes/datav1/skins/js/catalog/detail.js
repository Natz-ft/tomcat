var DataFormat={Excel:'xls',Json:'json',Xml:'xml',Lbs:'lbs',Csv:'csv'};
// var level = "";
$(function() {
	$(".screenmubu").hide();
	$(".modalkuang").hide();
	var  iWidth=272;
	var  iHeight=134;
	var  iTop=(window.screen.height-iHeight)/3;
	var  iLeft=(window.screen.width-iWidth)/2;
	$(".modalkuang").attr("top",iTop);
	$(".modalkuang").attr("left",iLeft);
	$(".modalkuang").css({'top':iTop+"px",'left':iLeft+"px"});  

	$(".kshsubmit").click(function(event) {
		$(".screenmubu").show();
		$(".modalkuang").show();
	});
	$(".i_close").click(function(event) {
		$(".modalkuang").hide();
		$(".screenmubu").fadeOut(500);
		
	});
	$(".btn-qx").click(function(event) {
		$(".modalkuang").hide();
		$(".screenmubu").fadeOut(500);
		
	});
	$(".btn-qd").click(function() {
		//TODO: 保存功能未实现
		$(".modalkuang").hide();
		$(".screenmubu").fadeOut(500);		
	});
	$(".kshsubmit").hide();
	$(".kshreset").hide();
	$(".sub_content").hide();
	$(".content_model div:first-child").show();
	var navLi = $(".Label").children("a").children("div");
	navLi.each(function() {
		$(this).click(function() {
			$(".sub_content").hide();
			$(".content_model .sub_content").eq($(this).parent("a").attr("indexn")).show();
		});
	});
	$("#nav_lable a").click(function(){
		$(this).children("div").addClass('current');
		$(this).siblings().children("div").removeClass('current');
	});
	
	$("#pf_1").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").removeClass('shixing');
		$("#pf_3").removeClass('shixing');
		$("#pf_4").removeClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 1星：很差");
	});
	$("#pf_2").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").removeClass('shixing');
		$("#pf_4").removeClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 2星：差");
	});
	$("#pf_3").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").addClass('shixing');
		$("#pf_4").removeClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 3星：一般");
	});
	$("#pf_4").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").addClass('shixing');
		$("#pf_4").addClass('shixing');
		$("#pf_5").removeClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 4星：好");
	});
	$("#pf_5").mouseover(function(event) {
		$("#pf_1").addClass('shixing');
		$("#pf_2").addClass('shixing');
		$("#pf_3").addClass('shixing');
		$("#pf_4").addClass('shixing');
		$("#pf_5").addClass('shixing');
		$(".pfms").empty();
		$(".pfms").append(" 5星：很好");
	});
	
	$("#pf_1").click(function(event) {
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:cata_id,score:2,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_2").click(function(event) {
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:cata_id,score:4,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_3").click(function(event) {
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:cata_id,score:6,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_4").click(function(event) {
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:cata_id,score:8,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			  error: function(data) {
					easyDialog.open({
						container : {
							content : '网络异常'
						},
						autoClose : 2000
					});
				},dataType:"json"
			
		});
	});
	$("#pf_5").click(function(event) {
		$.ajax({
			method: "post",
			url:add_score,
			data:{obj_id:cata_id,score:10,obj_type:object_type},
			  success: function(data){
				  if(data.code=='000001'){
						
						register();
						return;
					}
				  easyDialog.open({
						container : {
							content : data.msg
						},
						autoClose : 2000
					});
			  },
			error: function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"
			
		});
	});
	$(".wlpfspan").mouseout(function(event) {
		$(".pfms").empty();
		$(".sstar").removeClass('shixing');
	});
	$("#kshdiv").hide();
	
	var type_load = $("#picTypeText").val();
	
	$("#picTypeUl > li").each(function(){
		if(type_load == $(this).index()){
			$(this).find("span[class='sjml_duihao']").html("<i class=\"skin_on\"></i>");
		}else{
			$(this).find("span[class='sjml_duihao']").html("");
		}
	});
	
	$("#picTypeUl > li").click(function(){
		var index = $(this).index();
		if(0 == index){
			$("#kshtj").show();
			$("#kshtj2").hide();
		}else{
			$("#kshtj").hide();
			$("#kshtj2").show();
		}
		$("#picTypeUl > li").each(function(){
			if(index == $(this).index()){
				$(this).find("span[class='sjml_duihao']").html("<i class=\"skin_on\"></i>");
			}else{
				$(this).find("span[class='sjml_duihao']").html("");
			}
		});
		$("#picTypeText").val(index);
	});

	$(".conshaixuan").hide();
	$(".confenzu").hide();
	$("#ksh1sx").click(function() {
		$("#ksh1fz").removeClass('ksh1check');
		$("#ksh1fz").removeClass('ksh1check_left_border');
		$("#ksh1sx").addClass('ksh1check');
		$(".conshaixuan").show();
		$(".confenzu").hide();
		//$(".conshaifen").slideToggle();
		$(".conshaifen").slideDown();
		$("#golvtg").attr("class",'golv golvsq');
	});
	$("#ksh1fz").click(function() {
		$("#ksh1sx").removeClass('ksh1check');
		$("#ksh1fz").addClass('ksh1check');
		$("#ksh1fz").addClass('ksh1check_left_border');
		$(".confenzu").show();
		$(".conshaixuan").hide();
		$(".conshaifen").slideDown();
		$("#golvtg").attr("class",'golv golvsq');
	});
	$("#ksh1sx").click();

	$(".data_sub_content").hide();
	$(".list_sub_content div:first-child").show();
	var subList = $(".list_sub_title > div");
	subList.click(function() {
		$(".data_sub_content").hide();
		$(".list_sub_content .data_sub_content").eq($(this).index()).show();

	});
	$("#data_sub_title1").click(function() {
		$("#data_sub_title1").addClass('divcheck');
		$("#data_sub_title2").removeClass('divcheck');
		$("#data_sub_title3").removeClass('divcheck');
		$("#data_sub_title4").removeClass('divcheck');
		$("#data_a1").addClass('acheck');
		$("#data_a2").removeClass('acheck');
		$("#data_a3").removeClass('acheck');
		$("#data_a4").removeClass('acheck');
		$("#data_icon1").addClass('icon1check');
		$("#data_icon2").removeClass('icon2check');
		$("#data_icon3").removeClass('icon3check');
		$("#data_icon4").removeClass('icon4check');
	});
	$("#data_sub_title2").click(function() {
		$("#data_sub_title2").addClass('divcheck');
		$("#data_sub_title1").removeClass('divcheck');
		$("#data_sub_title3").removeClass('divcheck');
		$("#data_sub_title4").removeClass('divcheck');
		$("#data_a2").addClass('acheck');
		$("#data_a1").removeClass('acheck');
		$("#data_a3").removeClass('acheck');
		$("#data_a4").removeClass('acheck');
		$("#data_icon2").addClass('icon2check');
		$("#data_icon1").removeClass('icon1check');
		$("#data_icon3").removeClass('icon3check');
		$("#data_icon4").removeClass('icon4check');
		$(".conshaifen").slideDown();
		$("#golvtg").attr("class",'golv golvsq');
	});
	$("#data_sub_title3").click(function() {
		$("#data_sub_title3").addClass('divcheck');
		$("#data_sub_title2").removeClass('divcheck');
		$("#data_sub_title1").removeClass('divcheck');
		$("#data_sub_title4").removeClass('divcheck');
		$("#data_a3").addClass('acheck');
		$("#data_a2").removeClass('acheck');
		$("#data_a1").removeClass('acheck');
		$("#data_a4").removeClass('acheck');
		$("#data_icon3").addClass('icon3check');
		$("#data_icon2").removeClass('icon2check');
		$("#data_icon1").removeClass('icon1check');
		$("#data_icon4").removeClass('icon4check');
		$("#kshdiv").hide();
		$("#kshdiv").slideUp();
	});
	$("#data_sub_title4").click(function() {
		$("#data_sub_title4").addClass('divcheck');
		$("#data_sub_title2").removeClass('divcheck');
		$("#data_sub_title3").removeClass('divcheck');
		$("#data_sub_title1").removeClass('divcheck');
		$("#data_a4").addClass('acheck');
		$("#data_a2").removeClass('acheck');
		$("#data_a3").removeClass('acheck');
		$("#data_a1").removeClass('acheck');
		$("#data_icon4").addClass('icon4check');
		$("#data_icon2").removeClass('icon2check');
		$("#data_icon3").removeClass('icon3check');
		$("#data_icon1").removeClass('icon1check');
	});

	$("#xz_fxlogo").hide();
	$("#fenxiangid").click(function() {
		$("#xz_fxlogo").fadeToggle(400);
	});
	$("#yuandata tr:odd").addClass("trodd");
	$("#yuandata tr:even").addClass("treven");
	$("#apidata tr:odd").addClass("trodd");
	$("#apidata tr:even").addClass("treven");
	//新增筛选条件
	$("#addshaixuan1").click(function() {
		var optionObj = $("#sxtiaojian")
		var count = $("#sxtiaojian").children("div[class='my']").length;
		if(count == 1){
			var html = $(".my").html();
			if(html == "没有筛选条件"){
				$(".my").remove();
			}
			var objString = "<div class='my' name='options'>";
			objString =objString +  $("#sxtiaojian div:first-child").html();
			objString = objString.replace(/mytiaojianhiden/g, "mytiaojian");
			objString = objString +"<a class='deltiaojian1'  href='javaScript:void(0)' ></a></div>";
			optionObj.append(objString);
		}else{
			var objString = "<div class='my' name='options'>";
			objString =objString +  $("#sxtiaojian div:first-child").html();
			objString = objString.replace(/mytiaojianhiden/g, "mytiaojian");
			objString = objString +"<a class='deltiaojian1'  href='javaScript:void(0)' ></a></div>";
			optionObj.append(objString);
		}
	});
	//新增分组条件
	$("#addshaixuan2").click(function() {
		var count = $("#groups").children("div[type='part1']").length;
		var itemCount = $("#itemCount").val();
		if(count < itemCount){
			var partString1 = "<div class='kshcontent' type='part1'>";
			partString1 = partString1 + $("div[type='part1']").last().html();
			if(count > 1){
				partString1 = partString1 +"</div>";
			}else{
				partString1 = partString1 +"<a class='deltiaojian2' href='javaScript:void(0)'></a></div>";
			}
			$("div[type='part1']").last().after(partString1);
		}else{
			easyDialog.open({
				container : {
					content : '数据项超过最大值'
				},
				autoClose : 2000
			});
		}
	});
	//新增统计项
	$("#addshaixuan3").click(function() {
		var count = $("#dataStatistic").children("div[type='part2']").length;
		var itemCount = $("#itemCount").val();
		if(count < itemCount){
			var partString2 = "<div class='kshcontent' type='part2'>";
			partString2 = partString2 + $("div[type='part2']").last().html();
			partString2 = partString2 +"<a class='deltiaojian2' href='javaScript:void(0)'></a></div>";
			$("div[type='part2']").last().after(partString2);
		}else{
			easyDialog.open({
				container : {
					content : '数据项超过最大值'
				},
				autoClose : 2000
			});
		}
	});
	//统计项--》 统计条件改变---1.判断统计值如何呈现  2.更新排序信息
	$("select[name='key3']").live("change",function(){
		//更新统计值
		var fieldType = $(this).children('option:selected').attr("type");
		if('double' == fieldType ||  'number' == fieldType || 'int' == fieldType){
			var html = "条件&nbsp;&nbsp;&nbsp;&nbsp<select name='value3'><option value='1' selected=\"selected\">个数(COUNT)</option><option value='2'>平均值(AVG)</option><option value='3'>总和(SUM)</option><option value='4'>最大值(MAX)</option><option value='5'>最小值(MIN)</option></select>";
			$(this).parent().parent().find("div[name='fieldTypeCondition']").html(html);
		}else{
			$(this).parent().parent().find("div[name='fieldTypeCondition']").html("条件<span style=\"margin-left: 24px; color: orange\">个数(count)</span>");
		}
		//更新排序信息
		var count = $("#orderType").children("div[type='part3']").length;
		if(count > 0){
			var keyCount =  $("#dataStatistic").children("div[type='part2']").length;
			//删除排序项
			$.each($("#orderType").children("div[type='part3']"),function(){
				$(this).remove();
			});
			//新建排序项
			var columnArray = new Array();
			$.each($("#dataStatistic").children("div[type='part2']"),function(){
				var key = $(this).find("select[name='key3']").children('option:selected').html();
				var value = $(this).find("select[name='key3']").val();
				var condition = $(this).find("select[name='value3']").val();
				if("2" == condition || 2 == condition){
					columnArray.push(value+"_avg&^%$"+key+"平均值");
				}else if("3" == condition || 3 == condition){
					columnArray.push(value+"_sum&^%$"+key+"总值");
				}else if("4" == condition || 4 == condition){
					columnArray.push(value+"_max&^%$"+key+"最大值");
				}else if("5" == condition || 5 == condition){
					columnArray.push(value+"_min&^%$"+key+"最小值");
				}else if("1" == condition || 1 == condition || typeof(condition) == undefined || null == condition || "" == condition){
					columnArray.push(value+"_count&^%$"+key+"个数");
				}
			});
			$.unique(columnArray);
			var selectHtml = "";
			selectHtml = selectHtml+ "数据项<select name='key4' >";
			for(var i = 0 ;i < columnArray.length;i ++){
				var param = columnArray[i].split("&^%$");
				selectHtml = selectHtml +"<option value='"+param[0]+"'>"+param[1]+"</option>";
			}
			selectHtml = selectHtml+ "</select>";
			var html = "<div class='kshcontent' type='part3'><div class='kshxuxian'><div class='kshshujuxiang'><div>";
			html = html + selectHtml;
			html = html +"</div><div class='kshradio'>顺序<input class='shunxu' type='radio' name='order' checked='checked' value='1'>&nbsp;升序";
			html = html +"<input class='shunxu' type='radio' name='order' value='2'>&nbsp;降序</div></div></div>";
			html = html + "<a class='deltiaojian3' href='javaScript:void(0)' id='orderDel'></a></div>";
			for(var i = 0;i<count;i++){
				var tempHtml = html;
				tempHtml = tempHtml.replace(/order/g, "order"+(i+1));
				$("#orderType").append(tempHtml);	
			}
		}
	});
	//统计项---》 统计值改变--->更新排序条件
	$("select[name='value3']").live("change",function(){
		//更新排序信息
		var count = $("#orderType").children("div[type='part3']").length;
		if(count > 0){
			var keyCount =  $("#dataStatistic").children("div[type='part2']").length;
			//删除排序项
			$.each($("#orderType").children("div[type='part3']"),function(){
				$(this).remove();
			});
			//新建排序项
			var columnArray = new Array();
			$.each($("#dataStatistic").children("div[type='part2']"),function(){
				var key = $(this).find("select[name='key3']").children('option:selected').html();
				var value = $(this).find("select[name='key3']").val();
				var condition = $(this).find("select[name='value3']").val();
				if("2" == condition || 2 == condition){
					columnArray.push(value+"_avg&^%$"+key+"平均值");
				}else if("3" == condition || 3 == condition){
					columnArray.push(value+"_sum&^%$"+key+"总值");
				}else if("4" == condition || 4 == condition){
					columnArray.push(value+"_max&^%$"+key+"最大值");
				}else if("5" == condition || 5 == condition){
					columnArray.push(value+"_min&^%$"+key+"最小值");
				}else if("1" == condition || 1 == condition || typeof(condition) == undefined || null == condition || "" == condition){
					columnArray.push(value+"_count&^%$"+key+"个数");
				}
			});
			$.unique(columnArray);
			var selectHtml = "";
			selectHtml = selectHtml+ "数据项<select name='key4' >";
			for(var i = 0 ;i < columnArray.length;i ++){
				var param = columnArray[i].split("&^%$");
				selectHtml = selectHtml +"<option value='"+param[0]+"'>"+param[1]+"</option>";
			}
			selectHtml = selectHtml+ "</select>";
			var html = "<div class='kshcontent' type='part3'><div class='kshxuxian'><div class='kshshujuxiang'><div>";
			html = html + selectHtml;
			html = html +"</div><div class='kshradio'>顺序<input class='shunxu' type='radio' name='order' checked='checked' value='1'>&nbsp;升序";
			html = html +"<input class='shunxu' type='radio' name='order' value='2'>&nbsp;降序</div></div></div>";
			html = html + "<a class='deltiaojian3' href='javaScript:void(0)' id='orderDel'></a></div>";
			for(var i = 0;i<count;i++){
				var tempHtml = html;
				tempHtml = tempHtml.replace(/order/g, "order"+(i+1));
				$("#orderType").append(tempHtml);	
			}
		}
	});
	//添加排序项
	$("#addshaixuan4").click(function() {
		var count = $("#orderType").children("div[type='part3']").length;
		var keyCount =  $("#dataStatistic").children("div[type='part2']").length;
		$("#orderType").children("div[type='logDiv']").remove();
		$.each($("#orderType").children("div[type='part3']"),function(){
			$(this).remove();
		});
		var columnArray = new Array();
		$.each($("#dataStatistic").children("div[type='part2']"),function(){
			var key = $(this).find("select[name='key3']").children('option:selected').html();
			var value = $(this).find("select[name='key3']").val();
			var condition = $(this).find("select[name='value3']").val();
			if("2" == condition || 2 == condition){
				columnArray.push(value+"_avg&^%$"+key+"平均值");
			}else if("3" == condition || 3 == condition){
				columnArray.push(value+"_sum&^%$"+key+"总值");
			}else if("4" == condition || 4 == condition){
				columnArray.push(value+"_max&^%$"+key+"最大值");
			}else if("5" == condition || 5 == condition){
				columnArray.push(value+"_min&^%$"+key+"最小值");
			}else if("1" == condition || 1 == condition || typeof(condition) == undefined || null == condition || "" == condition){
				columnArray.push(value+"_count&^%$"+key+"个数");
			}
		});
		$.unique(columnArray);
		var selectHtml = "";
		selectHtml = selectHtml+ "数据项<select name='key4' >";
		for(var i = 0 ;i < columnArray.length;i ++){
			var param = columnArray[i].split("&^%$");
			selectHtml = selectHtml +"<option value='"+param[0]+"'>"+param[1]+"</option>";
		}
		selectHtml = selectHtml+ "</select>";
		var html = "<div class='kshcontent' type='part3'><div class='kshxuxian'><div class='kshshujuxiang'><div>";
		html = html + selectHtml;
		html = html +"</div><div class='kshradio'>顺序<input class='shunxu' type='radio' name='order' checked='checked' value='1'>&nbsp;升序";
		html = html +"<input class='shunxu' type='radio' name='order' value='2'>&nbsp;降序</div></div></div>";
		html = html + "<a class='deltiaojian3' href='javaScript:void(0)' id='orderDel'></a></div>";
		for(var i = 0;i<count;i++){
			var tempHtml = html;
			tempHtml = tempHtml.replace(/order/g, "order"+(i+1));
			$("#orderType").append(tempHtml);	
		}
		if(count < keyCount){
			$("#orderType").append(html);	
		}else{
			easyDialog.open({
				container : {
					content : '数据项超过最大值'
				},
				autoClose : 2000
			});
		}
	});
	//筛选项删除
	$(".deltiaojian1").live("click",function(){
		$(this).parent().remove();
		var count = $("#sxtiaojian").children("div[class='my']").length;
		if(count == 0){
			var objString = "<div class='my' name='options'>没有筛选条件</div>";
			$("#sxtiaojian").append(objString);
		}
	});
	//分组项删除
	$(".deltiaojian").live("click",function(){
		$(this).parent().remove();
	});
	//统计项删除
	$(".deltiaojian2").live("click",function(){
		$(this).parent().remove();
		//对应排序删除
		var orderCount = $("#orderType").children("div[type='part3']").length;
		var tjCount = $("#dataStatistic").children("div[type='part2']").length;
		$("#orderType").children("div[type='logDiv']").remove();
		$.each($("#orderType").children("div[type='part3']"),function(){
			$(this).remove();
		});
		var columnArray = new Array();
		$.each($("#dataStatistic").children("div[type='part2']"),function(){
			var key = $(this).find("select[name='key3']").children('option:selected').html();
			var value = $(this).find("select[name='key3']").val();
			var condition = $(this).find("select[name='value3']").val();
			if("2" == condition || 2 == condition){
				columnArray.push(value+"_avg&^%$"+key+"平均值");
			}else if("3" == condition || 3 == condition){
				columnArray.push(value+"_sum&^%$"+key+"总值");
			}else if("4" == condition || 4 == condition){
				columnArray.push(value+"_max&^%$"+key+"最大值");
			}else if("5" == condition || 5 == condition){
				columnArray.push(value+"_min&^%$"+key+"最小值");
			}else if("1" == condition || 1 == condition || typeof(condition) == undefined || null == condition || "" == condition){
				columnArray.push(value+"_count&^%$"+key+"个数");
			}
		});
		$.unique(columnArray);
		var selectHtml = "";
		selectHtml = selectHtml+ "数据项<select name='key4' >";
		for(var i = 0 ;i < columnArray.length;i ++){
			var param = columnArray[i].split("&^%$");
			selectHtml = selectHtml +"<option value='"+param[0]+"'>"+param[1]+"</option>";
		}
		selectHtml = selectHtml+ "</select>";
		var html = "<div class='kshcontent' type='part3'><div class='kshxuxian'><div class='kshshujuxiang'><div>";
		html = html + selectHtml;
		html = html +"</div><div class='kshradio'>顺序<input class='shunxu' type='radio' name='order' checked='checked' value='1'>&nbsp;升序";
		html = html +"<input class='shunxu' type='radio' name='order' value='2'>&nbsp;降序</div></div></div>";
		html = html + "<a class='deltiaojian3' href='javaScript:void(0)' id='orderDel'></a></div>";
		for(var i = 0;i<tjCount;i++){
			var tempHtml = html;
			tempHtml = tempHtml.replace(/order/g, "order"+(i+1));
			$("#orderType").append(tempHtml);	
		}
	});
	//排序项删除
	$(".deltiaojian3").live("click",function(){
		$(this).parent().remove();
		var count = $("#orderType").children("div[type='part3']").length
		if(count == 0){
			var html = "<div class='kshcontent' type='logDiv'><div class='kshxuxian'><div class='kshshujuxiang' name='orderShujuxiang'>没有排序条件</div></div></div>";
			$("#orderType").append(html);
		}
	});
	//可视化图片收起
	$("#kshfh").click(function(event) {
		$("#kshdiv").slideUp();
	});
	
	$(".contable").hide();
	$("#golvtg").click(function(event) {
		$(".conshaifen").slideToggle();
		$("#golvtg").toggleClass('golvsq');
	});
	$("#shxqueding").click(function(event) {
		$(".contable").slideDown();
		$(".conshaifen").slideUp();
		$("#golvtg").removeClass('golvsq');
	});
	$("#fzuqueding").click(function(event) {
		$(".contable").slideDown();
		$(".conshaifen").slideUp();
		$("#golvtg").removeClass('golvsq');
	});
	$("#goToGroups").click(function(){
		$("#data_sub_title2").addClass('divcheck');
		$("#data_sub_title1").removeClass('divcheck');
		$("#data_sub_title3").removeClass('divcheck');
		$("#data_sub_title4").removeClass('divcheck');
		$("#data_a2").addClass('acheck');
		$("#data_a1").removeClass('acheck');
		$("#data_a3").removeClass('acheck');
		$("#data_a4").removeClass('acheck');
		$("#data_icon2").addClass('icon2check');
		$("#data_icon1").removeClass('icon1check');
		$("#data_icon3").removeClass('icon3check');
		$("#data_icon4").removeClass('icon4check');
		$(".list_sub_content .data_sub_content").eq(2).hide();
		$(".list_sub_content .data_sub_content").eq(1).show();
		$("#ksh1sx").removeClass('ksh1check');
		$("#ksh1fz").addClass('ksh1check');
		$(".confenzu").show();
		$(".conshaixuan").hide();
	});
});
function doDownLoadFile(cata_id,res){
	// if(level!="100"){
	// 	doDownLoad(cata_id,res);
	// }else{
	$.ajax({
		url: isLogin_url,
		type: "POST",
		data: {
		},
		success: function(data) {
			if(data.code=='000000'){
				doDownLoad(cata_id,res);
			}
			
			if(data.code=='000001'){
				register();
			}
		},
		error: function(data) {
			easyDialog.open({
				container : {
					content : "网络错误！"
				},
				autoClose : 2000
			});
		},dataType:"json"
	});
 // }
}

function doDownLoad(cata_id,res){
	if(res.length>10){
		$.ajax({
			method: "post",
			url:download_url,
			data:{obj_id:cata_id},
			  success: function(data){
				// window.location.href = web_doc + res;
				var url = web_doc + res ;
				debugger;
				window.open(url, '_blank');
			  }
			
		});
	}
}
