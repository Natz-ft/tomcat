var grid1 = new Datatable();

//组织机构列表
var Menu1 = function() {
    var handleRecords1 = function() {
		grid1.init({
		            src: $("#userlist_table"),
		            onSuccess: function(grid1) {},
		            onError: function(grid1) {},
		            dataTable: {
		                "columns": [/*{
		                    "data": "uid",
		                    "bSortable": false
		                },
		                {
		                    "data": "user_id",
		                    "bSortable": false
		                },*/
		                {
		                    "data": "nick_name",
		                    "bSortable": false
		                },
		                {
		                    "data": "login_email",
		                    "bSortable": false
		                },
		                {
		                    "data": "login_phone",
		                    "bSortable": false
		                },
		                {
		                    "data": "status",
		                    "bSortable": false,
		                    "sWdith": "70px",
		                    "sClass": "text-center"
		                }],
		                "columnDefs": [/*{
		                    "targets": [0],
		                    "render": function(data, type, full) {
		                        var text = "<input type=\"checkbox\" name=\"id[]\" value=\"" + data + "\">";
		                        return text;
		                    }
		                },*/
		                {
		                    "targets": [3],
		                    "render": function(data, type, full) {
		                        var text = "";
		                        if(data == 0 || "0" == data){
		                    		text = "未激活";
		                    	}else if(data == 1 || "1" == data){
		                    		text = "正常";
		                    	}else if(data == 2 || "2" == data){
		                    		text = "锁定";
		                    	}else if(data == 3 || "3" == data){
		                    		text = "删除";
		                    	}
		                        return text;
		                    }
		                }],
		                "pageLength": 10,
		                "ajax": {
		             	   "url": getRootPath() + '/organization/OrganizationList.do?method=getUserlist',
		             	   'data' : function (d) {
		                       //d.keywords=$('#searchName').val();
		                       d.OrgCode=$('#searchGeneralCode').val();
		                     }
		                },
		                "order": [1, "des"]
		            }
		        });
		//条件查询        
        $(".table-group1").click(function() {
            grid1.getDataTable().ajax.reload();
        });
    }
    return {
        init: function() {
            handleRecords1();
        }
    };
   
} ();