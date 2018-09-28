var grid;
var User = function() {
    var handleRecords = function() {
    	grid = new Datatable();

        grid.init({
            src: $("#userlist_table"),
            onSuccess: function(grid) {},
            onError: function(grid) {},
            dataTable: {
                "columns": [
                {
                    "data": "user_id",
                    "bSortable": false
                },
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
                    "data": "user_type",
                    "bSortable": false,
                    "sWdith": "70px",
                    "sClass": "text-center"
                },
                {
                    "data": "status",
                    "bSortable": false,
                    "sWdith": "80px",
                    "sClass": "text-center"
                }],
                "columnDefs": [
                {
                    "targets": [5],
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
                    "url": getRootPath() + '/user/userlist.do?method=getActiveUserList',
                }
            }
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
            
            //启用用户操作
            $("#enableUser").click(function() {
                var uid = $("#userlist_table").find("input[type='checkbox']:checked").val();
                if (uid == undefined) {
                    dialog.alert('提示信息', '请至少选中一条用户记录！');
                    return;
                } else {
                	var items = $("#userlist_table").find("input[type='checkbox']:checked");
                	 dialog.confirm('提示信息', '确认启用选中的用户',enableUser);
                }
            });
            
            var enableUser = function(){
           	 var items = $("#userlist_table").find("input[type='checkbox']:checked");
           	 var uids = "";
                items.each(function() {
	               	var uid = $(this).val();
	               	if(uid!=''&&uid!='on'){
	               		uids = uids + uid + ",";
	               	}
                });
                $.ajax({
                    url: getRootPath() + "/user/userlist.do?method=updateUserStatus",
                    data: {
                        uids: uids,
                        status:1
                    },
                    success: function(data) {
                        if (data > 0) {
                            dialog.alert('提示信息', '操作成功！');
                            grid.getDataTable().ajax.reload();
                            return;
                        } else {
                            dialog.alert('提示信息', '操作失败！');
                            return;
                        }
                    },
                    error: function(data) {
                        dialog.alert('提示信息', '网络异常！');
                        return;
                    },
                    dataType: "json"
                });
           }
            
          //禁用用户操作
            $("#disableUser").click(function() {
                var uid = $("#userlist_table").find("input[type='checkbox']:checked").val();
                if (uid == undefined) {
                    dialog.alert('提示信息', '请至少选中一条用户记录！');
                    return;
                } else {
                	var items = $("#userlist_table").find("input[type='checkbox']:checked");
                	 dialog.confirm('提示信息', '确认禁用选中的用户',disableUser);
                }
            });
            
            var disableUser = function(){
           	 var items = $("#userlist_table").find("input[type='checkbox']:checked");
           	 var uids = "";
                items.each(function() {
	               	var uid = $(this).val();
	               	if(uid!=''&&uid!='on'){
	               		uids = uids + uid + ",";
	               	}
                });
                $.ajax({
                    url: getRootPath() + "/user/userlist.do?method=updateUserStatus",
                    data: {
                        uids: uids,
                        status:2
                    },
                    success: function(data) {
                        if (data > 0) {
                            dialog.alert('提示信息', '操作成功！');
                            grid.getDataTable().ajax.reload();
                            return;
                        } else {
                            dialog.alert('提示信息', '操作失败！');
                            return;
                        }
                    },
                    error: function(data) {
                        dialog.alert('提示信息', '网络异常！');
                        return;
                    },
                    dataType: "json"
                });
           }
            
          //驳回用户操作
            $("#disableAuthenLevel").click(function() {
                var uid = $("#userlist_table").find("input[type='checkbox']:checked").val();
                if (uid == undefined) {
                    dialog.alert('提示信息', '请至少选中一条用户记录！');
                    return;
                } else {
                	 dialog.confirm('提示信息', '确认驳回选中的用户',disableAuthenLevel);
                }
            });
            
            var disableAuthenLevel = function(){
           	 var items = $("#userlist_table").find("input[type='checkbox']:checked");
           	 var uids = "";
                items.each(function() {
	               	var uid = $(this).val();
	               	if(uid!=''&&uid!='on'){
	               		uids = uids + uid + ",";
	               	}
                });
                $.ajax({
                    url: getRootPath() + "/user/userlist.do?method=updateUserLevel",
                    data: {
                        uids: uids,
                        authen_level:4
                    },
                    success: function(data) {
                        if (data > 0) {
                            dialog.alert('提示信息', '操作成功！');
                            grid.getDataTable().ajax.reload();
                            return;
                        } else {
                            dialog.alert('提示信息', '操作失败！');
                            return;
                        }
                    },
                    error: function(data) {
                        dialog.alert('提示信息', '网络异常！');
                        return;
                    },
                    dataType: "json"
                });
           }
          //审核用户操作
            $("#enableAuthenLevel").click(function() {
                var uid = $("#userlist_table").find("input[type='checkbox']:checked").val();
                if (uid == undefined) {
                    dialog.alert('提示信息', '请至少选中一条用户记录！');
                    return;
                } else {
                	var items = $("#userlist_table").find("input[type='checkbox']:checked");
                    items.each(function() {
    	               	var ttt = $(this).parents("tr").find("td:eq(8)").text();
    	                if($(this).parents("tr").find("td:eq(8)").text() === "普通用户"){
    	                	dialog.alert('提示信息', "普通用户无需审核，请取消选择普通用户。");
    	                	return;
    	                }
                    });
                	 dialog.confirm('提示信息', '确认通过审核选中的用户',enableAuthenLevel);
                }
            });
            
            var enableAuthenLevel = function(){
           	 var items = $("#userlist_table").find("input[type='checkbox']:checked");
           	 var uids = "";
                items.each(function() {
	               	var uid = $(this).val();
	               	if(uid!=''&&uid!='on'){
	               		uids = uids + uid + ",";
	               	}
                });
                $.ajax({
                    url: getRootPath() + "/user/userlist.do?method=updateUserLevel",
                    data: {
                        uids: uids,
                        authen_level:2
                    },
                    success: function(data) {
                        if (data > 0) {
                            dialog.alert('提示信息', '操作成功！');
                            grid.getDataTable().ajax.reload();
                            return;
                        } else {
                            dialog.alert('提示信息', '操作失败！');
                            return;
                        }
                    },
                    error: function(data) {
                        dialog.alert('提示信息', '网络异常！');
                        return;
                    },
                    dataType: "json"
                });
           }
            
          //重置密码操作
            $("#resetUserPWD").click(function() {
                var uid = $("#userlist_table").find("input[type='checkbox']:checked").val();
                if (uid == undefined) {
                    dialog.alert('提示信息', '请至少选中一条用户记录！');
                    return;
                } else {
                	var items = $("#userlist_table").find("input[type='checkbox']:checked");
                	 dialog.confirm('提示信息', '确认重置选中的用户的密码？重置后的密码为123456a?',resetUserPWD);
                }
            });
			var resetUserPWD = function() {
				var items = $("#userlist_table").find("input[type='checkbox']:checked");
				var uids = "";
				items.each(function() {
					var uid = $(this).val();
					if (uid != '' && uid != 'on') {
						uids = uids + uid + ",";
					}
				});
				$.ajax({
					url : getRootPath()
							+ "/user/userlist.do?method=resetUserPWD",
					data : {
						uids : uids
					},
					success : function(data) {
						if (data > 0) {
							dialog.alert('提示信息', '操作成功！');
							grid.getDataTable().ajax.reload();
							return;
						} else {
							dialog.alert('提示信息', '操作失败！');
							return;
						}
					},
					error : function(data) {
						dialog.alert('提示信息', '网络异常！');
						return;
					},
					dataType : "json"
				});
			} 
            
			var uid;
			$('#userlist_table').on('click','.delobject',function() {
				uid = $(this).val();
				dialog.confirm('提示信息', '确认删除当前用户吗？ ',function(obj){
					var obj = obj;
					var uids = uid;
					$.ajax({
						url : getRootPath()
								+ "/user/userlist.do?method=updateUserStatus",
						data : {
							uids : uid,
							status:3
						},
						success : function(data) {
							if (data > 0) {
								dialog.alert('提示信息', '操作成功！');
								grid.getDataTable().ajax.reload();
								return;
							} else {
								dialog.alert('提示信息', '操作失败！');
								return;
							}
						},
						error : function(data) {
							dialog.alert('提示信息', '网络异常！');
							return;
						},
						dataType : "json"
					});
				});
		    });
			
			//全选按钮
			$('#userlist_table').on("click", "#checkall", function(){ 
		        if($(this).prop('checked')){
		            $(this).parents('thead').siblings('tbody').find('input[type="checkbox"]').each(function() {
		                $(this).prop('checked',false);
		                $(this).click();
		            });
		        }
		        else{
		            $(this).parents('thead').siblings('tbody').find('input[type="checkbox"]').each(function() {
		                $(this).prop('checked',true);
		                $(this).click();
		            });
		        }
		    });
			
        }
    };

} ();

