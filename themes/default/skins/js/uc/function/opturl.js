var OptUrl = function () {

    var handleRecords = function () {

        var app_id = $("#app_id").val();
        var opt_id = $("#opt_id").val();
        
        var grid = new Datatable();

        grid.init({
            src: $("#URLTable"),
            onSuccess: function (grid) {
            },
            onError: function (grid) {
            },
            paging: false,
            bPaginate: false,
            bFilter: false,
            dataTable: {
                "columns": [{
                    "data": grid.Rows.Count,
                    "bSortable": false
                },
                    {
                        "data": "url_name",
                        "bSortable": false
                    },
                    {
                        "data": "url_value",
                        "bSortable": false
                    }
                ],
                "columnDefs": [
                    {
                        "targets": [3],
                        "data": "url_id",
                        "render": function (data, type, full) {
                            var text = "<a onclick=\"doDel(" + data + ")\">删除</a>";
                            return text;
                        }
                    }],
                "bLengthChange": false, //关闭每页显示多少条数据
                "bPaginate": false, //翻页功能
                "bFilter": false, //过滤功能
                "bPaginate": false,//是否使用分页
                "bSort": true, //排序功能
                "bJQueryUI": false,
                "bInfo": false,//页脚信息
                "bAutoWidth": false,//自动宽度
                "bProcessing": false,//正在处理提示
                "aoColumns":false,
                /*                "pageLength": 10,*/
                "ajax": {
                    "url": getRootPath() + '/function/OperateManage.do?method=getUrl&app_id=' + app_id + '&opt_id=' + opt_id,
                    //访问地址
                    'data': function (d) {
                        d.keywords = $('#searchName').val().replace(/\s+/g, "");
                    }
                },
                "order": [[3, "des"]]
            }
        });
        //条件查询        
        /*        $(".table-group1").click(function() {
         var searchName = $('#searchName').val();
         var aa=searchName.replace(/\s+/g,"");
         if(aa==""||aa==null){
         layer.msg("请输入查询信息",2,0);
         }else{
         grid.getDataTable().ajax.reload();
         }
         });

         $('.input-group .fa-search').click(function() {
         grid.addAjaxParam("dept", "aa");
         grid.addAjaxParam("search", "key");
         grid.submitFilter();
         });*/
    }

    return {
        init: function () {
            alert("init");
            handleRecords();
        }
    };
}();


$(function () {
    $('#URLTable').on('click', '.delobject', function () {
        var url_id = $(this).val();
        msg.confirm('确认 ', '确认删除吗？ ', function (url_id) {
            alert(url_id);
        });
    });

});