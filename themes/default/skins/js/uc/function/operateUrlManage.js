var optgrid = new Datatable();
var optMenu = function() {
    var handleRecords = function() {
        optgrid.init({
            src: $("#operateUrl_table"),
            onSuccess: function(optgrid) {},
            onError: function(optgrid) {},
            loadingMessage: '数据加载中...',
            dataTable: {
                "columns": [{
                    "data": "opt_code",
                    "bSortable": false
                },
                {
                    "data": "opt_name",
                    "bSortable": false
                },
                {
                    "data": "url_name",
                    "bSortable": false
                },
                {
                    "data": "url_value",
                    "bSortable": false
                }],
                "columnDefs": [],
                "pageLength": 10,
                "ajax": {
                    "url": getRootPath() + '/function/moduleManage.do?method=getOperateUrllist',
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
            optgrid.getDataTable().ajax.reload();
        });
    }
    return {
        init: function() {
            handleRecords();
        }
    };
   
} ();
