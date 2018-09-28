/**
 * Created by ZhangYe on 2015/8/20.
 */
$(function() {
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
	        'data' : {
	            'url' : function (node) {
	            	return getRootPath() + '/organization/OrganizationList.do?method=GetTreeNouser';
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
	}).bind("click.jstree", ".jstree-anchor", function(event) { 
		var id = $(event.target).parents('li').attr('id');
		var strs= new Array();
		strs=id.split("/");
		id = strs[strs.length-1];
		$('.treeId').val(id);
		$('#parent_org_code').val(id);
	});
    $('.modal-footer .modal-industry').click(function(){
        var first_type='';
        $('#FlatTree_industry .tree-item').each(function(){
            if($(this).find('input').prop('checked')){
                first_type = $(this).find('.tree-item-name').text();
            }
        });
        $('#database-name').val(first_type);
    });
    $('#list-table tbody td input').click(function() {
        var p_checked = $(this).parents('tbody').siblings('thead').find('input').prop('checked');//获取一级类当前是否被选中

        if(p_checked == false){//一级类未被选中，则二级类全部选中时，一级类也被选中
            var all_checked = 1;
            $(this).parents('tbody').find('input').each(function() {
                if($(this).prop('checked')!=true){
                    all_checked = 0;
                }
            });
            if(all_checked==1){
                $('#checkall').prop('checked',true);
            }
        }
        else{//一级类已被选中，则二级类取消选中时，一级类也被取消
            $('#checkall').prop('checked',false);
        }
    });

    $(".offline").click(function(){
        dialog.confirm("确认","确认下线吗？");
    });
    $(".delete").click(function(){
        dialog.confirm("确认","确认删除吗？");
    });
    $("#delete").click(function(){
        dialog.confirm("确认","确认删除吗？");
    });
    $("#offline").click(function(){
        dialog.confirm("确认","确认批量下线吗？");
    });
    $("#online").click(function(){
        dialog.confirm("确认","确认批量上线吗？");
    });
    var grid = new Datatable();

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
                "data": "cata_type",
                "bSortable": false
            },
            {
                "data": "org_code",
                "bSortable": false
            },
            {
                "data": "cata_language",
                "bSortable": false
            },
            {
                "data": "cata_tags",
                "bSortable": false
            }
        ],
            "columnDefs": [{
                "targets": [0],
                "render": function(data, type, full) {
                    var text = "<input type=\"checkbox\" name=\"id[]\" value=\"" + data + "\">";
                    var txt = "<input type=\"checkbox\">";
                    if (data != 1) {
                        return text;
                    } else {
                        return txt;
                    }
                }
            },
            {
                "targets": [6],
                "render": function(data, type, full) {
                    var text = "未启用";
                    if (data == 1 || "1" == data) {
                        text = "已启用";
                    }
                    return text;
                }
            },
            {
                "targets": [7],
                "render": function(data, type, full) {
                    var text = "<a href='catalogdefine.htm'>编辑</a><a href='catalogmanage-detail.htm'>详情</a>";
                    return text;
                }
            }],
            "pageLength": 10,
            "ajax": {
                "url": getRootPath() + '/organization/OrganizationList.do?method=GetOrgan',
                'data' : function (d) {
                    d.org=$('.treeId').val();
                  }
            },
            "order": [[7, "des"]]
        }
    });
});
/*获取tag的详情*/
function changeTab(id){
	$('.treeId').val(id);
	grid.ajax.relaod();
}
function DatabaseChecked(){
	var node=$('#ogTree').jstree().get_selected(true); //获取所有选中的节点对象
	var id = node[0].id;
	var strs= new Array();
	strs=id.split("/");
	$('#database-nameId').val(strs[strs.length-1]);
	var text = node[0].text+'';
	$('#database-name').val(text);
}
