// 树的选中处理
function doAdd() {

    var name = $("#name").val();
    var type = $("#type").val();
    var note = $("#note").val();
    var optIds = getcheckedNodes();
    if (name == null || name == "") {
        alert("角色名称必须输入！");
        return false;
    }
    $.layer({
        shade: [0.5, '#000', true],
        area: ['240', '150'],
        dialog: {
            msg: '确认添加该角色？',
            btns: 2,
            type: 4,
            btn: ['确定', '取消'],
            yes: function () {
                layer.load('数据处理中...');
                /* layer.closeAll();
                 */
                $.ajax({
                    url: doAddRoleUrl,
                    type: "post",
                    dataType: "JSON",
                    data: {
                        "name": name,
                        "type": type,
                        "note": note,
                        "optIds": optIds
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function () {
                        layer.msg("操作成功", 2, 0);
                        window.location.href = toRoleListPageUrl;
                    },
                    error: function () {
                        /* layer.closeAll(); */
                        layer.msg("操作失败", 2, 0);
                    }
                });
            }
        }
    });
}

function doEdit() {
    var role_id = $("#role_id").val();
    var name = $("#name").val();
    var type = $("#type").val();
    var note = $("#note").val();
    var optIds = getcheckedNodes();

    if (name == null || name == "") {
        alert("角色名称必须输入！");
        return false;
    }
    $.layer({
        shade: [0.5, '#000', true],
        area: ['240', '150'],
        dialog: {
            msg: '确认更新该角色？',
            btns: 2,
            type: 4,
            btn: ['确定', '取消'],
            yes: function () {
                /* layer.closeAll();
                 layer.load('删除中...'); */
                $.ajax({
                    url: doEidtRoleUrl,
                    type: "post",
                    dataType: "JSON",
                    data: {
                        "role_id": role_id,
                        "name": name,
                        "type": type,
                        "note": note,
                        "optIds": optIds
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function () {
                        layer.msg("操作成功", 2, 0);
                        window.location.href = toRoleListPageUrl;
                    },
                    error: function () {
                        /* layer.closeAll(); */
                        layer.msg("操作失败", 2, 0);
                    }
                });
            }
        }
    });
}


//表格处理
function jump(data) {
    window.location.href = toEditRoleUrl + "?role_id=" + data;
}
//表格处理
//全局变量 回车时使用。
var gridTable;
function handleRecords() {

    var grid = new Datatable();
    grid.init({
        src: $("#rolelist_table"),
        onSuccess: function (grid) {
        },
        onError: function (grid) {
        },
        dataTable: {
            "columns": [
                {
                    "data": "role_id",
                    "bSortable": false
                },
                {
                    "data": "name",
                    "bSortable": false
                },
                {
                    "data": "type",
                    "bSortable": true
                },
                {
                    "data": "note",
                    "bSortable": false
                },
                {
                    "data": "role_id",
                    "bSortable": false,
                    "sClass": "text-center"
                }],
            "columnDefs": [
                {
                    "targets": [0],
                    "render": function (data, type, full) {
                        var text = "<input type=\"checkbox\" name = \"menusub_id\" value=\"" + data + "\">";
                        return text;
                    }
                },
                {
                    "targets": [4],
                    "render": function (data, type, full) {
                        var text = "<a onclick=\"jump(" + data + ")\">编辑</a><a onclick=\"doDel(" + data + ")\">删除</a><a onclick=\"doDetail(" + data + ")\">详细信息</a>";
                        return text;
                    }
                }],
            "pageLength": 10,
            "ajax": {
                "url": getTableRoleUrl,
                //访问地址
                'data': function (d) {
                    d.keywords = $('#searchName').val().replace(/\s+/g, "");
                }
            },
            "order": [[3, "des"]]
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
    gridTable = grid;
/*    $('.input-group .fa-search').click(function () {
        grid.addAjaxParam("dept", "aa");
        grid.addAjaxParam("search", "key");
        grid.submitFilter();
    });*/

    $('#del').click(function () {
        dialog.confirm('确认', '确认删除吗？');
    });
    $('#enable').click(function () {
        dialog.confirm('确认', '确认启用吗？');
    });
    $('#disable').click(function () {
        dialog.confirm('确认', '确认禁用吗？');
    });
}


function doDelSome(role_ids) {
    $.layer({
        shade: [0.5, '#000', true],
        area: ['240', '150'],
        dialog: {
            msg: '确认删除选中的角色？',
            btns: 2,
            type: 4,
            btn: ['确定', '取消'],
            yes: function () {
                $.ajax({
                    url: doBatDelRoleUrl,
                    type: "post",
                    //dataType: "JSON",
                    data: {role_id: role_ids},
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        data = $.parseJSON(data);
                        if (data.code == 1) {
                            layer.msg(data.msg, 2, 1, function () {
                                window.location.href = toRoleListPageUrl;
                            });
                        } else {
                            layer.msg(data.msg, 2, 0);
                        }
                    },
                    error: function () {
                        layer.msg("操作失败", 2, 0);
                    }
                });
            }
        }
    });
}

function doDel(data) {
    if (!data) {
        alert("数据不存在！");
        return
    }
    $.layer({
        shade: [0.5, '#000', true],
        area: ['240', '150'],
        dialog: {
            msg: '确认删除该角色？',
            btns: 2,
            type: 4,
            btn: ['确定', '取消'],
            yes: function () {
                layer.load('删除中...');
                $.ajax({
                    url: doDelRoleUrl,
                    type: "post",
                    //dataType: "JSON",
                    data: {role_id: data},
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        data = $.parseJSON(data);
                        if (data.code == 1) {
                            layer.msg(data.msg, 2, 1, function () {
                                window.location.href = toRoleListPageUrl;
                            });
                        } else {
                            layer.msg(data.msg, 2, 0);
                        }
                    },
                    error: function () {
                        layer.msg("操作失败", 2, 0);
                    }
                });
            }
        }
    });
}


//详细信息展示
function doDetail(data) {
    window.location.href = toRoleDetailUrl + "?role_id=" + data;
}


function initDatable() {

    handleRecords();
}

