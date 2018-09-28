$(function() {
	$("#addNewCata").click(function(){
		var   params = "";
		var   type = $("#newCataVeiwType").val();
		var meta_id = $("#meta_id").val();
		var cata_id = $("#obj_id").val();
		var title = $("#new_cata_name").val();
		if(null == title || "" == title || typeof(title) == undefined){
			easyDialog.open({
				container : {
					content : '新数据目录名称不能为空'
				},
				autoClose : 2000
			});
			return false;
		}
		//展示类型 0：饼状图 1：柱状图 2：折线图3：散点图 4：流图
		var picType = $("#picTypeText").val();
		 var tjSelect = "";
		 var tjSelectValue ="";
		 tjSelect = $("#kshtj2").find("select[id='tjSelect']").val();
		 $("#kshtj2").find("select[id='tjSelectCount']").each(function(){
			 tjSelectValue = tjSelectValue+$(this).val()+",";
		 });
		
		//筛选部分
		$(".mytiaojian").each(function(){
			//筛选值
		 	var value = $(this).find("input[name='value1']").val();
		 	//筛选项
		 	var key =  $(this).find("select[name='key1']").val();
		 	//筛选值的数据类型
		 	var fieldType = $(this).find("select[name='key1']").find("option:selected").attr("type");
		 	//筛选条件
		 	var condition1 = $(this).find("select[name='condition1']").val()
		 	//拼装json格式请求参数
		    params = params + "{'key':'"+key+"',";
		    params = params + "'type':'1','fieldType':'"+fieldType+"',";
		    params = params + "'condition':'"+ condition1 +"',";
		    params = params + "'value':'"+ value+"'},";
		});
		if(type == 2 || type == "2"){
			// 分组部分
			$(".kshcontent[type='part1']").each(function(){
				 	var value =  $(this).find("select[name='key2']").val();
				    params = params + "{'key':'"+value+"',";
				    params = params + "'type':'4',";
				    params = params + "'value':'"+ value+"'},";
				    params = params + "{'key':'"+value+"',";
				    params = params + "'type':'5',";
				    params = params + "'value':'"+ value+"'},";
			});
			//统计部分
			$(".kshcontent[type='part2']").each(function(){
			 	var value =  $(this).find("select[name='key3']").val();
			 	var condition = $(this).find("select[name='value3']").val();
			    params = params + "{'key':'"+value+"',";
			    params = params + "'type':'2',";
			    if(null != condition && "" != condition  && typeof(condition) != undefined && "undefined" != condition){
			    	 params = params + "'condition':'"+condition+"',";
			    }else{
			    	 params = params + "'condition':'"+1+"',";
			    }
			    params = params + "'value':'"+ value+"'},";
			});
			// 排序部分
			$(".kshcontent[type='part3']").each(function(){
			 	var value =  $(this).find("select[name='key4']").val();
			 	var order = $(this).find("input[class='shunxu']").val();
			 	if(null != value && typeof(value) != undefined  && "" != value){
				    params = params + "{'key':'"+value+"',";
				    params = params + "'type':'3',";
				    params = params + "'condition': '"+order+"',";
				    params = params + "'value':'"+ value+"'},";
			 	}
			});
		}
		$.ajax({
		    type: "POST",
		    url: getRootPath()+"/catalog/detail.do?method=addNewCata",
		    data: {"params":params,"type":type,"meta_id":meta_id,"title":title,"cata_id":cata_id,"picType":picType,"tjSelect":tjSelect,"tjSelectValue":tjSelectValue},
		    dataType: "json",
		    success:function(data){
		    	if("999" == data){
					easyDialog.open({
						container : {
							content : '请先登录'
						},
						autoClose : 2000
					});
		    	}else{
		    		$(".modal").hide();
		    		$(".overlay").hide();
					easyDialog.open({
						container : {
							content : '数据目录保存成功'
						},
						autoClose : 2000
					});
		    	}
		    }
		});  
	});
});