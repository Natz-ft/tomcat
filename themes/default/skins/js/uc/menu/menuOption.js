var grid = new Datatable();
var Menu = function() {
    var handleRecords = function() {
        grid.init({
            src: $("#menuOptionlist_table"),
            onSuccess: function(grid) {},
            onError: function(grid) {},
            loadingMessage: '数据加载中...',
            dataTable: {
                "columns": [
                {
                    "data": "menu_name",
                    "bSortable": false
                },
                {
                    "data": "app_name",
                    "bSortable": false
                },
                {
                    "data": "request_action",
                    "bSortable": false
                },
                {
                    "data": "is_leaf",
                    "bSortable": false
                },
                {
                    "data": "is_use",
                    "bSortable": false
                }],
                "columnDefs": [
                {
                    "targets": [3],
                    "render": function(data, type, full) {
                        if(data==1)
                            return "是";
                        else
                        	return  "否";
                    }
                },
                {
                    "targets": [4],
                    "render": function(data, type, full) {
                        if(data==1)
                            return "是";
                        else
                        	return  "否";
                    }
                }],
                "pageLength": 10,
                "ajax": {
                    "url": getRootPath() + '/menu/MenuOption.do?method=getMenuList',
                    //访问地址  doGetOrganization
             	   'data' : function (d) {
             		  d.parentId=$("#sourceId").val();
             		 d.type_value=$("#menu_type").val();
                     }
                },
                "order": [1, "des"]
            }
        });
        //条件查询        
        $(".table-group1").click(function() {
            grid.getDataTable().ajax.reload();
           grid1.getDataTable().ajax.reload();
        });
    }
    return {
        init: function() {
            handleRecords();
        }
    };
   
} ();
