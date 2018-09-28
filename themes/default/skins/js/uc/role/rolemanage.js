var grid;
var Role = function() {
    var handleRecords = function() {
    	 grid = new Datatable();
        grid.init({
            src: $("#rolelist_table"),
            onSuccess: function(grid) {},
            onError: function(grid) {},
            dataTable: {
                "columns": [{
                    "data": "role_id",
                    "bSortable": false
                },
                {
                    "data": "name",
                    "bSortable": false
                },
                {
                    "data": "note",
                    "bSortable": false
                },
                {
                	"data": "abbr_name",
                	"bSortable": false
                },
                {
                    "data": "role_id",
                    "bSortable": false,
                    "sClass": "text-center"
                }],
                "columnDefs": [{
                    "targets": [0],
                    "render": function(data, type, full) {
                        var text = "<input type=\"checkbox\" name=\"role_id\" value=\"" + data + "\">";
                        return text;
                    }
                },
                {
                    "targets": [4],
                    "render": function(data, type, full) {
                    	//var text = "<a href=\""+getRootPath()+"/role/functiontree.htm?role_id="+data+"\">权限设置</a> ";
                    	return "<a  onclick=\"doDetail("+data+")\" data-toggle='modal' href='#roleModal'>权限设置</a>";
                    }
                }],
                "pageLength": 10,
                "ajax": {
                	"url": getRootPath() + '/role/rolemanage.do?method=getRoleNodes'
                }
                   
                },
        });

        //搜索条件
        $('.input-group .btn-info').click(function() {
            var keywords = $("input[name='keywords']").val();
            grid.clearAjaxParams();
            grid.setAjaxParam("keywords", keywords);
            grid.getDataTable().ajax.reload();
        });
    }
  
    return {
    	
        init: function() {
            handleRecords();
            
            //修改角色信息
            $("#update_role").click(function() {
                var uid = $("#rolelist_table").find("input[type='checkbox']:checked").val();
                if (uid == undefined) {
                    dialog.alert('提示信息', '请至少选中一条用户记录！');
                    return;
                } else {
                	var items = $("#rolelist_table").find("input[type='checkbox']:checked").val();
                	window.location.href = getRootPath()+"/role/roleNode.htm?role_id="+items;
                }
            });
        }
    }
			
} ();
