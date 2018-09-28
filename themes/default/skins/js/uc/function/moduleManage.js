var grid = new Datatable();
var moduleMenu = function() {
    var handleRecords = function() {
        grid.init({
            src: $("#modulelist_table"),
            onSuccess: function(grid) {},
            onError: function(grid) {},
            loadingMessage: '数据加载中...',
            dataTable: {
                "columns": [{
                    "data": "module_id",
                    "bSortable": false
                },
                {
                    "data": "module_name",
                    "bSortable": false
                },
                {
                    "data": "is_leaf_module",
                    "bSortable": false
                },
                {
                    "data": "seq",
                    "bSortable": false
                }],
                "columnDefs": [{
                    "targets": [2],
                    "render": function(data, type, full) {
                        if(data==1)
                            return "是";
                        else
                        	return  "否";
                    }
                }],
                "pageLength": 10,
                "ajax": {
                    "url": getRootPath() + '/function/moduleManage.do?method=getModulelist',
                    //访问地址  doGetOrganization
             	   'data' : function (d) {
             		  d.module_id=$("#module_id").val();
             		 d.app_id=$("#app_id").val();
                     }
                },
                "order": [1, "des"]
            }
        });
        //条件查询        
        $(".table-group1").click(function() {
            grid.getDataTable().ajax.reload();
        });
    }
    return {
        init: function() {
            handleRecords();
        }
    };
   
} ();
