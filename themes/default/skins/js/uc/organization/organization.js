/**
 * Created by ZhangYe on 2015/8/20.
 */
var generalcode;
var type;
$(function() {
	$("#groupTree").jstree({  
		"core" : {
			'themes' : {
				'responsive' : false
			}, 
			'check_callback' : function(o, n, p, i, m) {
				if(m && m.dnd && m.pos !== 'i') { return false; }
				if(o === "move_node" || o === "copy_node") {
					if(this.get_node(n).parent === this.get_node(p).id) { return false; }
				}
				return true;
			},
	        // so that create works
	        'data' : {
	            'url' : function (node) {
	            	return getRootPath() + '/organization/catalogDefine.do?method=GetGroupTree';
	            },
	            'dataType': 'json',
	            'data' : function (node) {
	                return { 'id' : node.id};
	              }
	        }
	    },
	    "types" : {
	        "default" : {
	            "icon" : "fa fa-folder icon-state-warning icon-lg"
	        },
	        "file" : {
	            "icon" : "fa fa-file icon-state-warning icon-lg"
	        }
	    },
		'plugins' : ['types','contextmenu']
	});
	$("#ogTree").jstree({  
		"core" : {
			'themes' : {
				'responsive' : false
			}, 
			'check_callback' : function(o, n, p, i, m) {
				if(m && m.dnd && m.pos !== 'i') { return false; }
				if(o === "move_node" || o === "copy_node") {
					if(this.get_node(n).parent === this.get_node(p).id) { return false; }
				}
				return true;
			},
	        // so that create works
	        'data' : {
	            'url' : function (node) {
	            	return getRootPath() + '/organization/OrganizationList.do?method=GetTree';
	            },
	            'dataType': 'json',
	            'data' : function (node) {
	                return { 'id' : node.id};
	              }
	        }
	    },
	    "types" : {
	    	"allhosts" : {
	            "icon" : "fa fa-home fa-fw"
	        },
	        "default" : {
	            "icon" : "fa fa-book fa-fw"
	        },
	        "province" : {
	            "icon" : "fa fa-cog fa-fw"
	        },
	        "user" : {
	            "icon" : "fa fa-user fa-fw"
	        }
	    },
		'plugins' : ['types']
	}).on("click.jstree", ".jstree-anchor", function(event) {
		var id = $(event.target).parents('li').attr('id');
		var aria_level = $(event.target).parents('li').attr('aria-level');
		var strs= new Array();
		strs=id.split("/");
		id = strs[strs.length-1]
		$('#treeId').val(id);
		$('#searchGeneralCode').val(id);
		var addstr = $('#searchGeneralCode').val();
//		var str = document.getElementById("addOrg").onclick;
		if(addstr!="" && addstr !=null){
			generalcode	 = addstr;
//			document.getElementById("addOrg").onclick = fun2;
			fun2();
		}
		grid.getDataTable().ajax.reload();
		grid1.getDataTable().ajax.reload();
		grid.submitFilter();
		//grid1.submitFilter();
	});
    $("#delete").click(function(){
    	var vd_ids = "";
    	$("#list-table tbody input[type='checkbox']").each(function(){
    		if($(this).prop("checked")){
    			vd_ids += "," + $(this).attr("name");
    		}
    	});
    	if(vd_ids.length){
            dialog.confirm("删除",'确认删除选中数据目录？', deleteCataLog);
    	}else{
       		layer.msg("请至少选择一条记录",2,0);
       	}
    });
    //删除数据目录
    var deleteCataLog = function(){
        var cata = $("#list-table").find("input[type='checkbox'][name='id[]']:checked");
        var cata_ids="";
        cata.each(function() {
    		var cata_id = $(this).val();
    		cata_ids = cata_ids + cata_id + ",";
        });
    	$.ajax({
            url: getRootPath() + "/data/catalog/catalogManage.do?method=deleteCatalog",
            data: {
                cata_id: cata_ids
            },
            success: function(data) {
                if (data.code > 0) {
                	layer.msg("操作成功！",1,0);
                	grid.getDataTable().ajax.reload();
                    return;
                } else {
                	layer.msg("操作失败！",1,0);
                    return;
                }
            },
            error: function(data) {
            	layer.msg("网络异常！",1,0);
                return;
            },
            dataType: "json"
        });
    }
    //全选
    $("#checkall").click(function(){
    	if($(this).prop('checked')==true){
    		$("input[type='checkbox'][name='id[]']").attr("checked",true) 
    		$("input[type='checkbox'][name='id[]']").closest("span").prop("class","checked");
    	}else{
    		$("input[type='checkbox'][name='id[]']").attr("checked",false) 
        	$("input[type='checkbox'][name='id[]']").closest("span").prop("class","");    		
    	}
    });
   /* var grid = new Datatable();

    grid.init({
        src: $("#list-table"),
        onSuccess: function(grid) {},
        onError: function(grid) {},
        dataTable: {
            "columns": [{
                "data": "cata_id",
                "bSortable": false
            },
            {
                "data": "title",
                "bSortable": false
            },
            {
                "data": "group_name",
                "bSortable": false
            },
            {
                "data": "org_name",
                "bSortable": false
            },
            {
                "data": "dataset_type",
                "bSortable": false,
                "sWidth":"77px",
                "sClass":"text-center"
            },
            {
                "data": "is_public",
                "bSortable": false,
                "sWidth":"77px",
                "sClass":"text-center"
            },
            {
                "data": "status",
                "bSortable": false,
                "sWidth":"63px"
            }
            ,
            {
                "data": "cata_id",
                "bSortable": false,
                "sWidth":"50px"
            }
        ],
            "columnDefs": [{
                "targets": [0],
                "render": function(data, type, full) {
                    var text = "<input type=\"checkbox\" name=\"id[]\" value=\"" + data + "\">";
                    return text;
                }
            },
            {
                "targets": [1],
                "render": function(data, type, full) {
                    var text = "<a onclick=\"detail("+full.cata_id+")\">"+data+"</a>";
                    return text;
                }
            },
            {
                "targets": [4],
                "render": function(data, type, full) {
                    var text = "数据集";
                    if (data == 2 ) {
                        text = "文件集";
                    }
                    if (data == 3 ) {
                        text = "API";
                    }
                    if (data == 4 ) {
                        text = "地图";
                    }
                   return text;
                }
            },
            {
                "targets": [5],
                "render": function(data, type, full) {
                    var text = "对外开放";
                    if (data == 2 ) {
                        text = "内部共享";
                    }
                    if (data == 3 ) {
                        text = "外部共享";
                    }
                    if (data == 4 ) {
                        text = "不共享";
                    }
                   return text;
                }
            },
            {
                "targets": [6],
                "render": function(data, type, full) {
                    var text = "";
                    if (data == 0 || "0" == data) {
                        text = "未提交";
                    }
                     if (data == 1 || "1" == data) {
                        text = "待审批";
                    }
                    if (data == 2 || "2" == data) {
                        text = "待发布";
                    }
                    if (data == 3 || "3" == data) {
                        text = "驳回";
                    }
                    if (data == 4 || "4" == data) {
                        text = "已上线";
                    }
                    if (data == 5 || "5" == data) {
                        text = "已下线";
                    }
                    return text;
                }
            },
            {
                "targets": [7],
                "render": function(data, type, full) {
                    var text = "<a onclick=\"edit("+data+")\">编辑</a>";
                    return text;
                }
            }],
            "pageLength": 10,
            "ajax": {
                "url": getRootPath() + '/data/catalog/catalogManage.do?method=GetCataLog',
                'data' : function (d) {
                    d.org=$('#treeId').val();
                    d.title=$('#searchName').val();
                    d.group_id=$('#database-themeId').val();
                    d.dataset_type=$('#dataset_type').val();
                    d.status="0,3";
                  }
            },
            "order": [[7, "des"]]
        }
    });*/
    $("#batSub").click(function(){
    	batSub();
    });    
/*	//查询
    $('.btn-info').click(function() {
        grid.getDataTable().ajax.reload();
    });*/
});
function DatabaseThemeChecked(){
	var node=$('#groupTree').jstree().get_selected(true); //获取所有选中的节点对象
	var id = node[0].id;
	var strs= new Array();
	strs=id.split("/");
	$('#database-themeId').val(strs[strs.length-1]);
	var text = node[0].text+'';
	$('#database-theme').val(text);
}
function sub(cata_id){
	dialog.confirm("确认","确认操作吗？",function(){
		$.ajax({
	        url: getRootPath() + "/organization/OrganizationList.do?method=getTree",
	        data: {
	            cata_id: cata_id,
	            status:"1"
	        },
	        success: function(data) {
	            if (data.code > 0) {
	            	layer.msg("操作成功！",1,0);
	            	$("#list-table").DataTable().ajax.reload();
	                return;
	            } else {
	            	layer.msg("操作失败！",1,0);
	                return;
	            }
	        },
	        error: function(data) {
	        	layer.msg("网络异常！",1,0);
	            return;
	        },
	        dataType: "json"
	    });
	});
}
function batSub(){
	var vd_ids = "";
	$("#list-table tbody input[type='checkbox']").each(function(){
		if($(this).prop("checked")){
			vd_ids += "," + $(this).attr("name");
		}
	});
	if(vd_ids.length){
	    var cata = $("#list-table").find("input[type='checkbox'][name='id[]']:checked");
	    var cata_ids="";
	    cata.each(function() {
			var cata_id = $(this).val();
			cata_ids = cata_ids + cata_id + ",";
	    });
		sub(cata_ids);
	}else{
   		layer.msg("请至少选择一条记录",2,0);
   	}
}

function fun2(){
	var str1 = getRootPath() + '/organization/addorganization.htm?orgcode='+generalcode;
//	window.location.href=str1;
	document.getElementById("addiframe").src = str1;
}
