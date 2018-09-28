<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="jstlfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
String odweb = ConfUtil.getValue("global.index.odweb");
String devweb = ConfUtil.getValue("global.index.odweb");
String ucweb = ConfUtil.getValue("global.index.odweb");
pageContext.setAttribute("odweb", odweb);
pageContext.setAttribute("devweb", odweb);
pageContext.setAttribute("ucweb", ucweb);
%>
<!-- 
 -- 选择行政区划的弹出框
 -->

 
<div class="modal fade" id="selectRegionModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">选择行政区划</h4>
      </div>
      <div class="modal-body" id="__selectRegionModalBody">
        
        <div id="selectRegionTree" class="tree-item"></div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default js-selectRegionModal-clear" data-dismiss="modal">清空</button>
        <button type="button" class="btn btn-default js-selectRegionModal-cancel" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary js-selectRegionModal-confirm">确定</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script>


$(function() {

    // 触发弹出框的按钮
    var triggerId = null,
        triggerName = null,
        multiselect = false,
        uid = "";
        showLevel = ""; // 默认到显示到区县

    $('body')
        // 
        .on('show.bs.modal', '#selectRegionModal', function(e) {
            var button = $(e.relatedTarget); // Button that triggered the modal
            triggerId = button.attr('id');
            triggerName = button.attr('name'),
            multiselect = button.data('multiselect');
            showLevel = button.data('showlevel');
            uid = button.data('uid');
        })
        .on('shown.bs.modal', '#selectRegionModal', function() {
            loadRegionTree();
        })
        .on('hidden.bs.modal', '#selectRegionModal', function(e) {
            triggerId = null;
            triggerName = null;
            RegionTreeConf = null;
            multiselect = false;
            $("#selectRegionTree").jstree().destroy();
        })
        .on('click', '.js-selectRegionModal-confirm', function() {
            var selected = $("#selectRegionTree").jstree().get_selected(true);
            
            if (selected.length == 0) {
            	alert("请选择行政区划！");
            	return;
            }
            
            var Regions = [];
            $.each(selected, function(i, e) {
				Regions.push({
					code : e.id,
					name : e.text,
					region_level : e.original.region_level,
					parent_code : e.original.parent_code,
					abbr : e.original.abbr,
					abbr_name : e.original.abbr_name
				});
			});

			$('body').trigger('dmp-region-selected', [ {
				data : Regions,
				triggerId : triggerId,
				triggerName : triggerName
			} ]);

			$('#selectRegionModal').modal('hide');
		})
		// 如果点击取消，则返回空值
		.on('click', '.js-selectRegionModal-cancel', function() {
			$('#selectRegionModal').modal('hide');
		})
		// 清空选择域
		.on('click', '.js-selectRegionModal-clear', function() {
			$('body').trigger('dmp-region-selected', [ {
				data : [],
				triggerId : triggerId,
				triggerName : triggerName
			} ]);
			$('#selectRegionModal').modal('hide');
		});

		function loadRegionTree() {
			var RegionTreeConf = {
				"core" : {
					'themes' : {
						'responsive' : false,
						"stripes" : true
					},
					'check_callback' : function(operation, node, node_parent,
							node_position, more) {
						return false;
					},
					"dots" : false,
					"multiple" : false,
					'data' : {
						'url' : function(node) {

							if (node.id == '#') {
								return "${fn:getConfValue('global.index.odweb')}/selectRegionTree.do?method=getRegionTreeRoot";
							} else {
								return "${fn:getConfValue('global.index.odweb')}/selectRegionTree.do?method=getRegionNode";
							}
						},
						'dataType' : 'json',
						'data' : function(node) {
							return {
								'id' : node.id,
								'level': node.parents.length,
								'showLevel':showLevel,
								'uid':uid
							};
						}
					}
				},
				'plugins' : [ 'types', 'wholerow' ],
				"types" : {
					'root' : {
						"icon " : 'fa fa-home icon-state-warning icon-lg'
					},
					"default" : {
						"icon" : "fa fa-folder icon-state-warning icon-lg"
					}
				}
			};
			if (multiselect) {
				RegionTreeConf.core.multiple = true;
				RegionTreeConf.plugins.push('checkbox');
				RegionTreeConf.checkbox = {	
				    'three_state': false, // 去除上下级联动选择
					'visible' : false
				};
			}

			$("#selectRegionTree").jstree(RegionTreeConf)

			.on('load_node.jstree', function(e, data) {
				console.log(data);
			})

			.on('loaded.jstree', function(e, data) {
			});
		}
	});

	$('body').on('dmp-region-selected', function(e, d) {
	});
</script>
