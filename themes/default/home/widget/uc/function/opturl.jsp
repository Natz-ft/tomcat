<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="jstlfn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="dmp-tool">
    <div class="btn-group">
        <button type="button" class="btn btn-info" id="addUrl">新增URL</button>
    </div>
</div>
<div style="margin: 0px auto 0 auto;">
    <table class="table table-bordered table-striped dmp-table"
           id="URLTable" cellspacing="0" width="100%">
        <thead>
        <tr style="background-color: #23b2da; color: white;">
            <th style="width: 70px; padding-left: 10px;">序号</th>
            <th style="width: 200px">URL名称</th>
            <th>URL内容</th>
            <th style="width: 70px">操作</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
<script type="text/javascript">

    jQuery(document).ready(function () {
        handleRecords();
        //OptUrl.init();
    });

    $('#URLTable').on('click', '.remove-row', function () {
    	var urlId = $(this).parents('tr').find("td:eq(3)").children("input").val();
    	var urlval = $('#urlval').val();
    	if (urlId == "" || urlId == null) {
    		if(urlval == "" || urlval == null){
	        	$(this).parents('tr').remove();
	        	return true;
    		}
    	}
    	//真实后台删除数据
    	if(urlId == null || urlId ==""){
	    	urlId = urlval;
    	}
    	doDelUrl(urlId,$(this)); 
    	//alert("delRetust:"+delRetust);
/*     	if (delRetust) {
        	$(this).parents('tr').remove();
        	return true;
    	} */
    });

    function delCallback(delobject) {
    	delobject.parents('tr').remove();
    }
    
    $('#addUrl').click(function () {
        var tr_num = $("#URLTable").find('tbody').children('tr').length + 1;
        var tr_html = '<td style="padding-left: 10px;">' + tr_num + '</td><td><input id="url_name" class="form-control" value="" type="text"  validate="{required:true,minlength:1,maxlength:16}"></td><td><input id="url_value" class="form-control" style="width:90%;" value="" type="text" validate="{required:true,minlength:1,maxlength:128}"></td><td><input id="url_id" value="" type="hidden"> <a href="#" class="remove-row" style="color:red;">删除</a></td>';
        tr_html = '<tr>' + tr_html + '</tr>';
        $("#URLTable").find('tbody').append(tr_html);
    });

</script>
<script>
    var grid = new Datatable();
    function handleRecords() {

        var app_id = $("#app_id").val();
        var opt_id = $("#opt_id").val();
        var goUrl = getRootPath() + '/function/OperateManage.do?method=getUrl&app_id=' + app_id + '&opt_id=' + opt_id;
        // alert(goUrl);
        grid.init({
            src: $("#URLTable"),
            onSuccess: function (grid) {
            },
            onError: function (grid) {
            },
            dataTable: {
                "columns": [{
                    "data": "url_id",
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
                                   "targets": [0],
                                   "render": function (data, type, row, table) {
                                       return (table.row+1);
                                   }
                               },
                               {
                                   "targets": [1],
                                   "data": "url_id",
                                   "render": function (data, type, full) {
                                       var text =   '<input id=\"url_name\" value=\"'  + data + '\" class="form-control"  type="text">' ;
                                       return text;
                                   }
                               },
                               {
                                   "targets": [2],
                                   "render": function (data, type, full) {
                                       var text =  '<input id=\"url_value\" value=\"'  + data + '\" class="form-control" style="width:90%;"   type="text">' ;
                                       return text;
                                   }
                               },
                    {
                        "targets": [3],
                        "data": "url_id",
                        "render": function (data, type, full) {
                            var text =   '<input id=\"url_id\" value=\"'  + data + '\" type="hidden"> <a href="#" class="remove-row" style="color:red;">删除</a>' ;
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
                "pageLength": 1000,
                "ajax": {
                    "url": goUrl,
                    //访问地址
                    'data': function (d) {
                        //d.keywords = $('#searchName').val().replace(/\s+/g, "");
                    }
                },
                "order": [[3, "asc"]]
            }
        });
/*         //条件查询
        $(".table-group1").click(function () {
            var searchName = $('#searchName').val();
            var aa = searchName.replace(/\s+/g, "");
            if (aa == "" || aa == null) {
                layer.msg("请输入查询信息", 2, 0);
            } else {
                grid.getDataTable().ajax.reload();
            }
        });

        $('.input-group .fa-search').click(function () {
            grid.addAjaxParam("dept", "aa");
            grid.addAjaxParam("search", "key");
            grid.submitFilter();
        }); */
    }
</script>
<script type="text/javascript">
    //单条删除
    function doDelUrl(data,delObject) {

        if (!data) {
            alert("数据不存在！");
            return false;
        }
        $.layer({
            shade: [0.5, '#000', true],
            area: ['240', '150'],
            dialog: {
                msg: '确认删除该URL？',
                btns: 2,
                type: 4,
                btn: ['确定', '取消'],
                yes: function () {
                    layer.load('数据删除中...');
                    $.ajax({
                        url: "${fn:getLink('function/OperateManage.do?method=deleteUrl')}",
                        type: "post",
                        //dataType: "JSON",  rms.userrole
                        data: {"url_id": data},
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            if (data) {
                                layer.msg("删除成功", 2, 1);
                                //再次载入表格数据
                                delCallback(delObject);
                            } else {
                                dialog.info(failStr);
                                layer.msg("删除失败", 2, 0);
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
</script>

<website:script src="js/function/opturl.js"/>
