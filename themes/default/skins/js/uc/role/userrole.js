var tableGrid;
var Userrole = function () {

    var handleRecords = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#userrolelist_table"),
            onSuccess: function (grid) {
            },
            onError: function (grid) {
            },
            dataTable: {
                "processing": true,
                "bDestroy": true,
                "columns": [{
                    "data": "uid",
                    "bSortable": false
                },
                    {
                        "data": "user_id",
                        "bSortable": false
                    },
                    {
                        "data": "nick_name",
                        "bSortable": false
                    },
                    {
                        "data": "ctime",
                        "bSortable": true
                    },
                    {
                        "data": "status",
                        "bSortable": false,
                        "sClass": "text-center"
                    },  
                    {
                        "data": "role_name",
                        "bSortable": false
                    }],
                "columnDefs": [{
                    "targets": [0],
                    "render": function (data, type, full) {
                        var text = '<input type=\"radio\" name = \"rolesub_id\" value=\"' + data + '\">';
                        return text;
                    }
                },
                {
                    "targets": [3],
                    "render": function (data, type, full) {
                    	var longDate = Number(data);
                        return new Date(longDate).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                    }
                },
                    {
                        "targets": [4],
                        "render": function (data, type, full) {
                            var text = "";
                            switch (data) {
                            case 0:
                            case "0":
                            	text = "未激活";
                                break;
                            case 1:
                            case "1":
                            	text = "正常";
                                break;
                            case 2:
                            case "2":
                            	text = "锁定";
                                break;
                            case 3:
                            case "3":
                            	text = "删除";
                                break;
                            default:
                            	text = "";
                        }
                            return text;
                        }
                    },
                    {
                        "targets": [5],
                        "render": function (data, type, full) {
                            var text = '<span class=\"fiedlongCss\" >' + data + '</span>';
                            return text;
                        }
                    },
                    {
                        "targets": [6],
                        "data": "uid",
                        "render": function (data, type, full) {
                            var text = "<a onclick=\"doDetail(" + data + ")\">详细信息</a>";
                            return text;
                        }
                    }],
                "pageLength": 10,
                "ajax": {
                    "url": getRootPath() + '/role/userroleList.do?method=GetUserrole',
                    //访问地址
                    'data': function (d) {
                        d.keywords = $('#searchName').val().replace(/\s+/g, "");
                    }
                },
                "order": [[1, "acs"]]
            }
        });
        //条件查询        
        $(".table-group1").click(function () {
            var searchName = $('#searchName').val();
            var aa = searchName.replace(/\s+/g, "");
            if (aa == "" || aa == null) {
                layer.msg("请输入查询信息", 2, 0);
            } else {
                grid.getDataTable().ajax.reload();
            }
        });

/*        $('.input-group .fa-search').click(function () {
        	grid.addAjaxParam("dept", "aa");
            grid.addAjaxParam("search", "key");
            grid.submitFilter();
        });*/
        tableGrid = grid;
    }

    return {
        init: function () {
            handleRecords();
        }
    };
}();
$(function () {
    $('#userrolelist_table').on('click', '.delobject', function () {
        var user_id = $(this).val();
        msg.confirm('确认 ', '确认删除吗？ ', function (user_id) {
            alert(user_id);
        });
    });
    $('#userrolelist_table').on('click', '.setobject', function () {
        //弹出设置对话框
        var user_role_id = $(this).val();
        $("#myModal-set").modal({
            remote: getRootPath() + "/privilege/userrole/setUserRole.do?user_role_id=" + user_role_id
        });
    });

});
