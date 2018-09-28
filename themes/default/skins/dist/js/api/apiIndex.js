//组织结构初始化
function getOrg(index){
	var listorg;
	if(index==1){
		 listorg = $("#A-G");
	}
	if(index==2){
		 listorg = $("#H-N");
	}
	if(index==3){
		 listorg = $("#O-T");
	}
	if(index==4){
		 listorg = $("#U-Z");
	}
	$.ajax({
		url: getRootPath()+"/dev/developer/serviceList.do?method=queryOrgList",
		type: "POST",
		data: {
			"value": index			
		},
		success: function(data) {
			if(data!=""&&data!=null){
				var html = "";
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];
					var org_name = obj.short_name;
					var short_name = org_name.substring(org_name.indexOf("市"));
					html = html + "<li title='"+org_name+"' rel='"+obj.org_code+"'>"+short_name+"</a></li>";
				}
				listorg.html(html);
			}else{
				listorg.html("");
			}
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
}

//打开调用页面
function ontest(id){
	window.location.href=getRootPath()+"/dev/developer/serviceTest.htm?service_id="+id;
}

/**
 * 用户收藏操作
 * @param id 收藏对象Id
 * @param type 收藏对象类型 数据目录、服务、应用
 * @param name 收藏对象名称
 */
function collection(id,type,name){
	$.ajax({
		type : "POST",
		url : getRootPath()+"/dev/developer/serviceDetail.do?method=Collection",
		data : {
			"id":id,
			"obj_type":type,
			"obj_name":name
		},
		dataType : "json",
		success : function(data) {
			if(data.code=="000001"){
				$('#bounceIn').click();
			}else{
				dialog.info(data.msg,function(){
					if(data.code=="000000"){
						document.getElementById("cancleCollection"+id).style.display = '';
						document.getElementById("collection"+id).style.display = 'none';
					}
				},3000);
			}
		},
		error : function(data) {
			dialog.info("网络忙，请稍后再试",function(){},3000);
		}
	});
}

function cancleCollection(id,type,name){
	$.ajax({
		type : "POST",
		url : getRootPath()+"/dev/developer/serviceDetail.do?method=CancelCollection",
		data : {
			"id":id,
			"obj_type":type,
			"obj_name":name
		},
		dataType : "json",
		success : function(data) {
			dialog.info(data.msg,function(){
				if(data.code=="000000"){
					document.getElementById("cancleCollection"+id).style.display = 'none';
					document.getElementById("collection"+id).style.display = '';
				}
			},3000);
		},
		error : function(data) {
			dialog.info("网络忙，请稍后再试",function(){},3000);
		}
	});
}

//服务申请
function serviceApply(id){
	$.ajax({
		type : "POST",
		url : getRootPath()+"/dev/developer/serviceList.do?method=CheckLogin",
		data : {},
		dataType : "json",
		success : function(data) {
			if("1" == data || 1 == data){
				$('#bounceIn').click();
			}else if("2" == data || 2 == data){
				dialog.info("请先认证成为平台开发者",function(){
					location.href=getRootPath()+"/console/developer.htm";
				},3000);
			}else{
				//跳转服务申请页面
				location.href = getRootPath()+"/dev/console/serviceApply.htm?service_id="+id;
			}
		},
		error : function(data) {
			dialog.info("网络忙，请稍后再试",function(){},3000);
		}
	});
}


//分页方法
var pageselectCallback = function(page_id, jq) {
	queryResByPage(page_id + 1);
	//执行查询，展现分页内容
};
//创建分页元素
var reloadPage = function(totlePage) {
	$("#Pagination").pagination(totlePage, {
		num_edge_entries: 2,
		num_display_entries: 4,
		items_per_page:8,
		callback: pageselectCallback
		//回调函数
	});
};
var queryResByPage = function(page) {
	
	dialog.loading({text:'加载中',parent:$('#cata-main')});
	var subjectId = $("#subjectId").val();
	var orgId = $("#orgId").val();
	var orderType = $("#orderType").val();
	var key = $("#key").val();
	var pageSize = 8; //每页显示条数初始化，修改显示条数，修改这里即可
	//ajax请求，并初始化资源列表
	$.ajax({
		url: getRootPath()+"/dev/developer/serviceList.do?method=queryApiList",
		type: "POST",
		data: {
			"subjectId": subjectId,
			"orgId": orgId,
			"orderType":orderType,
			"page": page,
			"pageSize": pageSize,
			"key":key
		},
		success: function(root) {
			$('#cata-main>.dialog-loading').modal('hide');
			if(root!=""&&root!=null){
				var html = "";
              for (var i = 0; i < root.data.length; i++) {
            	    var obj = root.data[i];
            	    html = html +"<li class='cata-item'>";
            	    html = html +"    <div class='item-icon'><i class='iconfont'>&#xe665;</i></div>";
            	    html = html +"    <div class='item-content'>";
            	    html = html +"        <div class='item-header'>";
            	    html = html +"            <div class='item-operation'>";
            	    html = html +"                <ul>";
            	    var isFav = obj.isCol;
            	    if(isFav==1){
            	    	html = html +"                    <li onclick=\"cancleCollection('"+obj.service_id+"',2,'"+obj.service_name+"')\" id='cancleCollection"+obj.service_id+"' style='color:#DAA520'><i class='iconfont'>&#xe691;</i>已收藏</li>";
            	    	html = html +"                    <li onclick=\"collection('"+obj.service_id+"',2,'"+obj.service_name+"')\" id='collection"+obj.service_id+"' style='display:none;'><i class='iconfont'>&#xe691;</i>收藏</li>";
            	    }else{
            	    	html = html +"                    <li onclick=\"collection('"+obj.service_id+"',2,'"+obj.service_name+"')\" id='collection"+obj.service_id+"'><i class='iconfont'>&#xe691;</i>收藏</li>";
            	    	html = html +"                    <li onclick=\"cancleCollection('"+obj.service_id+"',2,'"+obj.service_name+"')\" id='cancleCollection"+obj.service_id+"' style='display:none;color:#DAA520'><i class='iconfont'>&#xe691;</i>已收藏</li>";
            	    }
            	    //html = html +"                    <li onclick=\"collection('"+obj.service_id+"',2,'"+obj.service_name+"')\"><i class='iconfont'>&#xe691;</i>收藏</li>";
            	    html = html +"                    <li onclick=\"ontest('"+obj.service_id+"')\" ><i class='iconfont icon-shezhi' ></i>测试</li>";
            	    html = html +"                    <li onclick=\"serviceApply('"+obj.service_id+"')\" ><i class='iconfont'>&#xe665;</i>申请</li>";
            	    html = html +"                </ul>";
            	    html = html +"            </div>";
            	    html = html +"            <div class='item-title'>";
            	    html = html +"                <a href='"+getRootPath()+"/dev/developer/serviceDetail.htm?service_id="+obj.service_id+"' target='_blank'>"+obj.service_name+"</a>";
            	    html = html +"            </div>";
            	    html = html +"        </div>";
            	    html = html +"        <div class='item-body'>";
            	    html = html +"<div class='item-info'>";   
            	    html = html +"    <div class='item-theme'>接口状态：正常</div>";
            	    html = html +"    <div class='item-text'>";
            	    html = html +"        <span>提供部门："+obj.org_name+"</span>";
            	    html = html +"        <span>调用次数："+obj.total_visits_count+"</span>";
            	    html = html +"        <span>连接应用数："+obj.app_count+"</span>";
            	    html = html +"        <span>更新时间："+obj.online_time+"</span>";
            	    html = html +"    </div>";
            	    if("null" != obj.service_desc && null != obj.service_desc){
            	    	 html = html +"    <div>"+obj.service_desc+"</div>";
            	    }
            	    html = html +"</div>";
            	    html = html +"        </div>";
            	    html = html +"    </div>";
            	    html = html +"</li>";
              }
              $("#apiList").html(html);
				//获取总页码
				$("#record_count").html("共"+root.count+"个API");
				if (root.count>pageSize) {
					if(page == 1){
						reloadPage(root.count);
					}
				}else{
					$("#Pagination").empty();
				}
				if(root.count <= 0){
					$("#Pagination").html("暂无数据");
					$("#record_count").html("共0个API");
				}
			}else{
				if (page == 1) {
					$("#Pagination").html("暂无数据");
				}
				$("#record_count").html("共0个API");
			}
		},
		error: function(data) {
  			dialog.info('请求失败，请稍后重试',function(){},3000);
  			$('#cata-main>.dialog-loading').modal('hide');
		},dataType:"json"
	});
};