var Menu = function() {
    var handleRecords = function() {
        var grid = new Datatable();
        grid.init({
            src: $("#organizationlist_table"),
            onSuccess: function(grid) {},
            onError: function(grid) {},
            dataTable: {
                "columns": [{
                    "data": "org_code",
                    "bSortable": false
                },
                {
                    "data": "org_code",
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
                    "data": "general_code",
                    "bSortable": false
                },
                {
                    "data": "org_code",
                    "bSortable": false
                }],
                "columnDefs": [{
                    "targets": [0],
                    "render": function(data, type, full) {
                        var text = "<input type='checkbox' name = \"menusub_id\"  value=\"" + data + "\">";
                            return text;
                    }
                },
                {
                    "targets": [5],
                    "render": function(data) {
                    	return "<a onclick=\"jump("+data+")\">编辑</a><a onclick=\"doDel("+data+")\">删除</a>";
                    }
                }],
                "pageLength": 10,
                "ajax": {
                    "url": getRootPath() + '//organization/OrganizationList.do?method=getOrganization',
                    //访问地址  doGetOrganization
                },
                "order": [[1, "des"]]
            }
        });
    }
    return {
        init: function() {
            handleRecords();
        }
    };
   
} ();