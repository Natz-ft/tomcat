	
	/**
	 * 收起或者展开筛选框
	 */
	function filterType(){
		$("#filter_box_id").toggle(500);
		var shaixuanBtn = $("#filter_title_id").find(".shaixuan-btn");
		if(shaixuanBtn.length > 0){
			shaixuanBtn.addClass("shaixuan-btn1");
			shaixuanBtn.removeClass("shaixuan-btn");
		}else{
			shaixuanBtn = $("#filter_title_id").find(".shaixuan-btn1");
			shaixuanBtn.addClass("shaixuan-btn");
			shaixuanBtn.removeClass("shaixuan-btn1");
		}
	}
	
	/**
	 * 复选过滤条件
	**/
	$(document).ready(function(){
		var bo = true;//是否选择了标签
		var hidden = $("#type_filter_form").find("input[type=hidden]");//隐藏域
		var root_name = "";//选择的总分类的名称
		var select_tag = "";//选择的标签
		hidden.each(function(i){
			var type = hidden.eq(i).val();
			if(notNull(type)){
				bo = false;
				
				var types = type.split("|");
				var type_id = types[1];
				
				if(notNull(type_id)){
					var type_name = hidden.eq(i).attr("name");
					if(showSelected(type_name)){
						//选中过滤的小标签条件
						$("#" + type_name + "_" + types[0]).addClass("selected");
						
						//组装“已选择”后面的提示
						select_tag = select_tag + "<li><a>" + types[1] + 
						"<i class='close_min s_close' onclick='linkTypeFilterIndex(\"" + type_name + "\",\"\");'></i></a></li>";
					}
				}
			}
		});
		
		if(notNull(select_tag)){
			$("#type_selected").prepend("<span>你选择了：</span>");
			$("#type_selected_box").append(select_tag);
		}else{
			$("#type_selected").remove();
			$("#no_type").addClass("selected");
		}
	});
	
	
	/**
	 * 是否显示到“已选择”容器内
	 * @param {} type_name
	 * @return {}
	 */
	function showSelected(type_name){
		return ((type_name != "searchkey") 
		&& (type_name != "root_type") 
		&& (type_name != "group_id")
		&& (type_name != "app_type")
		&& (type_name != "page_index"));
	}
	
	/**
	 * 链接地址处理，点击跳转
	**/
	function linkTypeFilterIndex(type,value){
		var filter_form = $("#type_filter_form");
		if(!type.isEmpty()){
			filter_form.find("input[name=" + type + "]").val(value);
		}
		filter_form.submit();
	}
	
	
	/**
	 * 展开和收起
	**/
	function showExpanMenu(data,id2,id3){
		if(data && (data.length > 0)){
			for(var i=0;i<data.length;i++){
				$("#" + data[i]).toggle(500);
			}
		}
		$("#"+id2).css("display","none");
		$("#"+id3).css("display","block");
	}
	
	/**
	 * 分页专用回调方法
	 * @param {} data
	 */
	function searchPage(data){
		var type_filter_form = $("#type_filter_form");
		type_filter_form.find("input[name=pagesize]").val(data.pagesize);
		type_filter_form.find("input[name=index]").val(data.index);
		type_filter_form.submit();
	}
	
	/**
	 * 判断一个字符串是否为空
	 * @param {} str
	 */
	function notNull(str){
		if((typeof(str) != "undefined") && (!str.isEmpty())){
			return true;
		}
		return false;
	}
