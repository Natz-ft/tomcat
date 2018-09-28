var grid = new Datatable();
var Menu = function() {
    var handleRecords = function() {
        grid.init({
            src: $("#organizationlist_table"),
            onSuccess: function(grid) {},
            onError: function(grid) {},
            loadingMessage: '数据加载中...',
            dataTable: {
                "columns": [{
                    "data": "org_code",
                    "bSortable": false
                },
                {
                    "data": "general_code",
                    "bSortable": false
                    
                },
                {
                    "data": "org_name",
                    "bSortable": false
                },
                {
                    "data": "short_name",
                    "bSortable": false
                },
                {
                	"data": "organ_group",
                	"bSortable": false
                },
                {
                    "data": "org_code",
                    "bSortable": false
                },
                {
                	"data": "seq",
                	"bSortable": false,
                	 "visible" : false 
                },
                ],
                "columnDefs": [{
                    "targets": [0],
                    "render": function(data, type, full) {
                        var text = "<input type='checkbox' name = \"menusub_id\"  value=\"" + data + "\">";
                            return text;
                    }
                },
                {
                    "targets": [5],
                    "render": function(data, type, full) {
                    	var del = haspermission('/organization/OrganizationList.do?method=delOrganization');
                    	var edit = haspermission('/organization/editorganization.htm'); 
                    	if(del=="none"&&edit=="none"){
                    		return "--";
                    	}
                    	return "<a style='display:"+edit+"' onclick=\"jump('"+data+"')\">编辑</a><a style='display:"+del+"' onclick=\"doDel('"+data+"','"+full.general_code+"')\">删除</a>";
                    }
                }],
                "pageLength": 10,
                "ajax": {
                    "url": getRootPath() + '/organization/OrganizationList.do?method=getOrganization',
                    //访问地址  doGetOrganization
             	   'data' : function (d) {
                       d.keywords=$('#searchName').val();
                       d.OrgCode=$('#searchGeneralCode').val();
                     }
                },
                "ordering": true,
                "order": [[6, "asc"]]
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

