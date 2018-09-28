/**
 * Created by ZhangYe on 2015/8/20.
 */
$(function() {
    $('.dmp-table').DataTable({
        "language": {
            "lengthMenu": "显示 _MENU_ 条每页",
            "zeroRecords": "没有找到任何信息！",
            "info": " _PAGE_ / _PAGES_",
            "infoEmpty": "没有数据",
            "infoFiltered": "(filtered from _MAX_ total records)",

            "emptyTable":     "没有数据",
            "info":           "显示第 _START_ 到第 _END_ 条。（总共 _TOTAL_ 条）",
            "infoEmpty":      "显示第 0 到第 0 条（总 0 条）",
            "infoFiltered":   "(来自 _MAX_ 条的过滤数据)",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "显示 _MENU_ 条",
            "loadingRecords": "载入中...",
            "processing":     "处理中...",
            "search":         "搜索：",
            "zeroRecords":    "没有数据找到",
            "paginate": {
                "first":      "首页",
                "last":       "尾页",
                "next":       "下一页",
                "previous":   "上一页"
            },
            "aria": {
                "sortAscending":  ": 升序排列",
                "sortDescending": ": 降序排列"
            }
        },
        "paging":   false,
        "ordering": false,
        "info":     false,
        "lengthChange": false,
        "destroy":true,
        "searching": false,
        "autoWidth":false
    });
    /**添加行**/
    $('.dmp-table .add-row').click(function(){
        var tr_html = $(this).parents('.dmp-table').find('tbody tr').html();
        tr_html = '<tr>'+tr_html+'</tr>';
        $(this).parents('.dmp-table').find('tbody').append(tr_html);
    });
    /**删除行**/
    $('.dmp-table').on('click','.remove-row',function(){
        if($(this).parents('tr').siblings('tr').length==0){
            return false;
        }
        $(this).parents('tr').remove();
    });
});